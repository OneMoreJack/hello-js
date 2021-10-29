
export function calculate(s: string) {
  const tokens = tokenize(s)
  const postfix = toPostfix(tokens)
  return calcPostfix(postfix)
}

const isNumber = (s: string) => /-?\d/.test(s)

/**
 * 中缀表达式token化
 * @param s 
 * @returns 
 */
export function tokenize(s: string): string[] {
  s = s.replace(/\s/g, '')
  let tokens: string[] = []
  let tokenBuffer = ''
  for (let i = 0; i < s.length - 1; i++) {
    const char = s[i]

    if (!isNumber(char)) {
      if (
        char === '-' && 
        (i === 0 || ['(', '+', '-', '*', '/'].includes(s[i - 1]))
      ) {
        tokenBuffer += char
      }
      else tokens.push(char)
      
    } else {
      tokenBuffer += char
      if (!isNumber(s[i + 1])) {
        tokens.push(tokenBuffer)
        tokenBuffer = ''
      }
    }
  }

  const lastChar = s[s.length - 1]
  if (isNumber(lastChar)) {
    tokenBuffer += lastChar
  } else {
    tokenBuffer = lastChar
  }
  tokens.push(tokenBuffer)

  return tokens
}



const priority = new Map([
  ['(', 0],
  ['+', 1],
  ['-', 1],
  ['*', 2],
  ['/', 2],
])
const isPrior = (p: string, q: string) => {
  const pWeight = priority.get(p)
  const qWeight = priority.get(q)
  if (pWeight === undefined || qWeight === undefined) return false
  else return pWeight > qWeight
}

/**
 * 中缀表达式转后缀表达式
 * @param tokens 
 * @returns 
 */
export function toPostfix(tokens: string[]): string[] {
  let postfixTokens: string[] = []
  const stack: string[] = []
  for (let token of tokens) {
    if (isNumber(token)) {
      postfixTokens.push(token)
    } else {
      if (token === ')') {
        let operator = stack.pop()
        while (operator && operator !== '(') {
          postfixTokens.push(operator)
          if (stack.length === 0) break
          operator = stack.pop()
        }
      } else if (token === '(') {
        stack.push(token)
      } else {
        while (stack.length && !isPrior(token, stack[stack.length - 1])) {
          postfixTokens.push(stack.pop() as string)
        }
        stack.push(token)
      }
    }
  }

  while (stack.length) {
    postfixTokens.push(stack.pop() as string)
  }

  return postfixTokens
}


/**
 * 计算后缀表达式
 * @param tokens 
 * @returns 
 */
export function calcPostfix(tokens: string[]): number {
  let stack: number[] = []
  const calc = (cb: (a: number, b: number) => number) => {
    const num2 = stack.pop() as number,
          num1 = stack.pop() as number
    stack.push(cb(num1, num2))
  }
  for (let token of tokens) {
    if (token === '+') calc((a, b) => a + b)
    else if (token === '-') calc((a, b) => a - b)
    else if (token === '*') calc((a, b) => a * b)
    else if (token === '/') {
      calc((a, b) => {
        const res = a / b
        return res < 0 ? Math.ceil(res) : Math.floor(res)
      })
    }
    else stack.push(Number(token))
  }
  return stack.pop() as number
}
