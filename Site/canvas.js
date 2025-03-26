var arr = [
  ["circle",100,150,30],
  ["square",250,100,150],
  ["ellipse",300,150,30,40],
  ["bezier curve",50, 100, 150, 5, 300, 80]
]

var canvas = document.getElementById("myCanvas2");
var circ = canvas.getContext('2d');
circ.beginPath();
circ.arc(arr[0][1],arr[0][2],arr[0][3],0,2*Math.PI);
circ.stroke();

var sq = canvas.getContext('2d');
sq.beginPath();
sq.rect(arr[1][1],arr[1][2],arr[1][3],20);
sq.stroke();

var ell = canvas.getContext('2d');
ell.beginPath();
ell.ellipse(arr[2][1],arr[2][2],arr[2][3],arr[2][4],45,0,2*Math.PI);
ell.stroke();

var bez = canvas.getContext('2d');
bez.beginPath();
bez.bezierCurveTo(arr[3][1],arr[3][2],arr[3][3],arr[3][4],arr[3][5],arr[3][6]);
bez.stroke();


var x = 0; 
function drawIt() { 
        window.requestAnimationFrame(drawIt); 
        var canvas = document.getElementById("myCanvas"); 
        var c = canvas.getContext('2d');
        c.clearRect(0,0,canvas.width,canvas.height); 
        c.fillStyle = "blue"; 
        c.fillRect(x,0,200,400); 
        x+=1;
        if (x==400)
            x = -200;
    }
drawIt();


var previousColorElement;
var canvas;
var context;

window.onload = function() {
      canvas = document.getElementById("drawingCanvas");
      context = canvas.getContext("2d");

      window.addEventListener('resize', resizeCanvas, false);
        
      function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
                    
        // Подключаем требуемые для рисования события
        canvas.onmousedown = startDrawing;
        canvas.onmouseup = stopDrawing;
        canvas.onmouseout = stopDrawing;
        canvas.onmousemove = draw;

      }
    
    resizeCanvas();
}

function changeColor(color, imgElement)
{
    // 	Меняем текущий цвет рисования
	context.strokeStyle = color;
	
	// Меняем стиль элемента <img>, по которому щелкнули
	imgElement.className = "Selected";
	
	// Возвращаем ранее выбранный элемент <img> в нормальное состояние
	if (previousColorElement != null)
	   previousColorElement.className = "";
	   
	previousColorElement = imgElement;
}

// Отслеживаем элемент для толщины линии, по которому ранее щелкнули
var previousThicknessElement;
isDrawing = false;

function changeThickness (imgElement)
{
  thickness = document.getElementById("size").value;
    
  // Изменяем текущую толщину линии
	context.lineWidth = thickness;
}

function startDrawing(e) {
	// Начинаем рисовать
	isDrawing = true;
	
	// Создаем новый путь (с текущим цветом и толщиной линии) 
	context.beginPath();
	
	// Нажатием левой кнопки мыши помещаем "кисть" на холст
	context.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
}

function draw(e) {
	if (isDrawing == true)
	{
	  	// Определяем текущие координаты указателя мыши
		var x = e.pageX - canvas.offsetLeft;
		var y = e.pageY - canvas.offsetTop;
		
		// Рисуем линию до новой координаты
		context.lineTo(x, y);
		context.stroke();
	}
}

function stopDrawing() {
  isDrawing = false;	
}

function clearCanvas() {
	context.clearRect(0, 0, canvas.width, canvas.height);
}