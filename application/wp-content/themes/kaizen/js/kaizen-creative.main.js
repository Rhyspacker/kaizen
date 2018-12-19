// ==============================
// main.js
// ========================================

// ====================
// Load polyfill scripts
// ========================================

// ==============================
// polyfills.js
// ========================================

// For any polyfill scripts required to be loaded in the main.js
//

// Closest - https://github.com/jonathantneal/closest
(function (ElementProto) {
	if (typeof ElementProto.matches !== 'function') {
		ElementProto.matches = ElementProto.msMatchesSelector || ElementProto.mozMatchesSelector || ElementProto.webkitMatchesSelector || function matches(selector) {
			var element = this;
			var elements = (element.document || element.ownerDocument).querySelectorAll(selector);
			var index = 0;

			while (elements[index] && elements[index] !== element) {
				++index;
			}

			return Boolean(elements[index]);
		};
	}

	if (typeof ElementProto.closest !== 'function') {
		ElementProto.closest = function closest(selector) {
			var element = this;

			while (element && element.nodeType === 1) {
				if (element.matches(selector)) {
					return element;
				}

				element = element.parentNode;
			}

			return null;
		};
	}
})(window.Element.prototype);



// ====================
// Load vendor scripts
// ========================================

// ==============================
// vendor.main.js
// ========================================

// For any vendor scripts required to be loaded in the main.js

// Domready - https://raw.githubusercontent.com/ded/domready/master/src/ready.js
var stack = []
  , domReadyRE = /interactive|complete|loaded/
  , isReady = false

function async(fn){
  setTimeout(function(){
    fn()
  }, 0)
}

function checkStatus(){
  var item
  if(isReady) return
  if(domReadyRE.test(document.readyState)) {
    isReady = true
    while(item = stack.shift()) async(item)
    return
  }
  setTimeout(checkStatus, 10)
}
checkStatus()

var domready = function(fn){
  if(typeof fn != "function") return
  if(isReady) return async(fn)
  stack.push(fn)
}


// Picturefill 2.3.1 - https://github.com/scottjehl/picturefill
/*! Picturefill - v2.3.1 - 2015-04-09
* http://scottjehl.github.io/picturefill
* Copyright (c) 2015 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT */
window.matchMedia||(window.matchMedia=function(){"use strict";var a=window.styleMedia||window.media;if(!a){var b=document.createElement("style"),c=document.getElementsByTagName("script")[0],d=null;b.type="text/css",b.id="matchmediajs-test",c.parentNode.insertBefore(b,c),d="getComputedStyle"in window&&window.getComputedStyle(b,null)||b.currentStyle,a={matchMedium:function(a){var c="@media "+a+"{ #matchmediajs-test { width: 1px; } }";return b.styleSheet?b.styleSheet.cssText=c:b.textContent=c,"1px"===d.width}}}return function(b){return{matches:a.matchMedium(b||"all"),media:b||"all"}}}()),function(a,b,c){"use strict";function d(b){"object"==typeof module&&"object"==typeof module.exports?module.exports=b:"function"==typeof define&&define.amd&&define("picturefill",function(){return b}),"object"==typeof a&&(a.picturefill=b)}function e(a){var b,c,d,e,f,i=a||{};b=i.elements||g.getAllElements();for(var j=0,k=b.length;k>j;j++)if(c=b[j],d=c.parentNode,e=void 0,f=void 0,"IMG"===c.nodeName.toUpperCase()&&(c[g.ns]||(c[g.ns]={}),i.reevaluate||!c[g.ns].evaluated)){if(d&&"PICTURE"===d.nodeName.toUpperCase()){if(g.removeVideoShim(d),e=g.getMatch(c,d),e===!1)continue}else e=void 0;(d&&"PICTURE"===d.nodeName.toUpperCase()||!g.sizesSupported&&c.srcset&&h.test(c.srcset))&&g.dodgeSrcset(c),e?(f=g.processSourceSet(e),g.applyBestCandidate(f,c)):(f=g.processSourceSet(c),(void 0===c.srcset||c[g.ns].srcset)&&g.applyBestCandidate(f,c)),c[g.ns].evaluated=!0}}function f(){function c(){clearTimeout(d),d=setTimeout(h,60)}g.initTypeDetects(),e();var d,f=setInterval(function(){return e(),/^loaded|^i|^c/.test(b.readyState)?void clearInterval(f):void 0},250),h=function(){e({reevaluate:!0})};a.addEventListener?a.addEventListener("resize",c,!1):a.attachEvent&&a.attachEvent("onresize",c)}if(a.HTMLPictureElement)return void d(function(){});b.createElement("picture");var g=a.picturefill||{},h=/\s+\+?\d+(e\d+)?w/;g.ns="picturefill",function(){g.srcsetSupported="srcset"in c,g.sizesSupported="sizes"in c,g.curSrcSupported="currentSrc"in c}(),g.trim=function(a){return a.trim?a.trim():a.replace(/^\s+|\s+$/g,"")},g.makeUrl=function(){var a=b.createElement("a");return function(b){return a.href=b,a.href}}(),g.restrictsMixedContent=function(){return"https:"===a.location.protocol},g.matchesMedia=function(b){return a.matchMedia&&a.matchMedia(b).matches},g.getDpr=function(){return a.devicePixelRatio||1},g.getWidthFromLength=function(a){var c;if(!a||a.indexOf("%")>-1!=!1||!(parseFloat(a)>0||a.indexOf("calc(")>-1))return!1;a=a.replace("vw","%"),g.lengthEl||(g.lengthEl=b.createElement("div"),g.lengthEl.style.cssText="border:0;display:block;font-size:1em;left:0;margin:0;padding:0;position:absolute;visibility:hidden",g.lengthEl.className="helper-from-picturefill-js"),g.lengthEl.style.width="0px";try{g.lengthEl.style.width=a}catch(d){}return b.body.appendChild(g.lengthEl),c=g.lengthEl.offsetWidth,0>=c&&(c=!1),b.body.removeChild(g.lengthEl),c},g.detectTypeSupport=function(b,c){var d=new a.Image;return d.onerror=function(){g.types[b]=!1,e()},d.onload=function(){g.types[b]=1===d.width,e()},d.src=c,"pending"},g.types=g.types||{},g.initTypeDetects=function(){g.types["image/jpeg"]=!0,g.types["image/gif"]=!0,g.types["image/png"]=!0,g.types["image/svg+xml"]=b.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1"),g.types["image/webp"]=g.detectTypeSupport("image/webp","data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=")},g.verifyTypeSupport=function(a){var b=a.getAttribute("type");if(null===b||""===b)return!0;var c=g.types[b];return"string"==typeof c&&"pending"!==c?(g.types[b]=g.detectTypeSupport(b,c),"pending"):"function"==typeof c?(c(),"pending"):c},g.parseSize=function(a){var b=/(\([^)]+\))?\s*(.+)/g.exec(a);return{media:b&&b[1],length:b&&b[2]}},g.findWidthFromSourceSize=function(c){for(var d,e=g.trim(c).split(/\s*,\s*/),f=0,h=e.length;h>f;f++){var i=e[f],j=g.parseSize(i),k=j.length,l=j.media;if(k&&(!l||g.matchesMedia(l))&&(d=g.getWidthFromLength(k)))break}return d||Math.max(a.innerWidth||0,b.documentElement.clientWidth)},g.parseSrcset=function(a){for(var b=[];""!==a;){a=a.replace(/^\s+/g,"");var c,d=a.search(/\s/g),e=null;if(-1!==d){c=a.slice(0,d);var f=c.slice(-1);if((","===f||""===c)&&(c=c.replace(/,+$/,""),e=""),a=a.slice(d+1),null===e){var g=a.indexOf(",");-1!==g?(e=a.slice(0,g),a=a.slice(g+1)):(e=a,a="")}}else c=a,a="";(c||e)&&b.push({url:c,descriptor:e})}return b},g.parseDescriptor=function(a,b){var c,d=b||"100vw",e=a&&a.replace(/(^\s+|\s+$)/g,""),f=g.findWidthFromSourceSize(d);if(e)for(var h=e.split(" "),i=h.length-1;i>=0;i--){var j=h[i],k=j&&j.slice(j.length-1);if("h"!==k&&"w"!==k||g.sizesSupported){if("x"===k){var l=j&&parseFloat(j,10);c=l&&!isNaN(l)?l:1}}else c=parseFloat(parseInt(j,10)/f)}return c||1},g.getCandidatesFromSourceSet=function(a,b){for(var c=g.parseSrcset(a),d=[],e=0,f=c.length;f>e;e++){var h=c[e];d.push({url:h.url,resolution:g.parseDescriptor(h.descriptor,b)})}return d},g.dodgeSrcset=function(a){a.srcset&&(a[g.ns].srcset=a.srcset,a.srcset="",a.setAttribute("data-pfsrcset",a[g.ns].srcset))},g.processSourceSet=function(a){var b=a.getAttribute("srcset"),c=a.getAttribute("sizes"),d=[];return"IMG"===a.nodeName.toUpperCase()&&a[g.ns]&&a[g.ns].srcset&&(b=a[g.ns].srcset),b&&(d=g.getCandidatesFromSourceSet(b,c)),d},g.backfaceVisibilityFix=function(a){var b=a.style||{},c="webkitBackfaceVisibility"in b,d=b.zoom;c&&(b.zoom=".999",c=a.offsetWidth,b.zoom=d)},g.setIntrinsicSize=function(){var c={},d=function(a,b,c){b&&a.setAttribute("width",parseInt(b/c,10))};return function(e,f){var h;e[g.ns]&&!a.pfStopIntrinsicSize&&(void 0===e[g.ns].dims&&(e[g.ns].dims=e.getAttribute("width")||e.getAttribute("height")),e[g.ns].dims||(f.url in c?d(e,c[f.url],f.resolution):(h=b.createElement("img"),h.onload=function(){if(c[f.url]=h.width,!c[f.url])try{b.body.appendChild(h),c[f.url]=h.width||h.offsetWidth,b.body.removeChild(h)}catch(a){}e.src===f.url&&d(e,c[f.url],f.resolution),e=null,h.onload=null,h=null},h.src=f.url)))}}(),g.applyBestCandidate=function(a,b){var c,d,e;a.sort(g.ascendingSort),d=a.length,e=a[d-1];for(var f=0;d>f;f++)if(c=a[f],c.resolution>=g.getDpr()){e=c;break}e&&(e.url=g.makeUrl(e.url),b.src!==e.url&&(g.restrictsMixedContent()&&"http:"===e.url.substr(0,"http:".length).toLowerCase()?void 0!==window.console&&console.warn("Blocked mixed content image "+e.url):(b.src=e.url,g.curSrcSupported||(b.currentSrc=b.src),g.backfaceVisibilityFix(b))),g.setIntrinsicSize(b,e))},g.ascendingSort=function(a,b){return a.resolution-b.resolution},g.removeVideoShim=function(a){var b=a.getElementsByTagName("video");if(b.length){for(var c=b[0],d=c.getElementsByTagName("source");d.length;)a.insertBefore(d[0],c);c.parentNode.removeChild(c)}},g.getAllElements=function(){for(var a=[],c=b.getElementsByTagName("img"),d=0,e=c.length;e>d;d++){var f=c[d];("PICTURE"===f.parentNode.nodeName.toUpperCase()||null!==f.getAttribute("srcset")||f[g.ns]&&null!==f[g.ns].srcset)&&a.push(f)}return a},g.getMatch=function(a,b){for(var c,d=b.childNodes,e=0,f=d.length;f>e;e++){var h=d[e];if(1===h.nodeType){if(h===a)return c;if("SOURCE"===h.nodeName.toUpperCase()){null!==h.getAttribute("src")&&void 0!==typeof console&&console.warn("The `src` attribute is invalid on `picture` `source` element; instead, use `srcset`.");var i=h.getAttribute("media");if(h.getAttribute("srcset")&&(!i||g.matchesMedia(i))){var j=g.verifyTypeSupport(h);if(j===!0){c=h;break}if("pending"===j)return!1}}}}return c},f(),e._=g,d(e)}(window,window.document,new window.Image);

// svgxuse 1.2.3 - https://github.com/Keyamoon/svgxuse
/*!
 * @copyright Copyright (c) 2017 IcoMoon.io
 * @license   Licensed under MIT license
 *            See https://github.com/Keyamoon/svgxuse
 * @version   1.2.3
 */
(function(){if("undefined"!=typeof window&&window.addEventListener){var e=Object.create(null),m,t,d=function(){clearTimeout(t);t=setTimeout(m,100)},q=function(){},u=function(){var f;window.addEventListener("resize",d,!1);window.addEventListener("orientationchange",d,!1);window.MutationObserver?(f=new MutationObserver(d),f.observe(document.documentElement,{childList:!0,subtree:!0,attributes:!0}),q=function(){try{f.disconnect(),window.removeEventListener("resize",d,!1),window.removeEventListener("orientationchange",d,
!1)}catch(n){}}):(document.documentElement.addEventListener("DOMSubtreeModified",d,!1),q=function(){document.documentElement.removeEventListener("DOMSubtreeModified",d,!1);window.removeEventListener("resize",d,!1);window.removeEventListener("orientationchange",d,!1)})},v=function(f){function e(a){var c;void 0!==a.protocol?c=a:(c=document.createElement("a"),c.href=a);return c.protocol.replace(/:/g,"")+c.host}var d,p;window.XMLHttpRequest&&(d=new XMLHttpRequest,p=e(location),f=e(f),d=void 0===d.withCredentials&&
""!==f&&f!==p?XDomainRequest||void 0:XMLHttpRequest);return d};m=function(){function d(){--r;0===r&&(q(),u())}function n(a){return function(){!0!==e[a.base]&&(a.isXlink?a.useEl.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href","#"+a.hash):a.useEl.setAttribute("href","#"+a.hash))}}function m(a){return function(){var c=document.body,b=document.createElement("x");a.onload=null;b.innerHTML=a.responseText;if(b=b.getElementsByTagName("svg")[0])b.setAttribute("aria-hidden","true"),b.style.position=
"absolute",b.style.width=0,b.style.height=0,b.style.overflow="hidden",c.insertBefore(b,c.firstChild);d()}}function p(a){return function(){a.onerror=null;a.ontimeout=null;d()}}var a,c,l,g,r=0,b,k=!1,h;q();h=document.getElementsByTagName("use");for(g=0;g<h.length;g+=1){try{c=h[g].getBoundingClientRect()}catch(w){c=!1}(a=h[g].getAttribute("href"))?k=!1:(a=h[g].getAttributeNS("http://www.w3.org/1999/xlink","href"),k=!0);l=a&&a.split?a.split("#"):["",""];a=l[0];l=l[1];b=c&&0===c.left&&0===c.right&&0===
c.top&&0===c.bottom;c&&0===c.width&&0===c.height&&!b?a.length&&(b=e[a],!0!==b&&setTimeout(n({useEl:h[g],base:a,hash:l,isXlink:k}),0),void 0===b&&(k=v(a),void 0!==k&&(b=new k,e[a]=b,b.onload=m(b),b.onerror=p(b),b.ontimeout=p(b),b.open("GET",a),b.send(),r+=1))):b?a.length&&e[a]&&setTimeout(n({useEl:h[g],base:a,hash:l,isXlink:k}),0):void 0===e[a]?e[a]=!0:e[a].onload&&(e[a].abort(),delete e[a].onload,e[a]=!0)}h="";r+=1;d()};window.addEventListener("load",function n(){window.removeEventListener("load",
n,!1);t=setTimeout(m,0)},!1)}})();


// Smooth Scroll - https://github.com/cferdinandi/smooth-scroll
/*! smooth-scroll v15.0.2 | (c) 2018 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/smooth-scroll */
!(function(t,e){"function"==typeof define&&define.amd?define([],(function(){return e(t)})):"object"==typeof exports?module.exports=e(t):t.SmoothScroll=e(t)})("undefined"!=typeof global?global:"undefined"!=typeof window?window:this,(function(t){"use strict";var e={ignore:"[data-scroll-ignore]",header:null,topOnEmptyHash:!0,speed:500,speedAsDuration:!1,durationMax:null,durationMin:null,clip:!0,offset:0,easing:"easeInOutCubic",customEasing:null,updateURL:!0,popstate:!0,emitEvents:!0},n=function(){return"querySelector"in document&&"addEventListener"in t&&"requestAnimationFrame"in t&&"closest"in t.Element.prototype},o=function(){var t={};return Array.prototype.forEach.call(arguments,(function(e){for(var n in e){if(!e.hasOwnProperty(n))return;t[n]=e[n]}})),t},r=function(e){return!!("matchMedia"in t&&t.matchMedia("(prefers-reduced-motion)").matches)},a=function(e){return parseInt(t.getComputedStyle(e).height,10)},i=function(t){var e;try{e=decodeURIComponent(t)}catch(n){e=t}return e},u=function(t){"#"===t.charAt(0)&&(t=t.substr(1));for(var e,n=String(t),o=n.length,r=-1,a="",i=n.charCodeAt(0);++r<o;){if(0===(e=n.charCodeAt(r)))throw new InvalidCharacterError("Invalid character: the input contains U+0000.");e>=1&&e<=31||127==e||0===r&&e>=48&&e<=57||1===r&&e>=48&&e<=57&&45===i?a+="\\"+e.toString(16)+" ":a+=e>=128||45===e||95===e||e>=48&&e<=57||e>=65&&e<=90||e>=97&&e<=122?n.charAt(r):"\\"+n.charAt(r)}var u;try{u=decodeURIComponent("#"+a)}catch(t){u="#"+a}return u},c=function(t,e){var n;return"easeInQuad"===t.easing&&(n=e*e),"easeOutQuad"===t.easing&&(n=e*(2-e)),"easeInOutQuad"===t.easing&&(n=e<.5?2*e*e:(4-2*e)*e-1),"easeInCubic"===t.easing&&(n=e*e*e),"easeOutCubic"===t.easing&&(n=--e*e*e+1),"easeInOutCubic"===t.easing&&(n=e<.5?4*e*e*e:(e-1)*(2*e-2)*(2*e-2)+1),"easeInQuart"===t.easing&&(n=e*e*e*e),"easeOutQuart"===t.easing&&(n=1- --e*e*e*e),"easeInOutQuart"===t.easing&&(n=e<.5?8*e*e*e*e:1-8*--e*e*e*e),"easeInQuint"===t.easing&&(n=e*e*e*e*e),"easeOutQuint"===t.easing&&(n=1+--e*e*e*e*e),"easeInOutQuint"===t.easing&&(n=e<.5?16*e*e*e*e*e:1+16*--e*e*e*e*e),t.customEasing&&(n=t.customEasing(e)),n||e},s=function(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)},l=function(e,n,o,r){var a=0;if(e.offsetParent)do{a+=e.offsetTop,e=e.offsetParent}while(e);return a=Math.max(a-n-o,0),r&&(a=Math.min(a,s()-t.innerHeight)),a},d=function(t){return t?a(t)+t.offsetTop:0},f=function(t,e){var n=e.speedAsDuration?e.speed:Math.abs(t/1e3*e.speed);return e.durationMax&&n>e.durationMax?e.durationMax:e.durationMin&&n<e.durationMin?e.durationMin:n},m=function(e){if(history.replaceState&&e.updateURL&&!history.state){var n=t.location.hash;n=n||t.pageYOffset,history.replaceState({smoothScroll:JSON.stringify(e),anchor:n||t.pageYOffset},document.title,n||t.location.href)}},h=function(t,e,n){e||history.pushState&&n.updateURL&&history.pushState({smoothScroll:JSON.stringify(n),anchor:t.id},document.title,t===document.documentElement?"#top":"#"+t.id)},p=function(e,n,o){0===e&&document.body.focus(),o||(e.focus(),document.activeElement!==e&&(e.setAttribute("tabindex","-1"),e.focus(),e.style.outline="none"),t.scrollTo(0,n))},g=function(e,n,o,r){if(n.emitEvents&&"function"==typeof t.CustomEvent){var a=new CustomEvent(e,{bubbles:!0,detail:{anchor:o,toggle:r}});document.dispatchEvent(a)}};return function(a,y){var v,S,E,b,O,I,M,A={};A.cancelScroll=function(t){cancelAnimationFrame(M),M=null,t||g("scrollCancel",v)},A.animateScroll=function(n,r,a){var i=o(v||e,a||{}),u="[object Number]"===Object.prototype.toString.call(n),m=u||!n.tagName?null:n;if(u||m){var y=t.pageYOffset;i.header&&!b&&(b=document.querySelector(i.header)),O||(O=d(b));var S,E,I,C=u?n:l(m,O,parseInt("function"==typeof i.offset?i.offset(n,r):i.offset,10),i.clip),w=C-y,L=s(),H=0,q=f(w,i),x=function(e,o){var a=t.pageYOffset;if(e==o||a==o||(y<o&&t.innerHeight+a)>=L)return A.cancelScroll(!0),p(n,o,u),g("scrollStop",i,n,r),S=null,M=null,!0},Q=function(e){S||(S=e),H+=e-S,E=H/parseInt(q,10),E=E>1?1:E,I=y+w*c(i,E),t.scrollTo(0,Math.floor(I)),x(I,C)||(M=t.requestAnimationFrame(Q),S=e)};0===t.pageYOffset&&t.scrollTo(0,0),h(n,u,i),g("scrollStart",i,n,r),A.cancelScroll(!0),t.requestAnimationFrame(Q)}};var C=function(e){if(!r()&&0===e.button&&!e.metaKey&&!e.ctrlKey&&"closest"in e.target&&(E=e.target.closest(a))&&"a"===E.tagName.toLowerCase()&&!e.target.closest(v.ignore)&&E.hostname===t.location.hostname&&E.pathname===t.location.pathname&&/#/.test(E.href)){var n=u(i(E.hash)),o=v.topOnEmptyHash&&"#"===n?document.documentElement:document.querySelector(n);o=o||"#top"!==n?o:document.documentElement,o&&(e.preventDefault(),m(v),A.animateScroll(o,E))}},w=function(t){if(null!==history.state&&history.state.smoothScroll&&history.state.smoothScroll===JSON.stringify(v)){var e=history.state.anchor;e&&0!==e&&!(e=document.querySelector(u(i(history.state.anchor))))||A.animateScroll(e,null,{updateURL:!1})}},L=function(t){I||(I=setTimeout((function(){I=null,O=d(b)}),66))};return A.destroy=function(){v&&(document.removeEventListener("click",C,!1),t.removeEventListener("resize",L,!1),t.removeEventListener("popstate",w,!1),A.cancelScroll(),v=null,S=null,E=null,b=null,O=null,I=null,M=null)},A.init=function(r){if(!n())throw"Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";A.destroy(),v=o(e,r||{}),b=v.header?document.querySelector(v.header):null,O=d(b),document.addEventListener("click",C,!1),b&&t.addEventListener("resize",L,!1),v.updateURL&&v.popstate&&t.addEventListener("popstate",w,!1)},A.init(y),A}}));



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
    hasScrolled: "has--scrolled",
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
  },

  noScroll: function(value) {
    if (value == true) {
      app.globals.body.classList.add(app.globals.states.noScroll);
    }
    if (value == false) {
      app.globals.body.classList.remove(app.globals.states.noScroll);
    }
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

// ==============================
// components.js
// ========================================

//#=include component-name/component-name.js
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

// ==============================
// header.js
// ========================================

app.header = {

  config: {
    header: '.header',
    headerNav: '.header__nav',
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
    var headerNav = header.querySelector(self.config.headerNav);

    menuTrigger.addEventListener("click", function() {
      if (self.isActive==false) {
        self.openMenu(header, headerNav);
      }
      else if (self.isActive==true) {
        self.closeMenu(header, headerNav);
      }
    });
  },

  openMenu: function(header, headerNav) {
    var self = this;

    header.classList.add(app.globals.states.active);
    headerNav.setAttribute("aria-expanded", true);
    app.globals.noScroll(true);
    self.isActive = true;
  },

  closeMenu: function(header, headerNav) {
    var self = this;

    header.classList.remove(app.globals.states.active);
    headerNav.setAttribute("aria-expanded", false);
    app.globals.noScroll(false);
    self.isActive = false;
  },
};

domready(function () {
  app.header.init();
});

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

    card.addEventListener("click", function() {
      cardLink.click();
    })
  },
};

domready(function () {
  app.card.init();
});

//=include smooth-scroll/smooth-scroll.js

