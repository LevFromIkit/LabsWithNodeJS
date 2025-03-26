var slideIndex = 1;
showSlides(slideIndex);
            
function plusSlides(n) {
  showSlides(slideIndex += n);
}
            
function currentSlide(n) {
  showSlides(slideIndex = n);
}
            
function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

setInterval(function() {
  plusSlides(1);
}, 3000);



var products = [
  {
      name: "Фара ВАЗ 2113-2115",
      imageUrl: "aU_SY7axxabk1EerjBJIfyjAxaJuws-k-800x500w.jpg",
      href: "product.html",
      discount: 10,
      commonPrice: 155000
  },
  {
      name: "Фонарь ВАЗ 2113-2115",
      imageUrl: "12874.970.png",
      href: "product.html",
      discount: 25,
      commonPrice: 200000
  },
];

// Находим контейнер для карточек
var cardsContainer = document.querySelector('.container_cards');

// Проходимся по каждому товару в массиве и создаем карточку
products.forEach(function(product) {
  // Создаем элементы для карточки
  var card = document.createElement('div');
  card.classList.add('card');

  var cardTop = document.createElement('div');
  cardTop.classList.add('card_top');

  var cardImgLink = document.createElement('a');
  cardImgLink.classList.add('card_img');
  cardImgLink.href = product.href;

  var cardImg = document.createElement('img');
  cardImg.src = product.imageUrl;
  cardImg.alt = product.name;

  var cardLabel = document.createElement('div');
  cardLabel.classList.add('card_label');
  cardLabel.textContent = '-' + product.discount + '%';

  var cardBottom = document.createElement('div');
  cardBottom.classList.add('card_bottom');

  var cardPrices = document.createElement('div');
  cardPrices.classList.add('card_prices');

  var cardPriceDiscount = document.createElement('div');
  cardPriceDiscount.classList.add('card_price', 'card_price--discount');
  cardPriceDiscount.textContent = product.commonPrice * (1 - product.discount / 100);

  var cardPriceCommon = document.createElement('div');
  cardPriceCommon.classList.add('card_price', 'card_price--common');
  cardPriceCommon.textContent = product.commonPrice;

  var cardTitleLink = document.createElement('a');
  cardTitleLink.classList.add('card_title');
  cardTitleLink.href = product.href;
  cardTitleLink.textContent = product.name;

  var cardButton = document.createElement('button');
  cardButton.classList.add('card_bth');
  cardButton.textContent = 'В корзину';

  // Собираем карточку
  cardImgLink.appendChild(cardImg);
  cardTop.appendChild(cardImgLink);
  cardTop.appendChild(cardLabel);
  cardBottom.appendChild(cardPrices);
  cardPrices.appendChild(cardPriceDiscount);
  cardPrices.appendChild(cardPriceCommon);
  cardBottom.appendChild(cardTitleLink);
  cardBottom.appendChild(cardButton);
  card.appendChild(cardTop);
  card.appendChild(cardBottom);

  // Добавляем карточку в контейнер
  cardsContainer.appendChild(card);
});
