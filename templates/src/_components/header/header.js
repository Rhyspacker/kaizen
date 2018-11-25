// ==============================
// header.js
// ========================================

app.header = {

  config: {
    header: '.header',
    menuTrigger: '.header__nav__trigger'
  },

  isActive: false,

  init: function() {
    var self = this;

    var header = document.querySelector(self.config.header);

    if (header !== null) {
      self.handleSticky(header);
      self.handleMenu(header);
    }

  },

  handleSticky: function(header) {
    var self = this;

    window.addEventListener("scroll", function() {
      var scrollIndicatorPos = header.getBoundingClientRect().top;

      if (scrollIndicatorPos < 0) {
        header.classList.add(app.globals.states.hasScrolled);
      }
      else {
        header.classList.remove(app.globals.states.hasScrolled);
      }
    });
  },

  handleMenu: function(header) {
    var self = this;

    var menuTrigger = header.querySelector(self.config.menuTrigger);

    menuTrigger.addEventListener("click", function() {
      if (self.isActive==false) {
        self.openMenu(header);
      }
      else if (self.isActive==true) {
        self.closeMenu(header);
      }
    });
  },

  openMenu: function(header) {
    var self = this;

    header.classList.add(app.globals.states.active);
    app.globals.noScroll(true);
    self.isActive = true;
  },

  closeMenu: function(header) {
    var self = this;

    header.classList.remove(app.globals.states.active);
    app.globals.noScroll(false);
    self.isActive = false;
  },
};

domready(function () {
  app.header.init();
});
