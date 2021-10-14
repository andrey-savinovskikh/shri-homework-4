module.exports = function (Homework) {
  return async (array, fn, initialValue, cb) => {
    let i = 0,
        acc = initialValue;

    array.length((length) => {
      (function get() {
        array.get(i, (curr) => {
          fn(acc, curr, i, array, (newAcc) => {
            acc = newAcc;

            Homework.add(i, 1, (newI) => {
              i = newI;

              Homework.less(newI, length, (isLess) => {
                if (isLess) {
                  get();
                } else {
                  cb(acc);
                }
              })
            });
          });
        })
      })()
    })
  }
}