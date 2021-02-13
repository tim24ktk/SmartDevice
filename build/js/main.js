'use strict';
(() => {
  const accordionButtons = document.querySelectorAll(`.footer-navigation__heading`);

  if (accordionButtons) {
    let activePanel;
    accordionButtons.forEach(function(item) {
      item.addEventListener('click', function() {
        //show new thingy;
        this.classList.add(`footer-navigation__heading--active`);
        this.nextElementSibling.classList.add('footer-navigation__panel--active');
        //hide old thingy
        if (activePanel) {
          activePanel.classList.remove(`footer-navigation__heading--active`);
          activePanel.nextElementSibling.classList.remove('footer-navigation__panel--active');
        }
        //update thingy
        activePanel = (activePanel === this) ? 0 : this;
      });
    });
    }
})();
