const Node = require("./Node");
const LinkedList = require("./LinkedList");

const a = new Node("foo");
const b = new Node("bar");
const c = new Node("baz");

a.next = b;
b.next = c;

const l = new LinkedList(a);

let result;

result = l.indexOf("foo");
console.log(result); // 0

result = l.indexOf("bar");
console.log(result); // 1

result = l.indexOf("baz");
console.log(result); // 2

result = l.indexOf("qux");
console.log(result); // -1
