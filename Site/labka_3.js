var products = 
    [
        {name:"apple", count: 5, price: 70},
        {name:"orange", count: 10, price: 90}
    ]

var result = 0;
products.forEach((element) => result+=element.count*element.price)

console.log("Итоговая сумма: ", result)

object = 
{
  bill:[
    {name:"apple", count: 5, price: 70},
    {name:"orange", count: 10, price: 90}
  ],
  result: 12345
}

console.log(JSON.stringify(object));

console.log("Текущее время: " + new Date())


document.getElementById('copyButton').addEventListener('click', function() {
  var menuItems = document.querySelectorAll('#li-copy li');
  var textContainer = document.getElementById('copyParagraph');
  var menuText = '';

  menuItems.forEach(function(item) {
    menuText += item.textContent + ' ';
  });

  textContainer.textContent += menuText;
});



const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  var menuItems = document.querySelectorAll('#li-copy li');
  menuItems.forEach(item => {
    var itemText = item.textContent.toLowerCase();
      var regex = new RegExp('(' + searchTerm + ')', 'gi');
      var highlightedText = itemText.replace(regex, '<span class="highlight">$1</span>');

      item.innerHTML = highlightedText;
  });
});


const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const worker = new Worker('web_workers.js');
worker.postMessage(data);
worker.onmessage = function(event) {
  console.log('Результат Web Worker:', event.data);
};