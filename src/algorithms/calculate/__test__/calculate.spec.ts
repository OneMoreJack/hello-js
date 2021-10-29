const { calculate, tokenize, toPostfix } = require('../calculate')

describe('算数表达式求值', () => {
  it('中缀表达式`tokenize`', () => {
    expect(tokenize('1 * (2 + 3)')).toEqual(['1', '*', '(', '2', '+', '3', ')'])
    expect(tokenize('1 * -20')).toEqual(['1', '*', '-20'])
    expect(tokenize('1+(-2*3)')).toEqual(['1', '+', '(', '-2', '*', '3', ')'])
    expect(tokenize('(-2*3)-1')).toEqual(['(', '-2', '*', '3', ')', '-', '1'])
    expect(tokenize('-1 + 2')).toEqual(['-1', '+', '2'])
  })


  it("中缀表达式转后缀表达式`toPostFix`", () => {
    expect(toPostfix(['1', '*', '(', '2', '+', '3', ')'])).toEqual(['1', '2', '3', '+', '*'])
    expect(toPostfix(['1', '*', '-20'])).toEqual(['1', '-20', '*']);
    expect(toPostfix(['1', '+', '(', '-2', '*', '3', ')'])).toEqual(['1', '-2', '3', '*', '+'])
    expect(toPostfix(['(', '-2', '*', '3', ')', '-', '1'])).toEqual(['-2', '3', '*', '1', '-'])
    expect(toPostfix(['-1', '+', '2'])).toEqual(['-1', '2', '+'])
  });


  it('`calculate`', () => {
    expect(calculate('1 + 2 + 3')).toBe(6)
    expect(calculate('( 1 + ( ( 2 + 3 ) * ( 4 * 5 ) ) )')).toBe(101)
    expect(calculate('1 + ( 2 + 3 ) * ( 4 * 5 )')).toBe(101)
    expect(calculate('6 + (1 + 2 * 3)')).toBe(13)
    expect(calculate('6 * (1 + 2 * 3)')).toBe(42)
    expect(calculate('(1 + 2 * 3) * 6')).toBe(42)
    expect(calculate('13 + 2 * 3')).toBe(19)

    expect(calculate('1 * (-3 + 1)')).toBe(-2)
    expect(calculate('1 + (2 * -3)')).toBe(-5)
    expect(calculate('-1 + (2 * -3)')).toBe(-7)
  })
})
