// Smaple worker script
// The script executes immediately on load
// Nearly any content can be passed between the page and the worker script
// This simple demonstration just uses strings

// Worker has one event called message
// Messag passes one object with a data property
// The data property has the payload of the sent message
// Again, in our case, that will be a string

self.addEventListener('message', function(event) {
  // receive message from page
  var message = event.data;
  // send message to the page
  // this simple logic just echoes the string back to the caller
  self.postMessage(event.data + ' - Processed!');
});
// There is no architecture for events like onReady.
// However, you can implement one of your own relatively easily.
self.postMessage('READY');
