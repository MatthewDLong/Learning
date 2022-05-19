const data = ["a", "b", "c"];

function iterateSeries(collection, iteratorCallback, finalCallback) {
  for (var i = 0; i < collection.length; i++) {
    iteratorCallback(collection[i]);
  }

  if (i === collection.length - 1) {
    finalCallback();
  }
}

iterateSeries(data);
