/* 
// simple
Function.prototype.mybind = function(othis) {
  let fn = this
  if (typeof fn !== 'function') {
    throw new TypeError('what is trying to bound is not callable')
  }
  let args = [].slice.call(arguments, 1)

  return function() {
    args = args.concat([].slice.call(arguments))
    return fn.apply(othis, args)
  }
}


// mdn polyfill 
Function.prototype.mybind = function(othis) {
  if (typeof this !== 'function') {
    throw new TypeError('what is trying to bound is not callable')
  }

  const slice = Array.prototype.slice

  const baseArgs = slice.call(arguments, 1),
      baseArgsLength = baseArgs.length,
      fn = this,
      fNOP = function () {},
      fBound = function () {
        // reset to default base arguments
        baseArgs.length = baseArgsLength
        baseArgs.push.apply(baseArgs, arguments)

        // const args = [...baseArgs, ...arguments]

        return fn.apply(
          // 若使用 `new` 调用 fBound，则保持 this 指向new新创建的对象
          // 否则把 this 指向目标对象
          fNOP.prototype.isPrototypeOf(this) ? this : othis,
          baseArgs
        )
      }

  if (this.prototype) {
    fNOP.prototype = this.prototype
  }
  fBound.prototype = new fNOP()

  return fBound
}
 */

// simplified mdn
Function.prototype.mybind = function(othis, ...baseArgs) {
  if (typeof this !== 'function') {
    throw new TypeError('what is trying to bound is not callable')
  }

  const fn = this,
      fNOP = function () {},
      fBound = function (...newArgs) {
        const args = [...baseArgs, ...newArgs]
        return fn.apply(
          // 若使用 `new` 调用 fBound，则保持 this 指向new新创建的对象
          // 否则把 this 指向目标对象
          fNOP.prototype.isPrototypeOf(this) ? this : othis,
          args
        )
      }

  if (this.prototype) {
    fNOP.prototype = this.prototype
  }
  fBound.prototype = new fNOP()

  return fBound
}