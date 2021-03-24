export function Async(generator) {
  const iterator = generator()

  function handle(iteratorObj) {
    if (iteratorObj.done) return
    
    const iteratorValue = iteratorObj.value
    if (iteratorValue instanceof Promise) {
      iteratorValue
        .then(res => handle(iterator.next(res)))
        .catch(err => iterator.throw(err))
    }
  }

  try {
    handle(iterator.next())
  } catch (err) {
    iterator.throw(err)
  }
}