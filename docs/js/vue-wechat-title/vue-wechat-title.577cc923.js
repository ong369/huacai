var e={exports:{}};const t=e.exports=function(e){e.directive("wechat-title",(function(e,t){!function(e,t){if(void 0!==e&&window.document.title!==e){document.title=e;var A=navigator.userAgent.toLowerCase();if(/iphone|ipad|ipod/.test(A)){var i=document.createElement("iframe");i.style.display="none";var n=/alipay/.test(A)?t:t||"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";n&&i.setAttribute("src",n);var o=function(){setTimeout((function(){i.removeEventListener("load",o),document.body.removeChild(i)}),0)};i.addEventListener("load",o),document.body.appendChild(i)}}}(t.value,e.getAttribute("img-set")||null)}))};export{t as V};