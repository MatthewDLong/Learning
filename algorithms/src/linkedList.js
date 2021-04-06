class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

let a = new Node("foo");
let b = new Node("bar");
let c = new Node("baz");

a.next = b;
b.next = c;
