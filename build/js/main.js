'use strict';
(() => {
  const mainMenu = document.querySelector(`.main-menu`);
  const mainNavigationButton = document.querySelector(`.main-navigation__button`);
  const mainMenuButton = document.querySelector(`.main-menu__button`);

  if (mainMenu && mainMenu.classList.contains(`main-menu--no-js`)) {
    mainMenu.classList.remove(`main-menu--no-js`);
  }

  const openMenu = () => {
    if (mainMenu) {
      mainMenu.classList.add(`main-menu--open`);
    }
  };

  const closeMenu = () => {
    if (mainMenu) {
      mainMenu.classList.remove(`main-menu--open`);
    }
  };

  if (mainMenuButton) {
    mainMenuButton.addEventListener(`click`, closeMenu);
  }

  if (mainNavigationButton) {
    mainNavigationButton.addEventListener(`click`, openMenu);
  }

  const phoneInput = document.querySelector(`input[type=tel]`);
  const nameInput = document.querySelector(`#name`);
  const pattern = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
  const MAX_LENGTH = 10;
  const errorMessage = `Введите корректный номер телефона`;

  const validatePhoneNumber = () => {
    const valid = pattern.test(phoneInput.value);

    if (valid && phoneInput.value.length >= MAX_LENGTH) {
      phoneInput.value = ``;
      nameInput.value = ``;
    } else {
      phoneInput.setCustomValidity(`${errorMessage}`);
    }

    return valid;
  };

  const onPhoneInputValidate = () => {
    validatePhoneNumber();
  }

  if (phoneInput) {
    phoneInput.addEventListener(`invalid`, onPhoneInputValidate);
  }

})();
