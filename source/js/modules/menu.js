const toggleMenu = document.querySelector('.header__button');
const headerBox = document.querySelector('.header__box');
const userNav = document.querySelector('.user-nav');

const initMenu = () => {
  toggleMenu.addEventListener('click', () => {
    if (!toggleMenu.classList.contains('header__button--close')) {
      toggleMenu.classList.add('header__button--close');
      userNav.style.display = 'flex';
      headerBox.style.height = '100vh';
    } else {
      toggleMenu.classList.remove('header__button--close');
      userNav.style.display = 'none';
      headerBox.style.height = 'auto';
    }
  });
};

export {initMenu};
