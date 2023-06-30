import {initMenu} from './modules/menu';

window.addEventListener('DOMContentLoaded', () => {
  const flags = {
    US: '<img src="./../img/svg/us.svg" alt="флаг US" /><span>US</span>',
    BLR: '<img src="./../img/svg/blr.svg" alt="флаг BLR" /><span>BLR</span>',
    KZ: '<img src="./../img/svg/kz.svg" alt="флаг KZ" /><span>KZ</span>',
    NET: '<img src="./../img/svg/net.svg" alt="флаг NET" /><span>NET</span>',
    RU: '<img src="./../img/svg/ru.svg" alt="флаг RU" /><span>RU</span>',
    TUR: '<img src="./../img/svg/tur.svg" alt="флаг TUR" /><span>TUR</span>',
  };

  initMenu();
  const userList = document.querySelector('.user-nav__list');
  const langList = document.querySelector('.lang__menu');
  const langButton = document.querySelector('.lang__button');
  userList.addEventListener('click', openMenu);

  function openMenu(evt) {

    if (evt.target.nodeName !== 'SPAN') {
      return;
    }
    let subMen = evt.target.nextElementSibling;
    let curTarg = evt.target.parentNode;
    closeAllSubMenu(subMen, curTarg);
    evt.target.nextElementSibling.classList.toggle('isOpen');
  }

  function closeAllSubMenu(currentSubMenu, curTarg) {

    let parents = [];
    let subParents = [];

    if (currentSubMenu) {
      let currentParent = currentSubMenu.parentNode;

      while (currentParent) {
        if (currentParent === currentParent.parentNode) {
          break;
        }
        if (currentParent.classList.contains('user-nav__list')) {
          break;
        }
        if (currentParent.nodeName === 'UL') {
          parents.push(currentParent);
        }
        if (currentParent.nodeName === 'LI') {
          subParents.push(currentParent);
        }
        currentParent = currentParent.parentNode;
      }
    }

    if (parents.length === 0) {
      Array.from(userList.children).forEach((el) => {
        if (el !== curTarg) {
          el.classList.toggle('isClose');
        }
      });
    }

    if (subParents.length > 1) {
      Array.from(curTarg.parentNode.children).forEach((el) => {
        if (el !== curTarg) {
          subParents[1].children[0].classList.toggle('isClose');
          el.classList.toggle('animation');
          el.classList.toggle('isClose');
        }
      });
    }

    const subMenu = document.querySelectorAll('.sub-menu');

    Array.from(subMenu).forEach((item) => {
      if (item !== currentSubMenu && !parents.includes(item)) {
        item.classList.remove('isOpen');
      }
    });
  }

  function toggleTwoClasses(element, first, second, timeOfAnimation) {
    if (!element.classList.contains(first)) {
      element.classList.add(first);
      element.classList.remove(second);
      langButton.style.background = '$alice-blue';
    } else {
      langButton.style.background = 'transparent';
      window.setTimeout(function () {
        element.classList.remove(first);
      }, timeOfAnimation);
    }
  }

  langButton.addEventListener('click', () => {
    toggleTwoClasses(langList, 'lang__menu--open', 'is-hidden', 500);
    langButton.classList.add('lang__menu--open');
  });

  langList.addEventListener('click', langHandler);
  function langHandler(e) {
    if (langButton.classList.contains('lang__menu--open')) {
      let flagKey = e.target.parentNode.getAttribute('id');
      if (flagKey) {
        langButton.innerHTML = flags[flagKey];
      }
      langButton.style.background = 'transparent';
      langList.classList.remove('lang__menu--open');
      langButton.classList.remove('lang__menu--open');
    } else {
      langList.replaceChildren(langButton.children[0]);
    }
  }
});
