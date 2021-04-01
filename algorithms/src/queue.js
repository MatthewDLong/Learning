class Queue {
  constructor() {
    // a pointer to indicate the start position
    this.pStart = 0;
    // store elements
    this.elements = [];
  }

  /** Insert an element into the queue. Return true if the operation is successful. */
  enqueue(element) {
    this.elements.push(element);
    return true;
  }

  /** Delete an element from the queue. Return true if the operation is successful. */
  dequeue() {
    if (this.isEmpty()) {
      return false;
    }
    this.pStart++;
    return true;
  }

  /** Get the front item from the queue. */
  front() {
    return this.elements[this.pStart];
  }

  /** Checks whether the queue is empty or not. */
  isEmpty() {
    return this.elements.length === 0;
  }
}

var q = new Queue();
q.enqueue("a");
q.enqueue("b");
q.enqueue("c");
q.enqueue("d");
q.dequeue();
var e = q.front();
console.log(e); // b
