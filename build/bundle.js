(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Timeline"] = factory();
	else
		root["Timeline"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.EVENT_MIN_SPACE = 160;\nexports.EVENT_HEIGHT = 12;\nexports.EVENT_ROW_HEIGHT = 16;\nexports.DATE_BAR_HEIGHT = 60;\nexports.RULER_LABELS_HEIGHT = 60;\nexports.CENTER_CHANGE_EVENT = 'CENTER_CHANGE_EVENT';\nexports.DIMENSIONS_CHANGE_EVENT = 'DIMENSIONS_CHANGE_EVENT';\n\n\n//# sourceURL=webpack://Timeline/./src/constants.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst events_domain_1 = __webpack_require__(/*! ./models/events.domain */ \"./src/models/events.domain.ts\");\nconst domain_1 = __webpack_require__(/*! ./models/domain */ \"./src/models/domain.ts\");\nconst props_1 = __webpack_require__(/*! ./models/props */ \"./src/models/props.ts\");\nconst events_1 = __webpack_require__(/*! ./views/band/events */ \"./src/views/band/events/index.ts\");\nconst sparkline_1 = __webpack_require__(/*! ./views/band/sparkline */ \"./src/views/band/sparkline.ts\");\nconst indicator_1 = __webpack_require__(/*! ./views/indicator */ \"./src/views/indicator/index.ts\");\nconst create_element_1 = __webpack_require__(/*! ./utils/create-element */ \"./src/utils/create-element.ts\");\nconst config_1 = __webpack_require__(/*! ./models/config */ \"./src/models/config.ts\");\nconst debounce = (func, wait) => {\n    let timeout;\n    return () => {\n        clearTimeout(timeout);\n        timeout = setTimeout(func, wait);\n    };\n};\nclass Timeline {\n    constructor(config) {\n        this.bands = [];\n        this.refresh = (config = {}) => {\n            this.config.refresh(config);\n            this.remove();\n            this.config.rootElement.appendChild(this.render());\n            window.addEventListener('resize', this.debouncedRefresh);\n        };\n        this.debouncedRefresh = debounce(this.refresh, 1000);\n        this.appendToWrapper = (child) => this.wrapper.appendChild(child.render());\n        this.config = new config_1.default(config);\n        props_1.default.init(this.config);\n        this.config.rootElement.appendChild(this.render());\n        window.addEventListener('resize', this.debouncedRefresh);\n    }\n    remove() {\n        window.removeEventListener('resize', this.debouncedRefresh);\n        this.config.rootElement.removeChild(this.wrapper);\n        this.wrapper.remove();\n        this.wrapper.innerHTML = '';\n        this.wrapper = null;\n    }\n    render() {\n        this.wrapper = create_element_1.default('div', 'wrapper', [\n            'background-color: teal',\n            'box-sizing: border-box',\n            'height: 100%',\n            'overflow: hidden',\n            'position: relative',\n            'user-select: none',\n            'width: 100%',\n        ]);\n        this.renderBands();\n        return this.wrapper;\n    }\n    renderBands() {\n        this.bands = this.config.domains\n            .map(d => {\n            if (d.type === 'EVENTS')\n                return new events_1.default(new events_domain_1.default(d, this.config.events));\n            if (d.type === 'SPARKLINE')\n                return new sparkline_1.default(new domain_1.default(d), this.config.events, this.config.aggregate);\n        });\n        this.bands.forEach(b => this.appendToWrapper(b));\n        this.renderIndicators();\n    }\n    renderIndicators() {\n        this.bands\n            .filter(band => band.domain.config.hasIndicatorFor != null)\n            .map(band => new indicator_1.default(band.domain, this.bands[band.domain.config.hasIndicatorFor].domain))\n            .forEach(this.appendToWrapper);\n    }\n}\nexports.default = Timeline;\n\n\n//# sourceURL=webpack://Timeline/./src/index.ts?");

/***/ }),

/***/ "./src/models/base-event.ts":
/*!**********************************!*\
  !*** ./src/models/base-event.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst DateUtils = __webpack_require__(/*! ../utils/dates */ \"./src/utils/dates.ts\");\nclass BaseEvent {\n    constructor(data) {\n        this.body = '';\n        this.coordinates = [];\n        this.types = [];\n        data.date = new Date(data.date);\n        Object.assign(this, data);\n        this.setTo();\n        this.setFrom();\n    }\n    countDays() {\n        return DateUtils.countDays(this.from, this.to);\n    }\n    setFrom() {\n        this.from = (this.dateRange != null) ?\n            this.dateRange.infiniteFrom ?\n                new Date(-4713, 0, 1) :\n                this.dateRange.from :\n            this.date != null ?\n                this.date :\n                (this.dateUncertain != null) ?\n                    this.dateUncertain.from :\n                    null;\n    }\n    setTo() {\n        this.to = (this.dateRange != null) ?\n            this.dateRange.infiniteTo ?\n                new Date() :\n                this.dateRange.to :\n            (this.dateUncertain != null) ?\n                this.dateUncertain.to :\n                null;\n    }\n    isInterval() {\n        return this.dateRange != null;\n    }\n    isUncertain() {\n        return this.dateUncertain != null || this.dateRangeUncertain != null;\n    }\n}\nexports.default = BaseEvent;\n\n\n//# sourceURL=webpack://Timeline/./src/models/base-event.ts?");

/***/ }),

/***/ "./src/models/config.ts":
/*!******************************!*\
  !*** ./src/models/config.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst props_1 = __webpack_require__(/*! ./props */ \"./src/models/props.ts\");\nconst domain_config_1 = __webpack_require__(/*! ./domain.config */ \"./src/models/domain.config.ts\");\nclass AggregateEntry {\n}\nexports.AggregateEntry = AggregateEntry;\nclass RawEv3nt {\n}\nexports.RawEv3nt = RawEv3nt;\nclass Config {\n    constructor(config) {\n        this.aggregate = [];\n        this.center = .5;\n        this.domains = [];\n        this.events = [];\n        this.rootElement = null;\n        Object.keys(config).forEach(k => {\n            if (k === 'domains')\n                this[k] = config.domains.map(d => new domain_config_1.default(d));\n            else if (this.hasOwnProperty(k))\n                this[k] = config[k];\n        });\n    }\n    refresh(config) {\n        Object.keys(config).forEach(k => {\n            if (this.hasOwnProperty(k))\n                this[k] = config[k];\n        });\n        if (config.hasOwnProperty('aggregate') || config.hasOwnProperty('events'))\n            props_1.default.edges = this;\n        if (config.hasOwnProperty('center'))\n            props_1.default.center = this.center;\n        props_1.default.dimensions = this.rootElement;\n    }\n}\nexports.default = Config;\n\n\n//# sourceURL=webpack://Timeline/./src/models/config.ts?");

/***/ }),

/***/ "./src/models/domain.config.ts":
/*!*************************************!*\
  !*** ./src/models/domain.config.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar DomainType;\n(function (DomainType) {\n    DomainType[\"Events\"] = \"EVENTS\";\n    DomainType[\"Sparkline\"] = \"SPARKLINE\";\n})(DomainType = exports.DomainType || (exports.DomainType = {}));\nclass DomainConfig {\n    constructor(props) {\n        this.hasEvents = true;\n        this.hasIndicatorFor = null;\n        this.heightRatio = 1;\n        this.hasRulers = true;\n        this.hasSparkline = true;\n        this.topOffsetRatio = 0;\n        this.type = DomainType.Events;\n        this.visibleRatio = 1;\n        Object.keys(props).forEach(k => {\n            if (this.hasOwnProperty(k))\n                this[k] = props[k];\n        });\n    }\n}\nexports.default = DomainConfig;\n\n\n//# sourceURL=webpack://Timeline/./src/models/domain.config.ts?");

/***/ }),

/***/ "./src/models/domain.ts":
/*!******************************!*\
  !*** ./src/models/domain.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst dates_1 = __webpack_require__(/*! ../utils/dates */ \"./src/utils/dates.ts\");\nconst dates_2 = __webpack_require__(/*! ../utils/dates */ \"./src/utils/dates.ts\");\nconst props_1 = __webpack_require__(/*! ./props */ \"./src/models/props.ts\");\nclass Domain {\n    constructor(config) {\n        this.config = config;\n        this.height = props_1.default.viewportHeight * this.config.heightRatio;\n        this.width = props_1.default.viewportWidth / this.config.visibleRatio;\n        this.granularity = dates_1.getGranularity(props_1.default.from, props_1.default.to, this.config.visibleRatio);\n        this.prevDate = dates_2.subsequentDate(this.granularity, true);\n        this.nextDate = dates_2.subsequentDate(this.granularity);\n        this.pixelsPerDay = this.width / dates_1.countDays(props_1.default.from, props_1.default.to);\n        this.updateLeft();\n    }\n    initialActiveRange(iteration) {\n        const deviation = iteration * this.config.visibleRatio;\n        const lowerDeviation = props_1.default.center - deviation > 0 ? props_1.default.center - deviation : 0;\n        const upperDeviation = props_1.default.center + deviation < 1 ? props_1.default.center + deviation : 1;\n        let activeFrom = this.prevDate(this.dateAtProportion(lowerDeviation));\n        let activeTo = this.nextDate(this.dateAtProportion(upperDeviation));\n        const last = lowerDeviation === 0 && upperDeviation === 1 ? true : false;\n        return [activeFrom, activeTo, last];\n    }\n    dateAtPosition(x) {\n        return this.dateAtProportion(this.proportionAtPosition(x));\n    }\n    dateAtProportion(proportion) {\n        if (proportion < 0 || proportion > 1)\n            throw new RangeError('[dateAtProportion] proportion should be between 0 and 1.');\n        const fromTime = props_1.default.from.getTime();\n        const toTime = props_1.default.to.getTime();\n        const newTime = fromTime + ((toTime - fromTime) * proportion);\n        return new Date(newTime);\n    }\n    get left() { return this._left; }\n    set left(left) {\n        if (left < -this.width + props_1.default.viewportWidth)\n            left = props_1.default.viewportWidth - this.width;\n        else if (left > 0)\n            left = 0;\n        this._left = left;\n    }\n    updateLeft() {\n        this.left = props_1.default.center * (props_1.default.viewportWidth - this.width);\n        return this.left;\n    }\n    positionAtDate(date) {\n        return dates_1.countDays(props_1.default.from, date) * this.pixelsPerDay;\n    }\n    proportionAtPosition(position) {\n        return position / this.width;\n    }\n}\nexports.default = Domain;\n\n\n//# sourceURL=webpack://Timeline/./src/models/domain.ts?");

/***/ }),

/***/ "./src/models/event.ts":
/*!*****************************!*\
  !*** ./src/models/event.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst base_event_1 = __webpack_require__(/*! ./base-event */ \"./src/models/base-event.ts\");\nconst Constants = __webpack_require__(/*! ../constants */ \"./src/constants.ts\");\nclass Ev3nt extends base_event_1.default {\n    constructor(data, domain) {\n        super(data);\n        this.left = domain.positionAtDate(this.from);\n        const width = this.countDays() * domain.pixelsPerDay;\n        this.width = (width > 0 && width < 12) ? 12 : width;\n    }\n    space() {\n        const width = (this.width === 0 || this.width < Constants.EVENT_MIN_SPACE) ? Constants.EVENT_MIN_SPACE : this.width;\n        return [this.left, width];\n    }\n}\nexports.default = Ev3nt;\n\n\n//# sourceURL=webpack://Timeline/./src/models/event.ts?");

/***/ }),

/***/ "./src/models/events.domain.ts":
/*!*************************************!*\
  !*** ./src/models/events.domain.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst domain_1 = __webpack_require__(/*! ./domain */ \"./src/models/domain.ts\");\nconst event_1 = __webpack_require__(/*! ./event */ \"./src/models/event.ts\");\nclass EventsDomain extends domain_1.default {\n    constructor(domain, events) {\n        super(domain);\n        this.events = events\n            .map(e => new event_1.default(e, this))\n            .sort((a, b) => a.date.getTime() - b.date.getTime());\n    }\n}\nexports.default = EventsDomain;\n\n\n//# sourceURL=webpack://Timeline/./src/models/events.domain.ts?");

/***/ }),

/***/ "./src/models/props.ts":
/*!*****************************!*\
  !*** ./src/models/props.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst constants_1 = __webpack_require__(/*! ../constants */ \"./src/constants.ts\");\nclass Props {\n    constructor() {\n        this._center = .5;\n    }\n    init(config) {\n        this.edges = config;\n        this.dimensions = config.rootElement;\n    }\n    get center() { return this._center; }\n    set center(n) {\n        if ((this._center === 0 && n < 0) || (this._center === 1 && n > 1))\n            return;\n        else if (n < 0)\n            this._center = 0;\n        else if (n > 1)\n            this._center = 1;\n        else\n            this._center = n;\n        document.dispatchEvent(new CustomEvent(constants_1.CENTER_CHANGE_EVENT, { detail: n }));\n    }\n    get from() { return this._from; }\n    get to() { return this._to; }\n    set edges(config) {\n        const edges = [];\n        if (config.domains.some(d => d.type === 'EVENTS') && config.events.length > 1) {\n            edges.push(new Date(config.events[0].date));\n            edges.push(new Date(config.events[config.events.length - 1].date));\n        }\n        if (config.domains.some(d => d.type === 'SPARKLINE') && config.aggregate.length > 1) {\n            edges.push(new Date(config.aggregate[0].year, 0, 1));\n            edges.push(new Date(config.aggregate[config.aggregate.length - 1].year, 0, 1));\n        }\n        if (edges.length < 2)\n            throw Error('Cannot draw Timeline with this config');\n        this._from = new Date(Math.min(...edges));\n        this._to = new Date(Math.max(...edges));\n    }\n    get viewportWidth() { return this._viewportWidth; }\n    get viewportHeight() { return this._viewportHeight; }\n    set dimensions(rootElement) {\n        const style = getComputedStyle(rootElement);\n        const nextWidth = parseInt(style.getPropertyValue('width'), 10);\n        const nextHeight = parseInt(style.getPropertyValue('height'), 10);\n        if ((this._viewportWidth != null && this._viewportWidth !== nextWidth) ||\n            (this._viewportHeight != null && this._viewportHeight !== nextHeight)) {\n            document.dispatchEvent(new CustomEvent(constants_1.DIMENSIONS_CHANGE_EVENT));\n        }\n        this._viewportWidth = nextWidth;\n        this._viewportHeight = nextHeight;\n    }\n}\nexports.Props = Props;\nexports.default = new Props();\n\n\n//# sourceURL=webpack://Timeline/./src/models/props.ts?");

/***/ }),

/***/ "./src/utils/add-top.ts":
/*!******************************!*\
  !*** ./src/utils/add-top.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst constants_1 = __webpack_require__(/*! ../constants */ \"./src/constants.ts\");\nexports.default = (domain) => {\n    const grid = [];\n    return (event) => {\n        const [left, width] = event.space();\n        let row;\n        const rowHasSpace = (row) => {\n            return row.reduce((prev, curr, index, array) => {\n                if (!prev)\n                    return false;\n                const [currLeft, currWidth] = curr;\n                return (left + width < currLeft ||\n                    left > currLeft + currWidth);\n            }, true);\n        };\n        for (let i = 0; i < grid.length; i++) {\n            if (rowHasSpace(grid[i])) {\n                grid[i].push([left, width]);\n                row = i;\n                break;\n            }\n        }\n        if (row == null) {\n            row = grid.push([[left, width]]);\n        }\n        event.top = row * constants_1.EVENT_ROW_HEIGHT;\n        return event;\n    };\n};\n\n\n//# sourceURL=webpack://Timeline/./src/utils/add-top.ts?");

/***/ }),

/***/ "./src/utils/aggregate.worker.ts":
/*!***************************************!*\
  !*** ./src/utils/aggregate.worker.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst func = `onmessage = function(e) {\n\tlet prevYear\n\tconst run1 = e.data\n\t\t.reduce((prev, curr, index, array) => {\n\t\t\tconst year = curr.date.getFullYear()\n\t\t\tif (prev.hasOwnProperty(year)) {\n\t\t\t\tprev[year]++\n\t\t\t} else {\n\t\t\t\twhile (prevYear < year) {\n\t\t\t\t\tprevYear += 1\n\t\t\t\t\tprev[prevYear] = 0\n\t\t\t\t}\n\t\t\t\tprev[year] = 1\n\t\t\t}\n\t\t\tprevYear = year\n\t\t\treturn prev\n\t\t}, {})\n\tconst run2 = Object.keys(run1).map((year, index) => ({ year, count: run1[year]}))\n\tpostMessage(run2)\n}`;\nexports.default = (events, done) => {\n    const objectURL = URL.createObjectURL(new Blob([func]));\n    let worker = new Worker(objectURL);\n    worker.postMessage(events);\n    worker.onmessage = (e) => {\n        URL.revokeObjectURL(objectURL);\n        worker.terminate();\n        done(e.data);\n    };\n};\n\n\n//# sourceURL=webpack://Timeline/./src/utils/aggregate.worker.ts?");

/***/ }),

/***/ "./src/utils/create-element.ts":
/*!*************************************!*\
  !*** ./src/utils/create-element.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.createSvg = (name, style, attrs = {}) => {\n    const el = document.createElementNS(\"http://www.w3.org/2000/svg\", name);\n    if (style != null)\n        el.setAttribute('style', style.join(';').concat(';'));\n    Object.keys(attrs).forEach(k => el.setAttribute(k, attrs[k]));\n    return el;\n};\nconst element = document.createElement('style');\ndocument.head.appendChild(element);\nconst sheet = element.sheet;\nconst rules = {};\nexports.default = (name, className, style, dynamicStyle) => {\n    if (!className)\n        return document.createElement(name);\n    let el;\n    if (rules.hasOwnProperty(className)) {\n        el = rules[className].cloneNode(false);\n    }\n    else {\n        el = document.createElement(name);\n        el.classList.add(className);\n        if (style) {\n            sheet.insertRule(`.${className} { ${style.join(';').concat(';')} }`);\n        }\n        rules[className] = el.cloneNode(false);\n    }\n    if (dynamicStyle)\n        el.setAttribute('style', dynamicStyle.join(';').concat(';'));\n    return el;\n};\n\n\n//# sourceURL=webpack://Timeline/./src/utils/create-element.ts?");

/***/ }),

/***/ "./src/utils/dates.ts":
/*!****************************!*\
  !*** ./src/utils/dates.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.countDays = (from, to) => {\n    if (to == null)\n        return 0;\n    return Math.round(to.getTime() - from.getTime()) / 86400000;\n};\nexports.isEqual = (date1, date2) => date1.getTime() === date2.getTime();\nexports.format = (date, granularity) => {\n    if (date == null)\n        return '∞';\n    let displayDate = date.getFullYear().toString();\n    if (granularity >= 3) {\n        const months = [\n            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',\n            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',\n        ];\n        displayDate = `${months[date.getMonth()]} ${displayDate}`;\n    }\n    if (granularity >= 1) {\n        displayDate = `${date.getDate()} ${displayDate}`;\n    }\n    if (granularity === 0) {\n        displayDate = `${date.getHours()}:${date.getMinutes()} ${displayDate}`;\n    }\n    return displayDate;\n};\nexports.getGranularity = (from, to, visibleRatio) => {\n    const days = exports.countDays(from, to) * visibleRatio;\n    if (days < 1)\n        return 0;\n    if (days < 15)\n        return 1;\n    if (days < 45)\n        return 2;\n    if (days < 1.5 * 365)\n        return 3;\n    if (days < 15 * 365)\n        return 4;\n    if (days < 150 * 365)\n        return 5;\n    if (days < 300 * 365)\n        return 6;\n    return 7;\n};\nexports.getStep = (granularity) => {\n    if (granularity === 4)\n        return 1;\n    if (granularity === 5)\n        return 10;\n    if (granularity === 6)\n        return 50;\n    if (granularity === 7)\n        return 100;\n    if (granularity === 8)\n        return 1000;\n    throw new RangeError(\"[getStep] Only steps with a granularity greater than 'year' calculated\");\n};\nfunction subsequentDate(granularity, prev = false) {\n    const modifier = prev ? -1 : 1;\n    if (granularity >= 4) {\n        const diff = exports.getStep(granularity) * modifier;\n        return (date) => {\n            return new Date(date.getFullYear() + diff, 0, 1);\n        };\n    }\n    if (granularity === 3) {\n        return (date) => {\n            return new Date(date.getFullYear(), date.getMonth() + modifier, 1);\n        };\n    }\n    if (granularity === 2) {\n        const diff = 7 * modifier;\n        return (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + diff);\n    }\n    if (granularity === 1) {\n        return (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + modifier);\n    }\n    if (granularity === 0) {\n        return (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() + modifier);\n    }\n}\nexports.subsequentDate = subsequentDate;\n\n\n//# sourceURL=webpack://Timeline/./src/utils/dates.ts?");

/***/ }),

/***/ "./src/views/band/events/event/point-in-time/index.ts":
/*!************************************************************!*\
  !*** ./src/views/band/events/event/point-in-time/index.ts ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst constants_1 = __webpack_require__(/*! ../../../../../constants */ \"./src/constants.ts\");\nconst create_element_1 = __webpack_require__(/*! ../../../../../utils/create-element */ \"./src/utils/create-element.ts\");\nclass PointInTime {\n    constructor(event, segmentOffset) {\n        this.event = event;\n        this.segmentOffset = segmentOffset;\n    }\n    render() {\n        const li = create_element_1.default('li', 'pit-wrap', [\n            'box-sizing: border-box',\n            'font-size: 0.8em',\n            `margin-left: -${constants_1.EVENT_HEIGHT / 2}px`,\n            'position: absolute',\n            'white-space: nowrap',\n            `max-width: ${constants_1.EVENT_MIN_SPACE}px`,\n        ], [\n            `left: ${this.event.left - this.segmentOffset}px`,\n            `top: ${this.event.top}px`,\n        ]);\n        li.setAttribute('title', `${this.event.title}\\n${this.event.date.toDateString()}`);\n        const title = create_element_1.default('div', 'pit-title', [\n            'background-color: rgba(255,255,255,.75)',\n            'display: inline-block',\n            `line-height: ${constants_1.EVENT_HEIGHT}px`,\n            `max-width: calc(${constants_1.EVENT_MIN_SPACE}px - ${constants_1.EVENT_HEIGHT}px)`,\n            'overflow: hidden',\n            'padding: .25em',\n            'text-overflow: ellipsis',\n        ]);\n        title.textContent = this.event.title;\n        const point = create_element_1.default('div', 'pit-point', [\n            'background-image: radial-gradient(white 20%, black 100%)',\n            `border-radius: ${constants_1.EVENT_HEIGHT / 2}px`,\n            'display: inline-block',\n            'margin: .25em 0',\n            `width: ${constants_1.EVENT_HEIGHT}px`,\n            `height: ${constants_1.EVENT_HEIGHT}px`,\n        ]);\n        li.appendChild(point);\n        li.appendChild(title);\n        return li;\n    }\n}\nexports.default = PointInTime;\n\n\n//# sourceURL=webpack://Timeline/./src/views/band/events/event/point-in-time/index.ts?");

/***/ }),

/***/ "./src/views/band/events/index.ts":
/*!****************************************!*\
  !*** ./src/views/band/events/index.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst create_element_1 = __webpack_require__(/*! ../../../utils/create-element */ \"./src/utils/create-element.ts\");\nconst index_1 = __webpack_require__(/*! ../index */ \"./src/views/band/index.ts\");\nconst add_top_1 = __webpack_require__(/*! ../../../utils/add-top */ \"./src/utils/add-top.ts\");\nconst props_1 = __webpack_require__(/*! ../../../models/props */ \"./src/models/props.ts\");\nconst segment_1 = __webpack_require__(/*! ./segment */ \"./src/views/band/events/segment.ts\");\nclass EventsBand extends index_1.default {\n    constructor(domain) {\n        super(domain);\n        this.events = [];\n        this.topAdder = add_top_1.default(domain);\n        this.events = domain.events;\n        this.segments = this.createSegments();\n    }\n    remove() {\n        super.remove();\n        this.events = null;\n    }\n    render() {\n        const bandWrap = super.render();\n        this.eventsWrap = create_element_1.default('ul', 'events-wrap', [\n            'list-style: none',\n            'margin: 0',\n            'padding: 0',\n            'width: 100%',\n        ], [\n            `height: ${this.domain.height}px`,\n        ]);\n        this.segments.forEach(s => bandWrap.appendChild(s.render()));\n        this.renderChildren();\n        bandWrap.appendChild(this.eventsWrap);\n        return bandWrap;\n    }\n    renderChildren() {\n        const index = Math.floor(this.segments.length * props_1.default.center);\n        for (let i = 0; i < this.segments.length; i++) {\n            const seg = this.segments[i];\n            if (i > index - 2 && i < index + 2) {\n                if (seg.rendered)\n                    seg.show();\n                else\n                    seg.renderChildren();\n            }\n            else {\n                seg.hide();\n            }\n        }\n    }\n    createSegments() {\n        const segments = [];\n        const segmentCount = Math.ceil(1 / this.domain.config.visibleRatio);\n        for (let i = 0; i < segmentCount; i++) {\n            const ratioFrom = this.domain.config.visibleRatio * i;\n            const ratioTo = ratioFrom + this.domain.config.visibleRatio;\n            const from = this.domain.dateAtProportion(ratioFrom);\n            const to = this.domain.dateAtProportion(ratioTo);\n            const outOfBoundsIndex = this.events.findIndex(e => e.date.getTime() > to.getTime());\n            let events = this.events.slice(0, outOfBoundsIndex);\n            this.events = this.events.slice(outOfBoundsIndex);\n            if (i === segmentCount - 1)\n                events = events.concat(this.events);\n            segments.push(new segment_1.default(events, from, to, i * props_1.default.viewportWidth, this.topAdder, this.domain));\n        }\n        return segments;\n    }\n}\nexports.default = EventsBand;\n\n\n//# sourceURL=webpack://Timeline/./src/views/band/events/index.ts?");

/***/ }),

/***/ "./src/views/band/events/segment.ts":
/*!******************************************!*\
  !*** ./src/views/band/events/segment.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst create_element_1 = __webpack_require__(/*! ../../../utils/create-element */ \"./src/utils/create-element.ts\");\nconst point_in_time_1 = __webpack_require__(/*! ./event/point-in-time */ \"./src/views/band/events/event/point-in-time/index.ts\");\nconst ruler_1 = __webpack_require__(/*! ../rulers/ruler */ \"./src/views/band/rulers/ruler.ts\");\nconst props_1 = __webpack_require__(/*! ../../../models/props */ \"./src/models/props.ts\");\nconst rulers_1 = __webpack_require__(/*! ../rulers */ \"./src/views/band/rulers/index.ts\");\nclass Segment {\n    constructor(events, from, to, left, topAdder, domain) {\n        this.events = events;\n        this.from = from;\n        this.to = to;\n        this.left = left;\n        this.topAdder = topAdder;\n        this.domain = domain;\n        this.rendered = false;\n        this.renderRulers = () => {\n            let date = rulers_1.findClosestRulerDate(this.from, this.domain.granularity);\n            const to = this.to.getTime();\n            while (date.getTime() < to) {\n                this.rootElement.appendChild(new ruler_1.default(date, this.domain, this.left).render());\n                date = this.domain.nextDate(date);\n            }\n        };\n    }\n    render() {\n        this.rootElement = create_element_1.default('ul', 'segment', [\n            'bottom: 0',\n            'display: none',\n            'list-style: none',\n            'margin: 0',\n            'padding: 0',\n            'position: absolute',\n            'top: 0',\n            `width: ${props_1.default.viewportWidth}px`,\n        ], [\n            `left: ${this.left}px`,\n        ]);\n        return this.rootElement;\n    }\n    renderChildren() {\n        this.events.forEach(e => this.rootElement.appendChild(new point_in_time_1.default(this.topAdder(e), this.left).render()));\n        this.renderRulers();\n        this.show();\n        this.rendered = true;\n    }\n    show() {\n        this.rootElement.style.display = 'block';\n    }\n    hide() {\n        this.rootElement.style.display = 'none';\n    }\n}\nexports.default = Segment;\n\n\n//# sourceURL=webpack://Timeline/./src/views/band/events/segment.ts?");

/***/ }),

/***/ "./src/views/band/index.ts":
/*!*********************************!*\
  !*** ./src/views/band/index.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst props_1 = __webpack_require__(/*! ../../models/props */ \"./src/models/props.ts\");\nconst create_element_1 = __webpack_require__(/*! ../../utils/create-element */ \"./src/utils/create-element.ts\");\nconst constants_1 = __webpack_require__(/*! ../../constants */ \"./src/constants.ts\");\nclass Band {\n    constructor(domain) {\n        this.domain = domain;\n        this.updateLeft = () => {\n            this.rootElement.style.transform = `translate3d(${this.domain.updateLeft()}px, 0, 0)`;\n            if (this.domain.config.type === 'EVENTS')\n                this.renderChildren();\n        };\n        this.onMouseDown = (ev) => {\n            document.addEventListener('mouseup', this.onMouseUp);\n            this.dragOffset = ev.clientX;\n            this.dragStart = this.domain.left;\n        };\n        this.onMouseMove = (ev) => {\n            if (this.dragOffset) {\n                const left = this.dragStart - (this.dragOffset - ev.clientX);\n                props_1.default.center = left / (props_1.default.viewportWidth - this.domain.width);\n            }\n        };\n        this.onMouseUp = (ev) => {\n            document.removeEventListener('mouseup', this.onMouseUp);\n            this.dragOffset = null;\n        };\n        this.onDblClick = (ev) => {\n            const rootLeft = this.rootElement.getBoundingClientRect().left;\n            const proportion = this.domain.proportionAtPosition(ev.clientX - rootLeft);\n            props_1.default.center = proportion;\n        };\n        document.addEventListener(constants_1.CENTER_CHANGE_EVENT, this.updateLeft);\n    }\n    remove() {\n        document.removeEventListener(constants_1.CENTER_CHANGE_EVENT, this.updateLeft);\n        this.rootElement.removeEventListener('mousedown', this.onMouseDown);\n        this.rootElement.removeEventListener('mousemove', this.onMouseMove);\n        this.rootElement.removeEventListener('dblclick', this.onDblClick);\n    }\n    render() {\n        this.rootElement = create_element_1.default('div', 'band-wrap', [\n            'background-color: white',\n            'position: absolute',\n        ], [\n            `height: ${this.domain.config.heightRatio * 100}%`,\n            `top: ${this.domain.config.topOffsetRatio * 100}%`,\n            `transform: translate3d(${this.domain.left}px, 0, 0)`,\n            `width: ${this.domain.width}px`,\n        ]);\n        if (this.domain.config.visibleRatio < 1) {\n            this.rootElement.addEventListener('mousedown', this.onMouseDown);\n            this.rootElement.addEventListener('mousemove', this.onMouseMove);\n        }\n        this.rootElement.addEventListener('dblclick', this.onDblClick);\n        return this.rootElement;\n    }\n}\nexports.default = Band;\n\n\n//# sourceURL=webpack://Timeline/./src/views/band/index.ts?");

/***/ }),

/***/ "./src/views/band/rulers/index.ts":
/*!****************************************!*\
  !*** ./src/views/band/rulers/index.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst create_element_1 = __webpack_require__(/*! ../../../utils/create-element */ \"./src/utils/create-element.ts\");\nconst ruler_1 = __webpack_require__(/*! ./ruler */ \"./src/views/band/rulers/ruler.ts\");\nconst dates_1 = __webpack_require__(/*! ../../../utils/dates */ \"./src/utils/dates.ts\");\nconst props_1 = __webpack_require__(/*! ../../../models/props */ \"./src/models/props.ts\");\nfunction findClosestRulerDate(date, granularity) {\n    let year = date.getFullYear();\n    if (granularity >= 4) {\n        const step = dates_1.getStep(granularity);\n        if (granularity === 4)\n            year += 1;\n        else\n            while (year % step !== 0) {\n                year += 1;\n            }\n        return new Date(year, 0, 1);\n    }\n    else if (granularity === 3) {\n        return new Date(year, date.getMonth() + 1, 1);\n    }\n    else if (granularity === 1) {\n        return new Date(year, date.getMonth(), date.getDate() + 1);\n    }\n    return date;\n}\nexports.findClosestRulerDate = findClosestRulerDate;\nclass Rulers {\n    constructor(domain) {\n        this.domain = domain;\n    }\n    render() {\n        this.ul = create_element_1.default('ul', 'ruler-wrap', [\n            'bottom: 0',\n            'left: 0',\n            'list-style: none',\n            'margin: 0',\n            'padding: 0',\n            'position: absolute',\n            'right: 0',\n            'top: 0',\n            'whiteSpace: nowrap',\n        ]);\n        let date = findClosestRulerDate(props_1.default.from, this.domain.granularity);\n        const to = props_1.default.to.getTime();\n        while (date.getTime() < to) {\n            this.ul.appendChild(new ruler_1.default(date, this.domain).render());\n            date = this.domain.nextDate(date);\n        }\n        return this.ul;\n    }\n}\nexports.default = Rulers;\n\n\n//# sourceURL=webpack://Timeline/./src/views/band/rulers/index.ts?");

/***/ }),

/***/ "./src/views/band/rulers/ruler.ts":
/*!****************************************!*\
  !*** ./src/views/band/rulers/ruler.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst create_element_1 = __webpack_require__(/*! ../../../utils/create-element */ \"./src/utils/create-element.ts\");\nconst constants_1 = __webpack_require__(/*! ../../../constants */ \"./src/constants.ts\");\nconst days = [\"Sun\", \"Mon\", \"Tue\", \"Wed\", \"Thu\", \"Fri\", \"Sat\"];\nconst months = [\"Jan\", \"Feb\", \"Mar\", \"Apr\", \"May\", \"Jun\", \"Jul\", \"Aug\", \"Sep\", \"Oct\", \"Nov\", \"Dec\"];\nconst getWeekNumber = (date) => {\n    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));\n    const dayNum = d.getUTCDay() || 7;\n    d.setUTCDate(d.getUTCDate() + 4 - dayNum);\n    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));\n    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);\n};\nconst labelBody = (d, granularity) => {\n    if (granularity >= 4) {\n        return d.getFullYear().toString();\n    }\n    else if (granularity === 3) {\n        let body = months[d.getMonth()];\n        if (d.getMonth() === 0)\n            body = `${d.getFullYear().toString()}, ${body}`;\n        return body;\n    }\n    else if (granularity === 2) {\n        return `${months[d.getMonth()]}<br />week ${getWeekNumber(d)}`;\n    }\n    else if (granularity === 1) {\n        let body = days[d.getDay()];\n        body = `${body}<br />${months[d.getMonth()]} ${d.getDate()}`;\n        if (d.getMonth() === 0 && d.getDate() === 1)\n            body = `${body}, ${d.getFullYear().toString()}`;\n        return body;\n    }\n    else if (granularity === 0) {\n        return 'NOT IMPLEMENTED';\n    }\n};\nclass Ruler {\n    constructor(date, domain, offset = 0) {\n        this.date = date;\n        this.domain = domain;\n        this.offset = offset;\n    }\n    render() {\n        const li = create_element_1.default('li', 'ruler', [\n            'border-left: 1px solid #EEE',\n            'box-sizing: border-box',\n            'height: 100%',\n            'padding-left: 6px',\n            'position: absolute',\n            'transition: all 1s cubic-bezier(.25,.8,.25,1)',\n        ], [\n            `left: ${this.domain.positionAtDate(this.date) - this.offset}px`,\n        ]);\n        const label = create_element_1.default('div', 'ruler-label', [\n            'alignItems: flex-end',\n            'bottom: 10px',\n            'color: #888',\n            'display: flex',\n            'font-size: .75em',\n            `height: calc(${constants_1.DATE_BAR_HEIGHT} - 10px)`,\n            'position: absolute',\n            'width: 75px',\n            'zIndex: 2',\n        ]);\n        label.innerHTML = labelBody(this.date, this.domain.granularity);\n        label.title = this.date;\n        li.appendChild(label);\n        return li;\n    }\n}\nexports.default = Ruler;\n\n\n//# sourceURL=webpack://Timeline/./src/views/band/rulers/ruler.ts?");

/***/ }),

/***/ "./src/views/band/sparkline.ts":
/*!*************************************!*\
  !*** ./src/views/band/sparkline.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst create_element_1 = __webpack_require__(/*! ../../utils/create-element */ \"./src/utils/create-element.ts\");\nconst index_1 = __webpack_require__(/*! ./index */ \"./src/views/band/index.ts\");\nconst rulers_1 = __webpack_require__(/*! ./rulers */ \"./src/views/band/rulers/index.ts\");\nconst aggregate_worker_1 = __webpack_require__(/*! ../../utils/aggregate.worker */ \"./src/utils/aggregate.worker.ts\");\nclass SparklineBand extends index_1.default {\n    constructor(domain, events, aggregate) {\n        super(domain);\n        this.events = events;\n        this.aggregate = aggregate;\n    }\n    render() {\n        const wrapper = super.render();\n        this.svg = create_element_1.createSvg('svg', null, {\n            height: `${this.domain.height}px`,\n            preserveAspectRatio: \"none\",\n            viewBox: `0 0 ${this.domain.width} ${this.domain.height}`,\n            width: `${this.domain.width}px`,\n        });\n        wrapper.appendChild(this.svg);\n        wrapper.appendChild(new rulers_1.default(this.domain).render());\n        if (this.aggregate.length) {\n            this.renderPath();\n        }\n        else if (this.events.length)\n            aggregate_worker_1.default(this.events, (aggregate) => {\n                this.aggregate = aggregate;\n                this.renderPath();\n            });\n        return wrapper;\n    }\n    renderChildren() { }\n    createPath() {\n        const countMax = this.aggregate.reduce((prev, curr) => { return Math.max(prev, curr.count); }, 0);\n        const path = this.aggregate.reduce((prev, curr, index) => {\n            const curveType = index === 0 ? 'M' : 'L';\n            const x = (this.domain.width / (this.aggregate.length - 1)) * index;\n            const y = this.domain.height - ((curr.count / countMax) * this.domain.height);\n            return `${prev} ${curveType} ${x} ${y}`;\n        }, '');\n        const pathCloser = ` L ${this.domain.width + 1} ${this.domain.height + 1} L -1 ${this.domain.height + 1}`;\n        return path + pathCloser;\n    }\n    renderPath() {\n        const pathElement = create_element_1.createSvg('path', [\n            'fill: rgba(245, 245, 255, .7)',\n            'stroke: rgb(180, 180, 255)',\n        ], { d: this.createPath() });\n        this.svg.appendChild(pathElement);\n    }\n}\nexports.default = SparklineBand;\n\n\n//# sourceURL=webpack://Timeline/./src/views/band/sparkline.ts?");

/***/ }),

/***/ "./src/views/indicator/index.ts":
/*!**************************************!*\
  !*** ./src/views/indicator/index.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst create_element_1 = __webpack_require__(/*! ../../utils/create-element */ \"./src/utils/create-element.ts\");\nconst constants_1 = __webpack_require__(/*! ../../constants */ \"./src/constants.ts\");\nconst props_1 = __webpack_require__(/*! ../../models/props */ \"./src/models/props.ts\");\nclass Indicator {\n    constructor(hostDomain, targetDomain) {\n        this.hostDomain = hostDomain;\n        this.targetDomain = targetDomain;\n        this.handleCenterChange = (e) => {\n            this.indicator.style.transform = `translate3d(${this.indicatorLeft()}px, 0, 0)`;\n        };\n        this.width = this.hostDomain.width / this.targetDomain.width * props_1.default.viewportWidth;\n        if (this.width < 2)\n            this.width = 2;\n        document.addEventListener(constants_1.CENTER_CHANGE_EVENT, this.handleCenterChange);\n    }\n    remove() {\n        document.removeEventListener(constants_1.CENTER_CHANGE_EVENT, this.handleCenterChange);\n    }\n    render() {\n        const wrapper = create_element_1.default('div', 'indicator-wrap', [\n            'bottom: 0',\n            'left: 0',\n            'pointer-events: none',\n            'position: absolute',\n            'right: 0',\n        ], [\n            `height: ${this.hostDomain.height}px`,\n            `top: ${this.hostDomain.config.topOffsetRatio * 100}%`,\n        ]);\n        this.indicator = create_element_1.default('div', 'indicator', [\n            'position: absolute',\n            'bottom: 0',\n            'cursor: -webkit-grab',\n            'background-color: rgba(255, 0, 0, .05)',\n            'z-index: 3',\n        ], [\n            `height: ${this.hostDomain.height}px`,\n            `transform: translate3d(${this.indicatorLeft()}px, 0, 0)`,\n            `width: ${this.width}px`,\n        ]);\n        wrapper.appendChild(this.indicator);\n        return wrapper;\n    }\n    indicatorLeft() {\n        return (props_1.default.viewportWidth - this.width) * props_1.default.center;\n    }\n}\nexports.default = Indicator;\n\n\n//# sourceURL=webpack://Timeline/./src/views/indicator/index.ts?");

/***/ })

/******/ });
});