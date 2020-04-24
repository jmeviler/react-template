import './index.less';

import { siderMenuWidth } from '~/consts';
import { Breadcrumb, Icon, Layout, Menu } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { routerActions } from 'react-router-redux';

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

@connect(
  (state) => { return state.routing; },
)
export default class CommonLayout extends Component {
  static propTypes = {
    routes: PropTypes.object.isRequired,
    location: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  getMenuAndRoutes = () => {
    const menus = [];
    const routes = [];
    for (const [key, item] of Object.entries(this.props.routes)) {
      if (item.component) {
        menus.push(
          <Menu.Item key={key}>
            {this.renderMenuItemContent(item.iconType, key)}
          </Menu.Item>
        );
        routes.push(
          <Route key={key} exact path={key} component={item.component} />
        );
      } else {
        const subMenus = [];
        for (const [subKey, subItem] of Object.entries(item.items)) {
          subMenus.push(
            <Menu.Item key={key + subKey}>
              {this.renderMenuItemContent(subItem.iconType, key + subKey)}
            </Menu.Item>
          );
          routes.push(
            <Route key={key + subKey} exact path={key + subKey} component={subItem.component} />
          );
        }
        menus.push(
          <SubMenu key={key} title={this.renderMenuItemContent(item.iconType, key)}>
            {subMenus}
          </SubMenu>
        );
      }
    }

    return { menus, routes };
  }

  getBreadCrumb = () => {
    const pathSnippets = this.props.location.pathname.split('/').filter((i) => { return i; });
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      return (
        <Breadcrumb.Item key={url}>
          {this.$i18n(`router.title[${url}]`)}
        </Breadcrumb.Item>
      );
    });
    extraBreadcrumbItems.unshift(
      <Breadcrumb.Item key="home">
        {this.$i18n('router.title.home')}
      </Breadcrumb.Item>
    );
    return extraBreadcrumbItems;
  }

  onCollapse = () => {
    this.setState({ collapsed: !this.state.collapsed });
  }

  onSelectMenu = (item) => {
    this.$dispatch(routerActions.replace(item.key));
  }

  renderMenuItemContent = (iconType, title) => {
    return [
      <Icon key="1" type={iconType} />,
      <input type="button" value={this.$i18n(`router.title[${title}]`)} key="2" />,
    ];
  }

  render = () => {
    const { menus, routes } = this.getMenuAndRoutes();
    this.getBreadCrumb();
    return (
      <Layout className="common-layout">
        <Sider
          collapsible
          width={siderMenuWidth}
          trigger={null}
          breakpoint="md"
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo-container">
            <img alt="" src="/static/logo.svg" />
            <h1>{this.$i18n('router.title.appName')}</h1>
          </div>
          <Menu
            onSelect={this.onSelectMenu}
            theme="dark"
            mode="inline"
          >
            {menus}
          </Menu>
        </Sider>
        <Layout className="layout-content">
          <Content className="page-container">
            <Breadcrumb style={{ margin: '16px 0' }}>
              {this.getBreadCrumb()}
            </Breadcrumb>
            <Switch>
              {routes}
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
