self.onmessage = function(event) {
    const data = event.data;
    const result = data.map(num => num * 2);
    self.postMessage(result);
  };