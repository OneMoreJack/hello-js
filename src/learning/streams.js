async function *ints() {
  for (let i = 0; i < 5; i++) {
    yield await new Promise(resolve => setTimeout(resolve, 1000, i))
  }
}

/* ====================================================== */
/*                     READABLE STREAM                    */
/* ====================================================== */
console.group('readableStream')
const underlyingSource = {
  async start(controller) {
    // console.log('CONTROLLER', controller) /*  ReadableStreamDefaultController */
    for await (let chunk of ints()) {
      controller.enqueue(chunk)
    }

    controller.close()
  }
}

const readableStream = new ReadableStream(underlyingSource)

// console.log('ISLOCKED', readableStream.locked)
const readableStreamDefaultReader = readableStream.getReader()
// console.log('ISLOCKED', readableStream.locked)

// consumer
;(async () => {
  while (true) {
    const { done, value } = await readableStreamDefaultReader.read()
    if (done) break
    else console.log('READ',value)
  }
})()
console.groupEnd('readableStream')

/* ====================================================== */
/*                     WRITABLESTREAM                     */
/* ====================================================== */

console.group('writableStream')

const underlyingSink = {
  write(value) {
    console.log('WRITE',value)
  },

  close() {
    console.log('writable stream closed')
  }
}

const writableStream = new WritableStream(underlyingSink)
const writableStreamDefaultWriter = writableStream.getWriter()

// producer
;(async () => {
  for await (let chunk of ints()) {
    await writableStreamDefaultWriter.ready
    writableStreamDefaultWriter.write(chunk)
  }

  writableStreamDefaultWriter.close()
})()

console.groupEnd('writableStream')


/* ====================================================== */
/*                    TRANSFORM STREAM                    */
/* ====================================================== */

const { writable, readable } = new TransformStream({
  transform(chunk, controller) {
    controller.enqueue(chunk * 2)
  }
})

const readableStreamDefaultReader1 = readable.getReader()
const writableStreamDefaultWriter1 = writable.getWriter()

// producer
;(async () => {
  for await (let chunk of ints()) {
    await writableStreamDefaultWriter1.ready
    writableStreamDefaultWriter1.write(chunk)
  }

  writableStreamDefaultWriter1.close()
})()

// consumer
;(async () => {
  while (true) {
    const { done, value } = await readableStreamDefaultReader1.read()
    if (done) break
    else console.log('TRANSFORMED', value)
  }
})()
