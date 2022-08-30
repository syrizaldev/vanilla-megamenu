const menuNavbar = document.querySelector('.navbar');
const menuInner = menuNavbar.querySelector('.menu-inner');
const menuArrow = menuNavbar.querySelector('.menu-arrow');
const menuBurger = document.querySelector('.burger');
const overlay = document.querySelector('.overlay');

// Show Hide Navbar Menu Function
const toggleMenu = () => {
	menuNavbar.classList.toggle('active');
	overlay.classList.toggle('active');
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

// Fixed Resize Window Function
const resizeWindow = () => {
	if (window.innerWidth > 991) {
		if (menuNavbar.classList.contains('active')) {
			toggleMenu();
		}
	}
};

// Initialize Event Listeners
menuBurger.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);
menuArrow.addEventListener('click', hideSubMenu);
menuInner.addEventListener('click', toggleSubMenu);
window.addEventListener('resize', resizeWindow);
