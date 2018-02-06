/* https://github.com/verlok/lazyload | v8.6.0 | edited */
!function(e,t){var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};"object"===("undefined"==typeof exports?"undefined":o(exports))&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.LazyLoad=t()}(this,function(){"use strict";var e={elements_selector:"img",container:window,threshold:300,throttle:150,data_src:"src",data_srcset:"srcset",class_loading:"loading",class_loaded:"loaded",class_error:"error",class_initial:"initial",skip_invisible:!0,callback_load:null,callback_error:null,callback_set:null,callback_processed:null,callback_enter:null},t=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n])}return e},o=!("onscroll"in window)||/glebot/.test(navigator.userAgent),n=function(e,t){e&&e(t)},i=function(e){return e.getBoundingClientRect().top+window.pageYOffset-e.ownerDocument.documentElement.clientTop},s=function(e,t,o){return!(r=e,a=t,c=o,(a===window?window.innerHeight+window.pageYOffset:i(a)+a.offsetHeight)<=i(r)-c||(n=e,s=t,l=o,(s===window?window.pageYOffset:i(s))>=i(n)+l+n.offsetHeight));var n,s,l,r,a,c},l=function(e,t){var o,n="LazyLoad::Initialized",i=new e(t);try{o=new CustomEvent(n,{detail:{instance:i}})}catch(e){(o=document.createEvent("CustomEvent")).initCustomEvent(n,!1,!1,{instance:i})}window.dispatchEvent(o)},r="data-",a=function(e,t){return e.getAttribute(r+t)},c=function(e,t,o){var n=e.tagName,i=a(e,o);if("IMG"===n){!function(e,t){var o=e.parentNode;if("PICTURE"===o.tagName)for(var n=0;n<o.children.length;n++){var i=o.children[n];if("SOURCE"===i.tagName){var s=a(i,t);s&&i.setAttribute("srcset",s)}}}(e,t);var s=a(e,t);return s&&e.setAttribute("srcset",s),void(i&&e.setAttribute("src",i))}"IFRAME"!==n?i&&(e.style.backgroundImage='url("'+i+'")'):i&&e.setAttribute("src",i)},u="classList"in document.createElement("p"),d=function(e,t){u?e.classList.add(t):e.className+=(e.className?" ":"")+t},h=function(e,t){u?e.classList.remove(t):e.className=e.className.replace(new RegExp("(^|\\s+)"+t+"(\\s+|$)")," ").replace(/^\s+/,"").replace(/\s+$/,"")},_=function(o){this._settings=t({},e,o),this._queryOriginNode=this._settings.container===window?document:this._settings.container,this._previousLoopTime=0,this._loopTimeout=null,this._boundHandleScroll=this.handleScroll.bind(this),this._isFirstLoop=!0,window.addEventListener("resize",this._boundHandleScroll),this.update()};_.prototype={_reveal:function(e){var t=this._settings,o=function o(){t&&(e.removeEventListener("load",i),e.removeEventListener("error",o),h(e,t.class_loading),d(e,t.class_error),n(t.callback_error,e))},i=function i(){t&&(h(e,t.class_loading),d(e,t.class_loaded),e.removeEventListener("load",i),e.removeEventListener("error",o),n(t.callback_load,e))};n(t.callback_enter,e),"IMG"!==e.tagName&&"IFRAME"!==e.tagName||(e.addEventListener("load",i),e.addEventListener("error",o),d(e,t.class_loading)),c(e,t.data_srcset,t.data_src),n(t.callback_set,e)},_loopThroughElements:function(){var e,t,i=this._settings,l=this._elements,a=l?l.length:0,c=void 0,u=[],h=this._isFirstLoop;for(c=0;c<a;c++){var _=l[c];i.skip_invisible&&null===_.offsetParent||(o||s(_,i.container,i.threshold))&&(h&&d(_,i.class_initial),this._reveal(_),u.push(c),e="was-processed",t=!0,_.setAttribute(r+e,t))}for(;u.length;)l.splice(u.pop(),1),n(i.callback_processed,l.length);0===a&&this._stopScrollHandler(),h&&(this._isFirstLoop=!1)},_purgeElements:function(){var e=this._elements,t=e.length,o=void 0,n=[];for(o=0;o<t;o++){var i=e[o];a(i,"was-processed")&&n.push(o)}for(;n.length>0;)e.splice(n.pop(),1)},_startScrollHandler:function(){this._isHandlingScroll||(this._isHandlingScroll=!0,this._settings.container.addEventListener("scroll",this._boundHandleScroll))},_stopScrollHandler:function(){this._isHandlingScroll&&(this._isHandlingScroll=!1,this._settings.container.removeEventListener("scroll",this._boundHandleScroll))},handleScroll:function(){var e=this._settings.throttle;if(0!==e){var t=Date.now(),o=e-(t-this._previousLoopTime);o<=0||o>e?(this._loopTimeout&&(clearTimeout(this._loopTimeout),this._loopTimeout=null),this._previousLoopTime=t,this._loopThroughElements()):this._loopTimeout||(this._loopTimeout=setTimeout(function(){this._previousLoopTime=Date.now(),this._loopTimeout=null,this._loopThroughElements()}.bind(this),o))}else this._loopThroughElements()},update:function(){this._elements=Array.prototype.slice.call(this._queryOriginNode.querySelectorAll(this._settings.elements_selector)),this._purgeElements(),this._loopThroughElements(),this._startScrollHandler()},destroy:function(){window.removeEventListener("resize",this._boundHandleScroll),this._loopTimeout&&(clearTimeout(this._loopTimeout),this._loopTimeout=null),this._stopScrollHandler(),this._elements=null,this._queryOriginNode=null,this._settings=null}};var p=window.lazyLoadOptions;return p&&function(e,t){var o=t.length;if(o)for(var n=0;n<o;n++)l(e,t[n]);else l(e,t)}(_,p),_});