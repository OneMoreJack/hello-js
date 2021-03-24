
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

  defineValue(this, 'handlers_then', [])
  defineValue(this, 'handlers_catch', [])

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
  if (fulfillHandler) this.handlers_then.push(fulfillHandler)
  if (rejectHandler) this.handlers_catch.push(rejectHandler)
  return this
}

MyPromise.prototype.catch = (rejectHandler) => {
  if (rejectHandler) this.handlers_catch.push(rejectHandler)
  return this
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
      promise
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
  let fulfilled = false
  return new Promise((resolve, reject) => {
    for (const promise of promises) {
      promise
        .then(res => {
          if (!fulfilled) {
            fulfilled = true
            resolve(res)
          }
        })
        .catch(err => reject(err))
    }
  })
}
