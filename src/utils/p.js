const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MPromise {
  FULFILLED_CALLBACK_LIST = []
  REJECTED_CALLBACK_LIST = []
  _status = PENDING

  constructor(fn) {
    this.status = PENDING
    this.value = null
    this.reason = null

    try {
      fn(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      this.reject(error)
    }
  }

  get status() {
    return this._status
  }

  set status(newStatus) {
    this._status = newStatus
    switch (newStatus) {
      case FULFILLED: {
        this.FULFILLED_CALLBACK_LIST.forEach(cb => {
          cb(this.value)
        })
        break
      }
      case REJECTED: {
        this.REJECTED_CALLBACK_LIST.forEach(cb => {
          cb(this.reason)
        })
        break
      }
    }
  }

  resolve(value) {
    if (this.status === PENDING) {
      this.value = value
      this.status = FULFILLED
    }
  }

  reject(reason) {
    if (this.status === PENDING) {
      this.reason = reason
      this.status = REJECTED
    }
  }

  then(onFulfilled, onRejected) {
    const fulfilledFn = this.isFunction(onFulfilled)
      ? onFulfilled
      : value => value
    const rejectedFn = this.isFunction(onRejected)
      ? onRejected
      : reason => {
          throw reason
        }
    // 封装
    let promise2 = new MPromise((resolve, reject) => {
      const fulfilledFnWithCatch = () => {
        queueMicrotask(() => {
          try {
            const x = fulfilledFn(this.value)
            this.resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }

      const rejectedFnWithCatch = () => {
        queueMicrotask(() => {
          try {
            const x = rejectedFn(this.reason)
            this.resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
      switch (this.status) {
        case FULFILLED: {
          fulfilledFnWithCatch()
          break
        }
        case REJECTED: {
          rejectedFnWithCatch()
          break
        }
        case PENDING: {
          this.FULFILLED_CALLBACK_LIST.push(fulfilledFnWithCatch)
          this.REJECTED_CALLBACK_LIST.push(rejectedFnWithCatch)
          break
        }
      }
    })
    return promise2
  }

  resolvePromise(newPromise, x, resolve, reject) {
    if (newPromise === x) {
      return reject(new TypeError('error'))
    }

    if (x instanceof MPromise) {
      x.then(y => {
        this.resolvePromise(newPromise, y, resolve, reject)
      }, reject)
    } else if (typeof x === 'object' || this.isFunction(x)) {
      if (x === null) return resolve(x)

      let then = null

      try {
        then = x.then
      } catch (error) {
        return reject(error)
      }

      if (this.isFunction(then)) {
        let called = false
        try {
          then.call(
            x,
            y => {
              if (called) return
              called = true
              this.resolvePromise(newPromise, y, resolve, reject)
            },
            r => {
              if (called) return
              called = true
              reject(r)
            }
          )
        } catch (error) {
          if (called) return
          reject(error)
        }
      } else {
        resolve(x)
      }
    } else {
      resolve(x)
    }
  }

  catch(onRejected) {
    return this.then(null, onRejected)
  }

  finally(cb) {
    return this.then(
      value => {
        return MPromise.resolve(cb()).then(() => value)
      },
      reason => {
        return MPromise.resolve(cb()).then(() => reason)
      }
    )
  }

  isFunction(param) {
    return typeof param === 'function'
  }

  static resolve(value) {
    if (value instanceof MPromise) {
      return value
    }
    return new MPromise(resolve => {
      resolve(value)
    })
  }

  static reject(reason) {
    return new MPromise((resolve, reject) => {
      reject(reason)
    })
  }

  static all(promiseArray) {
    return new MPromise((resolve, reject) => {
      if (!Array.isArray(promiseArray)) {
        return reject(new TypeError('arguments must be an array!'))
      }
      const num = promiseArray.length
      let counter = 0
      let resolveArray = []
      for (let i = 0; i < num; i++) {
        MPromise.resolve(promiseArray[i])
          .then(value => {
            counter++
            resolveArray[i] = value
            if (counter === num) {
              resolve(resolveArray)
            }
          })
          .catch(e => reject(e))
      }
    })
  }

  static allSettled(promiseArray) {
    return new MPromise((resolve, reject) => {
      if (!Array.isArray(promiseArray)) {
        return reject(new TypeError('arguments must be an array!'))
      }
      const num = promiseArray.length
      let counter = 0
      let resolveArray = []
      for (let i = 0; i < num; i++) {
        MPromise.resolve(promiseArray[i])
          .then(value => {
            resolveArray[i] = {
              status: 'fulfilled',
              value
            }
          })
          .catch(reason => {
            resolveArray[i] = {
              status: 'rejected',
              reason
            }
          })
          .finally(() => {
            counter++
            if (counter === num) {
              resolve(resolveArray)
            }
          })
      }
    })
  }

  static race(promiseArray) {
    return new MPromise((resolve, reject) => {
      if (!Array.isArray(promiseArray)) {
        return reject(new TypeError('arguments must be an array!'))
      }
      const num = promiseArray.length
      if (num === 0) {
        resolve()
      } else {
        for (let i = 0; i < num; i++) {
          MPromise.resolve(promiseArray[i])
            .then(value => {
              resolve(value)
            })
            .catch(reason => {
              reject(reason)
            })
        }
      }
    })
  }
}
