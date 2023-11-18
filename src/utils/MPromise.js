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
      this.status = FULFILLED
      this.value = value
    }
  }
  reject(reason) {
    if (this.status === PENDING) {
      this.status = REJECTED
      this.reason = reason
    }
  }

  then(onFulfilled, onRejected) {
    const onFulfilledFn =
      typeof onFulfilled !== 'function' ? value => value : onFulfilled
    const onRejectedFn =
      typeof onRejected !== 'function'
        ? reason => {
            throw reason
          }
        : onRejected
    // if (this.status === FULFILLED) {
    //     onFulfilledFn(this.value)
    // } else if (this.status === REJECTED) {
    //     onRejectedFn(this.reason)
    // }
    let promise2 = new MPromise((resolve, reject) => {
      const fulfilledFnWithCatch = () => {
        queueMicrotask(() => {
          try {
            const x = onFulfilledFn(this.value)
            this.resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }

      const rejectedFnWithCatch = () => {
        queueMicrotask(() => {
          try {
            const x = onRejectedFn(this.reason)
            this.resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }

      switch (this.status) {
        case FULFILLED:
          fulfilledFnWithCatch()
          break
        case REJECTED:
          rejectedFnWithCatch()
          break
        case PENDING:
          this.FULFILLED_CALLBACK_LIST.push(fulfilledFnWithCatch)
          this.REJECTED_CALLBACK_LIST.push(rejectedFnWithCatch)
          break
      }
    })
    return promise2
  }

  resolvePromise(newPromise, x, resolve, reject) {
    if (newPromise === x) {
      return reject(new TypeError('error'))
    }
    if (x instanceof MPromise) {
      x.then(y => this.resolvePromise(newPromise, y, resolve, reject), reject)
    } else if (typeof x === 'object' || typeof x === 'function') {
      if (x === null) return resolve(x)
      let then = null
      try {
        then = x.then
      } catch (error) {
        reject(error)
      }

      if (typeof then === 'function') {
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
        return reject(new TypeError('arguments is not an array!'))
      }
      let resolvedCount = 0
      let len = promiseArray.length
      let resolvedArray = []
      for (let i = 0; i < len; i++) {
        // 1、这里为什么要用 promise.resolve?
        // 因为参数可能不是一个 promise 实例
        Promise.resolve(promiseArray[i])
          .then(value => {
            resolvedCount++
            // 2、这里直接 push，而不是用索引赋值有问题吗 ?
            // 有问题，会导致resolve的返回值不按参数内 promise 的顺序排列
            resolvedArray[i] = value
            // 3、这里如果不计算counter++, 直接判断 resolvedArray.length === promiseNum，会有问题吗?
            // 有问题，因为 resolvedArray 使用索引赋值【即const a = []; a[2] = 1; 此时a.length 等于 3】
            // 当排在后面的 promise fullfilled 优先于前面的 promise rejected 执行时，
            // 将满足 resolvedArray.length === promiseNum，从而得到错误结果
            if (resolvedCount === len) {
              // 4. 如果不在 .then 里面，而在外面判断可以吗?
              // 不行，如果在外面判断，因为是同步代码，执行时 counter 并未更新，会导致拿不到结果）
              resolve(resolvedArray)
            }
          })
          .catch(e => reject(e))
      }
    })
  }

  static allSettled(promiseArray) {
    return new Promise((resolve, reject) => {
      if (!Array.isArray(promiseArray))
        return reject(new TypeError('is not array'))
      let count = 0
      let len = promiseArray.length
      let res = []
      for (let i = 0; i < len; i++) {
        Promise.resolve(promiseArray[i])
          .then(value => {
            res[i] = { status: 'fulfilled', value }
          })
          .catch(reason => {
            res[i] = { status: 'rejected', reason }
          })
          .finally(() => {
            count++
            if (count === len) resolve(res)
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
