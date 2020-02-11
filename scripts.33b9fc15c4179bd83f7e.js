!function(t,e,n,r,s,o){e[r]=e[r]||function(){(e[r].q=e[r].q||[]).push(arguments)},s=t.createElement("script"),o=t.getElementsByTagName("script")[0],s.async=1,s.src="https://nd-api.duckdns.org:5035/fathom/tracker.js",s.id="fathom-script",o.parentNode.insertBefore(s,o)}(document,window,0,"fathom"),fathom("set","siteId","KXECY"),window.paceOptions={restartOnRequestAfter:!0,ajax:{ignoreURLs:["lastupdate","switchcmd","setcolbrightnessvalue"]},restartOnPushState:!1},(function(){var t,e,n,r,s,o,i,a,u,c,l,p,h,f,d,g,m,y,w,v,b,k,S,q,L,x,P,R,T,E,O,j,N,A,M,_,C,F,U,X,W,I,D,H,B,z,G,J,K=[].slice,Y={}.hasOwnProperty,Q=function(t,e){for(var n in e)Y.call(e,n)&&(t[n]=e[n]);function r(){this.constructor=t}return r.prototype=e.prototype,t.prototype=new r,t.__super__=e.prototype,t},V=[].indexOf||function(t){for(var e=0,n=this.length;e<n;e++)if(e in this&&this[e]===t)return e;return-1};for(b={catchupTime:100,initialRate:.03,minTime:250,ghostTime:100,maxProgressPerFrame:20,easeFactor:1.25,startOnPageLoad:!0,restartOnPushState:!0,restartOnRequestAfter:500,target:"body",elements:{checkInterval:100,selectors:["body"]},eventLag:{minSamples:10,sampleCount:3,lagThreshold:3},ajax:{trackMethods:["GET"],trackWebSockets:!0,ignoreURLs:[]}},T=function(){var t;return null!=(t="undefined"!=typeof performance&&null!==performance&&"function"==typeof performance.now?performance.now():void 0)?t:+new Date},O=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame,v=window.cancelAnimationFrame||window.mozCancelAnimationFrame,null==O&&(O=function(t){return setTimeout(t,50)},v=function(t){return clearTimeout(t)}),N=function(t){var e,n;return e=T(),(n=function(){var r;return(r=T()-e)>=33?(e=T(),t(r,(function(){return O(n)}))):setTimeout(n,33-r)})()},j=function(){var t,e,n;return n=arguments[0],e=arguments[1],t=3<=arguments.length?K.call(arguments,2):[],"function"==typeof n[e]?n[e].apply(n,t):n[e]},k=function(){var t,e,n,r,s,o,i;for(e=arguments[0],o=0,i=(r=2<=arguments.length?K.call(arguments,1):[]).length;o<i;o++)if(n=r[o])for(t in n)Y.call(n,t)&&(s=n[t],null!=e[t]&&"object"==typeof e[t]&&null!=s&&"object"==typeof s?k(e[t],s):e[t]=s);return e},m=function(t){var e,n,r,s;for(n=e=0,r=0,s=t.length;r<s;r++)n+=Math.abs(t[r]),e++;return n/e},q=function(t,e){var n,r;if(null==t&&(t="options"),null==e&&(e=!0),r=document.querySelector("[data-pace-"+t+"]")){if(n=r.getAttribute("data-pace-"+t),!e)return n;try{return JSON.parse(n)}catch(s){return"undefined"!=typeof console&&null!==console?console.error("Error parsing inline pace options",s):void 0}}},i=function(){function t(){}return t.prototype.on=function(t,e,n,r){var s;return null==r&&(r=!1),null==this.bindings&&(this.bindings={}),null==(s=this.bindings)[t]&&(s[t]=[]),this.bindings[t].push({handler:e,ctx:n,once:r})},t.prototype.once=function(t,e,n){return this.on(t,e,n,!0)},t.prototype.off=function(t,e){var n,r,s;if(null!=(null!=(r=this.bindings)?r[t]:void 0)){if(null==e)return delete this.bindings[t];for(n=0,s=[];n<this.bindings[t].length;)s.push(this.bindings[t][n].handler===e?this.bindings[t].splice(n,1):n++);return s}},t.prototype.trigger=function(){var t,e,n,r,s,o,i,a;if(n=arguments[0],t=2<=arguments.length?K.call(arguments,1):[],null!=(o=this.bindings)?o[n]:void 0){for(r=0,a=[];r<this.bindings[n].length;)s=(i=this.bindings[n][r]).once,i.handler.apply(null!=(e=i.ctx)?e:this,t),a.push(s?this.bindings[n].splice(r,1):r++);return a}},t}(),c=window.Pace||{},window.Pace=c,k(c,i.prototype),E=c.options=k({},b,window.paceOptions,q()),D=0,B=(G=["ajax","document","eventLag","elements"]).length;D<B;D++)!0===E[C=G[D]]&&(E[C]=b[C]);u=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return Q(e,t),e}(Error),e=function(){function t(){this.progress=0}return t.prototype.getElement=function(){var t;if(null==this.el){if(!(t=document.querySelector(E.target)))throw new u;this.el=document.createElement("div"),this.el.className="pace pace-active",document.body.className=document.body.className.replace(/pace-done/g,""),document.body.className+=" pace-running",this.el.innerHTML='<div class="pace-progress">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>',null!=t.firstChild?t.insertBefore(this.el,t.firstChild):t.appendChild(this.el)}return this.el},t.prototype.finish=function(){var t;return(t=this.getElement()).className=t.className.replace("pace-active",""),t.className+=" pace-inactive",document.body.className=document.body.className.replace("pace-running",""),document.body.className+=" pace-done"},t.prototype.update=function(t){return this.progress=t,this.render()},t.prototype.destroy=function(){try{this.getElement().parentNode.removeChild(this.getElement())}catch(t){u=t}return this.el=void 0},t.prototype.render=function(){var t,e,n,r,s,o;if(null==document.querySelector(E.target))return!1;for(t=this.getElement(),n="translate3d("+this.progress+"%, 0, 0)",r=0,s=(o=["webkitTransform","msTransform","transform"]).length;r<s;r++)t.children[0].style[o[r]]=n;return(!this.lastRenderedProgress||this.lastRenderedProgress|0!==this.progress|0)&&(t.children[0].setAttribute("data-progress-text",(0|this.progress)+"%"),this.progress>=100?e="99":(e=this.progress<10?"0":"",e+=0|this.progress),t.children[0].setAttribute("data-progress",""+e)),this.lastRenderedProgress=this.progress},t.prototype.done=function(){return this.progress>=100},t}(),a=function(){function t(){this.bindings={}}return t.prototype.trigger=function(t,e){var n,r,s,o;if(null!=this.bindings[t]){for(o=[],n=0,r=(s=this.bindings[t]).length;n<r;n++)o.push(s[n].call(this,e));return o}},t.prototype.on=function(t,e){var n;return null==(n=this.bindings)[t]&&(n[t]=[]),this.bindings[t].push(e)},t}(),I=window.XMLHttpRequest,W=window.XDomainRequest,X=window.WebSocket,S=function(t,e){var n,r;for(n in r=[],e.prototype)try{r.push(null==t[n]&&"function"!=typeof e[n]?"function"==typeof Object.defineProperty?Object.defineProperty(t,n,{get:function(){return e.prototype[n]},configurable:!0,enumerable:!0}):t[n]=e.prototype[n]:void 0)}catch(s){}return r},P=[],c.ignore=function(){var t,e,n;return e=arguments[0],t=2<=arguments.length?K.call(arguments,1):[],P.unshift("ignore"),n=e.apply(null,t),P.shift(),n},c.track=function(){var t,e,n;return e=arguments[0],t=2<=arguments.length?K.call(arguments,1):[],P.unshift("track"),n=e.apply(null,t),P.shift(),n},_=function(t){var e;if(null==t&&(t="GET"),"track"===P[0])return"force";if(!P.length&&E.ajax){if("socket"===t&&E.ajax.trackWebSockets)return!0;if(e=t.toUpperCase(),V.call(E.ajax.trackMethods,e)>=0)return!0}return!1},l=function(t){function e(){var t,n=this;e.__super__.constructor.apply(this,arguments),t=function(t){var e;return e=t.open,t.open=function(r,s,o){return _(r)&&n.trigger("request",{type:r,url:s,request:t}),e.apply(t,arguments)}},window.XMLHttpRequest=function(e){var n;return n=new I(e),t(n),n};try{S(window.XMLHttpRequest,I)}catch(r){}if(null!=W){window.XDomainRequest=function(){var e;return e=new W,t(e),e};try{S(window.XDomainRequest,W)}catch(r){}}if(null!=X&&E.ajax.trackWebSockets){window.WebSocket=function(t,e){var r;return r=null!=e?new X(t,e):new X(t),_("socket")&&n.trigger("request",{type:"socket",url:t,protocols:e,request:r}),r};try{S(window.WebSocket,X)}catch(r){}}}return Q(e,t),e}(a),H=null,M=function(t){var e,n,r,s;for(n=0,r=(s=E.ajax.ignoreURLs).length;n<r;n++)if("string"==typeof(e=s[n])){if(-1!==t.indexOf(e))return!0}else if(e.test(t))return!0;return!1},(L=function(){return null==H&&(H=new l),H})().on("request",(function(e){var n,r,s,o;if(o=e.type,s=e.request,!M(e.url))return c.running||!1===E.restartOnRequestAfter&&"force"!==_(o)?void 0:(r=arguments,"boolean"==typeof(n=E.restartOnRequestAfter||0)&&(n=0),setTimeout((function(){var e,n,i,a,u;if("socket"===o?s.readyState<2:0<(i=s.readyState)&&i<4){for(c.restart(),u=[],e=0,n=(a=c.sources).length;e<n;e++){if((C=a[e])instanceof t){C.watch.apply(C,r);break}u.push(void 0)}return u}}),n))})),t=function(){function t(){var t=this;this.elements=[],L().on("request",(function(){return t.watch.apply(t,arguments)}))}return t.prototype.watch=function(t){var e,n,r;if(r=t.type,e=t.request,!M(t.url))return n="socket"===r?new f(e):new d(e),this.elements.push(n)},t}(),d=function(t){var e,n,r,s,o=this;if(this.progress=0,null!=window.ProgressEvent)for(t.addEventListener("progress",(function(t){return o.progress=t.lengthComputable?100*t.loaded/t.total:o.progress+(100-o.progress)/2}),!1),e=0,n=(s=["load","abort","timeout","error"]).length;e<n;e++)t.addEventListener(s[e],(function(){return o.progress=100}),!1);else r=t.onreadystatechange,t.onreadystatechange=function(){var e;return 0===(e=t.readyState)||4===e?o.progress=100:3===t.readyState&&(o.progress=50),"function"==typeof r?r.apply(null,arguments):void 0}},f=function(t){var e,n,r,s=this;for(this.progress=0,e=0,n=(r=["error","open"]).length;e<n;e++)t.addEventListener(r[e],(function(){return s.progress=100}),!1)},r=function(t){var e,n,r;for(null==t&&(t={}),this.elements=[],null==t.selectors&&(t.selectors=[]),e=0,n=(r=t.selectors).length;e<n;e++)this.elements.push(new s(r[e]))},s=function(){function t(t){this.selector=t,this.progress=0,this.check()}return t.prototype.check=function(){var t=this;return document.querySelector(this.selector)?this.done():setTimeout((function(){return t.check()}),E.elements.checkInterval)},t.prototype.done=function(){return this.progress=100},t}(),n=function(){function t(){var t,e,n=this;this.progress=null!=(e=this.states[document.readyState])?e:100,t=document.onreadystatechange,document.onreadystatechange=function(){return null!=n.states[document.readyState]&&(n.progress=n.states[document.readyState]),"function"==typeof t?t.apply(null,arguments):void 0}}return t.prototype.states={loading:0,interactive:50,complete:100},t}(),o=function(){var t,e,n,r,s,o=this;this.progress=0,t=0,s=[],r=0,n=T(),e=setInterval((function(){var i;return i=T()-n-50,n=T(),s.push(i),s.length>E.eventLag.sampleCount&&s.shift(),t=m(s),++r>=E.eventLag.minSamples&&t<E.eventLag.lagThreshold?(o.progress=100,clearInterval(e)):o.progress=3/(t+3)*100}),50)},h=function(){function t(t){this.source=t,this.last=this.sinceLastUpdate=0,this.rate=E.initialRate,this.catchup=0,this.progress=this.lastProgress=0,null!=this.source&&(this.progress=j(this.source,"progress"))}return t.prototype.tick=function(t,e){var n;return null==e&&(e=j(this.source,"progress")),e>=100&&(this.done=!0),e===this.last?this.sinceLastUpdate+=t:(this.sinceLastUpdate&&(this.rate=(e-this.last)/this.sinceLastUpdate),this.catchup=(e-this.progress)/E.catchupTime,this.sinceLastUpdate=0,this.last=e),e>this.progress&&(this.progress+=this.catchup*t),n=1-Math.pow(this.progress/100,E.easeFactor),this.progress+=n*this.rate*t,this.progress=Math.min(this.lastProgress+E.maxProgressPerFrame,this.progress),this.progress=Math.max(0,this.progress),this.progress=Math.min(100,this.progress),this.lastProgress=this.progress,this.progress},t}(),F=null,A=null,y=null,U=null,g=null,w=null,c.running=!1,x=function(){if(E.restartOnPushState)return c.restart()},null!=window.history.pushState&&(z=window.history.pushState,window.history.pushState=function(){return x(),z.apply(window.history,arguments)}),null!=window.history.replaceState&&(J=window.history.replaceState,window.history.replaceState=function(){return x(),J.apply(window.history,arguments)}),p={ajax:t,elements:r,document:n,eventLag:o},(R=function(){var t,n,r,s,o,i,a,u;for(c.sources=F=[],n=0,s=(i=["ajax","elements","document","eventLag"]).length;n<s;n++)!1!==E[t=i[n]]&&F.push(new p[t](E[t]));for(r=0,o=(u=null!=(a=E.extraSources)?a:[]).length;r<o;r++)F.push(new(C=u[r])(E));return c.bar=y=new e,A=[],U=new h})(),c.stop=function(){return c.trigger("stop"),c.running=!1,y.destroy(),w=!0,null!=g&&("function"==typeof v&&v(g),g=null),R()},c.restart=function(){return c.trigger("restart"),c.stop(),c.start()},c.go=function(){var t;return c.running=!0,y.render(),t=T(),w=!1,g=N((function(e,n){var r,s,o,i,a,u,l,p,f,d,g,m,v;for(r=p=0,s=!0,i=f=0,g=F.length;f<g;i=++f)for(C=F[i],l=null!=A[i]?A[i]:A[i]=[],a=d=0,m=(o=null!=(v=C.elements)?v:[C]).length;d<m;a=++d)s&=(u=null!=l[a]?l[a]:l[a]=new h(o[a])).done,u.done||(r++,p+=u.tick(e));return y.update(U.tick(e,p/r)),y.done()||s||w?(y.update(100),c.trigger("done"),setTimeout((function(){return y.finish(),c.running=!1,c.trigger("hide")}),Math.max(E.ghostTime,Math.max(E.minTime-(T()-t),0)))):n()}))},c.start=function(t){k(E,t),c.running=!0;try{y.render()}catch(e){u=e}return document.querySelector(".pace")?(c.trigger("start"),c.go()):setTimeout(c.start,50)},"function"==typeof define&&define.amd?define(["pace"],(function(){return c})):"object"==typeof exports?module.exports=c:E.startOnPageLoad&&c.start()}).call(this);