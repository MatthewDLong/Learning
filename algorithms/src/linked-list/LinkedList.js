class LinkedList {
  constructor(head) {
    this.head = head;
  }

  indexOf(key) {
    /*
      var current node equals this.head
      var index equals 0
      
      while current node.data
        
        // Have found the key
        if key equals current node data
          return index

        // End of the LinkedList
        if current node.next is null
          return -1
        else
          // Move pointer to next Node
          assign current node to current node.next
          increment index
      endwhile
            
      // key not found
      return -1
    */
    var currentNode = this.head;
    var index = 0;

    while (currentNode.data) {
      if (key == currentNode.data) {
        return index;
      }

      if (!currentNode.next) {
        return -1;
      }

      currentNode = currentNode.next;
      index++;
    }

    return -1;
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
