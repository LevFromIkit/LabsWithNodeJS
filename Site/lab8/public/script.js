var previousColorElement;
var canvas;
var context;
var thickness;
var color;
var currentThickness = 1;
var currentColor = "#000000";
var drawingHistory = [];

window.onload = function() {
      canvas = document.getElementById("drawingCanvas");
      context = canvas.getContext("2d");

      window.addEventListener('resize', resizeCanvas, false);
      
      thickness = document.getElementById("size");
      color = document.getElementById("colorPicker");
        
      function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        context.lineWidth = thickness.value;

        canvas.onmousedown = startDrawing;
        canvas.onmouseup = stopDrawing;
        canvas.onmouseout = stopDrawing;
        canvas.onmousemove = draw;
      }
    
    resizeCanvas();

    const cle_bth = document.getElementById('clear_bth');
    socket = io.connect("http://127.0.0.1:3000");

    socket.on('initialState', function(data) {
      currentThickness = data.thickness;
      currentColor = data.color;
      context.lineWidth = currentThickness;
      context.strokeStyle = currentColor;
      thickness.value = currentThickness;
      color.value = currentColor;
    });
  

    cle_bth.addEventListener('click', function() {
      clearCanvas();
      socket.emit('clear');
    });

    socket.on('clear_canvas', function(){
      clearCanvas();
    });

    socket.on('changeThin', function(data){
      context.lineWidth = data.size;
      currentThickness = data.size;
      thickness.value = currentThickness;
    });

    thickness.addEventListener('input', function() {
      var newThickness = this.value;
      context.lineWidth = newThickness;
      currentThickness = newThickness;
      socket.emit('changeThin', { size: newThickness });
    });

    socket.on('changeColor', function(data){
      context.strokeStyle = data.color;
      currentColor = data.color;
      color.value = currentColor;
    });

    color.addEventListener('input', function() {
      var newColor = this.value;
      context.strokeStyle = newColor;
      currentColor = newColor;
      socket.emit('changeColor', { color: newColor });
    });

    socket.on('drawingHistory', function(data) {
      drawingState = data;
      drawHistory();
    });

    socket.on('draw', function(data) {
      drawLine(data);
    });

    socket.on('drawingHistory', function(data) {
      drawingHistory = data;
      drawHistory();
    });
    
}


isDrawing = false;
function startDrawing(e) {
  isDrawing = true;
  context.beginPath();
  context.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
  prevX = e.pageX - canvas.offsetLeft;
  prevY = e.pageY - canvas.offsetTop;
}

var prevX, prevY;

function draw(e) {
  if (isDrawing == true) {
    var x = e.pageX - canvas.offsetLeft;
    var y = e.pageY - canvas.offsetTop;
    context.lineTo(x, y);
    context.stroke();

    socket.emit('draw', {
      x1: prevX,
      y1: prevY,
      x2: x,
      y2: y,
      color: currentColor,
      thickness: currentThickness
    });

    prevX = x;
    prevY = y;

    context.beginPath();
    context.moveTo(x, y);
  }
}

function stopDrawing() {
  isDrawing = false;	
}

function clearCanvas() {
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawLine(data) {
  context.beginPath();
  context.moveTo(data.x1, data.y1);
  context.lineTo(data.x2, data.y2);
  context.strokeStyle = data.color;
  context.lineWidth = data.thickness;
  context.stroke();
}

function drawHistory() {
  for (var i = 0; i < drawingHistory.length; i++) {
    drawLine(drawingHistory[i]);
  }
}