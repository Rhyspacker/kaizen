// ==============================
// header.js
// ========================================

app.header = {

  config: {
    header: '.header',
  },

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

      if (scrollIndicatorPos <= 0) {
        header.classList.add("has--scrolled");
      }
      else {
        header.classList.remove("has--scrolled");
      }
    });
  },

  handleMenu: function(header) {
    var self = this;
  },
};

domready(function () {
  app.header.init();
});
