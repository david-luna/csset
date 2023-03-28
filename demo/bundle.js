/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/parsel-ts/lib/esm/gobbleParens.js":
/*!********************************************************!*\
  !*** ./node_modules/parsel-ts/lib/esm/gobbleParens.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gobbleParens": () => (/* binding */ gobbleParens)
/* harmony export */ });
function gobbleParens(text, index) {
    let str = '';
    let i = index;
    const stack = [];
    for (; i < text.length; i++) {
        const char = text[i];
        if (char === '(') {
            stack.push(char);
        }
        else if (char === ')') {
            if (stack.length > 0) {
                stack.pop();
            }
            else {
                throw new Error('Closing paren without opening paren at ' + i);
            }
        }
        str += char;
        if (stack.length === 0) {
            return str;
        }
    }
    throw new Error('Opening paren without closing paren');
}
//# sourceMappingURL=gobbleParens.js.map

/***/ }),

/***/ "./node_modules/parsel-ts/lib/esm/index.js":
/*!*************************************************!*\
  !*** ./node_modules/parsel-ts/lib/esm/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parse": () => (/* reexport safe */ _parse__WEBPACK_IMPORTED_MODULE_0__.parse),
/* harmony export */   "specificity": () => (/* reexport safe */ _specificity__WEBPACK_IMPORTED_MODULE_1__.specificity),
/* harmony export */   "specificityToNumber": () => (/* reexport safe */ _specificity__WEBPACK_IMPORTED_MODULE_1__.specificityToNumber),
/* harmony export */   "tokenize": () => (/* reexport safe */ _tokenize__WEBPACK_IMPORTED_MODULE_2__.tokenize),
/* harmony export */   "tokenizeBy": () => (/* reexport safe */ _tokenize__WEBPACK_IMPORTED_MODULE_2__.tokenizeBy),
/* harmony export */   "walk": () => (/* reexport safe */ _walk__WEBPACK_IMPORTED_MODULE_3__.walk)
/* harmony export */ });
/* harmony import */ var _parse__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parse */ "./node_modules/parsel-ts/lib/esm/parse.js");
/* harmony import */ var _specificity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./specificity */ "./node_modules/parsel-ts/lib/esm/specificity.js");
/* harmony import */ var _tokenize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tokenize */ "./node_modules/parsel-ts/lib/esm/tokenize.js");
/* harmony import */ var _walk__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./walk */ "./node_modules/parsel-ts/lib/esm/walk.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./types */ "./node_modules/parsel-ts/lib/esm/types.js");





//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/parsel-ts/lib/esm/nestTokens.js":
/*!******************************************************!*\
  !*** ./node_modules/parsel-ts/lib/esm/nestTokens.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "nestTokens": () => (/* binding */ nestTokens)
/* harmony export */ });
const DEFAULT_NEST_OPTIONS = {
    list: true,
};
function nestTokens(tokens, options = DEFAULT_NEST_OPTIONS) {
    const { list } = options;
    if (list && tokens.find((t) => t.type === 'comma')) {
        const selectors = [];
        const temp = [];
        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i].type === 'comma') {
                if (temp.length === 0) {
                    throw new Error('Incorrect comma at ' + i);
                }
                selectors.push(nestTokens(temp, { list: false }));
                temp.length = 0;
            }
            else {
                temp.push(tokens[i]);
            }
        }
        if (temp.length === 0) {
            throw new Error('Trailing comma');
        }
        else {
            selectors.push(nestTokens(temp, { list: false }));
        }
        return { type: 'list', list: selectors };
    }
    for (let i = tokens.length - 1; i >= 0; i--) {
        const token = tokens[i];
        if (token.type === 'combinator') {
            const left = tokens.slice(0, i);
            const right = tokens.slice(i + 1);
            return {
                type: 'complex',
                combinator: token.content,
                left: nestTokens(left),
                right: nestTokens(right),
            };
        }
    }
    if (tokens.length === 0) {
        return null;
    }
    return tokens.length === 1
        ? tokens[0]
        : {
            type: 'compound',
            list: [...tokens],
        };
}
//# sourceMappingURL=nestTokens.js.map

/***/ }),

/***/ "./node_modules/parsel-ts/lib/esm/parse.js":
/*!*************************************************!*\
  !*** ./node_modules/parsel-ts/lib/esm/parse.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parse": () => (/* binding */ parse)
/* harmony export */ });
/* harmony import */ var _nestTokens__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nestTokens */ "./node_modules/parsel-ts/lib/esm/nestTokens.js");
/* harmony import */ var _tokenize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tokenize */ "./node_modules/parsel-ts/lib/esm/tokenize.js");
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tokens */ "./node_modules/parsel-ts/lib/esm/tokens.js");
/* harmony import */ var _walk__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./walk */ "./node_modules/parsel-ts/lib/esm/walk.js");




const DEFAULT_PARSE_OPTIONS = {
    recursive: true,
    list: true,
};
function parse(selector, options = {}) {
    const { recursive, list } = Object.assign({}, DEFAULT_PARSE_OPTIONS, options);
    const tokens = (0,_tokenize__WEBPACK_IMPORTED_MODULE_1__.tokenize)(selector);
    if (!tokens) {
        return null;
    }
    const ast = (0,_nestTokens__WEBPACK_IMPORTED_MODULE_0__.nestTokens)(tokens, { list });
    if (recursive) {
        (0,_walk__WEBPACK_IMPORTED_MODULE_3__.walk)(ast, (node) => {
            if (node.type === 'pseudo-class' && node.argument) {
                if (_tokens__WEBPACK_IMPORTED_MODULE_2__.RECURSIVE_PSEUDO_CLASSES.has(node.name)) {
                    let argument = node.argument;
                    const childArg = _tokens__WEBPACK_IMPORTED_MODULE_2__.RECURSIVE_PSEUDO_CLASSES_ARGS[node.name];
                    if (childArg) {
                        const match = childArg.exec(argument);
                        if (!match) {
                            return;
                        }
                        Object.assign(node, match.groups);
                        argument = match.groups ? match.groups.subtree : '';
                    }
                    if (argument) {
                        node.subtree = parse(argument, { recursive: true, list: true });
                    }
                }
            }
        });
    }
    return ast;
}
//# sourceMappingURL=parse.js.map

/***/ }),

/***/ "./node_modules/parsel-ts/lib/esm/specificity.js":
/*!*******************************************************!*\
  !*** ./node_modules/parsel-ts/lib/esm/specificity.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "specificity": () => (/* binding */ specificity),
/* harmony export */   "specificityToNumber": () => (/* binding */ specificityToNumber)
/* harmony export */ });
/* harmony import */ var _parse__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parse */ "./node_modules/parsel-ts/lib/esm/parse.js");
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tokens */ "./node_modules/parsel-ts/lib/esm/tokens.js");
/* harmony import */ var _walk__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./walk */ "./node_modules/parsel-ts/lib/esm/walk.js");



function maxIndexOf(arr) {
    let max = arr[0];
    let ret = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
            ret = i;
            max = arr[i];
        }
    }
    return arr.length === 0 ? -1 : ret;
}
function specificityToNumber(specificityArr, base) {
    const b = base || Math.max(...specificityArr) + 1;
    return specificityArr[0] * Math.pow(b, 2) + specificityArr[1] * b + specificityArr[2];
}
function specificity(selector, { format = 'array' } = {}) {
    const ast = typeof selector === 'object' ? selector : (0,_parse__WEBPACK_IMPORTED_MODULE_0__.parse)(selector, { recursive: true });
    if (!ast) {
        return null;
    }
    if (ast.type === 'list') {
        let base = 10;
        const specificities = ast.list.map((s) => {
            const sp = specificity(s) || [];
            base = Math.max(base, ...sp);
            return sp;
        });
        const numbers = specificities.map((s) => specificityToNumber(s, base));
        const i = maxIndexOf(numbers);
        return specificities[i];
    }
    const ret = [0, 0, 0];
    (0,_walk__WEBPACK_IMPORTED_MODULE_2__.walk)(ast, (node) => {
        if (node.type === 'id') {
            ret[0]++;
        }
        else if (node.type === 'class' || node.type === 'attribute') {
            ret[1]++;
        }
        else if ((node.type === 'type' && node.content !== '*') || node.type === 'pseudo-element') {
            ret[2]++;
        }
        else if (node.type === 'pseudo-class' && node.name !== 'where') {
            if (_tokens__WEBPACK_IMPORTED_MODULE_1__.RECURSIVE_PSEUDO_CLASSES.has(node.name) && node.subtree) {
                const sub = specificity(node.subtree) || [];
                sub.forEach((s, i) => (ret[i] += s));
            }
            else {
                ret[1]++;
            }
        }
    });
    return ret;
}
//# sourceMappingURL=specificity.js.map

/***/ }),

/***/ "./node_modules/parsel-ts/lib/esm/tokenize.js":
/*!****************************************************!*\
  !*** ./node_modules/parsel-ts/lib/esm/tokenize.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "tokenize": () => (/* binding */ tokenize),
/* harmony export */   "tokenizeBy": () => (/* binding */ tokenizeBy)
/* harmony export */ });
/* harmony import */ var _gobbleParens__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gobbleParens */ "./node_modules/parsel-ts/lib/esm/gobbleParens.js");
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tokens */ "./node_modules/parsel-ts/lib/esm/tokens.js");


function isTokenType(input) {
    return typeof input == 'object';
}
function restoreNested(tokens, strings, regex, types) {
    for (const str of strings) {
        for (const token of tokens) {
            if (isTokenType(token) && types.has(token.type) && token.pos[0] < str.start && str.start < token.pos[1]) {
                const { content } = token;
                token.content = token.content.replace(regex, str.str);
                if (token.content !== content) {
                    const groupsRegexp = _tokens__WEBPACK_IMPORTED_MODULE_1__.TOKENS_FOR_RESTORE[token.type];
                    groupsRegexp.lastIndex = 0;
                    const match = groupsRegexp.exec(token.content);
                    const groups = match && match.groups;
                    Object.assign(token, groups);
                }
            }
        }
    }
}
function tokenizeBy(text, grammar) {
    if (!text) {
        return [];
    }
    const strarr = [text];
    for (const token in grammar) {
        const pattern = grammar[token];
        for (let i = 0; i < strarr.length; i++) {
            const str = strarr[i];
            if (typeof str === 'string') {
                pattern.lastIndex = 0;
                const match = pattern.exec(str);
                if (match) {
                    const from = match.index - 1;
                    const args = [];
                    const content = match[0];
                    const before = str.slice(0, from + 1);
                    if (before) {
                        args.push(before);
                    }
                    args.push(Object.assign({ type: token, content }, match.groups));
                    const after = str.slice(from + content.length + 1);
                    if (after) {
                        args.push(after);
                    }
                    strarr.splice(i, 1, ...args);
                }
            }
        }
    }
    let offset = 0;
    for (let i = 0; i < strarr.length; i++) {
        const token = strarr[i];
        const length = isTokenType(token) ? token.content.length : token.length;
        if (isTokenType(token)) {
            token.pos = [offset, offset + length];
            if (_tokens__WEBPACK_IMPORTED_MODULE_1__.TRIM_TOKENS.has(token.type)) {
                token.content = token.content.trim() || ' ';
            }
        }
        offset += length;
    }
    return strarr;
}
function tokenize(input) {
    if (!input) {
        return null;
    }
    let selector = input.trim();
    const strings = [];
    selector = selector.replace(/(?:"((?:[^"\\]|\\.)*)")|(?:'((?:[^'\\]|\\.)*)')/g, (str, contentDouble, contentSingle, start) => {
        strings.push({ str, start });
        const content = contentDouble === void 0 ? contentSingle : contentDouble;
        const quote = (contentDouble === void 0) ? '\'' : '"';
        return quote + '§'.repeat(content.length) + quote;
    });
    const parens = [];
    let offset = 0;
    let start;
    while ((start = selector.indexOf('(', offset)) > -1) {
        const str = (0,_gobbleParens__WEBPACK_IMPORTED_MODULE_0__.gobbleParens)(selector, start);
        parens.push({ str, start });
        selector =
            selector.substring(0, start) + '(' + '¶'.repeat(str.length - 2) + ')' + selector.substring(start + str.length);
        offset = start + str.length;
    }
    const tokens = tokenizeBy(selector, _tokens__WEBPACK_IMPORTED_MODULE_1__.TOKENS);
    restoreNested(tokens, parens, /\(¶+\)/, _tokens__WEBPACK_IMPORTED_MODULE_1__.TOKENS_WITH_PARENS);
    restoreNested(tokens, strings, /(['"])§+?\1/, _tokens__WEBPACK_IMPORTED_MODULE_1__.TOKENS_WITH_STRINGS);
    return tokens;
}
//# sourceMappingURL=tokenize.js.map

/***/ }),

/***/ "./node_modules/parsel-ts/lib/esm/tokens.js":
/*!**************************************************!*\
  !*** ./node_modules/parsel-ts/lib/esm/tokens.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RECURSIVE_PSEUDO_CLASSES": () => (/* binding */ RECURSIVE_PSEUDO_CLASSES),
/* harmony export */   "RECURSIVE_PSEUDO_CLASSES_ARGS": () => (/* binding */ RECURSIVE_PSEUDO_CLASSES_ARGS),
/* harmony export */   "TOKENS": () => (/* binding */ TOKENS),
/* harmony export */   "TOKENS_FOR_RESTORE": () => (/* binding */ TOKENS_FOR_RESTORE),
/* harmony export */   "TOKENS_WITH_PARENS": () => (/* binding */ TOKENS_WITH_PARENS),
/* harmony export */   "TOKENS_WITH_STRINGS": () => (/* binding */ TOKENS_WITH_STRINGS),
/* harmony export */   "TRIM_TOKENS": () => (/* binding */ TRIM_TOKENS)
/* harmony export */ });
const TOKENS = {
    attribute: /\[\s*(?:(?<namespace>\*|[-\w]*)\|)?(?<name>[-\w\u{0080}-\u{FFFF}]+)\s*(?:(?<operator>\W?=)\s*(?<value>.+?)\s*(\s(?<caseSensitive>[iIsS]))?\s*)?\]/gu,
    id: /#(?<name>(?:[-\w\u{0080}-\u{FFFF}]|\\.)+)/gu,
    class: /\.(?<name>(?:[-\w\u{0080}-\u{FFFF}]|\\.)+)/gu,
    comma: /\s*,\s*/g,
    combinator: /\s*[\s>+~]\s*/g,
    'pseudo-element': /::(?<name>[-\w\u{0080}-\u{FFFF}]+)(?:\((?<argument>¶+)\))?/gu,
    'pseudo-class': /:(?<name>[-\w\u{0080}-\u{FFFF}]+)(?:\((?<argument>¶+)\))?/gu,
    universal: /(?:(?<namespace>\*|[-\w]*)\|)?\*/gu,
    type: /(?:(?<namespace>\*|[-\w]*)\|)?(?<name>[-\w\u{0080}-\u{FFFF}]+)|\*/gu,
};
const TOKENS_WITH_PARENS = new Set(['pseudo-class', 'pseudo-element']);
const TOKENS_WITH_STRINGS = new Set([...TOKENS_WITH_PARENS, 'attribute']);
const TRIM_TOKENS = new Set(['combinator', 'comma']);
const RECURSIVE_PSEUDO_CLASSES = new Set([
    'not',
    'is',
    'where',
    'has',
    'matches',
    '-moz-any',
    '-webkit-any',
    'nth-child',
    'nth-last-child',
]);
const childRegexp = /(?<index>[\dn+-]+)\s+of\s+(?<subtree>.+)/;
const RECURSIVE_PSEUDO_CLASSES_ARGS = {
    'nth-child': childRegexp,
    'nth-last-child': childRegexp,
};
const TOKENS_FOR_RESTORE = Object.assign({}, TOKENS);
for (const pseudoType of ['pseudo-element', 'pseudo-class']) {
    const key = pseudoType;
    TOKENS_FOR_RESTORE[key] = RegExp(TOKENS[key].source.replace('(?<argument>¶+)', '(?<argument>.+)'), 'gu');
}
//# sourceMappingURL=tokens.js.map

/***/ }),

/***/ "./node_modules/parsel-ts/lib/esm/types.js":
/*!*************************************************!*\
  !*** ./node_modules/parsel-ts/lib/esm/types.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);

//# sourceMappingURL=types.js.map

/***/ }),

/***/ "./node_modules/parsel-ts/lib/esm/walk.js":
/*!************************************************!*\
  !*** ./node_modules/parsel-ts/lib/esm/walk.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "walk": () => (/* binding */ walk)
/* harmony export */ });
function walk(node, callback, o, parent) {
    if (!node) {
        return;
    }
    if (node.type === 'complex') {
        walk(node.left, callback, o, node);
        walk(node.right, callback, o, node);
    }
    else if (node.type === 'compound' || node.type === 'list') {
        for (const n of node.list) {
            walk(n, callback, o, node);
        }
    }
    else if (node.type === 'pseudo-class' && node.subtree && o && o.subtree) {
        walk(node.subtree, callback, o, node);
    }
    callback(node, parent);
}
//# sourceMappingURL=walk.js.map

/***/ }),

/***/ "./demo/playground.ts":
/*!****************************!*\
  !*** ./demo/playground.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setPlayground = void 0;
function markQuadrant(td, row, col, size) {
    const middle = Math.floor(size / 2);
    let quadrant = '';
    if (row < middle) {
        quadrant = col < middle ? 'one' : col > middle ? 'two' : '';
    }
    else if (row > middle) {
        quadrant = col < middle ? 'three' : col > middle ? 'four' : '';
    }
    if (quadrant) {
        td.classList.add(`quadrant-${quadrant}`);
    }
}
function markRhombus(td, row, col, size) {
    const diff = row < size / 2 ? row : size - row - 1;
    const high = size / 2 + diff;
    const low = size / 2 - diff - 1;
    if (low <= col && col <= high) {
        td.classList.add('diamond');
    }
}
function markCircle(td, row, col, size) {
    const radius = Math.floor(size / 2);
    const center = { x: radius, y: radius };
    const distance = Math.sqrt(Math.pow(Math.abs(center.x - col), 2) + Math.pow(Math.abs(center.y - row), 2));
    if (distance <= radius) {
        td.classList.add('circle');
    }
}
function setPlayground(table, size) {
    for (let row = 0; row < size; row++) {
        const tr = document.createElement('tr');
        for (let col = 0; col < size; col++) {
            const td = document.createElement('td');
            const sum = row * size + col;
            td.setAttribute('class', 'tile');
            td.setAttribute('d-row', `${row}`);
            td.setAttribute('d-col', `${col}`);
            td.setAttribute('d-sum', `${sum}`);
            td.setAttribute('d-odd', `${sum % 2 === 0}`);
            td.setAttribute('d-even', `${sum % 2 === 1}`);
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
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.STEPS = void 0;
const steps_begin_1 = __webpack_require__(/*! ./steps-begin */ "./demo/steps/steps-begin.ts");
const steps_union_1 = __webpack_require__(/*! ./steps-union */ "./demo/steps/steps-union.ts");
const steps_intersection_1 = __webpack_require__(/*! ./steps-intersection */ "./demo/steps/steps-intersection.ts");
__exportStar(__webpack_require__(/*! ./runner */ "./demo/steps/runner.ts"), exports);
exports.STEPS = [
    ...steps_begin_1.STEPS_BEGIN,
    ...steps_union_1.STEPS_UNION,
    ...steps_intersection_1.STEPS_INTERSECTION,
];


/***/ }),

/***/ "./demo/steps/runner.ts":
/*!******************************!*\
  !*** ./demo/steps/runner.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.runStep = void 0;
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function isCsset(source) {
    var _a, _b;
    return ((_b = (_a = source === null || source === void 0 ? void 0 : source.__proto__) === null || _a === void 0 ? void 0 : _a.constructor) === null || _b === void 0 ? void 0 : _b.name) === 'Csset';
}
function runStep(step, commentElem, codeElem, styeElem) {
    commentElem.innerText = step.comment;
    const source = step.code.toString();
    const linesOfCode = source
        .split('\n')
        .slice(1, -1)
        .map((line) => {
        return line.replace(/return /g, '');
    });
    codeElem.innerText = linesOfCode.join('\n');
    console.log('evalSource', source);
    const evalResult = eval(`(${source})()`);
    console.log('evalResult', evalResult.toString());
    const styleText = `${evalResult}{ background-color: ${getRandomColor()}; }`;
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
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.STEPS_BEGIN = void 0;
exports.STEPS_BEGIN = [
    {
        comment: 'These are the cells with class quadrant-one',
        code: () => {
            return new Csset('.quadrant-one');
        }
    },
    {
        comment: 'These are the cells with class quadrant-two',
        code: () => {
            return new Csset('.quadrant-two');
        }
    },
    {
        comment: 'These are the cells with class quadrant-three',
        code: () => {
            return new Csset('.quadrant-three');
        }
    },
    {
        comment: 'These are the cells with class quadrant-four',
        code: () => {
            return new Csset('.quadrant-four');
        }
    },
    {
        comment: 'These are the cells with class circle',
        code: () => {
            return new Csset('.circle');
        }
    },
    {
        comment: 'These are the cells with class diamond',
        code: () => {
            return new Csset('.diamond');
        }
    },
    {
        comment: 'Cells also contain a d-row attribute with the row number they have',
        code: () => {
            return new Csset('[d-row=5]');
        }
    },
    {
        comment: 'And contain a d-col attribute with the column number they have',
        code: () => {
            return new Csset('[d-col=50]');
        }
    },
    {
        comment: 'Each cell of the grid has its number in a d-sum attribute',
        code: () => {
            return new Csset('[d-sum=50]');
        }
    },
    {
        comment: 'Add the cell has marked if its odd number',
        code: () => {
            return new Csset('[d-odd=true]');
        }
    },
    {
        comment: 'Or even number',
        code: () => {
            return new Csset('[d-even=true]');
        }
    },
];


/***/ }),

/***/ "./demo/steps/steps-intersection.ts":
/*!******************************************!*\
  !*** ./demo/steps/steps-intersection.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.STEPS_INTERSECTION = void 0;
exports.STEPS_INTERSECTION = [
    {
        comment: 'Intersection returns a set which all elements are from both sets',
        code: () => {
            const quadrantOne = new Csset('.quadrant-one');
            const rhombus = new Csset('.rhombus');
            return quadrantOne.intersection(rhombus);
        },
    },
];


/***/ }),

/***/ "./demo/steps/steps-union.ts":
/*!***********************************!*\
  !*** ./demo/steps/steps-union.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.STEPS_UNION = void 0;
exports.STEPS_UNION = [
    {
        comment: 'Union is a straight forward method used to join sets',
        code: () => {
            const quadrantOne = new Csset('.quadrant-one');
            const quadrantTwo = new Csset('.quadrant-two');
            return quadrantOne.union(quadrantTwo);
        },
    },
    {
        comment: 'You can do an union of many sets',
        code: () => {
            const quadrantOne = new Csset('.quadrant-one');
            const quadrantTwo = new Csset('.quadrant-two');
            const circle = new Csset('.circle');
            return quadrantOne.union(quadrantTwo).union(circle);
        },
    },
];


/***/ }),

/***/ "./src/css-attribute-matcher.ts":
/*!**************************************!*\
  !*** ./src/css-attribute-matcher.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CssAttributeMatcher = void 0;
const types_1 = __webpack_require__(/*! ./types */ "./src/types.ts");
class CssAttributeMatcher {
    constructor(val) {
        this.value = val;
    }
    supersetOf(matcher) {
        throw Error(`no supersetOf method implemented for matcher symbol ${this.symbol}`);
    }
    subsetOf(matcher) {
        return matcher.supersetOf(this);
    }
    union(matcher) {
        if (this.supersetOf(matcher)) {
            return `${this}`;
        }
        else if (matcher.supersetOf(this)) {
            return `${matcher}`;
        }
        return null;
    }
    intersection(matcher) {
        if (this.supersetOf(matcher)) {
            return `${matcher}`;
        }
        else if (matcher.supersetOf(this)) {
            return `${this}`;
        }
        if ([this.symbol, matcher.symbol].indexOf(types_1.CssMatcherSymbol.Equal) !== -1) {
            if (matcher.value !== this.value) {
                return void 0;
            }
        }
        return null;
    }
    toString() {
        if (this.symbol === types_1.CssMatcherSymbol.Presence) {
            return '';
        }
        return `${this.symbol}="${this.value}"`.replace(/^=/, '');
    }
}
exports.CssAttributeMatcher = CssAttributeMatcher;


/***/ }),

/***/ "./src/css-attribute.ts":
/*!******************************!*\
  !*** ./src/css-attribute.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CssAttribute = void 0;
const css_matcher_factory_1 = __webpack_require__(/*! ./matchers/css-matcher-factory */ "./src/matchers/css-matcher-factory.ts");
class CssAttribute {
    constructor(parts) {
        this.matchers = [];
        const [name, symbol = '', value] = parts;
        this.name = name;
        const matcher = css_matcher_factory_1.CssMatcherFactory.create(`${symbol}${value}`);
        let intersection;
        for (let i = 0; i < this.matchers.length; i++) {
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
    supersetOf(attr) {
        const thisMatchers = this.matchers;
        const attrMatchers = attr.matchers;
        for (const matcher of thisMatchers) {
            const supersetIndex = attrMatchers.findIndex((attrMatcher) => matcher.supersetOf(attrMatcher));
            const voidIndex = attrMatchers.findIndex((attrMatcher) => matcher.intersection(attrMatcher) === void 0);
            if (supersetIndex === -1 || voidIndex !== -1) {
                return false;
            }
        }
        return true;
    }
    subsetOf(attr) {
        return attr.supersetOf(this);
    }
    union(attr) {
        const union = this.supersetOf(attr) ? this : attr.supersetOf(this) ? attr : null;
        return union;
    }
    intersection(attr) {
        if (this.supersetOf(attr)) {
            return attr;
        }
        if (attr.supersetOf(this)) {
            return this;
        }
        const thisMatchers = this.matchers;
        const attrMatchers = attr.matchers;
        const intersectionMatchers = [];
        for (const matcher of thisMatchers) {
            const voidIndex = attrMatchers.findIndex((attrMatcher) => matcher.intersection(attrMatcher) === void 0);
            if (voidIndex !== -1) {
                return void 0;
            }
            const intersectIndex = attrMatchers.findIndex((attrMatcher) => !!matcher.intersection(attrMatcher));
            if (intersectIndex !== -1) {
                const matcherString = matcher.intersection(attrMatchers[intersectIndex]);
                intersectionMatchers.push(css_matcher_factory_1.CssMatcherFactory.create(`${matcherString}`));
                attrMatchers.splice(intersectIndex, 1);
            }
            else {
                intersectionMatchers.push(matcher);
            }
        }
        for (const matcher of attrMatchers) {
            intersectionMatchers.push(matcher);
        }
        const intersectionAttr = new CssAttribute([this.name]);
        intersectionAttr.matchers = intersectionMatchers;
        return intersectionAttr;
    }
    toString() {
        return this.matchers
            .map((matcher) => `${matcher}`)
            .sort()
            .reduce((prev, matcher) => `${prev}[${this.name}${matcher}]`, '');
    }
}
exports.CssAttribute = CssAttribute;


/***/ }),

/***/ "./src/css-rule.ts":
/*!*************************!*\
  !*** ./src/css-rule.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CssRule = void 0;
class CssRule {
    constructor() {
        this._id = '';
        this._element = '';
        this.classes = new Set();
        this.attribs = new Map();
    }
    set id(id) {
        if (this._id) {
            throw SyntaxError(`Identifier already set to ${this.id}.`);
        }
        this._id = id;
    }
    get id() {
        return this._id;
    }
    set element(element) {
        if (this.attribs.size) {
            throw SyntaxError('Elements cannot be defined after attributes.');
        }
        this._element = element;
    }
    get element() {
        return this._element || '*';
    }
    addAttribute(attribute) {
        const prevAttribute = this.attribs.get(attribute.name);
        if (prevAttribute) {
            const mergedAttribute = prevAttribute.intersection(attribute);
            if (mergedAttribute === void 0) {
                throw new TypeError('The selector defines an empty set.');
            }
            else {
                this.attribs.set(prevAttribute.name, mergedAttribute);
            }
        }
        else {
            this.attribs.set(attribute.name, attribute);
        }
    }
    addClass(className) {
        this.classes.add(className);
    }
    equals(rule) {
        return `${this}` === `${rule}`;
    }
    supersetOf(rule) {
        if (this.element !== '*' && this.element !== rule.element) {
            return false;
        }
        if (this.id && this.id !== rule.id) {
            return false;
        }
        for (const c of this.classes) {
            if (!rule.classes.has(c)) {
                return false;
            }
        }
        if (this.attribs.size > rule.attribs.size) {
            return false;
        }
        for (const attr of this.attribs.values()) {
            const ruleAttr = rule.attribs.get(attr.name);
            if (ruleAttr && !attr.supersetOf(ruleAttr)) {
                return false;
            }
            else if (!ruleAttr) {
                return false;
            }
        }
        return true;
    }
    subsetOf(rule) {
        return rule.supersetOf(this);
    }
    union(rule) {
        const union = this.supersetOf(rule) ? [this] : rule.supersetOf(this) ? [rule] : [this, rule];
        return union;
    }
    intersection(rule) {
        if (this.id && rule.id && this.id !== rule.id) {
            return void 0;
        }
        if (this.element !== rule.element && this.element !== '*' && rule.element !== '*') {
            return void 0;
        }
        const intersection = new CssRule();
        intersection.id = this.id || rule.id;
        if (this.element !== '*') {
            intersection.element = this.element;
        }
        this.classes.forEach((cls) => intersection.addClass(cls));
        rule.classes.forEach((cls) => intersection.addClass(cls));
        try {
            this.attribs.forEach((attr) => intersection.addAttribute(attr));
            rule.attribs.forEach((attr) => intersection.addAttribute(attr));
        }
        catch (error) {
            return void 0;
        }
        return intersection;
    }
    toString() {
        const classes = Array.from(this.classes).sort();
        const attribs = Array.from(this.attribs.keys())
            .sort()
            .map((n) => this.attribs.get(n));
        const strClasses = classes.map((n) => `.${n}`);
        const strAttribs = attribs.map((a) => `${a}`);
        const strId = this.id ? `#${this.id}` : '';
        return `${this.element}${strId}${strClasses.join('')}${strAttribs.join('')}`;
    }
}
exports.CssRule = CssRule;


/***/ }),

/***/ "./src/css-selector.ts":
/*!*****************************!*\
  !*** ./src/css-selector.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CssSelector = void 0;
const css_rule_1 = __webpack_require__(/*! ./css-rule */ "./src/css-rule.ts");
const css_attribute_1 = __webpack_require__(/*! ./css-attribute */ "./src/css-attribute.ts");
const isAncestor = (combinedRule) => {
    return [" ", ">"].indexOf(combinedRule.comb) !== -1;
};
class CssSelector {
    constructor(tokens) {
        this.levels = [[]];
        let rule = new css_rule_1.CssRule();
        tokens.forEach((token) => {
            const { content } = token;
            switch (token.type) {
                case 'id':
                    rule.id = content;
                    break;
                case 'type':
                case 'universal':
                    rule.element = content;
                    break;
                case 'class':
                    rule.addClass(token.name);
                    break;
                case 'attribute':
                    rule.addAttribute(new css_attribute_1.CssAttribute([token.name, `${token.operator}`, `${token.value}`]));
                    break;
                case 'combinator':
                    const comb = content;
                    const combRule = { rule, comb };
                    rule = new css_rule_1.CssRule();
                    this.addRule(combRule);
                    break;
                default:
                    throw new SyntaxError(`Unknown token ${token.content} at position ${token.pos[0]}`);
            }
        });
        this.addRule({ rule, comb: "" });
    }
    addRule(combRule) {
        const currentLevel = this.levels[this.levels.length - 1];
        if (isAncestor(combRule)) {
            currentLevel.push(combRule);
            this.levels.push([]);
        }
        else {
            currentLevel.push(combRule);
        }
    }
    supersetOf(selector) {
        return this.selectorSuperset(this.levels, selector.levels);
    }
    subsetOf(selector) {
        return selector.supersetOf(this);
    }
    intersection(selector) {
        if (this.supersetOf(selector)) {
            return selector;
        }
        if (selector.supersetOf(this)) {
            return this;
        }
        return void 0;
    }
    toString() {
        let result = '';
        this.levels.forEach((level) => {
            level.forEach((combinedRule) => {
                const comb = combinedRule.comb ? ` ${combinedRule.comb} ` : ' ';
                result += `${combinedRule.rule}${comb}`;
            });
        });
        return result.trim();
    }
    selectorSuperset(selectorOne, selectorTwo) {
        if (selectorOne.length === 0) {
            return true;
        }
        if (selectorTwo.length === 0) {
            return false;
        }
        if (selectorOne.length > selectorTwo.length) {
            return false;
        }
        const layerOne = selectorOne[selectorOne.length - 1];
        const layerTwo = selectorTwo[selectorTwo.length - 1];
        const descendantCombOne = layerOne[layerOne.length - 1].comb;
        const descendantCombTwo = layerTwo[layerTwo.length - 1].comb;
        if (descendantCombOne === ">" && descendantCombTwo === " ") {
            return false;
        }
        if (this.levelSuperset(layerOne, layerTwo)) {
            return this.selectorSuperset(selectorOne.slice(0, -1), selectorTwo.slice(0, -1));
        }
        if (descendantCombOne === ">" || descendantCombOne === "") {
            return false;
        }
        return this.selectorSuperset(selectorOne, selectorTwo.slice(0, -1));
    }
    levelSuperset(levelOne, levelTwo) {
        if (levelOne.length === 0) {
            return true;
        }
        if (levelTwo.length === 0) {
            return false;
        }
        if (levelOne.length > levelTwo.length) {
            return false;
        }
        const combinedRuleOne = levelOne[levelOne.length - 1];
        const combinedRuleTwo = levelTwo[levelTwo.length - 1];
        const siblingCombOne = combinedRuleOne.comb;
        const siblingCombTwo = combinedRuleTwo.comb;
        if (siblingCombOne === "+" && siblingCombTwo === "~") {
            return false;
        }
        if (combinedRuleOne.rule.supersetOf(combinedRuleTwo.rule)) {
            return this.levelSuperset(levelOne.slice(0, -1), levelTwo.slice(0, -1));
        }
        if (combinedRuleOne.comb === "+") {
            return false;
        }
        return this.levelSuperset(levelOne, levelTwo.slice(0, -1));
    }
}
exports.CssSelector = CssSelector;


/***/ }),

/***/ "./src/csset.ts":
/*!**********************!*\
  !*** ./src/csset.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Csset = void 0;
const parsel_ts_1 = __webpack_require__(/*! parsel-ts */ "./node_modules/parsel-ts/lib/esm/index.js");
const css_selector_1 = __webpack_require__(/*! ./css-selector */ "./src/css-selector.ts");
class Csset {
    constructor(selector) {
        const tokenList = this.getTokens(selector);
        this.selectors = [];
        let tokenGroup = [];
        let currentToken = tokenList.shift();
        while (currentToken) {
            if (currentToken.type === 'comma') {
                this.selectors.push(new css_selector_1.CssSelector(tokenGroup));
                tokenGroup = [];
            }
            else {
                tokenGroup.push(currentToken);
            }
            currentToken = tokenList.shift();
        }
        this.selectors.push(new css_selector_1.CssSelector(tokenGroup));
    }
    supersetOf(set) {
        let index = set.selectors.length;
        while (index--) {
            const containerIndex = this.selectors.findIndex((s) => s.supersetOf(set.selectors[index]));
            if (containerIndex === -1) {
                return false;
            }
        }
        return true;
    }
    subsetOf(set) {
        return set.supersetOf(this);
    }
    union(set) {
        if (this.supersetOf(set)) {
            return this;
        }
        if (this.subsetOf(set)) {
            return set;
        }
        const equalSel = this.selectors.filter((thisSel) => set.selectors.some((otherSel) => `${thisSel}` === `${otherSel}`));
        const uniqueOne = this.selectors.filter((thisSel) => !set.selectors.some((otherSel) => thisSel.subsetOf(otherSel)));
        const uniqueTwo = set.selectors.filter((otherSel) => !this.selectors.some((thisSel) => otherSel.subsetOf(thisSel)));
        const allSelectors = equalSel.concat(uniqueOne, uniqueTwo);
        return new Csset(`${allSelectors.map((s) => s.toString()).join(',')}`);
    }
    intersection(set) {
        if (this.supersetOf(set)) {
            return set;
        }
        if (this.subsetOf(set)) {
            return this;
        }
        const intersections = this.selectors
            .map((thisSel) => set.selectors.map((otherSel) => thisSel.intersection(otherSel)))
            .reduce((flat, val) => flat.concat(val), [])
            .filter((val) => !!val)
            .map((val) => `${val}`);
        if (intersections.length) {
            return new Csset(`${intersections.join(',')}`);
        }
        return void 0;
    }
    toString() {
        return this.selectors.map((s) => `${s}`).join(',');
    }
    getTokens(selector) {
        let tokens;
        try {
            tokens = (0, parsel_ts_1.tokenize)(selector);
        }
        catch (error) {
            throw SyntaxError(`${error}`);
        }
        if (!tokens) {
            throw SyntaxError(`Selector ${selector} cannot be parsed.`);
        }
        const unknownToken = tokens.find((t) => typeof t === 'string');
        if (unknownToken) {
            throw SyntaxError(`Unknown Token ${unknownToken} in selector ${selector}`);
        }
        return tokens;
    }
}
exports.Csset = Csset;


/***/ }),

/***/ "./src/matchers/contains-matcher.ts":
/*!******************************************!*\
  !*** ./src/matchers/contains-matcher.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CssContainsMatcher = void 0;
const types_1 = __webpack_require__(/*! ../types */ "./src/types.ts");
const css_attribute_matcher_1 = __webpack_require__(/*! ../css-attribute-matcher */ "./src/css-attribute-matcher.ts");
const supersetSymbols = [
    types_1.CssMatcherSymbol.Prefix,
    types_1.CssMatcherSymbol.Suffix,
    types_1.CssMatcherSymbol.SubCode,
    types_1.CssMatcherSymbol.Occurrence,
    types_1.CssMatcherSymbol.Contains,
    types_1.CssMatcherSymbol.Equal,
];
class CssContainsMatcher extends css_attribute_matcher_1.CssAttributeMatcher {
    constructor() {
        super(...arguments);
        this.symbol = types_1.CssMatcherSymbol.Contains;
    }
    supersetOf(matcher) {
        if (supersetSymbols.indexOf(matcher.symbol) !== -1) {
            return matcher.value.indexOf(this.value) !== -1;
        }
        return false;
    }
}
exports.CssContainsMatcher = CssContainsMatcher;


/***/ }),

/***/ "./src/matchers/css-matcher-factory.ts":
/*!*********************************************!*\
  !*** ./src/matchers/css-matcher-factory.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CssMatcherFactory = void 0;
const types_1 = __webpack_require__(/*! ../types */ "./src/types.ts");
const presence_matcher_1 = __webpack_require__(/*! ./presence-matcher */ "./src/matchers/presence-matcher.ts");
const prefix_matcher_1 = __webpack_require__(/*! ./prefix-matcher */ "./src/matchers/prefix-matcher.ts");
const suffix_matcher_1 = __webpack_require__(/*! ./suffix-matcher */ "./src/matchers/suffix-matcher.ts");
const equal_matcher_1 = __webpack_require__(/*! ./equal-matcher */ "./src/matchers/equal-matcher.ts");
const contains_matcher_1 = __webpack_require__(/*! ./contains-matcher */ "./src/matchers/contains-matcher.ts");
const occurrence_matcher_1 = __webpack_require__(/*! ./occurrence-matcher */ "./src/matchers/occurrence-matcher.ts");
const subcode_matcher_1 = __webpack_require__(/*! ./subcode-matcher */ "./src/matchers/subcode-matcher.ts");
const clazzez = {
    [types_1.CssMatcherSymbol.Presence]: presence_matcher_1.CssPresenceMatcher,
    [types_1.CssMatcherSymbol.Prefix]: prefix_matcher_1.CssPrefixMatcher,
    [types_1.CssMatcherSymbol.Suffix]: suffix_matcher_1.CssSuffixMatcher,
    [types_1.CssMatcherSymbol.Equal]: equal_matcher_1.CssEqualMatcher,
    [types_1.CssMatcherSymbol.Contains]: contains_matcher_1.CssContainsMatcher,
    [types_1.CssMatcherSymbol.Occurrence]: occurrence_matcher_1.CssOccurrenceMatcher,
    [types_1.CssMatcherSymbol.SubCode]: subcode_matcher_1.CssSubCodeMatcher,
};
const VALUE_REGEXPS = {
    valid: /^('|")[^'"]+\1$|^[^'"]+$/,
    quotes: /^["']|["']$/g,
};
class CssMatcherFactory {
    static create(selector = '') {
        const parts = selector.split('=');
        const symbol = parts.length > 1 ? parts[0] || '=' : '';
        const value = parts.length > 1 ? parts[1] : '';
        if (!!value && !VALUE_REGEXPS.valid.test(value)) {
            throw new SyntaxError(`Invalid attribute value in ${selector}`);
        }
        return new clazzez[symbol](value.replace(VALUE_REGEXPS.quotes, ''));
    }
}
exports.CssMatcherFactory = CssMatcherFactory;


/***/ }),

/***/ "./src/matchers/equal-matcher.ts":
/*!***************************************!*\
  !*** ./src/matchers/equal-matcher.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CssEqualMatcher = void 0;
const types_1 = __webpack_require__(/*! ../types */ "./src/types.ts");
const css_attribute_matcher_1 = __webpack_require__(/*! ../css-attribute-matcher */ "./src/css-attribute-matcher.ts");
class CssEqualMatcher extends css_attribute_matcher_1.CssAttributeMatcher {
    constructor() {
        super(...arguments);
        this.symbol = types_1.CssMatcherSymbol.Equal;
    }
    supersetOf(matcher) {
        return matcher.symbol === types_1.CssMatcherSymbol.Equal && this.value === matcher.value;
    }
}
exports.CssEqualMatcher = CssEqualMatcher;


/***/ }),

/***/ "./src/matchers/occurrence-matcher.ts":
/*!********************************************!*\
  !*** ./src/matchers/occurrence-matcher.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CssOccurrenceMatcher = void 0;
const types_1 = __webpack_require__(/*! ../types */ "./src/types.ts");
const css_attribute_matcher_1 = __webpack_require__(/*! ../css-attribute-matcher */ "./src/css-attribute-matcher.ts");
const supersetSymbols = [types_1.CssMatcherSymbol.Equal, types_1.CssMatcherSymbol.Occurrence];
class CssOccurrenceMatcher extends css_attribute_matcher_1.CssAttributeMatcher {
    constructor() {
        super(...arguments);
        this.symbol = types_1.CssMatcherSymbol.Occurrence;
    }
    supersetOf(matcher) {
        if (supersetSymbols.indexOf(matcher.symbol) !== -1) {
            return matcher.value === this.value;
        }
        return false;
    }
    intersection(matcher) {
        if (this.value === matcher.value) {
            if (matcher.symbol === types_1.CssMatcherSymbol.Equal) {
                return `="${this.value}"`;
            }
        }
        return super.intersection(matcher);
    }
}
exports.CssOccurrenceMatcher = CssOccurrenceMatcher;


/***/ }),

/***/ "./src/matchers/prefix-matcher.ts":
/*!****************************************!*\
  !*** ./src/matchers/prefix-matcher.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CssPrefixMatcher = void 0;
const types_1 = __webpack_require__(/*! ../types */ "./src/types.ts");
const css_attribute_matcher_1 = __webpack_require__(/*! ../css-attribute-matcher */ "./src/css-attribute-matcher.ts");
const supersetSymbols = [types_1.CssMatcherSymbol.Prefix, types_1.CssMatcherSymbol.SubCode, types_1.CssMatcherSymbol.Equal];
class CssPrefixMatcher extends css_attribute_matcher_1.CssAttributeMatcher {
    constructor() {
        super(...arguments);
        this.symbol = types_1.CssMatcherSymbol.Prefix;
    }
    supersetOf(matcher) {
        if (supersetSymbols.indexOf(matcher.symbol) !== -1) {
            return matcher.value.startsWith(this.value);
        }
        return false;
    }
    union(matcher) {
        if (this.value === matcher.value && matcher.symbol === types_1.CssMatcherSymbol.SubCode) {
            return `${this}`;
        }
        return super.union(matcher);
    }
    intersection(matcher) {
        if (this.value === matcher.value) {
            if (matcher.symbol === types_1.CssMatcherSymbol.Equal) {
                return `="${this.value}"`;
            }
        }
        if (matcher.value.startsWith(this.value)) {
            if (matcher.symbol === types_1.CssMatcherSymbol.Prefix) {
                return `^="${matcher.value}"`;
            }
            if (matcher.symbol === types_1.CssMatcherSymbol.SubCode) {
                return `|="${matcher.value}"`;
            }
        }
        if (this.value.startsWith(matcher.value) && matcher.symbol === types_1.CssMatcherSymbol.Prefix) {
            return `^="${this.value}"`;
        }
        if (matcher.symbol === types_1.CssMatcherSymbol.Prefix && this.value !== matcher.value) {
            return void 0;
        }
        return super.intersection(matcher);
    }
}
exports.CssPrefixMatcher = CssPrefixMatcher;


/***/ }),

/***/ "./src/matchers/presence-matcher.ts":
/*!******************************************!*\
  !*** ./src/matchers/presence-matcher.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CssPresenceMatcher = void 0;
const types_1 = __webpack_require__(/*! ../types */ "./src/types.ts");
const css_attribute_matcher_1 = __webpack_require__(/*! ../css-attribute-matcher */ "./src/css-attribute-matcher.ts");
class CssPresenceMatcher extends css_attribute_matcher_1.CssAttributeMatcher {
    constructor() {
        super(...arguments);
        this.symbol = types_1.CssMatcherSymbol.Presence;
    }
    supersetOf(matcher) {
        return true;
    }
}
exports.CssPresenceMatcher = CssPresenceMatcher;


/***/ }),

/***/ "./src/matchers/subcode-matcher.ts":
/*!*****************************************!*\
  !*** ./src/matchers/subcode-matcher.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CssSubCodeMatcher = void 0;
const types_1 = __webpack_require__(/*! ../types */ "./src/types.ts");
const css_attribute_matcher_1 = __webpack_require__(/*! ../css-attribute-matcher */ "./src/css-attribute-matcher.ts");
const supersetSymbols = [types_1.CssMatcherSymbol.SubCode, types_1.CssMatcherSymbol.Equal];
class CssSubCodeMatcher extends css_attribute_matcher_1.CssAttributeMatcher {
    constructor() {
        super(...arguments);
        this.symbol = types_1.CssMatcherSymbol.SubCode;
    }
    supersetOf(matcher) {
        if (supersetSymbols.indexOf(matcher.symbol) !== -1) {
            return matcher.value === this.value;
        }
        return false;
    }
    union(matcher) {
        if (matcher.symbol === types_1.CssMatcherSymbol.SubCode) {
            if (this.value === matcher.value) {
                return `${this}`;
            }
        }
        return super.union(matcher);
    }
    intersection(matcher) {
        if (this.value === matcher.value) {
            if (matcher.symbol === types_1.CssMatcherSymbol.Prefix) {
                return `|="${this.value}"`;
            }
        }
        if (this.value.startsWith(matcher.value)) {
            if (matcher.symbol === types_1.CssMatcherSymbol.Prefix) {
                return `|="${this.value}"`;
            }
        }
        return super.intersection(matcher);
    }
}
exports.CssSubCodeMatcher = CssSubCodeMatcher;


/***/ }),

/***/ "./src/matchers/suffix-matcher.ts":
/*!****************************************!*\
  !*** ./src/matchers/suffix-matcher.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CssSuffixMatcher = void 0;
const types_1 = __webpack_require__(/*! ../types */ "./src/types.ts");
const css_attribute_matcher_1 = __webpack_require__(/*! ../css-attribute-matcher */ "./src/css-attribute-matcher.ts");
const supersetSymbols = [types_1.CssMatcherSymbol.Suffix, types_1.CssMatcherSymbol.Equal];
class CssSuffixMatcher extends css_attribute_matcher_1.CssAttributeMatcher {
    constructor() {
        super(...arguments);
        this.symbol = types_1.CssMatcherSymbol.Suffix;
    }
    supersetOf(matcher) {
        if (supersetSymbols.indexOf(matcher.symbol) !== -1) {
            return matcher.value.endsWith(this.value);
        }
        return false;
    }
    intersection(matcher) {
        if (matcher.symbol === types_1.CssMatcherSymbol.Suffix) {
            if (matcher.value.endsWith(this.value) || this.value.endsWith(matcher.value)) {
                const longestValue = this.value.length > matcher.value.length ? this.value : matcher.value;
                return `$="${longestValue}"`;
            }
            if (this.value !== matcher.value) {
                return void 0;
            }
        }
        return super.intersection(matcher);
    }
}
exports.CssSuffixMatcher = CssSuffixMatcher;


/***/ }),

/***/ "./src/types.ts":
/*!**********************!*\
  !*** ./src/types.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CssMatcherSymbol = void 0;
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
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!***********************!*\
  !*** ./demo/index.ts ***!
  \***********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const csset_1 = __webpack_require__(/*! ../src/csset */ "./src/csset.ts");
const playground_1 = __webpack_require__(/*! ./playground */ "./demo/playground.ts");
const steps_1 = __webpack_require__(/*! ./steps */ "./demo/steps/index.ts");
window.Csset = csset_1.Csset;
const commentArea = document.querySelector('#comment');
const styleArea = document.querySelector('#style');
const codeArea = document.querySelector('#code');
const nextButton = document.querySelector('#next');
const playgroundSize = 101;
const playground = document.querySelector('#playground');
(0, playground_1.setPlayground)(playground, playgroundSize);
let index = 0;
nextButton.addEventListener('click', () => {
    if (nextButton.innerText === 'Restart') {
        window.location.reload();
        return;
    }
    const step = steps_1.STEPS[index++];
    (0, steps_1.runStep)(step, commentArea, codeArea, styleArea);
    hljs.highlightBlock(codeArea);
    if (index >= steps_1.STEPS.length) {
        nextButton.innerText = 'Restart';
    }
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQyxRQUFRLENBQXFCLENBQUM7QUFDdkUsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQW1CLENBQUM7QUFFbkUsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQXNCLENBQUM7QUFLeEUsTUFBTSxjQUFjLEdBQUcsR0FBRyxDQUFDO0FBQzNCLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDekQsOEJBQWEsRUFBQyxVQUE4QixFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBRTlELElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztBQUVkLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO0lBQ3hDLElBQUksVUFBVSxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUU7UUFDdEMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN6QixPQUFPO0tBQ1I7SUFFRCxNQUFNLElBQUksR0FBRyxhQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUc1QixtQkFBTyxFQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ2hELElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFOUIsSUFBSSxLQUFLLElBQUksYUFBSyxDQUFDLE1BQU0sRUFBRTtRQUN6QixVQUFVLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztLQUNsQztBQUNILENBQUMsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY3NzZXQvLi9ub2RlX21vZHVsZXMvcGFyc2VsLXRzL2xpYi9lc20vZ29iYmxlUGFyZW5zLmpzIiwid2VicGFjazovL2Nzc2V0Ly4vbm9kZV9tb2R1bGVzL3BhcnNlbC10cy9saWIvZXNtL2luZGV4LmpzIiwid2VicGFjazovL2Nzc2V0Ly4vbm9kZV9tb2R1bGVzL3BhcnNlbC10cy9saWIvZXNtL25lc3RUb2tlbnMuanMiLCJ3ZWJwYWNrOi8vY3NzZXQvLi9ub2RlX21vZHVsZXMvcGFyc2VsLXRzL2xpYi9lc20vcGFyc2UuanMiLCJ3ZWJwYWNrOi8vY3NzZXQvLi9ub2RlX21vZHVsZXMvcGFyc2VsLXRzL2xpYi9lc20vc3BlY2lmaWNpdHkuanMiLCJ3ZWJwYWNrOi8vY3NzZXQvLi9ub2RlX21vZHVsZXMvcGFyc2VsLXRzL2xpYi9lc20vdG9rZW5pemUuanMiLCJ3ZWJwYWNrOi8vY3NzZXQvLi9ub2RlX21vZHVsZXMvcGFyc2VsLXRzL2xpYi9lc20vdG9rZW5zLmpzIiwid2VicGFjazovL2Nzc2V0Ly4vbm9kZV9tb2R1bGVzL3BhcnNlbC10cy9saWIvZXNtL3R5cGVzLmpzIiwid2VicGFjazovL2Nzc2V0Ly4vbm9kZV9tb2R1bGVzL3BhcnNlbC10cy9saWIvZXNtL3dhbGsuanMiLCJ3ZWJwYWNrOi8vY3NzZXQvLi9kZW1vL3BsYXlncm91bmQudHMiLCJ3ZWJwYWNrOi8vY3NzZXQvLi9kZW1vL3N0ZXBzL2luZGV4LnRzIiwid2VicGFjazovL2Nzc2V0Ly4vZGVtby9zdGVwcy9ydW5uZXIudHMiLCJ3ZWJwYWNrOi8vY3NzZXQvLi9kZW1vL3N0ZXBzL3N0ZXBzLWJlZ2luLnRzIiwid2VicGFjazovL2Nzc2V0Ly4vZGVtby9zdGVwcy9zdGVwcy1pbnRlcnNlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vY3NzZXQvLi9kZW1vL3N0ZXBzL3N0ZXBzLXVuaW9uLnRzIiwid2VicGFjazovL2Nzc2V0Ly4vc3JjL2Nzcy1hdHRyaWJ1dGUtbWF0Y2hlci50cyIsIndlYnBhY2s6Ly9jc3NldC8uL3NyYy9jc3MtYXR0cmlidXRlLnRzIiwid2VicGFjazovL2Nzc2V0Ly4vc3JjL2Nzcy1ydWxlLnRzIiwid2VicGFjazovL2Nzc2V0Ly4vc3JjL2Nzcy1zZWxlY3Rvci50cyIsIndlYnBhY2s6Ly9jc3NldC8uL3NyYy9jc3NldC50cyIsIndlYnBhY2s6Ly9jc3NldC8uL3NyYy9tYXRjaGVycy9jb250YWlucy1tYXRjaGVyLnRzIiwid2VicGFjazovL2Nzc2V0Ly4vc3JjL21hdGNoZXJzL2Nzcy1tYXRjaGVyLWZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vY3NzZXQvLi9zcmMvbWF0Y2hlcnMvZXF1YWwtbWF0Y2hlci50cyIsIndlYnBhY2s6Ly9jc3NldC8uL3NyYy9tYXRjaGVycy9vY2N1cnJlbmNlLW1hdGNoZXIudHMiLCJ3ZWJwYWNrOi8vY3NzZXQvLi9zcmMvbWF0Y2hlcnMvcHJlZml4LW1hdGNoZXIudHMiLCJ3ZWJwYWNrOi8vY3NzZXQvLi9zcmMvbWF0Y2hlcnMvcHJlc2VuY2UtbWF0Y2hlci50cyIsIndlYnBhY2s6Ly9jc3NldC8uL3NyYy9tYXRjaGVycy9zdWJjb2RlLW1hdGNoZXIudHMiLCJ3ZWJwYWNrOi8vY3NzZXQvLi9zcmMvbWF0Y2hlcnMvc3VmZml4LW1hdGNoZXIudHMiLCJ3ZWJwYWNrOi8vY3NzZXQvLi9zcmMvdHlwZXMudHMiLCJ3ZWJwYWNrOi8vY3NzZXQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY3NzZXQvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2Nzc2V0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY3NzZXQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9jc3NldC8uL2RlbW8vaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGdvYmJsZVBhcmVucyh0ZXh0LCBpbmRleCkge1xuICAgIGxldCBzdHIgPSAnJztcbiAgICBsZXQgaSA9IGluZGV4O1xuICAgIGNvbnN0IHN0YWNrID0gW107XG4gICAgZm9yICg7IGkgPCB0ZXh0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGNoYXIgPSB0ZXh0W2ldO1xuICAgICAgICBpZiAoY2hhciA9PT0gJygnKSB7XG4gICAgICAgICAgICBzdGFjay5wdXNoKGNoYXIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNoYXIgPT09ICcpJykge1xuICAgICAgICAgICAgaWYgKHN0YWNrLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBzdGFjay5wb3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2xvc2luZyBwYXJlbiB3aXRob3V0IG9wZW5pbmcgcGFyZW4gYXQgJyArIGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHN0ciArPSBjaGFyO1xuICAgICAgICBpZiAoc3RhY2subGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RyO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcignT3BlbmluZyBwYXJlbiB3aXRob3V0IGNsb3NpbmcgcGFyZW4nKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWdvYmJsZVBhcmVucy5qcy5tYXAiLCJleHBvcnQgKiBmcm9tICcuL3BhcnNlJztcbmV4cG9ydCAqIGZyb20gJy4vc3BlY2lmaWNpdHknO1xuZXhwb3J0ICogZnJvbSAnLi90b2tlbml6ZSc7XG5leHBvcnQgKiBmcm9tICcuL3dhbGsnO1xuZXhwb3J0ICogZnJvbSAnLi90eXBlcyc7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJjb25zdCBERUZBVUxUX05FU1RfT1BUSU9OUyA9IHtcbiAgICBsaXN0OiB0cnVlLFxufTtcbmV4cG9ydCBmdW5jdGlvbiBuZXN0VG9rZW5zKHRva2Vucywgb3B0aW9ucyA9IERFRkFVTFRfTkVTVF9PUFRJT05TKSB7XG4gICAgY29uc3QgeyBsaXN0IH0gPSBvcHRpb25zO1xuICAgIGlmIChsaXN0ICYmIHRva2Vucy5maW5kKCh0KSA9PiB0LnR5cGUgPT09ICdjb21tYScpKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdG9ycyA9IFtdO1xuICAgICAgICBjb25zdCB0ZW1wID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodG9rZW5zW2ldLnR5cGUgPT09ICdjb21tYScpIHtcbiAgICAgICAgICAgICAgICBpZiAodGVtcC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbmNvcnJlY3QgY29tbWEgYXQgJyArIGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWxlY3RvcnMucHVzaChuZXN0VG9rZW5zKHRlbXAsIHsgbGlzdDogZmFsc2UgfSkpO1xuICAgICAgICAgICAgICAgIHRlbXAubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRlbXAucHVzaCh0b2tlbnNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0ZW1wLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUcmFpbGluZyBjb21tYScpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2VsZWN0b3JzLnB1c2gobmVzdFRva2Vucyh0ZW1wLCB7IGxpc3Q6IGZhbHNlIH0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyB0eXBlOiAnbGlzdCcsIGxpc3Q6IHNlbGVjdG9ycyB9O1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gdG9rZW5zLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGNvbnN0IHRva2VuID0gdG9rZW5zW2ldO1xuICAgICAgICBpZiAodG9rZW4udHlwZSA9PT0gJ2NvbWJpbmF0b3InKSB7XG4gICAgICAgICAgICBjb25zdCBsZWZ0ID0gdG9rZW5zLnNsaWNlKDAsIGkpO1xuICAgICAgICAgICAgY29uc3QgcmlnaHQgPSB0b2tlbnMuc2xpY2UoaSArIDEpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnY29tcGxleCcsXG4gICAgICAgICAgICAgICAgY29tYmluYXRvcjogdG9rZW4uY29udGVudCxcbiAgICAgICAgICAgICAgICBsZWZ0OiBuZXN0VG9rZW5zKGxlZnQpLFxuICAgICAgICAgICAgICAgIHJpZ2h0OiBuZXN0VG9rZW5zKHJpZ2h0KSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRva2Vucy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiB0b2tlbnMubGVuZ3RoID09PSAxXG4gICAgICAgID8gdG9rZW5zWzBdXG4gICAgICAgIDoge1xuICAgICAgICAgICAgdHlwZTogJ2NvbXBvdW5kJyxcbiAgICAgICAgICAgIGxpc3Q6IFsuLi50b2tlbnNdLFxuICAgICAgICB9O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bmVzdFRva2Vucy5qcy5tYXAiLCJpbXBvcnQgeyBuZXN0VG9rZW5zIH0gZnJvbSAnLi9uZXN0VG9rZW5zJztcbmltcG9ydCB7IHRva2VuaXplIH0gZnJvbSAnLi90b2tlbml6ZSc7XG5pbXBvcnQgeyBSRUNVUlNJVkVfUFNFVURPX0NMQVNTRVMsIFJFQ1VSU0lWRV9QU0VVRE9fQ0xBU1NFU19BUkdTIH0gZnJvbSAnLi90b2tlbnMnO1xuaW1wb3J0IHsgd2FsayB9IGZyb20gJy4vd2Fsayc7XG5jb25zdCBERUZBVUxUX1BBUlNFX09QVElPTlMgPSB7XG4gICAgcmVjdXJzaXZlOiB0cnVlLFxuICAgIGxpc3Q6IHRydWUsXG59O1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlKHNlbGVjdG9yLCBvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCB7IHJlY3Vyc2l2ZSwgbGlzdCB9ID0gT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9QQVJTRV9PUFRJT05TLCBvcHRpb25zKTtcbiAgICBjb25zdCB0b2tlbnMgPSB0b2tlbml6ZShzZWxlY3Rvcik7XG4gICAgaWYgKCF0b2tlbnMpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IGFzdCA9IG5lc3RUb2tlbnModG9rZW5zLCB7IGxpc3QgfSk7XG4gICAgaWYgKHJlY3Vyc2l2ZSkge1xuICAgICAgICB3YWxrKGFzdCwgKG5vZGUpID0+IHtcbiAgICAgICAgICAgIGlmIChub2RlLnR5cGUgPT09ICdwc2V1ZG8tY2xhc3MnICYmIG5vZGUuYXJndW1lbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoUkVDVVJTSVZFX1BTRVVET19DTEFTU0VTLmhhcyhub2RlLm5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBhcmd1bWVudCA9IG5vZGUuYXJndW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkQXJnID0gUkVDVVJTSVZFX1BTRVVET19DTEFTU0VTX0FSR1Nbbm9kZS5uYW1lXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoaWxkQXJnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXRjaCA9IGNoaWxkQXJnLmV4ZWMoYXJndW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFtYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24obm9kZSwgbWF0Y2guZ3JvdXBzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3VtZW50ID0gbWF0Y2guZ3JvdXBzID8gbWF0Y2guZ3JvdXBzLnN1YnRyZWUgOiAnJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoYXJndW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuc3VidHJlZSA9IHBhcnNlKGFyZ3VtZW50LCB7IHJlY3Vyc2l2ZTogdHJ1ZSwgbGlzdDogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBhc3Q7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wYXJzZS5qcy5tYXAiLCJpbXBvcnQgeyBwYXJzZSB9IGZyb20gJy4vcGFyc2UnO1xuaW1wb3J0IHsgUkVDVVJTSVZFX1BTRVVET19DTEFTU0VTIH0gZnJvbSAnLi90b2tlbnMnO1xuaW1wb3J0IHsgd2FsayB9IGZyb20gJy4vd2Fsayc7XG5mdW5jdGlvbiBtYXhJbmRleE9mKGFycikge1xuICAgIGxldCBtYXggPSBhcnJbMF07XG4gICAgbGV0IHJldCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGFycltpXSA+IG1heCkge1xuICAgICAgICAgICAgcmV0ID0gaTtcbiAgICAgICAgICAgIG1heCA9IGFycltpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJyLmxlbmd0aCA9PT0gMCA/IC0xIDogcmV0O1xufVxuZXhwb3J0IGZ1bmN0aW9uIHNwZWNpZmljaXR5VG9OdW1iZXIoc3BlY2lmaWNpdHlBcnIsIGJhc2UpIHtcbiAgICBjb25zdCBiID0gYmFzZSB8fCBNYXRoLm1heCguLi5zcGVjaWZpY2l0eUFycikgKyAxO1xuICAgIHJldHVybiBzcGVjaWZpY2l0eUFyclswXSAqIE1hdGgucG93KGIsIDIpICsgc3BlY2lmaWNpdHlBcnJbMV0gKiBiICsgc3BlY2lmaWNpdHlBcnJbMl07XG59XG5leHBvcnQgZnVuY3Rpb24gc3BlY2lmaWNpdHkoc2VsZWN0b3IsIHsgZm9ybWF0ID0gJ2FycmF5JyB9ID0ge30pIHtcbiAgICBjb25zdCBhc3QgPSB0eXBlb2Ygc2VsZWN0b3IgPT09ICdvYmplY3QnID8gc2VsZWN0b3IgOiBwYXJzZShzZWxlY3RvciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgaWYgKCFhc3QpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmIChhc3QudHlwZSA9PT0gJ2xpc3QnKSB7XG4gICAgICAgIGxldCBiYXNlID0gMTA7XG4gICAgICAgIGNvbnN0IHNwZWNpZmljaXRpZXMgPSBhc3QubGlzdC5tYXAoKHMpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNwID0gc3BlY2lmaWNpdHkocykgfHwgW107XG4gICAgICAgICAgICBiYXNlID0gTWF0aC5tYXgoYmFzZSwgLi4uc3ApO1xuICAgICAgICAgICAgcmV0dXJuIHNwO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgbnVtYmVycyA9IHNwZWNpZmljaXRpZXMubWFwKChzKSA9PiBzcGVjaWZpY2l0eVRvTnVtYmVyKHMsIGJhc2UpKTtcbiAgICAgICAgY29uc3QgaSA9IG1heEluZGV4T2YobnVtYmVycyk7XG4gICAgICAgIHJldHVybiBzcGVjaWZpY2l0aWVzW2ldO1xuICAgIH1cbiAgICBjb25zdCByZXQgPSBbMCwgMCwgMF07XG4gICAgd2Fsayhhc3QsIChub2RlKSA9PiB7XG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09ICdpZCcpIHtcbiAgICAgICAgICAgIHJldFswXSsrO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5vZGUudHlwZSA9PT0gJ2NsYXNzJyB8fCBub2RlLnR5cGUgPT09ICdhdHRyaWJ1dGUnKSB7XG4gICAgICAgICAgICByZXRbMV0rKztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgobm9kZS50eXBlID09PSAndHlwZScgJiYgbm9kZS5jb250ZW50ICE9PSAnKicpIHx8IG5vZGUudHlwZSA9PT0gJ3BzZXVkby1lbGVtZW50Jykge1xuICAgICAgICAgICAgcmV0WzJdKys7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobm9kZS50eXBlID09PSAncHNldWRvLWNsYXNzJyAmJiBub2RlLm5hbWUgIT09ICd3aGVyZScpIHtcbiAgICAgICAgICAgIGlmIChSRUNVUlNJVkVfUFNFVURPX0NMQVNTRVMuaGFzKG5vZGUubmFtZSkgJiYgbm9kZS5zdWJ0cmVlKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3ViID0gc3BlY2lmaWNpdHkobm9kZS5zdWJ0cmVlKSB8fCBbXTtcbiAgICAgICAgICAgICAgICBzdWIuZm9yRWFjaCgocywgaSkgPT4gKHJldFtpXSArPSBzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXRbMV0rKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByZXQ7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zcGVjaWZpY2l0eS5qcy5tYXAiLCJpbXBvcnQgeyBnb2JibGVQYXJlbnMgfSBmcm9tICcuL2dvYmJsZVBhcmVucyc7XG5pbXBvcnQgeyBUT0tFTlMsIFRPS0VOU19GT1JfUkVTVE9SRSwgVE9LRU5TX1dJVEhfUEFSRU5TLCBUT0tFTlNfV0lUSF9TVFJJTkdTLCBUUklNX1RPS0VOUyB9IGZyb20gJy4vdG9rZW5zJztcbmZ1bmN0aW9uIGlzVG9rZW5UeXBlKGlucHV0KSB7XG4gICAgcmV0dXJuIHR5cGVvZiBpbnB1dCA9PSAnb2JqZWN0Jztcbn1cbmZ1bmN0aW9uIHJlc3RvcmVOZXN0ZWQodG9rZW5zLCBzdHJpbmdzLCByZWdleCwgdHlwZXMpIHtcbiAgICBmb3IgKGNvbnN0IHN0ciBvZiBzdHJpbmdzKSB7XG4gICAgICAgIGZvciAoY29uc3QgdG9rZW4gb2YgdG9rZW5zKSB7XG4gICAgICAgICAgICBpZiAoaXNUb2tlblR5cGUodG9rZW4pICYmIHR5cGVzLmhhcyh0b2tlbi50eXBlKSAmJiB0b2tlbi5wb3NbMF0gPCBzdHIuc3RhcnQgJiYgc3RyLnN0YXJ0IDwgdG9rZW4ucG9zWzFdKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBjb250ZW50IH0gPSB0b2tlbjtcbiAgICAgICAgICAgICAgICB0b2tlbi5jb250ZW50ID0gdG9rZW4uY29udGVudC5yZXBsYWNlKHJlZ2V4LCBzdHIuc3RyKTtcbiAgICAgICAgICAgICAgICBpZiAodG9rZW4uY29udGVudCAhPT0gY29udGVudCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBncm91cHNSZWdleHAgPSBUT0tFTlNfRk9SX1JFU1RPUkVbdG9rZW4udHlwZV07XG4gICAgICAgICAgICAgICAgICAgIGdyb3Vwc1JlZ2V4cC5sYXN0SW5kZXggPSAwO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXRjaCA9IGdyb3Vwc1JlZ2V4cC5leGVjKHRva2VuLmNvbnRlbnQpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBncm91cHMgPSBtYXRjaCAmJiBtYXRjaC5ncm91cHM7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odG9rZW4sIGdyb3Vwcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIHRva2VuaXplQnkodGV4dCwgZ3JhbW1hcikge1xuICAgIGlmICghdGV4dCkge1xuICAgICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIGNvbnN0IHN0cmFyciA9IFt0ZXh0XTtcbiAgICBmb3IgKGNvbnN0IHRva2VuIGluIGdyYW1tYXIpIHtcbiAgICAgICAgY29uc3QgcGF0dGVybiA9IGdyYW1tYXJbdG9rZW5dO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0cmFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgc3RyID0gc3RyYXJyW2ldO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgcGF0dGVybi5sYXN0SW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoID0gcGF0dGVybi5leGVjKHN0cik7XG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZyb20gPSBtYXRjaC5pbmRleCAtIDE7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFyZ3MgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udGVudCA9IG1hdGNoWzBdO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBiZWZvcmUgPSBzdHIuc2xpY2UoMCwgZnJvbSArIDEpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYmVmb3JlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goYmVmb3JlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goT2JqZWN0LmFzc2lnbih7IHR5cGU6IHRva2VuLCBjb250ZW50IH0sIG1hdGNoLmdyb3VwcykpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhZnRlciA9IHN0ci5zbGljZShmcm9tICsgY29udGVudC5sZW5ndGggKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFmdGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goYWZ0ZXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHN0cmFyci5zcGxpY2UoaSwgMSwgLi4uYXJncyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGxldCBvZmZzZXQgPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHRva2VuID0gc3RyYXJyW2ldO1xuICAgICAgICBjb25zdCBsZW5ndGggPSBpc1Rva2VuVHlwZSh0b2tlbikgPyB0b2tlbi5jb250ZW50Lmxlbmd0aCA6IHRva2VuLmxlbmd0aDtcbiAgICAgICAgaWYgKGlzVG9rZW5UeXBlKHRva2VuKSkge1xuICAgICAgICAgICAgdG9rZW4ucG9zID0gW29mZnNldCwgb2Zmc2V0ICsgbGVuZ3RoXTtcbiAgICAgICAgICAgIGlmIChUUklNX1RPS0VOUy5oYXModG9rZW4udHlwZSkpIHtcbiAgICAgICAgICAgICAgICB0b2tlbi5jb250ZW50ID0gdG9rZW4uY29udGVudC50cmltKCkgfHwgJyAnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG9mZnNldCArPSBsZW5ndGg7XG4gICAgfVxuICAgIHJldHVybiBzdHJhcnI7XG59XG5leHBvcnQgZnVuY3Rpb24gdG9rZW5pemUoaW5wdXQpIHtcbiAgICBpZiAoIWlucHV0KSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBsZXQgc2VsZWN0b3IgPSBpbnB1dC50cmltKCk7XG4gICAgY29uc3Qgc3RyaW5ncyA9IFtdO1xuICAgIHNlbGVjdG9yID0gc2VsZWN0b3IucmVwbGFjZSgvKD86XCIoKD86W15cIlxcXFxdfFxcXFwuKSopXCIpfCg/OicoKD86W14nXFxcXF18XFxcXC4pKiknKS9nLCAoc3RyLCBjb250ZW50RG91YmxlLCBjb250ZW50U2luZ2xlLCBzdGFydCkgPT4ge1xuICAgICAgICBzdHJpbmdzLnB1c2goeyBzdHIsIHN0YXJ0IH0pO1xuICAgICAgICBjb25zdCBjb250ZW50ID0gY29udGVudERvdWJsZSA9PT0gdm9pZCAwID8gY29udGVudFNpbmdsZSA6IGNvbnRlbnREb3VibGU7XG4gICAgICAgIGNvbnN0IHF1b3RlID0gKGNvbnRlbnREb3VibGUgPT09IHZvaWQgMCkgPyAnXFwnJyA6ICdcIic7XG4gICAgICAgIHJldHVybiBxdW90ZSArICfCpycucmVwZWF0KGNvbnRlbnQubGVuZ3RoKSArIHF1b3RlO1xuICAgIH0pO1xuICAgIGNvbnN0IHBhcmVucyA9IFtdO1xuICAgIGxldCBvZmZzZXQgPSAwO1xuICAgIGxldCBzdGFydDtcbiAgICB3aGlsZSAoKHN0YXJ0ID0gc2VsZWN0b3IuaW5kZXhPZignKCcsIG9mZnNldCkpID4gLTEpIHtcbiAgICAgICAgY29uc3Qgc3RyID0gZ29iYmxlUGFyZW5zKHNlbGVjdG9yLCBzdGFydCk7XG4gICAgICAgIHBhcmVucy5wdXNoKHsgc3RyLCBzdGFydCB9KTtcbiAgICAgICAgc2VsZWN0b3IgPVxuICAgICAgICAgICAgc2VsZWN0b3Iuc3Vic3RyaW5nKDAsIHN0YXJ0KSArICcoJyArICfCticucmVwZWF0KHN0ci5sZW5ndGggLSAyKSArICcpJyArIHNlbGVjdG9yLnN1YnN0cmluZyhzdGFydCArIHN0ci5sZW5ndGgpO1xuICAgICAgICBvZmZzZXQgPSBzdGFydCArIHN0ci5sZW5ndGg7XG4gICAgfVxuICAgIGNvbnN0IHRva2VucyA9IHRva2VuaXplQnkoc2VsZWN0b3IsIFRPS0VOUyk7XG4gICAgcmVzdG9yZU5lc3RlZCh0b2tlbnMsIHBhcmVucywgL1xcKMK2K1xcKS8sIFRPS0VOU19XSVRIX1BBUkVOUyk7XG4gICAgcmVzdG9yZU5lc3RlZCh0b2tlbnMsIHN0cmluZ3MsIC8oWydcIl0pwqcrP1xcMS8sIFRPS0VOU19XSVRIX1NUUklOR1MpO1xuICAgIHJldHVybiB0b2tlbnM7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD10b2tlbml6ZS5qcy5tYXAiLCJleHBvcnQgY29uc3QgVE9LRU5TID0ge1xuICAgIGF0dHJpYnV0ZTogL1xcW1xccyooPzooPzxuYW1lc3BhY2U+XFwqfFstXFx3XSopXFx8KT8oPzxuYW1lPlstXFx3XFx1ezAwODB9LVxcdXtGRkZGfV0rKVxccyooPzooPzxvcGVyYXRvcj5cXFc/PSlcXHMqKD88dmFsdWU+Lis/KVxccyooXFxzKD88Y2FzZVNlbnNpdGl2ZT5baUlzU10pKT9cXHMqKT9cXF0vZ3UsXG4gICAgaWQ6IC8jKD88bmFtZT4oPzpbLVxcd1xcdXswMDgwfS1cXHV7RkZGRn1dfFxcXFwuKSspL2d1LFxuICAgIGNsYXNzOiAvXFwuKD88bmFtZT4oPzpbLVxcd1xcdXswMDgwfS1cXHV7RkZGRn1dfFxcXFwuKSspL2d1LFxuICAgIGNvbW1hOiAvXFxzKixcXHMqL2csXG4gICAgY29tYmluYXRvcjogL1xccypbXFxzPit+XVxccyovZyxcbiAgICAncHNldWRvLWVsZW1lbnQnOiAvOjooPzxuYW1lPlstXFx3XFx1ezAwODB9LVxcdXtGRkZGfV0rKSg/OlxcKCg/PGFyZ3VtZW50PsK2KylcXCkpPy9ndSxcbiAgICAncHNldWRvLWNsYXNzJzogLzooPzxuYW1lPlstXFx3XFx1ezAwODB9LVxcdXtGRkZGfV0rKSg/OlxcKCg/PGFyZ3VtZW50PsK2KylcXCkpPy9ndSxcbiAgICB1bml2ZXJzYWw6IC8oPzooPzxuYW1lc3BhY2U+XFwqfFstXFx3XSopXFx8KT9cXCovZ3UsXG4gICAgdHlwZTogLyg/Oig/PG5hbWVzcGFjZT5cXCp8Wy1cXHddKilcXHwpPyg/PG5hbWU+Wy1cXHdcXHV7MDA4MH0tXFx1e0ZGRkZ9XSspfFxcKi9ndSxcbn07XG5leHBvcnQgY29uc3QgVE9LRU5TX1dJVEhfUEFSRU5TID0gbmV3IFNldChbJ3BzZXVkby1jbGFzcycsICdwc2V1ZG8tZWxlbWVudCddKTtcbmV4cG9ydCBjb25zdCBUT0tFTlNfV0lUSF9TVFJJTkdTID0gbmV3IFNldChbLi4uVE9LRU5TX1dJVEhfUEFSRU5TLCAnYXR0cmlidXRlJ10pO1xuZXhwb3J0IGNvbnN0IFRSSU1fVE9LRU5TID0gbmV3IFNldChbJ2NvbWJpbmF0b3InLCAnY29tbWEnXSk7XG5leHBvcnQgY29uc3QgUkVDVVJTSVZFX1BTRVVET19DTEFTU0VTID0gbmV3IFNldChbXG4gICAgJ25vdCcsXG4gICAgJ2lzJyxcbiAgICAnd2hlcmUnLFxuICAgICdoYXMnLFxuICAgICdtYXRjaGVzJyxcbiAgICAnLW1vei1hbnknLFxuICAgICctd2Via2l0LWFueScsXG4gICAgJ250aC1jaGlsZCcsXG4gICAgJ250aC1sYXN0LWNoaWxkJyxcbl0pO1xuY29uc3QgY2hpbGRSZWdleHAgPSAvKD88aW5kZXg+W1xcZG4rLV0rKVxccytvZlxccysoPzxzdWJ0cmVlPi4rKS87XG5leHBvcnQgY29uc3QgUkVDVVJTSVZFX1BTRVVET19DTEFTU0VTX0FSR1MgPSB7XG4gICAgJ250aC1jaGlsZCc6IGNoaWxkUmVnZXhwLFxuICAgICdudGgtbGFzdC1jaGlsZCc6IGNoaWxkUmVnZXhwLFxufTtcbmV4cG9ydCBjb25zdCBUT0tFTlNfRk9SX1JFU1RPUkUgPSBPYmplY3QuYXNzaWduKHt9LCBUT0tFTlMpO1xuZm9yIChjb25zdCBwc2V1ZG9UeXBlIG9mIFsncHNldWRvLWVsZW1lbnQnLCAncHNldWRvLWNsYXNzJ10pIHtcbiAgICBjb25zdCBrZXkgPSBwc2V1ZG9UeXBlO1xuICAgIFRPS0VOU19GT1JfUkVTVE9SRVtrZXldID0gUmVnRXhwKFRPS0VOU1trZXldLnNvdXJjZS5yZXBsYWNlKCcoPzxhcmd1bWVudD7CtispJywgJyg/PGFyZ3VtZW50Pi4rKScpLCAnZ3UnKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRva2Vucy5qcy5tYXAiLCJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD10eXBlcy5qcy5tYXAiLCJleHBvcnQgZnVuY3Rpb24gd2Fsayhub2RlLCBjYWxsYmFjaywgbywgcGFyZW50KSB7XG4gICAgaWYgKCFub2RlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKG5vZGUudHlwZSA9PT0gJ2NvbXBsZXgnKSB7XG4gICAgICAgIHdhbGsobm9kZS5sZWZ0LCBjYWxsYmFjaywgbywgbm9kZSk7XG4gICAgICAgIHdhbGsobm9kZS5yaWdodCwgY2FsbGJhY2ssIG8sIG5vZGUpO1xuICAgIH1cbiAgICBlbHNlIGlmIChub2RlLnR5cGUgPT09ICdjb21wb3VuZCcgfHwgbm9kZS50eXBlID09PSAnbGlzdCcpIHtcbiAgICAgICAgZm9yIChjb25zdCBuIG9mIG5vZGUubGlzdCkge1xuICAgICAgICAgICAgd2FsayhuLCBjYWxsYmFjaywgbywgbm9kZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAobm9kZS50eXBlID09PSAncHNldWRvLWNsYXNzJyAmJiBub2RlLnN1YnRyZWUgJiYgbyAmJiBvLnN1YnRyZWUpIHtcbiAgICAgICAgd2Fsayhub2RlLnN1YnRyZWUsIGNhbGxiYWNrLCBvLCBub2RlKTtcbiAgICB9XG4gICAgY2FsbGJhY2sobm9kZSwgcGFyZW50KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXdhbGsuanMubWFwIiwiLy8gRGl2aWRlIHRoZSBncmlkIGluIDQgcXVhZHJhbnRzXG5mdW5jdGlvbiBtYXJrUXVhZHJhbnQodGQ6IEhUTUxUYWJsZUNlbGxFbGVtZW50LCByb3c6IG51bWJlciwgY29sOiBudW1iZXIsIHNpemU6IG51bWJlcik6IHZvaWQge1xuICBjb25zdCBtaWRkbGUgPSBNYXRoLmZsb29yKHNpemUgLyAyKTtcbiAgbGV0IHF1YWRyYW50ID0gJyc7XG5cbiAgaWYgKHJvdyA8IG1pZGRsZSkge1xuICAgIHF1YWRyYW50ID0gY29sIDwgbWlkZGxlID8gJ29uZScgOiBjb2wgPiBtaWRkbGUgPyAndHdvJyA6ICcnO1xuICB9IGVsc2UgaWYgKHJvdyA+IG1pZGRsZSkge1xuICAgIHF1YWRyYW50ID0gY29sIDwgbWlkZGxlID8gJ3RocmVlJyA6IGNvbCA+IG1pZGRsZSA/ICdmb3VyJyA6ICcnO1xuICB9XG5cbiAgaWYgKHF1YWRyYW50KSB7XG4gICAgdGQuY2xhc3NMaXN0LmFkZChgcXVhZHJhbnQtJHtxdWFkcmFudH1gKTtcbiAgfVxufVxuXG4vLyBQdXQgYSByaG9tYnVzIGluIHRoZSBtaWRkbGVcbmZ1bmN0aW9uIG1hcmtSaG9tYnVzKHRkOiBIVE1MVGFibGVDZWxsRWxlbWVudCwgcm93OiBudW1iZXIsIGNvbDogbnVtYmVyLCBzaXplOiBudW1iZXIpOiB2b2lkIHtcbiAgY29uc3QgZGlmZiA9IHJvdyA8IHNpemUgLyAyID8gcm93IDogc2l6ZSAtIHJvdyAtIDE7XG4gIGNvbnN0IGhpZ2ggPSBzaXplIC8gMiArIGRpZmY7XG4gIGNvbnN0IGxvdyA9IHNpemUgLyAyIC0gZGlmZiAtIDE7XG5cbiAgaWYgKGxvdyA8PSBjb2wgJiYgY29sIDw9IGhpZ2gpIHtcbiAgICB0ZC5jbGFzc0xpc3QuYWRkKCdkaWFtb25kJyk7XG4gIH1cbn1cblxuLy8gQWxzbyBhIGNpcmNsZVxuZnVuY3Rpb24gbWFya0NpcmNsZSh0ZDogSFRNTFRhYmxlQ2VsbEVsZW1lbnQsIHJvdzogbnVtYmVyLCBjb2w6IG51bWJlciwgc2l6ZTogbnVtYmVyKTogdm9pZCB7XG4gIGNvbnN0IHJhZGl1cyA9IE1hdGguZmxvb3Ioc2l6ZSAvIDIpO1xuICBjb25zdCBjZW50ZXIgPSB7IHg6IHJhZGl1cywgeTogcmFkaXVzIH07XG4gIGNvbnN0IGRpc3RhbmNlID0gTWF0aC5zcXJ0KE1hdGgucG93KE1hdGguYWJzKGNlbnRlci54IC0gY29sKSwgMikgKyBNYXRoLnBvdyhNYXRoLmFicyhjZW50ZXIueSAtIHJvdyksIDIpKTtcblxuICBpZiAoZGlzdGFuY2UgPD0gcmFkaXVzKSB7XG4gICAgdGQuY2xhc3NMaXN0LmFkZCgnY2lyY2xlJyk7XG4gIH1cbn1cblxuLy8gbWFuIGZ1bmN0aW9uIHdoaWNoIGNyZWF0ZXMgdGhlIHBsYXlncm91bmQgZ3JpZFxuZXhwb3J0IGZ1bmN0aW9uIHNldFBsYXlncm91bmQodGFibGU6IEhUTUxUYWJsZUVsZW1lbnQsIHNpemU6IG51bWJlcik6IHZvaWQge1xuICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCBzaXplOyByb3crKykge1xuICAgIGNvbnN0IHRyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcbiAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCBzaXplOyBjb2wrKykge1xuICAgICAgY29uc3QgdGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuICAgICAgY29uc3Qgc3VtID0gcm93ICogc2l6ZSArIGNvbDtcblxuICAgICAgdGQuc2V0QXR0cmlidXRlKCdjbGFzcycsICd0aWxlJyk7XG4gICAgICB0ZC5zZXRBdHRyaWJ1dGUoJ2Qtcm93JywgYCR7cm93fWApO1xuICAgICAgdGQuc2V0QXR0cmlidXRlKCdkLWNvbCcsIGAke2NvbH1gKTtcbiAgICAgIHRkLnNldEF0dHJpYnV0ZSgnZC1zdW0nLCBgJHtzdW19YCk7XG4gICAgICB0ZC5zZXRBdHRyaWJ1dGUoJ2Qtb2RkJywgYCR7c3VtICUgMiA9PT0gMH1gKTtcbiAgICAgIHRkLnNldEF0dHJpYnV0ZSgnZC1ldmVuJywgYCR7c3VtICUgMiA9PT0gMX1gKTtcbiAgICAgIC8vIHRkLmlubmVyVGV4dCA9IGAke3N1bX1gO1xuXG4gICAgICBtYXJrUXVhZHJhbnQodGQsIHJvdywgY29sLCBzaXplKTtcbiAgICAgIG1hcmtDaXJjbGUodGQsIHJvdywgY29sLCBzaXplKTtcbiAgICAgIG1hcmtSaG9tYnVzKHRkLCByb3csIGNvbCwgc2l6ZSk7XG4gICAgICB0ci5hcHBlbmRDaGlsZCh0ZCk7XG4gICAgfVxuICAgIHRhYmxlLmFwcGVuZENoaWxkKHRyKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgU1RFUFNfQkVHSU4gfSBmcm9tICcuL3N0ZXBzLWJlZ2luJztcbmltcG9ydCB7IFNURVBTX1VOSU9OIH0gZnJvbSAnLi9zdGVwcy11bmlvbic7XG5pbXBvcnQgeyBTVEVQU19JTlRFUlNFQ1RJT04gfSBmcm9tICcuL3N0ZXBzLWludGVyc2VjdGlvbic7XG5cbmV4cG9ydCAqIGZyb20gJy4vcnVubmVyJztcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmV0dGllci9wcmV0dGllclxuZXhwb3J0IGNvbnN0IFNURVBTID0gW1xuICAuLi5TVEVQU19CRUdJTixcbiAgLi4uU1RFUFNfVU5JT04sXG4gIC4uLlNURVBTX0lOVEVSU0VDVElPTixcbl07XG4iLCJpbXBvcnQgeyBTdGVwIH3CoGZyb20gJy4vdHlwZXMnO1xuXG5mdW5jdGlvbiBnZXRSYW5kb21Db2xvcigpOiBzdHJpbmcge1xuICBjb25zdCBsZXR0ZXJzID0gJzAxMjM0NTY3ODlBQkNERUYnO1xuICBsZXQgY29sb3IgPSAnIyc7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNjsgaSsrKSB7XG4gICAgY29sb3IgKz0gbGV0dGVyc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxNildO1xuICB9XG4gIHJldHVybiBjb2xvcjtcbn1cblxuZnVuY3Rpb24gaXNDc3NldChzb3VyY2U6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gc291cmNlPy5fX3Byb3RvX18/LmNvbnN0cnVjdG9yPy5uYW1lID09PSAnQ3NzZXQnO1xufVxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJldHRpZXIvcHJldHRpZXJcbmV4cG9ydCBmdW5jdGlvbiBydW5TdGVwKFxuICBzdGVwOiBTdGVwLFxuICBjb21tZW50RWxlbTogSFRNTEVsZW1lbnQsXG4gIGNvZGVFbGVtOiBIVE1MRWxlbWVudCxcbiAgc3R5ZUVsZW06IEhUTUxFbGVtZW50XG4pOiB2b2lkIHtcbiAgLy8gUHV0IGNvbW1lbnRcbiAgY29tbWVudEVsZW0uaW5uZXJUZXh0ID0gc3RlcC5jb21tZW50O1xuXG4gIC8vIFNob3cgY29kZVxuICBjb25zdCBzb3VyY2UgPSBzdGVwLmNvZGUudG9TdHJpbmcoKTtcbiAgY29uc3QgbGluZXNPZkNvZGUgPSBzb3VyY2VcbiAgICAuc3BsaXQoJ1xcbicpXG4gICAgLnNsaWNlKDEsIC0xKVxuICAgIC5tYXAoKGxpbmUpID0+IHtcbiAgICAgIHJldHVybiBsaW5lLnJlcGxhY2UoL3JldHVybiAvZywgJycpO1xuICAgIH0pO1xuXG4gIGNvZGVFbGVtLmlubmVyVGV4dCA9IGxpbmVzT2ZDb2RlLmpvaW4oJ1xcbicpO1xuXG4gIC8vIENoYW5nZSBjb2xvciBpZiByZXR1cm5lZCBleHByZXNzaW9uIGlzIGEgQ3NzZXRcbiAgY29uc29sZS5sb2coJ2V2YWxTb3VyY2UnLCBzb3VyY2UpO1xuICBjb25zdCBldmFsUmVzdWx0ID0gZXZhbChgKCR7c291cmNlfSkoKWApO1xuICBjb25zb2xlLmxvZygnZXZhbFJlc3VsdCcsIGV2YWxSZXN1bHQudG9TdHJpbmcoKSk7XG4gIGNvbnN0IHN0eWxlVGV4dCA9IGAke2V2YWxSZXN1bHR9eyBiYWNrZ3JvdW5kLWNvbG9yOiAke2dldFJhbmRvbUNvbG9yKCl9OyB9YDtcblxuICBpZiAoaXNDc3NldChldmFsUmVzdWx0KSkge1xuICAgIHN0eWVFbGVtLmlubmVyVGV4dCA9IHN0eWxlVGV4dDtcbiAgfSBlbHNlIHtcbiAgICBzdHllRWxlbS5pbm5lclRleHQgPSAnJztcbiAgfVxufVxuIiwiaW1wb3J0IHsgU3RlcCB9IGZyb20gJy4vdHlwZXMnO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdmFyXG5kZWNsYXJlIHZhciBDc3NldDogYW55O1xuXG5leHBvcnQgY29uc3QgU1RFUFNfQkVHSU46IFN0ZXBbXSA9IFtcbiAge1xuICAgIGNvbW1lbnQ6ICdUaGVzZSBhcmUgdGhlIGNlbGxzIHdpdGggY2xhc3MgcXVhZHJhbnQtb25lJyxcbiAgICBjb2RlOiAoKSA9PiB7XG4gICAgICByZXR1cm4gbmV3IENzc2V0KCcucXVhZHJhbnQtb25lJyk7XG4gICAgfVxuICB9LFxuICB7XG4gICAgY29tbWVudDogJ1RoZXNlIGFyZSB0aGUgY2VsbHMgd2l0aCBjbGFzcyBxdWFkcmFudC10d28nLFxuICAgIGNvZGU6ICgpID0+IHtcbiAgICAgIHJldHVybiBuZXcgQ3NzZXQoJy5xdWFkcmFudC10d28nKTtcbiAgICB9XG4gIH0sXG4gIHtcbiAgICBjb21tZW50OiAnVGhlc2UgYXJlIHRoZSBjZWxscyB3aXRoIGNsYXNzIHF1YWRyYW50LXRocmVlJyxcbiAgICBjb2RlOiAoKSA9PiB7XG4gICAgICByZXR1cm4gbmV3IENzc2V0KCcucXVhZHJhbnQtdGhyZWUnKTtcbiAgICB9XG4gIH0sXG4gIHtcbiAgICBjb21tZW50OiAnVGhlc2UgYXJlIHRoZSBjZWxscyB3aXRoIGNsYXNzIHF1YWRyYW50LWZvdXInLFxuICAgIGNvZGU6ICgpID0+IHtcbiAgICAgIHJldHVybiBuZXcgQ3NzZXQoJy5xdWFkcmFudC1mb3VyJyk7XG4gICAgfVxuICB9LFxuICB7XG4gICAgY29tbWVudDogJ1RoZXNlIGFyZSB0aGUgY2VsbHMgd2l0aCBjbGFzcyBjaXJjbGUnLFxuICAgIGNvZGU6ICgpID0+IHtcbiAgICAgIHJldHVybiBuZXcgQ3NzZXQoJy5jaXJjbGUnKTtcbiAgICB9XG4gIH0sXG4gIHtcbiAgICBjb21tZW50OiAnVGhlc2UgYXJlIHRoZSBjZWxscyB3aXRoIGNsYXNzIGRpYW1vbmQnLFxuICAgIGNvZGU6ICgpID0+IHtcbiAgICAgIHJldHVybiBuZXcgQ3NzZXQoJy5kaWFtb25kJyk7XG4gICAgfVxuICB9LFxuICB7XG4gICAgY29tbWVudDogJ0NlbGxzIGFsc28gY29udGFpbiBhIGQtcm93IGF0dHJpYnV0ZSB3aXRoIHRoZSByb3cgbnVtYmVyIHRoZXkgaGF2ZScsXG4gICAgY29kZTogKCkgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBDc3NldCgnW2Qtcm93PTVdJyk7XG4gICAgfVxuICB9LFxuICB7XG4gICAgY29tbWVudDogJ0FuZCBjb250YWluIGEgZC1jb2wgYXR0cmlidXRlIHdpdGggdGhlIGNvbHVtbiBudW1iZXIgdGhleSBoYXZlJyxcbiAgICBjb2RlOiAoKSA9PiB7XG4gICAgICByZXR1cm4gbmV3IENzc2V0KCdbZC1jb2w9NTBdJyk7XG4gICAgfVxuICB9LFxuICB7XG4gICAgY29tbWVudDogJ0VhY2ggY2VsbCBvZiB0aGUgZ3JpZCBoYXMgaXRzIG51bWJlciBpbiBhIGQtc3VtIGF0dHJpYnV0ZScsXG4gICAgY29kZTogKCkgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBDc3NldCgnW2Qtc3VtPTUwXScpO1xuICAgIH1cbiAgfSxcbiAge1xuICAgIGNvbW1lbnQ6ICdBZGQgdGhlIGNlbGwgaGFzIG1hcmtlZCBpZiBpdHMgb2RkIG51bWJlcicsXG4gICAgY29kZTogKCkgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBDc3NldCgnW2Qtb2RkPXRydWVdJyk7XG4gICAgfVxuICB9LFxuICB7XG4gICAgY29tbWVudDogJ09yIGV2ZW4gbnVtYmVyJyxcbiAgICBjb2RlOiAoKSA9PiB7XG4gICAgICByZXR1cm4gbmV3IENzc2V0KCdbZC1ldmVuPXRydWVdJyk7XG4gICAgfVxuICB9LFxuXTtcbiIsImltcG9ydCB7IFN0ZXAgfSBmcm9tICcuL3R5cGVzJztcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXZhclxuZGVjbGFyZSB2YXIgQ3NzZXQ6IGFueTtcblxuZXhwb3J0IGNvbnN0IFNURVBTX0lOVEVSU0VDVElPTjogU3RlcFtdID0gW1xuICB7XG4gICAgY29tbWVudDogJ0ludGVyc2VjdGlvbiByZXR1cm5zIGEgc2V0IHdoaWNoIGFsbCBlbGVtZW50cyBhcmUgZnJvbSBib3RoIHNldHMnLFxuICAgIGNvZGU6ICgpID0+IHtcbiAgICAgIGNvbnN0IHF1YWRyYW50T25lID0gbmV3IENzc2V0KCcucXVhZHJhbnQtb25lJyk7XG4gICAgICBjb25zdCByaG9tYnVzID0gbmV3IENzc2V0KCcucmhvbWJ1cycpO1xuXG4gICAgICByZXR1cm4gcXVhZHJhbnRPbmUuaW50ZXJzZWN0aW9uKHJob21idXMpO1xuICAgIH0sXG4gIH0sXG5dO1xuIiwiaW1wb3J0IHsgU3RlcCB9IGZyb20gJy4vdHlwZXMnO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdmFyXG5kZWNsYXJlIHZhciBDc3NldDogYW55O1xuXG5leHBvcnQgY29uc3QgU1RFUFNfVU5JT046IFN0ZXBbXSA9IFtcbiAge1xuICAgIGNvbW1lbnQ6ICdVbmlvbiBpcyBhIHN0cmFpZ2h0IGZvcndhcmQgbWV0aG9kIHVzZWQgdG8gam9pbiBzZXRzJyxcbiAgICBjb2RlOiAoKSA9PiB7XG4gICAgICBjb25zdCBxdWFkcmFudE9uZSA9IG5ldyBDc3NldCgnLnF1YWRyYW50LW9uZScpO1xuICAgICAgY29uc3QgcXVhZHJhbnRUd28gPSBuZXcgQ3NzZXQoJy5xdWFkcmFudC10d28nKTtcblxuICAgICAgcmV0dXJuIHF1YWRyYW50T25lLnVuaW9uKHF1YWRyYW50VHdvKTtcbiAgICB9LFxuICB9LFxuICB7XG4gICAgY29tbWVudDogJ1lvdSBjYW4gZG8gYW4gdW5pb24gb2YgbWFueSBzZXRzJyxcbiAgICBjb2RlOiAoKSA9PiB7XG4gICAgICBjb25zdCBxdWFkcmFudE9uZSA9IG5ldyBDc3NldCgnLnF1YWRyYW50LW9uZScpO1xuICAgICAgY29uc3QgcXVhZHJhbnRUd28gPSBuZXcgQ3NzZXQoJy5xdWFkcmFudC10d28nKTtcbiAgICAgIGNvbnN0IGNpcmNsZSA9IG5ldyBDc3NldCgnLmNpcmNsZScpO1xuXG4gICAgICByZXR1cm4gcXVhZHJhbnRPbmUudW5pb24ocXVhZHJhbnRUd28pLnVuaW9uKGNpcmNsZSk7XG4gICAgfSxcbiAgfSxcbl07XG4iLCJpbXBvcnQgeyBDc3NNYXRjaGVyU3ltYm9sIH0gZnJvbSAnLi90eXBlcyc7XG5cbmV4cG9ydCBjbGFzcyBDc3NBdHRyaWJ1dGVNYXRjaGVyIHtcbiAgcmVhZG9ubHkgc3ltYm9sITogQ3NzTWF0Y2hlclN5bWJvbDtcbiAgdmFsdWU6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcih2YWw6IHN0cmluZykge1xuICAgIHRoaXMudmFsdWUgPSB2YWw7XG4gIH1cblxuICBzdXBlcnNldE9mKG1hdGNoZXI6IENzc0F0dHJpYnV0ZU1hdGNoZXIpOiBib29sZWFuIHtcbiAgICB0aHJvdyBFcnJvcihgbm8gc3VwZXJzZXRPZiBtZXRob2QgaW1wbGVtZW50ZWQgZm9yIG1hdGNoZXIgc3ltYm9sICR7dGhpcy5zeW1ib2x9YCk7XG4gIH1cblxuICBzdWJzZXRPZihtYXRjaGVyOiBDc3NBdHRyaWJ1dGVNYXRjaGVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIG1hdGNoZXIuc3VwZXJzZXRPZih0aGlzKTtcbiAgfVxuXG4gIHVuaW9uKG1hdGNoZXI6IENzc0F0dHJpYnV0ZU1hdGNoZXIpOiBzdHJpbmcgfCBudWxsIHtcbiAgICBpZiAodGhpcy5zdXBlcnNldE9mKG1hdGNoZXIpKSB7XG4gICAgICByZXR1cm4gYCR7dGhpc31gO1xuICAgIH0gZWxzZSBpZiAobWF0Y2hlci5zdXBlcnNldE9mKHRoaXMpKSB7XG4gICAgICByZXR1cm4gYCR7bWF0Y2hlcn1gO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgaW50ZXJzZWN0aW9uKG1hdGNoZXI6IENzc0F0dHJpYnV0ZU1hdGNoZXIpOiBzdHJpbmcgfCBudWxsIHwgdm9pZCB7XG4gICAgaWYgKHRoaXMuc3VwZXJzZXRPZihtYXRjaGVyKSkge1xuICAgICAgcmV0dXJuIGAke21hdGNoZXJ9YDtcbiAgICB9IGVsc2UgaWYgKG1hdGNoZXIuc3VwZXJzZXRPZih0aGlzKSkge1xuICAgICAgcmV0dXJuIGAke3RoaXN9YDtcbiAgICB9XG5cbiAgICAvLyBFcXVhbHMgaW50ZXJzZWN0IHdpdGggYW55IG90aGVyIG1hdGNoZXJcbiAgICAvLyBSZXR1cm4gdm9pZCBpbmRpY2F0aW5nIHRoZSBpbnRlcnNlY3Rpb24gaXMgYW4gZW1wdHkgc2V0XG4gICAgaWYgKFt0aGlzLnN5bWJvbCwgbWF0Y2hlci5zeW1ib2xdLmluZGV4T2YoQ3NzTWF0Y2hlclN5bWJvbC5FcXVhbCkgIT09IC0xKSB7XG4gICAgICBpZiAobWF0Y2hlci52YWx1ZSAhPT0gdGhpcy52YWx1ZSkge1xuICAgICAgICByZXR1cm4gdm9pZCAwO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5zeW1ib2wgPT09IENzc01hdGNoZXJTeW1ib2wuUHJlc2VuY2UpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgcmV0dXJuIGAke3RoaXMuc3ltYm9sfT1cIiR7dGhpcy52YWx1ZX1cImAucmVwbGFjZSgvXj0vLCAnJyk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENzc0F0dHJpYnV0ZU1hdGNoZXIgfSBmcm9tICcuL2Nzcy1hdHRyaWJ1dGUtbWF0Y2hlcic7XG5pbXBvcnQgeyBDc3NNYXRjaGVyRmFjdG9yeSB9IGZyb20gJy4vbWF0Y2hlcnMvY3NzLW1hdGNoZXItZmFjdG9yeSc7XG5cbmV4cG9ydCBjbGFzcyBDc3NBdHRyaWJ1dGUge1xuICBuYW1lOiBzdHJpbmc7XG4gIG1hdGNoZXJzOiBDc3NBdHRyaWJ1dGVNYXRjaGVyW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihwYXJ0czogc3RyaW5nW10pIHtcbiAgICBjb25zdCBbbmFtZSwgc3ltYm9sID0gJycsIHZhbHVlXSA9IHBhcnRzO1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG5cbiAgICBjb25zdCBtYXRjaGVyID0gQ3NzTWF0Y2hlckZhY3RvcnkuY3JlYXRlKGAke3N5bWJvbH0ke3ZhbHVlfWApO1xuICAgIGxldCBpbnRlcnNlY3Rpb247XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubWF0Y2hlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGludGVyc2VjdGlvbiA9IG1hdGNoZXIuaW50ZXJzZWN0aW9uKHRoaXMubWF0Y2hlcnNbaV0pO1xuXG4gICAgICBpZiAoaW50ZXJzZWN0aW9uKSB7XG4gICAgICAgIHRoaXMubWF0Y2hlcnNbaV0gPSBDc3NNYXRjaGVyRmFjdG9yeS5jcmVhdGUoaW50ZXJzZWN0aW9uKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFpbnRlcnNlY3Rpb24pIHtcbiAgICAgIHRoaXMubWF0Y2hlcnMucHVzaChtYXRjaGVyKTtcbiAgICB9XG4gIH1cblxuICBzdXBlcnNldE9mKGF0dHI6IENzc0F0dHJpYnV0ZSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHRoaXNNYXRjaGVycyA9IHRoaXMubWF0Y2hlcnM7XG4gICAgY29uc3QgYXR0ck1hdGNoZXJzID0gYXR0ci5tYXRjaGVycztcblxuICAgIC8vIFRvIGJlIGEgc3VwZXJzZXQgYWxsIG1hdGNoZXJzIGluIHRoaXNcbiAgICAvLyAtIG11c3QgYmUgYSBzdXBlcnNldCBvZiBhdCBsZWFzdCBvbmUgYXR0ck1hdGNoZXJcbiAgICAvLyAtIG11c3Qgbm90IGhhdmUgYSB2b2lkIGludGVyc2VjdGlvbiB3aXRoIGFueSBhdHRyTWF0Y2hlclxuICAgIGZvciAoY29uc3QgbWF0Y2hlciBvZiB0aGlzTWF0Y2hlcnMpIHtcbiAgICAgIGNvbnN0IHN1cGVyc2V0SW5kZXggPSBhdHRyTWF0Y2hlcnMuZmluZEluZGV4KChhdHRyTWF0Y2hlcikgPT4gbWF0Y2hlci5zdXBlcnNldE9mKGF0dHJNYXRjaGVyKSk7XG4gICAgICBjb25zdCB2b2lkSW5kZXggPSBhdHRyTWF0Y2hlcnMuZmluZEluZGV4KChhdHRyTWF0Y2hlcikgPT4gbWF0Y2hlci5pbnRlcnNlY3Rpb24oYXR0ck1hdGNoZXIpID09PSB2b2lkIDApO1xuXG4gICAgICBpZiAoc3VwZXJzZXRJbmRleCA9PT0gLTEgfHwgdm9pZEluZGV4ICE9PSAtMSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBzdWJzZXRPZihhdHRyOiBDc3NBdHRyaWJ1dGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gYXR0ci5zdXBlcnNldE9mKHRoaXMpO1xuICB9XG5cbiAgdW5pb24oYXR0cjogQ3NzQXR0cmlidXRlKTogQ3NzQXR0cmlidXRlIHwgbnVsbCB7XG4gICAgY29uc3QgdW5pb24gPSB0aGlzLnN1cGVyc2V0T2YoYXR0cikgPyB0aGlzIDogYXR0ci5zdXBlcnNldE9mKHRoaXMpID8gYXR0ciA6IG51bGw7XG5cbiAgICByZXR1cm4gdW5pb247XG4gIH1cblxuICBpbnRlcnNlY3Rpb24oYXR0cjogQ3NzQXR0cmlidXRlKTogQ3NzQXR0cmlidXRlIHwgdm9pZCB7XG4gICAgaWYgKHRoaXMuc3VwZXJzZXRPZihhdHRyKSkge1xuICAgICAgcmV0dXJuIGF0dHI7XG4gICAgfVxuXG4gICAgaWYgKGF0dHIuc3VwZXJzZXRPZih0aGlzKSkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgY29uc3QgdGhpc01hdGNoZXJzID0gdGhpcy5tYXRjaGVycztcbiAgICBjb25zdCBhdHRyTWF0Y2hlcnMgPSBhdHRyLm1hdGNoZXJzO1xuICAgIGNvbnN0IGludGVyc2VjdGlvbk1hdGNoZXJzOiBDc3NBdHRyaWJ1dGVNYXRjaGVyW10gPSBbXTtcblxuICAgIGZvciAoY29uc3QgbWF0Y2hlciBvZiB0aGlzTWF0Y2hlcnMpIHtcbiAgICAgIGNvbnN0IHZvaWRJbmRleCA9IGF0dHJNYXRjaGVycy5maW5kSW5kZXgoKGF0dHJNYXRjaGVyKSA9PiBtYXRjaGVyLmludGVyc2VjdGlvbihhdHRyTWF0Y2hlcikgPT09IHZvaWQgMCk7XG5cbiAgICAgIGlmICh2b2lkSW5kZXggIT09IC0xKSB7XG4gICAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGludGVyc2VjdEluZGV4ID0gYXR0ck1hdGNoZXJzLmZpbmRJbmRleCgoYXR0ck1hdGNoZXIpID0+ICEhbWF0Y2hlci5pbnRlcnNlY3Rpb24oYXR0ck1hdGNoZXIpKTtcblxuICAgICAgaWYgKGludGVyc2VjdEluZGV4ICE9PSAtMSkge1xuICAgICAgICBjb25zdCBtYXRjaGVyU3RyaW5nID0gbWF0Y2hlci5pbnRlcnNlY3Rpb24oYXR0ck1hdGNoZXJzW2ludGVyc2VjdEluZGV4XSk7XG5cbiAgICAgICAgaW50ZXJzZWN0aW9uTWF0Y2hlcnMucHVzaChDc3NNYXRjaGVyRmFjdG9yeS5jcmVhdGUoYCR7bWF0Y2hlclN0cmluZ31gKSk7XG4gICAgICAgIGF0dHJNYXRjaGVycy5zcGxpY2UoaW50ZXJzZWN0SW5kZXgsIDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW50ZXJzZWN0aW9uTWF0Y2hlcnMucHVzaChtYXRjaGVyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IG1hdGNoZXIgb2YgYXR0ck1hdGNoZXJzKSB7XG4gICAgICBpbnRlcnNlY3Rpb25NYXRjaGVycy5wdXNoKG1hdGNoZXIpO1xuICAgIH1cblxuICAgIGNvbnN0IGludGVyc2VjdGlvbkF0dHIgPSBuZXcgQ3NzQXR0cmlidXRlKFt0aGlzLm5hbWVdKTtcbiAgICBpbnRlcnNlY3Rpb25BdHRyLm1hdGNoZXJzID0gaW50ZXJzZWN0aW9uTWF0Y2hlcnM7XG5cbiAgICByZXR1cm4gaW50ZXJzZWN0aW9uQXR0cjtcbiAgfVxuXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubWF0Y2hlcnNcbiAgICAgIC5tYXAoKG1hdGNoZXIpID0+IGAke21hdGNoZXJ9YClcbiAgICAgIC5zb3J0KClcbiAgICAgIC5yZWR1Y2UoKHByZXYsIG1hdGNoZXIpID0+IGAke3ByZXZ9WyR7dGhpcy5uYW1lfSR7bWF0Y2hlcn1dYCwgJycpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDc3NBdHRyaWJ1dGUgfSBmcm9tICcuL2Nzcy1hdHRyaWJ1dGUnO1xuXG5leHBvcnQgY2xhc3MgQ3NzUnVsZSB7XG4gIHByaXZhdGUgX2lkID0gJyc7XG4gIHByaXZhdGUgX2VsZW1lbnQgPSAnJztcbiAgY2xhc3NlczogU2V0PHN0cmluZz4gPSBuZXcgU2V0KCk7XG4gIGF0dHJpYnM6IE1hcDxzdHJpbmcsIENzc0F0dHJpYnV0ZT4gPSBuZXcgTWFwKCk7XG5cbiAgc2V0IGlkKGlkOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5faWQpIHtcbiAgICAgIHRocm93IFN5bnRheEVycm9yKGBJZGVudGlmaWVyIGFscmVhZHkgc2V0IHRvICR7dGhpcy5pZH0uYCk7XG4gICAgfVxuICAgIHRoaXMuX2lkID0gaWQ7XG4gIH1cblxuICBnZXQgaWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5faWQ7XG4gIH1cblxuICBzZXQgZWxlbWVudChlbGVtZW50OiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5hdHRyaWJzLnNpemUpIHtcbiAgICAgIHRocm93IFN5bnRheEVycm9yKCdFbGVtZW50cyBjYW5ub3QgYmUgZGVmaW5lZCBhZnRlciBhdHRyaWJ1dGVzLicpO1xuICAgIH1cbiAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgfVxuICBnZXQgZWxlbWVudCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9lbGVtZW50IHx8ICcqJztcbiAgfVxuXG4gIGFkZEF0dHJpYnV0ZShhdHRyaWJ1dGU6IENzc0F0dHJpYnV0ZSk6IHZvaWQge1xuICAgIGNvbnN0IHByZXZBdHRyaWJ1dGUgPSB0aGlzLmF0dHJpYnMuZ2V0KGF0dHJpYnV0ZS5uYW1lKTtcblxuICAgIGlmIChwcmV2QXR0cmlidXRlKSB7XG4gICAgICBjb25zdCBtZXJnZWRBdHRyaWJ1dGUgPSBwcmV2QXR0cmlidXRlLmludGVyc2VjdGlvbihhdHRyaWJ1dGUpO1xuXG4gICAgICBpZiAobWVyZ2VkQXR0cmlidXRlID09PSB2b2lkIDApIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIHNlbGVjdG9yIGRlZmluZXMgYW4gZW1wdHkgc2V0LicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hdHRyaWJzLnNldChwcmV2QXR0cmlidXRlLm5hbWUsIG1lcmdlZEF0dHJpYnV0ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYXR0cmlicy5zZXQoYXR0cmlidXRlLm5hbWUsIGF0dHJpYnV0ZSk7XG4gICAgfVxuICB9XG5cbiAgYWRkQ2xhc3MoY2xhc3NOYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmNsYXNzZXMuYWRkKGNsYXNzTmFtZSk7XG4gIH1cblxuICBlcXVhbHMocnVsZTogQ3NzUnVsZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBgJHt0aGlzfWAgPT09IGAke3J1bGV9YDtcbiAgfVxuXG4gIHN1cGVyc2V0T2YocnVsZTogQ3NzUnVsZSk6IGJvb2xlYW4ge1xuICAgIC8vIEVsZW1lbnRcbiAgICBpZiAodGhpcy5lbGVtZW50ICE9PSAnKicgJiYgdGhpcy5lbGVtZW50ICE9PSBydWxlLmVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBJRFxuICAgIGlmICh0aGlzLmlkICYmIHRoaXMuaWQgIT09IHJ1bGUuaWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBjbGFzc2VzXG4gICAgZm9yIChjb25zdCBjIG9mIHRoaXMuY2xhc3Nlcykge1xuICAgICAgaWYgKCFydWxlLmNsYXNzZXMuaGFzKGMpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBdHRyaWJ1dGVzXG4gICAgLy8gTW9yZSBhdHRyaWJzIG1lYW4gbW9yZSBzcGVjaWZpYyBzbyBpdCBjYW5ub3QgYmUgc3VwZXJzZXRcbiAgICBpZiAodGhpcy5hdHRyaWJzLnNpemUgPiBydWxlLmF0dHJpYnMuc2l6ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBDaGVjayBhdHRyaWJ1dGVzXG4gICAgZm9yIChjb25zdCBhdHRyIG9mIHRoaXMuYXR0cmlicy52YWx1ZXMoKSkge1xuICAgICAgY29uc3QgcnVsZUF0dHIgPSBydWxlLmF0dHJpYnMuZ2V0KGF0dHIubmFtZSk7XG5cbiAgICAgIC8vIGF0dHJpYiBzaG91bGQgYmUgZGVmaW5lZCBpbiBib3RoIGFuZCBpbmNsdWRlXG4gICAgICBpZiAocnVsZUF0dHIgJiYgIWF0dHIuc3VwZXJzZXRPZihydWxlQXR0cikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSBlbHNlIGlmICghcnVsZUF0dHIpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgc3Vic2V0T2YocnVsZTogQ3NzUnVsZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBydWxlLnN1cGVyc2V0T2YodGhpcyk7XG4gIH1cblxuICB1bmlvbihydWxlOiBDc3NSdWxlKTogQ3NzUnVsZVtdIHtcbiAgICBjb25zdCB1bmlvbiA9IHRoaXMuc3VwZXJzZXRPZihydWxlKSA/IFt0aGlzXSA6IHJ1bGUuc3VwZXJzZXRPZih0aGlzKSA/IFtydWxlXSA6IFt0aGlzLCBydWxlXTtcblxuICAgIHJldHVybiB1bmlvbjtcbiAgfVxuXG4gIGludGVyc2VjdGlvbihydWxlOiBDc3NSdWxlKTogQ3NzUnVsZSB8IHZvaWQge1xuICAgIGlmICh0aGlzLmlkICYmIHJ1bGUuaWQgJiYgdGhpcy5pZCAhPT0gcnVsZS5pZCkge1xuICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICB9XG4gICAgaWYgKHRoaXMuZWxlbWVudCAhPT0gcnVsZS5lbGVtZW50ICYmIHRoaXMuZWxlbWVudCAhPT0gJyonICYmIHJ1bGUuZWxlbWVudCAhPT0gJyonKSB7XG4gICAgICByZXR1cm4gdm9pZCAwO1xuICAgIH1cbiAgICBjb25zdCBpbnRlcnNlY3Rpb24gPSBuZXcgQ3NzUnVsZSgpO1xuXG4gICAgaW50ZXJzZWN0aW9uLmlkID0gdGhpcy5pZCB8fCBydWxlLmlkO1xuXG4gICAgaWYgKHRoaXMuZWxlbWVudCAhPT0gJyonKSB7XG4gICAgICBpbnRlcnNlY3Rpb24uZWxlbWVudCA9IHRoaXMuZWxlbWVudDtcbiAgICB9XG5cbiAgICB0aGlzLmNsYXNzZXMuZm9yRWFjaCgoY2xzKSA9PiBpbnRlcnNlY3Rpb24uYWRkQ2xhc3MoY2xzKSk7XG4gICAgcnVsZS5jbGFzc2VzLmZvckVhY2goKGNscykgPT4gaW50ZXJzZWN0aW9uLmFkZENsYXNzKGNscykpO1xuXG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuYXR0cmlicy5mb3JFYWNoKChhdHRyKSA9PiBpbnRlcnNlY3Rpb24uYWRkQXR0cmlidXRlKGF0dHIpKTtcbiAgICAgIHJ1bGUuYXR0cmlicy5mb3JFYWNoKChhdHRyKSA9PiBpbnRlcnNlY3Rpb24uYWRkQXR0cmlidXRlKGF0dHIpKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICB9XG5cbiAgICByZXR1cm4gaW50ZXJzZWN0aW9uO1xuICB9XG5cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICBjb25zdCBjbGFzc2VzID0gQXJyYXkuZnJvbSh0aGlzLmNsYXNzZXMpLnNvcnQoKTtcbiAgICBjb25zdCBhdHRyaWJzID0gQXJyYXkuZnJvbSh0aGlzLmF0dHJpYnMua2V5cygpKVxuICAgICAgLnNvcnQoKVxuICAgICAgLm1hcCgobikgPT4gdGhpcy5hdHRyaWJzLmdldChuKSkgYXMgQ3NzQXR0cmlidXRlW107XG5cbiAgICBjb25zdCBzdHJDbGFzc2VzID0gY2xhc3Nlcy5tYXAoKG4pID0+IGAuJHtufWApO1xuICAgIGNvbnN0IHN0ckF0dHJpYnMgPSBhdHRyaWJzLm1hcCgoYSkgPT4gYCR7YX1gKTtcbiAgICBjb25zdCBzdHJJZCA9IHRoaXMuaWQgPyBgIyR7dGhpcy5pZH1gIDogJyc7XG5cbiAgICByZXR1cm4gYCR7dGhpcy5lbGVtZW50fSR7c3RySWR9JHtzdHJDbGFzc2VzLmpvaW4oJycpfSR7c3RyQXR0cmlicy5qb2luKCcnKX1gO1xuICB9XG59XG4iLCJpbXBvcnQgeyBUb2tlbiB9IGZyb20gJ3BhcnNlbC10cyc7XG5cbmltcG9ydCB7IENzc1J1bGUgfSBmcm9tICcuL2Nzcy1ydWxlJztcbmltcG9ydCB7IENvbWJpbmF0b3JzIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBDc3NBdHRyaWJ1dGUgfSBmcm9tICcuL2Nzcy1hdHRyaWJ1dGUnO1xuXG5pbnRlcmZhY2UgQ29tYmluZWRSdWxlIHtcbiAgcnVsZTogQ3NzUnVsZTtcbiAgY29tYjogQ29tYmluYXRvcnM7XG59XG5cbnR5cGUgU2VsZWN0b3JMZXZlbCA9IEFycmF5PENvbWJpbmVkUnVsZT47XG5cbmNvbnN0IGlzQW5jZXN0b3IgPSAoY29tYmluZWRSdWxlOiBDb21iaW5lZFJ1bGUpOiBib29sZWFuID0+IHtcbiAgcmV0dXJuIFtDb21iaW5hdG9ycy5ERVNDRU5EQU5ULCBDb21iaW5hdG9ycy5DSElMRF0uaW5kZXhPZihjb21iaW5lZFJ1bGUuY29tYikgIT09IC0xO1xufTtcblxuZXhwb3J0IGNsYXNzIENzc1NlbGVjdG9yIHtcbiAgbGV2ZWxzOiBTZWxlY3RvckxldmVsW10gPSBbW11dO1xuXG4gIGNvbnN0cnVjdG9yKHRva2VuczogVG9rZW5bXSkge1xuICAgIGxldCBydWxlID0gbmV3IENzc1J1bGUoKTtcblxuICAgIHRva2Vucy5mb3JFYWNoKCh0b2tlbikgPT4ge1xuICAgICAgY29uc3QgeyBjb250ZW50IH0gPSB0b2tlbjtcblxuICAgICAgc3dpdGNoICh0b2tlbi50eXBlKSB7XG4gICAgICAgIGNhc2UgJ2lkJzpcbiAgICAgICAgICBydWxlLmlkID0gY29udGVudDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAndHlwZSc6XG4gICAgICAgIGNhc2UgJ3VuaXZlcnNhbCc6XG4gICAgICAgICAgcnVsZS5lbGVtZW50ID0gY29udGVudDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnY2xhc3MnOlxuICAgICAgICAgIHJ1bGUuYWRkQ2xhc3ModG9rZW4ubmFtZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2F0dHJpYnV0ZSc6XG4gICAgICAgICAgcnVsZS5hZGRBdHRyaWJ1dGUobmV3IENzc0F0dHJpYnV0ZShbdG9rZW4ubmFtZSwgYCR7dG9rZW4ub3BlcmF0b3J9YCwgYCR7dG9rZW4udmFsdWV9YF0pKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnY29tYmluYXRvcic6XG4gICAgICAgICAgY29uc3QgY29tYiA9IGNvbnRlbnQgYXMgQ29tYmluYXRvcnM7XG4gICAgICAgICAgY29uc3QgY29tYlJ1bGUgPSB7IHJ1bGUsIGNvbWIgfTtcbiAgICAgICAgICBydWxlID0gbmV3IENzc1J1bGUoKTtcbiAgICAgICAgICB0aGlzLmFkZFJ1bGUoY29tYlJ1bGUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihgVW5rbm93biB0b2tlbiAke3Rva2VuLmNvbnRlbnR9IGF0IHBvc2l0aW9uICR7dG9rZW4ucG9zWzBdfWApO1xuICAgICAgfVxuICAgIH0pO1xuICAgIC8vIGxhc3QgcnVsZSBzaG91bGQgYmUgcHVzaGVkIGluIHRoZSBsYXllclxuICAgIHRoaXMuYWRkUnVsZSh7IHJ1bGUsIGNvbWI6IENvbWJpbmF0b3JzLk5PTkUgfSk7XG4gIH1cblxuICBhZGRSdWxlKGNvbWJSdWxlOiBDb21iaW5lZFJ1bGUpOiB2b2lkIHtcbiAgICBjb25zdCBjdXJyZW50TGV2ZWwgPSB0aGlzLmxldmVsc1t0aGlzLmxldmVscy5sZW5ndGggLSAxXTtcblxuICAgIGlmIChpc0FuY2VzdG9yKGNvbWJSdWxlKSkge1xuICAgICAgY3VycmVudExldmVsLnB1c2goY29tYlJ1bGUpO1xuICAgICAgdGhpcy5sZXZlbHMucHVzaChbXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN1cnJlbnRMZXZlbC5wdXNoKGNvbWJSdWxlKTtcbiAgICB9XG4gIH1cblxuICBzdXBlcnNldE9mKHNlbGVjdG9yOiBDc3NTZWxlY3Rvcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdG9yU3VwZXJzZXQodGhpcy5sZXZlbHMsIHNlbGVjdG9yLmxldmVscyk7XG4gIH1cblxuICBzdWJzZXRPZihzZWxlY3RvcjogQ3NzU2VsZWN0b3IpOiBib29sZWFuIHtcbiAgICByZXR1cm4gc2VsZWN0b3Iuc3VwZXJzZXRPZih0aGlzKTtcbiAgfVxuXG4gIGludGVyc2VjdGlvbihzZWxlY3RvcjogQ3NzU2VsZWN0b3IpOiBDc3NTZWxlY3RvciB8IHZvaWQge1xuICAgIGlmICh0aGlzLnN1cGVyc2V0T2Yoc2VsZWN0b3IpKSB7XG4gICAgICByZXR1cm4gc2VsZWN0b3I7XG4gICAgfVxuXG4gICAgaWYgKHNlbGVjdG9yLnN1cGVyc2V0T2YodGhpcykpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8vIFRPRE86IG90aGVyIHBvc3NpYmxlIGNhc2VzPz9cbiAgICByZXR1cm4gdm9pZCAwO1xuICB9XG5cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICBsZXQgcmVzdWx0ID0gJyc7XG4gICAgdGhpcy5sZXZlbHMuZm9yRWFjaCgobGV2ZWwpID0+IHtcbiAgICAgIGxldmVsLmZvckVhY2goKGNvbWJpbmVkUnVsZSkgPT4ge1xuICAgICAgICBjb25zdCBjb21iID0gY29tYmluZWRSdWxlLmNvbWIgPyBgICR7Y29tYmluZWRSdWxlLmNvbWJ9IGAgOiAnICc7XG4gICAgICAgIHJlc3VsdCArPSBgJHtjb21iaW5lZFJ1bGUucnVsZX0ke2NvbWJ9YDtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc3VsdC50cmltKCk7XG4gIH1cblxuICBwcml2YXRlIHNlbGVjdG9yU3VwZXJzZXQoc2VsZWN0b3JPbmU6IFNlbGVjdG9yTGV2ZWxbXSwgc2VsZWN0b3JUd286IFNlbGVjdG9yTGV2ZWxbXSk6IGJvb2xlYW4ge1xuICAgIC8vIEJhc2UgY2FzZTogY29udGFpbmVyIGlzIGVtcHR5IChtZWFuaW5nIHdlIGhhdmUgY2hlY2tlZCBhbGwgaXRzIHJ1bGVzKVxuICAgIC8vICpcbiAgICAvLyBhXG4gICAgaWYgKHNlbGVjdG9yT25lLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gQmFzZSBjYXNlOiBzZWxlY3RvclR3byBpcyBlbXB0eSAobWVhbmluZyB3ZSBoYXZlIGNoZWNrZWQgYWxsIGl0cyBydWxlcylcbiAgICAvLyBhXG4gICAgLy8gKlxuICAgIGlmIChzZWxlY3RvclR3by5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBCYXNlIGNhc2U6IHNlbGVjdG9yT25lIGlzIG1vcmUgc3BlY2lmaWMgdGhhbiBzZWxlY3RvclR3b1xuICAgIC8vIGEgYiBjXG4gICAgLy8gYSBiXG4gICAgaWYgKHNlbGVjdG9yT25lLmxlbmd0aCA+IHNlbGVjdG9yVHdvLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IGxheWVyT25lID0gc2VsZWN0b3JPbmVbc2VsZWN0b3JPbmUubGVuZ3RoIC0gMV07XG4gICAgY29uc3QgbGF5ZXJUd28gPSBzZWxlY3RvclR3b1tzZWxlY3RvclR3by5sZW5ndGggLSAxXTtcblxuICAgIC8vIEJhc2UgY2FzZTogbGF5ZXJPbmUgaGFzIHN0cm9uZ2VyIHJlbGF0aW9uc2hpcCB3aXRoIGRlc2NlbmRhbnQgdGhhbiBsYXllclR3b1xuICAgIC8vIGEgPiBiID4gKGRcbiAgICAvLyBhID4gYiAoZFxuICAgIGNvbnN0IGRlc2NlbmRhbnRDb21iT25lID0gbGF5ZXJPbmVbbGF5ZXJPbmUubGVuZ3RoIC0gMV0uY29tYjtcbiAgICBjb25zdCBkZXNjZW5kYW50Q29tYlR3byA9IGxheWVyVHdvW2xheWVyVHdvLmxlbmd0aCAtIDFdLmNvbWI7XG4gICAgaWYgKGRlc2NlbmRhbnRDb21iT25lID09PSBDb21iaW5hdG9ycy5DSElMRCAmJiBkZXNjZW5kYW50Q29tYlR3byA9PT0gQ29tYmluYXRvcnMuREVTQ0VOREFOVCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIGEgPiBiID4gY1xuICAgIC8vIGEgPiBiID4gYyA+IGQgPiBlXG4gICAgaWYgKHRoaXMubGV2ZWxTdXBlcnNldChsYXllck9uZSwgbGF5ZXJUd28pKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZWxlY3RvclN1cGVyc2V0KHNlbGVjdG9yT25lLnNsaWNlKDAsIC0xKSwgc2VsZWN0b3JUd28uc2xpY2UoMCwgLTEpKTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgZGVlcGVzdCBsYXllciBpc24ndCBhIHN1cGVyc2V0IHRoZW4gc2VsZWN0b3IgY2FuJ3QgYmVcbiAgICAvLyBjID4gZVxuICAgIC8vIGEgPiBjID4gKGRcbiAgICAvLyBJZiBDSElMRCBpdCBzaG91bGQgaGFkIG1hdGNoIGJlZm9yZVxuICAgIC8vIGEgPiBiID4gKGRcbiAgICAvLyBhID4gYyA+IChkXG4gICAgaWYgKGRlc2NlbmRhbnRDb21iT25lID09PSBDb21iaW5hdG9ycy5DSElMRCB8fCBkZXNjZW5kYW50Q29tYk9uZSA9PT0gQ29tYmluYXRvcnMuTk9ORSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIEZvciBnZW5lcmljIHNpYmxpbmcgd2FsayB1cCB0aGUgc2Vjb25kIGxpc3Qgb2YgcnVsZXNcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RvclN1cGVyc2V0KHNlbGVjdG9yT25lLCBzZWxlY3RvclR3by5zbGljZSgwLCAtMSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBsZXZlbFN1cGVyc2V0KGxldmVsT25lOiBTZWxlY3RvckxldmVsLCBsZXZlbFR3bzogU2VsZWN0b3JMZXZlbCk6IGJvb2xlYW4ge1xuICAgIC8vIEJhc2UgY2FzZTogY29udGFpbmVyIGlzIGVtcHR5IChtZWFuaW5nIHdlIGhhdmUgY2hlY2tlZCBhbGwgaXRzIHJ1bGVzKVxuICAgIGlmIChsZXZlbE9uZS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIEJhc2UgY2FzZTogbGV2ZWxUd28gaXMgZW1wdHkgKG1lYW5pbmcgd2UgaGF2ZSBjaGVja2VkIGFsbCBpdHMgbGF5ZXIpXG4gICAgaWYgKGxldmVsVHdvLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIEJhc2UgY2FzZTogbGV2ZWxPbmUgaXMgbW9yZSBzcGVjaWZpYyB0aGFuIGxldmVsVHdvXG4gICAgaWYgKGxldmVsT25lLmxlbmd0aCA+IGxldmVsVHdvLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbWJpbmVkUnVsZU9uZSA9IGxldmVsT25lW2xldmVsT25lLmxlbmd0aCAtIDFdO1xuICAgIGNvbnN0IGNvbWJpbmVkUnVsZVR3byA9IGxldmVsVHdvW2xldmVsVHdvLmxlbmd0aCAtIDFdO1xuXG4gICAgLy8gQmFzZSBjYXNlOiBjb21iaW5lZFJ1bGVPbmUgaGFzIHN0cm9uZ2VyIHJlbGF0aW9uc2hpcCB3aXRoIHNpYmxpbmcgdGhhbiBjb21iaW5lZFJ1bGVUd29cbiAgICAvLyBhICsgYiArIChkXG4gICAgLy8gYSArIGIgfiAoZFxuICAgIGNvbnN0IHNpYmxpbmdDb21iT25lID0gY29tYmluZWRSdWxlT25lLmNvbWI7XG4gICAgY29uc3Qgc2libGluZ0NvbWJUd28gPSBjb21iaW5lZFJ1bGVUd28uY29tYjtcbiAgICBpZiAoc2libGluZ0NvbWJPbmUgPT09IENvbWJpbmF0b3JzLkFESkFDRU5UICYmIHNpYmxpbmdDb21iVHdvID09PSBDb21iaW5hdG9ycy5TSUJMSU5HKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gYSArIGIgfiBkXG4gICAgLy8gYSArIGIgKyBjICsgZFxuICAgIGlmIChjb21iaW5lZFJ1bGVPbmUucnVsZS5zdXBlcnNldE9mKGNvbWJpbmVkUnVsZVR3by5ydWxlKSkge1xuICAgICAgcmV0dXJuIHRoaXMubGV2ZWxTdXBlcnNldChsZXZlbE9uZS5zbGljZSgwLCAtMSksIGxldmVsVHdvLnNsaWNlKDAsIC0xKSk7XG4gICAgfVxuXG4gICAgLy8gSWYgQURKQUNFTlQgaXQgc2hvdWxkIGhhZCBtYXRjaCBiZWZvcmVcbiAgICBpZiAoY29tYmluZWRSdWxlT25lLmNvbWIgPT09IENvbWJpbmF0b3JzLkFESkFDRU5UKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gRm9yIGdlbmVyaWMgc2libGluZyB3YWxrIHVwIHRoZSBzZWNvbmQgbGlzdFxuICAgIHJldHVybiB0aGlzLmxldmVsU3VwZXJzZXQobGV2ZWxPbmUsIGxldmVsVHdvLnNsaWNlKDAsIC0xKSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IHRva2VuaXplLCBUb2tlbiB9IGZyb20gJ3BhcnNlbC10cyc7XG5pbXBvcnQgeyBDc3NTZWxlY3RvciB9IGZyb20gJy4vY3NzLXNlbGVjdG9yJztcblxuZXhwb3J0IGNsYXNzIENzc2V0IHtcbiAgc2VsZWN0b3JzOiBDc3NTZWxlY3RvcltdO1xuXG4gIC8qKlxuICAgKiBQYXJzZXMgdGhlIGdpdmVuIHNlbGVjdG9yIGZpbGluZyB1cCBpdHMgcHJpdmF0ZSBwcm9wZXJ0aWVzIHdpdGggbWV0YWRhdGFcbiAgICogQHBhcmFtIHNlbGVjdG9yIHRoZSBzZWxlY3RvciBzdHJpbmdcbiAgICovXG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yOiBzdHJpbmcpIHtcbiAgICBjb25zdCB0b2tlbkxpc3QgPSB0aGlzLmdldFRva2VucyhzZWxlY3Rvcik7XG4gICAgdGhpcy5zZWxlY3RvcnMgPSBbXTtcbiAgICBsZXQgdG9rZW5Hcm91cCA9IFtdIGFzIFRva2VuW107XG4gICAgbGV0IGN1cnJlbnRUb2tlbiA9IHRva2VuTGlzdC5zaGlmdCgpO1xuXG4gICAgd2hpbGUgKGN1cnJlbnRUb2tlbikge1xuICAgICAgaWYgKGN1cnJlbnRUb2tlbi50eXBlID09PSAnY29tbWEnKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0b3JzLnB1c2gobmV3IENzc1NlbGVjdG9yKHRva2VuR3JvdXApKTtcbiAgICAgICAgdG9rZW5Hcm91cCA9IFtdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG9rZW5Hcm91cC5wdXNoKGN1cnJlbnRUb2tlbik7XG4gICAgICB9XG4gICAgICBjdXJyZW50VG9rZW4gPSB0b2tlbkxpc3Quc2hpZnQoKTtcbiAgICB9XG4gICAgLy8gTGFzdCBncm91cCBtdXN0IGJlIHB1c2hlZFxuICAgIHRoaXMuc2VsZWN0b3JzLnB1c2gobmV3IENzc1NlbGVjdG9yKHRva2VuR3JvdXApKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyBzZXQgY29udGFpbnMgdGhlIG9uZSBwYXNzZWQgYXMgcGFyYW1ldGVyXG4gICAqIEBwYXJhbSBzZXQgdGhlIHNldCB0byBjaGVjayB3aXRoXG4gICAqL1xuICBzdXBlcnNldE9mKHNldDogQ3NzZXQpOiBib29sZWFuIHtcbiAgICBsZXQgaW5kZXggPSBzZXQuc2VsZWN0b3JzLmxlbmd0aDtcblxuICAgIHdoaWxlIChpbmRleC0tKSB7XG4gICAgICBjb25zdCBjb250YWluZXJJbmRleCA9IHRoaXMuc2VsZWN0b3JzLmZpbmRJbmRleCgocykgPT4gcy5zdXBlcnNldE9mKHNldC5zZWxlY3RvcnNbaW5kZXhdKSk7XG5cbiAgICAgIGlmIChjb250YWluZXJJbmRleCA9PT0gLTEpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyBzZXQgaXMgY29udGFpbmVkIHRoZSBvbmUgcGFzc2VkIGFzIHBhcmFtZXRlclxuICAgKiBAcGFyYW0gc2V0IHRoZSBzZXQgdG8gY2hlY2sgd2l0aFxuICAgKi9cbiAgc3Vic2V0T2Yoc2V0OiBDc3NldCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBzZXQuc3VwZXJzZXRPZih0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgbmV3IENTUyBzZXQgd2hpY2ggaXMgdGhlIHVuaW9uIG9mIHRoaXMgb25lIGFuZCB0aGUgcGFzc2VkIGFzIHBhcmFtZXRlclxuICAgKiBAcGFyYW0gc2V0IHRoZSBvdGhlciBDU1Mgc2V0IHRvIGJlIHVuaXRlZCB3aXRoXG4gICAqL1xuICB1bmlvbihzZXQ6IENzc2V0KTogQ3NzZXQge1xuICAgIGlmICh0aGlzLnN1cGVyc2V0T2Yoc2V0KSkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc3Vic2V0T2Yoc2V0KSkge1xuICAgICAgcmV0dXJuIHNldDtcbiAgICB9XG5cbiAgICAvLyBNYWtlIHVuaW9uIG9mIHNlbGVjdG9ycyBpZiBwb3NzaWJsZVxuICAgIGNvbnN0IGVxdWFsU2VsID0gdGhpcy5zZWxlY3RvcnMuZmlsdGVyKCh0aGlzU2VsKSA9PlxuICAgICAgc2V0LnNlbGVjdG9ycy5zb21lKChvdGhlclNlbCkgPT4gYCR7dGhpc1NlbH1gID09PSBgJHtvdGhlclNlbH1gKSxcbiAgICApO1xuICAgIGNvbnN0IHVuaXF1ZU9uZSA9IHRoaXMuc2VsZWN0b3JzLmZpbHRlcigodGhpc1NlbCkgPT4gIXNldC5zZWxlY3RvcnMuc29tZSgob3RoZXJTZWwpID0+IHRoaXNTZWwuc3Vic2V0T2Yob3RoZXJTZWwpKSk7XG4gICAgY29uc3QgdW5pcXVlVHdvID0gc2V0LnNlbGVjdG9ycy5maWx0ZXIoKG90aGVyU2VsKSA9PiAhdGhpcy5zZWxlY3RvcnMuc29tZSgodGhpc1NlbCkgPT4gb3RoZXJTZWwuc3Vic2V0T2YodGhpc1NlbCkpKTtcbiAgICBjb25zdCBhbGxTZWxlY3RvcnMgPSBlcXVhbFNlbC5jb25jYXQodW5pcXVlT25lLCB1bmlxdWVUd28pO1xuXG4gICAgcmV0dXJuIG5ldyBDc3NldChgJHthbGxTZWxlY3RvcnMubWFwKChzKSA9PiBzLnRvU3RyaW5nKCkpLmpvaW4oJywnKX1gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgbmV3IENTUyBzZXQgd2hpY2ggaXMgdGhlIGludGVyc2VjdGlvbiBvZiB0aGlzIG9uZSBhbmQgdGhlIHBhc3NlZCBhcyBwYXJhbWV0ZXJcbiAgICogb3Igdm9pZCBpZiB0aGUgaW50ZXJzZWN0aW9uIGlzIGFuIGVtcHR5IHNldFxuICAgKiBAcGFyYW0gc2V0IHRoZSBvdGhlciBDU1Mgc2V0IHRvIGJlIHVuaXRlZCB3aXRoXG4gICAqL1xuICBpbnRlcnNlY3Rpb24oc2V0OiBDc3NldCk6IENzc2V0IHwgdm9pZCB7XG4gICAgaWYgKHRoaXMuc3VwZXJzZXRPZihzZXQpKSB7XG4gICAgICByZXR1cm4gc2V0O1xuICAgIH1cblxuICAgIGlmICh0aGlzLnN1YnNldE9mKHNldCkpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8vIE1ha2UgaW50ZXJzZWN0aW9uIG9mIHNlbGVjdG9ycyBpZiBwb3NzaWJsZVxuICAgIC8vIDFzdCBhdHRlbXB0IGJydXRlIGZvcmNlIChpbnRlcnNlY3RpbmcgZXZlcnkgc2V0IHdpdGggb3RoZXJzKVxuICAgIGNvbnN0IGludGVyc2VjdGlvbnMgPSB0aGlzLnNlbGVjdG9yc1xuICAgICAgLm1hcCgodGhpc1NlbCkgPT4gc2V0LnNlbGVjdG9ycy5tYXAoKG90aGVyU2VsKSA9PiB0aGlzU2VsLmludGVyc2VjdGlvbihvdGhlclNlbCkpKVxuICAgICAgLnJlZHVjZSgoZmxhdCwgdmFsKSA9PiBmbGF0LmNvbmNhdCh2YWwpLCBbXSlcbiAgICAgIC5maWx0ZXIoKHZhbCkgPT4gISF2YWwpXG4gICAgICAubWFwKCh2YWwpID0+IGAke3ZhbH1gKTtcblxuICAgIGlmIChpbnRlcnNlY3Rpb25zLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIG5ldyBDc3NldChgJHtpbnRlcnNlY3Rpb25zLmpvaW4oJywnKX1gKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdm9pZCAwO1xuICB9XG5cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RvcnMubWFwKChzKSA9PiBgJHtzfWApLmpvaW4oJywnKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0VG9rZW5zKHNlbGVjdG9yOiBzdHJpbmcpOiBUb2tlbltdIHtcbiAgICBsZXQgdG9rZW5zO1xuXG4gICAgdHJ5IHtcbiAgICAgIHRva2VucyA9IHRva2VuaXplKHNlbGVjdG9yKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgU3ludGF4RXJyb3IoYCR7ZXJyb3J9YCk7XG4gICAgfVxuXG4gICAgaWYgKCF0b2tlbnMpIHtcbiAgICAgIHRocm93IFN5bnRheEVycm9yKGBTZWxlY3RvciAke3NlbGVjdG9yfSBjYW5ub3QgYmUgcGFyc2VkLmApO1xuICAgIH1cblxuICAgIGNvbnN0IHVua25vd25Ub2tlbiA9IHRva2Vucy5maW5kKCh0KSA9PiB0eXBlb2YgdCA9PT0gJ3N0cmluZycpO1xuICAgIGlmICh1bmtub3duVG9rZW4pIHtcbiAgICAgIHRocm93IFN5bnRheEVycm9yKGBVbmtub3duIFRva2VuICR7dW5rbm93blRva2VufSBpbiBzZWxlY3RvciAke3NlbGVjdG9yfWApO1xuICAgIH1cblxuICAgIHJldHVybiB0b2tlbnMgYXMgVG9rZW5bXTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ3NzTWF0Y2hlclN5bWJvbCB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IENzc0F0dHJpYnV0ZU1hdGNoZXIgfSBmcm9tICcuLi9jc3MtYXR0cmlidXRlLW1hdGNoZXInO1xuXG5jb25zdCBzdXBlcnNldFN5bWJvbHMgPSBbXG4gIENzc01hdGNoZXJTeW1ib2wuUHJlZml4LFxuICBDc3NNYXRjaGVyU3ltYm9sLlN1ZmZpeCxcbiAgQ3NzTWF0Y2hlclN5bWJvbC5TdWJDb2RlLFxuICBDc3NNYXRjaGVyU3ltYm9sLk9jY3VycmVuY2UsXG4gIENzc01hdGNoZXJTeW1ib2wuQ29udGFpbnMsXG4gIENzc01hdGNoZXJTeW1ib2wuRXF1YWwsXG5dO1xuXG5leHBvcnQgY2xhc3MgQ3NzQ29udGFpbnNNYXRjaGVyIGV4dGVuZHMgQ3NzQXR0cmlidXRlTWF0Y2hlciB7XG4gIHJlYWRvbmx5IHN5bWJvbDogQ3NzTWF0Y2hlclN5bWJvbCA9IENzc01hdGNoZXJTeW1ib2wuQ29udGFpbnM7XG5cbiAgc3VwZXJzZXRPZihtYXRjaGVyOiBDc3NBdHRyaWJ1dGVNYXRjaGVyKTogYm9vbGVhbiB7XG4gICAgaWYgKHN1cGVyc2V0U3ltYm9scy5pbmRleE9mKG1hdGNoZXIuc3ltYm9sKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiBtYXRjaGVyLnZhbHVlLmluZGV4T2YodGhpcy52YWx1ZSkgIT09IC0xO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ3NzQXR0cmlidXRlTWF0Y2hlciB9IGZyb20gJy4uL2Nzcy1hdHRyaWJ1dGUtbWF0Y2hlcic7XG5pbXBvcnQgeyBDc3NNYXRjaGVyU3ltYm9sIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgQ3NzUHJlc2VuY2VNYXRjaGVyIH0gZnJvbSAnLi9wcmVzZW5jZS1tYXRjaGVyJztcbmltcG9ydCB7IENzc1ByZWZpeE1hdGNoZXIgfSBmcm9tICcuL3ByZWZpeC1tYXRjaGVyJztcbmltcG9ydCB7IENzc1N1ZmZpeE1hdGNoZXIgfSBmcm9tICcuL3N1ZmZpeC1tYXRjaGVyJztcbmltcG9ydCB7IENzc0VxdWFsTWF0Y2hlciB9IGZyb20gJy4vZXF1YWwtbWF0Y2hlcic7XG5pbXBvcnQgeyBDc3NDb250YWluc01hdGNoZXIgfSBmcm9tICcuL2NvbnRhaW5zLW1hdGNoZXInO1xuaW1wb3J0IHsgQ3NzT2NjdXJyZW5jZU1hdGNoZXIgfSBmcm9tICcuL29jY3VycmVuY2UtbWF0Y2hlcic7XG5pbXBvcnQgeyBDc3NTdWJDb2RlTWF0Y2hlciB9IGZyb20gJy4vc3ViY29kZS1tYXRjaGVyJztcblxuaW50ZXJmYWNlIENzc01hdGNoZXJDb25zdHJ1Y3RvciB7XG4gIG5ldyAodmFsdWU6IHN0cmluZyk6IENzc0F0dHJpYnV0ZU1hdGNoZXI7XG59XG5cbmNvbnN0IGNsYXp6ZXo6IHsgW3N5bWJvbDogc3RyaW5nXTogQ3NzTWF0Y2hlckNvbnN0cnVjdG9yIH0gPSB7XG4gIFtDc3NNYXRjaGVyU3ltYm9sLlByZXNlbmNlXTogQ3NzUHJlc2VuY2VNYXRjaGVyLFxuICBbQ3NzTWF0Y2hlclN5bWJvbC5QcmVmaXhdOiBDc3NQcmVmaXhNYXRjaGVyLFxuICBbQ3NzTWF0Y2hlclN5bWJvbC5TdWZmaXhdOiBDc3NTdWZmaXhNYXRjaGVyLFxuICBbQ3NzTWF0Y2hlclN5bWJvbC5FcXVhbF06IENzc0VxdWFsTWF0Y2hlcixcbiAgW0Nzc01hdGNoZXJTeW1ib2wuQ29udGFpbnNdOiBDc3NDb250YWluc01hdGNoZXIsXG4gIFtDc3NNYXRjaGVyU3ltYm9sLk9jY3VycmVuY2VdOiBDc3NPY2N1cnJlbmNlTWF0Y2hlcixcbiAgW0Nzc01hdGNoZXJTeW1ib2wuU3ViQ29kZV06IENzc1N1YkNvZGVNYXRjaGVyLFxufTtcblxuY29uc3QgVkFMVUVfUkVHRVhQUyA9IHtcbiAgdmFsaWQ6IC9eKCd8XCIpW14nXCJdK1xcMSR8XlteJ1wiXSskLyxcbiAgcXVvdGVzOiAvXltcIiddfFtcIiddJC9nLFxufTtcblxuZXhwb3J0IGNsYXNzIENzc01hdGNoZXJGYWN0b3J5IHtcbiAgc3RhdGljIGNyZWF0ZShzZWxlY3RvciA9ICcnKTogQ3NzQXR0cmlidXRlTWF0Y2hlciB7XG4gICAgY29uc3QgcGFydHMgPSBzZWxlY3Rvci5zcGxpdCgnPScpO1xuICAgIGNvbnN0IHN5bWJvbCA9IHBhcnRzLmxlbmd0aCA+IDEgPyBwYXJ0c1swXSB8fCAnPScgOiAnJztcbiAgICBjb25zdCB2YWx1ZSA9IHBhcnRzLmxlbmd0aCA+IDEgPyBwYXJ0c1sxXSA6ICcnO1xuXG4gICAgaWYgKCEhdmFsdWUgJiYgIVZBTFVFX1JFR0VYUFMudmFsaWQudGVzdCh2YWx1ZSkpIHtcbiAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihgSW52YWxpZCBhdHRyaWJ1dGUgdmFsdWUgaW4gJHtzZWxlY3Rvcn1gKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IGNsYXp6ZXpbc3ltYm9sXSh2YWx1ZS5yZXBsYWNlKFZBTFVFX1JFR0VYUFMucXVvdGVzLCAnJykpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDc3NNYXRjaGVyU3ltYm9sIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgQ3NzQXR0cmlidXRlTWF0Y2hlciB9IGZyb20gJy4uL2Nzcy1hdHRyaWJ1dGUtbWF0Y2hlcic7XG5cbmV4cG9ydCBjbGFzcyBDc3NFcXVhbE1hdGNoZXIgZXh0ZW5kcyBDc3NBdHRyaWJ1dGVNYXRjaGVyIHtcbiAgcmVhZG9ubHkgc3ltYm9sOiBDc3NNYXRjaGVyU3ltYm9sID0gQ3NzTWF0Y2hlclN5bWJvbC5FcXVhbDtcblxuICBzdXBlcnNldE9mKG1hdGNoZXI6IENzc0F0dHJpYnV0ZU1hdGNoZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbWF0Y2hlci5zeW1ib2wgPT09IENzc01hdGNoZXJTeW1ib2wuRXF1YWwgJiYgdGhpcy52YWx1ZSA9PT0gbWF0Y2hlci52YWx1ZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ3NzTWF0Y2hlclN5bWJvbCB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IENzc0F0dHJpYnV0ZU1hdGNoZXIgfSBmcm9tICcuLi9jc3MtYXR0cmlidXRlLW1hdGNoZXInO1xuXG5jb25zdCBzdXBlcnNldFN5bWJvbHMgPSBbQ3NzTWF0Y2hlclN5bWJvbC5FcXVhbCwgQ3NzTWF0Y2hlclN5bWJvbC5PY2N1cnJlbmNlXTtcblxuZXhwb3J0IGNsYXNzIENzc09jY3VycmVuY2VNYXRjaGVyIGV4dGVuZHMgQ3NzQXR0cmlidXRlTWF0Y2hlciB7XG4gIHJlYWRvbmx5IHN5bWJvbDogQ3NzTWF0Y2hlclN5bWJvbCA9IENzc01hdGNoZXJTeW1ib2wuT2NjdXJyZW5jZTtcblxuICBzdXBlcnNldE9mKG1hdGNoZXI6IENzc0F0dHJpYnV0ZU1hdGNoZXIpOiBib29sZWFuIHtcbiAgICBpZiAoc3VwZXJzZXRTeW1ib2xzLmluZGV4T2YobWF0Y2hlci5zeW1ib2wpICE9PSAtMSkge1xuICAgICAgcmV0dXJuIG1hdGNoZXIudmFsdWUgPT09IHRoaXMudmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaW50ZXJzZWN0aW9uKG1hdGNoZXI6IENzc0F0dHJpYnV0ZU1hdGNoZXIpOiBzdHJpbmcgfCBudWxsIHwgdm9pZCB7XG4gICAgaWYgKHRoaXMudmFsdWUgPT09IG1hdGNoZXIudmFsdWUpIHtcbiAgICAgIGlmIChtYXRjaGVyLnN5bWJvbCA9PT0gQ3NzTWF0Y2hlclN5bWJvbC5FcXVhbCkge1xuICAgICAgICByZXR1cm4gYD1cIiR7dGhpcy52YWx1ZX1cImA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHN1cGVyLmludGVyc2VjdGlvbihtYXRjaGVyKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ3NzTWF0Y2hlclN5bWJvbCB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IENzc0F0dHJpYnV0ZU1hdGNoZXIgfSBmcm9tICcuLi9jc3MtYXR0cmlidXRlLW1hdGNoZXInO1xuXG5jb25zdCBzdXBlcnNldFN5bWJvbHMgPSBbQ3NzTWF0Y2hlclN5bWJvbC5QcmVmaXgsIENzc01hdGNoZXJTeW1ib2wuU3ViQ29kZSwgQ3NzTWF0Y2hlclN5bWJvbC5FcXVhbF07XG5cbmV4cG9ydCBjbGFzcyBDc3NQcmVmaXhNYXRjaGVyIGV4dGVuZHMgQ3NzQXR0cmlidXRlTWF0Y2hlciB7XG4gIHJlYWRvbmx5IHN5bWJvbDogQ3NzTWF0Y2hlclN5bWJvbCA9IENzc01hdGNoZXJTeW1ib2wuUHJlZml4O1xuXG4gIHN1cGVyc2V0T2YobWF0Y2hlcjogQ3NzQXR0cmlidXRlTWF0Y2hlcik6IGJvb2xlYW4ge1xuICAgIGlmIChzdXBlcnNldFN5bWJvbHMuaW5kZXhPZihtYXRjaGVyLnN5bWJvbCkgIT09IC0xKSB7XG4gICAgICByZXR1cm4gbWF0Y2hlci52YWx1ZS5zdGFydHNXaXRoKHRoaXMudmFsdWUpO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHVuaW9uKG1hdGNoZXI6IENzc0F0dHJpYnV0ZU1hdGNoZXIpOiBzdHJpbmcgfCBudWxsIHtcbiAgICBpZiAodGhpcy52YWx1ZSA9PT0gbWF0Y2hlci52YWx1ZSAmJiBtYXRjaGVyLnN5bWJvbCA9PT0gQ3NzTWF0Y2hlclN5bWJvbC5TdWJDb2RlKSB7XG4gICAgICByZXR1cm4gYCR7dGhpc31gO1xuICAgIH1cblxuICAgIHJldHVybiBzdXBlci51bmlvbihtYXRjaGVyKTtcbiAgfVxuXG4gIGludGVyc2VjdGlvbihtYXRjaGVyOiBDc3NBdHRyaWJ1dGVNYXRjaGVyKTogc3RyaW5nIHwgbnVsbCB8IHZvaWQge1xuICAgIGlmICh0aGlzLnZhbHVlID09PSBtYXRjaGVyLnZhbHVlKSB7XG4gICAgICBpZiAobWF0Y2hlci5zeW1ib2wgPT09IENzc01hdGNoZXJTeW1ib2wuRXF1YWwpIHtcbiAgICAgICAgcmV0dXJuIGA9XCIke3RoaXMudmFsdWV9XCJgO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChtYXRjaGVyLnZhbHVlLnN0YXJ0c1dpdGgodGhpcy52YWx1ZSkpIHtcbiAgICAgIGlmIChtYXRjaGVyLnN5bWJvbCA9PT0gQ3NzTWF0Y2hlclN5bWJvbC5QcmVmaXgpIHtcbiAgICAgICAgcmV0dXJuIGBePVwiJHttYXRjaGVyLnZhbHVlfVwiYDtcbiAgICAgIH1cbiAgICAgIGlmIChtYXRjaGVyLnN5bWJvbCA9PT0gQ3NzTWF0Y2hlclN5bWJvbC5TdWJDb2RlKSB7XG4gICAgICAgIHJldHVybiBgfD1cIiR7bWF0Y2hlci52YWx1ZX1cImA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudmFsdWUuc3RhcnRzV2l0aChtYXRjaGVyLnZhbHVlKSAmJiBtYXRjaGVyLnN5bWJvbCA9PT0gQ3NzTWF0Y2hlclN5bWJvbC5QcmVmaXgpIHtcbiAgICAgIHJldHVybiBgXj1cIiR7dGhpcy52YWx1ZX1cImA7XG4gICAgfVxuXG4gICAgaWYgKG1hdGNoZXIuc3ltYm9sID09PSBDc3NNYXRjaGVyU3ltYm9sLlByZWZpeCAmJiB0aGlzLnZhbHVlICE9PSBtYXRjaGVyLnZhbHVlKSB7XG4gICAgICByZXR1cm4gdm9pZCAwO1xuICAgIH1cblxuICAgIHJldHVybiBzdXBlci5pbnRlcnNlY3Rpb24obWF0Y2hlcik7XG4gIH1cbn1cbiIsImltcG9ydCB7IENzc01hdGNoZXJTeW1ib2wgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBDc3NBdHRyaWJ1dGVNYXRjaGVyIH0gZnJvbSAnLi4vY3NzLWF0dHJpYnV0ZS1tYXRjaGVyJztcblxuZXhwb3J0IGNsYXNzIENzc1ByZXNlbmNlTWF0Y2hlciBleHRlbmRzIENzc0F0dHJpYnV0ZU1hdGNoZXIge1xuICByZWFkb25seSBzeW1ib2w6IENzc01hdGNoZXJTeW1ib2wgPSBDc3NNYXRjaGVyU3ltYm9sLlByZXNlbmNlO1xuXG4gIHN1cGVyc2V0T2YobWF0Y2hlcjogQ3NzQXR0cmlidXRlTWF0Y2hlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDc3NNYXRjaGVyU3ltYm9sIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgQ3NzQXR0cmlidXRlTWF0Y2hlciB9IGZyb20gJy4uL2Nzcy1hdHRyaWJ1dGUtbWF0Y2hlcic7XG5cbmNvbnN0IHN1cGVyc2V0U3ltYm9scyA9IFtDc3NNYXRjaGVyU3ltYm9sLlN1YkNvZGUsIENzc01hdGNoZXJTeW1ib2wuRXF1YWxdO1xuXG5leHBvcnQgY2xhc3MgQ3NzU3ViQ29kZU1hdGNoZXIgZXh0ZW5kcyBDc3NBdHRyaWJ1dGVNYXRjaGVyIHtcbiAgcmVhZG9ubHkgc3ltYm9sOiBDc3NNYXRjaGVyU3ltYm9sID0gQ3NzTWF0Y2hlclN5bWJvbC5TdWJDb2RlO1xuXG4gIHN1cGVyc2V0T2YobWF0Y2hlcjogQ3NzQXR0cmlidXRlTWF0Y2hlcik6IGJvb2xlYW4ge1xuICAgIGlmIChzdXBlcnNldFN5bWJvbHMuaW5kZXhPZihtYXRjaGVyLnN5bWJvbCkgIT09IC0xKSB7XG4gICAgICByZXR1cm4gbWF0Y2hlci52YWx1ZSA9PT0gdGhpcy52YWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB1bmlvbihtYXRjaGVyOiBDc3NBdHRyaWJ1dGVNYXRjaGVyKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgaWYgKG1hdGNoZXIuc3ltYm9sID09PSBDc3NNYXRjaGVyU3ltYm9sLlN1YkNvZGUpIHtcbiAgICAgIGlmICh0aGlzLnZhbHVlID09PSBtYXRjaGVyLnZhbHVlKSB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzfWA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHN1cGVyLnVuaW9uKG1hdGNoZXIpO1xuICB9XG5cbiAgaW50ZXJzZWN0aW9uKG1hdGNoZXI6IENzc0F0dHJpYnV0ZU1hdGNoZXIpOiBzdHJpbmcgfCBudWxsIHwgdm9pZCB7XG4gICAgaWYgKHRoaXMudmFsdWUgPT09IG1hdGNoZXIudmFsdWUpIHtcbiAgICAgIGlmIChtYXRjaGVyLnN5bWJvbCA9PT0gQ3NzTWF0Y2hlclN5bWJvbC5QcmVmaXgpIHtcbiAgICAgICAgcmV0dXJuIGB8PVwiJHt0aGlzLnZhbHVlfVwiYDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy52YWx1ZS5zdGFydHNXaXRoKG1hdGNoZXIudmFsdWUpKSB7XG4gICAgICBpZiAobWF0Y2hlci5zeW1ib2wgPT09IENzc01hdGNoZXJTeW1ib2wuUHJlZml4KSB7XG4gICAgICAgIHJldHVybiBgfD1cIiR7dGhpcy52YWx1ZX1cImA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHN1cGVyLmludGVyc2VjdGlvbihtYXRjaGVyKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ3NzTWF0Y2hlclN5bWJvbCB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IENzc0F0dHJpYnV0ZU1hdGNoZXIgfSBmcm9tICcuLi9jc3MtYXR0cmlidXRlLW1hdGNoZXInO1xuXG5jb25zdCBzdXBlcnNldFN5bWJvbHMgPSBbQ3NzTWF0Y2hlclN5bWJvbC5TdWZmaXgsIENzc01hdGNoZXJTeW1ib2wuRXF1YWxdO1xuXG5leHBvcnQgY2xhc3MgQ3NzU3VmZml4TWF0Y2hlciBleHRlbmRzIENzc0F0dHJpYnV0ZU1hdGNoZXIge1xuICByZWFkb25seSBzeW1ib2w6IENzc01hdGNoZXJTeW1ib2wgPSBDc3NNYXRjaGVyU3ltYm9sLlN1ZmZpeDtcblxuICBzdXBlcnNldE9mKG1hdGNoZXI6IENzc0F0dHJpYnV0ZU1hdGNoZXIpOiBib29sZWFuIHtcbiAgICBpZiAoc3VwZXJzZXRTeW1ib2xzLmluZGV4T2YobWF0Y2hlci5zeW1ib2wpICE9PSAtMSkge1xuICAgICAgcmV0dXJuIG1hdGNoZXIudmFsdWUuZW5kc1dpdGgodGhpcy52YWx1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaW50ZXJzZWN0aW9uKG1hdGNoZXI6IENzc0F0dHJpYnV0ZU1hdGNoZXIpOiBzdHJpbmcgfCBudWxsIHwgdm9pZCB7XG4gICAgaWYgKG1hdGNoZXIuc3ltYm9sID09PSBDc3NNYXRjaGVyU3ltYm9sLlN1ZmZpeCkge1xuICAgICAgaWYgKG1hdGNoZXIudmFsdWUuZW5kc1dpdGgodGhpcy52YWx1ZSkgfHwgdGhpcy52YWx1ZS5lbmRzV2l0aChtYXRjaGVyLnZhbHVlKSkge1xuICAgICAgICBjb25zdCBsb25nZXN0VmFsdWUgPSB0aGlzLnZhbHVlLmxlbmd0aCA+IG1hdGNoZXIudmFsdWUubGVuZ3RoID8gdGhpcy52YWx1ZSA6IG1hdGNoZXIudmFsdWU7XG5cbiAgICAgICAgcmV0dXJuIGAkPVwiJHtsb25nZXN0VmFsdWV9XCJgO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy52YWx1ZSAhPT0gbWF0Y2hlci52YWx1ZSkge1xuICAgICAgICByZXR1cm4gdm9pZCAwO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzdXBlci5pbnRlcnNlY3Rpb24obWF0Y2hlcik7XG4gIH1cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXNoYWRvdyAqL1xuZXhwb3J0IGVudW0gQ3NzTWF0Y2hlclN5bWJvbCB7XG4gIFByZXNlbmNlID0gJycsXG4gIEVxdWFsID0gJz0nLFxuICBQcmVmaXggPSAnXicsXG4gIFN1ZmZpeCA9ICckJyxcbiAgQ29udGFpbnMgPSAnKicsXG4gIFN1YkNvZGUgPSAnfCcsXG4gIE9jY3VycmVuY2UgPSAnficsXG59XG5cbmV4cG9ydCBjb25zdCBlbnVtIENvbWJpbmF0b3JzIHtcbiAgQURKQUNFTlQgPSAnKycsXG4gIFNJQkxJTkcgPSAnficsXG4gIERFU0NFTkRBTlQgPSAnICcsXG4gIENISUxEID0gJz4nLFxuICBOT05FID0gJycsXG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IENzc2V0IH0gZnJvbSAnLi4vc3JjL2Nzc2V0JztcbmltcG9ydCB7IHNldFBsYXlncm91bmQgfSBmcm9tICcuL3BsYXlncm91bmQnO1xuaW1wb3J0IHsgU1RFUFMsIHJ1blN0ZXAgfcKgZnJvbSAnLi9zdGVwcyc7XG5cbmRlY2xhcmUgdmFyIGhsanM6IGFueTtcblxuKHdpbmRvdyBhcyBhbnkpLkNzc2V0ID0gQ3NzZXQ7XG4vLyAod2luZG93IGFzIGFueSkuY3JlYXRlU2V0ID0gKHNlbDogc3RyaW5nKSA9PiBuZXcgQ3NzZXQoc2VsKTtcblxuLy8gV2hlcmUgdG8gcHV0IHN0ZXAgaW5mb1xuY29uc3QgY29tbWVudEFyZWEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29tbWVudCcpIGFzIEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xuY29uc3Qgc3R5bGVBcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N0eWxlJykgYXMgSFRNTFN0eWxlRWxlbWVudDtcbmNvbnN0IGNvZGVBcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvZGUnKSBhcyBIVE1MUHJlRWxlbWVudDtcbi8vIENvbnRyb2xcbmNvbnN0IG5leHRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV4dCcpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xuXG5cbi8vIFByZXBhcmUgdGhlIHBsYXlncm91bmRcbi8vIFNpemUgTVVTVCBiZSBvZGQgbnVtYmVyXG5jb25zdCBwbGF5Z3JvdW5kU2l6ZSA9IDEwMTtcbmNvbnN0IHBsYXlncm91bmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGxheWdyb3VuZCcpO1xuc2V0UGxheWdyb3VuZChwbGF5Z3JvdW5kIGFzIEhUTUxUYWJsZUVsZW1lbnQsIHBsYXlncm91bmRTaXplKTtcblxubGV0IGluZGV4ID0gMDtcblxubmV4dEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgaWYgKG5leHRCdXR0b24uaW5uZXJUZXh0ID09PSAnUmVzdGFydCcpIHtcbiAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3Qgc3RlcCA9IFNURVBTW2luZGV4KytdO1xuXG4gIC8vIFB1dCBjb21tZW50IGFuZCBkaXNwbGF5IHNuaXBwZXRcbiAgcnVuU3RlcChzdGVwLCBjb21tZW50QXJlYSwgY29kZUFyZWEsIHN0eWxlQXJlYSk7XG4gIGhsanMuaGlnaGxpZ2h0QmxvY2soY29kZUFyZWEpO1xuXG4gIGlmIChpbmRleCA+PSBTVEVQUy5sZW5ndGgpIHtcbiAgICBuZXh0QnV0dG9uLmlubmVyVGV4dCA9ICdSZXN0YXJ0JztcbiAgfVxufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=