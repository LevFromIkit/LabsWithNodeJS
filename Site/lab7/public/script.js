var products = [
    {
        name: "Фара левая ВАЗ 2113-2115",
        imageUrl: "07e5lsowwt02lhnknwvpi2spub9wefyd.jpg",
        href: "/fara",
        discount: 10,
        commonPrice: 1650
    },
    {
        name: "Фонарь правый ВАЗ 2113-2115",
        imageUrl: "12875.970.png",
        href: "/fonar",
        discount: 25,
        commonPrice: 2000
    },
    {
        name: "Колесо ВАЗ 2113-2115",
        imageUrl: "d2a533a1396a3a8f91ed80031217faf4.jpg",
        href: "/koleso",
        discount: 15,
        commonPrice: 3700
    },
    {
        name: "Спойлер ВАЗ 2113-2114",
        imageUrl: "Zadnij-spojler-VAZ-2113-2114-neokrashennyj-13972-2-800x600.jpg",
        href: "/spoiler",
        discount: 5,
        commonPrice: 4550
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
  