// ==============================
// hero.js
// ========================================

app.hero = {

  config: {
    component: '.hero',
    heroScrollTrigger: '.hero__scroll'
  },

  breakpoint: 768,
  isPortrait: null,

  init: function() {
    var self = this;

    var hero = document.querySelector(self.config.component);

    if (hero !== null) {
      self.handleScrollClick(hero);
      self.setMobileDeviceHeight(hero);
      hero.classList.add("has--loaded");
    }
  },

  handleScrollClick: function(hero) {
    var self = this;

    var heroScrollTrigger = hero.querySelector(self.config.heroScrollTrigger);
    var header = document.querySelector(".header");

    var scroll = new SmoothScroll();

    // On click let's scroll user to main content
    heroScrollTrigger.addEventListener("click", function() {
      scroll.animateScroll(header);
    })
  },

  setMobileDeviceHeight: function(hero) {
    var self = this;

    // First check whether we are below the breakpoint
    if (self.getWindowWidth() < self.breakpoint) {

      // Initially set the isPortrait state value
      if (self.getWindowWidth() < self.getWindowHeight()) {
        self.isPortrait = true;
      }
      else {
        self.isPortrait = false;
      }

      // Initially set the hero to be window height on load
      hero.style.height = self.getWindowHeight() + "px";

      // Add resize event to window and work out orientation, if it changes recalculate hero height
      window.addEventListener("resize", throttle(function() {
        if (self.getWindowWidth() < self.getWindowHeight() && self.isPortrait == false) {
          hero.style.height = self.getWindowHeight() + "px";
          self.isPortrait = true;
        }
        else if (self.getWindowWidth() > self.getWindowHeight() && self.isPortrait == true) {
          hero.style.height = self.getWindowHeight() + "px";
          self.isPortrait = false;
        }
      }, 500))

    }
  },

  getWindowWidth: function() {
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    return width;
  },

  getWindowHeight: function() {
    var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    return height;
  },
};

domready(function () {
  app.hero.init();
});
