const app = require('express')();
const client = require('socket.io-client');
const server = require('http').createServer(app);
const io = require('socket.io')(server);


app.use(require("express").static(__dirname+ '/'));
app.get('/', function (request, response) 
{
	response.sendFile(__dirname + '/public/index.html');
});

// Хранение состояния рисунка
var drawingHistory = [];
var thickness = 1;
var color = "#000000";


// Обработка подключений клиентов
io.on('connection', function (client) {
  console.log('Пользователь подключился: ' + client.id);

  client.on('clear', function()
	{
		drawingHistory = [];
		client.broadcast.emit('clear_canvas');
	});

  client.on('changeThin', function(data)
  {
      thickness = data.size;
      io.emit('changeThin', { size: thickness });
  });

  client.on('changeColor', function(data)
  {
    color = data.color;
    io.emit('changeColor', { color: color });
  });

  // Передача текущего состояния рисунка новому клиенту
  io.to(client.id).emit('changeThin', thickness);
  io.to(client.id).emit('changeColor', color);
  io.to(client.id).emit('drawingHistory', drawingHistory);
  io.to(client.id).emit('initialState', { thickness: thickness, color: color });

  client.on('draw', function(data) {
    // Добавить линию в историю рисования
    drawingHistory.push(data);
    // Отправить информацию о новой линии всем клиентам
    io.emit('draw', data);
  });

  // Обработка отключения клиента
  client.on('disconnect', () => {
    console.log('Пользователь отключился');
  });
});

server.listen(3000, () => {
  console.log("Сервер запущен по адресу http://127.0.0.1:3000/");
});
