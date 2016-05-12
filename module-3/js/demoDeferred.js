// Sample worker script
// I know, same as deferred.js, but a little repetition is good for learning

// send ready message
self.postMessage('READY');

// simulate long-running operation
sleep(3000);

// send completed message
self.postMessage('COMPLETED');

function sleep(milliseconds) {
  var startingTime = new Date().getTime();
  var stopTime = startingTime + milliseconds;
  // As long as stopTime is greater than the current time, wait patiently and let calling script do its thing
  while (stopTime >= new Date().getTime()) { }
}
