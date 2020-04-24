export default class Timer {
  static setInterval = (func, interval, timeoutRef = {}) => {
    // eslint-disable-next-line
    timeoutRef.id = setTimeout(() => {
      if (func.length > 0) {
        const next = () => { Timer.setInterval(func, interval, timeoutRef); };
        func(next);
      } else {
        func();
        Timer.setInterval(func, interval, timeoutRef);
      }
    }, interval);

    const clearHandle = () => {
      clearTimeout(timeoutRef.id);
    };

    return clearHandle;
  }

  static clearInterval = (clearHandle) => {
    if (clearHandle) {
      clearHandle();
    }
  }
}
