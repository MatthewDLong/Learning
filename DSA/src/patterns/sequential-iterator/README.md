# Sequential Iterator pattern

Execute a list of tasks in sequence by creating a function named iterator, which invokes the next available task in the collection and makes sure to invoke the next step of the iteration when the current task completes.

```javascript
function iterate(index) {
  if (index === tasks.length) {
    return finish();
  }
  const task = tasks[index];
  task(() => iterate(index + 1));
}
function finish() {
  // iteration completed
}
iterate(0);
```

`iterateSeries(collection, iteratorCallback, finalCallback)`

Here, collection is the actual dataset you want to iterate over, iteratorCallback is the function to execute over every item, and finalCallback is the function that gets executed when all the items are processed or in case of an error.

Implementat the `iterateSeries` function.
