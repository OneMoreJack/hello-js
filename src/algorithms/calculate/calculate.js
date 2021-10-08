
export function calculate(str) {
  // 转为逆波兰表达式
  const postfixTokens = toPostfix(str)
  
  const stack = []
  const calcAndPush = cb => {
    const num1 = stack.pop(),
          num2 = stack.pop()
    return stack.push(cb(num2, num1))
  }

  for (let token of postfixTokens) {
    if (token === '+') {
      calcAndPush((num2, num1) => num2 + num1)
    } else if (token === '-') {
      calcAndPush((num2, num1) => num2 - num1)
    } else if (token === '*') {
      calcAndPush((num2, num1) => num2 * num1)
    } else if (token === '/') {
      calcAndPush((num2, num1) => {
        let res = num2 / num1
        return res < 0 ? Math.ceil(res) : Math.floor(res)
      })
    } else {
      stack.push(Number(token))
    }
  }

  return stack.pop()
}



const priorityMap = new Map([
  ['(', 0],
  ['+', 1],
  ['-', 1],
  ['*', 2],
  ['/', 2],
])

const getPriority = token => priorityMap.get(token)
const isNumber = num => /^-?\d+$/.test(num)
const isOperator = ch => ['+', '-', '*', '/', '(', ')'].includes(ch)

/**
 * 中缀表达式转为token
 * @param {string} str 
 * @returns {Array<string>}
 */
export function tokenize(str) {
  str = str.replace(/\s/g, '')
  const infixTokens = []

  let tokenBuffer = ''
  for (let i = 0; i < str.length - 1; i++) {
    let char = str[i]
    if (isOperator(char)) {
      // 处理负数
      if (
        char === '-' && 
        (i === 0 || ['(', '+', '-', '*', '/'].includes(str[i - 1]))
      ) {
        tokenBuffer = char
      } else {
        infixTokens.push(char)
      }
    }
    else {
      tokenBuffer += char

      if (!/\d/.test(str[i + 1])) {
        infixTokens.push(tokenBuffer)
        tokenBuffer = ''
      }
    }
  }

  const lastChar = str[str.length - 1]
  if (/\d/.test(lastChar)) {
    tokenBuffer += lastChar
  } else {
    tokenBuffer = lastChar
  }
  infixTokens.push(tokenBuffer)

  return infixTokens
}

/**
 * 中缀表达式转后缀表达式
 * @param {string} str 
 * @returns {Array<string>}
 */
export function toPostfix(str) {
  const tokens = tokenize(str)

  const stack = []
  let exp = []
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    if (isNumber(token)) {
      exp.push(token)
    }
    else if (token === ')') {
      let token = stack.pop()
      while (token !== '(') {
        exp.push(token)
        token = stack.pop()
      }
    }
    else {
      while (stack.length && token !== '(') {
        if (getPriority(token) >  getPriority(stack[stack.length - 1])) break
        exp.push(stack.pop())
      }
      stack.push(token)
    }
  }

  while (stack.length) {
    exp.push(stack.pop())
  }
  // console.log(exp)
  return exp
}

