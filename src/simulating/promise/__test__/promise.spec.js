import { MyPromise } from '../promise'

function genFetch() {
  let count = 0
  return (timeout) => {
    return new Promise(resolve => {
      setTimeout(() => {
        ++count
        resolve(count)
      }, timeout);
    })
  }
}

function genErrorFetch(limit = 2) {
  let num = 0
  return (timeout) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        ++num
        if (num > limit) {
          reject(num)
          return
        }
        resolve(num)
      }, timeout);
    })
  }
}

describe('Test MyPromise', () => {
  describe('Test Mypromise static methods', () => {

    test('MyPromise.all() -- fulfilled', () => {
      const fetchFun = genFetch()
      const promises = [fetchFun(100), fetchFun(200), fetchFun(300)]

      jest.runAllTimers()

      return expect(MyPromise.all(promises)).resolves.toEqual([1, 2, 3])
    })

    test('MyPromise.all() -- rejected', () => {
      const fetchErr = genErrorFetch()
      const promises = [fetchErr(100), fetchErr(200), fetchErr(300)]
      jest.runAllTimers()
      return expect(MyPromise.all(promises)).rejects.toBe(3)
    })

    test('MyPromise.race() -- fulfilled', () => {
      const fetchFun = genFetch()
      const promises = [fetchFun(100), fetchFun(200), fetchFun(300)]

      jest.runAllTimers()

      return expect(MyPromise.race(promises)).resolves.toBe(1)
    })

    test('MyPromise.race() -- rejected', () => {
      const fetchErr = genErrorFetch(0)
      const promises = [fetchErr(100), fetchErr(200), fetchErr(300)]
      jest.runAllTimers()
      return expect(MyPromise.race(promises)).rejects.toBe(1)
    })
  })
})
