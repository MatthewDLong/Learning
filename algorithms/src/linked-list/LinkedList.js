class LinkedList {
  constructor(head) {
    this.head = head;
  }

  read(index) {
    /*
      var counter equal 0
      var current equal this.head

      while the counter is less than or equal to the index
        if counter equal to index
          return current.data

        if the next node is null
          return -1
        else
          increment the counter
          store the value of data
          set current as the next node the next node
      endwhile

      return -1
    */

    let counter = 0;
    let current = this.head;

    while (counter <= index) {
      if (counter === index) {
        return current.data;
      }
      if (!current.next) {
        return -1;
      }
      counter++;
      current = current.next;
    }

    return -1;
  }
}

module.exports = LinkedList;
