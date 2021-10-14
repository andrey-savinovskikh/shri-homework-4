module.exports = function (Homework) {

  function promisify(f) {
    return function (...args) {
      return new Promise((resolve) => {
        args.push((res) => resolve(res));
        f.call(this, ...args);
      });
    };
  }

  return async (array, fn, initialValue, cb) => {
    const prGet = promisify(array.get),
        prLength = promisify(array.length),
        prFn = promisify(fn);

    let acc = initialValue;

    let length = await prLength();

    for (let i = 0; i < length; i++) {
      const curr = await prGet(i);

      acc = await prFn(acc, curr, i, array);
    }

    cb(acc);
  }
}