function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
	if (support === true) {
		document.querySelector('html').classList.add('_webp');
	} else {
		document.querySelector('html').classList.add('_no-webp');
	}
});
// присвоение классов (бургер)
// убирание классов при клике на линк в меню(linksArticles...linksSignIn)
// блокировка скрола за приделами бургера (bodyLock)

// Меню бургер
const burger = document.querySelector('.burger');
const menuBody = document.querySelector('.menu__body');
if (burger) {
	burger.addEventListener("click", function (e) {
		document.body.classList.toggle('_lock');
		burger.classList.toggle('_active');
		menuBody.classList.toggle('_active');
	});
}
/*
//========================================================================================================================================================
// Прокрутка при клике
//========================================================================================================================================================
//Добавляем в html к пунктам навигации дата атрибут "data-goto= ".class к обьекту или модификатор класса" "(с тойчкой),
//также добавляем теже класс или модификатор обьекту к которому хоти докрутить
//
//const menuLinks = document.querySelectorAll('.menu__link[data-goto]'); 
//(поиски всех обьектов с классом ".menu__link" у которых есть [data-goto]

const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
		const menuLink = e.target;
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;
			//прокрутка с бургер меню с закрытием его	
			if (burger.classList.contains('_active')) {
				document.body.classList.remove('_lock');
				burger.classList.remove('_active');
				menuBody.classList.remove('_active');
			}

			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});
			//отключение работы ссылки
			e.preventDefault();
		}
	}
}
//========================================================================================================================================================
//навигация в футере
const footerLinks = document.querySelectorAll('.footer__link[data-goto]');
if (footerLinks.length > 0) {
	footerLinks.forEach(footerLink => {
		footerLink.addEventListener("click", onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
		const footerLink = e.target;
		if (footerLink.dataset.goto && document.querySelector(footerLink.dataset.goto)) {
			const gotoBlock = document.querySelector(footerLink.dataset.goto);
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;
			//прокрутка с бургер меню с закрытием его	


			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});
			//отключение работы ссылки
			e.preventDefault();
		}
	}
}

*/

/*
(function () {
	const burger = document.querySelector('.burger');
	const menuList = document.querySelector('.menu__body');
	const bodyLock = document.querySelector('body');
	let menuLink = document.querySelector('.menu__link');
	
	burger.addEventListener('click', () => {
		burger.classList.toggle('_active');
	});
	burger.addEventListener('click', () => {
		menuList.classList.toggle('_active');
	});
	burger.addEventListener('click', () => {
		bodyLock.classList.toggle('body-lock');
	});
	burger.addEventListener('click', () => {
		menuLink.classList.toggle('_active');
	});
}());
*/
//присвоение класса при скроле
// для навешивания BG+ что бы меню стало видно
/*
(function (){
	const header = document.querySelector('.header');
	window.onscroll = () => {
		if (window.pageYOffset > 50) {
			header.classList.add('header_active');
		} else {
			header.classList.remove('header_active');
		}
	}
}());
*/

// Scroll to anchors (плавный скрол по странице)
// нажимая на навигационное меню идет плавный скрол этой часте на странице
// нужно указать класс главнего блока (.header)+ в html в навигацию каждему
// элементу добавить класс (js-scroll), и привязать все по ID
// 

(function () {
    const smoothScroll = function (targetEl, duration) {
        const headerElHeight =  document.querySelector('.header').clientHeight;
        let target = document.querySelector(targetEl);
        let targetPosition = target.getBoundingClientRect().top - (1.8 * headerElHeight) ;
        let startPosition = window.pageYOffset;
        let startTime = null;
    
        const ease = function(t,b,c,d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };
    
        const animation = function(currentTime){
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition, duration);
            window.scrollTo(0,run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };
        requestAnimationFrame(animation);
		  	if (burger.classList.contains('_active')) {
				document.body.classList.remove('_lock');
				burger.classList.remove('_active');
				menuBody.classList.remove('_active');
			}
    };

    const scrollTo = function () {
        const links = document.querySelectorAll('.js-scroll');
        links.forEach(each => {
            each.addEventListener('click', function () {
                const currentTarget = this.getAttribute('href');
                smoothScroll(currentTarget, 1000);
            });
        });
    };
    scrollTo();
}());

//========================================================================================================================================================

//Навешивание класа при клике на блок
let userIcon = document.querySelector('.user-act-header');
let userMenu = document.querySelector('.user-act-header__list');
userIcon.addEventListener("click", function (e) {
	userMenu.classList.toggle('_active');
});
//уберает класс при клике в любом другом месте, кроме этого болка и дочерних элеменов
document.documentElement.addEventListener("click", function (e) {
	if (!e.target.closest('.user-act-header')) {
		userMenu.classList.remove('_active');
	}
});
let fullScreen = new Swiper('.fullscreen-slider', {
   navigation: {
		nextEl: '.control-slider-fullscreen__right',
		prevEl: '.control-slider-fullscreen__left',
	},
	loop: true,
	// Включение/отключение
	// перетаскивания на ПК
	simulateTouch: true,
	// Чувствительность свайпа
	touchRatio: 1,
	// Угол срабатывания свайпа/перетаскивания
	touchAngle: 45,
	// Курсор перетаскивания
	grabCursor: true,
	keyboard: {
		// Включить\выключить
		enabled: true,
		// Включить\выключить
		// только когда слайдер
		// в пределах вьюпорта
		onlyInViewport: true,
		// Включить\выключить
		// управление клавишами
		// pageUp, pageDown
		pageUpDown: true,
	},

	// Количество слайдов для показа
	slidesPerView: 1,
	// Количество пролистываемых слайдов
	slidesPerGroup: 1,
	// Бесконечный слайдер
	//loop: true,
	
 });


 const swiper = new Swiper('.slider-lots', {
  // Optional parameters
  loop: true,
   slidesPerView: 3,
   spaceBetween: 89.5,

  // Navigation arrows
  navigation: {
    nextEl: '.control-slider-lots__arrow_r',
    prevEl: '.control-slider-lots__arrow_l',
  },


   breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    605: {
      slidesPerView: 2,
      spaceBetween: 60
    },
    990: {
      slidesPerView: 3,
      spaceBetween: 89.5
    }
	}
});




 const quotesSlider = new Swiper('.slider-quotes', {
  // Optional parameters
  loop: true,
   slidesPerView: 1,

  // Navigation arrows
  navigation: {
    nextEl: '.controls-slider-quotes__link',
  },
	effect: 'fade',
	fadeEffect: {
		crossFade:true
	},
	autoplay: {
		// Пауза между прокруткой
		delay: 10000,
		// Закончить на последнем слайде
		stopOnLastSlide: true,
		// Отключить после ручного переключения
		disableOnInteraction: true,
	},


});
 /*
autoplay: {
		// Пауза между прокруткой
		delay: 7000,
		// Закончить на последнем слайде
		stopOnLastSlide: false,
		// Отключить после ручного переключения
		disableOnInteraction: false,
	},
 */