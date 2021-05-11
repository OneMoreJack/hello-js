Function.prototype.mycall = function(context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('what is trying to called is not a function')
  }

  context = context || window

  let fn = this,
      fnSymbol = Symbol('fn')
  
  context[fnSymbol] = fn
  const res = context[fnSymbol](...args)
  delete context[fnSymbol]
  return res
}