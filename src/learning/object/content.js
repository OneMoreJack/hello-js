const obj = {
  a: 1
}

obj.a     // 1 属性访问
obj['a']  // 1 键访问

// 这两种语法的主要区别在于 . 操作符要求属性名满足标识符的命名规范，
// 而 [".."] 语法 可以接受任意 UTF-8/Unicode 字符串作为属性名


// ---------------
// 在对象中，属性名永远都是字符串。
// 如果你使用 string（字面量）以外的其他值作为属性 名，那它首先会被转换为一个字符串

var myObject = { }; 
myObject[true] = "foo"; 
myObject[3] = "bar"; 
myObject[myObject] = "baz";

myObject["true"]; // "foo" 
myObject["3"]; // "bar" 
myObject["[object Object]"]; // "baz"


/* ------------------------ array ----------------------- */
const arr = ['foo', 1, 'baz']
arr['10'] = 'bar'
console.log(arr.length) // 11
