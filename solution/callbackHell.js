module.exports = function (Homework) {

  function iter(i, array, acc, length, fn, cb) {
    array.get(i, (curr) => {
      fn(acc, curr, i, array, (newAcc) => {
        Homework.add(i, 1, (newI) => {
          Homework.less(newI, length, (isLess) => {
            if (isLess) {
              iter(newI, array, newAcc, length, fn, cb);
            } else {
              cb(newAcc);
            }
          })
        });
      });
    })
  }

  return async (array, fn, initialValue, cb) => {
    array.length((length) => {
      iter(0, array, initialValue, length, fn, cb)
    })
  }
}