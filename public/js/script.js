const menuNavbar = document.querySelector('.navbar');
const menuBurger = document.querySelector('.burger');
const overlayBg = document.querySelector('.overlay');
const menuInner = menuNavbar.querySelector('.menu-inner');
const menuArrow = menuNavbar.querySelector('.menu-arrow');

// Navbar Menu Toggle Function
function toggleMenu() {
	menuNavbar.classList.toggle('active');
	overlayBg.classList.toggle('active');
}

// Show Mobile Submenu Function
function showSubMenu(children) {
	subMenu = children.querySelector('.submenu');
	subMenu.classList.add('active');
	subMenu.style.animation = 'slideLeft 0.5s ease forwards';
	const menuTitle = children.querySelector('i').parentNode.childNodes[0].textContent;
	menuNavbar.querySelector('.menu-title').textContent = menuTitle;
	menuNavbar.querySelector('.menu-header').classList.add('active');
}

// Hide Mobile Submenu Function
function hideSubMenu() {
	subMenu.style.animation = 'slideRight 0.5s ease forwards';
	setTimeout(() => {
		subMenu.classList.remove('active');
	}, 300);

	menuNavbar.querySelector('.menu-title').textContent = '';
	menuNavbar.querySelector('.menu-header').classList.remove('active');
}

// Toggle Mobile Submenu Function
function toggleSubMenu(e) {
	if (!menuNavbar.classList.contains('active')) {
		return;
	}
	if (e.target.closest('.menu-dropdown')) {
		const children = e.target.closest('.menu-dropdown');
		showSubMenu(children);
	}
}

// Load Images use Intersection Observer
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

// Dark and Light Mode using localStorage
(function () {
	let darkMode = localStorage.getItem('darkMode');
	const darkSwitch = document.getElementById('switch');

	// Enable and Disable Darkmode
	const enableDarkMode = () => {
		document.body.classList.add('darkmode');
		localStorage.setItem('darkMode', 'enabled');
	};

	const disableDarkMode = () => {
		document.body.classList.remove('darkmode');
		localStorage.setItem('darkMode', null);
	};

	// User Already Enable Darkmode
	if (darkMode === 'enabled') {
		enableDarkMode();
	}

	// User Clicks the Darkmode Toggle
	darkSwitch.addEventListener('click', () => {
		darkMode = localStorage.getItem('darkMode');
		if (darkMode !== 'enabled') {
			enableDarkMode();
		} else {
			disableDarkMode();
		}
	});
})();

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
