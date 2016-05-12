// Sample worker script

// Send ready message
self.postMessage('READY');

// Simulate a long-running process
sleep(3000);

// Send completed message
self.postMessage('COMPLETED');

function sleep(milliseconds) {
  var startingTime = new Date().getTime();
  var stopTime = startingTime + milliseconds;
  // As long as stopTime is greater than the current time, wait patiently and let calling script do its thing
  while (stopTime >= new Date().getTime()) { }
}
