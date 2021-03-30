const logMessage = (cb) => {
  console.log("hello");
  cb(null);
};

const tasks = [logMessage, logMessage, logMessage, logMessage, logMessage];

const concurrency = 2;
let running = 0;
let completed = 0;
let index = 0;

function nextTask() {
  while (running < concurrency && index < tasks.length) {
    const task = tasks[index++];
    task((err) => {
      if (err) {
        console.error(err);
      }

      if (++completed === tasks.length) {
        return finish();
      }
      running--;
      nextTask();
    });
    running++;
  }
}

nextTask();

function finish() {
  console.log("all tasks finished");
}
