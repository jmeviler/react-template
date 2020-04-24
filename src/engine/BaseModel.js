import _ from 'lodash';
import moment from 'moment';

export default class BaseModel {
  constructor(props) {
    this._assignProps(props);
  }

  _assignProps(props) {
    Object.assign(this, props);
    this._parseMomentFields();
  }

  _parseMomentFields() {
    for (const field of this._getMomentFields()) {
      const fieldValue = _.get(this, field);
      if (fieldValue) {
        _.set(this, field, moment(fieldValue));
      }
    }
  }

  // eslint-disable-next-line
  _getMomentFields() {
    return ['createdAt', 'updatedAt'];
  }

  _getApiDataFields() {
    const fields = Object.keys(this);
    const fieldsToDelete = ['_id', 'createdAt', 'updatedAt'];
    fieldsToDelete.forEach((field) => {
      return _.pull(fields, field);
    });
    return fields;
  }

  getApiData() {
    const params = {};
    const fieldMap = this._getApiDataFields();
    if (_.isArray(fieldMap)) {
      for (const field of fieldMap) {
        _.set(params, field, _.get(this, field));
      }
    } else {
      for (const [apiKey, clientKey] of Object.entries(fieldMap)) {
        _.set(params, apiKey, _.get(this, clientKey));
      }
    }

    return params;
  }
}
