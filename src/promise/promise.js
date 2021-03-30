
function defineValue(target, key, value) {
  Object.defineProperty(target, key, {
    value,
    writable: true,
    enumerable: false,
  })
}


const STATUS = {
  PENDING: Symbol('pending'),
  FULFILLED: Symbol('fulfilled'),
  REJECTED: Symbol('rejected')
}

export function MyPromise(callback) {
  defineValue(this, 'PromiseState', STATUS.PENDING)
  defineValue(this, 'PromiseResult', undefined)

  const _resolve = (value) => {
    this.PromiseResult = value
    this.PromiseState = STATUS.FULFILLED
  }

  const _reject = (value) => {
    this.PromiseState = STATUS.REJECTED
  }

  callback(_resolve, _reject)

  return this
}

/* ====================================================== */
/*                        PROTOTYPE                       */
/* ====================================================== */

MyPromise.prototype.then = (fulfillHandler, rejectHandler) => {
  // TODO then
}

MyPromise.prototype.catch = (rejectHandler) => {
  // TODO catch
}


/* ====================================================== */
/*                     STATIC METHODS                     */
/* ====================================================== */

MyPromise.all = (promises) => {
  const len = promises.length
  let fulfilled = 0,
      results = []

  return new Promise((resolve, reject) => {
    for (let i = 0, promise = promises[0]; i < len; promise = promises[++i]) {
      Promise.resolve(promise)
        .then(res => {
          fulfilled++
          results[i] = res
          if (fulfilled === len) {
            resolve(results)
          }
        })
        .catch(err => reject(err))
    }
  })
}



MyPromise.race = (promises) => {
  return new Promise((resolve, reject) => {
    for (const promise of promises) {
      Promise.resolve(promise)
        .then(resolve)
        .catch(reject)
    }
  })
}
