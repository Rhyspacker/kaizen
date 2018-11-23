// ==============================
// Card.js
// ========================================

app.card = {

  config: {
    component: '.card',
    cardLink: '.card__link'
  },

  init: function() {
    var self = this;

    var components = document.querySelectorAll(self.config.component);

    if (components !== null) {
      for (var i = 0; i < components.length; i++) {
        var card = components[i];
        self.handleCardClicks(card);
      }
    }
  },

  handleCardClicks: function(card) {
    var self = this;
    var cardLink = card.querySelector(self.config.cardLink);
    console.log(cardLink);
    card.addEventListener("click", function() {
      cardLink.click();
    })
  },
};

domready(function () {
  app.card.init();
});
