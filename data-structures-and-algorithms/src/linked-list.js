// Linked list
class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

let d = new Node(11);
let c = new Node(20, d);
let b = new Node(15, c);
let a = new Node(10, b); // HEAD

// Traverse
let data = [];

const traverse = (node) => {
  data.push(node.data);
  if (node.next) {
    traverse(node.next);
  }
};

traverse(a);

console.log(data.length);
