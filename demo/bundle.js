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
/*! CommonJS bailout: exports is used directly at 36:34-41 */
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
var steps_intro_1 = __webpack_require__(/*! ./steps-intro */ "./demo/steps/steps-intro.ts");
var steps_union_1 = __webpack_require__(/*! ./steps-union */ "./demo/steps/steps-union.ts");
__exportStar(__webpack_require__(/*! ./runner */ "./demo/steps/runner.ts"), exports);
exports.STEPS = __spread(steps_intro_1.STEPS_INTRO, steps_union_1.STEPS_UNION);


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

/***/ "./demo/steps/steps-intro.ts":
/*!***********************************!*\
  !*** ./demo/steps/steps-intro.ts ***!
  \***********************************/
/*! flagged exports */
/*! export STEPS_INTRO [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.STEPS_INTRO = void 0;
exports.STEPS_INTRO = [
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jc3NldC8uL2RlbW8vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vY3NzZXQvLi9kZW1vL3BsYXlncm91bmQudHMiLCJ3ZWJwYWNrOi8vY3NzZXQvLi9kZW1vL3N0ZXBzL2luZGV4LnRzIiwid2VicGFjazovL2Nzc2V0Ly4vZGVtby9zdGVwcy9ydW5uZXIudHMiLCJ3ZWJwYWNrOi8vY3NzZXQvLi9kZW1vL3N0ZXBzL3N0ZXBzLWludHJvLnRzIiwid2VicGFjazovL2Nzc2V0Ly4vZGVtby9zdGVwcy9zdGVwcy11bmlvbi50cyIsIndlYnBhY2s6Ly9jc3NldC8uL3NyYy9jc3MtYXR0cmlidXRlLW1hdGNoZXIudHMiLCJ3ZWJwYWNrOi8vY3NzZXQvLi9zcmMvY3NzLWF0dHJpYnV0ZS50cyIsIndlYnBhY2s6Ly9jc3NldC8uL3NyYy9jc3MtcnVsZS50cyIsIndlYnBhY2s6Ly9jc3NldC8uL3NyYy9jc3Mtc2VsZWN0b3ItbGV4ZXIudHMiLCJ3ZWJwYWNrOi8vY3NzZXQvLi9zcmMvY3NzLXNlbGVjdG9yLnRzIiwid2VicGFjazovL2Nzc2V0Ly4vc3JjL2Nzc2V0LnRzIiwid2VicGFjazovL2Nzc2V0Ly4vc3JjL21hdGNoZXJzL2NvbnRhaW5zLW1hdGNoZXIudHMiLCJ3ZWJwYWNrOi8vY3NzZXQvLi9zcmMvbWF0Y2hlcnMvY3NzLW1hdGNoZXItZmFjdG9yeS50cyIsIndlYnBhY2s6Ly9jc3NldC8uL3NyYy9tYXRjaGVycy9lcXVhbC1tYXRjaGVyLnRzIiwid2VicGFjazovL2Nzc2V0Ly4vc3JjL21hdGNoZXJzL29jY3VycmVuY2UtbWF0Y2hlci50cyIsIndlYnBhY2s6Ly9jc3NldC8uL3NyYy9tYXRjaGVycy9wcmVmaXgtbWF0Y2hlci50cyIsIndlYnBhY2s6Ly9jc3NldC8uL3NyYy9tYXRjaGVycy9wcmVzZW5jZS1tYXRjaGVyLnRzIiwid2VicGFjazovL2Nzc2V0Ly4vc3JjL21hdGNoZXJzL3N1YmNvZGUtbWF0Y2hlci50cyIsIndlYnBhY2s6Ly9jc3NldC8uL3NyYy9tYXRjaGVycy9zdWZmaXgtbWF0Y2hlci50cyIsIndlYnBhY2s6Ly9jc3NldC8uL3NyYy90eXBlcy50cyIsIndlYnBhY2s6Ly9jc3NldC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jc3NldC93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdFQUFxQztBQUNyQyxtRkFBNkM7QUFDN0MsMEVBQXlDO0FBSXhDLE1BQWMsQ0FBQyxLQUFLLEdBQUcsYUFBSyxDQUFDO0FBQzlCLCtEQUErRDtBQUUvRCx5QkFBeUI7QUFDekIsSUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQXlCLENBQUM7QUFDL0UsSUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQXFCLENBQUM7QUFDdkUsSUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQW1CLENBQUM7QUFDbkUsVUFBVTtBQUNWLElBQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFzQixDQUFDO0FBR3hFLHlCQUF5QjtBQUN6QiwwQkFBMEI7QUFDMUIsSUFBTSxjQUFjLEdBQUcsR0FBRyxDQUFDO0FBQzNCLElBQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDekQsMEJBQWEsQ0FBQyxVQUE4QixFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBRTlELElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztBQUVkLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7SUFDbkMsSUFBSSxVQUFVLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBRTtRQUN0QyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3pCLE9BQU87S0FDUjtJQUVELElBQU0sSUFBSSxHQUFHLGFBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBRTVCLGtDQUFrQztJQUNsQyxlQUFPLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDaEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUU5QixJQUFJLEtBQUssSUFBSSxhQUFLLENBQUMsTUFBTSxFQUFFO1FBQ3pCLFVBQVUsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0tBQ2xDO0FBQ0gsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2Q0gsaUNBQWlDO0FBQ2pDLFNBQVMsWUFBWSxDQUFDLEVBQXdCLEVBQUUsR0FBVyxFQUFFLEdBQVcsRUFBRSxJQUFZO0lBQ3BGLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3BDLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUVsQixJQUFJLEdBQUcsR0FBRyxNQUFNLEVBQUU7UUFDaEIsUUFBUSxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7S0FDN0Q7U0FBTSxJQUFJLEdBQUcsR0FBRyxNQUFNLEVBQUU7UUFDdkIsUUFBUSxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7S0FDaEU7SUFFRCxJQUFJLFFBQVEsRUFBRTtRQUNaLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGNBQVksUUFBVSxDQUFDLENBQUM7S0FDMUM7QUFDSCxDQUFDO0FBRUQsOEJBQThCO0FBQzlCLFNBQVMsV0FBVyxDQUFDLEVBQXdCLEVBQUUsR0FBVyxFQUFFLEdBQVcsRUFBRSxJQUFZO0lBQ25GLElBQU0sSUFBSSxHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUNyRCxJQUFNLElBQUksR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDL0IsSUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQztJQUVsQyxJQUFJLEdBQUcsSUFBSSxHQUFHLElBQUksR0FBRyxJQUFJLElBQUksRUFBRTtRQUM3QixFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUM3QjtBQUNILENBQUM7QUFFRCxnQkFBZ0I7QUFDaEIsU0FBUyxVQUFVLENBQUMsRUFBd0IsRUFBRSxHQUFXLEVBQUUsR0FBVyxFQUFFLElBQVk7SUFDbEYsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDcEMsSUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQztJQUN4QyxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUN4QixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQ3RDLENBQUM7SUFFRixJQUFJLFFBQVEsSUFBSSxNQUFNLEVBQUU7UUFDdEIsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDNUI7QUFDSCxDQUFDO0FBRUQsaURBQWlEO0FBQ2pELFNBQWdCLGFBQWEsQ0FBQyxLQUF1QixFQUFFLElBQVk7SUFFakUsS0FBSyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUNuQyxJQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLEtBQUssSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDbkMsSUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4QyxJQUFNLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7WUFFL0IsRUFBRSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDakMsRUFBRSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsS0FBRyxHQUFLLENBQUMsQ0FBQztZQUNuQyxFQUFFLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxLQUFHLEdBQUssQ0FBQyxDQUFDO1lBQ25DLEVBQUUsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLEtBQUcsR0FBSyxDQUFDLENBQUM7WUFDbkMsRUFBRSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsTUFBRyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBRSxDQUFDLENBQUM7WUFDN0MsRUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsTUFBRyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBRSxDQUFDLENBQUM7WUFDOUMsMkJBQTJCO1lBRTNCLFlBQVksQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNqQyxVQUFVLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDL0IsV0FBVyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ2hDLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDcEI7UUFDRCxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQ3ZCO0FBQ0gsQ0FBQztBQXZCRCxzQ0F1QkM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xFRCw0RkFBNEM7QUFDNUMsNEZBQTRDO0FBRTVDLHFGQUF5QjtBQUNaLGFBQUssWUFDYix5QkFBVyxFQUNYLHlCQUFXLEVBQ2Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMRixTQUFTLGNBQWM7SUFDckIsSUFBSSxPQUFPLEdBQUcsa0JBQWtCLENBQUM7SUFDakMsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDO0lBQ2hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDMUIsS0FBSyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQ2xEO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDO0FBRUQsU0FBUyxPQUFPLENBQUMsTUFBVzs7SUFDMUIsT0FBTyxtQkFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLFNBQVMsMENBQUUsV0FBVywwQ0FBRSxJQUFJLE1BQUssT0FBTyxDQUFDO0FBQzFELENBQUM7QUFFRCxTQUFnQixPQUFPLENBQ3JCLElBQVUsRUFDVixXQUF3QixFQUN4QixRQUFxQixFQUNyQixRQUFxQjtJQUVyQixjQUFjO0lBQ2QsV0FBVyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBRXJDLFlBQVk7SUFDWixJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BDLElBQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxjQUFJO1FBQzFELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDdEMsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFNUMsaURBQWlEO0lBQ2pELElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFJLE1BQU0sUUFBSyxDQUFDLENBQUM7SUFDekMsSUFBTSxTQUFTLEdBQU0sVUFBVSw0QkFBdUIsY0FBYyxFQUFFLFFBQUssQ0FBQztJQUU1RSxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUN2QixRQUFRLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztLQUNoQztTQUFNO1FBQ0wsUUFBUSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7S0FDekI7QUFDSCxDQUFDO0FBMUJELDBCQTBCQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JDWSxtQkFBVyxHQUFXO0lBQ2pDO1FBQ0UsT0FBTyxFQUFFLDZDQUE2QztRQUN0RCxJQUFJLEVBQUU7WUFDSixPQUFPLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3BDLENBQUM7S0FDRjtJQUNEO1FBQ0UsT0FBTyxFQUFFLDZDQUE2QztRQUN0RCxJQUFJLEVBQUU7WUFDSixPQUFPLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3BDLENBQUM7S0FDRjtJQUNEO1FBQ0UsT0FBTyxFQUFFLCtDQUErQztRQUN4RCxJQUFJLEVBQUU7WUFDSixPQUFPLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDdEMsQ0FBQztLQUNGO0lBQ0Q7UUFDRSxPQUFPLEVBQUUsOENBQThDO1FBQ3ZELElBQUksRUFBRTtZQUNKLE9BQU8sSUFBSSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNyQyxDQUFDO0tBQ0Y7SUFDRDtRQUNFLE9BQU8sRUFBRSx1Q0FBdUM7UUFDaEQsSUFBSSxFQUFFO1lBQ0osT0FBTyxJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM5QixDQUFDO0tBQ0Y7SUFDRDtRQUNFLE9BQU8sRUFBRSx3Q0FBd0M7UUFDakQsSUFBSSxFQUFFO1lBQ0osT0FBTyxJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQixDQUFDO0tBQ0Y7SUFDRDtRQUNFLE9BQU8sRUFBRSxvRUFBb0U7UUFDN0UsSUFBSSxFQUFFO1lBQ0osT0FBTyxJQUFJLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNoQyxDQUFDO0tBQ0Y7SUFDRDtRQUNFLE9BQU8sRUFBRSxnRUFBZ0U7UUFDekUsSUFBSSxFQUFFO1lBQ0osT0FBTyxJQUFJLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNqQyxDQUFDO0tBQ0Y7SUFDRDtRQUNFLE9BQU8sRUFBRSwyREFBMkQ7UUFDcEUsSUFBSSxFQUFFO1lBQ0osT0FBTyxJQUFJLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNqQyxDQUFDO0tBQ0Y7SUFDRDtRQUNFLE9BQU8sRUFBRSwyQ0FBMkM7UUFDcEQsSUFBSSxFQUFFO1lBQ0osT0FBTyxJQUFJLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNuQyxDQUFDO0tBQ0Y7SUFDRDtRQUNFLE9BQU8sRUFBRSxnQkFBZ0I7UUFDekIsSUFBSSxFQUFFO1lBQ0osT0FBTyxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNwQyxDQUFDO0tBQ0Y7Q0FDRixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkVXLG1CQUFXLEdBQVc7SUFDakM7UUFDRSxPQUFPLEVBQUUsc0RBQXNEO1FBQy9ELElBQUksRUFBRTtZQUNKLElBQU0sV0FBVyxHQUFHLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQy9DLElBQU0sV0FBVyxHQUFHLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBRS9DLE9BQU8sV0FBVyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN4QyxDQUFDO0tBQ0Y7SUFDRDtRQUNFLE9BQU8sRUFBRSxrQ0FBa0M7UUFDM0MsSUFBSSxFQUFFO1lBQ0osSUFBTSxXQUFXLEdBQUcsSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDL0MsSUFBTSxXQUFXLEdBQUcsSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDL0MsSUFBTSxNQUFNLEdBQUcsSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFcEMsT0FBTyxXQUFXLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0RCxDQUFDO0tBQ0Y7Q0FFRixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekJGLG1FQUEyQztBQUczQztJQUlFLDZCQUFhLEdBQVc7UUFDdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7SUFDbkIsQ0FBQztJQUVELHdDQUFVLEdBQVYsVUFBYSxPQUE0QjtRQUN2QyxNQUFNLEtBQUssQ0FBQyx5REFBdUQsSUFBSSxDQUFDLE1BQVEsQ0FBQyxDQUFDO0lBQ3BGLENBQUM7SUFFRCxzQ0FBUSxHQUFSLFVBQVcsT0FBNEI7UUFDckMsT0FBTyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRCxtQ0FBSyxHQUFMLFVBQVEsT0FBNEI7UUFDbEMsSUFBSyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFHO1lBQzlCLE9BQU8sS0FBRyxJQUFNLENBQUM7U0FDbEI7YUFBTSxJQUFLLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUc7WUFDckMsT0FBTyxLQUFHLE9BQVMsQ0FBQztTQUNyQjtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELDBDQUFZLEdBQVosVUFBZSxPQUE0QjtRQUN6QyxJQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUc7WUFDOUIsT0FBTyxLQUFHLE9BQVMsQ0FBQztTQUNyQjthQUFNLElBQUssT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRztZQUNyQyxPQUFPLEtBQUcsSUFBTSxDQUFDO1NBQ2xCO1FBRUQsMENBQTBDO1FBQzFDLDBEQUEwRDtRQUMxRCxJQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLHdCQUFnQixDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFHO1lBQzFFLElBQUksT0FBTyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNoQyxPQUFPLEtBQUssQ0FBQyxDQUFDO2FBQ2Y7U0FDRjtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELHNDQUFRLEdBQVI7UUFDRSxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssd0JBQWdCLENBQUMsUUFBUSxFQUFFO1lBQzdDLE9BQU8sRUFBRTtTQUNWO1FBQ0QsT0FBTyxDQUFHLElBQUksQ0FBQyxNQUFNLFdBQUssSUFBSSxDQUFDLEtBQUssT0FBRyxFQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUNILDBCQUFDO0FBQUQsQ0FBQztBQWxEWSxrREFBbUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGaEMsK0hBQW1FO0FBRW5FO0lBSUUsc0JBQWEsRUFBK0I7WUFBL0Isa0JBQStCLEVBQTlCLElBQUksVUFBRSxNQUFNLFVBQUUsS0FBSztRQUZqQyxhQUFRLEdBQTBCLEVBQUUsQ0FBQztRQUduQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixNQUFNLEdBQU0sTUFBTSxJQUFJLEVBQUUsQ0FBQztRQUN6QixLQUFLLEdBQU8sS0FBSyxDQUFDO1FBRWxCLElBQU0sT0FBTyxHQUFHLHVDQUFpQixDQUFDLE1BQU0sQ0FBQyxLQUFHLE1BQU0sR0FBRyxLQUFPLENBQUMsQ0FBQztRQUM5RCxJQUFJLFlBQVksQ0FBQztRQUVqQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDN0MsWUFBWSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXRELElBQUksWUFBWSxFQUFFO2dCQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLHVDQUFpQixDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDMUQsTUFBTTthQUNQO1NBQ0Y7UUFFRCxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzdCO0lBQ0gsQ0FBQztJQUVELGlDQUFVLEdBQVYsVUFBYSxJQUFrQjs7UUFDN0IsSUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNuQyxJQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO2dDQUsxQixPQUFPO1lBQ2QsSUFBTSxhQUFhLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxVQUFDLFdBQVcsSUFBSyxjQUFPLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUEvQixDQUErQixDQUFDLENBQUM7WUFDL0YsSUFBTSxTQUFTLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxVQUFDLFdBQVcsSUFBSyxjQUFPLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEtBQUssQ0FBQyxFQUE1QyxDQUE0QyxDQUFDLENBQUM7WUFFeEcsSUFBSyxhQUFhLEtBQUssQ0FBQyxDQUFDLElBQUksU0FBUyxLQUFLLENBQUMsQ0FBQyxFQUFHO2dDQUN2QyxLQUFLO2FBQ2I7OztZQVRILHdDQUF3QztZQUN4QyxtREFBbUQ7WUFDbkQsMkRBQTJEO1lBQzNELEtBQW9CLDBDQUFZO2dCQUEzQixJQUFJLE9BQU87c0NBQVAsT0FBTzs7O2FBT2Y7Ozs7Ozs7OztRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELCtCQUFRLEdBQVIsVUFBVyxJQUFrQjtRQUMzQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELDRCQUFLLEdBQUwsVUFBTyxJQUFrQjtRQUN2QixJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUVsRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxtQ0FBWSxHQUFaLFVBQWMsSUFBa0I7O1FBQzlCLElBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRztZQUMzQixPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsSUFBSyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFHO1lBQzNCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxJQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ25DLElBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDbkMsSUFBTSxvQkFBb0IsR0FBMEIsRUFBRSxDQUFDO2dDQUU3QyxPQUFPO1lBQ2YsSUFBTSxTQUFTLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxVQUFDLFdBQVcsSUFBSyxjQUFPLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEtBQUssQ0FBQyxFQUE1QyxDQUE0QyxDQUFDLENBQUM7WUFFeEcsSUFBSyxTQUFTLEtBQUssQ0FBQyxDQUFDLEVBQUc7Z0NBQ2YsS0FBSyxDQUFDO2FBQ2Q7WUFFRCxJQUFNLGNBQWMsR0FBRyxZQUFZLENBQUMsU0FBUyxDQUFDLFVBQUMsV0FBVyxJQUFLLFFBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxFQUFuQyxDQUFtQyxDQUFDLENBQUM7WUFFcEcsSUFBSyxjQUFjLEtBQUssQ0FBQyxDQUFDLEVBQUc7Z0JBQzNCLElBQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7Z0JBRXpFLG9CQUFvQixDQUFDLElBQUksQ0FBQyx1Q0FBaUIsQ0FBQyxNQUFNLENBQUMsS0FBRyxhQUFlLENBQUMsQ0FBQyxDQUFDO2dCQUN4RSxZQUFZLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUN4QztpQkFBTTtnQkFDTCxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDcEM7OztZQWhCSCxLQUFxQiwwQ0FBWTtnQkFBM0IsSUFBSSxPQUFPO3NDQUFQLE9BQU87OzthQWlCaEI7Ozs7Ozs7Ozs7WUFFRCxLQUFxQiwwQ0FBWSwrR0FBRztnQkFBOUIsSUFBSSxPQUFPO2dCQUNmLG9CQUFvQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNwQzs7Ozs7Ozs7O1FBRUQsSUFBTSxnQkFBZ0IsR0FBRyxJQUFJLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELGdCQUFnQixDQUFDLFFBQVEsR0FBRyxvQkFBb0IsQ0FBQztRQUVqRCxPQUFPLGdCQUFnQixDQUFDO0lBQzFCLENBQUM7SUFFRCwrQkFBUSxHQUFSO1FBQUEsaUJBS0M7UUFKQyxPQUFPLElBQUksQ0FBQyxRQUFRO2FBQ2pCLEdBQUcsQ0FBQyxpQkFBTyxJQUFJLFlBQUcsT0FBUyxFQUFaLENBQVksQ0FBQzthQUM1QixJQUFJLEVBQUU7YUFDTixNQUFNLENBQUMsVUFBQyxJQUFJLEVBQUUsT0FBTyxJQUFLLE9BQUcsSUFBSSxTQUFJLEtBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxNQUFHLEVBQWpDLENBQWlDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUNILG1CQUFDO0FBQUQsQ0FBQztBQXhHWSxvQ0FBWTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRHpCO0lBQUE7UUFHRSxZQUFPLEdBQWlCLElBQUksR0FBRyxFQUFFLENBQUM7UUFDbEMsWUFBTyxHQUErQixJQUFJLEdBQUcsRUFBRSxDQUFDO0lBc0lsRCxDQUFDO0lBcElDLHNCQUFJLHVCQUFFO2FBT047WUFDRSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDbEIsQ0FBQzthQVRELFVBQU8sRUFBVTtZQUNmLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDWixNQUFNLFdBQVcsQ0FBQywrQkFBNkIsSUFBSSxDQUFDLEVBQUUsTUFBRyxDQUFDO2FBQzNEO1lBQ0QsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDaEIsQ0FBQzs7O09BQUE7SUFNRCxzQkFBSSw0QkFBTzthQU1YO1lBQ0UsT0FBTyxJQUFJLENBQUMsUUFBUSxJQUFJLEdBQUcsQ0FBQztRQUM5QixDQUFDO2FBUkQsVUFBWSxPQUFlO1lBQ3pCLElBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUU7Z0JBQ3BCLE1BQU0sV0FBVyxDQUFDLDhDQUE4QyxDQUFDLENBQUM7YUFDbkU7WUFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUMxQixDQUFDOzs7T0FBQTtJQUtELDhCQUFZLEdBQVosVUFBYSxTQUF1QjtRQUNsQyxJQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1FBRXRELElBQUksYUFBYSxFQUFFO1lBQ2pCLElBQU0sZUFBZSxHQUFHLGFBQWEsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFOUQsSUFBSSxlQUFlLEtBQUssS0FBSyxDQUFDLEVBQUU7Z0JBQzlCLE1BQU0sSUFBSSxTQUFTLENBQUMsb0NBQW9DLENBQUMsQ0FBQzthQUMzRDtpQkFBTTtnQkFDTCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxDQUFDO2FBQ3ZEO1NBQ0Y7YUFBTTtZQUNMLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDN0M7SUFDSCxDQUFDO0lBRUQsMEJBQVEsR0FBUixVQUFXLFNBQWlCO1FBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCx3QkFBTSxHQUFOLFVBQVMsSUFBYTtRQUNwQixPQUFPLEtBQUcsSUFBTSxLQUFLLEtBQUcsSUFBTSxDQUFDO0lBQ2pDLENBQUM7SUFFRCw0QkFBVSxHQUFWLFVBQWEsSUFBYTs7UUFDeEIsVUFBVTtRQUNWLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ3pELE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxLQUFLO1FBQ0wsSUFBSSxJQUFJLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLEVBQUUsRUFBRTtZQUNsQyxPQUFPLEtBQUssQ0FBQztTQUNkOztZQUVELFVBQVU7WUFDVixLQUFjLHNCQUFJLENBQUMsT0FBTyw2Q0FBRTtnQkFBdkIsSUFBSSxDQUFDO2dCQUNSLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDeEIsT0FBTyxLQUFLLENBQUM7aUJBQ2Q7YUFDRjs7Ozs7Ozs7O1FBRUQsYUFBYTtRQUNiLDJEQUEyRDtRQUMzRCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFO1lBQ3pDLE9BQU8sS0FBSztTQUNiOztZQUNELG1CQUFtQjtZQUNuQixLQUFpQixzQkFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsNkNBQUU7Z0JBQW5DLElBQUksSUFBSTtnQkFDWCxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRTdDLGdEQUFnRDtnQkFDaEQsSUFBSSxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO29CQUMxQyxPQUFPLEtBQUssQ0FBQztpQkFDZDtxQkFBTSxJQUFJLENBQUMsUUFBUSxFQUFFO29CQUNwQixPQUFPLEtBQUssQ0FBQztpQkFDZDthQUNGOzs7Ozs7Ozs7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCwwQkFBUSxHQUFSLFVBQVcsSUFBYTtRQUN0QixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELHVCQUFLLEdBQUwsVUFBTyxJQUFhO1FBQ2xCLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUU1RCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCw4QkFBWSxHQUFaLFVBQWMsSUFBYTtRQUN6QixJQUFJLElBQUksQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxFQUFFLEVBQUU7WUFDN0MsT0FBTyxLQUFLLENBQUMsQ0FBQztTQUNmO1FBQ0QsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxHQUFHLEVBQUU7WUFDakYsT0FBTyxLQUFLLENBQUMsQ0FBQztTQUNmO1FBQ0QsSUFBTSxZQUFZLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUVuQyxZQUFZLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUVyQyxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssR0FBRyxFQUFFO1lBQ3hCLFlBQVksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztTQUNyQztRQUVELElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGFBQUcsSUFBSSxtQkFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBMUIsQ0FBMEIsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGFBQUcsSUFBSSxtQkFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBMUIsQ0FBMEIsQ0FBQyxDQUFDO1FBRXhELElBQUk7WUFDRixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxjQUFJLElBQUksbUJBQVksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQS9CLENBQStCLENBQUMsQ0FBQztZQUM5RCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxjQUFJLElBQUksbUJBQVksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQS9CLENBQStCLENBQUMsQ0FBQztTQUMvRDtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsT0FBTyxLQUFLLENBQUMsQ0FBQztTQUNmO1FBRUQsT0FBTyxZQUFZLENBQUM7SUFDdEIsQ0FBQztJQUVELDBCQUFRLEdBQVI7UUFBQSxpQkFTQztRQVJDLElBQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2hELElBQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFDLElBQUksWUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQW5CLENBQW1CLENBQW1CLENBQUM7UUFFdkcsSUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFDLElBQUksYUFBSSxDQUFHLEVBQVAsQ0FBTyxDQUFDLENBQUM7UUFDN0MsSUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFDLElBQUksWUFBRyxDQUFHLEVBQU4sQ0FBTSxDQUFDLENBQUM7UUFDNUMsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBSSxJQUFJLENBQUMsRUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFFM0MsT0FBTyxLQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUcsQ0FBQztJQUMvRSxDQUFDO0lBQ0gsY0FBQztBQUFELENBQUM7QUExSVksMEJBQU87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRnBCLGlDQUFpQztBQUNqQywyQ0FBMkM7QUFDM0Msd0NBQXdDO0FBQ3hDLHdCQUF3QjtBQUN4Qix5QkFBeUI7QUFDekIsd0JBQXdCO0FBQ3hCLG1FQUFpRDtBQUVqRCxJQUFNLGtCQUFrQixHQUFHO0lBQ3pCO1FBQ0UsSUFBSSxFQUFFLG9CQUFZLENBQUMsT0FBTztRQUMxQixFQUFFLEVBQUMsNEJBQTRCO0tBQ2hDO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsb0JBQVksQ0FBQyxFQUFFO1FBQ3JCLEVBQUUsRUFBQywwQkFBMEI7S0FDOUI7SUFDRDtRQUNFLElBQUksRUFBRSxvQkFBWSxDQUFDLEtBQUs7UUFDeEIsRUFBRSxFQUFDLDJCQUEyQjtLQUMvQjtJQUNEO1FBQ0UsSUFBSSxFQUFFLG9CQUFZLENBQUMsU0FBUztRQUM1QixFQUFFLEVBQUMsMkZBQTJGO0tBQy9GO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsb0JBQVksQ0FBQyxVQUFVO1FBQzdCLEVBQUUsRUFBQyx5QkFBeUI7S0FDN0I7SUFDRDtRQUNFLElBQUksRUFBRSxvQkFBWSxDQUFDLFNBQVM7UUFDNUIsRUFBRSxFQUFDLG9CQUFvQjtLQUN4QjtJQUNEO1FBQ0UsSUFBSSxFQUFFLG9CQUFZLENBQUMsS0FBSztRQUN4QixFQUFFLEVBQUMsUUFBUTtLQUNaO0NBQ0YsQ0FBQztBQUdGO0lBS0UsMEJBQWEsUUFBZ0I7UUFGckIsYUFBUSxHQUFXLENBQUMsQ0FBQztRQUczQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQsb0NBQVMsR0FBVDtRQUNFLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxFQUFFLEVBQUU7WUFDeEIsT0FBTyxLQUFLLENBQUMsQ0FBQztTQUNmO1FBRUQsSUFBTSxHQUFHLEdBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM5QixJQUFNLEdBQUcsR0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzlCLElBQU0sT0FBTyxHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQyxVQUFDLENBQUMsSUFBSyxRQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBZCxDQUFjLENBQUMsQ0FBQztRQUMvRCxJQUFJLFNBQTZDLENBQUM7UUFFbEQsU0FBUyxHQUFHLE9BQU8sSUFBSSxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUU1QyxJQUFJLE9BQU8sSUFBSSxTQUFTLEVBQUU7WUFDbEIsZ0JBQXNCLFNBQVMsR0FBOUIsSUFBSSxVQUFLLFFBQVEsY0FBYSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUVsQyxPQUFPO2dCQUNMLElBQUksRUFBTSxPQUFPLENBQUMsSUFBSTtnQkFDdEIsTUFBTSxFQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDO2dCQUN2QyxRQUFRLEVBQUUsR0FBRztnQkFDYixNQUFNLEVBQUksSUFBSSxDQUFDLE1BQU07YUFDdEIsQ0FBQztTQUNIO1FBRUQsd0RBQXdEO1FBQ3hELElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBRW5CLE9BQU87WUFDTCxJQUFJLEVBQU0sb0JBQVksQ0FBQyxPQUFPO1lBQzlCLE1BQU0sRUFBSSxDQUFDLEdBQUcsQ0FBQztZQUNmLFFBQVEsRUFBRSxHQUFHO1lBQ2IsTUFBTSxFQUFJLEdBQUcsQ0FBQyxNQUFNO1NBQ3JCO0lBQ0gsQ0FBQztJQUVPLHlDQUFjLEdBQXRCLFVBQXVCLE1BQWdCO1FBQ3JDLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFLLElBQUksUUFBQyxDQUFDLEtBQUssRUFBUCxDQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsZUFBSztZQUM5QyxJQUFNLGNBQWMsR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFckQsT0FBTyxjQUFjLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNyRCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDSCx1QkFBQztBQUFELENBQUM7QUFwRFksNENBQWdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeEM3Qiw0RUFBcUM7QUFDckMsbUVBQW9EO0FBQ3BELDBHQUF3RDtBQUN4RCwyRkFBK0M7QUFTL0MsSUFBTSxVQUFVLEdBQUcsVUFBQyxZQUEwQjtJQUM1QyxPQUFPLHVDQUEyQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDdkYsQ0FBQyxDQUFDO0FBRUY7SUFHRSxxQkFBWSxXQUFtQjtRQUYvQixXQUFNLEdBQW9CLENBQUMsRUFBRSxDQUFDLENBQUM7UUFHN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRUQsNkJBQU8sR0FBUCxVQUFRLFFBQXNCO1FBQzVCLElBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUUsQ0FBQyxDQUFDLENBQUM7UUFFeEQsSUFBSSxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDeEIsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDdEI7YUFBTTtZQUNMLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDN0I7SUFDSCxDQUFDO0lBRUQsZ0NBQVUsR0FBVixVQUFXLFFBQXFCO1FBQzlCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCw4QkFBUSxHQUFSLFVBQVMsUUFBcUI7UUFDNUIsT0FBTyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxrQ0FBWSxHQUFaLFVBQWEsUUFBcUI7UUFDaEMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzdCLE9BQU8sUUFBUSxDQUFDO1NBQ2pCO1FBRUQsSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzdCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCwrQkFBK0I7UUFDL0IsT0FBTyxLQUFLLENBQUMsQ0FBQztJQUNoQixDQUFDO0lBRUQsOEJBQVEsR0FBUjtRQUNFLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxlQUFLO1lBQ3ZCLEtBQUssQ0FBQyxPQUFPLENBQUMsc0JBQVk7Z0JBQ3hCLElBQU0sSUFBSSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQUksWUFBWSxDQUFDLElBQUksTUFBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7Z0JBQ2hFLE1BQU0sSUFBSSxLQUFHLFlBQVksQ0FBQyxJQUFJLEdBQUcsSUFBTSxDQUFDO1lBQzFDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssMkJBQUssR0FBYixVQUFjLFdBQW1CO1FBQy9CLElBQU0sS0FBSyxHQUFHLElBQUkscUNBQWdCLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDaEQsSUFBSSxJQUFJLEdBQU0sSUFBSSxrQkFBTyxFQUFFLENBQUM7UUFDNUIsSUFBSSxLQUFLLENBQUM7UUFFVixPQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDL0IsUUFBTyxLQUFLLENBQUMsSUFBSSxFQUFFO2dCQUNqQixLQUFLLG9CQUFZLENBQUMsT0FBTztvQkFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMvQixNQUFNO2dCQUNSLEtBQUssb0JBQVksQ0FBQyxFQUFFO29CQUNsQixJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzFCLE1BQU07Z0JBQ1IsS0FBSyxvQkFBWSxDQUFDLEtBQUs7b0JBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMvQixNQUFNO2dCQUNSLEtBQUssb0JBQVksQ0FBQyxTQUFTO29CQUN6QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksNEJBQVksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDbEQsTUFBTTtnQkFDUixLQUFLLG9CQUFZLENBQUMsVUFBVSxDQUFDO2dCQUM3QixLQUFLLG9CQUFZLENBQUMsS0FBSztvQkFDckIsSUFBTSxJQUFJLEdBQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQWdCLENBQUM7b0JBQ2hELElBQU0sUUFBUSxHQUFHLEVBQUUsSUFBSSxRQUFFLElBQUksUUFBRSxDQUFDO29CQUVoQyxJQUFJLEdBQUcsSUFBSSxrQkFBTyxFQUFFLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ3ZCLE1BQU07Z0JBQ1I7b0JBQ0UsTUFBTSxJQUFJLFdBQVcsQ0FBQyxtQkFBaUIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMscUJBQWdCLEtBQUssQ0FBQyxRQUFVLENBQUMsQ0FBQzthQUMzRjtTQUNGO1FBQ0QsMENBQTBDO1FBQzFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLFFBQUUsSUFBSSxlQUFrQixFQUFFLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRU8sc0NBQWdCLEdBQXhCLFVBQXlCLFdBQTRCLEVBQUUsV0FBNkI7UUFDbEYsd0VBQXdFO1FBQ3hFLElBQUk7UUFDSixJQUFJO1FBQ0osSUFBSSxXQUFXLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUM1QixPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsMEVBQTBFO1FBQzFFLElBQUk7UUFDSixJQUFJO1FBQ0osSUFBSSxXQUFXLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUM1QixPQUFPLEtBQUssQ0FBQztTQUNkO1FBRUQsMkRBQTJEO1FBQzNELFFBQVE7UUFDUixNQUFNO1FBQ04sSUFBSSxXQUFXLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUU7WUFDM0MsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELElBQU0sUUFBUSxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3JELElBQU0sUUFBUSxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRXJELDhFQUE4RTtRQUM5RSxhQUFhO1FBQ2IsV0FBVztRQUNYLElBQU0saUJBQWlCLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQzdELElBQU0saUJBQWlCLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQzdELElBQUksaUJBQWlCLG9CQUFzQixJQUFJLGlCQUFpQix5QkFBMkIsRUFBRTtZQUMzRixPQUFPLEtBQUssQ0FBQztTQUNkO1FBRUQsWUFBWTtRQUNaLG9CQUFvQjtRQUNwQixJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUFFO1lBQzFDLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2xGO1FBRUQsK0RBQStEO1FBQy9ELFFBQVE7UUFDUixhQUFhO1FBQ2Isc0NBQXNDO1FBQ3RDLGFBQWE7UUFDYixhQUFhO1FBQ2IsSUFBSSxpQkFBaUIsb0JBQXNCLElBQUksaUJBQWlCLGtCQUFxQixFQUFFO1lBQ3JGLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCx1REFBdUQ7UUFDdkQsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBR08sbUNBQWEsR0FBckIsVUFBc0IsUUFBdUIsRUFBRSxRQUF1QjtRQUNwRSx3RUFBd0U7UUFDeEUsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUN6QixPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsdUVBQXVFO1FBQ3ZFLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDekIsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELHFEQUFxRDtRQUNyRCxJQUFJLFFBQVEsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUNyQyxPQUFPLEtBQUssQ0FBQztTQUNkO1FBRUQsSUFBTSxlQUFlLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdEQsSUFBTSxlQUFlLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFdEQseUZBQXlGO1FBQ3pGLGFBQWE7UUFDYixhQUFhO1FBQ2IsSUFBTSxjQUFjLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FBQztRQUM1QyxJQUFNLGNBQWMsR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDO1FBQzVDLElBQUksY0FBYyx1QkFBeUIsSUFBSSxjQUFjLHNCQUF3QixFQUFFO1lBQ3JGLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxZQUFZO1FBQ1osZ0JBQWdCO1FBQ2hCLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3pELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN6RTtRQUVELHlDQUF5QztRQUN6QyxJQUFJLGVBQWUsQ0FBQyxJQUFJLHVCQUF5QixFQUFFO1lBQ2pELE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCw4Q0FBOEM7UUFDOUMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUNILGtCQUFDO0FBQUQsQ0FBQztBQTNMWSxrQ0FBVzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hCeEIsd0ZBQTZDO0FBRTdDO0lBR0U7OztPQUdHO0lBQ0gsZUFBYSxRQUFnQjtRQUMzQixvRUFBb0U7UUFDcEUsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLEdBQUcsSUFBSyxXQUFJLDBCQUFXLENBQUMsR0FBRyxDQUFDLEVBQXBCLENBQW9CLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsMEJBQVUsR0FBVixVQUFXLEdBQVU7UUFDbkIsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7UUFFakMsT0FBTSxLQUFLLEVBQUUsRUFBRTtZQUNiLElBQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFdBQUMsSUFBSSxRQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBbEMsQ0FBa0MsQ0FBQyxDQUFDO1lBRXpGLElBQUksY0FBYyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUN6QixPQUFPLEtBQUssQ0FBQzthQUNkO1NBQ0Y7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRDs7O09BR0c7SUFDSCx3QkFBUSxHQUFSLFVBQVMsR0FBVTtRQUNqQixPQUFPLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVEOzs7T0FHRztJQUNILHFCQUFLLEdBQUwsVUFBTSxHQUFVO1FBQWhCLGlCQWdCQztRQWZDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN4QixPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3RCLE9BQU8sR0FBRyxDQUFDO1NBQ1o7UUFFRCxzQ0FBc0M7UUFDdEMsSUFBTSxRQUFRLEdBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsaUJBQU8sSUFBSSxVQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxrQkFBUSxJQUFJLFlBQUcsT0FBUyxLQUFLLEtBQUcsUUFBVSxFQUE5QixDQUE4QixDQUFDLEVBQTlELENBQThELENBQUMsQ0FBQztRQUNuSCxJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxpQkFBTyxJQUFJLFFBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsa0JBQVEsSUFBSSxjQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUExQixDQUEwQixDQUFDLEVBQTNELENBQTJELENBQUMsQ0FBQztRQUNoSCxJQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxrQkFBUSxJQUFJLFFBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsaUJBQU8sSUFBSSxlQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUExQixDQUEwQixDQUFDLEVBQTNELENBQTJELENBQUMsQ0FBQztRQUNoSCxJQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUUzRCxPQUFPLElBQUksS0FBSyxDQUFDLEtBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxXQUFDLElBQUksUUFBQyxDQUFDLFFBQVEsRUFBRSxFQUFaLENBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUcsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsNEJBQVksR0FBWixVQUFhLEdBQVU7UUFDckIsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3hCLE9BQU8sR0FBRyxDQUFDO1NBQ1o7UUFFRCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDdEIsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELDZDQUE2QztRQUM3QywrREFBK0Q7UUFDL0QsSUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLFNBQVM7YUFDakMsR0FBRyxDQUFDLGlCQUFPLElBQUksVUFBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsa0JBQVEsSUFBSSxjQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxFQUE5QixDQUE4QixDQUFDLEVBQTdELENBQTZELENBQUM7YUFDN0UsTUFBTSxDQUFDLFVBQUMsSUFBSSxFQUFFLEdBQUcsSUFBSyxXQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFoQixDQUFnQixFQUFFLEVBQUUsQ0FBQzthQUMzQyxNQUFNLENBQUMsVUFBQyxHQUFHLElBQUssUUFBQyxDQUFDLEdBQUcsRUFBTCxDQUFLLENBQUM7YUFDdEIsR0FBRyxDQUFDLFVBQUMsR0FBRyxJQUFLLFlBQUcsR0FBSyxFQUFSLENBQVEsQ0FBQyxDQUFDO1FBRTFCLElBQUksYUFBYSxDQUFDLE1BQU0sRUFBRTtZQUN4QixPQUFPLElBQUksS0FBSyxDQUFDLEtBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUcsQ0FBQyxDQUFDO1NBQ2hEO1FBRUQsT0FBTyxLQUFLLENBQUMsQ0FBQztJQUNoQixDQUFDO0lBRUQsd0JBQVEsR0FBUjtRQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsV0FBQyxJQUFJLFlBQUcsQ0FBRyxFQUFOLENBQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBQ0gsWUFBQztBQUFELENBQUM7QUEzRlksc0JBQUs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRmxCLG9FQUE0QztBQUM1QyxvSEFBK0Q7QUFFL0QsSUFBTSxlQUFlLEdBQUc7SUFDdEIsd0JBQWdCLENBQUMsTUFBTTtJQUN2Qix3QkFBZ0IsQ0FBQyxNQUFNO0lBQ3ZCLHdCQUFnQixDQUFDLE9BQU87SUFDeEIsd0JBQWdCLENBQUMsVUFBVTtJQUMzQix3QkFBZ0IsQ0FBQyxRQUFRO0lBQ3pCLHdCQUFnQixDQUFDLEtBQUs7Q0FDdkIsQ0FBQztBQUVGO0lBQXdDLHNDQUFtQjtJQUEzRDtRQUFBLHFFQVVDO1FBVFUsWUFBTSxHQUFxQix3QkFBZ0IsQ0FBQyxRQUFRLENBQUM7O0lBU2hFLENBQUM7SUFQQyx1Q0FBVSxHQUFWLFVBQWEsT0FBNEI7UUFDdkMsSUFBSSxlQUFlLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUNsRCxPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUNqRDtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUNILHlCQUFDO0FBQUQsQ0FBQyxDQVZ1QywyQ0FBbUIsR0FVMUQ7QUFWWSxnREFBa0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWC9CLG9FQUE0QztBQUM1Qyw2R0FBd0Q7QUFDeEQsdUdBQW9EO0FBQ3BELHVHQUFvRDtBQUNwRCxvR0FBa0Q7QUFDbEQsNkdBQXdEO0FBQ3hELG1IQUE0RDtBQUM1RCwwR0FBc0Q7QUFNdEQsSUFBTSxPQUFPO0lBQ1gsR0FBQyx3QkFBZ0IsQ0FBQyxRQUFRLElBQUsscUNBQWtCO0lBQ2pELEdBQUMsd0JBQWdCLENBQUMsTUFBTSxJQUFPLGlDQUFnQjtJQUMvQyxHQUFDLHdCQUFnQixDQUFDLE1BQU0sSUFBTyxpQ0FBZ0I7SUFDL0MsR0FBQyx3QkFBZ0IsQ0FBQyxLQUFLLElBQVEsK0JBQWU7SUFDOUMsR0FBQyx3QkFBZ0IsQ0FBQyxRQUFRLElBQUsscUNBQWtCO0lBQ2pELEdBQUMsd0JBQWdCLENBQUMsVUFBVSxJQUFHLHlDQUFvQjtJQUNuRCxHQUFDLHdCQUFnQixDQUFDLE9BQU8sSUFBTSxtQ0FBaUI7T0FDakQ7QUFFRCxJQUFNLGFBQWEsR0FBRztJQUNwQixLQUFLLEVBQUcsMEJBQTBCO0lBQ2xDLE1BQU0sRUFBRSxjQUFjO0NBQ3ZCLENBQUM7QUFFRjtJQUFBO0lBWUEsQ0FBQztJQVhRLHdCQUFNLEdBQWIsVUFBZSxRQUFxQjtRQUFyQix3Q0FBcUI7UUFDbEMsSUFBTSxLQUFLLEdBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQyxJQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ3ZELElBQU0sS0FBSyxHQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUVoRCxJQUFLLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRztZQUNqRCxNQUFNLElBQUksV0FBVyxDQUFDLGdDQUE4QixRQUFVLENBQUMsQ0FBQztTQUNqRTtRQUVELE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUNILHdCQUFDO0FBQUQsQ0FBQztBQVpZLDhDQUFpQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3QjlCLG9FQUE0QztBQUM1QyxvSEFBK0Q7QUFFL0Q7SUFBcUMsbUNBQW1CO0lBQXhEO1FBQUEscUVBTUM7UUFMVSxZQUFNLEdBQXFCLHdCQUFnQixDQUFDLEtBQUssQ0FBQzs7SUFLN0QsQ0FBQztJQUhDLG9DQUFVLEdBQVYsVUFBYSxPQUE0QjtRQUN2QyxPQUFPLE9BQU8sQ0FBQyxNQUFNLEtBQUssd0JBQWdCLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssT0FBTyxDQUFDLEtBQUssQ0FBQztJQUNuRixDQUFDO0lBQ0gsc0JBQUM7QUFBRCxDQUFDLENBTm9DLDJDQUFtQixHQU12RDtBQU5ZLDBDQUFlOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0g1QixvRUFBNEM7QUFDNUMsb0hBQStEO0FBRS9ELElBQU0sZUFBZSxHQUFHO0lBQ3RCLHdCQUFnQixDQUFDLEtBQUs7SUFDdEIsd0JBQWdCLENBQUMsVUFBVTtDQUM1QixDQUFDO0FBRUY7SUFBMEMsd0NBQW1CO0lBQTdEO1FBQUEscUVBb0JDO1FBbkJVLFlBQU0sR0FBcUIsd0JBQWdCLENBQUMsVUFBVSxDQUFDOztJQW1CbEUsQ0FBQztJQWpCQyx5Q0FBVSxHQUFWLFVBQWEsT0FBNEI7UUFDdkMsSUFBSSxlQUFlLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUNsRCxPQUFPLE9BQU8sQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQztTQUNyQztRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELDJDQUFZLEdBQVosVUFBZSxPQUE0QjtRQUN6QyxJQUFLLElBQUksQ0FBQyxLQUFLLEtBQUssT0FBTyxDQUFDLEtBQUssRUFBRztZQUNsQyxJQUFLLE9BQU8sQ0FBQyxNQUFNLEtBQUssd0JBQWdCLENBQUMsS0FBSyxFQUFHO2dCQUMvQyxPQUFPLFFBQUssSUFBSSxDQUFDLEtBQUssT0FBRyxDQUFDO2FBQzNCO1NBQ0Y7UUFFRCxPQUFPLGlCQUFNLFlBQVksWUFBQyxPQUFPLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBQ0gsMkJBQUM7QUFBRCxDQUFDLENBcEJ5QywyQ0FBbUIsR0FvQjVEO0FBcEJZLG9EQUFvQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNSakMsb0VBQTRDO0FBQzVDLG9IQUErRDtBQUUvRCxJQUFNLGVBQWUsR0FBRztJQUN0Qix3QkFBZ0IsQ0FBQyxNQUFNO0lBQ3ZCLHdCQUFnQixDQUFDLE9BQU87SUFDeEIsd0JBQWdCLENBQUMsS0FBSztDQUN2QixDQUFDO0FBRUY7SUFBc0Msb0NBQW1CO0lBQXpEO1FBQUEscUVBK0NDO1FBOUNVLFlBQU0sR0FBcUIsd0JBQWdCLENBQUMsTUFBTSxDQUFDOztJQThDOUQsQ0FBQztJQTVDQyxxQ0FBVSxHQUFWLFVBQWEsT0FBNEI7UUFFdkMsSUFBSSxlQUFlLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUNsRCxPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM3QztRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELGdDQUFLLEdBQUwsVUFBUSxPQUE0QjtRQUVsQyxJQUFLLElBQUksQ0FBQyxLQUFLLEtBQUssT0FBTyxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLHdCQUFnQixDQUFDLE9BQU8sRUFBRztZQUNqRixPQUFPLEtBQUcsSUFBTSxDQUFDO1NBQ2xCO1FBRUQsT0FBTyxpQkFBTSxLQUFLLFlBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELHVDQUFZLEdBQVosVUFBZSxPQUE0QjtRQUN6QyxJQUFLLElBQUksQ0FBQyxLQUFLLEtBQUssT0FBTyxDQUFDLEtBQUssRUFBRztZQUNsQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssd0JBQWdCLENBQUMsS0FBSyxFQUFHO2dCQUM5QyxPQUFPLFFBQUssSUFBSSxDQUFDLEtBQUssT0FBRyxDQUFDO2FBQzNCO1NBQ0Y7UUFFRCxJQUFLLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRztZQUMxQyxJQUFLLE9BQU8sQ0FBQyxNQUFNLEtBQUssd0JBQWdCLENBQUMsTUFBTSxFQUFHO2dCQUNoRCxPQUFPLFNBQU0sT0FBTyxDQUFDLEtBQUssT0FBRyxDQUFDO2FBQy9CO1lBQ0QsSUFBSyxPQUFPLENBQUMsTUFBTSxLQUFLLHdCQUFnQixDQUFDLE9BQU8sRUFBRztnQkFDakQsT0FBTyxTQUFNLE9BQU8sQ0FBQyxLQUFLLE9BQUcsQ0FBQzthQUMvQjtTQUNGO1FBRUQsSUFBSyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyx3QkFBZ0IsQ0FBQyxNQUFNLEVBQUc7WUFDeEYsT0FBTyxTQUFNLElBQUksQ0FBQyxLQUFLLE9BQUcsQ0FBQztTQUM1QjtRQUVELElBQUssT0FBTyxDQUFDLE1BQU0sS0FBSyx3QkFBZ0IsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxPQUFPLENBQUMsS0FBSyxFQUFHO1lBQ2hGLE9BQU8sS0FBSyxDQUFDLENBQUM7U0FDZjtRQUVELE9BQU8saUJBQU0sWUFBWSxZQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFDSCx1QkFBQztBQUFELENBQUMsQ0EvQ3FDLDJDQUFtQixHQStDeEQ7QUEvQ1ksNENBQWdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1Q3QixvRUFBNEM7QUFDNUMsb0hBQStEO0FBRS9EO0lBQXdDLHNDQUFtQjtJQUEzRDtRQUFBLHFFQU1DO1FBTFUsWUFBTSxHQUFxQix3QkFBZ0IsQ0FBQyxRQUFRLENBQUM7O0lBS2hFLENBQUM7SUFIQyx1Q0FBVSxHQUFWLFVBQWEsT0FBNEI7UUFDdkMsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ0gseUJBQUM7QUFBRCxDQUFDLENBTnVDLDJDQUFtQixHQU0xRDtBQU5ZLGdEQUFrQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNIL0Isb0VBQTRDO0FBQzVDLG9IQUErRDtBQUUvRCxJQUFNLGVBQWUsR0FBRztJQUN0Qix3QkFBZ0IsQ0FBQyxPQUFPO0lBQ3hCLHdCQUFnQixDQUFDLEtBQUs7Q0FDdkIsQ0FBQztBQUVGO0lBQXVDLHFDQUFtQjtJQUExRDtRQUFBLHFFQW9DQztRQW5DVSxZQUFNLEdBQXFCLHdCQUFnQixDQUFDLE9BQU8sQ0FBQzs7SUFtQy9ELENBQUM7SUFqQ0Msc0NBQVUsR0FBVixVQUFhLE9BQTRCO1FBQ3ZDLElBQUssZUFBZSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUc7WUFDcEQsT0FBTyxPQUFPLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDckM7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxpQ0FBSyxHQUFMLFVBQVEsT0FBNEI7UUFDbEMsSUFBSyxPQUFPLENBQUMsTUFBTSxLQUFLLHdCQUFnQixDQUFDLE9BQU8sRUFBRztZQUNqRCxJQUFLLElBQUksQ0FBQyxLQUFLLEtBQUssT0FBTyxDQUFDLEtBQUssRUFBRztnQkFDbEMsT0FBTyxLQUFHLElBQU0sQ0FBQzthQUNsQjtTQUNGO1FBRUQsT0FBTyxpQkFBTSxLQUFLLFlBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELHdDQUFZLEdBQVosVUFBZSxPQUE0QjtRQUN6QyxJQUFLLElBQUksQ0FBQyxLQUFLLEtBQUssT0FBTyxDQUFDLEtBQUssRUFBRztZQUNsQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssd0JBQWdCLENBQUMsTUFBTSxFQUFHO2dCQUMvQyxPQUFPLFNBQU0sSUFBSSxDQUFDLEtBQUssT0FBRyxDQUFDO2FBQzVCO1NBQ0Y7UUFFRCxJQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRztZQUMxQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssd0JBQWdCLENBQUMsTUFBTSxFQUFHO2dCQUMvQyxPQUFPLFNBQU0sSUFBSSxDQUFDLEtBQUssT0FBRyxDQUFDO2FBQzVCO1NBQ0Y7UUFFRCxPQUFPLGlCQUFNLFlBQVksWUFBQyxPQUFPLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBQ0gsd0JBQUM7QUFBRCxDQUFDLENBcENzQywyQ0FBbUIsR0FvQ3pEO0FBcENZLDhDQUFpQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNSOUIsb0VBQTRDO0FBQzVDLG9IQUErRDtBQUUvRCxJQUFNLGVBQWUsR0FBRztJQUN0Qix3QkFBZ0IsQ0FBQyxNQUFNO0lBQ3ZCLHdCQUFnQixDQUFDLEtBQUs7Q0FDdkIsQ0FBQztBQUVGO0lBQXNDLG9DQUFtQjtJQUF6RDtRQUFBLHFFQTBCQztRQXpCVSxZQUFNLEdBQXFCLHdCQUFnQixDQUFDLE1BQU0sQ0FBQzs7SUF5QjlELENBQUM7SUF2QkMscUNBQVUsR0FBVixVQUFhLE9BQTRCO1FBQ3ZDLElBQUksZUFBZSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDbEQsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDM0M7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCx1Q0FBWSxHQUFaLFVBQWUsT0FBNEI7UUFDekMsSUFBSyxPQUFPLENBQUMsTUFBTSxLQUFLLHdCQUFnQixDQUFDLE1BQU0sRUFBRztZQUNoRCxJQUFLLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUc7Z0JBQzlFLElBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO2dCQUUzRixPQUFPLFNBQU0sWUFBWSxPQUFHO2FBQzdCO1lBRUQsSUFBSyxJQUFJLENBQUMsS0FBSyxLQUFLLE9BQU8sQ0FBQyxLQUFLLEVBQUc7Z0JBQ2xDLE9BQU8sS0FBSyxDQUFDLENBQUM7YUFDZjtTQUNGO1FBRUQsT0FBTyxpQkFBTSxZQUFZLFlBQUMsT0FBTyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUNILHVCQUFDO0FBQUQsQ0FBQyxDQTFCcUMsMkNBQW1CLEdBMEJ4RDtBQTFCWSw0Q0FBZ0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUjdCLElBQVksWUFVWDtBQVZELFdBQVksWUFBWTtJQUN0QiwrQ0FBSTtJQUNKLDJDQUFFO0lBQ0YscURBQU87SUFDUCxpREFBSztJQUNMLHlEQUFTO0lBQ1QsaURBQUs7SUFDTCwyREFBVTtJQUNWLHlEQUFTO0lBQ1QscURBQU87QUFDVCxDQUFDLEVBVlcsWUFBWSxHQUFaLG9CQUFZLEtBQVosb0JBQVksUUFVdkI7QUFRRCxJQUFZLGdCQVFYO0FBUkQsV0FBWSxnQkFBZ0I7SUFDMUIsaUNBQWU7SUFDZiwrQkFBZ0I7SUFDaEIsZ0NBQWdCO0lBQ2hCLGdDQUFnQjtJQUNoQixrQ0FBZ0I7SUFDaEIsaUNBQWdCO0lBQ2hCLG9DQUFnQjtBQUNsQixDQUFDLEVBUlcsZ0JBQWdCLEdBQWhCLHdCQUFnQixLQUFoQix3QkFBZ0IsUUFRM0I7Ozs7Ozs7VUMxQkQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7OztVQ3JCQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDc3NldCB9IGZyb20gJy4uL3NyYy9jc3NldCc7XG5pbXBvcnQgeyBzZXRQbGF5Z3JvdW5kIH0gZnJvbSAnLi9wbGF5Z3JvdW5kJztcbmltcG9ydCB7IFNURVBTLCBydW5TdGVwIH3CoGZyb20gJy4vc3RlcHMnO1xuXG5kZWNsYXJlIHZhciBobGpzOiBhbnk7XG5cbih3aW5kb3cgYXMgYW55KS5Dc3NldCA9IENzc2V0O1xuLy8gKHdpbmRvdyBhcyBhbnkpLmNyZWF0ZVNldCA9IChzZWw6IHN0cmluZykgPT4gbmV3IENzc2V0KHNlbCk7XG5cbi8vIFdoZXJlIHRvIHB1dCBzdGVwIGluZm9cbmNvbnN0IGNvbW1lbnRBcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbW1lbnQnKSBhcyBIVE1MUGFyYWdyYXBoRWxlbWVudDtcbmNvbnN0IHN0eWxlQXJlYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdHlsZScpIGFzIEhUTUxTdHlsZUVsZW1lbnQ7XG5jb25zdCBjb2RlQXJlYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb2RlJykgYXMgSFRNTFByZUVsZW1lbnQ7XG4vLyBDb250cm9sXG5jb25zdCBuZXh0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25leHQnKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcblxuXG4vLyBQcmVwYXJlIHRoZSBwbGF5Z3JvdW5kXG4vLyBTaXplIE1VU1QgYmUgb2RkIG51bWJlclxuY29uc3QgcGxheWdyb3VuZFNpemUgPSAxMDE7XG5jb25zdCBwbGF5Z3JvdW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BsYXlncm91bmQnKTtcbnNldFBsYXlncm91bmQocGxheWdyb3VuZCBhcyBIVE1MVGFibGVFbGVtZW50LCBwbGF5Z3JvdW5kU2l6ZSk7XG5cbmxldCBpbmRleCA9IDA7XG5cbm5leHRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGlmIChuZXh0QnV0dG9uLmlubmVyVGV4dCA9PT0gJ1Jlc3RhcnQnKSB7XG4gICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHN0ZXAgPSBTVEVQU1tpbmRleCsrXTtcblxuICAvLyBQdXQgY29tbWVudCBhbmQgZGlzcGxheSBzbmlwcGV0XG4gIHJ1blN0ZXAoc3RlcCwgY29tbWVudEFyZWEsIGNvZGVBcmVhLCBzdHlsZUFyZWEpO1xuICBobGpzLmhpZ2hsaWdodEJsb2NrKGNvZGVBcmVhKTtcblxuICBpZiAoaW5kZXggPj0gU1RFUFMubGVuZ3RoKSB7XG4gICAgbmV4dEJ1dHRvbi5pbm5lclRleHQgPSAnUmVzdGFydCc7XG4gIH1cbn0pOyIsIlxuLy8gRGl2aWRlIHRoZSBncmlkIGluIDQgcXVhZHJhbnRzXG5mdW5jdGlvbiBtYXJrUXVhZHJhbnQodGQ6IEhUTUxUYWJsZUNlbGxFbGVtZW50LCByb3c6IG51bWJlciwgY29sOiBudW1iZXIsIHNpemU6IG51bWJlcik6IHZvaWQge1xuICBjb25zdCBtaWRkbGUgPSBNYXRoLmZsb29yKHNpemUgLyAyKTtcbiAgbGV0IHF1YWRyYW50ID0gJyc7XG5cbiAgaWYgKHJvdyA8IG1pZGRsZSkge1xuICAgIHF1YWRyYW50ID0gY29sIDwgbWlkZGxlID8gJ29uZScgOiBjb2wgPiBtaWRkbGUgPyAndHdvJyA6ICcnO1xuICB9IGVsc2UgaWYgKHJvdyA+IG1pZGRsZSApe1xuICAgIHF1YWRyYW50ID0gY29sIDwgbWlkZGxlID8gJ3RocmVlJyA6IGNvbCA+IG1pZGRsZSA/ICdmb3VyJyA6ICcnO1xuICB9XG5cbiAgaWYgKHF1YWRyYW50KSB7XG4gICAgdGQuY2xhc3NMaXN0LmFkZChgcXVhZHJhbnQtJHtxdWFkcmFudH1gKTtcbiAgfVxufVxuXG4vLyBQdXQgYSByaG9tYnVzIGluIHRoZSBtaWRkbGVcbmZ1bmN0aW9uIG1hcmtSaG9tYnVzKHRkOiBIVE1MVGFibGVDZWxsRWxlbWVudCwgcm93OiBudW1iZXIsIGNvbDogbnVtYmVyLCBzaXplOiBudW1iZXIpOiB2b2lkIHtcbiAgY29uc3QgZGlmZiA9IChyb3cgPCBzaXplIC8gMikgPyByb3cgOiBzaXplIC0gcm93IC0gMTtcbiAgY29uc3QgaGlnaCA9IChzaXplIC8gMikgKyBkaWZmO1xuICBjb25zdCBsb3cgPSAoc2l6ZSAvIDIpIC0gZGlmZiAtIDE7XG5cbiAgaWYgKGxvdyA8PSBjb2wgJiYgY29sIDw9IGhpZ2gpIHtcbiAgICB0ZC5jbGFzc0xpc3QuYWRkKGBkaWFtb25kYCk7XG4gIH1cbn1cblxuLy8gQWxzbyBhIGNpcmNsZVxuZnVuY3Rpb24gbWFya0NpcmNsZSh0ZDogSFRNTFRhYmxlQ2VsbEVsZW1lbnQsIHJvdzogbnVtYmVyLCBjb2w6IG51bWJlciwgc2l6ZTogbnVtYmVyKTogdm9pZCB7XG4gIGNvbnN0IHJhZGl1cyA9IE1hdGguZmxvb3Ioc2l6ZSAvIDIpO1xuICBjb25zdCBjZW50ZXIgPSB7IHg6IHJhZGl1cywgeTogcmFkaXVzIH07XG4gIGNvbnN0IGRpc3RhbmNlID0gTWF0aC5zcXJ0KFxuICAgIE1hdGgucG93KE1hdGguYWJzKGNlbnRlci54IC0gY29sKSwgMikgK1xuICAgIE1hdGgucG93KE1hdGguYWJzKGNlbnRlci55IC0gcm93KSwgMilcbiAgKTtcblxuICBpZiAoZGlzdGFuY2UgPD0gcmFkaXVzKSB7XG4gICAgdGQuY2xhc3NMaXN0LmFkZChgY2lyY2xlYCk7XG4gIH1cbn1cblxuLy8gbWFuIGZ1bmN0aW9uIHdoaWNoIGNyZWF0ZXMgdGhlIHBsYXlncm91bmQgZ3JpZFxuZXhwb3J0IGZ1bmN0aW9uIHNldFBsYXlncm91bmQodGFibGU6IEhUTUxUYWJsZUVsZW1lbnQsIHNpemU6IG51bWJlcik6IHZvaWQge1xuXG4gIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IHNpemU7IHJvdysrKSB7XG4gICAgY29uc3QgdHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xuICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IHNpemU7IGNvbCsrKSB7XG4gICAgICBjb25zdCB0ZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gICAgICBjb25zdCBzdW0gPSAocm93ICogc2l6ZSkgKyBjb2w7XG4gIFxuICAgICAgdGQuc2V0QXR0cmlidXRlKCdjbGFzcycsICd0aWxlJyk7XG4gICAgICB0ZC5zZXRBdHRyaWJ1dGUoJ2Qtcm93JywgYCR7cm93fWApO1xuICAgICAgdGQuc2V0QXR0cmlidXRlKCdkLWNvbCcsIGAke2NvbH1gKTtcbiAgICAgIHRkLnNldEF0dHJpYnV0ZSgnZC1zdW0nLCBgJHtzdW19YCk7XG4gICAgICB0ZC5zZXRBdHRyaWJ1dGUoJ2Qtb2RkJywgYCR7c3VtICUgMiA9PT0gMH1gKTtcbiAgICAgIHRkLnNldEF0dHJpYnV0ZSgnZC1ldmVuJywgYCR7c3VtICUgMiA9PT0gMX1gKTtcbiAgICAgIC8vIHRkLmlubmVyVGV4dCA9IGAke3N1bX1gO1xuXG4gICAgICBtYXJrUXVhZHJhbnQodGQsIHJvdywgY29sLCBzaXplKTtcbiAgICAgIG1hcmtDaXJjbGUodGQsIHJvdywgY29sLCBzaXplKTtcbiAgICAgIG1hcmtSaG9tYnVzKHRkLCByb3csIGNvbCwgc2l6ZSk7XG4gICAgICB0ci5hcHBlbmRDaGlsZCh0ZCk7XG4gICAgfVxuICAgIHRhYmxlLmFwcGVuZENoaWxkKHRyKTtcbiAgfVxufSIsImltcG9ydCB7IFNURVBTX0lOVFJPIH0gZnJvbSAnLi9zdGVwcy1pbnRybyc7XG5pbXBvcnQgeyBTVEVQU19VTklPTiB9IGZyb20gJy4vc3RlcHMtdW5pb24nO1xuXG5leHBvcnQgKiBmcm9tICcuL3J1bm5lcic7XG5leHBvcnQgY29uc3QgU1RFUFMgPSBbXG4gIC4uLlNURVBTX0lOVFJPLFxuICAuLi5TVEVQU19VTklPTixcbl07XG4iLCJpbXBvcnQgeyBTdGVwIH3CoGZyb20gJy4vdHlwZXMnO1xuXG5mdW5jdGlvbiBnZXRSYW5kb21Db2xvcigpOiBzdHJpbmcge1xuICB2YXIgbGV0dGVycyA9ICcwMTIzNDU2Nzg5QUJDREVGJztcbiAgdmFyIGNvbG9yID0gJyMnO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IDY7IGkrKykge1xuICAgIGNvbG9yICs9IGxldHRlcnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTYpXTtcbiAgfVxuICByZXR1cm4gY29sb3I7XG59XG5cbmZ1bmN0aW9uIGlzQ3NzZXQoc291cmNlOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIHNvdXJjZT8uX19wcm90b19fPy5jb25zdHJ1Y3Rvcj8ubmFtZSA9PT0gJ0Nzc2V0Jztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJ1blN0ZXAoXG4gIHN0ZXA6IFN0ZXAsXG4gIGNvbW1lbnRFbGVtOiBIVE1MRWxlbWVudCxcbiAgY29kZUVsZW06IEhUTUxFbGVtZW50LFxuICBzdHllRWxlbTogSFRNTEVsZW1lbnRcbik6IHZvaWQge1xuICAvLyBQdXQgY29tbWVudFxuICBjb21tZW50RWxlbS5pbm5lclRleHQgPSBzdGVwLmNvbW1lbnQ7XG5cbiAgLy8gU2hvdyBjb2RlXG4gIGNvbnN0IHNvdXJjZSA9IHN0ZXAuY29kZS50b1N0cmluZygpO1xuICBjb25zdCBsaW5lc09mQ29kZSA9IHNvdXJjZS5zcGxpdCgnXFxuJykuc2xpY2UoMSwgLTEpLm1hcChsaW5lID0+IHtcbiAgICByZXR1cm4gbGluZS5yZXBsYWNlKC9yZXR1cm4gL2csICcnKTtcbiAgfSk7XG5cbiAgY29kZUVsZW0uaW5uZXJUZXh0ID0gbGluZXNPZkNvZGUuam9pbignXFxuJyk7XG5cbiAgLy8gQ2hhbmdlIGNvbG9yIGlmIHJldHVybmVkIGV4cHJlc3Npb24gaXMgYSBDc3NldFxuICBjb25zdCBldmFsUmVzdWx0ID0gZXZhbChgKCR7c291cmNlfSkoKWApO1xuICBjb25zdCBzdHlsZVRleHQgPSBgJHtldmFsUmVzdWx0fXsgYmFja2dyb3VuZC1jb2xvcjogJHtnZXRSYW5kb21Db2xvcigpfTsgfWA7XG5cbiAgaWYgKGlzQ3NzZXQoZXZhbFJlc3VsdCkpIHtcbiAgICBzdHllRWxlbS5pbm5lclRleHQgPSBzdHlsZVRleHQ7XG4gIH0gZWxzZSB7XG4gICAgc3R5ZUVsZW0uaW5uZXJUZXh0ID0gJyc7XG4gIH1cbn1cbiIsImltcG9ydCB7IFN0ZXAgfSBmcm9tICcuL3R5cGVzJztcblxuZGVjbGFyZSB2YXIgQ3NzZXQ6IGFueTtcblxuZXhwb3J0IGNvbnN0IFNURVBTX0lOVFJPOiBTdGVwW10gPSBbXG4gIHtcbiAgICBjb21tZW50OiBcIlRoZXNlIGFyZSB0aGUgY2VsbHMgd2l0aCBjbGFzcyBxdWFkcmFudC1vbmVcIixcbiAgICBjb2RlOiAoKSA9PiB7XG4gICAgICByZXR1cm4gbmV3IENzc2V0KCcucXVhZHJhbnQtb25lJyk7XG4gICAgfVxuICB9LFxuICB7XG4gICAgY29tbWVudDogXCJUaGVzZSBhcmUgdGhlIGNlbGxzIHdpdGggY2xhc3MgcXVhZHJhbnQtdHdvXCIsXG4gICAgY29kZTogKCkgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBDc3NldCgnLnF1YWRyYW50LXR3bycpO1xuICAgIH1cbiAgfSxcbiAge1xuICAgIGNvbW1lbnQ6IFwiVGhlc2UgYXJlIHRoZSBjZWxscyB3aXRoIGNsYXNzIHF1YWRyYW50LXRocmVlXCIsXG4gICAgY29kZTogKCkgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBDc3NldCgnLnF1YWRyYW50LXRocmVlJyk7XG4gICAgfVxuICB9LFxuICB7XG4gICAgY29tbWVudDogXCJUaGVzZSBhcmUgdGhlIGNlbGxzIHdpdGggY2xhc3MgcXVhZHJhbnQtZm91clwiLFxuICAgIGNvZGU6ICgpID0+IHtcbiAgICAgIHJldHVybiBuZXcgQ3NzZXQoJy5xdWFkcmFudC1mb3VyJyk7XG4gICAgfVxuICB9LFxuICB7XG4gICAgY29tbWVudDogXCJUaGVzZSBhcmUgdGhlIGNlbGxzIHdpdGggY2xhc3MgY2lyY2xlXCIsXG4gICAgY29kZTogKCkgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBDc3NldCgnLmNpcmNsZScpO1xuICAgIH1cbiAgfSxcbiAge1xuICAgIGNvbW1lbnQ6IFwiVGhlc2UgYXJlIHRoZSBjZWxscyB3aXRoIGNsYXNzIGRpYW1vbmRcIixcbiAgICBjb2RlOiAoKSA9PiB7XG4gICAgICByZXR1cm4gbmV3IENzc2V0KCcuZGlhbW9uZCcpO1xuICAgIH1cbiAgfSxcbiAge1xuICAgIGNvbW1lbnQ6IFwiQ2VsbHMgYWxzbyBjb250YWluIGEgZC1yb3cgYXR0cmlidXRlIHdpdGggdGhlIHJvdyBudW1iZXIgdGhleSBoYXZlXCIsXG4gICAgY29kZTogKCkgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBDc3NldCgnW2Qtcm93PTVdJyk7XG4gICAgfVxuICB9LFxuICB7XG4gICAgY29tbWVudDogXCJBbmQgY29udGFpbiBhIGQtY29sIGF0dHJpYnV0ZSB3aXRoIHRoZSBjb2x1bW4gbnVtYmVyIHRoZXkgaGF2ZVwiLFxuICAgIGNvZGU6ICgpID0+IHtcbiAgICAgIHJldHVybiBuZXcgQ3NzZXQoJ1tkLWNvbD01MF0nKTtcbiAgICB9XG4gIH0sXG4gIHtcbiAgICBjb21tZW50OiBcIkVhY2ggY2VsbCBvZiB0aGUgZ3JpZCBoYXMgaXRzIG51bWJlciBpbiBhIGQtc3VtIGF0dHJpYnV0ZVwiLFxuICAgIGNvZGU6ICgpID0+IHtcbiAgICAgIHJldHVybiBuZXcgQ3NzZXQoJ1tkLXN1bT01MF0nKTtcbiAgICB9XG4gIH0sXG4gIHtcbiAgICBjb21tZW50OiBcIkFkZCB0aGUgY2VsbCBoYXMgbWFya2VkIGlmIGl0cyBvZGQgbnVtYmVyXCIsXG4gICAgY29kZTogKCkgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBDc3NldCgnW2Qtb2RkPXRydWVdJyk7XG4gICAgfVxuICB9LFxuICB7XG4gICAgY29tbWVudDogXCJPciBldmVuIG51bWJlclwiLFxuICAgIGNvZGU6ICgpID0+IHtcbiAgICAgIHJldHVybiBuZXcgQ3NzZXQoJ1tkLWV2ZW49dHJ1ZV0nKTtcbiAgICB9XG4gIH0sXG5dO1xuIiwiaW1wb3J0IHsgU3RlcCB9IGZyb20gJy4vdHlwZXMnO1xuXG5kZWNsYXJlIHZhciBDc3NldDogYW55O1xuXG5leHBvcnQgY29uc3QgU1RFUFNfVU5JT046IFN0ZXBbXSA9IFtcbiAge1xuICAgIGNvbW1lbnQ6IFwiVW5pb24gaXMgYSBzdHJhaWdodCBmb3J3YXJkIG1ldGhvZCB1c2VkIHRvIGpvaW4gc2V0c1wiLFxuICAgIGNvZGU6ICgpID0+IHtcbiAgICAgIGNvbnN0IHF1YWRyYW50T25lID0gbmV3IENzc2V0KCcucXVhZHJhbnQtb25lJyk7XG4gICAgICBjb25zdCBxdWFkcmFudFR3byA9IG5ldyBDc3NldCgnLnF1YWRyYW50LXR3bycpO1xuXG4gICAgICByZXR1cm4gcXVhZHJhbnRPbmUudW5pb24ocXVhZHJhbnRUd28pO1xuICAgIH1cbiAgfSxcbiAge1xuICAgIGNvbW1lbnQ6IFwiWW91IGNhbiBkbyBhbiB1bmlvbiBvZiBtYW55IHNldHNcIixcbiAgICBjb2RlOiAoKSA9PiB7XG4gICAgICBjb25zdCBxdWFkcmFudE9uZSA9IG5ldyBDc3NldCgnLnF1YWRyYW50LW9uZScpO1xuICAgICAgY29uc3QgcXVhZHJhbnRUd28gPSBuZXcgQ3NzZXQoJy5xdWFkcmFudC10d28nKTtcbiAgICAgIGNvbnN0IGNpcmNsZSA9IG5ldyBDc3NldCgnLmNpcmNsZScpO1xuXG4gICAgICByZXR1cm4gcXVhZHJhbnRPbmUudW5pb24ocXVhZHJhbnRUd28pLnVuaW9uKGNpcmNsZSk7XG4gICAgfVxuICB9LFxuICBcbl07XG4iLCJpbXBvcnQgeyBDc3NNYXRjaGVyU3ltYm9sIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuXG5leHBvcnQgY2xhc3MgQ3NzQXR0cmlidXRlTWF0Y2hlciB7XG4gIHJlYWRvbmx5IHN5bWJvbDogQ3NzTWF0Y2hlclN5bWJvbDtcbiAgdmFsdWU6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvciAodmFsOiBzdHJpbmcpIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsO1xuICB9XG5cbiAgc3VwZXJzZXRPZiAoIG1hdGNoZXI6IENzc0F0dHJpYnV0ZU1hdGNoZXIgKTogYm9vbGVhbiB7XG4gICAgdGhyb3cgRXJyb3IoYG5vIHN1cGVyc2V0T2YgbWV0aG9kIGltcGxlbWVudGVkIGZvciBtYXRjaGVyIHN5bWJvbCAke3RoaXMuc3ltYm9sfWApO1xuICB9XG5cbiAgc3Vic2V0T2YgKCBtYXRjaGVyOiBDc3NBdHRyaWJ1dGVNYXRjaGVyICk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBtYXRjaGVyLnN1cGVyc2V0T2YodGhpcyk7XG4gIH1cblxuICB1bmlvbiAoIG1hdGNoZXI6IENzc0F0dHJpYnV0ZU1hdGNoZXIgKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgaWYgKCB0aGlzLnN1cGVyc2V0T2YobWF0Y2hlcikgKSB7XG4gICAgICByZXR1cm4gYCR7dGhpc31gO1xuICAgIH0gZWxzZSBpZiAoIG1hdGNoZXIuc3VwZXJzZXRPZih0aGlzKSApIHtcbiAgICAgIHJldHVybiBgJHttYXRjaGVyfWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBpbnRlcnNlY3Rpb24gKCBtYXRjaGVyOiBDc3NBdHRyaWJ1dGVNYXRjaGVyICk6IHN0cmluZyB8IG51bGwgfCB2b2lkIHtcbiAgICBpZiAoIHRoaXMuc3VwZXJzZXRPZihtYXRjaGVyKSApIHtcbiAgICAgIHJldHVybiBgJHttYXRjaGVyfWA7XG4gICAgfSBlbHNlIGlmICggbWF0Y2hlci5zdXBlcnNldE9mKHRoaXMpICkge1xuICAgICAgcmV0dXJuIGAke3RoaXN9YDtcbiAgICB9XG5cbiAgICAvLyBFcXVhbHMgaW50ZXJzZWN0IHdpdGggYW55IG90aGVyIG1hdGNoZXJcbiAgICAvLyBSZXR1cm4gdm9pZCBpbmRpY2F0aW5nIHRoZSBpbnRlcnNlY3Rpb24gaXMgYW4gZW1wdHkgc2V0XG4gICAgaWYgKCBbdGhpcy5zeW1ib2wsIG1hdGNoZXIuc3ltYm9sXS5pbmRleE9mKENzc01hdGNoZXJTeW1ib2wuRXF1YWwpICE9PSAtMSApIHtcbiAgICAgIGlmIChtYXRjaGVyLnZhbHVlICE9PSB0aGlzLnZhbHVlKSB7XG4gICAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLnN5bWJvbCA9PT0gQ3NzTWF0Y2hlclN5bWJvbC5QcmVzZW5jZSkge1xuICAgICAgcmV0dXJuIGBgXG4gICAgfVxuICAgIHJldHVybiBgJHt0aGlzLnN5bWJvbH09XCIke3RoaXMudmFsdWV9XCJgLnJlcGxhY2UoL149LywgJycpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDc3NBdHRyaWJ1dGVNYXRjaGVyIH0gZnJvbSAnLi9jc3MtYXR0cmlidXRlLW1hdGNoZXInO1xuaW1wb3J0IHsgQ3NzTWF0Y2hlckZhY3RvcnkgfSBmcm9tICcuL21hdGNoZXJzL2Nzcy1tYXRjaGVyLWZhY3RvcnknO1xuXG5leHBvcnQgY2xhc3MgQ3NzQXR0cmlidXRlIHtcbiAgbmFtZSAgICA6IHN0cmluZztcbiAgbWF0Y2hlcnM6IENzc0F0dHJpYnV0ZU1hdGNoZXJbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yIChbbmFtZSwgc3ltYm9sLCB2YWx1ZV06IHN0cmluZ1tdKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICBzeW1ib2wgICAgPSBzeW1ib2wgfHzCoCcnO1xuICAgIHZhbHVlICAgICA9IHZhbHVlO1xuXG4gICAgY29uc3QgbWF0Y2hlciA9IENzc01hdGNoZXJGYWN0b3J5LmNyZWF0ZShgJHtzeW1ib2x9JHt2YWx1ZX1gKTtcbiAgICBsZXQgaW50ZXJzZWN0aW9uO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm1hdGNoZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpbnRlcnNlY3Rpb24gPSBtYXRjaGVyLmludGVyc2VjdGlvbih0aGlzLm1hdGNoZXJzW2ldKTtcbiAgICAgIFxuICAgICAgaWYgKGludGVyc2VjdGlvbikge1xuICAgICAgICB0aGlzLm1hdGNoZXJzW2ldID0gQ3NzTWF0Y2hlckZhY3RvcnkuY3JlYXRlKGludGVyc2VjdGlvbik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghaW50ZXJzZWN0aW9uKSB7XG4gICAgICB0aGlzLm1hdGNoZXJzLnB1c2gobWF0Y2hlcik7XG4gICAgfVxuICB9XG5cbiAgc3VwZXJzZXRPZiAoIGF0dHI6IENzc0F0dHJpYnV0ZSApOiBib29sZWFuIHtcbiAgICBjb25zdCB0aGlzTWF0Y2hlcnMgPSB0aGlzLm1hdGNoZXJzO1xuICAgIGNvbnN0IGF0dHJNYXRjaGVycyA9IGF0dHIubWF0Y2hlcnM7XG5cbiAgICAvLyBUbyBiZSBhIHN1cGVyc2V0IGFsbCBtYXRjaGVycyBpbiB0aGlzXG4gICAgLy8gLSBtdXN0IGJlIGEgc3VwZXJzZXQgb2YgYXQgbGVhc3Qgb25lIGF0dHJNYXRjaGVyXG4gICAgLy8gLSBtdXN0IG5vdCBoYXZlIGEgdm9pZCBpbnRlcnNlY3Rpb24gd2l0aCBhbnkgYXR0ck1hdGNoZXJcbiAgICBmb3IgKGxldCBtYXRjaGVyIG9mIHRoaXNNYXRjaGVycykge1xuICAgICAgY29uc3Qgc3VwZXJzZXRJbmRleCA9IGF0dHJNYXRjaGVycy5maW5kSW5kZXgoKGF0dHJNYXRjaGVyKSA9PiBtYXRjaGVyLnN1cGVyc2V0T2YoYXR0ck1hdGNoZXIpKTtcbiAgICAgIGNvbnN0IHZvaWRJbmRleCA9IGF0dHJNYXRjaGVycy5maW5kSW5kZXgoKGF0dHJNYXRjaGVyKSA9PiBtYXRjaGVyLmludGVyc2VjdGlvbihhdHRyTWF0Y2hlcikgPT09IHZvaWQgMCk7XG5cbiAgICAgIGlmICggc3VwZXJzZXRJbmRleCA9PT0gLTEgfHwgdm9pZEluZGV4ICE9PSAtMSApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgc3Vic2V0T2YgKCBhdHRyOiBDc3NBdHRyaWJ1dGUgKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGF0dHIuc3VwZXJzZXRPZih0aGlzKTtcbiAgfVxuXG4gIHVuaW9uKCBhdHRyOiBDc3NBdHRyaWJ1dGUgKTogQ3NzQXR0cmlidXRlIHwgbnVsbCB7XG4gICAgY29uc3QgdW5pb24gPSB0aGlzLnN1cGVyc2V0T2YoYXR0cikgPyB0aGlzIDpcbiAgICAgICAgICAgICAgICAgIGF0dHIuc3VwZXJzZXRPZih0aGlzKSA/IGF0dHIgOiBudWxsO1xuXG4gICAgcmV0dXJuIHVuaW9uO1xuICB9XG5cbiAgaW50ZXJzZWN0aW9uKCBhdHRyOiBDc3NBdHRyaWJ1dGUgKTogQ3NzQXR0cmlidXRlIHwgdm9pZCB7XG4gICAgaWYgKCB0aGlzLnN1cGVyc2V0T2YoYXR0cikgKSB7XG4gICAgICByZXR1cm4gYXR0cjtcbiAgICB9XG5cbiAgICBpZiAoIGF0dHIuc3VwZXJzZXRPZih0aGlzKSApIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGNvbnN0IHRoaXNNYXRjaGVycyA9IHRoaXMubWF0Y2hlcnM7XG4gICAgY29uc3QgYXR0ck1hdGNoZXJzID0gYXR0ci5tYXRjaGVycztcbiAgICBjb25zdCBpbnRlcnNlY3Rpb25NYXRjaGVyczogQ3NzQXR0cmlidXRlTWF0Y2hlcltdID0gW107XG5cbiAgICBmb3IgKCBsZXQgbWF0Y2hlciBvZiB0aGlzTWF0Y2hlcnMgKSB7XG4gICAgICBjb25zdCB2b2lkSW5kZXggPSBhdHRyTWF0Y2hlcnMuZmluZEluZGV4KChhdHRyTWF0Y2hlcikgPT4gbWF0Y2hlci5pbnRlcnNlY3Rpb24oYXR0ck1hdGNoZXIpID09PSB2b2lkIDApO1xuXG4gICAgICBpZiAoIHZvaWRJbmRleCAhPT0gLTEgKSB7XG4gICAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGNvbnN0IGludGVyc2VjdEluZGV4ID0gYXR0ck1hdGNoZXJzLmZpbmRJbmRleCgoYXR0ck1hdGNoZXIpID0+ICEhbWF0Y2hlci5pbnRlcnNlY3Rpb24oYXR0ck1hdGNoZXIpKTtcblxuICAgICAgaWYgKCBpbnRlcnNlY3RJbmRleCAhPT0gLTEgKSB7XG4gICAgICAgIGNvbnN0IG1hdGNoZXJTdHJpbmcgPSBtYXRjaGVyLmludGVyc2VjdGlvbihhdHRyTWF0Y2hlcnNbaW50ZXJzZWN0SW5kZXhdKTtcblxuICAgICAgICBpbnRlcnNlY3Rpb25NYXRjaGVycy5wdXNoKENzc01hdGNoZXJGYWN0b3J5LmNyZWF0ZShgJHttYXRjaGVyU3RyaW5nfWApKTtcbiAgICAgICAgYXR0ck1hdGNoZXJzLnNwbGljZShpbnRlcnNlY3RJbmRleCwgMSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbnRlcnNlY3Rpb25NYXRjaGVycy5wdXNoKG1hdGNoZXIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoIGxldCBtYXRjaGVyIG9mIGF0dHJNYXRjaGVycyApIHtcbiAgICAgIGludGVyc2VjdGlvbk1hdGNoZXJzLnB1c2gobWF0Y2hlcik7XG4gICAgfVxuXG4gICAgY29uc3QgaW50ZXJzZWN0aW9uQXR0ciA9IG5ldyBDc3NBdHRyaWJ1dGUoW3RoaXMubmFtZV0pO1xuICAgIGludGVyc2VjdGlvbkF0dHIubWF0Y2hlcnMgPSBpbnRlcnNlY3Rpb25NYXRjaGVycztcblxuICAgIHJldHVybiBpbnRlcnNlY3Rpb25BdHRyO1xuICB9XG5cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5tYXRjaGVyc1xuICAgICAgLm1hcChtYXRjaGVyID0+IGAke21hdGNoZXJ9YClcbiAgICAgIC5zb3J0KClcbiAgICAgIC5yZWR1Y2UoKHByZXYsIG1hdGNoZXIpID0+IGAke3ByZXZ9WyR7dGhpcy5uYW1lfSR7bWF0Y2hlcn1dYCwgJycpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDc3NBdHRyaWJ1dGUgfSBmcm9tICcuL2Nzcy1hdHRyaWJ1dGUnO1xuXG5leHBvcnQgY2xhc3MgQ3NzUnVsZSB7XG4gIHByaXZhdGUgX2lkICAgICAgOiBzdHJpbmc7XG4gIHByaXZhdGUgX2VsZW1lbnQgOiBzdHJpbmc7XG4gIGNsYXNzZXMgOiBTZXQ8c3RyaW5nPiA9IG5ldyBTZXQoKTtcbiAgYXR0cmlicyA6IE1hcDxzdHJpbmcsIENzc0F0dHJpYnV0ZT4gPSBuZXcgTWFwKCk7XG5cbiAgc2V0IGlkKGlkOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5faWQpIHtcbiAgICAgIHRocm93IFN5bnRheEVycm9yKGBJZGVudGlmaWVyIGFscmVhZHkgc2V0IHRvICR7dGhpcy5pZH0uYClcbiAgICB9XG4gICAgdGhpcy5faWQgPSBpZDtcbiAgfVxuXG4gIGdldCBpZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9pZDtcbiAgfVxuXG4gIHNldCBlbGVtZW50KGVsZW1lbnQ6IHN0cmluZykge1xuICAgIGlmKHRoaXMuYXR0cmlicy5zaXplKSB7XG4gICAgICB0aHJvdyBTeW50YXhFcnJvcihgRWxlbWVudHMgY2Fubm90IGJlIGRlZmluZWQgYWZ0ZXIgYXR0cmlidXRlcy5gKTtcbiAgICB9XG4gICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gIH1cbiAgZ2V0IGVsZW1lbnQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudCB8fCAnKic7XG4gIH1cblxuICBhZGRBdHRyaWJ1dGUoYXR0cmlidXRlOiBDc3NBdHRyaWJ1dGUpIHtcbiAgICBjb25zdCBwcmV2QXR0cmlidXRlID0gdGhpcy5hdHRyaWJzLmdldChhdHRyaWJ1dGUubmFtZSlcblxuICAgIGlmIChwcmV2QXR0cmlidXRlKSB7XG4gICAgICBjb25zdCBtZXJnZWRBdHRyaWJ1dGUgPSBwcmV2QXR0cmlidXRlLmludGVyc2VjdGlvbihhdHRyaWJ1dGUpO1xuXG4gICAgICBpZiAobWVyZ2VkQXR0cmlidXRlID09PSB2b2lkIDApIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgVGhlIHNlbGVjdG9yIGRlZmluZXMgYW4gZW1wdHkgc2V0LmApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hdHRyaWJzLnNldChwcmV2QXR0cmlidXRlLm5hbWUsIG1lcmdlZEF0dHJpYnV0ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYXR0cmlicy5zZXQoYXR0cmlidXRlLm5hbWUsIGF0dHJpYnV0ZSk7XG4gICAgfVxuICB9XG5cbiAgYWRkQ2xhc3MgKCBjbGFzc05hbWU6IHN0cmluZyApIHtcbiAgICB0aGlzLmNsYXNzZXMuYWRkKGNsYXNzTmFtZSk7XG4gIH1cblxuICBlcXVhbHMgKCBydWxlOiBDc3NSdWxlICk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBgJHt0aGlzfWAgPT09IGAke3J1bGV9YDtcbiAgfVxuXG4gIHN1cGVyc2V0T2YgKCBydWxlOiBDc3NSdWxlICk6IGJvb2xlYW4ge1xuICAgIC8vIEVsZW1lbnRcbiAgICBpZiAodGhpcy5lbGVtZW50ICE9PSAnKicgJiYgdGhpcy5lbGVtZW50ICE9PSBydWxlLmVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBJRFxuICAgIGlmICh0aGlzLmlkICYmIHRoaXMuaWQgIT09IHJ1bGUuaWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBjbGFzc2VzXG4gICAgZm9yIChsZXQgYyBvZiB0aGlzLmNsYXNzZXMpIHtcbiAgICAgIGlmICghcnVsZS5jbGFzc2VzLmhhcyhjKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQXR0cmlidXRlc1xuICAgIC8vIE1vcmUgYXR0cmlicyBtZWFuIG1vcmUgc3BlY2lmaWMgc28gaXQgY2Fubm90IGJlIHN1cGVyc2V0XG4gICAgaWYgKHRoaXMuYXR0cmlicy5zaXplID4gcnVsZS5hdHRyaWJzLnNpemUpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICAvLyBDaGVjayBhdHRyaWJ1dGVzXG4gICAgZm9yIChsZXQgYXR0ciBvZiB0aGlzLmF0dHJpYnMudmFsdWVzKCkpIHtcbiAgICAgIGNvbnN0IHJ1bGVBdHRyID0gcnVsZS5hdHRyaWJzLmdldChhdHRyLm5hbWUpO1xuXG4gICAgICAvLyBhdHRyaWIgc2hvdWxkIGJlIGRlZmluZWQgaW4gYm90aCBhbmQgaW5jbHVkZSBcbiAgICAgIGlmIChydWxlQXR0ciAmJiAhYXR0ci5zdXBlcnNldE9mKHJ1bGVBdHRyKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKCFydWxlQXR0cikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBzdWJzZXRPZiAoIHJ1bGU6IENzc1J1bGUgKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHJ1bGUuc3VwZXJzZXRPZih0aGlzKTtcbiAgfVxuXG4gIHVuaW9uKCBydWxlOiBDc3NSdWxlICk6IENzc1J1bGVbXSB7XG4gICAgY29uc3QgdW5pb24gPSB0aGlzLnN1cGVyc2V0T2YocnVsZSkgPyBbdGhpc10gOlxuICAgICAgICAgICAgICAgICAgcnVsZS5zdXBlcnNldE9mKHRoaXMpID8gW3J1bGVdIDogW3RoaXMsIHJ1bGVdO1xuXG4gICAgcmV0dXJuIHVuaW9uO1xuICB9XG5cbiAgaW50ZXJzZWN0aW9uKCBydWxlOiBDc3NSdWxlICk6IENzc1J1bGUgfCB2b2lkIHtcbiAgICBpZiAodGhpcy5pZCAmJiBydWxlLmlkICYmIHRoaXMuaWQgIT09IHJ1bGUuaWQpIHtcbiAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgfVxuICAgIGlmICh0aGlzLmVsZW1lbnQgIT09IHJ1bGUuZWxlbWVudCAmJiB0aGlzLmVsZW1lbnQgIT09ICcqJyAmJiBydWxlLmVsZW1lbnQgIT09ICcqJykge1xuICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICB9XG4gICAgY29uc3QgaW50ZXJzZWN0aW9uID0gbmV3IENzc1J1bGUoKTtcblxuICAgIGludGVyc2VjdGlvbi5pZCA9IHRoaXMuaWQgfHzCoHJ1bGUuaWQ7XG4gICAgXG4gICAgaWYgKHRoaXMuZWxlbWVudCAhPT0gJyonKSB7XG4gICAgICBpbnRlcnNlY3Rpb24uZWxlbWVudCA9IHRoaXMuZWxlbWVudDtcbiAgICB9XG5cbiAgICB0aGlzLmNsYXNzZXMuZm9yRWFjaChjbHMgPT4gaW50ZXJzZWN0aW9uLmFkZENsYXNzKGNscykpO1xuICAgIHJ1bGUuY2xhc3Nlcy5mb3JFYWNoKGNscyA9PiBpbnRlcnNlY3Rpb24uYWRkQ2xhc3MoY2xzKSk7XG5cbiAgICB0cnkge1xuICAgICAgdGhpcy5hdHRyaWJzLmZvckVhY2goYXR0ciA9PiBpbnRlcnNlY3Rpb24uYWRkQXR0cmlidXRlKGF0dHIpKTtcbiAgICAgIHJ1bGUuYXR0cmlicy5mb3JFYWNoKGF0dHIgPT4gaW50ZXJzZWN0aW9uLmFkZEF0dHJpYnV0ZShhdHRyKSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGludGVyc2VjdGlvbjtcbiAgfVxuXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgY29uc3QgY2xhc3NlcyA9IEFycmF5LmZyb20odGhpcy5jbGFzc2VzKS5zb3J0KCk7XG4gICAgY29uc3QgYXR0cmlicyA9IEFycmF5LmZyb20odGhpcy5hdHRyaWJzLmtleXMoKSkuc29ydCgpLm1hcChuID0+IHRoaXMuYXR0cmlicy5nZXQobikpIGFzIENzc0F0dHJpYnV0ZVtdO1xuXG4gICAgY29uc3Qgc3RyQ2xhc3NlcyA9IGNsYXNzZXMubWFwKG4gPT4gYC4ke259YCk7XG4gICAgY29uc3Qgc3RyQXR0cmlicyA9IGF0dHJpYnMubWFwKGEgPT4gYCR7YX1gKTtcbiAgICBjb25zdCBzdHJJZCA9IHRoaXMuaWQgPyBgIyR7dGhpcy5pZH1gIDogJyc7XG5cbiAgICByZXR1cm4gYCR7dGhpcy5lbGVtZW50fSR7c3RySWR9JHtzdHJDbGFzc2VzLmpvaW4oJycpfSR7c3RyQXR0cmlicy5qb2luKCcnKX1gO1xuICB9XG59XG4iLCIvLyBUT0RPOiB1c2UgbGV4ZXIgJiBncmFtbWFyIGZyb21cbi8vIGh0dHBzOi8vd3d3LnczLm9yZy9UUi9DU1MyMi9ncmFtbWFyLmh0bWxcbi8vIHVzZSBmb2xsb3dpbmcgdG9vbCB0byB3b3JrIHdpdGggcmVnZXhcbi8vIGh0dHBzOi8vcmVnZXgxMDEuY29tL1xuLy8gVE9ETzogdXNlIHRoaXMgbnBtIGxpYlxuLy8gbnBtIGluc3RhbGwgcGFyc2VsLWpzXG5pbXBvcnQgeyBDc3NUb2tlblR5cGUsIENzc1Rva2VuIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuY29uc3QgQ1NTX1RPS0VOX01BVENIRVJTID0gW1xuICB7XG4gICAgdHlwZTogQ3NzVG9rZW5UeXBlLkVsZW1lbnQsXG4gICAgcng6L14oLT9bX2Etel1bX2EtejAtOS1dKnxcXCopL2ksXG4gIH0sXG4gIHtcbiAgICB0eXBlOiBDc3NUb2tlblR5cGUuSWQsXG4gICAgcng6L14jKC0/W19hLXpdW19hLXowLTktXSopL2lcbiAgfSxcbiAge1xuICAgIHR5cGU6IENzc1Rva2VuVHlwZS5DbGFzcyxcbiAgICByeDovXlxcLigtP1tfYS16XVtfYS16MC05LV0qKS9pXG4gIH0sXG4gIHtcbiAgICB0eXBlOiBDc3NUb2tlblR5cGUuQXR0cmlidXRlLFxuICAgIHJ4Oi9eXFxbKC0/W19hLXpdW19hLXowLTktXSopKD86KFtcXF5cXCRcXCpcXHx+XT89KT8oW19hLXowLTlcXHUwMDgwLVxcdUZGRkZdK3xcIlteXCJdKlwifCdbXiddKicpKT9cXF0vaVxuICB9LFxuICB7XG4gICAgdHlwZTogQ3NzVG9rZW5UeXBlLkNvbWJpbmF0b3IsXG4gICAgcng6L14oPzpcXHMqKShbfj5cXCtdKSg/OlxccyopL1xuICB9LFxuICB7XG4gICAgdHlwZTogQ3NzVG9rZW5UeXBlLlNlcGFyYXRvcixcbiAgICByeDovXig/OlxccyopKCwpKD86XFxzKikvXG4gIH0sXG4gIHtcbiAgICB0eXBlOiBDc3NUb2tlblR5cGUuU3BhY2UsXG4gICAgcng6L14oXFxzKykvXG4gIH0sXG5dO1xuXG5cbmV4cG9ydCBjbGFzcyBDc3NTZWxlY3RvckxleGVyIHtcblxuICBwcml2YXRlIHNlbGVjdG9yOiBzdHJpbmc7XG4gIHByaXZhdGUgcG9zaXRpb246IG51bWJlciA9IDA7XG5cbiAgY29uc3RydWN0b3IgKHNlbGVjdG9yOiBzdHJpbmcpIHtcbiAgICB0aGlzLnNlbGVjdG9yID0gc2VsZWN0b3IudHJpbSgpO1xuICB9XG5cbiAgbmV4dFRva2VuKCk6IENzc1Rva2VuIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAodGhpcy5zZWxlY3RvciA9PT0gJycpIHtcbiAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgfVxuXG4gICAgY29uc3Qgc2VsICAgICA9IHRoaXMuc2VsZWN0b3I7XG4gICAgY29uc3QgcG9zICAgICA9IHRoaXMucG9zaXRpb247XG4gICAgY29uc3QgbWF0Y2hlciA9IENTU19UT0tFTl9NQVRDSEVSUy5maW5kKCh0KSA9PiB0LnJ4LnRlc3Qoc2VsKSk7XG4gICAgbGV0IGV4ZWNBcnJheTogUmVnRXhwRXhlY0FycmF5IHwgbnVsbCB8IHVuZGVmaW5lZDtcblxuICAgIGV4ZWNBcnJheSA9IG1hdGNoZXIgJiYgbWF0Y2hlci5yeC5leGVjKHNlbCk7XG5cbiAgICBpZiAobWF0Y2hlciAmJiBleGVjQXJyYXkpIHtcbiAgICAgIGNvbnN0IFtmdWxsLCAuLi5wYXJ0aWFsc10gPSBleGVjQXJyYXk7XG4gICAgICB0aGlzLnNlbGVjdG9yID0gc2VsLnJlcGxhY2UoZnVsbCwgJycpO1xuICAgICAgdGhpcy5wb3NpdGlvbiA9IHBvcyArIGZ1bGwubGVuZ3RoO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlICAgIDogbWF0Y2hlci50eXBlLFxuICAgICAgICB2YWx1ZXMgIDogdGhpcy5zYW5pdGl6ZVZhbHVlcyhwYXJ0aWFscyksXG4gICAgICAgIHBvc2l0aW9uOiBwb3MsXG4gICAgICAgIGxlbmd0aCAgOiBmdWxsLmxlbmd0aFxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBXZSByZWFjaGVkIGFuIHBhcnQgd2hlcmUgd2UgY2Fubm90IHBhcnNlIHRoZSBzZWxlY3RvclxuICAgIHRoaXMuc2VsZWN0b3IgPSAnJztcblxuICAgIHJldHVybiB7XG4gICAgICB0eXBlICAgIDogQ3NzVG9rZW5UeXBlLlVua25vd24sXG4gICAgICB2YWx1ZXMgIDogW3NlbF0sXG4gICAgICBwb3NpdGlvbjogcG9zLFxuICAgICAgbGVuZ3RoICA6IHNlbC5sZW5ndGgsXG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzYW5pdGl6ZVZhbHVlcyh2YWx1ZXM6IHN0cmluZ1tdKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB2YWx1ZXMuZmlsdGVyKHZhbHVlID0+ICEhdmFsdWUpLm1hcCh2YWx1ZSA9PiB7XG4gICAgICBjb25zdCBpc1F1b3RlZFN0cmluZyA9IC9eKCd8XCIpW14nXCJdK1xcMSQvLnRlc3QodmFsdWUpO1xuICAgICAgXG4gICAgICByZXR1cm4gaXNRdW90ZWRTdHJpbmcgPyB2YWx1ZS5zbGljZSgxLCAtMSkgOiB2YWx1ZTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ3NzUnVsZSB9IGZyb20gXCIuL2Nzcy1ydWxlXCI7XG5pbXBvcnQgeyBDb21iaW5hdG9ycywgQ3NzVG9rZW5UeXBlIH0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7IENzc1NlbGVjdG9yTGV4ZXIgfSBmcm9tIFwiLi9jc3Mtc2VsZWN0b3ItbGV4ZXJcIjtcbmltcG9ydCB7IENzc0F0dHJpYnV0ZSB9IGZyb20gXCIuL2Nzcy1hdHRyaWJ1dGVcIjtcblxuaW50ZXJmYWNlIENvbWJpbmVkUnVsZSB7XG4gIHJ1bGU6IENzc1J1bGU7XG4gIGNvbWI6IENvbWJpbmF0b3JzO1xufVxuXG50eXBlIFNlbGVjdG9yTGV2ZWwgPSBBcnJheTxDb21iaW5lZFJ1bGU+O1xuXG5jb25zdCBpc0FuY2VzdG9yID0gKGNvbWJpbmVkUnVsZTogQ29tYmluZWRSdWxlKTogYm9vbGVhbiA9PiB7XG4gIHJldHVybiBbQ29tYmluYXRvcnMuREVTQ0VOREFOVCwgQ29tYmluYXRvcnMuQ0hJTERdLmluZGV4T2YoY29tYmluZWRSdWxlLmNvbWIpICE9PSAtMTtcbn07XG5cbmV4cG9ydCBjbGFzcyBDc3NTZWxlY3RvciB7XG4gIGxldmVsczogU2VsZWN0b3JMZXZlbFtdID0gW1tdXTtcblxuICBjb25zdHJ1Y3RvcihzZWxlY3RvclN0cjogc3RyaW5nKSB7XG4gICAgdGhpcy5wYXJzZShzZWxlY3RvclN0cik7XG4gIH1cblxuICBhZGRSdWxlKGNvbWJSdWxlOiBDb21iaW5lZFJ1bGUpOiB2b2lkIHtcbiAgICBjb25zdCBjdXJyZW50TGV2ZWwgPSB0aGlzLmxldmVsc1t0aGlzLmxldmVscy5sZW5ndGggLTFdO1xuXG4gICAgaWYgKGlzQW5jZXN0b3IoY29tYlJ1bGUpKSB7XG4gICAgICBjdXJyZW50TGV2ZWwucHVzaChjb21iUnVsZSlcbiAgICAgIHRoaXMubGV2ZWxzLnB1c2goW10pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdXJyZW50TGV2ZWwucHVzaChjb21iUnVsZSk7XG4gICAgfVxuICB9XG5cbiAgc3VwZXJzZXRPZihzZWxlY3RvcjogQ3NzU2VsZWN0b3IpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RvclN1cGVyc2V0KHRoaXMubGV2ZWxzLCBzZWxlY3Rvci5sZXZlbHMpO1xuICB9XG5cbiAgc3Vic2V0T2Yoc2VsZWN0b3I6IENzc1NlbGVjdG9yKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHNlbGVjdG9yLnN1cGVyc2V0T2YodGhpcyk7XG4gIH1cblxuICBpbnRlcnNlY3Rpb24oc2VsZWN0b3I6IENzc1NlbGVjdG9yKTogQ3NzU2VsZWN0b3IgfCB2b2lkIHtcbiAgICBpZiAodGhpcy5zdXBlcnNldE9mKHNlbGVjdG9yKSkge1xuICAgICAgcmV0dXJuIHNlbGVjdG9yO1xuICAgIH1cblxuICAgIGlmIChzZWxlY3Rvci5zdXBlcnNldE9mKHRoaXMpKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBvdGhlciBwb3NzaWJsZSBjYXNlcz8/XG4gICAgcmV0dXJuIHZvaWQgMDtcbiAgfVxuXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgbGV0IHJlc3VsdCA9ICcnO1xuICAgIHRoaXMubGV2ZWxzLmZvckVhY2gobGV2ZWwgPT4ge1xuICAgICAgbGV2ZWwuZm9yRWFjaChjb21iaW5lZFJ1bGUgPT4ge1xuICAgICAgICBjb25zdCBjb21iID0gY29tYmluZWRSdWxlLmNvbWIgPyBgICR7Y29tYmluZWRSdWxlLmNvbWJ9IGAgOiAnICc7XG4gICAgICAgIHJlc3VsdCArPSBgJHtjb21iaW5lZFJ1bGUucnVsZX0ke2NvbWJ9YDtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc3VsdC50cmltKCk7XG4gIH1cblxuICAvKipcbiAgICogRmlsbHMgdGhlIGxpc3Qgb2YgcnVsZXMgd2l0aCBpdCdzIGNvbWJpbmF0b3JzXG4gICAqIEBwYXJhbSBzZWxlY3RvclN0ciB0aGUgc2VsZWN0b3IgdG8gcGFyc2VcbiAgICovXG4gIHByaXZhdGUgcGFyc2Uoc2VsZWN0b3JTdHI6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGxleGVyID0gbmV3IENzc1NlbGVjdG9yTGV4ZXIoc2VsZWN0b3JTdHIpO1xuICAgIGxldCBydWxlICAgID0gbmV3IENzc1J1bGUoKTtcbiAgICBsZXQgdG9rZW47XG5cbiAgICB3aGlsZSh0b2tlbiA9IGxleGVyLm5leHRUb2tlbigpKSB7XG4gICAgICBzd2l0Y2godG9rZW4udHlwZSkge1xuICAgICAgICBjYXNlIENzc1Rva2VuVHlwZS5FbGVtZW50OlxuICAgICAgICAgIHJ1bGUuZWxlbWVudCA9IHRva2VuLnZhbHVlc1swXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBDc3NUb2tlblR5cGUuSWQ6XG4gICAgICAgICAgcnVsZS5pZCA9IHRva2VuLnZhbHVlc1swXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBDc3NUb2tlblR5cGUuQ2xhc3M6XG4gICAgICAgICAgcnVsZS5hZGRDbGFzcyh0b2tlbi52YWx1ZXNbMF0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIENzc1Rva2VuVHlwZS5BdHRyaWJ1dGU6XG4gICAgICAgICAgcnVsZS5hZGRBdHRyaWJ1dGUobmV3IENzc0F0dHJpYnV0ZSh0b2tlbi52YWx1ZXMpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBDc3NUb2tlblR5cGUuQ29tYmluYXRvcjpcbiAgICAgICAgY2FzZSBDc3NUb2tlblR5cGUuU3BhY2U6XG4gICAgICAgICAgY29uc3QgY29tYiAgICAgPSB0b2tlbi52YWx1ZXNbMF0gYXMgQ29tYmluYXRvcnM7XG4gICAgICAgICAgY29uc3QgY29tYlJ1bGUgPSB7IHJ1bGUsIGNvbWIgfTtcbiAgICAgICAgICBcbiAgICAgICAgICBydWxlID0gbmV3IENzc1J1bGUoKTtcbiAgICAgICAgICB0aGlzLmFkZFJ1bGUoY29tYlJ1bGUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihgVW5rbm93biB0b2tlbiAke3Rva2VuLnZhbHVlc1swXX0gYXQgcG9zaXRpb24gJHt0b2tlbi5wb3NpdGlvbn1gKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gbGFzdCBydWxlIHNob3VsZCBiZSBwdXNoZWQgaW4gdGhlIGxheWVyXG4gICAgdGhpcy5hZGRSdWxlKHsgcnVsZSwgY29tYjogQ29tYmluYXRvcnMuTk9ORSB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc2VsZWN0b3JTdXBlcnNldChzZWxlY3Rvck9uZTogU2VsZWN0b3JMZXZlbFtdLCBzZWxlY3RvclR3bzogIFNlbGVjdG9yTGV2ZWxbXSk6IGJvb2xlYW4ge1xuICAgIC8vIEJhc2UgY2FzZTogY29udGFpbmVyIGlzIGVtcHR5IChtZWFuaW5nIHdlIGhhdmUgY2hlY2tlZCBhbGwgaXRzIHJ1bGVzKVxuICAgIC8vICpcbiAgICAvLyBhXG4gICAgaWYgKHNlbGVjdG9yT25lLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gQmFzZSBjYXNlOiBzZWxlY3RvclR3byBpcyBlbXB0eSAobWVhbmluZyB3ZSBoYXZlIGNoZWNrZWQgYWxsIGl0cyBydWxlcylcbiAgICAvLyBhXG4gICAgLy8gKlxuICAgIGlmIChzZWxlY3RvclR3by5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBCYXNlIGNhc2U6IHNlbGVjdG9yT25lIGlzIG1vcmUgc3BlY2lmaWMgdGhhbiBzZWxlY3RvclR3b1xuICAgIC8vIGEgYiBjXG4gICAgLy8gYSBiXG4gICAgaWYgKHNlbGVjdG9yT25lLmxlbmd0aCA+IHNlbGVjdG9yVHdvLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IGxheWVyT25lID0gc2VsZWN0b3JPbmVbc2VsZWN0b3JPbmUubGVuZ3RoIC0gMV07XG4gICAgY29uc3QgbGF5ZXJUd28gPSBzZWxlY3RvclR3b1tzZWxlY3RvclR3by5sZW5ndGggLSAxXTtcblxuICAgIC8vIEJhc2UgY2FzZTogbGF5ZXJPbmUgaGFzIHN0cm9uZ2VyIHJlbGF0aW9uc2hpcCB3aXRoIGRlc2NlbmRhbnQgdGhhbiBsYXllclR3b1xuICAgIC8vIGEgPiBiID4gKGRcbiAgICAvLyBhID4gYiAoZFxuICAgIGNvbnN0IGRlc2NlbmRhbnRDb21iT25lID0gbGF5ZXJPbmVbbGF5ZXJPbmUubGVuZ3RoIC0gMV0uY29tYjtcbiAgICBjb25zdCBkZXNjZW5kYW50Q29tYlR3byA9IGxheWVyVHdvW2xheWVyVHdvLmxlbmd0aCAtIDFdLmNvbWI7XG4gICAgaWYgKGRlc2NlbmRhbnRDb21iT25lID09PSBDb21iaW5hdG9ycy5DSElMRCAmJiBkZXNjZW5kYW50Q29tYlR3byA9PT0gQ29tYmluYXRvcnMuREVTQ0VOREFOVCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIGEgPiBiID4gY1xuICAgIC8vIGEgPiBiID4gYyA+IGQgPiBlXG4gICAgaWYgKHRoaXMubGV2ZWxTdXBlcnNldChsYXllck9uZSwgbGF5ZXJUd28pKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZWxlY3RvclN1cGVyc2V0KHNlbGVjdG9yT25lLnNsaWNlKDAsIC0xKSwgc2VsZWN0b3JUd28uc2xpY2UoMCwgLTEpKTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgZGVlcGVzdCBsYXllciBpc24ndCBhIHN1cGVyc2V0IHRoZW4gc2VsZWN0b3IgY2FuJ3QgYmVcbiAgICAvLyBjID4gZVxuICAgIC8vIGEgPiBjID4gKGRcbiAgICAvLyBJZiBDSElMRCBpdCBzaG91bGQgaGFkIG1hdGNoIGJlZm9yZVxuICAgIC8vIGEgPiBiID4gKGRcbiAgICAvLyBhID4gYyA+IChkXG4gICAgaWYgKGRlc2NlbmRhbnRDb21iT25lID09PSBDb21iaW5hdG9ycy5DSElMRCB8fCBkZXNjZW5kYW50Q29tYk9uZSA9PT0gQ29tYmluYXRvcnMuTk9ORSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIEZvciBnZW5lcmljIHNpYmxpbmcgd2FsayB1cCB0aGUgc2Vjb25kIGxpc3Qgb2YgcnVsZXNcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RvclN1cGVyc2V0KHNlbGVjdG9yT25lLCBzZWxlY3RvclR3by5zbGljZSgwLCAtMSkpO1xuICB9XG5cblxuICBwcml2YXRlIGxldmVsU3VwZXJzZXQobGV2ZWxPbmU6IFNlbGVjdG9yTGV2ZWwsIGxldmVsVHdvOiBTZWxlY3RvckxldmVsKTogYm9vbGVhbiB7XG4gICAgLy8gQmFzZSBjYXNlOiBjb250YWluZXIgaXMgZW1wdHkgKG1lYW5pbmcgd2UgaGF2ZSBjaGVja2VkIGFsbCBpdHMgcnVsZXMpXG4gICAgaWYgKGxldmVsT25lLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gQmFzZSBjYXNlOiBsZXZlbFR3byBpcyBlbXB0eSAobWVhbmluZyB3ZSBoYXZlIGNoZWNrZWQgYWxsIGl0cyBsYXllcilcbiAgICBpZiAobGV2ZWxUd28ubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gQmFzZSBjYXNlOiBsZXZlbE9uZSBpcyBtb3JlIHNwZWNpZmljIHRoYW4gbGV2ZWxUd29cbiAgICBpZiAobGV2ZWxPbmUubGVuZ3RoID4gbGV2ZWxUd28ubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgY29tYmluZWRSdWxlT25lID0gbGV2ZWxPbmVbbGV2ZWxPbmUubGVuZ3RoIC0gMV07XG4gICAgY29uc3QgY29tYmluZWRSdWxlVHdvID0gbGV2ZWxUd29bbGV2ZWxUd28ubGVuZ3RoIC0gMV07XG5cbiAgICAvLyBCYXNlIGNhc2U6IGNvbWJpbmVkUnVsZU9uZSBoYXMgc3Ryb25nZXIgcmVsYXRpb25zaGlwIHdpdGggc2libGluZyB0aGFuIGNvbWJpbmVkUnVsZVR3b1xuICAgIC8vIGEgKyBiICsgKGRcbiAgICAvLyBhICsgYiB+IChkXG4gICAgY29uc3Qgc2libGluZ0NvbWJPbmUgPSBjb21iaW5lZFJ1bGVPbmUuY29tYjtcbiAgICBjb25zdCBzaWJsaW5nQ29tYlR3byA9IGNvbWJpbmVkUnVsZVR3by5jb21iO1xuICAgIGlmIChzaWJsaW5nQ29tYk9uZSA9PT0gQ29tYmluYXRvcnMuQURKQUNFTlQgJiYgc2libGluZ0NvbWJUd28gPT09IENvbWJpbmF0b3JzLlNJQkxJTkcpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBhICsgYiB+IGRcbiAgICAvLyBhICsgYiArIGMgKyBkXG4gICAgaWYgKGNvbWJpbmVkUnVsZU9uZS5ydWxlLnN1cGVyc2V0T2YoY29tYmluZWRSdWxlVHdvLnJ1bGUpKSB7XG4gICAgICByZXR1cm4gdGhpcy5sZXZlbFN1cGVyc2V0KGxldmVsT25lLnNsaWNlKDAsIC0xKSwgbGV2ZWxUd28uc2xpY2UoMCwgLTEpKTtcbiAgICB9XG5cbiAgICAvLyBJZiBBREpBQ0VOVCBpdCBzaG91bGQgaGFkIG1hdGNoIGJlZm9yZVxuICAgIGlmIChjb21iaW5lZFJ1bGVPbmUuY29tYiA9PT0gQ29tYmluYXRvcnMuQURKQUNFTlQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBGb3IgZ2VuZXJpYyBzaWJsaW5nIHdhbGsgdXAgdGhlIHNlY29uZCBsaXN0XG4gICAgcmV0dXJuIHRoaXMubGV2ZWxTdXBlcnNldChsZXZlbE9uZSwgbGV2ZWxUd28uc2xpY2UoMCwgLTEpKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ3NzU2VsZWN0b3IgfcKgZnJvbSAnLi9jc3Mtc2VsZWN0b3InO1xuXG5leHBvcnQgY2xhc3MgQ3NzZXQge1xuICBzZWxlY3RvcnM6IENzc1NlbGVjdG9yW107XG5cbiAgLyoqXG4gICAqIFBhcnNlcyB0aGUgZ2l2ZW4gc2VsZWN0b3IgZmlsaW5nIHVwIGl0cyBwcml2YXRlIHByb3BlcnRpZXMgd2l0aCBtZXRhZGF0YVxuICAgKiBAcGFyYW0gc2VsZWN0b3IgdGhlIHNlbGVjdG9yIHN0cmluZ1xuICAgKi9cbiAgY29uc3RydWN0b3IgKHNlbGVjdG9yOiBzdHJpbmcpIHtcbiAgICAvLyBUT0RPOiB0aGlzIGlzIGVycm9yIHByb25lIHNpbmNlIGF0dHIgdmFsdWVzIG1heSBjb250YWluIHRoaXMgY2hhclxuICAgIHRoaXMuc2VsZWN0b3JzID0gc2VsZWN0b3Iuc3BsaXQoJywnKS5tYXAoKHNlbCkgPT4gbmV3IENzc1NlbGVjdG9yKHNlbCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiB0aGlzIHNldCBjb250YWlucyB0aGUgb25lIHBhc3NlZCBhcyBwYXJhbWV0ZXJcbiAgICogQHBhcmFtIHNldCB0aGUgc2V0IHRvIGNoZWNrIHdpdGhcbiAgICovXG4gIHN1cGVyc2V0T2Yoc2V0OiBDc3NldCk6IGJvb2xlYW4ge1xuICAgIGxldCBpbmRleCA9IHNldC5zZWxlY3RvcnMubGVuZ3RoO1xuXG4gICAgd2hpbGUoaW5kZXgtLSkge1xuICAgICAgY29uc3QgY29udGFpbmVySW5kZXggPSB0aGlzLnNlbGVjdG9ycy5maW5kSW5kZXgocyA9PiBzLnN1cGVyc2V0T2Yoc2V0LnNlbGVjdG9yc1tpbmRleF0pKTtcblxuICAgICAgaWYgKGNvbnRhaW5lckluZGV4ID09PSAtMSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiB0aGlzIHNldCBpcyBjb250YWluZWQgdGhlIG9uZSBwYXNzZWQgYXMgcGFyYW1ldGVyXG4gICAqIEBwYXJhbSBzZXQgdGhlIHNldCB0byBjaGVjayB3aXRoXG4gICAqL1xuICBzdWJzZXRPZihzZXQ6IENzc2V0KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHNldC5zdXBlcnNldE9mKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBuZXcgQ1NTIHNldCB3aGljaCBpcyB0aGUgdW5pb24gb2YgdGhpcyBvbmUgYW5kIHRoZSBwYXNzZWQgYXMgcGFyYW1ldGVyXG4gICAqIEBwYXJhbSBzZXQgdGhlIG90aGVyIENTUyBzZXQgdG8gYmUgdW5pdGVkIHdpdGhcbiAgICovXG4gIHVuaW9uKHNldDogQ3NzZXQpOiBDc3NldCB7XG4gICAgaWYgKHRoaXMuc3VwZXJzZXRPZihzZXQpKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zdWJzZXRPZihzZXQpKSB7XG4gICAgICByZXR1cm4gc2V0O1xuICAgIH1cblxuICAgIC8vIE1ha2UgdW5pb24gb2Ygc2VsZWN0b3JzIGlmIHBvc3NpYmxlXG4gICAgY29uc3QgZXF1YWxTZWwgID0gdGhpcy5zZWxlY3RvcnMuZmlsdGVyKHRoaXNTZWwgPT4gc2V0LnNlbGVjdG9ycy5zb21lKG90aGVyU2VsID0+IGAke3RoaXNTZWx9YCA9PT0gYCR7b3RoZXJTZWx9YCkpO1xuICAgIGNvbnN0IHVuaXF1ZU9uZSA9IHRoaXMuc2VsZWN0b3JzLmZpbHRlcih0aGlzU2VsID0+ICFzZXQuc2VsZWN0b3JzLnNvbWUob3RoZXJTZWwgPT4gdGhpc1NlbC5zdWJzZXRPZihvdGhlclNlbCkpKTtcbiAgICBjb25zdCB1bmlxdWVUd28gPSBzZXQuc2VsZWN0b3JzLmZpbHRlcihvdGhlclNlbCA9PiAhdGhpcy5zZWxlY3RvcnMuc29tZSh0aGlzU2VsID0+IG90aGVyU2VsLnN1YnNldE9mKHRoaXNTZWwpKSk7XG4gICAgY29uc3QgYWxsU2VsZWN0b3JzID0gZXF1YWxTZWwuY29uY2F0KHVuaXF1ZU9uZSwgdW5pcXVlVHdvKTtcblxuICAgIHJldHVybiBuZXcgQ3NzZXQoYCR7YWxsU2VsZWN0b3JzLm1hcChzID0+IHMudG9TdHJpbmcoKSkuam9pbignLCcpfWApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBuZXcgQ1NTIHNldCB3aGljaCBpcyB0aGUgaW50ZXJzZWN0aW9uIG9mIHRoaXMgb25lIGFuZCB0aGUgcGFzc2VkIGFzIHBhcmFtZXRlclxuICAgKiBvciB2b2lkIGlmIHRoZSBpbnRlcnNlY3Rpb24gaXMgYW4gZW1wdHkgc2V0XG4gICAqIEBwYXJhbSBzZXQgdGhlIG90aGVyIENTUyBzZXQgdG8gYmUgdW5pdGVkIHdpdGhcbiAgICovXG4gIGludGVyc2VjdGlvbihzZXQ6IENzc2V0KTogQ3NzZXQgfCB2b2lkIHtcbiAgICBpZiAodGhpcy5zdXBlcnNldE9mKHNldCkpIHtcbiAgICAgIHJldHVybiBzZXQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc3Vic2V0T2Yoc2V0KSkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLy8gTWFrZSBpbnRlcnNlY3Rpb24gb2Ygc2VsZWN0b3JzIGlmIHBvc3NpYmxlXG4gICAgLy8gMXN0IGF0dGVtcHQgYnJ1dGUgZm9yY2UgKGludGVyc2VjdGluZyBldmVyeSBzZXQgd2l0aCBvdGhlcnMpXG4gICAgY29uc3QgaW50ZXJzZWN0aW9ucyA9IHRoaXMuc2VsZWN0b3JzXG4gICAgICAubWFwKHRoaXNTZWwgPT4gc2V0LnNlbGVjdG9ycy5tYXAob3RoZXJTZWwgPT4gdGhpc1NlbC5pbnRlcnNlY3Rpb24ob3RoZXJTZWwpKSlcbiAgICAgIC5yZWR1Y2UoKGZsYXQsIHZhbCkgPT4gZmxhdC5jb25jYXQodmFsKSwgW10pXG4gICAgICAuZmlsdGVyKCh2YWwpID0+ICEhdmFsKVxuICAgICAgLm1hcCgodmFsKSA9PiBgJHt2YWx9YCk7XG5cbiAgICBpZiAoaW50ZXJzZWN0aW9ucy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBuZXcgQ3NzZXQoYCR7aW50ZXJzZWN0aW9ucy5qb2luKCcsJyl9YCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZvaWQgMDtcbiAgfVxuXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0b3JzLm1hcChzID0+IGAke3N9YCkuam9pbignLCcpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDc3NNYXRjaGVyU3ltYm9sIH0gZnJvbSBcIi4uL3R5cGVzXCI7XG5pbXBvcnQgeyBDc3NBdHRyaWJ1dGVNYXRjaGVyIH0gZnJvbSBcIi4uL2Nzcy1hdHRyaWJ1dGUtbWF0Y2hlclwiO1xuXG5jb25zdCBzdXBlcnNldFN5bWJvbHMgPSBbXG4gIENzc01hdGNoZXJTeW1ib2wuUHJlZml4LFxuICBDc3NNYXRjaGVyU3ltYm9sLlN1ZmZpeCxcbiAgQ3NzTWF0Y2hlclN5bWJvbC5TdWJDb2RlLFxuICBDc3NNYXRjaGVyU3ltYm9sLk9jY3VycmVuY2UsXG4gIENzc01hdGNoZXJTeW1ib2wuQ29udGFpbnMsXG4gIENzc01hdGNoZXJTeW1ib2wuRXF1YWwsXG5dO1xuXG5leHBvcnQgY2xhc3MgQ3NzQ29udGFpbnNNYXRjaGVyIGV4dGVuZHMgQ3NzQXR0cmlidXRlTWF0Y2hlciB7XG4gIHJlYWRvbmx5IHN5bWJvbDogQ3NzTWF0Y2hlclN5bWJvbCA9IENzc01hdGNoZXJTeW1ib2wuQ29udGFpbnM7XG5cbiAgc3VwZXJzZXRPZiAoIG1hdGNoZXI6IENzc0F0dHJpYnV0ZU1hdGNoZXIgKTogYm9vbGVhbiB7XG4gICAgaWYgKHN1cGVyc2V0U3ltYm9scy5pbmRleE9mKG1hdGNoZXIuc3ltYm9sKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiBtYXRjaGVyLnZhbHVlLmluZGV4T2YodGhpcy52YWx1ZSkgIT09IC0xO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ3NzQXR0cmlidXRlTWF0Y2hlciB9IGZyb20gXCIuLi9jc3MtYXR0cmlidXRlLW1hdGNoZXJcIjtcbmltcG9ydCB7IENzc01hdGNoZXJTeW1ib2wgfSBmcm9tIFwiLi4vdHlwZXNcIjtcbmltcG9ydCB7IENzc1ByZXNlbmNlTWF0Y2hlciB9IGZyb20gXCIuL3ByZXNlbmNlLW1hdGNoZXJcIjtcbmltcG9ydCB7IENzc1ByZWZpeE1hdGNoZXIgfSBmcm9tIFwiLi9wcmVmaXgtbWF0Y2hlclwiO1xuaW1wb3J0IHsgQ3NzU3VmZml4TWF0Y2hlciB9IGZyb20gXCIuL3N1ZmZpeC1tYXRjaGVyXCI7XG5pbXBvcnQgeyBDc3NFcXVhbE1hdGNoZXIgfSBmcm9tIFwiLi9lcXVhbC1tYXRjaGVyXCI7XG5pbXBvcnQgeyBDc3NDb250YWluc01hdGNoZXIgfSBmcm9tIFwiLi9jb250YWlucy1tYXRjaGVyXCI7XG5pbXBvcnQgeyBDc3NPY2N1cnJlbmNlTWF0Y2hlciB9IGZyb20gXCIuL29jY3VycmVuY2UtbWF0Y2hlclwiO1xuaW1wb3J0IHsgQ3NzU3ViQ29kZU1hdGNoZXIgfSBmcm9tIFwiLi9zdWJjb2RlLW1hdGNoZXJcIjtcblxuaW50ZXJmYWNlIENzc01hdGNoZXJDb25zdHJ1Y3RvciB7XG4gIG5ldyAodmFsdWU6IHN0cmluZyk6IENzc0F0dHJpYnV0ZU1hdGNoZXJcbn1cblxuY29uc3QgY2xhenplejogeyBbc3ltYm9sOiBzdHJpbmddOiBDc3NNYXRjaGVyQ29uc3RydWN0b3IgfSAgPSB7XG4gIFtDc3NNYXRjaGVyU3ltYm9sLlByZXNlbmNlXSAgOiBDc3NQcmVzZW5jZU1hdGNoZXIsXG4gIFtDc3NNYXRjaGVyU3ltYm9sLlByZWZpeF0gICAgOiBDc3NQcmVmaXhNYXRjaGVyLFxuICBbQ3NzTWF0Y2hlclN5bWJvbC5TdWZmaXhdICAgIDogQ3NzU3VmZml4TWF0Y2hlcixcbiAgW0Nzc01hdGNoZXJTeW1ib2wuRXF1YWxdICAgICA6IENzc0VxdWFsTWF0Y2hlcixcbiAgW0Nzc01hdGNoZXJTeW1ib2wuQ29udGFpbnNdICA6IENzc0NvbnRhaW5zTWF0Y2hlcixcbiAgW0Nzc01hdGNoZXJTeW1ib2wuT2NjdXJyZW5jZV06IENzc09jY3VycmVuY2VNYXRjaGVyLFxuICBbQ3NzTWF0Y2hlclN5bWJvbC5TdWJDb2RlXSAgIDogQ3NzU3ViQ29kZU1hdGNoZXIsXG59XG5cbmNvbnN0IFZBTFVFX1JFR0VYUFMgPSB7XG4gIHZhbGlkIDogL14oJ3xcIilbXidcIl0rXFwxJHxeW14nXCJdKyQvLFxuICBxdW90ZXM6IC9eW1wiJ118W1wiJ10kL2csXG59O1xuXG5leHBvcnQgY2xhc3MgQ3NzTWF0Y2hlckZhY3Rvcnkge1xuICBzdGF0aWMgY3JlYXRlIChzZWxlY3Rvcjogc3RyaW5nID0gJycpOiBDc3NBdHRyaWJ1dGVNYXRjaGVyIHtcbiAgICBjb25zdCBwYXJ0cyAgPSBzZWxlY3Rvci5zcGxpdCgnPScpO1xuICAgIGNvbnN0IHN5bWJvbCA9IHBhcnRzLmxlbmd0aCA+IDEgPyBwYXJ0c1swXSB8fCAnPScgOiAnJztcbiAgICBjb25zdCB2YWx1ZSAgPSBwYXJ0cy5sZW5ndGggPiAxID8gcGFydHNbMV0gOiAnJztcblxuICAgIGlmICggISF2YWx1ZSAmJiAhVkFMVUVfUkVHRVhQUy52YWxpZC50ZXN0KHZhbHVlKSApIHtcbiAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihgSW52YWxpZCBhdHRyaWJ1dGUgdmFsdWUgaW4gJHtzZWxlY3Rvcn1gKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IGNsYXp6ZXpbc3ltYm9sXSh2YWx1ZS5yZXBsYWNlKFZBTFVFX1JFR0VYUFMucXVvdGVzLCAnJykpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDc3NNYXRjaGVyU3ltYm9sIH0gZnJvbSBcIi4uL3R5cGVzXCI7XG5pbXBvcnQgeyBDc3NBdHRyaWJ1dGVNYXRjaGVyIH0gZnJvbSBcIi4uL2Nzcy1hdHRyaWJ1dGUtbWF0Y2hlclwiO1xuXG5leHBvcnQgY2xhc3MgQ3NzRXF1YWxNYXRjaGVyIGV4dGVuZHMgQ3NzQXR0cmlidXRlTWF0Y2hlciB7XG4gIHJlYWRvbmx5IHN5bWJvbDogQ3NzTWF0Y2hlclN5bWJvbCA9IENzc01hdGNoZXJTeW1ib2wuRXF1YWw7XG5cbiAgc3VwZXJzZXRPZiAoIG1hdGNoZXI6IENzc0F0dHJpYnV0ZU1hdGNoZXIgKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIG1hdGNoZXIuc3ltYm9sID09PSBDc3NNYXRjaGVyU3ltYm9sLkVxdWFsICYmIHRoaXMudmFsdWUgPT09IG1hdGNoZXIudmFsdWU7XG4gIH1cbn1cbiIsImltcG9ydCB7IENzc01hdGNoZXJTeW1ib2wgfSBmcm9tIFwiLi4vdHlwZXNcIjtcbmltcG9ydCB7IENzc0F0dHJpYnV0ZU1hdGNoZXIgfSBmcm9tIFwiLi4vY3NzLWF0dHJpYnV0ZS1tYXRjaGVyXCI7XG5cbmNvbnN0IHN1cGVyc2V0U3ltYm9scyA9IFtcbiAgQ3NzTWF0Y2hlclN5bWJvbC5FcXVhbCxcbiAgQ3NzTWF0Y2hlclN5bWJvbC5PY2N1cnJlbmNlLFxuXTtcblxuZXhwb3J0IGNsYXNzIENzc09jY3VycmVuY2VNYXRjaGVyIGV4dGVuZHMgQ3NzQXR0cmlidXRlTWF0Y2hlciB7XG4gIHJlYWRvbmx5IHN5bWJvbDogQ3NzTWF0Y2hlclN5bWJvbCA9IENzc01hdGNoZXJTeW1ib2wuT2NjdXJyZW5jZTtcblxuICBzdXBlcnNldE9mICggbWF0Y2hlcjogQ3NzQXR0cmlidXRlTWF0Y2hlciApOiBib29sZWFuIHtcbiAgICBpZiAoc3VwZXJzZXRTeW1ib2xzLmluZGV4T2YobWF0Y2hlci5zeW1ib2wpICE9PSAtMSkge1xuICAgICAgcmV0dXJuIG1hdGNoZXIudmFsdWUgPT09IHRoaXMudmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaW50ZXJzZWN0aW9uICggbWF0Y2hlcjogQ3NzQXR0cmlidXRlTWF0Y2hlciApOiBzdHJpbmcgfCBudWxsIHwgdm9pZCB7XG4gICAgaWYgKCB0aGlzLnZhbHVlID09PSBtYXRjaGVyLnZhbHVlICkge1xuICAgICAgaWYgKCBtYXRjaGVyLnN5bWJvbCA9PT0gQ3NzTWF0Y2hlclN5bWJvbC5FcXVhbCApIHtcbiAgICAgICAgcmV0dXJuIGA9XCIke3RoaXMudmFsdWV9XCJgO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzdXBlci5pbnRlcnNlY3Rpb24obWF0Y2hlcik7XG4gIH1cbn0iLCJpbXBvcnQgeyBDc3NNYXRjaGVyU3ltYm9sIH0gZnJvbSBcIi4uL3R5cGVzXCI7XG5pbXBvcnQgeyBDc3NBdHRyaWJ1dGVNYXRjaGVyIH0gZnJvbSBcIi4uL2Nzcy1hdHRyaWJ1dGUtbWF0Y2hlclwiO1xuXG5jb25zdCBzdXBlcnNldFN5bWJvbHMgPSBbXG4gIENzc01hdGNoZXJTeW1ib2wuUHJlZml4LFxuICBDc3NNYXRjaGVyU3ltYm9sLlN1YkNvZGUsXG4gIENzc01hdGNoZXJTeW1ib2wuRXF1YWwsXG5dO1xuXG5leHBvcnQgY2xhc3MgQ3NzUHJlZml4TWF0Y2hlciBleHRlbmRzIENzc0F0dHJpYnV0ZU1hdGNoZXIge1xuICByZWFkb25seSBzeW1ib2w6IENzc01hdGNoZXJTeW1ib2wgPSBDc3NNYXRjaGVyU3ltYm9sLlByZWZpeDtcblxuICBzdXBlcnNldE9mICggbWF0Y2hlcjogQ3NzQXR0cmlidXRlTWF0Y2hlciApOiBib29sZWFuIHtcblxuICAgIGlmIChzdXBlcnNldFN5bWJvbHMuaW5kZXhPZihtYXRjaGVyLnN5bWJvbCkgIT09IC0xKSB7XG4gICAgICByZXR1cm4gbWF0Y2hlci52YWx1ZS5zdGFydHNXaXRoKHRoaXMudmFsdWUpO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHVuaW9uICggbWF0Y2hlcjogQ3NzQXR0cmlidXRlTWF0Y2hlciApOiBzdHJpbmcgfCBudWxsIHtcblxuICAgIGlmICggdGhpcy52YWx1ZSA9PT0gbWF0Y2hlci52YWx1ZSAmJiBtYXRjaGVyLnN5bWJvbCA9PT0gQ3NzTWF0Y2hlclN5bWJvbC5TdWJDb2RlICkge1xuICAgICAgcmV0dXJuIGAke3RoaXN9YDtcbiAgICB9XG5cbiAgICByZXR1cm4gc3VwZXIudW5pb24obWF0Y2hlcik7XG4gIH1cblxuICBpbnRlcnNlY3Rpb24gKCBtYXRjaGVyOiBDc3NBdHRyaWJ1dGVNYXRjaGVyICk6IHN0cmluZyB8IG51bGwgfCB2b2lkIHtcbiAgICBpZiAoIHRoaXMudmFsdWUgPT09IG1hdGNoZXIudmFsdWUgKSB7XG4gICAgICBpZiAobWF0Y2hlci5zeW1ib2wgPT09IENzc01hdGNoZXJTeW1ib2wuRXF1YWwgKSB7XG4gICAgICAgIHJldHVybiBgPVwiJHt0aGlzLnZhbHVlfVwiYDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIG1hdGNoZXIudmFsdWUuc3RhcnRzV2l0aCh0aGlzLnZhbHVlKSApIHtcbiAgICAgIGlmICggbWF0Y2hlci5zeW1ib2wgPT09IENzc01hdGNoZXJTeW1ib2wuUHJlZml4ICkge1xuICAgICAgICByZXR1cm4gYF49XCIke21hdGNoZXIudmFsdWV9XCJgO1xuICAgICAgfVxuICAgICAgaWYgKCBtYXRjaGVyLnN5bWJvbCA9PT0gQ3NzTWF0Y2hlclN5bWJvbC5TdWJDb2RlICkge1xuICAgICAgICByZXR1cm4gYHw9XCIke21hdGNoZXIudmFsdWV9XCJgO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICggdGhpcy52YWx1ZS5zdGFydHNXaXRoKG1hdGNoZXIudmFsdWUpICYmIG1hdGNoZXIuc3ltYm9sID09PSBDc3NNYXRjaGVyU3ltYm9sLlByZWZpeCApIHtcbiAgICAgIHJldHVybiBgXj1cIiR7dGhpcy52YWx1ZX1cImA7XG4gICAgfVxuXG4gICAgaWYgKCBtYXRjaGVyLnN5bWJvbCA9PT0gQ3NzTWF0Y2hlclN5bWJvbC5QcmVmaXggJiYgdGhpcy52YWx1ZSAhPT0gbWF0Y2hlci52YWx1ZSApIHtcbiAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN1cGVyLmludGVyc2VjdGlvbihtYXRjaGVyKTtcbiAgfVxufSIsImltcG9ydCB7IENzc01hdGNoZXJTeW1ib2wgfSBmcm9tIFwiLi4vdHlwZXNcIjtcbmltcG9ydCB7IENzc0F0dHJpYnV0ZU1hdGNoZXIgfSBmcm9tIFwiLi4vY3NzLWF0dHJpYnV0ZS1tYXRjaGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBDc3NQcmVzZW5jZU1hdGNoZXIgZXh0ZW5kcyBDc3NBdHRyaWJ1dGVNYXRjaGVyIHtcbiAgcmVhZG9ubHkgc3ltYm9sOiBDc3NNYXRjaGVyU3ltYm9sID0gQ3NzTWF0Y2hlclN5bWJvbC5QcmVzZW5jZTtcblxuICBzdXBlcnNldE9mICggbWF0Y2hlcjogQ3NzQXR0cmlidXRlTWF0Y2hlciApOiBib29sZWFuIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufSIsImltcG9ydCB7IENzc01hdGNoZXJTeW1ib2wgfSBmcm9tIFwiLi4vdHlwZXNcIjtcbmltcG9ydCB7IENzc0F0dHJpYnV0ZU1hdGNoZXIgfSBmcm9tIFwiLi4vY3NzLWF0dHJpYnV0ZS1tYXRjaGVyXCI7XG5cbmNvbnN0IHN1cGVyc2V0U3ltYm9scyA9IFtcbiAgQ3NzTWF0Y2hlclN5bWJvbC5TdWJDb2RlLFxuICBDc3NNYXRjaGVyU3ltYm9sLkVxdWFsLFxuXTtcblxuZXhwb3J0IGNsYXNzIENzc1N1YkNvZGVNYXRjaGVyIGV4dGVuZHMgQ3NzQXR0cmlidXRlTWF0Y2hlciB7XG4gIHJlYWRvbmx5IHN5bWJvbDogQ3NzTWF0Y2hlclN5bWJvbCA9IENzc01hdGNoZXJTeW1ib2wuU3ViQ29kZTtcblxuICBzdXBlcnNldE9mICggbWF0Y2hlcjogQ3NzQXR0cmlidXRlTWF0Y2hlciApOiBib29sZWFuIHtcbiAgICBpZiAoIHN1cGVyc2V0U3ltYm9scy5pbmRleE9mKG1hdGNoZXIuc3ltYm9sKSAhPT0gLTEgKSB7XG4gICAgICByZXR1cm4gbWF0Y2hlci52YWx1ZSA9PT0gdGhpcy52YWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB1bmlvbiAoIG1hdGNoZXI6IENzc0F0dHJpYnV0ZU1hdGNoZXIgKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgaWYgKCBtYXRjaGVyLnN5bWJvbCA9PT0gQ3NzTWF0Y2hlclN5bWJvbC5TdWJDb2RlICkge1xuICAgICAgaWYgKCB0aGlzLnZhbHVlID09PSBtYXRjaGVyLnZhbHVlICkge1xuICAgICAgICByZXR1cm4gYCR7dGhpc31gO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzdXBlci51bmlvbihtYXRjaGVyKTtcbiAgfVxuXG4gIGludGVyc2VjdGlvbiAoIG1hdGNoZXI6IENzc0F0dHJpYnV0ZU1hdGNoZXIgKTogc3RyaW5nIHwgbnVsbCB8IHZvaWQge1xuICAgIGlmICggdGhpcy52YWx1ZSA9PT0gbWF0Y2hlci52YWx1ZSApIHtcbiAgICAgIGlmIChtYXRjaGVyLnN5bWJvbCA9PT0gQ3NzTWF0Y2hlclN5bWJvbC5QcmVmaXggKSB7XG4gICAgICAgIHJldHVybiBgfD1cIiR7dGhpcy52YWx1ZX1cImA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCB0aGlzLnZhbHVlLnN0YXJ0c1dpdGgobWF0Y2hlci52YWx1ZSkgKSB7XG4gICAgICBpZiAobWF0Y2hlci5zeW1ib2wgPT09IENzc01hdGNoZXJTeW1ib2wuUHJlZml4ICkge1xuICAgICAgICByZXR1cm4gYHw9XCIke3RoaXMudmFsdWV9XCJgO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzdXBlci5pbnRlcnNlY3Rpb24obWF0Y2hlcik7XG4gIH1cbn0iLCJpbXBvcnQgeyBDc3NNYXRjaGVyU3ltYm9sIH0gZnJvbSBcIi4uL3R5cGVzXCI7XG5pbXBvcnQgeyBDc3NBdHRyaWJ1dGVNYXRjaGVyIH0gZnJvbSBcIi4uL2Nzcy1hdHRyaWJ1dGUtbWF0Y2hlclwiO1xuXG5jb25zdCBzdXBlcnNldFN5bWJvbHMgPSBbXG4gIENzc01hdGNoZXJTeW1ib2wuU3VmZml4LFxuICBDc3NNYXRjaGVyU3ltYm9sLkVxdWFsLFxuXTtcblxuZXhwb3J0IGNsYXNzIENzc1N1ZmZpeE1hdGNoZXIgZXh0ZW5kcyBDc3NBdHRyaWJ1dGVNYXRjaGVyIHtcbiAgcmVhZG9ubHkgc3ltYm9sOiBDc3NNYXRjaGVyU3ltYm9sID0gQ3NzTWF0Y2hlclN5bWJvbC5TdWZmaXg7XG5cbiAgc3VwZXJzZXRPZiAoIG1hdGNoZXI6IENzc0F0dHJpYnV0ZU1hdGNoZXIgKTogYm9vbGVhbiB7XG4gICAgaWYgKHN1cGVyc2V0U3ltYm9scy5pbmRleE9mKG1hdGNoZXIuc3ltYm9sKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiBtYXRjaGVyLnZhbHVlLmVuZHNXaXRoKHRoaXMudmFsdWUpO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGludGVyc2VjdGlvbiAoIG1hdGNoZXI6IENzc0F0dHJpYnV0ZU1hdGNoZXIgKTogc3RyaW5nIHwgbnVsbCB8IHZvaWQge1xuICAgIGlmICggbWF0Y2hlci5zeW1ib2wgPT09IENzc01hdGNoZXJTeW1ib2wuU3VmZml4ICkge1xuICAgICAgaWYgKCBtYXRjaGVyLnZhbHVlLmVuZHNXaXRoKHRoaXMudmFsdWUpIHx8IHRoaXMudmFsdWUuZW5kc1dpdGgobWF0Y2hlci52YWx1ZSkgKSB7XG4gICAgICAgIGNvbnN0IGxvbmdlc3RWYWx1ZSA9IHRoaXMudmFsdWUubGVuZ3RoID4gbWF0Y2hlci52YWx1ZS5sZW5ndGggPyB0aGlzLnZhbHVlIDogbWF0Y2hlci52YWx1ZTtcblxuICAgICAgICByZXR1cm4gYCQ9XCIke2xvbmdlc3RWYWx1ZX1cImBcbiAgICAgIH1cbiAgICAgIFxuICAgICAgaWYgKCB0aGlzLnZhbHVlICE9PSBtYXRjaGVyLnZhbHVlICkge1xuICAgICAgICByZXR1cm4gdm9pZCAwO1xuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICByZXR1cm4gc3VwZXIuaW50ZXJzZWN0aW9uKG1hdGNoZXIpO1xuICB9XG59IiwiZXhwb3J0IGVudW0gQ3NzVG9rZW5UeXBlIHtcbiAgVm9pZCxcbiAgSWQsXG4gIEVsZW1lbnQsXG4gIENsYXNzLFxuICBBdHRyaWJ1dGUsXG4gIFNwYWNlLFxuICBDb21iaW5hdG9yLFxuICBTZXBhcmF0b3IsXG4gIFVua25vd24sXG59XG5leHBvcnQgaW50ZXJmYWNlIENzc1Rva2VuIHtcbiAgdHlwZSAgICA6IENzc1Rva2VuVHlwZSxcbiAgdmFsdWVzICA6IHN0cmluZ1tdO1xuICBwb3NpdGlvbjogbnVtYmVyO1xuICBsZW5ndGggIDogbnVtYmVyO1xufVxuXG5leHBvcnQgZW51bSBDc3NNYXRjaGVyU3ltYm9sIHtcbiAgUHJlc2VuY2UgICA9ICcnLFxuICBFcXVhbCAgICAgID0gJz0nLFxuICBQcmVmaXggICAgID0gJ14nLFxuICBTdWZmaXggICAgID0gJyQnLFxuICBDb250YWlucyAgID0gJyonLFxuICBTdWJDb2RlICAgID0gJ3wnLFxuICBPY2N1cnJlbmNlID0gJ34nLFxufVxuXG5leHBvcnQgY29uc3QgZW51bSBDb21iaW5hdG9ycyB7XG4gIEFESkFDRU5UICAgPSAnKycsXG4gIFNJQkxJTkcgICAgPSAnficsXG4gIERFU0NFTkRBTlQgPSAnICcsXG4gIENISUxEICAgICAgPSAnPicsXG4gIE5PTkUgICAgICAgPSAnJyxcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGVcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL2RlbW8vaW5kZXgudHNcIik7XG4vLyBUaGlzIGVudHJ5IG1vZHVsZSB1c2VkICdleHBvcnRzJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG4iXSwic291cmNlUm9vdCI6IiJ9