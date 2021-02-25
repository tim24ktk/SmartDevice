'use strict';
(() => {

  const accordionButtons = document.querySelectorAll(`.footer-navigation__heading`);
  const phone = document.querySelector(`#phone`);
  const popupPhone = document.querySelector(`#popup-phone`);
  const ESCAPE = `Escape`;
  const feedbackForm = document.querySelector(`.feedback__form`);
  const firstName = document.querySelector(`#name`);
  const yourPhone = document.querySelector(`#phone`);
  const yourQuestion = document.querySelector(`#question`);
  const popup = document.querySelector(`.popup`);
  const popupFeedback = popup.querySelector(`.popup__feedback`);
  const popupName = document.querySelector(`#popup-name`);
  const popupQuestion = document.querySelector(`#popup-question`);
  const orderCall = document.querySelector(`.order-call`);
  const popupClose = document.querySelector(`.popup__close`);
  const popupWrapper = popup.querySelector(`.popup__wrapper`);
  const body = document.querySelector(`body`);
  const navigationPanels = document.querySelectorAll(`.footer-navigation__panel`);
  const anchors = document.querySelectorAll(`a.scroll-to`);

  anchors.forEach((anchor) => {
    anchor.addEventListener(`click`, function (evt) {
      evt.preventDefault();

      const blockID = anchor.getAttribute(`href`)

      document.querySelector(blockID).scrollIntoView({
        behavior: `smooth`,
        block: `start`
      })
    })
  });

  let isStorageSupport = true;
  let storageName = ``;
  let storagePhone = ``;
  let storageQuestion = ``;

  if (navigationPanels) {
    navigationPanels.forEach((panel) => {
      if (panel.classList.contains(`footer-navigation__panel--active`)) {
        panel.classList.remove(`footer-navigation__panel--active`);
      }
    });
  }

  if (accordionButtons) {
    let activePanel;
    accordionButtons.forEach(function(item) {
      if (item.classList.contains(`footer-navigation__heading--no-js`)) {
        item.classList.remove(`footer-navigation__heading--no-js`)
      }
      item.addEventListener('click', function() {
        this.classList.add(`footer-navigation__heading--active`);
        this.nextElementSibling.classList.add('footer-navigation__panel--active');
        if (activePanel) {
          activePanel.classList.remove(`footer-navigation__heading--active`);
          activePanel.nextElementSibling.classList.remove('footer-navigation__panel--active');
        }
        activePanel = (activePanel === this) ? 0 : this;
      });
    });
  }

  const setCursorPosition = (pos, elem) => {
    elem.focus();
    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
        const range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd(`character`, pos);
        range.moveStart(`character`, pos);
        range.select();
    }
  }

  function mask(event) {
    const matrix = `+7(___)___-__-__`;
    let i = 0;
    const def = matrix.replace(/\D/g, ``);
    let val = this.value.replace(/\D/g, ``);
    if (def.length >= val.length) val = def;
    this.value = matrix.replace(/./g, function(a) {
      return /[_\d]/.test(a) && i <= val.length ? val.charAt(i++) : i < val.length ? a : i++ === 1 && val.length === 1 && event.keyCode != 8 && event.keyCode != `` ? `(` : ``;
    });
    if (event.type === `blur`) {
        if (this.value.length === 3) this.value = ``;
    } else setCursorPosition(this.value.length, this)
  };

  phone.addEventListener(`input`, mask, false);
  phone.addEventListener(`focus`, mask, false);
  phone.addEventListener(`blur`, mask, false);
  popupPhone.addEventListener(`input`, mask, false);
  popupPhone.addEventListener(`focus`, mask, false);
  popupPhone.addEventListener(`blur`, mask, false);

  try {

    storageName = localStorage.getItem(`name`);
    storagePhone = localStorage.getItem(`phone`);
    storageQuestion = localStorage.getItem(`question`);

  } catch (err) {
    isStorageSupport = false;
  }

  if (orderCall) {
    orderCall.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      popup.classList.add(`popup--active`);
      body.classList.add(`body-position`);
      popupName.focus();
      if (storageName) {
        popupName.value = storageName;
        if (storagePhone) {
          popupPhone.focus();
        }
      }

      if (storagePhone) {
        popupPhone.value = storagePhone;
        if (popupQuestion) {
          popupQuestion.focus();
        }
      }

      if (storageQuestion) {
        popupQuestion.value = storageQuestion;
      }
    });
  }

  const setItem = (name, phone, question) => {
    localStorage.setItem(`name`, name.value);
    localStorage.setItem(`phone`, phone.value);
    localStorage.setItem(`question`, question.value);
  }

  if (feedbackForm) {
    feedbackForm.addEventListener(`submit`, (evt) => {
      if (!firstName.value || !yourPhone.value) {
        evt.preventDefault();
      } else {
        setItem(firstName, yourPhone, yourQuestion);
      }
    });
  }

  if (popupFeedback) {
    popupFeedback.addEventListener(`submit`, (evt) => {
      if (!popupName.value || !popupPhone.value) {
        evt.preventDefault();
      } else {
        setItem(popupName, popupPhone, popupQuestion);
      }
    });
  }

  const checkEscape = (evt, escapeActionCb) => {
    if (evt.key === ESCAPE) {
      evt.preventDefault();
      escapeActionCb();
    }
  };

  const closePopup = () => {
      popup.classList.remove(`popup--active`);
      body.classList.remove(`body-position`);
  }

  const onEscapeKeydown = (evt) => {
    checkEscape(evt, closePopup);
    body.classList.remove(`body-position`);
  };

  if (popupClose) {
    popupClose.addEventListener(`click`, () => {
      popup.classList.remove(`popup--active`);
      body.classList.remove(`body-position`);
    });
  }

  if (popupWrapper) {
    popupWrapper.addEventListener(`click`, (evt) => {
      evt.stopPropagation();
    });
  }

    if (popup) {
      popup.addEventListener(`click`, function() {
        popup.classList.remove(`popup--active`);
        body.classList.remove(`body-position`);
      });
      popup.addEventListener(`keydown`, onEscapeKeydown);
    }
  })();
