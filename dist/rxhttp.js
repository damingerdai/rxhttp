!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("request"),require("rxjs")):"function"==typeof define&&define.amd?define(["request","rxjs"],e):"object"==typeof exports?exports.http=e(require("request"),require("rxjs")):t.http=e(t.request,t.rxjs)}(global,function(t,e){return function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){"use strict";e.__esModule=!0;var n=r(1),o=function(){function t(){this.requestService=new n.RequestService}return t.prototype.get=function(t,e,r){var n=this.toReuqest("get",t,{},e,r||{});return this.requestService.http(n)},t.prototype.post=function(t,e,r){var n=this.toReuqest("post",t,e,{},r||{});return this.requestService.http(n)},t.prototype.put=function(t,e,r){var n=this.toReuqest("put",t,e,{},r||{});return this.requestService.http(n)},t.prototype.delete=function(t,e){var r=this.toReuqest("delete",t,{},{},e||{});return this.requestService.http(r)},t.prototype.addFilter=function(t){return t&&this.requestService.filterChain.addFilter(t),this},t.prototype.addFilters=function(){for(var t=this,e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];return e&&e.length>0&&e.forEach(function(e){return t.requestService.filterChain.addFilter(e)}),this},t.prototype.toReuqest=function(t,e,r,n,o){return{method:t,url:e,data:r||{},params:n||{},headers:o||{}}},t}();e.RxHttpService=o},function(t,e,r){"use strict";var n=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};e.__esModule=!0;var o=n(r(2)),i=r(3),u=r(4),s=function(){function t(){if(!o.default)throw Error("fail to find request");this.filterChain=new u.FilterChain}return t.prototype.http=function(t){this.filterChain.doFilter(t);return i.Observable.create(function(e){o.default({method:t.method,url:t.url,headers:t.headers||{},qs:t.params||{},body:t.data||{},json:!0},function(t,r,n){t||200!=r.statusCode?e.error(t||"http error"):e.next(n)})})},t}();e.RequestService=s},function(e,r){e.exports=t},function(t,r){t.exports=e},function(t,e,r){"use strict";e.__esModule=!0;var n=function(){function t(){this.filters=[]}return t.prototype.doFilter=function(t){this.filters&&this.filters.length>0&&this.filters.forEach(function(e){return e.doFilter(t)})},t.prototype.addFilter=function(){for(var t=this,e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];return e&&e.length>0&&e.forEach(function(e){return t.filters.push(e)}),this},t}();e.FilterChain=n}])});