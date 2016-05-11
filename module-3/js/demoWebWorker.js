self.addEventListener('message', function(event) {
  if (event.data == 'START') {
    startWork();
  } else if (event.data ==='STOP') {
    stopWork();
  } else {
    processData(event.data);
  }
});

function startWork() {
  self.postMessage('STARTED');
}

function stopWork() {
  self.postMessage('STOPPED');
  self.close();
}
function processData(data) {
  self.postMessage('Processed ' + data);
}
