import Engine from './Engine';

export default class Sessions {
  static _option = {};
  static _schema = {
    token: {},
    language: {},
  }

  static init = async (option) => {
    Sessions._restoreOption(option);
    await Sessions._restoreProfile();
  }

  static login = () => {
    // TODO
  }

  static getToken = () => {
    return Sessions._option.token || Sessions._option.temporaryToken;
  }

  static clear = () => {
    Sessions._option.token = undefined;
    Engine.logout();
  }

  static _restoreOption = (params) => {
    const option = { $data: {} };
    const config = {};
    for (const [key, op] of Object.entries(Sessions._schema)) {
      Object.defineProperty(option, key, {
        set(newValue) {
          option.$data[key] = newValue;
          Engine.setItem(key, newValue, op);
        },
        get() {
          return option.$data[key];
        },
      });

      config[key] = Engine.getItem(key, op);
    }

    Object.assign(option, config, params);

    Sessions._option = option;
  }
}
