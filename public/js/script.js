const menuNavbar = document.querySelector('.navbar');
const menuInner = menuNavbar.querySelector('.menu-inner');
const menuArrow = menuNavbar.querySelector('.menu-arrow');
const menuBurger = document.querySelector('.burger');
const overlayBg = document.querySelector('.overlay');

// Navbar Menu Toggle Function
const toggleMenu = () => {
	menuNavbar.classList.toggle('active');
	overlayBg.classList.toggle('active');
};

// Hide Mobile Submenu Function
const hideSubMenu = () => {
	subMenu.style.animation = 'slideRight 0.5s ease forwards';
	setTimeout(() => {
		subMenu.classList.remove('active');
	}, 300);

	menuNavbar.querySelector('.menu-title').textContent = '';
	menuNavbar.querySelector('.menu-header').classList.remove('active');
};

// Show Mobile Submenu Function
const showSubMenu = (children) => {
	subMenu = children.querySelector('.submenu');
	subMenu.classList.add('active');
	subMenu.style.animation = 'slideLeft 0.5s ease forwards';
	const menuTitle = children.querySelector('i').parentNode.childNodes[0].textContent;
	menuNavbar.querySelector('.menu-title').textContent = menuTitle;
	menuNavbar.querySelector('.menu-header').classList.add('active');
};

// Toggle Mobile Submenu Function
const toggleSubMenu = (e) => {
	if (!menuNavbar.classList.contains('active')) {
		return;
	}
	if (e.target.closest('.menu-dropdown')) {
		const children = e.target.closest('.menu-dropdown');
		showSubMenu(children);
	}
};

// Load Image use Intersection Observer
if ('IntersectionObserver' in window) {
	const intersection = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.src = entry.target.dataset.src;
				observer.unobserve(entry.target);
			}
		});
	});

	document.querySelectorAll('img').forEach((image) => {
		intersection.observe(image);
	});
}

// Fixed Navbar Menu on Window Resize
window.addEventListener('resize', () => {
	if (window.innerWidth >= 992) {
		if (menuNavbar.classList.contains('active')) {
			toggleMenu();
		}
	}
});

// Initialize All Event Listeners
menuBurger.addEventListener('click', toggleMenu);
overlayBg.addEventListener('click', toggleMenu);
menuArrow.addEventListener('click', hideSubMenu);
menuInner.addEventListener('click', toggleSubMenu);
