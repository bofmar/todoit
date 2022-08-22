(()=>{"use strict";class t{#t;#e;#n;#r;constructor(t,e,n){this.#t=t,this.#e=e||[],this.#n=n,this.#r=crypto.randomUUID()}getTitle(){return this.#t}getItemsList(){return this.#e}getDescription(){return this.#n}getID(){return this.#r}setTitle(t){this.#t=t}setDescription(t){this.#n=t}length(){return this.getItemsList().length}addItem(t){this.#e.push(t)}removeItem(t){const e=this.getItemsList().findIndex((e=>e.getID()===t.getID()));-1!==e&&this.#e.splice(e,1)}findItem(t){const e=this.getItemsList().findIndex((e=>e.getID()===t.getID()));if(-1!==e)return this.getItemsList()[e]}toJSON(){return{title:this.getTitle(),itemsList:this.getItemsList(),description:this.getDescription(),id:this.getID()}}}class e{#t;#i;#n;#a;#o;#r;constructor(t,e,n,r,i,a){this.#t=t,this.#i=e,this.#n=n,this.#a=r,this.#o=a,this.#r=i||crypto.randomUUID()}getTitle(){return this.#t}getDueDate(){return this.#i}getDescription(){return this.#n}getPriority(){return this.#a}getID(){return this.#r}isDone(){return this.#o}setTitle(t){this.#t=t}setDueDate(t){this.#i=t}setDescription(t){this.#n=t}setPriority(t){this.#a=t}flipDone(){this.#o=!this.#o}toJSON(){return{title:this.getTitle(),dueDate:this.getDueDate(),description:this.getDescription(),priority:this.getPriority(),done:this.isDone(),id:this.getID()}}}function n(t,e,n){const r=document.createElement(t);r.innerText=n,e.appendChild(r)}function r(t,e,n=""){const r=document.createElement(t);return r.classList.add(e),r.innerText=n,r}function i(t,e){for(let r=0;r<e.length;r++){const i=document.createElement("li");i.setAttribute("data-id",e[r].getID()),n("button",i,e[r].getTitle()),n("button",i,"Details"),n("span",i,e[r].getDueDate()),n("button",i,"Edit"),n("button",i,"Delete"),t.appendChild(i)}}function a(t,e){const n=document.createElement("label");return n.innerText=t,n.htmlFor=e,n}function o(t,e,n,r){t.setAttribute("type",e),t.setAttribute("id",n),t.setAttribute("name",r)}function s(t,e){const n=document.createElement("option");return n.setAttribute("value",t),n.selected=e,n.innerText=t.charAt(0).toUpperCase()+t.slice(1),n}function u(t){const e=r("div","project-wrapper"),a=t.getItemsList();n("h2",e,t.getTitle());const o=r("ul","items-list");i(o,a),e.appendChild(o);const s=r("button","add-item-button","Add item");return e.appendChild(s),e}function d(t,e){if(e.length<t)throw new TypeError(t+" argument"+(t>1?"s":"")+" required, but only "+e.length+" present")}function c(t){return d(1,arguments),t instanceof Date||"object"==typeof t&&"[object Date]"===Object.prototype.toString.call(t)}function l(t){d(1,arguments);var e=Object.prototype.toString.call(t);return t instanceof Date||"object"==typeof t&&"[object Date]"===e?new Date(t.getTime()):"number"==typeof t||"[object Number]"===e?new Date(t):("string"!=typeof t&&"[object String]"!==e||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"),console.warn((new Error).stack)),new Date(NaN))}function h(t){if(d(1,arguments),!c(t)&&"number"!=typeof t)return!1;var e=l(t);return!isNaN(Number(e))}function m(t){if(null===t||!0===t||!1===t)return NaN;var e=Number(t);return isNaN(e)?e:e<0?Math.ceil(e):Math.floor(e)}function f(t,e){d(2,arguments);var n=l(t).getTime(),r=m(e);return new Date(n+r)}function g(t,e){d(2,arguments);var n=m(e);return f(t,-n)}var p=864e5;function v(t){d(1,arguments);var e=1,n=l(t),r=n.getUTCDay(),i=(r<e?7:0)+r-e;return n.setUTCDate(n.getUTCDate()-i),n.setUTCHours(0,0,0,0),n}function w(t){d(1,arguments);var e=l(t),n=e.getUTCFullYear(),r=new Date(0);r.setUTCFullYear(n+1,0,4),r.setUTCHours(0,0,0,0);var i=v(r),a=new Date(0);a.setUTCFullYear(n,0,4),a.setUTCHours(0,0,0,0);var o=v(a);return e.getTime()>=i.getTime()?n+1:e.getTime()>=o.getTime()?n:n-1}function b(t){d(1,arguments);var e=w(t),n=new Date(0);n.setUTCFullYear(e,0,4),n.setUTCHours(0,0,0,0);var r=v(n);return r}var y=6048e5,C={};function D(){return C}function T(t,e){var n,r,i,a,o,s,u,c;d(1,arguments);var h=D(),f=m(null!==(n=null!==(r=null!==(i=null!==(a=null==e?void 0:e.weekStartsOn)&&void 0!==a?a:null==e||null===(o=e.locale)||void 0===o||null===(s=o.options)||void 0===s?void 0:s.weekStartsOn)&&void 0!==i?i:h.weekStartsOn)&&void 0!==r?r:null===(u=h.locale)||void 0===u||null===(c=u.options)||void 0===c?void 0:c.weekStartsOn)&&void 0!==n?n:0);if(!(f>=0&&f<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var g=l(t),p=g.getUTCDay(),v=(p<f?7:0)+p-f;return g.setUTCDate(g.getUTCDate()-v),g.setUTCHours(0,0,0,0),g}function P(t,e){var n,r,i,a,o,s,u,c;d(1,arguments);var h=l(t),f=h.getUTCFullYear(),g=D(),p=m(null!==(n=null!==(r=null!==(i=null!==(a=null==e?void 0:e.firstWeekContainsDate)&&void 0!==a?a:null==e||null===(o=e.locale)||void 0===o||null===(s=o.options)||void 0===s?void 0:s.firstWeekContainsDate)&&void 0!==i?i:g.firstWeekContainsDate)&&void 0!==r?r:null===(u=g.locale)||void 0===u||null===(c=u.options)||void 0===c?void 0:c.firstWeekContainsDate)&&void 0!==n?n:1);if(!(p>=1&&p<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var v=new Date(0);v.setUTCFullYear(f+1,0,p),v.setUTCHours(0,0,0,0);var w=T(v,e),b=new Date(0);b.setUTCFullYear(f,0,p),b.setUTCHours(0,0,0,0);var y=T(b,e);return h.getTime()>=w.getTime()?f+1:h.getTime()>=y.getTime()?f:f-1}function M(t,e){var n,r,i,a,o,s,u,c;d(1,arguments);var l=D(),h=m(null!==(n=null!==(r=null!==(i=null!==(a=null==e?void 0:e.firstWeekContainsDate)&&void 0!==a?a:null==e||null===(o=e.locale)||void 0===o||null===(s=o.options)||void 0===s?void 0:s.firstWeekContainsDate)&&void 0!==i?i:l.firstWeekContainsDate)&&void 0!==r?r:null===(u=l.locale)||void 0===u||null===(c=u.options)||void 0===c?void 0:c.firstWeekContainsDate)&&void 0!==n?n:1),f=P(t,e),g=new Date(0);g.setUTCFullYear(f,0,h),g.setUTCHours(0,0,0,0);var p=T(g,e);return p}var L=6048e5;function x(t,e){for(var n=t<0?"-":"",r=Math.abs(t).toString();r.length<e;)r="0"+r;return n+r}const E=function(t,e){var n=t.getUTCFullYear(),r=n>0?n:1-n;return x("yy"===e?r%100:r,e.length)},S=function(t,e){var n=t.getUTCMonth();return"M"===e?String(n+1):x(n+1,2)},I=function(t,e){return x(t.getUTCDate(),e.length)},k=function(t,e){return x(t.getUTCHours()%12||12,e.length)},j=function(t,e){return x(t.getUTCHours(),e.length)},U=function(t,e){return x(t.getUTCMinutes(),e.length)},W=function(t,e){return x(t.getUTCSeconds(),e.length)},A=function(t,e){var n=e.length,r=t.getUTCMilliseconds();return x(Math.floor(r*Math.pow(10,n-3)),e.length)};function q(t,e){var n=t>0?"-":"+",r=Math.abs(t),i=Math.floor(r/60),a=r%60;if(0===a)return n+String(i);var o=e||"";return n+String(i)+o+x(a,2)}function N(t,e){return t%60==0?(t>0?"-":"+")+x(Math.abs(t)/60,2):Y(t,e)}function Y(t,e){var n=e||"",r=t>0?"-":"+",i=Math.abs(t);return r+x(Math.floor(i/60),2)+n+x(i%60,2)}const O={G:function(t,e,n){var r=t.getUTCFullYear()>0?1:0;switch(e){case"G":case"GG":case"GGG":return n.era(r,{width:"abbreviated"});case"GGGGG":return n.era(r,{width:"narrow"});default:return n.era(r,{width:"wide"})}},y:function(t,e,n){if("yo"===e){var r=t.getUTCFullYear(),i=r>0?r:1-r;return n.ordinalNumber(i,{unit:"year"})}return E(t,e)},Y:function(t,e,n,r){var i=P(t,r),a=i>0?i:1-i;return"YY"===e?x(a%100,2):"Yo"===e?n.ordinalNumber(a,{unit:"year"}):x(a,e.length)},R:function(t,e){return x(w(t),e.length)},u:function(t,e){return x(t.getUTCFullYear(),e.length)},Q:function(t,e,n){var r=Math.ceil((t.getUTCMonth()+1)/3);switch(e){case"Q":return String(r);case"QQ":return x(r,2);case"Qo":return n.ordinalNumber(r,{unit:"quarter"});case"QQQ":return n.quarter(r,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(r,{width:"narrow",context:"formatting"});default:return n.quarter(r,{width:"wide",context:"formatting"})}},q:function(t,e,n){var r=Math.ceil((t.getUTCMonth()+1)/3);switch(e){case"q":return String(r);case"qq":return x(r,2);case"qo":return n.ordinalNumber(r,{unit:"quarter"});case"qqq":return n.quarter(r,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(r,{width:"narrow",context:"standalone"});default:return n.quarter(r,{width:"wide",context:"standalone"})}},M:function(t,e,n){var r=t.getUTCMonth();switch(e){case"M":case"MM":return S(t,e);case"Mo":return n.ordinalNumber(r+1,{unit:"month"});case"MMM":return n.month(r,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(r,{width:"narrow",context:"formatting"});default:return n.month(r,{width:"wide",context:"formatting"})}},L:function(t,e,n){var r=t.getUTCMonth();switch(e){case"L":return String(r+1);case"LL":return x(r+1,2);case"Lo":return n.ordinalNumber(r+1,{unit:"month"});case"LLL":return n.month(r,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(r,{width:"narrow",context:"standalone"});default:return n.month(r,{width:"wide",context:"standalone"})}},w:function(t,e,n,r){var i=function(t,e){d(1,arguments);var n=l(t),r=T(n,e).getTime()-M(n,e).getTime();return Math.round(r/L)+1}(t,r);return"wo"===e?n.ordinalNumber(i,{unit:"week"}):x(i,e.length)},I:function(t,e,n){var r=function(t){d(1,arguments);var e=l(t),n=v(e).getTime()-b(e).getTime();return Math.round(n/y)+1}(t);return"Io"===e?n.ordinalNumber(r,{unit:"week"}):x(r,e.length)},d:function(t,e,n){return"do"===e?n.ordinalNumber(t.getUTCDate(),{unit:"date"}):I(t,e)},D:function(t,e,n){var r=function(t){d(1,arguments);var e=l(t),n=e.getTime();e.setUTCMonth(0,1),e.setUTCHours(0,0,0,0);var r=e.getTime(),i=n-r;return Math.floor(i/p)+1}(t);return"Do"===e?n.ordinalNumber(r,{unit:"dayOfYear"}):x(r,e.length)},E:function(t,e,n){var r=t.getUTCDay();switch(e){case"E":case"EE":case"EEE":return n.day(r,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(r,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},e:function(t,e,n,r){var i=t.getUTCDay(),a=(i-r.weekStartsOn+8)%7||7;switch(e){case"e":return String(a);case"ee":return x(a,2);case"eo":return n.ordinalNumber(a,{unit:"day"});case"eee":return n.day(i,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(i,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(i,{width:"short",context:"formatting"});default:return n.day(i,{width:"wide",context:"formatting"})}},c:function(t,e,n,r){var i=t.getUTCDay(),a=(i-r.weekStartsOn+8)%7||7;switch(e){case"c":return String(a);case"cc":return x(a,e.length);case"co":return n.ordinalNumber(a,{unit:"day"});case"ccc":return n.day(i,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(i,{width:"narrow",context:"standalone"});case"cccccc":return n.day(i,{width:"short",context:"standalone"});default:return n.day(i,{width:"wide",context:"standalone"})}},i:function(t,e,n){var r=t.getUTCDay(),i=0===r?7:r;switch(e){case"i":return String(i);case"ii":return x(i,e.length);case"io":return n.ordinalNumber(i,{unit:"day"});case"iii":return n.day(r,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(r,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},a:function(t,e,n){var r=t.getUTCHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},b:function(t,e,n){var r,i=t.getUTCHours();switch(r=12===i?"noon":0===i?"midnight":i/12>=1?"pm":"am",e){case"b":case"bb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},B:function(t,e,n){var r,i=t.getUTCHours();switch(r=i>=17?"evening":i>=12?"afternoon":i>=4?"morning":"night",e){case"B":case"BB":case"BBB":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},h:function(t,e,n){if("ho"===e){var r=t.getUTCHours()%12;return 0===r&&(r=12),n.ordinalNumber(r,{unit:"hour"})}return k(t,e)},H:function(t,e,n){return"Ho"===e?n.ordinalNumber(t.getUTCHours(),{unit:"hour"}):j(t,e)},K:function(t,e,n){var r=t.getUTCHours()%12;return"Ko"===e?n.ordinalNumber(r,{unit:"hour"}):x(r,e.length)},k:function(t,e,n){var r=t.getUTCHours();return 0===r&&(r=24),"ko"===e?n.ordinalNumber(r,{unit:"hour"}):x(r,e.length)},m:function(t,e,n){return"mo"===e?n.ordinalNumber(t.getUTCMinutes(),{unit:"minute"}):U(t,e)},s:function(t,e,n){return"so"===e?n.ordinalNumber(t.getUTCSeconds(),{unit:"second"}):W(t,e)},S:function(t,e){return A(t,e)},X:function(t,e,n,r){var i=(r._originalDate||t).getTimezoneOffset();if(0===i)return"Z";switch(e){case"X":return N(i);case"XXXX":case"XX":return Y(i);default:return Y(i,":")}},x:function(t,e,n,r){var i=(r._originalDate||t).getTimezoneOffset();switch(e){case"x":return N(i);case"xxxx":case"xx":return Y(i);default:return Y(i,":")}},O:function(t,e,n,r){var i=(r._originalDate||t).getTimezoneOffset();switch(e){case"O":case"OO":case"OOO":return"GMT"+q(i,":");default:return"GMT"+Y(i,":")}},z:function(t,e,n,r){var i=(r._originalDate||t).getTimezoneOffset();switch(e){case"z":case"zz":case"zzz":return"GMT"+q(i,":");default:return"GMT"+Y(i,":")}},t:function(t,e,n,r){var i=r._originalDate||t;return x(Math.floor(i.getTime()/1e3),e.length)},T:function(t,e,n,r){return x((r._originalDate||t).getTime(),e.length)}};var F=function(t,e){switch(t){case"P":return e.date({width:"short"});case"PP":return e.date({width:"medium"});case"PPP":return e.date({width:"long"});default:return e.date({width:"full"})}},H=function(t,e){switch(t){case"p":return e.time({width:"short"});case"pp":return e.time({width:"medium"});case"ppp":return e.time({width:"long"});default:return e.time({width:"full"})}},z={p:H,P:function(t,e){var n,r=t.match(/(P+)(p+)?/)||[],i=r[1],a=r[2];if(!a)return F(t,e);switch(i){case"P":n=e.dateTime({width:"short"});break;case"PP":n=e.dateTime({width:"medium"});break;case"PPP":n=e.dateTime({width:"long"});break;default:n=e.dateTime({width:"full"})}return n.replace("{{date}}",F(i,e)).replace("{{time}}",H(a,e))}};const B=z;function Q(t){var e=new Date(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),t.getMilliseconds()));return e.setUTCFullYear(t.getFullYear()),t.getTime()-e.getTime()}var G=["D","DD"],J=["YY","YYYY"];function X(t){return-1!==G.indexOf(t)}function R(t){return-1!==J.indexOf(t)}function _(t,e,n){if("YYYY"===t)throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(e,"`) for formatting years to the input `").concat(n,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));if("YY"===t)throw new RangeError("Use `yy` instead of `YY` (in `".concat(e,"`) for formatting years to the input `").concat(n,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));if("D"===t)throw new RangeError("Use `d` instead of `D` (in `".concat(e,"`) for formatting days of the month to the input `").concat(n,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));if("DD"===t)throw new RangeError("Use `dd` instead of `DD` (in `".concat(e,"`) for formatting days of the month to the input `").concat(n,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"))}var $={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function K(t){return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.width?String(e.width):t.defaultWidth,r=t.formats[n]||t.formats[t.defaultWidth];return r}}var V,Z={date:K({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:K({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:K({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},tt={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function et(t){return function(e,n){var r;if("formatting"===(null!=n&&n.context?String(n.context):"standalone")&&t.formattingValues){var i=t.defaultFormattingWidth||t.defaultWidth,a=null!=n&&n.width?String(n.width):i;r=t.formattingValues[a]||t.formattingValues[i]}else{var o=t.defaultWidth,s=null!=n&&n.width?String(n.width):t.defaultWidth;r=t.values[s]||t.values[o]}return r[t.argumentCallback?t.argumentCallback(e):e]}}function nt(t){return function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=n.width,i=r&&t.matchPatterns[r]||t.matchPatterns[t.defaultMatchWidth],a=e.match(i);if(!a)return null;var o,s=a[0],u=r&&t.parsePatterns[r]||t.parsePatterns[t.defaultParseWidth],d=Array.isArray(u)?it(u,(function(t){return t.test(s)})):rt(u,(function(t){return t.test(s)}));o=t.valueCallback?t.valueCallback(d):d,o=n.valueCallback?n.valueCallback(o):o;var c=e.slice(s.length);return{value:o,rest:c}}}function rt(t,e){for(var n in t)if(t.hasOwnProperty(n)&&e(t[n]))return n}function it(t,e){for(var n=0;n<t.length;n++)if(e(t[n]))return n}const at={code:"en-US",formatDistance:function(t,e,n){var r,i=$[t];return r="string"==typeof i?i:1===e?i.one:i.other.replace("{{count}}",e.toString()),null!=n&&n.addSuffix?n.comparison&&n.comparison>0?"in "+r:r+" ago":r},formatLong:Z,formatRelative:function(t,e,n,r){return tt[t]},localize:{ordinalNumber:function(t,e){var n=Number(t),r=n%100;if(r>20||r<10)switch(r%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:et({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:et({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:function(t){return t-1}}),month:et({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:et({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:et({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(V={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(t){return parseInt(t,10)}},function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.match(V.matchPattern);if(!n)return null;var r=n[0],i=t.match(V.parsePattern);if(!i)return null;var a=V.valueCallback?V.valueCallback(i[0]):i[0];a=e.valueCallback?e.valueCallback(a):a;var o=t.slice(r.length);return{value:a,rest:o}}),era:nt({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:nt({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(t){return t+1}}),month:nt({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:nt({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:nt({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};var ot=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,st=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,ut=/^'([^]*?)'?$/,dt=/''/g,ct=/[a-zA-Z]/;function lt(t){var e=t.match(ut);return e?e[1].replace(dt,"'"):t}function ht(){const t=new Date,e=function(t,e,n){var r,i,a,o,s,u,c,f,p,v,w,b,y,C,T,P,M,L;d(2,arguments);var x=String(e),E=D(),S=null!==(r=null!==(i=null==n?void 0:n.locale)&&void 0!==i?i:E.locale)&&void 0!==r?r:at,I=m(null!==(a=null!==(o=null!==(s=null!==(u=null==n?void 0:n.firstWeekContainsDate)&&void 0!==u?u:null==n||null===(c=n.locale)||void 0===c||null===(f=c.options)||void 0===f?void 0:f.firstWeekContainsDate)&&void 0!==s?s:E.firstWeekContainsDate)&&void 0!==o?o:null===(p=E.locale)||void 0===p||null===(v=p.options)||void 0===v?void 0:v.firstWeekContainsDate)&&void 0!==a?a:1);if(!(I>=1&&I<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var k=m(null!==(w=null!==(b=null!==(y=null!==(C=null==n?void 0:n.weekStartsOn)&&void 0!==C?C:null==n||null===(T=n.locale)||void 0===T||null===(P=T.options)||void 0===P?void 0:P.weekStartsOn)&&void 0!==y?y:E.weekStartsOn)&&void 0!==b?b:null===(M=E.locale)||void 0===M||null===(L=M.options)||void 0===L?void 0:L.weekStartsOn)&&void 0!==w?w:0);if(!(k>=0&&k<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");if(!S.localize)throw new RangeError("locale must contain localize property");if(!S.formatLong)throw new RangeError("locale must contain formatLong property");var j=l(t);if(!h(j))throw new RangeError("Invalid time value");var U=Q(j),W=g(j,U),A={firstWeekContainsDate:I,weekStartsOn:k,locale:S,_originalDate:j};return x.match(st).map((function(t){var e=t[0];return"p"===e||"P"===e?(0,B[e])(t,S.formatLong):t})).join("").match(ot).map((function(r){if("''"===r)return"'";var i=r[0];if("'"===i)return lt(r);var a=O[i];if(a)return null!=n&&n.useAdditionalWeekYearTokens||!R(r)||_(r,e,String(t)),null!=n&&n.useAdditionalDayOfYearTokens||!X(r)||_(r,e,String(t)),a(W,r,S.localize,A);if(i.match(ct))throw new RangeError("Format string contains an unescaped latin alphabet character `"+i+"`");return r})).join("")}(new Date(t.getFullYear(),t.getMonth(),t.getDate()),"yyyy-MM-dd");return e}const mt=document.querySelector("body"),ft=new class{#t;#e;#s;#n;constructor(t=[],e=[]){this.#t="Home",this.#n="Description",this.#e=t||[],this.#s=e||[]}getTitle(){return this.#t}getItemsList(){return this.#e}getProjectsList(){return this.#s}getDescription(){return this.#n}createItem(t,n,r,i,a=null,o=null){const s=new e(t,n,r,i,a,!1);if(this.addItem(s),null===o)return s;const u=this.getProjectsList().findIndex((t=>t.getID()===o));if(-1!==u)return this.getProjectsList()[u].addItem(s),s;console.error(`No project with id ${o} found`)}itemsLength(){return this.getItemsList().length}addItem(t){this.#e.push(t)}removeItem(t){const e=this.getItemsList().findIndex((e=>e.getID()===t.getID()));-1!==e&&(this.#s.forEach((e=>{e.removeItem(t)})),this.#e.splice(e,1))}findItemFromID(t){const e=this.getItemsList().findIndex((e=>e.getID()===t));if(-1!==e)return this.getItemsList()[e]}createProject(e,n,r){const i=new t(e,n,r);this.addProject(i)}projectsLength(){return this.getProjectsList().length}addProject(t){this.#s.push(t)}removeProject(t){const e=this.getProjectsList().findIndex((e=>e.getID()===t.getID()));if(-1===e)return;const n=this.getProjectsList()[e];for(let t=0;t<n.length();)this.removeItem(n.getItemsList()[t]);this.#s.splice(e,1)}findProjectFromID(t){const e=this.getProjectsList().findIndex((e=>e.getID()===t));if(-1!==e)return this.getProjectsList()[e]}toJSON(){return{itemsList:this.getItemsList(),projectsList:this.getProjectsList()}}parseFromJSON(t){if(void 0===t)return;const e=JSON.parse(t);for(let t=0;t<e.itemsList.length;t++)this.recreateItem(e.itemsList[t]);for(let t=0;t<e.projectsList.length;t++)this.recreateProject(e.projectsList[t])}recreateItem(t){this.createItem(t.title,t.dueDate,t.description,t.priority,t.id)}recreateProject(t){const e=t.itemsList.map((t=>this.findItemFromID(t.id)));this.createProject(t.title,e,t.description)}};mt.appendChild(function(t){const e=r("nav","sidebar"),i=document.createElement("ul");e.appendChild(i),function(t,e){for(let n=0;n<e.length;n++){const i=document.createElement("li"),a=r("button","nav-button",e[n]);i.appendChild(a),t.appendChild(i)}}(i,["All Projects","Today","Upcoming"]);const a=document.createElement("li");return n("h2",a,"Projects"),i.appendChild(a),function(t,e){const n=[...e].map((t=>t.getTitle()));for(let i=0;i<n.length;i++){const a=document.createElement("li"),o=r("button","nav-button",n[i]);o.setAttribute("id",e[i].getID()),a.appendChild(o),t.appendChild(a)}}(i,t),e}(ft.getProjectsList()));const gt=function(t){const e=[...t].map((t=>t.getTitle())),i=document.createElement("dialog");i.classList.add("modal","add-item-modal"),n("h3",i,"New Task");const u=document.createElement("form"),d=r("div","item-title-div"),c=a("Title","item-title");d.appendChild(c);const l=document.createElement("input");o(l,"text","item-title","title"),l.required=!0,d.appendChild(l),u.appendChild(d);const h=r("div","item-due-div"),m=a("Due date","item-due");h.appendChild(m);const f=document.createElement("input");o(f,"date","item-due","due-date"),f.setAttribute("min",ht()),h.appendChild(f),u.appendChild(h);const g=r("div","item-area-div"),p=a("Description","item-description");g.appendChild(p);const v=document.createElement("textarea");v.setAttribute("id","item-description"),v.setAttribute("name","description"),v.setAttribute("placeholder","No description..."),g.appendChild(v),u.appendChild(g);const w=r("div","item-priority-div"),b=a("Priority","item-priority");w.appendChild(b);const y=document.createElement("select");y.setAttribute("id","item-priority"),y.setAttribute("name","priority");const C=s("low",!0),D=s("medium",!1),T=s("high",!1);y.appendChild(C),y.appendChild(D),y.appendChild(T),w.appendChild(y),u.appendChild(w);const P=r("div","item-project-div"),M=a("Project","item-project");P.appendChild(M);const L=document.createElement("select");L.setAttribute("id","item-project"),L.setAttribute("name","project");const x=s("none",!0);L.appendChild(x);for(let n=0;n<e.length;n++){const r=s(e[n].toLowerCase(),!1);r.setAttribute("value",t[n].getID()),L.appendChild(r)}P.appendChild(L),u.appendChild(P);const E=r("div","item-modal-buttons-div"),S=r("button","item-modal-cancel","Cancel"),I=r("button","item-modal-add","Add Item");return E.appendChild(S),E.appendChild(I),u.appendChild(E),i.appendChild(u),i}(ft.getProjectsList());mt.appendChild(gt);const pt=gt.querySelector("form"),vt=function(){const t=document.createElement("dialog");t.classList.add("modal","form-error-modal");const e=document.createElement("h3");e.innerText="Validation Error",t.appendChild(e);const n=document.createElement("p");n.innerText="Please fill out the mandatory fields",t.appendChild(n);const r=document.createElement("button");return r.innerText="OK",t.appendChild(r),t}();mt.appendChild(vt);let wt="All Projects";function bt(){document.querySelector(".add-item-button").addEventListener("click",(()=>{gt.showModal()})),document.querySelector(".project-wrapper").querySelectorAll("li").forEach((t=>{const e=t.querySelectorAll("button"),n=t.getAttribute("data-id");e[1].addEventListener("click",(()=>{Ct(n)})),e[3].addEventListener("click",(()=>{yt(n)}))}))}function yt(t){const e=ft.findItemFromID(t);ft.removeItem(e);const n=document.querySelector(".project-wrapper").querySelector("ul");n.querySelectorAll("li").forEach((e=>{e.getAttribute("data-id")===t&&n.removeChild(e)})),Dt()}function Ct(t){const e=function(t){const e=document.createElement("dialog");e.classList.add("modal","item-details-modal");const n=document.createElement("h3");n.innerText=t.getTitle(),e.appendChild(n);const r=document.createElement("p");r.innerText=t.getDescription(),e.appendChild(r);const i=document.createElement("p");i.innerText=`Due date: ${t.getDueDate()}`,e.appendChild(i);const a=document.createElement("p");a.innerText=`Priority: ${t.getPriority()}`,e.appendChild(a);const o=document.createElement("button");return o.innerText="OK",e.appendChild(o),e}(ft.findItemFromID(t));mt.appendChild(e),e.showModal(),e.querySelector("button").addEventListener("click",(()=>{e.close(),mt.removeChild(e)}))}function Dt(){localStorage.setItem("master",JSON.stringify(ft))}ft.parseFromJSON(localStorage.master),mt.appendChild(u(ft)),bt(),document.querySelector(".item-modal-add").addEventListener("click",(t=>{t.preventDefault();const e={title:document.getElementById("item-title").value,date:document.getElementById("item-due").value,description:document.getElementById("item-description").value,priority:document.getElementById("item-priority").value,project:document.getElementById("item-project").value};""!==e.title?(""===e.date&&(e.date="Never"),function(t){const e=ft.createItem(t.title,t.date,t.description,t.priority,null,"none"===t.project?null:t.project);if("All Projects"===wt||wt===t.project){const t=document.querySelector(".items-list");i(t,[e]);const n=t.lastChild.querySelectorAll("button");n[1].addEventListener("click",(()=>{Ct(e.getID())})),n[3].addEventListener("click",(()=>{yt(e.getID())}))}Dt()}(e),pt.reset(),gt.close()):vt.showModal()})),document.querySelector(".item-modal-cancel").addEventListener("click",(t=>{t.preventDefault(),pt.reset(),gt.close()})),vt.querySelector("button").addEventListener("click",(t=>{t.preventDefault(),vt.close()})),document.querySelectorAll(".nav-button").forEach((t=>t.addEventListener("click",(()=>{!function(t){if(mt.removeChild(mt.lastChild),t.hasAttribute("id")){const e=ft.findProjectFromID(t.getAttribute("id"));wt=t.getAttribute("id"),mt.appendChild(u(e))}else switch(t.innerText){case"All Projects":wt=t.innerText,mt.appendChild(u(ft));break;case"Today":mt.appendChild(function(t){const e=r("div","today");return n("h1",e,"Today"),e}());break;case"Upcoming":mt.appendChild(function(t){const e=r("div","today");return n("h1",e,"Upcoming"),e}())}console.log(wt),bt()}(t)})))),ht()})();