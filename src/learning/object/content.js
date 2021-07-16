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


/* ------------------------- 不变性 ------------------------ */
const imObj = {}
// 1. 常量属性
Object.defineProperty(imObj, 'a', {
  value: 1,
  writable: false,
  configurable: false
})

// 2. 禁止扩展
Object.preventExtensions(imObj)
imObj.b = 2
console.log(imObj.b)  // undefined

// 3. Object.seal()
// 在一个现有对象上调用 Object.preventExtensions(..) 
// 并把所有现有属性标记为 configurable:false
// 密封之后不可以新增属性，不可修改现有属性配置，但是可以修改现有属性

// 4. Object.freeze()
// 这个方法实际上会在一个现有对象上调用 Object.seal(..) 并把所有“数据访问”属性
// 标记为 writable:false，这样就无法修改它们的值
