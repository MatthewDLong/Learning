// CircularQueue(k) Initializes the object with the size of the queue to be k.
class CircularQueue {
  constructor(k) {
    this.size = k;
    this.elements = [];
  }

  // int Front() Gets the front item from the queue. If the queue is empty, return -1.
  Front() {
    if (this.isEmpty()) {
      return -1;
    }
    return this.elements[0];
  }

  // int Rear() Gets the last item from the queue. If the queue is empty, return -1.
  Rear() {
    if (this.isEmpty()) {
      return -1;
    }
    return this.elements[this.elements.length - 1];
  }

  // boolean enQueue(int value) Inserts an element into the circular queue. Return true if the operation is successful.
  enQueue(value) {
    if (this.isFull()) {
      return false;
    }
    this.elements.push(value);
    return true;
  }

  // boolean deQueue() Deletes an element from the circular queue. Return true if the operation is successful.
  deQueue() {
    if (this.isEmpty()) {
      return false;
    }
    this.elements.shift();
    return true;
  }

  // boolean isEmpty() Checks whether the circular queue is empty or not.
  isEmpty() {
    return this.elements.length === 0;
  }

  // boolean isFull() Checks whether the circular queue is full or not.
  isFull() {
    return this.elements.length >= this.size;
  }
}

const q = new CircularQueue(2);
q.enQueue(1);
q.enQueue(2);
console.log(q.Front()); // 1
console.log(q.Rear()); // 2
console.log(q.deQueue()); // true
console.log(q.isEmpty()); // false
q.enQueue(3);
console.log(q.isFull()); // true
console.log(q.enQueue(4)); // false
console.log(q.Rear()); // 3
