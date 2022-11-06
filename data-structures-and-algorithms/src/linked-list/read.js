const Node = require("./Node");
const LinkedList = require("./LinkedList");

const a = new Node("foo");
const b = new Node("bar");
const c = new Node("baz");

a.next = b;
b.next = c;

const l = new LinkedList(a);

const result = l.read(3);
console.log(result);
