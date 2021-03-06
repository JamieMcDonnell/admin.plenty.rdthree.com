!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):"object"==typeof exports?exports.restful=e():t.restful=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";function r(t,e){var n={baseUrl:t,port:e||80,prefixUrl:"",protocol:"http"},r=function(){var t={_http:p(f),headers:{},requestInterceptors:[],responseInterceptors:[]},e={url:function(t){var e=function(){return t.apply(this,arguments)};return e.toString=function(){return t.toString()},e}(function(){var t=n.protocol+"://"+n.baseUrl;return 80!==n.port&&(t+=":"+n.port),""!==n.prefixUrl&&(t+="/"+n.prefixUrl),t})};return i(e,t),u(function(){return t._http},e)}(),o={url:function(){return r.url()},one:function(t,e){return c(t,e,o)},all:function(t){return s(t,o)}};return o=u(a(r),o),i(o,n),o}var o=function(t){return t&&t.__esModule?t["default"]:t};t.exports=r;var u=o(n(1)),i=o(n(2)),s=o(n(3)),c=o(n(4)),a=o(n(5)),f=o(n(7)),p=o(n(6))},function(t){"use strict";function e(t){if(null==t)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t)}t.exports=Object.assign||function(t){for(var n,r,o=e(t),u=1;u<arguments.length;u++){n=arguments[u],r=Object.keys(Object(n));for(var i=0;i<r.length;i++)o[r[i]]=n[r[i]]}return o}},function(t){"use strict";function e(t,e){for(var n in e)e.hasOwnProperty(n)&&!function(n){t[n]=function(r){return arguments.length?(e[n]=r,t):e[n]}}(n)}t.exports=e},function(t,e,n){"use strict";function r(t,e){function n(n){var o=c(t,n,e);return o().headers(r.headers()).responseInterceptors(r.responseInterceptors()).requestInterceptors(r.requestInterceptors()),o}var r=i([e.url(),t].join("/"),e()),o={get:function(t,e,o){return r.get(t,e,o).then(function(t){return s(t,n)})},getAll:function(t,e){return r.getAll(t,e).then(function(t){return s(t,n)})},post:function(t,e){return r.post(t,e).then(function(t){return s(t)})},put:function(t,e,n){return r.put(t,e,n).then(function(t){return s(t)})},patch:function(t,e,n){return r.patch(t,e,n).then(function(t){return s(t)})},head:function(t,e,n){return r.head(t,e,n).then(function(t){return s(t)})},"delete":function(t,e){return r["delete"](t,e).then(function(t){return s(t)})},url:function(){return[e.url(),t].join("/")}};return u(a(r),o)}var o=function(t){return t&&t.__esModule?t["default"]:t};t.exports=r;var u=o(n(1)),i=o(n(8)),s=o(n(9)),c=o(n(4)),a=o(n(5))},function(t,e,n){"use strict";function r(t,e,n){var o=s([n.url(),t].join("/"),n()),f={get:function(t,n){return o.get(e,t,n).then(function(t){return c(t,function(){return f})})},put:function(t,n){return o.put(e,t,n).then(function(t){return c(t)})},patch:function(t,n){return o.patch(e,t,n).then(function(t){return c(t)})},head:function(t,n){return o.head(e,t,n).then(function(t){return c(t)})},"delete":function(t){return o["delete"](e,t).then(function(t){return c(t)})},one:function(t,e){return r(t,e,f)},all:function(t){return i(t,f)},url:function(){return[n.url(),t,e].join("/")}};return f=u(a(o),f)}var o=function(t){return t&&t.__esModule?t["default"]:t};t.exports=r;var u=o(n(1)),i=o(n(3)),s=o(n(8)),c=o(n(9)),a=o(n(5))},function(t,e,n){"use strict";function r(t){function e(){return t}return e=u(e,{addRequestInterceptor:function(n){return t.requestInterceptors().push(n),e},requestInterceptors:function(){return t.requestInterceptors()},addResponseInterceptor:function(n){return t.responseInterceptors().push(n),e},responseInterceptors:function(){return t.responseInterceptors},header:function(n,r){return t.headers()[n]=r,e},headers:function(){return t.headers()}})}var o=function(t){return t&&t.__esModule?t["default"]:t};t.exports=r;var u=o(n(1))},function(t,e,n){"use strict";function r(t,e,n,r){return r=void 0!==r?!!r:!1,function(o,u){if(r)try{o=JSON.parse(o)}catch(i){}for(var s in t)o=t[s](o,u,e,n);if(!r)try{o=JSON.stringify(o)}catch(i){}return o}}function o(t){var e={request:function(e,n){return n.method=e,-1!==["post","put","patch"].indexOf(e)&&(n.transformRequest=[r(n.requestInterceptors||[],n.method,n.url)],delete n.requestInterceptors),n.transformResponse=[r(n.responseInterceptors||[],n.method,n.url,!0)],delete n.responseInterceptors,t(n)}};return i(function(){return t},e)}var u=function(t){return t&&t.__esModule?t["default"]:t};t.exports=o;var i=u(n(1))},function(t,e,n){t.exports=n(10)},function(t,e,n){"use strict";function r(t,e){function n(){for(var t=a,e=[];t;)e=e.concat(t.requestInterceptors()),t=t._parent?t._parent():null;return e}function r(){for(var t=a,e=[];t;)e=e.concat(t.responseInterceptors()),t=t._parent?t._parent():null;return e}function o(){for(var t=a,e={};t;)u(e,t.headers()),t=t._parent?t._parent():null;return e}function s(t){var e=void 0===arguments[1]?{}:arguments[1],i=void 0===arguments[2]?{}:arguments[2],s=void 0===arguments[3]?null:arguments[3],c={url:t,params:e||{},headers:u({},o(),i||{}),responseInterceptors:r()};return s&&(c.data=s,c.requestInterceptors=n()),c}var c={_parent:e,headers:{},requestInterceptors:[],responseInterceptors:[]},a={get:function(e,n,r){return c._parent().request("get",s(t+"/"+e,n,r))},getAll:function(e,n){return c._parent().request("get",s(t,e,n))},post:function(e,n){return n=n||{},n["Content-Type"]||(n["Content-Type"]="application/json;charset=UTF-8"),c._parent().request("post",s(t,{},n,e))},put:function(e,n,r){return r=r||{},r["Content-Type"]||(r["Content-Type"]="application/json;charset=UTF-8"),c._parent().request("put",s(t+"/"+e,{},r,n))},patch:function(e,n,r){return r=r||{},r["Content-Type"]||(r["Content-Type"]="application/json;charset=UTF-8"),c._parent().request("patch",s(t+"/"+e,{},r,n))},"delete":function(e,n){return c._parent().request("delete",s(t+"/"+e,{},n))},head:function(e,n){return c._parent().request("head",s(t+"/"+e,{},n))}};return a=u(function(){return c._parent()},a),i(a,c),a}var o=function(t){return t&&t.__esModule?t["default"]:t};t.exports=r;{var u=o(n(1)),i=o(n(2));o(n(11))}},function(t,e,n){"use strict";var r=function(t){return t&&t.__esModule?t["default"]:t},o=r(n(12));t.exports=function(t,e){return new Promise(function(n,r){var u=t.status;return u>=200&&400>u?n(o(t,e)):void r(o(t))})}},function(t,e,n){function r(){i.forEach(arguments,function(t){f[t]=function(e,n){return f(i.merge(n||{},{method:t,url:e}))}})}function o(){i.forEach(arguments,function(t){f[t]=function(e,n,r){return f(i.merge(r||{},{method:t,url:e,data:n}))}})}var u=n(13),i=n(14),s=n(15),c=n(16),a=n(17);!function(){var t=n(20);t&&"function"==typeof t.polyfill&&t.polyfill()}();var f=t.exports=function p(t){t=i.merge({method:"get",headers:{},transformRequest:u.transformRequest,transformResponse:u.transformResponse},t),t.withCredentials=t.withCredentials||u.withCredentials;var e=[c,void 0],n=Promise.resolve(t);for(p.interceptors.request.forEach(function(t){e.unshift(t.fulfilled,t.rejected)}),p.interceptors.response.forEach(function(t){e.push(t.fulfilled,t.rejected)});e.length;)n=n.then(e.shift(),e.shift());return n.success=function(t){return s("success","then","https://github.com/mzabriskie/axios/blob/master/README.md#response-api"),n.then(function(e){t(e.data,e.status,e.headers,e.config)}),n},n.error=function(t){return s("error","catch","https://github.com/mzabriskie/axios/blob/master/README.md#response-api"),n.then(null,function(e){t(e.data,e.status,e.headers,e.config)}),n},n};f.defaults=u,f.all=function(t){return Promise.all(t)},f.spread=n(18),f.interceptors={request:new a,response:new a},r("delete","get","head"),o("post","put","patch")},function(t,e,n){"use strict";function r(t,e,n){var r={one:function(t,e){return n.one(t,e)},all:function(t){return n.all(t)},save:function(t){return n.put(e,t)},remove:function(t){return n["delete"](t)},url:function(){return n.url()},id:function(t){var e=function(){return t.apply(this,arguments)};return e.toString=function(){return t.toString()},e}(function(){return t}),data:function(t){var e=function(){return t.apply(this,arguments)};return e.toString=function(){return t.toString()},e}(function(){return e})};return u(function(){return e},r)}var o=function(t){return t&&t.__esModule?t["default"]:t};t.exports=r;var u=o(n(1))},function(t,e,n){"use strict";function r(t,e){var n={status:function(){return t.status},body:function(){var n=void 0===arguments[0]?!0:arguments[0];return n&&e?"[object Array]"===Object.prototype.toString.call(t.data)?t.data.map(function(t){return i(t.id,t,e(t.id))}):i(t.data.id,t.data,e(t.data.id)):t.data},headers:function(){return t.headers},config:function(){return t.config}};return u(function(){return t},n)}var o=function(t){return t&&t.__esModule?t["default"]:t};t.exports=r;var u=o(n(1)),i=o(n(11))},function(t,e,n){"use strict";var r=n(14),o=/^\s*(\[|\{[^\{])/,u=/[\}\]]\s*$/,i=/^\)\]\}',?\n/,s={"Content-Type":"application/x-www-form-urlencoded"};t.exports={transformRequest:[function(t,e){return r.isArrayBuffer(t)?t:r.isArrayBufferView(t)?t.buffer:!r.isObject(t)||r.isFile(t)||r.isBlob(t)?t:(!r.isUndefined(e)&&r.isUndefined(e["Content-Type"])&&(e["Content-Type"]="application/json;charset=utf-8"),JSON.stringify(t))}],transformResponse:[function(t){return"string"==typeof t&&(t=t.replace(i,""),o.test(t)&&u.test(t)&&(t=JSON.parse(t))),t}],headers:{common:{Accept:"application/json, text/plain, */*"},patch:r.merge(s),post:r.merge(s),put:r.merge(s)},xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN"}},function(t){function e(t){return"[object Array]"===m.call(t)}function n(t){return"[object ArrayBuffer]"===m.call(t)}function r(t){return"[object FormData]"===m.call(t)}function o(t){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(t):t&&t.buffer&&t.buffer instanceof ArrayBuffer}function u(t){return"string"==typeof t}function i(t){return"number"==typeof t}function s(t){return"undefined"==typeof t}function c(t){return null!==t&&"object"==typeof t}function a(t){return"[object Date]"===m.call(t)}function f(t){return"[object File]"===m.call(t)}function p(t){return"[object Blob]"===m.call(t)}function l(t){return t.replace(/^\s*/,"").replace(/\s*$/,"")}function h(t,n){if(null!==t&&"undefined"!=typeof t){var r=e(t)||"object"==typeof t&&!isNaN(t.length);if("object"==typeof t||r||(t=[t]),r)for(var o=0,u=t.length;u>o;o++)n.call(null,t[o],o,t);else for(var i in t)t.hasOwnProperty(i)&&n.call(null,t[i],i,t)}}function d(){var t={};return h(arguments,function(e){h(e,function(e,n){t[n]=e})}),t}var m=Object.prototype.toString;t.exports={isArray:e,isArrayBuffer:n,isFormData:r,isArrayBufferView:o,isString:u,isNumber:i,isObject:c,isUndefined:s,isDate:a,isFile:f,isBlob:p,forEach:h,merge:d,trim:l}},function(t){"use strict";t.exports=function(t,e,n){try{console.warn("DEPRECATED method `"+t+"`."+(e?" Use `"+e+"` instead.":"")+" This method will be removed in a future release."),n&&console.warn("For more information about usage see "+n)}catch(r){}}},function(t,e,n){(function(e){"use strict";t.exports=function(t){return new Promise(function(r,o){try{"undefined"!=typeof window?n(19)(r,o,t):"undefined"!=typeof e&&n(19)(r,o,t)}catch(u){o(u)}})}}).call(e,n(21))},function(t,e,n){"use strict";function r(){this.handlers=[]}var o=n(14);r.prototype.use=function(t,e){return this.handlers.push({fulfilled:t,rejected:e}),this.handlers.length-1},r.prototype.eject=function(t){this.handlers[t]&&(this.handlers[t]=null)},r.prototype.forEach=function(t){o.forEach(this.handlers,function(e){null!==e&&t(e)})},t.exports=r},function(t){t.exports=function(t){return function(e){t.apply(null,e)}}},function(t,e,n){var r=n(13),o=n(14),u=n(22),i=n(23),s=n(24),c=n(25),a=n(26);t.exports=function(t,e,n){var f=c(n.data,n.headers,n.transformRequest),p=o.merge(r.headers.common,r.headers[n.method]||{},n.headers||{});o.isFormData(f)&&delete p["Content-Type"];var l=new(XMLHttpRequest||ActiveXObject)("Microsoft.XMLHTTP");l.open(n.method.toUpperCase(),u(n.url,n.params),!0),l.onreadystatechange=function(){if(l&&4===l.readyState){var r=s(l.getAllResponseHeaders()),o=-1!==["text",""].indexOf(n.responseType||"")?l.responseText:l.response,u={data:c(o,r,n.transformResponse),status:l.status,statusText:l.statusText,headers:r,config:n};(l.status>=200&&l.status<300?t:e)(u),l=null}};var h=a(n.url)?i.read(n.xsrfCookieName||r.xsrfCookieName):void 0;if(h&&(p[n.xsrfHeaderName||r.xsrfHeaderName]=h),o.forEach(p,function(t,e){f||"content-type"!==e.toLowerCase()?l.setRequestHeader(e,t):delete p[e]}),n.withCredentials&&(l.withCredentials=!0),n.responseType)try{l.responseType=n.responseType}catch(d){if("json"!==l.responseType)throw d}o.isArrayBuffer(f)&&(f=new DataView(f)),l.send(f)}},function(t,e,n){var r;(function(t,o,u){/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
	 * @version   2.0.1
	 */
(function(){"use strict";function i(t){return"function"==typeof t||"object"==typeof t&&null!==t}function s(t){return"function"==typeof t}function c(t){return"object"==typeof t&&null!==t}function a(){}function f(){return function(){t.nextTick(d)}}function p(){var t=0,e=new X(d),n=document.createTextNode("");return e.observe(n,{characterData:!0}),function(){n.data=t=++t%2}}function l(){var t=new MessageChannel;return t.port1.onmessage=d,function(){t.port2.postMessage(0)}}function h(){return function(){setTimeout(d,1)}}function d(){for(var t=0;F>t;t+=2){var e=V[t],n=V[t+1];e(n),V[t]=void 0,V[t+1]=void 0}F=0}function m(){}function v(){return new TypeError("You cannot resolve a promise with itself")}function y(){return new TypeError("A promises callback cannot return that same promise.")}function g(t){try{return t.then}catch(e){return z.error=e,z}}function w(t,e,n,r){try{t.call(e,n,r)}catch(o){return o}}function _(t,e,n){L(function(t){var r=!1,o=w(n,e,function(n){r||(r=!0,e!==n?j(t,n):E(t,n))},function(e){r||(r=!0,T(t,e))},"Settle: "+(t._label||" unknown promise"));!r&&o&&(r=!0,T(t,o))},t)}function b(t,e){e._state===K?E(t,e._result):t._state===Y?T(t,e._result):O(e,void 0,function(e){j(t,e)},function(e){T(t,e)})}function x(t,e){if(e.constructor===t.constructor)b(t,e);else{var n=g(e);n===z?T(t,z.error):void 0===n?E(t,e):s(n)?_(t,e,n):E(t,e)}}function j(t,e){t===e?T(t,v()):i(e)?x(t,e):E(t,e)}function A(t){t._onerror&&t._onerror(t._result),I(t)}function E(t,e){t._state===$&&(t._result=e,t._state=K,0===t._subscribers.length||L(I,t))}function T(t,e){t._state===$&&(t._state=Y,t._result=e,L(A,t))}function O(t,e,n,r){var o=t._subscribers,u=o.length;t._onerror=null,o[u]=e,o[u+K]=n,o[u+Y]=r,0===u&&t._state&&L(I,t)}function I(t){var e=t._subscribers,n=t._state;if(0!==e.length){for(var r,o,u=t._result,i=0;i<e.length;i+=3)r=e[i],o=e[i+n],r?q(n,r,o,u):o(u);t._subscribers.length=0}}function C(){this.error=null}function S(t,e){try{return t(e)}catch(n){return G.error=n,G}}function q(t,e,n,r){var o,u,i,c,a=s(n);if(a){if(o=S(n,r),o===G?(c=!0,u=o.error,o=null):i=!0,e===o)return void T(e,y())}else o=r,i=!0;e._state!==$||(a&&i?j(e,o):c?T(e,u):t===K?E(e,o):t===Y&&T(e,o))}function R(t,e){try{e(function(e){j(t,e)},function(e){T(t,e)})}catch(n){T(t,n)}}function M(t,e,n,r){this._instanceConstructor=t,this.promise=new t(m,r),this._abortOnReject=n,this._validateInput(e)?(this._input=e,this.length=e.length,this._remaining=e.length,this._init(),0===this.length?E(this.promise,this._result):(this.length=this.length||0,this._enumerate(),0===this._remaining&&E(this.promise,this._result))):T(this.promise,this._validationError())}function P(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function k(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function N(t){this._id=ne++,this._state=void 0,this._result=void 0,this._subscribers=[],m!==t&&(s(t)||P(),this instanceof N||k(),R(this,t))}var U;U=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)};var D,B=U,F=(Date.now||function(){return(new Date).getTime()},Object.create||function(t){if(arguments.length>1)throw new Error("Second argument not supported");if("object"!=typeof t)throw new TypeError("Argument must be an object");return a.prototype=t,new a},0),L=function(t,e){V[F]=t,V[F+1]=e,F+=2,2===F&&D()},H="undefined"!=typeof window?window:{},X=H.MutationObserver||H.WebKitMutationObserver,J="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,V=new Array(1e3);D="undefined"!=typeof t&&"[object process]"==={}.toString.call(t)?f():X?p():J?l():h();var $=void 0,K=1,Y=2,z=new C,G=new C;M.prototype._validateInput=function(t){return B(t)},M.prototype._validationError=function(){return new Error("Array Methods must be provided an Array")},M.prototype._init=function(){this._result=new Array(this.length)};var W=M;M.prototype._enumerate=function(){for(var t=this.length,e=this.promise,n=this._input,r=0;e._state===$&&t>r;r++)this._eachEntry(n[r],r)},M.prototype._eachEntry=function(t,e){var n=this._instanceConstructor;c(t)?t.constructor===n&&t._state!==$?(t._onerror=null,this._settledAt(t._state,e,t._result)):this._willSettleAt(n.resolve(t),e):(this._remaining--,this._result[e]=this._makeResult(K,e,t))},M.prototype._settledAt=function(t,e,n){var r=this.promise;r._state===$&&(this._remaining--,this._abortOnReject&&t===Y?T(r,n):this._result[e]=this._makeResult(t,e,n)),0===this._remaining&&E(r,this._result)},M.prototype._makeResult=function(t,e,n){return n},M.prototype._willSettleAt=function(t,e){var n=this;O(t,void 0,function(t){n._settledAt(K,e,t)},function(t){n._settledAt(Y,e,t)})};var Q=function(t,e){return new W(this,t,!0,e).promise},Z=function(t,e){function n(t){j(u,t)}function r(t){T(u,t)}var o=this,u=new o(m,e);if(!B(t))return T(u,new TypeError("You must pass an array to race.")),u;for(var i=t.length,s=0;u._state===$&&i>s;s++)O(o.resolve(t[s]),void 0,n,r);return u},te=function(t,e){var n=this;if(t&&"object"==typeof t&&t.constructor===n)return t;var r=new n(m,e);return j(r,t),r},ee=function(t,e){var n=this,r=new n(m,e);return T(r,t),r},ne=0,re=N;N.all=Q,N.race=Z,N.resolve=te,N.reject=ee,N.prototype={constructor:N,then:function(t,e){var n=this,r=n._state;if(r===K&&!t||r===Y&&!e)return this;var o=new this.constructor(m),u=n._result;if(r){var i=arguments[r-1];L(function(){q(r,o,i,u)})}else O(n,o,t,e);return o},"catch":function(t){return this.then(null,t)}};var oe=function(){var t;t="undefined"!=typeof o?o:"undefined"!=typeof window&&window.document?window:self;var e="Promise"in t&&"resolve"in t.Promise&&"reject"in t.Promise&&"all"in t.Promise&&"race"in t.Promise&&function(){var e;return new t.Promise(function(t){e=t}),s(e)}();e||(t.Promise=re)},ue={Promise:re,polyfill:oe};n(27).amd?(r=function(){return ue}.call(e,n,e,u),!(void 0!==r&&(u.exports=r))):"undefined"!=typeof u&&u.exports?u.exports=ue:"undefined"!=typeof this&&(this.ES6Promise=ue)}).call(this)}).call(e,n(21),function(){return this}(),n(28)(t))},function(t){function e(){}var n=t.exports={};n.nextTick=function(){var t="undefined"!=typeof window&&window.setImmediate,e="undefined"!=typeof window&&window.MutationObserver,n="undefined"!=typeof window&&window.postMessage&&window.addEventListener;if(t)return function(t){return window.setImmediate(t)};var r=[];if(e){var o=document.createElement("div"),u=new MutationObserver(function(){var t=r.slice();r.length=0,t.forEach(function(t){t()})});return u.observe(o,{attributes:!0}),function(t){r.length||o.setAttribute("yes","no"),r.push(t)}}return n?(window.addEventListener("message",function(t){var e=t.source;if((e===window||null===e)&&"process-tick"===t.data&&(t.stopPropagation(),r.length>0)){var n=r.shift();n()}},!0),function(t){r.push(t),window.postMessage("process-tick","*")}):function(t){setTimeout(t,0)}}(),n.title="browser",n.browser=!0,n.env={},n.argv=[],n.on=e,n.addListener=e,n.once=e,n.off=e,n.removeListener=e,n.removeAllListeners=e,n.emit=e,n.binding=function(){throw new Error("process.binding is not supported")},n.cwd=function(){return"/"},n.chdir=function(){throw new Error("process.chdir is not supported")}},function(t,e,n){"use strict";function r(t){return encodeURIComponent(t).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}var o=n(14);t.exports=function(t,e){if(!e)return t;var n=[];return o.forEach(e,function(t,e){null!==t&&"undefined"!=typeof t&&(o.isArray(t)||(t=[t]),o.forEach(t,function(t){o.isDate(t)?t=t.toISOString():o.isObject(t)&&(t=JSON.stringify(t)),n.push(r(e)+"="+r(t))}))}),n.length>0&&(t+=(-1===t.indexOf("?")?"?":"&")+n.join("&")),t}},function(t,e,n){"use strict";var r=n(14);t.exports={write:function(t,e,n,o,u,i){var s=[];s.push(t+"="+encodeURIComponent(e)),r.isNumber(n)&&s.push("expires="+new Date(n).toGMTString()),r.isString(o)&&s.push("path="+o),r.isString(u)&&s.push("domain="+u),i===!0&&s.push("secure"),document.cookie=s.join("; ")},read:function(t){var e=document.cookie.match(new RegExp("(^|;\\s*)("+t+")=([^;]*)"));return e?decodeURIComponent(e[3]):null},remove:function(t){this.write(t,"",Date.now()-864e5)}}},function(t,e,n){"use strict";var r=n(14);t.exports=function(t){var e,n,o,u={};return t?(r.forEach(t.split("\n"),function(t){o=t.indexOf(":"),e=r.trim(t.substr(0,o)).toLowerCase(),n=r.trim(t.substr(o+1)),e&&(u[e]=u[e]?u[e]+", "+n:n)}),u):u}},function(t,e,n){"use strict";var r=n(14);t.exports=function(t,e,n){return r.forEach(n,function(n){t=n(t,e)}),t}},function(t,e,n){"use strict";function r(t){var e=t;return o&&(i.setAttribute("href",e),e=i.href),i.setAttribute("href",e),{href:i.href,protocol:i.protocol?i.protocol.replace(/:$/,""):"",host:i.host,search:i.search?i.search.replace(/^\?/,""):"",hash:i.hash?i.hash.replace(/^#/,""):"",hostname:i.hostname,port:i.port,pathname:"/"===i.pathname.charAt(0)?i.pathname:"/"+i.pathname}}var o=/(msie|trident)/i.test(navigator.userAgent),u=n(14),i=document.createElement("a"),s=r(window.location.href);t.exports=function(t){var e=u.isString(t)?r(t):t;return e.protocol===s.protocol&&e.host===s.host}},function(t){t.exports=function(){throw new Error("define cannot be used indirect")}},function(t){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children=[],t.webpackPolyfill=1),t}}])});
(function(e){function o(){try{return r in e&&e[r]}catch(t){return!1}}var t={},n=e.document,r="localStorage",i="script",s;t.disabled=!1,t.version="1.3.17",t.set=function(e,t){},t.get=function(e,t){},t.has=function(e){return t.get(e)!==undefined},t.remove=function(e){},t.clear=function(){},t.transact=function(e,n,r){r==null&&(r=n,n=null),n==null&&(n={});var i=t.get(e,n);r(i),t.set(e,i)},t.getAll=function(){},t.forEach=function(){},t.serialize=function(e){return JSON.stringify(e)},t.deserialize=function(e){if(typeof e!="string")return undefined;try{return JSON.parse(e)}catch(t){return e||undefined}};if(o())s=e[r],t.set=function(e,n){return n===undefined?t.remove(e):(s.setItem(e,t.serialize(n)),n)},t.get=function(e,n){var r=t.deserialize(s.getItem(e));return r===undefined?n:r},t.remove=function(e){s.removeItem(e)},t.clear=function(){s.clear()},t.getAll=function(){var e={};return t.forEach(function(t,n){e[t]=n}),e},t.forEach=function(e){for(var n=0;n<s.length;n++){var r=s.key(n);e(r,t.get(r))}};else if(n.documentElement.addBehavior){var u,a;try{a=new ActiveXObject("htmlfile"),a.open(),a.write("<"+i+">document.w=window</"+i+'><iframe src="/favicon.ico"></iframe>'),a.close(),u=a.w.frames[0].document,s=u.createElement("div")}catch(f){s=n.createElement("div"),u=n.body}var l=function(e){return function(){var n=Array.prototype.slice.call(arguments,0);n.unshift(s),u.appendChild(s),s.addBehavior("#default#userData"),s.load(r);var i=e.apply(t,n);return u.removeChild(s),i}},c=new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]","g");function h(e){return e.replace(/^d/,"___$&").replace(c,"___")}t.set=l(function(e,n,i){return n=h(n),i===undefined?t.remove(n):(e.setAttribute(n,t.serialize(i)),e.save(r),i)}),t.get=l(function(e,n,r){n=h(n);var i=t.deserialize(e.getAttribute(n));return i===undefined?r:i}),t.remove=l(function(e,t){t=h(t),e.removeAttribute(t),e.save(r)}),t.clear=l(function(e){var t=e.XMLDocument.documentElement.attributes;e.load(r);for(var n=0,i;i=t[n];n++)e.removeAttribute(i.name);e.save(r)}),t.getAll=function(e){var n={};return t.forEach(function(e,t){n[e]=t}),n},t.forEach=l(function(e,n){var r=e.XMLDocument.documentElement.attributes;for(var i=0,s;s=r[i];++i)n(s.name,t.deserialize(e.getAttribute(s.name)))})}try{var p="__storejs__";t.set(p,p),t.get(p)!=p&&(t.disabled=!0),t.remove(p)}catch(f){t.disabled=!0}t.enabled=!t.disabled,typeof module!="undefined"&&module.exports&&this.module!==module?module.exports=t:typeof define=="function"&&define.amd?define(t):e.store=t})(Function("return this")())
function Rainbow()
{
	"use strict";
	var gradients = null;
	var minNum = 0;
	var maxNum = 100;
	var colours = ['ff0000', 'ffff00', '00ff00', '0000ff']; 
	setColours(colours);
	
	function setColours (spectrum) 
	{
		if (spectrum.length < 2) {
			throw new Error('Rainbow must have two or more colours.');
		} else {
			var increment = (maxNum - minNum)/(spectrum.length - 1);
			var firstGradient = new ColourGradient();
			firstGradient.setGradient(spectrum[0], spectrum[1]);
			firstGradient.setNumberRange(minNum, minNum + increment);
			gradients = [ firstGradient ];
			
			for (var i = 1; i < spectrum.length - 1; i++) {
				var colourGradient = new ColourGradient();
				colourGradient.setGradient(spectrum[i], spectrum[i + 1]);
				colourGradient.setNumberRange(minNum + increment * i, minNum + increment * (i + 1)); 
				gradients[i] = colourGradient; 
			}

			colours = spectrum;
		}
	}

	this.setSpectrum = function () 
	{
		setColours(arguments);
		return this;
	}

	this.setSpectrumByArray = function (array)
	{
		setColours(array);
		return this;
	}

	this.colourAt = function (number)
	{
		if (isNaN(number)) {
			throw new TypeError(number + ' is not a number');
		} else if (gradients.length === 1) {
			return gradients[0].colourAt(number);
		} else {
			var segment = (maxNum - minNum)/(gradients.length);
			var index = Math.min(Math.floor((Math.max(number, minNum) - minNum)/segment), gradients.length - 1);
			return gradients[index].colourAt(number);
		}
	}

	this.colorAt = this.colourAt;

	this.setNumberRange = function (minNumber, maxNumber)
	{
		if (maxNumber > minNumber) {
			minNum = minNumber;
			maxNum = maxNumber;
			setColours(colours);
		} else {
			throw new RangeError('maxNumber (' + maxNumber + ') is not greater than minNumber (' + minNumber + ')');
		}
		return this;
	}
}

function ColourGradient() 
{
	"use strict";
	var startColour = 'ff0000';
	var endColour = '0000ff';
	var minNum = 0;
	var maxNum = 100;

	this.setGradient = function (colourStart, colourEnd)
	{
		startColour = getHexColour(colourStart);
		endColour = getHexColour(colourEnd);
	}

	this.setNumberRange = function (minNumber, maxNumber)
	{
		if (maxNumber > minNumber) {
			minNum = minNumber;
			maxNum = maxNumber;
		} else {
			throw new RangeError('maxNumber (' + maxNumber + ') is not greater than minNumber (' + minNumber + ')');
		}
	}

	this.colourAt = function (number)
	{
		return calcHex(number, startColour.substring(0,2), endColour.substring(0,2)) 
			+ calcHex(number, startColour.substring(2,4), endColour.substring(2,4)) 
			+ calcHex(number, startColour.substring(4,6), endColour.substring(4,6));
	}
	
	function calcHex(number, channelStart_Base16, channelEnd_Base16)
	{
		var num = number;
		if (num < minNum) {
			num = minNum;
		}
		if (num > maxNum) {
			num = maxNum;
		} 
		var numRange = maxNum - minNum;
		var cStart_Base10 = parseInt(channelStart_Base16, 16);
		var cEnd_Base10 = parseInt(channelEnd_Base16, 16); 
		var cPerUnit = (cEnd_Base10 - cStart_Base10)/numRange;
		var c_Base10 = Math.round(cPerUnit * (num - minNum) + cStart_Base10);
		return formatHex(c_Base10.toString(16));
	}

	function formatHex(hex) 
	{
		if (hex.length === 1) {
			return '0' + hex;
		} else {
			return hex;
		}
	} 
	
	function isHexColour(string)
	{
		var regex = /^#?[0-9a-fA-F]{6}$/i;
		return regex.test(string);
	}

	function getHexColour(string)
	{
		if (isHexColour(string)) {
			return string.substring(string.length - 6, string.length);
		} else {
			var name = string.toLowerCase();
			if (colourNames.hasOwnProperty(name)) {
				return colourNames[name];
			}
			throw new Error(string + ' is not a valid colour.');
		}
	}
	
	// Extended list of CSS colornames s taken from
	// http://www.w3.org/TR/css3-color/#svg-color
	var colourNames = {
		aliceblue: "F0F8FF",
		antiquewhite: "FAEBD7",
		aqua: "00FFFF",
		aquamarine: "7FFFD4",
		azure: "F0FFFF",
		beige: "F5F5DC",
		bisque: "FFE4C4",
		black: "000000",
		blanchedalmond: "FFEBCD",
		blue: "0000FF",
		blueviolet: "8A2BE2",
		brown: "A52A2A",
		burlywood: "DEB887",
		cadetblue: "5F9EA0",
		chartreuse: "7FFF00",
		chocolate: "D2691E",
		coral: "FF7F50",
		cornflowerblue: "6495ED",
		cornsilk: "FFF8DC",
		crimson: "DC143C",
		cyan: "00FFFF",
		darkblue: "00008B",
		darkcyan: "008B8B",
		darkgoldenrod: "B8860B",
		darkgray: "A9A9A9",
		darkgreen: "006400",
		darkgrey: "A9A9A9",
		darkkhaki: "BDB76B",
		darkmagenta: "8B008B",
		darkolivegreen: "556B2F",
		darkorange: "FF8C00",
		darkorchid: "9932CC",
		darkred: "8B0000",
		darksalmon: "E9967A",
		darkseagreen: "8FBC8F",
		darkslateblue: "483D8B",
		darkslategray: "2F4F4F",
		darkslategrey: "2F4F4F",
		darkturquoise: "00CED1",
		darkviolet: "9400D3",
		deeppink: "FF1493",
		deepskyblue: "00BFFF",
		dimgray: "696969",
		dimgrey: "696969",
		dodgerblue: "1E90FF",
		firebrick: "B22222",
		floralwhite: "FFFAF0",
		forestgreen: "228B22",
		fuchsia: "FF00FF",
		gainsboro: "DCDCDC",
		ghostwhite: "F8F8FF",
		gold: "FFD700",
		goldenrod: "DAA520",
		gray: "808080",
		green: "008000",
		greenyellow: "ADFF2F",
		grey: "808080",
		honeydew: "F0FFF0",
		hotpink: "FF69B4",
		indianred: "CD5C5C",
		indigo: "4B0082",
		ivory: "FFFFF0",
		khaki: "F0E68C",
		lavender: "E6E6FA",
		lavenderblush: "FFF0F5",
		lawngreen: "7CFC00",
		lemonchiffon: "FFFACD",
		lightblue: "ADD8E6",
		lightcoral: "F08080",
		lightcyan: "E0FFFF",
		lightgoldenrodyellow: "FAFAD2",
		lightgray: "D3D3D3",
		lightgreen: "90EE90",
		lightgrey: "D3D3D3",
		lightpink: "FFB6C1",
		lightsalmon: "FFA07A",
		lightseagreen: "20B2AA",
		lightskyblue: "87CEFA",
		lightslategray: "778899",
		lightslategrey: "778899",
		lightsteelblue: "B0C4DE",
		lightyellow: "FFFFE0",
		lime: "00FF00",
		limegreen: "32CD32",
		linen: "FAF0E6",
		magenta: "FF00FF",
		maroon: "800000",
		mediumaquamarine: "66CDAA",
		mediumblue: "0000CD",
		mediumorchid: "BA55D3",
		mediumpurple: "9370DB",
		mediumseagreen: "3CB371",
		mediumslateblue: "7B68EE",
		mediumspringgreen: "00FA9A",
		mediumturquoise: "48D1CC",
		mediumvioletred: "C71585",
		midnightblue: "191970",
		mintcream: "F5FFFA",
		mistyrose: "FFE4E1",
		moccasin: "FFE4B5",
		navajowhite: "FFDEAD",
		navy: "000080",
		oldlace: "FDF5E6",
		olive: "808000",
		olivedrab: "6B8E23",
		orange: "FFA500",
		orangered: "FF4500",
		orchid: "DA70D6",
		palegoldenrod: "EEE8AA",
		palegreen: "98FB98",
		paleturquoise: "AFEEEE",
		palevioletred: "DB7093",
		papayawhip: "FFEFD5",
		peachpuff: "FFDAB9",
		peru: "CD853F",
		pink: "FFC0CB",
		plum: "DDA0DD",
		powderblue: "B0E0E6",
		purple: "800080",
		red: "FF0000",
		rosybrown: "BC8F8F",
		royalblue: "4169E1",
		saddlebrown: "8B4513",
		salmon: "FA8072",
		sandybrown: "F4A460",
		seagreen: "2E8B57",
		seashell: "FFF5EE",
		sienna: "A0522D",
		silver: "C0C0C0",
		skyblue: "87CEEB",
		slateblue: "6A5ACD",
		slategray: "708090",
		slategrey: "708090",
		snow: "FFFAFA",
		springgreen: "00FF7F",
		steelblue: "4682B4",
		tan: "D2B48C",
		teal: "008080",
		thistle: "D8BFD8",
		tomato: "FF6347",
		turquoise: "40E0D0",
		violet: "EE82EE",
		wheat: "F5DEB3",
		white: "FFFFFF",
		whitesmoke: "F5F5F5",
		yellow: "FFFF00",
		yellowgreen: "9ACD32"
	}
}

if (typeof module !== 'undefined') {
  module.exports = Rainbow;
}

!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var o;"undefined"!=typeof window?o=window:"undefined"!=typeof global?o=global:"undefined"!=typeof self&&(o=self),o.eventcollector=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Dependencies.
 */

var events = require('events');
var util = require('util');


/**
 * Emitted for each fired event. May be useful to display a progress bar.
 *
 * @event done
 * @param {Number} fired  Number of fired events.
 * @param {Number} total  Total number of required events to fire.
 * @param {Object} [data] Optional data about the fired event.
 */

var EVENT_DONE = 'done';


/**
 * Emitted when all the required events have fired.
 *
 * @event alldone
 * @param {Number} total  Number of required events to fire.
 */

var EVENT_ALLDONE = 'alldone';


/**
 * Emitted if the given timeout expires before all the required events have
 * fired.
 *
 * @event timeout
 * @param {Number} fired  Number of fired events.
 * @param {Number} total  Total number of required events to fire.
 */

var EVENT_TIMEOUT = 'timeout';


function isPositiveInteger(x) {
  return (typeof x === 'number') && (x % 1 === 0) && (x > 0);
}


/**
 * EventCollector class.
 *
 * @class EventCollector
 * @constructor
 * @param {Number} total  Number of events that must fire.
 */

var EventCollector = function(total, timeout) {
  events.EventEmitter.call(this);

  if (! isPositiveInteger(total)) {
    throw new Error('`total` must be a positive integer');
  }

  if (timeout && ! isPositiveInteger(timeout)) {
    throw new Error('`timeout` must be a positive integer');
  }

  this.destroyed = false;
  this.total = total;
	this.fired = 0;
  if (timeout) {
    this.timer = setTimeout(function() {
      this.onTimeout();
    }.bind(this), timeout);
  }
};

util.inherits(EventCollector, events.EventEmitter);


/**
 * Tell the EventCollector that a required event has been emitted.
 *
 * @method done
 * @param {Object} [data]  Optional data about the fired event.
 * @chainable
 */

EventCollector.prototype.done = function(data) {
  if (this.destroyed) { return; }

  this.fired++;

  try {
    this.emit(EVENT_DONE, this.fired, this.total, data);

    if (this.fired === this.total) {
      this.destroy();
      this.emit(EVENT_ALLDONE, this.total);
    }
  }
  catch(error) {
    throw error;
  }

  return this;
};


/**
 * Destroy the EventCollector. No more events will be emitted.
 *
 * @method destroy
 */

EventCollector.prototype.destroy = function() {
  this.destroyed = true;

  clearTimeout(this.timer);
};


/**
 * Timeout expired.
 *
 * @private
 * @method onTimeout
 */

EventCollector.prototype.onTimeout = function() {
  if (this.destroyed) { return; }

  this.emit(EVENT_TIMEOUT, this.fired, this.total);
};


/**
 * Export a function returning an instance of EventCollector.
 *
 *     var eventcollector = require('eventcollector')(2, 5000);
 */

module.exports = function(total, timeout) {
  return new EventCollector(total, timeout);
};

},{"events":2,"util":6}],2:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],3:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],4:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canMutationObserver = typeof window !== 'undefined'
    && window.MutationObserver;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    var queue = [];

    if (canMutationObserver) {
        var hiddenDiv = document.createElement("div");
        var observer = new MutationObserver(function () {
            var queueList = queue.slice();
            queue.length = 0;
            queueList.forEach(function (fn) {
                fn();
            });
        });

        observer.observe(hiddenDiv, { attributes: true });

        return function nextTick(fn) {
            if (!queue.length) {
                hiddenDiv.setAttribute('yes', 'no');
            }
            queue.push(fn);
        };
    }

    if (canPost) {
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],5:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],6:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":5,"_process":4,"inherits":3}]},{},[1])(1)
});
/*! =======================================================
                      VERSION  4.14.3              
========================================================= */
/*! =========================================================
 * bootstrap-slider.js
 *
 * Maintainers:
 *		Kyle Kemp
 *			- Twitter: @seiyria
 *			- Github:  seiyria
 *		Rohit Kalkur
 *			- Twitter: @Rovolutionary
 *			- Github:  rovolution
 *
 * =========================================================
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */
!function(a,b){if("function"==typeof define&&define.amd)define(["jquery"],b);else if("object"==typeof module&&module.exports){var c;try{c=require("jquery")}catch(d){c=null}module.exports=b(c)}else a.Slider=b(a.jQuery)}(this,function(a){var b;return function(a){"use strict";function b(){}function c(a){function c(b){b.prototype.option||(b.prototype.option=function(b){a.isPlainObject(b)&&(this.options=a.extend(!0,this.options,b))})}function e(b,c){a.fn[b]=function(e){if("string"==typeof e){for(var g=d.call(arguments,1),h=0,i=this.length;i>h;h++){var j=this[h],k=a.data(j,b);if(k)if(a.isFunction(k[e])&&"_"!==e.charAt(0)){var l=k[e].apply(k,g);if(void 0!==l&&l!==k)return l}else f("no such method '"+e+"' for "+b+" instance");else f("cannot call methods on "+b+" prior to initialization; attempted to call '"+e+"'")}return this}var m=this.map(function(){var d=a.data(this,b);return d?(d.option(e),d._init()):(d=new c(this,e),a.data(this,b,d)),a(this)});return!m||m.length>1?m:m[0]}}if(a){var f="undefined"==typeof console?b:function(a){console.error(a)};return a.bridget=function(a,b){c(b),e(a,b)},a.bridget}}var d=Array.prototype.slice;c(a)}(a),function(a){function c(b,c){function d(a,b){var c="data-slider-"+b.replace(/_/g,"-"),d=a.getAttribute(c);try{return JSON.parse(d)}catch(e){return d}}this._state={value:null,enabled:null,offset:null,size:null,percentage:null,inDrag:null,over:null},"string"==typeof b?this.element=document.querySelector(b):b instanceof HTMLElement&&(this.element=b),c=c?c:{};for(var f=Object.keys(this.defaultOptions),g=0;g<f.length;g++){var h=f[g],i=c[h];i="undefined"!=typeof i?i:d(this.element,h),i=null!==i?i:this.defaultOptions[h],this.options||(this.options={}),this.options[h]=i}"vertical"!==this.options.orientation||"top"!==this.options.tooltip_position&&"bottom"!==this.options.tooltip_position?"horizontal"!==this.options.orientation||"left"!==this.options.tooltip_position&&"right"!==this.options.tooltip_position||(this.options.tooltip_position="top"):this.options.tooltip_position="right";var j,k,l,m,n,o=this.element.style.width,p=!1,q=this.element.parentNode;if(this.sliderElem)p=!0;else{this.sliderElem=document.createElement("div"),this.sliderElem.className="slider";var r=document.createElement("div");if(r.className="slider-track",k=document.createElement("div"),k.className="slider-track-low",j=document.createElement("div"),j.className="slider-selection",l=document.createElement("div"),l.className="slider-track-high",m=document.createElement("div"),m.className="slider-handle min-slider-handle",n=document.createElement("div"),n.className="slider-handle max-slider-handle",r.appendChild(k),r.appendChild(j),r.appendChild(l),this.ticks=[],Array.isArray(this.options.ticks)&&this.options.ticks.length>0){for(g=0;g<this.options.ticks.length;g++){var s=document.createElement("div");s.className="slider-tick",this.ticks.push(s),r.appendChild(s)}j.className+=" tick-slider-selection"}if(r.appendChild(m),r.appendChild(n),this.tickLabels=[],Array.isArray(this.options.ticks_labels)&&this.options.ticks_labels.length>0)for(this.tickLabelContainer=document.createElement("div"),this.tickLabelContainer.className="slider-tick-label-container",g=0;g<this.options.ticks_labels.length;g++){var t=document.createElement("div");t.className="slider-tick-label",t.innerHTML=this.options.ticks_labels[g],this.tickLabels.push(t),this.tickLabelContainer.appendChild(t)}var u=function(a){var b=document.createElement("div");b.className="tooltip-arrow";var c=document.createElement("div");c.className="tooltip-inner",a.appendChild(b),a.appendChild(c)},v=document.createElement("div");v.className="tooltip tooltip-main",u(v);var w=document.createElement("div");w.className="tooltip tooltip-min",u(w);var x=document.createElement("div");x.className="tooltip tooltip-max",u(x),this.sliderElem.appendChild(r),this.sliderElem.appendChild(v),this.sliderElem.appendChild(w),this.sliderElem.appendChild(x),this.tickLabelContainer&&this.sliderElem.appendChild(this.tickLabelContainer),q.insertBefore(this.sliderElem,this.element),this.element.style.display="none"}if(a&&(this.$element=a(this.element),this.$sliderElem=a(this.sliderElem)),this.eventToCallbackMap={},this.sliderElem.id=this.options.id,this.touchCapable="ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch,this.tooltip=this.sliderElem.querySelector(".tooltip-main"),this.tooltipInner=this.tooltip.querySelector(".tooltip-inner"),this.tooltip_min=this.sliderElem.querySelector(".tooltip-min"),this.tooltipInner_min=this.tooltip_min.querySelector(".tooltip-inner"),this.tooltip_max=this.sliderElem.querySelector(".tooltip-max"),this.tooltipInner_max=this.tooltip_max.querySelector(".tooltip-inner"),e[this.options.scale]&&(this.options.scale=e[this.options.scale]),p===!0&&(this._removeClass(this.sliderElem,"slider-horizontal"),this._removeClass(this.sliderElem,"slider-vertical"),this._removeClass(this.tooltip,"hide"),this._removeClass(this.tooltip_min,"hide"),this._removeClass(this.tooltip_max,"hide"),["left","top","width","height"].forEach(function(a){this._removeProperty(this.trackLow,a),this._removeProperty(this.trackSelection,a),this._removeProperty(this.trackHigh,a)},this),[this.handle1,this.handle2].forEach(function(a){this._removeProperty(a,"left"),this._removeProperty(a,"top")},this),[this.tooltip,this.tooltip_min,this.tooltip_max].forEach(function(a){this._removeProperty(a,"left"),this._removeProperty(a,"top"),this._removeProperty(a,"margin-left"),this._removeProperty(a,"margin-top"),this._removeClass(a,"right"),this._removeClass(a,"top")},this)),"vertical"===this.options.orientation?(this._addClass(this.sliderElem,"slider-vertical"),this.stylePos="top",this.mousePos="pageY",this.sizePos="offsetHeight"):(this._addClass(this.sliderElem,"slider-horizontal"),this.sliderElem.style.width=o,this.options.orientation="horizontal",this.stylePos="left",this.mousePos="pageX",this.sizePos="offsetWidth"),this._setTooltipPosition(),Array.isArray(this.options.ticks)&&this.options.ticks.length>0&&(this.options.max=Math.max.apply(Math,this.options.ticks),this.options.min=Math.min.apply(Math,this.options.ticks)),Array.isArray(this.options.value)?(this.options.range=!0,this._state.value=this.options.value):this._state.value=this.options.range?[this.options.value,this.options.max]:this.options.value,this.trackLow=k||this.trackLow,this.trackSelection=j||this.trackSelection,this.trackHigh=l||this.trackHigh,"none"===this.options.selection&&(this._addClass(this.trackLow,"hide"),this._addClass(this.trackSelection,"hide"),this._addClass(this.trackHigh,"hide")),this.handle1=m||this.handle1,this.handle2=n||this.handle2,p===!0)for(this._removeClass(this.handle1,"round triangle"),this._removeClass(this.handle2,"round triangle hide"),g=0;g<this.ticks.length;g++)this._removeClass(this.ticks[g],"round triangle hide");var y=["round","triangle","custom"],z=-1!==y.indexOf(this.options.handle);if(z)for(this._addClass(this.handle1,this.options.handle),this._addClass(this.handle2,this.options.handle),g=0;g<this.ticks.length;g++)this._addClass(this.ticks[g],this.options.handle);this._state.offset=this._offset(this.sliderElem),this._state.size=this.sliderElem[this.sizePos],this.setValue(this._state.value),this.handle1Keydown=this._keydown.bind(this,0),this.handle1.addEventListener("keydown",this.handle1Keydown,!1),this.handle2Keydown=this._keydown.bind(this,1),this.handle2.addEventListener("keydown",this.handle2Keydown,!1),this.mousedown=this._mousedown.bind(this),this.touchCapable&&this.sliderElem.addEventListener("touchstart",this.mousedown,!1),this.sliderElem.addEventListener("mousedown",this.mousedown,!1),"hide"===this.options.tooltip?(this._addClass(this.tooltip,"hide"),this._addClass(this.tooltip_min,"hide"),this._addClass(this.tooltip_max,"hide")):"always"===this.options.tooltip?(this._showTooltip(),this._alwaysShowTooltip=!0):(this.showTooltip=this._showTooltip.bind(this),this.hideTooltip=this._hideTooltip.bind(this),this.sliderElem.addEventListener("mouseenter",this.showTooltip,!1),this.sliderElem.addEventListener("mouseleave",this.hideTooltip,!1),this.handle1.addEventListener("focus",this.showTooltip,!1),this.handle1.addEventListener("blur",this.hideTooltip,!1),this.handle2.addEventListener("focus",this.showTooltip,!1),this.handle2.addEventListener("blur",this.hideTooltip,!1)),this.options.enabled?this.enable():this.disable()}var d={formatInvalidInputErrorMsg:function(a){return"Invalid input value '"+a+"' passed in"},callingContextNotSliderInstance:"Calling context element does not have instance of Slider bound to it. Check your code to make sure the JQuery object returned from the call to the slider() initializer is calling the method"},e={linear:{toValue:function(a){var b=a/100*(this.options.max-this.options.min);if(this.options.ticks_positions.length>0){for(var c,d,e,f=0,g=0;g<this.options.ticks_positions.length;g++)if(a<=this.options.ticks_positions[g]){c=g>0?this.options.ticks[g-1]:0,e=g>0?this.options.ticks_positions[g-1]:0,d=this.options.ticks[g],f=this.options.ticks_positions[g];break}if(g>0){var h=(a-e)/(f-e);b=c+h*(d-c)}}var i=this.options.min+Math.round(b/this.options.step)*this.options.step;return i<this.options.min?this.options.min:i>this.options.max?this.options.max:i},toPercentage:function(a){if(this.options.max===this.options.min)return 0;if(this.options.ticks_positions.length>0){for(var b,c,d,e=0,f=0;f<this.options.ticks.length;f++)if(a<=this.options.ticks[f]){b=f>0?this.options.ticks[f-1]:0,d=f>0?this.options.ticks_positions[f-1]:0,c=this.options.ticks[f],e=this.options.ticks_positions[f];break}if(f>0){var g=(a-b)/(c-b);return d+g*(e-d)}}return 100*(a-this.options.min)/(this.options.max-this.options.min)}},logarithmic:{toValue:function(a){var b=0===this.options.min?0:Math.log(this.options.min),c=Math.log(this.options.max),d=Math.exp(b+(c-b)*a/100);return d=this.options.min+Math.round((d-this.options.min)/this.options.step)*this.options.step,d<this.options.min?this.options.min:d>this.options.max?this.options.max:d},toPercentage:function(a){if(this.options.max===this.options.min)return 0;var b=Math.log(this.options.max),c=0===this.options.min?0:Math.log(this.options.min),d=0===a?0:Math.log(a);return 100*(d-c)/(b-c)}}};if(b=function(a,b){return c.call(this,a,b),this},b.prototype={_init:function(){},constructor:b,defaultOptions:{id:"",min:0,max:10,step:1,precision:0,orientation:"horizontal",value:5,range:!1,selection:"before",tooltip:"show",tooltip_split:!1,handle:"round",reversed:!1,enabled:!0,formatter:function(a){return Array.isArray(a)?a[0]+" : "+a[1]:a},natural_arrow_keys:!1,ticks:[],ticks_positions:[],ticks_labels:[],ticks_snap_bounds:0,scale:"linear",focus:!1,tooltip_position:null},getElement:function(){return this.sliderElem},getValue:function(){return this.options.range?this._state.value:this._state.value[0]},setValue:function(a,b,c){a||(a=0);var d=this.getValue();this._state.value=this._validateInputValue(a);var e=this._applyPrecision.bind(this);this.options.range?(this._state.value[0]=e(this._state.value[0]),this._state.value[1]=e(this._state.value[1]),this._state.value[0]=Math.max(this.options.min,Math.min(this.options.max,this._state.value[0])),this._state.value[1]=Math.max(this.options.min,Math.min(this.options.max,this._state.value[1]))):(this._state.value=e(this._state.value),this._state.value=[Math.max(this.options.min,Math.min(this.options.max,this._state.value))],this._addClass(this.handle2,"hide"),this._state.value[1]="after"===this.options.selection?this.options.max:this.options.min),this._state.percentage=this.options.max>this.options.min?[this._toPercentage(this._state.value[0]),this._toPercentage(this._state.value[1]),100*this.options.step/(this.options.max-this.options.min)]:[0,0,100],this._layout();var f=this.options.range?this._state.value:this._state.value[0];return b===!0&&this._trigger("slide",f),d!==f&&c===!0&&this._trigger("change",{oldValue:d,newValue:f}),this._setDataVal(f),this},destroy:function(){this._removeSliderEventHandlers(),this.sliderElem.parentNode.removeChild(this.sliderElem),this.element.style.display="",this._cleanUpEventCallbacksMap(),this.element.removeAttribute("data"),a&&(this._unbindJQueryEventHandlers(),this.$element.removeData("slider"))},disable:function(){return this._state.enabled=!1,this.handle1.removeAttribute("tabindex"),this.handle2.removeAttribute("tabindex"),this._addClass(this.sliderElem,"slider-disabled"),this._trigger("slideDisabled"),this},enable:function(){return this._state.enabled=!0,this.handle1.setAttribute("tabindex",0),this.handle2.setAttribute("tabindex",0),this._removeClass(this.sliderElem,"slider-disabled"),this._trigger("slideEnabled"),this},toggle:function(){return this._state.enabled?this.disable():this.enable(),this},isEnabled:function(){return this._state.enabled},on:function(a,b){return this._bindNonQueryEventHandler(a,b),this},off:function(b,c){a?(this.$element.off(b,c),this.$sliderElem.off(b,c)):this._unbindNonQueryEventHandler(b,c)},getAttribute:function(a){return a?this.options[a]:this.options},setAttribute:function(a,b){return this.options[a]=b,this},refresh:function(){return this._removeSliderEventHandlers(),c.call(this,this.element,this.options),a&&a.data(this.element,"slider",this),this},relayout:function(){return this._layout(),this},_removeSliderEventHandlers:function(){this.handle1.removeEventListener("keydown",this.handle1Keydown,!1),this.handle1.removeEventListener("focus",this.showTooltip,!1),this.handle1.removeEventListener("blur",this.hideTooltip,!1),this.handle2.removeEventListener("keydown",this.handle2Keydown,!1),this.handle2.removeEventListener("focus",this.handle2Keydown,!1),this.handle2.removeEventListener("blur",this.handle2Keydown,!1),this.sliderElem.removeEventListener("mouseenter",this.showTooltip,!1),this.sliderElem.removeEventListener("mouseleave",this.hideTooltip,!1),this.sliderElem.removeEventListener("touchstart",this.mousedown,!1),this.sliderElem.removeEventListener("mousedown",this.mousedown,!1)},_bindNonQueryEventHandler:function(a,b){void 0===this.eventToCallbackMap[a]&&(this.eventToCallbackMap[a]=[]),this.eventToCallbackMap[a].push(b)},_unbindNonQueryEventHandler:function(a,b){var c=this.eventToCallbackMap[a];if(void 0!==c)for(var d=0;d<c.length;d++)if(c[d]===b){c.splice(d,1);break}},_cleanUpEventCallbacksMap:function(){for(var a=Object.keys(this.eventToCallbackMap),b=0;b<a.length;b++){var c=a[b];this.eventToCallbackMap[c]=null}},_showTooltip:function(){this.options.tooltip_split===!1?(this._addClass(this.tooltip,"in"),this.tooltip_min.style.display="none",this.tooltip_max.style.display="none"):(this._addClass(this.tooltip_min,"in"),this._addClass(this.tooltip_max,"in"),this.tooltip.style.display="none"),this._state.over=!0},_hideTooltip:function(){this._state.inDrag===!1&&this.alwaysShowTooltip!==!0&&(this._removeClass(this.tooltip,"in"),this._removeClass(this.tooltip_min,"in"),this._removeClass(this.tooltip_max,"in")),this._state.over=!1},_layout:function(){var a;if(a=this.options.reversed?[100-this._state.percentage[0],this.options.range?100-this._state.percentage[1]:this._state.percentage[1]]:[this._state.percentage[0],this._state.percentage[1]],this.handle1.style[this.stylePos]=a[0]+"%",this.handle2.style[this.stylePos]=a[1]+"%",Array.isArray(this.options.ticks)&&this.options.ticks.length>0){var b=Math.max.apply(Math,this.options.ticks),c=Math.min.apply(Math,this.options.ticks),d="vertical"===this.options.orientation?"height":"width",e="vertical"===this.options.orientation?"marginTop":"marginLeft",f=this._state.size/(this.options.ticks.length-1);if(this.tickLabelContainer){var g=0;if(0===this.options.ticks_positions.length)this.tickLabelContainer.style[e]=-f/2+"px",g=this.tickLabelContainer.offsetHeight;else for(h=0;h<this.tickLabelContainer.childNodes.length;h++)this.tickLabelContainer.childNodes[h].offsetHeight>g&&(g=this.tickLabelContainer.childNodes[h].offsetHeight);"horizontal"===this.options.orientation&&(this.sliderElem.style.marginBottom=g+"px")}for(var h=0;h<this.options.ticks.length;h++){var i=this.options.ticks_positions[h]||100*(this.options.ticks[h]-c)/(b-c);this.ticks[h].style[this.stylePos]=i+"%",this._removeClass(this.ticks[h],"in-selection"),this.options.range?i>=a[0]&&i<=a[1]&&this._addClass(this.ticks[h],"in-selection"):"after"===this.options.selection&&i>=a[0]?this._addClass(this.ticks[h],"in-selection"):"before"===this.options.selection&&i<=a[0]&&this._addClass(this.ticks[h],"in-selection"),this.tickLabels[h]&&(this.tickLabels[h].style[d]=f+"px",void 0!==this.options.ticks_positions[h]&&(this.tickLabels[h].style.position="absolute",this.tickLabels[h].style[this.stylePos]=this.options.ticks_positions[h]+"%",this.tickLabels[h].style[e]=-f/2+"px"))}}if("vertical"===this.options.orientation)this.trackLow.style.top="0",this.trackLow.style.height=Math.min(a[0],a[1])+"%",this.trackSelection.style.top=Math.min(a[0],a[1])+"%",this.trackSelection.style.height=Math.abs(a[0]-a[1])+"%",this.trackHigh.style.bottom="0",this.trackHigh.style.height=100-Math.min(a[0],a[1])-Math.abs(a[0]-a[1])+"%";else{this.trackLow.style.left="0",this.trackLow.style.width=Math.min(a[0],a[1])+"%",this.trackSelection.style.left=Math.min(a[0],a[1])+"%",this.trackSelection.style.width=Math.abs(a[0]-a[1])+"%",this.trackHigh.style.right="0",this.trackHigh.style.width=100-Math.min(a[0],a[1])-Math.abs(a[0]-a[1])+"%";var j=this.tooltip_min.getBoundingClientRect(),k=this.tooltip_max.getBoundingClientRect();j.right>k.left?(this._removeClass(this.tooltip_max,"top"),this._addClass(this.tooltip_max,"bottom"),this.tooltip_max.style.top="18px"):(this._removeClass(this.tooltip_max,"bottom"),this._addClass(this.tooltip_max,"top"),this.tooltip_max.style.top=this.tooltip_min.style.top)}var l;if(this.options.range){l=this.options.formatter(this._state.value),this._setText(this.tooltipInner,l),this.tooltip.style[this.stylePos]=(a[1]+a[0])/2+"%","vertical"===this.options.orientation?this._css(this.tooltip,"margin-top",-this.tooltip.offsetHeight/2+"px"):this._css(this.tooltip,"margin-left",-this.tooltip.offsetWidth/2+"px"),"vertical"===this.options.orientation?this._css(this.tooltip,"margin-top",-this.tooltip.offsetHeight/2+"px"):this._css(this.tooltip,"margin-left",-this.tooltip.offsetWidth/2+"px");var m=this.options.formatter(this._state.value[0]);this._setText(this.tooltipInner_min,m);var n=this.options.formatter(this._state.value[1]);this._setText(this.tooltipInner_max,n),this.tooltip_min.style[this.stylePos]=a[0]+"%","vertical"===this.options.orientation?this._css(this.tooltip_min,"margin-top",-this.tooltip_min.offsetHeight/2+"px"):this._css(this.tooltip_min,"margin-left",-this.tooltip_min.offsetWidth/2+"px"),this.tooltip_max.style[this.stylePos]=a[1]+"%","vertical"===this.options.orientation?this._css(this.tooltip_max,"margin-top",-this.tooltip_max.offsetHeight/2+"px"):this._css(this.tooltip_max,"margin-left",-this.tooltip_max.offsetWidth/2+"px")}else l=this.options.formatter(this._state.value[0]),this._setText(this.tooltipInner,l),this.tooltip.style[this.stylePos]=a[0]+"%","vertical"===this.options.orientation?this._css(this.tooltip,"margin-top",-this.tooltip.offsetHeight/2+"px"):this._css(this.tooltip,"margin-left",-this.tooltip.offsetWidth/2+"px")},_removeProperty:function(a,b){a.style.removeProperty?a.style.removeProperty(b):a.style.removeAttribute(b)},_mousedown:function(a){if(!this._state.enabled)return!1;this._state.offset=this._offset(this.sliderElem),this._state.size=this.sliderElem[this.sizePos];var b=this._getPercentage(a);if(this.options.range){var c=Math.abs(this._state.percentage[0]-b),d=Math.abs(this._state.percentage[1]-b);this._state.dragged=d>c?0:1}else this._state.dragged=0;this._state.percentage[this._state.dragged]=b,this._layout(),this.touchCapable&&(document.removeEventListener("touchmove",this.mousemove,!1),document.removeEventListener("touchend",this.mouseup,!1)),this.mousemove&&document.removeEventListener("mousemove",this.mousemove,!1),this.mouseup&&document.removeEventListener("mouseup",this.mouseup,!1),this.mousemove=this._mousemove.bind(this),this.mouseup=this._mouseup.bind(this),this.touchCapable&&(document.addEventListener("touchmove",this.mousemove,!1),document.addEventListener("touchend",this.mouseup,!1)),document.addEventListener("mousemove",this.mousemove,!1),document.addEventListener("mouseup",this.mouseup,!1),this._state.inDrag=!0;var e=this._calculateValue();return this._trigger("slideStart",e),this._setDataVal(e),this.setValue(e,!1,!0),this._pauseEvent(a),this.options.focus&&this._triggerFocusOnHandle(this._state.dragged),!0},_triggerFocusOnHandle:function(a){0===a&&this.handle1.focus(),1===a&&this.handle2.focus()},_keydown:function(a,b){if(!this._state.enabled)return!1;var c;switch(b.keyCode){case 37:case 40:c=-1;break;case 39:case 38:c=1}if(c){if(this.options.natural_arrow_keys){var d="vertical"===this.options.orientation&&!this.options.reversed,e="horizontal"===this.options.orientation&&this.options.reversed;(d||e)&&(c=-c)}var f=this._state.value[a]+c*this.options.step;return this.options.range&&(f=[a?this._state.value[0]:f,a?f:this._state.value[1]]),this._trigger("slideStart",f),this._setDataVal(f),this.setValue(f,!0,!0),this._setDataVal(f),this._trigger("slideStop",f),this._layout(),this._pauseEvent(b),!1}},_pauseEvent:function(a){a.stopPropagation&&a.stopPropagation(),a.preventDefault&&a.preventDefault(),a.cancelBubble=!0,a.returnValue=!1},_mousemove:function(a){if(!this._state.enabled)return!1;var b=this._getPercentage(a);this._adjustPercentageForRangeSliders(b),this._state.percentage[this._state.dragged]=b,this._layout();var c=this._calculateValue(!0);return this.setValue(c,!0,!0),!1},_adjustPercentageForRangeSliders:function(a){if(this.options.range){var b=this._getNumDigitsAfterDecimalPlace(a);b=b?b-1:0;var c=this._applyToFixedAndParseFloat(a,b);0===this._state.dragged&&this._applyToFixedAndParseFloat(this._state.percentage[1],b)<c?(this._state.percentage[0]=this._state.percentage[1],this._state.dragged=1):1===this._state.dragged&&this._applyToFixedAndParseFloat(this._state.percentage[0],b)>c&&(this._state.percentage[1]=this._state.percentage[0],this._state.dragged=0)}},_mouseup:function(){if(!this._state.enabled)return!1;this.touchCapable&&(document.removeEventListener("touchmove",this.mousemove,!1),document.removeEventListener("touchend",this.mouseup,!1)),document.removeEventListener("mousemove",this.mousemove,!1),document.removeEventListener("mouseup",this.mouseup,!1),this._state.inDrag=!1,this._state.over===!1&&this._hideTooltip();var a=this._calculateValue(!0);return this._layout(),this._setDataVal(a),this._trigger("slideStop",a),!1},_calculateValue:function(a){var b;if(this.options.range?(b=[this.options.min,this.options.max],0!==this._state.percentage[0]&&(b[0]=this._toValue(this._state.percentage[0]),b[0]=this._applyPrecision(b[0])),100!==this._state.percentage[1]&&(b[1]=this._toValue(this._state.percentage[1]),b[1]=this._applyPrecision(b[1]))):(b=this._toValue(this._state.percentage[0]),b=parseFloat(b),b=this._applyPrecision(b)),a){for(var c=[b,1/0],d=0;d<this.options.ticks.length;d++){var e=Math.abs(this.options.ticks[d]-b);e<=c[1]&&(c=[this.options.ticks[d],e])}if(c[1]<=this.options.ticks_snap_bounds)return c[0]}return b},_applyPrecision:function(a){var b=this.options.precision||this._getNumDigitsAfterDecimalPlace(this.options.step);return this._applyToFixedAndParseFloat(a,b)},_getNumDigitsAfterDecimalPlace:function(a){var b=(""+a).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);return b?Math.max(0,(b[1]?b[1].length:0)-(b[2]?+b[2]:0)):0},_applyToFixedAndParseFloat:function(a,b){var c=a.toFixed(b);return parseFloat(c)},_getPercentage:function(a){!this.touchCapable||"touchstart"!==a.type&&"touchmove"!==a.type||(a=a.touches[0]);var b=a[this.mousePos],c=this._state.offset[this.stylePos],d=b-c,e=d/this._state.size*100;return e=Math.round(e/this._state.percentage[2])*this._state.percentage[2],this.options.reversed&&(e=100-e),Math.max(0,Math.min(100,e))},_validateInputValue:function(a){if("number"==typeof a)return a;if(Array.isArray(a))return this._validateArray(a),a;throw new Error(d.formatInvalidInputErrorMsg(a))},_validateArray:function(a){for(var b=0;b<a.length;b++){var c=a[b];if("number"!=typeof c)throw new Error(d.formatInvalidInputErrorMsg(c))}},_setDataVal:function(a){var b="value: '"+a+"'";this.element.setAttribute("data",b),this.element.setAttribute("value",a),this.element.value=a},_trigger:function(b,c){c=c||0===c?c:void 0;var d=this.eventToCallbackMap[b];if(d&&d.length)for(var e=0;e<d.length;e++){var f=d[e];f(c)}a&&this._triggerJQueryEvent(b,c)},_triggerJQueryEvent:function(a,b){var c={type:a,value:b};this.$element.trigger(c),this.$sliderElem.trigger(c)},_unbindJQueryEventHandlers:function(){this.$element.off(),this.$sliderElem.off()},_setText:function(a,b){"undefined"!=typeof a.innerText?a.innerText=b:"undefined"!=typeof a.textContent&&(a.textContent=b)},_removeClass:function(a,b){for(var c=b.split(" "),d=a.className,e=0;e<c.length;e++){var f=c[e],g=new RegExp("(?:\\s|^)"+f+"(?:\\s|$)");d=d.replace(g," ")}a.className=d.trim()},_addClass:function(a,b){for(var c=b.split(" "),d=a.className,e=0;e<c.length;e++){var f=c[e],g=new RegExp("(?:\\s|^)"+f+"(?:\\s|$)"),h=g.test(d);h||(d+=" "+f)}a.className=d.trim()},_offsetLeft:function(a){return a.getBoundingClientRect().left},_offsetTop:function(a){for(var b=a.offsetTop;(a=a.offsetParent)&&!isNaN(a.offsetTop);)b+=a.offsetTop;return b},_offset:function(a){return{left:this._offsetLeft(a),top:this._offsetTop(a)}},_css:function(b,c,d){if(a)a.style(b,c,d);else{var e=c.replace(/^-ms-/,"ms-").replace(/-([\da-z])/gi,function(a,b){return b.toUpperCase()});b.style[e]=d}},_toValue:function(a){return this.options.scale.toValue.apply(this,[a])},_toPercentage:function(a){return this.options.scale.toPercentage.apply(this,[a])},_setTooltipPosition:function(){var a=[this.tooltip,this.tooltip_min,this.tooltip_max];if("vertical"===this.options.orientation){var b=this.options.tooltip_position||"right",c="left"===b?"right":"left";a.forEach(function(a){this._addClass(a,b),a.style[c]="100%"}.bind(this))}else a.forEach("bottom"===this.options.tooltip_position?function(a){this._addClass(a,"bottom"),a.style.top="22px"}.bind(this):function(a){this._addClass(a,"top"),a.style.top=-this.tooltip.outerHeight-14+"px"}.bind(this))}},a){var f=a.fn.slider?"bootstrapSlider":"slider";a.bridget(f,b)}}(a),b});
(function(){var t=[].slice;!function(e,i){"use strict";var n;return n=function(){function t(t,i){null==i&&(i={}),this.$element=e(t),this.options=e.extend({},e.fn.bootstrapSwitch.defaults,{state:this.$element.is(":checked"),size:this.$element.data("size"),animate:this.$element.data("animate"),disabled:this.$element.is(":disabled"),readonly:this.$element.is("[readonly]"),indeterminate:this.$element.data("indeterminate"),inverse:this.$element.data("inverse"),radioAllOff:this.$element.data("radio-all-off"),onColor:this.$element.data("on-color"),offColor:this.$element.data("off-color"),onText:this.$element.data("on-text"),offText:this.$element.data("off-text"),labelText:this.$element.data("label-text"),handleWidth:this.$element.data("handle-width"),labelWidth:this.$element.data("label-width"),baseClass:this.$element.data("base-class"),wrapperClass:this.$element.data("wrapper-class")},i),this.$wrapper=e("<div>",{"class":function(t){return function(){var e;return e=[""+t.options.baseClass].concat(t._getClasses(t.options.wrapperClass)),e.push(t.options.state?""+t.options.baseClass+"-on":""+t.options.baseClass+"-off"),null!=t.options.size&&e.push(""+t.options.baseClass+"-"+t.options.size),t.options.disabled&&e.push(""+t.options.baseClass+"-disabled"),t.options.readonly&&e.push(""+t.options.baseClass+"-readonly"),t.options.indeterminate&&e.push(""+t.options.baseClass+"-indeterminate"),t.options.inverse&&e.push(""+t.options.baseClass+"-inverse"),t.$element.attr("id")&&e.push(""+t.options.baseClass+"-id-"+t.$element.attr("id")),e.join(" ")}}(this)()}),this.$container=e("<div>",{"class":""+this.options.baseClass+"-container"}),this.$on=e("<span>",{html:this.options.onText,"class":""+this.options.baseClass+"-handle-on "+this.options.baseClass+"-"+this.options.onColor}),this.$off=e("<span>",{html:this.options.offText,"class":""+this.options.baseClass+"-handle-off "+this.options.baseClass+"-"+this.options.offColor}),this.$label=e("<span>",{html:this.options.labelText,"class":""+this.options.baseClass+"-label"}),this.$element.on("init.bootstrapSwitch",function(e){return function(){return e.options.onInit.apply(t,arguments)}}(this)),this.$element.on("switchChange.bootstrapSwitch",function(e){return function(){return e.options.onSwitchChange.apply(t,arguments)}}(this)),this.$container=this.$element.wrap(this.$container).parent(),this.$wrapper=this.$container.wrap(this.$wrapper).parent(),this.$element.before(this.options.inverse?this.$off:this.$on).before(this.$label).before(this.options.inverse?this.$on:this.$off),this.options.indeterminate&&this.$element.prop("indeterminate",!0),this._init(),this._elementHandlers(),this._handleHandlers(),this._labelHandlers(),this._formHandler(),this._externalLabelHandler(),this.$element.trigger("init.bootstrapSwitch")}return t.prototype._constructor=t,t.prototype.state=function(t,e){return"undefined"==typeof t?this.options.state:this.options.disabled||this.options.readonly?this.$element:this.options.state&&!this.options.radioAllOff&&this.$element.is(":radio")?this.$element:(this.options.indeterminate&&this.indeterminate(!1),t=!!t,this.$element.prop("checked",t).trigger("change.bootstrapSwitch",e),this.$element)},t.prototype.toggleState=function(t){return this.options.disabled||this.options.readonly?this.$element:this.options.indeterminate?(this.indeterminate(!1),this.state(!0)):this.$element.prop("checked",!this.options.state).trigger("change.bootstrapSwitch",t)},t.prototype.size=function(t){return"undefined"==typeof t?this.options.size:(null!=this.options.size&&this.$wrapper.removeClass(""+this.options.baseClass+"-"+this.options.size),t&&this.$wrapper.addClass(""+this.options.baseClass+"-"+t),this._width(),this._containerPosition(),this.options.size=t,this.$element)},t.prototype.animate=function(t){return"undefined"==typeof t?this.options.animate:(t=!!t,t===this.options.animate?this.$element:this.toggleAnimate())},t.prototype.toggleAnimate=function(){return this.options.animate=!this.options.animate,this.$wrapper.toggleClass(""+this.options.baseClass+"-animate"),this.$element},t.prototype.disabled=function(t){return"undefined"==typeof t?this.options.disabled:(t=!!t,t===this.options.disabled?this.$element:this.toggleDisabled())},t.prototype.toggleDisabled=function(){return this.options.disabled=!this.options.disabled,this.$element.prop("disabled",this.options.disabled),this.$wrapper.toggleClass(""+this.options.baseClass+"-disabled"),this.$element},t.prototype.readonly=function(t){return"undefined"==typeof t?this.options.readonly:(t=!!t,t===this.options.readonly?this.$element:this.toggleReadonly())},t.prototype.toggleReadonly=function(){return this.options.readonly=!this.options.readonly,this.$element.prop("readonly",this.options.readonly),this.$wrapper.toggleClass(""+this.options.baseClass+"-readonly"),this.$element},t.prototype.indeterminate=function(t){return"undefined"==typeof t?this.options.indeterminate:(t=!!t,t===this.options.indeterminate?this.$element:this.toggleIndeterminate())},t.prototype.toggleIndeterminate=function(){return this.options.indeterminate=!this.options.indeterminate,this.$element.prop("indeterminate",this.options.indeterminate),this.$wrapper.toggleClass(""+this.options.baseClass+"-indeterminate"),this._containerPosition(),this.$element},t.prototype.inverse=function(t){return"undefined"==typeof t?this.options.inverse:(t=!!t,t===this.options.inverse?this.$element:this.toggleInverse())},t.prototype.toggleInverse=function(){var t,e;return this.$wrapper.toggleClass(""+this.options.baseClass+"-inverse"),e=this.$on.clone(!0),t=this.$off.clone(!0),this.$on.replaceWith(t),this.$off.replaceWith(e),this.$on=t,this.$off=e,this.options.inverse=!this.options.inverse,this.$element},t.prototype.onColor=function(t){var e;return e=this.options.onColor,"undefined"==typeof t?e:(null!=e&&this.$on.removeClass(""+this.options.baseClass+"-"+e),this.$on.addClass(""+this.options.baseClass+"-"+t),this.options.onColor=t,this.$element)},t.prototype.offColor=function(t){var e;return e=this.options.offColor,"undefined"==typeof t?e:(null!=e&&this.$off.removeClass(""+this.options.baseClass+"-"+e),this.$off.addClass(""+this.options.baseClass+"-"+t),this.options.offColor=t,this.$element)},t.prototype.onText=function(t){return"undefined"==typeof t?this.options.onText:(this.$on.html(t),this._width(),this._containerPosition(),this.options.onText=t,this.$element)},t.prototype.offText=function(t){return"undefined"==typeof t?this.options.offText:(this.$off.html(t),this._width(),this._containerPosition(),this.options.offText=t,this.$element)},t.prototype.labelText=function(t){return"undefined"==typeof t?this.options.labelText:(this.$label.html(t),this._width(),this.options.labelText=t,this.$element)},t.prototype.handleWidth=function(t){return"undefined"==typeof t?this.options.handleWidth:(this.options.handleWidth=t,this._width(),this._containerPosition(),this.$element)},t.prototype.labelWidth=function(t){return"undefined"==typeof t?this.options.labelWidth:(this.options.labelWidth=t,this._width(),this._containerPosition(),this.$element)},t.prototype.baseClass=function(){return this.options.baseClass},t.prototype.wrapperClass=function(t){return"undefined"==typeof t?this.options.wrapperClass:(t||(t=e.fn.bootstrapSwitch.defaults.wrapperClass),this.$wrapper.removeClass(this._getClasses(this.options.wrapperClass).join(" ")),this.$wrapper.addClass(this._getClasses(t).join(" ")),this.options.wrapperClass=t,this.$element)},t.prototype.radioAllOff=function(t){return"undefined"==typeof t?this.options.radioAllOff:(t=!!t,t===this.options.radioAllOff?this.$element:(this.options.radioAllOff=t,this.$element))},t.prototype.onInit=function(t){return"undefined"==typeof t?this.options.onInit:(t||(t=e.fn.bootstrapSwitch.defaults.onInit),this.options.onInit=t,this.$element)},t.prototype.onSwitchChange=function(t){return"undefined"==typeof t?this.options.onSwitchChange:(t||(t=e.fn.bootstrapSwitch.defaults.onSwitchChange),this.options.onSwitchChange=t,this.$element)},t.prototype.destroy=function(){var t;return t=this.$element.closest("form"),t.length&&t.off("reset.bootstrapSwitch").removeData("bootstrap-switch"),this.$container.children().not(this.$element).remove(),this.$element.unwrap().unwrap().off(".bootstrapSwitch").removeData("bootstrap-switch"),this.$element},t.prototype._width=function(){var t,e;return t=this.$on.add(this.$off),t.add(this.$label).css("width",""),e="auto"===this.options.handleWidth?Math.max(this.$on.width(),this.$off.width()):this.options.handleWidth,t.width(e),this.$label.width(function(t){return function(i,n){return"auto"!==t.options.labelWidth?t.options.labelWidth:e>n?e:n}}(this)),this._handleWidth=this.$on.outerWidth(),this._labelWidth=this.$label.outerWidth(),this.$container.width(2*this._handleWidth+this._labelWidth),this.$wrapper.width(this._handleWidth+this._labelWidth)},t.prototype._containerPosition=function(t,e){return null==t&&(t=this.options.state),this.$container.css("margin-left",function(e){return function(){var i;return i=[0,"-"+e._handleWidth+"px"],e.options.indeterminate?"-"+e._handleWidth/2+"px":t?e.options.inverse?i[1]:i[0]:e.options.inverse?i[0]:i[1]}}(this)),e?setTimeout(function(){return e()},50):void 0},t.prototype._init=function(){var t,e;return t=function(t){return function(){return t._width(),t._containerPosition(null,function(){return t.options.animate?t.$wrapper.addClass(""+t.options.baseClass+"-animate"):void 0})}}(this),this.$wrapper.is(":visible")?t():e=i.setInterval(function(n){return function(){return n.$wrapper.is(":visible")?(t(),i.clearInterval(e)):void 0}}(this),50)},t.prototype._elementHandlers=function(){return this.$element.on({"change.bootstrapSwitch":function(t){return function(i,n){var o;return i.preventDefault(),i.stopImmediatePropagation(),o=t.$element.is(":checked"),t._containerPosition(o),o!==t.options.state?(t.options.state=o,t.$wrapper.toggleClass(""+t.options.baseClass+"-off").toggleClass(""+t.options.baseClass+"-on"),n?void 0:(t.$element.is(":radio")&&e("[name='"+t.$element.attr("name")+"']").not(t.$element).prop("checked",!1).trigger("change.bootstrapSwitch",!0),t.$element.trigger("switchChange.bootstrapSwitch",[o]))):void 0}}(this),"focus.bootstrapSwitch":function(t){return function(e){return e.preventDefault(),t.$wrapper.addClass(""+t.options.baseClass+"-focused")}}(this),"blur.bootstrapSwitch":function(t){return function(e){return e.preventDefault(),t.$wrapper.removeClass(""+t.options.baseClass+"-focused")}}(this),"keydown.bootstrapSwitch":function(t){return function(e){if(e.which&&!t.options.disabled&&!t.options.readonly)switch(e.which){case 37:return e.preventDefault(),e.stopImmediatePropagation(),t.state(!1);case 39:return e.preventDefault(),e.stopImmediatePropagation(),t.state(!0)}}}(this)})},t.prototype._handleHandlers=function(){return this.$on.on("click.bootstrapSwitch",function(t){return function(e){return e.preventDefault(),e.stopPropagation(),t.state(!1),t.$element.trigger("focus.bootstrapSwitch")}}(this)),this.$off.on("click.bootstrapSwitch",function(t){return function(e){return e.preventDefault(),e.stopPropagation(),t.state(!0),t.$element.trigger("focus.bootstrapSwitch")}}(this))},t.prototype._labelHandlers=function(){return this.$label.on({"mousedown.bootstrapSwitch touchstart.bootstrapSwitch":function(t){return function(e){return t._dragStart||t.options.disabled||t.options.readonly?void 0:(e.preventDefault(),e.stopPropagation(),t._dragStart=(e.pageX||e.originalEvent.touches[0].pageX)-parseInt(t.$container.css("margin-left"),10),t.options.animate&&t.$wrapper.removeClass(""+t.options.baseClass+"-animate"),t.$element.trigger("focus.bootstrapSwitch"))}}(this),"mousemove.bootstrapSwitch touchmove.bootstrapSwitch":function(t){return function(e){var i;if(null!=t._dragStart&&(e.preventDefault(),i=(e.pageX||e.originalEvent.touches[0].pageX)-t._dragStart,!(i<-t._handleWidth||i>0)))return t._dragEnd=i,t.$container.css("margin-left",""+t._dragEnd+"px")}}(this),"mouseup.bootstrapSwitch touchend.bootstrapSwitch":function(t){return function(e){var i;if(t._dragStart)return e.preventDefault(),t.options.animate&&t.$wrapper.addClass(""+t.options.baseClass+"-animate"),t._dragEnd?(i=t._dragEnd>-(t._handleWidth/2),t._dragEnd=!1,t.state(t.options.inverse?!i:i)):t.state(!t.options.state),t._dragStart=!1}}(this),"mouseleave.bootstrapSwitch":function(t){return function(){return t.$label.trigger("mouseup.bootstrapSwitch")}}(this)})},t.prototype._externalLabelHandler=function(){var t;return t=this.$element.closest("label"),t.on("click",function(e){return function(i){return i.preventDefault(),i.stopImmediatePropagation(),i.target===t[0]?e.toggleState():void 0}}(this))},t.prototype._formHandler=function(){var t;return t=this.$element.closest("form"),t.data("bootstrap-switch")?void 0:t.on("reset.bootstrapSwitch",function(){return i.setTimeout(function(){return t.find("input").filter(function(){return e(this).data("bootstrap-switch")}).each(function(){return e(this).bootstrapSwitch("state",this.checked)})},1)}).data("bootstrap-switch",!0)},t.prototype._getClasses=function(t){var i,n,o,s;if(!e.isArray(t))return[""+this.options.baseClass+"-"+t];for(n=[],o=0,s=t.length;s>o;o++)i=t[o],n.push(""+this.options.baseClass+"-"+i);return n},t}(),e.fn.bootstrapSwitch=function(){var i,o,s;return o=arguments[0],i=2<=arguments.length?t.call(arguments,1):[],s=this,this.each(function(){var t,a;return t=e(this),a=t.data("bootstrap-switch"),a||t.data("bootstrap-switch",a=new n(this,o)),"string"==typeof o?s=a[o].apply(a,i):void 0}),s},e.fn.bootstrapSwitch.Constructor=n,e.fn.bootstrapSwitch.defaults={state:!0,size:null,animate:!0,disabled:!1,readonly:!1,indeterminate:!1,inverse:!1,radioAllOff:!1,onColor:"primary",offColor:"default",onText:"ON",offText:"OFF",labelText:"&nbsp;",handleWidth:"auto",labelWidth:"auto",baseClass:"bootstrap-switch",wrapperClass:"wrapper",onInit:function(){},onSwitchChange:function(){}}}(window.jQuery,window)}).call(this);
/*!
 * numeral.js
 * version : 1.5.3
 * author : Adam Draper
 * license : MIT
 * http://adamwdraper.github.com/Numeral-js/
 */
(function(){function a(a){this._value=a}function b(a,b,c,d){var e,f,g=Math.pow(10,b);return f=(c(a*g)/g).toFixed(b),d&&(e=new RegExp("0{1,"+d+"}$"),f=f.replace(e,"")),f}function c(a,b,c){var d;return d=b.indexOf("$")>-1?e(a,b,c):b.indexOf("%")>-1?f(a,b,c):b.indexOf(":")>-1?g(a,b):i(a._value,b,c)}function d(a,b){var c,d,e,f,g,i=b,j=["KB","MB","GB","TB","PB","EB","ZB","YB"],k=!1;if(b.indexOf(":")>-1)a._value=h(b);else if(b===q)a._value=0;else{for("."!==o[p].delimiters.decimal&&(b=b.replace(/\./g,"").replace(o[p].delimiters.decimal,".")),c=new RegExp("[^a-zA-Z]"+o[p].abbreviations.thousand+"(?:\\)|(\\"+o[p].currency.symbol+")?(?:\\))?)?$"),d=new RegExp("[^a-zA-Z]"+o[p].abbreviations.million+"(?:\\)|(\\"+o[p].currency.symbol+")?(?:\\))?)?$"),e=new RegExp("[^a-zA-Z]"+o[p].abbreviations.billion+"(?:\\)|(\\"+o[p].currency.symbol+")?(?:\\))?)?$"),f=new RegExp("[^a-zA-Z]"+o[p].abbreviations.trillion+"(?:\\)|(\\"+o[p].currency.symbol+")?(?:\\))?)?$"),g=0;g<=j.length&&!(k=b.indexOf(j[g])>-1?Math.pow(1024,g+1):!1);g++);a._value=(k?k:1)*(i.match(c)?Math.pow(10,3):1)*(i.match(d)?Math.pow(10,6):1)*(i.match(e)?Math.pow(10,9):1)*(i.match(f)?Math.pow(10,12):1)*(b.indexOf("%")>-1?.01:1)*((b.split("-").length+Math.min(b.split("(").length-1,b.split(")").length-1))%2?1:-1)*Number(b.replace(/[^0-9\.]+/g,"")),a._value=k?Math.ceil(a._value):a._value}return a._value}function e(a,b,c){var d,e,f=b.indexOf("$"),g=b.indexOf("("),h=b.indexOf("-"),j="";return b.indexOf(" $")>-1?(j=" ",b=b.replace(" $","")):b.indexOf("$ ")>-1?(j=" ",b=b.replace("$ ","")):b=b.replace("$",""),e=i(a._value,b,c),1>=f?e.indexOf("(")>-1||e.indexOf("-")>-1?(e=e.split(""),d=1,(g>f||h>f)&&(d=0),e.splice(d,0,o[p].currency.symbol+j),e=e.join("")):e=o[p].currency.symbol+j+e:e.indexOf(")")>-1?(e=e.split(""),e.splice(-1,0,j+o[p].currency.symbol),e=e.join("")):e=e+j+o[p].currency.symbol,e}function f(a,b,c){var d,e="",f=100*a._value;return b.indexOf(" %")>-1?(e=" ",b=b.replace(" %","")):b=b.replace("%",""),d=i(f,b,c),d.indexOf(")")>-1?(d=d.split(""),d.splice(-1,0,e+"%"),d=d.join("")):d=d+e+"%",d}function g(a){var b=Math.floor(a._value/60/60),c=Math.floor((a._value-60*b*60)/60),d=Math.round(a._value-60*b*60-60*c);return b+":"+(10>c?"0"+c:c)+":"+(10>d?"0"+d:d)}function h(a){var b=a.split(":"),c=0;return 3===b.length?(c+=60*Number(b[0])*60,c+=60*Number(b[1]),c+=Number(b[2])):2===b.length&&(c+=60*Number(b[0]),c+=Number(b[1])),Number(c)}function i(a,c,d){var e,f,g,h,i,j,k=!1,l=!1,m=!1,n="",r=!1,s=!1,t=!1,u=!1,v=!1,w="",x="",y=Math.abs(a),z=["B","KB","MB","GB","TB","PB","EB","ZB","YB"],A="",B=!1;if(0===a&&null!==q)return q;if(c.indexOf("(")>-1?(k=!0,c=c.slice(1,-1)):c.indexOf("+")>-1&&(l=!0,c=c.replace(/\+/g,"")),c.indexOf("a")>-1&&(r=c.indexOf("aK")>=0,s=c.indexOf("aM")>=0,t=c.indexOf("aB")>=0,u=c.indexOf("aT")>=0,v=r||s||t||u,c.indexOf(" a")>-1?(n=" ",c=c.replace(" a","")):c=c.replace("a",""),y>=Math.pow(10,12)&&!v||u?(n+=o[p].abbreviations.trillion,a/=Math.pow(10,12)):y<Math.pow(10,12)&&y>=Math.pow(10,9)&&!v||t?(n+=o[p].abbreviations.billion,a/=Math.pow(10,9)):y<Math.pow(10,9)&&y>=Math.pow(10,6)&&!v||s?(n+=o[p].abbreviations.million,a/=Math.pow(10,6)):(y<Math.pow(10,6)&&y>=Math.pow(10,3)&&!v||r)&&(n+=o[p].abbreviations.thousand,a/=Math.pow(10,3))),c.indexOf("b")>-1)for(c.indexOf(" b")>-1?(w=" ",c=c.replace(" b","")):c=c.replace("b",""),g=0;g<=z.length;g++)if(e=Math.pow(1024,g),f=Math.pow(1024,g+1),a>=e&&f>a){w+=z[g],e>0&&(a/=e);break}return c.indexOf("o")>-1&&(c.indexOf(" o")>-1?(x=" ",c=c.replace(" o","")):c=c.replace("o",""),x+=o[p].ordinal(a)),c.indexOf("[.]")>-1&&(m=!0,c=c.replace("[.]",".")),h=a.toString().split(".")[0],i=c.split(".")[1],j=c.indexOf(","),i?(i.indexOf("[")>-1?(i=i.replace("]",""),i=i.split("["),A=b(a,i[0].length+i[1].length,d,i[1].length)):A=b(a,i.length,d),h=A.split(".")[0],A=A.split(".")[1].length?o[p].delimiters.decimal+A.split(".")[1]:"",m&&0===Number(A.slice(1))&&(A="")):h=b(a,null,d),h.indexOf("-")>-1&&(h=h.slice(1),B=!0),j>-1&&(h=h.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1"+o[p].delimiters.thousands)),0===c.indexOf(".")&&(h=""),(k&&B?"(":"")+(!k&&B?"-":"")+(!B&&l?"+":"")+h+A+(x?x:"")+(n?n:"")+(w?w:"")+(k&&B?")":"")}function j(a,b){o[a]=b}function k(a){var b=a.toString().split(".");return b.length<2?1:Math.pow(10,b[1].length)}function l(){var a=Array.prototype.slice.call(arguments);return a.reduce(function(a,b){var c=k(a),d=k(b);return c>d?c:d},-1/0)}var m,n="1.5.3",o={},p="en",q=null,r="0,0",s="undefined"!=typeof module&&module.exports;m=function(b){return m.isNumeral(b)?b=b.value():0===b||"undefined"==typeof b?b=0:Number(b)||(b=m.fn.unformat(b)),new a(Number(b))},m.version=n,m.isNumeral=function(b){return b instanceof a},m.language=function(a,b){if(!a)return p;if(a&&!b){if(!o[a])throw new Error("Unknown language : "+a);p=a}return(b||!o[a])&&j(a,b),m},m.languageData=function(a){if(!a)return o[p];if(!o[a])throw new Error("Unknown language : "+a);return o[a]},m.language("en",{delimiters:{thousands:",",decimal:"."},abbreviations:{thousand:"k",million:"m",billion:"b",trillion:"t"},ordinal:function(a){var b=a%10;return 1===~~(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th"},currency:{symbol:"$"}}),m.zeroFormat=function(a){q="string"==typeof a?a:null},m.defaultFormat=function(a){r="string"==typeof a?a:"0.0"},"function"!=typeof Array.prototype.reduce&&(Array.prototype.reduce=function(a,b){"use strict";if(null===this||"undefined"==typeof this)throw new TypeError("Array.prototype.reduce called on null or undefined");if("function"!=typeof a)throw new TypeError(a+" is not a function");var c,d,e=this.length>>>0,f=!1;for(1<arguments.length&&(d=b,f=!0),c=0;e>c;++c)this.hasOwnProperty(c)&&(f?d=a(d,this[c],c,this):(d=this[c],f=!0));if(!f)throw new TypeError("Reduce of empty array with no initial value");return d}),m.fn=a.prototype={clone:function(){return m(this)},format:function(a,b){return c(this,a?a:r,void 0!==b?b:Math.round)},unformat:function(a){return"[object Number]"===Object.prototype.toString.call(a)?a:d(this,a?a:r)},value:function(){return this._value},valueOf:function(){return this._value},set:function(a){return this._value=Number(a),this},add:function(a){function b(a,b){return a+c*b}var c=l.call(null,this._value,a);return this._value=[this._value,a].reduce(b,0)/c,this},subtract:function(a){function b(a,b){return a-c*b}var c=l.call(null,this._value,a);return this._value=[a].reduce(b,this._value*c)/c,this},multiply:function(a){function b(a,b){var c=l(a,b);return a*c*b*c/(c*c)}return this._value=[this._value,a].reduce(b,1),this},divide:function(a){function b(a,b){var c=l(a,b);return a*c/(b*c)}return this._value=[this._value,a].reduce(b),this},difference:function(a){return Math.abs(m(this._value).subtract(a).value())}},s&&(module.exports=m),"undefined"==typeof ender&&(this.numeral=m),"function"==typeof define&&define.amd&&define([],function(){return m})}).call(this);
/*!
 * Chart.js
 * http://chartjs.org/
 * Version: 1.0.2
 *
 * Copyright 2015 Nick Downie
 * Released under the MIT license
 * https://github.com/nnnick/Chart.js/blob/master/LICENSE.md
 */
(function(){"use strict";var t=this,i=t.Chart,e=function(t){this.canvas=t.canvas,this.ctx=t;var i=function(t,i){return t["offset"+i]?t["offset"+i]:document.defaultView.getComputedStyle(t).getPropertyValue(i)},e=this.width=i(t.canvas,"Width"),n=this.height=i(t.canvas,"Height");t.canvas.width=e,t.canvas.height=n;var e=this.width=t.canvas.width,n=this.height=t.canvas.height;return this.aspectRatio=this.width/this.height,s.retinaScale(this),this};e.defaults={global:{animation:!0,animationSteps:60,animationEasing:"easeOutQuart",showScale:!0,scaleOverride:!1,scaleSteps:null,scaleStepWidth:null,scaleStartValue:null,scaleLineColor:"rgba(0,0,0,.1)",scaleLineWidth:1,scaleShowLabels:!0,scaleLabel:"<%=value%>",scaleIntegersOnly:!0,scaleBeginAtZero:!1,scaleFontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",scaleFontSize:12,scaleFontStyle:"normal",scaleFontColor:"#666",responsive:!1,maintainAspectRatio:!0,showTooltips:!0,customTooltips:!1,tooltipEvents:["mousemove","touchstart","touchmove","mouseout"],tooltipFillColor:"rgba(0,0,0,0.8)",tooltipFontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",tooltipFontSize:14,tooltipFontStyle:"normal",tooltipFontColor:"#fff",tooltipTitleFontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",tooltipTitleFontSize:14,tooltipTitleFontStyle:"bold",tooltipTitleFontColor:"#fff",tooltipYPadding:6,tooltipXPadding:6,tooltipCaretSize:8,tooltipCornerRadius:6,tooltipXOffset:10,tooltipTemplate:"<%if (label){%><%=label%>: <%}%><%= value %>",multiTooltipTemplate:"<%= value %>",multiTooltipKeyBackground:"#fff",onAnimationProgress:function(){},onAnimationComplete:function(){}}},e.types={};var s=e.helpers={},n=s.each=function(t,i,e){var s=Array.prototype.slice.call(arguments,3);if(t)if(t.length===+t.length){var n;for(n=0;n<t.length;n++)i.apply(e,[t[n],n].concat(s))}else for(var o in t)i.apply(e,[t[o],o].concat(s))},o=s.clone=function(t){var i={};return n(t,function(e,s){t.hasOwnProperty(s)&&(i[s]=e)}),i},a=s.extend=function(t){return n(Array.prototype.slice.call(arguments,1),function(i){n(i,function(e,s){i.hasOwnProperty(s)&&(t[s]=e)})}),t},h=s.merge=function(){var t=Array.prototype.slice.call(arguments,0);return t.unshift({}),a.apply(null,t)},l=s.indexOf=function(t,i){if(Array.prototype.indexOf)return t.indexOf(i);for(var e=0;e<t.length;e++)if(t[e]===i)return e;return-1},r=(s.where=function(t,i){var e=[];return s.each(t,function(t){i(t)&&e.push(t)}),e},s.findNextWhere=function(t,i,e){e||(e=-1);for(var s=e+1;s<t.length;s++){var n=t[s];if(i(n))return n}},s.findPreviousWhere=function(t,i,e){e||(e=t.length);for(var s=e-1;s>=0;s--){var n=t[s];if(i(n))return n}},s.inherits=function(t){var i=this,e=t&&t.hasOwnProperty("constructor")?t.constructor:function(){return i.apply(this,arguments)},s=function(){this.constructor=e};return s.prototype=i.prototype,e.prototype=new s,e.extend=r,t&&a(e.prototype,t),e.__super__=i.prototype,e}),c=s.noop=function(){},u=s.uid=function(){var t=0;return function(){return"chart-"+t++}}(),d=s.warn=function(t){window.console&&"function"==typeof window.console.warn&&console.warn(t)},p=s.amd="function"==typeof define&&define.amd,f=s.isNumber=function(t){return!isNaN(parseFloat(t))&&isFinite(t)},g=s.max=function(t){return Math.max.apply(Math,t)},m=s.min=function(t){return Math.min.apply(Math,t)},v=(s.cap=function(t,i,e){if(f(i)){if(t>i)return i}else if(f(e)&&e>t)return e;return t},s.getDecimalPlaces=function(t){return t%1!==0&&f(t)?t.toString().split(".")[1].length:0}),S=s.radians=function(t){return t*(Math.PI/180)},x=(s.getAngleFromPoint=function(t,i){var e=i.x-t.x,s=i.y-t.y,n=Math.sqrt(e*e+s*s),o=2*Math.PI+Math.atan2(s,e);return 0>e&&0>s&&(o+=2*Math.PI),{angle:o,distance:n}},s.aliasPixel=function(t){return t%2===0?0:.5}),y=(s.splineCurve=function(t,i,e,s){var n=Math.sqrt(Math.pow(i.x-t.x,2)+Math.pow(i.y-t.y,2)),o=Math.sqrt(Math.pow(e.x-i.x,2)+Math.pow(e.y-i.y,2)),a=s*n/(n+o),h=s*o/(n+o);return{inner:{x:i.x-a*(e.x-t.x),y:i.y-a*(e.y-t.y)},outer:{x:i.x+h*(e.x-t.x),y:i.y+h*(e.y-t.y)}}},s.calculateOrderOfMagnitude=function(t){return Math.floor(Math.log(t)/Math.LN10)}),C=(s.calculateScaleRange=function(t,i,e,s,n){var o=2,a=Math.floor(i/(1.5*e)),h=o>=a,l=g(t),r=m(t);l===r&&(l+=.5,r>=.5&&!s?r-=.5:l+=.5);for(var c=Math.abs(l-r),u=y(c),d=Math.ceil(l/(1*Math.pow(10,u)))*Math.pow(10,u),p=s?0:Math.floor(r/(1*Math.pow(10,u)))*Math.pow(10,u),f=d-p,v=Math.pow(10,u),S=Math.round(f/v);(S>a||a>2*S)&&!h;)if(S>a)v*=2,S=Math.round(f/v),S%1!==0&&(h=!0);else if(n&&u>=0){if(v/2%1!==0)break;v/=2,S=Math.round(f/v)}else v/=2,S=Math.round(f/v);return h&&(S=o,v=f/S),{steps:S,stepValue:v,min:p,max:p+S*v}},s.template=function(t,i){function e(t,i){var e=/\W/.test(t)?new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+t.replace(/[\r\t\n]/g," ").split("<%").join("	").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("	").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');"):s[t]=s[t];return i?e(i):e}if(t instanceof Function)return t(i);var s={};return e(t,i)}),w=(s.generateLabels=function(t,i,e,s){var o=new Array(i);return labelTemplateString&&n(o,function(i,n){o[n]=C(t,{value:e+s*(n+1)})}),o},s.easingEffects={linear:function(t){return t},easeInQuad:function(t){return t*t},easeOutQuad:function(t){return-1*t*(t-2)},easeInOutQuad:function(t){return(t/=.5)<1?.5*t*t:-0.5*(--t*(t-2)-1)},easeInCubic:function(t){return t*t*t},easeOutCubic:function(t){return 1*((t=t/1-1)*t*t+1)},easeInOutCubic:function(t){return(t/=.5)<1?.5*t*t*t:.5*((t-=2)*t*t+2)},easeInQuart:function(t){return t*t*t*t},easeOutQuart:function(t){return-1*((t=t/1-1)*t*t*t-1)},easeInOutQuart:function(t){return(t/=.5)<1?.5*t*t*t*t:-0.5*((t-=2)*t*t*t-2)},easeInQuint:function(t){return 1*(t/=1)*t*t*t*t},easeOutQuint:function(t){return 1*((t=t/1-1)*t*t*t*t+1)},easeInOutQuint:function(t){return(t/=.5)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)},easeInSine:function(t){return-1*Math.cos(t/1*(Math.PI/2))+1},easeOutSine:function(t){return 1*Math.sin(t/1*(Math.PI/2))},easeInOutSine:function(t){return-0.5*(Math.cos(Math.PI*t/1)-1)},easeInExpo:function(t){return 0===t?1:1*Math.pow(2,10*(t/1-1))},easeOutExpo:function(t){return 1===t?1:1*(-Math.pow(2,-10*t/1)+1)},easeInOutExpo:function(t){return 0===t?0:1===t?1:(t/=.5)<1?.5*Math.pow(2,10*(t-1)):.5*(-Math.pow(2,-10*--t)+2)},easeInCirc:function(t){return t>=1?t:-1*(Math.sqrt(1-(t/=1)*t)-1)},easeOutCirc:function(t){return 1*Math.sqrt(1-(t=t/1-1)*t)},easeInOutCirc:function(t){return(t/=.5)<1?-0.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},easeInElastic:function(t){var i=1.70158,e=0,s=1;return 0===t?0:1==(t/=1)?1:(e||(e=.3),s<Math.abs(1)?(s=1,i=e/4):i=e/(2*Math.PI)*Math.asin(1/s),-(s*Math.pow(2,10*(t-=1))*Math.sin(2*(1*t-i)*Math.PI/e)))},easeOutElastic:function(t){var i=1.70158,e=0,s=1;return 0===t?0:1==(t/=1)?1:(e||(e=.3),s<Math.abs(1)?(s=1,i=e/4):i=e/(2*Math.PI)*Math.asin(1/s),s*Math.pow(2,-10*t)*Math.sin(2*(1*t-i)*Math.PI/e)+1)},easeInOutElastic:function(t){var i=1.70158,e=0,s=1;return 0===t?0:2==(t/=.5)?1:(e||(e=.3*1.5),s<Math.abs(1)?(s=1,i=e/4):i=e/(2*Math.PI)*Math.asin(1/s),1>t?-.5*s*Math.pow(2,10*(t-=1))*Math.sin(2*(1*t-i)*Math.PI/e):s*Math.pow(2,-10*(t-=1))*Math.sin(2*(1*t-i)*Math.PI/e)*.5+1)},easeInBack:function(t){var i=1.70158;return 1*(t/=1)*t*((i+1)*t-i)},easeOutBack:function(t){var i=1.70158;return 1*((t=t/1-1)*t*((i+1)*t+i)+1)},easeInOutBack:function(t){var i=1.70158;return(t/=.5)<1?.5*t*t*(((i*=1.525)+1)*t-i):.5*((t-=2)*t*(((i*=1.525)+1)*t+i)+2)},easeInBounce:function(t){return 1-w.easeOutBounce(1-t)},easeOutBounce:function(t){return(t/=1)<1/2.75?7.5625*t*t:2/2.75>t?1*(7.5625*(t-=1.5/2.75)*t+.75):2.5/2.75>t?1*(7.5625*(t-=2.25/2.75)*t+.9375):1*(7.5625*(t-=2.625/2.75)*t+.984375)},easeInOutBounce:function(t){return.5>t?.5*w.easeInBounce(2*t):.5*w.easeOutBounce(2*t-1)+.5}}),b=s.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){return window.setTimeout(t,1e3/60)}}(),P=s.cancelAnimFrame=function(){return window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.oCancelAnimationFrame||window.msCancelAnimationFrame||function(t){return window.clearTimeout(t,1e3/60)}}(),L=(s.animationLoop=function(t,i,e,s,n,o){var a=0,h=w[e]||w.linear,l=function(){a++;var e=a/i,r=h(e);t.call(o,r,e,a),s.call(o,r,e),i>a?o.animationFrame=b(l):n.apply(o)};b(l)},s.getRelativePosition=function(t){var i,e,s=t.originalEvent||t,n=t.currentTarget||t.srcElement,o=n.getBoundingClientRect();return s.touches?(i=s.touches[0].clientX-o.left,e=s.touches[0].clientY-o.top):(i=s.clientX-o.left,e=s.clientY-o.top),{x:i,y:e}},s.addEvent=function(t,i,e){t.addEventListener?t.addEventListener(i,e):t.attachEvent?t.attachEvent("on"+i,e):t["on"+i]=e}),k=s.removeEvent=function(t,i,e){t.removeEventListener?t.removeEventListener(i,e,!1):t.detachEvent?t.detachEvent("on"+i,e):t["on"+i]=c},F=(s.bindEvents=function(t,i,e){t.events||(t.events={}),n(i,function(i){t.events[i]=function(){e.apply(t,arguments)},L(t.chart.canvas,i,t.events[i])})},s.unbindEvents=function(t,i){n(i,function(i,e){k(t.chart.canvas,e,i)})}),R=s.getMaximumWidth=function(t){var i=t.parentNode;return i.clientWidth},T=s.getMaximumHeight=function(t){var i=t.parentNode;return i.clientHeight},A=(s.getMaximumSize=s.getMaximumWidth,s.retinaScale=function(t){var i=t.ctx,e=t.canvas.width,s=t.canvas.height;window.devicePixelRatio&&(i.canvas.style.width=e+"px",i.canvas.style.height=s+"px",i.canvas.height=s*window.devicePixelRatio,i.canvas.width=e*window.devicePixelRatio,i.scale(window.devicePixelRatio,window.devicePixelRatio))}),M=s.clear=function(t){t.ctx.clearRect(0,0,t.width,t.height)},W=s.fontString=function(t,i,e){return i+" "+t+"px "+e},z=s.longestText=function(t,i,e){t.font=i;var s=0;return n(e,function(i){var e=t.measureText(i).width;s=e>s?e:s}),s},B=s.drawRoundedRectangle=function(t,i,e,s,n,o){t.beginPath(),t.moveTo(i+o,e),t.lineTo(i+s-o,e),t.quadraticCurveTo(i+s,e,i+s,e+o),t.lineTo(i+s,e+n-o),t.quadraticCurveTo(i+s,e+n,i+s-o,e+n),t.lineTo(i+o,e+n),t.quadraticCurveTo(i,e+n,i,e+n-o),t.lineTo(i,e+o),t.quadraticCurveTo(i,e,i+o,e),t.closePath()};e.instances={},e.Type=function(t,i,s){this.options=i,this.chart=s,this.id=u(),e.instances[this.id]=this,i.responsive&&this.resize(),this.initialize.call(this,t)},a(e.Type.prototype,{initialize:function(){return this},clear:function(){return M(this.chart),this},stop:function(){return P(this.animationFrame),this},resize:function(t){this.stop();var i=this.chart.canvas,e=R(this.chart.canvas),s=this.options.maintainAspectRatio?e/this.chart.aspectRatio:T(this.chart.canvas);return i.width=this.chart.width=e,i.height=this.chart.height=s,A(this.chart),"function"==typeof t&&t.apply(this,Array.prototype.slice.call(arguments,1)),this},reflow:c,render:function(t){return t&&this.reflow(),this.options.animation&&!t?s.animationLoop(this.draw,this.options.animationSteps,this.options.animationEasing,this.options.onAnimationProgress,this.options.onAnimationComplete,this):(this.draw(),this.options.onAnimationComplete.call(this)),this},generateLegend:function(){return C(this.options.legendTemplate,this)},destroy:function(){this.clear(),F(this,this.events);var t=this.chart.canvas;t.width=this.chart.width,t.height=this.chart.height,t.style.removeProperty?(t.style.removeProperty("width"),t.style.removeProperty("height")):(t.style.removeAttribute("width"),t.style.removeAttribute("height")),delete e.instances[this.id]},showTooltip:function(t,i){"undefined"==typeof this.activeElements&&(this.activeElements=[]);var o=function(t){var i=!1;return t.length!==this.activeElements.length?i=!0:(n(t,function(t,e){t!==this.activeElements[e]&&(i=!0)},this),i)}.call(this,t);if(o||i){if(this.activeElements=t,this.draw(),this.options.customTooltips&&this.options.customTooltips(!1),t.length>0)if(this.datasets&&this.datasets.length>1){for(var a,h,r=this.datasets.length-1;r>=0&&(a=this.datasets[r].points||this.datasets[r].bars||this.datasets[r].segments,h=l(a,t[0]),-1===h);r--);var c=[],u=[],d=function(){var t,i,e,n,o,a=[],l=[],r=[];return s.each(this.datasets,function(i){t=i.points||i.bars||i.segments,t[h]&&t[h].hasValue()&&a.push(t[h])}),s.each(a,function(t){l.push(t.x),r.push(t.y),c.push(s.template(this.options.multiTooltipTemplate,t)),u.push({fill:t._saved.fillColor||t.fillColor,stroke:t._saved.strokeColor||t.strokeColor})},this),o=m(r),e=g(r),n=m(l),i=g(l),{x:n>this.chart.width/2?n:i,y:(o+e)/2}}.call(this,h);new e.MultiTooltip({x:d.x,y:d.y,xPadding:this.options.tooltipXPadding,yPadding:this.options.tooltipYPadding,xOffset:this.options.tooltipXOffset,fillColor:this.options.tooltipFillColor,textColor:this.options.tooltipFontColor,fontFamily:this.options.tooltipFontFamily,fontStyle:this.options.tooltipFontStyle,fontSize:this.options.tooltipFontSize,titleTextColor:this.options.tooltipTitleFontColor,titleFontFamily:this.options.tooltipTitleFontFamily,titleFontStyle:this.options.tooltipTitleFontStyle,titleFontSize:this.options.tooltipTitleFontSize,cornerRadius:this.options.tooltipCornerRadius,labels:c,legendColors:u,legendColorBackground:this.options.multiTooltipKeyBackground,title:t[0].label,chart:this.chart,ctx:this.chart.ctx,custom:this.options.customTooltips}).draw()}else n(t,function(t){var i=t.tooltipPosition();new e.Tooltip({x:Math.round(i.x),y:Math.round(i.y),xPadding:this.options.tooltipXPadding,yPadding:this.options.tooltipYPadding,fillColor:this.options.tooltipFillColor,textColor:this.options.tooltipFontColor,fontFamily:this.options.tooltipFontFamily,fontStyle:this.options.tooltipFontStyle,fontSize:this.options.tooltipFontSize,caretHeight:this.options.tooltipCaretSize,cornerRadius:this.options.tooltipCornerRadius,text:C(this.options.tooltipTemplate,t),chart:this.chart,custom:this.options.customTooltips}).draw()},this);return this}},toBase64Image:function(){return this.chart.canvas.toDataURL.apply(this.chart.canvas,arguments)}}),e.Type.extend=function(t){var i=this,s=function(){return i.apply(this,arguments)};if(s.prototype=o(i.prototype),a(s.prototype,t),s.extend=e.Type.extend,t.name||i.prototype.name){var n=t.name||i.prototype.name,l=e.defaults[i.prototype.name]?o(e.defaults[i.prototype.name]):{};e.defaults[n]=a(l,t.defaults),e.types[n]=s,e.prototype[n]=function(t,i){var o=h(e.defaults.global,e.defaults[n],i||{});return new s(t,o,this)}}else d("Name not provided for this chart, so it hasn't been registered");return i},e.Element=function(t){a(this,t),this.initialize.apply(this,arguments),this.save()},a(e.Element.prototype,{initialize:function(){},restore:function(t){return t?n(t,function(t){this[t]=this._saved[t]},this):a(this,this._saved),this},save:function(){return this._saved=o(this),delete this._saved._saved,this},update:function(t){return n(t,function(t,i){this._saved[i]=this[i],this[i]=t},this),this},transition:function(t,i){return n(t,function(t,e){this[e]=(t-this._saved[e])*i+this._saved[e]},this),this},tooltipPosition:function(){return{x:this.x,y:this.y}},hasValue:function(){return f(this.value)}}),e.Element.extend=r,e.Point=e.Element.extend({display:!0,inRange:function(t,i){var e=this.hitDetectionRadius+this.radius;return Math.pow(t-this.x,2)+Math.pow(i-this.y,2)<Math.pow(e,2)},draw:function(){if(this.display){var t=this.ctx;t.beginPath(),t.arc(this.x,this.y,this.radius,0,2*Math.PI),t.closePath(),t.strokeStyle=this.strokeColor,t.lineWidth=this.strokeWidth,t.fillStyle=this.fillColor,t.fill(),t.stroke()}}}),e.Arc=e.Element.extend({inRange:function(t,i){var e=s.getAngleFromPoint(this,{x:t,y:i}),n=e.angle>=this.startAngle&&e.angle<=this.endAngle,o=e.distance>=this.innerRadius&&e.distance<=this.outerRadius;return n&&o},tooltipPosition:function(){var t=this.startAngle+(this.endAngle-this.startAngle)/2,i=(this.outerRadius-this.innerRadius)/2+this.innerRadius;return{x:this.x+Math.cos(t)*i,y:this.y+Math.sin(t)*i}},draw:function(t){var i=this.ctx;i.beginPath(),i.arc(this.x,this.y,this.outerRadius,this.startAngle,this.endAngle),i.arc(this.x,this.y,this.innerRadius,this.endAngle,this.startAngle,!0),i.closePath(),i.strokeStyle=this.strokeColor,i.lineWidth=this.strokeWidth,i.fillStyle=this.fillColor,i.fill(),i.lineJoin="bevel",this.showStroke&&i.stroke()}}),e.Rectangle=e.Element.extend({draw:function(){var t=this.ctx,i=this.width/2,e=this.x-i,s=this.x+i,n=this.base-(this.base-this.y),o=this.strokeWidth/2;this.showStroke&&(e+=o,s-=o,n+=o),t.beginPath(),t.fillStyle=this.fillColor,t.strokeStyle=this.strokeColor,t.lineWidth=this.strokeWidth,t.moveTo(e,this.base),t.lineTo(e,n),t.lineTo(s,n),t.lineTo(s,this.base),t.fill(),this.showStroke&&t.stroke()},height:function(){return this.base-this.y},inRange:function(t,i){return t>=this.x-this.width/2&&t<=this.x+this.width/2&&i>=this.y&&i<=this.base}}),e.Tooltip=e.Element.extend({draw:function(){var t=this.chart.ctx;t.font=W(this.fontSize,this.fontStyle,this.fontFamily),this.xAlign="center",this.yAlign="above";var i=this.caretPadding=2,e=t.measureText(this.text).width+2*this.xPadding,s=this.fontSize+2*this.yPadding,n=s+this.caretHeight+i;this.x+e/2>this.chart.width?this.xAlign="left":this.x-e/2<0&&(this.xAlign="right"),this.y-n<0&&(this.yAlign="below");var o=this.x-e/2,a=this.y-n;if(t.fillStyle=this.fillColor,this.custom)this.custom(this);else{switch(this.yAlign){case"above":t.beginPath(),t.moveTo(this.x,this.y-i),t.lineTo(this.x+this.caretHeight,this.y-(i+this.caretHeight)),t.lineTo(this.x-this.caretHeight,this.y-(i+this.caretHeight)),t.closePath(),t.fill();break;case"below":a=this.y+i+this.caretHeight,t.beginPath(),t.moveTo(this.x,this.y+i),t.lineTo(this.x+this.caretHeight,this.y+i+this.caretHeight),t.lineTo(this.x-this.caretHeight,this.y+i+this.caretHeight),t.closePath(),t.fill()}switch(this.xAlign){case"left":o=this.x-e+(this.cornerRadius+this.caretHeight);break;case"right":o=this.x-(this.cornerRadius+this.caretHeight)}B(t,o,a,e,s,this.cornerRadius),t.fill(),t.fillStyle=this.textColor,t.textAlign="center",t.textBaseline="middle",t.fillText(this.text,o+e/2,a+s/2)}}}),e.MultiTooltip=e.Element.extend({initialize:function(){this.font=W(this.fontSize,this.fontStyle,this.fontFamily),this.titleFont=W(this.titleFontSize,this.titleFontStyle,this.titleFontFamily),this.height=this.labels.length*this.fontSize+(this.labels.length-1)*(this.fontSize/2)+2*this.yPadding+1.5*this.titleFontSize,this.ctx.font=this.titleFont;var t=this.ctx.measureText(this.title).width,i=z(this.ctx,this.font,this.labels)+this.fontSize+3,e=g([i,t]);this.width=e+2*this.xPadding;var s=this.height/2;this.y-s<0?this.y=s:this.y+s>this.chart.height&&(this.y=this.chart.height-s),this.x>this.chart.width/2?this.x-=this.xOffset+this.width:this.x+=this.xOffset},getLineHeight:function(t){var i=this.y-this.height/2+this.yPadding,e=t-1;return 0===t?i+this.titleFontSize/2:i+(1.5*this.fontSize*e+this.fontSize/2)+1.5*this.titleFontSize},draw:function(){if(this.custom)this.custom(this);else{B(this.ctx,this.x,this.y-this.height/2,this.width,this.height,this.cornerRadius);var t=this.ctx;t.fillStyle=this.fillColor,t.fill(),t.closePath(),t.textAlign="left",t.textBaseline="middle",t.fillStyle=this.titleTextColor,t.font=this.titleFont,t.fillText(this.title,this.x+this.xPadding,this.getLineHeight(0)),t.font=this.font,s.each(this.labels,function(i,e){t.fillStyle=this.textColor,t.fillText(i,this.x+this.xPadding+this.fontSize+3,this.getLineHeight(e+1)),t.fillStyle=this.legendColorBackground,t.fillRect(this.x+this.xPadding,this.getLineHeight(e+1)-this.fontSize/2,this.fontSize,this.fontSize),t.fillStyle=this.legendColors[e].fill,t.fillRect(this.x+this.xPadding,this.getLineHeight(e+1)-this.fontSize/2,this.fontSize,this.fontSize)},this)}}}),e.Scale=e.Element.extend({initialize:function(){this.fit()},buildYLabels:function(){this.yLabels=[];for(var t=v(this.stepValue),i=0;i<=this.steps;i++)this.yLabels.push(C(this.templateString,{value:(this.min+i*this.stepValue).toFixed(t)}));this.yLabelWidth=this.display&&this.showLabels?z(this.ctx,this.font,this.yLabels):0},addXLabel:function(t){this.xLabels.push(t),this.valuesCount++,this.fit()},removeXLabel:function(){this.xLabels.shift(),this.valuesCount--,this.fit()},fit:function(){this.startPoint=this.display?this.fontSize:0,this.endPoint=this.display?this.height-1.5*this.fontSize-5:this.height,this.startPoint+=this.padding,this.endPoint-=this.padding;var t,i=this.endPoint-this.startPoint;for(this.calculateYRange(i),this.buildYLabels(),this.calculateXLabelRotation();i>this.endPoint-this.startPoint;)i=this.endPoint-this.startPoint,t=this.yLabelWidth,this.calculateYRange(i),this.buildYLabels(),t<this.yLabelWidth&&this.calculateXLabelRotation()},calculateXLabelRotation:function(){this.ctx.font=this.font;var t,i,e=this.ctx.measureText(this.xLabels[0]).width,s=this.ctx.measureText(this.xLabels[this.xLabels.length-1]).width;if(this.xScalePaddingRight=s/2+3,this.xScalePaddingLeft=e/2>this.yLabelWidth+10?e/2:this.yLabelWidth+10,this.xLabelRotation=0,this.display){var n,o=z(this.ctx,this.font,this.xLabels);this.xLabelWidth=o;for(var a=Math.floor(this.calculateX(1)-this.calculateX(0))-6;this.xLabelWidth>a&&0===this.xLabelRotation||this.xLabelWidth>a&&this.xLabelRotation<=90&&this.xLabelRotation>0;)n=Math.cos(S(this.xLabelRotation)),t=n*e,i=n*s,t+this.fontSize/2>this.yLabelWidth+8&&(this.xScalePaddingLeft=t+this.fontSize/2),this.xScalePaddingRight=this.fontSize/2,this.xLabelRotation++,this.xLabelWidth=n*o;this.xLabelRotation>0&&(this.endPoint-=Math.sin(S(this.xLabelRotation))*o+3)}else this.xLabelWidth=0,this.xScalePaddingRight=this.padding,this.xScalePaddingLeft=this.padding},calculateYRange:c,drawingArea:function(){return this.startPoint-this.endPoint},calculateY:function(t){var i=this.drawingArea()/(this.min-this.max);return this.endPoint-i*(t-this.min)},calculateX:function(t){var i=(this.xLabelRotation>0,this.width-(this.xScalePaddingLeft+this.xScalePaddingRight)),e=i/Math.max(this.valuesCount-(this.offsetGridLines?0:1),1),s=e*t+this.xScalePaddingLeft;return this.offsetGridLines&&(s+=e/2),Math.round(s)},update:function(t){s.extend(this,t),this.fit()},draw:function(){var t=this.ctx,i=(this.endPoint-this.startPoint)/this.steps,e=Math.round(this.xScalePaddingLeft);this.display&&(t.fillStyle=this.textColor,t.font=this.font,n(this.yLabels,function(n,o){var a=this.endPoint-i*o,h=Math.round(a),l=this.showHorizontalLines;t.textAlign="right",t.textBaseline="middle",this.showLabels&&t.fillText(n,e-10,a),0!==o||l||(l=!0),l&&t.beginPath(),o>0?(t.lineWidth=this.gridLineWidth,t.strokeStyle=this.gridLineColor):(t.lineWidth=this.lineWidth,t.strokeStyle=this.lineColor),h+=s.aliasPixel(t.lineWidth),l&&(t.moveTo(e,h),t.lineTo(this.width,h),t.stroke(),t.closePath()),t.lineWidth=this.lineWidth,t.strokeStyle=this.lineColor,t.beginPath(),t.moveTo(e-5,h),t.lineTo(e,h),t.stroke(),t.closePath()},this),n(this.xLabels,function(i,e){var s=this.calculateX(e)+x(this.lineWidth),n=this.calculateX(e-(this.offsetGridLines?.5:0))+x(this.lineWidth),o=this.xLabelRotation>0,a=this.showVerticalLines;0!==e||a||(a=!0),a&&t.beginPath(),e>0?(t.lineWidth=this.gridLineWidth,t.strokeStyle=this.gridLineColor):(t.lineWidth=this.lineWidth,t.strokeStyle=this.lineColor),a&&(t.moveTo(n,this.endPoint),t.lineTo(n,this.startPoint-3),t.stroke(),t.closePath()),t.lineWidth=this.lineWidth,t.strokeStyle=this.lineColor,t.beginPath(),t.moveTo(n,this.endPoint),t.lineTo(n,this.endPoint+5),t.stroke(),t.closePath(),t.save(),t.translate(s,o?this.endPoint+12:this.endPoint+8),t.rotate(-1*S(this.xLabelRotation)),t.font=this.font,t.textAlign=o?"right":"center",t.textBaseline=o?"middle":"top",t.fillText(i,0,0),t.restore()},this))}}),e.RadialScale=e.Element.extend({initialize:function(){this.size=m([this.height,this.width]),this.drawingArea=this.display?this.size/2-(this.fontSize/2+this.backdropPaddingY):this.size/2},calculateCenterOffset:function(t){var i=this.drawingArea/(this.max-this.min);return(t-this.min)*i},update:function(){this.lineArc?this.drawingArea=this.display?this.size/2-(this.fontSize/2+this.backdropPaddingY):this.size/2:this.setScaleSize(),this.buildYLabels()},buildYLabels:function(){this.yLabels=[];for(var t=v(this.stepValue),i=0;i<=this.steps;i++)this.yLabels.push(C(this.templateString,{value:(this.min+i*this.stepValue).toFixed(t)}))},getCircumference:function(){return 2*Math.PI/this.valuesCount},setScaleSize:function(){var t,i,e,s,n,o,a,h,l,r,c,u,d=m([this.height/2-this.pointLabelFontSize-5,this.width/2]),p=this.width,g=0;for(this.ctx.font=W(this.pointLabelFontSize,this.pointLabelFontStyle,this.pointLabelFontFamily),i=0;i<this.valuesCount;i++)t=this.getPointPosition(i,d),e=this.ctx.measureText(C(this.templateString,{value:this.labels[i]})).width+5,0===i||i===this.valuesCount/2?(s=e/2,t.x+s>p&&(p=t.x+s,n=i),t.x-s<g&&(g=t.x-s,a=i)):i<this.valuesCount/2?t.x+e>p&&(p=t.x+e,n=i):i>this.valuesCount/2&&t.x-e<g&&(g=t.x-e,a=i);l=g,r=Math.ceil(p-this.width),o=this.getIndexAngle(n),h=this.getIndexAngle(a),c=r/Math.sin(o+Math.PI/2),u=l/Math.sin(h+Math.PI/2),c=f(c)?c:0,u=f(u)?u:0,this.drawingArea=d-(u+c)/2,this.setCenterPoint(u,c)},setCenterPoint:function(t,i){var e=this.width-i-this.drawingArea,s=t+this.drawingArea;this.xCenter=(s+e)/2,this.yCenter=this.height/2},getIndexAngle:function(t){var i=2*Math.PI/this.valuesCount;return t*i-Math.PI/2},getPointPosition:function(t,i){var e=this.getIndexAngle(t);return{x:Math.cos(e)*i+this.xCenter,y:Math.sin(e)*i+this.yCenter}},draw:function(){if(this.display){var t=this.ctx;if(n(this.yLabels,function(i,e){if(e>0){var s,n=e*(this.drawingArea/this.steps),o=this.yCenter-n;if(this.lineWidth>0)if(t.strokeStyle=this.lineColor,t.lineWidth=this.lineWidth,this.lineArc)t.beginPath(),t.arc(this.xCenter,this.yCenter,n,0,2*Math.PI),t.closePath(),t.stroke();else{t.beginPath();for(var a=0;a<this.valuesCount;a++)s=this.getPointPosition(a,this.calculateCenterOffset(this.min+e*this.stepValue)),0===a?t.moveTo(s.x,s.y):t.lineTo(s.x,s.y);t.closePath(),t.stroke()}if(this.showLabels){if(t.font=W(this.fontSize,this.fontStyle,this.fontFamily),this.showLabelBackdrop){var h=t.measureText(i).width;t.fillStyle=this.backdropColor,t.fillRect(this.xCenter-h/2-this.backdropPaddingX,o-this.fontSize/2-this.backdropPaddingY,h+2*this.backdropPaddingX,this.fontSize+2*this.backdropPaddingY)}t.textAlign="center",t.textBaseline="middle",t.fillStyle=this.fontColor,t.fillText(i,this.xCenter,o)}}},this),!this.lineArc){t.lineWidth=this.angleLineWidth,t.strokeStyle=this.angleLineColor;for(var i=this.valuesCount-1;i>=0;i--){if(this.angleLineWidth>0){var e=this.getPointPosition(i,this.calculateCenterOffset(this.max));t.beginPath(),t.moveTo(this.xCenter,this.yCenter),t.lineTo(e.x,e.y),t.stroke(),t.closePath()}var s=this.getPointPosition(i,this.calculateCenterOffset(this.max)+5);t.font=W(this.pointLabelFontSize,this.pointLabelFontStyle,this.pointLabelFontFamily),t.fillStyle=this.pointLabelFontColor;var o=this.labels.length,a=this.labels.length/2,h=a/2,l=h>i||i>o-h,r=i===h||i===o-h;t.textAlign=0===i?"center":i===a?"center":a>i?"left":"right",t.textBaseline=r?"middle":l?"bottom":"top",t.fillText(this.labels[i],s.x,s.y)}}}}}),s.addEvent(window,"resize",function(){var t;return function(){clearTimeout(t),t=setTimeout(function(){n(e.instances,function(t){t.options.responsive&&t.resize(t.render,!0)})},50)}}()),p?define(function(){return e}):"object"==typeof module&&module.exports&&(module.exports=e),t.Chart=e,e.noConflict=function(){return t.Chart=i,e}}).call(this),function(){"use strict";var t=this,i=t.Chart,e=i.helpers,s={scaleBeginAtZero:!0,scaleShowGridLines:!0,scaleGridLineColor:"rgba(0,0,0,.05)",scaleGridLineWidth:1,scaleShowHorizontalLines:!0,scaleShowVerticalLines:!0,barShowStroke:!0,barStrokeWidth:2,barValueSpacing:5,barDatasetSpacing:1,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'};i.Type.extend({name:"Bar",defaults:s,initialize:function(t){var s=this.options;this.ScaleClass=i.Scale.extend({offsetGridLines:!0,calculateBarX:function(t,i,e){var n=this.calculateBaseWidth(),o=this.calculateX(e)-n/2,a=this.calculateBarWidth(t);return o+a*i+i*s.barDatasetSpacing+a/2},calculateBaseWidth:function(){return this.calculateX(1)-this.calculateX(0)-2*s.barValueSpacing},calculateBarWidth:function(t){var i=this.calculateBaseWidth()-(t-1)*s.barDatasetSpacing;return i/t}}),this.datasets=[],this.options.showTooltips&&e.bindEvents(this,this.options.tooltipEvents,function(t){var i="mouseout"!==t.type?this.getBarsAtEvent(t):[];this.eachBars(function(t){t.restore(["fillColor","strokeColor"])}),e.each(i,function(t){t.fillColor=t.highlightFill,t.strokeColor=t.highlightStroke}),this.showTooltip(i)}),this.BarClass=i.Rectangle.extend({strokeWidth:this.options.barStrokeWidth,showStroke:this.options.barShowStroke,ctx:this.chart.ctx}),e.each(t.datasets,function(i){var s={label:i.label||null,fillColor:i.fillColor,strokeColor:i.strokeColor,bars:[]};this.datasets.push(s),e.each(i.data,function(e,n){s.bars.push(new this.BarClass({value:e,label:t.labels[n],datasetLabel:i.label,strokeColor:i.strokeColor,fillColor:i.fillColor,highlightFill:i.highlightFill||i.fillColor,highlightStroke:i.highlightStroke||i.strokeColor}))},this)},this),this.buildScale(t.labels),this.BarClass.prototype.base=this.scale.endPoint,this.eachBars(function(t,i,s){e.extend(t,{width:this.scale.calculateBarWidth(this.datasets.length),x:this.scale.calculateBarX(this.datasets.length,s,i),y:this.scale.endPoint}),t.save()},this),this.render()},update:function(){this.scale.update(),e.each(this.activeElements,function(t){t.restore(["fillColor","strokeColor"])}),this.eachBars(function(t){t.save()}),this.render()},eachBars:function(t){e.each(this.datasets,function(i,s){e.each(i.bars,t,this,s)},this)},getBarsAtEvent:function(t){for(var i,s=[],n=e.getRelativePosition(t),o=function(t){s.push(t.bars[i])},a=0;a<this.datasets.length;a++)for(i=0;i<this.datasets[a].bars.length;i++)if(this.datasets[a].bars[i].inRange(n.x,n.y))return e.each(this.datasets,o),s;return s},buildScale:function(t){var i=this,s=function(){var t=[];return i.eachBars(function(i){t.push(i.value)}),t},n={templateString:this.options.scaleLabel,height:this.chart.height,width:this.chart.width,ctx:this.chart.ctx,textColor:this.options.scaleFontColor,fontSize:this.options.scaleFontSize,fontStyle:this.options.scaleFontStyle,fontFamily:this.options.scaleFontFamily,valuesCount:t.length,beginAtZero:this.options.scaleBeginAtZero,integersOnly:this.options.scaleIntegersOnly,calculateYRange:function(t){var i=e.calculateScaleRange(s(),t,this.fontSize,this.beginAtZero,this.integersOnly);e.extend(this,i)},xLabels:t,font:e.fontString(this.options.scaleFontSize,this.options.scaleFontStyle,this.options.scaleFontFamily),lineWidth:this.options.scaleLineWidth,lineColor:this.options.scaleLineColor,showHorizontalLines:this.options.scaleShowHorizontalLines,showVerticalLines:this.options.scaleShowVerticalLines,gridLineWidth:this.options.scaleShowGridLines?this.options.scaleGridLineWidth:0,gridLineColor:this.options.scaleShowGridLines?this.options.scaleGridLineColor:"rgba(0,0,0,0)",padding:this.options.showScale?0:this.options.barShowStroke?this.options.barStrokeWidth:0,showLabels:this.options.scaleShowLabels,display:this.options.showScale};this.options.scaleOverride&&e.extend(n,{calculateYRange:e.noop,steps:this.options.scaleSteps,stepValue:this.options.scaleStepWidth,min:this.options.scaleStartValue,max:this.options.scaleStartValue+this.options.scaleSteps*this.options.scaleStepWidth}),this.scale=new this.ScaleClass(n)},addData:function(t,i){e.each(t,function(t,e){this.datasets[e].bars.push(new this.BarClass({value:t,label:i,x:this.scale.calculateBarX(this.datasets.length,e,this.scale.valuesCount+1),y:this.scale.endPoint,width:this.scale.calculateBarWidth(this.datasets.length),base:this.scale.endPoint,strokeColor:this.datasets[e].strokeColor,fillColor:this.datasets[e].fillColor}))
},this),this.scale.addXLabel(i),this.update()},removeData:function(){this.scale.removeXLabel(),e.each(this.datasets,function(t){t.bars.shift()},this),this.update()},reflow:function(){e.extend(this.BarClass.prototype,{y:this.scale.endPoint,base:this.scale.endPoint});var t=e.extend({height:this.chart.height,width:this.chart.width});this.scale.update(t)},draw:function(t){var i=t||1;this.clear();this.chart.ctx;this.scale.draw(i),e.each(this.datasets,function(t,s){e.each(t.bars,function(t,e){t.hasValue()&&(t.base=this.scale.endPoint,t.transition({x:this.scale.calculateBarX(this.datasets.length,s,e),y:this.scale.calculateY(t.value),width:this.scale.calculateBarWidth(this.datasets.length)},i).draw())},this)},this)}})}.call(this),function(){"use strict";var t=this,i=t.Chart,e=i.helpers,s={segmentShowStroke:!0,segmentStrokeColor:"#fff",segmentStrokeWidth:2,percentageInnerCutout:50,animationSteps:100,animationEasing:"easeOutBounce",animateRotate:!0,animateScale:!1,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'};i.Type.extend({name:"Doughnut",defaults:s,initialize:function(t){this.segments=[],this.outerRadius=(e.min([this.chart.width,this.chart.height])-this.options.segmentStrokeWidth/2)/2,this.SegmentArc=i.Arc.extend({ctx:this.chart.ctx,x:this.chart.width/2,y:this.chart.height/2}),this.options.showTooltips&&e.bindEvents(this,this.options.tooltipEvents,function(t){var i="mouseout"!==t.type?this.getSegmentsAtEvent(t):[];e.each(this.segments,function(t){t.restore(["fillColor"])}),e.each(i,function(t){t.fillColor=t.highlightColor}),this.showTooltip(i)}),this.calculateTotal(t),e.each(t,function(t,i){this.addData(t,i,!0)},this),this.render()},getSegmentsAtEvent:function(t){var i=[],s=e.getRelativePosition(t);return e.each(this.segments,function(t){t.inRange(s.x,s.y)&&i.push(t)},this),i},addData:function(t,i,e){var s=i||this.segments.length;this.segments.splice(s,0,new this.SegmentArc({value:t.value,outerRadius:this.options.animateScale?0:this.outerRadius,innerRadius:this.options.animateScale?0:this.outerRadius/100*this.options.percentageInnerCutout,fillColor:t.color,highlightColor:t.highlight||t.color,showStroke:this.options.segmentShowStroke,strokeWidth:this.options.segmentStrokeWidth,strokeColor:this.options.segmentStrokeColor,startAngle:1.5*Math.PI,circumference:this.options.animateRotate?0:this.calculateCircumference(t.value),label:t.label})),e||(this.reflow(),this.update())},calculateCircumference:function(t){return 2*Math.PI*(Math.abs(t)/this.total)},calculateTotal:function(t){this.total=0,e.each(t,function(t){this.total+=Math.abs(t.value)},this)},update:function(){this.calculateTotal(this.segments),e.each(this.activeElements,function(t){t.restore(["fillColor"])}),e.each(this.segments,function(t){t.save()}),this.render()},removeData:function(t){var i=e.isNumber(t)?t:this.segments.length-1;this.segments.splice(i,1),this.reflow(),this.update()},reflow:function(){e.extend(this.SegmentArc.prototype,{x:this.chart.width/2,y:this.chart.height/2}),this.outerRadius=(e.min([this.chart.width,this.chart.height])-this.options.segmentStrokeWidth/2)/2,e.each(this.segments,function(t){t.update({outerRadius:this.outerRadius,innerRadius:this.outerRadius/100*this.options.percentageInnerCutout})},this)},draw:function(t){var i=t?t:1;this.clear(),e.each(this.segments,function(t,e){t.transition({circumference:this.calculateCircumference(t.value),outerRadius:this.outerRadius,innerRadius:this.outerRadius/100*this.options.percentageInnerCutout},i),t.endAngle=t.startAngle+t.circumference,t.draw(),0===e&&(t.startAngle=1.5*Math.PI),e<this.segments.length-1&&(this.segments[e+1].startAngle=t.endAngle)},this)}}),i.types.Doughnut.extend({name:"Pie",defaults:e.merge(s,{percentageInnerCutout:0})})}.call(this),function(){"use strict";var t=this,i=t.Chart,e=i.helpers,s={scaleShowGridLines:!0,scaleGridLineColor:"rgba(0,0,0,.05)",scaleGridLineWidth:1,scaleShowHorizontalLines:!0,scaleShowVerticalLines:!0,bezierCurve:!0,bezierCurveTension:.4,pointDot:!0,pointDotRadius:4,pointDotStrokeWidth:1,pointHitDetectionRadius:20,datasetStroke:!0,datasetStrokeWidth:2,datasetFill:!0,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'};i.Type.extend({name:"Line",defaults:s,initialize:function(t){this.PointClass=i.Point.extend({strokeWidth:this.options.pointDotStrokeWidth,radius:this.options.pointDotRadius,display:this.options.pointDot,hitDetectionRadius:this.options.pointHitDetectionRadius,ctx:this.chart.ctx,inRange:function(t){return Math.pow(t-this.x,2)<Math.pow(this.radius+this.hitDetectionRadius,2)}}),this.datasets=[],this.options.showTooltips&&e.bindEvents(this,this.options.tooltipEvents,function(t){var i="mouseout"!==t.type?this.getPointsAtEvent(t):[];this.eachPoints(function(t){t.restore(["fillColor","strokeColor"])}),e.each(i,function(t){t.fillColor=t.highlightFill,t.strokeColor=t.highlightStroke}),this.showTooltip(i)}),e.each(t.datasets,function(i){var s={label:i.label||null,fillColor:i.fillColor,strokeColor:i.strokeColor,pointColor:i.pointColor,pointStrokeColor:i.pointStrokeColor,points:[]};this.datasets.push(s),e.each(i.data,function(e,n){s.points.push(new this.PointClass({value:e,label:t.labels[n],datasetLabel:i.label,strokeColor:i.pointStrokeColor,fillColor:i.pointColor,highlightFill:i.pointHighlightFill||i.pointColor,highlightStroke:i.pointHighlightStroke||i.pointStrokeColor}))},this),this.buildScale(t.labels),this.eachPoints(function(t,i){e.extend(t,{x:this.scale.calculateX(i),y:this.scale.endPoint}),t.save()},this)},this),this.render()},update:function(){this.scale.update(),e.each(this.activeElements,function(t){t.restore(["fillColor","strokeColor"])}),this.eachPoints(function(t){t.save()}),this.render()},eachPoints:function(t){e.each(this.datasets,function(i){e.each(i.points,t,this)},this)},getPointsAtEvent:function(t){var i=[],s=e.getRelativePosition(t);return e.each(this.datasets,function(t){e.each(t.points,function(t){t.inRange(s.x,s.y)&&i.push(t)})},this),i},buildScale:function(t){var s=this,n=function(){var t=[];return s.eachPoints(function(i){t.push(i.value)}),t},o={templateString:this.options.scaleLabel,height:this.chart.height,width:this.chart.width,ctx:this.chart.ctx,textColor:this.options.scaleFontColor,fontSize:this.options.scaleFontSize,fontStyle:this.options.scaleFontStyle,fontFamily:this.options.scaleFontFamily,valuesCount:t.length,beginAtZero:this.options.scaleBeginAtZero,integersOnly:this.options.scaleIntegersOnly,calculateYRange:function(t){var i=e.calculateScaleRange(n(),t,this.fontSize,this.beginAtZero,this.integersOnly);e.extend(this,i)},xLabels:t,font:e.fontString(this.options.scaleFontSize,this.options.scaleFontStyle,this.options.scaleFontFamily),lineWidth:this.options.scaleLineWidth,lineColor:this.options.scaleLineColor,showHorizontalLines:this.options.scaleShowHorizontalLines,showVerticalLines:this.options.scaleShowVerticalLines,gridLineWidth:this.options.scaleShowGridLines?this.options.scaleGridLineWidth:0,gridLineColor:this.options.scaleShowGridLines?this.options.scaleGridLineColor:"rgba(0,0,0,0)",padding:this.options.showScale?0:this.options.pointDotRadius+this.options.pointDotStrokeWidth,showLabels:this.options.scaleShowLabels,display:this.options.showScale};this.options.scaleOverride&&e.extend(o,{calculateYRange:e.noop,steps:this.options.scaleSteps,stepValue:this.options.scaleStepWidth,min:this.options.scaleStartValue,max:this.options.scaleStartValue+this.options.scaleSteps*this.options.scaleStepWidth}),this.scale=new i.Scale(o)},addData:function(t,i){e.each(t,function(t,e){this.datasets[e].points.push(new this.PointClass({value:t,label:i,x:this.scale.calculateX(this.scale.valuesCount+1),y:this.scale.endPoint,strokeColor:this.datasets[e].pointStrokeColor,fillColor:this.datasets[e].pointColor}))},this),this.scale.addXLabel(i),this.update()},removeData:function(){this.scale.removeXLabel(),e.each(this.datasets,function(t){t.points.shift()},this),this.update()},reflow:function(){var t=e.extend({height:this.chart.height,width:this.chart.width});this.scale.update(t)},draw:function(t){var i=t||1;this.clear();var s=this.chart.ctx,n=function(t){return null!==t.value},o=function(t,i,s){return e.findNextWhere(i,n,s)||t},a=function(t,i,s){return e.findPreviousWhere(i,n,s)||t};this.scale.draw(i),e.each(this.datasets,function(t){var h=e.where(t.points,n);e.each(t.points,function(t,e){t.hasValue()&&t.transition({y:this.scale.calculateY(t.value),x:this.scale.calculateX(e)},i)},this),this.options.bezierCurve&&e.each(h,function(t,i){var s=i>0&&i<h.length-1?this.options.bezierCurveTension:0;t.controlPoints=e.splineCurve(a(t,h,i),t,o(t,h,i),s),t.controlPoints.outer.y>this.scale.endPoint?t.controlPoints.outer.y=this.scale.endPoint:t.controlPoints.outer.y<this.scale.startPoint&&(t.controlPoints.outer.y=this.scale.startPoint),t.controlPoints.inner.y>this.scale.endPoint?t.controlPoints.inner.y=this.scale.endPoint:t.controlPoints.inner.y<this.scale.startPoint&&(t.controlPoints.inner.y=this.scale.startPoint)},this),s.lineWidth=this.options.datasetStrokeWidth,s.strokeStyle=t.strokeColor,s.beginPath(),e.each(h,function(t,i){if(0===i)s.moveTo(t.x,t.y);else if(this.options.bezierCurve){var e=a(t,h,i);s.bezierCurveTo(e.controlPoints.outer.x,e.controlPoints.outer.y,t.controlPoints.inner.x,t.controlPoints.inner.y,t.x,t.y)}else s.lineTo(t.x,t.y)},this),s.stroke(),this.options.datasetFill&&h.length>0&&(s.lineTo(h[h.length-1].x,this.scale.endPoint),s.lineTo(h[0].x,this.scale.endPoint),s.fillStyle=t.fillColor,s.closePath(),s.fill()),e.each(h,function(t){t.draw()})},this)}})}.call(this),function(){"use strict";var t=this,i=t.Chart,e=i.helpers,s={scaleShowLabelBackdrop:!0,scaleBackdropColor:"rgba(255,255,255,0.75)",scaleBeginAtZero:!0,scaleBackdropPaddingY:2,scaleBackdropPaddingX:2,scaleShowLine:!0,segmentShowStroke:!0,segmentStrokeColor:"#fff",segmentStrokeWidth:2,animationSteps:100,animationEasing:"easeOutBounce",animateRotate:!0,animateScale:!1,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'};i.Type.extend({name:"PolarArea",defaults:s,initialize:function(t){this.segments=[],this.SegmentArc=i.Arc.extend({showStroke:this.options.segmentShowStroke,strokeWidth:this.options.segmentStrokeWidth,strokeColor:this.options.segmentStrokeColor,ctx:this.chart.ctx,innerRadius:0,x:this.chart.width/2,y:this.chart.height/2}),this.scale=new i.RadialScale({display:this.options.showScale,fontStyle:this.options.scaleFontStyle,fontSize:this.options.scaleFontSize,fontFamily:this.options.scaleFontFamily,fontColor:this.options.scaleFontColor,showLabels:this.options.scaleShowLabels,showLabelBackdrop:this.options.scaleShowLabelBackdrop,backdropColor:this.options.scaleBackdropColor,backdropPaddingY:this.options.scaleBackdropPaddingY,backdropPaddingX:this.options.scaleBackdropPaddingX,lineWidth:this.options.scaleShowLine?this.options.scaleLineWidth:0,lineColor:this.options.scaleLineColor,lineArc:!0,width:this.chart.width,height:this.chart.height,xCenter:this.chart.width/2,yCenter:this.chart.height/2,ctx:this.chart.ctx,templateString:this.options.scaleLabel,valuesCount:t.length}),this.updateScaleRange(t),this.scale.update(),e.each(t,function(t,i){this.addData(t,i,!0)},this),this.options.showTooltips&&e.bindEvents(this,this.options.tooltipEvents,function(t){var i="mouseout"!==t.type?this.getSegmentsAtEvent(t):[];e.each(this.segments,function(t){t.restore(["fillColor"])}),e.each(i,function(t){t.fillColor=t.highlightColor}),this.showTooltip(i)}),this.render()},getSegmentsAtEvent:function(t){var i=[],s=e.getRelativePosition(t);return e.each(this.segments,function(t){t.inRange(s.x,s.y)&&i.push(t)},this),i},addData:function(t,i,e){var s=i||this.segments.length;this.segments.splice(s,0,new this.SegmentArc({fillColor:t.color,highlightColor:t.highlight||t.color,label:t.label,value:t.value,outerRadius:this.options.animateScale?0:this.scale.calculateCenterOffset(t.value),circumference:this.options.animateRotate?0:this.scale.getCircumference(),startAngle:1.5*Math.PI})),e||(this.reflow(),this.update())},removeData:function(t){var i=e.isNumber(t)?t:this.segments.length-1;this.segments.splice(i,1),this.reflow(),this.update()},calculateTotal:function(t){this.total=0,e.each(t,function(t){this.total+=t.value},this),this.scale.valuesCount=this.segments.length},updateScaleRange:function(t){var i=[];e.each(t,function(t){i.push(t.value)});var s=this.options.scaleOverride?{steps:this.options.scaleSteps,stepValue:this.options.scaleStepWidth,min:this.options.scaleStartValue,max:this.options.scaleStartValue+this.options.scaleSteps*this.options.scaleStepWidth}:e.calculateScaleRange(i,e.min([this.chart.width,this.chart.height])/2,this.options.scaleFontSize,this.options.scaleBeginAtZero,this.options.scaleIntegersOnly);e.extend(this.scale,s,{size:e.min([this.chart.width,this.chart.height]),xCenter:this.chart.width/2,yCenter:this.chart.height/2})},update:function(){this.calculateTotal(this.segments),e.each(this.segments,function(t){t.save()}),this.reflow(),this.render()},reflow:function(){e.extend(this.SegmentArc.prototype,{x:this.chart.width/2,y:this.chart.height/2}),this.updateScaleRange(this.segments),this.scale.update(),e.extend(this.scale,{xCenter:this.chart.width/2,yCenter:this.chart.height/2}),e.each(this.segments,function(t){t.update({outerRadius:this.scale.calculateCenterOffset(t.value)})},this)},draw:function(t){var i=t||1;this.clear(),e.each(this.segments,function(t,e){t.transition({circumference:this.scale.getCircumference(),outerRadius:this.scale.calculateCenterOffset(t.value)},i),t.endAngle=t.startAngle+t.circumference,0===e&&(t.startAngle=1.5*Math.PI),e<this.segments.length-1&&(this.segments[e+1].startAngle=t.endAngle),t.draw()},this),this.scale.draw()}})}.call(this),function(){"use strict";var t=this,i=t.Chart,e=i.helpers;i.Type.extend({name:"Radar",defaults:{scaleShowLine:!0,angleShowLineOut:!0,scaleShowLabels:!1,scaleBeginAtZero:!0,angleLineColor:"rgba(0,0,0,.1)",angleLineWidth:1,pointLabelFontFamily:"'Arial'",pointLabelFontStyle:"normal",pointLabelFontSize:10,pointLabelFontColor:"#666",pointDot:!0,pointDotRadius:3,pointDotStrokeWidth:1,pointHitDetectionRadius:20,datasetStroke:!0,datasetStrokeWidth:2,datasetFill:!0,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'},initialize:function(t){this.PointClass=i.Point.extend({strokeWidth:this.options.pointDotStrokeWidth,radius:this.options.pointDotRadius,display:this.options.pointDot,hitDetectionRadius:this.options.pointHitDetectionRadius,ctx:this.chart.ctx}),this.datasets=[],this.buildScale(t),this.options.showTooltips&&e.bindEvents(this,this.options.tooltipEvents,function(t){var i="mouseout"!==t.type?this.getPointsAtEvent(t):[];this.eachPoints(function(t){t.restore(["fillColor","strokeColor"])}),e.each(i,function(t){t.fillColor=t.highlightFill,t.strokeColor=t.highlightStroke}),this.showTooltip(i)}),e.each(t.datasets,function(i){var s={label:i.label||null,fillColor:i.fillColor,strokeColor:i.strokeColor,pointColor:i.pointColor,pointStrokeColor:i.pointStrokeColor,points:[]};this.datasets.push(s),e.each(i.data,function(e,n){var o;this.scale.animation||(o=this.scale.getPointPosition(n,this.scale.calculateCenterOffset(e))),s.points.push(new this.PointClass({value:e,label:t.labels[n],datasetLabel:i.label,x:this.options.animation?this.scale.xCenter:o.x,y:this.options.animation?this.scale.yCenter:o.y,strokeColor:i.pointStrokeColor,fillColor:i.pointColor,highlightFill:i.pointHighlightFill||i.pointColor,highlightStroke:i.pointHighlightStroke||i.pointStrokeColor}))},this)},this),this.render()},eachPoints:function(t){e.each(this.datasets,function(i){e.each(i.points,t,this)},this)},getPointsAtEvent:function(t){var i=e.getRelativePosition(t),s=e.getAngleFromPoint({x:this.scale.xCenter,y:this.scale.yCenter},i),n=2*Math.PI/this.scale.valuesCount,o=Math.round((s.angle-1.5*Math.PI)/n),a=[];return(o>=this.scale.valuesCount||0>o)&&(o=0),s.distance<=this.scale.drawingArea&&e.each(this.datasets,function(t){a.push(t.points[o])}),a},buildScale:function(t){this.scale=new i.RadialScale({display:this.options.showScale,fontStyle:this.options.scaleFontStyle,fontSize:this.options.scaleFontSize,fontFamily:this.options.scaleFontFamily,fontColor:this.options.scaleFontColor,showLabels:this.options.scaleShowLabels,showLabelBackdrop:this.options.scaleShowLabelBackdrop,backdropColor:this.options.scaleBackdropColor,backdropPaddingY:this.options.scaleBackdropPaddingY,backdropPaddingX:this.options.scaleBackdropPaddingX,lineWidth:this.options.scaleShowLine?this.options.scaleLineWidth:0,lineColor:this.options.scaleLineColor,angleLineColor:this.options.angleLineColor,angleLineWidth:this.options.angleShowLineOut?this.options.angleLineWidth:0,pointLabelFontColor:this.options.pointLabelFontColor,pointLabelFontSize:this.options.pointLabelFontSize,pointLabelFontFamily:this.options.pointLabelFontFamily,pointLabelFontStyle:this.options.pointLabelFontStyle,height:this.chart.height,width:this.chart.width,xCenter:this.chart.width/2,yCenter:this.chart.height/2,ctx:this.chart.ctx,templateString:this.options.scaleLabel,labels:t.labels,valuesCount:t.datasets[0].data.length}),this.scale.setScaleSize(),this.updateScaleRange(t.datasets),this.scale.buildYLabels()},updateScaleRange:function(t){var i=function(){var i=[];return e.each(t,function(t){t.data?i=i.concat(t.data):e.each(t.points,function(t){i.push(t.value)})}),i}(),s=this.options.scaleOverride?{steps:this.options.scaleSteps,stepValue:this.options.scaleStepWidth,min:this.options.scaleStartValue,max:this.options.scaleStartValue+this.options.scaleSteps*this.options.scaleStepWidth}:e.calculateScaleRange(i,e.min([this.chart.width,this.chart.height])/2,this.options.scaleFontSize,this.options.scaleBeginAtZero,this.options.scaleIntegersOnly);e.extend(this.scale,s)},addData:function(t,i){this.scale.valuesCount++,e.each(t,function(t,e){var s=this.scale.getPointPosition(this.scale.valuesCount,this.scale.calculateCenterOffset(t));this.datasets[e].points.push(new this.PointClass({value:t,label:i,x:s.x,y:s.y,strokeColor:this.datasets[e].pointStrokeColor,fillColor:this.datasets[e].pointColor}))},this),this.scale.labels.push(i),this.reflow(),this.update()},removeData:function(){this.scale.valuesCount--,this.scale.labels.shift(),e.each(this.datasets,function(t){t.points.shift()},this),this.reflow(),this.update()},update:function(){this.eachPoints(function(t){t.save()}),this.reflow(),this.render()},reflow:function(){e.extend(this.scale,{width:this.chart.width,height:this.chart.height,size:e.min([this.chart.width,this.chart.height]),xCenter:this.chart.width/2,yCenter:this.chart.height/2}),this.updateScaleRange(this.datasets),this.scale.setScaleSize(),this.scale.buildYLabels()},draw:function(t){var i=t||1,s=this.chart.ctx;this.clear(),this.scale.draw(),e.each(this.datasets,function(t){e.each(t.points,function(t,e){t.hasValue()&&t.transition(this.scale.getPointPosition(e,this.scale.calculateCenterOffset(t.value)),i)},this),s.lineWidth=this.options.datasetStrokeWidth,s.strokeStyle=t.strokeColor,s.beginPath(),e.each(t.points,function(t,i){0===i?s.moveTo(t.x,t.y):s.lineTo(t.x,t.y)},this),s.closePath(),s.stroke(),s.fillStyle=t.fillColor,s.fill(),e.each(t.points,function(t){t.hasValue()&&t.draw()})},this)}})}.call(this);
// @see https://github.com/makeusabrew/bootbox/issues/180
// @see https://github.com/makeusabrew/bootbox/issues/186
(function (root, factory) {

  "use strict";
  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define(["jquery"], factory);
  } else if (typeof exports === "object") {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"));
  } else {
    // Browser globals (root is window)
    root.bootbox = factory(root.jQuery);
  }

}(this, function init($, undefined) {

  "use strict";

  // the base DOM structure needed to create a modal
  var templates = {
    dialog:
      "<div class='bootbox modal' tabindex='-1' role='dialog'>" +
        "<div class='modal-dialog'>" +
          "<div class='modal-content'>" +
            "<div class='modal-body'><div class='bootbox-body'></div></div>" +
          "</div>" +
        "</div>" +
      "</div>",
    header:
      "<div class='modal-header'>" +
        "<h4 class='modal-title'></h4>" +
      "</div>",
    footer:
      "<div class='modal-footer'></div>",
    closeButton:
      "<button type='button' class='bootbox-close-button close' data-dismiss='modal' aria-hidden='true'>&times;</button>",
    form:
      "<form class='bootbox-form'></form>",
    inputs: {
      text:
        "<input class='bootbox-input bootbox-input-text form-control' autocomplete=off type=text />",
      textarea:
        "<textarea class='bootbox-input bootbox-input-textarea form-control'></textarea>",
      email:
        "<input class='bootbox-input bootbox-input-email form-control' autocomplete='off' type='email' />",
      select:
        "<select class='bootbox-input bootbox-input-select form-control'></select>",
      checkbox:
        "<div class='checkbox'><label><input class='bootbox-input bootbox-input-checkbox' type='checkbox' /></label></div>",
      date:
        "<input class='bootbox-input bootbox-input-date form-control' autocomplete=off type='date' />",
      time:
        "<input class='bootbox-input bootbox-input-time form-control' autocomplete=off type='time' />",
      number:
        "<input class='bootbox-input bootbox-input-number form-control' autocomplete=off type='number' />",
      password:
        "<input class='bootbox-input bootbox-input-password form-control' autocomplete='off' type='password' />"
    }
  };

  var defaults = {
    // default language
    locale: "en",
    // show backdrop or not. Default to static so user has to interact with dialog
    backdrop: "static",
    // animate the modal in/out
    animate: true,
    // additional class string applied to the top level dialog
    className: null,
    // whether or not to include a close button
    closeButton: true,
    // show the dialog immediately by default
    show: true,
    // dialog container
    container: "body"
  };

  // our public object; augmented after our private API
  var exports = {};

  /**
   * @private
   */
  function _t(key) {
    var locale = locales[defaults.locale];
    return locale ? locale[key] : locales.en[key];
  }

  function processCallback(e, dialog, callback) {
    e.stopPropagation();
    e.preventDefault();

    // by default we assume a callback will get rid of the dialog,
    // although it is given the opportunity to override this

    // so, if the callback can be invoked and it *explicitly returns false*
    // then we'll set a flag to keep the dialog active...
    var preserveDialog = $.isFunction(callback) && callback.call(dialog, e) === false;

    // ... otherwise we'll bin it
    if (!preserveDialog) {
      dialog.modal("hide");
    }
  }

  function getKeyLength(obj) {
    // @TODO defer to Object.keys(x).length if available?
    var k, t = 0;
    for (k in obj) {
      t ++;
    }
    return t;
  }

  function each(collection, iterator) {
    var index = 0;
    $.each(collection, function(key, value) {
      iterator(key, value, index++);
    });
  }

  function sanitize(options) {
    var buttons;
    var total;

    if (typeof options !== "object") {
      throw new Error("Please supply an object of options");
    }

    if (!options.message) {
      throw new Error("Please specify a message");
    }

    // make sure any supplied options take precedence over defaults
    options = $.extend({}, defaults, options);

    if (!options.buttons) {
      options.buttons = {};
    }

    buttons = options.buttons;

    total = getKeyLength(buttons);

    each(buttons, function(key, button, index) {

      if ($.isFunction(button)) {
        // short form, assume value is our callback. Since button
        // isn't an object it isn't a reference either so re-assign it
        button = buttons[key] = {
          callback: button
        };
      }

      // before any further checks make sure by now button is the correct type
      if ($.type(button) !== "object") {
        throw new Error("button with key " + key + " must be an object");
      }

      if (!button.label) {
        // the lack of an explicit label means we'll assume the key is good enough
        button.label = key;
      }

      if (!button.className) {
        if (total <= 2 && index === total-1) {
          // always add a primary to the main option in a two-button dialog
          button.className = "btn-primary";
        } else {
          button.className = "btn-default";
        }
      }
    });

    return options;
  }

  /**
   * map a flexible set of arguments into a single returned object
   * if args.length is already one just return it, otherwise
   * use the properties argument to map the unnamed args to
   * object properties
   * so in the latter case:
   * mapArguments(["foo", $.noop], ["message", "callback"])
   * -> { message: "foo", callback: $.noop }
   */
  function mapArguments(args, properties) {
    var argn = args.length;
    var options = {};

    if (argn < 1 || argn > 2) {
      throw new Error("Invalid argument length");
    }

    if (argn === 2 || typeof args[0] === "string") {
      options[properties[0]] = args[0];
      options[properties[1]] = args[1];
    } else {
      options = args[0];
    }

    return options;
  }

  /**
   * merge a set of default dialog options with user supplied arguments
   */
  function mergeArguments(defaults, args, properties) {
    return $.extend(
      // deep merge
      true,
      // ensure the target is an empty, unreferenced object
      {},
      // the base options object for this type of dialog (often just buttons)
      defaults,
      // args could be an object or array; if it's an array properties will
      // map it to a proper options object
      mapArguments(
        args,
        properties
      )
    );
  }

  /**
   * this entry-level method makes heavy use of composition to take a simple
   * range of inputs and return valid options suitable for passing to bootbox.dialog
   */
  function mergeDialogOptions(className, labels, properties, args) {
    //  build up a base set of dialog properties
    var baseOptions = {
      className: "bootbox-" + className,
      buttons: createLabels.apply(null, labels)
    };

    // ensure the buttons properties generated, *after* merging
    // with user args are still valid against the supplied labels
    return validateButtons(
      // merge the generated base properties with user supplied arguments
      mergeArguments(
        baseOptions,
        args,
        // if args.length > 1, properties specify how each arg maps to an object key
        properties
      ),
      labels
    );
  }

  /**
   * from a given list of arguments return a suitable object of button labels
   * all this does is normalise the given labels and translate them where possible
   * e.g. "ok", "confirm" -> { ok: "OK, cancel: "Annuleren" }
   */
  function createLabels() {
    var buttons = {};

    for (var i = 0, j = arguments.length; i < j; i++) {
      var argument = arguments[i];
      var key = argument.toLowerCase();
      var value = argument.toUpperCase();

      buttons[key] = {
        label: _t(value)
      };
    }

    return buttons;
  }

  function validateButtons(options, buttons) {
    var allowedButtons = {};
    each(buttons, function(key, value) {
      allowedButtons[value] = true;
    });

    each(options.buttons, function(key) {
      if (allowedButtons[key] === undefined) {
        throw new Error("button key " + key + " is not allowed (options are " + buttons.join("\n") + ")");
      }
    });

    return options;
  }

  exports.alert = function() {
    var options;

    options = mergeDialogOptions("alert", ["ok"], ["message", "callback"], arguments);

    if (options.callback && !$.isFunction(options.callback)) {
      throw new Error("alert requires callback property to be a function when provided");
    }

    /**
     * overrides
     */
    options.buttons.ok.callback = options.onEscape = function() {
      if ($.isFunction(options.callback)) {
        return options.callback.call(this);
      }
      return true;
    };

    return exports.dialog(options);
  };

  exports.confirm = function() {
    var options;

    options = mergeDialogOptions("confirm", ["cancel", "confirm"], ["message", "callback"], arguments);

    /**
     * overrides; undo anything the user tried to set they shouldn't have
     */
    options.buttons.cancel.callback = options.onEscape = function() {
      return options.callback.call(this, false);
    };

    options.buttons.confirm.callback = function() {
      return options.callback.call(this, true);
    };

    // confirm specific validation
    if (!$.isFunction(options.callback)) {
      throw new Error("confirm requires a callback");
    }

    return exports.dialog(options);
  };

  exports.prompt = function() {
    var options;
    var defaults;
    var dialog;
    var form;
    var input;
    var shouldShow;
    var inputOptions;

    // we have to create our form first otherwise
    // its value is undefined when gearing up our options
    // @TODO this could be solved by allowing message to
    // be a function instead...
    form = $(templates.form);

    // prompt defaults are more complex than others in that
    // users can override more defaults
    // @TODO I don't like that prompt has to do a lot of heavy
    // lifting which mergeDialogOptions can *almost* support already
    // just because of 'value' and 'inputType' - can we refactor?
    defaults = {
      className: "bootbox-prompt",
      buttons: createLabels("cancel", "confirm"),
      value: "",
      inputType: "text"
    };

    options = validateButtons(
      mergeArguments(defaults, arguments, ["title", "callback"]),
      ["cancel", "confirm"]
    );

    // capture the user's show value; we always set this to false before
    // spawning the dialog to give us a chance to attach some handlers to
    // it, but we need to make sure we respect a preference not to show it
    shouldShow = (options.show === undefined) ? true : options.show;

    /**
     * overrides; undo anything the user tried to set they shouldn't have
     */
    options.message = form;

    options.buttons.cancel.callback = options.onEscape = function() {
      return options.callback.call(this, null);
    };

    options.buttons.confirm.callback = function() {
      var value;

      switch (options.inputType) {
        case "text":
        case "textarea":
        case "email":
        case "select":
        case "date":
        case "time":
        case "number":
        case "password":
          value = input.val();
          break;

        case "checkbox":
          var checkedItems = input.find("input:checked");

          // we assume that checkboxes are always multiple,
          // hence we default to an empty array
          value = [];

          each(checkedItems, function(_, item) {
            value.push($(item).val());
          });
          break;
      }

      return options.callback.call(this, value);
    };

    options.show = false;

    // prompt specific validation
    if (!options.title) {
      throw new Error("prompt requires a title");
    }

    if (!$.isFunction(options.callback)) {
      throw new Error("prompt requires a callback");
    }

    if (!templates.inputs[options.inputType]) {
      throw new Error("invalid prompt type");
    }

    // create the input based on the supplied type
    input = $(templates.inputs[options.inputType]);

    switch (options.inputType) {
      case "text":
      case "textarea":
      case "email":
      case "date":
      case "time":
      case "number":
      case "password":
        input.val(options.value);
        break;

      case "select":
        var groups = {};
        inputOptions = options.inputOptions || [];

        if (!$.isArray(inputOptions)) {
          throw new Error("Please pass an array of input options");
        }

        if (!inputOptions.length) {
          throw new Error("prompt with select requires options");
        }

        each(inputOptions, function(_, option) {

          // assume the element to attach to is the input...
          var elem = input;

          if (option.value === undefined || option.text === undefined) {
            throw new Error("given options in wrong format");
          }

          // ... but override that element if this option sits in a group

          if (option.group) {
            // initialise group if necessary
            if (!groups[option.group]) {
              groups[option.group] = $("<optgroup/>").attr("label", option.group);
            }

            elem = groups[option.group];
          }

          elem.append("<option value='" + option.value + "'>" + option.text + "</option>");
        });

        each(groups, function(_, group) {
          input.append(group);
        });

        // safe to set a select's value as per a normal input
        input.val(options.value);
        break;

      case "checkbox":
        var values   = $.isArray(options.value) ? options.value : [options.value];
        inputOptions = options.inputOptions || [];

        if (!inputOptions.length) {
          throw new Error("prompt with checkbox requires options");
        }

        if (!inputOptions[0].value || !inputOptions[0].text) {
          throw new Error("given options in wrong format");
        }

        // checkboxes have to nest within a containing element, so
        // they break the rules a bit and we end up re-assigning
        // our 'input' element to this container instead
        input = $("<div/>");

        each(inputOptions, function(_, option) {
          var checkbox = $(templates.inputs[options.inputType]);

          checkbox.find("input").attr("value", option.value);
          checkbox.find("label").append(option.text);

          // we've ensured values is an array so we can always iterate over it
          each(values, function(_, value) {
            if (value === option.value) {
              checkbox.find("input").prop("checked", true);
            }
          });

          input.append(checkbox);
        });
        break;
    }

    // @TODO provide an attributes option instead
    // and simply map that as keys: vals
    if (options.placeholder) {
      input.attr("placeholder", options.placeholder);
    }

    if (options.pattern) {
      input.attr("pattern", options.pattern);
    }

    if (options.maxlength) {
      input.attr("maxlength", options.maxlength);
    }

    // now place it in our form
    form.append(input);

    form.on("submit", function(e) {
      e.preventDefault();
      // Fix for SammyJS (or similar JS routing library) hijacking the form post.
      e.stopPropagation();
      // @TODO can we actually click *the* button object instead?
      // e.g. buttons.confirm.click() or similar
      dialog.find(".btn-primary").click();
    });

    dialog = exports.dialog(options);

    // clear the existing handler focusing the submit button...
    dialog.off("shown.bs.modal");

    // ...and replace it with one focusing our input, if possible
    dialog.on("shown.bs.modal", function() {
      // need the closure here since input isn't
      // an object otherwise
      input.focus();
    });

    if (shouldShow === true) {
      dialog.modal("show");
    }

    return dialog;
  };

  exports.dialog = function(options) {
    options = sanitize(options);

    var dialog = $(templates.dialog);
    var innerDialog = dialog.find(".modal-dialog");
    var body = dialog.find(".modal-body");
    var buttons = options.buttons;
    var buttonStr = "";
    var callbacks = {
      onEscape: options.onEscape
    };

    if ($.fn.modal === undefined) {
      throw new Error(
        "$.fn.modal is not defined; please double check you have included " +
        "the Bootstrap JavaScript library. See http://getbootstrap.com/javascript/ " +
        "for more details."
      );
    }

    each(buttons, function(key, button) {

      // @TODO I don't like this string appending to itself; bit dirty. Needs reworking
      // can we just build up button elements instead? slower but neater. Then button
      // can just become a template too
      buttonStr += "<button data-bb-handler='" + key + "' type='button' class='btn " + button.className + "'>" + button.label + "</button>";
      callbacks[key] = button.callback;
    });

    body.find(".bootbox-body").html(options.message);

    if (options.animate === true) {
      dialog.addClass("fade");
    }

    if (options.className) {
      dialog.addClass(options.className);
    }

    if (options.size === "large") {
      innerDialog.addClass("modal-lg");
    } else if (options.size === "small") {
      innerDialog.addClass("modal-sm");
    }

    if (options.title) {
      body.before(templates.header);
    }

    if (options.closeButton) {
      var closeButton = $(templates.closeButton);

      if (options.title) {
        dialog.find(".modal-header").prepend(closeButton);
      } else {
        closeButton.css("margin-top", "-10px").prependTo(body);
      }
    }

    if (options.title) {
      dialog.find(".modal-title").html(options.title);
    }

    if (buttonStr.length) {
      body.after(templates.footer);
      dialog.find(".modal-footer").html(buttonStr);
    }


    /**
     * Bootstrap event listeners; used handle extra
     * setup & teardown required after the underlying
     * modal has performed certain actions
     */

    dialog.on("hidden.bs.modal", function(e) {
      // ensure we don't accidentally intercept hidden events triggered
      // by children of the current dialog. We shouldn't anymore now BS
      // namespaces its events; but still worth doing
      if (e.target === this) {
        dialog.remove();
      }
    });

    /*
    dialog.on("show.bs.modal", function() {
      // sadly this doesn't work; show is called *just* before
      // the backdrop is added so we'd need a setTimeout hack or
      // otherwise... leaving in as would be nice
      if (options.backdrop) {
        dialog.next(".modal-backdrop").addClass("bootbox-backdrop");
      }
    });
    */

    dialog.on("shown.bs.modal", function() {
      dialog.find(".btn-primary:first").focus();
    });

    /**
     * Bootbox event listeners; experimental and may not last
     * just an attempt to decouple some behaviours from their
     * respective triggers
     */

    if (options.backdrop !== "static") {
      // A boolean true/false according to the Bootstrap docs
      // should show a dialog the user can dismiss by clicking on
      // the background.
      // We always only ever pass static/false to the actual
      // $.modal function because with `true` we can't trap
      // this event (the .modal-backdrop swallows it)
      // However, we still want to sort of respect true
      // and invoke the escape mechanism instead
      dialog.on("click.dismiss.bs.modal", function(e) {
        // @NOTE: the target varies in >= 3.3.x releases since the modal backdrop
        // moved *inside* the outer dialog rather than *alongside* it
        if (dialog.children(".modal-backdrop").length) {
          e.currentTarget = dialog.children(".modal-backdrop").get(0);
        }

        if (e.target !== e.currentTarget) {
          return;
        }

        dialog.trigger("escape.close.bb");
      });
    }

    dialog.on("escape.close.bb", function(e) {
      if (callbacks.onEscape) {
        processCallback(e, dialog, callbacks.onEscape);
      }
    });

    /**
     * Standard jQuery event listeners; used to handle user
     * interaction with our dialog
     */

    dialog.on("click", ".modal-footer button", function(e) {
      var callbackKey = $(this).data("bb-handler");

      processCallback(e, dialog, callbacks[callbackKey]);
    });

    dialog.on("click", ".bootbox-close-button", function(e) {
      // onEscape might be falsy but that's fine; the fact is
      // if the user has managed to click the close button we
      // have to close the dialog, callback or not
      processCallback(e, dialog, callbacks.onEscape);
    });

    dialog.on("keyup", function(e) {
      if (e.which === 27) {
        dialog.trigger("escape.close.bb");
      }
    });

    // the remainder of this method simply deals with adding our
    // dialogent to the DOM, augmenting it with Bootstrap's modal
    // functionality and then giving the resulting object back
    // to our caller

    $(options.container).append(dialog);

    dialog.modal({
      backdrop: options.backdrop ? "static": false,
      keyboard: false,
      show: false
    });

    if (options.show) {
      dialog.modal("show");
    }

    // @TODO should we return the raw element here or should
    // we wrap it in an object on which we can expose some neater
    // methods, e.g. var d = bootbox.alert(); d.hide(); instead
    // of d.modal("hide");

   /*
    function BBDialog(elem) {
      this.elem = elem;
    }

    BBDialog.prototype = {
      hide: function() {
        return this.elem.modal("hide");
      },
      show: function() {
        return this.elem.modal("show");
      }
    };
    */

    return dialog;

  };

  exports.setDefaults = function() {
    var values = {};

    if (arguments.length === 2) {
      // allow passing of single key/value...
      values[arguments[0]] = arguments[1];
    } else {
      // ... and as an object too
      values = arguments[0];
    }

    $.extend(defaults, values);
  };

  exports.hideAll = function() {
    $(".bootbox").modal("hide");

    return exports;
  };


  /**
   * standard locales. Please add more according to ISO 639-1 standard. Multiple language variants are
   * unlikely to be required. If this gets too large it can be split out into separate JS files.
   */
  var locales = {
    bg_BG : {
      OK      : "Ок",
      CANCEL  : "Отказ",
      CONFIRM : "Потвърждавам"
    },
    br : {
      OK      : "OK",
      CANCEL  : "Cancelar",
      CONFIRM : "Sim"
    },
    cs : {
      OK      : "OK",
      CANCEL  : "Zrušit",
      CONFIRM : "Potvrdit"
    },
    da : {
      OK      : "OK",
      CANCEL  : "Annuller",
      CONFIRM : "Accepter"
    },
    de : {
      OK      : "OK",
      CANCEL  : "Abbrechen",
      CONFIRM : "Akzeptieren"
    },
    el : {
      OK      : "Εντάξει",
      CANCEL  : "Ακύρωση",
      CONFIRM : "Επιβεβαίωση"
    },
    en : {
      OK      : "OK",
      CANCEL  : "Cancel",
      CONFIRM : "OK"
    },
    es : {
      OK      : "OK",
      CANCEL  : "Cancelar",
      CONFIRM : "Aceptar"
    },
    et : {
      OK      : "OK",
      CANCEL  : "Katkesta",
      CONFIRM : "OK"
    },
    fa : {
      OK      : "قبول",
      CANCEL  : "لغو",
      CONFIRM : "تایید"
    },
    fi : {
      OK      : "OK",
      CANCEL  : "Peruuta",
      CONFIRM : "OK"
    },
    fr : {
      OK      : "OK",
      CANCEL  : "Annuler",
      CONFIRM : "D'accord"
    },
    he : {
      OK      : "אישור",
      CANCEL  : "ביטול",
      CONFIRM : "אישור"
    },
    hu : {
      OK      : "OK",
      CANCEL  : "Mégsem",
      CONFIRM : "Megerősít"
    },
    hr : {
      OK      : "OK",
      CANCEL  : "Odustani",
      CONFIRM : "Potvrdi"
    },
    id : {
      OK      : "OK",
      CANCEL  : "Batal",
      CONFIRM : "OK"
    },
    it : {
      OK      : "OK",
      CANCEL  : "Annulla",
      CONFIRM : "Conferma"
    },
    ja : {
      OK      : "OK",
      CANCEL  : "キャンセル",
      CONFIRM : "確認"
    },
    lt : {
      OK      : "Gerai",
      CANCEL  : "Atšaukti",
      CONFIRM : "Patvirtinti"
    },
    lv : {
      OK      : "Labi",
      CANCEL  : "Atcelt",
      CONFIRM : "Apstiprināt"
    },
    nl : {
      OK      : "OK",
      CANCEL  : "Annuleren",
      CONFIRM : "Accepteren"
    },
    no : {
      OK      : "OK",
      CANCEL  : "Avbryt",
      CONFIRM : "OK"
    },
    pl : {
      OK      : "OK",
      CANCEL  : "Anuluj",
      CONFIRM : "Potwierdź"
    },
    pt : {
      OK      : "OK",
      CANCEL  : "Cancelar",
      CONFIRM : "Confirmar"
    },
    ru : {
      OK      : "OK",
      CANCEL  : "Отмена",
      CONFIRM : "Применить"
    },
    sq : {
      OK : "OK",
      CANCEL : "Anulo",
      CONFIRM : "Prano"
    },
    sv : {
      OK      : "OK",
      CANCEL  : "Avbryt",
      CONFIRM : "OK"
    },
    th : {
      OK      : "ตกลง",
      CANCEL  : "ยกเลิก",
      CONFIRM : "ยืนยัน"
    },
    tr : {
      OK      : "Tamam",
      CANCEL  : "İptal",
      CONFIRM : "Onayla"
    },
    zh_CN : {
      OK      : "OK",
      CANCEL  : "取消",
      CONFIRM : "确认"
    },
    zh_TW : {
      OK      : "OK",
      CANCEL  : "取消",
      CONFIRM : "確認"
    }
  };

  exports.addLocale = function(name, values) {
    $.each(["OK", "CANCEL", "CONFIRM"], function(_, v) {
      if (!values[v]) {
        throw new Error("Please supply a translation for '" + v + "'");
      }
    });

    locales[name] = {
      OK: values.OK,
      CANCEL: values.CANCEL,
      CONFIRM: values.CONFIRM
    };

    return exports;
  };

  exports.removeLocale = function(name) {
    delete locales[name];

    return exports;
  };

  exports.setLocale = function(name) {
    return exports.setDefaults("locale", name);
  };

  exports.init = function(_$) {
    return init(_$ || $);
  };

  return exports;
}));

!function(d,B,m,f){function v(a,b){var c=Math.max(0,a[0]-b[0],b[0]-a[1]),e=Math.max(0,a[2]-b[1],b[1]-a[3]);return c+e}function w(a,b,c,e){var k=a.length;e=e?"offset":"position";for(c=c||0;k--;){var g=a[k].el?a[k].el:d(a[k]),l=g[e]();l.left+=parseInt(g.css("margin-left"),10);l.top+=parseInt(g.css("margin-top"),10);b[k]=[l.left-c,l.left+g.outerWidth()+c,l.top-c,l.top+g.outerHeight()+c]}}function p(a,b){var c=b.offset();return{left:a.left-c.left,top:a.top-c.top}}function x(a,b,c){b=[b.left,b.top];c=
c&&[c.left,c.top];for(var e,k=a.length,d=[];k--;)e=a[k],d[k]=[k,v(e,b),c&&v(e,c)];return d=d.sort(function(a,b){return b[1]-a[1]||b[2]-a[2]||b[0]-a[0]})}function q(a){this.options=d.extend({},n,a);this.containers=[];this.options.rootGroup||(this.scrollProxy=d.proxy(this.scroll,this),this.dragProxy=d.proxy(this.drag,this),this.dropProxy=d.proxy(this.drop,this),this.placeholder=d(this.options.placeholder),a.isValidTarget||(this.options.isValidTarget=f))}function t(a,b){this.el=a;this.options=d.extend({},
z,b);this.group=q.get(this.options);this.rootGroup=this.options.rootGroup||this.group;this.handle=this.rootGroup.options.handle||this.rootGroup.options.itemSelector;var c=this.rootGroup.options.itemPath;this.target=c?this.el.find(c):this.el;this.target.on(r.start,this.handle,d.proxy(this.dragInit,this));this.options.drop&&this.group.containers.push(this)}var r,z={drag:!0,drop:!0,exclude:"",nested:!0,vertical:!0},n={afterMove:function(a,b,c){},containerPath:"",containerSelector:"ol, ul",distance:0,
delay:0,handle:"",itemPath:"",itemSelector:"li",bodyClass:"dragging",draggedClass:"dragged",isValidTarget:function(a,b){return!0},onCancel:function(a,b,c,e){},onDrag:function(a,b,c,e){a.css(b)},onDragStart:function(a,b,c,e){a.css({height:a.outerHeight(),width:a.outerWidth()});a.addClass(b.group.options.draggedClass);d("body").addClass(b.group.options.bodyClass)},onDrop:function(a,b,c,e){a.removeClass(b.group.options.draggedClass).removeAttr("style");d("body").removeClass(b.group.options.bodyClass)},
onMousedown:function(a,b,c){if(!c.target.nodeName.match(/^(input|select|textarea)$/i))return c.preventDefault(),!0},placeholderClass:"placeholder",placeholder:'<li class="placeholder"></li>',pullPlaceholder:!0,serialize:function(a,b,c){a=d.extend({},a.data());if(c)return[b];b[0]&&(a.children=b);delete a.subContainers;delete a.sortable;return a},tolerance:0},s={},y=0,A={left:0,top:0,bottom:0,right:0};r={start:"touchstart.sortable mousedown.sortable",drop:"touchend.sortable touchcancel.sortable mouseup.sortable",
drag:"touchmove.sortable mousemove.sortable",scroll:"scroll.sortable"};q.get=function(a){s[a.group]||(a.group===f&&(a.group=y++),s[a.group]=new q(a));return s[a.group]};q.prototype={dragInit:function(a,b){this.$document=d(b.el[0].ownerDocument);var c=d(a.target).closest(this.options.itemSelector);c.length&&(this.item=c,this.itemContainer=b,!this.item.is(this.options.exclude)&&this.options.onMousedown(this.item,n.onMousedown,a)&&(this.setPointer(a),this.toggleListeners("on"),this.setupDelayTimer(),
this.dragInitDone=!0))},drag:function(a){if(!this.dragging){if(!this.distanceMet(a)||!this.delayMet)return;this.options.onDragStart(this.item,this.itemContainer,n.onDragStart,a);this.item.before(this.placeholder);this.dragging=!0}this.setPointer(a);this.options.onDrag(this.item,p(this.pointer,this.item.offsetParent()),n.onDrag,a);a=this.getPointer(a);var b=this.sameResultBox,c=this.options.tolerance;(!b||b.top-c>a.top||b.bottom+c<a.top||b.left-c>a.left||b.right+c<a.left)&&!this.searchValidTarget()&&
(this.placeholder.detach(),this.lastAppendedItem=f)},drop:function(a){this.toggleListeners("off");this.dragInitDone=!1;if(this.dragging){if(this.placeholder.closest("html")[0])this.placeholder.before(this.item).detach();else this.options.onCancel(this.item,this.itemContainer,n.onCancel,a);this.options.onDrop(this.item,this.getContainer(this.item),n.onDrop,a);this.clearDimensions();this.clearOffsetParent();this.lastAppendedItem=this.sameResultBox=f;this.dragging=!1}},searchValidTarget:function(a,b){a||
(a=this.relativePointer||this.pointer,b=this.lastRelativePointer||this.lastPointer);for(var c=x(this.getContainerDimensions(),a,b),e=c.length;e--;){var d=c[e][0];if(!c[e][1]||this.options.pullPlaceholder)if(d=this.containers[d],!d.disabled){if(!this.$getOffsetParent()){var g=d.getItemOffsetParent();a=p(a,g);b=p(b,g)}if(d.searchValidTarget(a,b))return!0}}this.sameResultBox&&(this.sameResultBox=f)},movePlaceholder:function(a,b,c,e){var d=this.lastAppendedItem;if(e||!d||d[0]!==b[0])b[c](this.placeholder),
this.lastAppendedItem=b,this.sameResultBox=e,this.options.afterMove(this.placeholder,a,b)},getContainerDimensions:function(){this.containerDimensions||w(this.containers,this.containerDimensions=[],this.options.tolerance,!this.$getOffsetParent());return this.containerDimensions},getContainer:function(a){return a.closest(this.options.containerSelector).data(m)},$getOffsetParent:function(){if(this.offsetParent===f){var a=this.containers.length-1,b=this.containers[a].getItemOffsetParent();if(!this.options.rootGroup)for(;a--;)if(b[0]!=
this.containers[a].getItemOffsetParent()[0]){b=!1;break}this.offsetParent=b}return this.offsetParent},setPointer:function(a){a=this.getPointer(a);if(this.$getOffsetParent()){var b=p(a,this.$getOffsetParent());this.lastRelativePointer=this.relativePointer;this.relativePointer=b}this.lastPointer=this.pointer;this.pointer=a},distanceMet:function(a){a=this.getPointer(a);return Math.max(Math.abs(this.pointer.left-a.left),Math.abs(this.pointer.top-a.top))>=this.options.distance},getPointer:function(a){var b=
a.originalEvent||a.originalEvent.touches&&a.originalEvent.touches[0];return{left:a.pageX||b.pageX,top:a.pageY||b.pageY}},setupDelayTimer:function(){var a=this;this.delayMet=!this.options.delay;this.delayMet||(clearTimeout(this._mouseDelayTimer),this._mouseDelayTimer=setTimeout(function(){a.delayMet=!0},this.options.delay))},scroll:function(a){this.clearDimensions();this.clearOffsetParent()},toggleListeners:function(a){var b=this;d.each(["drag","drop","scroll"],function(c,e){b.$document[a](r[e],b[e+
"Proxy"])})},clearOffsetParent:function(){this.offsetParent=f},clearDimensions:function(){this.traverse(function(a){a._clearDimensions()})},traverse:function(a){a(this);for(var b=this.containers.length;b--;)this.containers[b].traverse(a)},_clearDimensions:function(){this.containerDimensions=f},_destroy:function(){s[this.options.group]=f}};t.prototype={dragInit:function(a){var b=this.rootGroup;!this.disabled&&!b.dragInitDone&&this.options.drag&&this.isValidDrag(a)&&b.dragInit(a,this)},isValidDrag:function(a){return 1==
a.which||"touchstart"==a.type&&1==a.originalEvent.touches.length},searchValidTarget:function(a,b){var c=x(this.getItemDimensions(),a,b),e=c.length,d=this.rootGroup,g=!d.options.isValidTarget||d.options.isValidTarget(d.item,this);if(!e&&g)return d.movePlaceholder(this,this.target,"append"),!0;for(;e--;)if(d=c[e][0],!c[e][1]&&this.hasChildGroup(d)){if(this.getContainerGroup(d).searchValidTarget(a,b))return!0}else if(g)return this.movePlaceholder(d,a),!0},movePlaceholder:function(a,b){var c=d(this.items[a]),
e=this.itemDimensions[a],k="after",g=c.outerWidth(),f=c.outerHeight(),h=c.offset(),h={left:h.left,right:h.left+g,top:h.top,bottom:h.top+f};this.options.vertical?b.top<=(e[2]+e[3])/2?(k="before",h.bottom-=f/2):h.top+=f/2:b.left<=(e[0]+e[1])/2?(k="before",h.right-=g/2):h.left+=g/2;this.hasChildGroup(a)&&(h=A);this.rootGroup.movePlaceholder(this,c,k,h)},getItemDimensions:function(){this.itemDimensions||(this.items=this.$getChildren(this.el,"item").filter(":not(."+this.group.options.placeholderClass+
", ."+this.group.options.draggedClass+")").get(),w(this.items,this.itemDimensions=[],this.options.tolerance));return this.itemDimensions},getItemOffsetParent:function(){var a=this.el;return"relative"===a.css("position")||"absolute"===a.css("position")||"fixed"===a.css("position")?a:a.offsetParent()},hasChildGroup:function(a){return this.options.nested&&this.getContainerGroup(a)},getContainerGroup:function(a){var b=d.data(this.items[a],"subContainers");if(b===f){var c=this.$getChildren(this.items[a],
"container"),b=!1;c[0]&&(b=d.extend({},this.options,{rootGroup:this.rootGroup,group:y++}),b=c[m](b).data(m).group);d.data(this.items[a],"subContainers",b)}return b},$getChildren:function(a,b){var c=this.rootGroup.options,e=c[b+"Path"],c=c[b+"Selector"];a=d(a);e&&(a=a.find(e));return a.children(c)},_serialize:function(a,b){var c=this,e=this.$getChildren(a,b?"item":"container").not(this.options.exclude).map(function(){return c._serialize(d(this),!b)}).get();return this.rootGroup.options.serialize(a,
e,b)},traverse:function(a){d.each(this.items||[],function(b){(b=d.data(this,"subContainers"))&&b.traverse(a)});a(this)},_clearDimensions:function(){this.itemDimensions=f},_destroy:function(){var a=this;this.target.off(r.start,this.handle);this.el.removeData(m);this.options.drop&&(this.group.containers=d.grep(this.group.containers,function(b){return b!=a}));d.each(this.items||[],function(){d.removeData(this,"subContainers")})}};var u={enable:function(){this.traverse(function(a){a.disabled=!1})},disable:function(){this.traverse(function(a){a.disabled=
!0})},serialize:function(){return this._serialize(this.el,!0)},refresh:function(){this.traverse(function(a){a._clearDimensions()})},destroy:function(){this.traverse(function(a){a._destroy()})}};d.extend(t.prototype,u);d.fn[m]=function(a){var b=Array.prototype.slice.call(arguments,1);return this.map(function(){var c=d(this),e=c.data(m);if(e&&u[a])return u[a].apply(e,b)||this;e||a!==f&&"object"!==typeof a||c.data(m,new t(c,a));return this})}}(jQuery,window,"sortable");

!function(a,b){"use strict";function c(c,g){var h=this;h.$el=a(c),h.el=c,h.id=e++,h.$window=a(b),h.$document=a(document),h.$el.bind("destroyed",a.proxy(h.teardown,h)),h.$clonedHeader=null,h.$originalHeader=null,h.isSticky=!1,h.hasBeenSticky=!1,h.leftOffset=null,h.topOffset=null,h.init=function(){h.$el.each(function(){var b=a(this);b.css("padding",0),h.$originalHeader=a("thead:first",this),h.$clonedHeader=h.$originalHeader.clone(),b.trigger("clonedHeader."+d,[h.$clonedHeader]),h.$clonedHeader.addClass("tableFloatingHeader"),h.$clonedHeader.css("display","none"),h.$originalHeader.addClass("tableFloatingHeaderOriginal"),h.$originalHeader.after(h.$clonedHeader),h.$printStyle=a('<style type="text/css" media="print">.tableFloatingHeader{display:none !important;}.tableFloatingHeaderOriginal{position:static !important;}</style>'),a("head").append(h.$printStyle)}),h.setOptions(g),h.updateWidth(),h.toggleHeaders(),h.bind()},h.destroy=function(){h.$el.unbind("destroyed",h.teardown),h.teardown()},h.teardown=function(){h.isSticky&&h.$originalHeader.css("position","static"),a.removeData(h.el,"plugin_"+d),h.unbind(),h.$clonedHeader.remove(),h.$originalHeader.removeClass("tableFloatingHeaderOriginal"),h.$originalHeader.css("visibility","visible"),h.$printStyle.remove(),h.el=null,h.$el=null},h.bind=function(){h.$scrollableArea.on("scroll."+d,h.toggleHeaders),h.isWindowScrolling||(h.$window.on("scroll."+d+h.id,h.setPositionValues),h.$window.on("resize."+d+h.id,h.toggleHeaders)),h.$scrollableArea.on("resize."+d,h.toggleHeaders),h.$scrollableArea.on("resize."+d,h.updateWidth)},h.unbind=function(){h.$scrollableArea.off("."+d,h.toggleHeaders),h.isWindowScrolling||(h.$window.off("."+d+h.id,h.setPositionValues),h.$window.off("."+d+h.id,h.toggleHeaders)),h.$scrollableArea.off("."+d,h.updateWidth)},h.toggleHeaders=function(){h.$el&&h.$el.each(function(){var b,c=a(this),e=h.isWindowScrolling?isNaN(h.options.fixedOffset)?h.options.fixedOffset.outerHeight():h.options.fixedOffset:h.$scrollableArea.offset().top+(isNaN(h.options.fixedOffset)?0:h.options.fixedOffset),f=c.offset(),g=h.$scrollableArea.scrollTop()+e,i=h.$scrollableArea.scrollLeft(),j=h.isWindowScrolling?g>f.top:e>f.top,k=(h.isWindowScrolling?g:0)<f.top+c.height()-h.$clonedHeader.height()-(h.isWindowScrolling?0:e);j&&k?(b=f.left-i+h.options.leftOffset,h.$originalHeader.css({position:"fixed","margin-top":h.options.marginTop,left:b,"z-index":3}),h.leftOffset=b,h.topOffset=e,h.$clonedHeader.css("display",""),h.isSticky||(h.isSticky=!0,h.updateWidth(),c.trigger("enabledStickiness."+d)),h.setPositionValues()):h.isSticky&&(h.$originalHeader.css("position","static"),h.$clonedHeader.css("display","none"),h.isSticky=!1,h.resetWidth(a("td,th",h.$clonedHeader),a("td,th",h.$originalHeader)),c.trigger("disabledStickiness."+d))})},h.setPositionValues=function(){var a=h.$window.scrollTop(),b=h.$window.scrollLeft();!h.isSticky||0>a||a+h.$window.height()>h.$document.height()||0>b||b+h.$window.width()>h.$document.width()||h.$originalHeader.css({top:h.topOffset-(h.isWindowScrolling?0:a),left:h.leftOffset-(h.isWindowScrolling?0:b)})},h.updateWidth=function(){if(h.isSticky){h.$originalHeaderCells||(h.$originalHeaderCells=a("th,td",h.$originalHeader)),h.$clonedHeaderCells||(h.$clonedHeaderCells=a("th,td",h.$clonedHeader));var b=h.getWidth(h.$clonedHeaderCells);h.setWidth(b,h.$clonedHeaderCells,h.$originalHeaderCells),h.$originalHeader.css("width",h.$clonedHeader.width())}},h.getWidth=function(c){var d=[];return c.each(function(c){var e,f=a(this);if("border-box"===f.css("box-sizing")){var g=f[0].getBoundingClientRect();e=g.width?g.width:g.right-g.left}else{var i=a("th",h.$originalHeader);if("collapse"===i.css("border-collapse"))if(b.getComputedStyle)e=parseFloat(b.getComputedStyle(this,null).width);else{var j=parseFloat(f.css("padding-left")),k=parseFloat(f.css("padding-right")),l=parseFloat(f.css("border-width"));e=f.outerWidth()-j-k-l}else e=f.width()}d[c]=e}),d},h.setWidth=function(a,b,c){b.each(function(b){var d=a[b];c.eq(b).css({"min-width":d,"max-width":d})})},h.resetWidth=function(b,c){b.each(function(b){var d=a(this);c.eq(b).css({"min-width":d.css("min-width"),"max-width":d.css("max-width")})})},h.setOptions=function(c){h.options=a.extend({},f,c),h.$scrollableArea=a(h.options.scrollableArea),h.isWindowScrolling=h.$scrollableArea[0]===b},h.updateOptions=function(a){h.setOptions(a),h.unbind(),h.bind(),h.updateWidth(),h.toggleHeaders()},h.init()}var d="stickyTableHeaders",e=0,f={fixedOffset:0,leftOffset:0,marginTop:0,scrollableArea:b};a.fn[d]=function(b){return this.each(function(){var e=a.data(this,"plugin_"+d);e?"string"==typeof b?e[b].apply(e):e.updateOptions(b):"destroy"!==b&&a.data(this,"plugin_"+d,new c(this,b))})}}(jQuery,window);
'use strict';
//define namespaces for global functionality sets
var plenty_admin = {};
plenty_admin.UI = {};
plenty_admin.UI.DOM = $("body");
plenty_admin.UI.loadingOverlay = plenty_admin.UI.DOM.find("#loadingOverlay");			

//an array of font icon class names to check against;
plenty_admin.UI.fontIconClasses = [
	"moisture-sensor",
	"pest-control",
	"harvest",
	"soil-test",
	"planting",
	"fertilizer",
	"tilling",
	"late-nitrogen",
	"early-nitrogen",
	"spreader",
	"sprayer",
	"grain-cart",
	"combine",
	"offset-disk",
	"atv",
	"pipe",
	"spray-plane",
	"tractor",
	"well",
	"planter",
	"grain-truck"
];		

//build the brand palette object
plenty_admin.UI.brand_palette = new Rainbow();
plenty_admin.UI.brand_palette.setSpectrum("#0076b2", "#93b222", "#788912");

/* ********* REST API global interface ************ */
//set up RESTFul API credentials
plenty_admin.REST = {};
plenty_admin.REST.URL = '52.5.118.250:8080/plenty';
plenty_admin.REST.fullURL = "http://"+plenty_admin.REST.URL;

/* set up the timezone conversion library */
/*
timezoneJS.timezone.zoneFileBasePath = 'js/tz';
timezoneJS.timezone.init({ callback: function(ev){
	console.log("timezone-js is now ready: ", ev);
} });
*/

plenty_admin.init = function(context){
	plenty_admin.context = context;
	//setup the logout link
	plenty_admin.UI.DOM
	.find(".navbar li.logout a")
	.click(function(){
		store.remove("plenty_username"); //remove the stored username
		store.get("basicAuth"); // remove the stored auth key
		location.href = "/";
		return false;
	});
	
	//set up a global event handler for modal popups
	$('body')
	.on('shown.bs.modal', '.modal', function () {
		console.log('we have shown a modal');
		$('body')
		.find(".page-container")
		.addClass("blur");
	})
	.on('hidden.bs.modal', '.modal', function () {
		console.log('we have hidden a modal');
		
		if(!$('body').hasClass("loading")){
			$('body')
			.find(".page-container")
			.removeClass("blur");
		}
	});

	//get the logged in user's details
	plenty_admin.REST.get_user_with_username(store.get("plenty_username"), function(response){
		plenty_admin.DATA.userDetails = response;
		console.log("userDetails: ", plenty_admin.DATA.userDetails, context); // user logged in successfully
		
		//insert user detils into head of page
		plenty_admin.UI.DOM
		.find("#navbar .navbar-right .userFName")
		.text(plenty_admin.DATA.userDetails.firstName)
		.end()
		.find("#navbar .navbar-right .userLName")
		.text(plenty_admin.DATA.userDetails.lastName)
		.parent()
		.fadeIn("fast");
		
		switch (context){
			case "settings":
				// load all dependency packages befire initiating the settings
				plenty_admin.DATA.load_user_organizations(function(orgsForUser){
					plenty_admin.DATA.getInitialOrganizationData(orgsForUser, function(){
						plenty_admin.DATA.eventCollector = window.eventcollector(5, 10000);
						plenty_admin.REST.getEquipmentTypes();
						plenty_admin.REST.getRoleTypes();
						plenty_admin.REST.getOrganizationTypes();
						plenty_admin.REST.getBoundaryTypes();
						plenty_admin.REST.getGrowthMethods();
						plenty_admin.DATA.eventCollector.on('done', function(fired, total, data) {
						  console.log('event %d of %d emitted', fired, total);
						  console.log('event description:', data);
						});
						
						plenty_admin.DATA.eventCollector.on('alldone', function(total) {
							$( document ).trigger( "organization_data_ready", [ plenty_admin.DATA.organizations ] );
							//plenty_admin.HELPER.hideLoadingOverlay();
						});	
					});
				});
			break;
			
			case "map":
				// load all dependency packages before initiating the map
				plenty_admin.DATA.load_user_organizations(function(orgsForUser){
					plenty_admin.DATA.organizations = {};
					var _orgsBody = orgsForUser.body();
					
					//loop organizations and add them to the map page
					for(var o = 0; o < _orgsBody.length; o++){
						var org_data = _orgsBody[o].data();
						plenty_admin.DATA.organizations[org_data.id] = org_data;
					}
					
					$( document ).trigger( "map_data_ready" );
				});
				
			break;
			
			case "dashboard":
				plenty_admin.HELPER.hideLoadingOverlay();
				$( document ).trigger( "dashboard_data_ready", [ plenty_admin.DATA.organizations ] );
			break;
			
			case "plans":
				$( document ).trigger( "plans_data_ready");
			break;
		}
	});
}

plenty_admin.REST.make_base_auth = function(user, password) {
  var tok = user + ':' + password;
  var hash = btoa(tok);
  var basicAuth = "Basic " + hash;
  console.log("basicAuth:", basicAuth);
  return basicAuth;
}

plenty_admin.api = restful(plenty_admin.REST.URL);

//set authorization header on the API object
plenty_admin.api.header("Authorization", store.get("basicAuth"));
//plenty_admin.api.header("timeout", 10000);

// method to define exactly which object needs updating when inline editing
plenty_admin.REST.getDataForEditable = function(updateProperties, propName, propValue){
	console.log("get data for this element: ", updateProperties, propName, propValue);
	
	var updateData = null;
	
	switch(updateProperties[1]){
		case "organizations":
			var initialOrgData = plenty_admin.DATA.organizations[updateProperties[0]];
			updateData = {};
			//create the base organization object to send with ajax post requests
			updateData.organizationTypeId = initialOrgData.organizationTypeId
			updateData.name = initialOrgData.name;
			updateData.addressLine1 = initialOrgData.addressLine1;
			updateData.addressLine2 = initialOrgData.addressLine2;
			updateData.city = initialOrgData.city;
			updateData.state = initialOrgData.state;
			updateData.zip = initialOrgData.zip;
			updateData.id = initialOrgData.id;
			updateData.created = initialOrgData.created;
			updateData.lastModified = initialOrgData.lastModified;
			updateData[propName] = propValue;
		break;
		
		case "users":
			updateData = $.grep(plenty_admin.DATA.current_organization.users, function(user, u){
				return user.id === parseInt(updateProperties[2]);
			})[0];
			updateData[propName] = propValue;
		break;
		
		case "fields":
			updateData = $.grep(plenty_admin.DATA.current_farm.fields, function(field, f){
				return field.id === parseInt(updateProperties[2]);
			})[0];
			updateData[propName] = propValue;
		break;
		
		case "fieldCrop":
			updateData = {};
			switch(propName){
				case "cropTypeId":
					updateData.id = parseInt(updateProperties[0]);
					updateData.cropTypeId = parseInt(propValue);
					updateData.tillageTypeId = parseInt(updateProperties[3]);
					updateData.irrigationTypeId = parseInt(updateProperties[4]);
					updateData.year = updateProperties[5];
					updateData.fieldId = parseInt(updateProperties[6]);
				break;
				
				case "tillageTypeId":
					updateData.id = parseInt(updateProperties[0]);
					updateData.cropTypeId = parseInt(updateProperties[2]);
					updateData.tillageTypeId = parseInt(propValue);
					updateData.irrigationTypeId = parseInt(updateProperties[4]);
					updateData.year = updateProperties[5];
					updateData.fieldId = parseInt(updateProperties[6]);
				break;
				
				case "irrigationTypeId":
					updateData.id = parseInt(updateProperties[0]);
					updateData.cropTypeId = parseInt(updateProperties[2]);
					updateData.tillageTypeId = parseInt(updateProperties[3]);
					updateData.irrigationTypeId = parseInt(propValue);
					updateData.year = updateProperties[5];
					updateData.fieldId = parseInt(updateProperties[6]);
				break;
				
				case "year":
					updateData.id = parseInt(updateProperties[0]);
					updateData.cropTypeId = parseInt(updateProperties[2]);
					updateData.tillageTypeId = parseInt(updateProperties[3]);
					updateData.irrigationTypeId = parseInt(updateProperties[4]);
					updateData.year = propValue
					updateData.fieldId = parseInt(updateProperties[6]);
				break;
			}
		break;
	}
	
	console.log("Data object to send in post: ", updateData);
	return updateData;
}


// return the options for inline editing including data object to be sent and URL for ajax request
plenty_admin.REST.inline_editing_options = {
			//params: plenty_admin.REST.getParamsForEditable,
			url:function(args){
				console.log("generate url: ", args);
				var $this = $(this);
				var d = new $.Deferred;
				
				//split the arguements if it is a slash separated string
				var updateProperties = args.pk.split("/");
				
				console.log("updateProperties", updateProperties);
				
				var RESTCall = "";
	
				switch(updateProperties[1]){
					case "organizations":
						RESTCall = "organizations/updateOrganization";
					break;
					
					case "users":
						RESTCall = "users/updateUser";
					break;
					
					case "fieldsAndCropTypes":
						RESTCall = "fields/updateField";
					break;
					
					case "fieldCrop":
						RESTCall = "fieldCrops/updateFieldCrop";
					break;
				}
				
				$.ajax({
				  url: plenty_admin.REST.fullURL+"/"+RESTCall,
				  type:"POST",
				  dataType: 'json',
				  processData: false,
				  headers:{"Authorization":store.get("basicAuth")},
    			  contentType: 'application/json;charset=UTF-8',
				  data:JSON.stringify(plenty_admin.REST.getDataForEditable(updateProperties, args.name, args.value))
				}).success(function(returnData) {
					d.resolve();
					$this.editable("hide");
				}).error(function(){
					console.error("inline editing commit failed");
				});
	
				return d.promise();
			}
			
	}

plenty_admin.DATA = {};
//create the organization API collection
plenty_admin.REST.getInitialDataForOrganization = plenty_admin.api.all("settings/getInitialDataForOrganization");

plenty_admin.DATA.getInitialDataForOrganization = function(id, _orgsBody, callback){
	plenty_admin.REST.getInitialDataForOrganization
		.get(id)
		.then(function(org_sub){
			//console.log("Organization initial data: ", org_sub);
			var org_sub_body = org_sub.body();
			var org_sub_data = org_sub_body.data();
			//console.log("org_initial_data: ", org_sub_data, plenty_admin.DATA.organizations, plenty_admin.DATA.organizations[org_sub_data.organizationId]);
			
			
			var full_org = $.extend({}, plenty_admin.DATA.organizations[org_sub_data.organizationId], org_sub_data);
			//console.log("full_org: ", full_org);
			plenty_admin.DATA.organizations[full_org.id] = full_org;
			plenty_admin.DATA.organizations.length += 1;
			
			if(_orgsBody && plenty_admin.DATA.organizations.length === _orgsBody.length){
				if(callback && typeof callback === "function"){
					callback();
				}
			}else{
				if(callback && typeof callback === "function"){
					callback();
				}
			}
		});
}

plenty_admin.DATA.getInitialOrganizationData = function(orgs, callback){
	var _orgsBody = orgs.body();
	console.log("getInitialOrganizationData: ", _orgsBody);
	plenty_admin.DATA.organizations = {};
	plenty_admin.DATA.organizations.length = 0;
	
	//loop organizations and add them to the dashboard
	for(var o = 0; o < _orgsBody.length; o++){
		var org_data = _orgsBody[o].data();
		plenty_admin.DATA.organizations[org_data.id] = org_data;
		console.log("looping orgs: ", org_data, o);
		//get dashboard per organization in this loop, then build the dashboard org element
		
		plenty_admin.DATA.getInitialDataForOrganization(org_data.id, _orgsBody, callback);
	}
}

plenty_admin.DATA.timezones = [
	{value:"AST", text:"Alaska Standard Time"},
	{value:"CST", text:"Central Standard Time"},
	{value:"EST", text:"Eastern Standard Time"},
	{value:"MST", text:"Mountain Standard Time"},
	{value:"PST", text:"Pacific Standard Time"}
];

plenty_admin.DATA.load_user_organizations = function(callback){
	plenty_admin.REST.getOrganizationsForUser = plenty_admin.api.one("settings/getOrganizationsForUser", plenty_admin.DATA.userDetails.id);
	plenty_admin.REST.getOrganizationsForUser.get().then(function(orgsForUser){
			console.log("orgsForUser: ", orgsForUser);
			if(callback && typeof callback === "function"){
				callback(orgsForUser);
			}
		}
	);
}

plenty_admin.DATA.load_user_filters = function(callback){
	plenty_admin.REST.getFiltersByUser = plenty_admin.api.one("login/getFilterForUserAndCreateIfNotFound", plenty_admin.DATA.userDetails.id);
	plenty_admin.REST.getFiltersByUser.get().then(function(filtersByUser){
			//console.log("filtersByUser: ", filtersByUser.body());
			if(callback && typeof callback === "function"){
				callback(filtersByUser);
			}
		}
	);
}

// process data returned from the REST API using restFul.js into an object with ID handles
plenty_admin.REST.get_object_from_data = function(returnData){
	var dataTypes = {};
	for(var r=0; r<returnData.length; r++){
		data = returnData[r].data();
		dataTypes[data.id] = data;
	}
	return dataTypes;
}

// process data returned from the REST API using restFul.js into an object with ID handles
plenty_admin.REST.get_array_from_data = function(returnData){
	var dataTypes = [];
	for(var r=0; r<returnData.length; r++){
		data = returnData[r].data();
		dataTypes.push(data);
	}
	return dataTypes;
}

// get all equipment types and store them
plenty_admin.REST.equipmentTypes = plenty_admin.api.all("equipmentTypes/getAllEquipmentTypes");
plenty_admin.REST.getEquipmentTypes = function(){
	plenty_admin.DATA.equipmentTypes = {};
	plenty_admin.REST.equipmentTypes.getAll()
		.then(
			function(equipmentTypesReturn){
				plenty_admin.DATA.equipmentTypes = plenty_admin.REST.get_object_from_data(equipmentTypesReturn.body());
				console.log("Get equip types finished");
				
				//populate equipment type lists:
				var equipTypesHTML = "";
				for(var e=0; e< plenty_admin.DATA.equipmentTypes.length; e++){
					var equip = plenty_admin.DATA.equipmentTypes[e];
					equipTypesHTML += "<option value='"+equip.id+"'>"+equip.name+"</option>";
				}
				plenty_admin.UI.DOM
				.find(".equipment_type_list")
				.find("option")
				.remove()
				.append(equipTypesHTML);
				
				plenty_admin.DATA.eventCollector.done("equipment");
			});
}

// get all equipment types and store them
plenty_admin.REST.equipmentEquipmentTypes = plenty_admin.api.all("equipmentEquipmentTypes/getAll");
plenty_admin.REST.getEquipmentEquipmentTypes = function(){
	plenty_admin.REST.equipmentEquipmentTypes.getAll()
		.then(
			function(equipmentTypesReturn){
				plenty_admin.DATA.equipmentEquipmentTypes = plenty_admin.REST.get_object_from_data(equipmentTypesReturn.body());
				console.log("Get equip equip types finished");
				
				plenty_admin.DATA.eventCollector.done("equipment equipment");
			});
}

plenty_admin.REST.getEquipmentByOrgAndType = function(org, type, callback, el){
	plenty_admin.REST.equipmentByOrgAndType = plenty_admin.api.one("equipmentEquipmentTypes/getByOrganizationAndType/"+org, type);
	plenty_admin.REST.equipmentByOrgAndType.get()
		.then(
			function(equipmentReturn){
				//plenty_admin.DATA.equipmentTypes = plenty_admin.REST.get_object_from_data(equipmentTypesReturn.body());
				var orgEquipmentForType = plenty_admin.REST.get_object_from_data(equipmentReturn.body());
				//console.log("Get equip types for org finished", orgEquipmentForType);
				
				if(callback && typeof callback === "function"){
					callback(orgEquipmentForType, el);
				}
			});
}

plenty_admin.REST.getSkillsAndRatesForOrg = function(callback){
	var org = plenty_admin.DATA.current_organization.id;
	var user = plenty_admin.DATA.userDetails.id;
	plenty_admin.REST.skillsAndRatesByUserAndOrg = plenty_admin.api.one("skillsAndRates/getByUsersInOrganization/", org);
	plenty_admin.REST.skillsAndRatesByUserAndOrg.get()
		.then(
			function(skillsAndRatesReturn){
				var orgSkillsAndRates = plenty_admin.REST.get_object_from_data(skillsAndRatesReturn.body());
				plenty_admin.DATA.current_organization.skillsAndRates = orgSkillsAndRates;
				//console.log("Get equip types for org finished", orgEquipmentForType);
				
				if(callback && typeof callback === "function"){
					callback();
				}
			});
}

plenty_admin.REST.getEquipmentEquipmentTypesForOrg = function(){
	plenty_admin.REST.equipmentEquipmentByOrg = plenty_admin.api.one("equipmentEquipmentTypes/getByOrganization", plenty_admin.DATA.current_organization.id);
	plenty_admin.REST.equipmentEquipmentByOrg.get()
		.then(
			function(equipmentReturn){
				//plenty_admin.DATA.equipmentTypes = plenty_admin.REST.get_object_from_data(equipmentTypesReturn.body());
				var orgEquipmentEquipment = plenty_admin.REST.get_object_from_data(equipmentReturn.body());
				//console.log("Get equip types for org finished", orgEquipmentForType);
				
				plenty_admin.DATA.current_organization.equipmentEquipmentTypes = orgEquipmentEquipment;
				
				plenty_admin.DATA.eventCollector.done("equipmentEquipmentTypes");
			});
}

plenty_admin.REST.allProducts = plenty_admin.api.all("products/getAllProducts");
plenty_admin.REST.getAllProducts = function(){
	plenty_admin.REST.allProducts.getAll()
		.then(
			function(productsReturn){
				var products = plenty_admin.REST.get_object_from_data(productsReturn.body());
				console.log("products", products);
				plenty_admin.DATA.allProducts = products;
				plenty_admin.DATA.eventCollector.done("allProducts");
			});
}

plenty_admin.REST.getProductsByType = function(type, callback, el){
	plenty_admin.REST.productsByType = plenty_admin.api.one("products/getByProductType", type);
	plenty_admin.REST.productsByType.get()
		.then(
			function(productReturn){
				//plenty_admin.DATA.equipmentTypes = plenty_admin.REST.get_object_from_data(equipmentTypesReturn.body());
				var orgProductsForType = plenty_admin.REST.get_object_from_data(productReturn.body());
				//console.log("Get product types for org finished", orgProductsForType);
				
				if(callback && typeof callback === "function"){
					callback(orgProductsForType, el);
				}
			});
}

// get all equipment types and store them
plenty_admin.REST.brandTypes = plenty_admin.api.all("brands/getAllBrands");
plenty_admin.REST.getBrandTypes = function(){
	plenty_admin.DATA.brandTypes = {};
	plenty_admin.REST.brandTypes.getAll()
		.then(
			function(brandTypesReturn){
				plenty_admin.DATA.brandTypes = plenty_admin.REST.get_object_from_data(brandTypesReturn.body());
				console.log("Get brand types finished");
				
				//populate equipment type lists:
				var brandTypesHTML = "";
				for(index in plenty_admin.DATA.brandTypes){
					if(plenty_admin.DATA.brandTypes.hasOwnProperty(index)){
						var brand = plenty_admin.DATA.brandTypes[index];
						brandTypesHTML += "<option value='"+brand.id+"'>"+brand.name+"</option>";
					}
				}
				plenty_admin.UI.DOM
				.find(".brand_type_list")
				.find("option")
				.remove()
				.append(brandTypesHTML);
				
				plenty_admin.DATA.eventCollector.done("Brands");
			});
}

// get all activity types and store them
plenty_admin.REST.activityTypes = plenty_admin.api.all("activityTypes/getAllActivityTypes");
plenty_admin.REST.getActivityTypes = function(){
	plenty_admin.REST.activityTypes.getAll()
		.then(
			function(activityTypesReturn){
				plenty_admin.DATA.activityTypes = plenty_admin.REST.get_object_from_data(activityTypesReturn.body());
				console.log("Get activity types finished");
				
				plenty_admin.DATA.eventCollector.done("activities");
			},
			function(err){
				console.error("getting activity types failed: ", err);
			});
}

// get all skill types and store them
plenty_admin.REST.skillTypes = plenty_admin.api.all("skills/getAllSkills");
plenty_admin.REST.getSkillTypes = function(){
	plenty_admin.REST.skillTypes.getAll()
		.then(
			function(skillTypesReturn){
				var dataTypes = {};
				for(var r=0; r<skillTypesReturn.body().length; r++){
					data = skillTypesReturn.body()[r].data();
					dataTypes[data.id] = data;
				}
				
				plenty_admin.DATA.labourTypes = dataTypes;
				console.log("Get labour types finished");
				
				plenty_admin.DATA.eventCollector.done("labour");
			},
			function(err){
				console.error("getting skill types failed: ", err);
			});
}

// get all skill types and store them
plenty_admin.REST.productTypes = plenty_admin.api.all("productTypes/getAllProductTypes");
plenty_admin.REST.getProductTypes = function(){
	plenty_admin.REST.productTypes.getAll()
		.then(
			function(productTypesReturn){
				plenty_admin.DATA.productTypes = plenty_admin.REST.get_object_from_data(productTypesReturn.body());
				console.log("Get product types finished");
				
				plenty_admin.DATA.eventCollector.done("products");
			},
			function(err){
				console.error("getting skill types failed: ", err);
			});
}

// get all role types and store them
plenty_admin.REST.roleTypes = plenty_admin.api.all("roleTypes/getAllRoleTypes");
plenty_admin.REST.getRoleTypes = function(){
	plenty_admin.DATA.roleTypes = {};
	plenty_admin.REST.roleTypes.getAll()
		.then(
			function(roleTypesReturn){
				plenty_admin.DATA.roleTypes = plenty_admin.REST.get_object_from_data(roleTypesReturn.body());
				console.log("Get role types finished");
				plenty_admin.DATA.eventCollector.done("roles");
			});
}

// get all crop types and store them
plenty_admin.REST.cropTypes = plenty_admin.api.all("cropTypes/getAllCropTypes");
plenty_admin.REST.getCropTypes = function(){
	plenty_admin.DATA.cropTypes = {};
	plenty_admin.REST.cropTypes.getAll()
		.then(
			function(cropTypesReturn){
				plenty_admin.DATA.cropTypes = plenty_admin.REST.get_object_from_data(cropTypesReturn.body());
				console.log("Get crop types finished");
				plenty_admin.DATA.eventCollector.done("Crop Types");
			});
}

// get all tillage types and store them
plenty_admin.REST.tillageTypes = plenty_admin.api.all("tillageType/getAllTillageTypes");
plenty_admin.REST.getTillageTypes = function(){
	plenty_admin.DATA.tillageTypes = {};
	plenty_admin.REST.tillageTypes.getAll()
		.then(
			function(tillageTypesReturn){
				plenty_admin.DATA.tillageTypes = plenty_admin.REST.get_object_from_data(tillageTypesReturn.body());
				console.log("Get tillage types finished");
				plenty_admin.DATA.eventCollector.done("tillage types");
			});
}

// get all irrigation types and store them
plenty_admin.REST.irrigationTypes = plenty_admin.api.all("irrigationTypes/getAllIrrigationTypes");
plenty_admin.REST.getIrrigationTypes = function(){
	plenty_admin.DATA.irrigationTypes = {};
	plenty_admin.REST.irrigationTypes.getAll()
		.then(
			function(irrigationTypesReturn){
				plenty_admin.DATA.irrigationTypes = plenty_admin.REST.get_object_from_data(irrigationTypesReturn.body());
				console.log("Get irrigation types finished");
				plenty_admin.DATA.eventCollector.done("irrigation types");
			});
}

// get all organization types and store them
plenty_admin.REST.organizationTypes = plenty_admin.api.all("organizationTypes/getAllOrganizationTypes");
plenty_admin.REST.getOrganizationTypes = function(){
	plenty_admin.DATA.organizationTypes = {};
	plenty_admin.REST.organizationTypes.getAll()
		.then(
			function(orgTypes){
				plenty_admin.DATA.organizationTypes = plenty_admin.REST.get_object_from_data(orgTypes.body());
				console.log("Get org types finished");
				plenty_admin.DATA.eventCollector.done("organization types");
			});
}

// get all organization types and store them
plenty_admin.REST.boundaryTypes = plenty_admin.api.all("boundaryType/getAllBoundaryTypes");
plenty_admin.REST.getBoundaryTypes = function(){
	plenty_admin.DATA.boundaryTypes = {};
	plenty_admin.REST.boundaryTypes.getAll()
		.then(
			function(boundaryTypes){
				plenty_admin.DATA.boundaryTypes = plenty_admin.REST.get_object_from_data(boundaryTypes.body());
				console.log("Get boundary types finished");
				plenty_admin.DATA.eventCollector.done("boundary types");
			});
}

// get all growth methods and store them
plenty_admin.REST.growthMethods = plenty_admin.api.all("cropStage/getAllGrowthMethods");
plenty_admin.REST.getGrowthMethods = function(){
	plenty_admin.DATA.growthMethodTypes = {};
	plenty_admin.REST.growthMethods.getAll()
		.then(
			function(growthMethods){
				plenty_admin.DATA.growthMethodTypes = plenty_admin.REST.get_object_from_data(growthMethods.body());
				console.log("Get growth methods finished:", plenty_admin.DATA.growthMethodTypes);
				plenty_admin.DATA.eventCollector.done("growth methods");
			});
}

// get all organization types and store them
plenty_admin.REST.allUsers = plenty_admin.api.all("users/getAllUsers");
plenty_admin.REST.getAllUsers = function(callback){
	plenty_admin.DATA.allUsers = {};
	plenty_admin.REST.allUsers.getAll()
		.then(
			function(allUsers){
				plenty_admin.DATA.allUsers = plenty_admin.REST.get_object_from_data(allUsers.body());
				console.log("Get all users finished: ", plenty_admin.DATA.allUsers);
				
				if(callback && typeof callback === "function"){
					callback(allUsers);
				}
			});
}

plenty_admin.REST.get_user_with_username = function(username, callback){
	plenty_admin.REST.getUserWithUsername = plenty_admin.api.one("login/getUserWithUserName", username);
	plenty_admin.REST.getUserWithUsername.get().then(function(response){
		console.log("getUserWithUserName", response.body()());
		if(callback && typeof callback === "function"){
			callback(response.body()());
		}
	});
}

plenty_admin.REST.get_user_with_id = function(id, callback){
	plenty_admin.REST.getUserWithId = plenty_admin.api.one("users/getUser", id);
	plenty_admin.REST.getUserWithId.get().then(function(response){
		if(callback && typeof callback === "function"){
			var response_body = response.body();
			response_data = response_body.data();
			callback(response_data);
		}
	});
}

plenty_admin.REST.get_roles_with_userid = function(id, callback){
	plenty_admin.REST.getUserWithId = plenty_admin.api.one("role/getRolesWithUserId", id);
	plenty_admin.REST.getUserWithId.get().then(function(response){
		if(callback && typeof callback === "function"){
			var response_body = response.body();
			var roles = [];
			for(var r=0; r<response_body.length; r++){
				var role = response_body[r].data();
				roles.push(role);
			}
			console.log("roles: ", roles);
			callback(roles);
		}
	});
}

plenty_admin.REST.get_interests_by_field = function(id, callback){
	plenty_admin.REST.getAllInterestsByField = plenty_admin.api.one("interests/getAllInterestsByField", id);
	plenty_admin.REST.getAllInterestsByField.get().then(function(response){
		if(callback && typeof callback === "function"){
			var response_body = response.body();
			var interests = [];
			for(var r=0; r<response_body.length; r++){
				var interest = response_body[r].data();
				interests.push(interest);
			}
			console.log("interests: ", interests);
			callback(interests);
		}
	});
}

plenty_admin.REST.fields = {};

plenty_admin.REST.fields.getAllFieldsForOrganization = function(callback){
	//get fields for this organization
	
	// collect fields for this organization
	plenty_admin.REST.fields.getAllFieldsByOrganization(plenty_admin.DATA.current_organization.id, function(fields){
		plenty_admin.DATA.current_organization.fields = fields;
		if(callback && typeof callback === "function"){
			callback(fields);
		}
	});
}


plenty_admin.REST.fields.getAllFieldsByFarm = function(farmId, callback){
	//get fields related to this farm
	plenty_admin.REST.fields.allFieldsByFarm = plenty_admin.api.one("fields/getAllFieldsByFarm", farmId);
	plenty_admin.REST.fields.allFieldsByFarm.get()
		.then(
			function(fields){
				var fieldsBody = fields.body();
				var fieldsSet = [];
				for(var f in fieldsBody){
					var fieldData = fieldsBody[f]();
					fieldsSet.push(fieldData);
				}
				
				if(callback && typeof callback === "function"){
					callback(fieldsSet);
				}
			});
}

plenty_admin.REST.fields.getAllBoundariesByField = function(fieldId, callback){
	//get fields related to this farm
	plenty_admin.REST.fields.allBoundariesByField = plenty_admin.api.one("boundaries/getAllBoundariesByField", fieldId);
	plenty_admin.REST.fields.allBoundariesByField
	.get()
		.then(
			function(boundaries){
				var boundariesBody = boundaries.body();
				var boundariesSet = [];
				for(var b in boundariesBody){
					var boundariesData = boundariesBody[b]();
					boundariesSet.push(boundariesData);
				}
				
				if(callback && typeof callback === "function"){
					callback(boundariesSet);
				}
			});
}

plenty_admin.REST.fields.getAllBoundaryPointsByBoundary = function(boundaryId, callback){
	//get fields related to this farm
	plenty_admin.REST.fields.allBoundaryPointsByBoundary = plenty_admin.api.one("boundaryPoints/getAllBoundaryPointsByBoundary", boundaryId);
	plenty_admin.REST.fields.allBoundaryPointsByBoundary
	.get()
		.then(
			function(boundaryPoints){
				var boundaryPointsBody = boundaryPoints.body();
				var boundaryPointsSet = [];
				for(var b in boundaryPointsBody){
					var boundaryPointsData = boundaryPointsBody[b]();
					boundaryPointsSet.push(boundaryPointsData);
				}
				
				if(callback && typeof callback === "function"){
					callback(boundaryPointsSet);
				}
			});
}

plenty_admin.REST.fields.getAllBoundaryPointsByFieldAndBoundaryType = function(boundaryId, boundaryTypeId, callback, cropTypeId){
	//get fields related to this farm
	plenty_admin.REST.fields.allBoundaryPointsByFieldAndBoundaryType = plenty_admin.api.one("boundaryPoints/getBoundaryPointsByFieldAndBoundaryType/"+boundaryId, 1);
	plenty_admin.REST.fields.allBoundaryPointsByFieldAndBoundaryType
	.get()
		.then(
			function(boundaryPoints){
				var boundaryPointsBody = boundaryPoints.body();
				var boundaryPointsSet = [];
				for(var b in boundaryPointsBody){
					var boundaryPointsData = boundaryPointsBody[b]();
					boundaryPointsSet.push(boundaryPointsData);
				}
				
				if(callback && typeof callback === "function"){
					callback(boundaryPointsSet, boundaryId, cropTypeId);
				}
			}
		);
}

plenty_admin.REST.fields.getCLUBoundaryPointsForBoundingBox = function(boundary, callback, map){
	//get fields related to this farm
	plenty_admin.REST.fields.CLUBoundaryPointsForBoundingBox = plenty_admin.api.one("cluBoundaries/getByBoundinBox", boundary.maxLongitude+"/"+boundary.minLongitude+"/"+boundary.maxLatitude+"/"+boundary.minLatitude);
	
	plenty_admin.REST.fields.CLUBoundaryPointsForBoundingBox
	.get()
		.then(
			function(CLUboundaryPoints){
				var CLUboundaryPointsBody = CLUboundaryPoints.body();
				var CLUboundaryPointsSet = [];
				for(var b in CLUboundaryPointsBody){
					var CLUboundaryPointsData = CLUboundaryPointsBody[b]();
					CLUboundaryPointsSet.push(CLUboundaryPointsData);
				}
				
				if(callback && typeof callback === "function"){
					callback(CLUboundaryPointsSet, map);
				}
			});
}

plenty_admin.REST.fields.getEquipmentLocationForFilter = function(boundary, callback){
	//get fields related to this farm
	plenty_admin.REST.fields.EquipmentLocationForFilter = plenty_admin.api.one("equipment/getEquipmentLocationForFilter", plenty_admin.DATA.userFilters.filterDto.id+"/"+boundary.maxLongitude+"/"+boundary.minLongitude+"/"+boundary.maxLatitude+"/"+boundary.minLatitude);
	
	plenty_admin.REST.fields.EquipmentLocationForFilter
	.get()
		.then(
			function(equipment){
				var equipmentBody = equipment.body();
				var equipmentSet = [];
				for(var e in equipmentBody){
					var equipmentBodyData = equipmentBody[e]();
					equipmentSet.push(equipmentBodyData);
				}
				
				if(callback && typeof callback === "function"){
					callback(equipmentSet);
				}
			});
}

plenty_admin.REST.fields.getPlatformServicesForFilter = function(callback){
	//get fields related to this farm
	plenty_admin.REST.fields.platformServicesForFilter = plenty_admin.api.one("filters/getPlatformServicesFiltered", plenty_admin.DATA.userFilters.filterDto.id);
	
	plenty_admin.REST.fields.platformServicesForFilter
	.get()
		.then(
			function(ps){
				var psBody = ps.body();
				var psSet = [];
				for(var e in psBody){
					var psBodyData = psBody[e]();
					psSet.push(psBodyData);
				}
				
				if(callback && typeof callback === "function"){
					callback(psSet);
				}
			});
}

plenty_admin.REST.fields.getAllFieldsByOrganization = function(farmId, callback){
	//get fields related to this farm
	plenty_admin.REST.fields.allFieldsByOrganization = plenty_admin.api.one("fields/getFieldsByOrganization", farmId);
	plenty_admin.REST.fields.allFieldsByOrganization.get()
		.then(
			function(fields){
				var fieldsBody = fields.body();
				var fieldsSet = [];
				for(var f in fieldsBody){
					var fieldData = fieldsBody[f]();
					fieldsSet.push(fieldData);
				}
				
				if(callback && typeof callback === "function"){
					callback(fieldsSet);
				}
			});
}

plenty_admin.REST.fields.getFieldById = function(id, callback){
	plenty_admin.REST.fieldById = plenty_admin.api.all("fields/getField");
	plenty_admin.REST.fieldById.get(id)
	.then(
		function(fieldObj){
			console.log(" fieldById: ", fieldObj.body()());
			if(callback && typeof callback == "function"){
				callback(fieldObj.body()());
			}
		});
}

plenty_admin.REST.fields.getEquipmentImage = function(equipmentId, callback){
	plenty_admin.REST.equipmentImage = plenty_admin.api.all("equipmentFiles/getImage");
	plenty_admin.REST.equipmentImage.get(equipmentId)
	.then(
		function(equipmentImageString){
			//console.log(" equipmentImageString: ", equipmentImageString().data);
			if(callback && typeof callback == "function"){
				callback(equipmentImageString().data);
			}
		});
}

plenty_admin.REST.fields.getAllFarmServicesByFarm = function(farmId, callback){
	//get fields related to this farm
	
	plenty_admin.REST.fields.allFarmServicesByFarm.get()
		.then(
			function(services){
				var servicesBody = services.body();
				var servicesSet = [];
				for(var s in servicesBody){
					var servicesData = servicesBody[s]();
					servicesSet.push(servicesData);
				}
				//store the fields on the farm object
				plenty_admin.DATA.organizations[plenty_admin.DATA.current_organization.id].farms[plenty_admin.DATA.current_farm.id].services = servicesSet;
				if(callback && typeof callback === "function"){
					callback(servicesSet);
				}
			});
}

plenty_admin.REST.fields.getGrowthStageById = function(gsId, callback){
	//get fields related to this farm
	plenty_admin.REST.growthStageById = plenty_admin.api.all("cropStage/getGrowthStage");
	plenty_admin.REST.growthStageById.get(gsId)
		.then(
			function(gs){
				//var gsData = gs.data();
				console.log("gs", gs, gs.body()());
				if(callback && typeof callback === "function"){
					callback(gs.body()());
				}
			});
}

plenty_admin.REST.fields.insertFieldWithInterestAndBoundaryPoints = function(fieldObj, financialInterest, callback){
	//prepare the full field object
	var fullFieldObject = {};
	
	var polygonBounds = plenty_admin.MAPS.selectedPolygon.polygon.getPath();
	var boundaryPointsArray = [];
	
	// Iterate over the polygonBounds vertices.
	polygonBounds.forEach(function(xy, i) {
	  //console.log( 'Coordinate: ' + i + xy.lat() +',' + xy.lng());
		var boundaryPointObj = {};
		//boundaryPointObj.boundaryId = boundary_body.id;
		boundaryPointObj.seqNumber = i;
		boundaryPointObj.latitude = xy.lat();
		boundaryPointObj.longitude = xy.lng();
		
		//console.log("boundaryPointObj: ", boundaryPointObj);
		
		boundaryPointsArray.push(boundaryPointObj);
	});
	
	fullFieldObject.boundaryPointDtos = boundaryPointsArray;
	
	fullFieldObject.interestPCT = financialInterest;
	
	fullFieldObject.organizationId = parseInt(fieldObj.interestOrgId);
	delete fieldObj.interestOrgId;
	
	fullFieldObject.cropTypeId = parseInt(fieldObj.cropTypeId);
	delete fieldObj.cropTypeId;
	
	fullFieldObject.irrigationTypeId = parseInt(fieldObj.irrigationTypeId);
	delete fieldObj.irrigationTypeId;
	
	fullFieldObject.tillageTypeId = parseInt(fieldObj.tillageTypeId);
	delete fieldObj.tillageTypeId;
	
	if(fieldObj.cluBoundaryId){
		fullFieldObject.cluBoundaryId = parseInt(fieldObj.cluBoundaryId);
		delete fieldObj.cluBoundaryId;
	}
	
	fullFieldObject.growthMethodId = parseInt(fieldObj.growthMethodId);
	
	fullFieldObject.year = 2015;
	
	fullFieldObject.fieldDto = fieldObj;
	
	console.log("fullFieldObject", fullFieldObject);
	
	plenty_admin.REST.insertField.post(fullFieldObject)
	.then(
		function(field){
			var field_body = field.body();
			switch(plenty_admin.state){
				case "settings":
					plenty_admin.DATA.data_source.fieldsAndCropTypes.push({field:field_body});
					plenty_admin.UI.updateBadges("fields", plenty_admin.DATA.data_source.fieldsAndCropTypes.length);
					
					var $fieldHTML = $(plenty_admin.UI.create_item(field_body, "fieldsAndCropTypes"));
					
					plenty_admin.UI.organization.DOM
					.find("table.fieldsList")
					.find(".noItemsText")
					.remove()
					.end()
					.append($fieldHTML);
					
					plenty_admin.UI.organization.addItemFunctionality($fieldHTML);
				break;
				
				case "map":
					//add the new field to the filter DTO before updating
					plenty_admin.DATA.userFilters.filterDto.fieldIds.push(field_body.id);
					//updatye the map
					plenty_admin.DATA.update_filters(function(returned_filters){
						//console.log("filters updated: ", returned_filters, returned_filters.body());
						plenty_admin.DATA.userFilters = returned_filters.body();
					}, null, false);
				break;
				
				//create dummy weather observations for new field
				plenty_admin.REST.createDummyObservationsForField = plenty_admin.api.one("weatherObservations/createDummyObservationsForField", field_body.id);
				plenty_admin.REST.createDummyObservationsForField.put()
				.then(
					function(weatherObservationData){
						console.log("weatherObservationData: ", weatherObservationData);
					}
				)
			}
			
			if(callback && typeof callback === "function"){
				callback(field_body);
			}
		}
	)
}

plenty_admin.REST.fields.insertFieldCrop = function(fieldCropObj, callback){
	plenty_admin.REST.insertFieldCrop.post(fieldCropObj)
	.then(
		function(fieldCrop){
			var fieldCrop_body = fieldCrop.body();
			if(callback && typeof callback === "function"){
				callback(fieldCrop_body);
			}
		}
	)
}

plenty_admin.REST.fields.updateFieldCrop = function(fieldCropObj, callback){
	plenty_admin.REST.updateFieldCrop.put(fieldCropObj)
	.then(
		function(fieldCrop){
			var fieldCrop_body = fieldCrop.body();
			if(callback && typeof callback === "function"){
				callback(fieldCrop_body);
			}
		}
	)
}

plenty_admin.REST.plans = {};
plenty_admin.REST.plans.createTemplatePlan = function(TemplatePlanCreationDto, callback){
	plenty_admin.REST.createTemplatePlan.post(TemplatePlanCreationDto)
	.then(
		function(templatePlan){
			var templatePlan_body = templatePlan.body();
			console.log("adding templatePlan success: ", templatePlan_body);
			if(callback && typeof callback === "function"){
				callback(templatePlan_body);
			}
		}
	)
}

plenty_admin.REST.costForTemplateTask = plenty_admin.api.all("templateTasks/getCostForTemplateTask");
plenty_admin.REST.plans.getCostForTemplateTask = function(templateTask, el, callback){
	plenty_admin.REST.costForTemplateTask.post(templateTask)
	.then(
		function(templateTaskCost){
			var templateTaskCost_body = templateTaskCost.body();
			console.log("getting templateTask cost success: ", templateTaskCost_body);
			if(callback && typeof callback === "function"){
				callback(templateTaskCost_body, el);
			}
		}
	)
}

// call to REST api for health status
plenty_admin.REST.getStatus = function(){
	$.ajax({
	  url: "http://52.5.118.250:8080/plenty-manage/health",
	  context: document.body
	}).success(function(health) {
		plenty_admin.UI.setRESTStatus(health.status);
	}).error(function(err){
		plenty_admin.UI.setRESTStatus("DOWN");
		if($(".modal.bootbox.healthcheck.in").length == 0){
			bootbox.dialog({
				message: "Rest Server is down right now, please try later - "+err.status+" - "+err.statusText,
				className: "danger healthcheck",
				buttons: {
					
				},
				callback:plenty_admin.HELPER.hideLoadingOverlay
			});	
		}
	});
};

//get initial health status
plenty_admin.REST.getStatus();

//check the status of the REST API every 10 seconds
plenty_admin.REST.checkStatus = setInterval(function(){
	plenty_admin.REST.getStatus();
}, 100000);

//set visual status in UI
plenty_admin.UI.setRESTStatus = function(status){
	var $restStatus = $("footer .restStatus");
	$restStatus.removeClass("alert-success alert-warn alert-danger");
	switch(status){
		case "UP":
			$restStatus
			.addClass("alert-success");
		break;
		
		case "DOWN":
			$restStatus
			.addClass("alert-danger");
		break;
	}
	
	$restStatus
	.find(".status")
	.text(status);
};

plenty_admin.UI.updateBadges = function(hash, value){
	plenty_admin.UI.sideBar.DOM.find("#collapse_"+plenty_admin.DATA.current_organization.id+" li.list-group-item."+hash+" span.badge").text(value);
	plenty_admin.UI.settings.DOM.find(".organization[data-orgid='"+plenty_admin.DATA.current_organization.id+"'] panel .orgAssets ."+hash+" span.count").text(value);
}

plenty_admin.UI.populate_type_lists = function(parent, idPrefix, data_types){
	//set up type lists
	//populate the data type fields
	//var data_types = ["crop", "irrigation", "tillage"];
	
	for(var d=0; d<data_types.length; d++){
		//set up the list of crop types
		if(plenty_admin.DATA[data_types[d]+"Types"]){
			var optionsHTML = "";
		
			for(id in plenty_admin.DATA[data_types[d]+"Types"]){
				console.log("data type", plenty_admin.DATA[data_types[d]+"Types"], id, plenty_admin.DATA[data_types[d]+"Types"][id]);
				if(plenty_admin.DATA[data_types[d]+"Types"].hasOwnProperty(id)){
					var el = plenty_admin.DATA[data_types[d]+"Types"][id];
					optionsHTML += "<option value='"+id+"'>"+el.name+"</option>";
				}
			}
		}
		
		var $elList = parent.find("#"+idPrefix+"_"+data_types[d]+"_type");
		console.log("$elList", $elList);
		$elList.append(optionsHTML);
	}
}

//method to return the inline editing options for a select field
//pass an array of values (years), or of id / name key val pairs
plenty_admin.UI.get_inline_editing_options = function(optionSet){
	var optionsString = "[";
	if(Array.isArray(optionSet)){
		for(var o=0; o<optionSet.length; o++){
			var option = optionSet[o];
			if(typeof option == "object"){
				optionsString += "{value:\""+option.id+"\", text: \""+option.name+"\"},";
			}else{
				optionsString += "{value:\""+option+"\", text: \""+option+"\"},";
			}
		}
	}else if(typeof optionSet === "object"){
		for(id in optionSet){
			if(optionSet.hasOwnProperty(id)){
				optionsString += "{value:\""+id+"\", text: \""+optionSet[id].name+"\"},";
			}
		}
	}
	optionsString += "]";
	
	return optionsString;
}

plenty_admin.UI.build_breadcrumb_trail = function(path){
	var $breadcrumbs = $("<h3 class='breadcrumb-trail mtn'><ol class='breadcrumb mbn'></ol></h3>");
	for(var p=0; p<path.length; p++){
		var pathItem = path[p];
		var $breadcrumb_item = $("<li class='"+pathItem.class+"'>"+
			(pathItem.class != "active" && pathItem.clickHandler ? "<a href=''><span class='glyphicon glyphicon-chevron-left'></span>"+pathItem.name+"</a>" : pathItem.name)+
		"</li>");
		
		if(pathItem.clickHandler){
			$breadcrumb_item
			.click(pathItem.clickHandler);
		}
		
		$breadcrumbs
		.find("ol")
		.append($breadcrumb_item);
	}
	
	return $breadcrumbs;
}

/* ********* Define helper methods used across application ************ */
plenty_admin.HELPER = {};
//pull params from the URL query string
plenty_admin.HELPER.getParameterByName = function(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
plenty_admin.HELPER.capitalizeFirstLetter = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
plenty_admin.HELPER.get_singular_selected_hash = function(){
	var url = plenty_admin.UI.organization.tabs.DOM.find(".nav.nav-tabs li[role='presentation'].active a[role='tab']").prop("href");
	var hashSingular = url.substring(url.indexOf('#')+1, url.lastIndexOf("s"));
	return hashSingular;
}
plenty_admin.HELPER.formatJavaDate = function(unix_timestamp){
	var a = new Date(unix_timestamp);
	var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	var year = a.getUTCFullYear();
	var month = months[a.getUTCMonth()];
	var monthIndex = a.getUTCMonth()+1;
	var date = a.getUTCDate();
	var hour = (a.getUTCHours() < 10 ? "0"+a.getUTCHours()-1 : a.getUTCHours()-1);
	var min = (a.getUTCMinutes() < 10 ? "0"+a.getUTCMinutes() : a.getUTCMinutes());
	var sec = (a.getUTCSeconds() < 10 ? "0"+a.getUTCSeconds() : a.getUTCSeconds());
	var _date = (month ? month.slice(0,4) : month) + ' ' + date;
	var fullDate = _date + ", " + year;
	var USDate = monthIndex+"/"+date+"/"+year;
	var time = hour + ':' + min + ':' + sec;
	var date_time = _date + ' ' +  time;
	return {
			date_time: time, 
			date: _date,
			time: time,
			month: month,
			obj: a,
			fullDate: fullDate,
			year:year,
			USDate: USDate
		};
}
plenty_admin.HELPER.daysFromHours = function(hours){
	if(hours < 24){
		return hours+"hrs";
	}else{
		var days = Math.floor(hours/24);
		var leftOver = Math.round((hours/24) - days);
		return days+"days, "+leftOver+"hrs";
	}
}

plenty_admin.HELPER.treatAsUTC = function(date) {
	if(typeof date === "object"){
		var result = date;
	}else{
		var result = new Date(date);
	}
    
    result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
    return result;
}
plenty_admin.HELPER.capitalizeFirstLetter = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
plenty_admin.HELPER.daydiff = function(startDate, endDate) {
    var millisecondsPerDay = 24 * 60 * 60 * 1000;
	var daydiff = (endDate - startDate) / millisecondsPerDay;
    return daydiff;
}
plenty_admin.HELPER.hideLoadingOverlay = function(){
	plenty_admin.UI.loadingOverlay
	.find(".loadingInfo")
	.fadeOut("fast", function(){
		plenty_admin.UI.loadingOverlay
		.find(".doneInfo")
		.fadeIn("fast", function(){
			var to = setTimeout(function(){
				plenty_admin.UI.loadingOverlay
				.fadeOut("fast", function(){
					plenty_admin.UI.loadingOverlay
					.find(".loadingInfo")
					.show()
					.end()
					.find(".doneInfo")
					.hide();
				});
				
				$("body")
				.removeClass("loading")
				.find(".page-container")
				.removeClass("blur");
			}, 800);
		});
	});
}
plenty_admin.HELPER.showLoadingOverlay = function(verb, noun){
	$("body")
	.addClass("loading")
	.find(".page-container")
	.addClass("blur");
	
	plenty_admin.UI.loadingOverlay
	.find(".verb")
	.text(verb ? verb : "Loading")
	.end()
	.find(".noun")
	.text(noun ? " "+noun : "")
	.end()
	.fadeIn("fast");
}
plenty_admin.HELPER.returnInlineEditSelectOptions = function(field){
	if(field === "timezone"){
		optionsJSON = plenty_admin.DATA.timezones;
	}
	var inlineEditSelectOptions = "data-source='";
	inlineEditSelectOptions += JSON.stringify(optionsJSON);
	inlineEditSelectOptions+= "'";
	return inlineEditSelectOptions;
}

plenty_admin.HELPER.dynamicSort = function(property) {
	var sortOrder = 1;
	if(property[0] === "-") {
		sortOrder = -1;
		property = property.substr(1);
	}
	return function (a,b) {
		var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
		return result * sortOrder;
	}
}

plenty_admin.HELPER.validateForm = function($form){
	//$form is the container of form elements to be checked
	var $errorAlerts = $form.find(".alert.help-block");
	
	//reset all validation
	$errorAlerts.hide();
	
	$form
	.find(".has-error")
	.removeClass("has-error");
	
	var valid = true;
	var invalidFields = [];
	$form.find("input, select")
	.filter(":visible")
	.each(function(){
		//console.log("field", this);
		if($(this).prop("required")){
			//console.log("field is required", this, this.tagName);
			var val = null;
			switch(this.tagName.toLowerCase()){
				case "input":
					val = $(this).val();
				break;
				
				case "select":
					val = $(this).find("option:selected").val();
				break;
			}
			//console.log("val = ", val === null, val.length);
			if(val.length <= 0 || val === null){
				$(this).parent()
				.addClass("has-error");
				
				invalidFields.push($(this));
				
				valid = false;
			}
		}
	});
	
	if(valid){
		return true;
	}else{
		for(var i=0; i<invalidFields.length; i++){
			var invalidField = invalidFields[i];
			invalidField
			.parent()
			.find(".alert.help-block")
			.slideDown("fast");
		}
	}
}

plenty_admin.HELPER.returnFieldType = function(field){
	switch(field){
		case "mobileNumber":
			return "number";
		break;
		
		case "email":
			return "email";
		break;
		
		case "timezone":
			return "select";
		break;
		
		default:
			return "text";
	}
}


plenty_admin.HELPER.initFloatingHeaders = function(table, headerClass, tableID) {
	var $table = $(table);
	var tableParent = $table.parent();
	var wrapper = $('<div class="floating-header"/>');
	var clone = $table.clone(true, true);
	var thead = $table.find(headerClass+":eq(0)");
	var scrollContainer = $(tableID);
	var headerIndex = 0;
	var lastScrollTop = 0;
	var headerRows = $table.find(headerClass);
	var tableWrapperOffset = tableParent.offset().top;
	var nextHeader, nextHeaderOffset, prevHeader, prevHeaderOffset, tableBounds;
	
	$(window).on("resize", function(){
		tableWrapperOffset = tableParent.offset().top;
		//console.log("tableWrapperOffset", tableWrapperOffset);
		
		wrapper.css({
			width:thead.outerWidth(),
			height:thead.outerHeight()
		});
		
		floatingHeaderTable.css({top:-$(headerRows.get(headerIndex)).position().top});
		
		if (tableBounds.bottom <= wrapper[0].offsetHeight) {
			wrapper.css({
				position:"absolute",
				top:  ($table[0].offsetHeight + $table[0].offsetTop - wrapper[0].offsetHeight) +'px' 
			});
		} else {
			wrapper.css({
				position:"fixed",
				top:  tableWrapperOffset,
				"z-index":1 
			});
		}
	});
	
	//console.log("tables", table, tableParent);
	
	wrapper.append(clone);
	tableParent.prepend(wrapper);
	
	var floatingHeaderTable = wrapper.find("table");
	
	wrapper.css({
		width:thead.outerWidth(),
		height:thead.outerHeight(),
		display:"none",
		overflow:"hidden"
	});
  
	scrollContainer.on("scroll", function() {
		var headers = document.querySelectorAll('div.floating-header');
		var bodyHeight = document.body.offsetHeight;
		var i = headers.length;
		var st = $(this).scrollTop();
		
		if (st > lastScrollTop){
			// upscroll code
			nextHeader = $(headerRows.get(headerIndex+1));
			nextHeaderOffset = nextHeader.offset().top -tableWrapperOffset;
			if(nextHeaderOffset <= 0){
				//switch to this header
				//console.log("switch header: ", nextHeader.position().top, floatingHeaderTable);
				floatingHeaderTable.css({top:-nextHeader.position().top});
				headerIndex += 1;
				headerIndex > headerRows.length -1 ? headerIndex = headerRows.length -1 : null;
			}
		} else {
			// downscroll code
			//console.log("going DOWN");
			prevHeader = $(headerRows.get(headerIndex));
			prevHeaderOffset = prevHeader.offset().top -tableWrapperOffset;
			if( headerIndex > 0 && prevHeaderOffset >= 0 ){
				floatingHeaderTable.css({top:-$(headerRows.get(headerIndex-1)).position().top});
				headerIndex -= 1;
				headerIndex < 0 ? headerIndex = 0 : null;
			}
		}
		
		lastScrollTop = st;
		tableBounds = $table[0].getBoundingClientRect();
		
		if ((tableBounds.top -tableWrapperOffset) <= 0 && tableBounds.bottom > 0) {
			wrapper.show();
			if (tableBounds.bottom <= wrapper[0].offsetHeight) {
				wrapper.css({
					position:"absolute",
					top:  ($table[0].offsetHeight + $table[0].offsetTop - wrapper[0].offsetHeight) +'px' 
				});
			} else {
				wrapper.css({
					position:"fixed",
					top:  tableWrapperOffset,
					"z-index":1 
				});
			}
		} else {
			wrapper.hide();
		}
	});
}

plenty_admin.HELPER.colorLuminance = function(hex, lum) {

	// validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

	return rgb;
}

plenty_admin.HELPER.hexToRgb = function(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

//wrapper function for testing a specific, hard coded REST call
plenty_admin.HELPER.testAPICall = function(call, id){
	plenty_admin.REST.getField = plenty_admin.api.all(call);
	plenty_admin.REST.getField.get(id)
	.then(
		function(returnData){
			console.log(call+" GOT", returnData);
		});
}



//extend the line chart object to skip labels but keep the tooltip values
Chart.types.Line.extend({
	name: "LineAlt",
	initialize: function (data) {
		Chart.types.Line.prototype.initialize.apply(this, arguments);
		console.log("Init LineAlt: ", this, arguments);
		var xLabels = this.scale.xLabels
		//set the day label increment
		var label_step = 1;
		if(xLabels.length > 31 && xLabels.length < 125){
			label_step = 3
		}else if(xLabels.length > 125 && xLabels.length < 500){
			label_step = 7
		}else if(xLabels.length > 500 && xLabels.length < 1000){
			label_step = 14
		}else if(xLabels.length > 1000){
			label_step = 20
		}
		
		xLabels.forEach(function (label, i) {
			if (i % label_step > 0)
				xLabels[i] = '';
		});
	}
});



/* ********* Store console logs to append to an error report ************ */
//For todays date;
Date.prototype.today = function(){
    return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear()
};
//For the time now
Date.prototype.timeNow = function(){
     return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
};

(function(){var d=null;function e(a){return function(b){this[a]=b}}function h(a){return function(){return this[a]}}var j;
function k(a,b,c){this.extend(k,google.maps.OverlayView);this.c=a;this.a=[];this.f=[];this.ca=[53,56,66,78,90];this.j=[];this.A=!1;c=c||{};this.g=c.gridSize||60;this.l=c.minimumClusterSize||2;this.J=c.maxZoom||d;this.j=c.styles||[];this.X=c.imagePath||this.Q;this.W=c.imageExtension||this.P;this.O=!0;if(c.zoomOnClick!=void 0)this.O=c.zoomOnClick;this.r=!1;if(c.averageCenter!=void 0)this.r=c.averageCenter;l(this);this.setMap(a);this.K=this.c.getZoom();var f=this;google.maps.event.addListener(this.c,
"zoom_changed",function(){var a=f.c.getZoom();if(f.K!=a)f.K=a,f.m()});google.maps.event.addListener(this.c,"idle",function(){f.i()});b&&b.length&&this.C(b,!1)}j=k.prototype;j.Q="http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclusterer/images/m";j.P="png";j.extend=function(a,b){return function(a){for(var b in a.prototype)this.prototype[b]=a.prototype[b];return this}.apply(a,[b])};j.onAdd=function(){if(!this.A)this.A=!0,n(this)};j.draw=function(){};
function l(a){if(!a.j.length)for(var b=0,c;c=a.ca[b];b++)a.j.push({url:a.X+(b+1)+"."+a.W,height:c,width:c})}j.S=function(){for(var a=this.o(),b=new google.maps.LatLngBounds,c=0,f;f=a[c];c++)b.extend(f.getPosition());this.c.fitBounds(b)};j.z=h("j");j.o=h("a");j.V=function(){return this.a.length};j.ba=e("J");j.I=h("J");j.G=function(a,b){for(var c=0,f=a.length,g=f;g!==0;)g=parseInt(g/10,10),c++;c=Math.min(c,b);return{text:f,index:c}};j.$=e("G");j.H=h("G");
j.C=function(a,b){for(var c=0,f;f=a[c];c++)q(this,f);b||this.i()};function q(a,b){b.s=!1;b.draggable&&google.maps.event.addListener(b,"dragend",function(){b.s=!1;a.L()});a.a.push(b)}j.q=function(a,b){q(this,a);b||this.i()};function r(a,b){var c=-1;if(a.a.indexOf)c=a.a.indexOf(b);else for(var f=0,g;g=a.a[f];f++)if(g==b){c=f;break}if(c==-1)return!1;b.setMap(d);a.a.splice(c,1);return!0}j.Y=function(a,b){var c=r(this,a);return!b&&c?(this.m(),this.i(),!0):!1};
j.Z=function(a,b){for(var c=!1,f=0,g;g=a[f];f++)g=r(this,g),c=c||g;if(!b&&c)return this.m(),this.i(),!0};j.U=function(){return this.f.length};j.getMap=h("c");j.setMap=e("c");j.w=h("g");j.aa=e("g");
j.v=function(a){var b=this.getProjection(),c=new google.maps.LatLng(a.getNorthEast().lat(),a.getNorthEast().lng()),f=new google.maps.LatLng(a.getSouthWest().lat(),a.getSouthWest().lng()),c=b.fromLatLngToDivPixel(c);c.x+=this.g;c.y-=this.g;f=b.fromLatLngToDivPixel(f);f.x-=this.g;f.y+=this.g;c=b.fromDivPixelToLatLng(c);b=b.fromDivPixelToLatLng(f);a.extend(c);a.extend(b);return a};j.R=function(){this.m(!0);this.a=[]};
j.m=function(a){for(var b=0,c;c=this.f[b];b++)c.remove();for(b=0;c=this.a[b];b++)c.s=!1,a&&c.setMap(d);this.f=[]};j.L=function(){var a=this.f.slice();this.f.length=0;this.m();this.i();window.setTimeout(function(){for(var b=0,c;c=a[b];b++)c.remove()},0)};j.i=function(){n(this)};
function n(a){if(a.A)for(var b=a.v(new google.maps.LatLngBounds(a.c.getBounds().getSouthWest(),a.c.getBounds().getNorthEast())),c=0,f;f=a.a[c];c++)if(!f.s&&b.contains(f.getPosition())){for(var g=a,u=4E4,o=d,v=0,m=void 0;m=g.f[v];v++){var i=m.getCenter();if(i){var p=f.getPosition();if(!i||!p)i=0;else var w=(p.lat()-i.lat())*Math.PI/180,x=(p.lng()-i.lng())*Math.PI/180,i=Math.sin(w/2)*Math.sin(w/2)+Math.cos(i.lat()*Math.PI/180)*Math.cos(p.lat()*Math.PI/180)*Math.sin(x/2)*Math.sin(x/2),i=6371*2*Math.atan2(Math.sqrt(i),
Math.sqrt(1-i));i<u&&(u=i,o=m)}}o&&o.F.contains(f.getPosition())?o.q(f):(m=new s(g),m.q(f),g.f.push(m))}}function s(a){this.k=a;this.c=a.getMap();this.g=a.w();this.l=a.l;this.r=a.r;this.d=d;this.a=[];this.F=d;this.n=new t(this,a.z(),a.w())}j=s.prototype;
j.q=function(a){var b;a:if(this.a.indexOf)b=this.a.indexOf(a)!=-1;else{b=0;for(var c;c=this.a[b];b++)if(c==a){b=!0;break a}b=!1}if(b)return!1;if(this.d){if(this.r)c=this.a.length+1,b=(this.d.lat()*(c-1)+a.getPosition().lat())/c,c=(this.d.lng()*(c-1)+a.getPosition().lng())/c,this.d=new google.maps.LatLng(b,c),y(this)}else this.d=a.getPosition(),y(this);a.s=!0;this.a.push(a);b=this.a.length;b<this.l&&a.getMap()!=this.c&&a.setMap(this.c);if(b==this.l)for(c=0;c<b;c++)this.a[c].setMap(d);b>=this.l&&a.setMap(d);
a=this.c.getZoom();if((b=this.k.I())&&a>b)for(a=0;b=this.a[a];a++)b.setMap(this.c);else if(this.a.length<this.l)z(this.n);else{b=this.k.H()(this.a,this.k.z().length);this.n.setCenter(this.d);a=this.n;a.B=b;a.ga=b.text;a.ea=b.index;if(a.b)a.b.innerHTML=b.text;b=Math.max(0,a.B.index-1);b=Math.min(a.j.length-1,b);b=a.j[b];a.da=b.url;a.h=b.height;a.p=b.width;a.M=b.textColor;a.e=b.anchor;a.N=b.textSize;a.D=b.backgroundPosition;this.n.show()}return!0};
j.getBounds=function(){for(var a=new google.maps.LatLngBounds(this.d,this.d),b=this.o(),c=0,f;f=b[c];c++)a.extend(f.getPosition());return a};j.remove=function(){this.n.remove();this.a.length=0;delete this.a};j.T=function(){return this.a.length};j.o=h("a");j.getCenter=h("d");function y(a){a.F=a.k.v(new google.maps.LatLngBounds(a.d,a.d))}j.getMap=h("c");
function t(a,b,c){a.k.extend(t,google.maps.OverlayView);this.j=b;this.fa=c||0;this.u=a;this.d=d;this.c=a.getMap();this.B=this.b=d;this.t=!1;this.setMap(this.c)}j=t.prototype;
j.onAdd=function(){this.b=document.createElement("DIV");if(this.t)this.b.style.cssText=A(this,B(this,this.d)),this.b.innerHTML=this.B.text;this.getPanes().overlayMouseTarget.appendChild(this.b);var a=this;google.maps.event.addDomListener(this.b,"click",function(){var b=a.u.k;google.maps.event.trigger(b,"clusterclick",a.u);b.O&&a.c.fitBounds(a.u.getBounds())})};function B(a,b){var c=a.getProjection().fromLatLngToDivPixel(b);c.x-=parseInt(a.p/2,10);c.y-=parseInt(a.h/2,10);return c}
j.draw=function(){if(this.t){var a=B(this,this.d);this.b.style.top=a.y+"px";this.b.style.left=a.x+"px"}};function z(a){if(a.b)a.b.style.display="none";a.t=!1}j.show=function(){if(this.b)this.b.style.cssText=A(this,B(this,this.d)),this.b.style.display="";this.t=!0};j.remove=function(){this.setMap(d)};j.onRemove=function(){if(this.b&&this.b.parentNode)z(this),this.b.parentNode.removeChild(this.b),this.b=d};j.setCenter=e("d");
function A(a,b){var c=[];c.push("background-image:url("+a.da+");");c.push("background-position:"+(a.D?a.D:"0 0")+";");typeof a.e==="object"?(typeof a.e[0]==="number"&&a.e[0]>0&&a.e[0]<a.h?c.push("height:"+(a.h-a.e[0])+"px; padding-top:"+a.e[0]+"px;"):c.push("height:"+a.h+"px; line-height:"+a.h+"px;"),typeof a.e[1]==="number"&&a.e[1]>0&&a.e[1]<a.p?c.push("width:"+(a.p-a.e[1])+"px; padding-left:"+a.e[1]+"px;"):c.push("width:"+a.p+"px; text-align:center;")):c.push("height:"+a.h+"px; line-height:"+a.h+
"px; width:"+a.p+"px; text-align:center;");c.push("cursor:pointer; top:"+b.y+"px; left:"+b.x+"px; color:"+(a.M?a.M:"black")+"; position:absolute; font-size:"+(a.N?a.N:11)+"px; font-family:Arial,sans-serif; font-weight:bold");return c.join("")}window.MarkerClusterer=k;k.prototype.addMarker=k.prototype.q;k.prototype.addMarkers=k.prototype.C;k.prototype.clearMarkers=k.prototype.R;k.prototype.fitMapToMarkers=k.prototype.S;k.prototype.getCalculator=k.prototype.H;k.prototype.getGridSize=k.prototype.w;
k.prototype.getExtendedBounds=k.prototype.v;k.prototype.getMap=k.prototype.getMap;k.prototype.getMarkers=k.prototype.o;k.prototype.getMaxZoom=k.prototype.I;k.prototype.getStyles=k.prototype.z;k.prototype.getTotalClusters=k.prototype.U;k.prototype.getTotalMarkers=k.prototype.V;k.prototype.redraw=k.prototype.i;k.prototype.removeMarker=k.prototype.Y;k.prototype.removeMarkers=k.prototype.Z;k.prototype.resetViewport=k.prototype.m;k.prototype.repaint=k.prototype.L;k.prototype.setCalculator=k.prototype.$;
k.prototype.setGridSize=k.prototype.aa;k.prototype.setMaxZoom=k.prototype.ba;k.prototype.onAdd=k.prototype.onAdd;k.prototype.draw=k.prototype.draw;s.prototype.getCenter=s.prototype.getCenter;s.prototype.getSize=s.prototype.T;s.prototype.getMarkers=s.prototype.o;t.prototype.onAdd=t.prototype.onAdd;t.prototype.draw=t.prototype.draw;t.prototype.onRemove=t.prototype.onRemove;
})();
(function($) {
	function isDOMAttrModifiedSupported() {
		var p = document.createElement('p');
		var flag = false;

		if (p.addEventListener) {
			p.addEventListener('DOMAttrModified', function() {
				flag = true
			}, false);
		} else if (p.attachEvent) {
			p.attachEvent('onDOMAttrModified', function() {
				flag = true
			});
		} else { return false; }
		p.setAttribute('id', 'target');
		return flag;
	}

	function checkAttributes(chkAttr, e) {
		if (chkAttr) {
			var attributes = this.data('attr-old-value');

			if (e.attributeName.indexOf('style') >= 0) {
				if (!attributes['style'])
					attributes['style'] = {}; //initialize
				var keys = e.attributeName.split('.');
				e.attributeName = keys[0];
				e.oldValue = attributes['style'][keys[1]]; //old value
				e.newValue = keys[1] + ':'
						+ this.prop("style")[$.camelCase(keys[1])]; //new value
				attributes['style'][keys[1]] = e.newValue;
			} else {
				e.oldValue = attributes[e.attributeName];
				e.newValue = this.attr(e.attributeName);
				attributes[e.attributeName] = e.newValue;
			}

			this.data('attr-old-value', attributes); //update the old value object
		}
	}

	//initialize Mutation Observer
	var MutationObserver = window.MutationObserver
			|| window.WebKitMutationObserver;

	$.fn.attrchange = function(a, b) {
		if (typeof a == 'object') {//core
			var cfg = {
				trackValues : false,
				callback : $.noop
			};
			//backward compatibility
			if (typeof a === "function") { cfg.callback = a; } else { $.extend(cfg, a); }

			if (cfg.trackValues) { //get attributes old value
				this.each(function(i, el) {
					var attributes = {};
					for ( var attr, i = 0, attrs = el.attributes, l = attrs.length; i < l; i++) {
						attr = attrs.item(i);
						attributes[attr.nodeName] = attr.value;
					}
					$(this).data('attr-old-value', attributes);
				});
			}

			if (MutationObserver) { //Modern Browsers supporting MutationObserver
				var mOptions = {
					subtree : false,
					attributes : true,
					attributeOldValue : cfg.trackValues
				};
				var observer = new MutationObserver(function(mutations) {
					mutations.forEach(function(e) {
						var _this = e.target;
						//get new value if trackValues is true
						if (cfg.trackValues) {							
							e.newValue = $(_this).attr(e.attributeName);
						}						
						if ($(_this).data('attrchange-status') === 'connected') { //execute if connected
							cfg.callback.call(_this, e);
						}
					});
				});

				return this.data('attrchange-method', 'Mutation Observer').data('attrchange-status', 'connected')
						.data('attrchange-obs', observer).each(function() {
							observer.observe(this, mOptions);
						});
			} else if (isDOMAttrModifiedSupported()) { //Opera
				//Good old Mutation Events
				return this.data('attrchange-method', 'DOMAttrModified').data('attrchange-status', 'connected').on('DOMAttrModified', function(event) {
					if (event.originalEvent) { event = event.originalEvent; }//jQuery normalization is not required 
					event.attributeName = event.attrName; //property names to be consistent with MutationObserver
					event.oldValue = event.prevValue; //property names to be consistent with MutationObserver
					if ($(this).data('attrchange-status') === 'connected') { //disconnected logically
						cfg.callback.call(this, event);
					}
				});
			} else if ('onpropertychange' in document.body) { //works only in IE		
				return this.data('attrchange-method', 'propertychange').data('attrchange-status', 'connected').on('propertychange', function(e) {
					e.attributeName = window.event.propertyName;
					//to set the attr old value
					checkAttributes.call($(this), cfg.trackValues, e);
					if ($(this).data('attrchange-status') === 'connected') { //disconnected logically
						cfg.callback.call(this, e);
					}
				});
			}
			return this;
		} else if (typeof a == 'string' && $.fn.attrchange.hasOwnProperty('extensions') &&
				$.fn.attrchange['extensions'].hasOwnProperty(a)) { //extensions/options
			return $.fn.attrchange['extensions'][a].call(this, b);
		}
	}
})(jQuery);
//configure inline editing plugin
$.fn.editable.defaults.mode = 'popup';
// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @externs_url http://closure-compiler.googlecode.com/svn/trunk/contrib/externs/maps/google_maps_api_v3.js
// @output_wrapper (function() {%output%})();
// ==/ClosureCompiler==

/**
 * @license
 * Copyright 2013 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * A RichMarker that allows any HTML/DOM to be added to a map and be draggable.
 *
 * @param {Object.<string, *>=} opt_options Optional properties to set.
 * @extends {google.maps.OverlayView}
 * @constructor
 */
function RichMarker(opt_options) {
  var options = opt_options || {};

  /**
   * @type {boolean}
   * @private
   */
  this.ready_ = false;

  /**
   * @type {boolean}
   * @private
   */
  this.dragging_ = false;

  if (opt_options['visible'] == undefined) {
    opt_options['visible'] = true;
  }

  if (opt_options['shadow'] == undefined) {
    opt_options['shadow'] = '7px -3px 5px rgba(88,88,88,0.7)';
  }

  if (opt_options['anchor'] == undefined) {
    opt_options['anchor'] = RichMarkerPosition['BOTTOM'];
  }

  this.setValues(options);
}
RichMarker.prototype = new google.maps.OverlayView();
window['RichMarker'] = RichMarker;


/**
 * Returns the current visibility state of the marker.
 *
 * @return {boolean} The visiblity of the marker.
 */
RichMarker.prototype.getVisible = function() {
  return /** @type {boolean} */ (this.get('visible'));
};
RichMarker.prototype['getVisible'] = RichMarker.prototype.getVisible;


/**
 * Sets the visiblility state of the marker.
 *
 * @param {boolean} visible The visiblilty of the marker.
 */
RichMarker.prototype.setVisible = function(visible) {
  this.set('visible', visible);
};
RichMarker.prototype['setVisible'] = RichMarker.prototype.setVisible;


/**
 *  The visible changed event.
 */
RichMarker.prototype.visible_changed = function() {
  if (this.ready_) {
    this.markerWrapper_.style['display'] = this.getVisible() ? '' : 'none';
    this.draw();
  }
};
RichMarker.prototype['visible_changed'] = RichMarker.prototype.visible_changed;


/**
 * Sets the marker to be flat.
 *
 * @param {boolean} flat If the marker is to be flat or not.
 */
RichMarker.prototype.setFlat = function(flat) {
  this.set('flat', !!flat);
};
RichMarker.prototype['setFlat'] = RichMarker.prototype.setFlat;


/**
 * If the makrer is flat or not.
 *
 * @return {boolean} True the marker is flat.
 */
RichMarker.prototype.getFlat = function() {
  return /** @type {boolean} */ (this.get('flat'));
};
RichMarker.prototype['getFlat'] = RichMarker.prototype.getFlat;


/**
 * Get the width of the marker.
 *
 * @return {Number} The width of the marker.
 */
RichMarker.prototype.getWidth = function() {
  return /** @type {Number} */ (this.get('width'));
};
RichMarker.prototype['getWidth'] = RichMarker.prototype.getWidth;


/**
 * Get the height of the marker.
 *
 * @return {Number} The height of the marker.
 */
RichMarker.prototype.getHeight = function() {
  return /** @type {Number} */ (this.get('height'));
};
RichMarker.prototype['getHeight'] = RichMarker.prototype.getHeight;


/**
 * Sets the marker's box shadow.
 *
 * @param {string} shadow The box shadow to set.
 */
RichMarker.prototype.setShadow = function(shadow) {
  this.set('shadow', shadow);
  this.flat_changed();
};
RichMarker.prototype['setShadow'] = RichMarker.prototype.setShadow;


/**
 * Gets the marker's box shadow.
 *
 * @return {string} The box shadow.
 */
RichMarker.prototype.getShadow = function() {
  return /** @type {string} */ (this.get('shadow'));
};
RichMarker.prototype['getShadow'] = RichMarker.prototype.getShadow;


/**
 * Flat changed event.
 */
RichMarker.prototype.flat_changed = function() {
  if (!this.ready_) {
    return;
  }

  this.markerWrapper_.style['boxShadow'] =
      this.markerWrapper_.style['webkitBoxShadow'] =
      this.markerWrapper_.style['MozBoxShadow'] =
      this.getFlat() ? '' : this.getShadow();
};
RichMarker.prototype['flat_changed'] = RichMarker.prototype.flat_changed;


/**
 * Sets the zIndex of the marker.
 *
 * @param {Number} index The index to set.
 */
RichMarker.prototype.setZIndex = function(index) {
  this.set('zIndex', index);
};
RichMarker.prototype['setZIndex'] = RichMarker.prototype.setZIndex;


/**
 * Gets the zIndex of the marker.
 *
 * @return {Number} The zIndex of the marker.
 */
RichMarker.prototype.getZIndex = function() {
  return /** @type {Number} */ (this.get('zIndex'));
};
RichMarker.prototype['getZIndex'] = RichMarker.prototype.getZIndex;


/**
 * zIndex changed event.
 */
RichMarker.prototype.zIndex_changed = function() {
  if (this.getZIndex() && this.ready_) {
    this.markerWrapper_.style.zIndex = this.getZIndex();
  }
};
RichMarker.prototype['zIndex_changed'] = RichMarker.prototype.zIndex_changed;

/**
 * Whether the marker is draggable or not.
 *
 * @return {boolean} True if the marker is draggable.
 */
RichMarker.prototype.getDraggable = function() {
  return /** @type {boolean} */ (this.get('draggable'));
};
RichMarker.prototype['getDraggable'] = RichMarker.prototype.getDraggable;


/**
 * Sets the marker to be draggable or not.
 *
 * @param {boolean} draggable If the marker is draggable or not.
 */
RichMarker.prototype.setDraggable = function(draggable) {
  this.set('draggable', !!draggable);
};
RichMarker.prototype['setDraggable'] = RichMarker.prototype.setDraggable;


/**
 * Draggable property changed callback.
 */
RichMarker.prototype.draggable_changed = function() {
  if (this.ready_) {
    if (this.getDraggable()) {
      this.addDragging_(this.markerWrapper_);
    } else {
      this.removeDragListeners_();
    }
  }
};
RichMarker.prototype['draggable_changed'] =
    RichMarker.prototype.draggable_changed;


/**
 * Gets the postiton of the marker.
 *
 * @return {google.maps.LatLng} The position of the marker.
 */
RichMarker.prototype.getPosition = function() {
  return /** @type {google.maps.LatLng} */ (this.get('position'));
};
RichMarker.prototype['getPosition'] = RichMarker.prototype.getPosition;


/**
 * Sets the position of the marker.
 *
 * @param {google.maps.LatLng} position The position to set.
 */
RichMarker.prototype.setPosition = function(position) {
  this.set('position', position);
};
RichMarker.prototype['setPosition'] = RichMarker.prototype.setPosition;


/**
 * Position changed event.
 */
RichMarker.prototype.position_changed = function() {
  this.draw();
};
RichMarker.prototype['position_changed'] =
    RichMarker.prototype.position_changed;


/**
 * Gets the anchor.
 *
 * @return {google.maps.Size} The position of the anchor.
 */
RichMarker.prototype.getAnchor = function() {
  return /** @type {google.maps.Size} */ (this.get('anchor'));
};
RichMarker.prototype['getAnchor'] = RichMarker.prototype.getAnchor;


/**
 * Sets the anchor.
 *
 * @param {RichMarkerPosition|google.maps.Size} anchor The anchor to set.
 */
RichMarker.prototype.setAnchor = function(anchor) {
  this.set('anchor', anchor);
};
RichMarker.prototype['setAnchor'] = RichMarker.prototype.setAnchor;


/**
 * Anchor changed event.
 */
RichMarker.prototype.anchor_changed = function() {
  this.draw();
};
RichMarker.prototype['anchor_changed'] = RichMarker.prototype.anchor_changed;


/**
 * Converts a HTML string to a document fragment.
 *
 * @param {string} htmlString The HTML string to convert.
 * @return {Node} A HTML document fragment.
 * @private
 */
RichMarker.prototype.htmlToDocumentFragment_ = function(htmlString) {
  var tempDiv = document.createElement('DIV');
  tempDiv.innerHTML = htmlString;
  if (tempDiv.childNodes.length == 1) {
    return /** @type {!Node} */ (tempDiv.removeChild(tempDiv.firstChild));
  } else {
    var fragment = document.createDocumentFragment();
    while (tempDiv.firstChild) {
      fragment.appendChild(tempDiv.firstChild);
    }
    return fragment;
  }
};


/**
 * Removes all children from the node.
 *
 * @param {Node} node The node to remove all children from.
 * @private
 */
RichMarker.prototype.removeChildren_ = function(node) {
  if (!node) {
    return;
  }

  var child;
  while (child = node.firstChild) {
    node.removeChild(child);
  }
};


/**
 * Sets the content of the marker.
 *
 * @param {string|Node} content The content to set.
 */
RichMarker.prototype.setContent = function(content) {
  this.set('content', content);
};
RichMarker.prototype['setContent'] = RichMarker.prototype.setContent;


/**
 * Get the content of the marker.
 *
 * @return {string|Node} The marker content.
 */
RichMarker.prototype.getContent = function() {
  return /** @type {Node|string} */ (this.get('content'));
};
RichMarker.prototype['getContent'] = RichMarker.prototype.getContent;


/**
 * Sets the marker content and adds loading events to images
 */
RichMarker.prototype.content_changed = function() {
  if (!this.markerContent_) {
    // Marker content area doesnt exist.
    return;
  }

  this.removeChildren_(this.markerContent_);
  var content = this.getContent();
  if (content) {
    if (typeof content == 'string') {
      content = content.replace(/^\s*([\S\s]*)\b\s*$/, '$1');
      content = this.htmlToDocumentFragment_(content);
    }
    this.markerContent_.appendChild(content);

    var that = this;
    var images = this.markerContent_.getElementsByTagName('IMG');
    for (var i = 0, image; image = images[i]; i++) {
      // By default, a browser lets a image be dragged outside of the browser,
      // so by calling preventDefault we stop this behaviour and allow the image
      // to be dragged around the map and now out of the browser and onto the
      // desktop.
      google.maps.event.addDomListener(image, 'mousedown', function(e) {
        if (that.getDraggable()) {
          if (e.preventDefault) {
            e.preventDefault();
          }
          e.returnValue = false;
        }
      });

      // Because we don't know the size of an image till it loads, add a
      // listener to the image load so the marker can resize and reposition
      // itself to be the correct height.
      google.maps.event.addDomListener(image, 'load', function() {
        that.draw();
      });
    }

    google.maps.event.trigger(this, 'domready');
  }

  if (this.ready_) {
    this.draw();
  }
};
RichMarker.prototype['content_changed'] = RichMarker.prototype.content_changed;

/**
 * Sets the cursor.
 *
 * @param {string} whichCursor What cursor to show.
 * @private
 */
RichMarker.prototype.setCursor_ = function(whichCursor) {
  if (!this.ready_) {
    return;
  }

  var cursor = '';
  if (navigator.userAgent.indexOf('Gecko/') !== -1) {
    // Moz has some nice cursors :)
    if (whichCursor == 'dragging') {
      cursor = '-moz-grabbing';
    }

    if (whichCursor == 'dragready') {
      cursor = '-moz-grab';
    }

    if (whichCursor == 'draggable') {
      cursor = 'pointer';
    }
  } else {
    if (whichCursor == 'dragging' || whichCursor == 'dragready') {
      cursor = 'move';
    }

    if (whichCursor == 'draggable') {
      cursor = 'pointer';
    }
  }

  if (this.markerWrapper_.style.cursor != cursor) {
    this.markerWrapper_.style.cursor = cursor;
  }
};

/**
 * Start dragging.
 *
 * @param {Event} e The event.
 */
RichMarker.prototype.startDrag = function(e) {
  if (!this.getDraggable()) {
    return;
  }

  if (!this.dragging_) {
    this.dragging_ = true;
    var map = this.getMap();
    this.mapDraggable_ = map.get('draggable');
    map.set('draggable', false);

    // Store the current mouse position
    this.mouseX_ = e.clientX;
    this.mouseY_ = e.clientY;

    this.setCursor_('dragready');

    // Stop the text from being selectable while being dragged
    this.markerWrapper_.style['MozUserSelect'] = 'none';
    this.markerWrapper_.style['KhtmlUserSelect'] = 'none';
    this.markerWrapper_.style['WebkitUserSelect'] = 'none';
	
	//position the tip of the marker at the mouse cursor
	/*
	var thisMarker = $(this.markerWrapper_).find(".marker");
	var parentOffset = thisMarker.offset();
	var relativeXPosition = (e.pageX - parentOffset.left); //offset -> method allows you to retrieve the current position of an element 'relative' to the document
    var relativeYPosition = (e.pageY - parentOffset.top);
	var xPositionOffset = (thisMarker.width()/2) - relativeXPosition;
	var yPositionOffset = thisMarker.height() - relativeYPosition;
	this.originalTop = parseFloat(thisMarker.css("top"));
	this.originalLeft = parseFloat(thisMarker.css("left"));
	console.log("OFFSET: ", this.originalLeft, xPositionOffset, this.originalTop, yPositionOffset);
	
	thisMarker.css({
		left:this.originalLeft - xPositionOffset,
		top: this.originalTop - yPositionOffset + 4
	});
	*/

    this.markerWrapper_['unselectable'] = 'on';
    this.markerWrapper_['onselectstart'] = function() {
      return false;
    };

    this.addDraggingListeners_();

    google.maps.event.trigger(this, 'dragstart');
  }
};


/**
 * Stop dragging.
 */
RichMarker.prototype.stopDrag = function(triggerEndDrag) {
  if (!this.getDraggable()) {
    return;
  }

  if (this.dragging_) {
    this.dragging_ = false;
    this.getMap().set('draggable', this.mapDraggable_);
    this.mouseX_ = this.mouseY_ = this.mapDraggable_ = null;

    // Allow the text to be selectable again
    this.markerWrapper_.style['MozUserSelect'] = '';
    this.markerWrapper_.style['KhtmlUserSelect'] = '';
    this.markerWrapper_.style['WebkitUserSelect'] = '';
    this.markerWrapper_['unselectable'] = 'off';
    this.markerWrapper_['onselectstart'] = function() {};
	
	//reset the marker position
	/*
	var thisMarker = $(this.markerWrapper_).find(".marker");
	thisMarker.css({
		left:this.originalLeft,
		top: this.originalTop
	});
	*/
	
    this.removeDraggingListeners_();

    this.setCursor_('draggable');
	if(triggerEndDrag){
    	google.maps.event.trigger(this, 'dragend');
	}
    this.draw();
  }
};


/**
 * Handles the drag event.
 *
 * @param {Event} e The event.
 */
RichMarker.prototype.drag = function(e) {
  if (!this.getDraggable() || !this.dragging_) {
    // This object isn't draggable or we have stopped dragging
    this.stopDrag();
    return;
  }

  var dx = this.mouseX_ - e.clientX;
  var dy = this.mouseY_ - e.clientY;

  this.mouseX_ = e.clientX;
  this.mouseY_ = e.clientY;

  var left = parseInt(this.markerWrapper_.style['left'], 10) - dx;
  var top = parseInt(this.markerWrapper_.style['top'], 10) - dy;

  this.markerWrapper_.style['left'] = left + 'px';
  this.markerWrapper_.style['top'] = top + 'px';

  var offset = this.getOffset_();

  // Set the position property and adjust for the anchor offset
  var point = new google.maps.Point(left - offset.width, top - offset.height);
  var projection = this.getProjection();
  this.setPosition(projection.fromDivPixelToLatLng(point));

  this.setCursor_('dragging');
  google.maps.event.trigger(this, 'drag');
};


/**
 * Removes the drag listeners associated with the marker.
 *
 * @private
 */
RichMarker.prototype.removeDragListeners_ = function() {
  if (this.draggableListener_) {
    google.maps.event.removeListener(this.draggableListener_);
    delete this.draggableListener_;
  }
  this.setCursor_('');
};


/**
 * Add dragability events to the marker.
 *
 * @param {Node} node The node to apply dragging to.
 * @private
 */
RichMarker.prototype.addDragging_ = function(node) {
  if (!node) {
    return;
  }

  var that = this;
  this.draggableListener_ =
    google.maps.event.addDomListener(node, 'mousedown', function(e) {
      that.startDrag(e);
    });

  this.setCursor_('draggable');
};


/**
 * Add dragging listeners.
 *
 * @private
 */
RichMarker.prototype.addDraggingListeners_ = function() {
  var that = this;
  if (this.markerWrapper_.setCapture) {
    this.markerWrapper_.setCapture(true);
    this.draggingListeners_ = [
      google.maps.event.addDomListener(this.markerWrapper_, 'mousemove', function(e) {
		  that.mouseMoved = true;
        that.drag(e);
      }, true),
      google.maps.event.addDomListener(this.markerWrapper_, 'mouseup', function(e) {
		  e.stopPropagation();
		  if(that.mouseMoved){
        	that.stopDrag(true);
		  }else{
			  that.stopDrag();
			  if(e.which == 1){
			 	google.maps.event.trigger(that, 'click'); 
			  }else if(e.which == 3){
				  google.maps.event.trigger(that, 'rightclick'); 
			  }
		  }
        that.markerWrapper_.releaseCapture();
		that.mouseMoved = false;
		return false;
      }, true)
    ];
  } else {
    this.draggingListeners_ = [
      google.maps.event.addDomListener(window, 'mousemove', function(e) {
		  that.mouseMoved = true;
        that.drag(e);
      }, true),
      google.maps.event.addDomListener(window, 'mouseup', function(e) {
		  e.stopPropagation();
        if(that.mouseMoved){
        	that.stopDrag(true);
		  }else{
			  that.stopDrag();
			 if(e.which == 1){
			 	google.maps.event.trigger(that, 'click'); 
			  }else if(e.which == 3){
				  google.maps.event.trigger(that, 'rightclick'); 
			  }
		  }
		that.mouseMoved = false;
		return false;
      }, true)
    ];
  }
};


/**
 * Remove dragging listeners.
 *
 * @private
 */
RichMarker.prototype.removeDraggingListeners_ = function() {
  if (this.draggingListeners_) {
    for (var i = 0, listener; listener = this.draggingListeners_[i]; i++) {
      google.maps.event.removeListener(listener);
    }
    this.draggingListeners_.length = 0;
  }
};


/**
 * Get the anchor offset.
 *
 * @return {google.maps.Size} The size offset.
 * @private
 */
RichMarker.prototype.getOffset_ = function() {
  var anchor = this.getAnchor();
  if (typeof anchor == 'object') {
    return /** @type {google.maps.Size} */ (anchor);
  }

  var offset = new google.maps.Size(0, 0);
  if (!this.markerContent_) {
    return offset;
  }

  var width = this.markerContent_.offsetWidth;
  var height = this.markerContent_.offsetHeight;

  switch (anchor) {
   case RichMarkerPosition['TOP_LEFT']:
     break;
   case RichMarkerPosition['TOP']:
     offset.width = -width / 2;
     break;
   case RichMarkerPosition['TOP_RIGHT']:
     offset.width = -width;
     break;
   case RichMarkerPosition['LEFT']:
     offset.height = -height / 2;
     break;
   case RichMarkerPosition['MIDDLE']:
     offset.width = -width / 2;
     offset.height = -height / 2;
     break;
   case RichMarkerPosition['RIGHT']:
     offset.width = -width;
     offset.height = -height / 2;
     break;
   case RichMarkerPosition['BOTTOM_LEFT']:
     offset.height = -height;
     break;
   case RichMarkerPosition['BOTTOM']:
     offset.width = -width / 2;
     offset.height = -height;
     break;
   case RichMarkerPosition['BOTTOM_RIGHT']:
     offset.width = -width;
     offset.height = -height;
     break;
  }

  return offset;
};


/**
 * Adding the marker to a map.
 * Implementing the interface.
 */
RichMarker.prototype.onAdd = function() {
  if (!this.markerWrapper_) {
    this.markerWrapper_ = document.createElement('DIV');
    this.markerWrapper_.style['position'] = 'absolute';
  }

  if (this.getZIndex()) {
    this.markerWrapper_.style['zIndex'] = this.getZIndex();
  }

  this.markerWrapper_.style['display'] = this.getVisible() ? '' : 'none';

  if (!this.markerContent_) {
    this.markerContent_ = document.createElement('DIV');
    this.markerWrapper_.appendChild(this.markerContent_);

    var that = this;
	 google.maps.event.addDomListener(this.markerContent_, 'rightclick', function(e) {
		google.maps.event.trigger(that, 'rightclick');
    });
    google.maps.event.addDomListener(this.markerContent_, 'mouseover', function(e) {
      google.maps.event.trigger(that, 'mouseover');
    });
    google.maps.event.addDomListener(this.markerContent_, 'mouseout', function(e) {
      google.maps.event.trigger(that, 'mouseout');
    });
  }

  this.ready_ = true;
  this.content_changed();
  this.flat_changed();
  this.draggable_changed();

  var panes = this.getPanes();
  if (panes) {
    panes.overlayMouseTarget.appendChild(this.markerWrapper_);
  }

  google.maps.event.trigger(this, 'ready');
};
RichMarker.prototype['onAdd'] = RichMarker.prototype.onAdd;


/**
 * Impelementing the interface.
 */
RichMarker.prototype.draw = function() {
  if (!this.ready_ || this.dragging_) {
    return;
  }

  var projection = this.getProjection();

  if (!projection) {
    // The map projection is not ready yet so do nothing
    return;
  }

  var latLng = /** @type {google.maps.LatLng} */ (this.get('position'));
  
  var pos = projection.fromLatLngToDivPixel(latLng);

  var offset = this.getOffset_();
  this.markerWrapper_.style['top'] = (pos.y + offset.height) + 'px';
  this.markerWrapper_.style['left'] = (pos.x + offset.width) + 'px';

  var height = this.markerContent_.offsetHeight;
  var width = this.markerContent_.offsetWidth;

  if (width != this.get('width')) {
    this.set('width', width);
  }

  if (height != this.get('height')) {
    this.set('height', height);
  }
};
RichMarker.prototype['draw'] = RichMarker.prototype.draw;


/**
 * Removing a marker from the map.
 * Implementing the interface.
 */
RichMarker.prototype.onRemove = function() {
  if (this.markerWrapper_ && this.markerWrapper_.parentNode) {
    this.markerWrapper_.parentNode.removeChild(this.markerWrapper_);
  }
  this.removeDragListeners_();
};
RichMarker.prototype['onRemove'] = RichMarker.prototype.onRemove;


/**
 * RichMarker Anchor positions
 * @enum {number}
 */
var RichMarkerPosition = {
  'TOP_LEFT': 1,
  'TOP': 2,
  'TOP_RIGHT': 3,
  'LEFT': 4,
  'MIDDLE': 5,
  'RIGHT': 6,
  'BOTTOM_LEFT': 7,
  'BOTTOM': 8,
  'BOTTOM_RIGHT': 9
};
window['RichMarkerPosition'] = RichMarkerPosition;
// create the maps namespace in the admin object
plenty_admin.MAPS = {};
plenty_admin.MAPS.strokeColour = '#758e1b';
plenty_admin.MAPS.fillColour = '#758e1b';
plenty_admin.MAPS.selectedPolygon = {};
plenty_admin.MAPS.clu_boundaries = [];
plenty_admin.MAPS.equipment_pins = [];
plenty_admin.MAPS.add_field_state = 0; // 0=not editing, 1=clu chosen but not confirmed, 2=clu confirmed
plenty_admin.MAPS.edit_field_state = 0;
plenty_admin.MAPS.static_maps_url_base = "https://maps.googleapis.com/maps/api/staticmap?";
plenty_admin.MAPS.api_key = "AIzaSyDePtID2AxWnYcPJdCKTZd9b0jRIOrrj4E";

// method to init and set up a new add field map
plenty_admin.MAPS.add_field = function(mapId, location, zoom, map_search_target) {
	var MAPS = plenty_admin.MAPS;
	var mapOptions = {
			center: location,
			mapTypeId: google.maps.MapTypeId.HYBRID,
			zoom: (zoom ? zoom : 12),
			mapTypeControl:false,
			streetViewControl:false
		  }
	plenty_admin.MAPS.map = MAPS.create_map(mapId, mapOptions);
	plenty_admin.MAPS.set_on_idle_event(plenty_admin.MAPS.map, function(e){
		console.log("map bounds changed");
		plenty_admin.MAPS.show_clu_boundaries(plenty_admin.MAPS.map);
	});
	//MAPS.drawingManager.init(add_field_map);
	MAPS.location_search(plenty_admin.MAPS.map, map_search_target);
}

//get CLU boundaries for current map bounds
plenty_admin.MAPS.show_clu_boundaries = function(map){
	var bounds = map.getBounds();
	var zoom = map.getZoom();
	console.log("map bounds: ", bounds.getNorthEast(), bounds.getSouthWest());
	console.log("map zoom: ", zoom);
	
	//if add field state is good get the CLU data and render it to the map
	if(
		plenty_admin.MAPS.add_field_state == 0
	){
		var boundary = {};
		boundary.maxLongitude = bounds.getNorthEast().lng();
		boundary.minLongitude = bounds.getSouthWest().lng();
		boundary.maxLatitude = bounds.getNorthEast().lat();
		boundary.minLatitude = bounds.getSouthWest().lat();
		plenty_admin.HELPER.showLoadingOverlay("Loading", "Field Boundaries");
		plenty_admin.REST.fields.getCLUBoundaryPointsForBoundingBox(boundary, plenty_admin.MAPS.render_CLU_boundaries, map);
	}
}

plenty_admin.MAPS.edit_field = function(fieldData) {
	var MAPS = plenty_admin.MAPS;
	
	plenty_admin.MAPS.draw_field_on_map(fieldData, "edit-field-map-canvas", {
					//center: itemLatLng,
					mapTypeId: google.maps.MapTypeId.HYBRID,
					zoom:  12,
					//disableDefaultUI: true,
					//draggable: false, 
					//zoomControl: false, 
					//scrollwheel: false, 
					//disableDoubleClickZoom: true
				  }, function(map, fieldObj, polygon){
		//open infoWindow with the fields data for editing
		var paths = polygon.getPath();
		$.extend(fieldData, fieldObj);
		fieldData.boundaries = paths;
		console.log("fieldData", fieldData);
		plenty_admin.MAPS.showEditFieldForm(fieldData, map, polygon);
	}, false, "map");
}

// create the map at a given location and return it
plenty_admin.MAPS.create_map = function(mapId, mapOptions) {
	plenty_admin.MAPS.geocoder = new google.maps.Geocoder();
	google.maps.Polygon.prototype.getBounds = function() {
		var bounds = new google.maps.LatLngBounds();
		var paths = this.getPaths();
		var path;        
		for (var i = 0; i < paths.getLength(); i++) {
			path = paths.getAt(i);
			for (var ii = 0; ii < path.getLength(); ii++) {
				bounds.extend(path.getAt(ii));
			}
		}
		return bounds;
	}
	
	return new google.maps.Map(document.getElementById(mapId), mapOptions);
}

plenty_admin.MAPS.set_on_idle_event = function(map, handler){
	google.maps.event.addListener(map, 'idle', handler);
}
plenty_admin.MAPS.set_on_click_event = function(map, handler){
	google.maps.event.addListener(map, 'click', handler);
	google.maps.event.addListener(map, 'dragstart', handler);
}

plenty_admin.MAPS.render_CLU_boundaries = function(boundaries, map){
	console.log("render_CLU_boundaries: ", boundaries, map);
	plenty_admin.MAPS.hide_clu_polygons();
	for(var b=0; b<boundaries.length; b++){
		var boundary = boundaries[b];
		plenty_admin.MAPS.draw_CLU_polygon(boundary, true, null, map);
	}
	plenty_admin.HELPER.hideLoadingOverlay();
}

plenty_admin.MAPS.add_field_control = function(map){
	function AddFieldControl(controlDiv, map) {
		// Set CSS for the control border
		plenty_admin.MAPS.addFieldUI = document.createElement('div');
		plenty_admin.MAPS.addFieldUI.className = "addFieldMapCtrl";
		plenty_admin.MAPS.addFieldUI.style.backgroundColor = '#fff';
		plenty_admin.MAPS.addFieldUI.style.border = '2px solid #fff';
		plenty_admin.MAPS.addFieldUI.style.borderRadius = '3px';
		plenty_admin.MAPS.addFieldUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
		plenty_admin.MAPS.addFieldUI.style.cursor = 'pointer';
		plenty_admin.MAPS.addFieldUI.style.marginTop = '6px';
		plenty_admin.MAPS.addFieldUI.style.marginRight = '6px';
		plenty_admin.MAPS.addFieldUI.style.textAlign = 'center';
		plenty_admin.MAPS.addFieldUI.title = 'Add Field';
		controlDiv.appendChild(plenty_admin.MAPS.addFieldUI);
		
		// Set CSS for the control interior
		plenty_admin.MAPS.addFieldText = document.createElement('div');
		plenty_admin.MAPS.addFieldText.style.color = '#0094de';
		plenty_admin.MAPS.addFieldText.style.fontFamily = 'ff-enzo-web,Helvetica,Arial,sans-serif';
		plenty_admin.MAPS.addFieldText.style.fontSize = '16px';
		plenty_admin.MAPS.addFieldText.style.lineHeight = '20px';
		plenty_admin.MAPS.addFieldText.style.paddingLeft = '5px';
		plenty_admin.MAPS.addFieldText.style.paddingRight = '5px';
		plenty_admin.MAPS.addFieldText.innerHTML = 'Add Field';
		plenty_admin.MAPS.addFieldUI.appendChild(plenty_admin.MAPS.addFieldText);
		
		google.maps.event.addDomListener(plenty_admin.MAPS.addFieldUI, 'click', function(e) {
			var btn = $(e.target);
			
			if(btn.data("state") == "on"){
				btn.data("state", "off");
				
				plenty_admin.MAPS.addFieldUI
				.style.backgroundColor = '#fff';
				
				plenty_admin.MAPS.addFieldText
				.style.color = '#0094de';
				
				if(plenty_admin.MAPS.infoWindow){
					plenty_admin.MAPS.infoWindow.close();
				}
				plenty_admin.MAPS.selected_clu_polygon = null;
				plenty_admin.MAPS.add_field_state = 1;
				plenty_admin.MAPS.hide_clu_polygons();
				
				//show equipment
				plenty_admin.MAPS.show_equipment(plenty_admin.MAPS.equipment_pins, map);
			}else{
				btn.data("state", "on");
				
				plenty_admin.MAPS.addFieldUI
				.style.backgroundColor = '#0094de';
				
				plenty_admin.MAPS.addFieldText
				.style.color = '#fff';
				
				if(plenty_admin.MAPS.mainMap.getZoom() < plenty_admin.UI.map.minCLUZoom){
					plenty_admin.MAPS.mainMap.setZoom(plenty_admin.UI.map.minCLUZoom);
				}
				
				plenty_admin.MAPS.add_field_state = 0;
				plenty_admin.MAPS.show_clu_boundaries(map);
				
				//hide equipment
				plenty_admin.MAPS.hide_equipment(plenty_admin.MAPS.equipment_pins);
				
				plenty_admin.MAPS.set_on_idle_event(map, function(e){
					plenty_admin.MAPS.show_clu_boundaries(map);
				});
			}
		});
	}
	
	var addFieldControlDiv = document.createElement('div');
	var addField = new AddFieldControl(addFieldControlDiv, plenty_admin.MAPS.mainMap);
	
	addFieldControlDiv.index = 1;
	map.controls[google.maps.ControlPosition.TOP_RIGHT].push(addFieldControlDiv);
}

plenty_admin.MAPS.add_zoom_to_fields_control = function(map){
	function ZoomToFieldsControl(controlDiv, map) {
		// Set CSS for the control border
		var controlUI = document.createElement('div');
		controlUI.style.backgroundColor = '#fff';
		controlUI.style.border = '2px solid #fff';
		controlUI.style.borderRadius = '3px';
		controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
		controlUI.style.cursor = 'pointer';
		controlUI.style.marginTop = '6px';
		controlUI.style.marginRight = '6px';
		controlUI.style.textAlign = 'center';
		controlUI.title = 'All Fields';
		controlDiv.appendChild(controlUI);
		
		// Set CSS for the control interior
		var controlText = document.createElement('div');
		controlText.style.color = '#0094de';
		controlText.style.fontFamily = 'ff-enzo-web,Helvetica,Arial,sans-serif';
		controlText.style.fontSize = '16px';
		controlText.style.lineHeight = '20px';
		controlText.style.paddingLeft = '5px';
		controlText.style.paddingRight = '5px';
		controlText.innerHTML = 'All Fields';
		controlUI.appendChild(controlText);
		
		google.maps.event.addDomListener(controlUI, 'click', function() {
			plenty_admin.MAPS.mainMap.fitBounds(plenty_admin.UI.map.latlngbounds);
		});
	}
	
	var zoomToFieldsControlDiv = document.createElement('div');
	var zoomToFields = new ZoomToFieldsControl(zoomToFieldsControlDiv, map);
	
	zoomToFieldsControlDiv.index = 2;
	map.controls[google.maps.ControlPosition.TOP_RIGHT].push(zoomToFieldsControlDiv);
}

plenty_admin.MAPS.add_map_legend = function(map, legendItems){
	var legend_DOM = document.createElement("ul");
	legend_DOM.setAttribute("id", "map_legend");
	
	console.log("legendItems", legendItems, Object.keys(legendItems).length);
	
	if(Object.keys(legendItems).length > 0){
		map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend_DOM);
		
		plenty_admin.MAPS.legend = $("#map_legend");
		
		plenty_admin.MAPS.update_map_legend(legendItems);
	}
}

plenty_admin.MAPS.update_map_legend = function(legendItems){
	//clear the current legend
	plenty_admin.MAPS.legend.html("");
	for(cropTypeKey in legendItems){
		if(legendItems.hasOwnProperty(cropTypeKey)){
			legendItem = legendItems[cropTypeKey];
			var legendItemDOM = document.createElement("li"); //$("<div id='map_legend'>Crop Types</div>");
			legendItemDOM.setAttribute("class", "legend_item");
			legendItemDOM.innerHTML = "<div class='legend_swatch' style='background-color:"+legendItem.colour+"'></div> "+legendItem.label;
			
			plenty_admin.MAPS.legend
			.append(legendItemDOM);
		}
	}
	
	plenty_admin.MAPS.legendItems = legendItems;
}


plenty_admin.MAPS.get_polygon_area = function(shape){
	var area = google.maps.geometry.spherical.computeArea(shape.getPath()) * 0.00024711;
	console.log("area", area);
	return (area).toFixed(2);
}

plenty_admin.MAPS.drawingManager = {
	selectedShape: null,
	acresField: null,
	acreage: null,
	centerPoint: null,
	that: this,
	MAPS: plenty_admin.MAPS,
	
	clearSelection: function() {
		var dm = plenty_admin.MAPS.drawingManager;
		if (dm.selectedShape) {
			dm.selectedShape.setEditable(false);
			dm.selectedShape = null;
		}
	},
	
	setSelection: function(shape) {
		var dm = plenty_admin.MAPS.drawingManager;
		dm.clearSelection();
		selectedShape = shape;
		shape.setEditable(true);
		google.maps.event.addListener(shape.getPath(), 'set_at', function() {
			MAPS.selectedPolygon.acreage = plenty_admin.MAPS.get_polygon_area(shape);
			dm.acresField.val(MAPS.selectedPolygon.acreage);
		});
	},
	
	deleteSelectedShape: function() {
		var dm = plenty_admin.MAPS.drawingManager;
		if (dm.selectedShape) {
			dm.selectedShape.setMap(null);
		}
	},
	
	init: function(map) {
		var MAPS = plenty_admin.MAPS;
		var dm = MAPS.drawingManager;
		
		dm.drawingManager = new google.maps.drawing.DrawingManager({
			drawingMode: google.maps.drawing.OverlayType.POLYGON,
			drawingControl: true,
			drawingControlOptions: {
				position: google.maps.ControlPosition.BOTTOM_LEFT,
				drawingModes: [
					//google.maps.drawing.OverlayType.MARKER,
					//google.maps.drawing.OverlayType.CIRCLE,
					google.maps.drawing.OverlayType.POLYGON,
					//google.maps.drawing.OverlayType.POLYLINE,
					google.maps.drawing.OverlayType.RECTANGLE
				]
			},
				polygonOptions: {
					fillColor: plenty_admin.MAPS.fillColour,
					strokeColor: plenty_admin.MAPS.strokeColour,
					fillOpacity: .5,
					strokeWeight: 2,
					clickable: false,
					editable: true,
					zIndex: 1
				},
				rectangleOptions: {
					fillColor: plenty_admin.MAPS.fillColour,
					strokeColor: plenty_admin.MAPS.strokeColour,
					fillOpacity: .5,
					strokeWeight: 2,
					clickable: false,
					editable: true,
					zIndex: 1
			}
		});
	  
		dm.drawingManager.setMap(map);
		
		google.maps.event.addListener(dm.drawingManager, 'overlaycomplete', function(event) {
			// switch off drawing mode
			dm.drawingManager.setDrawingMode(null);
			
			//process a polygon
			if (event.type == google.maps.drawing.OverlayType.POLYGON) {
				var newShape = event.overlay;
				newShape.type = event.type;
				google.maps.event.addListener(newShape, 'click', function() {
					console.log("clicked the polygon");
					that.setSelection(newShape);
					plenty_admin.MAPS.openInfoWindow(MAPS.selectedPolygon.centerPoint, map);
				}); 
				
				var shapePath = newShape.getPath();
				
				var area = google.maps.geometry.spherical.computeArea(shapePath);
				
				MAPS.selectedPolygon.acreage = (area).toFixed(2);
				
				dm.setSelection(newShape);
				
				MAPS.selectedPolygon.centerPoint = plenty_admin.MAPS.get_polygon_center(shapePath);
				
				console.log("MAPS.selectedPolygon.centerPoint: ", MAPS.selectedPolygon.centerPoint);
				
				MAPS.showAddFieldForm(area, event, map);
			}
		});
	}
}

plenty_admin.MAPS.get_polygon_center = function(shapePath){
	var bounds = new google.maps.LatLngBounds();
	shapePath.forEach(function(xy, i) {
		bounds.extend(xy);
	});
	return bounds.getCenter();
}

plenty_admin.MAPS.geocode = function(address, callback){
	// get lat lng from address
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({'address': address}, function(results, status) {
		console.log("geocode: ", results, status);
		if (status == google.maps.GeocoderStatus.OK) {
		  if(callback && typeof callback === "function"){
			  callback(results);  
		  }
		} else {
		  console.warn('Geocoder failed due to: ' + status);
		}
	  });
}

plenty_admin.MAPS.draw_CLU_polygon = function(points, editable, polygonId, map){
	// Define the LatLng coordinates for the polygon's path.
	var polygon_coords = [];
	points.cluBoundaryPoins.forEach(function(xy, i) {
		polygon_coords.push(new google.maps.LatLng(xy.latitude, xy.longitude));
	});
	
	// Construct the polygon.
	var CLU_polygon = new google.maps.Polygon({
		paths: polygon_coords,
		fillColor: "rgb(255,255,255)",
		strokeColor: "rgb(255,255,255)",
		strokeOpacity: 0,
		strokeWeight: 2,
		fillOpacity: 0,
		editable: false
	});
	
	CLU_polygon.id = points.cluBoundary.id;
	
	google.maps.event.addListener(CLU_polygon, "mouseover",function(){
		this.setOptions({
							strokeOpacity: .6,
							fillOpacity: .35
						});
	}); 
	
	plenty_admin.MAPS.selectedPolygon.clu_mouseout = google.maps.event.addListener(CLU_polygon, "mouseout",function(){
		this.setOptions({
							strokeOpacity: 0,
							fillOpacity: 0
						});
	});
	
	google.maps.event.addListener(CLU_polygon, "click",function(event){
		if(plenty_admin.MAPS.infoWindow){
			plenty_admin.MAPS.infoWindow.close();
		}
		this.setOptions({
							strokeOpacity: .6,
							fillOpacity: .35
						});
		plenty_admin.MAPS.suggest_clu_field(CLU_polygon, map);
	});
	
	CLU_polygon.setMap(map);
	
	plenty_admin.MAPS.clu_boundaries.push(CLU_polygon);
	return CLU_polygon;
}

plenty_admin.MAPS.draw_pin = function(pinData, pinEvents, map){
	//console.log("draw_pin:", pinData);
	var nameToClass = pinData.equipmentTypeIds[0].name.toLowerCase().replace(/ /g, "-");
	var markerIcon = plenty_admin.UI.fontIconClasses.indexOf(nameToClass) > -1 ? nameToClass : "unknown";
	var richMarker = new RichMarker({
          position: pinData.latlng,
          map: map,
		  anchor: RichMarkerPosition.BOTTOM,
		  flat: true,
          draggable: true,
          content: '<div class="marker" data-id="'+pinData.id+'" style="background:transparent url(img/map-markers/bg.svg) no-repeat 0 0"><i class="pif pif-'+markerIcon+'"></i><div>'
          });
		  
	if(pinEvents.onMouseOver){
		google.maps.event.addListener(richMarker, "mouseover", pinEvents.onMouseOver); 
	}
	
	if(pinEvents.onMouseOut){
		google.maps.event.addListener(richMarker, "mouseout", pinEvents.onMouseOut); 
	}
	
	if(pinEvents.onClick){
		google.maps.event.addListener(richMarker, "click", pinEvents.onClick); 
	}
	
	if(pinEvents.onDoubleClick){
		google.maps.event.addListener(richMarker, "dblclick", pinEvents.onDoubleClick); 
	}
	
	if(pinEvents.onDragEnd){
		google.maps.event.addListener(richMarker, "dragend", pinEvents.onDragEnd); 
	}
	
	google.maps.event.addListener(richMarker, "ready", function(){
		var that = this;
		var to = setTimeout(function(){
			$(that.markerContent_)
			.find(".marker")
			.addClass("in");
		}, 10);
		
	});
	
	richMarker.id = pinData.id;
	
	plenty_admin.MAPS.equipment_pins.push(richMarker);
	
	return richMarker;
}

plenty_admin.MAPS.draw_polygon = function(fieldData, events, map, pushPoly){	
	//console.log("draw polygon: ", fieldData, events, map);
	// Define the LatLng coordinates for the polygon's path.
	//console.log("draw_polygon:", points, Object.prototype.toString.call(points[0]));
	//console.log("points", points);
	
	var polygon_coords = [];
	
	if(fieldData.isCoords){
		polygon_coords = fieldData.boundaries;
	}else{
		fieldData.boundaries.forEach(function(xy, i) {
			polygon_coords.push(new google.maps.LatLng(xy.latitude, xy.longitude));
		});
	}
	
	var fillColor = (fieldData.fillColor ? fieldData.fillColor : (plenty_admin.MAPS.legendItems && fieldData.cropType ? plenty_admin.MAPS.legendItems[fieldData.cropType.replace(/ /g, "")].colour : plenty_admin.MAPS.strokeColour));
	var strokeColor = (fieldData.strokeColor ? fieldData.strokeColor : (plenty_admin.MAPS.legendItems && fieldData.cropType ? plenty_admin.MAPS.legendItems[fieldData.cropType.replace(/ /g, "")].colour : plenty_admin.MAPS.strokeColour));
	//console.log("polygon_coords", polygon_coords);
	
	// Construct the polygon.
	var field_polygon = new google.maps.Polygon({
		paths: polygon_coords,
		fillColor: fillColor,
		strokeColor: strokeColor,
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillOpacity: 0.35,
		editable: fieldData.editable,
		title: fieldData.fieldName,
		name: fieldData.fieldName
	});
	
	if(fieldData.fieldId){
		field_polygon.id = fieldData.fieldId;
	}
	
	if(fieldData.fieldName){
		field_polygon.name = fieldData.fieldName;
	}
	
	if(fieldData.cropType){
		field_polygon.cropType = fieldData.cropType;
	}
	
	if(fieldData.cluBoundaryId){
		field_polygon.cluBoundaryId = fieldData.cluBoundaryId;
	}
	
	google.maps.event.addListener(field_polygon, 'set_at', ( events.onEdit ? events.onEdit : function(){/*empty*/} ));
	google.maps.event.addListener(field_polygon, 'insert_at', ( events.onEdit ? events.onEdit : function(){/*empty*/} ));
	google.maps.event.addListener(field_polygon, "mouseover", ( events.onMouseOver ? events.onMouseOver : function(){/*empty*/} )); 
	google.maps.event.addListener(field_polygon, "mouseout", ( events.onMouseOut ? events.onMouseOut : function(){/*empty*/} )); 
	google.maps.event.addListener(field_polygon, "click", ( events.onClick ? events.onClick : function(){/*empty*/} )); 
	google.maps.event.addListener(field_polygon, "rightclick", ( events.onRightClick ? events.onRightClick : function(){/*empty*/} )); 
	google.maps.event.addListener(field_polygon, "dblclick", ( events.onDoubleClick ? events.onDoubleClick : function(){/*empty*/} )); 
	
	field_polygon.removePolygon = function(){
		this.setMap(null);
	}
	
	if(fieldData.isCluster){
		lastPath = null,
		lastCenter = null;
		field_polygon.getPosition = function() {
		  var path = this.getPath();
		  if (lastPath == path) {
			return lastCenter;
		  }
		  lastPath = path;
		  var bounds = new google.maps.LatLngBounds();
		  path.forEach(function(latlng, i) {
			bounds.extend(latlng);
		  });
	
		  lastCenter = bounds.getCenter();
		  return lastCenter;
		};
	}else{
		field_polygon.setMap(map);
	}
	
	if(pushPoly === null || pushPoly){
		plenty_admin.UI.map.filtered_field_polygons.push(field_polygon);
	}
	return field_polygon;
}

plenty_admin.MAPS.zoomToPolygon = function(polygon, map){
	map.fitBounds(polygon.getBounds());
}

plenty_admin.MAPS.getBoundsZoomLevel = function(bounds, mapDim) {
    var WORLD_DIM = { height: 256, width: 256 };
    var ZOOM_MAX = 21;

    function latRad(lat) {
        var sin = Math.sin(lat * Math.PI / 180);
        var radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
        return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
    }

    function zoom(mapPx, worldPx, fraction) {
        return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
    }

    var ne = bounds.getNorthEast();
    var sw = bounds.getSouthWest();

    var latFraction = (latRad(ne.lat()) - latRad(sw.lat())) / Math.PI;

    var lngDiff = ne.lng() - sw.lng();
    var lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360;

    var latZoom = zoom(mapDim.height, WORLD_DIM.height, latFraction);
    var lngZoom = zoom(mapDim.width, WORLD_DIM.width, lngFraction);

    return Math.min(latZoom, lngZoom, ZOOM_MAX);
}

plenty_admin.MAPS.get_static_maps_url = function(mapDetails){
	var mapUrl = plenty_admin.MAPS.static_maps_url_base;
	for(param in mapDetails){
		if(mapDetails.hasOwnProperty(param)){
			mapUrl += (param + "=" + mapDetails[param]) + "&";
		}
	}
	mapUrl += "key="+plenty_admin.MAPS.api_key;
	return mapUrl;
}

plenty_admin.MAPS.draw_field_on_map = function(fieldObj, map_DOM_id, mapOptions, callback, editable, mapID){
	console.log("draw_field_on_map: ", fieldObj, mapOptions);
	
	var itemLatLng = new google.maps.LatLng(fieldObj.latitude, fieldObj.longitude);
	//console.log("itemLatLng: ", itemLatLng);
	
	if(fieldObj.boundaries){
		//load map
		plenty_admin.MAPS[mapID] = plenty_admin.MAPS.create_map(map_DOM_id, mapOptions);
		
		fieldObj.editable = editable;
		
		var poly_events = {
			onEdit: function(){
				// onEdit handler
				var newArea = plenty_admin.MAPS.get_polygon_area(polygon);
				plenty_admin.MAPS.infoWindowContent
				.find("#edit_field_acres")
				.val(newArea);
			}
		};
		
		var polygon = plenty_admin.MAPS.draw_polygon(fieldObj, poly_events, plenty_admin.MAPS[mapID], mapOptions.pushPoly);
		
		plenty_admin.MAPS.zoomToPolygon(polygon, plenty_admin.MAPS[mapID]);
		
		google.maps.event.trigger(plenty_admin.MAPS[mapID], 'resize');
		
		if(callback && typeof callback === "function"){
			callback(plenty_admin.MAPS[mapID], fieldObj, polygon);  
		}
	}else{
		plenty_admin.REST.fields.getAllBoundaryPointsByFieldAndBoundaryType(fieldObj.id, 1 /* We are only interested in field boundaries here*/, function(boundaries){
			console.log("got boundaries for field: ", boundaries);
			
			//load map
			plenty_admin.MAPS[mapID] = plenty_admin.MAPS.create_map(map_DOM_id, mapOptions);
			
			fieldObj.boundaries = boundaries;
			fieldObj.editable = editable;
			
			var poly_events = {
				onEdit: function(){
					// onEdit handler
					var newArea = plenty_admin.MAPS.get_polygon_area(polygon);
					plenty_admin.MAPS.infoWindowContent
					.find("#edit_field_acres")
					.val(newArea);
					
				}
			};
			
			var polygon = plenty_admin.MAPS.draw_polygon(fieldObj, poly_events, plenty_admin.MAPS[mapID], mapOptions.pushPoly);
			
			plenty_admin.MAPS.zoomToPolygon(polygon, plenty_admin.MAPS[mapID]);
			
			if(callback && typeof callback === "function"){
				callback(plenty_admin.MAPS.map, fieldObj, polygon);  
			}
		});
	}
	
	return fieldObj;
}


plenty_admin.MAPS.processPoints = function(geometry, callback, thisArg) {
    if (geometry instanceof google.maps.LatLng) {
        callback.call(thisArg, geometry);
    } else if (geometry instanceof google.maps.Data.Point) {
        callback.call(thisArg, geometry.get());
    } else {
        geometry.getArray().forEach(function (g) {
            processPoints(g, callback, thisArg);
        });
    }
}

plenty_admin.MAPS.openInfoWindow = function(position, map){
	plenty_admin.MAPS.infoWindow.setContent(plenty_admin.MAPS.infoWindowContent);
	plenty_admin.MAPS.infoWindow.setPosition(position);
	plenty_admin.MAPS.infoWindow.open(map);
}

plenty_admin.MAPS.show_equipment_pin_context_menu = function(pinData, marker){
	console.log("show_equipment_pin_context_menu", pinData, marker);
	if(plenty_admin.MAPS.infoWindow)
	{
		plenty_admin.MAPS.infoWindow.close();
	}
	
	plenty_admin.MAPS.infoWindow = new google.maps.InfoWindow();
	
	$.get("ajax/equipment_pin_context.html", function(contentString){
		//store the returned html
		plenty_admin.MAPS.infoWindowContent = contentString;
		
		google.maps.event.addListener(plenty_admin.MAPS.infoWindow, 'domready', function(content){ 
			plenty_admin.MAPS.infoWindowContent = $(".context-menu");
			
			plenty_admin.MAPS.infoWindowContent
			.find(".delete_equipment a")
			.click(function(){
				//alert("insert equipment");
				plenty_admin.MAPS.delete_fixed_equipment(pinData, ev);
				return false;
			})
			.end()
			.find(".view_equipment_details a")
			.click(function(){
				//alert("insert equipment");
				plenty_admin.UI.field.show_equipment_modal(pinData);
				return false;
			});
		});
		
		plenty_admin.MAPS.openInfoWindow(marker.position, plenty_admin.MAPS.mainMap);
	});
}

plenty_admin.MAPS.show_polygon_context_menu = function(fieldData, map, menu_name, polygon){
	if(plenty_admin.MAPS.infoWindow)
	{
		plenty_admin.MAPS.infoWindow.close();
	}
	
	plenty_admin.MAPS.infoWindow = new google.maps.InfoWindow();
	
	$.get("ajax/"+menu_name+".html", function(contentString){
		//store the returned html
		plenty_admin.MAPS.infoWindowContent = contentString;
		
		google.maps.event.addListener(plenty_admin.MAPS.infoWindow, 'domready', function(content){ 
			plenty_admin.MAPS.infoWindowContent = $(".context-menu");
			
			switch(menu_name){
				case "map_context_menu":
					plenty_admin.MAPS.infoWindowContent
					.find(".edit_field a")
					.click(function(){
						//alert("edit field");
						//plenty_admin.MAPS.edit_field(fieldData);
						if(plenty_admin.MAPS.infoWindow){
							plenty_admin.MAPS.infoWindow.close();
						}
						
						//zoom to field
						plenty_admin.MAPS.zoomToPolygon(polygon, map);
						
						plenty_admin.MAPS.showEditFieldForm(fieldData, map, polygon);
						return false;
					})
					.end()
					.find(".insert_equipment a")
					.click(function(){
						//alert("insert equipment");
						plenty_admin.MAPS.add_fixed_equipment(fieldData, map);
						return false;
					})
					.end()
					.find(".view_field a")
					.click(function(){
						//alert("insert equipment");
						plenty_admin.HELPER.showLoadingOverlay("Loading", "Field");
						var polyPath = [];
						polygon.getPath().getArray().forEach(function(point, p){
							var latlng = {
								latitude: point.lat(),
								longitude: point.lng(),
								seqNumber: p
							}
							polyPath.push(latlng);
						});
						
						//get field by ID
						plenty_admin.REST.fields.getFieldById(polygon.id, function(fieldObj){
							//console.log("polyPath", polyPath);
							fieldObj.fillColor = polygon.fillColor;
							fieldObj.strokeColor = polygon.strokeColor;
							fieldObj.boundaries = polyPath;
							fieldObj.isCoords = false;
						
							//build the breadcrumb trail object
							var field_breadcrumb = [
								{
									class:"back",
									name:"Map",
									clickHandler:function(){
										plenty_admin.UI.currentScreen
										.fadeOut("normal", function(){
											plenty_admin.UI.field.clear();
											plenty_admin.UI.currentScreen = plenty_admin.UI.map.DOM;
											plenty_admin.UI.currentScreen
											.closest(".fill-area")
											.fadeIn("normal")
											.parent()
											.find(".filter_controls")
											.fadeIn("fast", function(){
												google.maps.event.trigger(plenty_admin.MAPS.mainMap, 'resize'); 
												plenty_admin.MAPS.mainMap.fitBounds(plenty_admin.UI.map.latlngbounds);
											});
										});
										return false;
									}
								},
								{
									class:"active",
									name:fieldObj.name,
									clickHandler:null
								}
							];
							
							plenty_admin.UI.field.DOM
							.find(".breadcrumb-trail")
							.remove()
							.end()
							.prepend(plenty_admin.UI.build_breadcrumb_trail(field_breadcrumb));
							
							plenty_admin.UI.field.init(fieldObj, "map");
						});
						return false;
					});
				break;
			}
		});
		
		var clickPoint = new google.maps.LatLng(fieldData.rc_lat, fieldData.rc_lng);
		plenty_admin.MAPS.openInfoWindow(clickPoint, plenty_admin.MAPS.mainMap);
	});
}

plenty_admin.MAPS.delete_field_equipment = function(pinData, marker){
	if(plenty_admin.MAPS.infoWindow){
		plenty_admin.MAPS.infoWindow.close();
	}
	
	plenty_admin.MAPS.infoWindow = new google.maps.InfoWindow();
	
	$.get("ajax/delete-field-equipment.html", function(contentString){
		plenty_admin.MAPS.infoWindowContent = contentString;
		
		google.maps.event.addListener(plenty_admin.MAPS.infoWindow, 'domready', function(content){ 
			plenty_admin.MAPS.infoWindowContent = $(".updateEquipment");
			
			plenty_admin.MAPS.infoWindowContent
			.find("button.disassociate")
			.click(function(){
				
				plenty_admin.REST.deleteFieldEquipment.delete(pinData.fieldEquipmentDto.id)
				.then(
						function(deletedFieldEquipment){
							console.log("field equipment deleted: ", deletedFieldEquipment);
						}, function(){
							bootbox.dialog({
											message: "disassociating a field failed due to a server error",
											className: "danger",
											buttons: {
												danger: {
												  label: "OK",
												  className: "btn-danger",
												  callback: plenty_admin.HELPER.hideLoadingOverlay
												}
											}
										});
							var markerObj = plenty_admin.MAPS.get_pin_from_array(pinData);
							markerObj.marker.setPosition(pinData.latlng);
						}
					);
				
				plenty_admin.MAPS.infoWindow.close();
				return false;
			})
			.end()
			.find("button.cancel")
			.click(function(){
				var markerObj = plenty_admin.MAPS.get_pin_from_array(pinData);
				markerObj.marker.setPosition(pinData.latlng);
				plenty_admin.MAPS.infoWindow.close();
				return false;
			})
			.end()
			.find(".name")
			.text(pinData.name);
		});
		
		plenty_admin.MAPS.openInfoWindow(marker.position, plenty_admin.MAPS.mainMap);
	});
}

plenty_admin.MAPS.update_fixed_equipment_position = function(pinData, marker){
	console.log("update_fixed_equipment_position - pinData: ", pinData);
	if(plenty_admin.MAPS.infoWindow){
		plenty_admin.MAPS.infoWindow.close();
	}
	
	plenty_admin.MAPS.infoWindow = new google.maps.InfoWindow();
	
	$.get("ajax/update-equipment-position.html", function(contentString){
		plenty_admin.MAPS.infoWindowContent = contentString;
		
		google.maps.event.addListener(plenty_admin.MAPS.infoWindow,'closeclick',function(){
			var markerObj = plenty_admin.MAPS.get_pin_from_array(pinData);
			markerObj.marker.setPosition(pinData.latlng);
		});
		
		google.maps.event.addListener(plenty_admin.MAPS.infoWindow, 'domready', function(content){ 
			plenty_admin.MAPS.infoWindowContent = $(".updateEquipment");
			
			plenty_admin.MAPS.infoWindowContent
			.find("button.save")
			.click(function(){
				var markerObj = plenty_admin.MAPS.get_pin_from_array(pinData);
				
				var equipmentDto = pinData;
				equipmentDto.latitude = marker.position.A;
				equipmentDto.longitude = marker.position.F;
				delete equipmentDto.latlng;
				console.log("equipmentDto", equipmentDto);
				
				plenty_admin.REST.updateEquipment.post(equipmentDto)
				.then(
						function(updatedEquipment){
							console.log("equipment updated: ", updatedEquipment);
							
							//remove the pin from the map
							markerObj.marker.setMap(null);
							//remove the pin from the array
							plenty_admin.MAPS.equipment_pins.splice(markerObj.iconIndex, 1);
							//update the pin
							plenty_admin.UI.map.add_equipment_to_map();
							//plenty_admin.MAPS.equipment_pins[markerObj.iconIndex].latitude = marker.position.A;
							//plenty_admin.MAPS.equipment_pins[markerObj.iconIndex].longitude = marker.position.F;
						}
					);
				
				plenty_admin.MAPS.infoWindow.close();
				return false;
			})
			.end()
			.find("button.cancel")
			.click(function(){
				var markerObj = plenty_admin.MAPS.get_pin_from_array(pinData);
				markerObj.marker.setPosition(pinData.latlng);
				plenty_admin.MAPS.infoWindow.close();
				return false;
			})
			.end()
			.find(".lat")
			.text(marker.position.A)
			.end()
			.find(".lng")
			.text(marker.position.F)
			.end()
			.find(".name")
			.text(pinData.name);
		});
		
		plenty_admin.MAPS.openInfoWindow(marker.position, plenty_admin.MAPS.mainMap);
	});
}
plenty_admin.MAPS.get_pin_from_array = function(pinData){
	var iconIndex = null;
	$.grep(plenty_admin.MAPS.equipment_pins, function(pin, p){
		if(pinData.id === $(pin.markerContent_).find(".marker").data("id"))
		{
			iconIndex = p;
		}
	});
	
	return {
			marker: plenty_admin.MAPS.equipment_pins[iconIndex],
			iconIndex: iconIndex
		};
}

plenty_admin.MAPS.update_fixed_equipment_position_and_change_field = function(pinData, fieldData, marker){
	console.log("update_fixed_equipment_position_and_change_field - pinData: ", pinData);
	if(plenty_admin.MAPS.infoWindow){
		plenty_admin.MAPS.infoWindow.close();
	}
	
	plenty_admin.MAPS.infoWindow = new google.maps.InfoWindow();
	
	google.maps.event.addListener(plenty_admin.MAPS.infoWindow,'closeclick',function(){
		var markerObj = plenty_admin.MAPS.get_pin_from_array(pinData);
		markerObj.marker.setPosition(pinData.latlng);
	});
	
	$.get("ajax/change-equipment-position-and-field.html", function(contentString){
		plenty_admin.MAPS.infoWindowContent = contentString;
		
		google.maps.event.addListener(plenty_admin.MAPS.infoWindow, 'domready', function(content){ 
			plenty_admin.MAPS.infoWindowContent = $(".updateEquipment");
			
			plenty_admin.MAPS.infoWindowContent
			.find("button.save")
			.click(function(){
				var markerObj = plenty_admin.MAPS.get_pin_from_array(pinData);
				
				var equipmentDto = pinData;
				equipmentDto.latitude = marker.position.A;
				equipmentDto.longitude = marker.position.F;
				delete equipmentDto.latlng;
				console.log("equipmentDto", equipmentDto);
				
				plenty_admin.DATA.eventCollector = window.eventcollector(2, 10000);
				
				plenty_admin.REST.updateEquipment.post(equipmentDto)
				.then(
					function(updatedEquipment){
						console.log("equipment updated: ", updatedEquipment);
						
						plenty_admin.DATA.eventCollector.done("event 1");
					}
				);
				
				//update field equipment
				var feDto = pinData.fieldEquipmentDto;
				feDto.fieldId = fieldData.id;
				
				plenty_admin.REST.updateFieldEquipment
				.post(feDto)
				.then(function(returnedFE){
					console.log("field equipment updated: ", returnedFE);
					
					plenty_admin.DATA.eventCollector.done("event 2");
				});
					
				plenty_admin.DATA.eventCollector.on('alldone', function(total) {
					//remove the pin from the map
					//markerObj.marker.setMap(null);
					$(markerObj.marker.markerWrapper_).remove();
					//remove the pin from the array
					plenty_admin.MAPS.equipment_pins.splice(markerObj.iconIndex, 1);
					//update the pin
					plenty_admin.UI.map.add_equipment_to_map();
					
					plenty_admin.MAPS.infoWindow.close();
				});	
				
				
				return false;
			})
			.end()
			.find("button.cancel")
			.click(function(){var iconIndex = null;
				$.grep(plenty_admin.MAPS.equipment_pins, function(pin, p){
					//console.log("GREP: ", pin, p);
					if(pinData.id === pin.id)
					{
						iconIndex = p;
					}
				});
				plenty_admin.MAPS.equipment_pins[iconIndex].setPosition(pinData.latlng);
				plenty_admin.MAPS.infoWindow.close();
				return false;
			})
			.end()
			.find(".lat")
			.text(marker.position.A)
			.end()
			.find(".lng")
			.text(marker.position.F)
			.end()
			.find(".equipment_name")
			.text(pinData.name)
			.end()
			.find(".field_name")
			.text(fieldData.name)
		});
		
		plenty_admin.MAPS.openInfoWindow(marker.position, plenty_admin.MAPS.mainMap);
	});
}

plenty_admin.MAPS.add_fixed_equipment = function(fieldData, map){
	if(plenty_admin.MAPS.infoWindow){
		plenty_admin.MAPS.infoWindow.close();
	}
	
	plenty_admin.MAPS.infoWindow = new google.maps.InfoWindow();
	
	$.get("ajax/add-equipment-form.html", function(contentString){
		//store the returned html
		plenty_admin.MAPS.infoWindowContent = contentString;
		
		google.maps.event.addListener(plenty_admin.MAPS.infoWindow, 'domready', function(content){ 
			plenty_admin.MAPS.infoWindowContent = $("form.equipments");
			
			//Set the options in the farms list
			var $equipList = plenty_admin.MAPS.infoWindowContent.find("#add_equipment_type");
			//clear current options
			$equipList
			.find("option")
			.remove();
			
			var equipOptionsHTML = "";
			
			for(id in plenty_admin.DATA.equipmentTypes){
				if(plenty_admin.DATA.equipmentTypes.hasOwnProperty(id)){
					var equip = plenty_admin.DATA.equipmentTypes[id];
					equipOptionsHTML += "<option value='"+id+"'>"+equip.name+"</option>";
				}
			}
			
			$equipList.append(equipOptionsHTML);
			
			//Set the options in the brands list
			var $brandList = plenty_admin.MAPS.infoWindowContent.find("#add_equipment_brand");
			
			$brandList
			.find("option")
			.remove();
			
			//populate equipment type lists:
			var brandTypesHTML = "";
			for(index in plenty_admin.DATA.brandTypes){
				if(plenty_admin.DATA.brandTypes.hasOwnProperty(index)){
					var brand = plenty_admin.DATA.brandTypes[index];
					brandTypesHTML += "<option value='"+brand.id+"'>"+brand.name+"</option>";
				}
			}
			
			
			$brandList
			.append(brandTypesHTML);
			
			//render organization dropdown
			//Set the options in the brands list
			var $orgsList = plenty_admin.MAPS.infoWindowContent.find("#add_equipment_orgs");
			
			$orgsList
			.find("option")
			.remove();
			
			//populate equipment type lists:
			var orgsHTML = "";
			//for(index in plenty_admin.DATA.brandTypes){
			for(var o=0; o<plenty_admin.DATA.userFilters.possibleFilteringEntitiesDtoList.organizations.length; o++){
				var org = plenty_admin.DATA.userFilters.possibleFilteringEntitiesDtoList.organizations[o];
				orgsHTML += "<option value='"+org.id+"'>"+org.name+"</option>";
			}
			
			$orgsList
			.append(orgsHTML)
			.on("change", function(){
				console.log("changed org: ", $(this).val());
				plenty_admin.MAPS.infoWindowContent
				.find(".platformServices")
				.find(".ps_org")
				.hide()
				.end()
				.find(".ps_org_"+$(this).val())
				.show();
			});
			
			var psById = {};
			
			plenty_admin.REST.fields.getPlatformServicesForFilter(function(platformServices){
				//console.log("platformServices", platformServices);
				//render platform service dropdowns
				for(var s=0; s<platformServices.length; s++){
					var ps = platformServices[s];
					if(!psById[ps.organizationId]){
						psById[ps.organizationId] = [ps];
					}else{
						psById[ps.organizationId].push(ps);
					}
				}
				
				//console.log("psById", psById);
				
				var psListsHTML = "";
				var psIndex = 0;
				
				for(id in psById){
					if(psById.hasOwnProperty(id)){
						var _ps = psById[id];
						console.log("_ps", _ps);
						if(_ps.length == 1){
							//show as a label
							psListsHTML += "<input type='text' readonly class='form-control ps_org ps_org_"+_ps[0].organizationId+"'"+(psIndex === 0 ? "" : " style='display:none;'")+" data-id='"+id+"'";
							psListsHTML += " value='"+_ps[0].name+"'";
							psListsHTML += ">";
						}else{
							//show as a dropdown
							psListsHTML += "<select class='form-control equipment_platform_service ps_org ps_org_"+id+"'"+(psIndex === 0 ? "" : " style='display:none;'")+" required placeholder='Choose a platform service'>";
								for(var __ps = 0; __ps < _ps.length; __ps++){
									var ___ps = _ps[__ps];
									psListsHTML += "<option value='"+___ps.id+"'>"+___ps.name+"</option>";
								}
							psListsHTML += "</select>";
						}
						psIndex += 1;
					}
				}
				
				//console.log("psListsHTML", psListsHTML);
				
				plenty_admin.MAPS.infoWindowContent
				.find(".platformServices")
				.append(psListsHTML);
				
			});
			
			plenty_admin.MAPS.infoWindowContent
			.find("#add_equipment_latitude")
			.val(fieldData.rc_lat)
			.end()
			.find("#add_equipment_longitude")
			.val(fieldData.rc_lng)
			.end()
			.find("button.add-equipment")
			.click(function(e){
				var $this = $(this);
				$this.button("loading");
				var equipmentObj = {};
				equipmentObj.equipmentName = plenty_admin.MAPS.infoWindowContent.find("input#add_equipment_name").val();
				equipmentObj.equipmentTypeIds = [];
				plenty_admin.MAPS.infoWindowContent.find("select#add_equipment_type option:selected").each(function(){
					equipmentObj.equipmentTypeIds.push(parseInt($(this).val()));
				});
				equipmentObj.latitude = fieldData.rc_lat;
				equipmentObj.longitude = fieldData.rc_lng;
				equipmentObj.fieldId = parseInt(fieldData.id);
				equipmentObj.brandId = parseInt($brandList.val());
				equipmentObj.organizationId = parseInt($orgsList.val());
				equipmentObj.platformServiceId = parseInt(plenty_admin.MAPS.infoWindowContent.find(".platformServices option:selected").val());
				
				console.log("equipmentObj", equipmentObj);
				plenty_admin.REST.insertFieldEquipment.post(equipmentObj)
				.then(
					function(equipment){
						console.log("added new equipment:", equipment);
						
						plenty_admin.MAPS.infoWindowContent
						.fadeOut("fast", function(){
							plenty_admin.MAPS.infoWindowContent
							.parent()
							.find(".add_equipment_success_wrapper")
							.fadeIn("fast");
							
							plenty_admin.UI.map.add_equipment_to_map();
						});
					},
					function(){
						$this
						.button("reset");
					}
				)
				return false;
			})
			.end()
			.parent()
			.find("button.finish")
			.click(function(){
			plenty_admin.MAPS.infoWindow.close();
				return false;	
			})
			.end()
			.find("button.cancel")
			.click(function(){
				plenty_admin.MAPS.infoWindow.close();
				return false;	
			})
			.end()
			.find("button.newEquipment")
			.click(function(){
				plenty_admin.MAPS.infoWindowContent
				.parent()
				.find(".add_equipment_success_wrapper")
				.fadeOut("fast", function(){
					plenty_admin.MAPS.infoWindowContent
					.fadeIn("fast");
				});
				return false;	
			})
		});
		
		var clickPoint = new google.maps.LatLng(fieldData.rc_lat, fieldData.rc_lng);
		plenty_admin.MAPS.openInfoWindow(clickPoint, map);
	});
}

plenty_admin.MAPS.showEditFieldForm = function(fieldObj, map, polygon) {
	// Since this polygon has only one path, we can call getPath()
	// to return the MVCArray of LatLngs.
	console.log("showEditFieldForm", fieldObj, map);
	plenty_admin.MAPS.infoWindow = new google.maps.InfoWindow();
	plenty_admin.MAPS.polygonToEdit = polygon;
	var that = this;
	var MAPS = plenty_admin.MAPS;
	var originalPolyPath = [];
	function editFieldBoundary(){
		polygon
		.setOptions({
			editable: true
		});
		
		//hide edit form
		plenty_admin.MAPS.infoWindowContent
		.hide()
		.parent()
		.find(".editing_boundary")
		.show();
		
		//hide other polygons
		plenty_admin.MAPS.hide_polygons(plenty_admin.UI.map.filtered_field_polygons, polygon.id);
		
		//hide equipment
		plenty_admin.MAPS.hide_equipment(plenty_admin.MAPS.equipment_pins);
		
		plenty_admin.MAPS.edit_field_state = 1;
		
		return false;
	}
	function endEditFieldBoundary(){
		plenty_admin.MAPS.infoWindowContent
		.show()
		.parent()
		.find(".editing_boundary")
		.hide();
		
		//switch off editable
		polygon
		.setOptions({
			editable: false
		});
		
		//show polygons
		plenty_admin.MAPS.show_polygons(plenty_admin.UI.map.filtered_field_polygons, map);
		
		//show equipment
		plenty_admin.MAPS.show_equipment(plenty_admin.MAPS.equipment_pins, map);
		
		plenty_admin.MAPS.edit_field_state = 0;
	}
	
	polygon.getPath().getArray().forEach(function(point, p){
		originalPolyPath.push(new google.maps.LatLng(point.lat(), point.lng()));
	});
	
	$.get("ajax/edit-field-form.html", function(contentString){
		//store the returned html
		plenty_admin.MAPS.infoWindowContent = contentString;
		
		//when the infoWindow is ready, set up it's contents
		google.maps.event.addListener(plenty_admin.MAPS.infoWindow, 'domready', function(content){ 
			plenty_admin.MAPS.infoWindowContent = $(".edit_field_form_wrapper");
			var cropYearTable = plenty_admin.MAPS.infoWindowContent.find("table.cropYears");
			
			plenty_admin.REST.get_fieldCrops_order_by_year_descending(fieldObj.id, function(fieldData){
				console.log("get_field_order_by_year_descending: ", fieldData);
				
				var fieldCropsByYear = {};
				
				for(var f=0; f<fieldData.length; f++){
					fieldCrop = fieldData[f];
					fieldCropsByYear[parseInt(fieldCrop.year)] = fieldCrop;
				}
				
				fieldObj.cropsByYear = fieldCropsByYear;
			
				//populate all fields with the fieldObj
				plenty_admin.MAPS.infoWindowContent
				.find("input, textarea, checkbox, select")
				.filter(function() {
					return $(this).data('propname') != undefined;
				})
				.each(function(){
					$(this).val(fieldObj[$(this).data("propname")]);
				})
				.end()
				.end()
				.find(".btn.update-field")
				.click(function(){
					var $this = $(this);
					
					plenty_admin.MAPS.infoWindowContent
					.find("input, textarea, checkbox, select")
					.filter(function() {
						return $(this).data('propname') != undefined;
					})
					.each(function(){
						fieldObj[$(this).data("propname")] = $(this).val();
					});
					
					$(this).button("loading");
					
					fieldObj.latitude = polygonCenter.A;
					fieldObj.longitude = polygonCenter.F;
					fieldObj.farmId = parseInt(fieldObj.farmId);
					
					console.log("fieldObj:", fieldObj);
					
					var newFarmField = plenty_admin.MAPS.infoWindowContent.find("#edit_field_new_farm_name");
					
					if(newFarmField.val().length > 0){
						//add a new farm
						plenty_admin.REST.insertFarm.post({name:newFarmField.val()})
						.then(
						function(farm){
							var farm_body = farm.body();
							console.log("farmBody:", farm_body);
							//insert the field here
							fieldObj.farmId = farm_body.id;
							plenty_admin.UI.organization.updateX(fieldObj, "field", $(this), function(){
								plenty_admin.UI.organization.MODAL_edit_field.modal("hide");
							});
							
							if(plenty_admin.context === "settings"){
								//add field to the data set locally
								plenty_admin.DATA.data_source.farms.push(farm_body);
								plenty_admin.UI.updateBadges("farms", plenty_admin.DATA.data_source.farms.length);
							
							
								// add the new field to the table and to the data model
								var $farmTML = $(plenty_admin.UI.create_item(farm_body, "farms"));
								
								plenty_admin.UI.organization.DOM.find("table.farmsList")
								.find(".noItemsText")
								.remove()
								.end()
								.append($farmTML);
								
								plenty_admin.UI.organization.addItemFunctionality($farmTML);
							}else{
								//update the map
							}
						});
					}else{
						plenty_admin.UI.organization.updateX(fieldObj, "field", $(this), function(){
							plenty_admin.UI.organization.MODAL_edit_field.modal("hide");
						});
					}
					
					return false;
				})
				.end()
				.find(".btn.cancel")
				.click(function(){
					plenty_admin.MAPS.infoWindow.close();
					return false;
				})
				.end()
				.find(".btn.edit-boundary")
				.click(function(){
					//make polygon editable
					editFieldBoundary();
					
					// hide other polygons
					
					// hide equipment pins
					
					//center the polygon
					plenty_admin.MAPS.zoomToPolygon(polygon, map);
				})
				.end()
				.parent()
				.find(".btn.save-edited-boundary")
				.click(function(){
					var polygonBounds = polygon.getPath();
					var boundaryPointsArray = [];
					
					// Iterate over the polygonBounds vertices.
					polygonBounds.forEach(function(xy, i) {
						var boundaryPointObj = {};
						boundaryPointObj.seqNumber = i;
						boundaryPointObj.latitude = xy.lat();
						boundaryPointObj.longitude = xy.lng();
						boundaryPointsArray.push(boundaryPointObj);
					});
					
					var boundaryPointsDto = {
						fieldId: polygon.id,
						latLongPairs: boundaryPointsArray
					};
					
					console.log("boundaryPointsDto", boundaryPointsDto);
	
					plenty_admin.REST.updateBoundaryPointsArray.post(boundaryPointsDto).then(
						function(updatedBoundary){
							console.log("updatedBoundary: ", updatedBoundary().data);
							//show edit form
							endEditFieldBoundary();
						},
						function(err){
							bootbox.dialog({
								message: "Polygon Edits were not saved! - "+err.status+" - "+err.statusText,
								className: "danger",
								buttons: {
									danger: {
									  label: "OK",
									  className: "btn-danger",
									  callback: function(){
										 	plenty_admin.HELPER.hideLoadingOverlay();
											//show edit form
											polygon.setPaths(originalPolyPath);
											endEditFieldBoundary();
										}
									}
								}
							});
						}
					);
					
					return false;
				})
				.end()
				.find(".btn.cancel-editing-boundary")
				.click(function(){
					polygon.setPaths(originalPolyPath);
					
					//show edit form
					endEditFieldBoundary();
					
					return false;
				})
				.end()
				.end()
				.find(".showNewFarm")
				.click(function(){
					$(this)
					.hide()
					.parent()
					.find(".showExistingFarm")
					.show()
					.end()
					.closest(".form-group")
					.find(".newFarm")
					.show()
					.end()
					.find(".existingFarm")
					.hide();
					
					return false;
				})
				.end()
				.find(".showExistingFarm")
				.click(function(){
					$(this)
					.hide()
					.parent()
					.find(".showNewFarm")
					.show()
					.end()
					.closest(".form-group")
					.find(".existingFarm")
					.show()
					.end()
					.find(".newFarm")
					.hide();
					return false;
				})
				.end()
				.find("button.addCropYear")
				.click(function(){
					$(this)
					.hide()
					.parent()
					.find(".saveCropYear, .cancelCropYear")
					.show()
					.end()
					.closest(".tab-pane")
					.find("tr.new-crop-year")
					.show();
					return false;
				})
				.end()
				.find("button.cancelCropYear")
				.click(function(){
					$(this)
					.hide()
					.parent()
					.find(".saveCropYear")
					.hide()
					.end()
					.find(".addCropYear")
					.show()
					.end()
					.closest(".tab-pane")
					.find("tr.new-crop-year")
					.hide();
					return false;
				})
				.end()
				.find("button.saveCropYear")
				.click(function(e){
					//save the crop year for this field
					var fieldCropDto = {
						fieldId: fieldObj.id,
						cropTypeId: parseInt(plenty_admin.MAPS.infoWindowContent.find("#edit_field_crop_type option:selected").val()),
						irrigationTypeId: parseInt(plenty_admin.MAPS.infoWindowContent.find("#edit_field_irrigation_type option:selected").val()),
						tillageTypeId: parseInt(plenty_admin.MAPS.infoWindowContent.find("#edit_field_tillage_type option:selected").val()),
						year: plenty_admin.MAPS.infoWindowContent.find("#edit_field_crop_year option:selected").val(),
						growthMethodId: plenty_admin.MAPS.infoWindowContent.find("#edit_field_growthMethod_type option:selected").val()
					};
					
					
					plenty_admin.REST.fields.insertFieldCrop(fieldCropDto, function(fieldCrop){
						console.log("field crop inserted", fieldCrop);
						
						$(e.target)
						.hide()
						.parent()
						.find(".cancelCropYear")
						.hide()
						.end()
						.find(".addCropYear")
						.show()
						.end()
						.closest(".tab-pane")
						.find("tr.new-crop-year")
						.hide();
						
						var newCropYear = "<tr><td>"+fieldCrop.year+"</td>"+
											"<td>"+plenty_admin.DATA.cropTypes[fieldCrop.cropTypeId].name+"</td>"+
											"<td>"+plenty_admin.DATA.tillageTypes[fieldCrop.tillageTypeId].name+"</td>"+
											"<td>"+plenty_admin.DATA.irrigationTypes[fieldCrop.irrigationTypeId].name+"</td>"+
											"<td>"+plenty_admin.DATA.growthMethodTypes[fieldCrop.growthMethodId].name+"</td></tr>";
						cropYearTable
						.find("tbody .new-crop-year")
						.before(newCropYear);
					});
					return false;
				})
				
				//Set the options in the farms list
				var $farmList = plenty_admin.MAPS.infoWindowContent.find("#edit_field_farms");
				//clear current options
				$farmList
				.find("option")
				.remove();
				
				var farmOptionsHTML = "";
				for(var f=0; f<plenty_admin.DATA.data_source.farms.length; f++){
					var farm = plenty_admin.DATA.data_source.farms[f];
					farmOptionsHTML += "<option value='"+farm.id+"'>"+farm.name+"</option>";
				}
				
				$farmList.append(farmOptionsHTML);
				
				//populate crop / tillage / irrigation select lists
				var data_types = ["crop", "irrigation", "tillage", "growthMethod"];
				plenty_admin.UI.populate_type_lists(plenty_admin.MAPS.infoWindowContent, "edit_field", data_types);
				
				//populate the table of crop years already associated with this field
				var cropYearRowsHTML = "";
				for(year in fieldObj.cropsByYear){
					if(fieldObj.cropsByYear.hasOwnProperty(year)){
						console.log("fieldData.cropsByYear", fieldObj.cropsByYear, year, fieldObj.cropsByYear[year]);
						var cropYear = fieldObj.cropsByYear[year];
						var years = [2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005];
						
						cropYearRowsHTML += "<tr data-id='"+cropYear.id+"'><td class='editable' data-type='select' data-source='"+plenty_admin.UI.get_inline_editing_options(years)+"' data-name='year' data-pk='"+cropYear.id+"/fieldCrop/' data-title='Year'>"+year+"</td>"+
											"<td class='editable' data-type='select' data-source='"+plenty_admin.UI.get_inline_editing_options(plenty_admin.DATA.cropTypes)+"' data-name='cropTypeId' data-pk='"+cropYear.id+"/fieldCrop/"+cropYear.cropTypeId+"/"+cropYear.tillageTypeId+"/"+cropYear.irrigationTypeId+"/"+year+"/"+fieldObj.id+"' data-title='Year'>"+plenty_admin.DATA.cropTypes[cropYear.cropTypeId].name+"</td>"+
											"<td class='editable' data-type='select' data-source='"+plenty_admin.UI.get_inline_editing_options(plenty_admin.DATA.tillageTypes)+"' data-name='tillageTypeId' data-pk='"+cropYear.id+"/fieldCrop/"+cropYear.cropTypeId+"/"+cropYear.tillageTypeId+"/"+cropYear.irrigationTypeId+"/"+year+"/"+fieldObj.id+"' data-title='Tillage Type'>"+plenty_admin.DATA.tillageTypes[cropYear.tillageTypeId].name+"</td>"+
											"<td class='editable' data-type='select' data-source='"+plenty_admin.UI.get_inline_editing_options(plenty_admin.DATA.irrigationTypes)+"' data-name='irrigationTypeId' data-pk='"+cropYear.id+"/fieldCrop/"+cropYear.cropTypeId+"/"+cropYear.tillageTypeId+"/"+cropYear.irrigationTypeId+"/"+year+"/"+fieldObj.id+"' data-title='Irrigation Type'>"+plenty_admin.DATA.irrigationTypes[cropYear.irrigationTypeId].name+"</td>"+
											"<td class='editable' data-type='select' data-source='"+plenty_admin.UI.get_inline_editing_options(plenty_admin.DATA.growthMethodTypes)+"' data-name='growthMethodId' data-pk='"+cropYear.id+"/fieldCrop/"+cropYear.cropTypeId+"/"+cropYear.tillageTypeId+"/"+cropYear.irrigationTypeId+"/"+year+"/"+fieldObj.id+"' data-title='Growth Method'>"+plenty_admin.DATA.growthMethodTypes[cropYear.growthMethodId].name+"</td></tr>";
					}
				}
				//set inline editing as inline before setting up this window
				$.fn.editable.defaults.mode = 'inline';
				
				cropYearTable
				.find("tbody .new-crop-year")
				.before(cropYearRowsHTML)
				.end()
				.find(".editable")
				.editable(plenty_admin.REST.inline_editing_options);
			});
		
		});
		
		var polygonCenter = plenty_admin.MAPS.get_polygon_center(fieldObj.boundaries);
		
		plenty_admin.MAPS.openInfoWindow(polygonCenter, map);
	});
}

plenty_admin.MAPS.suggest_clu_field = function(area, map) {
	// Ask the user if they want to use the selected polygon
	//console.log("suggest_clu_field: ", area.latLngs.getArray()[0].getArray());
	plenty_admin.MAPS.infoWindow = new google.maps.InfoWindow();
	var that = this;
	var MAPS = plenty_admin.MAPS;
	var vertices = area.latLngs.getArray()[0].getArray();
	plenty_admin.MAPS.hide_clu_polygons(area);
	plenty_admin.MAPS.add_field_state = 1;
	plenty_admin.MAPS.selected_clu_polygon = area;
	//console.log("vertices: ", vertices);
	
	$.get("ajax/use-clu-field.html", function(contentString){
		//add functionality to the form inside the maps popup
		
		plenty_admin.MAPS.infoWindowContent = contentString;
		
		google.maps.event.addListener(plenty_admin.MAPS.infoWindow,'closeclick',function(){
		   plenty_admin.MAPS.infoWindow.close();
				plenty_admin.MAPS.add_field_state = 0;
				plenty_admin.MAPS.selected_clu_polygon = null;
				area
				.setOptions({
							strokeOpacity: 0,
							fillOpacity: 0
						});
						
				plenty_admin.MAPS.selectedPolygon.clu_mouseout = google.maps.event.addListener(area, "mouseout",function(){
					this.setOptions({
										strokeOpacity: 0,
										fillOpacity: 0
									});
				});
				
				if(plenty_admin.context === "map"){
					plenty_admin.MAPS.add_field_state = 1;
					plenty_admin.MAPS.hide_clu_polygons();
					
					plenty_admin.MAPS.addFieldUI
					.style.backgroundColor = '#fff';
					
					plenty_admin.MAPS.addFieldText
					.style.color = '#0094de';
					
					plenty_admin.UI.map.DOM
					.find(".addFieldMapCtrl div")
					.data("state", "off");
					//plenty_admin.MAPS.selected_clu_polygon.setMap(null);
					
					//show equipment
					plenty_admin.MAPS.show_equipment(plenty_admin.MAPS.equipment_pins, map);
				}else{
					plenty_admin.MAPS.show_clu_polygons();
				}
		});
		
		// Replace the info window's content and position.
		google.maps.event.addListener(plenty_admin.MAPS.infoWindow, 'domready', function(content){ 
			//populate the acres field
			plenty_admin.MAPS.infoWindowContent = $(".use_clu_field_options");
			
			//clear the mouseout event of the polygon while it is selected
			google.maps.event.clearListeners(area, "mouseout");
			
			//set up the add and cancel buttons
			plenty_admin.MAPS.infoWindowContent
			.find("button.yes")
			.click(function(){
				plenty_admin.MAPS.add_field_state = 2;
				$(this).button("loading");
				
				var fieldData = {
					boundaries:vertices,
					editable: true,
					isCoords: true,
					cluBoundaryId:area.id
				};
				
				console.log("fieldData", fieldData);
				
				var poly_events = {
					onMouseOver:function(){/*empty handler*/},
					onMouseOut: function(){/*empty handler*/},
					onEdit: function(event){
						MAPS.selectedPolygon.acreage = plenty_admin.MAPS.get_polygon_area(polygon);	
						var acresField = plenty_admin.MAPS.infoWindowContent.find("#add_field_acres");
						acresField.val(MAPS.selectedPolygon.acreage);
					}, 
					onClick: function(event){
						plenty_admin.MAPS.showAddFieldForm(polygon, event, map);
					}, //onClick handler
				};
				
				//copy the selected polygon to our map
				var polygon = plenty_admin.MAPS.draw_polygon(fieldData, poly_events, map);
				
				plenty_admin.MAPS.zoomToPolygon(polygon, map);
				//plenty_admin.MAPS.selected_clu_polygon.setMap(null);
				plenty_admin.MAPS.hide_clu_polygons();
				MAPS.selectedPolygon.acreage = plenty_admin.MAPS.get_polygon_area(polygon);	
				plenty_admin.MAPS.infoWindow.close();
				plenty_admin.MAPS.showAddFieldForm(polygon, event, map);
				
				// load the add field form into the popup
				return false;
			})
			.end()
			.find("button.no")
			.click(function(){
				plenty_admin.MAPS.infoWindow.close();
				plenty_admin.MAPS.add_field_state = 0;
				plenty_admin.MAPS.selected_clu_polygon = null;
				area
				.setOptions({
							strokeOpacity: 0,
							fillOpacity: 0
						});
						
				plenty_admin.MAPS.selectedPolygon.clu_mouseout = google.maps.event.addListener(area, "mouseout",function(){
					this.setOptions({
										strokeOpacity: 0,
										fillOpacity: 0
									});
				});
				
				if(plenty_admin.context === "map"){
					plenty_admin.MAPS.add_field_state = 1;
					plenty_admin.MAPS.hide_clu_polygons();
					
					plenty_admin.MAPS.addFieldUI
					.style.backgroundColor = '#fff';
					
					plenty_admin.MAPS.addFieldText
					.style.color = '#0094de';
					
					plenty_admin.UI.map.DOM
					.find(".addFieldMapCtrl div")
					.data("state", "off");
					//plenty_admin.MAPS.selected_clu_polygon.setMap(null);
				}else{
					plenty_admin.MAPS.show_clu_polygons();
				}
				
				return false;
			});
		}); 
		MAPS.selectedPolygon.centerPoint = plenty_admin.MAPS.get_polygon_center(vertices);
		plenty_admin.MAPS.openInfoWindow(MAPS.selectedPolygon.centerPoint, map);
	});
}

plenty_admin.MAPS.show_clu_polygons = function(except, map){
	//loop through the CLU boundaries on the map and set their map to null
	for(var b=0; b<plenty_admin.MAPS.clu_boundaries.length; b++){
		var boundary = plenty_admin.MAPS.clu_boundaries[b];
			boundary.setMap(map);
	}
}

plenty_admin.MAPS.hide_clu_polygons = function(except){
	//loop through the CLU boundaries on the map and set their map to null
	for(var b=0; b<plenty_admin.MAPS.clu_boundaries.length; b++){
		var boundary = plenty_admin.MAPS.clu_boundaries[b];
		if(!except){
			boundary.setMap(null);
		}else if(boundary.id !== except.id){
			boundary.setMap(null);
		}
	}
}

plenty_admin.MAPS.hide_polygons = function(polygons, except){
	//loop through the CLU boundaries on the map and set their map to null
	for(var b=0; b<polygons.length; b++){
		var poly = polygons[b];
		if(!except){
			poly.setMap(null);
		}else if(poly.id !== except){
			poly.setMap(null);
		}
	}
}

plenty_admin.MAPS.show_polygons = function(polygons, map){
	//loop through the CLU boundaries on the map and set their map to null
	for(var b=0; b<polygons.length; b++){
		var poly = polygons[b];
			poly.setMap(map);
	}
}

plenty_admin.MAPS.hide_equipment = function(equipment, except){
	//loop through the CLU boundaries on the map and set their map to null
	for(var b=0; b<equipment.length; b++){
		var equip = equipment[b];
		if(!except){
			equip.setMap(null);
		}else if(equip.id !== except){
			equip.setMap(null);
		}
	}
}

plenty_admin.MAPS.show_equipment = function(equipment, map){
	//loop through the CLU boundaries on the map and set their map to null
	for(var b=0; b<equipment.length; b++){
		var equip = equipment[b];
			equip.setMap(map);
	}
}

plenty_admin.MAPS.showAddFieldForm = function(area, event, map) {
	console.log("showAddFieldForm", area);
	// Since this polygon has only one path, we can call getPath()
	// to return the MVCArray of LatLngs.
	var vertices = area.getPaths();
	plenty_admin.MAPS.infoWindow = new google.maps.InfoWindow();
	var that = this;
	var MAPS = plenty_admin.MAPS;
	var dm = MAPS.drawingManager;
	MAPS.selectedPolygon.polygon = area;
	
	$.get("ajax/add-field-form.html", function(contentString){
		//add functionality to the form inside the maps popup
		
		plenty_admin.MAPS.infoWindowContent = contentString;
		
		// Replace the info window's content and position.
		google.maps.event.addListener(plenty_admin.MAPS.infoWindow, 'domready', function(content){ 
			//populate the acres field
			plenty_admin.MAPS.infoWindowContent = $(".add_field.add_to_org_form");
			acresField = plenty_admin.MAPS.infoWindowContent.find("#add_field_acres");
			acresField.val(MAPS.selectedPolygon.acreage);
			
			// get zip code of last point of polygon
			MAPS.geocoder.geocode({'latLng': MAPS.selectedPolygon.centerPoint}, function(results, status) {
				console.log("reverse geo: ", results, status);
				if (status == google.maps.GeocoderStatus.OK) {
				  if (results[0]) {
					//map.setZoom(11);
					var centerPointZIP = results[0].address_components[results[0].address_components.length-1].long_name;
					//populate the acres field
					postcodeField = plenty_admin.MAPS.infoWindowContent.find("#add_field_postalCode");
					postcodeField.val(centerPointZIP);
				  } else {
					console.warn('No reverse geo results found');
				  }
				} else {
				  console.warn('Geocoder failed due to: ' + status);
				}
			  });
			
			
			//set up the add and cancel buttons
			plenty_admin.MAPS.infoWindowContent
			.find(".add-field")
			.click(function(){
				var fieldObj = {};
				var newFarmField = plenty_admin.MAPS.infoWindowContent.find("#add_field_new_farm_name");
				
				function showFieldAddedSuccess(){
					//set the content of the infoWindow
					plenty_admin.MAPS.infoWindowContent
					.parent()
					.parent()
					.find(".btn.finish")
					.click(function(){
						plenty_admin.MAPS.infoWindow.close();
						switch(plenty_admin.context){
							case "map":
								plenty_admin.MAPS.selectedPolygon.polygon.setMap(null);
								plenty_admin.MAPS.selectedPolygon.polygon = null;
								plenty_admin.MAPS.add_field_state = 1;
								plenty_admin.MAPS.hide_clu_polygons();
								
								plenty_admin.MAPS.addFieldUI
								.style.backgroundColor = '#fff';
								
								plenty_admin.MAPS.addFieldText
								.style.color = '#0094de';
								
								plenty_admin.UI.map.DOM
								.find(".addFieldMapCtrl div")
								.data("state", "off");
							break;
							
							case "settings":
								plenty_admin.UI.organization.MODAL_add_field
								.modal("hide");
							break;
						}
						return false;
					})
					.end()
					.find(".btn.newField")
					.click(function(){
						plenty_admin.MAPS.infoWindow.close();
						plenty_admin.MAPS.selectedPolygon.polygon.setMap(null);
						plenty_admin.MAPS.selectedPolygon.polygon = null;
						plenty_admin.MAPS.show_clu_polygons(map);
						plenty_admin.MAPS.add_field_state = 0;
						
						plenty_admin.MAPS.selected_clu_polygon
						.setOptions({
									strokeOpacity: 0,
									fillOpacity: 0
								});
								
						google.maps.event.addListener(plenty_admin.MAPS.selected_clu_polygon, "mouseout",function(){
							this.setOptions({
												strokeOpacity: 0,
												fillOpacity: 0
											});
						});
						plenty_admin.MAPS.selected_clu_polygon = null;
						return false;
					})
					.end()
					.find(".add_field_form_wrapper")
					.fadeOut("fast", function(){
						plenty_admin.MAPS.infoWindowContent
						.parent()
						.parent()
						.find(".add_field_success_wrapper")
						.fadeIn("fast");
					})
				}
				
				plenty_admin.MAPS.infoWindowContent
				.find("input, textarea, checkbox, select")
				.filter(function() {
					return $(this).data('propname') != undefined;
				})
				.each(function(){
					fieldObj[$(this).data("propname")] = ($(this).val() && $(this).val() != undefined ? $(this).val() : 1);
				});
				
				$(this).button("loading");
				
				fieldObj.latitude = MAPS.selectedPolygon.centerPoint.A;
				fieldObj.longitude = MAPS.selectedPolygon.centerPoint.F;
				
				if(area.cluBoundaryId > -1){
					fieldObj.cluBoundaryId = area.cluBoundaryId;
				}
				
				console.log("fieldObj:", fieldObj);
				
				console.log("newFarmField:", newFarmField, newFarmField.val().length);

				if(newFarmField.val().length > 0){
					//add a new farm
					plenty_admin.REST.insertFarm.post({name:newFarmField.val()})
					.then(
						function(farm){
							var farm_body = farm.body();
							console.log("farmBody:", farm_body);
							
							//insert the field here
							fieldObj.farmId = parseInt(farm_body.id);
							plenty_admin.REST.fields.insertFieldWithInterestAndBoundaryPoints(fieldObj, 100, showFieldAddedSuccess);
							
							//add field to the data set locally
							plenty_admin.DATA.data_source.farms.push(farm_body);
							
							if(plenty_admin.context === "settings"){
								plenty_admin.UI.updateBadges("farms", plenty_admin.DATA.data_source.farms.length);
								
									// add the new field to the table and to the data model
								var $farmTML = $(plenty_admin.UI.create_item(farm_body, "farms"));
								
								plenty_admin.UI.organization.DOM
								.find("table.farmsList")
								.find(".noItemsText")
								.remove()
								.end()
								.append($farmTML);
								
								plenty_admin.UI.organization.addItemFunctionality($farmTML);
							}else{
								//update the map
								if(plenty_admin.context === "map"){
									plenty_admin.DATA.update_filters(function(returned_filters){
										//console.log("filters updated: ", returned_filters, returned_filters.body());
										plenty_admin.DATA.userFilters = returned_filters.body();
									}, null, false);
								}
							}
						}
					);
				}else{
					//use existing farm
					plenty_admin.REST.fields.insertFieldWithInterestAndBoundaryPoints(fieldObj, 100, showFieldAddedSuccess);
				}
				return false;
			})
			.end()
			.find(".cancel")
			.click(function(){
				plenty_admin.MAPS.infoWindow.close();
				plenty_admin.MAPS.selectedPolygon.polygon.setMap(null);
				plenty_admin.MAPS.selectedPolygon.polygon = null;
				plenty_admin.MAPS.show_clu_polygons(map);
				plenty_admin.MAPS.add_field_state = 0;
				
				plenty_admin.MAPS.selected_clu_polygon
				.setOptions({
							strokeOpacity: 0,
							fillOpacity: 0
						});
						
				google.maps.event.addListener(plenty_admin.MAPS.selected_clu_polygon, "mouseout",function(){
					this.setOptions({
										strokeOpacity: 0,
										fillOpacity: 0
									});
				});
				plenty_admin.MAPS.selected_clu_polygon = null;
				
				if(plenty_admin.context === "map"){
					plenty_admin.MAPS.add_field_state = 1;
					plenty_admin.MAPS.hide_clu_polygons();
					
					plenty_admin.MAPS.addFieldUI
					.style.backgroundColor = '#fff';
					
					plenty_admin.MAPS.addFieldText
					.style.color = '#0094de';
					
					plenty_admin.UI.map.DOM
					.find(".addFieldMapCtrl div")
					.data("state", "off");
					//plenty_admin.MAPS.selected_clu_polygon.setMap(null);
					
					//show equipment
					plenty_admin.MAPS.show_equipment(plenty_admin.MAPS.equipment_pins, map);
				}else{
					plenty_admin.MAPS.show_clu_polygons(map);
				}

				return false;
			})
			.end()
			.find(".showNewFarm")
			.click(function(){
				$(this)
				.hide()
				.parent()
				.find(".showExistingFarm")
				.show()
				.end()
				.closest(".form-group")
				.find(".newFarm")
				.show()
				.end()
				.find(".existingFarm")
				.hide();
				
				return false;
			})
			.end()
			.find(".showExistingFarm")
			.click(function(){
				$(this)
				.hide()
				.parent()
				.find(".showNewFarm")
				.show()
				.end()
				.closest(".form-group")
				.find(".existingFarm")
				.show()
				.end()
				.find(".newFarm")
				.hide();
				return false;
			})
			
			//Set the options in the farms list
			var $farmList = plenty_admin.MAPS.infoWindowContent.find("#add_field_farms");
			//clear current options
			$farmList
			.find("option")
			.remove();
			
			var farmOptionsHTML = "";
			for(var f=0; f<plenty_admin.DATA.data_source.farms.length; f++){
				var farm = plenty_admin.DATA.data_source.farms[f];
				farmOptionsHTML += "<option value='"+farm.id+"'>"+farm.name+"</option>";
			}
			
			$farmList.append(farmOptionsHTML);
			
			if(plenty_admin.DATA.data_source.farms.length <= 0){
				plenty_admin.MAPS.infoWindowContent
				.find(".showNewFarm")
				.trigger("click");
			}
			
			//set up the list of organizations
			if(plenty_admin.DATA.data_source.organizations){
				var orgOptionsHTML = "";
				for(var o=0; o<plenty_admin.DATA.data_source.organizations.length; o++){
					var org = plenty_admin.DATA.data_source.organizations[o];
					orgOptionsHTML += "<option value='"+org.id+"'>"+org.name+"</option>";
				}
			}else{
				orgOptionsHTML += "<option value='"+plenty_admin.DATA.data_source.id+"'>"+plenty_admin.DATA.data_source.name+"</option>";
			}
			var $orgList = plenty_admin.MAPS.infoWindowContent.find("#add_field_org_interest");
			$orgList.append(orgOptionsHTML);
			
			//populate the data type fields
			var data_types = ["crop", "irrigation", "tillage"];
			
			for(var d=0; d<data_types.length; d++){
				//set up the list of crop types
				if(plenty_admin.DATA[data_types[d]+"Types"]){
					var optionsHTML = "";
					//for(var o=0; o<plenty_admin.DATA[data_types[d]+"Types"].length; o++){
					for(id in plenty_admin.DATA[data_types[d]+"Types"]){
						if(plenty_admin.DATA[data_types[d]+"Types"].hasOwnProperty(id)){
							var el = plenty_admin.DATA[data_types[d]+"Types"][id];
							optionsHTML += "<option value='"+id+"'>"+el.name+"</option>";
						}
					}
				}
				
				var $elList = plenty_admin.MAPS.infoWindowContent.find("#add_field_"+data_types[d]);
				$elList.append(optionsHTML);
			}
			
			if(plenty_admin.DATA.growthMethods){
				var optionsHTML = "";
				//for(var o=0; o<plenty_admin.DATA[data_types[d]+"Types"].length; o++){
				for(id in plenty_admin.DATA.growthMethods){
					if(plenty_admin.DATA.growthMethods.hasOwnProperty(id)){
						var el = plenty_admin.DATA.growthMethods[id];
						optionsHTML += "<option value='"+id+"'>"+el.name+"</option>";
					}
				}
			}
			
			var $elList = plenty_admin.MAPS.infoWindowContent.find("#add_field_growthMethod");
			$elList.append(optionsHTML);
		
			if(plenty_admin.context === "map" && $orgList.find("option").length > 1){
				$orgList
				.closest(".form-group").show();
			}else{
				$orgList
				.find("option:eq(0)").prop("selected", true);
			}
		}); 
		 
		plenty_admin.MAPS.openInfoWindow(MAPS.selectedPolygon.centerPoint, map);
	});
}

plenty_admin.MAPS.remove_all_polygons = function(polygons){
	//loop through the field boundaries on the map and set their map to null
	for(var b=0; b<polygons.length; b++){
		var boundary = polygons[b];
		//console.log("boundary", boundary);
		boundary.removePolygon();
	}
}

plenty_admin.MAPS.location_search = function(map, target) {
	var setup_map_search = function(){
		var input = (document.getElementById('pac-input'));
		
		var types = document.getElementById('type-selector');
		
		var tools = document.getElementById('map_search_tools');
		
		map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
		map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);
		
		var autocomplete = new google.maps.places.Autocomplete(input);
		autocomplete.bindTo('bounds', map);
		
		// var infowindow = new google.maps.InfoWindow();
		// var marker = new google.maps.Marker({
		//	map: map,
		//	anchorPoint: new google.maps.Point(0, -29)
		// });
		
		google.maps.event.addListener(autocomplete, 'place_changed', function() {
		//infowindow.close();
		//marker.setVisible(false);
		var place = autocomplete.getPlace();
		if (!place.geometry) {
			bootbox.dialog({
							message: "Autocomplete's returned place contains no geometry",
							className: "warning",
							buttons: {
								danger: {
								  label: "OK",
								  className: "btn-warning",
								  callback: plenty_admin.HELPER.hideLoadingOverlay
								}
							}
						});
			return;
		}
		
		// If the place has a geometry, then present it on a map.
		if (place.geometry.viewport) {
			map.fitBounds(place.geometry.viewport);
		} else {
			map.setCenter(place.geometry.location);
			map.setZoom(17);  // Why 17? Because it looks good.
		}
		/*
		marker.setIcon(({
		url: place.icon,
		size: new google.maps.Size(71, 71),
		origin: new google.maps.Point(0, 0),
		anchor: new google.maps.Point(17, 34),
		scaledSize: new google.maps.Size(35, 35)
		}));
		
		marker.setPosition(place.geometry.location);
		marker.setVisible(true);
		*/
		
		var address = '';
		if (place.address_components) {
			address = [
				(place.address_components[0] && place.address_components[0].short_name || ''),
				(place.address_components[1] && place.address_components[1].short_name || ''),
				(place.address_components[2] && place.address_components[2].short_name || '')
			].join(' ');
		}
		
		//infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
		//infowindow.open(map, marker);
		});
		
		// Sets a listener on a radio button to change the filter type on Places
		// Autocomplete.
		function setupClickListener(id, types) {
			var radioButton = document.getElementById(id);
			google.maps.event.addDomListener(radioButton, 'click', function() {
				autocomplete.setTypes(types);
			});
		}
		
		setupClickListener('changetype-all', []);
		setupClickListener('changetype-address', ['address']);
		setupClickListener('changetype-establishment', ['establishment']);
		setupClickListener('changetype-geocode', ['geocode']);
		
		$(tools).fadeIn("fast");
	}
	
	if($('#map_search_tools').length === 0){
		$.get("ajax/map-search-ui.html", function(mapSearchUI){
			target
			.prepend(mapSearchUI);
		
			setup_map_search();
		});
	}else{
		setup_map_search();
	}
}

plenty_admin.MAPS.polygon_tooltip = function(){
	var id = 'tt';
	var top = 3;
	var left = 3;
	var maxw = 300;
	var speed = 10;
	var timer = 20;
	var endalpha = 95;
	var alpha = 0;
	var tt,t,c,b,h;
	var ie = document.all ? true : false;
	return{
		show:function(v,w){
			if(tt == null){
				tt = document.createElement('div');
				tt.setAttribute('id',id);
				t = document.createElement('div');
				t.setAttribute('id',id + 'top');
				c = document.createElement('div');
				c.setAttribute('id',id + 'cont');
				b = document.createElement('div');
				b.setAttribute('id',id + 'bot');
				tt.appendChild(t);
				tt.appendChild(c);
				tt.appendChild(b);
				document.body.appendChild(tt);
				tt.style.opacity = 0;
				tt.style.filter = 'alpha(opacity=0)';
				document.onmousemove = this.pos;
			}
			tt.style.display = 'block';
			c.innerHTML = v;
			tt.style.width = w ? w + 'px' : 'auto';
			if(!w && ie){
				t.style.display = 'none';
				b.style.display = 'none';
				tt.style.width = tt.offsetWidth;
				t.style.display = 'block';
				b.style.display = 'block';
			}
			if(tt.offsetWidth > maxw){tt.style.width = maxw + 'px'}
			h = parseInt(tt.offsetHeight) + top;
			clearInterval(tt.timer);
			tt.timer = setInterval(function(){plenty_admin.MAPS.polygon_tooltip.fade(1)},timer);
		},
		pos:function(e){
			var u = ie ? event.clientY + document.documentElement.scrollTop : e.pageY;
			var l = ie ? event.clientX + document.documentElement.scrollLeft : e.pageX;
			tt.style.top = (u - h) + 'px';
			tt.style.left = (l + left) + 'px';
		},
		fade:function(d){
			var a = alpha;
			if((a != endalpha && d == 1) || (a != 0 && d == -1)){
				var i = speed;
				if(endalpha - a < speed && d == 1){
					i = endalpha - a;
				}else if(alpha < speed && d == -1){
					i = a;
				}
				alpha = a + (i * d);
				tt.style.opacity = alpha * .01;
				tt.style.filter = 'alpha(opacity=' + alpha + ')';
			}else{
				clearInterval(tt.timer);
				if(d == -1){tt.style.display = 'none'}
			}
		},
		hide:function(){
			clearInterval(tt.timer);
			tt.timer = setInterval(function(){plenty_admin.MAPS.polygon_tooltip.fade(-1)},timer);
		}
	};
}();
//*********************** settings.js **************************//
// send the user back to the login page if they have no auth token
if(!store.get("basicAuth")){
	//window.location = "http://admin.plenty.rdthree.com/";
}

// check if user should be forced to enter unique credentials
var setCreds = plenty_admin.HELPER.getParameterByName('setCreds');
if(setCreds){
	$('#setCreds').modal("show");
}

plenty_admin.UI.main = {};
plenty_admin.UI.main.DOM = $("#main-panel");
plenty_admin.UI.settings = {};
plenty_admin.UI.settings.organization = {};
plenty_admin.UI.settings.DOM = plenty_admin.UI.main.DOM.find("#settings");
plenty_admin.UI.currentScreen = plenty_admin.UI.settings.DOM;
plenty_admin.UI.settings.new_organization = plenty_admin.UI.settings.DOM.find(".newOrgContainer");

plenty_admin.UI.settings.init = function(){
	//store a ref to the organization items:
	plenty_admin.UI.settings.organizations = plenty_admin.UI.settings.DOM.find(".organizations");
	
	var orgId = Object.keys(plenty_admin.DATA.organizations)[0];
	
	var tabFromURL = plenty_admin.HELPER.getParameterByName("t");
	
	var hash = (tabFromURL ? "#"+tabFromURL : "#farms");			
	
	//set the current screen
	plenty_admin.UI.currentScreen = plenty_admin.UI.organization.DOM;
	
	plenty_admin.DATA.eventCollector = window.eventcollector(8, 10000);
	plenty_admin.REST.getCropTypes();
	plenty_admin.REST.getTillageTypes();
	plenty_admin.REST.getIrrigationTypes();
	plenty_admin.REST.getActivityTypes();
	plenty_admin.REST.getSkillTypes();
	plenty_admin.REST.getProductTypes();
	plenty_admin.REST.getAllProducts();
	plenty_admin.REST.getEquipmentEquipmentTypes();
	
	plenty_admin.DATA.eventCollector.on('done', function(fired, total, data) {
	  console.log('event %d of %d emitted', fired, total);
	  console.log('event description:', data);
	});
	plenty_admin.DATA.eventCollector.on('alldone', function(total) {
		//build the organization panel
		plenty_admin.UI.organization.init(plenty_admin.DATA.organizations[orgId], hash);
	});
	
};

$( document ).on( "organization_data_ready", function( event, orgs ) {
	plenty_admin.UI.settings.init();
});
//*********************** field.js **************************//
//create namespace for field layout
plenty_admin.UI.field = {
	DOM: $("#field-container"),
	weatherTabs:		{},
	assetTabs:	{},
	
	renderedGraphs: [],
	
	/* Set the start / End date ranges temporaraly until we get some real activity dates */
	dates: {
		start:	null,
		end:		null
	},
	
	hasLayout: false,
	
	init: function(fieldObj, context){
		console.log("plenty_admin.UI.field.init", fieldObj);
		plenty_admin.UI.field.fieldObj = fieldObj;
		//fieldObj.boundaries = polyPath;
		switch(context){
			case "settings":
				plenty_admin.HELPER.showLoadingOverlay("Loading", "Field");
	  
				  plenty_admin.UI.field.DOM.attrchange({
					trackValues: true,
					callback: function (event) { 
						if(
							event.newValue.indexOf("opacity") > -1 
						){
							var opacity = Math.round(parseFloat(event.newValue.slice(9)));
							if(opacity > .999 && !plenty_admin.UI.field.hasLayout){
								//field layout has been shown
								plenty_admin.UI.field.fitFieldLayout("fit");
								console.log("attr changed: ", event.attributeName, event.newValue);
							}
						}else if(event.newValue.indexOf("display") > -1 && event.newValue.indexOf("none") > -1){
							//field has been hidden, clear settings on body
							console.log("attr changed: ", event.attributeName, event.newValue);
							plenty_admin.UI.field.fitFieldLayout("clear");
						}
					}        
				});
	
				plenty_admin.UI.currentScreen
				.fadeOut("normal", function(){
					plenty_admin.UI.currentScreen = plenty_admin.UI.field.DOM;
					plenty_admin.UI.field.populate(fieldObj);
					plenty_admin.UI.field.polygon = null;
					plenty_admin.MAPS.draw_field_on_map(fieldObj, "field_map", {
						mapTypeId: google.maps.MapTypeId.HYBRID,
						zoom:  12,
						disableDefaultUI: true,
						draggable: false, 
						zoomControl: false, 
						scrollwheel: false, 
						disableDoubleClickZoom: true
					  }, function(map, fieldObj, polygon){
						plenty_admin.UI.field.polygon = polygon;
						//ensure if the window changes size the field is centered
						$(window).on("resize",function(){
							plenty_admin.MAPS.zoomToPolygon(polygon, plenty_admin.MAPS.map);
						});
					}, false, "map");
					
					plenty_admin.UI.currentScreen.fadeIn("normal");
				});
			break;
			
			case "map":
				plenty_admin.UI.currentScreen
				.closest(".fill-area")
				.fadeOut("normal", function(){
					plenty_admin.UI.currentScreen = plenty_admin.UI.field.DOM;
					plenty_admin.UI.field.populate(fieldObj);
					plenty_admin.UI.field.polygon = null;
					
					plenty_admin.UI.currentScreen
					.addClass("fill-area-content flexbox-item-grow")
					plenty_admin.UI.currentScreen.fadeIn("normal", function(){
						plenty_admin.MAPS.draw_field_on_map(fieldObj, "field_map", {
							mapTypeId: google.maps.MapTypeId.HYBRID,
							zoom:  12,
							disableDefaultUI: true,
							draggable: false, 
							zoomControl: false, 
							scrollwheel: false, 
							disableDoubleClickZoom: true
						  }, function(map, fieldObj, polygon){
							plenty_admin.UI.field.polygon = polygon;
							//ensure if the window changes size the field is centered
							$(window).on("resize", function(){
								plenty_admin.MAPS.zoomToPolygon(polygon, plenty_admin.MAPS.map);
							});
							plenty_admin.MAPS.zoomToPolygon(polygon, plenty_admin.MAPS.map);
							
						}, false, "map");
					});
				})
				.parent()
				.find(".filter_controls")
				.fadeOut("fast");
			break;
		}
	},
	
	clear: function(){
		//destroy all graphs
		for(var g=0; g<plenty_admin.UI.field.renderedGraphs.length; g++){
			var graph = plenty_admin.UI.field.renderedGraphs[g];
			graph.destroy();
		}
		
		plenty_admin.UI.field.renderedGraphs = [];
		plenty_admin.UI.field.tempGraph = null;
		plenty_admin.UI.field.moistureGraph = null;
		plenty_admin.UI.field.precipGraph = null;
		plenty_admin.UI.field.gddGraph = null;
		
		//clear weatherEvents
		plenty_admin.UI.field.DOM
		.find(".weatherEvents")
		.each(function(){
			$(this)
			.find(".event")
			.remove();
		});
		
		//clear activities
		if(plenty_admin.UI.field.activityTimelineContainer){
			plenty_admin.UI.field.activityTimelineContainer
			.find(".activity")
			.remove();
		}
		
		//clear activities
		if(plenty_admin.UI.field.activityListContainer){
			plenty_admin.UI.field.activityListContainer
			.find(".activity")
			.remove();
		}
		
		//clear equipment
		if(plenty_admin.UI.field.equipmentListContainer){
			plenty_admin.UI.field.equipmentListContainer
			.find(".equipment")
			.remove();
		}
		
		//clear crop surveys
		if(plenty_admin.UI.field.cropSurveysContainer){
			plenty_admin.UI.field.cropSurveysContainer
			.find(".cropSurvey")
			.remove();
		}
		
		//clear the finance graph legend
		plenty_admin.UI.field.financesGraphEl
		.parent()
		.parent()
		.parent()
		.find(".legend")
		.find(".legendItem")
		.remove();
		
		//clear the finance values
		plenty_admin.UI.field.DOM
		.find(".topLine")
		.find(".profit, .cost, .revenue")
		.text("");
		
		if(plenty_admin.UI.field.financesGraph){
			plenty_admin.UI.field.financesGraph.destroy();
		}
	},
	
	fitFieldLayout: function(state){
		switch (state){
			case "fit":
				$("body")
				.height($(window).height())
				.css({"overflow":"hidden"});
				
				plenty_admin.UI.field.DOM
				.height($(window).height() - ($(".navbar").height() + $("footer.footer").height()));
				plenty_admin.UI.field.hasLayout = true;
			break;
			
			case "clear":
				$("body")
				.removeAttr("style");
				
				plenty_admin.UI.field.DOM
				.prop("style", "");
				plenty_admin.UI.field.hasLayout = false;
			break;
		}
	},
	
	populate: function(fieldObj){
		plenty_admin.REST.get_fieldCrops_order_by_year_descending(fieldObj.id, function(fieldData){
			console.log("get_field_order_by_year_descending: ", fieldData);
			
			var fieldCropsByYear = {};
			
			for(var f=0; f<fieldData.length; f++){
				fieldCrop = fieldData[f];
				fieldCropsByYear[parseInt(fieldCrop.year)] = fieldCrop;
			}
			
			console.log("fieldCropsByYear", fieldCropsByYear);
			
			plenty_admin.UI.field.field_year_slider = plenty_admin.UI.field.DOM.find(".field_year_slider");
			
			console.log("plenty_admin.UI.field.field_year_slider", plenty_admin.UI.field.field_year_slider.slider, typeof plenty_admin.UI.field.field_year_slider.slider);
			
			plenty_admin.UI.field.field_year_slider
			.slider({
				min: parseInt(fieldData[fieldData.length-1].year),
				max: parseInt(fieldData[0].year),
				value: parseInt(fieldData[0].year),
				//tooltip: "show",
				formatter: function(value){
					return value+" - "+plenty_admin.DATA.cropTypes[fieldCropsByYear[parseInt(value)].cropTypeId].name;
				}
			}) //set up tooltip to show year and crop for that year
			.off("slide")
			.on("slide", function(){
				//console.log("SLIDER SLIDE");
			})
			.off("slideStart")
			.on("slideStart", function(e){
				console.log("SLIDER SLIDESTART: ", $(this), e, e.target);
			})
			.off("slideStop")
			.on("slideStop", function(){
				console.log("SLIDER SLIDESTOP");
			})
			.off("change")
			.on("change", function(e){
				console.log("SLIDER CHANGE", e.value.newValue);
				//get initial activities for this crop Id
				var cropYear = fieldCropsByYear[e.value.newValue];
				var cropName = plenty_admin.DATA.cropTypes[cropYear.cropTypeId].name;
				
				//console.log("cropYear:", cropYear);
				//console.log("cropName:", cropName);
				plenty_admin.UI.field.clear();
				
				plenty_admin.UI.field.update_field_year(fieldObj.id, cropYear);
				
				plenty_admin.UI.field.DOM
				.find(".current_year_crop")
				.text(e.value.newValue+" - "+plenty_admin.DATA.cropTypes[cropYear.cropTypeId].name);
				
				plenty_admin.UI.field.polygon.setOptions({fillColor: plenty_admin.MAPS.legendItems[cropName].colour, strokeColor: plenty_admin.MAPS.legendItems[cropName].colour});
			});
			
			//set up finance dohnut graph when switching asset tabs
			plenty_admin.UI.field.assetTabs.DOM
			.off("shown.bs.tab")
			.on('shown.bs.tab', function (e) {
				var url = e.target.href;
				var hash = url.substring(url.indexOf('#'));
				console.log("changed: ", hash);
				
				if(hash === "#finances"){
					if(plenty_admin.UI.field.financesGraph){
						plenty_admin.UI.field.financesGraph.destroy();
					}
					plenty_admin.UI.field.renderActivityFinancesGraph();
				}
			});
			
			//set up graph update when switching weather tab
			plenty_admin.UI.field.weatherTabs.DOM
			.off("shown.bs.tab")
			.on('shown.bs.tab', function (e) {
				var url = e.target.href;
				var hash = url.substring(url.indexOf('#'));
				console.log("changed: ", hash);
				plenty_admin.UI.field.updateWeatherGraph(hash);
			});
			
			plenty_admin.UI.field.update_field_year(fieldObj.id, fieldCropsByYear[parseInt(plenty_admin.UI.field.field_year_slider.slider('getValue'))]);
			
			plenty_admin.UI.field.DOM
			.find(".current_year_crop")
			.text(plenty_admin.UI.field.field_year_slider.slider('getValue')+" - "+plenty_admin.DATA.cropTypes[fieldCropsByYear[parseInt(plenty_admin.UI.field.field_year_slider.slider('getValue'))].cropTypeId].name);
		});
	},
	
	updateWeatherGraph: function(hash){
		var graph = "";
		
		switch(hash){
			case "#temp":
				//create the temp graph object if it does not yet exist
				if(!plenty_admin.UI.field.tempGraph){
					plenty_admin.UI.field.currentGraph = plenty_admin.UI.field.renderTempGraph();
				}else{
					plenty_admin.UI.field.currentGraph = plenty_admin.UI.field.tempGraph;
				}
				graph = "tempGraph";
			break;
			
			case "#moisture":
				//create the moisture graph object if it does not yet exist
				if(!plenty_admin.UI.field.moistureGraph){
					plenty_admin.UI.field.currentGraph = plenty_admin.UI.field.renderMoistureGraph();
				}else{
					plenty_admin.UI.field.currentGraph = plenty_admin.UI.field.moistureGraph;
				}
				graph = "moistureGraph";
			break;
			
			case "#precip":
				//create the moisture graph object if it does not yet exist
				if(!plenty_admin.UI.field.precipGraph){
					plenty_admin.UI.field.currentGraph = plenty_admin.UI.field.renderPrecipGraph();
				}else{
					plenty_admin.UI.field.currentGraph = plenty_admin.UI.field.precipGraph;
				}
				graph = "precipGraph";
			break;
			
			case "#gdd":
				//create the moisture graph object if it does not yet exist
				if(!plenty_admin.UI.field.gddGraph){
					plenty_admin.UI.field.currentGraph = plenty_admin.UI.field.renderGDDGraph();
				}else{
					plenty_admin.UI.field.currentGraph = plenty_admin.UI.field.gddGraph;
				}
				graph = "gddGraph";
			break;
		}
		
		//set width of dom element that offsets the weather events and activities
		var keyOffsetElement = plenty_admin.UI.field.DOM.find(".keyOffset");
		
		try{
			keyOffsetElement.width(plenty_admin.UI.field.currentGraph.datasets[0].points[0].x);
			plenty_admin.UI.field.positionToday(plenty_admin.UI.field.activitiesForCropType[0].startTime);
			//plenty_admin.UI.field.buildChartZoomer();
		}catch(err){
			console.error("something failed: ", err);
			bootbox.dialog({
								message: "Not enough activities (minimum of 2) to create weather graphs. Their start and end dates are calculated from the begining of the first, and the end of the last event.", 
								className: "danger",
								buttons: {
									danger: {
									  label: "OK",
									  className: "btn-danger",
									  callback: plenty_admin.HELPER.hideLoadingOverlay,
									}
								}
							});
		}
		
		plenty_admin.UI.field.renderWeatherEvents(plenty_admin.UI.field.weatherDays.weatherEvents.precip, "precip");
		plenty_admin.UI.field.renderWeatherEvents(plenty_admin.UI.field.weatherDays.weatherEvents.temp, "temp");
		plenty_admin.UI.field.renderWeatherEvents(plenty_admin.UI.field.weatherDays.weatherEvents.wind, "wind");
	
		plenty_admin.UI.field.scaleScale(plenty_admin.UI.field[graph+"El"]);
	},
	
	update_field_year: function (fieldId, cropYear){
		console.log("update_field_year", fieldId, cropYear);
		plenty_admin.HELPER.showLoadingOverlay("Loading", "Equipment");
		plenty_admin.REST.get_field_equipments_with_fieldId(fieldId, function(fieldEquipment){
			console.log("get_field_equipments_with_fieldId", fieldEquipment);
			plenty_admin.UI.field.renderEquipment(fieldEquipment);
		});
		
		//pull in activities once weatherDays have loaded	
		plenty_admin.REST.get_activities_by_field_crop_order_by_desc(cropYear.id, function(activitiesForCropType){
			console.log("get_activities_by_field_crop_order_by_desc", activitiesForCropType, activitiesForCropType.length);
			
			plenty_admin.UI.field.activitiesForCropType = activitiesForCropType;
			
			if(activitiesForCropType.length <= 0){
				bootbox.dialog({
								message: "No activities for this field - can not render weather graphs without at least 2 activities.", 
								className: "danger",
								buttons: {
									danger: {
									  label: "OK",
									  className: "btn-danger",
									  callback: plenty_admin.HELPER.hideLoadingOverlay
									}
								}
							});
				return;
			}
			
			var startDate = plenty_admin.HELPER.formatJavaDate(activitiesForCropType[0].startTime);
			plenty_admin.UI.field.dates.start = 	startDate.obj.getUTCFullYear()+
												"-"+
												((startDate.obj.getUTCMonth()+1) < 10 ? "0"+(startDate.obj.getUTCMonth()+1) : (startDate.obj.getUTCMonth()+1))+
												"-"+
												(startDate.obj.getUTCDate() < 10 ? "0"+startDate.obj.getUTCDate() : startDate.obj.getUTCDate())+
												" "+
												((startDate.obj.getUTCHours()) < 10 ? "0"+(startDate.obj.getUTCHours()) : (startDate.obj.getUTCHours()+1))+
												":"+
												(startDate.obj.getUTCMinutes() < 10 ? "0"+startDate.obj.getUTCMinutes() : startDate.obj.getUTCMinutes());
			
			
			var endDate = plenty_admin.HELPER.formatJavaDate(activitiesForCropType[activitiesForCropType.length -1].endTime);
			plenty_admin.UI.field.dates.end = 	endDate.obj.getUTCFullYear()+
												"-"+
												((endDate.obj.getUTCMonth()+1) < 10 ? "0" + (endDate.obj.getUTCMonth()+1) : (endDate.obj.getUTCMonth()+1))+
												"-"+
												(endDate.obj.getUTCDate() < 10 ? "0"+endDate.obj.getDate() : endDate.obj.getUTCDate())+
												" "+
												((endDate.obj.getUTCHours()) < 10 ? "0"+(endDate.obj.getUTCHours()) : (endDate.obj.getUTCHours()+1))+
												":"+
												(endDate.obj.getUTCMinutes() < 10 ? "0"+endDate.obj.getUTCMinutes() : endDate.obj.getUTCMinutes());
			
			console.log("plenty_admin.UI.field.dates: ", plenty_admin.UI.field.dates);
			
			//prepare all data type lists and wait till they've loaded
			plenty_admin.DATA.eventCollector = window.eventcollector(3, 10000);
			plenty_admin.REST.getActivityTypes();
			
			plenty_admin.REST.get_weather_days_with_dateRange(fieldId, plenty_admin.UI.field.dates.start, plenty_admin.UI.field.dates.end, function(weatherDays){
				console.log("get_weather_days_with_dateRange", weatherDays);
				
				plenty_admin.UI.field.weatherDays = {
						dates: [],
						months: [],
						labels: [],
						allLabels: [],
						weatherEvents: {
							precip: [],
							temp: [],
							wind: []
						}
				}
				
				var millisecondsPerDay = 24 * 60 * 60 * 1000;
				var lastWeatherDayDate = weatherDays[weatherDays.length-1].date;
				var lastActivityDate = activitiesForCropType[activitiesForCropType.length -1].endTime;

				
				for(var wO = 0; wO < weatherDays.length; wO++){
					weatherOb = weatherDays[wO];
					var obTime = plenty_admin.HELPER.formatJavaDate(weatherOb.date);
					
					//create labelling sets for graphs
					plenty_admin.UI.field.weatherDays.labels.push(obTime.date);
					plenty_admin.UI.field.weatherDays.allLabels.push(obTime.date);
					
					//process existing weather days
					for(prop in weatherOb){
						if(weatherOb.hasOwnProperty(prop)){
							//console.log("prop:", prop);
							if(prop === "weatherEvents"){
								if(!plenty_admin.UI.field.weatherDays[prop]){
									plenty_admin.UI.field.weatherDays[prop] = [];
								}
								for(var w=0; w<weatherOb[prop].length; w++){
									var wEvent = weatherOb[prop][w];
									wEvent.weatherDayDate = obTime;
									wEvent.dayIndex = wO;
									
									switch(wEvent.type){
										case "HIGH_TEMP":
											wEvent.iconClass = "wi wi-hot";
											plenty_admin.UI.field.weatherDays[prop].temp.push(wEvent);
										break;
										
										case "FREEZE":
											wEvent.iconClass = "wi wi-thermometer-exterior";
											plenty_admin.UI.field.weatherDays[prop].temp.push(wEvent);
										break;
										
										case "SNOW":
											wEvent.iconClass = "wi wi-snow-wind";
											plenty_admin.UI.field.weatherDays[prop].precip.push(wEvent);
										break;
										case "RAIN":
											wEvent.iconClass = "wi wi-rain";
											plenty_admin.UI.field.weatherDays[prop].precip.push(wEvent);
										break;
										
										case "HIGH_WINDS":
											wEvent.iconClass = "wi wi-strong-wind";
											plenty_admin.UI.field.weatherDays[prop].wind.push(wEvent);
										break;
									}
								}
							}else if(prop === "moisture"){
								if(!plenty_admin.UI.field.weatherDays[prop]){
									plenty_admin.UI.field.weatherDays[prop] = {};
								}
								//console.log("how many depths? :", prop, weatherOb[prop].length);
								for(var w=0; w<weatherOb[prop].length; w++){
									var moistureDepth = weatherOb[prop][w];
									//console.log("moisture depth: ", w, moistureDepth);
									if(!plenty_admin.UI.field.weatherDays.moisture[moistureDepth.depth]){
										plenty_admin.UI.field.weatherDays.moisture[moistureDepth.depth] = {};
									}
									
									plenty_admin.UI.field.weatherDays.moisture[moistureDepth.depth][wO] = moistureDepth.moisture;
								}
							}else if(prop === "cropSurvey"){
								if(!plenty_admin.UI.field.weatherDays["cropSurvey"]){
									plenty_admin.UI.field.weatherDays["cropSurvey"] = [];
								}
								if(weatherOb["cropSurvey"]){
									plenty_admin.UI.field.weatherDays["cropSurvey"].push(weatherOb["cropSurvey"]);
								}
							}else{
								if(!plenty_admin.UI.field.weatherDays[prop]){
									plenty_admin.UI.field.weatherDays[prop] = [];
								}
								plenty_admin.UI.field.weatherDays[prop].push(weatherOb[prop]);
							}
						}
						
						plenty_admin.UI.field.weatherDays.length = weatherDays.length;
					}
				}
				
				console.log("plenty_admin.UI.field.weatherDays:", plenty_admin.UI.field.weatherDays);
				
				//update the graph in the currently visible tab
				var selectedGraph = plenty_admin.UI.field.weatherTabs.DOM.find(".nav-tabs li.active a").prop("href")
				var hash = selectedGraph.substring(selectedGraph.indexOf('#'));
				var graph = "";
				switch(hash){
					case "#temp":
						plenty_admin.UI.field.currentGraph = plenty_admin.UI.field.renderTempGraph();
						graph = "tempGraph";
					break;
					
					case "#moisture":
						plenty_admin.UI.field.currentGraph = plenty_admin.UI.field.renderMoistureGraph();
						graph = "moistureGraph";
					break;
					
					case "#precip":
						plenty_admin.UI.field.currentGraph = plenty_admin.UI.field.renderPrecipGraph();
						graph = "precipGraph";
					break;
					
					case "#gdd":
						plenty_admin.UI.field.currentGraph = plenty_admin.UI.field.renderGDDGraph();
						graph = "gddGraph";
					break;
				}
				
				//set width of dom element that offsets the weather events and activities
				var keyOffsetElement = plenty_admin.UI.field.DOM.find(".keyOffset");
				
				try{
					keyOffsetElement.width(plenty_admin.UI.field.currentGraph.datasets[0].points[0].x);
				}catch(err){
					bootbox.dialog({
								message: "Not enough activities (minimum of 2) to create weather graphs. Their start and end dates are calculated from the begining of the first, and the end of the last event.", 
								className: "danger",
								buttons: {
									danger: {
									  label: "OK",
									  className: "btn-danger",
									  callback: plenty_admin.HELPER.hideLoadingOverlay
									}
								}
							});
				}
				
				plenty_admin.UI.field.scaleScale(plenty_admin.UI.field[graph+"El"]);
				
				plenty_admin.UI.field.renderWeatherEvents(plenty_admin.UI.field.weatherDays.weatherEvents.precip, "precip");
				plenty_admin.UI.field.renderWeatherEvents(plenty_admin.UI.field.weatherDays.weatherEvents.temp, "temp");
				plenty_admin.UI.field.renderWeatherEvents(plenty_admin.UI.field.weatherDays.weatherEvents.wind, "wind");
				
				//ensure if the window changes size the weather events are refitted
				$(window).on("resize",function(){
					plenty_admin.UI.field.renderWeatherEvents(plenty_admin.UI.field.weatherDays.weatherEvents.precip, "precip");
					plenty_admin.UI.field.renderWeatherEvents(plenty_admin.UI.field.weatherDays.weatherEvents.temp, "temp");
					plenty_admin.UI.field.renderWeatherEvents(plenty_admin.UI.field.weatherDays.weatherEvents.wind, "wind");
					
					plenty_admin.UI.field.scaleScale(plenty_admin.UI.field[graph+"El"]);
				});
				
				plenty_admin.DATA.eventCollector.done("event 1");
			});
			
			plenty_admin.REST.get_activity_finances_for_date_range(cropYear.id, plenty_admin.UI.field.dates.start, plenty_admin.UI.field.dates.end, function(fieldCropActivityFinances){
				console.log("get_activity_finances_for_date_range", fieldCropActivityFinances());
				plenty_admin.UI.field.fieldCropActivityFinances = fieldCropActivityFinances();
				plenty_admin.DATA.eventCollector.done("event 2");
			});
			
			plenty_admin.DATA.eventCollector.on('alldone', function(total) {
				plenty_admin.UI.field.renderActivities(activitiesForCropType);
				console.log("all data gathered: ", plenty_admin.UI.field.dayWidth);
				plenty_admin.UI.field.renderCropSurveys(plenty_admin.UI.field.weatherDays.cropSurvey);
				
				//ensure if the window changes size the activities are refitted
				$(window).on("resize",function(){
					plenty_admin.UI.field.renderActivities(activitiesForCropType);
					plenty_admin.UI.field.renderCropSurveys(plenty_admin.UI.field.weatherDays.cropSurvey);
				});
				
				plenty_admin.UI.field.renderActivityFinancesGraph();
				
				plenty_admin.HELPER.hideLoadingOverlay();
			});	
		});
	},
	
	renderWeatherEvents: function(events, hash){
		plenty_admin.UI.field.weatherEventsContainer = plenty_admin.UI.field.DOM.find(".tab-content .weatherEvents."+hash);
		
		//remove any existing events
		plenty_admin.UI.field.weatherEventsContainer
		.find(".event")
		.remove();
		
		for(var e=0; e<events.length; e++){
			var wE = events[e];
			var leftPos = ((parseInt(plenty_admin.UI.field.weatherEventsContainer.width()) / plenty_admin.UI.field.weatherDays.length)*wE.dayIndex)-8;
			
			if(leftPos < 0){
				leftPos = 0;
			}
			
			var uom = "";
			switch(hash){
				case "temp":
					uom = "℉";
				break;
				
				case "precip":
					uom = '"';
				break;
				
				case "wind":
					uom = "mph";
				break;
			}
			var weatherEventHTML = $("<div class='event' data-toggle='tooltip' data-placement='top' title='"+(wE.detail ? wE.detail : wE.deatil)+": "+wE.amount.toFixed(2)+uom+"' style='left:"+leftPos+"px'><i class='"+wE.type+" "+wE.iconClass+"'></i></div>");
			
			weatherEventHTML
			.tooltip({container:"body"});
			
			plenty_admin.UI.field.weatherEventsContainer.append(weatherEventHTML);
		}
	},
	
	getActivityIconClass: function(activityTypeId){
		console.log("getActivityIconClass", activityTypeId);
		var iconClass = null;
		switch(activityTypeId){
				case 1:
				case "SoilTest":
					iconClass = "pif pif-soil-test";
				break;
				
				case 2:
				case "StarterFertilizer":
				case "LateFertilizer":
					iconClass = "pif pif-fertilizer";
				break;
				
				case 3:
				case "Tilling":
					iconClass = "pif pif-tilling";
				break;
				
				case 4:
				case "Planting":
					iconClass = "pif pif-planting";
				break;
				
				case 5:
				case "EarlyNitrogen":
					iconClass = "pif pif-early-nitrogen";
				break;
				
				case 6:
				case "LateNitrogen":
					iconClass = "pif pif-late-nitrogen";
				break;
				
				case 7:
				case "PestControl":
					iconClass = "pif pif-pest-control";
				break;
				
				case 8:
				case "Harvest":
					iconClass = "pif pif-harvest";
				break;
			}
			
			return iconClass;
	},
	
	renderCropSurveys: function(cropSurveys){
		plenty_admin.UI.field.cropSurveysContainer = plenty_admin.UI.field.DOM.find(".tab-content .cropSurveys");
		
		//remove any existing events
		plenty_admin.UI.field.cropSurveysContainer
		.find(".cropSurvey")
		.remove();
		
		for(var e=0; e<cropSurveys.length; e++){
			var cS = cropSurveys[e];
			cS.startOffsetDays = Math.round(plenty_admin.HELPER.daydiff(plenty_admin.UI.field.activitiesForCropType[0].startTime, cS.observationTime));
			
			var leftPos = plenty_admin.UI.field.dayWidth*cS.startOffsetDays -17; //days from the beginning - half the width of a crop survey icon
			
			if(leftPos < 0){
				leftPos = 0;
			}
			
			if(leftPos > plenty_admin.UI.field.cropSurveysContainer.width()){
				leftPos = plenty_admin.UI.field.cropSurveysContainer.width() - 34;
			}
			
			var uom = "UOMId-"+cS.countUOMId;
			
			var tooltip = [
							"cropHeight: "+cS.cropHeight+"<br>",
							"cropTypeId: "+cS.cropTypeId+"<br>",
							"growthMethodId: "+cS.growthMethodId+"<br>",
							"growthStageId: "+cS.growthStageId,
						].join("");
			
			var cropSurveyHTML = $("<div class='cropSurvey alert alert-warning' data-toggle='tooltip' data-placement='top' title='"+tooltip+"' style='left:"+leftPos+"px'><i class='fa fa-file-text'></i><img class='growthStageImg' src=''/></div>");
			
			cropSurveyHTML
			.off("click")
			.on("click", function(){
				plenty_admin.UI.crop_survey.show(cS, plenty_admin.UI.field.fieldObj);
				return false;
			})
			.tooltip({
						container:"body",
						html:true
					});
			
			//get the crop stage image for this crop survey
			plenty_admin.REST.fields.getGrowthStageFile(cS.growthStageId, cropSurveyHTML, function(growthStageImageString, _cropSurveyHTML){
				//create a container for the image
				_cropSurveyHTML
				.find("img.growthStageImg")
				.prop("src", "data:image/jpeg;base64,"+growthStageImageString);
				//position it behind the crop survey element
				plenty_admin.UI.field.cropSurveysContainer.append(_cropSurveyHTML);
			});
		}
	},
	
	renderActivities: function(activities, timelineOnly){
		plenty_admin.UI.field.activityTimelineContainer = plenty_admin.UI.field.DOM.find(".activitiesTimeline .activities");
		plenty_admin.UI.field.activityListContainer = plenty_admin.UI.field.DOM.find(".field_asset_data .tab-content #activities-list tbody");
		
		//clear activity timeline
		plenty_admin.UI.field.activityTimelineContainer
		.add(plenty_admin.UI.field.activityListContainer)
		.find(".activity")
		.remove();
		
		var activityDays = Math.round(plenty_admin.HELPER.daydiff(activities[0].startTime, activities[activities.length-1].endTime));
		plenty_admin.UI.field.dayWidth = parseInt(plenty_admin.UI.field.activityTimelineContainer.width()) / plenty_admin.UI.field.weatherDays.length;
		var hourWidth = plenty_admin.UI.field.dayWidth /24;
		
		
		console.log("activityDays", plenty_admin.UI.field.dayWidth, hourWidth);
		
		if(activities.length === 0){
			console.warn("could not calculate weatherDay width as weatherDays is empty");
			bootbox.dialog({
					message: "Could not calculate weatherDay witdh - there are no weatherDays being returned.", 
					className: "danger",
					buttons: {
						danger: {
						  label: "OK",
						  className: "btn-danger",
						  callback: plenty_admin.HELPER.hideLoadingOverlay,
						}
					}
				});
				
			return;
		}
		
		for(var a=0; a<activities.length; a++){
			var activity = activities[a];
			
			activity.iconClass = plenty_admin.UI.field.getActivityIconClass(activity.activityTypeId);
			
			activity.startDate = plenty_admin.HELPER.formatJavaDate(activity.startTime);
			activity.endDate = plenty_admin.HELPER.formatJavaDate(activity.endTime);
			activity.startOffsetDays = Math.round(plenty_admin.HELPER.daydiff(activities[0].startTime, activity.startTime));
			
			//console.log("activity", activity);
	
			var leftPos = plenty_admin.UI.field.dayWidth*activity.startOffsetDays;
			var eventWidth = Math.round(hourWidth*activity.durationInHours);
			
			//console.log("eventWidth: ", eventWidth);
			
			if(eventWidth < 26){
				eventWidth = 26;
			}
			
			if(leftPos < 0){
				leftPos = 0;
			}
			
			if(leftPos + eventWidth > plenty_admin.UI.field.activityTimelineContainer.width()){
				leftPos = plenty_admin.UI.field.activityTimelineContainer.width() - eventWidth;
			}
			
			var activityHTML = $("<div class='activity' data-toggle='tooltip' data-placement='top' title='"+plenty_admin.UI.field.getActivityTooltipTitle(activity)+"' style='left:"+leftPos+"px; width:"+eventWidth+"px'><i class='"+plenty_admin.DATA.activityTypes[activity.activityTypeId].name.toLowerCase().replace(/ /g, "")+" "+activity.iconClass+"'></i></div>");
			
			var activityFinances = $.grep(plenty_admin.UI.field.fieldCropActivityFinances.activityFinances, function(activityFinance, a){
				return activityFinance.activityDto.id === activity.id;
			});
				
			activityHTML
			.tooltip({
				html:true,
				container:"body"
			})
			.data("activity", activity)
			.data("activityFinance", activityFinances[0])
			.click(function(){
				plenty_admin.UI.field.show_activity_modal($(this).data("activity"), $(this).data("activityFinance").taskFinances, $(this));
			});
			
			plenty_admin.UI.field.activityTimelineContainer.append(activityHTML);
			
			if(!timelineOnly){
				//build the activity list item
				var activityItem = [
						"<tr class='activity pointer'>",
							"<td width='5%'>",
								"<i class='"+activity.iconClass+"'></i>",
							"</td>",
							"<td width='25%'>",
								activity.state,
							"</td>",
							"<td width='25%'>",
								plenty_admin.DATA.activityTypes[activity.activityTypeId].name,
							"</td>",
							"<td width='20%'>",
								activity.startDate.date,
							"</td>",
							"<td width='20%'>",
								plenty_admin.HELPER.daysFromHours(activity.durationInHours),
							"</td>",
							"<td width='20%' class='text-right'>",
								numeral(activity.cost).format('$0,0.00'),
							"</td>",
						"</tr>"
				].join("");
				
				var $activityItem = $(activityItem);
	
				$activityItem
				.data("activity", activity)
				.data("activityFinance", activityFinances[0])
				.click(function(){
					plenty_admin.UI.field.show_activity_modal($(this).data("activity"), $(this).data("activityFinance").taskFinances, $(this));
				});
				
				plenty_admin.UI.field.activityListContainer.append($activityItem);
			}
		}
		
		var keyOffsetElements = plenty_admin.UI.field.DOM.find(".keyOffset");
		keyOffsetElements.width(plenty_admin.UI.field.currentGraph.datasets[0].points[0].x);
		
		plenty_admin.UI.field.positionToday(activities[0].startTime);
		//plenty_admin.UI.field.buildChartZoomer();
	},
	
	positionToday: function(startTime){
		var $futureDays = plenty_admin.UI.field.DOM.find(".futureDays");
		var $todayLabel = plenty_admin.UI.field.DOM.find(".todayLabel");
		
		var pastDays = Math.round(plenty_admin.HELPER.daydiff(startTime, new Date().getTime()));
		console.log("pastDays", pastDays);
		
		var fdKeyOffset = $futureDays.parent().find(".keyOffset");
		
		if(pastDays > 0){
			//var pastDaysWidth = plenty_admin.UI.field.dayWidth * pastDays;
			var pastDaysWidth = plenty_admin.UI.field.currentGraph.datasets[0].points[pastDays].x;
			console.log("pastDaysWidth", pastDaysWidth);
			
			fdKeyOffset
			.animate({width: pastDaysWidth});
			
			$todayLabel
			.css({
				right: - ($todayLabel.width()/2)
			});
			
			$futureDays
			.parent()
			.css({
				height: Math.round(plenty_admin.UI.field.currentGraph.scale.endPoint),
				bottom: Math.round(plenty_admin.UI.field.currentGraph.scale.height - plenty_admin.UI.field.currentGraph.scale.endPoint)
			})
			.fadeIn("fast");
		}else{
			$futureDays
			.parent()
			.hide();
		}
	},
	buildChartZoomer: function(){
		var $zoomInLayer = plenty_admin.UI.field.DOM.find(".zoomInLayer");
		console.log("buildChartZoomer", $zoomInLayer, plenty_admin.UI.field.currentGraph.scale);
		$zoomInLayer
		.css({
			height: Math.round(plenty_admin.UI.field.currentGraph.scale.endPoint),
			bottom: Math.round(plenty_admin.UI.field.currentGraph.scale.height - plenty_admin.UI.field.currentGraph.scale.endPoint)
		})
		.on("click", function(e){
			console.log("chartZoomer", $(this), e);
			var zoomInCtrl = $(this).find(".zoomInControl");
			var offset = $(this).offset();
			var ctrlPosition = e.pageX - offset.left - (zoomInCtrl.width()/2)
			
			zoomInCtrl
			.css({left:ctrlPosition})
			.fadeIn("fast");
		});
	},
	renderEquipment: function(equipment){
		plenty_admin.UI.field.equipmentListContainer = plenty_admin.UI.field.DOM.find(".field_asset_data .tab-content #equipment tbody");
		
		console.log("equipmentListContainer", plenty_admin.UI.field.equipmentListContainer);
		for(var a=0; a<equipment.length; a++){
			var equipmentObject = equipment[a]/*.equipmentDto*/;
			
			if(equipmentObject.fieldEquipmentDto === null){
				continue;
			}
			//console.log("equipmentObject", equipmentObject);
			
			//build the activity list item
			var equipmentItemHTML = [
					"<tr class='equipment pointer'>",
						"<td width='5%'>",
							"<i class='pif pif-"+equipmentObject.equipmentTypeIds[0].name.toLowerCase().replace(/ /g, "-")+"'></i>",
						"</td>",
						"<td width='25%'>",
							equipmentObject.equipmentTypeIds[0].name,
						"</td>",
						"<td width='30%'>",
							plenty_admin.DATA.brandTypes[equipmentObject.brandId].name,
						"</td>",
						"<td width='25%'>",
							equipmentObject.name,
						"</td>",
					"</tr>"
			].join("");
			
			var $equipmentItemHTML = $(equipmentItemHTML);
			$equipmentItemHTML
			.data("equipmentObject", equipmentObject)
			.on("click", function(){
				plenty_admin.UI.field.show_equipment_modal($(this).data("equipmentObject"));
			});
			
			plenty_admin.UI.field.equipmentListContainer.append($equipmentItemHTML);
			
			//add equipment pins to field map
			//get a google latlng object for each element
			var latlng = new google.maps.LatLng(equipmentObject.latitude, equipmentObject.longitude);
			
			equipmentObject.latlng = latlng;
			
			var pinEvents = {
				onMouseOver: function(event){ //mouseover event
					//console.log("hover marker: ", this, $(this.markerContent_));
					$(this.markerContent_)
					.find(".marker")
					.addClass("hover");
					
					$(this.markerWrapper_)
					.css({
						zIndex:10
					});
					
					plenty_admin.MAPS.polygon_tooltip.show("<strong>"+equipmentObject.name+"</strong>");
				}, 
				onMouseOut: function(event){ //mouseout event
					$(this.markerContent_)
					.find(".marker")
					.removeClass("hover");
					
					$(this.markerWrapper_)
					.css({
						zIndex:1
					});
					
					plenty_admin.MAPS.polygon_tooltip.hide();
				}, 
				onClick: function(event){ //click event
					//event.stopPropagation();
					plenty_admin.UI.field.show_equipment_modal(equipmentObject);
				}
			}
			//draw the pin on the map
			plenty_admin.MAPS.draw_pin(equipmentObject, pinEvents, plenty_admin.MAPS.map);
		}
	},

	getActivityTooltipTitle: function(activity){
		var title = plenty_admin.DATA.activityTypes[activity.activityTypeId].name+
					"<br/>"+
					activity.startDate.fullDate+
					"<br/>"+
					"$"+
					numeral(activity.cost).format('$0,0.00');
					
		console.log("activity tooltip title:", title);
		return title;
	},

	renderTempGraph: function(){
		var tempGraphData = {
				labels: plenty_admin.UI.field.weatherDays.labels,
				datasets: [
					{
						label: "Min",
						fillColor: "rgba(142,220,244,0.2)",
						strokeColor: "rgba(142,220,244,1)",
						pointColor: "rgba(108,202,224,1)",
						pointStrokeColor: "#fff",
						pointHighlightFill: "#fff",
						pointHighlightStroke: "rgba(142,220,244,1)",
						data: plenty_admin.UI.field.weatherDays.minTemp
					},
					{
						label: "Max",
						fillColor: "rgba(249,216,110,0.2)",
						strokeColor: "rgba(249,216,110,1)",
						pointColor: "rgba(239,193,63,1)",
						pointStrokeColor: "#fff",
						pointHighlightFill: "#fff",
						pointHighlightStroke: "rgba(249,216,110,1)",
						data: plenty_admin.UI.field.weatherDays.maxTemp
					}
				]
			};
			
			
			var tempGraphOptions = {
				multiTooltipTemplate: "<%= datasetLabel %>: <%=numeral(value).format('0,0.0')%>℉",
				pointHitDetectionRadius:0,
				scaleLabel: plenty_admin.UI.field.yAxisPadder
			};
			
			var helpers = Chart.helpers;
			
			if(plenty_admin.UI.field.tempGraph){
				plenty_admin.UI.field.tempGraph.destroy();
			}
			
			plenty_admin.UI.field.weatherDays.labels = plenty_admin.UI.field.weatherDays.allLabels.slice();
			
			plenty_admin.UI.field.tempGraph = new Chart(plenty_admin.UI.field.tempGraphEl.get(0).getContext("2d")).LineAlt(tempGraphData, tempGraphOptions);
			plenty_admin.UI.field.tempGraph.datasetId = "temp"; 
			plenty_admin.UI.field.renderedGraphs.push(plenty_admin.UI.field.tempGraph);
			
			return plenty_admin.UI.field.tempGraph;
	},
	
	scaleScale: function(graphEl){
		console.log("graphEl", graphEl);
		var scaleWidth = graphEl.width();
		var scaleHeight = graphEl.height();
			
		graphEl
		.parent()
		.find("svg.scale")
		.prop("viewBox", "0 0 "+scaleWidth+" "+plenty_admin.UI.field.currentGraph.scale.endPoint)
		.width(scaleWidth - plenty_admin.UI.field.currentGraph.datasets[0].points[0].x)
		.height(plenty_admin.UI.field.currentGraph.scale.endPoint)
		.css({"left": plenty_admin.UI.field.currentGraph.datasets[0].points[0].x})
		.fadeIn("fast");
	},

	renderMoistureGraph: function(){
		//create dynamic moisture datasets
		var datasets = [];
		var index = 0;
		var palette = new Rainbow();
		palette.setSpectrum("#0076b2", "#93b222", "#788912");
		palette.setNumberRange(0, Object.keys(plenty_admin.UI.field.weatherDays.moisture).length);
		
		//for(var m=0; m<plenty_admin.UI.field.weatherDays.moisture.length; m++){
		for(depth in plenty_admin.UI.field.weatherDays.moisture){
			if(plenty_admin.UI.field.weatherDays.moisture.hasOwnProperty(depth)){
				//console.log("colour: ", index, depth);
				var moistureDepth = plenty_admin.UI.field.weatherDays.moisture[depth];
				var depthDays = [];
				//loop through all days in range and create full data set for moisture dats
				for(var d=0; d<plenty_admin.UI.field.weatherDays.length; d++){
					if(moistureDepth[d]){
						depthDays.push(moistureDepth[d]);
					}else{
						if(index == 0){
							depthDays.push(0);
						}
					}
				}
				
				var colour = plenty_admin.HELPER.hexToRgb("#"+palette.colourAt(index));
				var label = depth.toString();
				var dataset = {
					label: label+"mm",
					fillColor: "rgba("+colour.r+","+colour.g+","+colour.b+",0.2)", //define
					strokeColor: "rgba("+colour.r+","+colour.g+","+colour.b+",1)", //define
					pointColor: "rgba("+colour.r+","+colour.g+","+colour.b+",1)", //define
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba("+plenty_admin.HELPER.hexToRgb("#"+palette.colourAt(index))+",1)",
					data: depthDays
				};
				datasets.push(dataset);
				index +=1;
			}
		}
		
		//console.log("moisture datasets: ", datasets);
		
		var moistureGraphData = {
				labels: plenty_admin.UI.field.weatherDays.labels,
				datasets: datasets
			};
			
			var moistureGraphOptions = {
				multiTooltipTemplate: "<%= datasetLabel %>: <%=numeral(value).format('0,0.00')%>cb",
				pointHitDetectionRadius: 0,
				animation:false,
				scaleLabel: plenty_admin.UI.field.yAxisPadder
			};
			
			if(plenty_admin.UI.field.moistureGraph){
				plenty_admin.UI.field.moistureGraph.destroy();
			}
			
			plenty_admin.UI.field.weatherDays.labels = plenty_admin.UI.field.weatherDays.allLabels.slice();
			
			plenty_admin.UI.field.moistureGraph = new Chart(plenty_admin.UI.field.moistureGraphEl.get(0).getContext("2d")).LineAlt(moistureGraphData, moistureGraphOptions);
			plenty_admin.UI.field.moistureGraph.datasetId = "moisture";
			plenty_admin.UI.field.renderedGraphs.push(plenty_admin.UI.field.moistureGraph);
			
			return plenty_admin.UI.field.moistureGraph;
	},

	renderPrecipGraph: function(){
		var precipGraphData = {
				labels: plenty_admin.UI.field.weatherDays.labels,
				datasets: [
					{
						label: "Precipitation",
						fillColor: "rgba(136,242,201,0.2)",
						strokeColor: "rgba(136,242,201,1)",
						pointColor: "rgba(97,226,174,1)",
						pointStrokeColor: "#fff",
						pointHighlightFill: "#fff",
						pointHighlightStroke: "rgba(136,242,201,1)",
						data: plenty_admin.UI.field.weatherDays.percipTotalToToday
					}
				]
			};
			
			var precipGraphOptions = {
				//tooltipTemplate: "<%=label%>: <%=numeral(value).format('0,0.00')%>\"",
				tooltipTemplate: "<%= label %>: <%= Math.round(value) %>",
				pointHitDetectionRadius: 0,
				scaleLabel: plenty_admin.UI.field.yAxisPadder
			};
			
			if(plenty_admin.UI.field.precipGraph){
				plenty_admin.UI.field.precipGraph.destroy();
			}
			
			plenty_admin.UI.field.weatherDays.labels = plenty_admin.UI.field.weatherDays.allLabels.slice();
			
			plenty_admin.UI.field.precipGraph = new Chart(plenty_admin.UI.field.precipGraphEl.get(0).getContext("2d")).LineAlt(precipGraphData, precipGraphOptions);
			plenty_admin.UI.field.precipGraph.datasetId = "precipAmt";
			plenty_admin.UI.field.renderedGraphs.push(plenty_admin.UI.field.precipGraph);
			
			return plenty_admin.UI.field.precipGraph;
	},
	yAxisPadder: function(object){
		//console.log("value length: ", object.value, object.value.length, 12-object.value.length);
		var maxSpaces = 9;
		var addedSpace = "";
		var extraSpaces = maxSpaces-object.value.length;
		for(var s=0; s<extraSpaces; s++){
			addedSpace += " ";
		}
		return addedSpace + object.value;
	},
	renderGDDGraph: function(){
		var GDDGraphData = {
				labels: plenty_admin.UI.field.weatherDays.labels,
				datasets: [
					{
						label: "GDD",
						fillColor: "rgba(185,244,146,0.2)",
						strokeColor: "rgba(185,244,146,1)",
						pointColor: "rgba(150,234,96,1)",
						pointStrokeColor: "#fff",
						pointHighlightFill: "#fff",
						pointHighlightStroke: "rgba(185,244,146,1)",
						data: plenty_admin.UI.field.weatherDays.gddTotalToToday
					}
				]
			};
			
			var GDDGraphOptions = {
				tooltipTemplate: "<%= label %>: <%= Math.round(value) %>",
				pointHitDetectionRadius: 0,
				scaleLabel: plenty_admin.UI.field.yAxisPadder
			};
			
			if(plenty_admin.UI.field.gddGraph){
				plenty_admin.UI.field.gddGraph.destroy();
			}
			
			plenty_admin.UI.field.weatherDays.labels = plenty_admin.UI.field.weatherDays.allLabels.slice();
			
			plenty_admin.UI.field.gddGraph = new Chart(plenty_admin.UI.field.gddGraphEl.get(0).getContext("2d")).LineAlt(GDDGraphData, GDDGraphOptions);
			plenty_admin.UI.field.gddGraph.datasetId = "gddTotalToToday";
			
			plenty_admin.UI.field.gddGraphEl
			.onclick = function(evt){
				var activePoints = myLineChart.getPointsAtEvent(evt);
				console.log("graph clicked: ", activePoints);
				// => activePoints is an array of points on the canvas that are at the same position as the click event.
			};
			
			plenty_admin.UI.field.renderedGraphs.push(plenty_admin.UI.field.gddGraph);
			
			return plenty_admin.UI.field.gddGraph;
	},

	renderActivityFinancesGraph: function(){
		var finances = plenty_admin.UI.field.fieldCropActivityFinances;
		//holder for graph data set
		var financesData = [];
		
		//show profit / revenue / cost figures
		plenty_admin.UI.field.DOM
		.find(".topLine")
		.find(".profit")
		.text(numeral(finances.totalProfit).format('$0,0.00'))
		.end()
		.find(".cost")
		.text(numeral(finances.totalCost).format('$0,0.00'))
		.end()
		.find(".revenue")
		.text(numeral(finances.totalRevenue).format('$0,0.00'));
		
		//colour palette for graph segments
		var palette = new Rainbow();
		palette.setSpectrum("#0076b2", "#93b222", "#788912");
		palette.setNumberRange(0, (finances.activityFinances.length > 0 ? finances.activityFinances.length : 1));
		
		//for(index in finances){
		for(var a=0; a<finances.activityFinances.length; a++){
			var finance = finances.activityFinances[a];
			//console.log("finance", finance, plenty_admin.DATA.activityTypes[finance.activityTypeId]);
			finance.colour = "#"+palette.colourAt(a);
	
			var segment = {
				value:		finance.cost,
				color:		finance.colour,
				highlight:	plenty_admin.HELPER.colorLuminance(finance.colour, .4),
				label: 		plenty_admin.DATA.activityTypes[finance.activityTypeId].name,
			};
			
			financesData.push(segment);
		}
		
		var financeChartOptions = {
			legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend mts\"><% for (var i=0; i<segments.length; i++){%><li data-segmentid=\"<%=i%>\" data-hovercolour=\"<%=segments[i].fillColor%>\" data-name=\"<%=segments[i].label.replace(/ /g, \"\").toLowerCase()%>\" class=\"legendItem\"><span class=\"swatch\" style=\"background-color:<%=segments[i].fillColor%>\"><i class=\"pif pif-<%=segments[i].label.toLowerCase().replace(/ /g, \"-\")%>\"></i></span><%if(segments[i].label){%><%=segments[i].label%><%}%> <span class=\"pct\"></span><span class=\"pull-right\"><%= numeral(segments[i].value).format('$0,0.00') %></span></li><%}%></ul>",
			tooltipTemplate: "<%=label%>: <%= numeral(value).format('$0,0.00') %> | <%= numeral(circumference / 6.283).format('00.00%') %>",
			animateRotate: true
		};
		
		var helpers = Chart.helpers;
		
		console.log("helpers", helpers);
		
		if(plenty_admin.UI.field.financesGraph){
			plenty_admin.UI.field.financesGraph.destroy();
		}
			
		plenty_admin.UI.field.financesGraph = new Chart(plenty_admin.UI.field.financesGraphEl.get(0).getContext("2d")).Doughnut(financesData,financeChartOptions);
		
		console.log("render finances graph: ", plenty_admin.UI.field.financesGraph, financesData);
		
		//add a legend for this graph
		var $legendHTML = $(plenty_admin.UI.field.financesGraph.generateLegend());
		
		var legendHolder = 
		plenty_admin.UI.field.financesGraphEl
		.parent()
		.parent()
		.parent()
		.find(".legend");
		
		legendHolder
		.html("")
		.append($legendHTML);
		
		var resetLegentStyle = function(legendHolder){
			$(legendHolder)
			.find("li")
			.css({"background-color": "transparent"})
			.removeClass("active")
			.find("span.swatch")
			.each(function(){
				$(this)
				.css({"background-color": $(this).closest("li").data("hovercolour")});
			})
			.end()
			.find("span.pct")
			.text("");
		}
		
		// Include a html legend template after the module doughnut itself
		helpers.each(legendHolder.get(0).firstChild.childNodes, function (legendNode, index) {
			helpers.addEvent(legendNode, 'mouseover', function () {
				var activeSegment = plenty_admin.UI.field.financesGraph.segments[index];
				
				var pct = numeral(activeSegment.circumference / 6.283).format('00.00%');
				
				activeSegment.save();
				activeSegment.fillColor = activeSegment.highlightColor;
				activeSegment.innerRadius = 60;
				plenty_admin.UI.field.financesGraph.showTooltip([activeSegment]);
				activeSegment.restore();
				
				$(legendNode)
				.css({"background-color": $(this).data("hovercolour")})
				.addClass("active")
				.find("span.swatch")
				.css({"background-color": activeSegment.highlightColor})
				.end()
				.find("span.pct")
				.text(pct);
			});
		});
		
		helpers.addEvent(legendHolder.get(0).firstChild, 'mouseout', function () {
			plenty_admin.UI.field.financesGraph.draw();
			resetLegentStyle(legendHolder);
		});
		
		//highlight key element when hovering segment
		plenty_admin.UI.field.financesGraphEl.on("mousemove", function(evt){
			var activePoints = plenty_admin.UI.field.financesGraph.getSegmentsAtEvent(evt);
			if(activePoints.length > 0){
				//console.log("activePoints", activePoints, activePoints[0].label.replace(/ /g, "").toLowerCase());
				legendHolder
				.find("li")
				.removeClass("active");
				
				var labelId = activePoints[0].label.replace(/ /g, "").toLowerCase();
				var legendItem = legendHolder.find("li[data-name='"+labelId+"']");
				var pct = numeral(activePoints[0].circumference / 6.283).format('00.00%');
				
				resetLegentStyle(legendHolder);
				
				legendItem
				.addClass("active")
				.css({"background-color": legendItem.data("hovercolour")})
				.find("span.swatch")
				.css({"background-color": activePoints[0].highlightColor})
				.end()
				.find("span.pct")
				.text(pct);
			}else{
				resetLegentStyle(legendHolder);
			}
			// => activePoints is an array of segments on the canvas that are at the same position as the click event.
		});
		
		//clear segment highlight onMouseOut
		plenty_admin.UI.field.financesGraphEl.on("mouseout", function(evt){
			resetLegentStyle(legendHolder);
		});
		
		plenty_admin.UI.field.renderedGraphs.push(plenty_admin.UI.field.financesGraph);
		
	},

	renderTasks: function(taskFinances){
		var taskRows = "";
		
		for(var t=0; t<taskFinances.length; t++){
			var task = taskFinances[t];
			var taskStartDate = plenty_admin.HELPER.formatJavaDate(task.taskDto.startTime);
			console.log("taskStartDate - ", taskStartDate, task.taskDto.startTime);
			var taskRow = [
				"<tr class='pointer'>",
					"<td><span class='editable' data-type='text' data-pk='1' data-url='/post' data-title='Choose the task name'>",
						task.taskDto.name,
					"</span></td>",
					"<td>",
						task.taskDto.state,
					"</td>",
					"<td><span class='editable' data-type='date' data-pk='1' data-url='/post' data-title='Choose the start date'>",
						plenty_admin.HELPER.formatJavaDate(task.taskDto.startTime).date,
					"</span></td>",
					"<td>",
						plenty_admin.HELPER.daysFromHours(task.taskDto.durationInHours),
					"</td>",
					"<td class='text-right'>",
						task.taskDto.cost,
					"</td>",
				"</tr>",
			].join("");
			
			taskRows += taskRow;
		}
		
		$.fn.editable.defaults.mode = 'inline';
		
		plenty_admin.UI.map.MODAL_activity
		.find(".activityTasksList table tbody tr")
		.remove()
		.end()
		.find(".activityTasksList table tbody")
		.append(taskRows)
		.find(".editable")
		.editable(plenty_admin.REST.inline_editing_options);
	},

	renderTaskFinancesGraph: function(taskFinances){
		console.log("renderTaskFinancesGraph", taskFinances);
		//colour palette for graph segments
		var palette = new Rainbow();
		palette.setSpectrum("#0076b2", "#93b222", "#788912");
		palette.setNumberRange(0, 2);
			
		//holder for graph data set
		var taskFinancesData = [
			//equipment
			{
				value:		0,
				color:		"#"+palette.colourAt(0),
				highlight:	plenty_admin.HELPER.colorLuminance("#"+palette.colourAt(0), .4),
				label: 		"Equipment",
			},
			//skill
			{
				value:		0,
				color:		"#"+palette.colourAt(1),
				highlight:	plenty_admin.HELPER.colorLuminance("#"+palette.colourAt(1), .4),
				label: 		"Labor",
			},
			//skill
			{
				value:		0,
				color:		"#"+palette.colourAt(2),
				highlight:	plenty_admin.HELPER.colorLuminance("#"+palette.colourAt(2), .4),
				label: 		"Products",
			},
		];
		
		//for(index in finances){
		for(var a=0; a<taskFinances.length; a++){
			//break the costs into equipment / skill / product
			var taskFinance = taskFinances[a];
			console.log("taskFinance", taskFinance);
			taskFinancesData[0].value += taskFinance.equipmentCost.cost;
			taskFinancesData[1].value += taskFinance.laborCost.cost;
			taskFinancesData[2].value += taskFinance.productsCost.cost;
		}
		
		var taskFinancesChartOptions = {
			legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend mts\"><% for (var i=0; i<segments.length; i++){%><li data-segmentid=\"<%=i%>\" data-hovercolour=\"<%=segments[i].fillColor%>\" data-name=\"<%=segments[i].label.replace(/ /g, \"\").toLowerCase()%>\" class=\"taskHeader\" style=\"border-top:2px solid <%=segments[i].fillColor%>\"><span class=\"swatch\" style=\"background-color:<%=segments[i].fillColor%>\"><i class=\"pif pif-<%=segments[i].label.toLowerCase().replace(/ /g, \"-\")%>\"></i></span><%if(segments[i].label){%><%=segments[i].label%><%}%> <span class=\"pct\"></span><span class=\"pull-right\"><%= numeral(segments[i].value).format('$0,0.00') %></span></li><%}%></ul>",
			tooltipTemplate: "<%=label%>: <%= numeral(value).format('$0,0.00') %> | <%= numeral(circumference / 6.283).format('00.00%') %>",
			animateRotate: true
		};
		
		var helpers = Chart.helpers;
		
		console.log("helpers", helpers);
		
		plenty_admin.UI.field.taskFinancesGraph = new Chart(plenty_admin.UI.field.taskFinancesGraphEl.get(0).getContext("2d")).Doughnut(taskFinancesData,taskFinancesChartOptions);
		
		console.log("render task finances graph: ", plenty_admin.UI.field.taskFinancesGraph, taskFinancesData);
		
		//add a legend for this graph
		var $legendHTML = $(plenty_admin.UI.field.taskFinancesGraph.generateLegend());
		
		var legendHolder = 
		plenty_admin.UI.field.taskFinancesGraphEl
		.parent()
		.parent()
		.find(".legend");
		
		legendHolder
		.html("")
		.append($legendHTML);
		
		var equipmentItems = "";
		var laborItems = "";
		var productItems = "";
		
		//INJECT THE DIFFERENT TASK COST ELEMENTS INTO THE LEGEND ONCE BUILT
		//for(index in finances){
		for(var a=0; a<taskFinances.length; a++){
			//break the costs into equipment / skill / product
			var taskFinance = taskFinances[a];
			console.log("taskFinance", taskFinance);
			
			for(var e=0; e<taskFinance.equipmentCost.taskResourceTypeCosts.length; e++){
				var taskItem = taskFinance.equipmentCost.taskResourceTypeCosts[e];
				var bgColor = plenty_admin.HELPER.hexToRgb("#"+palette.colourAt(0));
				equipmentItems += "<li class='taskItem equipmentTaskItem' style='background-color:rgba("+bgColor.r+", "+bgColor.g+", "+bgColor.b+", .2);'>"+taskItem.resourceTypeName+"<span class='cost'>"+numeral(taskItem.cost).format('$0,0.00')+"</span></li>";
				
				//add task resource costs breakdown to task resource type costs (indented)
				for(var tr=0; tr<taskItem.taskResourceCosts.length; tr++){
					var resource = taskItem.taskResourceCosts[tr];
					equipmentItems += "<li class='taskResourceItem equipmentTaskResourceItem' style='background-color:rgba("+bgColor.r+", "+bgColor.g+", "+bgColor.b+", .2);'>"+resource.resourceName+"<span class='cost'>"+numeral(resource.cost).format('$0,0.00')+"</span></li>";
				}
			}
			
			for(var l=0; l<taskFinance.laborCost.taskResourceTypeCosts.length; l++){
				var taskItem = taskFinance.laborCost.taskResourceTypeCosts[l];
				var bgColor = plenty_admin.HELPER.hexToRgb("#"+palette.colourAt(1));
				laborItems += "<li class='taskItem laborTaskItem' style='background-color:rgba("+bgColor.r+", "+bgColor.g+", "+bgColor.b+", .2);'>"+taskItem.resourceTypeName+"<span class='cost'>"+numeral(taskItem.cost).format('$0,0.00')+"</span></li>";
				
				//add task resource costs breakdown to task resource type costs (indented)
				for(var tr=0; tr<taskItem.taskResourceCosts.length; tr++){
					var resource = taskItem.taskResourceCosts[tr];
					laborItems += "<li class='taskResourceItem laborTaskResourceItem' style='background-color:rgba("+bgColor.r+", "+bgColor.g+", "+bgColor.b+", .2);'>"+resource.resourceName+"<span class='cost'>"+numeral(resource.cost).format('$0,0.00')+"</span></li>";
				}
			}
			
			for(var p=0; p<taskFinance.productsCost.taskResourceTypeCosts.length; p++){
				var taskItem = taskFinance.productsCost.taskResourceTypeCosts[p];
				var bgColor = plenty_admin.HELPER.hexToRgb("#"+palette.colourAt(2));
				productItems += "<li class='taskItem productTaskItem' style='background-color:rgba("+bgColor.r+", "+bgColor.g+", "+bgColor.b+", .2);'>"+taskItem.resourceTypeName	+"<span class='cost'>"+numeral(taskItem.cost).format('$0,0.00')+"</span></li>";
				
				//add task resource costs breakdown to task resource type costs (indented)
				for(var tr=0; tr<taskItem.taskResourceCosts.length; tr++){
					var resource = taskItem.taskResourceCosts[tr];
					productItems += "<li class='taskResourceItem productTaskResourceItem' style='background-color:rgba("+bgColor.r+", "+bgColor.g+", "+bgColor.b+", .2);'>"+resource.resourceName+"<span class='cost'>"+numeral(resource.cost).format('$0,0.00')+"</span></li>";
				}
			}
		}
		
		console.log("equipmentItems", equipmentItems);
		console.log("laborItems", laborItems);
		console.log("productItems", productItems);
		
		legendHolder
		.find("li[data-name='equipment']")
		.after(equipmentItems)
		.end()
		.find("li[data-name='labor']")
		.after(laborItems)
		.end()
		.find("li[data-name='products']")
		.after(productItems)
		.end()
		.find(".equipmentTaskResourceItem")
		.last()
		.addClass("last")
		.end()
		.end()
		.find(".laborTaskResourceItem")
		.last()
		.addClass("last")
		.end()
		.end()
		.find(".productTaskResourceItem")
		.last()
		.addClass("last");
		
		var resetLegentStyle = function(legendHolder){
			$(legendHolder)
			.find("li:not(.taskItem):not(.taskResourceItem)")
			.css({"background-color": "transparent"})
			.removeClass("active")
			.find("span.swatch")
			.each(function(){
				$(this)
				.css({"background-color": $(this).closest("li").data("hovercolour")});
			})
			.end()
			.find("span.pct")
			.text("");
		}
		
		// Include a html legend template after the module doughnut itself
		helpers.each(legendHolder.get(0).firstChild.childNodes, function (legendNode, index) {
			helpers.addEvent(legendNode, 'mouseover', function () {
				console.log("hover legendNode: ", this, index, $(this).prop("class"));
				
				if($(this).hasClass("taskItem") || $(this).hasClass("taskResourceItem")){
					if($(this).hasClass("equipmentTaskItem") || $(this).hasClass("equipmentTaskResourceItem")){
						index = 0; //$(legendHolder).find("li[data-name='equipment']").index();
					}else if($(this).hasClass("laborTaskItem") || $(this).hasClass("laborTaskResourceItem")){
						index = 1; //$(legendHolder).find("li[data-name='labor']").index();
					}else if($(this).hasClass("productTaskItem") || $(this).hasClass("productTaskResourceItem")){
						index = 2; //$(legendHolder).find("li[data-name='products']").index();
					}
				}else{
					index = parseInt($(this).data("segmentid"));
				}
				
				console.log("index: ", index);
				
				if(!$(this).hasClass("taskItem") && !$(this).hasClass("taskResourceItem")){
					var activeSegment = plenty_admin.UI.field.taskFinancesGraph.segments[index];
					
					var pct = numeral(activeSegment.circumference / 6.283).format('00.00%');
					
					activeSegment.save();
					activeSegment.fillColor = activeSegment.highlightColor;
					activeSegment.innerRadius = 60;
					plenty_admin.UI.field.taskFinancesGraph.showTooltip([activeSegment]);
					activeSegment.restore();
					
					$(legendNode)
					.css({"background-color": $(this).data("hovercolour")})
					.addClass("active")
					.find("span.swatch")
					.css({"background-color": activeSegment.highlightColor})
					.end()
					.find("span.pct")
					.text(pct);
				}
			});
		});
		
		helpers.addEvent(legendHolder.get(0).firstChild, 'mouseout', function () {
			if($(this).hasClass("taskItem")){
				if($(this).hasClass("equipmentTaskItem") || $(this).hasClass("equipmentTaskResourceItem")){
					index = 0; //$(legendHolder).find("li[data-name='equipment']").index();
				}else if($(this).hasClass("laborTaskItem") || $(this).hasClass("laborTaskResourceItem")){
					index = 1; //$(legendHolder).find("li[data-name='labor']").index();
				}else if($(this).hasClass("productTaskItem") || $(this).hasClass("productTaskResourceItem")){
					index = 2; //$(legendHolder).find("li[data-name='products']").index();
				}
				//return; //no hover effect on task items just yet
			}
			plenty_admin.UI.field.taskFinancesGraph.draw();
			if(!$(this).hasClass("taskItem") && !$(this).hasClass("taskResourceItem")){
				resetLegentStyle(legendHolder);
			}
		});
		
		//highlight key element when hovering segment
		plenty_admin.UI.field.taskFinancesGraphEl.on("mousemove", function(evt){
			var activePoints = plenty_admin.UI.field.taskFinancesGraph.getSegmentsAtEvent(evt);
			if(activePoints.length > 0){
				//console.log("activePoints", activePoints, activePoints[0].label.replace(/ /g, "").toLowerCase());
				legendHolder
				.find("li")
				.removeClass("active");
				
				var labelId = activePoints[0].label.replace(/ /g, "").toLowerCase();
				var legendItem = legendHolder.find("li[data-name='"+labelId+"']");
				var pct = numeral(activePoints[0].circumference / 6.283).format('00.00%');
				
				resetLegentStyle(legendHolder);
				
				legendItem
				.addClass("active")
				.css({"background-color": legendItem.data("hovercolour")})
				.find("span.swatch")
				.css({"background-color": activePoints[0].highlightColor})
				.end()
				.find("span.pct")
				.text(pct);
			}else{
				resetLegentStyle(legendHolder);
			}
			// => activePoints is an array of segments on the canvas that are at the same position as the click event.
		});
		
		//clear segment highlight onMouseOut
		plenty_admin.UI.field.taskFinancesGraphEl.on("mouseout", function(evt){
			resetLegentStyle(legendHolder);
		});
		
		plenty_admin.UI.field.renderedGraphs.push(plenty_admin.UI.field.taskFinancesGraph);
	}
};

plenty_admin.UI.field.weatherTabs.DOM = plenty_admin.UI.field.DOM.find('.field_weather_data');
plenty_admin.UI.field.assetTabs.DOM = plenty_admin.UI.field.DOM.find('.field_asset_data');

/* define the field graph dom elements */
plenty_admin.UI.field.tempGraphEl = plenty_admin.UI.field.DOM.find(".tab-content .tab-pane#temp canvas");
plenty_admin.UI.field.moistureGraphEl = plenty_admin.UI.field.DOM.find(".tab-content .tab-pane#moisture canvas");
plenty_admin.UI.field.precipGraphEl = plenty_admin.UI.field.DOM.find(".tab-content .tab-pane#precip canvas");
plenty_admin.UI.field.gddGraphEl = plenty_admin.UI.field.DOM.find(".tab-content .tab-pane#gdd canvas");
plenty_admin.UI.field.financesGraphEl = plenty_admin.UI.field.DOM.find(".tab-content .tab-pane#finances canvas");

/* Set up the global properties of the charts plugin*/
Chart.defaults.global.responsive = true;
Chart.defaults.global.maintainAspectRatio = false;
Chart.defaults.global.scaleFontFamily = "'Lucida Console', Monaco, monospace";
Chart.defaults.Line.scaleShowHorizontalLines = true;
Chart.defaults.Line.scaleShowVerticalLines = true;
Chart.defaults.Line.scaleShowGridLines = true;
Chart.defaults.Line.pointHitDetectionRadius = 1;


//get field order by year
plenty_admin.REST.get_fieldCrops_order_by_year_descending = function(fieldId, callback){
	plenty_admin.REST.getByFieldOrderByYearDescending = plenty_admin.api.one("fieldCrops/getByFieldOrderByYearDescending", fieldId);
	plenty_admin.REST.getByFieldOrderByYearDescending.get().then(function(response){
		console.log("fieldCrops/getByFieldOrderByYearDescending", response.body());
		if(Array.isArray(response.body())){
			var returnData = plenty_admin.REST.get_array_from_data(response.body());
		}else{
			var returnData = response.body(); //"NO DATA";
		}
		if(callback && typeof callback === "function"){
			callback(returnData);
		}
	});
}

//get field crop order by descending
plenty_admin.REST.get_activities_by_field_crop_order_by_desc = function(fieldCropId, callback){
	plenty_admin.REST.getByFieldCropOrderByDateAsc = plenty_admin.api.one("activities/getByFieldCropOrderByDateAsc", fieldCropId);
	plenty_admin.REST.getByFieldCropOrderByDateAsc.get().then(function(response){
		console.log("activities/getByFieldCropOrderByDateAsc", response.body());
		if(Array.isArray(response.body())){
			var returnData = plenty_admin.REST.get_array_from_data(response.body());
		}else{
			var returnData = response.body(); //"NO DATA";
		}
		if(callback && typeof callback === "function"){
			callback(returnData);
		}
	});
}

//get image for growth stage
plenty_admin.REST.fields.getGrowthStageFile = function(growthStageId, html, callback){
	plenty_admin.REST.growthStageFile = plenty_admin.api.all("growthStageFile/getImage");
	plenty_admin.REST.growthStageFile.get(growthStageId)
	.then(
		function(growthStageImageString){
			console.log("growthStageImageString: ", growthStageImageString().data);
			if(callback && typeof callback == "function"){
				callback(growthStageImageString().data, html);
			}
		},
		function(){
			console.log("getting growth stage image failed: ");
			if(callback && typeof callback == "function"){
				callback("NO IMAGE AVAILABLE", html);
			}
		});
}

//get activities for organization by date range
plenty_admin.REST.get_activity_finances_for_date_range = function(fieldCropId, fromDate, toDate, callback){
	plenty_admin.REST.getActivityFinancesForDateRange = plenty_admin.api.one("activities/getActivityFinancesForDateRange", fieldCropId+"/"+fromDate+"/"+toDate);
	plenty_admin.REST.getActivityFinancesForDateRange.get().then(function(response){
		console.log("activities/getActivityFinancesForDateRange", response.body());
		if(Array.isArray(response.body())){
			var returnData = plenty_admin.REST.get_array_from_data(response.body());
		}else{
			var returnData = response.body(); //"NO DATA";
		}
		if(callback && typeof callback === "function"){
			callback(returnData);
		}
	});
}

//get activities for organization by date range
plenty_admin.REST.get_weather_days_with_dateRange = function(fieldCropId, fromDate, toDate, callback){
	plenty_admin.REST.getWatherDaysByFieldAndByDateRange = plenty_admin.api.one("fields/getWatherDaysByFieldAndByDateRange", fieldCropId+"/"+fromDate+"/"+toDate);
	plenty_admin.REST.getWatherDaysByFieldAndByDateRange.get().then(
		function(response){
			if(Array.isArray(response.body())){
				var returnData = plenty_admin.REST.get_array_from_data(response.body());
			}else{
				var returnData = response.body(); //"NO DATA";
			}
			if(callback && typeof callback === "function"){
				callback(returnData);
			}
		},
		function(err){
			console.error("plenty_admin.REST.get_weather_days_with_dateRange failed: ", err);
			bootbox.dialog({
							message: "plenty_admin.REST.get_weather_days_with_dateRange failed.", 
							className: "danger",
							buttons: {
								danger: {
								  label: "OK",
								  className: "btn-danger",
								  callback: plenty_admin.HELPER.hideLoadingOverlay
								}
							}
						});
		}
	);
}

//get equipment for a field
plenty_admin.REST.get_field_equipments_with_fieldId = function(fieldId, callback){
	plenty_admin.REST.getFieldEquipmentsWithFieldId = plenty_admin.api.one("equipment/getByField", fieldId);
	plenty_admin.REST.getFieldEquipmentsWithFieldId.get().then(function(response){
		if(Array.isArray(response.body())){
			var returnData = plenty_admin.REST.get_array_from_data(response.body());
		}else{
			var returnData = response.body(); //"NO DATA";
		}
		if(callback && typeof callback === "function"){
			callback(returnData);
		}
	});
}

plenty_admin.DATA.load_field_observation = function(observationId, callback){
	plenty_admin.REST.getObservationById = plenty_admin.api.one("observations/getObservation", observationId);
	plenty_admin.REST.getObservationById.get().then(function(observation){
			console.log("observation: ", observation);
			if(callback && typeof callback === "function"){
				callback(observation);
			}
		}
	);
}


//*********************** map.js **************************//
//create namespace for map layout
plenty_admin.UI.map = {};
plenty_admin.UI.map.allCropTypes =  {};
plenty_admin.UI.map.DOM = plenty_admin.UI.DOM.find("#map-container");
plenty_admin.UI.map.filterControls = $(".filter_controls");
plenty_admin.UI.map.toggleFilters = plenty_admin.UI.map.filterControls.find(".toggleFilters a");
plenty_admin.UI.map.farms_quickfilter = plenty_admin.UI.map.filterControls.find(".quickFilter_farms");
plenty_admin.UI.map.orgs_quickfilter = plenty_admin.UI.map.filterControls.find(".quickFilter_organizations");
plenty_admin.UI.map.minCLUZoom = 15;
plenty_admin.UI.map.applicableFilters = ["organizations", "farms", "fields", "croptypes", "plans"];
plenty_admin.UI.map.filtered_field_polygons = [];
plenty_admin.UI.map.MODAL_equipment = $("body").find(".modal#equipment");
plenty_admin.UI.map.MODAL_activity = $("body").find(".modal#activity");
plenty_admin.UI.field.taskFinancesGraphEl = plenty_admin.UI.map.MODAL_activity.find("canvas#taskGraph");
plenty_admin.UI.map.isInit = 0;

//method to initiate the field page
plenty_admin.UI.map.init = function(){
	console.log("plenty_admin.UI.map.init");
	plenty_admin.UI.currentScreen = plenty_admin.UI.map.DOM;
	function loadMap(){
		var center = new google.maps.LatLng(38.017922, -95.494064);
		
		var mapOptions = {
			center: center,
			mapTypeId: google.maps.MapTypeId.HYBRID,
			zoom: plenty_admin.UI.map.minCLUZoom,
			mapTypeControl:false,
			streetViewControl:false
		}
		
		plenty_admin.MAPS.mainMap = plenty_admin.MAPS.create_map("map-container", mapOptions);
		
		//update the map when the user finishes interacting with it
		plenty_admin.MAPS.set_on_idle_event(plenty_admin.MAPS.mainMap, function(e){
			console.log("map bounds changed");
			
			var zoom = plenty_admin.MAPS.mainMap.getZoom();
			//console.log("map bounds: ", bounds.getNorthEast(), bounds.getSouthWest());
			console.log("map zoom: ", zoom);
			
			//always show equipment pins when zoom or pan
			if(
				plenty_admin.DATA.userFilters
				&& plenty_admin.MAPS.edit_field_state == 0
				&& plenty_admin.MAPS.add_field_state == 0
			){
				plenty_admin.UI.map.add_equipment_to_map();
			}
		});
		
		plenty_admin.MAPS.set_on_click_event(plenty_admin.MAPS.mainMap, function(e){
			console.log("map clicked", e);
			plenty_admin.UI.filters.toggleFilters("close");	
			plenty_admin.UI.map.farms_quickfilter.popover("hide");
			plenty_admin.UI.map.orgs_quickfilter.popover("hide");
		});
		
		plenty_admin.MAPS.add_field_control(plenty_admin.MAPS.mainMap);
		plenty_admin.MAPS.add_zoom_to_fields_control(plenty_admin.MAPS.mainMap);
		
		//prepare all data type lists and wait till they've loaded
		plenty_admin.DATA.eventCollector = window.eventcollector(8, 10000);
		plenty_admin.REST.getCropTypes();
		plenty_admin.REST.getTillageTypes();
		plenty_admin.REST.getIrrigationTypes();
		plenty_admin.REST.getEquipmentTypes();
		plenty_admin.REST.getBrandTypes();
		plenty_admin.REST.getGrowthMethods();
		
		plenty_admin.DATA.eventCollector.on('alldone', function(total) {
			plenty_admin.HELPER.hideLoadingOverlay();
		});	
	}
	if (typeof google === 'object' && typeof google.maps === 'object'){
		loadMap();
	}else{
		google.maps.event.addDomListener(window, 'load', loadMap);
	}
	
	//set up the map filter controls
	plenty_admin.UI.map.toggleFilters
	.click(function(){
		plenty_admin.UI.filters.toggleFilters();	
		return false;
	});
	
	plenty_admin.UI.map.farms_quickfilter
	.popover({
		content:function(){
			var $popover_content = plenty_admin.UI.filters.DOM.find(".filter-set.farms .all-filters").clone(true, true).addClass("farms_quickfilter_popover").show();
			
			return $popover_content;
		},
		title: '<button type="button" id="close" class="close" onclick="plenty_admin.UI.map.farms_quickfilter.popover(&quot;hide&quot;);">&times;</button>',
		html:true,
		id:"",
		placement:"bottom"
	})
	.parent().delegate('a, input[type="checkbox"]', 'click', function(e) {
		return false;
	})
	.end()
	.on('show.bs.popover', function (e) {
		plenty_admin.UI.map.orgs_quickfilter
		.popover("hide");
	})
	.on("mouseenter", function () {
		var _this = this;
		$(this).popover("show");
		$(".popover").on("mouseleave", function () {
			$(_this).popover('hide');
		});
	}).on("mouseleave", function () {
		var _this = this;
		setTimeout(function () {
			if (!$(".popover:hover").length) {
				$(_this).popover("hide");
			}
		}, 300);
	});
	
	plenty_admin.UI.map.orgs_quickfilter
	.popover({
		content:function(){
			var $popover_content = plenty_admin.UI.filters.DOM.find(".filter-set.organizations .all-filters").clone(true, true).addClass("orgs_quickfilter_popover").show();
			
			return $popover_content;
		},
		html:true,
		title: '<button type="button" id="close" class="close" onclick="plenty_admin.UI.map.orgs_quickfilter.popover(&quot;hide&quot;);">&times;</button>',
		placement:"bottom"
	})
	.parent().delegate('a, input[type="checkbox"]', 'click', function(e) {
		return false;
	})
	.end()
	.on('show.bs.popover', function (e) {
		plenty_admin.UI.map.farms_quickfilter
		.popover("hide");
	})
	.on("mouseenter", function () {
		var _this = this;
		$(this).popover("show");
		$(".popover").on("mouseleave", function () {
			$(_this).popover('hide');
		});
	}).on("mouseleave", function () {
		var _this = this;
		setTimeout(function () {
			if (!$(".popover:hover").length) {
				$(_this).popover("hide");
			}
		}, 300);
	});
	
}

plenty_admin.UI.map.add_equipment_to_map = function(){
	//only run one request at a time
	if(plenty_admin.UI.map.adding_map_equipment){
		return;
	}
	
	if(plenty_admin.MAPS.add_field_state === 0){
		plenty_admin.HELPER.showLoadingOverlay("Loading", "Equipment");
	}
	
	plenty_admin.UI.map.adding_map_equipment = true;
	
	var bounds = plenty_admin.MAPS.mainMap.getBounds();
	var boundary = {};
	
	boundary.maxLongitude = bounds.getNorthEast().lng();
	boundary.minLongitude = bounds.getSouthWest().lng();
	boundary.maxLatitude = bounds.getNorthEast().lat();
	boundary.minLatitude = bounds.getSouthWest().lat();
	
	//console.log("BOUNDARY: ", bounds, bounds.getNorthEast(), boundary);
	
	plenty_admin.REST.fields.getEquipmentLocationForFilter(boundary, function(equipment){
		
		plenty_admin.UI.map.adding_map_equipment = false;
		
		//console.log("Equipments", equipment);
		
		var boundaryLatLngs = [];
		
		//remove markers that are not in the returned set
		if(equipment.length < plenty_admin.MAPS.equipment_pins.length){ //the number of pins has reduced
			var markersToRemove = [];
			for(var eq=0; eq<plenty_admin.MAPS.equipment_pins.length; eq++){ //loop the existing pins
				var existingEq = plenty_admin.MAPS.equipment_pins[eq];
				
				var equipToRemove = $.grep(equipment, function(newEquip, nE){
					return existingEq.id === newEquip.id; // check this existing pin against those returned
				});
				
				if(equipToRemove.length == 0){ // if a pin exists already that is not in the returned set
					existingEq._index = eq;
					markersToRemove.push(existingEq); // add it to the pins to be removed
				}
			}
			
			//console.log("markersToRemove", markersToRemove);
			if(markersToRemove.length > 0){ // if there are poins to remove
				for(var f=markersToRemove.length-1; f>=0; f--){
					//console.log("remove marker: ", f, markersToRemove[f]);
					$(markersToRemove[f].markerWrapper_).remove(); // remove them from the DOM
					plenty_admin.MAPS.equipment_pins.splice(markersToRemove[f]._index, 1); // remove them from our pins array
				}
			}
		}
		
		if(plenty_admin.UI.map.isInit < 1){
			plenty_admin.UI.map.isInit += 1;
		}else{
			//loop the equipment
			equipment.forEach(function(equip, e){
				var iconExists = $.grep(plenty_admin.MAPS.equipment_pins, function(pin, p){
					return pin.id === equip.id;
				});
				
				if(iconExists.length === 0){
					//get a google latlng object for each element
					var latlng = new google.maps.LatLng(equip.latitude, equip.longitude);
					
					//extend the map boundary to include all points
					boundaryLatLngs.push(latlng);
					
					plenty_admin.UI.map.latlngbounds.extend(latlng);
					
					equip.latlng = latlng;
					
					var pinEvents = {
						onMouseOver: function(event){ //mouseover event
							//console.log("hover marker: ", this, $(this.markerContent_));
							$(this.markerContent_)
							.find(".marker")
							.addClass("hover");
							
							$(this.markerWrapper_)
							.css({
								zIndex:10
							});
							
							plenty_admin.MAPS.polygon_tooltip.show("<strong>"+equip.name+"</strong><br /><p>Drag to reposition, right click to delete</p>");
						}, 
						onMouseOut: function(event){ //mouseout event
							$(this.markerContent_)
							.find(".marker")
							.removeClass("hover");
							
							$(this.markerWrapper_)
							.css({
								zIndex:1
							});
							
							plenty_admin.MAPS.polygon_tooltip.hide();
						}, 
						onClick: function(){ //click event
							console.log("event:", this, this.args);
							plenty_admin.UI.map.clickedEquipment = true;
							var t = setTimeout(function(){
								plenty_admin.UI.map.clickedEquipment = false;
							}, 300);
							//event.stop();
							plenty_admin.MAPS.show_equipment_pin_context_menu(equip, this);
							plenty_admin.MAPS.polygon_tooltip.hide();
						},
						onDragEnd: function(){ //drag end event
							var that = this;
							//console.log("onDragEnd:", equip, that);
							//check if the point has been moved to another polygon or is not in a polygon
							var matchedPoly = null;
							for(var p=0; p<plenty_admin.UI.map.filtered_field_polygons.length; p++){
								var polygon = plenty_admin.UI.map.filtered_field_polygons[p];
								if(google.maps.geometry.poly.containsLocation(that.position, polygon)){
									//console.log("Point is inside a polygon: ", polygon);
									matchedPoly = polygon;
									break;
								}
							}
							
							if(matchedPoly){
								if(matchedPoly.id === equip.fieldEquipmentDto.fieldId){
									//console.log("do you want top move this equipment within this field?");
									plenty_admin.MAPS.update_fixed_equipment_position(equip, that);
								}else{
									//console.log("Do you what to assosciate this equipment with a different field");
									plenty_admin.MAPS.update_fixed_equipment_position_and_change_field(equip, matchedPoly, that);
								}
							}else{
								//console.log("are you sure you want to disassociate this equipment with any fields???");
								plenty_admin.MAPS.update_fixed_equipment_position(equip, that);
								plenty_admin.MAPS.delete_field_equipment(equip, that);
							}
							return false;
						}
					}
					//draw the pin on the map
					plenty_admin.MAPS.draw_pin(equip, pinEvents, plenty_admin.MAPS.mainMap);
				}
			});
			
			plenty_admin.DATA.eventCollector.done("equipment");
		}
		
		plenty_admin.HELPER.hideLoadingOverlay();
	});
}

plenty_admin.UI.field.show_activity_modal = function(activity, taskFinances, el){
	console.log("show_activity_modal", activity, taskFinances);
	plenty_admin.UI.map.MODAL_activity
	.find(".modal-title")
	.text(plenty_admin.DATA.activityTypes[activity.activityTypeId].name)
	.end()
	.find("button.delete")
	.off("click")
	.on("click", function(){
			plenty_admin.UI.map.MODAL_activity
			.find(".modal-content")
			.addClass("blur")
			.end()
			.find(".confirmDelete")
			.show();
	})
	.end()
	.find("button.cancel")
	.off("click")
	.on("click", function(){
			plenty_admin.UI.map.MODAL_activity
			.find(".modal-content")
			.removeClass("blur")
			.end()
			.find(".confirmDelete")
			.hide();
	})
	.end()
	.find(".confirmDelete button.delete")
	.off("click")
	.on("click", function(){
		plenty_admin.REST.deleteActivity
		.delete(activity.id)
		.then(function(data){
			console.log("Activity Deleted:", data);
			plenty_admin.UI.map.MODAL_activity
			.modal("hide");
			
			el
			.remove();
		})
	})
	.end()
	.on("shown.bs.modal", function(){
		plenty_admin.UI.field.renderTaskFinancesGraph(taskFinances);
		plenty_admin.UI.field.renderTasks(taskFinances);
	})
	.modal("show");
};

plenty_admin.UI.field.show_equipment_modal = function(equip){
	console.log("show_equipment_modal", equip);
	
	plenty_admin.REST.fields.getEquipmentImage(equip.id, function(imageString){
		//console.log("imageString", imageString);
		plenty_admin.UI.map.MODAL_equipment
		.find(".image").html("<img src='data:image/jpeg;base64,"+ imageString +"' width='100%'/>");
	});
	
	var equipType = equip.equipmentObservationDto ? equip.equipmentObservationDto.type : "null";
	plenty_admin.UI.map.MODAL_equipment
	.removeClass("MOVEABLE WELL SOIL_MOISTURE null")
	.addClass(equipType)
	.find(".modal-title")
	.text(equip.equipmentTypeIds[0].name)
	.end()
	.find(".name")
	.text(equip.name)
	.end()
	.find(".lat")
	.text(equip.latitude)
	.end()
	.find(".lng")
	.text(equip.longitude)
	
	
	switch(equipType){
		case null:
			
		break;
		
		case "MOVEABLE":
			plenty_admin.UI.map.MODAL_equipment
			.find(".equipmentObservationHeaders.MOVEABLE")
			.find(".speed b")
			.text(equip.equipmentObservationDto.speed)
			.end()
			.find(".fuel b")
			.text(equip.equipmentObservationDto.fuelAmount);
		break;
		
		case "WELL":
			plenty_admin.UI.map.MODAL_equipment
			.find(".equipmentObservationHeaders.WELL")
			.find(".time b")
			.text(plenty_admin.HELPER.formatJavaDate(equip.equipmentObservationDto.observationTime).time)
			.end()
			.find(".reading b")
			.text(equip.equipmentObservationDto.meterReading);
		break;
		
		case "SOIL_MOISTURE":
			plenty_admin.UI.map.MODAL_equipment
			.find(".equipmentObservationHeaders.SOIL_MOISTURE")
			.find(".time b")
			.text(plenty_admin.HELPER.formatJavaDate(equip.equipmentObservationDto.observationTime).time)
			.end()
			.find(".soilDepthUOM")
			.text(equip.equipmentObservationDto.depthUOM.name)
			.end()
			.find(".moistureUOM")
			.text(equip.equipmentObservationDto.moistureUOM.name);
			
			for(var b=0; b<equip.equipmentObservationDto.readings.length; b++){
				var reading = equip.equipmentObservationDto.readings[b];
				var readingROW = [
					"<tr>",
						"<td>",
							reading.depth,
						"</td>",
						"<td>",
							reading.moisture,
						"</td>",
					"</tr>",
				].join("");
				
				plenty_admin.UI.map.MODAL_equipment
				.find(".equipmentObservationHeaders.SOIL_MOISTURE tbody")
				.append(readingROW);
			}
			
			//loop measuremends
			//create rows to add to the table
			
		break;
	}
	
	plenty_admin.UI.map.MODAL_equipment
	.find(".editable")
	.editable(plenty_admin.REST.inline_editing_options)
	.end()
	.modal("show");
}

plenty_admin.UI.map.populate = function(fieldIDs, zoomFields){
	// loop filtered fields and put them on the map
	console.log("plenty_admin.UI.map.populate", fieldIDs, zoomFields);
	plenty_admin.UI.map.latlngbounds = new google.maps.LatLngBounds();
	
	//get the boundary points, grouped by field ID for the current filter
	plenty_admin.REST.get_x_by_filtered("BoundaryPoints", function(boundaryPoints){
		console.log("boundaryPoints", boundaryPoints().data);
		var fieldBoundaries = boundaryPoints().data;
		
		//clear the map
		if(plenty_admin.MAPS.mainMap.clusterer){
			plenty_admin.MAPS.mainMap.clusterer.clearMarkers();
		}else{
			plenty_admin.MAPS.remove_all_polygons(plenty_admin.UI.map.filtered_field_polygons);
		}
		
		plenty_admin.UI.map.filtered_field_polygons = [];
	
		//console.log("fields", fields);
		
		//extract unique crop types from provided field boundaries
		fieldBoundaries.forEach(function(field, p){
			var cropTypeExists = $.grep(plenty_admin.UI.map.allCropTypes, function(crop, c){
				return crop.label === field.cropTypeName;
			}).length > 0;
			
			
			if(!cropTypeExists){
				plenty_admin.UI.map.allCropTypes[field.cropTypeName.replace(/ /g, "")] = field.cropTypeName;
			}
		});
		
		
		console.log("plenty_admin.UI.map.allCropTypes", plenty_admin.UI.map.allCropTypes);
		
		//add a legend to the map based on the filtered fields
		plenty_admin.UI.brand_palette.setNumberRange(0, (Object.keys(plenty_admin.UI.map.allCropTypes).length > 0 ? Object.keys(plenty_admin.UI.map.allCropTypes).length : 100));
		
		var legendItems = {};
		var inc = 0;
		//for(var c=0; c<allCropTypes.length; c++){
		for(id in plenty_admin.UI.map.allCropTypes){
			if(plenty_admin.UI.map.allCropTypes.hasOwnProperty(id)){
				legendItems[id] = {
									color: "#"+plenty_admin.UI.brand_palette.colourAt(inc), 
									colour: "#"+(plenty_admin.UI.map.allCropTypes[id].toLowerCase() === "none" || plenty_admin.UI.map.allCropTypes[id].toLowerCase() === "nocroptypesfound" ? "000000" : plenty_admin.UI.brand_palette.colourAt(inc)), 
									label : plenty_admin.UI.map.allCropTypes[id]
								};
				inc += 1;
			}
		}
		
		if(plenty_admin.MAPS.legend){
			plenty_admin.MAPS.update_map_legend(legendItems);
		}else{
			plenty_admin.MAPS.add_map_legend(plenty_admin.MAPS.mainMap, legendItems);
		}
		
		fieldBoundaries.forEach(function(field,i){
			//console.log("field", field);
			var boundaryLatLngs = [];
			//console.log("sortedFieldBoundaryPoints", sortedFieldBoundaryPoints);
			
			field.boundaryPointDtos.forEach(function(xy,i){
				var latlng = new google.maps.LatLng(xy.latitude, xy.longitude, true);
				latlng.seqNumber = xy.seqNumber;
				boundaryLatLngs.push(latlng);
				
				if(
					zoomFields === undefined 
					|| zoomFields === null 
					|| zoomFields === false
				){
					plenty_admin.UI.map.latlngbounds.extend(boundaryLatLngs[i]);
				}
			});
			
			//console.log("processed boundary: ", boundaryLatLngs);
			
			var fieldNameObj = $.grep(fieldIDs, function(_field, f){
				return field.fieldId === _field.id;
			});
			
			var fieldName = "NO NAME";
			(fieldNameObj.length > 0 ? fieldName = fieldNameObj[0].name : null);
			
			//if the boundary has points, draw them and center the map on them
			if(boundaryLatLngs.length > 2){
				var fieldData = {
					boundaries: boundaryLatLngs,
					editable: false,
					fieldId: field.fieldId,
					id: field.fieldId,
					fieldName: fieldName,
					isCoords: true,
					//isCluster: false,
					cropType: field.cropTypeName
				};
				
				var poly_events = {
					onEdit: function(event){ //onEdit handler
						//console.log("Poly Drawn / edited: ", event);
					}, 
					onMouseOver: function(event){ //onMouseOver handler
						//console.log("poly mouseover: ", this, event);
						var that = this;
						this.setOptions({
							strokeOpacity: 1,
							fillOpacity: .65
						});
						
						plenty_admin.MAPS.polygon_tooltip.show([
																"<div class='polyToolTip polyToolTip_"+fieldData.id+"'>",
																"<p>Name:<br><strong>",
																	fieldData.fieldName,
																"</strong></p>",
																"<p>",
																	"Crop:<br><strong>"+plenty_admin.HELPER.capitalizeFirstLetter(fieldData.cropType)+"</strong>",
																"</p>",
																"<p>Acreage:<br><strong>",
																	fieldData.acreage ? fieldData.acreage : plenty_admin.MAPS.get_polygon_area(that),
																"</strong></p>",
																"<p class='growthStage'>Growth Stage:<br><strong>",
																	(that.growthStage ? that.growthStage.name : plenty_admin.REST.fields
																			.getGrowthStageById(fieldData.growthStageId ? fieldData.growthStageId : 1, 								
																			function(growthStage){
																				that.growthStage = growthStage;
																				$("#tt .polyToolTip_"+fieldData.id+" .growthStage strong")
																				.text(growthStage.name);
																			})),
																"</strong></p>",
																"<p class='mbn'>Click for options</p>"
															].join(""));
					}, 
					onMouseOut: function(event){ //onMouseOut handler
						//console.log("poly mouseout: ", this, event);
						this.setOptions({
							strokeOpacity: .8,
							fillOpacity: .35
						});
						
						plenty_admin.MAPS.polygon_tooltip.hide();
					}, 
					onMouseMove: function(event){ //onMouseOut handler
						//console.log("poly mouseout: ", this, event);
						this.setOptions({
							strokeOpacity: .8,
							fillOpacity: .35
						});
					}, 
					onClick: function(event){
						//if a marker sitting on top of a field has been clicked
						//do not trigger the polygon click event
						if(plenty_admin.UI.map.clickedEquipment){
							plenty_admin.UI.map.clickedEquipment = false;
							return;
						}
						console.log("polygon clicked");
						var _this = this;
						var checkDouble = setTimeout(function(){
							if(!_this.isDblClick){
								var lat = event.latLng.lat();
								var lng = event.latLng.lng();
								$("body").addClass("loading");
								// populate yor box/field with lat, lng
								plenty_admin.REST.fields.getFieldById(_this.id, function(fieldObj){
									$("body").removeClass("loading");
									var fullFieldObject = $.extend(fieldData, fieldObj);
									fullFieldObject.rc_lat = event.latLng.lat();
									fullFieldObject.rc_lng = event.latLng.lng();
									
									//console.log("fullFieldObject", fullFieldObject);
									plenty_admin.MAPS.show_polygon_context_menu(fullFieldObject, plenty_admin.MAPS.mainMap, "map_context_menu", _this);
								});
								plenty_admin.MAPS.polygon_tooltip.hide();
							}else{
								_this.isDblClick = false;
							}
						}, 400);
					},
					onDoubleClick: function(event){ //onClick handler
						event.stop();
						this.isDblClick = true;
						console.log("polygon double clicked: ", event);
						
						plenty_admin.HELPER.showLoadingOverlay("Loading", "Field");
						var thisPoly = this;
						//var polyPath = this.getPath().getArray();
						
						
						var polyPath = [];
						thisPoly.getPath().getArray().forEach(function(point, p){
							var latlng = {
								latitude: point.lat(),
								longitude: point.lng(),
								seqNumber: p
							}
							polyPath.push(latlng);
						});
						
						var _MouseEvent = null;
						
						for(prop in event){
							if(event.hasOwnProperty(prop)){
								//console.log("event properties: ", prop, event[prop] instanceof MouseEvent);
								if( event[prop] instanceof MouseEvent){
									_MouseEvent = event[prop];
									break;
								}
							}
						}
						
						
						//only move to field screen
						//if a polygon has been clicked, not a marker
						if($(_MouseEvent && _MouseEvent.target).hasClass("marker")){
							console.log("marker clicked instead of poly - return!");
							return;
						}else{
							plenty_admin.HELPER.showLoadingOverlay("Loading", "Field");
						}
						
						//get field by ID
						plenty_admin.REST.fields.getFieldById(this.id, function(fieldObj){
							//console.log("polyPath", polyPath);
							fieldObj.fillColor = thisPoly.fillColor;
							fieldObj.strokeColor = thisPoly.strokeColor;
							fieldObj.boundaries = polyPath;
							fieldObj.isCoords = false;
						
							//build the breadcrumb trail object
							var field_breadcrumb = [
								{
									class:"back",
									name:"Map",
									clickHandler:function(){
										plenty_admin.UI.currentScreen
										.fadeOut("normal", function(){
											plenty_admin.UI.field.clear();
											plenty_admin.UI.currentScreen = plenty_admin.UI.map.DOM;
											plenty_admin.UI.currentScreen
											.closest(".fill-area")
											.fadeIn("normal")
											.parent()
											.find(".filter_controls")
											.fadeIn("fast", function(){
												google.maps.event.trigger(plenty_admin.MAPS.mainMap, 'resize'); 
												plenty_admin.MAPS.mainMap.fitBounds(plenty_admin.UI.map.latlngbounds);
											});
										});
										return false;
									}
								},
								{
									class:"active",
									name:fieldObj.name,
									clickHandler:null
								}
							];
							
							plenty_admin.UI.field.DOM
							.find(".breadcrumb-trail")
							.remove()
							.end()
							.prepend(plenty_admin.UI.build_breadcrumb_trail(field_breadcrumb));
							
							plenty_admin.UI.field.init(fieldObj, "map");
						});
					}
				};
				
				var polygon = plenty_admin.MAPS.draw_polygon(fieldData, poly_events, plenty_admin.MAPS.mainMap);
				
				plenty_admin.UI.map.filtered_field_polygons.push(polygon);
			}	
			
		});
		
		if(
			fieldBoundaries.length > 0){
				if(
					zoomFields === true
					|| zoomFields === undefined
					|| zoomFields === null
				){
					//center and zoom the map to the bounds of the polygons
					plenty_admin.MAPS.mainMap.fitBounds(plenty_admin.UI.map.latlngbounds);
				}
		}
		
		//recenter fields if map size changes
		$(window).on("resize",function(){
			if(plenty_admin.MAPS.edit_field_state == 1){
				plenty_admin.MAPS.zoomToPolygon(plenty_admin.MAPS.polygonToEdit, plenty_admin.MAPS.mainMap);
			}else if(plenty_admin.MAPS.add_field_state === 1){
				plenty_admin.MAPS.zoomToPolygon(plenty_admin.MAPS.selected_clu_polygon, plenty_admin.MAPS.mainMap);
			}else if(plenty_admin.MAPS.add_field_state === 2){
				plenty_admin.MAPS.zoomToPolygon(plenty_admin.MAPS.selectedPolygon.polygon, plenty_admin.MAPS.mainMap);
			}else{
				plenty_admin.MAPS.mainMap.fitBounds(plenty_admin.UI.map.latlngbounds);
			}
		});
		
		//plenty_admin.HELPER.hideLoadingOverlay();
		plenty_admin.DATA.eventCollector.done("boundary points");
		//cluster the polygons and render clusters on the map
		//plenty_admin.MAPS.mainMap.clusterer = new MarkerClusterer(plenty_admin.MAPS.mainMap, plenty_admin.UI.map.filtered_field_polygons);
	});
}

$( document ).on( "map_data_ready", function( event, orgs ) {
    plenty_admin.UI.map.init();

	//populate filter panel options based on current user filters
	plenty_admin.DATA.load_user_filters(function(filters){	
		console.log("filters", filters);
		plenty_admin.DATA.userFilters = filters().data;
		plenty_admin.DATA.data_source = plenty_admin.DATA.userFilters.possibleFilteringEntitiesDtoList;
		plenty_admin.DATA.update_filters(null, true);
	});
});
//*********************** dashboard.js **************************//
//create namespace for map layout
plenty_admin.UI.dashboard = {};
plenty_admin.UI.dashboard.DOM = plenty_admin.UI.DOM.find("#dashboard-container");

//method to initiate the field page
plenty_admin.UI.dashboard.init = function(){
	console.log("plenty_admin.UI.dashboard.init");
	plenty_admin.UI.currentScreen = plenty_admin.UI.dashboard.DOM;
	plenty_admin.HELPER.hideLoadingOverlay();
}

plenty_admin.UI.dashboard.populate = function(){
	
}

$( document ).on( "dashboard_data_ready", function( event, orgs ) {
    plenty_admin.UI.dashboard.init();
});
//*********************** plans.js **************************//
//create namespace for plans layout
plenty_admin.UI.plans = {};
plenty_admin.UI.plans.DOM = plenty_admin.UI.DOM.find("#plans-container");
plenty_admin.UI.plans.filterControls = plenty_admin.UI.plans.DOM.find(".filter_controls");
plenty_admin.UI.plans.toggleFilters = plenty_admin.UI.plans.filterControls.find(".toggleFilters a");
plenty_admin.UI.plans.farms_quickfilter = plenty_admin.UI.plans.filterControls.find(".quickFilter_farms");
plenty_admin.UI.plans.orgs_quickfilter = plenty_admin.UI.plans.filterControls.find(".quickFilter_organizations");
plenty_admin.UI.plans.plansTable = plenty_admin.UI.plans.DOM.find("#plans-list");
plenty_admin.UI.plans.applicableFilters = ["organizations", "farms", "fields", "croptypes", "plans"];
plenty_admin.UI.plans.add_template_plan_modal = plenty_admin.UI.plans.DOM.closest("body").find(".modal.add-plan");
plenty_admin.UI.plans.dummyProfitProj = {
	planDto: {
		id:111,
		name: "dummyPlan",
		description:"dummy plan because getting profit projection failed",
		state: "UNSCHEDULED"
	},
	fieldDto: {
		id:1,
		name:"dummyField",
		acres:123
	},
	fieldCropDto:{
		
	},
	revenue:12345,
	expense:65432,
	profit:88776,
	profitPerAcre:234
};

//method to initiate the field page
plenty_admin.UI.plans.init = function(){
	console.log("plenty_admin.UI.plans.init");
	plenty_admin.UI.currentScreen = plenty_admin.UI.plans.DOM;
	
	//set up the map filter controls
	plenty_admin.UI.plans.toggleFilters
	.click(function(){
		plenty_admin.UI.filters.toggleFilters();	
		return false;
	});
	
	plenty_admin.UI.plans.farms_quickfilter
	.popover({
		content:function(){
			var $popover_content = plenty_admin.UI.filters.DOM.find(".filter-set.farms .all-filters").clone(true, true).addClass("farms_quickfilter_popover").show();
			
			return $popover_content;
		},
		title: '<button type="button" id="close" class="close" onclick="plenty_admin.UI.plans.farms_quickfilter.popover(&quot;hide&quot;);">&times;</button>',
		html:true,
		id:"",
		placement:"bottom"
	})
	.parent().delegate('a, input[type="checkbox"]', 'click', function(e) {
		return false;
	})
	.end()
	.on('show.bs.popover', function (e) {
		plenty_admin.UI.plans.orgs_quickfilter
		.popover("hide");
	})
	.on("mouseenter", function () {
		var _this = this;
		$(this).popover("show");
		$(".popover").on("mouseleave", function () {
			$(_this).popover('hide');
		});
	}).on("mouseleave", function () {
		var _this = this;
		setTimeout(function () {
			if (!$(".popover:hover").length) {
				$(_this).popover("hide");
			}
		}, 300);
	});
	
	plenty_admin.UI.plans.orgs_quickfilter
	.popover({
		content:function(){
			var $popover_content = plenty_admin.UI.filters.DOM.find(".filter-set.organizations .all-filters").clone(true, true).addClass("orgs_quickfilter_popover").show();
			
			return $popover_content;
		},
		html:true,
		title: '<button type="button" id="close" class="close" onclick="plenty_admin.UI.plans.orgs_quickfilter.popover(&quot;hide&quot;);">&times;</button>',
		placement:"bottom"
	})
	.parent().delegate('a, input[type="checkbox"]', 'click', function(e) {
		return false;
	})
	.end()
	.on('show.bs.popover', function (e) {
		plenty_admin.UI.plans.farms_quickfilter
		.popover("hide");
	})
	.on("mouseenter", function () {
		var _this = this;
		$(this).popover("show");
		$(".popover").on("mouseleave", function () {
			$(_this).popover('hide');
		});
	}).on("mouseleave", function () {
		var _this = this;
		setTimeout(function () {
			if (!$(".popover:hover").length) {
				$(_this).popover("hide");
			}
		}, 300);
	});

	var t = Date.now();
	var today = plenty_admin.HELPER.formatJavaDate(t);
	var m = ((today.obj.getUTCMonth()+1) > 9 ? today.obj.getUTCMonth()+1 : "0"+(today.obj.getUTCMonth()+1));
	var d = (today.obj.getUTCDate() > 9 ? today.obj.getUTCDate() : "0"+today.obj.getUTCDate());
	var todayStr = today.year+"-"+m+"-"+d;
	var datePickers = plenty_admin.UI.plans.add_template_plan_modal
	.find("input.datepicker");
	
	datePickers
	.datepicker({
		autoclose:true, 
		startDate: '+0d'
	});
	
	datePickers
	.datepicker('setValue', todayStr)
	.datepicker('update');
	
	datePickers
	.on('show hide',function(e){ e.stopPropagation() });
	
	plenty_admin.UI.plans.DOM
	.find(".btn.add-plan-to-displayed")
	.click(function(){
		var fieldSet = plenty_admin.UI.plans.DOM.find("tbody.fieldPlans");
		var openAddTemplateModal = function(fieldSet){
			//check if any of the fields need a plantation date
			for(var f=0; f<fieldSet.length; f++){
				if($(this).find(".plan").length == 0){
					plenty_admin.UI.plans.add_template_plan_modal
					.addClass("plantAndStart");
				}else{
					plenty_admin.UI.plans.add_template_plan_modal
					.removeClass("plantAndStart");
				}
			}
			
			plenty_admin.UI.plans.add_template_plan_modal
			.data("fieldSet", fieldSet)
			.modal("show");
		}
		if(fieldSet.length === 1){
			for(var f=0; f<fieldSet.length; f++){
				var tbody = fieldSet[f];
				$(tbody)
				.find("tr.plan")
				.each(function(){
					console.log("plan for this tbody: ", $(this));
					var manifestedPlanId = parseInt($(this).data("manifested_plan_id"));
					console.log("manifestedPlanId", manifestedPlanId);
					
					plenty_admin.UI.plans.add_template_plan_modal
					.find(".templatePlan-"+manifestedPlanId)
					.addClass("hide");
				});
			};
			
			if(plenty_admin.UI.plans.add_template_plan_modal.find(".templatePlan:not(.hide)").length == 0){ //if all template plans have been hidden	
				bootbox.dialog({
					message: "You have added all available plan templates.",
					className: "info",
					buttons: {
						danger: {
						  label: "OK",
						  className: "btn-primary",
						  callback: function(){
								plenty_admin.HELPER.hideLoadingOverlay();
							}
						}
					}
				});
			}else{
				openAddTemplateModal(fieldSet);
			}
		}else{
			openAddTemplateModal(fieldSet);
		}
	});
	
	plenty_admin.UI.plans.add_template_plan_modal
	.find('a[data-toggle="tab"]')
	.on('show.bs.tab', function (e) {
	 // e.target // newly activated tab
	  //e.relatedTarget // previous active tab
	  console.log("tab switch: ", $(e.target).data("target"));
	  
	  switch($(e.target).data("target")){
		 case "#plans_list":
		 	plenty_admin.UI.plans.add_template_plan_modal
			.find("button.next")
			.show()
			.end()
			.find("button.back, button.add-plan")
			.hide();
		 break; 
		 
		 case "#plans_criterea":
		 	plenty_admin.UI.plans.add_template_plan_modal
			.find("button.next")
			.hide()
			.end()
			.find("button.back, button.add-plan")
			.show();
		 break; 
	  }
	})
	.end()
	.find("button.next")
	.click(function(){
		console.log("next");
		plenty_admin.UI.plans.add_template_plan_modal
		.find('.nav-tabs a[data-target="#plans_criterea"]')
		.tab('show');
	})
	.end()
	.find("button.back")
	.click(function(){
		plenty_admin.UI.plans.add_template_plan_modal
		.find('.nav-tabs a[data-target="#plans_list"]')
		.tab('show');
	})
	.end()
	.find("button.add-plan")
	.click(function(){
		var selectedPlanTemplates = [];
		var $this = $(this);
		
		$this.button("loading");
		
		plenty_admin.UI.plans.add_template_plan_modal.find("input[type='checkbox']:checked").each(function(){
			selectedPlanTemplates.push($(this).closest("tr"));
		});
		
		console.log("selectedPlanTemplates", selectedPlanTemplates);
		
		plenty_admin.UI.plans.add_plan_eventCollector = window.eventcollector(selectedPlanTemplates.length, 10000);
		
		plenty_admin.UI.plans.add_plan_eventCollector.on('alldone', function(total) {
			plenty_admin.HELPER.hideLoadingOverlay();
		});
		
		for(var t=0; t<selectedPlanTemplates.length; t++){
			//calculateCostForPlan
			//get cost calculation to push into plans list
			var templatePlanDto = selectedPlanTemplates[t].data("templatePlan");
			var autoSchedule = plenty_admin.UI.plans.add_template_plan_modal
			.find("#autoSchedule").is(":checked");
			
			var plantationDate = null;
			var replacementStartDate = null;
			
			function getPlantationDate(){
				var pDateObj = plenty_admin.UI.plans.add_template_plan_modal
				.find("#plantationDate").data("datepicker").date;
			
				plantationDate = pDateObj.getUTCFullYear()+"-"+
									((pDateObj.getUTCMonth()+1) < 10 ? "0"+(pDateObj.getUTCMonth()+1) : pDateObj.getUTCMonth()+1)+"-"+
									(pDateObj.getUTCDate() < 10 ? "0"+pDateObj.getUTCDate() : pDateObj.getUTCDate());
			}
			
			function getReplacementStartDate(){
				var rDateObj = plenty_admin.UI.plans.add_template_plan_modal
				.find("#replaceStartingDate").data("datepicker").date; //selected date
				
				replacementStartDate = rDateObj.getUTCFullYear()+"-"+
									((rDateObj.getUTCMonth()+1) < 10 ? "0"+(rDateObj.getUTCMonth()+1) : rDateObj.getUTCMonth()+1)+"-"+
									(rDateObj.getUTCDate() < 10 ? "0"+rDateObj.getUTCDate() : rDateObj.getUTCDate());
			}
							
			var activeFields = plenty_admin.UI.plans.add_template_plan_modal.data("fieldSet");
			var fieldCropReplaceDatePlantationDateDtos = [];
			
			var dates = plenty_admin.UI.plans.get_plan_start_end_range();
			var currentFS = activeFields[fs];
			
			for(var fs=0; fs<activeFields.length; fs++){
				var isAdd = $(activeFields[fs]).find(".plan.active").length == 0;
				if(
					isAdd
				){
					getPlantationDate();
					replacementStartDate = null;
				}else {
					getReplacementStartDate();
					plantationDate = null;
				}
				fieldCropReplaceDatePlantationDateDtos.push({
					fieldCropId: $(activeFields[fs]).find(".field-row").data("fieldDto").id,
					replacementStartDate:replacementStartDate,
					plantationDate: plantationDate
				});
			}
			
			var orgId = parseInt(plenty_admin.UI.plans.add_template_plan_modal.find("#organizationList option:selected").val());
			
			var templatePlanApplicationDto = {
					templatePlanId: templatePlanDto.id, 
					organizationId: orgId,
					fieldCropReplaceDatePlantationDateDtos: fieldCropReplaceDatePlantationDateDtos,
					autoSchedule: autoSchedule,
					commit: false,
					schedulerRequestArguments: {
						organizationId: orgId,
						triggeringUserId: plenty_admin.DATA.userDetails.id,
						dateRangeStart: dates.dateRangeStart,
						dateRangeEnd: dates.dateRangeEnd,
						planningTimeAllowed: "ONE_MINUTE" //Will become an option of [THREE_MINUTES, FIVE_MINUTES, TEN_MINUTES, HALF_HOUR, HOUR]
					}
			}
			
			console.log("templatePlanApplicationDto", templatePlanApplicationDto);
			
			plenty_admin.UI.plans.add_template_plan_modal
			.modal("hide");
			
			plenty_admin.HELPER.showLoadingOverlay("Saving", "Plan");
									
			plenty_admin.REST.applyTemplatePlanToFieldCrops(templatePlanApplicationDto, function(planManifestation){
				plenty_admin.UI.plans.add_template_plan_modal
				.data("fieldSet")
				.each(function(){
					var status = {
						planning:planManifestation.planning,
						possible:planManifestation.possible,
						ready:planManifestation.ready
					};
					
					var $projectionPlanHTML = plenty_admin.UI.plans.create_plan_projection(planManifestation, "templatePlan");
					
					$projectionPlanHTML
					.data("planManifestationResultsDto", planManifestation)
					.data("templatePlanApplicationDto", templatePlanApplicationDto);
					
					$(this)
					.append($projectionPlanHTML);
				});
				plenty_admin.UI.plans.add_plan_eventCollector.done("template plans added");
			});
		}
	})
	.end()
	.find("#autoSchedule")
	.bootstrapSwitch()
	.end()
	.on("show.bs.modal", function(){
		console.log("show add plan modal");
	})
	.on("hidden.bs.modal", function(){
		$(this).removeClass("addPlan plantAndStart");
		var that = $(this);
		
		that
		.find(".templatePlan")
		.removeClass("hide alert-success")
		.find("input[type=checkbox]")
		.prop("checked", false)
		.end()
		.end()
		.find("button.add-plan")
		.button("reset")
		.end()
		.find('a[data-toggle="tab"][data-target="#plans_criterea"]')
		.parent()
		.hide()
		.end()
		.end()
		.find('a[data-toggle="tab"][data-target="#plans_list"]')
		.trigger("click")
		.end()
		.find("button.next")
		.prop("disabled", true);
		
		var to = setTimeout(function(){
			plenty_admin.UI.plans.add_template_plan_modal
			.find("button.add-plan")
			.prop('disabled', true);
		}, 50);
	});
}

plenty_admin.UI.plans.get_plan_start_end_range = function(){
	var rsDate = Date.now() + -180*24*3600*1000; // date 5 days ago in milliseconds UTC
	var dateRangeStartObj = new Date(rsDate);

	var dateRangeStart = dateRangeStartObj.getUTCFullYear()+"-"+
							((dateRangeStartObj.getUTCMonth()+1) < 10 ? "0"+(dateRangeStartObj.getUTCMonth()+1) : dateRangeStartObj.getUTCMonth()+1)+"-"+
							(dateRangeStartObj.getUTCDate() < 10 ? "0"+dateRangeStartObj.getUTCDate() : dateRangeStartObj.getUTCDate());
	
	var reDate = Date.now() + 180*24*3600*1000; // date 5 days ago in milliseconds UTC
	var dateRangeEndObj = new Date(reDate);
	var dateRangeEnd = dateRangeEndObj.getUTCFullYear()+"-"+
							((dateRangeEndObj.getUTCMonth()+1) < 10 ? "0"+(dateRangeEndObj.getUTCMonth()+1) : dateRangeEndObj.getUTCMonth()+1)+"-"+
							(dateRangeEndObj.getUTCDate() < 10 ? "0"+dateRangeEndObj.getUTCDate() : dateRangeEndObj.getUTCDate());
							
	var dates = {
		dateRangeEnd: dateRangeEnd,
		dateRangeStart: dateRangeStart
	};
	
	return dates;
}

plenty_admin.UI.plans.get_state_icon_class = function(state){
	var statusClass = "thumbs-down";
	switch(state){
			case "SCHEDULED":
				statusClass = "calendar";
			break;
			case "IN_PROGRESS":
				statusClass = "hourglass-half";
			break;
			case "FINISHED":
				statusClass = "flag-checkered";
			break;
			case "REPLACED":
				statusClass = "exchange";
			break;
			case "UNSCHEDULED":
				statusClass = "calendar-minus-o";
			break;
			case "SCHEDULING":
				statusClass = "hourglass-half";
			break;
			case "CONFLICT":
				statusClass = "hand-stop-o";
			break;
		}
	return statusClass;
}

plenty_admin.UI.plans.create_plan_projection = function(planData, type){
	//console.log("planData", planData);
	switch (type){
		case "plan":
			var drilldownData = {
				plan: planData.planDto,
				field: planData.fieldDto,
				fieldCrop: planData.fieldCropDto,
				activities:planData.activityListDetailedFinancesDto,
				profitProjection:planData,
				manifestedPlan: {manifestedFromId: planData.planDto.manifestedFromId}
			}
		break;
		
		case "templatePlan":
			var drilldownData = {
				plan: planData.planManifestationResults[0].profitProjectionDto.planDto,
				field: planData.planManifestationResults[0].profitProjectionDto.fieldDto,
				fieldCrop: planData.planManifestationResults[0].profitProjectionDto.fieldCropDto,
				activities:planData.planManifestationResults[0].profitProjectionDto.activityListDetailedFinancesDto,
				profitProjection:planData.planManifestationResults[0].profitProjectionDto,
				manifestedPlan: planData.planManifestationResults[0].manifestedPlan
			}
		break;
	}
	
	var statusClass = "ready";
	var active = false;
	//calculate status
	if(drilldownData.plan.state){
		switch(drilldownData.plan.state){
			case "SCHEDULED":
				active = true;
				statusClass = "calendar";
			break;
			case "IN_PROGRESS":
				active = true;
				statusClass = "hourglass-half";
			break;
			case "FINISHED":
				active = true;
				statusClass = "flag-checkered";
			break;
			case "REPLACED":
				active = false;
				statusClass = "exchange";
			break;
			case "UNSCHEDULED":
				active = false;
				statusClass = "calendar-minus-o";
			break;
			case "SCHEDULING":
				active = false;
				statusClass = "hourglass-half";
			break;
			case "CONFLICT":
				active = false;
				statusClass = "hand-stop-o";
			break;
		}
	}
	
	var statePossibilities = "UNSCHEDULED SCHEDULING SCHEDULED CONFLICT IN_PROGRESS FINISHED REPLACED";
	
	var $planHTML = $([
			"<tr data-id='"+drilldownData.plan.id+"' data-manifested_plan_id='"+drilldownData.manifestedPlan.manifestedFromId+"' class='plan"+(active ? " active" : "")+" pointer "+type+" "+drilldownData.plan.state+"' title='View Plan Details'>",
				"<td width='7%' class='status text-center' title='This plan is currently "+drilldownData.plan.state+"'><i class='fa fa-"+statusClass+"'></i><br/><span class='statusText'>"+drilldownData.plan.state+"</span></i></td>",
				"<td width='19%'>"+drilldownData.plan.name+"<i class='glyphicon glyphicon-info-sign desc mls' title='"+drilldownData.plan.description+"' data-toggle='tooltip' data-placement='top'></i></td>",
				"<td width='12%'>"+numeral(drilldownData.profitProjection.revenue).format('$0,0.00')+"</td>",
				"<td width='12%'>"+numeral(drilldownData.profitProjection.expense).format('$0,0.00')+"</td>",
				"<td width='12%'>"+numeral(drilldownData.profitProjection.profit).format('$0,0.00')+"</td>",
				//"<td width='20%'>"+drilldownData.plan.description+"</td>",
				"<td width='12%'>"+plenty_admin.HELPER.formatJavaDate(drilldownData.plan.startDate).USDate+"</td>",
				"<td width='18%' class='useplan'></td>",
				"<td width='8%' class='text-right profitPerAcre'>"+numeral(drilldownData.profitProjection.profitPerAcre).format('$0,0.00')+"</td>",
			"</tr>"
		].join("")).data("drilldownData", drilldownData);
		
		if(drilldownData.plan.state == "UNSCHEDULED"){
			var $usePlan = $("<button class='btn btn-primary btn-sm' title='Use this plan'><span class='glyphicon glyphicon-ok'></span> Use Plan</button>");
			
			$usePlan
			.click(function(e){
				e.stopPropagation();
				var $this = $(this);
				var drilldownData = $this.closest("tr").data("drilldownData");
				var templatePlanApplicationDto = $this.closest("tr").data("templatePlanApplicationDto");
				var planManifestationResultsDto = $this.closest("tr").data("planManifestationResultsDto");
				var fieldRow = $this.closest("tbody").find(".field-row");
				var fieldDto = fieldRow.data("fieldDto");
				var fieldCropDto = fieldRow.data("fieldCropDto");
				console.log("fieldDto", fieldDto);
				console.log("fieldCropDto", fieldCropDto);
				
				try{
					var currentPlanName = $this.closest("tbody").find(".plan.active").data("drilldownData").plan.name;
				}catch(err){
					var currentPlanName = null;
				}
				var newPlanName =  drilldownData.plan.name;
				var manifestedPlanId = $this.closest("tr").data("manifested_plan_id");
				
				if(!templatePlanApplicationDto){
					var dates = plenty_admin.UI.plans.get_plan_start_end_range();
					fieldCropReplaceDatePlantationDateDtos = [{
						fieldCropId: drilldownData.fieldCrop.id,
						replacementStartDate:drilldownData.plan.startDate,
						plantationDate: null
					}];
					templatePlanApplicationDto = {
							templatePlanId: manifestedPlanId, 
							organizationId: drilldownData.plan.organizationId,
							fieldCropReplaceDatePlantationDateDtos: fieldCropReplaceDatePlantationDateDtos,
							autoSchedule: false,
							commit: true,
							schedulerRequestArguments: {
								organizationId: drilldownData.plan.organizationId,
								triggeringUserId: plenty_admin.DATA.userDetails.id,
								dateRangeStart: dates.dateRangeStart,
								dateRangeEnd: dates.dateRangeEnd,
								planningTimeAllowed: "ONE_MINUTE" //Will become an option of [THREE_MINUTES, FIVE_MINUTES, TEN_MINUTES, HALF_HOUR, HOUR]
							}
					}
				}
				
				if(!currentPlanName){
					var planManifestationResult = $.grep(planManifestationResultsDto.planManifestationResults, function(plan, p){
						return plan.manifestedPlan.fieldCropId === drilldownData.fieldCrop.id;
					});
					
					//console.log("planManifestationResult", planManifestationResult);
					var newPlanPlantationDate = planManifestationResult[0].manifestedPlan.plantationDate;
					var changeMsg = 'Are you sure you want to make</p><h4>'+newPlanName+'</h4><p>the active plan for</p><h4>'+fieldDto.name+'</h4><p>starting on</p><h4>'+newPlanPlantationDate+'?';
				}else{
					try{
						var newPlanChangeDate = templatePlanApplicationDto.fieldCropReplaceDatePlantationDateDtos[0].replacementStartDate;
						var changeMsg = 'Are you sure you want to change</p><h4>'+currentPlanName+'</h4><p>for</p><h4>'+newPlanName+'</h4><p>starting on</p><h4>'+newPlanChangeDate+'?';
					}catch(err){
						console.error("current plans dfo not have a templatePlanApplicationDto");
						var changeMsg = 'Are you sure you want to change</p><h4>'+currentPlanName+'</h4><p>for</p><h4>'+newPlanName+'?</h4>';
					}
				}
				
				
				var $modalBody = 
					$('<div class="row">' +
						'<div class="col-md-12"> ' +
							'<p>'+changeMsg+'</h4>'+
						'</div> '+
					'</div>');
				
				//warn the user about changing plans
				bootbox.dialog({
					title: 'Confirm Change Plan',
					message: $modalBody,
					className: "info",
					buttons: {
						default: {
						  label: "Cancel",
						  className: "btn-default",
						  callback: plenty_admin.HELPER.hideLoadingOverlay
						},
						primary: {
						  label: "OK",
						  className: "btn-primary",
							callback: function(){
								plenty_admin.HELPER.showLoadingOverlay("Changing", "Plan");
								
								console.log("templatePlanApplicationDto", templatePlanApplicationDto);
								templatePlanApplicationDto.commit = true;
								
								plenty_admin.REST.applyTemplatePlanToFieldCrops(templatePlanApplicationDto, function(planManifestationResultsDto){
									//remove active class from other plans 
									var activePlan = $this
									.closest("tbody")
									.find("tr.plan.active");
									
									var newState = planManifestationResultsDto.planManifestationResults[0].profitProjectionDto.planDto.state;
									var previousPlanState = (
																planManifestationResultsDto.planManifestationResults[0].replacedPlan ?
																planManifestationResultsDto.planManifestationResults[0].replacedPlan.state :
																null
															)
									
									if(planManifestationResultsDto.planManifestationResults[0].profitProjectionDtoForReplacedPlan){
										var previousPlanProfitProj = planManifestationResultsDto.planManifestationResults[0].profitProjectionDtoForReplacedPlan;
										var drilldownData = {
											plan: previousPlanProfitProj.planDto,
											field: previousPlanProfitProj.fieldDto,
											fieldCrop: previousPlanProfitProj.fieldCropDto,
											activities:previousPlanProfitProj.activityListDetailedFinancesDto,
											profitProjection:previousPlanProfitProj,
											manifestedPlan: {manifestedFromId: previousPlanProfitProj.planDto.manifestedFromId}
										};
									}
									
															
									if(previousPlanState){
										activePlan
										.removeClass("active "+statePossibilities)
										.addClass(previousPlanState)
										.data("profitProjection", previousPlanProfitProj)
										.data("drilldownData", drilldownData)
											.find("td.status")
											.removeClass(statePossibilities)
											.addClass(previousPlanState)
											.prop("title", "This plan is currently "+previousPlanState)
												.find("i.fa")
												.prop("class", "")
												.addClass("fa fa-"+plenty_admin.UI.plans.get_state_icon_class(previousPlanState))
											.end()
												.find("span.statusText")
												.text(previousPlanState);
									}
									
									//enable this plan for this field
									$this
										.closest("tr.plan")
										.removeClass(statePossibilities)
										.addClass("active "+newState)
											.find("i.fa")
												.prop("class", "")
												.addClass("fa fa-"+plenty_admin.UI.plans.get_state_icon_class(newState))
											.end()
											.find("span.statusText")
											.text(newState)
											.closest("td")
											.prop("title", "This plan is currently "+newState);
											
									$this
									.remove();
									
									plenty_admin.HELPER.hideLoadingOverlay();
								});
							}
						}
					}
				});
				return false;
			});
			
			$planHTML
			.find("td.useplan")
			.append($usePlan);
		}
		
		$planHTML
		.find("i.desc")
		.tooltip()
		.end()
		.click(function(e){
			e.stopPropagation();
			console.log("clicked a plan");
			var drilldownData = $(this).data("drilldownData");
			
			//build the breadcrumb trail object
			var plan_breadcrumb = [
				{
					class:"back",
					name:"Plans",
					clickHandler:function(){
						plenty_admin.UI.currentScreen
						.fadeOut("normal", function(){
							plenty_admin.UI.plan.clear();
							plenty_admin.UI.currentScreen = plenty_admin.UI.plans.DOM;
							plenty_admin.UI.currentScreen
							.fadeIn("normal");
						});
						return false;
					}
				},
				{
					class:"active",
					name:drilldownData.field.name+", "+drilldownData.plan.name,
					clickHandler:null
				}
			];
			
			plenty_admin.UI.plan.DOM
			.find(".breadcrumb-trail")
			.remove()
			.end()
			.prepend(plenty_admin.UI.build_breadcrumb_trail(plan_breadcrumb));
			
			plenty_admin.UI.plan.init(drilldownData);
		});
		
		//add polling to this plan if it is currently planning to check status
		if(statusClass === "planning"){
			$planHTML.checkStatus = setTimeout(function(){
				plenty_admin.REST.getPlan(profitProjection.planDto.id, function(plan){
					console.log("got plan from polling: ", plan);
				});
			}, 5000);
		}
		
		return $planHTML;
};

plenty_admin.UI.plans.create_field_tbody = function(field, profitProjection){
	var $tbody = $("<tbody class='fieldPlans fieldPlans_"+field.id+"'/>");
	//$tbody.data("profitProjection", profitProjection);
	return $tbody;
}

plenty_admin.UI.plans.create_field_row = function(field, fieldCrop, legendItems){
	$fieldHTML = $([
			"<tr class='field-row field-row-"+field.id+" category pointer' data-id='"+field.id+"' title='View the plan summary for this field'>",
				"<td width='7%' class='fieldPreview'><img src='' class='pointer pull-left field_thumb_"+field.id+"'/></th>",
				"<td width='19%'>",
					"<h4 class=''>"+field.name+"</h4>",
					"<span class='fieldDetails capitalize'>"+field.acres+"ac, "+plenty_admin.DATA.cropTypes[fieldCrop.cropTypeId].name+"</span>",
				"</td>",
				"<td width='12%' class='revenue'></td>",
				"<td width='12%' class='expense'></td>",
				"<td width='12%' class='profit'></td>",
				"<td width='12%' class='startDate'></td>",
				"<td width='18%'>",
					"<button class='btn btn-primary btn-inverted add-field-plan' title='Add plan(s) to compare cost projections'>",
						"<span class='glyphicon glyphicon-plus'></span>Add Plan(s)",
					"</button>",
				"</td>",
				"<td width='8%' class='text-right profitPerAcre' class='profitPerAcre'></td>",
			"</tr>"
	].join(""));
	
	$fieldHTML
	.data("fieldDto", field)
	.data("fieldCropDto", fieldCrop)
	.data("revenue", 0)
	.data("expense", 0)
	.data("profit", 0)
	.data("profitPerAcre", 0)
	.click(function(e){
		e.stopPropagation();
		plenty_admin.UI.filters.toggleFilters("close");	
		plenty_admin.UI.plans.farms_quickfilter.popover("hide");
		plenty_admin.UI.plans.orgs_quickfilter.popover("hide");
		var $fieldRow = $(this);
		var fieldDto = $fieldRow.data("fieldDto");
		
		console.log("clicked a field");
		var drilldownDatasArray = [];
		
		var activePlansForField = $fieldRow.closest("tbody").find("tr.plan:not(.UNSCHEDULED)");
		activePlansForField
		.each(function(){
			drilldownDatasArray.push($(this).data("drilldownData"));
		});
		
		if(activePlansForField.length == 0){
			bootbox.dialog({
				message: "There are currently no active plans for this field.",
				className: "info",
				buttons: {
					danger: {
					  label: "OK",
					  className: "btn-primary",
					  callback: function(){
							plenty_admin.HELPER.hideLoadingOverlay();
						}
					}
				}
			});
		}else{
			//build the breadcrumb trail object
			var plan_breadcrumb = [
				{
					class:"back",
					name:"Plans",
					clickHandler:function(){
						plenty_admin.UI.currentScreen
						.fadeOut("normal", function(){
							plenty_admin.UI.plan.clear();
							plenty_admin.UI.currentScreen = plenty_admin.UI.plans.DOM;
							plenty_admin.UI.currentScreen
							.fadeIn("normal");
						});
						return false;
					}
				},
				{
					class:"active",
					name:fieldDto.name+" Plan Summary",
					clickHandler:null
				}
			];
			
			plenty_admin.UI.plan.DOM
			.find(".breadcrumb-trail")
			.remove()
			.end()
			.prepend(plenty_admin.UI.build_breadcrumb_trail(plan_breadcrumb));
			
			plenty_admin.UI.plan.init(drilldownDatasArray);
		}
	})
	.find("button.add-field-plan")
	.click(function(e){
		console.log("add field plan");
		e.stopPropagation();
		var $this = $(this);
		var replacePlan = $this.closest("tbody").find(".plan.active").length == 1;
		
		if(replacePlan){
			plenty_admin.UI.plans.add_template_plan_modal
			.removeClass("addPlan");
		}else{
			plenty_admin.UI.plans.add_template_plan_modal
			.addClass("addPlan");
		}
		
		plenty_admin.UI.plans.add_template_plan_modal
		.data("fieldSet", $this.closest("tbody.fieldPlans"))
		.modal("show");
	});
	
	//create field thumbnail static map url
	plenty_admin.REST.fields.getAllBoundaryPointsByFieldAndBoundaryType(field.id, 2, function(boundaries, fieldId, cropTypeId){
		var bounds = new google.maps.LatLngBounds();	
		boundaries.forEach(function(xy, i) {
			bounds.extend(new google.maps.LatLng(xy.latitude, xy.longitude));
		});
		
		var fieldCenter = bounds.getCenter();
		var cropColor = legendItems[cropTypeId].color.substring(legendItems[cropTypeId].color.indexOf('#')+1);
		var pathString = "color:white|weight:2|fillcolor:0x"+cropColor;
		boundaries.forEach(function(boundary, b){
			pathString += "|" + boundary.latitude+","+boundary.longitude
		});
		
		staticMapParams = {
			center:fieldCenter.lat()+","+fieldCenter.lng(),
			size:"110x110",
			maptype:"hybrid",
			zoom: plenty_admin.MAPS.getBoundsZoomLevel(bounds, {width:110, height:110}),
			path:pathString
		};
		
		var thumb_url = plenty_admin.MAPS.get_static_maps_url(staticMapParams);
		
		var field_thumb = plenty_admin.UI.plans.plansTable.find(".fieldPlans.fieldPlans_"+fieldId+" .fieldPreview img");
		
		set_thumb_url(thumb_url, fieldId);
		
		field_thumb
		.popover({
				content:"<img src='"+thumb_url+"' style='width:110px; height:110px;'/>",
				title: field_thumb.closest("tr").data("fieldDto").name,
				html:true,
				id:"",
				placement:"right",
				container:"body"
		})
		.on("mouseenter", function () {
			var _this = this;
			$(this).popover("show");
			$(".popover").on("mouseleave", function () {
				$(_this).popover('hide');
			});
		}).on("mouseleave", function () {
			var _this = this;
			setTimeout(function () {
				if (!$(".popover:hover").length) {
					$(_this).popover("hide");
				}
			}, 300);
		});
		
		function set_thumb_url(thumb_url, fieldId){
			if(field_thumb.length > 0){
				field_thumb
				.prop("src", thumb_url);
				
				var field_thumb_clone = field_thumb.clone(true, true);
				field_thumb_clone
					.popover({
					content:"<img src='"+thumb_url+"' style='width:110px; height:110px;'/>",
					title: field_thumb.closest("tr").data("fieldDto").name,
					html:true,
					id:"",
					placement:"right",
					container:"body"
				})
				.on("mouseenter", function () {
					var _this = this;
					$(this).popover("show");
					$(".popover").on("mouseleave", function () {
						$(_this).popover('hide');
					});
				}).on("mouseleave", function () {
					var _this = this;
					setTimeout(function () {
						if (!$(".popover:hover").length) {
							$(_this).popover("hide");
						}
					}, 300);
				});
				
				var cloneContainer = field_thumb
				.closest(".flexbox-scroll_y")
				.find(".floating-header .field-row-"+fieldId+" .fieldPreview");
				
				cloneContainer
				.find("img.field_thumb_"+fieldId)
				.remove();
				
				cloneContainer
				.append(field_thumb_clone);
			}else{
				var to = setTimeout(function(){
					console.log("checking field dom element");
					set_thumb_url(thumb_url);
				}, 300);
			}
		}
	}, fieldCrop.cropTypeId);
	
	return $fieldHTML;
};

plenty_admin.UI.plans.populate = function(){
	plenty_admin.UI.plans.plansTable
	.find("tbody")
	.remove();
		
	var legendItems = {};
	var $fieldHTML = null;
	plenty_admin.UI.plans.allCropTypes = [];
	
	//loop fields in the filter and add tbody elements for each field
	for(var f=0; f<plenty_admin.DATA.fieldCrops.length; f++){
		var fieldCrop = plenty_admin.DATA.fieldCrops[f];
		var field = fieldCrop.fieldDto;
		console.log("field", field);
		
		var $fieldTBody = plenty_admin.UI.plans.create_field_tbody(field);
		plenty_admin.UI.plans.plansTable.append($fieldTBody);
	}
	
	//loop fields in the filter and add tbody elements with the field row for each
	for(var f=0; f<plenty_admin.DATA.fieldCrops.length; f++){
		var fieldCrop = plenty_admin.DATA.fieldCrops[f];
		var field = fieldCrop.fieldDto;
		console.log("fieldCrop", fieldCrop);
		console.log("field", field);
		
		if(!legendItems[fieldCrop.cropTypeId]){
			//plenty_admin.UI.map.allCropTypes[field.cropTypeName.replace(/ /g, "")] = field.cropTypeName;
			plenty_admin.UI.brand_palette.setNumberRange(0, (Object.keys(legendItems).length > 0 ? Object.keys(legendItems).length : 100));
			legendItems[fieldCrop.cropTypeId] = {
									color: "#"+plenty_admin.UI.brand_palette.colourAt(Object.keys(legendItems).length), 
									colour: "#"+plenty_admin.UI.brand_palette.colourAt(Object.keys(legendItems).length), 
									label : plenty_admin.DATA.cropTypes[fieldCrop.cropTypeId].name
								};
		}
		
		//add a legend to the map based on the filtered fields
		console.log("legendItems: ", legendItems);
		
		$fieldHTML = plenty_admin.UI.plans.create_field_row(field, fieldCrop, legendItems);
		
		plenty_admin.UI.plans.plansTable
		.find("tbody.fieldPlans_"+field.id)
		.prepend($fieldHTML);
	}
	
	//loop the field plans and add them to the appropriate tbody element
	for(var p=0; p<plenty_admin.DATA.plans.length; p++){
		var profitProjection = plenty_admin.DATA.plans[p];
		var plan = profitProjection.planDto;
		var field = profitProjection.fieldDto;
		var fieldCrop = profitProjection.fieldCropDto;
		
		var $planHTML = plenty_admin.UI.plans.create_plan_projection(profitProjection, "plan");
		
		//store the original object on the DOM element
		$planHTML
		.data("profitProjection", profitProjection);
		
		var tbody = plenty_admin.UI.plans.plansTable
		.find("tbody.fieldPlans_"+field.id);
		
		tbody
		.append($planHTML);
		
		var fieldRow = tbody.find("tr.field-row");
		
		//calculate field totals from plans
		fieldRow
		.data("revenue", fieldRow.data("revenue") + profitProjection.revenue)
		.data("expense", fieldRow.data("expense") + profitProjection.expense)
		.data("profit", fieldRow.data("profit") + profitProjection.profit)
		.data("profitPerAcre", fieldRow.data("profitPerAcre") + profitProjection.profitPerAcre);
	}
	
	plenty_admin.UI.plans.plansTable
	.find("tr.field-row")
	.each(function(field, f){
		console.log("field row: ", $(this), f);
		$(this)
		.find(".profit")
		.text(numeral($(f).data("profit")).format('$0,0.00'))
		.end()
		.find(".expense")
		.text(numeral($(f).data("expense")).format('$0,0.00'))
		.end()
		.find(".revenue")
		.text(numeral($(f).data("revenue")).format('$0,0.00'))
		.end()
		.find(".profitPerAcre")
		.text(numeral($(f).data("profitPerAcre")).format('$0,0.00'));
	});
	
	plenty_admin.HELPER.initFloatingHeaders(plenty_admin.UI.plans.plansTable, ".field-row", "#plans-wrapper");

	plenty_admin.HELPER.hideLoadingOverlay();
}

//get plans applicable to this filter
plenty_admin.REST.getPlansFiltered = function(filterId){
	plenty_admin.REST.plansFiltered = plenty_admin.api.one("plan/getPlanProfitProjectionsForFilter", filterId);
	plenty_admin.REST.plansFiltered.get()
	.then(
		function(plans){
			console.log("got plans filtered: ", plans().data);
			plenty_admin.DATA.plans = plans().data;
			plenty_admin.UI.plans.eventCollector.done("plans filtered");
		},
		function(err){
			console.error("getting filtered plans: ", err);
		}
	);
}

//get field and fieldCrops filtered
plenty_admin.REST.getFieldCropsByYearFiltered = function(filterId, year){
	plenty_admin.REST.fieldCropsByYearFiltered = plenty_admin.api.one("filters/getFieldCropsByYearFiltered/"+year, filterId);
	plenty_admin.REST.fieldCropsByYearFiltered.get()
	.then(
		function(fieldCrops){
			console.log("got field crops by year filtered: ", fieldCrops().data);
			plenty_admin.DATA.fieldCrops = fieldCrops().data;
			plenty_admin.UI.plans.eventCollector.done("field crops by year filtered");
		},
		function(err){
			console.error("getting filtered fieldCrops by year failed: ", err);
		}
	);
}

//get plans applicable to this filter
plenty_admin.REST.getPlan = function(planId, callback){
	plenty_admin.REST.plan = plenty_admin.api.one("plan/getPlan", planId);
	plenty_admin.REST.plan.get()
	.then(
		function(plan){
			console.log("got plan: ", plan().data);
			if(callback && typeof callback === "function"){
				callback(plan().data);
			}
		},
		function(err){
			console.error("getting filtered plans: ", err);
		}
	);
}

//calculate cost for a plan
plenty_admin.REST.getProfitProjectionForPlan = function(planDto, callback){
	plenty_admin.REST.profitProjectionForPlan = plenty_admin.api.one("plan/calculateCostForPlanDto", planDto.id);
	plenty_admin.REST.profitProjectionForPlan.get()
	.then(
		function(profitProjection){
			console.log("got profit projection: ", profitProjection().data);
			if(callback && typeof callback === "function"){
				callback(profitProjection().data);
			}
		},
		function(err){
			console.error("getting profit projection for plan dto failed:: ", err);
			
			/* HACK - return dummy profitProjectionDto for UI testing only */
			callback(plenty_admin.UI.plans.dummyProfitProj);
		}
	);
}

//get all template plans
plenty_admin.REST.getTemplatePlans = function(callback){
	plenty_admin.REST.templatePlans = plenty_admin.api.all("templatePlan/getAllTemplatePlans");
	plenty_admin.REST.templatePlans.getAll()
	.then(
		function(templatePlans){
			if(callback && typeof callback === "function"){
				callback(templatePlans().data);
			}
			plenty_admin.DATA.eventCollector.done("event 1");
		},
		function(err){
			console.error("getting templatePlans failed: ", err);
		}
	);
}

//change a plan
plenty_admin.REST.applyTemplatePlanToFieldCrops = function(templatePlanApplicationDto, callback){
	plenty_admin.REST.templatePlanToFieldCrops = plenty_admin.api.all("plan/applyTemplatePlanToFieldCrops");
	plenty_admin.REST.templatePlanToFieldCrops.post(templatePlanApplicationDto)
	.then(
		function(planManifestationResultsDto){
			console.log("planManifestationResultsDto: ", planManifestationResultsDto().data);
			if(callback && typeof callback === "function"){
				callback(planManifestationResultsDto().data);
			}
		},
		function(err){
			console.error("applyTemplatePlanToFieldCrops failed: ", err);
			bootbox.dialog({
				message: "Could not apply plan to field! - "+err.status+" - "+err.statusText,
				className: "danger",
				buttons: {
					danger: {
					  label: "OK",
					  className: "btn-danger",
					  callback: function(){
							//plenty_admin.HELPER.hideLoadingOverlay();
							plenty_admin.UI.plans.add_template_plan_modal
							.find("button.add-plan")
							.button('reset');
						}
					}
				}
			});
		}
	);
}


$( document ).on( "plans_data_ready", function( event ) {
	console.log("plans_data_ready");
	plenty_admin.DATA.eventCollector = window.eventcollector(3, 10000);
	plenty_admin.REST.getCropTypes();
	plenty_admin.REST.getActivityTypes();
	
	//get all template plans
	plenty_admin.REST.getTemplatePlans(function(templatePlans){
		console.log("got all template plans: ", templatePlans);
		plenty_admin.DATA.templatePlans = templatePlans;
	});
		
	plenty_admin.DATA.eventCollector.on('alldone', function(total) {
		plenty_admin.DATA.selectedTemplatePlans = [];
		var $tpBody = $("<tbody/>");
		
		plenty_admin.UI.plans.add_template_plan_modal
		.find("#templateplans-list")
		.append($tpBody);
		
		//populate the add plan modal
		for(var tp=0; tp<plenty_admin.DATA.templatePlans.length; tp++){
			var tplan = plenty_admin.DATA.templatePlans[tp];
			var $templatePlan = $([
				'<tr class="templatePlan templatePlan-'+tplan.id+' pointer">',
					'<td width="5%" class="select">',
						'<input type="checkbox" class="selectTemplatePlan pointer"></input>',
					'</td>',
					'<td width="35%">',
						tplan.name,
					'</td>',
					'<td width="60%">',
						tplan.description,
					'</td>',
				'</tr>'
			].join(""))
			.data("templatePlan", tplan)
			.find("input.selectTemplatePlan")
			.click(function(){
				var thisTP = $(this).closest("tr").data("templatePlan");
				if($(this).is(":checked")){
					//add from the selected templatePlans array
					plenty_admin.DATA.selectedTemplatePlans
					.push(thisTP);
					
					console.log("enable");
					
					$(this)
					.closest("tr")
					.addClass("alert-success");
					
					plenty_admin.UI.plans.add_template_plan_modal
					.find("button.add-plan, button.next")
					.prop('disabled', false)
					.end()
					.find('.nav-tabs a[data-target="#plans_criterea"]')
					.parent()
					.show();
				}else{
					//remove from the selected templatePlans array
					var index = null;
					for(var a=0; a<plenty_admin.DATA.selectedTemplatePlans.length; a++){
						var stp = plenty_admin.DATA.selectedTemplatePlans[a];
						if(stp.id == thisTP.id){
							plenty_admin.DATA.selectedTemplatePlans.splice(a, 1);
							if(plenty_admin.DATA.selectedTemplatePlans.length == 0){
								plenty_admin.UI.plans.add_template_plan_modal
								.find("button.add-plan, button.next")
								.prop('disabled', true)
								.end()
								.find('.nav-tabs a[data-target="#plans_criterea"]')
								.parent()
								.hide();
							}
							
							$(this)
							.closest("tr")
							.removeClass("alert-success");
					
							return;
						}
					}
					$(this)
					.closest("tr")
					.removeClass("alert-success");
				}
			})
			.end()
			.click(function(e){
				if(e.target.type !== "checkbox"){
					$(this)
					.find("input.selectTemplatePlan")
					.trigger("click");
				}
			});
			
			$tpBody
			.append($templatePlan);
		}
		
		plenty_admin.UI.plans.init();
	});
	
	//populate filter panel options based on current user filters
	plenty_admin.DATA.load_user_filters(function(filters){	
		//console.log("filters", filters);
		plenty_admin.DATA.userFilters = filters().data;
		plenty_admin.DATA.data_source = plenty_admin.DATA.userFilters.possibleFilteringEntitiesDtoList;
		plenty_admin.DATA.update_filters(function(){
			console.log("init filters");
			plenty_admin.UI.plans.toggleFilters
			.parent()
			.fadeIn("fast")
			.parent()
			.find(".filter_loader")
			.fadeOut("fast");
			
			//populate the organizations dropdown in Add Plan modal
			var organizationOptionsHTML = "";
			for(var o=0; o<plenty_admin.DATA.userFilters.possibleFilteringEntitiesDtoList.organizations.length; o++)
			{
				var org = plenty_admin.DATA.userFilters.possibleFilteringEntitiesDtoList.organizations[o];
				organizationOptionsHTML += "<option value='"+org.id+"'>"+org.name+"</option>";
			}
			
			plenty_admin.UI.plans.add_template_plan_modal
			.find("select#organizationList")
			.find("option")
			.remove()
			.end()
			.append(organizationOptionsHTML);
			
		}, true);
	});
});
//*********************** plan.js **************************//
//create namespace for field layout
plenty_admin.UI.plan = {
	DOM: 	$("#plan-container"),
	init: 	function(drilldownData){
		console.log("plan - init", drilldownData);
		plenty_admin.UI.currentScreen.fadeOut("normal");

		plenty_admin.UI.currentScreen = plenty_admin.UI.plan.DOM;
		
		plenty_admin.UI.currentScreen
		.addClass("fill-area-content flexbox-item-grow");
	
		plenty_admin.UI.plan.populate(drilldownData);
		plenty_admin.UI.plan.renderActivities(drilldownData);
		plenty_admin.UI.currentScreen.fadeIn("normal", function(){
			plenty_admin.UI.plan.renderActivityFinancesGraph(drilldownData);
		});
	},
	populate: function(drilldownData){
		console.log("plan - populate", drilldownData);
		if(Array.isArray(drilldownData)){
			var profit = 0;
			var expense = 0;
			var revenue = 0;
			var bushelsPerAcreTotal = 0;
			var cropPriceTotal = 0;
			var subsidyTotal = 0;
			var profitPerAcreTotal = 0;
			
			//loop active plans and total up values
			for(var a=0; a< drilldownData.length; a++){
				var plan = drilldownData[a];
				profit += plan.profitProjection.profit;
				expense += plan.profitProjection.expense;
				revenue += plan.profitProjection.revenue;
				bushelsPerAcreTotal += plan.profitProjection.avgBushlesPerAcre;
				cropPriceTotal += plan.profitProjection.cropPrice;
				subsidyTotal += plan.profitProjection.subsidy;
				profitPerAcreTotal += plan.profitProjection.profitPerAcre;
			}
			
			var bushelsPerAcreAvg = bushelsPerAcreTotal / drilldownData.length;
			var cropPriceAvg = cropPriceTotal / drilldownData.length;
			profitPerAcreAvg = profitPerAcreTotal / drilldownData.length;
			
			//populate fields with totalled data
			plenty_admin.UI.plan.DOM
			.find(".profit")
			.text(numeral(profit).format('$0,0.00'))
			.end()
			.find(".expense")
			.text(numeral(expense).format('$0,0.00'))
			.end()
			.find(".revenue")
			.text(numeral(revenue).format('$0,0.00'))
			.end()
			.find(".plan_field_acres")
			.text(drilldownData[0].field.acres)
			.end()
			.find(".plan_field_bushels_per_acre")
			.text(bushelsPerAcreAvg)
			.end()
			.find(".plan_field_price_per_bushel")
			.text(numeral(cropPriceAvg).format('$0,0.00'))
			.end()
			.find(".text-right.plan_field_subsidy_total")
			.text(numeral(subsidyTotal).format('$0,0.00'))
			.end()
			.find(".plan_field_profit_per_acre")
			.text(numeral(profitPerAcreAvg).format('$0,0.00'));
			
		}else{
			plenty_admin.UI.plan.DOM
			.find(".profit")
			.text(numeral(drilldownData.profitProjection.profit).format('$0,0.00'))
			.end()
			.find(".expense")
			.text(numeral(drilldownData.profitProjection.expense).format('$0,0.00'))
			.end()
			.find(".revenue")
			.text(numeral(drilldownData.profitProjection.revenue).format('$0,0.00'))
			.end()
			.find(".plan_field_acres")
			.text(drilldownData.field.acres)
			.end()
			.find(".plan_field_bushels_per_acre")
			.text(drilldownData.profitProjection.avgBushlesPerAcre)
			.end()
			.find(".plan_field_price_per_bushel")
			.text(numeral(drilldownData.profitProjection.cropPrice).format('$0,0.00'))
			.end()
			.find(".text-right.plan_field_subsidy_total")
			.text(numeral(drilldownData.profitProjection.subsidy).format('$0,0.00'))
			.end()
			.find(".plan_field_profit_per_acre")
			.text(numeral(drilldownData.profitProjection.profitPerAcre).format('$0,0.00'));
			
		}
	},
	clear: function(){
		console.log("plan - clear");
		if(plenty_admin.UI.plan.financesGraph){
			plenty_admin.UI.plan.financesGraph.destroy();
		}
	},
	renderActivityFinancesGraph: function(drilldownData){
		//console.log("renderActivityFinancesGraph", drilldownData, Array.isArray(drilldownData));
		if(Array.isArray(drilldownData)){
			var finances = [];
			for(var a=0; a< drilldownData.length; a++){
				for(var f=0; f<drilldownData[a].activities.activityFinances.length; f++){
					var finance = drilldownData[a].activities.activityFinances[f];
					finances.push(finance);
				}
			}
			//console.log("all finances: ", finances);
		}else{
			var finances = drilldownData.activities.activityFinances;
		}
		
		//holder for graph data set
		var financesData = [];
		
		//colour palette for graph segments
		var palette = new Rainbow();
		palette.setSpectrum("#0076b2", "#93b222", "#788912");
		palette.setNumberRange(0, (finances.length > 0 ? finances.length : 1));
		
		//for(index in finances){
		for(var a=0; a<finances.length; a++){
			var finance = finances[a];
			//console.log("finance", finance, plenty_admin.DATA.activityTypes[finance.activityTypeId]);
			finance.colour = "#"+palette.colourAt(a);
	
			var segment = {
				value:		finance.cost,
				color:		finance.colour,
				highlight:	plenty_admin.HELPER.colorLuminance(finance.colour, .4),
				label: 		plenty_admin.DATA.activityTypes[finance.activityTypeId].name,
			};
			
			financesData.push(segment);
		}
		
		var financeChartOptions = {
			legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend mrs\"><% for (var i=0; i<segments.length; i++){%><li data-segmentid=\"<%=i%>\" data-hovercolour=\"<%=segments[i].fillColor%>\" data-name=\"<%=segments[i].label.replace(/ /g, \"\").toLowerCase()%>\"><span class=\"swatch\" style=\"background-color:<%=segments[i].fillColor%>\"><i class=\"pif pif-<%=segments[i].label.toLowerCase().replace(/ /g, \"-\")%>\"></i></span><%if(segments[i].label){%><%=segments[i].label%><%}%> <span class=\"pct\"></span><span class=\"pull-right\"><%= numeral(segments[i].value).format('$0,0.00') %></span></li><%}%></ul>",
			tooltipTemplate: "<%=label%>: <%= numeral(value).format('$0,0.00') %> | <%= numeral(circumference / 6.283).format('00.00%') %>",
			animateRotate: true
		};
		
		var helpers = Chart.helpers;
		
		//console.log("helpers", helpers);
		
		plenty_admin.UI.plan.financesGraph = new Chart(plenty_admin.UI.plan.financesGraphEl.get(0).getContext("2d")).Doughnut(financesData,financeChartOptions);
		
		//console.log("render finances graph: ", plenty_admin.UI.plan.financesGraph, financesData);
		
		//add a legend for this graph
		var $legendHTML = $(plenty_admin.UI.plan.financesGraph.generateLegend());
		
		var legendHolder = 
		plenty_admin.UI.plan.financesGraphEl
		.parent()
		.parent()
		.parent()
		.find(".legend");
		
		legendHolder
		.html("")
		.append($legendHTML);
		
		var resetLegentStyle = function(legendHolder){
			$(legendHolder)
			.find("li")
			.css({"background-color": "transparent"})
			.removeClass("active")
			.find("span.swatch")
			.each(function(){
				$(this)
				.css({"background-color": $(this).closest("li").data("hovercolour")});
			})
			.end()
			.find("span.pct")
			.text("");
		}
		
		// Include a html legend template after the module doughnut itself
		helpers.each(legendHolder.get(0).firstChild.childNodes, function (legendNode, index) {
			helpers.addEvent(legendNode, 'mouseover', function () {
				var activeSegment = plenty_admin.UI.plan.financesGraph.segments[index];
				
				var pct = numeral(activeSegment.circumference / 6.283).format('00.00%');
				
				activeSegment.save();
				activeSegment.fillColor = activeSegment.highlightColor;
				activeSegment.innerRadius = 60;
				plenty_admin.UI.plan.financesGraph.showTooltip([activeSegment]);
				activeSegment.restore();
				
				$(legendNode)
				.css({"background-color": $(this).data("hovercolour")})
				.addClass("active")
				.find("span.swatch")
				.css({"background-color": activeSegment.highlightColor})
				.end()
				.find("span.pct")
				.text(pct);
			});
		});
		
		helpers.addEvent(legendHolder.get(0).firstChild, 'mouseout', function () {
			plenty_admin.UI.plan.financesGraph.draw();
			resetLegentStyle(legendHolder);
		});
		
		//highlight key element when hovering segment
		plenty_admin.UI.plan.financesGraphEl.on("mousemove", function(evt){
			var activePoints = plenty_admin.UI.plan.financesGraph.getSegmentsAtEvent(evt);
			if(activePoints.length > 0){
				//console.log("activePoints", activePoints, activePoints[0].label.replace(/ /g, "").toLowerCase());
				legendHolder
				.find("li")
				.removeClass("active");
				
				var labelId = activePoints[0].label.replace(/ /g, "").toLowerCase();
				var legendItem = legendHolder.find("li[data-name='"+labelId+"']");
				var pct = numeral(activePoints[0].circumference / 6.283).format('00.00%');
				
				resetLegentStyle(legendHolder);
				
				legendItem
				.addClass("active")
				.css({"background-color": legendItem.data("hovercolour")})
				.find("span.swatch")
				.css({"background-color": activePoints[0].highlightColor})
				.end()
				.find("span.pct")
				.text(pct);
			}else{
				resetLegentStyle(legendHolder);
			}
			// => activePoints is an array of segments on the canvas that are at the same position as the click event.
		});
		
		//clear segment highlight onMouseOut
		plenty_admin.UI.plan.financesGraphEl.on("mouseout", function(evt){
			resetLegentStyle(legendHolder);
		});
	},
	renderActivities: function(drilldownData){
		plenty_admin.UI.plan.activityListContainer
		.find("tr")
		.remove();
		
		function buildActivityFinances(activityFinances){
			//build the activity list item
			for(var a=0; a<activityFinances.length; a++){
				var activity = activityFinances[a].activityDto;
				activity.iconClass = plenty_admin.UI.field.getActivityIconClass(activity.activityTypeId);
				activity.startDate = plenty_admin.HELPER.formatJavaDate(activity.startTime);
				activity.endDate = plenty_admin.HELPER.formatJavaDate(activity.endTime);
				
				var activityItem = [
						"<tr class='activity pointer'>",
							"<td width='5%'>",
								"<i class='"+activity.iconClass+"'></i>",
							"</td>",
							"<td width='20%'>",
								activity.state,
							"</td>",
							"<td width='35%'>",
								plenty_admin.DATA.activityTypes[activity.activityTypeId].name,
							"</td>",
							"<td width='13.333%'>",
								activity.startDate.date,
							"</td>",
							"<td width='13.333%'>",
								plenty_admin.HELPER.daysFromHours(activity.durationInHours),
							"</td>",
							"<td width='13.333%' class='text-right'>",
								numeral(activity.cost).format('$0,0.00'),
							"</td>",
						"</tr>"
				].join("");
				
				var $activityItem = $(activityItem);
	
				$activityItem
				.data("activity", activity)
				.data("activityFinance", activityFinances[a])
				.click(function(){
					plenty_admin.UI.plan.show_activity_modal($(this).data("activity"), $(this).data("activityFinance").taskFinances, $(this));
				});
				
				plenty_admin.UI.plan.activityListContainer.append($activityItem);
			}
		}
		
		if(Array.isArray(drilldownData)){
			for(var a=0; a< drilldownData.length; a++){
				var activityFinances = drilldownData[a].activities.activityFinances;
				buildActivityFinances(activityFinances);
			}
		}else{
			var activityFinances = drilldownData.activities.activityFinances;
			buildActivityFinances(activityFinances);
		}
	},
	show_activity_modal: function(activity, taskFinances, el){
		console.log("show_activity_modal", activity, taskFinances);
		plenty_admin.UI.plan.MODAL_activity
		.find(".modal-title")
		.text(plenty_admin.DATA.activityTypes[activity.activityTypeId].name)
		.end()
		.find("button.delete")
		.off("click")
		.on("click", function(){
				plenty_admin.UI.plan.MODAL_activity
				.find(".modal-content")
				.addClass("blur")
				.end()
				.find(".confirmDelete")
				.show();
		})
		.end()
		.find("button.cancel")
		.off("click")
		.on("click", function(){
				plenty_admin.UI.plan.MODAL_activity
				.find(".modal-content")
				.removeClass("blur")
				.end()
				.find(".confirmDelete")
				.hide();
		})
		.end()
		.find(".confirmDelete button.delete")
		.off("click")
		.on("click", function(){
			plenty_admin.REST.deleteActivity
			.delete(activity.id)
			.then(function(data){
				console.log("Activity Deleted:", data);
				plenty_admin.UI.plan.MODAL_activity
				.modal("hide");
				
				el
				.remove();
			})
		})
		.end()
		.on("shown.bs.modal", function(){
			plenty_admin.UI.plan.renderTaskFinancesGraph(taskFinances);
			plenty_admin.UI.plan.renderTasks(taskFinances);
		})
		.on("hidden.bs.modal", function(){
			plenty_admin.UI.plan.taskFinancesGraph.destroy();
		})
		.modal("show");
	},
	renderTasks: function(taskFinances){
		var taskRows = "";
		
		for(var t=0; t<taskFinances.length; t++){
			var task = taskFinances[t];
			var taskStartDate = plenty_admin.HELPER.formatJavaDate(task.taskDto.startTime);
			console.log("taskStartDate - ", taskStartDate, task.taskDto.startTime);
			var taskRow = [
				"<tr class='pointer'>",
					"<td><span class='editable' data-type='text' data-pk='1' data-url='/post' data-title='Choose the task name'>",
						task.taskDto.name,
					"</span></td>",
					"<td>",
						task.taskDto.state,
					"</td>",
					"<td><span class='editable' data-type='date' data-pk='1' data-url='/post' data-title='Choose the start date'>",
						plenty_admin.HELPER.formatJavaDate(task.taskDto.startTime).date,
					"</span></td>",
					"<td>",
						plenty_admin.HELPER.daysFromHours(task.taskDto.durationInHours),
					"</td>",
					"<td class='text-right'>",
						task.taskDto.cost,
					"</td>",
				"</tr>",
			].join("");
			
			taskRows += taskRow;
		}
		
		$.fn.editable.defaults.mode = 'inline';
		
		plenty_admin.UI.plan.MODAL_activity
		.find(".activityTasksList table tbody tr")
		.remove()
		.end()
		.find(".activityTasksList table tbody")
		.append(taskRows)
		.find(".editable")
		.editable(plenty_admin.REST.inline_editing_options);
	},
	renderTaskFinancesGraph: function(taskFinances){
		console.log("renderTaskFinancesGraph", taskFinances);
		//colour palette for graph segments
		var palette = new Rainbow();
		palette.setSpectrum("#0076b2", "#93b222", "#788912");
		palette.setNumberRange(0, 2);
			
		//holder for graph data set
		var taskFinancesData = [
			//equipment
			{
				value:		0,
				color:		"#"+palette.colourAt(0),
				highlight:	plenty_admin.HELPER.colorLuminance("#"+palette.colourAt(0), .4),
				label: 		"Equipment",
			},
			//skill
			{
				value:		0,
				color:		"#"+palette.colourAt(1),
				highlight:	plenty_admin.HELPER.colorLuminance("#"+palette.colourAt(1), .4),
				label: 		"Labor",
			},
			//skill
			{
				value:		0,
				color:		"#"+palette.colourAt(2),
				highlight:	plenty_admin.HELPER.colorLuminance("#"+palette.colourAt(2), .4),
				label: 		"Products",
			},
		];
		
		//for(index in finances){
		for(var a=0; a<taskFinances.length; a++){
			//break the costs into equipment / skill / product
			var taskFinance = taskFinances[a];
			console.log("taskFinance", taskFinance);
			taskFinancesData[0].value += taskFinance.equipmentCost.cost;
			taskFinancesData[1].value += taskFinance.laborCost.cost;
			taskFinancesData[2].value += taskFinance.productsCost.cost;
		}
		
		var taskFinancesChartOptions = {
			legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend mts\"><% for (var i=0; i<segments.length; i++){%><li data-segmentid=\"<%=i%>\" data-hovercolour=\"<%=segments[i].fillColor%>\" data-name=\"<%=segments[i].label.replace(/ /g, \"\").toLowerCase()%>\" class=\"taskHeader\" style=\"border-top:2px solid <%=segments[i].fillColor%>\"><span class=\"swatch\" style=\"background-color:<%=segments[i].fillColor%>\"><i class=\"pif pif-<%=segments[i].label.toLowerCase().replace(/ /g, \"-\")%>\"></i></span><%if(segments[i].label){%><%=segments[i].label%><%}%> <span class=\"pct\"></span><span class=\"pull-right\"><%= numeral(segments[i].value).format('$0,0.00') %></span></li><%}%></ul>",
			tooltipTemplate: "<%=label%>: <%= numeral(value).format('$0,0.00') %> | <%= numeral(circumference / 6.283).format('00.00%') %>",
			animateRotate: true
		};
		
		var helpers = Chart.helpers;
		
		console.log("helpers", helpers);
		
		plenty_admin.UI.plan.taskFinancesGraph = new Chart(plenty_admin.UI.plan.taskFinancesGraphEl.get(0).getContext("2d")).Doughnut(taskFinancesData,taskFinancesChartOptions);
		
		console.log("render task finances graph: ", plenty_admin.UI.plan.taskFinancesGraph, taskFinancesData);
		
		//add a legend for this graph
		var $legendHTML = $(plenty_admin.UI.plan.taskFinancesGraph.generateLegend());
		
		var legendHolder = 
		plenty_admin.UI.plan.taskFinancesGraphEl
		.parent()
		.parent()
		.find(".legend");
		
		legendHolder
		.html("")
		.append($legendHTML);
		
		var equipmentItems = "";
		var laborItems = "";
		var productItems = "";
		
		//INJECT THE DIFFERENT TASK COST ELEMENTS INTO THE LEGEND ONCE BUILT
		//for(index in finances){
		for(var a=0; a<taskFinances.length; a++){
			//break the costs into equipment / skill / product
			var taskFinance = taskFinances[a];
			console.log("taskFinance", taskFinance);
			
			for(var e=0; e<taskFinance.equipmentCost.taskResourceTypeCosts.length; e++){
				var taskItem = taskFinance.equipmentCost.taskResourceTypeCosts[e];
				var bgColor = plenty_admin.HELPER.hexToRgb("#"+palette.colourAt(0));
				equipmentItems += "<li class='taskItem equipmentTaskItem' style='background-color:rgba("+bgColor.r+", "+bgColor.g+", "+bgColor.b+", .2);'>"+taskItem.resourceTypeName+"<span class='cost'>"+numeral(taskItem.cost).format('$0,0.00')+"</span></li>";
				
				//add task resource costs breakdown to task resource type costs (indented)
				for(var tr=0; tr<taskItem.taskResourceCosts.length; tr++){
					var resource = taskItem.taskResourceCosts[tr];
					equipmentItems += "<li class='taskResourceItem equipmentTaskResourceItem' style='background-color:rgba("+bgColor.r+", "+bgColor.g+", "+bgColor.b+", .2);'>"+resource.resourceName+"<span class='cost'>"+numeral(resource.cost).format('$0,0.00')+"</span></li>";
				}
			}
			
			for(var l=0; l<taskFinance.laborCost.taskResourceTypeCosts.length; l++){
				var taskItem = taskFinance.laborCost.taskResourceTypeCosts[l];
				var bgColor = plenty_admin.HELPER.hexToRgb("#"+palette.colourAt(1));
				laborItems += "<li class='taskItem laborTaskItem' style='background-color:rgba("+bgColor.r+", "+bgColor.g+", "+bgColor.b+", .2);'>"+taskItem.resourceTypeName+"<span class='cost'>"+numeral(taskItem.cost).format('$0,0.00')+"</span></li>";
				
				//add task resource costs breakdown to task resource type costs (indented)
				for(var tr=0; tr<taskItem.taskResourceCosts.length; tr++){
					var resource = taskItem.taskResourceCosts[tr];
					laborItems += "<li class='taskResourceItem laborTaskResourceItem' style='background-color:rgba("+bgColor.r+", "+bgColor.g+", "+bgColor.b+", .2);'>"+resource.resourceName+"<span class='cost'>"+numeral(resource.cost).format('$0,0.00')+"</span></li>";
				}
			}
			
			for(var p=0; p<taskFinance.productsCost.taskResourceTypeCosts.length; p++){
				var taskItem = taskFinance.productsCost.taskResourceTypeCosts[p];
				var bgColor = plenty_admin.HELPER.hexToRgb("#"+palette.colourAt(2));
				productItems += "<li class='taskItem productTaskItem' style='background-color:rgba("+bgColor.r+", "+bgColor.g+", "+bgColor.b+", .2);'>"+taskItem.resourceTypeName	+"<span class='cost'>"+numeral(taskItem.cost).format('$0,0.00')+"</span></li>";
				
				//add task resource costs breakdown to task resource type costs (indented)
				for(var tr=0; tr<taskItem.taskResourceCosts.length; tr++){
					var resource = taskItem.taskResourceCosts[tr];
					productItems += "<li class='taskResourceItem productTaskResourceItem' style='background-color:rgba("+bgColor.r+", "+bgColor.g+", "+bgColor.b+", .2);'>"+resource.resourceName+"<span class='cost'>"+numeral(resource.cost).format('$0,0.00')+"</span></li>";
				}
			}
		}
		
		console.log("equipmentItems", equipmentItems);
		console.log("laborItems", laborItems);
		console.log("productItems", productItems);
		
		legendHolder
		.find("li[data-name='equipment']")
		.after(equipmentItems)
		.end()
		.find("li[data-name='labor']")
		.after(laborItems)
		.end()
		.find("li[data-name='products']")
		.after(productItems)
		.end()
		.find(".equipmentTaskResourceItem")
		.last()
		.addClass("last")
		.end()
		.end()
		.find(".laborTaskResourceItem")
		.last()
		.addClass("last")
		.end()
		.end()
		.find(".productTaskResourceItem")
		.last()
		.addClass("last");
		
		var resetLegentStyle = function(legendHolder){
			$(legendHolder)
			.find("li:not(.taskItem):not(.taskResourceItem)")
			.css({"background-color": "transparent"})
			.removeClass("active")
			.find("span.swatch")
			.each(function(){
				$(this)
				.css({"background-color": $(this).closest("li").data("hovercolour")});
			})
			.end()
			.find("span.pct")
			.text("");
		}
		
		// Include a html legend template after the module doughnut itself
		helpers.each(legendHolder.get(0).firstChild.childNodes, function (legendNode, index) {
			helpers.addEvent(legendNode, 'mouseover', function () {
				console.log("hover legendNode: ", this, index, $(this).prop("class"));
				
				if($(this).hasClass("taskItem") || $(this).hasClass("taskResourceItem")){
					if($(this).hasClass("equipmentTaskItem") || $(this).hasClass("equipmentTaskResourceItem")){
						index = 0; //$(legendHolder).find("li[data-name='equipment']").index();
					}else if($(this).hasClass("laborTaskItem") || $(this).hasClass("laborTaskResourceItem")){
						index = 1; //$(legendHolder).find("li[data-name='labor']").index();
					}else if($(this).hasClass("productTaskItem") || $(this).hasClass("productTaskResourceItem")){
						index = 2; //$(legendHolder).find("li[data-name='products']").index();
					}
				}else{
					index = parseInt($(this).data("segmentid"));
				}
				
				console.log("index: ", index);
				
				if(!$(this).hasClass("taskItem") && !$(this).hasClass("taskResourceItem")){
					var activeSegment = plenty_admin.UI.plan.taskFinancesGraph.segments[index];
					
					var pct = numeral(activeSegment.circumference / 6.283).format('00.00%');
					
					activeSegment.save();
					activeSegment.fillColor = activeSegment.highlightColor;
					activeSegment.innerRadius = 60;
					plenty_admin.UI.plan.taskFinancesGraph.showTooltip([activeSegment]);
					activeSegment.restore();
					
					$(legendNode)
					.css({"background-color": $(this).data("hovercolour")})
					.addClass("active")
					.find("span.swatch")
					.css({"background-color": activeSegment.highlightColor})
					.end()
					.find("span.pct")
					.text(pct);
				}
			});
		});
		
		helpers.addEvent(legendHolder.get(0).firstChild, 'mouseout', function () {
			if($(this).hasClass("taskItem")){
				if($(this).hasClass("equipmentTaskItem") || $(this).hasClass("equipmentTaskResourceItem")){
					index = 0; //$(legendHolder).find("li[data-name='equipment']").index();
				}else if($(this).hasClass("laborTaskItem") || $(this).hasClass("laborTaskResourceItem")){
					index = 1; //$(legendHolder).find("li[data-name='labor']").index();
				}else if($(this).hasClass("productTaskItem") || $(this).hasClass("productTaskResourceItem")){
					index = 2; //$(legendHolder).find("li[data-name='products']").index();
				}
				//return; //no hover effect on task items just yet
			}
			plenty_admin.UI.plan.taskFinancesGraph.draw();
			if(!$(this).hasClass("taskItem") && !$(this).hasClass("taskResourceItem")){
				resetLegentStyle(legendHolder);
			}
		});
		
		//highlight key element when hovering segment
		plenty_admin.UI.plan.taskFinancesGraphEl.on("mousemove", function(evt){
			var activePoints = plenty_admin.UI.plan.taskFinancesGraph.getSegmentsAtEvent(evt);
			if(activePoints.length > 0){
				//console.log("activePoints", activePoints, activePoints[0].label.replace(/ /g, "").toLowerCase());
				legendHolder
				.find("li")
				.removeClass("active");
				
				var labelId = activePoints[0].label.replace(/ /g, "").toLowerCase();
				var legendItem = legendHolder.find("li[data-name='"+labelId+"']");
				var pct = numeral(activePoints[0].circumference / 6.283).format('00.00%');
				
				resetLegentStyle(legendHolder);
				
				legendItem
				.addClass("active")
				.css({"background-color": legendItem.data("hovercolour")})
				.find("span.swatch")
				.css({"background-color": activePoints[0].highlightColor})
				.end()
				.find("span.pct")
				.text(pct);
			}else{
				resetLegentStyle(legendHolder);
			}
			// => activePoints is an array of segments on the canvas that are at the same position as the click event.
		});
		
		//clear segment highlight onMouseOut
		plenty_admin.UI.plan.taskFinancesGraphEl.on("mouseout", function(evt){
			resetLegentStyle(legendHolder);
		});
	}
};

plenty_admin.UI.plan.activityListContainer = plenty_admin.UI.plan.DOM.find("table.planActivities tbody");
plenty_admin.UI.plan.financesGraphEl = plenty_admin.UI.plan.DOM.find("#plan_graph_wrapper canvas");
plenty_admin.UI.plan.MODAL_activity = $("body").find(".modal#activity");
plenty_admin.UI.plan.taskFinancesGraphEl = plenty_admin.UI.plan.MODAL_activity.find("canvas#taskGraph");

//define an empty var for the sidebar HTML
plenty_admin.UI.sideBar = {};
plenty_admin.UI.sideBar.DOM = $("#sidebar");
plenty_admin.UI.sideBar.organizations = {};
plenty_admin.UI.sideBar.organizations.DOM = plenty_admin.UI.sideBar.DOM.find("#organizations");

// build a sidebar organization panel
plenty_admin.UI.sideBar.organizations.create = function(org){
	var $sidebar_org = $(['<div class="panel panel-default">',
							'<div role="tab" id="org_head_'+org.id+'">',
								'<h4 class="panel-title"> <a class="organization" data-orgid="'+org.id+'" data-toggle="collapse" data-parent="#organizations" href="#collapse_'+org.id+'" aria-expanded="true" aria-controls="collapse_'+org.id+'">'+org.name+'</a> </h4>',
							'</div>',
							'<div id="collapse_'+org.id+'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="org_head_'+org.id+'" data-orgid="'+org.id+'">',
								'<div class="panel-body">',
									'<ul class="list-group">',
										'<li class="list-group-item sub farms"><span class="badge">'+(org.farms ? org.farms.length : 0)+'</span> <a href="#farms" class="farms" data-orgid="'+org.id+'">Farms</a></li>',
										'<li class="list-group-item sub fields"><span class="badge">'+(org.fields ? org.fields.length : 0)+'</span> <a href="#fields" class="fields" data-orgid="'+org.id+'">Fields</a></li>',
										'<li class="list-group-item sub users"><span class="badge">'+(org.users ? org.users.length : 0)+'</span> <a href="#users" class="users" data-orgid="'+org.id+'">Users</a> </li>',
										'<li class="list-group-item sub equipment"><span class="badge">'+(org.equipments ? org.equipments.length : 0)+'</span> <a href="#equipments" class="equipment" data-orgid="'+org.id+'">Equipment</a> </li>',
										'<li class="list-group-item sub products"><span class="badge">'+(org.products ? Object.keys(org.products).length : 0)+'</span> <a href="#products" class="products" data-orgid="'+org.id+'">Products</a> </li>',
										'<li class="list-group-item sub plans"><span class="badge">'+(org.plans ? org.plans.length : 0)+'</span> <a href="#plans" class="plans" data-orgid="'+org.id+'">Plans</a></li>',
										'<li class="list-group-item sub skills"><span class="badge">'+(org.skills ? org.skills.length : 0)+'</span> <a href="#skills" class="skills" data-orgid="'+org.id+'">Skills</a> </li>',
										'<li class="list-group-item sub payments"><span class="badge">'+(org.payments ? org.payments.length : 0)+'</span> <a href="#payments" class="payment" data-orgid="'+org.id+'">Payment</a></li>',
									'</ul>',
								'</div>',
							'</div>',
						'</div>'].join(""));
		
	$sidebar_org
	.find("li.sub a")
	.off("click")
	.on("click", function(e){
		//console.log("sub: ", e, e.currentTarget.href);
		//stop reloading the page on click
		e.preventDefault();
		
		var url = e.currentTarget.href;
		var hash = url.substring(url.indexOf('#'));
		//store ref to the event object
		var orgId = $(e.currentTarget).data("orgid");
		
		//trigger the change in selection
		plenty_admin.UI.sideBar.organizations.select_sub(orgId, hash);
		
		console.log(orgId, plenty_admin.UI.organization.DOM.data("orgId"));
		
		//show organization template if it is not visible
		if(!plenty_admin.UI.organization.DOM.is(":visible")){
			plenty_admin.UI.currentScreen
			.fadeOut("normal", function(){
				plenty_admin.UI.currentScreen = plenty_admin.UI.organization.DOM;
				if(orgId === plenty_admin.UI.organization.DOM.data("orgId")){
					// switch tab only
					plenty_admin.UI.organization.switchTab(hash);
				}else{
					//load the organization
					plenty_admin.HELPER.showLoadingOverlay("Loading", "Organization")
					plenty_admin.UI.organization.init(plenty_admin.DATA.organizations[orgId], e.currentTarget.hash);
				}
				plenty_admin.UI.organization.DOM.fadeIn("normal");
			});
		}else{
			if(orgId === plenty_admin.UI.organization.DOM.data("orgId")){
				// switch tab only
				plenty_admin.UI.organization.switchTab(hash);
			}else{
				//load the organization
				plenty_admin.HELPER.showLoadingOverlay("Loading", "Organization");
				plenty_admin.UI.organization.init(plenty_admin.DATA.organizations[orgId], e.currentTarget.hash);
			}
		}
		
		//store the selected organization ID
		store.set('filter::organization', orgId);
	});
	return $sidebar_org;
}

//loop organizations and create sidebar html
plenty_admin.UI.sideBar.organizations.init = function(orgs){
	plenty_admin.UI.sideBar.organizations.html = "";
	plenty_admin.UI.sideBar.organizations.DOM.html("");
	
	//loop organizations and inject Organizations DOM
	for(id in plenty_admin.DATA.organizations){
		if(
			plenty_admin.DATA.organizations.hasOwnProperty(id)
			&& id !== "length"
		){
			
			var org = plenty_admin.DATA.organizations[id];
			
			$sidebar_org = plenty_admin.UI.sideBar.organizations.create(org);
			
			//populate the side bar organizations panel
			plenty_admin.UI.sideBar.organizations.DOM
			.append($sidebar_org);
		}
	}
	
	var $new_org_link = $([
		'<button class="btn btn-success btn-block panel-title add-org mtm">',
			'<span class="glyphicon glyphicon-plus"></span> New Organization',
		'</button>'
	].join(""));
	
	$new_org_link
	.click(function(){
		//build the breadcrumb trail object
		console.log("new org clicked");
		var newOrg_breadcrumb = [
			{
				class:"back",
				name:"Settings",
				clickHandler:function(){
					plenty_admin.UI.currentScreen
					.fadeOut("normal", function(){
						plenty_admin.UI.newOrganization.clear();
						plenty_admin.UI.currentScreen = plenty_admin.UI.organization.DOM;
						plenty_admin.UI.currentScreen
						.fadeIn("normal");
					});
					return false;
				}
			},
			{
				class:"active",
				name:"Add Organization",
				clickHandler:null
			}
		];
		
		plenty_admin.UI.newOrganization.DOM
		.find(".breadcrumb-trail")
		.remove()
		.end()
		.prepend(plenty_admin.UI.build_breadcrumb_trail(newOrg_breadcrumb));
		
		plenty_admin.UI.newOrganization.init();
		
		plenty_admin.UI.currentScreen
		.fadeOut("normal", function(){
			plenty_admin.UI.currentScreen = plenty_admin.UI.newOrganization.DOM;
			plenty_admin.UI.currentScreen
			.fadeIn("normal");
		});
return false;
	});
	
	plenty_admin.UI.sideBar.organizations.DOM
	.append($new_org_link);
}

plenty_admin.UI.sideBar.organizations.select_sub = function(orgId, hash){
	// set the selected item
	plenty_admin.UI.sideBar.organizations.DOM
	.find("li.active")
	.removeClass("active")
	.end()
	.find("li.list-group-item.sub a[data-orgid='"+orgId+"'][href='"+hash+"']")
	.closest(".list-group-item")
	.addClass("active");
}

$( document ).on( "organization_data_ready", function( event, orgs ) {
    plenty_admin.UI.sideBar.organizations.init(orgs);
});
//*********************** filters.js **************************//
//create namespace for filters layout
plenty_admin.UI.filters = {};
plenty_admin.UI.filters.state = "closed"; // set to closed by default
plenty_admin.UI.filters.DOM = plenty_admin.UI.DOM.find("#filters-container");

plenty_admin.REST.update_filters = plenty_admin.api.all("filters/update");

//method to initiate the field page
plenty_admin.UI.filters.init = function(){
	//console.log("plenty_admin.UI.filters.init");
	
	//position the filters off the map
	plenty_admin.UI.filters.hide_filters();
	
	//ensure the filters stay hidden if closed when page gets resized
	$( window ).resize(function() {
		if(plenty_admin.UI.filters.toggleFilters.state === "closed"){
			plenty_admin.UI.filters.hide_filters();
		}
	});
	
	plenty_admin.UI.filters.DOM
	.find("button.save-filter")
	.click(function(){
		//save the filters
		
		//close the filter panel
		plenty_admin.UI.filters.toggleFilters("close");
		
		// stop default behaviour
		return false;
	});
	
	//once positioned, make the filters panel visible
	plenty_admin.UI.filters.DOM
	.show();
	
	plenty_admin.UI.filters.DOM
	.on("mouseenter", function(){
		clearTimeout(this.autohide);
	})
	.on("mouseleave", function(){
		this.autohide = setTimeout(function(){
			plenty_admin.UI.filters.toggleFilters("close");
		}, 3000);
	});
}

plenty_admin.UI.filters.add_selected_filter = function(filterData){
	//console.log(":", filter, filter.find("a").text());
	var $filter = $('<li class="filter" data-filterid="'+filterData.filter.toLowerCase()+filterData.id+'" data-id="'+filterData.id+'" data-name="'+filterData.name+'">'+filterData.name+' <a href="" class="remove-filter glyphicon glyphicon-remove pull-right alert alert-danger mbn"></a></li>');
	$filter
	.find("a.remove-filter")
	.click(function(e){
		var thisFilter = $(this).closest("li");
		
		var filterSet = $(this).closest(".filter-set");
		
		for(var f=0; f<plenty_admin.DATA.userFilters.filterDto[filterSet.data("filter")].length; f++){
			var filter = plenty_admin.DATA.userFilters.filterDto[filterSet.data("filter")][f];
			if(filter === parseInt(thisFilter.data("id"))){
				plenty_admin.DATA.userFilters.filterDto[filterSet.data("filter")].splice(f, 1);
			}
		}
		
		var current_filters = filterSet.find("ul.selected-filters li.filter:not(.all)");
		//if all filters have been removed, show All filter
		//console.log("current_filters", current_filters, current_filters.length);
		if(
			current_filters.length == 0
			|| current_filters.length === plenty_admin.DATA.userFilters.possibleFilteringEntitiesDtoList[filterSet.data("filter").replace("Ids", "s")].length
		){
			plenty_admin.UI.filters.select_all_filters(filterSet, true);
		}
		
		thisFilter
		.remove();
		
		plenty_admin.DATA.update_filters();
		
		return false;
	});
	
	var filterSet = plenty_admin.UI.filters.DOM.find(".filter-set."+filterData.filter.toLowerCase())
	
	var $allFilters = filterSet.find(".selected-filters li.all");
	
	$allFilters
	.hide();
	
	filterSet
	.find(".selected-filters")
	.append($filter);
}

plenty_admin.UI.filters.select_all_filters = function(filter, updateFilters){
	var filterId = filter.data("filter");
	
	plenty_admin.DATA.userFilters.filterDto[filterId] = [];
	
	if(updateFilters){
		plenty_admin.DATA.update_filters();
	}
}

plenty_admin.UI.filters.build_all_filters_entry = function(filterNormalized, active){
	var allFiltersDOM = '<li class="filter all'+(active ? " active" : "")+'" data-filterid="'+filterNormalized+'01">'+
							'<a href="">All <input type="checkbox"'+(active ? " checked" : "")+' class="pull-right"></a>'+
						'</li>';
						
	var $allFiltersDOM = $(allFiltersDOM);
	
	//deselect other checkboxes
	$allFiltersDOM
	.find("a")
	.click(function(e){
		e.stopPropagation();
		var filterToggle = $(e.target).find("input[type='checkbox']");
		if($(e.target).prop("type") !== "checkbox"){
			plenty_admin.UI.filters.select_all_filters($(e.target).closest(".filter-set"), true);
		}
		return false;
	})
	.find("input[type='checkbox']")
	.click(function(e){
		e.stopPropagation();
	})
	.on("change", function(e){
		plenty_admin.UI.filters.select_all_filters($(e.target).closest(".filter-set"), true);
	});
	
	return $allFiltersDOM;
}

plenty_admin.UI.filters.build_clear_filters_entry = function(){
	var $clearFilters = $('<li class="clear-filters">'+
							'<a href="">Clear</a>'+
						'</li>');
						
	//deselect other checkboxes
	$clearFilters
	.find("a")
	.click(function(e){
		e.stopPropagation();
		$(this)
		.closest(".selected-filters")
		.find(".filter")
		.remove();
		
		var filterSet = $(this).closest(".filter-set");
		
		plenty_admin.DATA.userFilters.filterDto[filterSet.data("filter")] = [];
		
		plenty_admin.DATA.update_filters();
		
		$(this)
		.parent()
		.remove();
		
		return false;
	});
	
	return $clearFilters;
}

plenty_admin.UI.filters.build_filter_entity = function(entityData, filter, active){
	var $filterHTML = $([
						'<li class="filter' + (active ? " active" : ""),
							'" data-filterid="' + filter.toLowerCase(), + entityData.id,
							'" data-id="' + entityData.id,
							'" data-name="' + entityData.name + '">',
							'<a href="">',
								entityData.name,
								' <input type="checkbox"',
								(active ? " checked" : ""),
								' class="pull-right">',
							'</a>',
						'</li>'].join(""));
	
	$filterHTML		
	.find("a")
	.click(function(e){
		e.stopPropagation();
		
		console.log("clicked a filter, is it a checkbox? ", e);
		
		if($(e.target).prop("type") === "checkbox"){
			return;
		}
		
		var filterToggle = $(e.target).find("input[type='checkbox']");
		
		filterToggle
		.prop("checked", !filterToggle.prop("checked"))
		.trigger("change");
		
		return false;
	})
	.find("input[type='checkbox']")
	.on("change", function(e){
		e.stopPropagation();
		
		var closestLI = $(this).closest("li");
		
		if(closestLI.hasClass("all") && $(this).is(":checked")){
			$(this).prop("checked", true);
			return;
		}
		
		closestLI
		.toggleClass("active");
		
		var hash = "";
		
		//set the filter in the filter panel
		if($(this).closest(".popover").length >0){
			//console.log("BEFORE: plenty_admin.DATA.userFilters:", plenty_admin.DATA.userFilters);
			if($(this).closest(".all-filters").hasClass("farms_quickfilter_popover")){
				hash = "farmIds";
			}else if($(this).closest(".all-filters").hasClass("orgs_quickfilter_popover")){
				hash = "organizationIds";
			}
		}else{
			hash = closestLI.closest(".filter-set").data("filter");
		}
		
		if($(this).is(":checked")){
			console.log("CHECKED");
			if(
				closestLI.hasClass("all")
			){
				plenty_admin.DATA.userFilters.filterDto[hash] = [];
			}else{
				plenty_admin.DATA.userFilters.filterDto[hash] = [];
				closestLI
				.closest("ul")
				.find("li.filter:not(.all) input[type='checkbox']:checked")
				.each(function(){
					plenty_admin.DATA.userFilters.filterDto[hash].push(parseInt($(this).closest("li").data("id")));
				});
				
				if(
					plenty_admin.DATA.userFilters.filterDto[hash] === plenty_admin.DATA.userFilters.possibleFilteringEntitiesDtoList[hash.replace("Ids", "s")]
				){
					plenty_admin.DATA.userFilters.filterDto[hash] = [];
				}
			}
		}else{
			console.log("UN-CHECKED");
			var index = plenty_admin.DATA.userFilters.filterDto[hash].indexOf(parseInt(closestLI.data("id")));
			//console.log("index", index);
			//console.log("plenty_admin.DATA.userFilters.filterDto[hash+'Ids']", plenty_admin.DATA.userFilters.filterDto[hash+"Ids"]);
			//console.log('parseInt(closestLI.data("id"))', parseInt(closestLI.data("id")));
			if (index > -1) {
				plenty_admin.DATA.userFilters.filterDto[hash].splice(index, 1);
			}
		}
		//console.log("AFTER: plenty_admin.DATA.userFilters:", plenty_admin.DATA.userFilters);
		plenty_admin.DATA.update_filters();
	});
	
	return $filterHTML;
}

plenty_admin.UI.filters.populate = function(init, callback){
	console.log("populate: ", plenty_admin.DATA.userFilters, init);
	for(filter in plenty_admin.DATA.userFilters.possibleFilteringEntitiesDtoList){
		if(
			plenty_admin.DATA.userFilters.possibleFilteringEntitiesDtoList.hasOwnProperty(filter)
			&& plenty_admin.UI[plenty_admin.context].applicableFilters.indexOf(filter.toLowerCase()) > -1
		){
			var filterName = filter.split(/(?=[A-Z])/).join(" ");
			var filterNormalized = filter.toLowerCase();
			var filterIDName = filter.substring(0, filter.length - 1)+"Ids";
			var possibleEntities = plenty_admin.DATA.userFilters.possibleFilteringEntitiesDtoList[filter];
			if(init === true){
				plenty_admin.UI.filters.build_filter_set(filterName, filterNormalized);
			}
			
			
			//check if all possible options are applied
			var allApplied = possibleEntities.length === plenty_admin.DATA.userFilters.filterDto[filterIDName].length || plenty_admin.DATA.userFilters.filterDto[filterIDName].length == 0;
			
			//console.log(filter+" - ARE ALL APPLIED? ", allApplied);
			
			plenty_admin.UI.filters.DOM
			.find(".filter-set."+filterNormalized +" .all-filters")
			.html("")
			.append(plenty_admin.UI.filters.build_all_filters_entry(filterNormalized, allApplied ));
			
			if(possibleEntities.length > 0){
				for(f=0; f<possibleEntities.length; f++){
					var entity = possibleEntities[f];
					//console.log("entity:", entity, filter, filterIDName);
					
					// add the filter element to the correct panel
					plenty_admin.UI.filters.DOM
					.find(".filter-set."+ filter.toLowerCase() +" .all-filters")
					.append(plenty_admin.UI.filters.build_filter_entity(entity, filter, (allApplied ? false : plenty_admin.DATA.userFilters.filterDto[filterIDName].indexOf(entity.id) > -1)));
				}
			}
		}
	}
	
	//reset active filters count
	var applied_filter_count = 0;
	
	for(filterId in plenty_admin.DATA.userFilters.filterDto){
		if(
			plenty_admin.DATA.userFilters.filterDto.hasOwnProperty(filterId)
			&& plenty_admin.UI[plenty_admin.context].applicableFilters.indexOf(filterId.replace("Ids", "s").toLowerCase()) > -1
		){
			//empty the selected filters container for this filter set
			plenty_admin.UI.filters.DOM
			.find(".filter-set[data-filter='"+filterId+"'] .selected-filters li.filter, .filter-set[data-filter='"+filterId+"'] .selected-filters li.clear-filters")
			.remove();
			
			var compareLength = plenty_admin.DATA.userFilters.possibleFilteringEntitiesDtoList[filterId.replace("Ids", "s")].length;
			//console.log("userFilters: ", plenty_admin.DATA.userFilters.filterDto[filterId].length, compareLength);
			if(
				plenty_admin.DATA.userFilters.filterDto[filterId].length > 0
				&& compareLength != plenty_admin.DATA.userFilters.filterDto[filterId].length
			){
				//need to render these applied filters
				var appliedFilter = plenty_admin.DATA.userFilters.filterDto[filterId];
				applied_filter_count += plenty_admin.DATA.userFilters.filterDto[filterId].length;
				
				//console.log("appliedFilter", appliedFilter);
				//console.log("applied_filter_count", applied_filter_count);
				
				var allApplied = false;
				var quickFilterText = "";
				
				switch(filterId){
					case "organizationIds":
					if(plenty_admin.DATA.userFilters.filterDto[filterId].length === 1){
						quickFilterText = plenty_admin.DATA.userFilters.possibleFilteringEntitiesDtoList[filterId.replace("Ids", "s")][0].name;
					}else if(compareLength === plenty_admin.DATA.userFilters.filterDto[filterId].length || plenty_admin.DATA.userFilters.filterDto[filterId].length == 0){
						quickFilterText = "All Organizations";
						allApplied = true;
					}else{
						quickFilterText = "Multiple Organizations";
					}
					break;
					
					case "farmIds":
						if(plenty_admin.DATA.userFilters.filterDto[filterId].length === 1){
							quickFilterText = plenty_admin.DATA.userFilters.possibleFilteringEntitiesDtoList[filterId.replace("Ids", "s")][0].name;
						}else if(compareLength === plenty_admin.DATA.userFilters.filterDto[filterId].length || plenty_admin.DATA.userFilters.filterDto[filterId].length == 0){
							quickFilterText = "All Farms";
							allApplied = true;
						}else{
							quickFilterText = "Multiple Farms";
						}
					break;
					
					default:
						//console.log("CHECK!!", filterId, plenty_admin.DATA.userFilters.filterDto[filterId].length, plenty_admin.DATA.userFilters.possibleFilteringEntitiesDtoList[filterId.replace("Ids", "s")	].length);
						if(
							plenty_admin.DATA.userFilters.possibleFilteringEntitiesDtoList[filterId.replace("Ids", "s")	].length === plenty_admin.DATA.userFilters.filterDto[filterId].length 
							|| plenty_admin.DATA.userFilters.filterDto[filterId].length == 0
							|| plenty_admin.DATA.userFilters.filterDto[filterId].length > plenty_admin.DATA.userFilters.possibleFilteringEntitiesDtoList[filterId.replace("Ids", "s")	].length
						){
							allApplied = true;
						}
				}
				
				var addClear = false;
					
				for(var d=0; d<appliedFilter.length; d++){
					var entityData = {};
					entityData.id = appliedFilter[d];
					matchIt = $.grep(plenty_admin.DATA.userFilters.possibleFilteringEntitiesDtoList[filterId.replace("Ids", "s")], function(el, x){
						//console.log("GREP: ", el, appliedFilter[d]);
						return el.id == appliedFilter[d];
					});
					
					//console.log("matchIt", matchIt);
					
					if(matchIt.length >0 && !allApplied){
						entityData.name = matchIt[0].name;
						entityData.filter = filterId.replace("Ids", "s");
						plenty_admin.UI.filters.add_selected_filter(entityData);
						addClear = true;
					}
				}
				
				if(addClear){
					var filterSet = plenty_admin.UI.filters.DOM.find(".filter-set."+filterId.replace("Ids", "s").toLowerCase());
		
					filterSet
					.find(".selected-filters")
					.append(plenty_admin.UI.filters.build_clear_filters_entry());
				}
				
				
				//set the quickFilter to the selected farm / organization
				switch(filterId){
					case "organizationIds":
						plenty_admin.UI.map.orgs_quickfilter
						.text(quickFilterText);
					break;
					
					case "farmIds":
						plenty_admin.UI.map.farms_quickfilter
						.text(quickFilterText);
					break;
				}
			}else{
				plenty_admin.UI.filters.DOM
				.find(".filter-set[data-filter='"+filterId+"'] .selected-filters li.filter")
				.show();
				
				//set the quickFilter to All
				switch(filterId){
					case "organizationIds":
						plenty_admin.UI.map.orgs_quickfilter
						.text("All Organizations");
					break;
					
					case "farmIds":
						plenty_admin.UI.map.farms_quickfilter
						.text("All Farms");
					break;
				}
			}
		}
	}
	
	//set the number of applied filters
	if(applied_filter_count > 0){
		plenty_admin.UI.map.toggleFilters
		.find("span")
		.text("("+applied_filter_count+")");
	}else{
		plenty_admin.UI.map.toggleFilters
		.find("span")
		.text("");
	}
	
	//update the quickFilter panels if open
	var orgs_quickFilter_popover = plenty_admin.UI.map.orgs_quickfilter.parent().find(".orgs_quickfilter_popover");
	if(orgs_quickFilter_popover.is(":visible")){
		//update the orgs quickFilter panel
		var thePopover = orgs_quickFilter_popover.parent();
		orgs_quickFilter_popover
		.remove();
		
		plenty_admin.UI.filters.DOM
		.find(".filter-set.organizations .all-filters")
		.clone(true, true)
		.addClass("orgs_quickfilter_popover")
		.show()
		.appendTo(thePopover);
	}
	
	var farms_quickFilter_popover = plenty_admin.UI.map.farms_quickfilter.parent().find(".farms_quickfilter_popover");
	if(farms_quickFilter_popover.is(":visible")){
		//update the orgs quickFilter panel
		var thePopover = farms_quickFilter_popover.parent();
		
		farms_quickFilter_popover
		.remove();
		
		plenty_admin.UI.filters.DOM
		.find(".filter-set.farms .all-filters")
		.clone(true, true)
		.addClass("farms_quickfilter_popover")
		.show()
		.appendTo(thePopover);
	}
	
	
	if(callback && typeof callback === "function"){
		callback();
	}
	
	plenty_admin.UI.map.filterControls
	.find(".quickFilters")
	.fadeIn("fast");
}

plenty_admin.UI.filters.hide_filters = function(){
	plenty_admin.UI.filters.DOM
	.css("right", -(plenty_admin.UI.filters.DOM.outerWidth()));
}

plenty_admin.UI.filters.show_filter_selectors = function(el){
	//show this filter sets filters
	$(el.target)
	.closest(".filter-set")
	.find("ul.selected-filters")
	.slideUp("fast")
	.end()
	.find("ul.all-filters")
	.slideDown("fast");
}

plenty_admin.UI.filters.hide_filter_selectors = function(el){
	//show this filter sets filters
	$(el.target)
	.closest(".filter-set")
	.find("ul.selected-filters:not(:empty)")
	.slideDown("fast")
	.end()
	.find("ul.all-filters")
	.slideUp("fast");
}

plenty_admin.UI.filters.show_selected_filters = function(){
	plenty_admin.UI.filters.DOM
	.find("ul.all-filters")
	.slideUp("fast")
	.end()
	.find("ul.selected-filters:not(:empty)")
	.slideDown("fast");
}

plenty_admin.UI.filters.build_filter_set = function(filter, filterNormalized){
	var filterIDName = filterNormalized.slice(0, filterNormalized.lastIndexOf("s"))+"Ids";
	if(filterIDName == "croptypeIds"){
		filterIDName = "cropTypeIds";
	}
	
	var $filterSetHTML = $(['<div class="filter-set mbs '+filterNormalized+'" data-filter="'+filterIDName+'">',
							'<h3 class="title filter-title mbm">',
								'<a href="" class="show-filters pull-right">',
									'<span class="icon pull-left"></span> ',
									filter,
									'<i class="icon glyphicon glyphicon-triangle-right pull-right"></i>',
								'</a>',
							'</h3>'+
							'<ul class="selected-filters clear mbn">',
								'<li class="filter all">',
									'<span class="pull-left">All</span>',
								'</li>',
							'</ul>',
							'<ul class="all-filters clear mbn" style="display:none;">',
							'</ul>',
						'</div>'].join(""));
	
	//set up the filter toggle list
	$filterSetHTML
	.data("state", "closed")
	.find(".filter-title a")
	.click(function(e){
		e.stopPropagation();
		if($filterSetHTML.data("state") === "closed"){
			plenty_admin.UI.filters.show_filter_selectors(e);
			$filterSetHTML
			.data("state", "open")
			.addClass("open");
		}else{
			plenty_admin.UI.filters.hide_filter_selectors(e);
			$filterSetHTML
			.data("state", "closed")
			.removeClass("open");
		}
		
		return false;
	});
	
	plenty_admin.UI.filters.DOM
	.find("#filter-set-wrapper")
	.append($filterSetHTML);
}

plenty_admin.UI.filters.toggleFilters = function(force){
	//console.log("plenty_admin.UI.filters.toggleFilters: ", force);
	if(force === "open"){
		plenty_admin.UI.filters.state = "open";
		
		plenty_admin.UI.filters.DOM
		.stop()
		.clearQueue()
		.animate({"right":0});
	}else if(force === "close"){
		plenty_admin.UI.filters.state = "closed";
		
		plenty_admin.UI.filters.DOM
		.stop()
		.clearQueue()
		.animate({"right":-(plenty_admin.UI.filters.DOM.width()+1)});
	}else if(plenty_admin.UI.filters.state === "closed"){
		plenty_admin.UI.filters.state = "open";
		
		plenty_admin.UI.filters.DOM
		.stop()
		.clearQueue()
		.animate({"right":0});
	}else if(plenty_admin.UI.filters.state === "open"){
		plenty_admin.UI.filters.state = "closed";
		console.log("toggleFilters - close: ", plenty_admin.UI.filters.DOM.width());
		plenty_admin.UI.filters.DOM
		.stop()
		.clearQueue()
		.animate({"right":-(plenty_admin.UI.filters.DOM.width()+1)});
	}
}

plenty_admin.REST.get_x_by_filtered = function(x, callback){
	var parsedX = x.replace(/ /g, "");
	plenty_admin.REST["get"+parsedX+"Filtered"] = plenty_admin.api.one("filters/get"+parsedX+"Filtered", plenty_admin.DATA.userFilters.filterDto.id);
	
	plenty_admin.REST["get"+parsedX+"Filtered"].get().then(function(data){
			//console.log("data: ", data);
			if(callback && typeof callback === "function"){
				callback(data, x);
			}
		}
	);
}

plenty_admin.DATA.update_filters = function(callback, init, zoomFields, context){
	console.log("plenty_admin.DATA.update_filters", zoomFields);
	plenty_admin.HELPER.showLoadingOverlay();
	
	plenty_admin.REST.update_filters.post(plenty_admin.DATA.userFilters.filterDto).then(function(data){
			//console.log("data: ", data.body());
			//update the local possible filter entities only
			//manage the filterDTO selected locally only as it differs from what is returned by the server
			plenty_admin.DATA.userFilters.possibleFilteringEntitiesDtoList = data.body().possibleFilteringEntitiesDtoList;
			
			plenty_admin.UI.filters.populate(init);
			
			switch(plenty_admin.context){
				case "map":
					plenty_admin.UI.map.populate(plenty_admin.DATA.userFilters.possibleFilteringEntitiesDtoList.fields, zoomFields);
					plenty_admin.UI.map.add_equipment_to_map();
					
					plenty_admin.UI.map.toggleFilters
					.parent()
					.fadeIn("fast")
					.parent()
					.find(".filter_loader")
					.fadeOut("fast");
				break;
				
				case "plans":
					var d = new Date();
					var year = d.getUTCFullYear();
					plenty_admin.UI.plans.eventCollector = window.eventcollector(2, 10000);
					plenty_admin.REST.getPlansFiltered(plenty_admin.DATA.userFilters.filterDto.id);
					plenty_admin.REST.getFieldCropsByYearFiltered(plenty_admin.DATA.userFilters.filterDto.id, year);
					plenty_admin.UI.plans.eventCollector.on('alldone', function(total) {
						plenty_admin.UI.plans.populate();
					});
				break;
			}
			
			if(callback && typeof callback === "function"){
				callback(data);
			}
			
			//plenty_admin.HELPER.hideLoadingOverlay();
		}
	);
}

plenty_admin.UI.filters.init();
//*********************** organization.js **************************//
//create namespace for organization layout
plenty_admin.UI.organization = {};
plenty_admin.UI.organization.DOM = plenty_admin.UI.main.DOM.find("#organization-container");
plenty_admin.UI.organization.tabs = {};
plenty_admin.UI.organization.tabs.DOM = plenty_admin.UI.organization.DOM.find('#orgAssets');

plenty_admin.UI.organization.MODAL_add_to_organization = plenty_admin.UI.DOM.find('#add_to_organization');
plenty_admin.UI.organization.MODAL_edit_in_organization = plenty_admin.UI.DOM.find('#edit_in_organization');
plenty_admin.UI.organization.MODAL_confirm_delete = plenty_admin.UI.DOM.find('#confirm_delete');
plenty_admin.UI.organization.MODAL_edit_field = plenty_admin.UI.DOM.find('#edit_field');
plenty_admin.UI.organization.MODAL_add_field = plenty_admin.UI.DOM.find('#add_field');

plenty_admin.UI.organization.BUTTON_delete_multiple = plenty_admin.UI.organization.DOM.find(".delete_multiple");

plenty_admin.UI.organization.filter_by_farm = plenty_admin.UI.organization.DOM.find("select.filter-by-farm");

// create references to common entity APIs
var entities = ["Farm", "User", "Equipment", "Product", "Plan", "Skill", "Payment", "Role", "Interest", "Organization"];

for(var e=0; e < entities.length; e++){
	var entity = entities[e];
	plenty_admin.REST["insert"+entity] = plenty_admin.api.all(entity.toLowerCase()+(entity === "Equipment" || entity === "Role" ? "" : "s")+"/insert"+entity);
	plenty_admin.REST["delete"+entity] = plenty_admin.api.all(entity.toLowerCase()+(entity === "Equipment" || entity === "Role" ? "" : "s")+"/delete"+entity);
	plenty_admin.REST["update"+entity] = plenty_admin.api.all(entity.toLowerCase()+(entity === "Equipment" || entity === "Role" ? "" : "s")+"/update"+entity);
}

plenty_admin.REST.insertBoundary = plenty_admin.api.all("boundaries/insertBoundary");
plenty_admin.REST.insertBoundaryPointsArray = plenty_admin.api.all("boundaryPoints/insertBoundaryPointsArray");
plenty_admin.REST.updateBoundaryPointsArray = plenty_admin.api.all("boundaryPoints/updateBoundaryPointArray");

plenty_admin.REST.insertField = plenty_admin.api.all("fields/createFieledWithBoundaryInterestAndCropType");

plenty_admin.REST.insertFieldCrop = plenty_admin.api.all("fieldCrops/insertFieldCrop");
plenty_admin.REST.updateFieldCrop = plenty_admin.api.all("fieldCrops/updateFieldCrop");
plenty_admin.REST.deleteFieldCrop = plenty_admin.api.all("fieldCrops/deleteFieldCrop");

plenty_admin.REST.insertFieldEquipment = plenty_admin.api.all("fieldEquipment/insertWithNewEquipment");
plenty_admin.REST.updateFieldEquipment = plenty_admin.api.all("fieldEquipment/updateFieldEquipment");
plenty_admin.REST.deleteFieldEquipment = plenty_admin.api.all("fieldEquipment/deleteFieldEquipment");

plenty_admin.REST.insertActivity = plenty_admin.api.all("activities/insertActivity");
plenty_admin.REST.updateActivity = plenty_admin.api.all("activities/updateActivity");
plenty_admin.REST.deleteActivity = plenty_admin.api.all("activities/deleteActivity");

plenty_admin.REST.createTemplatePlan = plenty_admin.api.all("templatePlan/createTemplatePlan");

// method to initiate and show this screen
plenty_admin.UI.organization.init = function(org, hash){
	//set the current organization
	plenty_admin.DATA.current_organization = org;
	
	plenty_admin.DATA.data_source = plenty_admin.DATA.current_organization;
	
	plenty_admin.UI.currentScreen = plenty_admin.UI.organization.DOM;
	plenty_admin.UI.organization.populate(org, hash);
	plenty_admin.UI.organization.populate_farms_filter();
	
	plenty_admin.REST.getSkillsAndRatesForOrg(function(){
		plenty_admin.UI.organization.DOM.fadeIn("normal", function(){
			plenty_admin.HELPER.hideLoadingOverlay();
			plenty_admin.UI.add_template_plan.init();
		});
		
		//show the selected item in the side nav
		plenty_admin.UI.sideBar.organizations.DOM
		.find(".panel-collapse.in")
		.removeClass("in")
		.end()
		.find(".panel-collapse[data-orgid='"+org.id+"']")
		.addClass("in")
		.find("li.sub")
		.removeClass("active")
		.end()
		.find("li.sub a[href='"+hash+"']")
		.parent()
		.addClass("active");
	});	
	
	plenty_admin.UI.organization.DOM
	.find("button.btn.add_to_organization")
	.off("click")
	.on("click", function(e){
		var modalContext = ["Add", "to", "insert"];
		var url = plenty_admin.UI.organization.tabs.DOM.find("li.active a[role='tab']").prop("href");
		var hash = url.substring(url.indexOf('#')+1);
		console.log("add_to_organization: ", url, hash);
		if(hash === "fields"){
			plenty_admin.UI.organization.show_add_field_modal();
		}else if(hash === "plans"){
			plenty_admin.UI.add_template_plan.show();
		}else{
			plenty_admin.UI.organization.show_item_modal("add_to_organization", modalContext);
		}
		
	})
	.end()
	.find("button.delete_multiple")
	.off("click")
	.on("click", function(e){
		var selected_items = plenty_admin.UI.organization.tabs.DOM.find(".tab-pane.active tr td input[type='checkbox']:checked");
		console.log("selected_items:", selected_items);
		bootbox.confirm({
				message: "Are you sure you want to delete multiple fields?", 
				className: "danger",	
				callback: function(){
					selected_items.each(function(){
						var itemId = $(this).closest("tr").data("id");
						plenty_admin.UI.organization.deleteX(itemId, plenty_admin.HELPER.get_singular_selected_hash());
					});
				}
			});
	})
	.end()
	.find("select.filter-by-farm")
	.off("change")
	.on("change", function(e){
		var _val = $(this).val();
		switch(_val){
			case "all":
				plenty_admin.UI.organization.DOM
				.find("table.fieldsList")
				.find("tbody tr")
				.show();
			break;
			
			default:
				plenty_admin.UI.organization.DOM
				.find("table.fieldsList")
				.find("tbody tr")
				.hide()
				.end()
				.find("tbody tr[data-farmid='"+$(e.target).val()+"']")
				.show();
		}
		
	})
}

plenty_admin.UI.organization.show_add_field_modal = function(){
	var current_org_address = plenty_admin.DATA.current_organization.addressLine1 + 
							(plenty_admin.DATA.current_organization.addressLine2 ? ", "+plenty_admin.DATA.current_organization.addressLine2 : "")+
							", "+plenty_admin.DATA.current_organization.city+
							", "+plenty_admin.DATA.current_organization.state+
							", "+plenty_admin.DATA.current_organization.zip;
			
	console.log("current_org_address", current_org_address);
	plenty_admin.UI.organization.MODAL_add_field
	.off("shown.bs.modal")
	.on("shown.bs.modal", function(){
		//TODO: Insert Lat/LNG of organization from reverse Geo
		plenty_admin.MAPS.geocode(current_org_address, function(results){
			console.log("results: ", results, results[0].geometry.location);
			
			//HACK to center us on Kansas
			var center = new google.maps.LatLng(38.017922, -95.494064);
			plenty_admin.MAPS.add_field('add-field-map-canvas', center /*results[0].geometry.location*/, plenty_admin.UI.map.minCLUZoom, plenty_admin.UI.organization.MODAL_add_field.find(".modal-body"));
		});
	})
	.off("show.bs.modal")
	.on('show.bs.modal', function () {
		$(this).find('.modal-content').css('height', $( window ).height()*0.9);
	})
	.modal("show");
}

plenty_admin.UI.organization.show_edit_field_modal = function(fieldData, el){
	plenty_admin.UI.organization.MODAL_edit_field
	.off("shown.bs.modal")
	.on("shown.bs.modal", function(){
		plenty_admin.MAPS.edit_field(fieldData);
	})
	.off("show.bs.modal")
	.on('show.bs.modal', function () {
		$(this).find('.modal-content').css('height', $( window ).height()*0.9);
	})
	.modal("show");
}

plenty_admin.UI.organization.show_item_modal = function(modal, context, itemId, el){
	console.log("plenty_admin.UI.organization.show_item_modal", modal, context, itemId);
	//show the item modal of a specific entity
	// get the item hash type
	var url = plenty_admin.UI.organization.tabs.DOM.find("li.active a[role='tab']").prop("href");
	//var hash = url.substring(url.indexOf('#')+1);
	var hash = plenty_admin.UI.organization.tabs.DOM.find("li.active").data("hash");
	var hashSingular = plenty_admin.HELPER.get_singular_selected_hash(hash);
	var currentSub = plenty_admin.DATA.current_organization[hash];
	
	switch(context[2]){
		case "update":
		case "delete":
			var currentItem = $.grep(currentSub, function(el, i){
				if(hash === "fieldsAndCropTypes"){
					return el.field.id === itemId;
				}else{
					return el.id === itemId;
				}
			})[0];
			var modalTitle = context[0]+" "+currentItem.name+" "+context[1]+" "+plenty_admin.DATA.current_organization.name;
			console.log("currentItem", currentItem);
		break;
		
		case "add":
			var modalTitle = "Add a "+hash;
		break;
	}
	
	
	//console.log("item: ", item);
	//correct the language for the modal header
	var prep = (hash == "equipment" ? " a piece of " : " a ");
	
	//set up the modal before showing
	plenty_admin.UI.organization["MODAL_"+modal]
	.removeClass("farms users equipments products plans skills payments")
	.addClass(hash)
	.on("hidden.bs.modal", function(){
		$(this)
		.find("button."+context[0].toLowerCase())
		.button("reset");
	})
	.find(".modal-title")
	.text(modalTitle)
	.end()
	.find("button."+context[0].toLowerCase())
	.off("click")
	.on("click", function(e){
		$(this).button("loading");
		switch(context[2]){
			case "update":
				var item_form = $(this).closest(".modal").find(".modal-body form:visible");
				var item_object = plenty_admin.UI.organization.build_item(item_form, currentItem);
				plenty_admin.UI.organization[context[2]+"X"](item_object, hashSingular, el);
			break;
			
			case "delete":
				plenty_admin.UI.organization.deleteX(itemId, hashSingular, el, function(){
					console.log("item deleted");
					plenty_admin.UI.organization["MODAL_"+modal]
					.modal("hide");
				});
			break;
			
			default:
				var item_form = $(this).closest(".modal").find(".modal-body form:visible");
				var item_object = plenty_admin.UI.organization.build_item(item_form, (context[2] == "update" ? currentItem : null ));
				plenty_admin.UI.organization[context[2]+"X"](item_object, hashSingular, el);
		}
	})
	.button("reset");
	
	//get the form element
	var item_form = plenty_admin.UI.organization["MODAL_"+modal].find("form.add_to_org_form."+hash);
	
	//prefil the form if editing the entity
	switch(context[2]){
		case "update":
			plenty_admin.UI.organization.populate_form_from_item(item_form, itemId, hash);
		break;
		
		default:
		//clear the form
		item_form
		.find("input, textarea, select")
		.each(function(){
			if($(this).is("select")){
				$(this).find("option:eq(0)").prop("selected", true);
			}else{
				$(this).val("");
			}
		});
	}
	
	plenty_admin.UI.organization["MODAL_"+modal]
	.modal("show");
}

plenty_admin.UI.organization.deleteX = function(itemId, hash, evObj, callback){
	console.log("plenty_admin.UI.organization.deleteX", itemId, hash, evObj, callback);
	switch (hash){
		case "user":
			//get roles associated with user
			plenty_admin.REST.get_roles_with_userid(itemId, function(userRoles){
				console.log("user roles: ", userRoles, plenty_admin.DATA.current_organization.id);
				var RoleForUserInOrg = $.grep(userRoles, function(role, r){
					return role.organizationId === plenty_admin.DATA.current_organization.id;
				});
				
				console.log("RoleForUserInOrg", RoleForUserInOrg);
				
				// loop returned roles that match this org and delete them
				for(var r=0; r<RoleForUserInOrg.length; r++){
					var role = RoleForUserInOrg[r];
					
					//delete the provided data of the provided hash type
					plenty_admin.REST.deleteRole.delete(role.id)
					.then(
						function(userData){
							console.log(hash+" Deleted: ", userData);
							if(callback && typeof callback === "function"){
								callback();
							}
							$(evObj).closest("tr").remove();
							
							var remainingUsers = $.grep(plenty_admin.DATA.current_organization.users, function(user, u){
								return user.id !== itemId;
							});
							
							plenty_admin.DATA.data_source.users = remainingUsers;
						}
					);
				}
			});
		break;
		
		case "field":
			//delete interest
			//get the interest Id
			plenty_admin.REST.get_interests_by_field(itemId, function(interests){
				console.log("got all interests for field", interests);
				//find the one that matches this organization
				var currentOrgInterests = $.grep(interests, function(interest, i){
					return interest.organizationId === plenty_admin.DATA.data_source.id;
				})[0];
				
				
				//delete the provided data of the provided hash type
				plenty_admin.REST.deleteInterest.delete(currentOrgInterests.id)
				.then(
					function(interestData){
						console.log(hash+" Deleted: ", interestData);
						if(callback && typeof callback === "function"){
							callback();
						}
						$(evObj).closest("tr").remove();
						
						var remainingFields = $.grep(plenty_admin.DATA.data_source.fieldsAndCropTypes, function(field, f){
							return field.field.id !== itemId;
						});
						
						plenty_admin.DATA.data_source.fields = remainingFields;
					}
				);
			});
			
		break;
		
		default:
		//delete the provided data of the provided hash type
		plenty_admin.REST["delete"+plenty_admin.HELPER.capitalizeFirstLetter(hash)].delete(itemId)
			.then(
				function(){
					console.log(hash+" Deleted");
				});
		}
}	

plenty_admin.UI.organization.insertX = function(itemId, hash){
	//insert the provided data of the provided hash type
	plenty_admin.REST["insert"+plenty_admin.HELPER.capitalizeFirstLetter(hash)].post(itemId)
		.then(
			function(data){
				console.log(hash+" Inserted: ", data);
				var data_body = data.body();
				
				plenty_admin.UI.organization.MODAL_add_to_organization.modal("hide");
				
				//add custom functionality for each hash type where necessary
				switch (hash){
					case "user":
						var roleData = {
							organizationId:plenty_admin.DATA.current_organization.id,
							userId: data_body.id,
							roleTypeId:1
						};
						plenty_admin.REST.insertRole.post(roleData).then(function(newUser){
							
							var user_body = newUser.body();
							
							plenty_admin.REST.get_user_with_id(user_body.userId, function(user){
								//add user to the data set locally
								plenty_admin.DATA.current_organization.users.push(user);
								
								// add the new user to the table and to the data model
								var $userHTML = $(plenty_admin.UI.create_item(user, hash));
								
								plenty_admin.UI.organization.DOM.find("table.usersList")
								.find(".noItemsText")
								.remove()
								.end()
								.append($userHTML);
								
								plenty_admin.UI.organization.addItemFunctionality($userHTML);
							});
						});
					break;
				}
			});
}

plenty_admin.UI.organization.updateX = function(new_item, hash, el, callback){
	//insert the provided data of the provided hash type
	plenty_admin.REST["update"+plenty_admin.HELPER.capitalizeFirstLetter(hash)].put(new_item)
		.then(
			function(updatedX){
				console.log(hash+" Updated: ", updatedX, updatedX.body());
				
				//update entries in the table
				plenty_admin.UI.update_entries_in_table(el, updatedX.body());
				plenty_admin.UI.organization.MODAL_edit_in_organization.modal("hide");
				
				if(callback && typeof callback === "function"){
					callback(updatedX.body());
				}
			});
}

plenty_admin.UI.update_entries_in_table = function(el, newData){
	var $row = $(el).closest("tr");
	for (p in newData) {
		if (newData.hasOwnProperty(p) )  {
			$row.find("td."+p+" span").text(newData[p]);
		}
	}
}


plenty_admin.UI.organization.tabs.DOM
.off("shown.bs.tab")
.on('shown.bs.tab', function (e) {
	var url = e.target.href;
	var hash = url.substring(url.indexOf('#'));
	//store ref to the event object
	var orgId = plenty_admin.UI.organization.DOM.data("orgId");
	
	//trigger the change in selection in the sidebar
	plenty_admin.UI.sideBar.organizations.select_sub(orgId, hash);
	
	// show / hide delete button if checkboxes are selected
	var numChecked = plenty_admin.UI.organization.tabs.DOM.find(".tab-pane.active tr td input[type='checkbox']:checked").length;

	if(numChecked > 0){
		plenty_admin.UI.organization.BUTTON_delete_multiple.fadeIn("fast");
	}else{
		plenty_admin.UI.organization.BUTTON_delete_multiple.fadeOut("fast");
	}
	
	//hide "Add" on the farms tab
	//A farm can only be added when creating a field
	//A farm is deleted when no fields exist in it
	//But the details of a farm, it's name, can be edited inline
	switch(hash){
		case "#farms":
			plenty_admin.UI.organization.tabs.DOM
			.find(".add_delete_controls")
			.fadeOut("fast")
			.end()
			.find(".alert.farm-info")
			.fadeIn("fast")
			.end()
			.find(".filter-by-farm-group")
			.hide();
		break;
		
		case "#fields":
			plenty_admin.UI.organization.tabs.DOM
			.find(".filter-by-farm-group")
			.show()
			.end()
			.find(".add_delete_controls")
			.fadeIn("fast")
			.end()
			.find(".alert.farm-info")
			.fadeOut("fast");
		break;
		
		default:
			plenty_admin.UI.organization.tabs.DOM
			.find(".filter-by-farm-group")
			.fadeOut("fast")
			.end()
			.find(".add_delete_controls")
			.fadeIn("fast")
			.end()
			.find(".alert.farm-info")
			.fadeOut("fast");
		break;
	}
});

plenty_admin.UI.organization.items = function(itemList, hash){
	//console.log("plenty_admin.UI.organization.items: ", itemList, hash);
	if(itemList.length <= 0){
		var itemsHTML = "<h3 class='noItemsText'>No items in this set yet!</h3>";
	}else if(itemList instanceof Object && !Array.isArray(itemList)){
		var itemsHTML = "<h3 class='noItemsText'>No properties in this object yet!</h3>";
	}else{
		var itemData = (hash == "fieldsAndCropTypes" ? itemList[0].field : itemList[0]);
		var itemsHeaderHTML = plenty_admin.UI.create_header_row(itemData, hash);
		
		var itemsHTML = '<tbody>';
		for(var i=0; i< itemList.length; i++){
			var item = itemList[i];
			itemsHTML += plenty_admin.UI.create_item(item, hash);
		}
		itemsHTML += '</tbody>';
	}
	
	var $itemsHTML = $(itemsHTML);
	
	var tableElements = {
		headerHTML: itemsHeaderHTML,
		bodyHTML: plenty_admin.UI.organization.addItemFunctionality($itemsHTML)
	};
	
	return tableElements;
}
plenty_admin.UI.organization.showFieldPage = function(fieldObj){
	console.log("showFieldPage: ", fieldObj);
	//build the breadcrumb trail object
	var field_breadcrumb = [
		{
			class:"back toSettings",
			name:"Settings",
			clickHandler:function(){
				plenty_admin.UI.currentScreen
				.fadeOut("normal", function(){
					plenty_admin.UI.currentScreen = plenty_admin.UI.settings.DOM;
					plenty_admin.UI.currentScreen.fadeIn("normal");
				});
				return false;
			}
		},
		{
			class:"back toOrganization",
			name:plenty_admin.DATA.current_organization.name,
			clickHandler:function(){
				plenty_admin.UI.currentScreen
				.fadeOut("normal", function(){
					plenty_admin.UI.currentScreen = plenty_admin.UI.organization.DOM;
					plenty_admin.UI.currentScreen.fadeIn("normal");
				});
				return false;
			}
		},
		{
			class:"active",
			name:fieldObj.name,
			clickHandler:null
		}
	];
	
	plenty_admin.UI.field.DOM
	.find(".breadcrumb-trail")
	.remove()
	.end()
	.prepend(plenty_admin.UI.build_breadcrumb_trail(field_breadcrumb));
						
	//build the field view
	plenty_admin.UI.field.init(fieldObj, "settings");
}
plenty_admin.UI.organization.addItemFunctionality = function($itemHTML){
	// add functionality here
	$itemHTML
	.find("td input[type='checkbox']")
	.off("click")
	.on("click", function(e){
		// check number of checked checkboxes
		var numChecked = $(e.target).closest("tbody").find("tr td input[type='checkbox']:checked").length;
		if(numChecked > 0){
			plenty_admin.UI.organization.BUTTON_delete_multiple.fadeIn("fast");
		}else{
			plenty_admin.UI.organization.BUTTON_delete_multiple.fadeOut("fast");
		}
	})
	.end()
	.find("td button.btn.editItem")
	.off("click")
	.on("click", function(e){
		var thisTR = $(this).closest("tr");
		// edit entire entry
		var modalContext = ["Update", "in", "update"];
		var itemId = thisTR.data("id");
		
		switch(thisTR.data("hash")){
			case "fieldsAndCropTypes":
				var fieldObj  = $.grep(plenty_admin.DATA.data_source.fieldsAndCropTypes, function(field, f){
					return field.field.id === itemId;
				})[0].field;
				
				plenty_admin.UI.organization.show_edit_field_modal(fieldObj, e.target);
			break;
			
			default:
				plenty_admin.UI.organization.show_item_modal("edit_in_organization", modalContext, itemId, e.target);
		}
	})
	.end()
	.find("td button.btn.deleteItem")
	.off("click")
	.on("click", function(e){
		var itemId = $(this).closest("tr").data("id");
		var modalContext = ["Remove", "from", "delete"];
		
		plenty_admin.UI.organization.show_item_modal("confirm_delete", modalContext, itemId, e.target);
	})
	.end()
	.find("td.map_thumbnail a")
	.click(function(e){
		var itemId = $(e.target).closest("tr").data("id");
		
		var fieldObj = $.grep(plenty_admin.DATA.current_organization.fieldsAndCropTypes, function(_item, i){
			return _item.field.id === itemId;
		})[0].field;
		
		plenty_admin.UI.organization.showFieldPage(fieldObj);
		return false;
	});
	
	return $itemHTML;
}

plenty_admin.UI.create_header_row = function(item, hash){
	//console.log("plenty_admin.UI.create_header_row: ", item, hash);
	//open the table head
	var domHTML = '<thead><tr>';
		domHTML += '<th class="select" style="width:60px;">Select</th>';
		
		if(hash === "fieldsAndCropTypes"){
			domHTML += '<th class="select" style="width:100px;">Preview</th>';
		}
		
		if (item.hasOwnProperty("name")){
			domHTML += '<th>Name</th>';
		}
		if (item.hasOwnProperty("firstName")){
			domHTML += '<th>First Name</th>';
		}
		if (item.hasOwnProperty("lastName")){
			domHTML += '<th>Last Name</th>';
		}
		for (p in item) {
			if (item.hasOwnProperty(p) )  {
				if(
					// exclude a few fields from the table
					p !== "id" 
					&& p !== "name"
					&& p !== "firstName" 
					&& p !== "lastName"
					&& p !== "created"
					&& p !== "lastModified"
					&& p !== "enabled"
					&& p !== "farmId"
					&& p !== "organizationId"
					&& p !== "radarCode"
					&& p !== "equipmentId"
					&& p !== "equipmentTypeId"
				){
					var correctedHeader = "";
					var headerWidth = "";
					switch(p){
						case "lastModified":
							correctedHeader = "Last Modified";
						break;
						
						case "mobileNumber":
							correctedHeader = "Mobile #";
						break;
						
						case "postalCode":
							correctedHeader = "ZIP";
						break;
						
						case "weatherForecastCity":
							correctedHeader = "City";
						break;
						
						case "weatherForecastState":
							correctedHeader = "State";
						break;
						
						case "latitude":
							correctedHeader = "Lat";
						break;
						
						case "longitude":
							correctedHeader = "Lon";
						break;
						
						case "stateCode":
							correctedHeader = "State";
						break;
						
						case "equipmentTypeName":
							correctedHeader = "Equipment Type";
						break;
						
						case "earliestDateFromPlanting":
							correctedHeader = "Earliest Date from Planting";
						break;
						
						case "standardWagePerHour":
							correctedHeader = "Std. Wage / hr";
						break;
						
						default:
							correctedHeader = p;
					}
					
					if(Array.isArray(item[p])){
						correctedHeader = "# "+correctedHeader;
					}
					
					domHTML += '<th class="text-capitalize">'+correctedHeader+'</th>';
				}
			}
		}
	domHTML += '<th class="text-right prn">Controls</th>';
	domHTML += '</tr></thead>';
	return domHTML;

}

plenty_admin.UI.create_item = function(item, hash){
	//console.log("plenty_admin.UI.create_item: ", item, hash);
	if(hash === "fieldsAndCropTypes"){
		var itemData = (item.id ? item : item.field);
		plenty_admin.REST.fields.getAllBoundaryPointsByFieldAndBoundaryType(itemData.id, 2 /* We are only interested in field boundaries here*/, function(boundaries){
			//console.log("got boundaries for field: ", boundaries);
			
			var bounds = new google.maps.LatLngBounds();	
			boundaries.forEach(function(xy, i) {
				bounds.extend(new google.maps.LatLng(xy.latitude, xy.longitude));
			});
			
			var fieldCenter = bounds.getCenter();
			
			//console.log("fieldCenter", fieldCenter);
		  
			var pathString = "color:0x758e1b|weight:2";
			boundaries.forEach(function(boundary, b){
				pathString += "|" + boundary.latitude+","+boundary.longitude
			});
			
			staticMapParams = {
				center:fieldCenter.lat()+","+fieldCenter.lng(),
				size:"80x80",
				maptype:"hybrid",
				zoom: plenty_admin.MAPS.getBoundsZoomLevel(bounds, {width:80, height:80}),
				path:pathString
			};
			
			//console.log("staticMapParams: ", staticMapParams);
			
			var thumb_url = plenty_admin.MAPS.get_static_maps_url(staticMapParams);
			var field_thumb = plenty_admin.UI.organization.DOM
				.find("table.fieldsList")
				.find("tbody tr[data-id='"+itemData.id+"'] td.map_thumbnail img");
			set_thumb_url(thumb_url);
			
			function set_thumb_url(thumb_url){
				if(field_thumb.length > 0){
					field_thumb
					.prop("src", thumb_url);
				}else{
					var to = setTimeout(function(){
						console.log("checking field dom element");
						set_thumb_url(thumb_url);
					}, 300);
				}
			}
		});
	}else{
		var itemData = item;
	}
	
	var domHTML = '<tr class="reveal-on-hover-wrap '+
					hash+
					'" data-id="'+itemData.id+
					'" data-hash="'+hash+
					'" '+(hash === "fieldsAndCropTypes" ? "data-farmid='"+itemData.farmId+"'" : "")+
					'>';
					
					domHTML += '<td><input type="checkbox" aria-label="..."></td>';
					
					if(hash === "fieldsAndCropTypes"){
						domHTML += '<td class="map_thumbnail" style="width:80px;"><a href=""><img src="" width="80" height="80"/></a></td>';
					}
					
					if (itemData.hasOwnProperty("name")){
						domHTML += '<td class="name"><span class="editable" data-type="text" data-name="name" data-pk="x/'+hash+'/'+itemData.id+'" data-title="'+p+'">'+itemData["name"]+"</span></td>";
					}
					if (itemData.hasOwnProperty("firstName")){
						domHTML += '<td class="firstName"><span class="editable" data-type="text" data-name="firstName" data-pk="x/'+hash+'/'+itemData.id+'" data-title="'+p+'">'+itemData["firstName"]+'</span></td>';
					}
					if (itemData.hasOwnProperty("lastName")){
						domHTML += '<td class="lastName"><span class="editable" data-type="text" data-name="lastName" data-pk="x/'+hash+'/'+itemData.id+'" data-title="'+p+'">'+itemData["lastName"]+'</span></td>';
					}
					
					for (p in itemData) {
						if (itemData.hasOwnProperty(p) )  {
							if(
								// exclude a few fields from the table
								p !== "id" 
								&& p !== "name"
								&& p !== "firstName" 
								&& p !== "lastName"
								&& p !== "created"
								&& p !== "lastModified"
								&& p !== "enabled"
								&& p !== "farmId"
								&& p !== "organizationId"
								&& p !== "stateAbbreviation"
								&& p !== "countryCode"
								&& p !== "radarCode"
								&& p !== "equipmentId"
							){
								// process the data type if necessary before inserting it
								var tdata = "";
								switch(p){
									case "roleId":
										tdata = plenty_admin.REST.roleTypes[itemData[p]];
									break;
									
									case "latitude":
									case "longitude":
										tdata = "<span class='truncate truncate-80'>"+itemData[p]+"</span>";
									break;
									
									case "password":
										tdata = '<button type="button" class="btn btn-sm btn-primary sendPassword reveal-on-hover-element"><span class="fa fa-lock"></span> <span class="hidden-xs">Send Password</span></button>';
									break;
									
									default:
									tdata = itemData[p];
								}
								domHTML += 	'<td class="'+p+'"><span class="pull-left'+(p !== "created" && p !== 'lastModified' && p !== 'password' ? ' editable"' : '"')+
											(p !== "created" && p !== "lastModified" ? '  data-type="'+plenty_admin.HELPER.returnFieldType(p)+'" data-name="'+p+'" data-pk="x/'+hash+'/'+item.id+'" data-title="'+p+'"' : '')+
											(plenty_admin.HELPER.returnFieldType(p) === "select" ? plenty_admin.HELPER.returnInlineEditSelectOptions(p) : "" )+
											'>'+tdata+'</span></td>';
							}
						}
					}
			
					domHTML += '<td class="pln prn"><div class="btn-group pull-right mbn reveal-on-hover-element" role="group" aria-label="...">'+
									'<button type="button" class="btn btn-sm btn-primary editItem"><span class="glyphicon glyphicon-edit"></span> <span class="hidden-xs">Edit</span></button>'+
									(hash !== "farms" ? '<button type="button" class="btn btn-sm btn-danger deleteItem"><span class="fa fa-trash-o"></span><span class="hidden-xs">Remove</span></button>' : "")+
							   '</div></td>'+
					'</tr>';
	return domHTML;
}

plenty_admin.UI.organization.populate = function(org, hash){
	console.log("plenty_admin.UI.organization.populate: ", org, hash);
	
	//set the organization ID on the DOM element
	plenty_admin.UI.organization.DOM
	.data("orgId", org.id);
	
	//loop properties in the organization and populate them based on their type
	for (i in org) {
		if (org.hasOwnProperty(i)) {
			console.log("list org properties: ", i, org[i], typeof org[i]);
			switch(typeof org[i]){
				case "string":
				case "number":
					var textValue = "";
					switch (i){
						case "organizationTypeId":
							textValue = plenty_admin.DATA.organizationTypes[org[i]].name;
						break;
						
						default:
						textValue = org[i];
					}
					
					//set the inline editing API call reference
					plenty_admin.UI.organization.DOM.find(".org-"+i)
					.text(textValue)
					.data("pk", org.id+"/organizations")
					.editable(plenty_admin.REST.inline_editing_options);
				break;
				
				case "object":
				
					if(i === "fieldsAndCropTypes"){
						var $tableHeader = plenty_admin.UI.organization.DOM.find("table.fieldsListHeader");
						var $tableBody = plenty_admin.UI.organization.DOM.find("table.fieldsList");
					}else{
						var $tableHeader = plenty_admin.UI.organization.DOM.find("table."+i+"ListHeader");
						var $tableBody = plenty_admin.UI.organization.DOM.find("table."+i+"List");
					}
					
					var tableItems = plenty_admin.UI.organization.items(org[i], i);
					
					$tableBody
					.html("")
					.append(tableItems.bodyHTML)
					.find(".editable")
					.editable(plenty_admin.REST.inline_editing_options);
					
					$tableHeader
					.html("")
					.append(tableItems.headerHTML);
				break;
			}
		}
	}
	
	// convert radio buttons to switches where appropriate
	//$("input[type='checkbox'].switch").bootstrapSwitch();
	
	//select the correct tab
	if(hash){
		plenty_admin.UI.organization.switchTab(hash);
	}
	
	plenty_admin.HELPER.hideLoadingOverlay();
}

plenty_admin.UI.organization.build_item = function(form, item){
	console.log("form: ", form, item);
	var add_new_data = {};
	
	add_new_data.id = (item ? item.id : null);
	add_new_data.created = (item ? item.created : null);
	add_new_data.lastModified = (item ? item.lastModified : null);
	
	form
	.find("input, textarea, select")
	.each(function(){
		switch($(this).prop("type")){
			case "checkbox":
				add_new_data[$(this).data("propname")] = $(this).is(":checked");
			break;
			
			default:
			add_new_data[$(this).data("propname")] = $(this).val();
		}
	});
	
	console.log("add_new_data", add_new_data);
	// add fields from the form to the returned data object
	return add_new_data;
}

//populate the farms filter in the fields panel
plenty_admin.UI.organization.populate_farms_filter = function(){
	//clear current options
	plenty_admin.UI.organization.filter_by_farm
	.find("option")
	.remove();
	
	var farmOptionsHTML = "<option value='all'>All Farms</option>";
	for(var f=0; f<plenty_admin.DATA.current_organization.farms.length; f++){
		var farm = plenty_admin.DATA.current_organization.farms[f];
		farmOptionsHTML += "<option value='"+farm.id+"'>"+farm.name+"</option>";
	}
	
	plenty_admin.UI.organization.filter_by_farm.append(farmOptionsHTML);
}

plenty_admin.UI.organization.populate_form_from_item = function(form, itemId, hash){
	console.log("populate_form_from_item: ", form, itemId, hash);
	
	var itemData = $.grep(plenty_admin.DATA.current_organization[hash], function(_item, i){
		return _item.id === itemId
	})[0];
	
	console.log("itemData", itemData);
	
	form
	.find("input, textarea, select")
	.each(function(){
		switch($(this).prop("type")){
			case "checkbox":
				console.log("found a checkbox: ", $(this), itemData[$(this).data("propname")]);
				$(this).prop("checked", itemData[$(this).data("propname")]);
				//$(this).bootstrapSwitch('state', itemData[$(this).data("propname")]);
			break;
			
			default:
			$(this).val(itemData[$(this).data("propname")]);
		}
		
	});
}

plenty_admin.UI.organization.switchTab = function(hash){
	plenty_admin.UI.organization.tabs.DOM.find(".nav-tabs a[role='tab'][href='"+hash+"']").tab('show');
}
// Field Survey popup
plenty_admin.UI.crop_survey = {};
plenty_admin.UI.crop_survey.modal = $("body").find(".modal#crop-survey");

// wrapper to populate the crop survey and show it
plenty_admin.UI.crop_survey.show = function(crop_survey, fieldObj){
	console.log("plenty_admin.UI.crop_survey.show", crop_survey);
	if(typeof crop_survey === "object"){
		plenty_admin.UI.crop_survey.populate(crop_survey, fieldObj);
	}else if(typeof crop_survey === "number"){
		plenty_admin.DATA.load_field_observation(crop_survey, function(crop_survey_){
			plenty_admin.UI.crop_survey.populate(crop_survey_, fieldObj);
		});
	}
}
plenty_admin.UI.crop_survey.populate = function(crop_survey, fieldObj){
	plenty_admin.UI.crop_survey.modal
	.find(".mainTabs a[data-toggle='tab']")
	.on('shown.bs.tab', function (e) {
	  console.log("e.target", e.target); // newly activated tab
		var activeMap = plenty_admin.UI.crop_survey.modal
		.find(".tab-content.mainTabs .tab-pane.active:visible .map:visible:last");
		
		plenty_admin.UI.crop_survey.showMap(activeMap, fieldObj);
	})
	.end()
	.on("shown.bs.modal", function(){
		var activeMap = plenty_admin.UI.crop_survey.modal
		.find(".tab-content.mainTabs .tab-pane.active:visible .map:visible:last");
		
		plenty_admin.UI.crop_survey.showMap(activeMap, fieldObj);
	})
	.modal("show");
}

plenty_admin.UI.crop_survey.showMap = function(activeMap, fieldObj){
		var mapId = activeMap.prop("id");
		console.log("mapId", mapId);
		
		plenty_admin.MAPS.draw_field_on_map(fieldObj, mapId, {
			mapTypeId: google.maps.MapTypeId.HYBRID,
			zoom:  12,
			disableDefaultUI: true,
			draggable: false, 
			zoomControl: false, 
			scrollwheel: false, 
			disableDoubleClickZoom: true,
			pushPoly: false
		  }, function(map, fieldObj, polygon){
			//plenty_admin.UI.field.polygon = polygon;
			//ensure if the window changes size the field is centered
			console.log("Polygon: ", polygon);
			console.log("Map element: ", $("#"+mapId));
			
			$("#"+mapId)
			.data("polygon", polygon)
			.data("mapId", mapId);
			
			//plenty_admin.MAPS.zoomToPolygon(polygon, plenty_admin.MAPS[mapId]);
			$(window).on("resize",function(){
				plenty_admin.MAPS.zoomToPolygon(polygon, plenty_admin.MAPS[mapId]);
			});
		}, false, null, mapId);
}


//*********************** new-organization.js **************************//
//create namespace for new organization layout
plenty_admin.UI.newOrganization = {
	init: function(){
		if(plenty_admin.UI.newOrganization.DOM.data("ready")){
			return;
		}
		plenty_admin.UI.newOrganization.DOM
		.find("button.newOrg")
		.off("click")
		.on("click", function(){
			var $this = $(this);
			var $form = $this.closest(".panel").find("form");
			var organizationDto = {};
			organizationDto.name = $form.find("#new_org_name").val();
			organizationDto.organizationTypeId = parseInt($form.find("#new_org_type").val());
			organizationDto.addressLine1 = $form.find("#new_org_address_1").val();
			organizationDto.addressLine2 = $form.find("#new_org_address_2").val();
			organizationDto.city = $form.find("#new_org_city").val();
			organizationDto.state = $form.find("#new_org_state").val();
			organizationDto.zip = $form.find("#new_org_zip").val();
			
			$this
			.button("loading");
			
			plenty_admin.HELPER.showLoadingOverlay("Saving", "New Organization");
			
			plenty_admin.REST.insertOrganization.post(organizationDto).then(
				function(insertedOrg){
					console.log("organization inserted: ", insertedOrg().data);
					
					var newOrg = insertedOrg().data;
					
					plenty_admin.DATA.organizations[newOrg.id] = newOrg;
					
					plenty_admin.UI.newOrganization.eventCollector = window.eventcollector(2, 10000);
	
					var roleData = {
						organizationId:newOrg.id,
						userId: plenty_admin.DATA.userDetails.id,
						roleTypeId:1
					};
					
					plenty_admin.DATA.getInitialDataForOrganization(newOrg.id, null, function(){
						plenty_admin.UI.newOrganization.eventCollector.done("getOrgData");
					});
					
					plenty_admin.REST.insertRole.post(roleData).then(function(newUser){
						plenty_admin.UI.newOrganization.eventCollector.done("insertRole");
					});
					
					plenty_admin.UI.newOrganization.eventCollector.on('alldone', function(total) {
						//populate the side bar organizations panel
						plenty_admin.UI.sideBar.organizations.DOM
						.find(".add-org")
						.before(plenty_admin.UI.sideBar.organizations.create(newOrg));
						
						//load the farms tab of the new org by default
						plenty_admin.UI.organization.init(plenty_admin.DATA.organizations[newOrg.id], "#farms");
						
						$this
						.button("reset");
			
						plenty_admin.HELPER.hideLoadingOverlay();
					});
				},
				function(){
					plenty_admin.UI.settings.new_organization
					.find(".alert-info")
					.fadeOut("fast", function(){
						plenty_admin.UI.settings.new_organization
						.find(".alert-danger")
						.fadeIn("fast");
						
						var to = setTimeout(function(){
							plenty_admin.UI.settings.new_organization
							.find(".alert-danger")
							.fadeOut("fast", function(){
								$form
								.fadeIn("fast");
							});
						}, 5000);
					});
				}
			)
			return false;
		})
		.end()
		.find("a.moreDetailsToggle")
		.off("click")
		.on("click", function(){
			$(this)
			.find("span")
			.toggle()
			.end()
			.parent()
			.find(".more-details")
			.slideToggle();
			return false;
		});
		
		plenty_admin.UI.newOrganization.DOM
		.data("ready", true);
	},
	clear: function(){
		
	}
	
};
plenty_admin.UI.newOrganization.DOM = plenty_admin.UI.main.DOM.find("#new-organization-container");
plenty_admin.UI.add_template_plan = {
	modal: $("body").find(".modal#add-template-plan"),
	init: function(){
		//check if it has already been INIT'd
		if(plenty_admin.UI.add_template_plan.modal.data("ready")){
			return;
		}
		//populate the organizations dropdown in Add Plan modal
		console.log("plenty_admin.UI.add_template_plan - INIT");
		var organizationOptionsHTML = "";
		for(id in plenty_admin.DATA.organizations)
		{
			if(
				plenty_admin.DATA.organizations.hasOwnProperty(id)
				&& id !== "length"
			){
				var org = plenty_admin.DATA.organizations[id];
				organizationOptionsHTML += "<option value='"+id+"'>"+org.name+"</option>";
			}
		}
		
		var owningOrgIdList = plenty_admin.UI.add_template_plan.modal
		.find("select#add_plan_owningOrgId");
		
		owningOrgIdList
		.find("option")
		.remove()
		.end()
		.append(organizationOptionsHTML);
		
		//get the equipmentEquipment types for this org and populate the equipment dropdowns
		var equipmentTypeList = plenty_admin.UI.add_template_plan.modal
		.find("select#add_task_equipment_types");
		
		equipmentTypeList
		.find("option")
		.remove()
		.end()
		.append("<option value='' disabled selected style='display:none;'>Choose equipment type</option>");
		
		//populate equipment types
		for(id in plenty_admin.DATA.equipmentTypes)
		{
			if(
				plenty_admin.DATA.equipmentTypes.hasOwnProperty(id)
				&& id !== "length"
			){
				var equip = plenty_admin.DATA.equipmentTypes[id];
				var $equipmentTypeOptionsHTML = $("<option value='"+id+"'>"+equip.name+"</option>");
				
				$equipmentTypeOptionsHTML
				.data("dto", equip);
				
				equipmentTypeList
				.append($equipmentTypeOptionsHTML);
				
				var specificEquipment = {};
				for(_id in plenty_admin.DATA.equipmentEquipmentTypes){
					if(plenty_admin.DATA.equipmentEquipmentTypes.hasOwnProperty(_id)){
						var et = plenty_admin.DATA.equipmentEquipmentTypes[_id];
						//console.log("equipment: ", et, id);
						if(et.equipmentTypeId === parseInt(id)){
							specificEquipment[et.id] = et;
						}
					}
				}
				$equipmentTypeOptionsHTML.data("items", specificEquipment);
			}
		}
		
		
		//populate product types
		var productTypeList = plenty_admin.UI.add_template_plan.modal
		.find("select#add_task_product_types");
		
		productTypeList
		.find("option")
		.remove()
		.end()
		.append("<option value='' disabled selected style='display:none;'>Choose product type</option>");
		
		for(id in plenty_admin.DATA.productTypes)
		{
			if(
				plenty_admin.DATA.productTypes.hasOwnProperty(id)
				&& id !== "length"
			){
				var prod = plenty_admin.DATA.productTypes[id];
				var $productTypeOptionsHTML = $("<option value='"+id+"'>"+prod.name+"</option>");
				
				$productTypeOptionsHTML.data("dto", prod);
				
				productTypeList
				.append($productTypeOptionsHTML);
				
				var specificProduct = {};
				for(_id in plenty_admin.DATA.allProducts){
					if(plenty_admin.DATA.allProducts.hasOwnProperty(_id)){
						var pt = plenty_admin.DATA.allProducts[_id];
						//console.log("product: ", pt, id);
						if(pt.productTypeId === parseInt(id)){
							specificProduct[pt.id] = pt;
						}
					}
				}
				$productTypeOptionsHTML.data("items", specificProduct);
			}
		}
		
		//populate activity types
		var activityTypeOptionsHTML = "";
		for(id in plenty_admin.DATA.activityTypes)
		{
			if(
				plenty_admin.DATA.activityTypes.hasOwnProperty(id)
				&& id !== "length"
			){
				var activity = plenty_admin.DATA.activityTypes[id];
				activityTypeOptionsHTML += "<option value='"+id+"'>"+activity.name+"</option>";
			}
		}
		
		var activityTypeList = plenty_admin.UI.add_template_plan.modal
		.find("select#add_activity_type");
		
		activityTypeList
		.find("option")
		.remove()
		.end()
		.append(activityTypeOptionsHTML);
		
		plenty_admin.UI.add_template_plan.modal
		.on('show.bs.modal', function () {
			$(this).find('.modal-content').css('height', $( window ).height()*0.9);
			
			//populate lists that are spicific to the selected organization
			//populate skill types
			var skillTypeList = plenty_admin.UI.add_template_plan.modal
			.find("select#add_task_labour_types");
			
			skillTypeList
			.find("option")
			.remove()
			.end()
			.append("<option value='' disabled selected style='display:none;'>Choose labour type</option>");
			
			for(id in plenty_admin.DATA.labourTypes)
			{
				if(
					plenty_admin.DATA.labourTypes.hasOwnProperty(id)
					&& id !== "length"
				){
					var skill = plenty_admin.DATA.labourTypes[id];
					var $skillTypeOptionsHTML = $("<option value='"+id+"'>"+skill.name+"</option>");
					
					$skillTypeOptionsHTML
					.data("dto", skill);
					
					skillTypeList
					.append($skillTypeOptionsHTML);
					
					var specificESkills = {};
					//for(var s=0; s<plenty_admin.DATA.current_organization.skills.length; s++){
					for(_id in plenty_admin.DATA.current_organization.skillsAndRates){
						if(plenty_admin.DATA.current_organization.skillsAndRates.hasOwnProperty(_id)){
							var _skill = plenty_admin.DATA.current_organization.skillsAndRates[_id];
							//console.log("_skill: ", _skill.skillId, id);
							if(_skill.skillId === parseInt(id)){
								specificESkills[_skill.id] = _skill;
							}
						}
					}
					$skillTypeOptionsHTML.data("items", specificESkills);
				}
			}
		})
		.on('hidden.bs.modal', function () {
			plenty_admin.UI.add_template_plan.clear();
		})
		.find(".task-types-tabs a")
		.click(function (e) {
		  e.preventDefault()
		  console.log("tab clicked", $(this));
		  $(this).tab('show');
		})
		.on('shown.bs.tab', function (e) {
			var url = $(e.target).prop("href");
			var hash = url.substring(url.indexOf('#')+1);
			console.log("hash", hash);
			plenty_admin.UI.add_template_plan.modal
			.find(".tab-content.task-types .tab-pane")
			.removeClass("active")
			.end()
			.find(".tab-content.task-types .tab-pane#"+hash)
			.addClass("active");
		})
		.end()
		.find("select.specific_items")
		.on("change", function(){
			var $this = $(this);
			var type = null;
			
			if($this.prop("id").indexOf("product") > -1){
				type = "product";
			}else if($this.prop("id").indexOf("equipment") > -1){
				type = "equipment";
			}else if($this.prop("id").indexOf("product") > -1){
				type = "product";
			}
			
			console.log("type", type);
			if(
				$(this).find("option:selected").val()
				&& type === "product"
			){
				$(this)
				.closest(".tab-pane")
				.find(".component_qty")
				.prop("disabled", false);
			}else{
				$(this)
				.closest(".tab-pane")
				.find(".component_qty")
				.val(1)
				.prop("disabled", true);
			}
			
		})
		.end()
		.find("select#add_activity_type")
		.on("change", function(){
			plenty_admin.UI.add_template_plan.addActivityForm
			.removeClass("harvest");
			
			if($(this).find("option:selected").text().toLowerCase() === "harvest"){
				plenty_admin.UI.add_template_plan.addActivityForm
				.addClass("harvest");
			}
		})
		.end()
		.find("select.component_type")
		.on("change", function(){
			var $this = $(this);
			var selected = $this.find("option:selected");
			var selectedDto = selected.data("dto");
			var specificItems = selected.data("items");
			var specificItemsList = $this.parent().find("select.specific_items");
			
			if(selectedDto.unitName){
				$this
				.closest(".tab-pane")
				.find(".uom")
				.text(selectedDto.unitName)
				.show();
			}
			
			var type = null;
			if($this.prop("id").indexOf("product") > -1){
				type = "product";
			}else if($this.prop("id").indexOf("equipment") > -1){
				type = "equipment";
			}else if($this.prop("id").indexOf("labour") > -1){
				type = "labour";
			}
			
			if(Object.keys(specificItems).length > 0){
				//list specific items for this type and show them
				var nameProp = "name";
				switch(type){
					case "product":
						nameProp = "productName";
					break;
					
					case "equipment":
						nameProp = "equipmentName";
					break;
					
					case "labour":
						nameProp = "userFirstAndLastName";
					break;
				}
				var specificItemsHTML = "<option value='' selected'>Choose specific "+selected.text()+"</option>";
				for(id in specificItems){
					if(specificItems.hasOwnProperty(id)){
						var item = specificItems[id];
						specificItemsHTML += "<option value='"+item.id+"'>"+item[nameProp]+"</option>";
					}
				}
				
				specificItemsList
				.find("option")
				.remove()
				.end()
				.append(specificItemsHTML)
				.show();
			}

			return false;
		})
		.end()
		.find("button.task_add_component")
		.on("click", function(){
			var $this = $(this);
			var $tp = $this.closest(".tab-pane");
			var valid = plenty_admin.HELPER.validateForm($tp);
			
			if(valid){
				var type = $tp.data("type");
				var $task_items_table = $tp.find("table.task-items tbody");
				
				//create the task item
				var task_component = {
					id: 		parseInt($tp.find(".component_type option:selected").val()),
					qty: 	parseInt($tp.find(".component_qty").val()),
				};
				
				//check if a specific item has been added - if so, add it to the task component
				if($tp.find("select.specific_items option:selected").length > 0){
					task_component.specificId = parseInt($tp.find("select.specific_items option:selected").val());
				}
				
				console.log("task_component", task_component);
				
				//disable this type so it can only be added once
				$tp
				.find(".component_type option:selected")
				.prop("disabled", true)
				.end()
				.find(".component_type option:eq(0)")
				.show()
				.prop("selected", true)
				.end()
				.find("select.specific_items, .uom")
				.hide();
				
				//add the task item to the correct DOM table
				var $taskComponent = plenty_admin.UI.add_template_plan.build_task_component(task_component, type);
				$task_items_table.append($taskComponent);
			}
			
			return false;
		})
		.end()
		.find("button.save_activity")
		.on("click", function(){
			var $this = $(this);
			plenty_admin.UI.add_template_plan.generate_activityDto($(this), false);
			return false;
		})
		.end()
		.find("button.update_activity")
		.on("click", function(){
			var index = $(this).data("activity").data("index");
			console.log("index", index);
			plenty_admin.UI.add_template_plan.generate_activityDto($(this), true, index);
			return false;
		})
		.end()
		.find("button.add_activity")
		.on("click", function(){
			var $this = $(this);
			
			$this
			.hide();
			
			plenty_admin.UI.add_template_plan.addActivityForm
			.find(".save_activity")
			.show()
			.end()
			.find(".update_activity")
			.hide()
			.end()
			.slideDown("fast");
		})
		.end()
		.find("button.add_task")
		.on("click", function(){
			var $this = $(this);
			
			$this
			.slideUp("fast");
			
			plenty_admin.UI.add_template_plan.minimise_all_tasks();
			
			plenty_admin.UI.add_template_plan.addTaskAndTaskComponents
			.slideDown("fast");
		})
		.end()
		.find("button.save_task")
		.on("click", function(){
			plenty_admin.UI.add_template_plan.generate_templateTaskDto($(this), false);
			return false;
		})
		.end()
		.find("button.update_task")
		.on("click", function(){
			plenty_admin.UI.add_template_plan.generate_templateTaskDto($(this), true);
			return false;
		})
		.end()
		.find("button.cancel_activity")
		.on("click", function(e){
			e.preventDefault();
			var $this = $(this);
			
			$this
			.closest(".activities_management")
			.find("form")
			.slideUp("fast", function(){
				plenty_admin.UI.add_template_plan.clear_add_activity_form();
				
				$this
				.closest(".activities_management")
				.find(".activity_list")
				.slideDown("fast")
				.end()
				.find("button.add_activity")
				.slideDown("fast");
			});
		})
		.end()
		.find("button.cancel_task")
		.on("click", function(e){
			e.preventDefault();
			var $this = $(this);
			
			//remove active class from all tasks
			plenty_admin.UI.add_template_plan.taskListHolder
			.find(".task.active")
			.removeClass("active");
			
			plenty_admin.UI.add_template_plan.addTaskAndTaskComponents
			.slideUp("fast", function(){
				plenty_admin.UI.add_template_plan.clear_add_task_form();
				
				plenty_admin.UI.add_template_plan.addTaskBtn
				.slideDown("fast");
			})
		})
		.end()
		.find("button.add")
		.on("click", function(){
			//collect all activities and their associated tasks
			var addPlanForm = plenty_admin.UI.add_template_plan.modal.find("form.add_plan_form");
			var valid = plenty_admin.HELPER.validateForm(addPlanForm);
			var $this = $(this);
			
			//hide any current errors in activities
			plenty_admin.UI.add_template_plan.modal.find(".activity .alert.help-block").slideUp("fast");
			
			if(valid){
				var activities = plenty_admin.UI.add_template_plan.modal.find(".activity");
				console.log("activities", activities, activities.length);
				if(activities.length <= 0){
					plenty_admin.UI.add_template_plan.activityListHolder
					.parent()
					.find(".alert.help-block:eq(0)")
					.slideDown("fast");
				}else{
					plenty_admin.UI.add_template_plan.activityListHolder
					.parent()
					.find(".alert.help-text:eq(0)")
					.hide();
					
					var activitiesAndTasks = [];
					for(var a=0; a<activities.length; a++){
						var $activity = $(activities[a]);
						var templateTaskDtos = [];
						var activityTasksList = plenty_admin.UI.add_template_plan.taskListHolder.find("ul.task_list.activity_tasks_"+$activity.data("index")+" .task");
						
						//alert the user if an activity has no tasks
						if(activityTasksList.length <= 0){
							$activity
							.find(".help-block.alert")
							.slideDown("fast");
							
							console.log("Activity Has No Tasks ;(");
							
							return false;
						}
						
						for(var t=0; t<activityTasksList.length; t++){
							var $task = $(activityTasksList[t]);
							templateTaskDtos.push($task.data("taskDto"));
						}
						
						$activity.data("activityDto").indexInPlan = $activity.index();
						
						var taskWithActivities = {
							templateActivityDto:$activity.data("activityDto"),
							templateTaskDtos:templateTaskDtos
						};
						activitiesAndTasks.push(taskWithActivities);
					}
					
					//all validation tests passed - disable the button
					$this
					.button("loading");
					
					plenty_admin.HELPER.showLoadingOverlay("New Plan");
					
					var TemplatePlanCreationDto = {
							owningOrgId:plenty_admin.DATA.current_organization.id,//parseInt(owningOrgIdList.find("option:selected").val()),
							planName:addPlanForm.find("#add_plan_name").val(),
							planDescription:addPlanForm.find("#add_plan_desc").val(),
							activitiesAndTasks:activitiesAndTasks
					}
					
					console.log("TemplatePlanCreationDto", TemplatePlanCreationDto);
					
					plenty_admin.REST.plans.createTemplatePlan(TemplatePlanCreationDto, function(templatePlan){
						console.log("add this templatePlan to the list: ", templatePlan);
						var $planHTML = plenty_admin.UI.organization.addItemFunctionality($(plenty_admin.UI.create_item(templatePlan, "plans")));
							
						plenty_admin.UI.organization.DOM.find("table.plansList")
						.find(".noItemsText")
						.remove()
						.end()
						.append($planHTML);
						
						var $tableHeader = plenty_admin.UI.organization.DOM.find("table.plansListHeader");
						
						//build the table header if it does not already exist 
						if($tableHeader.find("thead").length == 0){
							var headerHTML = plenty_admin.UI.create_header_row(templatePlan, "plans");
							
							$tableHeader
							.html("")
							.append(headerHTML);
						}
										
						plenty_admin.UI.add_template_plan.hide();
						
						plenty_admin.HELPER.hideLoadingOverlay();
					});
				}
			}
			
			return false;
		})
		.end();
		
		plenty_admin.UI.add_template_plan.modal
		.data("ready", true);
	},
	minimise_all_tasks: function(){
		//minimise all existing tasks
		plenty_admin.UI.add_template_plan.taskListHolder
		.find(".task_list .task")
		.removeClass("open")
		.find(".task-components")
		.slideUp("fast");
	},
	generate_activityDto: function($this, replaceEl, index){
		var addActivityForm = plenty_admin.UI.add_template_plan.addActivityForm;
		
		var valid = plenty_admin.HELPER.validateForm(addActivityForm);
		
		if(valid){
			var activityDto = {
				templatePlanId:		null,
				activityTypeId:		parseInt(addActivityForm.find("#add_activity_type option:selected").val()),
				daysFromPlanting:	parseInt(addActivityForm.find("#add_activity_days_from_planting").val())
			}
			
			if(addActivityForm.hasClass("harvest")){
				activityDto.expectedYieldPerAcre = addActivityForm.find("#add_activity_expected_yield").val();
				activityDto.uomId = 1;
				//need to add yield UOM here once DB supports it
			}
			
			console.log("activityDto", activityDto);
			
			if(replaceEl){
				$this.data("activity").replaceWith(plenty_admin.UI.add_template_plan.build_activity_element(activityDto, index));
			}else{
				plenty_admin.UI.add_template_plan.build_activity_element(activityDto);
			}
			
			$this
			.closest(".activities_management")
			.find(".alert.help-block:eq(0)")
			.hide()
			.end()
			.find("form")
			.slideUp("fast", function(){
				plenty_admin.UI.add_template_plan.clear_add_activity_form();
				
				$this
				.closest(".activities_management")
				.find(".activity_list")
				.slideDown("fast")
				.end()
				.find("button.add_activity")
				.slideDown("fast");
				
				plenty_admin.UI.add_template_plan.addTaskAndTaskComponents
				.slideDown("fast");
				
				plenty_admin.UI.add_template_plan.addTaskBtn
				.slideUp("fast")
				.prop("disabled", false);
				
				plenty_admin.UI.add_template_plan
				.modal
				.find(".noActivityForTasks")
				.slideUp("fast");
				
				plenty_admin.UI.add_template_plan.minimise_all_tasks();
			});
			
			if(plenty_admin.UI.add_template_plan.activityListHolder.find("li.list-group-item.activity").length >1){
				//sort the list based on days from activity start
				plenty_admin.UI.add_template_plan.order_activities_by_days_from_planting();
			}
		}
	},
	generate_templateTaskDto: function($this, replaceEl){
		var addTaskForm = plenty_admin.UI.add_template_plan.addTaskForm;
		var addTaskAndTaskComponents = plenty_admin.UI.add_template_plan.addTaskAndTaskComponents;
		
		var equipmentComponents = addTaskAndTaskComponents.find("table.equipment-items tbody tr.task-element");
		var labourComponents = addTaskAndTaskComponents.find("table.labour-items tbody tr.task-element");
		var productComponents = addTaskAndTaskComponents.find("table.product-items tbody tr.task-element");
		var numTaskElements = equipmentComponents.length + labourComponents.length + productComponents.length;
		
		var valid = plenty_admin.HELPER.validateForm(addTaskForm);
		
		if(
			valid
			&& numTaskElements >= 1
		){
			//get the list of selected equipment IDs
			var equipmentIds = [];
			var anySpecificEquipmentIds = [];
			for(var l=0; l<equipmentComponents.length; l++){
				var taskComponent = $(equipmentComponents[l]).data("task_component");
				
				if(taskComponent.specificId){
					anySpecificEquipmentIds.push(taskComponent.specificId);
				}else{
					equipmentIds.push(taskComponent.id);
				}
			}
			console.log("equipmentIds:", equipmentIds);
			console.log("anySpecificEquipmentIds:", anySpecificEquipmentIds);
			
			//get the list of selected labour IDs
			var labourIds = [];
			var anySpecificLabourIds = [];
			
			for(var l=0; l<labourComponents.length; l++){
				var taskComponent = $(labourComponents[l]).data("task_component");
				if(taskComponent.specificId){
					anySpecificLabourIds.push(taskComponent.specificId);
				}else{
					labourIds.push($(labourComponents[l]).data("task_component").id);
				}
				
			}
			console.log("labourIds:", labourIds);
			console.log("anySpecificLabourIds:", anySpecificLabourIds);
			
			//get the list of selected labour IDs
			var productAmountPairs = [];
			var anySpecificProductIds = [];
			for(var l=0; l<productComponents.length; l++){
				var taskComponent = $(productComponents[l]).data("task_component");
				var prod = {
					productTypeId:taskComponent.id,
					amount:taskComponent.qty
				};
				
				productAmountPairs.push(prod);
				
				if(taskComponent.specificId){
					anySpecificProductIds.push(taskComponent.specificId);
				}
			}
			console.log("productAmountPairs:", productAmountPairs);
			console.log("anySpecificProductIds:", anySpecificProductIds);
			
			var templateTaskDto = {
				id:null,
				created:null,
				lastModified:null,
				name:addTaskForm.find("#add_task_name").val(),
				templateActivityId:null,
				daysFromActivityStart:parseInt(addTaskForm.find("#add_task_days_from_start").val()),
				labourIds:labourIds,
				equipmentIds:equipmentIds,
				productAmountPairs:productAmountPairs,
				anySpecificEquipmentIds:anySpecificEquipmentIds,
				anySpecificProductIds:anySpecificProductIds,
				anySpecificLabourIds:anySpecificLabourIds
			}
			
			console.log("templateTaskDto", templateTaskDto);
			
			//add the task element to the DOM
			if(replaceEl){
				$this.data("task").replaceWith(plenty_admin.UI.add_template_plan.build_task_element(templateTaskDto));
			}else{
				plenty_admin.UI.add_template_plan.build_task_element(templateTaskDto);
			}
			
			var selectedActivityIndex = plenty_admin.UI.add_template_plan.activityListHolder.find(".activity.active").data("index");
			var task_list = plenty_admin.UI.add_template_plan.taskListHolder.find("ul.task_list.activity_tasks_"+selectedActivityIndex);
			
			if(task_list.find(".task").length >1){
				plenty_admin.UI.add_template_plan.order_tasks_by_days_from_activity_start(task_list);
			}
			
			//remove the active class
			if($this.data("task")){
				$this
				.data("task")
				.removeClass("active");
			}
			
			addTaskAndTaskComponents
			.slideUp("fast", function(){
				plenty_admin.UI.add_template_plan.addTaskBtn
				.slideDown("fast");
				
				plenty_admin.UI.add_template_plan.clear_add_task_form();
			});
		}
	},
	show: function(){
		plenty_admin.UI.add_template_plan.modal
		.modal("show");
	},
	hide: function(){
		plenty_admin.UI.add_template_plan.modal
		.modal("hide");
	},
	clear: function(){
		//clear activities
		plenty_admin.UI.add_template_plan.activityListHolder
		.find("li.activity")
		.remove()
		.end()
		.parent()
		.find("form.add_activity_form")
		.show()
		.end()
		.find("button.add_activity")
		.hide();
		
		//clear tasks
		plenty_admin.UI.add_template_plan.taskListHolder
		.find(".task, .task_list")
		.remove()
		.end()
		.parent()
		.find("button.add_task")
		.hide()
		.end()
		.find("p.noActivityForTasks")
		.show();
		
		//reset form elements
		plenty_admin.UI.add_template_plan.modal
		.find("input, textarea")
		.each(function(){
			if($(this).data("default") !== "undefined"){
				if($(this).prop("type") === "number"){
					$(this).val(parseInt($(this).data("default")));
				}else{
					$(this).val($(this).data("default"));
				}
			}else{
				$(this).val("");
			}
		})
		.end()
		.find("select")
		.each(function(){
			$(this)
			.find("option:eq(0)")
			.prop("selected", true);
			
			$(this)
			.find("option:gt(0)")
			.each(function(){
				$(this)
				.prop("disabled", false);
			});
		})
		.end()
		.find(".uom, .specific_items")
		.hide()
		.end()
		.find("button.add")
		.button("reset");
		
		//remove any old task elements
		plenty_admin.UI.add_template_plan.modal
		.find("tr.task-element")
		.remove();
		
		//hide the add task form
		plenty_admin.UI.add_template_plan
		.addTaskAndTaskComponents
		.hide();
		
		//remove activity type classes from add activity form
		plenty_admin.UI.add_template_plan.addActivityForm
		.removeClass("harvest");
		
	},
	build_task_component: function(task_component, type){
		console.log("build_task_component", task_component, type);
		var componentName = null;
		if(task_component.specificId){
			var specificComponentList = null;
			switch(type){
				case "product":
				componentName = plenty_admin.DATA.allProducts[task_component.specificId].productName;
				break;
				
				case "equipment":
				componentName = plenty_admin.DATA.equipmentEquipmentTypes[task_component.specificId].equipmentName;
				break;
				
				case "labour":
				componentName = plenty_admin.DATA.current_organization.skillsAndRates[task_component.specificId].userFirstAndLastName;
				break;
			}
		}else{
			componentName = plenty_admin.DATA[type+"Types"][task_component.id].name;
		}
		var $taskComponent = $([
			'<tr class="reveal-on-hover-wrap task-element">',
				'<td width="55%">'+componentName+'</td>',
				'<td width="20%">'+task_component.qty+'</td>',
				'<td width="25%"><button class="btn btn-sm btn-danger delete reveal-on-hover-element btn-block"><span class="fa fa-trash-o"></span> Delete</button></td>',
			'</tr>'
		].join(""))
		.data("task_component", task_component)
		.find("button.delete")
		.click(function(){
			var $this = $(this);
			var $tc = $this.closest("tr");
			var tcDto = $tc.data("task_component");
			
			$this
			.closest(".tab-pane")
			.find(".component_type option[value="+tcDto.id+"]").prop("disabled", false);
			
			$tc
			.remove();
			
			return false;
		})
		.end();
		
		return $taskComponent;
	},
	build_task_component_saved: function(component, type){
		switch(type){
			case "equipment":
			case "labour":
				return $('<p class="task-component well">'+component.name+' <a href="" class="remove pull-right ptn pbn pln prn"><i class="fa fa-trash-o"></i></a></p>');
			break;
			
			case "product":
				return $('<p class="task-component well">'+component.name+' | '+component.amount+' '+component.uom+' <a href="" class="remove pull-right ptn pbn pln prn"><i class="fa fa-trash-o"></i></a></p>');
			break;
		}
		
	},
	update_activity_cost: function(index){
		console.log("update_activity_cost", index);
		var activityCost = 0;
		var task_list = plenty_admin.UI.add_template_plan.taskListHolder.find(".activity_tasks_"+index);
		console.log("task_list", task_list);
		
		task_list
		.find(".task")
		.each(function(){
			console.log("task", $(this));
			activityCost += $(this).data("taskCost");
		});
		
		plenty_admin.UI.add_template_plan.activityListHolder
		.find(".activity_"+task_list.data("index"))
		.data("activityCost", activityCost)
		.find(".activityCost")
		.text(numeral(activityCost).format('$0,0.00'));
		
		//update the total plan cost
		plenty_admin.UI.add_template_plan.update_plan_cost();
	},
	update_plan_cost: function(){
		var planCost = 0;
		plenty_admin.UI.add_template_plan.activityListHolder
		.find(".activity")
		.each(function(){
			planCost += ($(this).data("activityCost") ? $(this).data("activityCost") : 0);
		});
		
		plenty_admin.UI.add_template_plan.activityListHolder
		.parent()
		.find(".plan_total")
		.text(numeral(planCost).format('$0,0.00'));
	},
	build_task_element: function(taskDto){
		console.log("build_task_element", taskDto);
		var $taskDOM = $([
			'<li class="list-group-item overflowFix reveal-on-hover-wrap task open">',
				'<div class="col-md-12">',
					'<h4 class="pull-left col-md-6 prn pln"><a class="pull-left pln twistie" href=""><span class="glyphicon glyphicon-triangle-right"></span><span class="glyphicon glyphicon-triangle-bottom"></span></a>'+taskDto.name+'</h4>',
					'<h4 class="pull-left col-md-3">+'+taskDto.daysFromActivityStart+' days</h4>',
					'<h4 class="col-md-3 prn text-right"><span class="task-cost">$00.00</span></h4>',
					'<p class="reveal-on-hover-element text-right fix-right-controls" role="group" aria-label="...">',
						'<button class="btn btn-sm btn-danger reveal-on-hover-element delete-task"><span class="fa fa-trash-o"></span> <span class="hidden-xs">Delete</span></button>',
						'<button type="button" class="btn btn-sm btn-primary edit-task mls"><span class="glyphicon glyphicon-edit"></span> <span class="hidden-xs">Edit</span></button>',
					'</p>',
				'</div>',
				'<div class="col-md-12 task-components">',
					'<div class="col-md-12 clear equipment prn pln">',
						'<p class="mbn"><b>Equipment</b></p>',
					'</div>',
					'<div class="col-md-12 labour prn pln">',
						'<p class="mbn"><b>Labour</b></p>',
					'</div>',
					'<div class="col-md-12 product prn pln">',
						'<p class="mbn"><b>Product</b></p>',
					'</div>',
				'</div>',
			'</li>'
		].join(""))
		.data("taskDto", taskDto);
		
		//calculate the costs for this task
		plenty_admin.REST.plans.getCostForTemplateTask(taskDto, $taskDOM, function(taskCosts, $el){
			console.log("got costs for task: ", taskCosts, $el);
			$el
			.data("taskCost", taskCosts)
			.find(".task-cost")
			.text(numeral(taskCosts).format('$0,0.00'));
			
			plenty_admin.UI.add_template_plan.update_activity_cost($el.closest(".task_list").data("index"));
		});
		
		//build equipment taskItems
		for(var e=0; e<taskDto.equipmentIds.length; e++){
			var equip = taskDto.equipmentIds[e];
			var componentData = {name: plenty_admin.DATA.equipmentTypes[equip].name};
			$equipment_task_item = plenty_admin.UI.add_template_plan.build_task_component_saved(componentData, "equipment");
			
			$equipment_task_item
			.data("id", equip)
			.data("type", "equipmentIds")
			.find("a.remove")
			.click(function(){
				var $this = $(this);
				var taskComponent = $this.parent();
				var idList = $this.closest(".task").data("taskDto")[taskComponent.data("type")];
				console.log("idList", idList);
				var index = -1;
				for(var i=0; i<idList.length; i++){
					if(parseInt(taskComponent.data("id")) === idList[i]){
						index = i;
					}
					break;
				}
				
				console.log("index", index);
				
				if(index >= -1){
					idList.splice(index, 1);
				}
				
				$(this)
				.closest("p")
				.remove();
				
				//calculate the costs for this task
				plenty_admin.REST.plans.getCostForTemplateTask(taskDto, $taskDOM, function(taskCosts, $el){
					console.log("got costs for task: ", taskCosts, $el);
					$el
					.data("taskCost", taskCosts)
					.find(".task-cost")
					.text(numeral(taskCosts).format('$0,0.00'));
					
					plenty_admin.UI.add_template_plan.update_activity_cost($el.closest(".task_list").data("index"));
				});
				
				return false;
			})
			.end();
			
			$taskDOM
			.find(".equipment")
			.append($equipment_task_item);
		}
		
		//build specific equipment taskItems
		for(var e=0; e<taskDto.anySpecificEquipmentIds.length; e++){
			var equip = taskDto.anySpecificEquipmentIds[e];
			var componentData = {name: plenty_admin.DATA.equipmentEquipmentTypes[equip].equipmentName};
			$equipment_task_item = plenty_admin.UI.add_template_plan.build_task_component_saved(componentData, "equipment");
			
			$equipment_task_item
			.data("id", equip)
			.data("type", "anySpecificEquipmentIds")
			.find("a.remove")
			.click(function(){
				$(this)
				.closest("p")
				.remove();
				
				//calculate the costs for this task
				plenty_admin.REST.plans.getCostForTemplateTask(taskDto, $taskDOM, function(taskCosts, $el){
					console.log("got costs for task: ", taskCosts, $el);
					$el
					.data("taskCost", taskCosts)
					.find(".task-cost")
					.text(numeral(taskCosts).format('$0,0.00'));
					
					plenty_admin.UI.add_template_plan.update_activity_cost($el.closest(".task_list").data("index"));
				});
				
				return false;
			});
			
			$taskDOM
			.find(".equipment")
			.append($equipment_task_item);
		}
		
		//build labour taskItems
		for(var e=0; e<taskDto.labourIds.length; e++){
			var labour = taskDto.labourIds[e];
			var componentData = {name: plenty_admin.DATA.labourTypes[labour].name};
			$labour_task_item = plenty_admin.UI.add_template_plan.build_task_component_saved(componentData, "labour");
			$labour_task_item
			.data("id", labour)
			.data("type", "labourIds")
			.find("a.remove")
			.click(function(){
				var $this = $(this);
				var taskComponent = $this.parent();
				var idList = $this.closest(".task").data("taskDto")[taskComponent.data("type")];
				console.log("idList", idList);
				var index = -1;
				for(var i=0; i<idList.length; i++){
					if(parseInt(taskComponent.data("id")) === idList[i]){
						index = i;
					}
					break;
				}
				
				console.log("index", index);
				
				if(index >= -1){
					idList.splice(index, 1);
				}
				
				$(this)
				.closest("p")
				.remove();
				
				//calculate the costs for this task
				plenty_admin.REST.plans.getCostForTemplateTask(taskDto, $taskDOM, function(taskCosts, $el){
					console.log("got costs for task: ", taskCosts, $el);
					$el
					.data("taskCost", taskCosts)
					.find(".task-cost")
					.text(numeral(taskCosts).format('$0,0.00'));
					
					plenty_admin.UI.add_template_plan.update_activity_cost($el.closest(".task_list").data("index"));
				});
				
				return false;
			});
			
			$taskDOM
			.find(".labour")
			.append($labour_task_item);
		}
		//build specific equipment taskItems
		for(var e=0; e<taskDto.anySpecificLabourIds.length; e++){
			var labour = taskDto.anySpecificLabourIds[e];
			var componentData = {name: plenty_admin.DATA.current_organization.skillsAndRates[labour].userFirstAndLastName};
			$labour_task_item = plenty_admin.UI.add_template_plan.build_task_component_saved(componentData, "labour");
			
			$labour_task_item
			.data("id", labour)
			.data("type", "labourIds")
			.find("a.remove")
			.click(function(){
				var $this = $(this);
				var taskComponent = $this.parent();
				var idList = $this.closest(".task").data("taskDto")[taskComponent.data("type")];
				console.log("idList", idList);
				var index = -1;
				for(var i=0; i<idList.length; i++){
					if(parseInt(taskComponent.data("id")) === idList[i]){
						index = i;
					}
					break;
				}
				
				console.log("index", index);
				
				if(index >= -1){
					idList.splice(index, 1);
				}
				
				$(this)
				.closest("p")
				.remove();
				
				//calculate the costs for this task
				plenty_admin.REST.plans.getCostForTemplateTask(taskDto, $taskDOM, function(taskCosts, $el){
					console.log("got costs for task: ", taskCosts, $el);
					$el
					.data("taskCost", taskCosts)
					.find(".task-cost")
					.text(numeral(taskCosts).format('$0,0.00'));
					
					plenty_admin.UI.add_template_plan.update_activity_cost($el.closest(".task_list").data("index"));
				});
				
				return false;
			});
			
			$taskDOM
			.find(".labour")
			.append($labour_task_item);
		}
		
		//build product taskItems
		for(var e=0; e<taskDto.productAmountPairs.length; e++){
			var prod = taskDto.productAmountPairs[e];
			var componentData = {
									name: plenty_admin.DATA.productTypes[prod.productTypeId].name,
									amount: prod.amount,
									uom: plenty_admin.DATA.productTypes[prod.productTypeId].unitName
								};
								
			if(taskDto.anySpecificProductIds.length > 0){
				for(var p=0; p<taskDto.anySpecificProductIds.length; p++){
					var specProd = taskDto.anySpecificProductIds[p];
					console.log("specProd", specProd, plenty_admin.DATA.allProducts[specProd], prod);
					if(plenty_admin.DATA.allProducts[specProd].productTypeId === prod.productTypeId){
						componentData.name += " ("+plenty_admin.DATA.allProducts[specProd].productName+")";
					}
				}
			}					
								
			$product_task_item = plenty_admin.UI.add_template_plan.build_task_component_saved(componentData, "product");
			
			$product_task_item
			.data("id", prod)
			.data("type", "productAmountPairs")
			.find("a.remove")
			.click(function(){
				var $this = $(this);
				var taskComponent = $this.parent();
				var idList = $this.closest(".task").data("taskDto")[taskComponent.data("type")];
				console.log("idList", idList);
				var index = -1;
				for(var i=0; i<idList.length; i++){
					if(parseInt(taskComponent.data("id").productTypeId) === idList[i]){
						index = i;
					}
					break;
				}
				
				console.log("index", index);
				
				if(index >= -1){
					idList.splice(index, 1);
				}
				
				$(this)
				.closest("p")
				.remove();
				
				//calculate the costs for this task
				plenty_admin.REST.plans.getCostForTemplateTask(taskDto, $taskDOM, function(taskCosts, $el){
					console.log("got costs for task: ", taskCosts, $el);
					$el
					.data("taskCost", taskCosts)
					.find(".task-cost")
					.text(numeral(taskCosts).format('$0,0.00'));
					
					plenty_admin.UI.add_template_plan.update_activity_cost($el.closest(".task_list").data("index"));
				});
				
				return false;
			});
			
			$taskDOM
			.find(".product")
			.append($product_task_item);
		}
		
		$taskDOM
		.find("button.delete-task")
		.click(function(){
			var allTasks = plenty_admin.UI.add_template_plan.taskListHolder
			.find("ul.task_list li.task");
			
			var index = $(this).closest(".task_list").data("index");
			
			$taskDOM
			.remove();
			
			plenty_admin.UI.add_template_plan.update_activity_cost(index);
			
			return false;
		})
		.end()
		.find("button.edit-task")
		.click(function(){
			plenty_admin.UI.add_template_plan.edit_task($(this).closest(".task"));
			return false;
		})
		.end()
		.find(".twistie")
		.click(function(){
			$taskDOM
			.find(".task-components")
			.slideToggle("fast");
			
			if($taskDOM.hasClass("open")){
				$taskDOM.removeClass("open");
			}else{
				$taskDOM.addClass("open");
			}
			
			return false;
		})
		.end()
		
		var selectedActivityIndex = plenty_admin.UI.add_template_plan.activityListHolder.find(".activity.active").data("index");
		plenty_admin.UI.add_template_plan.taskListHolder
		.find("ul.task_list")
		.hide();
		
		plenty_admin.UI.add_template_plan.taskListHolder
		.find("ul.task_list.activity_tasks_"+selectedActivityIndex)
		.append($taskDOM)
		.show();
	},
	clear_add_activity_form: function(){
		plenty_admin.UI.add_template_plan.addActivityForm
		.find("select option:eq(0)").prop("selected", true)
		.end()
		.find("input").each(function(){
			if($(this).data("default") !== "undefined"){
				if($(this).prop("type") === "number"){
					$(this).val(parseInt($(this).data("default")));
				}else{
					$(this).val($(this).data("default"));
				}
			}else{
				$(this).val("");
			}
		});
	},
	clear_add_task_form: function(){
		plenty_admin.UI.add_template_plan.addTaskAndTaskComponents
		.find("input")
		.each(function(){
			if($(this).data("default") !== "undefined"){
				if($(this).prop("type") === "number"){
					$(this).val(parseInt($(this).data("default")));
				}else{
					$(this).val($(this).data("default"));
				}
			}else{
				$(this).val("");
			}
		})
		.end()
		.find("table.task-items tbody tr")
		.remove()
		.end()
		.parent()
		.find("select :nth-child(0)")
		.prop("selected", true)
		.end()
		.find("select option:gt(0)")
		.prop("disabled", false)
		.end()
		.find("select.specific_items, .uom")
		.hide();
	},
	edit_activity: function($activity){
		console.log("edit_activity", $activity);
		var dto = $activity.data("activityDto");
		plenty_admin.UI.add_template_plan.addActivityBtn
		.hide();
		
		plenty_admin.UI.add_template_plan.addActivityForm
		.find(".save_activity")
		.hide()
		.end()
		.find(".update_activity")
		.data("activity", $activity)
		.show()
		.end()
		.find("#add_activity_type option[value="+dto.activityTypeId+"]")
		.prop("selected", true)
		.end()
		.find("#add_activity_days_from_planting")
		.val(dto.daysFromPlanting)
		.end()
		.slideDown("fast");
	},
	edit_task: function($task){
		console.log("edit_task", $task);
		var dto = $task.data("taskDto");
		
		$task.addClass("active");
		
		//render the task components
		plenty_admin.UI.add_template_plan.addTaskAndTaskComponents
		.find("#add_task_name")
		.val(dto.name)
		.end()
		.find("#add_task_days_from_start")
		.val(dto.daysFromActivityStart)
		.end()
		.find("button.save_task")
		.hide()
		.end()
		.find("button.update_task")
		.data("task", $task)
		.show();
		
		//loop dto and add task components to the table
		for(prop in dto){
			if(dto.hasOwnProperty(prop)){
				//we are only processing the arrays in this DTO
				if(Array.isArray(dto[prop])){
					var lcProp = prop.toLowerCase();
					var type = null;
					var specific = false;
					
					if(lcProp.indexOf("equipment") > -1){
						type = "equipment";
					}else if(lcProp.indexOf("labour") > -1){
						type = "labour";
					}else if(lcProp.indexOf("product") > -1){
						type = "product";
					}
					
					if(lcProp.indexOf("specific") > -1){
						specific = true;
					}
					
					var $task_items_table = plenty_admin.UI.add_template_plan.addTaskAndTaskComponents.find(".tab-pane#"+type+"_tab table."+type+"-items");
					
					for(var p=0; p<dto[prop].length; p++){
						//skip rendering specific products separately
						if(type == "product" && specific){
							continue;
						}
						
						var tc = dto[prop][p];
						//create the task item
						//console.log("typeof tc: ", typeof tc);
						if(typeof tc === "object"){
							var task_component = {
								id: 		tc.productTypeId,
								qty: 	tc.amount
							};
							if(specific){
								task_component.specificId = tc.productTypeId;
							}
						}else if(typeof tc === "number"){
							var task_component = {
								id: 		tc,
								qty: 	1 // NOTE - these should also be type/amount pairs as we do not currently have a record of how many labourers / equipments
							};
							if(specific){
								task_component.specificId = tc;
							}
						}
						var $taskComponent = plenty_admin.UI.add_template_plan.build_task_component(task_component, type);
						$task_items_table.append($taskComponent);
					}
				}
			}
		}
		
		//hide the add task button
		plenty_admin.UI.add_template_plan.addTaskBtn
		.slideUp("fast");
		
		//show the add task form immediately
		plenty_admin.UI.add_template_plan.addTaskAndTaskComponents
		.slideDown("fast");
		
		//minimise all current tasks
		plenty_admin.UI.add_template_plan.minimise_all_tasks();
	},
	order_activities_by_days_from_planting: function(){
		plenty_admin.UI.add_template_plan.activityListHolder
		.find(".activity")
		.sort(sort_activities)
		.appendTo(plenty_admin.UI.add_template_plan.activityListHolder);
		
		function sort_activities(a, b){
			return ($(b).data('activityDto').daysFromPlanting) < ($(a).data('activityDto').daysFromPlanting) ? 1 : -1;    
		}
	},
	order_tasks_by_days_from_activity_start: function(task_list){
		task_list
		.find(".task")
		.sort(sort_tasks)
		.appendTo(task_list);
		
		function sort_tasks(a, b){
			return ($(b).data('taskDto').daysFromActivityStart) < ($(a).data('taskDto').daysFromActivityStart) ? 1 : -1;    
		}
	},
	build_activity_element: function(activityDto, index){
		console.log("build_activity_element", activityDto);
		var $activityDOM = $([
			'<li class="list-group-item reveal-on-hover-wrap active activity col-md-12">',
				'<div class="help-block alert alert-danger error mtn mbs" style="display:none;"',
					'<h3>This activity has no tasks associated with it.</h3>',
					'<p>Either add tasks to it or remove this activity.</p>',
				'</div>',
				'<h4 class="mtn mbn">',
					'<a href="" class="overflowFix">',
						'<span class="col-md-6 pln prn">'+plenty_admin.DATA.activityTypes[activityDto.activityTypeId].name+'</span>',
						'<span class="col-md-3">'+(activityDto.daysFromPlanting >= 0 ? "+" : "")+activityDto.daysFromPlanting+' days</span>',
						'<span class="col-md-3 activityCost prn text-right">$00.00</span>',
						'<span class="reveal-on-hover-element fix-right-controls">',
							'<button class="btn btn-danger btn-sm delete-activity"><span class="fa fa-trash-o"></span> <span class="hidden-xs">Delete</span></button>',
							'<button type="button" class="btn btn-sm btn-primary edit-activity mls"><span class="glyphicon glyphicon-edit"></span> <span class="hidden-xs">Edit</span></button>',
						'</span>',
					'</a>',
				'</h4>',
			'</li>'
		].join(""))
		.data("activityDto", activityDto)
		.find("a")
		.click(function(){
			var selectedActivityIndex = $(this).closest("li").data("index");
			var allActivityTaskContainers = plenty_admin.UI.add_template_plan.taskListHolder.find("ul.task_list");
			var activityTasksContainer = plenty_admin.UI.add_template_plan.taskListHolder.find("ul.task_list.activity_tasks_"+selectedActivityIndex);
			var activityTasks = activityTasksContainer.find(".task");
			
			//hide all task containers
			allActivityTaskContainers
			.hide();
			
			//show the task container for this activity
			activityTasksContainer
			.show();
				
			if(activityTasks.length > 0){
				//hide the add task form
				plenty_admin.UI.add_template_plan.addTaskAndTaskComponents
				.slideUp("fast");
				
				//show the tasks for this activity
				plenty_admin.UI.add_template_plan.addTaskBtn
				.slideDown("fast");
				
			}else{
				//hide the add task button
				plenty_admin.UI.add_template_plan.addTaskBtn
				.slideUp("fast");
				
				//show the add task form immediately
				plenty_admin.UI.add_template_plan.addTaskAndTaskComponents
				.slideDown("fast");
			}
			
			plenty_admin.UI.add_template_plan.activityListHolder
			.find("li.list-group-item.active")
			.removeClass("active");
			
			$(this)
			.closest(".activity")
			.addClass("active");
			
			return false;
		})
		.end()
		.find("button.delete-activity")
		.click(function(){
			plenty_admin.UI.add_template_plan.taskListHolder.find(".task_list.list-group.activity_tasks_"+$activityDOM.data("index"))
			.remove();
			
			$(this)
			.closest("li")
			.remove();
			
			if($(this).closest(".activities_management").find("li.activity").length <= 0){
				plenty_admin.UI.add_template_plan
				.modal
				.find(".noActivityForTasks")
				.slideDown("fast");
				
				//hide the add task form immediately
				plenty_admin.UI.add_template_plan.addTaskAndTaskComponents
				.slideUp("fast");
				
				plenty_admin.UI.add_template_plan.addTaskBtn
				.slideUp("fast");
			}
			
			//update the total plan cost
			plenty_admin.UI.add_template_plan.update_plan_cost();
			
			return false;
		})
		.end()
		.find("button.edit-activity")
		.click(function(){
			plenty_admin.UI.add_template_plan.edit_activity($(this).closest(".activity"));
		})
		.end();
		
		//add the activity element to the DOM
		plenty_admin.UI.add_template_plan.activityListHolder
		.find("li.list-group-item.active")
		.removeClass("active")
		.end()
		.append($activityDOM);
		
		$activityDOM
		.data("index", (index != undefined ? index : $activityDOM.index()))
		.addClass("activity_" + (index != undefined ? index : $activityDOM.index()));
		
		//create a task container for this activity element
		if(plenty_admin.UI.add_template_plan.taskListHolder.find(".task_list.list-group.activity_tasks_"+$activityDOM.data("index")).length == 0){
			var taskList = $('<ul class="task_list list-group activity_tasks_'+$activityDOM.data("index")+' mbn" style="display:none;"></ul>');
			taskList.data("index", $activityDOM.data("index"));
			
			plenty_admin.UI.add_template_plan.taskListHolder
			.append(taskList);
		}
	}
};

plenty_admin.UI.add_template_plan.activityListHolder = plenty_admin.UI.add_template_plan.modal.find(".activities_management .activity_list");
plenty_admin.UI.add_template_plan.addActivityForm = plenty_admin.UI.add_template_plan.modal.find("form.add_activity_form");
plenty_admin.UI.add_template_plan.addActivityBtn = plenty_admin.UI.add_template_plan.modal.find("button.add_activity");

plenty_admin.UI.add_template_plan.taskListHolder = plenty_admin.UI.add_template_plan.modal.find(".tasks_management .task_lists");
plenty_admin.UI.add_template_plan.addTaskForm = plenty_admin.UI.add_template_plan.modal.find("form.add_task_form");
plenty_admin.UI.add_template_plan.addTaskAndTaskComponents = plenty_admin.UI.add_template_plan.modal.find(".add_task_and_task_components");
plenty_admin.UI.add_template_plan.addTaskBtn = plenty_admin.UI.add_template_plan.modal.find("button.add_task");