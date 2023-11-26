class IPromise {
  static all(promiseArray) {
    return new Promise((resolve, reject) => {
      if (!Array.isArray(promiseArray)) {
        return reject(new TypeError('the param is not an Array'))
      }
      let count = 0
      const len = promiseArray.length
      const resArray = []
      for (let i = 0; i < len; i++) {
        Promise.resolve(promiseArray[i])
          .then(value => {
            count++
            resArray[i] = value
            if (len === count) {
              resolve(resArray)
            }
          })
          .catch(e => reject(e))
      }
    })
  }
}

const promise1 = Promise.resolve(3)
const promise2 = 42
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo')
})

IPromise.all([promise1, promise2, promise3]).then(values => {
  console.log(values)
})
