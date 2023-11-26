function a() {
  this.b = 7
}
var c = new a()
a.prototype.b = 3
var b = 9
a()

console.log(b)
console.log(c.b)

console.log(JSON.stringify(c))
console.log(JSON.stringify(a))
