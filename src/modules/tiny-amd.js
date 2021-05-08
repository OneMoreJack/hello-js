
var MyModules = (function Manager() {
  var modules = {};

  function define(name, deps, impl) {
    for (var i=0; i<deps.length; i++) { 
      deps[i] = modules[deps[i]]; 
    }
    modules[name] = impl.apply( impl, deps ); 
  }

  function get(name) {
    return modules[name]; 
  }

  return { 
    define: define, 
    get: get 
  }; 
})();

MyModules.define( "bar", [], function() {
  function hello(who) {
    return "Let me introduce: " + who; 
  }
  return { 
    hello: hello 
  }; 
}); 

MyModules.define('baz', [], function() {
  function hello(who) {
    return 'HaHa ' + who
  }

  return {
    hello: hello
  }
})
  
MyModules.define( "foo", ["bar", 'baz'], function(bar, baz) { 
  var hungry = "hippo";
  function awesome() { 
    console.log( bar.hello( hungry ).toUpperCase() ); 
  }

  function hi() {
    console.log(baz.hello('Jack').toLowerCase())
  }
  return { 
    awesome: awesome,
    hi: hi
  }; 
} ); 

var bar = MyModules.get( "bar" ); 
var foo = MyModules.get( "foo" ); 
console.log( bar.hello( "hippo" ) ); // Let me introduce: hippo
foo.awesome(); // LET ME INTRODUCE: HIPPO
foo.hi()

