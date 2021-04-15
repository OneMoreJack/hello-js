const PENDING = Symbol('pending')
const FULFILLED = Symbol('fulfilled')
const REJECTED = Symbol('rejected')

const resolvePromise = (promise, x, resolve, reject) => {
  if (promise === x) {
    return reject(new TypeError('Chaining circle dectected for promise'))
  }

  let called = false;
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {

    try {
      let then = x.then
      if (typeof then === 'function') {
        then.call(x, y => {
          if (called) return
          called = true
          resolvePromise(promise, y, resolve, reject)
        }, r=> {
          if (called) return
          called = true
          reject(r)
        })

      } else {
        resolve(x)
      }

    } catch (error) {
      if (called) return
      called = true
      reject(error)
    }

  } else {
    resolve(x)
  }
}

export default class PromiseA {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('executor must be a function')
    }

    this._status = PENDING
    this._value = undefined
    this._reason = undefined
    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []

    const reject = err => {
      if (this._status === PENDING) {
        this._status = REJECTED
        this._reason = err
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }

    const resolve = value => {
      if (value instanceof PromiseA) {
        return value.then(resolve, reject)
      }

      if (this._status === PENDING) {
        this._status = FULFILLED
        this._value = value
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }

    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onFulfilled, onRejectd) {
    // 处理默认onFulfilled，onRejectd
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
    onRejectd = typeof onRejectd === 'function' ? onRejectd : err => { throw err }

    let promise = new PromiseA((resolve, reject) => {
      if (this._status === FULFILLED) {
        // 当前实例已 fulfilled, 直接把 onFulfilled 推入微任务队列
        queueMicrotask(() => {
          try {
            let x = onFulfilled(this._value)
            resolvePromise(promise, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
      else if (this._status === REJECTED) {
        // 当前实例已 rejected, 直接把 onRejected 推入微任务队列
        queueMicrotask(() => {
          try {
            let r = onRejectd(this._reason)
            resolvePromise(promise, r, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
      else if (this._status === PENDING) {
        // 当前实例还在pending, 则收集 onFulfilled 和 onRejected
        this.onResolvedCallbacks.push(() => {
          queueMicrotask(() => {
            try {
              let x = onFulfilled(this._value)
              resolvePromise(promise, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          })
        })

        this.onRejectedCallbacks.push(() => {
          queueMicrotask(() => {
            try {
              let r = onRejectd(this._reason)
              resolvePromise(promise, r, resolve, reject)
            } catch (error) {
              reject(error)
            }
          })
        })
      }
    })

    return promise
  }

  catch(errCallback) {
    return this.then(null, errCallback)
  }

  finally(callback) {
    return this.then(value => {
      return PromiseA.resolve(callback()).then(() => value)
    }, reason => {
      return PromiseA.resolve(callback()).then(() => {throw reason})
    })
  }

  static resolve(value) {
    return new PromiseA(resolve => resolve(value))
  }

  static reject(reason) {
    return new PromiseA((_, reject) => reject(reason))
  }

  static all(promises) {
    if (!Array.isArray(promises)) {
      const type = typeof promises
      return new TypeError(`${type} ${values} is not iterable`)
    }
    
    return new PromiseA((resolve, reject) => {

      const len = promises.length
      let fulfilled = 0,
          results = []

      const handleResult = (value, i) => {
        results[i] = value
        if (++fulfilled === len) {
          resolve(results)
        }
      }

      for (let i = 0, promise = promises[0]; i < len; promise = promises[++i]) {
        if (promise && typeof promise.then === 'function') {
          promise.then(
            value => { handleResult(value, i)},
            reject
          )
        } else {
          handleResult(value, i)
        }
      }
    })
  }

  static race(promises) {
    if (!Array.isArray(promises)) {
      const type = typeof promises
      return new TypeError(`${type} ${values} is not iterable`)
    }
    
    return new Promise((resolve, reject) => {
      for (const promise of promises) {
        if (promise && typeof promise.then === 'function') {
          promise.then(resolve, reject)
        } else {
          resolve(promise)
        }
      }
    })
  }
}
