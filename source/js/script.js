var menuButton = document.querySelector(".main-menu__button");
var jsButton = document.querySelector(".no-js-button");
var menu = document.querySelector(".main-menu__list");
var menuWrapper = document.querySelector(".main-menu");
var menuJS = document.querySelector(".no-js-menu");

menuButton.addEventListener("click", function () {
  menuWrapper.classList.toggle("main-menu--opened");
  menu.classList.toggle("mobile-menu");
});

menuJS.classList.remove("no-js-menu");
jsButton.classList.remove("no-js-button");

// интерактивная карта
//Yandex version
ymaps.ready(init);

function init(){

    var myMap;

    myMap = new ymaps.Map('map', {
        center: (screen.width < 1300) ? ([59.93877121663107, 30.322274149999975]) : ([59.939075, 30.31965]),
        zoom: 18,
        controls: []
    });

    myMap.behaviors.disable('scrollZoom');

    myMap.controls.add("zoomControl", {
        position: {top: 100, right: 25}
    });

    var myPlacemark = new  ymaps.Placemark([59.93877121663107, 30.323274149999975] , {},
        {
          iconLayout: 'default#image',
          iconImageHref: 'img/map/map-pin.png',
          iconImageSize: (screen.width > 767) ? [124, 106] : [62, 53],
          iconImageOffset: (screen.width > 767) ? [-62, -83] : [-31, -27.5]
        });
        myMap.geoObjects.add(myPlacemark);
}

//Слайдер
var beforeBtn = document.querySelector(".example__status--before");
var coverImage = document.querySelector(".example__image--box1");
var afterBtn = document.querySelector(".example__status--after");
var scale = document.querySelector(".example__scale");
var toggle = document.querySelector(".example__toggle");

var scaleWidth = scale.offsetWidth;
var toggleWidth = toggle.offsetWidth;

var scaleX = scale.getBoundingClientRect().x;
var scaleRightEdge = scaleWidth - toggleWidth;

//Клики на "Было"/"Стало"
var toggleLeft = function () {
  scale.style.justifyContent = "flex-start";
  toggle.style.left = "";
};

var toggleRight = function () {
  scale.style.justifyContent = "flex-end";
  toggle.style.left = "";
};

var toggleToMiddle = function () {
  scale.style.justifyContent = "center";
  toggle.style.left = "";
};

var showBefore = function () {
  coverImage.style.width = "100%";
  coverImage.style.transition = "width 0.5s";
  toggleLeft();
};

var showAfter = function () {
  coverImage.style.width = "0";
  coverImage.style.transitionDuration = "0.5s";
  toggleRight();
};

beforeBtn.addEventListener("click", showBefore);
afterBtn.addEventListener("click", showAfter);
toggle.addEventListener("dblclick", toggleToMiddle);

//Перемещение toggle мышью
toggle.ondragstart = function() {
  return false;
};

toggle.addEventListener("mousedown", function (evt) {
  evt.preventDefault();

  toggle.style.position = "absolute";

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    //Координаты курсора относительно toggle-bar
    var mouseNewX = moveEvt.clientX - scaleX;

    if (mouseNewX < 0) mouseNewX = 0;
    if (mouseNewX > scaleRightEdge) mouseNewX = scaleRightEdge;
    toggle.style.left = mouseNewX + "px";

    resizeImage(mouseNewX);
  };

   var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

//Сравнение фото
var resizeImage = function (value) {

 var togglePositionRel = parseInt(value / (scaleWidth - toggleWidth) * 100);
 coverImage.style.width = 100 - togglePositionRel + "%";
}