# Code Style
> 良好的代码风格应该写得能自己解释自己.所以写代码应该做到
- 结构一目了然, 文件命名,文件夹结构等.
- 内容要遵循一定的排序. 比如函数顺序, import 顺序, propTypes 顺序,
- 命名规范, 看到名字就知道是干什么的
- 逻辑清晰, 少用或者不用有歧义的代码
- 必要的注释
- 不应该 hard code, 应该放在国际化资源文件,或者定义一个枚举类型等

- *良好的异常处理机制, 但不应该满篇 try catch*
- *良好的 log 机制, 但不应该满篇 log*
- *向前兼容*
- *健壮性*

# Infrastructure
> engine
- 所有业务逻辑代码
- 网络访问
- 本地存储管理

> plugins
- 封装第三方库
- 封装平台相关代码

> pages
- 只有 page 才能和 redux connect
- page 里不应该有 state
- 一般情况下一个 page 对应一个 url

> components
- 共享和业务无关的组件, 比如 loading, toast 等

> pages/components
- 共享和业务相关的组件

> pages/**/components
- 页面特有组件,不与其他页面共享

# JS
> 命名
- 文件名 `大驼峰`
- 类名, 枚举名 `大驼峰`
- 枚举key `全大写下划线隔开`
- 普通变量, 函数, json key `小驼峰`
- 类成员变量, 函数 `小驼峰`
- 如果有明显私有的特性,需要提醒别人不要再类外部使用以下划线 `_` 开始

> 排序
- 静态 > 实例
- public > private

```js
class Sample {
  static fields
  static public methods
  static private methods
  fields
  constructor
  public methods
  private methods
}
```
> 空行的作用应该是提醒作用,让代码更醒目. 空行应该在
- if, while, function 语句块的结束处
- return 前
- 注释前
- 代码过长,需要空一行分一分段

> 注释
>> 注释是代码表达自身的补充,但注释并不熟越多越好,什么时候需要写注释
- 限于命名不能表达清楚自身代表的含义
- 代码过于复杂,需要一个简单的注释来表述清楚代码做了些什么
- 的确是代码过于有歧义,很难让人理解
- 提醒

>> 注释的注意点
- 关于注释代码,要么删掉,要么加上注释,说明,比如,如果下个版本测试没有问题就可以直接删掉
- 简洁明了
- 如果是 TODO 要加上人
- 如果有英文单词,前后要有空格

```js
// TODO (rob): xxxxx
```

# React
> 命名遵循 JS 命名规范,一下情况特殊考虑
- 私有方法,字段不需要以下划线 `_` 开始
- 回调 `on{动词}{宾语}` 形式

> 排序
- propTypes 里的约束 属性 > func
```js
class Sample extends Component {
  static propTypes = {
    props,
    func
  }

  static defaultProps = {

  }

  state = {}

  constructor (props) {
    super(props)
  }

  lifecycle

  get|set|should|anything-else

  onCallback

  renderXXX

  render
}
```

# REDUX
> action
- 一个 action, dispatch 一次. 对应唯一的一个 action type
- action 职责单一,完成一个比较独立的小功能,或者是页面的声明周期的回调,或者是用户交互的反馈

> reducer
- 一个 page 与一个 reducer 对应

# Less
> 命名
- 以中划线 `-` 隔开
- 每个文件与组件一一对应
- 所有样式包在对应组件的名称
