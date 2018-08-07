!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Timeline=e():t.Timeline=e()}(this,function(){return function(t){var e={};function i(n){if(e[n])return e[n].exports;var s=e[n]={i:n,l:!1,exports:{}};return t[n].call(s.exports,s,s.exports,i),s.l=!0,s.exports}return i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)i.d(n,s,function(e){return t[e]}.bind(null,s));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/build/",i(i.s=0)}([function(t,e,i){"use strict";i.r(e);const n=14,s=20,o="CENTER_CHANGE_DONE",r="ZOOM_DONE",a=8;["rgba(211,84,0","rgba(219,10,91","rgba(31,58,147","rgba(0,128,0"].map(t=>(e=1)=>`${t},${e})`);const h=(t,e,i)=>{const n=i*((e-t)/864e5);return n<1?0:n<15?1:n<45?2:n<547.5?3:n<5475?4:n<36500?5:n<73e3?6:n<146e3?7:n<1095e3?8:n<219e4?9:10},l=t=>{if(4===t)return 1;if(5===t)return 5;if(6===t)return 10;if(7===t)return 50;if(8===t)return 100;if(9===t)return 500;if(10===t)return 1e3;throw new RangeError("[getStep] Only steps with a granularity greater than 'year' calculated")};function d(t,e){const i=null!=t.date_min?t.date_min:t.date,n=null!=e.date_min?e.date_min:e.date;if(i<n)return-1;if(i>n)return 1;const s=null!=t.end_date_max?t.end_date_max:t.end_date,o=null!=e.end_date_max?e.end_date_max:e.end_date;return s<o?-1:s>o?1:0}const c=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],u=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],m=(t,e)=>{const i=new Date(t);if(e>=4)return i.getUTCFullYear().toString();if(3===e){let t=u[i.getUTCMonth()];return 0===i.getUTCMonth()&&(t=`${i.getUTCFullYear().toString()}, ${t}`),t}if(2===e)return`${u[i.getUTCMonth()]}, week ${(t=>{const e=new Date(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate())),i=e.getUTCDay()||7;e.setUTCDate(e.getUTCDate()+4-i);const n=new Date(Date.UTC(e.getUTCFullYear(),0,1));return Math.ceil(((e.getTime()-n.getTime())/864e5+1)/7)})(i)}`;if(1===e){let t=c[i.getUTCDay()];return t=`${t}, ${u[i.getUTCMonth()]} ${i.getUTCDate()}`,0===i.getUTCMonth()&&1===i.getUTCDate()&&(t=`${t}, ${i.getUTCFullYear().toString()}`),t}return 0===e?`${i.getUTCHours()}:00`:void 0},p=(t,e)=>{let i;return()=>{clearTimeout(i),i=setTimeout(t,e)}};function f(t,e){if(null==t||isNaN(t))return void console.error("[findClosestRulerDate] start timestamp is not defined");const i=new Date(t);let n=i.getUTCFullYear();if(e>=4){const t=l(e);if(4===e)n+=1;else for(;n%t!=0;)n+=1;if(n>-1&&n<100){const t=new Date(Date.UTC(n,0,1));return t.setUTCFullYear(n),t.getTime()}return Date.UTC(n,0,1)}return 3===e?Date.UTC(n,i.getUTCMonth()+1,1):1===e?Date.UTC(n,i.getUTCMonth(),i.getUTCDate()+1):0===e?Date.UTC(n,i.getUTCMonth(),i.getUTCDate(),i.getUTCHours()+1):t}function v(t){return Math.pow(2,-1*t)}function g(t,e,i){return t/v(e)/i}function w(t){const e=new Date(t);return`${e.getFullYear()}-${e.getMonth()+1}-${e.getDate()}`}var b;!function(t){t[t.Backward=-1]="Backward",t[t.Stop=0]="Stop",t[t.Forward=1]="Forward"}(b||(b={}));var C=new class{constructor(){this.goToDuration=300,this.zoomToDuration=300,this.interval=1e-5,this.multipliers=[.25,.5,1,2,4,8,16],this.multiplier=1,this.direction=b.Stop,this.elapsedTimeTotal=0,this.models=[],this.views=[],this.animate=(t=>{const e=null==this.prevTimestamp?0:t-this.prevTimestamp;if(e>0||null==this.prevTimestamp){if(null==this.centerMarker&&null==this.zoomMarker)S.center=S.center+this.interval*this.multiplier*this.direction;else if(null!=this.centerMarker){const t=this.goToDuration-this.elapsedTimeTotal,i=Math.abs(this.centerMarker-S.center)/(t/e);t<e?(S.center=this.centerMarker,this.stop()):S.center=S.center+i*this.direction}else if(null!=this.zoomMarker){const t=this.zoomToDuration-this.elapsedTimeTotal,i=(this.zoomMarker-S.eventsBand.zoomLevel)/(t/e);t<e?(S.eventsBand.zoomLevel=this.zoomMarker,document.dispatchEvent(new CustomEvent(r)),this.stop()):S.eventsBand.zoomLevel=S.eventsBand.zoomLevel+i,S.minimapBands.forEach(t=>{S.eventsBand.zoomLevel<t.config.zoomLevel?t.zoomLevel=S.eventsBand.zoomLevel:t.zoomLevel!==t.config.zoomLevel&&(t.zoomLevel=t.config.zoomLevel)})}this.models.forEach(t=>t.update()),this.views.forEach(t=>t.update())}this.elapsedTimeTotal+=e,(this.isPlaying()||null!=this.zoomMarker)&&(S.center>0&&S.center<1||null!=this.centerMarker?(this.prevTimestamp=t,requestAnimationFrame(this.animate)):this.stop())})}registerModel(t){this.models.push(t)}registerView(t){this.views.push(t)}accelerate(){const t=this.multipliers.indexOf(this.multiplier);return t===this.multipliers.length-1?this.multipliers[this.multipliers.length-1]:(this.multiplier=this.multipliers[t+1],this.multiplier)}decelerate(){const t=this.multipliers.indexOf(this.multiplier);return 0===t?this.multipliers[0]:(this.multiplier=this.multipliers[t-1],this.multiplier)}goTo(t){this.centerMarker=t,t>S.center?this.playForward():this.playBackward()}zoomTo(t){null==this.zoomMarker&&(t<0&&(t=0),this.zoomMarker=t,this.play())}speed(t){const e=parseFloat(t);-1!==this.multipliers.indexOf(e)&&(this.multiplier=e)}isPlaying(){return this.direction!==b.Stop}isPlayingForward(){return this.direction===b.Forward}isPlayingBackward(){return this.direction===b.Backward}play(){requestAnimationFrame(this.animate)}playForward(){this.direction=b.Forward,this.play()}playBackward(){this.direction=b.Backward,this.play()}stop(){this.direction=b.Stop,this.centerMarker=null,this.zoomMarker=null,this.prevTimestamp=null,this.elapsedTimeTotal=0}toggle(){this.isPlaying()?this.stop():this.play()}};class x{constructor(t){this.defaultZoomLevel=0,this.zoomLevel=t.zoomLevel,this.height=Math.round(t.domains.reduce((t,e)=>t+e.heightRatio,0)*S.viewportHeight),this.top=Math.round(t.domains.reduce((t,e)=>Math.min(t,e.topOffsetRatio),1)*S.viewportHeight),C.registerModel(this)}get left(){return this._left}set left(t){t<-this.width+S.viewportWidth?t=S.viewportWidth-this.width:t>0&&(t=0),this._left=t}get zoomLevel(){return this._zoomLevel}set zoomLevel(t){t<0&&(t=0),this.visibleRatio=v(t),this.width=Math.round(S.viewportWidth/this.visibleRatio),this.time=this.visibleRatio*S.time,this.update(),this.granularity=h(S.from,S.to,this.visibleRatio),this.nextDate=function(t){if(t>=4){const e=l(t);return t=>{let i=new Date(t);const n=i.getFullYear()+e;return n>-1&&n<100?((i=new Date(i)).setUTCFullYear(n),i.getTime()):Date.UTC(n,0,1)}}return 3===t?t=>{const e=new Date(t);return Date.UTC(e.getFullYear(),e.getMonth()+1,1)}:2===t?t=>{const e=new Date(t);return Date.UTC(e.getFullYear(),e.getMonth(),e.getDate()+7)}:1===t?t=>{const e=new Date(t);return Date.UTC(e.getFullYear(),e.getMonth(),e.getDate()+1)}:0===t?t=>{const e=new Date(t);return Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours()+1)}:void 0}(this.granularity),this.pixelsPerMillisecond=this.width/S.time,this._zoomLevel=t}update(){const t=S.center*(S.time-this.time);this.from=S.from+t,this.to=this.from+this.time,this.left=Math.round(S.center*(S.viewportWidth-this.width))}positionAtTimestamp(t){return Math.round((t-S.from)*this.pixelsPerMillisecond)}proportionAtPosition(t){return(Math.abs(this.left)+t)/this.width}timestampAtProportion(t){return S.from+S.time*t}}class T extends x{constructor(t){super(t),this.config=t,this.domains=t.domains}}class M extends x{constructor(t){super(t),this.domains=t.domains,this.updateEvents()}updateEvents(){if(this.domains)for(const t of this.domains){const e=t.topOffsetRatio*S.viewportHeight,i=t.heightRatio*S.viewportHeight-s;for(const s of t.orderedEvents.events)s.left=this.positionAtTimestamp(s.from)+this.left,s.width=Math.round(s.time*this.pixelsPerMillisecond),s.padding=Math.round(s.space*this.pixelsPerMillisecond),s.width<1&&(s.width=1),s.top=e+i-(s.row+1)*(n+2)}}update(){super.update(),this.updateEvents()}getEventByCoordinates(t,e){const i=this.timestampAtProportion(this.proportionAtPosition(t)),o=this.domains.find(t=>{const i=S.viewportOffset+t.topOffsetRatio*S.viewportHeight,n=S.viewportOffset+t.heightRatio*S.viewportHeight;return i<e&&i+n>e});return o.orderedEvents.events.find(t=>{if(!(t.from<i&&t.from+t.time+t.space>i))return!1;const r=S.viewportOffset+(o.topOffsetRatio+o.heightRatio)*S.viewportHeight-s,a=Math.floor((r-e)/(n+2));return t.row===a})}zoomIn(){C.zoomTo(this.zoomLevel+1)}zoomOut(){C.zoomTo(this.zoomLevel-1)}}class y{constructor(){this.heightRatio=1,this.rulers=!0,this.rulerLabels=!0,this.topOffsetRatio=0}}class E extends y{constructor(){super(...arguments),this.targets=[]}}class z extends y{}class B{constructor(){this.domains=[],this.zoomLevel=0}}class D{constructor(){this.center=.5,this.minimaps=[]}}class L{constructor(){this.events=[],this.row_count=0}}const O=8;function _(t,e){if(!t.length)return new L;let i=0;const s=[],o=2*n/e;return{events:t=t.map(t=>{let n;null==t.label&&(t.label="NO LABEL"),t.from=t.date_min||t.date,t.to=t.end_date_max||t.end_date,t.time=null==t.to?0:t.to-t.from,t.space=0,t.time||(null==t.label&&(t.label="NO LABEL"),t.space=t.label.length*O/e+o);let r=0;for(;null==n&&r<s.length;){let e=0,i=!0;for(;i&&e<s[r].length&&!(t.to<s[r][e][0]);)i=t.from>s[r][e][1],e++;i&&(s[r].push([t.from,t.from+t.time+t.space]),n=r),r++}return null==n&&(n=s.push([[t.from,t.from+t.time+t.space]])-1),n>i&&(i=n),t.row=n,t}),row_count:s.length}}var U=function(t,e,i,n){return new(i||(i=Promise))(function(s,o){function r(t){try{h(n.next(t))}catch(t){o(t)}}function a(t){try{h(n.throw(t))}catch(t){o(t)}}function h(t){t.done?s(t.value):new i(function(e){e(t.value)}).then(r,a)}h((n=n.apply(t,e||[])).next())})};function k(t,e){return U(this,void 0,void 0,function*(){return null==t.events?(console.error("[DomainConfig] No events band in config!"),t):null!=t.events.domains&&t.events.domains.length?(t.events.domains=t.events.domains.map(t=>(null==t.events&&null==t.orderedEvents?console.error("[DomainConfig] No events in config!"):null==t.orderedEvents&&(t.orderedEvents=function(t,e,i){if("object"==typeof WebAssembly&&"function"==typeof WebAssembly.instantiate&&i){console.warn("[Timeline] Using WebAssembly");const n=JSON.stringify(t),s=i.order_events(n,e);return JSON.parse(s)}return _(t,e)}(t.events,e),delete t.events),Object.assign({},new z,t))),(t=Object.assign({},new D,t)).events.domains=t.events.domains.map(t=>Object.assign({},new z,t)),t.events=Object.assign({},new B,t.events),t.minimaps=t.minimaps.map(t=>((t=Object.assign({},new B,t)).domains.length||t.domains.push({}),t.domains=t.domains.map(t=>Object.assign({},new E,t)),Object.assign({},new B,t))),t):(console.error("[DomainConfig] No events band domains in config!"),t)})}var P=function(t,e,i,n){return new(i||(i=Promise))(function(s,o){function r(t){try{h(n.next(t))}catch(t){o(t)}}function a(t){try{h(n.throw(t))}catch(t){o(t)}}function h(t){t.done?s(t.value):new i(function(e){e(t.value)}).then(r,a)}h((n=n.apply(t,e||[])).next())})};var S=new class{constructor(){this.defaultCenter=.5,this._center=this.defaultCenter,this.centerChangeDone=p(()=>{document.dispatchEvent(new CustomEvent(o))},300)}init(t){return P(this,void 0,void 0,function*(){null==t.rootElement&&console.error("[init] No rootElement found"),this.dimensions=t.rootElement;const e=[],i=[];for(const n of t.events.domains){let t;n.hasOwnProperty("events")&&(n.events.sort(d),t=n.events),null==t&&(t=n.orderedEvents.events),e.push(t[0].date_min||t[0].date),i.push(t.reduce((t,e)=>Math.max(t,e.end_date||-1/0,e.end_date_max||-1/0),-1/0))}this.from=Math.min(...e),this.to=Math.max(...i),this.time=this.to-this.from;const n=g(this.viewportWidth,t.events.zoomLevel||0,this.to-this.from);null!=(t=yield k(t,n)).center&&(this.center=t.center),this.minimapBands=t.minimaps.map(t=>new T(t)),this.eventsBand=new M(t.events)})}get center(){return this._center}set center(t){0===this._center&&t<0||1===this._center&&t>1||(this._center=t<0?0:t>1?1:t,this.centerChangeDone())}set dimensions(t){const e=getComputedStyle(t);this.viewportHeight=parseInt(e.getPropertyValue("height"),10),this.viewportOffset=t.getBoundingClientRect().top,this.viewportWidth=parseInt(e.getPropertyValue("width"),10)}};let R;if("undefined"!=typeof window){const t=document.createElement("style");document.head.appendChild(t),R=t.sheet}const A={};var F=(t,e,i,n)=>{if(!e)return document.createElement(t);let s;return A.hasOwnProperty(e)?s=A[e].cloneNode(!1):((s=document.createElement(t)).classList.add(e),i&&R.insertRule(`.${e} { ${i.join(";").concat(";")} }`),A[e]=s.cloneNode(!1)),n&&s.setAttribute("style",n.join(";").concat(";")),s};var W=new class{constructor(){this.eventsListeners=[]}register(t,e,i=document){i.addEventListener(t,e),this.eventsListeners.push([t,e,i])}flush(){this.eventsListeners.forEach(t=>{const[e,i,n]=t;n.removeEventListener(e,i)}),this.eventsListeners=[]}};class ${constructor(t){this.band=t,this.onMouseDown=(t=>{document.addEventListener("mouseup",this.onMouseUp),this.dragOffset=t.clientX,this.dragStart=this.band.left}),this.onMouseMove=(t=>{if(this.dragOffset&&this.band.zoomLevel>0){const e=this.dragStart-(this.dragOffset-t.clientX);S.center=e/(S.viewportWidth-this.band.width),C.play()}}),this.onMouseUp=(t=>{this.dragOffset=null,document.removeEventListener("mouseup",this.onMouseUp)}),this.onDblClick=(t=>{const e=this.band.proportionAtPosition(t.clientX);C.goTo(e)})}render(){return this.rootElement=F("div","band-wrap",["position: absolute","z-index: 1"],[`height: ${this.band.height}px`,`top: ${this.band.top}px`,`width: ${S.viewportWidth}px`]),this.band.zoomLevel>0&&(W.register("mousedown",this.onMouseDown,this.rootElement),W.register("mousemove",this.onMouseMove,this.rootElement)),W.register("dblclick",this.onDblClick,this.rootElement),this.rootElement}resize(){this.rootElement.style.cssText=`height: ${this.band.height}px; top: ${this.band.top}px; width: ${S.viewportWidth}px;`}}class H{constructor(t,e){this.onChange=e,this.animator=C,this.handleChange=(()=>{const{from:t,to:e}=S.eventsBand;this.onChange({center:S.center,visibleFrom:t,visibleTo:e,zoomLevel:S.eventsBand.zoomLevel})}),document.addEventListener("keydown",t=>{189===t.keyCode&&S.eventsBand.zoomOut(),187===t.keyCode&&S.eventsBand.zoomIn()}),t.addEventListener("wheel",t=>{0===Math.abs(t.deltaX)&&0!==t.deltaY&&(t.deltaY<0&&S.eventsBand.zoomOut(),t.deltaY>0&&S.eventsBand.zoomIn())}),null!=this.onChange&&"function"==typeof this.onChange&&(document.addEventListener(o,this.handleChange),document.addEventListener(r,this.handleChange))}zoomIn(){S.eventsBand.zoomIn()}zoomOut(){S.eventsBand.zoomOut(),this.handleChange()}}class j extends ${constructor(t,e){super(t),this.band=t,this.select=e,this.onClick=(t=>{const e=this.band.getEventByCoordinates(t.clientX,t.clientY);e&&this.select&&(this.select(e),function(t,...e){console.log(t.label,t,t.left,w(t.from),w(t.to),e)}(e))})}render(){const t=super.render();return W.register("click",this.onClick,this.rootElement),t}}class Y{constructor(){this.font="10px sans-serif",this.offsiteCanvas=F("canvas"),this.clear=(()=>{this.ctx.clearRect(S.eventsBand.top,0,this.canvas.width,S.eventsBand.height),S.minimapBands.filter(t=>0!==t.zoomLevel).forEach(t=>this.ctx.clearRect(0,t.top,this.canvas.width,t.height))}),this.update=(()=>{this.canvas.width===S.viewportWidth&&this.canvas.height===S.viewportHeight||(this.canvas.width=S.viewportWidth,this.canvas.height=S.viewportHeight,this.indicatorsCanvas.width=S.viewportWidth,this.indicatorsCanvas.height=S.viewportHeight,this.drawStaticMinimapBands()),this.clear(),this.drawRulers(S.eventsBand),this.drawEvents(),this.drawEventsText(),S.minimapBands.filter(t=>0!==t.zoomLevel).forEach(t=>{t.domains.forEach(e=>{this.drawMinimap(t,e)}),this.drawRulers(t)}),this.drawIndicators()}),C.registerView(this),this.offsiteCtx=this.offsiteCanvas.getContext("2d")}render(){return this.canvas=F("canvas","minimap",["position: absolute"]),this.canvas.width=S.viewportWidth,this.canvas.height=S.viewportHeight,this.ctx=this.canvas.getContext("2d"),this.ctx.font=this.font,this.indicatorsCanvas=F("canvas","minimap",["position: absolute"],["z-index: 1"]),this.indicatorsCanvas.width=S.viewportWidth,this.indicatorsCanvas.height=S.viewportHeight,this.indicatorsCtx=this.indicatorsCanvas.getContext("2d"),this.update(),this.drawStaticMinimapBands(),[this.canvas,this.indicatorsCanvas]}drawStaticMinimapBands(){S.minimapBands.filter(t=>0===t.zoomLevel).forEach(t=>{t.domains.forEach(e=>{this.drawMinimap(t,e)}),this.drawRulers(t)})}drawEvents(){this.ctx.beginPath();for(const t of S.eventsBand.domains)for(const e of t.orderedEvents.events)e.from>S.eventsBand.to||e.to<S.eventsBand.from||(e.time?this.ctx.rect(e.left,e.top,e.width,n):(this.ctx.moveTo(e.left,e.top+n/2),this.ctx.arc(e.left,e.top+n/2,n/3,0,2*Math.PI)));this.ctx.fillStyle="rgba(126, 0, 0, .3)",this.ctx.fill()}drawEventsText(){this.ctx.fillStyle="rgb(126, 0, 0)";for(const t of S.eventsBand.domains)for(const e of t.orderedEvents.events){if(e.from>S.eventsBand.to||e.to<S.eventsBand.from)continue;let t=0===e.time?e.padding:e.width,i=e.left;if(e.left<0&&0!==e.time&&(t=e.width+e.left,i=0),e.label.length*a<=t){const t=e.time?3:8;this.ctx.fillText(e.label,i+t,e.top+n-3)}}}drawMinimap(t,e){const i=t.height-s,n=t.domains.reduce((t,e)=>{const i=e.targets.map(t=>S.eventsBand.domains[t].orderedEvents.row_count);return Math.max(t,...i)},0);let o=i/n;function r(i,n,s=t.top){i.beginPath();const r=t.positionAtTimestamp(t.from);e.targets.forEach(e=>{const a=S.eventsBand.domains[e];for(const e of a.orderedEvents.events){if(e.from>t.to||e.to<t.from)continue;const a=Math.round(e.time*t.pixelsPerMillisecond),h=t.positionAtTimestamp(null!=e.date_min?e.date_min:e.date),l=s+n-(e.row+1)*o,d=a<1?1:a;i.rect(h-r,l,d,o)}}),i.fillStyle="rgba(0, 0, 0, .2)",i.fill()}o<1?(o=1,this.offsiteCanvas.width=S.viewportWidth,this.offsiteCanvas.height=n,r(this.offsiteCtx,n,0),this.ctx.drawImage(this.offsiteCanvas,0,t.top,S.viewportWidth,i)):(o=Math.round(o),r(this.ctx,i))}drawIndicators(){this.indicatorsCtx.clearRect(0,0,S.viewportWidth,S.viewportHeight),this.indicatorsCtx.beginPath(),S.minimapBands.forEach(t=>{t.domains.forEach(e=>{const i=Math.round(e.topOffsetRatio*S.viewportHeight),n=t.positionAtTimestamp(S.eventsBand.from)+t.left;this.indicatorsCtx.rect(0,i,n,t.height);const o=t.positionAtTimestamp(S.eventsBand.to)+t.left;this.indicatorsCtx.rect(o,i,S.viewportWidth,t.height),this.indicatorsCtx.rect(n,i+t.height-s,o-n,s)})}),this.indicatorsCtx.fillStyle="rgba(0, 0, 0, .1)",this.indicatorsCtx.fill(),this.indicatorsCtx.fillStyle="rgba(255, 0, 0, .5)";const t=S.eventsBand.positionAtTimestamp(S.eventsBand.timestampAtProportion(S.center))+S.eventsBand.left;this.indicatorsCtx.fillRect(t-1,0,2,S.viewportHeight),this.indicatorsCtx.closePath()}drawRulers(t){this.ctx.beginPath(),this.ctx.fillStyle="rgb(150, 150, 150)";for(const e of t.domains){if(!e.rulers)continue;let i=f(t.from,t.granularity);const n=e.topOffsetRatio*S.viewportHeight,s=e.heightRatio*S.viewportHeight;for(;i<t.to;){const o=t.positionAtTimestamp(i)+t.left;this.ctx.moveTo(o,n),this.ctx.lineTo(o,n+s),e.rulerLabels&&this.ctx.fillText(m(i,t.granularity),o+3,n+s-3),i=t.nextDate(i)}}this.ctx.strokeStyle="rgb(200, 200, 200)",this.ctx.stroke()}}class N{constructor(t){this.domain=t}render(){const t=F("div","events-label-wrapper",["border-top: 1px solid #CCC","position: absolute","width: 100%"],[`top: ${100*this.domain.topOffsetRatio}%`]),e=F("div","events-label",["background: white","border-bottom-right-radius: 4px","box-shadow: 1px 2px 4px #AAA","display: inline-block","color: #444","font-size: .8em","font-family: sans-serif","padding: 4px 8px"]);return e.innerText=this.domain.label,t.appendChild(e),t}}i.d(e,"default",function(){return I}),i.d(e,"TimelineConfig",function(){return D}),i.d(e,"orderEvents",function(){return _}),i.d(e,"OrderedEvents",function(){return L}),i.d(e,"calcPixelsPerMillisecond",function(){return g});class I extends H{constructor(t,e,i){super(t.rootElement,e),this.config=t,this.onSelect=i,this.appendToWrapper=(t=>{let e=t.render();Array.isArray(e)||(e=[e]),e.forEach(t=>this.wrapper.appendChild(t))}),this.reload=(t=>{null!=t&&S.init(t),this.resize()}),this.resize=(()=>{S.dimensions=this.config.rootElement,S.eventsBand.zoomLevel=S.eventsBand.zoomLevel,this.eventsBandView.resize(),S.minimapBands.forEach(t=>t.zoomLevel=t.zoomLevel),this.minimapBandViews.forEach(t=>t.resize()),this.animator.play()}),S.init(t).then(()=>{t.rootElement.appendChild(this.render());const e=p(this.resize,600);window.addEventListener("resize",e)})}render(){return this.wrapper=F("div","wrapper",["box-sizing: border-box","height: 100%","overflow: hidden","position: relative","user-select: none","width: 100%"]),this.appendToWrapper(new Y),this.eventsBandView=new j(S.eventsBand,this.onSelect),this.appendToWrapper(this.eventsBandView),this.minimapBandViews=S.minimapBands.map(t=>new $(t)),this.minimapBandViews.forEach(this.appendToWrapper),this.renderLabels(),this.wrapper}renderLabels(){S.eventsBand.domains.filter(t=>null!=t.label).map(t=>new N(t)).forEach(this.appendToWrapper)}}}])});