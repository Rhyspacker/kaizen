// ==============================
// main.js
// ========================================

// ====================
// Load polyfill scripts
// ========================================

//=include polyfills/_polyfills.main.js

// ====================
// Load vendor scripts
// ========================================

//=include vendor/_vendor.main.js

// ====================
// App
// ========================================

var app = {};

app.globals = {

  states: {
    loading: "is--loading",
    active: "is--active",
    expanded: "is--expanded",
    noScroll: "no--scroll",
    hasMenu: "has--menu"
  },

  doc: null,
  body: null,
  page: null,

  // These should reflect css breakpoints to avoid confusion
  // unless otherwise required
  //
  breakpoints: {
    mobile: 360,
    mobileLandscape: 480,
    tablet: 768,
    tabletLandscape: 1024,
    desktop: 1025,
    wide: 1440,
    superWide: 1920
  }
};

domready(function () {
  app.globals.doc = document.documentElement;
  app.globals.body = document.getElementsByTagName('body')[0];
  app.globals.page = document.querySelector('.page');

  // Remove .no-js from html element, replace with .js
  app.globals.doc.classList.remove('no-js');
  app.globals.doc.classList.add('js');
});

// ====================
// Global Throttler
// ========================================

function throttle(fn, threshhold, scope) {
  threshhold = threshhold || (threshhold = 250);
  var last,
      deferTimer;
  return function () {
    var context = scope || this;

    var now = +new Date(),
        args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold + last - now);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}


// ====================
// Load component scripts
// ========================================

//=include ../_components/_components.js
