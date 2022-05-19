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
    return this.pStart >= this.elements.length;
  }
}

var q = new Queue();
q.enqueue("a");
q.enqueue("b");
q.enqueue("c");
q.dequeue();
q.dequeue();
console.log(q.isEmpty()); // false
console.log(q.front()); // c
