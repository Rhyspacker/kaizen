// ==============================
// hero.js
// ========================================

app.hero = {

  config: {
    component: '.hero',
    heroScrollTrigger: '.hero__scroll'
  },

  init: function() {
    var self = this;

    var hero = document.querySelector(self.config.component);

    if (hero !== null) {
      self.handleScrollClick(hero);
    }
  },

  handleScrollClick: function(hero) {
    var self = this;

    var heroScrollTrigger = hero.querySelector(self.config.heroScrollTrigger);
    var header = document.querySelector(".header");

    var scroll = new SmoothScroll();


    heroScrollTrigger.addEventListener("click", function() {
      scroll.animateScroll(header);
    })
  },

};

domready(function () {
  app.hero.init();
});
