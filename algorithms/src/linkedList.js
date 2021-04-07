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

var head = a;

function traverse(head) {
  // always log Node.data
  console.log(head.data);

  // base case
  if (!head.next) {
    return head.data;
  }

  // recursive case
  traverse(head.next);
}

// traverse the linked list, pssing in the first Node
traverse(a);
