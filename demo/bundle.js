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
var steps_1 = __webpack_require__(/*! ./steps */ "./demo/steps.ts");
window.createSet = function (sel) { return new csset_1.Csset(sel); };
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
    steps_1.executeStep(step, commentArea, codeArea, styleArea);
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

/***/ "./demo/steps.ts":
/*!***********************!*\
  !*** ./demo/steps.ts ***!
  \***********************/
/*! flagged exports */
/*! export STEPS [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export executeStep [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.executeStep = exports.STEPS = void 0;
exports.STEPS = [
    {
        comment: "These are the cells with class quadrant-one",
        code: function () {
            return createSet('.quadrant-one');
        }
    },
    {
        comment: "These are the cells with class quadrant-two",
        code: function () {
            return createSet('.quadrant-two');
        }
    },
    {
        comment: "These are the cells with class quadrant-three",
        code: function () {
            return createSet('.quadrant-three');
        }
    },
    {
        comment: "These are the cells with class quadrant-four",
        code: function () {
            return createSet('.quadrant-four');
        }
    },
    {
        comment: "These are the cells with class circle",
        code: function () {
            return createSet('.circle');
        }
    },
    {
        comment: "These are the cells with class diamond",
        code: function () {
            return createSet('.diamond');
        }
    },
    {
        comment: "Cells also contain a d-row attribute with the row number they have",
        code: function () {
            return createSet('[d-row=5]');
        }
    },
    {
        comment: "And contain a d-col attribute with the column number they have",
        code: function () {
            return createSet('[d-col=50]');
        }
    },
    {
        comment: "Each cell of the grid has its number in a d-sum attribute",
        code: function () {
            return createSet('[d-sum=50]');
        }
    },
    {
        comment: "Add the cell has marked if its odd number",
        code: function () {
            return createSet('[d-odd=true]');
        }
    },
    {
        comment: "Or even number",
        code: function () {
            return createSet('[d-even=true]');
        }
    },
];
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function executeStep(step, commentElem, codeElem, styeElem) {
    // Put comment and display snippet
    commentElem.innerText = step.comment;
    var source = step.code.toString();
    var cssSet = eval("(" + source + ")()");
    var styleText = cssSet + "{ background-color: " + getRandomColor() + "; }";
    var linesOfCode = source.split('\n').slice(1, -1).map(function (line) {
        return line.replace(/return /g, '').replace(/createSet/g, 'new Csset');
    });
    codeElem.innerText = linesOfCode.join('\n');
    styeElem.innerText = styleText;
}
exports.executeStep = executeStep;


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jc3NldC8uL2RlbW8vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vY3NzZXQvLi9kZW1vL3BsYXlncm91bmQudHMiLCJ3ZWJwYWNrOi8vY3NzZXQvLi9kZW1vL3N0ZXBzLnRzIiwid2VicGFjazovL2Nzc2V0Ly4vc3JjL2Nzcy1hdHRyaWJ1dGUtbWF0Y2hlci50cyIsIndlYnBhY2s6Ly9jc3NldC8uL3NyYy9jc3MtYXR0cmlidXRlLnRzIiwid2VicGFjazovL2Nzc2V0Ly4vc3JjL2Nzcy1ydWxlLnRzIiwid2VicGFjazovL2Nzc2V0Ly4vc3JjL2Nzcy1zZWxlY3Rvci1sZXhlci50cyIsIndlYnBhY2s6Ly9jc3NldC8uL3NyYy9jc3Mtc2VsZWN0b3IudHMiLCJ3ZWJwYWNrOi8vY3NzZXQvLi9zcmMvY3NzZXQudHMiLCJ3ZWJwYWNrOi8vY3NzZXQvLi9zcmMvbWF0Y2hlcnMvY29udGFpbnMtbWF0Y2hlci50cyIsIndlYnBhY2s6Ly9jc3NldC8uL3NyYy9tYXRjaGVycy9jc3MtbWF0Y2hlci1mYWN0b3J5LnRzIiwid2VicGFjazovL2Nzc2V0Ly4vc3JjL21hdGNoZXJzL2VxdWFsLW1hdGNoZXIudHMiLCJ3ZWJwYWNrOi8vY3NzZXQvLi9zcmMvbWF0Y2hlcnMvb2NjdXJyZW5jZS1tYXRjaGVyLnRzIiwid2VicGFjazovL2Nzc2V0Ly4vc3JjL21hdGNoZXJzL3ByZWZpeC1tYXRjaGVyLnRzIiwid2VicGFjazovL2Nzc2V0Ly4vc3JjL21hdGNoZXJzL3ByZXNlbmNlLW1hdGNoZXIudHMiLCJ3ZWJwYWNrOi8vY3NzZXQvLi9zcmMvbWF0Y2hlcnMvc3ViY29kZS1tYXRjaGVyLnRzIiwid2VicGFjazovL2Nzc2V0Ly4vc3JjL21hdGNoZXJzL3N1ZmZpeC1tYXRjaGVyLnRzIiwid2VicGFjazovL2Nzc2V0Ly4vc3JjL3R5cGVzLnRzIiwid2VicGFjazovL2Nzc2V0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2Nzc2V0L3dlYnBhY2svc3RhcnR1cCJd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QUM7QUFBRCxDQUFDLENBMUJxQywyQ0FBbUIsR0EwQnhEO0FBMUJZLDRDQUFnQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNSN0IsSUFBWSxZQVVYO0FBVkQsV0FBWSxZQUFZO0lBQ3RCLCtDQUFJO0lBQ0osMkNBQUU7SUFDRixxREFBTztJQUNQLGlEQUFLO0lBQ0wseURBQVM7SUFDVCxpREFBSztJQUNMLDJEQUFVO0lBQ1YseURBQVM7SUFDVCxxREFBTztBQUNULENBQUMsRUFWVyxZQUFZLEdBQVosb0JBQVksS0FBWixvQkFBWSxRQVV2QjtBQVFELElBQVksZ0JBUVg7QUFSRCxXQUFZLGdCQUFnQjtJQUMxQixpQ0FBZTtJQUNmLCtCQUFnQjtJQUNoQixnQ0FBZ0I7SUFDaEIsZ0NBQWdCO0lBQ2hCLGtDQUFnQjtJQUNoQixpQ0FBZ0I7SUFDaEIsb0NBQWdCO0FBQ2xCLENBQUMsRUFSVyxnQkFBZ0IsR0FBaEIsd0JBQWdCLEtBQWhCLHdCQUFnQixRQVEzQjs7Ozs7OztVQzFCRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7O1VDckJBO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENzc2V0IH0gZnJvbSAnLi4vc3JjL2Nzc2V0JztcbmltcG9ydCB7IHNldFBsYXlncm91bmQgfSBmcm9tICcuL3BsYXlncm91bmQnO1xuaW1wb3J0IHsgU1RFUFMsIGV4ZWN1dGVTdGVwIH3CoGZyb20gJy4vc3RlcHMnO1xuXG5kZWNsYXJlIHZhciBobGpzOiBhbnk7XG5cbih3aW5kb3cgYXMgYW55KS5jcmVhdGVTZXQgPSAoc2VsOiBzdHJpbmcpID0+IG5ldyBDc3NldChzZWwpO1xuXG4vLyBXaGVyZSB0byBwdXQgc3RlcCBpbmZvXG5jb25zdCBjb21tZW50QXJlYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb21tZW50JykgYXMgSFRNTFBhcmFncmFwaEVsZW1lbnQ7XG5jb25zdCBzdHlsZUFyZWEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3R5bGUnKSBhcyBIVE1MU3R5bGVFbGVtZW50O1xuY29uc3QgY29kZUFyZWEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29kZScpIGFzIEhUTUxQcmVFbGVtZW50O1xuLy8gQ29udHJvbFxuY29uc3QgbmV4dEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXh0JykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XG5cblxuLy8gUHJlcGFyZSB0aGUgcGxheWdyb3VuZFxuLy8gU2l6ZSBNVVNUIGJlIG9kZCBudW1iZXJcbmNvbnN0IHBsYXlncm91bmRTaXplID0gMTAxO1xuY29uc3QgcGxheWdyb3VuZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGF5Z3JvdW5kJyk7XG5zZXRQbGF5Z3JvdW5kKHBsYXlncm91bmQgYXMgSFRNTFRhYmxlRWxlbWVudCwgcGxheWdyb3VuZFNpemUpO1xuXG5sZXQgaW5kZXggPSAwO1xuXG5uZXh0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBpZiAobmV4dEJ1dHRvbi5pbm5lclRleHQgPT09ICdSZXN0YXJ0Jykge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBzdGVwID0gU1RFUFNbaW5kZXgrK107XG5cbiAgLy8gUHV0IGNvbW1lbnQgYW5kIGRpc3BsYXkgc25pcHBldFxuICBleGVjdXRlU3RlcChzdGVwLCBjb21tZW50QXJlYSwgY29kZUFyZWEsIHN0eWxlQXJlYSk7XG4gIGhsanMuaGlnaGxpZ2h0QmxvY2soY29kZUFyZWEpO1xuXG4gIGlmIChpbmRleCA+PSBTVEVQUy5sZW5ndGgpIHtcbiAgICBuZXh0QnV0dG9uLmlubmVyVGV4dCA9ICdSZXN0YXJ0JztcbiAgfVxufSk7IiwiXG4vLyBEaXZpZGUgdGhlIGdyaWQgaW4gNCBxdWFkcmFudHNcbmZ1bmN0aW9uIG1hcmtRdWFkcmFudCh0ZDogSFRNTFRhYmxlQ2VsbEVsZW1lbnQsIHJvdzogbnVtYmVyLCBjb2w6IG51bWJlciwgc2l6ZTogbnVtYmVyKTogdm9pZCB7XG4gIGNvbnN0IG1pZGRsZSA9IE1hdGguZmxvb3Ioc2l6ZSAvIDIpO1xuICBsZXQgcXVhZHJhbnQgPSAnJztcblxuICBpZiAocm93IDwgbWlkZGxlKSB7XG4gICAgcXVhZHJhbnQgPSBjb2wgPCBtaWRkbGUgPyAnb25lJyA6IGNvbCA+IG1pZGRsZSA/ICd0d28nIDogJyc7XG4gIH0gZWxzZSBpZiAocm93ID4gbWlkZGxlICl7XG4gICAgcXVhZHJhbnQgPSBjb2wgPCBtaWRkbGUgPyAndGhyZWUnIDogY29sID4gbWlkZGxlID8gJ2ZvdXInIDogJyc7XG4gIH1cblxuICBpZiAocXVhZHJhbnQpIHtcbiAgICB0ZC5jbGFzc0xpc3QuYWRkKGBxdWFkcmFudC0ke3F1YWRyYW50fWApO1xuICB9XG59XG5cbi8vIFB1dCBhIHJob21idXMgaW4gdGhlIG1pZGRsZVxuZnVuY3Rpb24gbWFya1Job21idXModGQ6IEhUTUxUYWJsZUNlbGxFbGVtZW50LCByb3c6IG51bWJlciwgY29sOiBudW1iZXIsIHNpemU6IG51bWJlcik6IHZvaWQge1xuICBjb25zdCBkaWZmID0gKHJvdyA8IHNpemUgLyAyKSA/IHJvdyA6IHNpemUgLSByb3cgLSAxO1xuICBjb25zdCBoaWdoID0gKHNpemUgLyAyKSArIGRpZmY7XG4gIGNvbnN0IGxvdyA9IChzaXplIC8gMikgLSBkaWZmIC0gMTtcblxuICBpZiAobG93IDw9IGNvbCAmJiBjb2wgPD0gaGlnaCkge1xuICAgIHRkLmNsYXNzTGlzdC5hZGQoYGRpYW1vbmRgKTtcbiAgfVxufVxuXG4vLyBBbHNvIGEgY2lyY2xlXG5mdW5jdGlvbiBtYXJrQ2lyY2xlKHRkOiBIVE1MVGFibGVDZWxsRWxlbWVudCwgcm93OiBudW1iZXIsIGNvbDogbnVtYmVyLCBzaXplOiBudW1iZXIpOiB2b2lkIHtcbiAgY29uc3QgcmFkaXVzID0gTWF0aC5mbG9vcihzaXplIC8gMik7XG4gIGNvbnN0IGNlbnRlciA9IHsgeDogcmFkaXVzLCB5OiByYWRpdXMgfTtcbiAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLnNxcnQoXG4gICAgTWF0aC5wb3coTWF0aC5hYnMoY2VudGVyLnggLSBjb2wpLCAyKSArXG4gICAgTWF0aC5wb3coTWF0aC5hYnMoY2VudGVyLnkgLSByb3cpLCAyKVxuICApO1xuXG4gIGlmIChkaXN0YW5jZSA8PSByYWRpdXMpIHtcbiAgICB0ZC5jbGFzc0xpc3QuYWRkKGBjaXJjbGVgKTtcbiAgfVxufVxuXG4vLyBtYW4gZnVuY3Rpb24gd2hpY2ggY3JlYXRlcyB0aGUgcGxheWdyb3VuZCBncmlkXG5leHBvcnQgZnVuY3Rpb24gc2V0UGxheWdyb3VuZCh0YWJsZTogSFRNTFRhYmxlRWxlbWVudCwgc2l6ZTogbnVtYmVyKTogdm9pZCB7XG5cbiAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgc2l6ZTsgcm93KyspIHtcbiAgICBjb25zdCB0ciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XG4gICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgc2l6ZTsgY29sKyspIHtcbiAgICAgIGNvbnN0IHRkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgICAgIGNvbnN0IHN1bSA9IChyb3cgKiBzaXplKSArIGNvbDtcbiAgXG4gICAgICB0ZC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3RpbGUnKTtcbiAgICAgIHRkLnNldEF0dHJpYnV0ZSgnZC1yb3cnLCBgJHtyb3d9YCk7XG4gICAgICB0ZC5zZXRBdHRyaWJ1dGUoJ2QtY29sJywgYCR7Y29sfWApO1xuICAgICAgdGQuc2V0QXR0cmlidXRlKCdkLXN1bScsIGAke3N1bX1gKTtcbiAgICAgIHRkLnNldEF0dHJpYnV0ZSgnZC1vZGQnLCBgJHtzdW0gJSAyID09PSAwfWApO1xuICAgICAgdGQuc2V0QXR0cmlidXRlKCdkLWV2ZW4nLCBgJHtzdW0gJSAyID09PSAxfWApO1xuICAgICAgLy8gdGQuaW5uZXJUZXh0ID0gYCR7c3VtfWA7XG4gIFxuICAgICAgbWFya1F1YWRyYW50KHRkLCByb3csIGNvbCwgc2l6ZSk7XG4gICAgICBtYXJrQ2lyY2xlKHRkLCByb3csIGNvbCwgc2l6ZSk7XG4gICAgICBtYXJrUmhvbWJ1cyh0ZCwgcm93LCBjb2wsIHNpemUpO1xuICAgICAgdHIuYXBwZW5kQ2hpbGQodGQpO1xuICAgIH1cbiAgICB0YWJsZS5hcHBlbmRDaGlsZCh0cik7XG4gIH1cbn0iLCJpbnRlcmZhY2UgU3RlcCB7XG4gIGNvbW1lbnQ6IHN0cmluZztcbiAgY29kZTogKCkgPT4gdW5rbm93bjtcbn1cblxuZGVjbGFyZSB2YXIgY3JlYXRlU2V0OiAoc2VsZWN0b3I6IHN0cmluZykgPT4gdW5rbm93bjtcblxuZXhwb3J0IGNvbnN0IFNURVBTOiBTdGVwW10gPSBbXG4gIHtcbiAgICBjb21tZW50OiBcIlRoZXNlIGFyZSB0aGUgY2VsbHMgd2l0aCBjbGFzcyBxdWFkcmFudC1vbmVcIixcbiAgICBjb2RlOiAoKSA9PiB7XG4gICAgICByZXR1cm4gY3JlYXRlU2V0KCcucXVhZHJhbnQtb25lJyk7XG4gICAgfVxuICB9LFxuICB7XG4gICAgY29tbWVudDogXCJUaGVzZSBhcmUgdGhlIGNlbGxzIHdpdGggY2xhc3MgcXVhZHJhbnQtdHdvXCIsXG4gICAgY29kZTogKCkgPT4ge1xuICAgICAgcmV0dXJuIGNyZWF0ZVNldCgnLnF1YWRyYW50LXR3bycpO1xuICAgIH1cbiAgfSxcbiAge1xuICAgIGNvbW1lbnQ6IFwiVGhlc2UgYXJlIHRoZSBjZWxscyB3aXRoIGNsYXNzIHF1YWRyYW50LXRocmVlXCIsXG4gICAgY29kZTogKCkgPT4ge1xuICAgICAgcmV0dXJuIGNyZWF0ZVNldCgnLnF1YWRyYW50LXRocmVlJyk7XG4gICAgfVxuICB9LFxuICB7XG4gICAgY29tbWVudDogXCJUaGVzZSBhcmUgdGhlIGNlbGxzIHdpdGggY2xhc3MgcXVhZHJhbnQtZm91clwiLFxuICAgIGNvZGU6ICgpID0+IHtcbiAgICAgIHJldHVybiBjcmVhdGVTZXQoJy5xdWFkcmFudC1mb3VyJyk7XG4gICAgfVxuICB9LFxuICB7XG4gICAgY29tbWVudDogXCJUaGVzZSBhcmUgdGhlIGNlbGxzIHdpdGggY2xhc3MgY2lyY2xlXCIsXG4gICAgY29kZTogKCkgPT4ge1xuICAgICAgcmV0dXJuIGNyZWF0ZVNldCgnLmNpcmNsZScpO1xuICAgIH1cbiAgfSxcbiAge1xuICAgIGNvbW1lbnQ6IFwiVGhlc2UgYXJlIHRoZSBjZWxscyB3aXRoIGNsYXNzIGRpYW1vbmRcIixcbiAgICBjb2RlOiAoKSA9PiB7XG4gICAgICByZXR1cm4gY3JlYXRlU2V0KCcuZGlhbW9uZCcpO1xuICAgIH1cbiAgfSxcbiAge1xuICAgIGNvbW1lbnQ6IFwiQ2VsbHMgYWxzbyBjb250YWluIGEgZC1yb3cgYXR0cmlidXRlIHdpdGggdGhlIHJvdyBudW1iZXIgdGhleSBoYXZlXCIsXG4gICAgY29kZTogKCkgPT4ge1xuICAgICAgcmV0dXJuIGNyZWF0ZVNldCgnW2Qtcm93PTVdJyk7XG4gICAgfVxuICB9LFxuICB7XG4gICAgY29tbWVudDogXCJBbmQgY29udGFpbiBhIGQtY29sIGF0dHJpYnV0ZSB3aXRoIHRoZSBjb2x1bW4gbnVtYmVyIHRoZXkgaGF2ZVwiLFxuICAgIGNvZGU6ICgpID0+IHtcbiAgICAgIHJldHVybiBjcmVhdGVTZXQoJ1tkLWNvbD01MF0nKTtcbiAgICB9XG4gIH0sXG4gIHtcbiAgICBjb21tZW50OiBcIkVhY2ggY2VsbCBvZiB0aGUgZ3JpZCBoYXMgaXRzIG51bWJlciBpbiBhIGQtc3VtIGF0dHJpYnV0ZVwiLFxuICAgIGNvZGU6ICgpID0+IHtcbiAgICAgIHJldHVybiBjcmVhdGVTZXQoJ1tkLXN1bT01MF0nKTtcbiAgICB9XG4gIH0sXG4gIHtcbiAgICBjb21tZW50OiBcIkFkZCB0aGUgY2VsbCBoYXMgbWFya2VkIGlmIGl0cyBvZGQgbnVtYmVyXCIsXG4gICAgY29kZTogKCkgPT4ge1xuICAgICAgcmV0dXJuIGNyZWF0ZVNldCgnW2Qtb2RkPXRydWVdJyk7XG4gICAgfVxuICB9LFxuICB7XG4gICAgY29tbWVudDogXCJPciBldmVuIG51bWJlclwiLFxuICAgIGNvZGU6ICgpID0+IHtcbiAgICAgIHJldHVybiBjcmVhdGVTZXQoJ1tkLWV2ZW49dHJ1ZV0nKTtcbiAgICB9XG4gIH0sXG5dO1xuXG5mdW5jdGlvbiBnZXRSYW5kb21Db2xvcigpOiBzdHJpbmcge1xuICB2YXIgbGV0dGVycyA9ICcwMTIzNDU2Nzg5QUJDREVGJztcbiAgdmFyIGNvbG9yID0gJyMnO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IDY7IGkrKykge1xuICAgIGNvbG9yICs9IGxldHRlcnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTYpXTtcbiAgfVxuICByZXR1cm4gY29sb3I7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleGVjdXRlU3RlcChcbiAgc3RlcDogU3RlcCxcbiAgY29tbWVudEVsZW06IEhUTUxFbGVtZW50LFxuICBjb2RlRWxlbTogSFRNTEVsZW1lbnQsXG4gIHN0eWVFbGVtOiBIVE1MRWxlbWVudFxuKTogdm9pZCB7XG4gIC8vIFB1dCBjb21tZW50IGFuZCBkaXNwbGF5IHNuaXBwZXRcbiAgY29tbWVudEVsZW0uaW5uZXJUZXh0ID0gc3RlcC5jb21tZW50O1xuXG4gIGNvbnN0IHNvdXJjZSA9IHN0ZXAuY29kZS50b1N0cmluZygpO1xuICBjb25zdCBjc3NTZXQgPSBldmFsKGAoJHtzb3VyY2V9KSgpYCk7XG4gIGNvbnN0IHN0eWxlVGV4dCA9IGAke2Nzc1NldH17IGJhY2tncm91bmQtY29sb3I6ICR7Z2V0UmFuZG9tQ29sb3IoKX07IH1gO1xuXG4gIGNvbnN0IGxpbmVzT2ZDb2RlID0gc291cmNlLnNwbGl0KCdcXG4nKS5zbGljZSgxLCAtMSkubWFwKGxpbmUgPT4ge1xuICAgIHJldHVybiBsaW5lLnJlcGxhY2UoL3JldHVybiAvZywgJycpLnJlcGxhY2UoL2NyZWF0ZVNldC9nLCAnbmV3IENzc2V0Jyk7XG4gIH0pO1xuXG4gIGNvZGVFbGVtLmlubmVyVGV4dCA9IGxpbmVzT2ZDb2RlLmpvaW4oJ1xcbicpO1xuICBzdHllRWxlbS5pbm5lclRleHQgPSBzdHlsZVRleHQ7XG5cbn1cbiIsImltcG9ydCB7IENzc01hdGNoZXJTeW1ib2wgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5cbmV4cG9ydCBjbGFzcyBDc3NBdHRyaWJ1dGVNYXRjaGVyIHtcbiAgcmVhZG9ubHkgc3ltYm9sOiBDc3NNYXRjaGVyU3ltYm9sO1xuICB2YWx1ZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yICh2YWw6IHN0cmluZykge1xuICAgIHRoaXMudmFsdWUgPSB2YWw7XG4gIH1cblxuICBzdXBlcnNldE9mICggbWF0Y2hlcjogQ3NzQXR0cmlidXRlTWF0Y2hlciApOiBib29sZWFuIHtcbiAgICB0aHJvdyBFcnJvcihgbm8gc3VwZXJzZXRPZiBtZXRob2QgaW1wbGVtZW50ZWQgZm9yIG1hdGNoZXIgc3ltYm9sICR7dGhpcy5zeW1ib2x9YCk7XG4gIH1cblxuICBzdWJzZXRPZiAoIG1hdGNoZXI6IENzc0F0dHJpYnV0ZU1hdGNoZXIgKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIG1hdGNoZXIuc3VwZXJzZXRPZih0aGlzKTtcbiAgfVxuXG4gIHVuaW9uICggbWF0Y2hlcjogQ3NzQXR0cmlidXRlTWF0Y2hlciApOiBzdHJpbmcgfCBudWxsIHtcbiAgICBpZiAoIHRoaXMuc3VwZXJzZXRPZihtYXRjaGVyKSApIHtcbiAgICAgIHJldHVybiBgJHt0aGlzfWA7XG4gICAgfSBlbHNlIGlmICggbWF0Y2hlci5zdXBlcnNldE9mKHRoaXMpICkge1xuICAgICAgcmV0dXJuIGAke21hdGNoZXJ9YDtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGludGVyc2VjdGlvbiAoIG1hdGNoZXI6IENzc0F0dHJpYnV0ZU1hdGNoZXIgKTogc3RyaW5nIHwgbnVsbCB8IHZvaWQge1xuICAgIGlmICggdGhpcy5zdXBlcnNldE9mKG1hdGNoZXIpICkge1xuICAgICAgcmV0dXJuIGAke21hdGNoZXJ9YDtcbiAgICB9IGVsc2UgaWYgKCBtYXRjaGVyLnN1cGVyc2V0T2YodGhpcykgKSB7XG4gICAgICByZXR1cm4gYCR7dGhpc31gO1xuICAgIH1cblxuICAgIC8vIEVxdWFscyBpbnRlcnNlY3Qgd2l0aCBhbnkgb3RoZXIgbWF0Y2hlclxuICAgIC8vIFJldHVybiB2b2lkIGluZGljYXRpbmcgdGhlIGludGVyc2VjdGlvbiBpcyBhbiBlbXB0eSBzZXRcbiAgICBpZiAoIFt0aGlzLnN5bWJvbCwgbWF0Y2hlci5zeW1ib2xdLmluZGV4T2YoQ3NzTWF0Y2hlclN5bWJvbC5FcXVhbCkgIT09IC0xICkge1xuICAgICAgaWYgKG1hdGNoZXIudmFsdWUgIT09IHRoaXMudmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuc3ltYm9sID09PSBDc3NNYXRjaGVyU3ltYm9sLlByZXNlbmNlKSB7XG4gICAgICByZXR1cm4gYGBcbiAgICB9XG4gICAgcmV0dXJuIGAke3RoaXMuc3ltYm9sfT1cIiR7dGhpcy52YWx1ZX1cImAucmVwbGFjZSgvXj0vLCAnJyk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENzc0F0dHJpYnV0ZU1hdGNoZXIgfSBmcm9tICcuL2Nzcy1hdHRyaWJ1dGUtbWF0Y2hlcic7XG5pbXBvcnQgeyBDc3NNYXRjaGVyRmFjdG9yeSB9IGZyb20gJy4vbWF0Y2hlcnMvY3NzLW1hdGNoZXItZmFjdG9yeSc7XG5cbmV4cG9ydCBjbGFzcyBDc3NBdHRyaWJ1dGUge1xuICBuYW1lICAgIDogc3RyaW5nO1xuICBtYXRjaGVyczogQ3NzQXR0cmlidXRlTWF0Y2hlcltdID0gW107XG5cbiAgY29uc3RydWN0b3IgKFtuYW1lLCBzeW1ib2wsIHZhbHVlXTogc3RyaW5nW10pIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHN5bWJvbCAgICA9IHN5bWJvbCB8fMKgJyc7XG4gICAgdmFsdWUgICAgID0gdmFsdWU7XG5cbiAgICBjb25zdCBtYXRjaGVyID0gQ3NzTWF0Y2hlckZhY3RvcnkuY3JlYXRlKGAke3N5bWJvbH0ke3ZhbHVlfWApO1xuICAgIGxldCBpbnRlcnNlY3Rpb247XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubWF0Y2hlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGludGVyc2VjdGlvbiA9IG1hdGNoZXIuaW50ZXJzZWN0aW9uKHRoaXMubWF0Y2hlcnNbaV0pO1xuICAgICAgXG4gICAgICBpZiAoaW50ZXJzZWN0aW9uKSB7XG4gICAgICAgIHRoaXMubWF0Y2hlcnNbaV0gPSBDc3NNYXRjaGVyRmFjdG9yeS5jcmVhdGUoaW50ZXJzZWN0aW9uKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFpbnRlcnNlY3Rpb24pIHtcbiAgICAgIHRoaXMubWF0Y2hlcnMucHVzaChtYXRjaGVyKTtcbiAgICB9XG4gIH1cblxuICBzdXBlcnNldE9mICggYXR0cjogQ3NzQXR0cmlidXRlICk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHRoaXNNYXRjaGVycyA9IHRoaXMubWF0Y2hlcnM7XG4gICAgY29uc3QgYXR0ck1hdGNoZXJzID0gYXR0ci5tYXRjaGVycztcblxuICAgIC8vIFRvIGJlIGEgc3VwZXJzZXQgYWxsIG1hdGNoZXJzIGluIHRoaXNcbiAgICAvLyAtIG11c3QgYmUgYSBzdXBlcnNldCBvZiBhdCBsZWFzdCBvbmUgYXR0ck1hdGNoZXJcbiAgICAvLyAtIG11c3Qgbm90IGhhdmUgYSB2b2lkIGludGVyc2VjdGlvbiB3aXRoIGFueSBhdHRyTWF0Y2hlclxuICAgIGZvciAobGV0IG1hdGNoZXIgb2YgdGhpc01hdGNoZXJzKSB7XG4gICAgICBjb25zdCBzdXBlcnNldEluZGV4ID0gYXR0ck1hdGNoZXJzLmZpbmRJbmRleCgoYXR0ck1hdGNoZXIpID0+IG1hdGNoZXIuc3VwZXJzZXRPZihhdHRyTWF0Y2hlcikpO1xuICAgICAgY29uc3Qgdm9pZEluZGV4ID0gYXR0ck1hdGNoZXJzLmZpbmRJbmRleCgoYXR0ck1hdGNoZXIpID0+IG1hdGNoZXIuaW50ZXJzZWN0aW9uKGF0dHJNYXRjaGVyKSA9PT0gdm9pZCAwKTtcblxuICAgICAgaWYgKCBzdXBlcnNldEluZGV4ID09PSAtMSB8fCB2b2lkSW5kZXggIT09IC0xICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBzdWJzZXRPZiAoIGF0dHI6IENzc0F0dHJpYnV0ZSApOiBib29sZWFuIHtcbiAgICByZXR1cm4gYXR0ci5zdXBlcnNldE9mKHRoaXMpO1xuICB9XG5cbiAgdW5pb24oIGF0dHI6IENzc0F0dHJpYnV0ZSApOiBDc3NBdHRyaWJ1dGUgfCBudWxsIHtcbiAgICBjb25zdCB1bmlvbiA9IHRoaXMuc3VwZXJzZXRPZihhdHRyKSA/IHRoaXMgOlxuICAgICAgICAgICAgICAgICAgYXR0ci5zdXBlcnNldE9mKHRoaXMpID8gYXR0ciA6IG51bGw7XG5cbiAgICByZXR1cm4gdW5pb247XG4gIH1cblxuICBpbnRlcnNlY3Rpb24oIGF0dHI6IENzc0F0dHJpYnV0ZSApOiBDc3NBdHRyaWJ1dGUgfCB2b2lkIHtcbiAgICBpZiAoIHRoaXMuc3VwZXJzZXRPZihhdHRyKSApIHtcbiAgICAgIHJldHVybiBhdHRyO1xuICAgIH1cblxuICAgIGlmICggYXR0ci5zdXBlcnNldE9mKHRoaXMpICkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgY29uc3QgdGhpc01hdGNoZXJzID0gdGhpcy5tYXRjaGVycztcbiAgICBjb25zdCBhdHRyTWF0Y2hlcnMgPSBhdHRyLm1hdGNoZXJzO1xuICAgIGNvbnN0IGludGVyc2VjdGlvbk1hdGNoZXJzOiBDc3NBdHRyaWJ1dGVNYXRjaGVyW10gPSBbXTtcblxuICAgIGZvciAoIGxldCBtYXRjaGVyIG9mIHRoaXNNYXRjaGVycyApIHtcbiAgICAgIGNvbnN0IHZvaWRJbmRleCA9IGF0dHJNYXRjaGVycy5maW5kSW5kZXgoKGF0dHJNYXRjaGVyKSA9PiBtYXRjaGVyLmludGVyc2VjdGlvbihhdHRyTWF0Y2hlcikgPT09IHZvaWQgMCk7XG5cbiAgICAgIGlmICggdm9pZEluZGV4ICE9PSAtMSApIHtcbiAgICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgY29uc3QgaW50ZXJzZWN0SW5kZXggPSBhdHRyTWF0Y2hlcnMuZmluZEluZGV4KChhdHRyTWF0Y2hlcikgPT4gISFtYXRjaGVyLmludGVyc2VjdGlvbihhdHRyTWF0Y2hlcikpO1xuXG4gICAgICBpZiAoIGludGVyc2VjdEluZGV4ICE9PSAtMSApIHtcbiAgICAgICAgY29uc3QgbWF0Y2hlclN0cmluZyA9IG1hdGNoZXIuaW50ZXJzZWN0aW9uKGF0dHJNYXRjaGVyc1tpbnRlcnNlY3RJbmRleF0pO1xuXG4gICAgICAgIGludGVyc2VjdGlvbk1hdGNoZXJzLnB1c2goQ3NzTWF0Y2hlckZhY3RvcnkuY3JlYXRlKGAke21hdGNoZXJTdHJpbmd9YCkpO1xuICAgICAgICBhdHRyTWF0Y2hlcnMuc3BsaWNlKGludGVyc2VjdEluZGV4LCAxKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGludGVyc2VjdGlvbk1hdGNoZXJzLnB1c2gobWF0Y2hlcik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICggbGV0IG1hdGNoZXIgb2YgYXR0ck1hdGNoZXJzICkge1xuICAgICAgaW50ZXJzZWN0aW9uTWF0Y2hlcnMucHVzaChtYXRjaGVyKTtcbiAgICB9XG5cbiAgICBjb25zdCBpbnRlcnNlY3Rpb25BdHRyID0gbmV3IENzc0F0dHJpYnV0ZShbdGhpcy5uYW1lXSk7XG4gICAgaW50ZXJzZWN0aW9uQXR0ci5tYXRjaGVycyA9IGludGVyc2VjdGlvbk1hdGNoZXJzO1xuXG4gICAgcmV0dXJuIGludGVyc2VjdGlvbkF0dHI7XG4gIH1cblxuICB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm1hdGNoZXJzXG4gICAgICAubWFwKG1hdGNoZXIgPT4gYCR7bWF0Y2hlcn1gKVxuICAgICAgLnNvcnQoKVxuICAgICAgLnJlZHVjZSgocHJldiwgbWF0Y2hlcikgPT4gYCR7cHJldn1bJHt0aGlzLm5hbWV9JHttYXRjaGVyfV1gLCAnJyk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENzc0F0dHJpYnV0ZSB9IGZyb20gJy4vY3NzLWF0dHJpYnV0ZSc7XG5cbmV4cG9ydCBjbGFzcyBDc3NSdWxlIHtcbiAgcHJpdmF0ZSBfaWQgICAgICA6IHN0cmluZztcbiAgcHJpdmF0ZSBfZWxlbWVudCA6IHN0cmluZztcbiAgY2xhc3NlcyA6IFNldDxzdHJpbmc+ID0gbmV3IFNldCgpO1xuICBhdHRyaWJzIDogTWFwPHN0cmluZywgQ3NzQXR0cmlidXRlPiA9IG5ldyBNYXAoKTtcblxuICBzZXQgaWQoaWQ6IHN0cmluZykge1xuICAgIGlmICh0aGlzLl9pZCkge1xuICAgICAgdGhyb3cgU3ludGF4RXJyb3IoYElkZW50aWZpZXIgYWxyZWFkeSBzZXQgdG8gJHt0aGlzLmlkfS5gKVxuICAgIH1cbiAgICB0aGlzLl9pZCA9IGlkO1xuICB9XG5cbiAgZ2V0IGlkKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2lkO1xuICB9XG5cbiAgc2V0IGVsZW1lbnQoZWxlbWVudDogc3RyaW5nKSB7XG4gICAgaWYodGhpcy5hdHRyaWJzLnNpemUpIHtcbiAgICAgIHRocm93IFN5bnRheEVycm9yKGBFbGVtZW50cyBjYW5ub3QgYmUgZGVmaW5lZCBhZnRlciBhdHRyaWJ1dGVzLmApO1xuICAgIH1cbiAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgfVxuICBnZXQgZWxlbWVudCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9lbGVtZW50IHx8ICcqJztcbiAgfVxuXG4gIGFkZEF0dHJpYnV0ZShhdHRyaWJ1dGU6IENzc0F0dHJpYnV0ZSkge1xuICAgIGNvbnN0IHByZXZBdHRyaWJ1dGUgPSB0aGlzLmF0dHJpYnMuZ2V0KGF0dHJpYnV0ZS5uYW1lKVxuXG4gICAgaWYgKHByZXZBdHRyaWJ1dGUpIHtcbiAgICAgIGNvbnN0IG1lcmdlZEF0dHJpYnV0ZSA9IHByZXZBdHRyaWJ1dGUuaW50ZXJzZWN0aW9uKGF0dHJpYnV0ZSk7XG5cbiAgICAgIGlmIChtZXJnZWRBdHRyaWJ1dGUgPT09IHZvaWQgMCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBUaGUgc2VsZWN0b3IgZGVmaW5lcyBhbiBlbXB0eSBzZXQuYCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmF0dHJpYnMuc2V0KHByZXZBdHRyaWJ1dGUubmFtZSwgbWVyZ2VkQXR0cmlidXRlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hdHRyaWJzLnNldChhdHRyaWJ1dGUubmFtZSwgYXR0cmlidXRlKTtcbiAgICB9XG4gIH1cblxuICBhZGRDbGFzcyAoIGNsYXNzTmFtZTogc3RyaW5nICkge1xuICAgIHRoaXMuY2xhc3Nlcy5hZGQoY2xhc3NOYW1lKTtcbiAgfVxuXG4gIGVxdWFscyAoIHJ1bGU6IENzc1J1bGUgKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGAke3RoaXN9YCA9PT0gYCR7cnVsZX1gO1xuICB9XG5cbiAgc3VwZXJzZXRPZiAoIHJ1bGU6IENzc1J1bGUgKTogYm9vbGVhbiB7XG4gICAgLy8gRWxlbWVudFxuICAgIGlmICh0aGlzLmVsZW1lbnQgIT09ICcqJyAmJiB0aGlzLmVsZW1lbnQgIT09IHJ1bGUuZWxlbWVudCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIElEXG4gICAgaWYgKHRoaXMuaWQgJiYgdGhpcy5pZCAhPT0gcnVsZS5pZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIGNsYXNzZXNcbiAgICBmb3IgKGxldCBjIG9mIHRoaXMuY2xhc3Nlcykge1xuICAgICAgaWYgKCFydWxlLmNsYXNzZXMuaGFzKGMpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBdHRyaWJ1dGVzXG4gICAgLy8gTW9yZSBhdHRyaWJzIG1lYW4gbW9yZSBzcGVjaWZpYyBzbyBpdCBjYW5ub3QgYmUgc3VwZXJzZXRcbiAgICBpZiAodGhpcy5hdHRyaWJzLnNpemUgPiBydWxlLmF0dHJpYnMuc2l6ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIC8vIENoZWNrIGF0dHJpYnV0ZXNcbiAgICBmb3IgKGxldCBhdHRyIG9mIHRoaXMuYXR0cmlicy52YWx1ZXMoKSkge1xuICAgICAgY29uc3QgcnVsZUF0dHIgPSBydWxlLmF0dHJpYnMuZ2V0KGF0dHIubmFtZSk7XG5cbiAgICAgIC8vIGF0dHJpYiBzaG91bGQgYmUgZGVmaW5lZCBpbiBib3RoIGFuZCBpbmNsdWRlIFxuICAgICAgaWYgKHJ1bGVBdHRyICYmICFhdHRyLnN1cGVyc2V0T2YocnVsZUF0dHIpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0gZWxzZSBpZiAoIXJ1bGVBdHRyKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHN1YnNldE9mICggcnVsZTogQ3NzUnVsZSApOiBib29sZWFuIHtcbiAgICByZXR1cm4gcnVsZS5zdXBlcnNldE9mKHRoaXMpO1xuICB9XG5cbiAgdW5pb24oIHJ1bGU6IENzc1J1bGUgKTogQ3NzUnVsZVtdIHtcbiAgICBjb25zdCB1bmlvbiA9IHRoaXMuc3VwZXJzZXRPZihydWxlKSA/IFt0aGlzXSA6XG4gICAgICAgICAgICAgICAgICBydWxlLnN1cGVyc2V0T2YodGhpcykgPyBbcnVsZV0gOiBbdGhpcywgcnVsZV07XG5cbiAgICByZXR1cm4gdW5pb247XG4gIH1cblxuICBpbnRlcnNlY3Rpb24oIHJ1bGU6IENzc1J1bGUgKTogQ3NzUnVsZSB8IHZvaWQge1xuICAgIGlmICh0aGlzLmlkICYmIHJ1bGUuaWQgJiYgdGhpcy5pZCAhPT0gcnVsZS5pZCkge1xuICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICB9XG4gICAgaWYgKHRoaXMuZWxlbWVudCAhPT0gcnVsZS5lbGVtZW50ICYmIHRoaXMuZWxlbWVudCAhPT0gJyonICYmIHJ1bGUuZWxlbWVudCAhPT0gJyonKSB7XG4gICAgICByZXR1cm4gdm9pZCAwO1xuICAgIH1cbiAgICBjb25zdCBpbnRlcnNlY3Rpb24gPSBuZXcgQ3NzUnVsZSgpO1xuXG4gICAgaW50ZXJzZWN0aW9uLmlkID0gdGhpcy5pZCB8fMKgcnVsZS5pZDtcbiAgICBcbiAgICBpZiAodGhpcy5lbGVtZW50ICE9PSAnKicpIHtcbiAgICAgIGludGVyc2VjdGlvbi5lbGVtZW50ID0gdGhpcy5lbGVtZW50O1xuICAgIH1cblxuICAgIHRoaXMuY2xhc3Nlcy5mb3JFYWNoKGNscyA9PiBpbnRlcnNlY3Rpb24uYWRkQ2xhc3MoY2xzKSk7XG4gICAgcnVsZS5jbGFzc2VzLmZvckVhY2goY2xzID0+IGludGVyc2VjdGlvbi5hZGRDbGFzcyhjbHMpKTtcblxuICAgIHRyeSB7XG4gICAgICB0aGlzLmF0dHJpYnMuZm9yRWFjaChhdHRyID0+IGludGVyc2VjdGlvbi5hZGRBdHRyaWJ1dGUoYXR0cikpO1xuICAgICAgcnVsZS5hdHRyaWJzLmZvckVhY2goYXR0ciA9PiBpbnRlcnNlY3Rpb24uYWRkQXR0cmlidXRlKGF0dHIpKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICB9XG5cbiAgICByZXR1cm4gaW50ZXJzZWN0aW9uO1xuICB9XG5cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICBjb25zdCBjbGFzc2VzID0gQXJyYXkuZnJvbSh0aGlzLmNsYXNzZXMpLnNvcnQoKTtcbiAgICBjb25zdCBhdHRyaWJzID0gQXJyYXkuZnJvbSh0aGlzLmF0dHJpYnMua2V5cygpKS5zb3J0KCkubWFwKG4gPT4gdGhpcy5hdHRyaWJzLmdldChuKSkgYXMgQ3NzQXR0cmlidXRlW107XG5cbiAgICBjb25zdCBzdHJDbGFzc2VzID0gY2xhc3Nlcy5tYXAobiA9PiBgLiR7bn1gKTtcbiAgICBjb25zdCBzdHJBdHRyaWJzID0gYXR0cmlicy5tYXAoYSA9PiBgJHthfWApO1xuICAgIGNvbnN0IHN0cklkID0gdGhpcy5pZCA/IGAjJHt0aGlzLmlkfWAgOiAnJztcblxuICAgIHJldHVybiBgJHt0aGlzLmVsZW1lbnR9JHtzdHJJZH0ke3N0ckNsYXNzZXMuam9pbignJyl9JHtzdHJBdHRyaWJzLmpvaW4oJycpfWA7XG4gIH1cbn1cbiIsIi8vIFRPRE86IHVzZSBsZXhlciAmIGdyYW1tYXIgZnJvbVxuLy8gaHR0cHM6Ly93d3cudzMub3JnL1RSL0NTUzIyL2dyYW1tYXIuaHRtbFxuLy8gdXNlIGZvbGxvd2luZyB0b29sIHRvIHdvcmsgd2l0aCByZWdleFxuLy8gaHR0cHM6Ly9yZWdleDEwMS5jb20vXG4vLyBUT0RPOiB1c2UgdGhpcyBucG0gbGliXG4vLyBucG0gaW5zdGFsbCBwYXJzZWwtanNcbmltcG9ydCB7IENzc1Rva2VuVHlwZSwgQ3NzVG9rZW4gfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5jb25zdCBDU1NfVE9LRU5fTUFUQ0hFUlMgPSBbXG4gIHtcbiAgICB0eXBlOiBDc3NUb2tlblR5cGUuRWxlbWVudCxcbiAgICByeDovXigtP1tfYS16XVtfYS16MC05LV0qfFxcKikvaSxcbiAgfSxcbiAge1xuICAgIHR5cGU6IENzc1Rva2VuVHlwZS5JZCxcbiAgICByeDovXiMoLT9bX2Etel1bX2EtejAtOS1dKikvaVxuICB9LFxuICB7XG4gICAgdHlwZTogQ3NzVG9rZW5UeXBlLkNsYXNzLFxuICAgIHJ4Oi9eXFwuKC0/W19hLXpdW19hLXowLTktXSopL2lcbiAgfSxcbiAge1xuICAgIHR5cGU6IENzc1Rva2VuVHlwZS5BdHRyaWJ1dGUsXG4gICAgcng6L15cXFsoLT9bX2Etel1bX2EtejAtOS1dKikoPzooW1xcXlxcJFxcKlxcfH5dPz0pPyhbX2EtejAtOVxcdTAwODAtXFx1RkZGRl0rfFwiW15cIl0qXCJ8J1teJ10qJykpP1xcXS9pXG4gIH0sXG4gIHtcbiAgICB0eXBlOiBDc3NUb2tlblR5cGUuQ29tYmluYXRvcixcbiAgICByeDovXig/OlxccyopKFt+PlxcK10pKD86XFxzKikvXG4gIH0sXG4gIHtcbiAgICB0eXBlOiBDc3NUb2tlblR5cGUuU2VwYXJhdG9yLFxuICAgIHJ4Oi9eKD86XFxzKikoLCkoPzpcXHMqKS9cbiAgfSxcbiAge1xuICAgIHR5cGU6IENzc1Rva2VuVHlwZS5TcGFjZSxcbiAgICByeDovXihcXHMrKS9cbiAgfSxcbl07XG5cblxuZXhwb3J0IGNsYXNzIENzc1NlbGVjdG9yTGV4ZXIge1xuXG4gIHByaXZhdGUgc2VsZWN0b3I6IHN0cmluZztcbiAgcHJpdmF0ZSBwb3NpdGlvbjogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3RvciAoc2VsZWN0b3I6IHN0cmluZykge1xuICAgIHRoaXMuc2VsZWN0b3IgPSBzZWxlY3Rvci50cmltKCk7XG4gIH1cblxuICBuZXh0VG9rZW4oKTogQ3NzVG9rZW4gfCB1bmRlZmluZWQge1xuICAgIGlmICh0aGlzLnNlbGVjdG9yID09PSAnJykge1xuICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICB9XG5cbiAgICBjb25zdCBzZWwgICAgID0gdGhpcy5zZWxlY3RvcjtcbiAgICBjb25zdCBwb3MgICAgID0gdGhpcy5wb3NpdGlvbjtcbiAgICBjb25zdCBtYXRjaGVyID0gQ1NTX1RPS0VOX01BVENIRVJTLmZpbmQoKHQpID0+IHQucngudGVzdChzZWwpKTtcbiAgICBsZXQgZXhlY0FycmF5OiBSZWdFeHBFeGVjQXJyYXkgfCBudWxsIHwgdW5kZWZpbmVkO1xuXG4gICAgZXhlY0FycmF5ID0gbWF0Y2hlciAmJiBtYXRjaGVyLnJ4LmV4ZWMoc2VsKTtcblxuICAgIGlmIChtYXRjaGVyICYmIGV4ZWNBcnJheSkge1xuICAgICAgY29uc3QgW2Z1bGwsIC4uLnBhcnRpYWxzXSA9IGV4ZWNBcnJheTtcbiAgICAgIHRoaXMuc2VsZWN0b3IgPSBzZWwucmVwbGFjZShmdWxsLCAnJyk7XG4gICAgICB0aGlzLnBvc2l0aW9uID0gcG9zICsgZnVsbC5sZW5ndGg7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGUgICAgOiBtYXRjaGVyLnR5cGUsXG4gICAgICAgIHZhbHVlcyAgOiB0aGlzLnNhbml0aXplVmFsdWVzKHBhcnRpYWxzKSxcbiAgICAgICAgcG9zaXRpb246IHBvcyxcbiAgICAgICAgbGVuZ3RoICA6IGZ1bGwubGVuZ3RoXG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vIFdlIHJlYWNoZWQgYW4gcGFydCB3aGVyZSB3ZSBjYW5ub3QgcGFyc2UgdGhlIHNlbGVjdG9yXG4gICAgdGhpcy5zZWxlY3RvciA9ICcnO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGUgICAgOiBDc3NUb2tlblR5cGUuVW5rbm93bixcbiAgICAgIHZhbHVlcyAgOiBbc2VsXSxcbiAgICAgIHBvc2l0aW9uOiBwb3MsXG4gICAgICBsZW5ndGggIDogc2VsLmxlbmd0aCxcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNhbml0aXplVmFsdWVzKHZhbHVlczogc3RyaW5nW10pOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHZhbHVlcy5maWx0ZXIodmFsdWUgPT4gISF2YWx1ZSkubWFwKHZhbHVlID0+IHtcbiAgICAgIGNvbnN0IGlzUXVvdGVkU3RyaW5nID0gL14oJ3xcIilbXidcIl0rXFwxJC8udGVzdCh2YWx1ZSk7XG4gICAgICBcbiAgICAgIHJldHVybiBpc1F1b3RlZFN0cmluZyA/IHZhbHVlLnNsaWNlKDEsIC0xKSA6IHZhbHVlO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDc3NSdWxlIH0gZnJvbSBcIi4vY3NzLXJ1bGVcIjtcbmltcG9ydCB7IENvbWJpbmF0b3JzLCBDc3NUb2tlblR5cGUgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgQ3NzU2VsZWN0b3JMZXhlciB9IGZyb20gXCIuL2Nzcy1zZWxlY3Rvci1sZXhlclwiO1xuaW1wb3J0IHsgQ3NzQXR0cmlidXRlIH0gZnJvbSBcIi4vY3NzLWF0dHJpYnV0ZVwiO1xuXG5pbnRlcmZhY2UgQ29tYmluZWRSdWxlIHtcbiAgcnVsZTogQ3NzUnVsZTtcbiAgY29tYjogQ29tYmluYXRvcnM7XG59XG5cbnR5cGUgU2VsZWN0b3JMZXZlbCA9IEFycmF5PENvbWJpbmVkUnVsZT47XG5cbmNvbnN0IGlzQW5jZXN0b3IgPSAoY29tYmluZWRSdWxlOiBDb21iaW5lZFJ1bGUpOiBib29sZWFuID0+IHtcbiAgcmV0dXJuIFtDb21iaW5hdG9ycy5ERVNDRU5EQU5ULCBDb21iaW5hdG9ycy5DSElMRF0uaW5kZXhPZihjb21iaW5lZFJ1bGUuY29tYikgIT09IC0xO1xufTtcblxuZXhwb3J0IGNsYXNzIENzc1NlbGVjdG9yIHtcbiAgbGV2ZWxzOiBTZWxlY3RvckxldmVsW10gPSBbW11dO1xuXG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yU3RyOiBzdHJpbmcpIHtcbiAgICB0aGlzLnBhcnNlKHNlbGVjdG9yU3RyKTtcbiAgfVxuXG4gIGFkZFJ1bGUoY29tYlJ1bGU6IENvbWJpbmVkUnVsZSk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnJlbnRMZXZlbCA9IHRoaXMubGV2ZWxzW3RoaXMubGV2ZWxzLmxlbmd0aCAtMV07XG5cbiAgICBpZiAoaXNBbmNlc3Rvcihjb21iUnVsZSkpIHtcbiAgICAgIGN1cnJlbnRMZXZlbC5wdXNoKGNvbWJSdWxlKVxuICAgICAgdGhpcy5sZXZlbHMucHVzaChbXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN1cnJlbnRMZXZlbC5wdXNoKGNvbWJSdWxlKTtcbiAgICB9XG4gIH1cblxuICBzdXBlcnNldE9mKHNlbGVjdG9yOiBDc3NTZWxlY3Rvcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdG9yU3VwZXJzZXQodGhpcy5sZXZlbHMsIHNlbGVjdG9yLmxldmVscyk7XG4gIH1cblxuICBzdWJzZXRPZihzZWxlY3RvcjogQ3NzU2VsZWN0b3IpOiBib29sZWFuIHtcbiAgICByZXR1cm4gc2VsZWN0b3Iuc3VwZXJzZXRPZih0aGlzKTtcbiAgfVxuXG4gIGludGVyc2VjdGlvbihzZWxlY3RvcjogQ3NzU2VsZWN0b3IpOiBDc3NTZWxlY3RvciB8IHZvaWQge1xuICAgIGlmICh0aGlzLnN1cGVyc2V0T2Yoc2VsZWN0b3IpKSB7XG4gICAgICByZXR1cm4gc2VsZWN0b3I7XG4gICAgfVxuXG4gICAgaWYgKHNlbGVjdG9yLnN1cGVyc2V0T2YodGhpcykpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8vIFRPRE86IG90aGVyIHBvc3NpYmxlIGNhc2VzPz9cbiAgICByZXR1cm4gdm9pZCAwO1xuICB9XG5cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICBsZXQgcmVzdWx0ID0gJyc7XG4gICAgdGhpcy5sZXZlbHMuZm9yRWFjaChsZXZlbCA9PiB7XG4gICAgICBsZXZlbC5mb3JFYWNoKGNvbWJpbmVkUnVsZSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbWIgPSBjb21iaW5lZFJ1bGUuY29tYiA/IGAgJHtjb21iaW5lZFJ1bGUuY29tYn0gYCA6ICcgJztcbiAgICAgICAgcmVzdWx0ICs9IGAke2NvbWJpbmVkUnVsZS5ydWxlfSR7Y29tYn1gO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzdWx0LnRyaW0oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaWxscyB0aGUgbGlzdCBvZiBydWxlcyB3aXRoIGl0J3MgY29tYmluYXRvcnNcbiAgICogQHBhcmFtIHNlbGVjdG9yU3RyIHRoZSBzZWxlY3RvciB0byBwYXJzZVxuICAgKi9cbiAgcHJpdmF0ZSBwYXJzZShzZWxlY3RvclN0cjogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgbGV4ZXIgPSBuZXcgQ3NzU2VsZWN0b3JMZXhlcihzZWxlY3RvclN0cik7XG4gICAgbGV0IHJ1bGUgICAgPSBuZXcgQ3NzUnVsZSgpO1xuICAgIGxldCB0b2tlbjtcblxuICAgIHdoaWxlKHRva2VuID0gbGV4ZXIubmV4dFRva2VuKCkpIHtcbiAgICAgIHN3aXRjaCh0b2tlbi50eXBlKSB7XG4gICAgICAgIGNhc2UgQ3NzVG9rZW5UeXBlLkVsZW1lbnQ6XG4gICAgICAgICAgcnVsZS5lbGVtZW50ID0gdG9rZW4udmFsdWVzWzBdO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIENzc1Rva2VuVHlwZS5JZDpcbiAgICAgICAgICBydWxlLmlkID0gdG9rZW4udmFsdWVzWzBdO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIENzc1Rva2VuVHlwZS5DbGFzczpcbiAgICAgICAgICBydWxlLmFkZENsYXNzKHRva2VuLnZhbHVlc1swXSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgQ3NzVG9rZW5UeXBlLkF0dHJpYnV0ZTpcbiAgICAgICAgICBydWxlLmFkZEF0dHJpYnV0ZShuZXcgQ3NzQXR0cmlidXRlKHRva2VuLnZhbHVlcykpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIENzc1Rva2VuVHlwZS5Db21iaW5hdG9yOlxuICAgICAgICBjYXNlIENzc1Rva2VuVHlwZS5TcGFjZTpcbiAgICAgICAgICBjb25zdCBjb21iICAgICA9IHRva2VuLnZhbHVlc1swXSBhcyBDb21iaW5hdG9ycztcbiAgICAgICAgICBjb25zdCBjb21iUnVsZSA9IHsgcnVsZSwgY29tYiB9O1xuICAgICAgICAgIFxuICAgICAgICAgIHJ1bGUgPSBuZXcgQ3NzUnVsZSgpO1xuICAgICAgICAgIHRoaXMuYWRkUnVsZShjb21iUnVsZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBVbmtub3duIHRva2VuICR7dG9rZW4udmFsdWVzWzBdfSBhdCBwb3NpdGlvbiAke3Rva2VuLnBvc2l0aW9ufWApO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBsYXN0IHJ1bGUgc2hvdWxkIGJlIHB1c2hlZCBpbiB0aGUgbGF5ZXJcbiAgICB0aGlzLmFkZFJ1bGUoeyBydWxlLCBjb21iOiBDb21iaW5hdG9ycy5OT05FIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzZWxlY3RvclN1cGVyc2V0KHNlbGVjdG9yT25lOiBTZWxlY3RvckxldmVsW10sIHNlbGVjdG9yVHdvOiAgU2VsZWN0b3JMZXZlbFtdKTogYm9vbGVhbiB7XG4gICAgLy8gQmFzZSBjYXNlOiBjb250YWluZXIgaXMgZW1wdHkgKG1lYW5pbmcgd2UgaGF2ZSBjaGVja2VkIGFsbCBpdHMgcnVsZXMpXG4gICAgLy8gKlxuICAgIC8vIGFcbiAgICBpZiAoc2VsZWN0b3JPbmUubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBCYXNlIGNhc2U6IHNlbGVjdG9yVHdvIGlzIGVtcHR5IChtZWFuaW5nIHdlIGhhdmUgY2hlY2tlZCBhbGwgaXRzIHJ1bGVzKVxuICAgIC8vIGFcbiAgICAvLyAqXG4gICAgaWYgKHNlbGVjdG9yVHdvLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIEJhc2UgY2FzZTogc2VsZWN0b3JPbmUgaXMgbW9yZSBzcGVjaWZpYyB0aGFuIHNlbGVjdG9yVHdvXG4gICAgLy8gYSBiIGNcbiAgICAvLyBhIGJcbiAgICBpZiAoc2VsZWN0b3JPbmUubGVuZ3RoID4gc2VsZWN0b3JUd28ubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgbGF5ZXJPbmUgPSBzZWxlY3Rvck9uZVtzZWxlY3Rvck9uZS5sZW5ndGggLSAxXTtcbiAgICBjb25zdCBsYXllclR3byA9IHNlbGVjdG9yVHdvW3NlbGVjdG9yVHdvLmxlbmd0aCAtIDFdO1xuXG4gICAgLy8gQmFzZSBjYXNlOiBsYXllck9uZSBoYXMgc3Ryb25nZXIgcmVsYXRpb25zaGlwIHdpdGggZGVzY2VuZGFudCB0aGFuIGxheWVyVHdvXG4gICAgLy8gYSA+IGIgPiAoZFxuICAgIC8vIGEgPiBiIChkXG4gICAgY29uc3QgZGVzY2VuZGFudENvbWJPbmUgPSBsYXllck9uZVtsYXllck9uZS5sZW5ndGggLSAxXS5jb21iO1xuICAgIGNvbnN0IGRlc2NlbmRhbnRDb21iVHdvID0gbGF5ZXJUd29bbGF5ZXJUd28ubGVuZ3RoIC0gMV0uY29tYjtcbiAgICBpZiAoZGVzY2VuZGFudENvbWJPbmUgPT09IENvbWJpbmF0b3JzLkNISUxEICYmIGRlc2NlbmRhbnRDb21iVHdvID09PSBDb21iaW5hdG9ycy5ERVNDRU5EQU5UKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gYSA+IGIgPiBjXG4gICAgLy8gYSA+IGIgPiBjID4gZCA+IGVcbiAgICBpZiAodGhpcy5sZXZlbFN1cGVyc2V0KGxheWVyT25lLCBsYXllclR3bykpIHtcbiAgICAgIHJldHVybiB0aGlzLnNlbGVjdG9yU3VwZXJzZXQoc2VsZWN0b3JPbmUuc2xpY2UoMCwgLTEpLCBzZWxlY3RvclR3by5zbGljZSgwLCAtMSkpO1xuICAgIH1cblxuICAgIC8vIElmIHRoZSBkZWVwZXN0IGxheWVyIGlzbid0IGEgc3VwZXJzZXQgdGhlbiBzZWxlY3RvciBjYW4ndCBiZVxuICAgIC8vIGMgPiBlXG4gICAgLy8gYSA+IGMgPiAoZFxuICAgIC8vIElmIENISUxEIGl0IHNob3VsZCBoYWQgbWF0Y2ggYmVmb3JlXG4gICAgLy8gYSA+IGIgPiAoZFxuICAgIC8vIGEgPiBjID4gKGRcbiAgICBpZiAoZGVzY2VuZGFudENvbWJPbmUgPT09IENvbWJpbmF0b3JzLkNISUxEIHx8IGRlc2NlbmRhbnRDb21iT25lID09PSBDb21iaW5hdG9ycy5OT05FKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gRm9yIGdlbmVyaWMgc2libGluZyB3YWxrIHVwIHRoZSBzZWNvbmQgbGlzdCBvZiBydWxlc1xuICAgIHJldHVybiB0aGlzLnNlbGVjdG9yU3VwZXJzZXQoc2VsZWN0b3JPbmUsIHNlbGVjdG9yVHdvLnNsaWNlKDAsIC0xKSk7XG4gIH1cblxuXG4gIHByaXZhdGUgbGV2ZWxTdXBlcnNldChsZXZlbE9uZTogU2VsZWN0b3JMZXZlbCwgbGV2ZWxUd286IFNlbGVjdG9yTGV2ZWwpOiBib29sZWFuIHtcbiAgICAvLyBCYXNlIGNhc2U6IGNvbnRhaW5lciBpcyBlbXB0eSAobWVhbmluZyB3ZSBoYXZlIGNoZWNrZWQgYWxsIGl0cyBydWxlcylcbiAgICBpZiAobGV2ZWxPbmUubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBCYXNlIGNhc2U6IGxldmVsVHdvIGlzIGVtcHR5IChtZWFuaW5nIHdlIGhhdmUgY2hlY2tlZCBhbGwgaXRzIGxheWVyKVxuICAgIGlmIChsZXZlbFR3by5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBCYXNlIGNhc2U6IGxldmVsT25lIGlzIG1vcmUgc3BlY2lmaWMgdGhhbiBsZXZlbFR3b1xuICAgIGlmIChsZXZlbE9uZS5sZW5ndGggPiBsZXZlbFR3by5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBjb21iaW5lZFJ1bGVPbmUgPSBsZXZlbE9uZVtsZXZlbE9uZS5sZW5ndGggLSAxXTtcbiAgICBjb25zdCBjb21iaW5lZFJ1bGVUd28gPSBsZXZlbFR3b1tsZXZlbFR3by5sZW5ndGggLSAxXTtcblxuICAgIC8vIEJhc2UgY2FzZTogY29tYmluZWRSdWxlT25lIGhhcyBzdHJvbmdlciByZWxhdGlvbnNoaXAgd2l0aCBzaWJsaW5nIHRoYW4gY29tYmluZWRSdWxlVHdvXG4gICAgLy8gYSArIGIgKyAoZFxuICAgIC8vIGEgKyBiIH4gKGRcbiAgICBjb25zdCBzaWJsaW5nQ29tYk9uZSA9IGNvbWJpbmVkUnVsZU9uZS5jb21iO1xuICAgIGNvbnN0IHNpYmxpbmdDb21iVHdvID0gY29tYmluZWRSdWxlVHdvLmNvbWI7XG4gICAgaWYgKHNpYmxpbmdDb21iT25lID09PSBDb21iaW5hdG9ycy5BREpBQ0VOVCAmJiBzaWJsaW5nQ29tYlR3byA9PT0gQ29tYmluYXRvcnMuU0lCTElORykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIGEgKyBiIH4gZFxuICAgIC8vIGEgKyBiICsgYyArIGRcbiAgICBpZiAoY29tYmluZWRSdWxlT25lLnJ1bGUuc3VwZXJzZXRPZihjb21iaW5lZFJ1bGVUd28ucnVsZSkpIHtcbiAgICAgIHJldHVybiB0aGlzLmxldmVsU3VwZXJzZXQobGV2ZWxPbmUuc2xpY2UoMCwgLTEpLCBsZXZlbFR3by5zbGljZSgwLCAtMSkpO1xuICAgIH1cblxuICAgIC8vIElmIEFESkFDRU5UIGl0IHNob3VsZCBoYWQgbWF0Y2ggYmVmb3JlXG4gICAgaWYgKGNvbWJpbmVkUnVsZU9uZS5jb21iID09PSBDb21iaW5hdG9ycy5BREpBQ0VOVCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIEZvciBnZW5lcmljIHNpYmxpbmcgd2FsayB1cCB0aGUgc2Vjb25kIGxpc3RcbiAgICByZXR1cm4gdGhpcy5sZXZlbFN1cGVyc2V0KGxldmVsT25lLCBsZXZlbFR3by5zbGljZSgwLCAtMSkpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDc3NTZWxlY3RvciB9wqBmcm9tICcuL2Nzcy1zZWxlY3Rvcic7XG5cbmV4cG9ydCBjbGFzcyBDc3NldCB7XG4gIHNlbGVjdG9yczogQ3NzU2VsZWN0b3JbXTtcblxuICAvKipcbiAgICogUGFyc2VzIHRoZSBnaXZlbiBzZWxlY3RvciBmaWxpbmcgdXAgaXRzIHByaXZhdGUgcHJvcGVydGllcyB3aXRoIG1ldGFkYXRhXG4gICAqIEBwYXJhbSBzZWxlY3RvciB0aGUgc2VsZWN0b3Igc3RyaW5nXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoc2VsZWN0b3I6IHN0cmluZykge1xuICAgIC8vIFRPRE86IHRoaXMgaXMgZXJyb3IgcHJvbmUgc2luY2UgYXR0ciB2YWx1ZXMgbWF5IGNvbnRhaW4gdGhpcyBjaGFyXG4gICAgdGhpcy5zZWxlY3RvcnMgPSBzZWxlY3Rvci5zcGxpdCgnLCcpLm1hcCgoc2VsKSA9PiBuZXcgQ3NzU2VsZWN0b3Ioc2VsKSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoaXMgc2V0IGNvbnRhaW5zIHRoZSBvbmUgcGFzc2VkIGFzIHBhcmFtZXRlclxuICAgKiBAcGFyYW0gc2V0IHRoZSBzZXQgdG8gY2hlY2sgd2l0aFxuICAgKi9cbiAgc3VwZXJzZXRPZihzZXQ6IENzc2V0KTogYm9vbGVhbiB7XG4gICAgbGV0IGluZGV4ID0gc2V0LnNlbGVjdG9ycy5sZW5ndGg7XG5cbiAgICB3aGlsZShpbmRleC0tKSB7XG4gICAgICBjb25zdCBjb250YWluZXJJbmRleCA9IHRoaXMuc2VsZWN0b3JzLmZpbmRJbmRleChzID0+IHMuc3VwZXJzZXRPZihzZXQuc2VsZWN0b3JzW2luZGV4XSkpO1xuXG4gICAgICBpZiAoY29udGFpbmVySW5kZXggPT09IC0xKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoaXMgc2V0IGlzIGNvbnRhaW5lZCB0aGUgb25lIHBhc3NlZCBhcyBwYXJhbWV0ZXJcbiAgICogQHBhcmFtIHNldCB0aGUgc2V0IHRvIGNoZWNrIHdpdGhcbiAgICovXG4gIHN1YnNldE9mKHNldDogQ3NzZXQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gc2V0LnN1cGVyc2V0T2YodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIG5ldyBDU1Mgc2V0IHdoaWNoIGlzIHRoZSB1bmlvbiBvZiB0aGlzIG9uZSBhbmQgdGhlIHBhc3NlZCBhcyBwYXJhbWV0ZXJcbiAgICogQHBhcmFtIHNldCB0aGUgb3RoZXIgQ1NTIHNldCB0byBiZSB1bml0ZWQgd2l0aFxuICAgKi9cbiAgdW5pb24oc2V0OiBDc3NldCk6IENzc2V0IHtcbiAgICBpZiAodGhpcy5zdXBlcnNldE9mKHNldCkpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnN1YnNldE9mKHNldCkpIHtcbiAgICAgIHJldHVybiBzZXQ7XG4gICAgfVxuXG4gICAgLy8gTWFrZSB1bmlvbiBvZiBzZWxlY3RvcnMgaWYgcG9zc2libGVcbiAgICBjb25zdCBlcXVhbFNlbCAgPSB0aGlzLnNlbGVjdG9ycy5maWx0ZXIodGhpc1NlbCA9PiBzZXQuc2VsZWN0b3JzLnNvbWUob3RoZXJTZWwgPT4gYCR7dGhpc1NlbH1gID09PSBgJHtvdGhlclNlbH1gKSk7XG4gICAgY29uc3QgdW5pcXVlT25lID0gdGhpcy5zZWxlY3RvcnMuZmlsdGVyKHRoaXNTZWwgPT4gIXNldC5zZWxlY3RvcnMuc29tZShvdGhlclNlbCA9PiB0aGlzU2VsLnN1YnNldE9mKG90aGVyU2VsKSkpO1xuICAgIGNvbnN0IHVuaXF1ZVR3byA9IHNldC5zZWxlY3RvcnMuZmlsdGVyKG90aGVyU2VsID0+ICF0aGlzLnNlbGVjdG9ycy5zb21lKHRoaXNTZWwgPT4gb3RoZXJTZWwuc3Vic2V0T2YodGhpc1NlbCkpKTtcbiAgICBjb25zdCBhbGxTZWxlY3RvcnMgPSBlcXVhbFNlbC5jb25jYXQodW5pcXVlT25lLCB1bmlxdWVUd28pO1xuXG4gICAgcmV0dXJuIG5ldyBDc3NldChgJHthbGxTZWxlY3RvcnMubWFwKHMgPT4gcy50b1N0cmluZygpKS5qb2luKCcsJyl9YCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIG5ldyBDU1Mgc2V0IHdoaWNoIGlzIHRoZSBpbnRlcnNlY3Rpb24gb2YgdGhpcyBvbmUgYW5kIHRoZSBwYXNzZWQgYXMgcGFyYW1ldGVyXG4gICAqIG9yIHZvaWQgaWYgdGhlIGludGVyc2VjdGlvbiBpcyBhbiBlbXB0eSBzZXRcbiAgICogQHBhcmFtIHNldCB0aGUgb3RoZXIgQ1NTIHNldCB0byBiZSB1bml0ZWQgd2l0aFxuICAgKi9cbiAgaW50ZXJzZWN0aW9uKHNldDogQ3NzZXQpOiBDc3NldCB8IHZvaWQge1xuICAgIGlmICh0aGlzLnN1cGVyc2V0T2Yoc2V0KSkge1xuICAgICAgcmV0dXJuIHNldDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zdWJzZXRPZihzZXQpKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvLyBNYWtlIGludGVyc2VjdGlvbiBvZiBzZWxlY3RvcnMgaWYgcG9zc2libGVcbiAgICAvLyAxc3QgYXR0ZW1wdCBicnV0ZSBmb3JjZSAoaW50ZXJzZWN0aW5nIGV2ZXJ5IHNldCB3aXRoIG90aGVycylcbiAgICBjb25zdCBpbnRlcnNlY3Rpb25zID0gdGhpcy5zZWxlY3RvcnNcbiAgICAgIC5tYXAodGhpc1NlbCA9PiBzZXQuc2VsZWN0b3JzLm1hcChvdGhlclNlbCA9PiB0aGlzU2VsLmludGVyc2VjdGlvbihvdGhlclNlbCkpKVxuICAgICAgLnJlZHVjZSgoZmxhdCwgdmFsKSA9PiBmbGF0LmNvbmNhdCh2YWwpLCBbXSlcbiAgICAgIC5maWx0ZXIoKHZhbCkgPT4gISF2YWwpXG4gICAgICAubWFwKCh2YWwpID0+IGAke3ZhbH1gKTtcblxuICAgIGlmIChpbnRlcnNlY3Rpb25zLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIG5ldyBDc3NldChgJHtpbnRlcnNlY3Rpb25zLmpvaW4oJywnKX1gKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdm9pZCAwO1xuICB9XG5cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RvcnMubWFwKHMgPT4gYCR7c31gKS5qb2luKCcsJyk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENzc01hdGNoZXJTeW1ib2wgfSBmcm9tIFwiLi4vdHlwZXNcIjtcbmltcG9ydCB7IENzc0F0dHJpYnV0ZU1hdGNoZXIgfSBmcm9tIFwiLi4vY3NzLWF0dHJpYnV0ZS1tYXRjaGVyXCI7XG5cbmNvbnN0IHN1cGVyc2V0U3ltYm9scyA9IFtcbiAgQ3NzTWF0Y2hlclN5bWJvbC5QcmVmaXgsXG4gIENzc01hdGNoZXJTeW1ib2wuU3VmZml4LFxuICBDc3NNYXRjaGVyU3ltYm9sLlN1YkNvZGUsXG4gIENzc01hdGNoZXJTeW1ib2wuT2NjdXJyZW5jZSxcbiAgQ3NzTWF0Y2hlclN5bWJvbC5Db250YWlucyxcbiAgQ3NzTWF0Y2hlclN5bWJvbC5FcXVhbCxcbl07XG5cbmV4cG9ydCBjbGFzcyBDc3NDb250YWluc01hdGNoZXIgZXh0ZW5kcyBDc3NBdHRyaWJ1dGVNYXRjaGVyIHtcbiAgcmVhZG9ubHkgc3ltYm9sOiBDc3NNYXRjaGVyU3ltYm9sID0gQ3NzTWF0Y2hlclN5bWJvbC5Db250YWlucztcblxuICBzdXBlcnNldE9mICggbWF0Y2hlcjogQ3NzQXR0cmlidXRlTWF0Y2hlciApOiBib29sZWFuIHtcbiAgICBpZiAoc3VwZXJzZXRTeW1ib2xzLmluZGV4T2YobWF0Y2hlci5zeW1ib2wpICE9PSAtMSkge1xuICAgICAgcmV0dXJuIG1hdGNoZXIudmFsdWUuaW5kZXhPZih0aGlzLnZhbHVlKSAhPT0gLTE7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDc3NBdHRyaWJ1dGVNYXRjaGVyIH0gZnJvbSBcIi4uL2Nzcy1hdHRyaWJ1dGUtbWF0Y2hlclwiO1xuaW1wb3J0IHsgQ3NzTWF0Y2hlclN5bWJvbCB9IGZyb20gXCIuLi90eXBlc1wiO1xuaW1wb3J0IHsgQ3NzUHJlc2VuY2VNYXRjaGVyIH0gZnJvbSBcIi4vcHJlc2VuY2UtbWF0Y2hlclwiO1xuaW1wb3J0IHsgQ3NzUHJlZml4TWF0Y2hlciB9IGZyb20gXCIuL3ByZWZpeC1tYXRjaGVyXCI7XG5pbXBvcnQgeyBDc3NTdWZmaXhNYXRjaGVyIH0gZnJvbSBcIi4vc3VmZml4LW1hdGNoZXJcIjtcbmltcG9ydCB7IENzc0VxdWFsTWF0Y2hlciB9IGZyb20gXCIuL2VxdWFsLW1hdGNoZXJcIjtcbmltcG9ydCB7IENzc0NvbnRhaW5zTWF0Y2hlciB9IGZyb20gXCIuL2NvbnRhaW5zLW1hdGNoZXJcIjtcbmltcG9ydCB7IENzc09jY3VycmVuY2VNYXRjaGVyIH0gZnJvbSBcIi4vb2NjdXJyZW5jZS1tYXRjaGVyXCI7XG5pbXBvcnQgeyBDc3NTdWJDb2RlTWF0Y2hlciB9IGZyb20gXCIuL3N1YmNvZGUtbWF0Y2hlclwiO1xuXG5pbnRlcmZhY2UgQ3NzTWF0Y2hlckNvbnN0cnVjdG9yIHtcbiAgbmV3ICh2YWx1ZTogc3RyaW5nKTogQ3NzQXR0cmlidXRlTWF0Y2hlclxufVxuXG5jb25zdCBjbGF6emV6OiB7IFtzeW1ib2w6IHN0cmluZ106IENzc01hdGNoZXJDb25zdHJ1Y3RvciB9ICA9IHtcbiAgW0Nzc01hdGNoZXJTeW1ib2wuUHJlc2VuY2VdICA6IENzc1ByZXNlbmNlTWF0Y2hlcixcbiAgW0Nzc01hdGNoZXJTeW1ib2wuUHJlZml4XSAgICA6IENzc1ByZWZpeE1hdGNoZXIsXG4gIFtDc3NNYXRjaGVyU3ltYm9sLlN1ZmZpeF0gICAgOiBDc3NTdWZmaXhNYXRjaGVyLFxuICBbQ3NzTWF0Y2hlclN5bWJvbC5FcXVhbF0gICAgIDogQ3NzRXF1YWxNYXRjaGVyLFxuICBbQ3NzTWF0Y2hlclN5bWJvbC5Db250YWluc10gIDogQ3NzQ29udGFpbnNNYXRjaGVyLFxuICBbQ3NzTWF0Y2hlclN5bWJvbC5PY2N1cnJlbmNlXTogQ3NzT2NjdXJyZW5jZU1hdGNoZXIsXG4gIFtDc3NNYXRjaGVyU3ltYm9sLlN1YkNvZGVdICAgOiBDc3NTdWJDb2RlTWF0Y2hlcixcbn1cblxuY29uc3QgVkFMVUVfUkVHRVhQUyA9IHtcbiAgdmFsaWQgOiAvXignfFwiKVteJ1wiXStcXDEkfF5bXidcIl0rJC8sXG4gIHF1b3RlczogL15bXCInXXxbXCInXSQvZyxcbn07XG5cbmV4cG9ydCBjbGFzcyBDc3NNYXRjaGVyRmFjdG9yeSB7XG4gIHN0YXRpYyBjcmVhdGUgKHNlbGVjdG9yOiBzdHJpbmcgPSAnJyk6IENzc0F0dHJpYnV0ZU1hdGNoZXIge1xuICAgIGNvbnN0IHBhcnRzICA9IHNlbGVjdG9yLnNwbGl0KCc9Jyk7XG4gICAgY29uc3Qgc3ltYm9sID0gcGFydHMubGVuZ3RoID4gMSA/IHBhcnRzWzBdIHx8ICc9JyA6ICcnO1xuICAgIGNvbnN0IHZhbHVlICA9IHBhcnRzLmxlbmd0aCA+IDEgPyBwYXJ0c1sxXSA6ICcnO1xuXG4gICAgaWYgKCAhIXZhbHVlICYmICFWQUxVRV9SRUdFWFBTLnZhbGlkLnRlc3QodmFsdWUpICkge1xuICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBJbnZhbGlkIGF0dHJpYnV0ZSB2YWx1ZSBpbiAke3NlbGVjdG9yfWApO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgY2xhenpleltzeW1ib2xdKHZhbHVlLnJlcGxhY2UoVkFMVUVfUkVHRVhQUy5xdW90ZXMsICcnKSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENzc01hdGNoZXJTeW1ib2wgfSBmcm9tIFwiLi4vdHlwZXNcIjtcbmltcG9ydCB7IENzc0F0dHJpYnV0ZU1hdGNoZXIgfSBmcm9tIFwiLi4vY3NzLWF0dHJpYnV0ZS1tYXRjaGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBDc3NFcXVhbE1hdGNoZXIgZXh0ZW5kcyBDc3NBdHRyaWJ1dGVNYXRjaGVyIHtcbiAgcmVhZG9ubHkgc3ltYm9sOiBDc3NNYXRjaGVyU3ltYm9sID0gQ3NzTWF0Y2hlclN5bWJvbC5FcXVhbDtcblxuICBzdXBlcnNldE9mICggbWF0Y2hlcjogQ3NzQXR0cmlidXRlTWF0Y2hlciApOiBib29sZWFuIHtcbiAgICByZXR1cm4gbWF0Y2hlci5zeW1ib2wgPT09IENzc01hdGNoZXJTeW1ib2wuRXF1YWwgJiYgdGhpcy52YWx1ZSA9PT0gbWF0Y2hlci52YWx1ZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ3NzTWF0Y2hlclN5bWJvbCB9IGZyb20gXCIuLi90eXBlc1wiO1xuaW1wb3J0IHsgQ3NzQXR0cmlidXRlTWF0Y2hlciB9IGZyb20gXCIuLi9jc3MtYXR0cmlidXRlLW1hdGNoZXJcIjtcblxuY29uc3Qgc3VwZXJzZXRTeW1ib2xzID0gW1xuICBDc3NNYXRjaGVyU3ltYm9sLkVxdWFsLFxuICBDc3NNYXRjaGVyU3ltYm9sLk9jY3VycmVuY2UsXG5dO1xuXG5leHBvcnQgY2xhc3MgQ3NzT2NjdXJyZW5jZU1hdGNoZXIgZXh0ZW5kcyBDc3NBdHRyaWJ1dGVNYXRjaGVyIHtcbiAgcmVhZG9ubHkgc3ltYm9sOiBDc3NNYXRjaGVyU3ltYm9sID0gQ3NzTWF0Y2hlclN5bWJvbC5PY2N1cnJlbmNlO1xuXG4gIHN1cGVyc2V0T2YgKCBtYXRjaGVyOiBDc3NBdHRyaWJ1dGVNYXRjaGVyICk6IGJvb2xlYW4ge1xuICAgIGlmIChzdXBlcnNldFN5bWJvbHMuaW5kZXhPZihtYXRjaGVyLnN5bWJvbCkgIT09IC0xKSB7XG4gICAgICByZXR1cm4gbWF0Y2hlci52YWx1ZSA9PT0gdGhpcy52YWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpbnRlcnNlY3Rpb24gKCBtYXRjaGVyOiBDc3NBdHRyaWJ1dGVNYXRjaGVyICk6IHN0cmluZyB8IG51bGwgfCB2b2lkIHtcbiAgICBpZiAoIHRoaXMudmFsdWUgPT09IG1hdGNoZXIudmFsdWUgKSB7XG4gICAgICBpZiAoIG1hdGNoZXIuc3ltYm9sID09PSBDc3NNYXRjaGVyU3ltYm9sLkVxdWFsICkge1xuICAgICAgICByZXR1cm4gYD1cIiR7dGhpcy52YWx1ZX1cImA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHN1cGVyLmludGVyc2VjdGlvbihtYXRjaGVyKTtcbiAgfVxufSIsImltcG9ydCB7IENzc01hdGNoZXJTeW1ib2wgfSBmcm9tIFwiLi4vdHlwZXNcIjtcbmltcG9ydCB7IENzc0F0dHJpYnV0ZU1hdGNoZXIgfSBmcm9tIFwiLi4vY3NzLWF0dHJpYnV0ZS1tYXRjaGVyXCI7XG5cbmNvbnN0IHN1cGVyc2V0U3ltYm9scyA9IFtcbiAgQ3NzTWF0Y2hlclN5bWJvbC5QcmVmaXgsXG4gIENzc01hdGNoZXJTeW1ib2wuU3ViQ29kZSxcbiAgQ3NzTWF0Y2hlclN5bWJvbC5FcXVhbCxcbl07XG5cbmV4cG9ydCBjbGFzcyBDc3NQcmVmaXhNYXRjaGVyIGV4dGVuZHMgQ3NzQXR0cmlidXRlTWF0Y2hlciB7XG4gIHJlYWRvbmx5IHN5bWJvbDogQ3NzTWF0Y2hlclN5bWJvbCA9IENzc01hdGNoZXJTeW1ib2wuUHJlZml4O1xuXG4gIHN1cGVyc2V0T2YgKCBtYXRjaGVyOiBDc3NBdHRyaWJ1dGVNYXRjaGVyICk6IGJvb2xlYW4ge1xuXG4gICAgaWYgKHN1cGVyc2V0U3ltYm9scy5pbmRleE9mKG1hdGNoZXIuc3ltYm9sKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiBtYXRjaGVyLnZhbHVlLnN0YXJ0c1dpdGgodGhpcy52YWx1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdW5pb24gKCBtYXRjaGVyOiBDc3NBdHRyaWJ1dGVNYXRjaGVyICk6IHN0cmluZyB8IG51bGwge1xuXG4gICAgaWYgKCB0aGlzLnZhbHVlID09PSBtYXRjaGVyLnZhbHVlICYmIG1hdGNoZXIuc3ltYm9sID09PSBDc3NNYXRjaGVyU3ltYm9sLlN1YkNvZGUgKSB7XG4gICAgICByZXR1cm4gYCR7dGhpc31gO1xuICAgIH1cblxuICAgIHJldHVybiBzdXBlci51bmlvbihtYXRjaGVyKTtcbiAgfVxuXG4gIGludGVyc2VjdGlvbiAoIG1hdGNoZXI6IENzc0F0dHJpYnV0ZU1hdGNoZXIgKTogc3RyaW5nIHwgbnVsbCB8IHZvaWQge1xuICAgIGlmICggdGhpcy52YWx1ZSA9PT0gbWF0Y2hlci52YWx1ZSApIHtcbiAgICAgIGlmIChtYXRjaGVyLnN5bWJvbCA9PT0gQ3NzTWF0Y2hlclN5bWJvbC5FcXVhbCApIHtcbiAgICAgICAgcmV0dXJuIGA9XCIke3RoaXMudmFsdWV9XCJgO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICggbWF0Y2hlci52YWx1ZS5zdGFydHNXaXRoKHRoaXMudmFsdWUpICkge1xuICAgICAgaWYgKCBtYXRjaGVyLnN5bWJvbCA9PT0gQ3NzTWF0Y2hlclN5bWJvbC5QcmVmaXggKSB7XG4gICAgICAgIHJldHVybiBgXj1cIiR7bWF0Y2hlci52YWx1ZX1cImA7XG4gICAgICB9XG4gICAgICBpZiAoIG1hdGNoZXIuc3ltYm9sID09PSBDc3NNYXRjaGVyU3ltYm9sLlN1YkNvZGUgKSB7XG4gICAgICAgIHJldHVybiBgfD1cIiR7bWF0Y2hlci52YWx1ZX1cImA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCB0aGlzLnZhbHVlLnN0YXJ0c1dpdGgobWF0Y2hlci52YWx1ZSkgJiYgbWF0Y2hlci5zeW1ib2wgPT09IENzc01hdGNoZXJTeW1ib2wuUHJlZml4ICkge1xuICAgICAgcmV0dXJuIGBePVwiJHt0aGlzLnZhbHVlfVwiYDtcbiAgICB9XG5cbiAgICBpZiAoIG1hdGNoZXIuc3ltYm9sID09PSBDc3NNYXRjaGVyU3ltYm9sLlByZWZpeCAmJiB0aGlzLnZhbHVlICE9PSBtYXRjaGVyLnZhbHVlICkge1xuICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICB9XG5cbiAgICByZXR1cm4gc3VwZXIuaW50ZXJzZWN0aW9uKG1hdGNoZXIpO1xuICB9XG59IiwiaW1wb3J0IHsgQ3NzTWF0Y2hlclN5bWJvbCB9IGZyb20gXCIuLi90eXBlc1wiO1xuaW1wb3J0IHsgQ3NzQXR0cmlidXRlTWF0Y2hlciB9IGZyb20gXCIuLi9jc3MtYXR0cmlidXRlLW1hdGNoZXJcIjtcblxuZXhwb3J0IGNsYXNzIENzc1ByZXNlbmNlTWF0Y2hlciBleHRlbmRzIENzc0F0dHJpYnV0ZU1hdGNoZXIge1xuICByZWFkb25seSBzeW1ib2w6IENzc01hdGNoZXJTeW1ib2wgPSBDc3NNYXRjaGVyU3ltYm9sLlByZXNlbmNlO1xuXG4gIHN1cGVyc2V0T2YgKCBtYXRjaGVyOiBDc3NBdHRyaWJ1dGVNYXRjaGVyICk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59IiwiaW1wb3J0IHsgQ3NzTWF0Y2hlclN5bWJvbCB9IGZyb20gXCIuLi90eXBlc1wiO1xuaW1wb3J0IHsgQ3NzQXR0cmlidXRlTWF0Y2hlciB9IGZyb20gXCIuLi9jc3MtYXR0cmlidXRlLW1hdGNoZXJcIjtcblxuY29uc3Qgc3VwZXJzZXRTeW1ib2xzID0gW1xuICBDc3NNYXRjaGVyU3ltYm9sLlN1YkNvZGUsXG4gIENzc01hdGNoZXJTeW1ib2wuRXF1YWwsXG5dO1xuXG5leHBvcnQgY2xhc3MgQ3NzU3ViQ29kZU1hdGNoZXIgZXh0ZW5kcyBDc3NBdHRyaWJ1dGVNYXRjaGVyIHtcbiAgcmVhZG9ubHkgc3ltYm9sOiBDc3NNYXRjaGVyU3ltYm9sID0gQ3NzTWF0Y2hlclN5bWJvbC5TdWJDb2RlO1xuXG4gIHN1cGVyc2V0T2YgKCBtYXRjaGVyOiBDc3NBdHRyaWJ1dGVNYXRjaGVyICk6IGJvb2xlYW4ge1xuICAgIGlmICggc3VwZXJzZXRTeW1ib2xzLmluZGV4T2YobWF0Y2hlci5zeW1ib2wpICE9PSAtMSApIHtcbiAgICAgIHJldHVybiBtYXRjaGVyLnZhbHVlID09PSB0aGlzLnZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHVuaW9uICggbWF0Y2hlcjogQ3NzQXR0cmlidXRlTWF0Y2hlciApOiBzdHJpbmcgfCBudWxsIHtcbiAgICBpZiAoIG1hdGNoZXIuc3ltYm9sID09PSBDc3NNYXRjaGVyU3ltYm9sLlN1YkNvZGUgKSB7XG4gICAgICBpZiAoIHRoaXMudmFsdWUgPT09IG1hdGNoZXIudmFsdWUgKSB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzfWA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHN1cGVyLnVuaW9uKG1hdGNoZXIpO1xuICB9XG5cbiAgaW50ZXJzZWN0aW9uICggbWF0Y2hlcjogQ3NzQXR0cmlidXRlTWF0Y2hlciApOiBzdHJpbmcgfCBudWxsIHwgdm9pZCB7XG4gICAgaWYgKCB0aGlzLnZhbHVlID09PSBtYXRjaGVyLnZhbHVlICkge1xuICAgICAgaWYgKG1hdGNoZXIuc3ltYm9sID09PSBDc3NNYXRjaGVyU3ltYm9sLlByZWZpeCApIHtcbiAgICAgICAgcmV0dXJuIGB8PVwiJHt0aGlzLnZhbHVlfVwiYDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIHRoaXMudmFsdWUuc3RhcnRzV2l0aChtYXRjaGVyLnZhbHVlKSApIHtcbiAgICAgIGlmIChtYXRjaGVyLnN5bWJvbCA9PT0gQ3NzTWF0Y2hlclN5bWJvbC5QcmVmaXggKSB7XG4gICAgICAgIHJldHVybiBgfD1cIiR7dGhpcy52YWx1ZX1cImA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHN1cGVyLmludGVyc2VjdGlvbihtYXRjaGVyKTtcbiAgfVxufSIsImltcG9ydCB7IENzc01hdGNoZXJTeW1ib2wgfSBmcm9tIFwiLi4vdHlwZXNcIjtcbmltcG9ydCB7IENzc0F0dHJpYnV0ZU1hdGNoZXIgfSBmcm9tIFwiLi4vY3NzLWF0dHJpYnV0ZS1tYXRjaGVyXCI7XG5cbmNvbnN0IHN1cGVyc2V0U3ltYm9scyA9IFtcbiAgQ3NzTWF0Y2hlclN5bWJvbC5TdWZmaXgsXG4gIENzc01hdGNoZXJTeW1ib2wuRXF1YWwsXG5dO1xuXG5leHBvcnQgY2xhc3MgQ3NzU3VmZml4TWF0Y2hlciBleHRlbmRzIENzc0F0dHJpYnV0ZU1hdGNoZXIge1xuICByZWFkb25seSBzeW1ib2w6IENzc01hdGNoZXJTeW1ib2wgPSBDc3NNYXRjaGVyU3ltYm9sLlN1ZmZpeDtcblxuICBzdXBlcnNldE9mICggbWF0Y2hlcjogQ3NzQXR0cmlidXRlTWF0Y2hlciApOiBib29sZWFuIHtcbiAgICBpZiAoc3VwZXJzZXRTeW1ib2xzLmluZGV4T2YobWF0Y2hlci5zeW1ib2wpICE9PSAtMSkge1xuICAgICAgcmV0dXJuIG1hdGNoZXIudmFsdWUuZW5kc1dpdGgodGhpcy52YWx1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaW50ZXJzZWN0aW9uICggbWF0Y2hlcjogQ3NzQXR0cmlidXRlTWF0Y2hlciApOiBzdHJpbmcgfCBudWxsIHwgdm9pZCB7XG4gICAgaWYgKCBtYXRjaGVyLnN5bWJvbCA9PT0gQ3NzTWF0Y2hlclN5bWJvbC5TdWZmaXggKSB7XG4gICAgICBpZiAoIG1hdGNoZXIudmFsdWUuZW5kc1dpdGgodGhpcy52YWx1ZSkgfHwgdGhpcy52YWx1ZS5lbmRzV2l0aChtYXRjaGVyLnZhbHVlKSApIHtcbiAgICAgICAgY29uc3QgbG9uZ2VzdFZhbHVlID0gdGhpcy52YWx1ZS5sZW5ndGggPiBtYXRjaGVyLnZhbHVlLmxlbmd0aCA/IHRoaXMudmFsdWUgOiBtYXRjaGVyLnZhbHVlO1xuXG4gICAgICAgIHJldHVybiBgJD1cIiR7bG9uZ2VzdFZhbHVlfVwiYFxuICAgICAgfVxuICAgICAgXG4gICAgICBpZiAoIHRoaXMudmFsdWUgIT09IG1hdGNoZXIudmFsdWUgKSB7XG4gICAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBzdXBlci5pbnRlcnNlY3Rpb24obWF0Y2hlcik7XG4gIH1cbn0iLCJleHBvcnQgZW51bSBDc3NUb2tlblR5cGUge1xuICBWb2lkLFxuICBJZCxcbiAgRWxlbWVudCxcbiAgQ2xhc3MsXG4gIEF0dHJpYnV0ZSxcbiAgU3BhY2UsXG4gIENvbWJpbmF0b3IsXG4gIFNlcGFyYXRvcixcbiAgVW5rbm93bixcbn1cbmV4cG9ydCBpbnRlcmZhY2UgQ3NzVG9rZW4ge1xuICB0eXBlICAgIDogQ3NzVG9rZW5UeXBlLFxuICB2YWx1ZXMgIDogc3RyaW5nW107XG4gIHBvc2l0aW9uOiBudW1iZXI7XG4gIGxlbmd0aCAgOiBudW1iZXI7XG59XG5cbmV4cG9ydCBlbnVtIENzc01hdGNoZXJTeW1ib2wge1xuICBQcmVzZW5jZSAgID0gJycsXG4gIEVxdWFsICAgICAgPSAnPScsXG4gIFByZWZpeCAgICAgPSAnXicsXG4gIFN1ZmZpeCAgICAgPSAnJCcsXG4gIENvbnRhaW5zICAgPSAnKicsXG4gIFN1YkNvZGUgICAgPSAnfCcsXG4gIE9jY3VycmVuY2UgPSAnficsXG59XG5cbmV4cG9ydCBjb25zdCBlbnVtIENvbWJpbmF0b3JzIHtcbiAgQURKQUNFTlQgICA9ICcrJyxcbiAgU0lCTElORyAgICA9ICd+JyxcbiAgREVTQ0VOREFOVCA9ICcgJyxcbiAgQ0hJTEQgICAgICA9ICc+JyxcbiAgTk9ORSAgICAgICA9ICcnLFxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZVxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vZGVtby9pbmRleC50c1wiKTtcbi8vIFRoaXMgZW50cnkgbW9kdWxlIHVzZWQgJ2V4cG9ydHMnIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbiJdLCJzb3VyY2VSb290IjoiIn0=