(function(a,b){if("function"==typeof define&&define.amd)define(["exports"],b);else if("undefined"!=typeof exports)b(exports);else{var c={exports:{}};b(c.exports),a.index=c.exports}})(this,function(a){"use strict";function b(a){return e(a)||d(a)||c()}function c(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function d(a){if(Symbol.iterator in Object(a)||"[object Arguments]"===Object.prototype.toString.call(a))return Array.from(a)}function e(a){if(Array.isArray(a)){for(var b=0,c=Array(a.length);b<a.length;b++)c[b]=a[b];return c}}Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var f=function(a,c,d){return function(e){var f="undefined"==typeof d?"[data-dominero-".concat(e,"]"):"[data-dominero-".concat(e,"=\"% ").concat(d,"\"]"),g=a.matches(f)?[a]:b(a.querySelectorAll(f));g.forEach(function(a){var b=a.getAttribute("data-dominero-".concat(e));if(b.startsWith("-> ")){var d=b.includes(" % ")?b.substr(3).split(" % ")[0]:b.substr(3);a.setAttribute(d,c[e])}else a.textContent=c[e]})}},g=function(a,b){var c=new Proxy(a,{set:function e(a,c,d){return a[c]=d,b.forEach(function(a){return a(c)}),!0}});return Object.keys(a).forEach(function(a){return b.forEach(function(b){return b(a)})}),c};a.default=function(a,c){var d=2<arguments.length&&arguments[2]!==void 0?arguments[2]:{};return Array.isArray(a)?g(c,a.map(function(a){return f(a,c,d.name)})):"NodeList"===a.constructor.name?g(c,b(a).map(function(a){return f(a,c,d.name)})):g(c,[f(a,c,d.name)])}});
