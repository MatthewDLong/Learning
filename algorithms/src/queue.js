class Queue {
  constructor(items = []) {
    this.items = items;
  }

  enqueue(item) {
    this.items.push(item);
  }

  dequeue() {
    return this.items.shift();
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

var q = new Queue(["a", "b", "c"]);
q.enqueue("d");
var c = q.dequeue();
console.log(c); // a
