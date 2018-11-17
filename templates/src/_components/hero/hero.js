// ==============================
// hero.js
// ========================================

app.hero = {

  config: {
    component: '.hero',
  },

  init: function() {
    var self = this;

    var components = document.querySelectorAll(self.config.component);

    if (components.length) {

      for (var i=0; i<components.length; i++) {
        var component = components[i];

        self.componentFunction(component);
      }

    }

  },

  componentFunction: function(component) {
    var self = this;
  },

};

domready(function () {
  app.hero.init();
});
