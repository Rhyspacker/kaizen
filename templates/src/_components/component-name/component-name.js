// ==============================
// component-name.js
// ========================================

app.component_name = {

  config: {
    component: '.component_name',
  },

  componentFunction: function(component){
    var self = this;
  },

  init: function() {
    var self = this;

    var components = document.querySelectorAll(self.config.component);

    if(components.length) {

      for(var i=0; i<components.length; i++){
        var component = components[i];

        self.componentFunction(component);
      }

    }

  }
};

domready(function () {
  app.component_name.init();
});
