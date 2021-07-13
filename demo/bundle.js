/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./demo/index.ts":
/*!***********************!*\
  !*** ./demo/index.ts ***!
  \***********************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var csset_1 = __webpack_require__(/*! ../src/csset */ "./src/csset.ts");
var playground_1 = __webpack_require__(/*! ./playground */ "./demo/playground.ts");
var steps_1 = __webpack_require__(/*! ./steps */ "./demo/steps/index.ts");
window.Csset = csset_1.Csset;
// (window as any).createSet = (sel: string) => new Csset(sel);
// Where to put step info
var commentArea = document.querySelector('#comment');
var styleArea = document.querySelector('#style');
var codeArea = document.querySelector('#code');
// Control
var nextButton = document.querySelector('#next');
// Prepare the playground
// Size MUST be odd number
var playgroundSize = 101;
var playground = document.querySelector('#playground');
playground_1.setPlayground(playground, playgroundSize);
var index = 0;
nextButton.addEventListener('click', function () {
    if (nextButton.innerText === 'Restart') {
        window.location.reload();
        return;
    }
    var step = steps_1.STEPS[index++];
    // Put comment and display snippet
    steps_1.runStep(step, commentArea, codeArea, styleArea);
    hljs.highlightBlock(codeArea);
    if (index >= steps_1.STEPS.length) {
        nextButton.innerText = 'Restart';
    }
});


/***/ }),

/***/ "./demo/playground.ts":
/*!****************************!*\
  !*** ./demo/playground.ts ***!
  \****************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export setPlayground [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setPlayground = void 0;
// Divide the grid in 4 quadrants
function markQuadrant(td, row, col, size) {
    var middle = Math.floor(size / 2);
    var quadrant = '';
    if (row < middle) {
        quadrant = col < middle ? 'one' : col > middle ? 'two' : '';
    }
    else if (row > middle) {
        quadrant = col < middle ? 'three' : col > middle ? 'four' : '';
    }
    if (quadrant) {
        td.classList.add("quadrant-" + quadrant);
    }
}
// Put a rhombus in the middle
function markRhombus(td, row, col, size) {
    var diff = (row < size / 2) ? row : size - row - 1;
    var high = (size / 2) + diff;
    var low = (size / 2) - diff - 1;
    if (low <= col && col <= high) {
        td.classList.add("diamond");
    }
}
// Also a circle
function markCircle(td, row, col, size) {
    var radius = Math.floor(size / 2);
    var center = { x: radius, y: radius };
    var distance = Math.sqrt(Math.pow(Math.abs(center.x - col), 2) +
        Math.pow(Math.abs(center.y - row), 2));
    if (distance <= radius) {
        td.classList.add("circle");
    }
}
// man function which creates the playground grid
function setPlayground(table, size) {
    for (var row = 0; row < size; row++) {
        var tr = document.createElement('tr');
        for (var col = 0; col < size; col++) {
            var td = document.createElement('td');
            var sum = (row * size) + col;
            td.setAttribute('class', 'tile');
            td.setAttribute('d-row', "" + row);
            td.setAttribute('d-col', "" + col);
            td.setAttribute('d-sum', "" + sum);
            td.setAttribute('d-odd', "" + (sum % 2 === 0));
            td.setAttribute('d-even', "" + (sum % 2 === 1));
            // td.innerText = `${sum}`;
            markQuadrant(td, row, col, size);
            markCircle(td, row, col, size);
            markRhombus(td, row, col, size);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}
exports.setPlayground = setPlayground;


/***/ }),

/***/ "./demo/steps/index.ts":
/*!*****************************!*\
  !*** ./demo/steps/index.ts ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/*! CommonJS bailout: this is used directly at 2:23-27 */
/*! CommonJS bailout: this is used directly at 9:20-24 */
/*! CommonJS bailout: this is used directly at 12:14-18 */
/*! CommonJS bailout: this is used directly at 28:16-20 */
/*! CommonJS bailout: exports is used directly at 37:34-41 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.STEPS = void 0;
var steps_begin_1 = __webpack_require__(/*! ./steps-begin */ "./demo/steps/steps-begin.ts");
var steps_union_1 = __webpack_require__(/*! ./steps-union */ "./demo/steps/steps-union.ts");
var steps_intersection_1 = __webpack_require__(/*! ./steps-intersection */ "./demo/steps/steps-intersection.ts");
__exportStar(__webpack_require__(/*! ./runner */ "./demo/steps/runner.ts"), exports);
exports.STEPS = __spread(steps_begin_1.STEPS_BEGIN, steps_union_1.STEPS_UNION, steps_intersection_1.STEPS_INTERSECTION);


/***/ }),

/***/ "./demo/steps/runner.ts":
/*!******************************!*\
  !*** ./demo/steps/runner.ts ***!
  \******************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export runStep [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.runStep = void 0;
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function isCsset(source) {
    var _a, _b;
    return ((_b = (_a = source === null || source === void 0 ? void 0 : source.__proto__) === null || _a === void 0 ? void 0 : _a.constructor) === null || _b === void 0 ? void 0 : _b.name) === 'Csset';
}
function runStep(step, commentElem, codeElem, styeElem) {
    // Put comment
    commentElem.innerText = step.comment;
    // Show code
    var source = step.code.toString();
    var linesOfCode = source.split('\n').slice(1, -1).map(function (line) {
        return line.replace(/return /g, '');
    });
    codeElem.innerText = linesOfCode.join('\n');
    // Change color if returned expression is a Csset
    var evalResult = eval("(" + source + ")()");
    var styleText = evalResult + "{ background-color: " + getRandomColor() + "; }";
    if (isCsset(evalResult)) {
        styeElem.innerText = styleText;
    }
    else {
        styeElem.innerText = '';
    }
}
exports.runStep = runStep;


/***/ }),

/***/ "./demo/steps/steps-begin.ts":
/*!***********************************!*\
  !*** ./demo/steps/steps-begin.ts ***!
  \***********************************/
/*! flagged exports */
/*! export STEPS_BEGIN [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.STEPS_BEGIN = void 0;
exports.STEPS_BEGIN = [
    {
        comment: "These are the cells with class quadrant-one",
        code: function () {
            return new Csset('.quadrant-one');
        }
    },
    {
        comment: "These are the cells with class quadrant-two",
        code: function () {
            return new Csset('.quadrant-two');
        }
    },
    {
        comment: "These are the cells with class quadrant-three",
        code: function () {
            return new Csset('.quadrant-three');
        }
    },
    {
        comment: "These are the cells with class quadrant-four",
        code: function () {
            return new Csset('.quadrant-four');
        }
    },
    {
        comment: "These are the cells with class circle",
        code: function () {
            return new Csset('.circle');
        }
    },
    {
        comment: "These are the cells with class diamond",
        code: function () {
            return new Csset('.diamond');
        }
    },
    {
        comment: "Cells also contain a d-row attribute with the row number they have",
        code: function () {
            return new Csset('[d-row=5]');
        }
    },
    {
        comment: "And contain a d-col attribute with the column number they have",
        code: function () {
            return new Csset('[d-col=50]');
        }
    },
    {
        comment: "Each cell of the grid has its number in a d-sum attribute",
        code: function () {
            return new Csset('[d-sum=50]');
        }
    },
    {
        comment: "Add the cell has marked if its odd number",
        code: function () {
            return new Csset('[d-odd=true]');
        }
    },
    {
        comment: "Or even number",
        code: function () {
            return new Csset('[d-even=true]');
        }
    },
];


/***/ }),

/***/ "./demo/steps/steps-intersection.ts":
/*!******************************************!*\
  !*** ./demo/steps/steps-intersection.ts ***!
  \******************************************/
/*! flagged exports */
/*! export STEPS_INTERSECTION [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.STEPS_INTERSECTION = void 0;
exports.STEPS_INTERSECTION = [
    {
        comment: "Intersection returns a set which all elements are from both sets",
        code: function () {
            var quadrantOne = new Csset('.quadrant-one');
            var rhombus = new Csset('.rhombus');
            return quadrantOne.intersection(rhombus);
        }
    },
];


/***/ }),

/***/ "./demo/steps/steps-union.ts":
/*!***********************************!*\
  !*** ./demo/steps/steps-union.ts ***!
  \***********************************/
/*! flagged exports */
/*! export STEPS_UNION [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.STEPS_UNION = void 0;
exports.STEPS_UNION = [
    {
        comment: "Union is a straight forward method used to join sets",
        code: function () {
            var quadrantOne = new Csset('.quadrant-one');
            var quadrantTwo = new Csset('.quadrant-two');
            return quadrantOne.union(quadrantTwo);
        }
    },
    {
        comment: "You can do an union of many sets",
        code: function () {
            var quadrantOne = new Csset('.quadrant-one');
            var quadrantTwo = new Csset('.quadrant-two');
            var circle = new Csset('.circle');
            return quadrantOne.union(quadrantTwo).union(circle);
        }
    },
];


/***/ }),

/***/ "./src/css-attribute-matcher.ts":
/*!**************************************!*\
  !*** ./src/css-attribute-matcher.ts ***!
  \**************************************/
/*! flagged exports */
/*! export CssAttributeMatcher [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CssAttributeMatcher = void 0;
var types_1 = __webpack_require__(/*! ./types */ "./src/types.ts");
var CssAttributeMatcher = /** @class */ (function () {
    function CssAttributeMatcher(val) {
        this.value = val;
    }
    CssAttributeMatcher.prototype.supersetOf = function (matcher) {
        throw Error("no supersetOf method implemented for matcher symbol " + this.symbol);
    };
    CssAttributeMatcher.prototype.subsetOf = function (matcher) {
        return matcher.supersetOf(this);
    };
    CssAttributeMatcher.prototype.union = function (matcher) {
        if (this.supersetOf(matcher)) {
            return "" + this;
        }
        else if (matcher.supersetOf(this)) {
            return "" + matcher;
        }
        return null;
    };
    CssAttributeMatcher.prototype.intersection = function (matcher) {
        if (this.supersetOf(matcher)) {
            return "" + matcher;
        }
        else if (matcher.supersetOf(this)) {
            return "" + this;
        }
        // Equals intersect with any other matcher
        // Return void indicating the intersection is an empty set
        if ([this.symbol, matcher.symbol].indexOf(types_1.CssMatcherSymbol.Equal) !== -1) {
            if (matcher.value !== this.value) {
                return void 0;
            }
        }
        return null;
    };
    CssAttributeMatcher.prototype.toString = function () {
        if (this.symbol === types_1.CssMatcherSymbol.Presence) {
            return "";
        }
        return (this.symbol + "=\"" + this.value + "\"").replace(/^=/, '');
    };
    return CssAttributeMatcher;
}());
exports.CssAttributeMatcher = CssAttributeMatcher;


/***/ }),

/***/ "./src/css-attribute.ts":
/*!******************************!*\
  !*** ./src/css-attribute.ts ***!
  \******************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/*! CommonJS bailout: this is used directly at 2:14-18 */
/*! CommonJS bailout: this is used directly at 18:16-20 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CssAttribute = void 0;
var css_matcher_factory_1 = __webpack_require__(/*! ./matchers/css-matcher-factory */ "./src/matchers/css-matcher-factory.ts");
var CssAttribute = /** @class */ (function () {
    function CssAttribute(_a) {
        var _b = __read(_a, 3), name = _b[0], symbol = _b[1], value = _b[2];
        this.matchers = [];
        this.name = name;
        symbol = symbol || '';
        value = value;
        var matcher = css_matcher_factory_1.CssMatcherFactory.create("" + symbol + value);
        var intersection;
        for (var i = 0; i < this.matchers.length; i++) {
            intersection = matcher.intersection(this.matchers[i]);
            if (intersection) {
                this.matchers[i] = css_matcher_factory_1.CssMatcherFactory.create(intersection);
                break;
            }
        }
        if (!intersection) {
            this.matchers.push(matcher);
        }
    }
    CssAttribute.prototype.supersetOf = function (attr) {
        var e_1, _a;
        var thisMatchers = this.matchers;
        var attrMatchers = attr.matchers;
        var _loop_1 = function (matcher) {
            var supersetIndex = attrMatchers.findIndex(function (attrMatcher) { return matcher.supersetOf(attrMatcher); });
            var voidIndex = attrMatchers.findIndex(function (attrMatcher) { return matcher.intersection(attrMatcher) === void 0; });
            if (supersetIndex === -1 || voidIndex !== -1) {
                return { value: false };
            }
        };
        try {
            // To be a superset all matchers in this
            // - must be a superset of at least one attrMatcher
            // - must not have a void intersection with any attrMatcher
            for (var thisMatchers_1 = __values(thisMatchers), thisMatchers_1_1 = thisMatchers_1.next(); !thisMatchers_1_1.done; thisMatchers_1_1 = thisMatchers_1.next()) {
                var matcher = thisMatchers_1_1.value;
                var state_1 = _loop_1(matcher);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (thisMatchers_1_1 && !thisMatchers_1_1.done && (_a = thisMatchers_1.return)) _a.call(thisMatchers_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return true;
    };
    CssAttribute.prototype.subsetOf = function (attr) {
        return attr.supersetOf(this);
    };
    CssAttribute.prototype.union = function (attr) {
        var union = this.supersetOf(attr) ? this :
            attr.supersetOf(this) ? attr : null;
        return union;
    };
    CssAttribute.prototype.intersection = function (attr) {
        var e_2, _a, e_3, _b;
        if (this.supersetOf(attr)) {
            return attr;
        }
        if (attr.supersetOf(this)) {
            return this;
        }
        var thisMatchers = this.matchers;
        var attrMatchers = attr.matchers;
        var intersectionMatchers = [];
        var _loop_2 = function (matcher) {
            var voidIndex = attrMatchers.findIndex(function (attrMatcher) { return matcher.intersection(attrMatcher) === void 0; });
            if (voidIndex !== -1) {
                return { value: void 0 };
            }
            var intersectIndex = attrMatchers.findIndex(function (attrMatcher) { return !!matcher.intersection(attrMatcher); });
            if (intersectIndex !== -1) {
                var matcherString = matcher.intersection(attrMatchers[intersectIndex]);
                intersectionMatchers.push(css_matcher_factory_1.CssMatcherFactory.create("" + matcherString));
                attrMatchers.splice(intersectIndex, 1);
            }
            else {
                intersectionMatchers.push(matcher);
            }
        };
        try {
            for (var thisMatchers_2 = __values(thisMatchers), thisMatchers_2_1 = thisMatchers_2.next(); !thisMatchers_2_1.done; thisMatchers_2_1 = thisMatchers_2.next()) {
                var matcher = thisMatchers_2_1.value;
                var state_2 = _loop_2(matcher);
                if (typeof state_2 === "object")
                    return state_2.value;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (thisMatchers_2_1 && !thisMatchers_2_1.done && (_a = thisMatchers_2.return)) _a.call(thisMatchers_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        try {
            for (var attrMatchers_1 = __values(attrMatchers), attrMatchers_1_1 = attrMatchers_1.next(); !attrMatchers_1_1.done; attrMatchers_1_1 = attrMatchers_1.next()) {
                var matcher = attrMatchers_1_1.value;
                intersectionMatchers.push(matcher);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (attrMatchers_1_1 && !attrMatchers_1_1.done && (_b = attrMatchers_1.return)) _b.call(attrMatchers_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        var intersectionAttr = new CssAttribute([this.name]);
        intersectionAttr.matchers = intersectionMatchers;
        return intersectionAttr;
    };
    CssAttribute.prototype.toString = function () {
        var _this = this;
        return this.matchers
            .map(function (matcher) { return "" + matcher; })
            .sort()
            .reduce(function (prev, matcher) { return prev + "[" + _this.name + matcher + "]"; }, '');
    };
    return CssAttribute;
}());
exports.CssAttribute = CssAttribute;


/***/ }),

/***/ "./src/css-rule.ts":
/*!*************************!*\
  !*** ./src/css-rule.ts ***!
  \*************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__ */
/*! CommonJS bailout: this is used directly at 2:16-20 */
/***/ (function(__unused_webpack_module, exports) {


var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CssRule = void 0;
var CssRule = /** @class */ (function () {
    function CssRule() {
        this.classes = new Set();
        this.attribs = new Map();
    }
    Object.defineProperty(CssRule.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (id) {
            if (this._id) {
                throw SyntaxError("Identifier already set to " + this.id + ".");
            }
            this._id = id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CssRule.prototype, "element", {
        get: function () {
            return this._element || '*';
        },
        set: function (element) {
            if (this.attribs.size) {
                throw SyntaxError("Elements cannot be defined after attributes.");
            }
            this._element = element;
        },
        enumerable: false,
        configurable: true
    });
    CssRule.prototype.addAttribute = function (attribute) {
        var prevAttribute = this.attribs.get(attribute.name);
        if (prevAttribute) {
            var mergedAttribute = prevAttribute.intersection(attribute);
            if (mergedAttribute === void 0) {
                throw new TypeError("The selector defines an empty set.");
            }
            else {
                this.attribs.set(prevAttribute.name, mergedAttribute);
            }
        }
        else {
            this.attribs.set(attribute.name, attribute);
        }
    };
    CssRule.prototype.addClass = function (className) {
        this.classes.add(className);
    };
    CssRule.prototype.equals = function (rule) {
        return "" + this === "" + rule;
    };
    CssRule.prototype.supersetOf = function (rule) {
        var e_1, _a, e_2, _b;
        // Element
        if (this.element !== '*' && this.element !== rule.element) {
            return false;
        }
        // ID
        if (this.id && this.id !== rule.id) {
            return false;
        }
        try {
            // classes
            for (var _c = __values(this.classes), _d = _c.next(); !_d.done; _d = _c.next()) {
                var c = _d.value;
                if (!rule.classes.has(c)) {
                    return false;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        // Attributes
        // More attribs mean more specific so it cannot be superset
        if (this.attribs.size > rule.attribs.size) {
            return false;
        }
        try {
            // Check attributes
            for (var _e = __values(this.attribs.values()), _f = _e.next(); !_f.done; _f = _e.next()) {
                var attr = _f.value;
                var ruleAttr = rule.attribs.get(attr.name);
                // attrib should be defined in both and include 
                if (ruleAttr && !attr.supersetOf(ruleAttr)) {
                    return false;
                }
                else if (!ruleAttr) {
                    return false;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return true;
    };
    CssRule.prototype.subsetOf = function (rule) {
        return rule.supersetOf(this);
    };
    CssRule.prototype.union = function (rule) {
        var union = this.supersetOf(rule) ? [this] :
            rule.supersetOf(this) ? [rule] : [this, rule];
        return union;
    };
    CssRule.prototype.intersection = function (rule) {
        if (this.id && rule.id && this.id !== rule.id) {
            return void 0;
        }
        if (this.element !== rule.element && this.element !== '*' && rule.element !== '*') {
            return void 0;
        }
        var intersection = new CssRule();
        intersection.id = this.id || rule.id;
        if (this.element !== '*') {
            intersection.element = this.element;
        }
        this.classes.forEach(function (cls) { return intersection.addClass(cls); });
        rule.classes.forEach(function (cls) { return intersection.addClass(cls); });
        try {
            this.attribs.forEach(function (attr) { return intersection.addAttribute(attr); });
            rule.attribs.forEach(function (attr) { return intersection.addAttribute(attr); });
        }
        catch (error) {
            return void 0;
        }
        return intersection;
    };
    CssRule.prototype.toString = function () {
        var _this = this;
        var classes = Array.from(this.classes).sort();
        var attribs = Array.from(this.attribs.keys()).sort().map(function (n) { return _this.attribs.get(n); });
        var strClasses = classes.map(function (n) { return "." + n; });
        var strAttribs = attribs.map(function (a) { return "" + a; });
        var strId = this.id ? "#" + this.id : '';
        return "" + this.element + strId + strClasses.join('') + strAttribs.join('');
    };
    return CssRule;
}());
exports.CssRule = CssRule;


/***/ }),

/***/ "./src/css-selector-lexer.ts":
/*!***********************************!*\
  !*** ./src/css-selector-lexer.ts ***!
  \***********************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/*! CommonJS bailout: this is used directly at 2:14-18 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CssSelectorLexer = void 0;
// TODO: use lexer & grammar from
// https://www.w3.org/TR/CSS22/grammar.html
// use following tool to work with regex
// https://regex101.com/
// TODO: use this npm lib
// npm install parsel-js
var types_1 = __webpack_require__(/*! ./types */ "./src/types.ts");
var CSS_TOKEN_MATCHERS = [
    {
        type: types_1.CssTokenType.Element,
        rx: /^(-?[_a-z][_a-z0-9-]*|\*)/i,
    },
    {
        type: types_1.CssTokenType.Id,
        rx: /^#(-?[_a-z][_a-z0-9-]*)/i
    },
    {
        type: types_1.CssTokenType.Class,
        rx: /^\.(-?[_a-z][_a-z0-9-]*)/i
    },
    {
        type: types_1.CssTokenType.Attribute,
        rx: /^\[(-?[_a-z][_a-z0-9-]*)(?:([\^\$\*\|~]?=)?([_a-z0-9\u0080-\uFFFF]+|"[^"]*"|'[^']*'))?\]/i
    },
    {
        type: types_1.CssTokenType.Combinator,
        rx: /^(?:\s*)([~>\+])(?:\s*)/
    },
    {
        type: types_1.CssTokenType.Separator,
        rx: /^(?:\s*)(,)(?:\s*)/
    },
    {
        type: types_1.CssTokenType.Space,
        rx: /^(\s+)/
    },
];
var CssSelectorLexer = /** @class */ (function () {
    function CssSelectorLexer(selector) {
        this.position = 0;
        this.selector = selector.trim();
    }
    CssSelectorLexer.prototype.nextToken = function () {
        if (this.selector === '') {
            return void 0;
        }
        var sel = this.selector;
        var pos = this.position;
        var matcher = CSS_TOKEN_MATCHERS.find(function (t) { return t.rx.test(sel); });
        var execArray;
        execArray = matcher && matcher.rx.exec(sel);
        if (matcher && execArray) {
            var _a = __read(execArray), full = _a[0], partials = _a.slice(1);
            this.selector = sel.replace(full, '');
            this.position = pos + full.length;
            return {
                type: matcher.type,
                values: this.sanitizeValues(partials),
                position: pos,
                length: full.length
            };
        }
        // We reached an part where we cannot parse the selector
        this.selector = '';
        return {
            type: types_1.CssTokenType.Unknown,
            values: [sel],
            position: pos,
            length: sel.length,
        };
    };
    CssSelectorLexer.prototype.sanitizeValues = function (values) {
        return values.filter(function (value) { return !!value; }).map(function (value) {
            var isQuotedString = /^('|")[^'"]+\1$/.test(value);
            return isQuotedString ? value.slice(1, -1) : value;
        });
    };
    return CssSelectorLexer;
}());
exports.CssSelectorLexer = CssSelectorLexer;


/***/ }),

/***/ "./src/css-selector.ts":
/*!*****************************!*\
  !*** ./src/css-selector.ts ***!
  \*****************************/
/*! flagged exports */
/*! export CssSelector [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CssSelector = void 0;
var css_rule_1 = __webpack_require__(/*! ./css-rule */ "./src/css-rule.ts");
var types_1 = __webpack_require__(/*! ./types */ "./src/types.ts");
var css_selector_lexer_1 = __webpack_require__(/*! ./css-selector-lexer */ "./src/css-selector-lexer.ts");
var css_attribute_1 = __webpack_require__(/*! ./css-attribute */ "./src/css-attribute.ts");
var isAncestor = function (combinedRule) {
    return [" " /* DESCENDANT */, ">" /* CHILD */].indexOf(combinedRule.comb) !== -1;
};
var CssSelector = /** @class */ (function () {
    function CssSelector(selectorStr) {
        this.levels = [[]];
        this.parse(selectorStr);
    }
    CssSelector.prototype.addRule = function (combRule) {
        var currentLevel = this.levels[this.levels.length - 1];
        if (isAncestor(combRule)) {
            currentLevel.push(combRule);
            this.levels.push([]);
        }
        else {
            currentLevel.push(combRule);
        }
    };
    CssSelector.prototype.supersetOf = function (selector) {
        return this.selectorSuperset(this.levels, selector.levels);
    };
    CssSelector.prototype.subsetOf = function (selector) {
        return selector.supersetOf(this);
    };
    CssSelector.prototype.intersection = function (selector) {
        if (this.supersetOf(selector)) {
            return selector;
        }
        if (selector.supersetOf(this)) {
            return this;
        }
        // TODO: other possible cases??
        return void 0;
    };
    CssSelector.prototype.toString = function () {
        var result = '';
        this.levels.forEach(function (level) {
            level.forEach(function (combinedRule) {
                var comb = combinedRule.comb ? " " + combinedRule.comb + " " : ' ';
                result += "" + combinedRule.rule + comb;
            });
        });
        return result.trim();
    };
    /**
     * Fills the list of rules with it's combinators
     * @param selectorStr the selector to parse
     */
    CssSelector.prototype.parse = function (selectorStr) {
        var lexer = new css_selector_lexer_1.CssSelectorLexer(selectorStr);
        var rule = new css_rule_1.CssRule();
        var token;
        while (token = lexer.nextToken()) {
            switch (token.type) {
                case types_1.CssTokenType.Element:
                    rule.element = token.values[0];
                    break;
                case types_1.CssTokenType.Id:
                    rule.id = token.values[0];
                    break;
                case types_1.CssTokenType.Class:
                    rule.addClass(token.values[0]);
                    break;
                case types_1.CssTokenType.Attribute:
                    rule.addAttribute(new css_attribute_1.CssAttribute(token.values));
                    break;
                case types_1.CssTokenType.Combinator:
                case types_1.CssTokenType.Space:
                    var comb = token.values[0];
                    var combRule = { rule: rule, comb: comb };
                    rule = new css_rule_1.CssRule();
                    this.addRule(combRule);
                    break;
                default:
                    throw new SyntaxError("Unknown token " + token.values[0] + " at position " + token.position);
            }
        }
        // last rule should be pushed in the layer
        this.addRule({ rule: rule, comb: "" /* NONE */ });
    };
    CssSelector.prototype.selectorSuperset = function (selectorOne, selectorTwo) {
        // Base case: container is empty (meaning we have checked all its rules)
        // *
        // a
        if (selectorOne.length === 0) {
            return true;
        }
        // Base case: selectorTwo is empty (meaning we have checked all its rules)
        // a
        // *
        if (selectorTwo.length === 0) {
            return false;
        }
        // Base case: selectorOne is more specific than selectorTwo
        // a b c
        // a b
        if (selectorOne.length > selectorTwo.length) {
            return false;
        }
        var layerOne = selectorOne[selectorOne.length - 1];
        var layerTwo = selectorTwo[selectorTwo.length - 1];
        // Base case: layerOne has stronger relationship with descendant than layerTwo
        // a > b > (d
        // a > b (d
        var descendantCombOne = layerOne[layerOne.length - 1].comb;
        var descendantCombTwo = layerTwo[layerTwo.length - 1].comb;
        if (descendantCombOne === ">" /* CHILD */ && descendantCombTwo === " " /* DESCENDANT */) {
            return false;
        }
        // a > b > c
        // a > b > c > d > e
        if (this.levelSuperset(layerOne, layerTwo)) {
            return this.selectorSuperset(selectorOne.slice(0, -1), selectorTwo.slice(0, -1));
        }
        // If the deepest layer isn't a superset then selector can't be
        // c > e
        // a > c > (d
        // If CHILD it should had match before
        // a > b > (d
        // a > c > (d
        if (descendantCombOne === ">" /* CHILD */ || descendantCombOne === "" /* NONE */) {
            return false;
        }
        // For generic sibling walk up the second list of rules
        return this.selectorSuperset(selectorOne, selectorTwo.slice(0, -1));
    };
    CssSelector.prototype.levelSuperset = function (levelOne, levelTwo) {
        // Base case: container is empty (meaning we have checked all its rules)
        if (levelOne.length === 0) {
            return true;
        }
        // Base case: levelTwo is empty (meaning we have checked all its layer)
        if (levelTwo.length === 0) {
            return false;
        }
        // Base case: levelOne is more specific than levelTwo
        if (levelOne.length > levelTwo.length) {
            return false;
        }
        var combinedRuleOne = levelOne[levelOne.length - 1];
        var combinedRuleTwo = levelTwo[levelTwo.length - 1];
        // Base case: combinedRuleOne has stronger relationship with sibling than combinedRuleTwo
        // a + b + (d
        // a + b ~ (d
        var siblingCombOne = combinedRuleOne.comb;
        var siblingCombTwo = combinedRuleTwo.comb;
        if (siblingCombOne === "+" /* ADJACENT */ && siblingCombTwo === "~" /* SIBLING */) {
            return false;
        }
        // a + b ~ d
        // a + b + c + d
        if (combinedRuleOne.rule.supersetOf(combinedRuleTwo.rule)) {
            return this.levelSuperset(levelOne.slice(0, -1), levelTwo.slice(0, -1));
        }
        // If ADJACENT it should had match before
        if (combinedRuleOne.comb === "+" /* ADJACENT */) {
            return false;
        }
        // For generic sibling walk up the second list
        return this.levelSuperset(levelOne, levelTwo.slice(0, -1));
    };
    return CssSelector;
}());
exports.CssSelector = CssSelector;


/***/ }),

/***/ "./src/csset.ts":
/*!**********************!*\
  !*** ./src/csset.ts ***!
  \**********************/
/*! flagged exports */
/*! export Csset [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Csset = void 0;
var css_selector_1 = __webpack_require__(/*! ./css-selector */ "./src/css-selector.ts");
var Csset = /** @class */ (function () {
    /**
     * Parses the given selector filing up its private properties with metadata
     * @param selector the selector string
     */
    function Csset(selector) {
        // TODO: this is error prone since attr values may contain this char
        this.selectors = selector.split(',').map(function (sel) { return new css_selector_1.CssSelector(sel); });
    }
    /**
     * Returns true if this set contains the one passed as parameter
     * @param set the set to check with
     */
    Csset.prototype.supersetOf = function (set) {
        var index = set.selectors.length;
        while (index--) {
            var containerIndex = this.selectors.findIndex(function (s) { return s.supersetOf(set.selectors[index]); });
            if (containerIndex === -1) {
                return false;
            }
        }
        return true;
    };
    /**
     * Returns true if this set is contained the one passed as parameter
     * @param set the set to check with
     */
    Csset.prototype.subsetOf = function (set) {
        return set.supersetOf(this);
    };
    /**
     * Returns a new CSS set which is the union of this one and the passed as parameter
     * @param set the other CSS set to be united with
     */
    Csset.prototype.union = function (set) {
        var _this = this;
        if (this.supersetOf(set)) {
            return this;
        }
        if (this.subsetOf(set)) {
            return set;
        }
        // Make union of selectors if possible
        var equalSel = this.selectors.filter(function (thisSel) { return set.selectors.some(function (otherSel) { return "" + thisSel === "" + otherSel; }); });
        var uniqueOne = this.selectors.filter(function (thisSel) { return !set.selectors.some(function (otherSel) { return thisSel.subsetOf(otherSel); }); });
        var uniqueTwo = set.selectors.filter(function (otherSel) { return !_this.selectors.some(function (thisSel) { return otherSel.subsetOf(thisSel); }); });
        var allSelectors = equalSel.concat(uniqueOne, uniqueTwo);
        return new Csset("" + allSelectors.map(function (s) { return s.toString(); }).join(','));
    };
    /**
     * Returns a new CSS set which is the intersection of this one and the passed as parameter
     * or void if the intersection is an empty set
     * @param set the other CSS set to be united with
     */
    Csset.prototype.intersection = function (set) {
        if (this.supersetOf(set)) {
            return set;
        }
        if (this.subsetOf(set)) {
            return this;
        }
        // Make intersection of selectors if possible
        // 1st attempt brute force (intersecting every set with others)
        var intersections = this.selectors
            .map(function (thisSel) { return set.selectors.map(function (otherSel) { return thisSel.intersection(otherSel); }); })
            .reduce(function (flat, val) { return flat.concat(val); }, [])
            .filter(function (val) { return !!val; })
            .map(function (val) { return "" + val; });
        if (intersections.length) {
            return new Csset("" + intersections.join(','));
        }
        return void 0;
    };
    Csset.prototype.toString = function () {
        return this.selectors.map(function (s) { return "" + s; }).join(',');
    };
    return Csset;
}());
exports.Csset = Csset;


/***/ }),

/***/ "./src/matchers/contains-matcher.ts":
/*!******************************************!*\
  !*** ./src/matchers/contains-matcher.ts ***!
  \******************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/*! CommonJS bailout: this is used directly at 2:17-21 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CssContainsMatcher = void 0;
var types_1 = __webpack_require__(/*! ../types */ "./src/types.ts");
var css_attribute_matcher_1 = __webpack_require__(/*! ../css-attribute-matcher */ "./src/css-attribute-matcher.ts");
var supersetSymbols = [
    types_1.CssMatcherSymbol.Prefix,
    types_1.CssMatcherSymbol.Suffix,
    types_1.CssMatcherSymbol.SubCode,
    types_1.CssMatcherSymbol.Occurrence,
    types_1.CssMatcherSymbol.Contains,
    types_1.CssMatcherSymbol.Equal,
];
var CssContainsMatcher = /** @class */ (function (_super) {
    __extends(CssContainsMatcher, _super);
    function CssContainsMatcher() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.symbol = types_1.CssMatcherSymbol.Contains;
        return _this;
    }
    CssContainsMatcher.prototype.supersetOf = function (matcher) {
        if (supersetSymbols.indexOf(matcher.symbol) !== -1) {
            return matcher.value.indexOf(this.value) !== -1;
        }
        return false;
    };
    return CssContainsMatcher;
}(css_attribute_matcher_1.CssAttributeMatcher));
exports.CssContainsMatcher = CssContainsMatcher;


/***/ }),

/***/ "./src/matchers/css-matcher-factory.ts":
/*!*********************************************!*\
  !*** ./src/matchers/css-matcher-factory.ts ***!
  \*********************************************/
/*! flagged exports */
/*! export CssMatcherFactory [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CssMatcherFactory = void 0;
var types_1 = __webpack_require__(/*! ../types */ "./src/types.ts");
var presence_matcher_1 = __webpack_require__(/*! ./presence-matcher */ "./src/matchers/presence-matcher.ts");
var prefix_matcher_1 = __webpack_require__(/*! ./prefix-matcher */ "./src/matchers/prefix-matcher.ts");
var suffix_matcher_1 = __webpack_require__(/*! ./suffix-matcher */ "./src/matchers/suffix-matcher.ts");
var equal_matcher_1 = __webpack_require__(/*! ./equal-matcher */ "./src/matchers/equal-matcher.ts");
var contains_matcher_1 = __webpack_require__(/*! ./contains-matcher */ "./src/matchers/contains-matcher.ts");
var occurrence_matcher_1 = __webpack_require__(/*! ./occurrence-matcher */ "./src/matchers/occurrence-matcher.ts");
var subcode_matcher_1 = __webpack_require__(/*! ./subcode-matcher */ "./src/matchers/subcode-matcher.ts");
var clazzez = (_a = {},
    _a[types_1.CssMatcherSymbol.Presence] = presence_matcher_1.CssPresenceMatcher,
    _a[types_1.CssMatcherSymbol.Prefix] = prefix_matcher_1.CssPrefixMatcher,
    _a[types_1.CssMatcherSymbol.Suffix] = suffix_matcher_1.CssSuffixMatcher,
    _a[types_1.CssMatcherSymbol.Equal] = equal_matcher_1.CssEqualMatcher,
    _a[types_1.CssMatcherSymbol.Contains] = contains_matcher_1.CssContainsMatcher,
    _a[types_1.CssMatcherSymbol.Occurrence] = occurrence_matcher_1.CssOccurrenceMatcher,
    _a[types_1.CssMatcherSymbol.SubCode] = subcode_matcher_1.CssSubCodeMatcher,
    _a);
var VALUE_REGEXPS = {
    valid: /^('|")[^'"]+\1$|^[^'"]+$/,
    quotes: /^["']|["']$/g,
};
var CssMatcherFactory = /** @class */ (function () {
    function CssMatcherFactory() {
    }
    CssMatcherFactory.create = function (selector) {
        if (selector === void 0) { selector = ''; }
        var parts = selector.split('=');
        var symbol = parts.length > 1 ? parts[0] || '=' : '';
        var value = parts.length > 1 ? parts[1] : '';
        if (!!value && !VALUE_REGEXPS.valid.test(value)) {
            throw new SyntaxError("Invalid attribute value in " + selector);
        }
        return new clazzez[symbol](value.replace(VALUE_REGEXPS.quotes, ''));
    };
    return CssMatcherFactory;
}());
exports.CssMatcherFactory = CssMatcherFactory;


/***/ }),

/***/ "./src/matchers/equal-matcher.ts":
/*!***************************************!*\
  !*** ./src/matchers/equal-matcher.ts ***!
  \***************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/*! CommonJS bailout: this is used directly at 2:17-21 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CssEqualMatcher = void 0;
var types_1 = __webpack_require__(/*! ../types */ "./src/types.ts");
var css_attribute_matcher_1 = __webpack_require__(/*! ../css-attribute-matcher */ "./src/css-attribute-matcher.ts");
var CssEqualMatcher = /** @class */ (function (_super) {
    __extends(CssEqualMatcher, _super);
    function CssEqualMatcher() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.symbol = types_1.CssMatcherSymbol.Equal;
        return _this;
    }
    CssEqualMatcher.prototype.supersetOf = function (matcher) {
        return matcher.symbol === types_1.CssMatcherSymbol.Equal && this.value === matcher.value;
    };
    return CssEqualMatcher;
}(css_attribute_matcher_1.CssAttributeMatcher));
exports.CssEqualMatcher = CssEqualMatcher;


/***/ }),

/***/ "./src/matchers/occurrence-matcher.ts":
/*!********************************************!*\
  !*** ./src/matchers/occurrence-matcher.ts ***!
  \********************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/*! CommonJS bailout: this is used directly at 2:17-21 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CssOccurrenceMatcher = void 0;
var types_1 = __webpack_require__(/*! ../types */ "./src/types.ts");
var css_attribute_matcher_1 = __webpack_require__(/*! ../css-attribute-matcher */ "./src/css-attribute-matcher.ts");
var supersetSymbols = [
    types_1.CssMatcherSymbol.Equal,
    types_1.CssMatcherSymbol.Occurrence,
];
var CssOccurrenceMatcher = /** @class */ (function (_super) {
    __extends(CssOccurrenceMatcher, _super);
    function CssOccurrenceMatcher() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.symbol = types_1.CssMatcherSymbol.Occurrence;
        return _this;
    }
    CssOccurrenceMatcher.prototype.supersetOf = function (matcher) {
        if (supersetSymbols.indexOf(matcher.symbol) !== -1) {
            return matcher.value === this.value;
        }
        return false;
    };
    CssOccurrenceMatcher.prototype.intersection = function (matcher) {
        if (this.value === matcher.value) {
            if (matcher.symbol === types_1.CssMatcherSymbol.Equal) {
                return "=\"" + this.value + "\"";
            }
        }
        return _super.prototype.intersection.call(this, matcher);
    };
    return CssOccurrenceMatcher;
}(css_attribute_matcher_1.CssAttributeMatcher));
exports.CssOccurrenceMatcher = CssOccurrenceMatcher;


/***/ }),

/***/ "./src/matchers/prefix-matcher.ts":
/*!****************************************!*\
  !*** ./src/matchers/prefix-matcher.ts ***!
  \****************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/*! CommonJS bailout: this is used directly at 2:17-21 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CssPrefixMatcher = void 0;
var types_1 = __webpack_require__(/*! ../types */ "./src/types.ts");
var css_attribute_matcher_1 = __webpack_require__(/*! ../css-attribute-matcher */ "./src/css-attribute-matcher.ts");
var supersetSymbols = [
    types_1.CssMatcherSymbol.Prefix,
    types_1.CssMatcherSymbol.SubCode,
    types_1.CssMatcherSymbol.Equal,
];
var CssPrefixMatcher = /** @class */ (function (_super) {
    __extends(CssPrefixMatcher, _super);
    function CssPrefixMatcher() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.symbol = types_1.CssMatcherSymbol.Prefix;
        return _this;
    }
    CssPrefixMatcher.prototype.supersetOf = function (matcher) {
        if (supersetSymbols.indexOf(matcher.symbol) !== -1) {
            return matcher.value.startsWith(this.value);
        }
        return false;
    };
    CssPrefixMatcher.prototype.union = function (matcher) {
        if (this.value === matcher.value && matcher.symbol === types_1.CssMatcherSymbol.SubCode) {
            return "" + this;
        }
        return _super.prototype.union.call(this, matcher);
    };
    CssPrefixMatcher.prototype.intersection = function (matcher) {
        if (this.value === matcher.value) {
            if (matcher.symbol === types_1.CssMatcherSymbol.Equal) {
                return "=\"" + this.value + "\"";
            }
        }
        if (matcher.value.startsWith(this.value)) {
            if (matcher.symbol === types_1.CssMatcherSymbol.Prefix) {
                return "^=\"" + matcher.value + "\"";
            }
            if (matcher.symbol === types_1.CssMatcherSymbol.SubCode) {
                return "|=\"" + matcher.value + "\"";
            }
        }
        if (this.value.startsWith(matcher.value) && matcher.symbol === types_1.CssMatcherSymbol.Prefix) {
            return "^=\"" + this.value + "\"";
        }
        if (matcher.symbol === types_1.CssMatcherSymbol.Prefix && this.value !== matcher.value) {
            return void 0;
        }
        return _super.prototype.intersection.call(this, matcher);
    };
    return CssPrefixMatcher;
}(css_attribute_matcher_1.CssAttributeMatcher));
exports.CssPrefixMatcher = CssPrefixMatcher;


/***/ }),

/***/ "./src/matchers/presence-matcher.ts":
/*!******************************************!*\
  !*** ./src/matchers/presence-matcher.ts ***!
  \******************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/*! CommonJS bailout: this is used directly at 2:17-21 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CssPresenceMatcher = void 0;
var types_1 = __webpack_require__(/*! ../types */ "./src/types.ts");
var css_attribute_matcher_1 = __webpack_require__(/*! ../css-attribute-matcher */ "./src/css-attribute-matcher.ts");
var CssPresenceMatcher = /** @class */ (function (_super) {
    __extends(CssPresenceMatcher, _super);
    function CssPresenceMatcher() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.symbol = types_1.CssMatcherSymbol.Presence;
        return _this;
    }
    CssPresenceMatcher.prototype.supersetOf = function (matcher) {
        return true;
    };
    return CssPresenceMatcher;
}(css_attribute_matcher_1.CssAttributeMatcher));
exports.CssPresenceMatcher = CssPresenceMatcher;


/***/ }),

/***/ "./src/matchers/subcode-matcher.ts":
/*!*****************************************!*\
  !*** ./src/matchers/subcode-matcher.ts ***!
  \*****************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/*! CommonJS bailout: this is used directly at 2:17-21 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CssSubCodeMatcher = void 0;
var types_1 = __webpack_require__(/*! ../types */ "./src/types.ts");
var css_attribute_matcher_1 = __webpack_require__(/*! ../css-attribute-matcher */ "./src/css-attribute-matcher.ts");
var supersetSymbols = [
    types_1.CssMatcherSymbol.SubCode,
    types_1.CssMatcherSymbol.Equal,
];
var CssSubCodeMatcher = /** @class */ (function (_super) {
    __extends(CssSubCodeMatcher, _super);
    function CssSubCodeMatcher() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.symbol = types_1.CssMatcherSymbol.SubCode;
        return _this;
    }
    CssSubCodeMatcher.prototype.supersetOf = function (matcher) {
        if (supersetSymbols.indexOf(matcher.symbol) !== -1) {
            return matcher.value === this.value;
        }
        return false;
    };
    CssSubCodeMatcher.prototype.union = function (matcher) {
        if (matcher.symbol === types_1.CssMatcherSymbol.SubCode) {
            if (this.value === matcher.value) {
                return "" + this;
            }
        }
        return _super.prototype.union.call(this, matcher);
    };
    CssSubCodeMatcher.prototype.intersection = function (matcher) {
        if (this.value === matcher.value) {
            if (matcher.symbol === types_1.CssMatcherSymbol.Prefix) {
                return "|=\"" + this.value + "\"";
            }
        }
        if (this.value.startsWith(matcher.value)) {
            if (matcher.symbol === types_1.CssMatcherSymbol.Prefix) {
                return "|=\"" + this.value + "\"";
            }
        }
        return _super.prototype.intersection.call(this, matcher);
    };
    return CssSubCodeMatcher;
}(css_attribute_matcher_1.CssAttributeMatcher));
exports.CssSubCodeMatcher = CssSubCodeMatcher;


/***/ }),

/***/ "./src/matchers/suffix-matcher.ts":
/*!****************************************!*\
  !*** ./src/matchers/suffix-matcher.ts ***!
  \****************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/*! CommonJS bailout: this is used directly at 2:17-21 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CssSuffixMatcher = void 0;
var types_1 = __webpack_require__(/*! ../types */ "./src/types.ts");
var css_attribute_matcher_1 = __webpack_require__(/*! ../css-attribute-matcher */ "./src/css-attribute-matcher.ts");
var supersetSymbols = [
    types_1.CssMatcherSymbol.Suffix,
    types_1.CssMatcherSymbol.Equal,
];
var CssSuffixMatcher = /** @class */ (function (_super) {
    __extends(CssSuffixMatcher, _super);
    function CssSuffixMatcher() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.symbol = types_1.CssMatcherSymbol.Suffix;
        return _this;
    }
    CssSuffixMatcher.prototype.supersetOf = function (matcher) {
        if (supersetSymbols.indexOf(matcher.symbol) !== -1) {
            return matcher.value.endsWith(this.value);
        }
        return false;
    };
    CssSuffixMatcher.prototype.intersection = function (matcher) {
        if (matcher.symbol === types_1.CssMatcherSymbol.Suffix) {
            if (matcher.value.endsWith(this.value) || this.value.endsWith(matcher.value)) {
                var longestValue = this.value.length > matcher.value.length ? this.value : matcher.value;
                return "$=\"" + longestValue + "\"";
            }
            if (this.value !== matcher.value) {
                return void 0;
            }
        }
        return _super.prototype.intersection.call(this, matcher);
    };
    return CssSuffixMatcher;
}(css_attribute_matcher_1.CssAttributeMatcher));
exports.CssSuffixMatcher = CssSuffixMatcher;


/***/ }),

/***/ "./src/types.ts":
/*!**********************!*\
  !*** ./src/types.ts ***!
  \**********************/
/*! flagged exports */
/*! export CssMatcherSymbol [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CssTokenType [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CssMatcherSymbol = exports.CssTokenType = void 0;
var CssTokenType;
(function (CssTokenType) {
    CssTokenType[CssTokenType["Void"] = 0] = "Void";
    CssTokenType[CssTokenType["Id"] = 1] = "Id";
    CssTokenType[CssTokenType["Element"] = 2] = "Element";
    CssTokenType[CssTokenType["Class"] = 3] = "Class";
    CssTokenType[CssTokenType["Attribute"] = 4] = "Attribute";
    CssTokenType[CssTokenType["Space"] = 5] = "Space";
    CssTokenType[CssTokenType["Combinator"] = 6] = "Combinator";
    CssTokenType[CssTokenType["Separator"] = 7] = "Separator";
    CssTokenType[CssTokenType["Unknown"] = 8] = "Unknown";
})(CssTokenType = exports.CssTokenType || (exports.CssTokenType = {}));
var CssMatcherSymbol;
(function (CssMatcherSymbol) {
    CssMatcherSymbol["Presence"] = "";
    CssMatcherSymbol["Equal"] = "=";
    CssMatcherSymbol["Prefix"] = "^";
    CssMatcherSymbol["Suffix"] = "$";
    CssMatcherSymbol["Contains"] = "*";
    CssMatcherSymbol["SubCode"] = "|";
    CssMatcherSymbol["Occurrence"] = "~";
})(CssMatcherSymbol = exports.CssMatcherSymbol || (exports.CssMatcherSymbol = {}));


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./demo/index.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jc3NldC8uL2RlbW8vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vY3NzZXQvLi9kZW1vL3BsYXlncm91bmQudHMiLCJ3ZWJwYWNrOi8vY3NzZXQvLi9kZW1vL3N0ZXBzL2luZGV4LnRzIiwid2VicGFjazovL2Nzc2V0Ly4vZGVtby9zdGVwcy9ydW5uZXIudHMiLCJ3ZWJwYWNrOi8vY3NzZXQvLi9kZW1vL3N0ZXBzL3N0ZXBzLWJlZ2luLnRzIiwid2VicGFjazovL2Nzc2V0Ly4vZGVtby9zdGVwcy9zdGVwcy1pbnRlcnNlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vY3NzZXQvLi9kZW1vL3N0ZXBzL3N0ZXBzLXVuaW9uLnRzIiwid2VicGFjazovL2Nzc2V0Ly4vc3JjL2Nzcy1hdHRyaWJ1dGUtbWF0Y2hlci50cyIsIndlYnBhY2s6Ly9jc3NldC8uL3NyYy9jc3MtYXR0cmlidXRlLnRzIiwid2VicGFjazovL2Nzc2V0Ly4vc3JjL2Nzcy1ydWxlLnRzIiwid2VicGFjazovL2Nzc2V0Ly4vc3JjL2Nzcy1zZWxlY3Rvci1sZXhlci50cyIsIndlYnBhY2s6Ly9jc3NldC8uL3NyYy9jc3Mtc2VsZWN0b3IudHMiLCJ3ZWJwYWNrOi8vY3NzZXQvLi9zcmMvY3NzZXQudHMiLCJ3ZWJwYWNrOi8vY3NzZXQvLi9zcmMvbWF0Y2hlcnMvY29udGFpbnMtbWF0Y2hlci50cyIsIndlYnBhY2s6Ly9jc3NldC8uL3NyYy9tYXRjaGVycy9jc3MtbWF0Y2hlci1mYWN0b3J5LnRzIiwid2VicGFjazovL2Nzc2V0Ly4vc3JjL21hdGNoZXJzL2VxdWFsLW1hdGNoZXIudHMiLCJ3ZWJwYWNrOi8vY3NzZXQvLi9zcmMvbWF0Y2hlcnMvb2NjdXJyZW5jZS1tYXRjaGVyLnRzIiwid2VicGFjazovL2Nzc2V0Ly4vc3JjL21hdGNoZXJzL3ByZWZpeC1tYXRjaGVyLnRzIiwid2VicGFjazovL2Nzc2V0Ly4vc3JjL21hdGNoZXJzL3ByZXNlbmNlLW1hdGNoZXIudHMiLCJ3ZWJwYWNrOi8vY3NzZXQvLi9zcmMvbWF0Y2hlcnMvc3ViY29kZS1tYXRjaGVyLnRzIiwid2VicGFjazovL2Nzc2V0Ly4vc3JjL21hdGNoZXJzL3N1ZmZpeC1tYXRjaGVyLnRzIiwid2VicGFjazovL2Nzc2V0Ly4vc3JjL3R5cGVzLnRzIiwid2VicGFjazovL2Nzc2V0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2Nzc2V0L3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0VBQXFDO0FBQ3JDLG1GQUE2QztBQUM3QywwRUFBeUM7QUFJeEMsTUFBYyxDQUFDLEtBQUssR0FBRyxhQUFLLENBQUM7QUFDOUIsK0RBQStEO0FBRS9ELHlCQUF5QjtBQUN6QixJQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBeUIsQ0FBQztBQUMvRSxJQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBcUIsQ0FBQztBQUN2RSxJQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBbUIsQ0FBQztBQUNuRSxVQUFVO0FBQ1YsSUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQXNCLENBQUM7QUFHeEUseUJBQXlCO0FBQ3pCLDBCQUEwQjtBQUMxQixJQUFNLGNBQWMsR0FBRyxHQUFHLENBQUM7QUFDM0IsSUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUN6RCwwQkFBYSxDQUFDLFVBQThCLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFFOUQsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0FBRWQsVUFBVSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtJQUNuQyxJQUFJLFVBQVUsQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFFO1FBQ3RDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDekIsT0FBTztLQUNSO0lBRUQsSUFB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Ozs7VUMxQkQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7OztVQ3JCQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDc3NldCB9IGZyb20gJy4uL3NyYy9jc3NldCc7XG5pbXBvcnQgeyBzZXRQbGF5Z3JvdW5kIH0gZnJvbSAnLi9wbGF5Z3JvdW5kJztcbmltcG9ydCB7IFNURVBTLCBydW5TdGVwIH3CoGZyb20gJy4vc3RlcHMnO1xuXG5kZWNsYXJlIHZhciBobGpzOiBhbnk7XG5cbih3aW5kb3cgYXMgYW55KS5Dc3NldCA9IENzc2V0O1xuLy8gKHdpbmRvdyBhcyBhbnkpLmNyZWF0ZVNldCA9IChzZWw6IHN0cmluZykgPT4gbmV3IENzc2V0KHNlbCk7XG5cbi8vIFdoZXJlIHRvIHB1dCBzdGVwIGluZm9cbmNvbnN0IGNvbW1lbnRBcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbW1lbnQnKSBhcyBIVE1MUGFyYWdyYXBoRWxlbWVudDtcbmNvbnN0IHN0eWxlQXJlYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdHlsZScpIGFzIEhUTUxTdHlsZUVsZW1lbnQ7XG5jb25zdCBjb2RlQXJlYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb2RlJykgYXMgSFRNTFByZUVsZW1lbnQ7XG4vLyBDb250cm9sXG5jb25zdCBuZXh0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25leHQnKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcblxuXG4vLyBQcmVwYXJlIHRoZSBwbGF5Z3JvdW5kXG4vLyBTaXplIE1VU1QgYmUgb2RkIG51bWJlclxuY29uc3QgcGxheWdyb3VuZFNpemUgPSAxMDE7XG5jb25zdCBwbGF5Z3JvdW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BsYXlncm91bmQnKTtcbnNldFBsYXlncm91bmQocGxheWdyb3VuZCBhcyBIVE1MVGFibGVFbGVtZW50LCBwbGF5Z3JvdW5kU2l6ZSk7XG5cbmxldCBpbmRleCA9IDA7XG5cbm5leHRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGlmIChuZXh0QnV0dG9uLmlubmVyVGV4dCA9PT0gJ1Jlc3RhcnQnKSB7XG4gICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHN0ZXAgPSBTVEVQU1tpbmRleCsrXTtcblxuICAvLyBQdXQgY29tbWVudCBhbmQgZGlzcGxheSBzbmlwcGV0XG4gIHJ1blN0ZXAoc3RlcCwgY29tbWVudEFyZWEsIGNvZGVBcmVhLCBzdHlsZUFyZWEpO1xuICBobGpzLmhpZ2hsaWdodEJsb2NrKGNvZGVBcmVhKTtcblxuICBpZiAoaW5kZXggPj0gU1RFUFMubGVuZ3RoKSB7XG4gICAgbmV4dEJ1dHRvbi5pbm5lclRleHQgPSAnUmVzdGFydCc7XG4gIH1cbn0pOyIsIlxuLy8gRGl2aWRlIHRoZSBncmlkIGluIDQgcXVhZHJhbnRzXG5mdW5jdGlvbiBtYXJrUXVhZHJhbnQodGQ6IEhUTUxUYWJsZUNlbGxFbGVtZW50LCByb3c6IG51bWJlciwgY29sOiBudW1iZXIsIHNpemU6IG51bWJlcik6IHZvaWQge1xuICBjb25zdCBtaWRkbGUgPSBNYXRoLmZsb29yKHNpemUgLyAyKTtcbiAgbGV0IHF1YWRyYW50ID0gJyc7XG5cbiAgaWYgKHJvdyA8IG1pZGRsZSkge1xuICAgIHF1YWRyYW50ID0gY29sIDwgbWlkZGxlID8gJ29uZScgOiBjb2wgPiBtaWRkbGUgPyAndHdvJyA6ICcnO1xuICB9IGVsc2UgaWYgKHJvdyA+IG1pZGRsZSApe1xuICAgIHF1YWRyYW50ID0gY29sIDwgbWlkZGxlID8gJ3RocmVlJyA6IGNvbCA+IG1pZGRsZSA/ICdmb3VyJyA6ICcnO1xuICB9XG5cbiAgaWYgKHF1YWRyYW50KSB7XG4gICAgdGQuY2xhc3NMaXN0LmFkZChgcXVhZHJhbnQtJHtxdWFkcmFudH1gKTtcbiAgfVxufVxuXG4vLyBQdXQgYSByaG9tYnVzIGluIHRoZSBtaWRkbGVcbmZ1bmN0aW9uIG1hcmtSaG9tYnVzKHRkOiBIVE1MVGFibGVDZWxsRWxlbWVudCwgcm93OiBudW1iZXIsIGNvbDogbnVtYmVyLCBzaXplOiBudW1iZXIpOiB2b2lkIHtcbiAgY29uc3QgZGlmZiA9IChyb3cgPCBzaXplIC8gMikgPyByb3cgOiBzaXplIC0gcm93IC0gMTtcbiAgY29uc3QgaGlnaCA9IChzaXplIC8gMikgKyBkaWZmO1xuICBjb25zdCBsb3cgPSAoc2l6ZSAvIDIpIC0gZGlmZiAtIDE7XG5cbiAgaWYgKGxvdyA8PSBjb2wgJiYgY29sIDw9IGhpZ2gpIHtcbiAgICB0ZC5jbGFzc0xpc3QuYWRkKGBkaWFtb25kYCk7XG4gIH1cbn1cblxuLy8gQWxzbyBhIGNpcmNsZVxuZnVuY3Rpb24gbWFya0NpcmNsZSh0ZDogSFRNTFRhYmxlQ2VsbEVsZW1lbnQsIHJvdzogbnVtYmVyLCBjb2w6IG51bWJlciwgc2l6ZTogbnVtYmVyKTogdm9pZCB7XG4gIGNvbnN0IHJhZGl1cyA9IE1hdGguZmxvb3Ioc2l6ZSAvIDIpO1xuICBjb25zdCBjZW50ZXIgPSB7IHg6IHJhZGl1cywgeTogcmFkaXVzIH07XG4gIGNvbnN0IGRpc3RhbmNlID0gTWF0aC5zcXJ0KFxuICAgIE1hdGgucG93KE1hdGguYWJzKGNlbnRlci54IC0gY29sKSwgMikgK1xuICAgIE1hdGgucG93KE1hdGguYWJzKGNlbnRlci55IC0gcm93KSwgMilcbiAgKTtcblxuICBpZiAoZGlzdGFuY2UgPD0gcmFkaXVzKSB7XG4gICAgdGQuY2xhc3NMaXN0LmFkZChgY2lyY2xlYCk7XG4gIH1cbn1cblxuLy8gbWFuIGZ1bmN0aW9uIHdoaWNoIGNyZWF0ZXMgdGhlIHBsYXlncm91bmQgZ3JpZFxuZXhwb3J0IGZ1bmN0aW9uIHNldFBsYXlncm91bmQodGFibGU6IEhUTUxUYWJsZUVsZW1lbnQsIHNpemU6IG51bWJlcik6IHZvaWQge1xuXG4gIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IHNpemU7IHJvdysrKSB7XG4gICAgY29uc3QgdHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xuICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IHNpemU7IGNvbCsrKSB7XG4gICAgICBjb25zdCB0ZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gICAgICBjb25zdCBzdW0gPSAocm93ICogc2l6ZSkgKyBjb2w7XG4gIFxuICAgICAgdGQuc2V0QXR0cmlidXRlKCdjbGFzcycsICd0aWxlJyk7XG4gICAgICB0ZC5zZXRBdHRyaWJ1dGUoJ2Qtcm93JywgYCR7cm93fWApO1xuICAgICAgdGQuc2V0QXR0cmlidXRlKCdkLWNvbCcsIGAke2NvbH1gKTtcbiAgICAgIHRkLnNldEF0dHJpYnV0ZSgnZC1zdW0nLCBgJHtzdW19YCk7XG4gICAgICB0ZC5zZXRBdHRyaWJ1dGUoJ2Qtb2RkJywgYCR7c3VtICUgMiA9PT0gMH1gKTtcbiAgICAgIHRkLnNldEF0dHJpYnV0ZSgnZC1ldmVuJywgYCR7c3VtICUgMiA9PT0gMX1gKTtcbiAgICAgIC8vIHRkLmlubmVyVGV4dCA9IGAke3N1bX1gO1xuXG4gICAgICBtYXJrUXVhZHJhbnQodGQsIHJvdywgY29sLCBzaXplKTtcbiAgICAgIG1hcmtDaXJjbGUodGQsIHJvdywgY29sLCBzaXplKTtcbiAgICAgIG1hcmtSaG9tYnVzKHRkLCByb3csIGNvbCwgc2l6ZSk7XG4gICAgICB0ci5hcHBlbmRDaGlsZCh0ZCk7XG4gICAgfVxuICAgIHRhYmxlLmFwcGVuZENoaWxkKHRyKTtcbiAgfVxufSIsImltcG9ydCB7IFNURVBTX0JFR0lOIH0gZnJvbSAnLi9zdGVwcy1iZWdpbic7XG5pbXBvcnQgeyBTVEVQU19VTklPTiB9IGZyb20gJy4vc3RlcHMtdW5pb24nO1xuaW1wb3J0IHsgU1RFUFNfSU5URVJTRUNUSU9OIH0gZnJvbSAnLi9zdGVwcy1pbnRlcnNlY3Rpb24nO1xuXG5leHBvcnQgKiBmcm9tICcuL3J1bm5lcic7XG5leHBvcnQgY29uc3QgU1RFUFMgPSBbXG4gIC4uLlNURVBTX0JFR0lOLFxuICAuLi5TVEVQU19VTklPTixcbiAgLi4uU1RFUFNfSU5URVJTRUNUSU9OLFxuXTtcbiIsImltcG9ydCB7IFN0ZXAgfcKgZnJvbSAnLi90eXBlcyc7XG5cbmZ1bmN0aW9uIGdldFJhbmRvbUNvbG9yKCk6IHN0cmluZyB7XG4gIHZhciBsZXR0ZXJzID0gJzAxMjM0NTY3ODlBQkNERUYnO1xuICB2YXIgY29sb3IgPSAnIyc7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgNjsgaSsrKSB7XG4gICAgY29sb3IgKz0gbGV0dGVyc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxNildO1xuICB9XG4gIHJldHVybiBjb2xvcjtcbn1cblxuZnVuY3Rpb24gaXNDc3NldChzb3VyY2U6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gc291cmNlPy5fX3Byb3RvX18/LmNvbnN0cnVjdG9yPy5uYW1lID09PSAnQ3NzZXQnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcnVuU3RlcChcbiAgc3RlcDogU3RlcCxcbiAgY29tbWVudEVsZW06IEhUTUxFbGVtZW50LFxuICBjb2RlRWxlbTogSFRNTEVsZW1lbnQsXG4gIHN0eWVFbGVtOiBIVE1MRWxlbWVudFxuKTogdm9pZCB7XG4gIC8vIFB1dCBjb21tZW50XG4gIGNvbW1lbnRFbGVtLmlubmVyVGV4dCA9IHN0ZXAuY29tbWVudDtcblxuICAvLyBTaG93IGNvZGVcbiAgY29uc3Qgc291cmNlID0gc3RlcC5jb2RlLnRvU3RyaW5nKCk7XG4gIGNvbnN0IGxpbmVzT2ZDb2RlID0gc291cmNlLnNwbGl0KCdcXG4nKS5zbGljZSgxLCAtMSkubWFwKGxpbmUgPT4ge1xuICAgIHJldHVybiBsaW5lLnJlcGxhY2UoL3JldHVybiAvZywgJycpO1xuICB9KTtcblxuICBjb2RlRWxlbS5pbm5lclRleHQgPSBsaW5lc09mQ29kZS5qb2luKCdcXG4nKTtcblxuICAvLyBDaGFuZ2UgY29sb3IgaWYgcmV0dXJuZWQgZXhwcmVzc2lvbiBpcyBhIENzc2V0XG4gIGNvbnN0IGV2YWxSZXN1bHQgPSBldmFsKGAoJHtzb3VyY2V9KSgpYCk7XG4gIGNvbnN0IHN0eWxlVGV4dCA9IGAke2V2YWxSZXN1bHR9eyBiYWNrZ3JvdW5kLWNvbG9yOiAke2dldFJhbmRvbUNvbG9yKCl9OyB9YDtcblxuICBpZiAoaXNDc3NldChldmFsUmVzdWx0KSkge1xuICAgIHN0eWVFbGVtLmlubmVyVGV4dCA9IHN0eWxlVGV4dDtcbiAgfSBlbHNlIHtcbiAgICBzdHllRWxlbS5pbm5lclRleHQgPSAnJztcbiAgfVxufVxuIiwiaW1wb3J0IHsgU3RlcCB9IGZyb20gJy4vdHlwZXMnO1xuXG5kZWNsYXJlIHZhciBDc3NldDogYW55O1xuXG5leHBvcnQgY29uc3QgU1RFUFNfQkVHSU46IFN0ZXBbXSA9IFtcbiAge1xuICAgIGNvbW1lbnQ6IFwiVGhlc2UgYXJlIHRoZSBjZWxscyB3aXRoIGNsYXNzIHF1YWRyYW50LW9uZVwiLFxuICAgIGNvZGU6ICgpID0+IHtcbiAgICAgIHJldHVybiBuZXcgQ3NzZXQoJy5xdWFkcmFudC1vbmUnKTtcbiAgICB9XG4gIH0sXG4gIHtcbiAgICBjb21tZW50OiBcIlRoZXNlIGFyZSB0aGUgY2VsbHMgd2l0aCBjbGFzcyBxdWFkcmFudC10d29cIixcbiAgICBjb2RlOiAoKSA9PiB7XG4gICAgICByZXR1cm4gbmV3IENzc2V0KCcucXVhZHJhbnQtdHdvJyk7XG4gICAgfVxuICB9LFxuICB7XG4gICAgY29tbWVudDogXCJUaGVzZSBhcmUgdGhlIGNlbGxzIHdpdGggY2xhc3MgcXVhZHJhbnQtdGhyZWVcIixcbiAgICBjb2RlOiAoKSA9PiB7XG4gICAgICByZXR1cm4gbmV3IENzc2V0KCcucXVhZHJhbnQtdGhyZWUnKTtcbiAgICB9XG4gIH0sXG4gIHtcbiAgICBjb21tZW50OiBcIlRoZXNlIGFyZSB0aGUgY2VsbHMgd2l0aCBjbGFzcyBxdWFkcmFudC1mb3VyXCIsXG4gICAgY29kZTogKCkgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBDc3NldCgnLnF1YWRyYW50LWZvdXInKTtcbiAgICB9XG4gIH0sXG4gIHtcbiAgICBjb21tZW50OiBcIlRoZXNlIGFyZSB0aGUgY2VsbHMgd2l0aCBjbGFzcyBjaXJjbGVcIixcbiAgICBjb2RlOiAoKSA9PiB7XG4gICAgICByZXR1cm4gbmV3IENzc2V0KCcuY2lyY2xlJyk7XG4gICAgfVxuICB9LFxuICB7XG4gICAgY29tbWVudDogXCJUaGVzZSBhcmUgdGhlIGNlbGxzIHdpdGggY2xhc3MgZGlhbW9uZFwiLFxuICAgIGNvZGU6ICgpID0+IHtcbiAgICAgIHJldHVybiBuZXcgQ3NzZXQoJy5kaWFtb25kJyk7XG4gICAgfVxuICB9LFxuICB7XG4gICAgY29tbWVudDogXCJDZWxscyBhbHNvIGNvbnRhaW4gYSBkLXJvdyBhdHRyaWJ1dGUgd2l0aCB0aGUgcm93IG51bWJlciB0aGV5IGhhdmVcIixcbiAgICBjb2RlOiAoKSA9PiB7XG4gICAgICByZXR1cm4gbmV3IENzc2V0KCdbZC1yb3c9NV0nKTtcbiAgICB9XG4gIH0sXG4gIHtcbiAgICBjb21tZW50OiBcIkFuZCBjb250YWluIGEgZC1jb2wgYXR0cmlidXRlIHdpdGggdGhlIGNvbHVtbiBudW1iZXIgdGhleSBoYXZlXCIsXG4gICAgY29kZTogKCkgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBDc3NldCgnW2QtY29sPTUwXScpO1xuICAgIH1cbiAgfSxcbiAge1xuICAgIGNvbW1lbnQ6IFwiRWFjaCBjZWxsIG9mIHRoZSBncmlkIGhhcyBpdHMgbnVtYmVyIGluIGEgZC1zdW0gYXR0cmlidXRlXCIsXG4gICAgY29kZTogKCkgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBDc3NldCgnW2Qtc3VtPTUwXScpO1xuICAgIH1cbiAgfSxcbiAge1xuICAgIGNvbW1lbnQ6IFwiQWRkIHRoZSBjZWxsIGhhcyBtYXJrZWQgaWYgaXRzIG9kZCBudW1iZXJcIixcbiAgICBjb2RlOiAoKSA9PiB7XG4gICAgICByZXR1cm4gbmV3IENzc2V0KCdbZC1vZGQ9dHJ1ZV0nKTtcbiAgICB9XG4gIH0sXG4gIHtcbiAgICBjb21tZW50OiBcIk9yIGV2ZW4gbnVtYmVyXCIsXG4gICAgY29kZTogKCkgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBDc3NldCgnW2QtZXZlbj10cnVlXScpO1xuICAgIH1cbiAgfSxcbl07XG4iLCJpbXBvcnQgeyBTdGVwIH0gZnJvbSAnLi90eXBlcyc7XG5cbmRlY2xhcmUgdmFyIENzc2V0OiBhbnk7XG5cbmV4cG9ydCBjb25zdCBTVEVQU19JTlRFUlNFQ1RJT046IFN0ZXBbXSA9IFtcbiAge1xuICAgIGNvbW1lbnQ6IFwiSW50ZXJzZWN0aW9uIHJldHVybnMgYSBzZXQgd2hpY2ggYWxsIGVsZW1lbnRzIGFyZSBmcm9tIGJvdGggc2V0c1wiLFxuICAgIGNvZGU6ICgpID0+IHtcbiAgICAgIGNvbnN0IHF1YWRyYW50T25lID0gbmV3IENzc2V0KCcucXVhZHJhbnQtb25lJyk7XG4gICAgICBjb25zdCByaG9tYnVzID0gbmV3IENzc2V0KCcucmhvbWJ1cycpO1xuXG4gICAgICByZXR1cm4gcXVhZHJhbnRPbmUuaW50ZXJzZWN0aW9uKHJob21idXMpO1xuICAgIH1cbiAgfSxcbl07XG4iLCJpbXBvcnQgeyBTdGVwIH0gZnJvbSAnLi90eXBlcyc7XG5cbmRlY2xhcmUgdmFyIENzc2V0OiBhbnk7XG5cbmV4cG9ydCBjb25zdCBTVEVQU19VTklPTjogU3RlcFtdID0gW1xuICB7XG4gICAgY29tbWVudDogXCJVbmlvbiBpcyBhIHN0cmFpZ2h0IGZvcndhcmQgbWV0aG9kIHVzZWQgdG8gam9pbiBzZXRzXCIsXG4gICAgY29kZTogKCkgPT4ge1xuICAgICAgY29uc3QgcXVhZHJhbnRPbmUgPSBuZXcgQ3NzZXQoJy5xdWFkcmFudC1vbmUnKTtcbiAgICAgIGNvbnN0IHF1YWRyYW50VHdvID0gbmV3IENzc2V0KCcucXVhZHJhbnQtdHdvJyk7XG5cbiAgICAgIHJldHVybiBxdWFkcmFudE9uZS51bmlvbihxdWFkcmFudFR3byk7XG4gICAgfVxuICB9LFxuICB7XG4gICAgY29tbWVudDogXCJZb3UgY2FuIGRvIGFuIHVuaW9uIG9mIG1hbnkgc2V0c1wiLFxuICAgIGNvZGU6ICgpID0+IHtcbiAgICAgIGNvbnN0IHF1YWRyYW50T25lID0gbmV3IENzc2V0KCcucXVhZHJhbnQtb25lJyk7XG4gICAgICBjb25zdCBxdWFkcmFudFR3byA9IG5ldyBDc3NldCgnLnF1YWRyYW50LXR3bycpO1xuICAgICAgY29uc3QgY2lyY2xlID0gbmV3IENzc2V0KCcuY2lyY2xlJyk7XG5cbiAgICAgIHJldHVybiBxdWFkcmFudE9uZS51bmlvbihxdWFkcmFudFR3bykudW5pb24oY2lyY2xlKTtcbiAgICB9XG4gIH0sXG5dO1xuIiwiaW1wb3J0IHsgQ3NzTWF0Y2hlclN5bWJvbCB9IGZyb20gXCIuL3R5cGVzXCI7XG5cblxuZXhwb3J0IGNsYXNzIENzc0F0dHJpYnV0ZU1hdGNoZXIge1xuICByZWFkb25seSBzeW1ib2w6IENzc01hdGNoZXJTeW1ib2w7XG4gIHZhbHVlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IgKHZhbDogc3RyaW5nKSB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbDtcbiAgfVxuXG4gIHN1cGVyc2V0T2YgKCBtYXRjaGVyOiBDc3NBdHRyaWJ1dGVNYXRjaGVyICk6IGJvb2xlYW4ge1xuICAgIHRocm93IEVycm9yKGBubyBzdXBlcnNldE9mIG1ldGhvZCBpbXBsZW1lbnRlZCBmb3IgbWF0Y2hlciBzeW1ib2wgJHt0aGlzLnN5bWJvbH1gKTtcbiAgfVxuXG4gIHN1YnNldE9mICggbWF0Y2hlcjogQ3NzQXR0cmlidXRlTWF0Y2hlciApOiBib29sZWFuIHtcbiAgICByZXR1cm4gbWF0Y2hlci5zdXBlcnNldE9mKHRoaXMpO1xuICB9XG5cbiAgdW5pb24gKCBtYXRjaGVyOiBDc3NBdHRyaWJ1dGVNYXRjaGVyICk6IHN0cmluZyB8IG51bGwge1xuICAgIGlmICggdGhpcy5zdXBlcnNldE9mKG1hdGNoZXIpICkge1xuICAgICAgcmV0dXJuIGAke3RoaXN9YDtcbiAgICB9IGVsc2UgaWYgKCBtYXRjaGVyLnN1cGVyc2V0T2YodGhpcykgKSB7XG4gICAgICByZXR1cm4gYCR7bWF0Y2hlcn1gO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgaW50ZXJzZWN0aW9uICggbWF0Y2hlcjogQ3NzQXR0cmlidXRlTWF0Y2hlciApOiBzdHJpbmcgfCBudWxsIHwgdm9pZCB7XG4gICAgaWYgKCB0aGlzLnN1cGVyc2V0T2YobWF0Y2hlcikgKSB7XG4gICAgICByZXR1cm4gYCR7bWF0Y2hlcn1gO1xuICAgIH0gZWxzZSBpZiAoIG1hdGNoZXIuc3VwZXJzZXRPZih0aGlzKSApIHtcbiAgICAgIHJldHVybiBgJHt0aGlzfWA7XG4gICAgfVxuXG4gICAgLy8gRXF1YWxzIGludGVyc2VjdCB3aXRoIGFueSBvdGhlciBtYXRjaGVyXG4gICAgLy8gUmV0dXJuIHZvaWQgaW5kaWNhdGluZyB0aGUgaW50ZXJzZWN0aW9uIGlzIGFuIGVtcHR5IHNldFxuICAgIGlmICggW3RoaXMuc3ltYm9sLCBtYXRjaGVyLnN5bWJvbF0uaW5kZXhPZihDc3NNYXRjaGVyU3ltYm9sLkVxdWFsKSAhPT0gLTEgKSB7XG4gICAgICBpZiAobWF0Y2hlci52YWx1ZSAhPT0gdGhpcy52YWx1ZSkge1xuICAgICAgICByZXR1cm4gdm9pZCAwO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5zeW1ib2wgPT09IENzc01hdGNoZXJTeW1ib2wuUHJlc2VuY2UpIHtcbiAgICAgIHJldHVybiBgYFxuICAgIH1cbiAgICByZXR1cm4gYCR7dGhpcy5zeW1ib2x9PVwiJHt0aGlzLnZhbHVlfVwiYC5yZXBsYWNlKC9ePS8sICcnKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ3NzQXR0cmlidXRlTWF0Y2hlciB9IGZyb20gJy4vY3NzLWF0dHJpYnV0ZS1tYXRjaGVyJztcbmltcG9ydCB7IENzc01hdGNoZXJGYWN0b3J5IH0gZnJvbSAnLi9tYXRjaGVycy9jc3MtbWF0Y2hlci1mYWN0b3J5JztcblxuZXhwb3J0IGNsYXNzIENzc0F0dHJpYnV0ZSB7XG4gIG5hbWUgICAgOiBzdHJpbmc7XG4gIG1hdGNoZXJzOiBDc3NBdHRyaWJ1dGVNYXRjaGVyW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvciAoW25hbWUsIHN5bWJvbCwgdmFsdWVdOiBzdHJpbmdbXSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgc3ltYm9sICAgID0gc3ltYm9sIHx8wqAnJztcbiAgICB2YWx1ZSAgICAgPSB2YWx1ZTtcblxuICAgIGNvbnN0IG1hdGNoZXIgPSBDc3NNYXRjaGVyRmFjdG9yeS5jcmVhdGUoYCR7c3ltYm9sfSR7dmFsdWV9YCk7XG4gICAgbGV0IGludGVyc2VjdGlvbjtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5tYXRjaGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgaW50ZXJzZWN0aW9uID0gbWF0Y2hlci5pbnRlcnNlY3Rpb24odGhpcy5tYXRjaGVyc1tpXSk7XG4gICAgICBcbiAgICAgIGlmIChpbnRlcnNlY3Rpb24pIHtcbiAgICAgICAgdGhpcy5tYXRjaGVyc1tpXSA9IENzc01hdGNoZXJGYWN0b3J5LmNyZWF0ZShpbnRlcnNlY3Rpb24pO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWludGVyc2VjdGlvbikge1xuICAgICAgdGhpcy5tYXRjaGVycy5wdXNoKG1hdGNoZXIpO1xuICAgIH1cbiAgfVxuXG4gIHN1cGVyc2V0T2YgKCBhdHRyOiBDc3NBdHRyaWJ1dGUgKTogYm9vbGVhbiB7XG4gICAgY29uc3QgdGhpc01hdGNoZXJzID0gdGhpcy5tYXRjaGVycztcbiAgICBjb25zdCBhdHRyTWF0Y2hlcnMgPSBhdHRyLm1hdGNoZXJzO1xuXG4gICAgLy8gVG8gYmUgYSBzdXBlcnNldCBhbGwgbWF0Y2hlcnMgaW4gdGhpc1xuICAgIC8vIC0gbXVzdCBiZSBhIHN1cGVyc2V0IG9mIGF0IGxlYXN0IG9uZSBhdHRyTWF0Y2hlclxuICAgIC8vIC0gbXVzdCBub3QgaGF2ZSBhIHZvaWQgaW50ZXJzZWN0aW9uIHdpdGggYW55IGF0dHJNYXRjaGVyXG4gICAgZm9yIChsZXQgbWF0Y2hlciBvZiB0aGlzTWF0Y2hlcnMpIHtcbiAgICAgIGNvbnN0IHN1cGVyc2V0SW5kZXggPSBhdHRyTWF0Y2hlcnMuZmluZEluZGV4KChhdHRyTWF0Y2hlcikgPT4gbWF0Y2hlci5zdXBlcnNldE9mKGF0dHJNYXRjaGVyKSk7XG4gICAgICBjb25zdCB2b2lkSW5kZXggPSBhdHRyTWF0Y2hlcnMuZmluZEluZGV4KChhdHRyTWF0Y2hlcikgPT4gbWF0Y2hlci5pbnRlcnNlY3Rpb24oYXR0ck1hdGNoZXIpID09PSB2b2lkIDApO1xuXG4gICAgICBpZiAoIHN1cGVyc2V0SW5kZXggPT09IC0xIHx8IHZvaWRJbmRleCAhPT0gLTEgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHN1YnNldE9mICggYXR0cjogQ3NzQXR0cmlidXRlICk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBhdHRyLnN1cGVyc2V0T2YodGhpcyk7XG4gIH1cblxuICB1bmlvbiggYXR0cjogQ3NzQXR0cmlidXRlICk6IENzc0F0dHJpYnV0ZSB8IG51bGwge1xuICAgIGNvbnN0IHVuaW9uID0gdGhpcy5zdXBlcnNldE9mKGF0dHIpID8gdGhpcyA6XG4gICAgICAgICAgICAgICAgICBhdHRyLnN1cGVyc2V0T2YodGhpcykgPyBhdHRyIDogbnVsbDtcblxuICAgIHJldHVybiB1bmlvbjtcbiAgfVxuXG4gIGludGVyc2VjdGlvbiggYXR0cjogQ3NzQXR0cmlidXRlICk6IENzc0F0dHJpYnV0ZSB8IHZvaWQge1xuICAgIGlmICggdGhpcy5zdXBlcnNldE9mKGF0dHIpICkge1xuICAgICAgcmV0dXJuIGF0dHI7XG4gICAgfVxuXG4gICAgaWYgKCBhdHRyLnN1cGVyc2V0T2YodGhpcykgKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBjb25zdCB0aGlzTWF0Y2hlcnMgPSB0aGlzLm1hdGNoZXJzO1xuICAgIGNvbnN0IGF0dHJNYXRjaGVycyA9IGF0dHIubWF0Y2hlcnM7XG4gICAgY29uc3QgaW50ZXJzZWN0aW9uTWF0Y2hlcnM6IENzc0F0dHJpYnV0ZU1hdGNoZXJbXSA9IFtdO1xuXG4gICAgZm9yICggbGV0IG1hdGNoZXIgb2YgdGhpc01hdGNoZXJzICkge1xuICAgICAgY29uc3Qgdm9pZEluZGV4ID0gYXR0ck1hdGNoZXJzLmZpbmRJbmRleCgoYXR0ck1hdGNoZXIpID0+IG1hdGNoZXIuaW50ZXJzZWN0aW9uKGF0dHJNYXRjaGVyKSA9PT0gdm9pZCAwKTtcblxuICAgICAgaWYgKCB2b2lkSW5kZXggIT09IC0xICkge1xuICAgICAgICByZXR1cm4gdm9pZCAwO1xuICAgICAgfVxuICAgICAgXG4gICAgICBjb25zdCBpbnRlcnNlY3RJbmRleCA9IGF0dHJNYXRjaGVycy5maW5kSW5kZXgoKGF0dHJNYXRjaGVyKSA9PiAhIW1hdGNoZXIuaW50ZXJzZWN0aW9uKGF0dHJNYXRjaGVyKSk7XG5cbiAgICAgIGlmICggaW50ZXJzZWN0SW5kZXggIT09IC0xICkge1xuICAgICAgICBjb25zdCBtYXRjaGVyU3RyaW5nID0gbWF0Y2hlci5pbnRlcnNlY3Rpb24oYXR0ck1hdGNoZXJzW2ludGVyc2VjdEluZGV4XSk7XG5cbiAgICAgICAgaW50ZXJzZWN0aW9uTWF0Y2hlcnMucHVzaChDc3NNYXRjaGVyRmFjdG9yeS5jcmVhdGUoYCR7bWF0Y2hlclN0cmluZ31gKSk7XG4gICAgICAgIGF0dHJNYXRjaGVycy5zcGxpY2UoaW50ZXJzZWN0SW5kZXgsIDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW50ZXJzZWN0aW9uTWF0Y2hlcnMucHVzaChtYXRjaGVyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKCBsZXQgbWF0Y2hlciBvZiBhdHRyTWF0Y2hlcnMgKSB7XG4gICAgICBpbnRlcnNlY3Rpb25NYXRjaGVycy5wdXNoKG1hdGNoZXIpO1xuICAgIH1cblxuICAgIGNvbnN0IGludGVyc2VjdGlvbkF0dHIgPSBuZXcgQ3NzQXR0cmlidXRlKFt0aGlzLm5hbWVdKTtcbiAgICBpbnRlcnNlY3Rpb25BdHRyLm1hdGNoZXJzID0gaW50ZXJzZWN0aW9uTWF0Y2hlcnM7XG5cbiAgICByZXR1cm4gaW50ZXJzZWN0aW9uQXR0cjtcbiAgfVxuXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubWF0Y2hlcnNcbiAgICAgIC5tYXAobWF0Y2hlciA9PiBgJHttYXRjaGVyfWApXG4gICAgICAuc29ydCgpXG4gICAgICAucmVkdWNlKChwcmV2LCBtYXRjaGVyKSA9PiBgJHtwcmV2fVske3RoaXMubmFtZX0ke21hdGNoZXJ9XWAsICcnKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ3NzQXR0cmlidXRlIH0gZnJvbSAnLi9jc3MtYXR0cmlidXRlJztcblxuZXhwb3J0IGNsYXNzIENzc1J1bGUge1xuICBwcml2YXRlIF9pZCAgICAgIDogc3RyaW5nO1xuICBwcml2YXRlIF9lbGVtZW50IDogc3RyaW5nO1xuICBjbGFzc2VzIDogU2V0PHN0cmluZz4gPSBuZXcgU2V0KCk7XG4gIGF0dHJpYnMgOiBNYXA8c3RyaW5nLCBDc3NBdHRyaWJ1dGU+ID0gbmV3IE1hcCgpO1xuXG4gIHNldCBpZChpZDogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuX2lkKSB7XG4gICAgICB0aHJvdyBTeW50YXhFcnJvcihgSWRlbnRpZmllciBhbHJlYWR5IHNldCB0byAke3RoaXMuaWR9LmApXG4gICAgfVxuICAgIHRoaXMuX2lkID0gaWQ7XG4gIH1cblxuICBnZXQgaWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5faWQ7XG4gIH1cblxuICBzZXQgZWxlbWVudChlbGVtZW50OiBzdHJpbmcpIHtcbiAgICBpZih0aGlzLmF0dHJpYnMuc2l6ZSkge1xuICAgICAgdGhyb3cgU3ludGF4RXJyb3IoYEVsZW1lbnRzIGNhbm5vdCBiZSBkZWZpbmVkIGFmdGVyIGF0dHJpYnV0ZXMuYCk7XG4gICAgfVxuICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICB9XG4gIGdldCBlbGVtZW50KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnQgfHwgJyonO1xuICB9XG5cbiAgYWRkQXR0cmlidXRlKGF0dHJpYnV0ZTogQ3NzQXR0cmlidXRlKSB7XG4gICAgY29uc3QgcHJldkF0dHJpYnV0ZSA9IHRoaXMuYXR0cmlicy5nZXQoYXR0cmlidXRlLm5hbWUpXG5cbiAgICBpZiAocHJldkF0dHJpYnV0ZSkge1xuICAgICAgY29uc3QgbWVyZ2VkQXR0cmlidXRlID0gcHJldkF0dHJpYnV0ZS5pbnRlcnNlY3Rpb24oYXR0cmlidXRlKTtcblxuICAgICAgaWYgKG1lcmdlZEF0dHJpYnV0ZSA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYFRoZSBzZWxlY3RvciBkZWZpbmVzIGFuIGVtcHR5IHNldC5gKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYXR0cmlicy5zZXQocHJldkF0dHJpYnV0ZS5uYW1lLCBtZXJnZWRBdHRyaWJ1dGUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmF0dHJpYnMuc2V0KGF0dHJpYnV0ZS5uYW1lLCBhdHRyaWJ1dGUpO1xuICAgIH1cbiAgfVxuXG4gIGFkZENsYXNzICggY2xhc3NOYW1lOiBzdHJpbmcgKSB7XG4gICAgdGhpcy5jbGFzc2VzLmFkZChjbGFzc05hbWUpO1xuICB9XG5cbiAgZXF1YWxzICggcnVsZTogQ3NzUnVsZSApOiBib29sZWFuIHtcbiAgICByZXR1cm4gYCR7dGhpc31gID09PSBgJHtydWxlfWA7XG4gIH1cblxuICBzdXBlcnNldE9mICggcnVsZTogQ3NzUnVsZSApOiBib29sZWFuIHtcbiAgICAvLyBFbGVtZW50XG4gICAgaWYgKHRoaXMuZWxlbWVudCAhPT0gJyonICYmIHRoaXMuZWxlbWVudCAhPT0gcnVsZS5lbGVtZW50KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gSURcbiAgICBpZiAodGhpcy5pZCAmJiB0aGlzLmlkICE9PSBydWxlLmlkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gY2xhc3Nlc1xuICAgIGZvciAobGV0IGMgb2YgdGhpcy5jbGFzc2VzKSB7XG4gICAgICBpZiAoIXJ1bGUuY2xhc3Nlcy5oYXMoYykpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEF0dHJpYnV0ZXNcbiAgICAvLyBNb3JlIGF0dHJpYnMgbWVhbiBtb3JlIHNwZWNpZmljIHNvIGl0IGNhbm5vdCBiZSBzdXBlcnNldFxuICAgIGlmICh0aGlzLmF0dHJpYnMuc2l6ZSA+IHJ1bGUuYXR0cmlicy5zaXplKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgLy8gQ2hlY2sgYXR0cmlidXRlc1xuICAgIGZvciAobGV0IGF0dHIgb2YgdGhpcy5hdHRyaWJzLnZhbHVlcygpKSB7XG4gICAgICBjb25zdCBydWxlQXR0ciA9IHJ1bGUuYXR0cmlicy5nZXQoYXR0ci5uYW1lKTtcblxuICAgICAgLy8gYXR0cmliIHNob3VsZCBiZSBkZWZpbmVkIGluIGJvdGggYW5kIGluY2x1ZGUgXG4gICAgICBpZiAocnVsZUF0dHIgJiYgIWF0dHIuc3VwZXJzZXRPZihydWxlQXR0cikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSBlbHNlIGlmICghcnVsZUF0dHIpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgc3Vic2V0T2YgKCBydWxlOiBDc3NSdWxlICk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBydWxlLnN1cGVyc2V0T2YodGhpcyk7XG4gIH1cblxuICB1bmlvbiggcnVsZTogQ3NzUnVsZSApOiBDc3NSdWxlW10ge1xuICAgIGNvbnN0IHVuaW9uID0gdGhpcy5zdXBlcnNldE9mKHJ1bGUpID8gW3RoaXNdIDpcbiAgICAgICAgICAgICAgICAgIHJ1bGUuc3VwZXJzZXRPZih0aGlzKSA/IFtydWxlXSA6IFt0aGlzLCBydWxlXTtcblxuICAgIHJldHVybiB1bmlvbjtcbiAgfVxuXG4gIGludGVyc2VjdGlvbiggcnVsZTogQ3NzUnVsZSApOiBDc3NSdWxlIHwgdm9pZCB7XG4gICAgaWYgKHRoaXMuaWQgJiYgcnVsZS5pZCAmJiB0aGlzLmlkICE9PSBydWxlLmlkKSB7XG4gICAgICByZXR1cm4gdm9pZCAwO1xuICAgIH1cbiAgICBpZiAodGhpcy5lbGVtZW50ICE9PSBydWxlLmVsZW1lbnQgJiYgdGhpcy5lbGVtZW50ICE9PSAnKicgJiYgcnVsZS5lbGVtZW50ICE9PSAnKicpIHtcbiAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgfVxuICAgIGNvbnN0IGludGVyc2VjdGlvbiA9IG5ldyBDc3NSdWxlKCk7XG5cbiAgICBpbnRlcnNlY3Rpb24uaWQgPSB0aGlzLmlkIHx8wqBydWxlLmlkO1xuICAgIFxuICAgIGlmICh0aGlzLmVsZW1lbnQgIT09ICcqJykge1xuICAgICAgaW50ZXJzZWN0aW9uLmVsZW1lbnQgPSB0aGlzLmVsZW1lbnQ7XG4gICAgfVxuXG4gICAgdGhpcy5jbGFzc2VzLmZvckVhY2goY2xzID0+IGludGVyc2VjdGlvbi5hZGRDbGFzcyhjbHMpKTtcbiAgICBydWxlLmNsYXNzZXMuZm9yRWFjaChjbHMgPT4gaW50ZXJzZWN0aW9uLmFkZENsYXNzKGNscykpO1xuXG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuYXR0cmlicy5mb3JFYWNoKGF0dHIgPT4gaW50ZXJzZWN0aW9uLmFkZEF0dHJpYnV0ZShhdHRyKSk7XG4gICAgICBydWxlLmF0dHJpYnMuZm9yRWFjaChhdHRyID0+IGludGVyc2VjdGlvbi5hZGRBdHRyaWJ1dGUoYXR0cikpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gdm9pZCAwO1xuICAgIH1cblxuICAgIHJldHVybiBpbnRlcnNlY3Rpb247XG4gIH1cblxuICB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIGNvbnN0IGNsYXNzZXMgPSBBcnJheS5mcm9tKHRoaXMuY2xhc3Nlcykuc29ydCgpO1xuICAgIGNvbnN0IGF0dHJpYnMgPSBBcnJheS5mcm9tKHRoaXMuYXR0cmlicy5rZXlzKCkpLnNvcnQoKS5tYXAobiA9PiB0aGlzLmF0dHJpYnMuZ2V0KG4pKSBhcyBDc3NBdHRyaWJ1dGVbXTtcblxuICAgIGNvbnN0IHN0ckNsYXNzZXMgPSBjbGFzc2VzLm1hcChuID0+IGAuJHtufWApO1xuICAgIGNvbnN0IHN0ckF0dHJpYnMgPSBhdHRyaWJzLm1hcChhID0+IGAke2F9YCk7XG4gICAgY29uc3Qgc3RySWQgPSB0aGlzLmlkID8gYCMke3RoaXMuaWR9YCA6ICcnO1xuXG4gICAgcmV0dXJuIGAke3RoaXMuZWxlbWVudH0ke3N0cklkfSR7c3RyQ2xhc3Nlcy5qb2luKCcnKX0ke3N0ckF0dHJpYnMuam9pbignJyl9YDtcbiAgfVxufVxuIiwiLy8gVE9ETzogdXNlIGxleGVyICYgZ3JhbW1hciBmcm9tXG4vLyBodHRwczovL3d3dy53My5vcmcvVFIvQ1NTMjIvZ3JhbW1hci5odG1sXG4vLyB1c2UgZm9sbG93aW5nIHRvb2wgdG8gd29yayB3aXRoIHJlZ2V4XG4vLyBodHRwczovL3JlZ2V4MTAxLmNvbS9cbi8vIFRPRE86IHVzZSB0aGlzIG5wbSBsaWJcbi8vIG5wbSBpbnN0YWxsIHBhcnNlbC1qc1xuaW1wb3J0IHsgQ3NzVG9rZW5UeXBlLCBDc3NUb2tlbiB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmNvbnN0IENTU19UT0tFTl9NQVRDSEVSUyA9IFtcbiAge1xuICAgIHR5cGU6IENzc1Rva2VuVHlwZS5FbGVtZW50LFxuICAgIHJ4Oi9eKC0/W19hLXpdW19hLXowLTktXSp8XFwqKS9pLFxuICB9LFxuICB7XG4gICAgdHlwZTogQ3NzVG9rZW5UeXBlLklkLFxuICAgIHJ4Oi9eIygtP1tfYS16XVtfYS16MC05LV0qKS9pXG4gIH0sXG4gIHtcbiAgICB0eXBlOiBDc3NUb2tlblR5cGUuQ2xhc3MsXG4gICAgcng6L15cXC4oLT9bX2Etel1bX2EtejAtOS1dKikvaVxuICB9LFxuICB7XG4gICAgdHlwZTogQ3NzVG9rZW5UeXBlLkF0dHJpYnV0ZSxcbiAgICByeDovXlxcWygtP1tfYS16XVtfYS16MC05LV0qKSg/OihbXFxeXFwkXFwqXFx8fl0/PSk/KFtfYS16MC05XFx1MDA4MC1cXHVGRkZGXSt8XCJbXlwiXSpcInwnW14nXSonKSk/XFxdL2lcbiAgfSxcbiAge1xuICAgIHR5cGU6IENzc1Rva2VuVHlwZS5Db21iaW5hdG9yLFxuICAgIHJ4Oi9eKD86XFxzKikoW34+XFwrXSkoPzpcXHMqKS9cbiAgfSxcbiAge1xuICAgIHR5cGU6IENzc1Rva2VuVHlwZS5TZXBhcmF0b3IsXG4gICAgcng6L14oPzpcXHMqKSgsKSg/OlxccyopL1xuICB9LFxuICB7XG4gICAgdHlwZTogQ3NzVG9rZW5UeXBlLlNwYWNlLFxuICAgIHJ4Oi9eKFxccyspL1xuICB9LFxuXTtcblxuXG5leHBvcnQgY2xhc3MgQ3NzU2VsZWN0b3JMZXhlciB7XG5cbiAgcHJpdmF0ZSBzZWxlY3Rvcjogc3RyaW5nO1xuICBwcml2YXRlIHBvc2l0aW9uOiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yIChzZWxlY3Rvcjogc3RyaW5nKSB7XG4gICAgdGhpcy5zZWxlY3RvciA9IHNlbGVjdG9yLnRyaW0oKTtcbiAgfVxuXG4gIG5leHRUb2tlbigpOiBDc3NUb2tlbiB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKHRoaXMuc2VsZWN0b3IgPT09ICcnKSB7XG4gICAgICByZXR1cm4gdm9pZCAwO1xuICAgIH1cblxuICAgIGNvbnN0IHNlbCAgICAgPSB0aGlzLnNlbGVjdG9yO1xuICAgIGNvbnN0IHBvcyAgICAgPSB0aGlzLnBvc2l0aW9uO1xuICAgIGNvbnN0IG1hdGNoZXIgPSBDU1NfVE9LRU5fTUFUQ0hFUlMuZmluZCgodCkgPT4gdC5yeC50ZXN0KHNlbCkpO1xuICAgIGxldCBleGVjQXJyYXk6IFJlZ0V4cEV4ZWNBcnJheSB8IG51bGwgfCB1bmRlZmluZWQ7XG5cbiAgICBleGVjQXJyYXkgPSBtYXRjaGVyICYmIG1hdGNoZXIucnguZXhlYyhzZWwpO1xuXG4gICAgaWYgKG1hdGNoZXIgJiYgZXhlY0FycmF5KSB7XG4gICAgICBjb25zdCBbZnVsbCwgLi4ucGFydGlhbHNdID0gZXhlY0FycmF5O1xuICAgICAgdGhpcy5zZWxlY3RvciA9IHNlbC5yZXBsYWNlKGZ1bGwsICcnKTtcbiAgICAgIHRoaXMucG9zaXRpb24gPSBwb3MgKyBmdWxsLmxlbmd0aDtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZSAgICA6IG1hdGNoZXIudHlwZSxcbiAgICAgICAgdmFsdWVzICA6IHRoaXMuc2FuaXRpemVWYWx1ZXMocGFydGlhbHMpLFxuICAgICAgICBwb3NpdGlvbjogcG9zLFxuICAgICAgICBsZW5ndGggIDogZnVsbC5sZW5ndGhcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gV2UgcmVhY2hlZCBhbiBwYXJ0IHdoZXJlIHdlIGNhbm5vdCBwYXJzZSB0aGUgc2VsZWN0b3JcbiAgICB0aGlzLnNlbGVjdG9yID0gJyc7XG5cbiAgICByZXR1cm4ge1xuICAgICAgdHlwZSAgICA6IENzc1Rva2VuVHlwZS5Vbmtub3duLFxuICAgICAgdmFsdWVzICA6IFtzZWxdLFxuICAgICAgcG9zaXRpb246IHBvcyxcbiAgICAgIGxlbmd0aCAgOiBzZWwubGVuZ3RoLFxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2FuaXRpemVWYWx1ZXModmFsdWVzOiBzdHJpbmdbXSk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdmFsdWVzLmZpbHRlcih2YWx1ZSA9PiAhIXZhbHVlKS5tYXAodmFsdWUgPT4ge1xuICAgICAgY29uc3QgaXNRdW90ZWRTdHJpbmcgPSAvXignfFwiKVteJ1wiXStcXDEkLy50ZXN0KHZhbHVlKTtcbiAgICAgIFxuICAgICAgcmV0dXJuIGlzUXVvdGVkU3RyaW5nID8gdmFsdWUuc2xpY2UoMSwgLTEpIDogdmFsdWU7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENzc1J1bGUgfSBmcm9tIFwiLi9jc3MtcnVsZVwiO1xuaW1wb3J0IHsgQ29tYmluYXRvcnMsIENzc1Rva2VuVHlwZSB9IGZyb20gXCIuL3R5cGVzXCI7XG5pbXBvcnQgeyBDc3NTZWxlY3RvckxleGVyIH0gZnJvbSBcIi4vY3NzLXNlbGVjdG9yLWxleGVyXCI7XG5pbXBvcnQgeyBDc3NBdHRyaWJ1dGUgfSBmcm9tIFwiLi9jc3MtYXR0cmlidXRlXCI7XG5cbmludGVyZmFjZSBDb21iaW5lZFJ1bGUge1xuICBydWxlOiBDc3NSdWxlO1xuICBjb21iOiBDb21iaW5hdG9ycztcbn1cblxudHlwZSBTZWxlY3RvckxldmVsID0gQXJyYXk8Q29tYmluZWRSdWxlPjtcblxuY29uc3QgaXNBbmNlc3RvciA9IChjb21iaW5lZFJ1bGU6IENvbWJpbmVkUnVsZSk6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4gW0NvbWJpbmF0b3JzLkRFU0NFTkRBTlQsIENvbWJpbmF0b3JzLkNISUxEXS5pbmRleE9mKGNvbWJpbmVkUnVsZS5jb21iKSAhPT0gLTE7XG59O1xuXG5leHBvcnQgY2xhc3MgQ3NzU2VsZWN0b3Ige1xuICBsZXZlbHM6IFNlbGVjdG9yTGV2ZWxbXSA9IFtbXV07XG5cbiAgY29uc3RydWN0b3Ioc2VsZWN0b3JTdHI6IHN0cmluZykge1xuICAgIHRoaXMucGFyc2Uoc2VsZWN0b3JTdHIpO1xuICB9XG5cbiAgYWRkUnVsZShjb21iUnVsZTogQ29tYmluZWRSdWxlKTogdm9pZCB7XG4gICAgY29uc3QgY3VycmVudExldmVsID0gdGhpcy5sZXZlbHNbdGhpcy5sZXZlbHMubGVuZ3RoIC0xXTtcblxuICAgIGlmIChpc0FuY2VzdG9yKGNvbWJSdWxlKSkge1xuICAgICAgY3VycmVudExldmVsLnB1c2goY29tYlJ1bGUpXG4gICAgICB0aGlzLmxldmVscy5wdXNoKFtdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY3VycmVudExldmVsLnB1c2goY29tYlJ1bGUpO1xuICAgIH1cbiAgfVxuXG4gIHN1cGVyc2V0T2Yoc2VsZWN0b3I6IENzc1NlbGVjdG9yKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0b3JTdXBlcnNldCh0aGlzLmxldmVscywgc2VsZWN0b3IubGV2ZWxzKTtcbiAgfVxuXG4gIHN1YnNldE9mKHNlbGVjdG9yOiBDc3NTZWxlY3Rvcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBzZWxlY3Rvci5zdXBlcnNldE9mKHRoaXMpO1xuICB9XG5cbiAgaW50ZXJzZWN0aW9uKHNlbGVjdG9yOiBDc3NTZWxlY3Rvcik6IENzc1NlbGVjdG9yIHwgdm9pZCB7XG4gICAgaWYgKHRoaXMuc3VwZXJzZXRPZihzZWxlY3RvcikpIHtcbiAgICAgIHJldHVybiBzZWxlY3RvcjtcbiAgICB9XG5cbiAgICBpZiAoc2VsZWN0b3Iuc3VwZXJzZXRPZih0aGlzKSkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogb3RoZXIgcG9zc2libGUgY2FzZXM/P1xuICAgIHJldHVybiB2b2lkIDA7XG4gIH1cblxuICB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIGxldCByZXN1bHQgPSAnJztcbiAgICB0aGlzLmxldmVscy5mb3JFYWNoKGxldmVsID0+IHtcbiAgICAgIGxldmVsLmZvckVhY2goY29tYmluZWRSdWxlID0+IHtcbiAgICAgICAgY29uc3QgY29tYiA9IGNvbWJpbmVkUnVsZS5jb21iID8gYCAke2NvbWJpbmVkUnVsZS5jb21ifSBgIDogJyAnO1xuICAgICAgICByZXN1bHQgKz0gYCR7Y29tYmluZWRSdWxlLnJ1bGV9JHtjb21ifWA7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHQudHJpbSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbGxzIHRoZSBsaXN0IG9mIHJ1bGVzIHdpdGggaXQncyBjb21iaW5hdG9yc1xuICAgKiBAcGFyYW0gc2VsZWN0b3JTdHIgdGhlIHNlbGVjdG9yIHRvIHBhcnNlXG4gICAqL1xuICBwcml2YXRlIHBhcnNlKHNlbGVjdG9yU3RyOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBsZXhlciA9IG5ldyBDc3NTZWxlY3RvckxleGVyKHNlbGVjdG9yU3RyKTtcbiAgICBsZXQgcnVsZSAgICA9IG5ldyBDc3NSdWxlKCk7XG4gICAgbGV0IHRva2VuO1xuXG4gICAgd2hpbGUodG9rZW4gPSBsZXhlci5uZXh0VG9rZW4oKSkge1xuICAgICAgc3dpdGNoKHRva2VuLnR5cGUpIHtcbiAgICAgICAgY2FzZSBDc3NUb2tlblR5cGUuRWxlbWVudDpcbiAgICAgICAgICBydWxlLmVsZW1lbnQgPSB0b2tlbi52YWx1ZXNbMF07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgQ3NzVG9rZW5UeXBlLklkOlxuICAgICAgICAgIHJ1bGUuaWQgPSB0b2tlbi52YWx1ZXNbMF07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgQ3NzVG9rZW5UeXBlLkNsYXNzOlxuICAgICAgICAgIHJ1bGUuYWRkQ2xhc3ModG9rZW4udmFsdWVzWzBdKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBDc3NUb2tlblR5cGUuQXR0cmlidXRlOlxuICAgICAgICAgIHJ1bGUuYWRkQXR0cmlidXRlKG5ldyBDc3NBdHRyaWJ1dGUodG9rZW4udmFsdWVzKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgQ3NzVG9rZW5UeXBlLkNvbWJpbmF0b3I6XG4gICAgICAgIGNhc2UgQ3NzVG9rZW5UeXBlLlNwYWNlOlxuICAgICAgICAgIGNvbnN0IGNvbWIgICAgID0gdG9rZW4udmFsdWVzWzBdIGFzIENvbWJpbmF0b3JzO1xuICAgICAgICAgIGNvbnN0IGNvbWJSdWxlID0geyBydWxlLCBjb21iIH07XG4gICAgICAgICAgXG4gICAgICAgICAgcnVsZSA9IG5ldyBDc3NSdWxlKCk7XG4gICAgICAgICAgdGhpcy5hZGRSdWxlKGNvbWJSdWxlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoYFVua25vd24gdG9rZW4gJHt0b2tlbi52YWx1ZXNbMF19IGF0IHBvc2l0aW9uICR7dG9rZW4ucG9zaXRpb259YCk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGxhc3QgcnVsZSBzaG91bGQgYmUgcHVzaGVkIGluIHRoZSBsYXllclxuICAgIHRoaXMuYWRkUnVsZSh7IHJ1bGUsIGNvbWI6IENvbWJpbmF0b3JzLk5PTkUgfSk7XG4gIH1cblxuICBwcml2YXRlIHNlbGVjdG9yU3VwZXJzZXQoc2VsZWN0b3JPbmU6IFNlbGVjdG9yTGV2ZWxbXSwgc2VsZWN0b3JUd286ICBTZWxlY3RvckxldmVsW10pOiBib29sZWFuIHtcbiAgICAvLyBCYXNlIGNhc2U6IGNvbnRhaW5lciBpcyBlbXB0eSAobWVhbmluZyB3ZSBoYXZlIGNoZWNrZWQgYWxsIGl0cyBydWxlcylcbiAgICAvLyAqXG4gICAgLy8gYVxuICAgIGlmIChzZWxlY3Rvck9uZS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIEJhc2UgY2FzZTogc2VsZWN0b3JUd28gaXMgZW1wdHkgKG1lYW5pbmcgd2UgaGF2ZSBjaGVja2VkIGFsbCBpdHMgcnVsZXMpXG4gICAgLy8gYVxuICAgIC8vICpcbiAgICBpZiAoc2VsZWN0b3JUd28ubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gQmFzZSBjYXNlOiBzZWxlY3Rvck9uZSBpcyBtb3JlIHNwZWNpZmljIHRoYW4gc2VsZWN0b3JUd29cbiAgICAvLyBhIGIgY1xuICAgIC8vIGEgYlxuICAgIGlmIChzZWxlY3Rvck9uZS5sZW5ndGggPiBzZWxlY3RvclR3by5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBsYXllck9uZSA9IHNlbGVjdG9yT25lW3NlbGVjdG9yT25lLmxlbmd0aCAtIDFdO1xuICAgIGNvbnN0IGxheWVyVHdvID0gc2VsZWN0b3JUd29bc2VsZWN0b3JUd28ubGVuZ3RoIC0gMV07XG5cbiAgICAvLyBCYXNlIGNhc2U6IGxheWVyT25lIGhhcyBzdHJvbmdlciByZWxhdGlvbnNoaXAgd2l0aCBkZXNjZW5kYW50IHRoYW4gbGF5ZXJUd29cbiAgICAvLyBhID4gYiA+IChkXG4gICAgLy8gYSA+IGIgKGRcbiAgICBjb25zdCBkZXNjZW5kYW50Q29tYk9uZSA9IGxheWVyT25lW2xheWVyT25lLmxlbmd0aCAtIDFdLmNvbWI7XG4gICAgY29uc3QgZGVzY2VuZGFudENvbWJUd28gPSBsYXllclR3b1tsYXllclR3by5sZW5ndGggLSAxXS5jb21iO1xuICAgIGlmIChkZXNjZW5kYW50Q29tYk9uZSA9PT0gQ29tYmluYXRvcnMuQ0hJTEQgJiYgZGVzY2VuZGFudENvbWJUd28gPT09IENvbWJpbmF0b3JzLkRFU0NFTkRBTlQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBhID4gYiA+IGNcbiAgICAvLyBhID4gYiA+IGMgPiBkID4gZVxuICAgIGlmICh0aGlzLmxldmVsU3VwZXJzZXQobGF5ZXJPbmUsIGxheWVyVHdvKSkge1xuICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0b3JTdXBlcnNldChzZWxlY3Rvck9uZS5zbGljZSgwLCAtMSksIHNlbGVjdG9yVHdvLnNsaWNlKDAsIC0xKSk7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlIGRlZXBlc3QgbGF5ZXIgaXNuJ3QgYSBzdXBlcnNldCB0aGVuIHNlbGVjdG9yIGNhbid0IGJlXG4gICAgLy8gYyA+IGVcbiAgICAvLyBhID4gYyA+IChkXG4gICAgLy8gSWYgQ0hJTEQgaXQgc2hvdWxkIGhhZCBtYXRjaCBiZWZvcmVcbiAgICAvLyBhID4gYiA+IChkXG4gICAgLy8gYSA+IGMgPiAoZFxuICAgIGlmIChkZXNjZW5kYW50Q29tYk9uZSA9PT0gQ29tYmluYXRvcnMuQ0hJTEQgfHwgZGVzY2VuZGFudENvbWJPbmUgPT09IENvbWJpbmF0b3JzLk5PTkUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBGb3IgZ2VuZXJpYyBzaWJsaW5nIHdhbGsgdXAgdGhlIHNlY29uZCBsaXN0IG9mIHJ1bGVzXG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0b3JTdXBlcnNldChzZWxlY3Rvck9uZSwgc2VsZWN0b3JUd28uc2xpY2UoMCwgLTEpKTtcbiAgfVxuXG5cbiAgcHJpdmF0ZSBsZXZlbFN1cGVyc2V0KGxldmVsT25lOiBTZWxlY3RvckxldmVsLCBsZXZlbFR3bzogU2VsZWN0b3JMZXZlbCk6IGJvb2xlYW4ge1xuICAgIC8vIEJhc2UgY2FzZTogY29udGFpbmVyIGlzIGVtcHR5IChtZWFuaW5nIHdlIGhhdmUgY2hlY2tlZCBhbGwgaXRzIHJ1bGVzKVxuICAgIGlmIChsZXZlbE9uZS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIEJhc2UgY2FzZTogbGV2ZWxUd28gaXMgZW1wdHkgKG1lYW5pbmcgd2UgaGF2ZSBjaGVja2VkIGFsbCBpdHMgbGF5ZXIpXG4gICAgaWYgKGxldmVsVHdvLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIEJhc2UgY2FzZTogbGV2ZWxPbmUgaXMgbW9yZSBzcGVjaWZpYyB0aGFuIGxldmVsVHdvXG4gICAgaWYgKGxldmVsT25lLmxlbmd0aCA+IGxldmVsVHdvLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbWJpbmVkUnVsZU9uZSA9IGxldmVsT25lW2xldmVsT25lLmxlbmd0aCAtIDFdO1xuICAgIGNvbnN0IGNvbWJpbmVkUnVsZVR3byA9IGxldmVsVHdvW2xldmVsVHdvLmxlbmd0aCAtIDFdO1xuXG4gICAgLy8gQmFzZSBjYXNlOiBjb21iaW5lZFJ1bGVPbmUgaGFzIHN0cm9uZ2VyIHJlbGF0aW9uc2hpcCB3aXRoIHNpYmxpbmcgdGhhbiBjb21iaW5lZFJ1bGVUd29cbiAgICAvLyBhICsgYiArIChkXG4gICAgLy8gYSArIGIgfiAoZFxuICAgIGNvbnN0IHNpYmxpbmdDb21iT25lID0gY29tYmluZWRSdWxlT25lLmNvbWI7XG4gICAgY29uc3Qgc2libGluZ0NvbWJUd28gPSBjb21iaW5lZFJ1bGVUd28uY29tYjtcbiAgICBpZiAoc2libGluZ0NvbWJPbmUgPT09IENvbWJpbmF0b3JzLkFESkFDRU5UICYmIHNpYmxpbmdDb21iVHdvID09PSBDb21iaW5hdG9ycy5TSUJMSU5HKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gYSArIGIgfiBkXG4gICAgLy8gYSArIGIgKyBjICsgZFxuICAgIGlmIChjb21iaW5lZFJ1bGVPbmUucnVsZS5zdXBlcnNldE9mKGNvbWJpbmVkUnVsZVR3by5ydWxlKSkge1xuICAgICAgcmV0dXJuIHRoaXMubGV2ZWxTdXBlcnNldChsZXZlbE9uZS5zbGljZSgwLCAtMSksIGxldmVsVHdvLnNsaWNlKDAsIC0xKSk7XG4gICAgfVxuXG4gICAgLy8gSWYgQURKQUNFTlQgaXQgc2hvdWxkIGhhZCBtYXRjaCBiZWZvcmVcbiAgICBpZiAoY29tYmluZWRSdWxlT25lLmNvbWIgPT09IENvbWJpbmF0b3JzLkFESkFDRU5UKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gRm9yIGdlbmVyaWMgc2libGluZyB3YWxrIHVwIHRoZSBzZWNvbmQgbGlzdFxuICAgIHJldHVybiB0aGlzLmxldmVsU3VwZXJzZXQobGV2ZWxPbmUsIGxldmVsVHdvLnNsaWNlKDAsIC0xKSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENzc1NlbGVjdG9yIH3CoGZyb20gJy4vY3NzLXNlbGVjdG9yJztcblxuZXhwb3J0IGNsYXNzIENzc2V0IHtcbiAgc2VsZWN0b3JzOiBDc3NTZWxlY3RvcltdO1xuXG4gIC8qKlxuICAgKiBQYXJzZXMgdGhlIGdpdmVuIHNlbGVjdG9yIGZpbGluZyB1cCBpdHMgcHJpdmF0ZSBwcm9wZXJ0aWVzIHdpdGggbWV0YWRhdGFcbiAgICogQHBhcmFtIHNlbGVjdG9yIHRoZSBzZWxlY3RvciBzdHJpbmdcbiAgICovXG4gIGNvbnN0cnVjdG9yIChzZWxlY3Rvcjogc3RyaW5nKSB7XG4gICAgLy8gVE9ETzogdGhpcyBpcyBlcnJvciBwcm9uZSBzaW5jZSBhdHRyIHZhbHVlcyBtYXkgY29udGFpbiB0aGlzIGNoYXJcbiAgICB0aGlzLnNlbGVjdG9ycyA9IHNlbGVjdG9yLnNwbGl0KCcsJykubWFwKChzZWwpID0+IG5ldyBDc3NTZWxlY3RvcihzZWwpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyBzZXQgY29udGFpbnMgdGhlIG9uZSBwYXNzZWQgYXMgcGFyYW1ldGVyXG4gICAqIEBwYXJhbSBzZXQgdGhlIHNldCB0byBjaGVjayB3aXRoXG4gICAqL1xuICBzdXBlcnNldE9mKHNldDogQ3NzZXQpOiBib29sZWFuIHtcbiAgICBsZXQgaW5kZXggPSBzZXQuc2VsZWN0b3JzLmxlbmd0aDtcblxuICAgIHdoaWxlKGluZGV4LS0pIHtcbiAgICAgIGNvbnN0IGNvbnRhaW5lckluZGV4ID0gdGhpcy5zZWxlY3RvcnMuZmluZEluZGV4KHMgPT4gcy5zdXBlcnNldE9mKHNldC5zZWxlY3RvcnNbaW5kZXhdKSk7XG5cbiAgICAgIGlmIChjb250YWluZXJJbmRleCA9PT0gLTEpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyBzZXQgaXMgY29udGFpbmVkIHRoZSBvbmUgcGFzc2VkIGFzIHBhcmFtZXRlclxuICAgKiBAcGFyYW0gc2V0IHRoZSBzZXQgdG8gY2hlY2sgd2l0aFxuICAgKi9cbiAgc3Vic2V0T2Yoc2V0OiBDc3NldCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBzZXQuc3VwZXJzZXRPZih0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgbmV3IENTUyBzZXQgd2hpY2ggaXMgdGhlIHVuaW9uIG9mIHRoaXMgb25lIGFuZCB0aGUgcGFzc2VkIGFzIHBhcmFtZXRlclxuICAgKiBAcGFyYW0gc2V0IHRoZSBvdGhlciBDU1Mgc2V0IHRvIGJlIHVuaXRlZCB3aXRoXG4gICAqL1xuICB1bmlvbihzZXQ6IENzc2V0KTogQ3NzZXQge1xuICAgIGlmICh0aGlzLnN1cGVyc2V0T2Yoc2V0KSkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc3Vic2V0T2Yoc2V0KSkge1xuICAgICAgcmV0dXJuIHNldDtcbiAgICB9XG5cbiAgICAvLyBNYWtlIHVuaW9uIG9mIHNlbGVjdG9ycyBpZiBwb3NzaWJsZVxuICAgIGNvbnN0IGVxdWFsU2VsICA9IHRoaXMuc2VsZWN0b3JzLmZpbHRlcih0aGlzU2VsID0+IHNldC5zZWxlY3RvcnMuc29tZShvdGhlclNlbCA9PiBgJHt0aGlzU2VsfWAgPT09IGAke290aGVyU2VsfWApKTtcbiAgICBjb25zdCB1bmlxdWVPbmUgPSB0aGlzLnNlbGVjdG9ycy5maWx0ZXIodGhpc1NlbCA9PiAhc2V0LnNlbGVjdG9ycy5zb21lKG90aGVyU2VsID0+IHRoaXNTZWwuc3Vic2V0T2Yob3RoZXJTZWwpKSk7XG4gICAgY29uc3QgdW5pcXVlVHdvID0gc2V0LnNlbGVjdG9ycy5maWx0ZXIob3RoZXJTZWwgPT4gIXRoaXMuc2VsZWN0b3JzLnNvbWUodGhpc1NlbCA9PiBvdGhlclNlbC5zdWJzZXRPZih0aGlzU2VsKSkpO1xuICAgIGNvbnN0IGFsbFNlbGVjdG9ycyA9IGVxdWFsU2VsLmNvbmNhdCh1bmlxdWVPbmUsIHVuaXF1ZVR3byk7XG5cbiAgICByZXR1cm4gbmV3IENzc2V0KGAke2FsbFNlbGVjdG9ycy5tYXAocyA9PiBzLnRvU3RyaW5nKCkpLmpvaW4oJywnKX1gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgbmV3IENTUyBzZXQgd2hpY2ggaXMgdGhlIGludGVyc2VjdGlvbiBvZiB0aGlzIG9uZSBhbmQgdGhlIHBhc3NlZCBhcyBwYXJhbWV0ZXJcbiAgICogb3Igdm9pZCBpZiB0aGUgaW50ZXJzZWN0aW9uIGlzIGFuIGVtcHR5IHNldFxuICAgKiBAcGFyYW0gc2V0IHRoZSBvdGhlciBDU1Mgc2V0IHRvIGJlIHVuaXRlZCB3aXRoXG4gICAqL1xuICBpbnRlcnNlY3Rpb24oc2V0OiBDc3NldCk6IENzc2V0IHwgdm9pZCB7XG4gICAgaWYgKHRoaXMuc3VwZXJzZXRPZihzZXQpKSB7XG4gICAgICByZXR1cm4gc2V0O1xuICAgIH1cblxuICAgIGlmICh0aGlzLnN1YnNldE9mKHNldCkpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8vIE1ha2UgaW50ZXJzZWN0aW9uIG9mIHNlbGVjdG9ycyBpZiBwb3NzaWJsZVxuICAgIC8vIDFzdCBhdHRlbXB0IGJydXRlIGZvcmNlIChpbnRlcnNlY3RpbmcgZXZlcnkgc2V0IHdpdGggb3RoZXJzKVxuICAgIGNvbnN0IGludGVyc2VjdGlvbnMgPSB0aGlzLnNlbGVjdG9yc1xuICAgICAgLm1hcCh0aGlzU2VsID0+IHNldC5zZWxlY3RvcnMubWFwKG90aGVyU2VsID0+IHRoaXNTZWwuaW50ZXJzZWN0aW9uKG90aGVyU2VsKSkpXG4gICAgICAucmVkdWNlKChmbGF0LCB2YWwpID0+IGZsYXQuY29uY2F0KHZhbCksIFtdKVxuICAgICAgLmZpbHRlcigodmFsKSA9PiAhIXZhbClcbiAgICAgIC5tYXAoKHZhbCkgPT4gYCR7dmFsfWApO1xuXG4gICAgaWYgKGludGVyc2VjdGlvbnMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gbmV3IENzc2V0KGAke2ludGVyc2VjdGlvbnMuam9pbignLCcpfWApO1xuICAgIH1cblxuICAgIHJldHVybiB2b2lkIDA7XG4gIH1cblxuICB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdG9ycy5tYXAocyA9PiBgJHtzfWApLmpvaW4oJywnKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ3NzTWF0Y2hlclN5bWJvbCB9IGZyb20gXCIuLi90eXBlc1wiO1xuaW1wb3J0IHsgQ3NzQXR0cmlidXRlTWF0Y2hlciB9IGZyb20gXCIuLi9jc3MtYXR0cmlidXRlLW1hdGNoZXJcIjtcblxuY29uc3Qgc3VwZXJzZXRTeW1ib2xzID0gW1xuICBDc3NNYXRjaGVyU3ltYm9sLlByZWZpeCxcbiAgQ3NzTWF0Y2hlclN5bWJvbC5TdWZmaXgsXG4gIENzc01hdGNoZXJTeW1ib2wuU3ViQ29kZSxcbiAgQ3NzTWF0Y2hlclN5bWJvbC5PY2N1cnJlbmNlLFxuICBDc3NNYXRjaGVyU3ltYm9sLkNvbnRhaW5zLFxuICBDc3NNYXRjaGVyU3ltYm9sLkVxdWFsLFxuXTtcblxuZXhwb3J0IGNsYXNzIENzc0NvbnRhaW5zTWF0Y2hlciBleHRlbmRzIENzc0F0dHJpYnV0ZU1hdGNoZXIge1xuICByZWFkb25seSBzeW1ib2w6IENzc01hdGNoZXJTeW1ib2wgPSBDc3NNYXRjaGVyU3ltYm9sLkNvbnRhaW5zO1xuXG4gIHN1cGVyc2V0T2YgKCBtYXRjaGVyOiBDc3NBdHRyaWJ1dGVNYXRjaGVyICk6IGJvb2xlYW4ge1xuICAgIGlmIChzdXBlcnNldFN5bWJvbHMuaW5kZXhPZihtYXRjaGVyLnN5bWJvbCkgIT09IC0xKSB7XG4gICAgICByZXR1cm4gbWF0Y2hlci52YWx1ZS5pbmRleE9mKHRoaXMudmFsdWUpICE9PSAtMTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiIsImltcG9ydCB7IENzc0F0dHJpYnV0ZU1hdGNoZXIgfSBmcm9tIFwiLi4vY3NzLWF0dHJpYnV0ZS1tYXRjaGVyXCI7XG5pbXBvcnQgeyBDc3NNYXRjaGVyU3ltYm9sIH0gZnJvbSBcIi4uL3R5cGVzXCI7XG5pbXBvcnQgeyBDc3NQcmVzZW5jZU1hdGNoZXIgfSBmcm9tIFwiLi9wcmVzZW5jZS1tYXRjaGVyXCI7XG5pbXBvcnQgeyBDc3NQcmVmaXhNYXRjaGVyIH0gZnJvbSBcIi4vcHJlZml4LW1hdGNoZXJcIjtcbmltcG9ydCB7IENzc1N1ZmZpeE1hdGNoZXIgfSBmcm9tIFwiLi9zdWZmaXgtbWF0Y2hlclwiO1xuaW1wb3J0IHsgQ3NzRXF1YWxNYXRjaGVyIH0gZnJvbSBcIi4vZXF1YWwtbWF0Y2hlclwiO1xuaW1wb3J0IHsgQ3NzQ29udGFpbnNNYXRjaGVyIH0gZnJvbSBcIi4vY29udGFpbnMtbWF0Y2hlclwiO1xuaW1wb3J0IHsgQ3NzT2NjdXJyZW5jZU1hdGNoZXIgfSBmcm9tIFwiLi9vY2N1cnJlbmNlLW1hdGNoZXJcIjtcbmltcG9ydCB7IENzc1N1YkNvZGVNYXRjaGVyIH0gZnJvbSBcIi4vc3ViY29kZS1tYXRjaGVyXCI7XG5cbmludGVyZmFjZSBDc3NNYXRjaGVyQ29uc3RydWN0b3Ige1xuICBuZXcgKHZhbHVlOiBzdHJpbmcpOiBDc3NBdHRyaWJ1dGVNYXRjaGVyXG59XG5cbmNvbnN0IGNsYXp6ZXo6IHsgW3N5bWJvbDogc3RyaW5nXTogQ3NzTWF0Y2hlckNvbnN0cnVjdG9yIH0gID0ge1xuICBbQ3NzTWF0Y2hlclN5bWJvbC5QcmVzZW5jZV0gIDogQ3NzUHJlc2VuY2VNYXRjaGVyLFxuICBbQ3NzTWF0Y2hlclN5bWJvbC5QcmVmaXhdICAgIDogQ3NzUHJlZml4TWF0Y2hlcixcbiAgW0Nzc01hdGNoZXJTeW1ib2wuU3VmZml4XSAgICA6IENzc1N1ZmZpeE1hdGNoZXIsXG4gIFtDc3NNYXRjaGVyU3ltYm9sLkVxdWFsXSAgICAgOiBDc3NFcXVhbE1hdGNoZXIsXG4gIFtDc3NNYXRjaGVyU3ltYm9sLkNvbnRhaW5zXSAgOiBDc3NDb250YWluc01hdGNoZXIsXG4gIFtDc3NNYXRjaGVyU3ltYm9sLk9jY3VycmVuY2VdOiBDc3NPY2N1cnJlbmNlTWF0Y2hlcixcbiAgW0Nzc01hdGNoZXJTeW1ib2wuU3ViQ29kZV0gICA6IENzc1N1YkNvZGVNYXRjaGVyLFxufVxuXG5jb25zdCBWQUxVRV9SRUdFWFBTID0ge1xuICB2YWxpZCA6IC9eKCd8XCIpW14nXCJdK1xcMSR8XlteJ1wiXSskLyxcbiAgcXVvdGVzOiAvXltcIiddfFtcIiddJC9nLFxufTtcblxuZXhwb3J0IGNsYXNzIENzc01hdGNoZXJGYWN0b3J5IHtcbiAgc3RhdGljIGNyZWF0ZSAoc2VsZWN0b3I6IHN0cmluZyA9ICcnKTogQ3NzQXR0cmlidXRlTWF0Y2hlciB7XG4gICAgY29uc3QgcGFydHMgID0gc2VsZWN0b3Iuc3BsaXQoJz0nKTtcbiAgICBjb25zdCBzeW1ib2wgPSBwYXJ0cy5sZW5ndGggPiAxID8gcGFydHNbMF0gfHwgJz0nIDogJyc7XG4gICAgY29uc3QgdmFsdWUgID0gcGFydHMubGVuZ3RoID4gMSA/IHBhcnRzWzFdIDogJyc7XG5cbiAgICBpZiAoICEhdmFsdWUgJiYgIVZBTFVFX1JFR0VYUFMudmFsaWQudGVzdCh2YWx1ZSkgKSB7XG4gICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoYEludmFsaWQgYXR0cmlidXRlIHZhbHVlIGluICR7c2VsZWN0b3J9YCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBjbGF6emV6W3N5bWJvbF0odmFsdWUucmVwbGFjZShWQUxVRV9SRUdFWFBTLnF1b3RlcywgJycpKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ3NzTWF0Y2hlclN5bWJvbCB9IGZyb20gXCIuLi90eXBlc1wiO1xuaW1wb3J0IHsgQ3NzQXR0cmlidXRlTWF0Y2hlciB9IGZyb20gXCIuLi9jc3MtYXR0cmlidXRlLW1hdGNoZXJcIjtcblxuZXhwb3J0IGNsYXNzIENzc0VxdWFsTWF0Y2hlciBleHRlbmRzIENzc0F0dHJpYnV0ZU1hdGNoZXIge1xuICByZWFkb25seSBzeW1ib2w6IENzc01hdGNoZXJTeW1ib2wgPSBDc3NNYXRjaGVyU3ltYm9sLkVxdWFsO1xuXG4gIHN1cGVyc2V0T2YgKCBtYXRjaGVyOiBDc3NBdHRyaWJ1dGVNYXRjaGVyICk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBtYXRjaGVyLnN5bWJvbCA9PT0gQ3NzTWF0Y2hlclN5bWJvbC5FcXVhbCAmJiB0aGlzLnZhbHVlID09PSBtYXRjaGVyLnZhbHVlO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDc3NNYXRjaGVyU3ltYm9sIH0gZnJvbSBcIi4uL3R5cGVzXCI7XG5pbXBvcnQgeyBDc3NBdHRyaWJ1dGVNYXRjaGVyIH0gZnJvbSBcIi4uL2Nzcy1hdHRyaWJ1dGUtbWF0Y2hlclwiO1xuXG5jb25zdCBzdXBlcnNldFN5bWJvbHMgPSBbXG4gIENzc01hdGNoZXJTeW1ib2wuRXF1YWwsXG4gIENzc01hdGNoZXJTeW1ib2wuT2NjdXJyZW5jZSxcbl07XG5cbmV4cG9ydCBjbGFzcyBDc3NPY2N1cnJlbmNlTWF0Y2hlciBleHRlbmRzIENzc0F0dHJpYnV0ZU1hdGNoZXIge1xuICByZWFkb25seSBzeW1ib2w6IENzc01hdGNoZXJTeW1ib2wgPSBDc3NNYXRjaGVyU3ltYm9sLk9jY3VycmVuY2U7XG5cbiAgc3VwZXJzZXRPZiAoIG1hdGNoZXI6IENzc0F0dHJpYnV0ZU1hdGNoZXIgKTogYm9vbGVhbiB7XG4gICAgaWYgKHN1cGVyc2V0U3ltYm9scy5pbmRleE9mKG1hdGNoZXIuc3ltYm9sKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiBtYXRjaGVyLnZhbHVlID09PSB0aGlzLnZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGludGVyc2VjdGlvbiAoIG1hdGNoZXI6IENzc0F0dHJpYnV0ZU1hdGNoZXIgKTogc3RyaW5nIHwgbnVsbCB8IHZvaWQge1xuICAgIGlmICggdGhpcy52YWx1ZSA9PT0gbWF0Y2hlci52YWx1ZSApIHtcbiAgICAgIGlmICggbWF0Y2hlci5zeW1ib2wgPT09IENzc01hdGNoZXJTeW1ib2wuRXF1YWwgKSB7XG4gICAgICAgIHJldHVybiBgPVwiJHt0aGlzLnZhbHVlfVwiYDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc3VwZXIuaW50ZXJzZWN0aW9uKG1hdGNoZXIpO1xuICB9XG59IiwiaW1wb3J0IHsgQ3NzTWF0Y2hlclN5bWJvbCB9IGZyb20gXCIuLi90eXBlc1wiO1xuaW1wb3J0IHsgQ3NzQXR0cmlidXRlTWF0Y2hlciB9IGZyb20gXCIuLi9jc3MtYXR0cmlidXRlLW1hdGNoZXJcIjtcblxuY29uc3Qgc3VwZXJzZXRTeW1ib2xzID0gW1xuICBDc3NNYXRjaGVyU3ltYm9sLlByZWZpeCxcbiAgQ3NzTWF0Y2hlclN5bWJvbC5TdWJDb2RlLFxuICBDc3NNYXRjaGVyU3ltYm9sLkVxdWFsLFxuXTtcblxuZXhwb3J0IGNsYXNzIENzc1ByZWZpeE1hdGNoZXIgZXh0ZW5kcyBDc3NBdHRyaWJ1dGVNYXRjaGVyIHtcbiAgcmVhZG9ubHkgc3ltYm9sOiBDc3NNYXRjaGVyU3ltYm9sID0gQ3NzTWF0Y2hlclN5bWJvbC5QcmVmaXg7XG5cbiAgc3VwZXJzZXRPZiAoIG1hdGNoZXI6IENzc0F0dHJpYnV0ZU1hdGNoZXIgKTogYm9vbGVhbiB7XG5cbiAgICBpZiAoc3VwZXJzZXRTeW1ib2xzLmluZGV4T2YobWF0Y2hlci5zeW1ib2wpICE9PSAtMSkge1xuICAgICAgcmV0dXJuIG1hdGNoZXIudmFsdWUuc3RhcnRzV2l0aCh0aGlzLnZhbHVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB1bmlvbiAoIG1hdGNoZXI6IENzc0F0dHJpYnV0ZU1hdGNoZXIgKTogc3RyaW5nIHwgbnVsbCB7XG5cbiAgICBpZiAoIHRoaXMudmFsdWUgPT09IG1hdGNoZXIudmFsdWUgJiYgbWF0Y2hlci5zeW1ib2wgPT09IENzc01hdGNoZXJTeW1ib2wuU3ViQ29kZSApIHtcbiAgICAgIHJldHVybiBgJHt0aGlzfWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN1cGVyLnVuaW9uKG1hdGNoZXIpO1xuICB9XG5cbiAgaW50ZXJzZWN0aW9uICggbWF0Y2hlcjogQ3NzQXR0cmlidXRlTWF0Y2hlciApOiBzdHJpbmcgfCBudWxsIHwgdm9pZCB7XG4gICAgaWYgKCB0aGlzLnZhbHVlID09PSBtYXRjaGVyLnZhbHVlICkge1xuICAgICAgaWYgKG1hdGNoZXIuc3ltYm9sID09PSBDc3NNYXRjaGVyU3ltYm9sLkVxdWFsICkge1xuICAgICAgICByZXR1cm4gYD1cIiR7dGhpcy52YWx1ZX1cImA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCBtYXRjaGVyLnZhbHVlLnN0YXJ0c1dpdGgodGhpcy52YWx1ZSkgKSB7XG4gICAgICBpZiAoIG1hdGNoZXIuc3ltYm9sID09PSBDc3NNYXRjaGVyU3ltYm9sLlByZWZpeCApIHtcbiAgICAgICAgcmV0dXJuIGBePVwiJHttYXRjaGVyLnZhbHVlfVwiYDtcbiAgICAgIH1cbiAgICAgIGlmICggbWF0Y2hlci5zeW1ib2wgPT09IENzc01hdGNoZXJTeW1ib2wuU3ViQ29kZSApIHtcbiAgICAgICAgcmV0dXJuIGB8PVwiJHttYXRjaGVyLnZhbHVlfVwiYDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIHRoaXMudmFsdWUuc3RhcnRzV2l0aChtYXRjaGVyLnZhbHVlKSAmJiBtYXRjaGVyLnN5bWJvbCA9PT0gQ3NzTWF0Y2hlclN5bWJvbC5QcmVmaXggKSB7XG4gICAgICByZXR1cm4gYF49XCIke3RoaXMudmFsdWV9XCJgO1xuICAgIH1cblxuICAgIGlmICggbWF0Y2hlci5zeW1ib2wgPT09IENzc01hdGNoZXJTeW1ib2wuUHJlZml4ICYmIHRoaXMudmFsdWUgIT09IG1hdGNoZXIudmFsdWUgKSB7XG4gICAgICByZXR1cm4gdm9pZCAwO1xuICAgIH1cblxuICAgIHJldHVybiBzdXBlci5pbnRlcnNlY3Rpb24obWF0Y2hlcik7XG4gIH1cbn0iLCJpbXBvcnQgeyBDc3NNYXRjaGVyU3ltYm9sIH0gZnJvbSBcIi4uL3R5cGVzXCI7XG5pbXBvcnQgeyBDc3NBdHRyaWJ1dGVNYXRjaGVyIH0gZnJvbSBcIi4uL2Nzcy1hdHRyaWJ1dGUtbWF0Y2hlclwiO1xuXG5leHBvcnQgY2xhc3MgQ3NzUHJlc2VuY2VNYXRjaGVyIGV4dGVuZHMgQ3NzQXR0cmlidXRlTWF0Y2hlciB7XG4gIHJlYWRvbmx5IHN5bWJvbDogQ3NzTWF0Y2hlclN5bWJvbCA9IENzc01hdGNoZXJTeW1ib2wuUHJlc2VuY2U7XG5cbiAgc3VwZXJzZXRPZiAoIG1hdGNoZXI6IENzc0F0dHJpYnV0ZU1hdGNoZXIgKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn0iLCJpbXBvcnQgeyBDc3NNYXRjaGVyU3ltYm9sIH0gZnJvbSBcIi4uL3R5cGVzXCI7XG5pbXBvcnQgeyBDc3NBdHRyaWJ1dGVNYXRjaGVyIH0gZnJvbSBcIi4uL2Nzcy1hdHRyaWJ1dGUtbWF0Y2hlclwiO1xuXG5jb25zdCBzdXBlcnNldFN5bWJvbHMgPSBbXG4gIENzc01hdGNoZXJTeW1ib2wuU3ViQ29kZSxcbiAgQ3NzTWF0Y2hlclN5bWJvbC5FcXVhbCxcbl07XG5cbmV4cG9ydCBjbGFzcyBDc3NTdWJDb2RlTWF0Y2hlciBleHRlbmRzIENzc0F0dHJpYnV0ZU1hdGNoZXIge1xuICByZWFkb25seSBzeW1ib2w6IENzc01hdGNoZXJTeW1ib2wgPSBDc3NNYXRjaGVyU3ltYm9sLlN1YkNvZGU7XG5cbiAgc3VwZXJzZXRPZiAoIG1hdGNoZXI6IENzc0F0dHJpYnV0ZU1hdGNoZXIgKTogYm9vbGVhbiB7XG4gICAgaWYgKCBzdXBlcnNldFN5bWJvbHMuaW5kZXhPZihtYXRjaGVyLnN5bWJvbCkgIT09IC0xICkge1xuICAgICAgcmV0dXJuIG1hdGNoZXIudmFsdWUgPT09IHRoaXMudmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdW5pb24gKCBtYXRjaGVyOiBDc3NBdHRyaWJ1dGVNYXRjaGVyICk6IHN0cmluZyB8IG51bGwge1xuICAgIGlmICggbWF0Y2hlci5zeW1ib2wgPT09IENzc01hdGNoZXJTeW1ib2wuU3ViQ29kZSApIHtcbiAgICAgIGlmICggdGhpcy52YWx1ZSA9PT0gbWF0Y2hlci52YWx1ZSApIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXN9YDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc3VwZXIudW5pb24obWF0Y2hlcik7XG4gIH1cblxuICBpbnRlcnNlY3Rpb24gKCBtYXRjaGVyOiBDc3NBdHRyaWJ1dGVNYXRjaGVyICk6IHN0cmluZyB8IG51bGwgfCB2b2lkIHtcbiAgICBpZiAoIHRoaXMudmFsdWUgPT09IG1hdGNoZXIudmFsdWUgKSB7XG4gICAgICBpZiAobWF0Y2hlci5zeW1ib2wgPT09IENzc01hdGNoZXJTeW1ib2wuUHJlZml4ICkge1xuICAgICAgICByZXR1cm4gYHw9XCIke3RoaXMudmFsdWV9XCJgO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICggdGhpcy52YWx1ZS5zdGFydHNXaXRoKG1hdGNoZXIudmFsdWUpICkge1xuICAgICAgaWYgKG1hdGNoZXIuc3ltYm9sID09PSBDc3NNYXRjaGVyU3ltYm9sLlByZWZpeCApIHtcbiAgICAgICAgcmV0dXJuIGB8PVwiJHt0aGlzLnZhbHVlfVwiYDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc3VwZXIuaW50ZXJzZWN0aW9uKG1hdGNoZXIpO1xuICB9XG59IiwiaW1wb3J0IHsgQ3NzTWF0Y2hlclN5bWJvbCB9IGZyb20gXCIuLi90eXBlc1wiO1xuaW1wb3J0IHsgQ3NzQXR0cmlidXRlTWF0Y2hlciB9IGZyb20gXCIuLi9jc3MtYXR0cmlidXRlLW1hdGNoZXJcIjtcblxuY29uc3Qgc3VwZXJzZXRTeW1ib2xzID0gW1xuICBDc3NNYXRjaGVyU3ltYm9sLlN1ZmZpeCxcbiAgQ3NzTWF0Y2hlclN5bWJvbC5FcXVhbCxcbl07XG5cbmV4cG9ydCBjbGFzcyBDc3NTdWZmaXhNYXRjaGVyIGV4dGVuZHMgQ3NzQXR0cmlidXRlTWF0Y2hlciB7XG4gIHJlYWRvbmx5IHN5bWJvbDogQ3NzTWF0Y2hlclN5bWJvbCA9IENzc01hdGNoZXJTeW1ib2wuU3VmZml4O1xuXG4gIHN1cGVyc2V0T2YgKCBtYXRjaGVyOiBDc3NBdHRyaWJ1dGVNYXRjaGVyICk6IGJvb2xlYW4ge1xuICAgIGlmIChzdXBlcnNldFN5bWJvbHMuaW5kZXhPZihtYXRjaGVyLnN5bWJvbCkgIT09IC0xKSB7XG4gICAgICByZXR1cm4gbWF0Y2hlci52YWx1ZS5lbmRzV2l0aCh0aGlzLnZhbHVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpbnRlcnNlY3Rpb24gKCBtYXRjaGVyOiBDc3NBdHRyaWJ1dGVNYXRjaGVyICk6IHN0cmluZyB8IG51bGwgfCB2b2lkIHtcbiAgICBpZiAoIG1hdGNoZXIuc3ltYm9sID09PSBDc3NNYXRjaGVyU3ltYm9sLlN1ZmZpeCApIHtcbiAgICAgIGlmICggbWF0Y2hlci52YWx1ZS5lbmRzV2l0aCh0aGlzLnZhbHVlKSB8fCB0aGlzLnZhbHVlLmVuZHNXaXRoKG1hdGNoZXIudmFsdWUpICkge1xuICAgICAgICBjb25zdCBsb25nZXN0VmFsdWUgPSB0aGlzLnZhbHVlLmxlbmd0aCA+IG1hdGNoZXIudmFsdWUubGVuZ3RoID8gdGhpcy52YWx1ZSA6IG1hdGNoZXIudmFsdWU7XG5cbiAgICAgICAgcmV0dXJuIGAkPVwiJHtsb25nZXN0VmFsdWV9XCJgXG4gICAgICB9XG4gICAgICBcbiAgICAgIGlmICggdGhpcy52YWx1ZSAhPT0gbWF0Y2hlci52YWx1ZSApIHtcbiAgICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHN1cGVyLmludGVyc2VjdGlvbihtYXRjaGVyKTtcbiAgfVxufSIsImV4cG9ydCBlbnVtIENzc1Rva2VuVHlwZSB7XG4gIFZvaWQsXG4gIElkLFxuICBFbGVtZW50LFxuICBDbGFzcyxcbiAgQXR0cmlidXRlLFxuICBTcGFjZSxcbiAgQ29tYmluYXRvcixcbiAgU2VwYXJhdG9yLFxuICBVbmtub3duLFxufVxuZXhwb3J0IGludGVyZmFjZSBDc3NUb2tlbiB7XG4gIHR5cGUgICAgOiBDc3NUb2tlblR5cGUsXG4gIHZhbHVlcyAgOiBzdHJpbmdbXTtcbiAgcG9zaXRpb246IG51bWJlcjtcbiAgbGVuZ3RoICA6IG51bWJlcjtcbn1cblxuZXhwb3J0IGVudW0gQ3NzTWF0Y2hlclN5bWJvbCB7XG4gIFByZXNlbmNlICAgPSAnJyxcbiAgRXF1YWwgICAgICA9ICc9JyxcbiAgUHJlZml4ICAgICA9ICdeJyxcbiAgU3VmZml4ICAgICA9ICckJyxcbiAgQ29udGFpbnMgICA9ICcqJyxcbiAgU3ViQ29kZSAgICA9ICd8JyxcbiAgT2NjdXJyZW5jZSA9ICd+Jyxcbn1cblxuZXhwb3J0IGNvbnN0IGVudW0gQ29tYmluYXRvcnMge1xuICBBREpBQ0VOVCAgID0gJysnLFxuICBTSUJMSU5HICAgID0gJ34nLFxuICBERVNDRU5EQU5UID0gJyAnLFxuICBDSElMRCAgICAgID0gJz4nLFxuICBOT05FICAgICAgID0gJycsXG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9kZW1vL2luZGV4LnRzXCIpO1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgdXNlZCAnZXhwb3J0cycgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuIl0sInNvdXJjZVJvb3QiOiIifQ==