import PromiseA from '../promiseAplus'

function genPromise(msg) {
  return new PromiseA((resolve, reject) => {
    resolve(msg)
  })
}

function genRejectedPromise(err) {
  return new PromiseA((resolve, reject) => {
    reject(err)
  })
}

describe('Test PromiseA', () => {
  test('then:fulfilled', () => {
    expect.assertions(1)
    return genPromise('hello').then(res => {
      expect(res).toBe('hello')
    })
  })

  test('then:rejected', () => {
    expect.assertions(1)
    return genRejectedPromise('err').then(
      () => {},
      e => expect(e).toMatch('err')
    )
  })
})