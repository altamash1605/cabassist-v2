/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/scrollparent";
exports.ids = ["vendor-chunks/scrollparent"];
exports.modules = {

/***/ "(ssr)/./node_modules/scrollparent/scrollparent.js":
/*!***************************************************!*\
  !*** ./node_modules/scrollparent/scrollparent.js ***!
  \***************************************************/
/***/ (function(module, exports) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else {}\n}(this, function () {\n  function isScrolling(node) {\n    var overflow = getComputedStyle(node, null).getPropertyValue(\"overflow\");\n\n    return overflow.indexOf(\"scroll\") > -1 || overflow.indexOf(\"auto\") > - 1;\n  }\n\n  function scrollParent(node) {\n    if (!(node instanceof HTMLElement || node instanceof SVGElement)) {\n      return undefined;\n    }\n\n    var current = node.parentNode;\n    while (current.parentNode) {\n      if (isScrolling(current)) {\n        return current;\n      }\n\n      current = current.parentNode;\n    }\n\n    return document.scrollingElement || document.documentElement;\n  }\n\n  return scrollParent;\n}));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvc2Nyb2xscGFyZW50L3Njcm9sbHBhcmVudC5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBLE1BQU0sSUFBMEM7QUFDaEQsSUFBSSxpQ0FBTyxFQUFFLG9DQUFFLE9BQU87QUFBQTtBQUFBO0FBQUEsa0dBQUM7QUFDdkIsSUFBSSxLQUFLLEVBSU47QUFDSCxDQUFDO0FBQ0Q7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2F1dGgtYXBwLy4vbm9kZV9tb2R1bGVzL3Njcm9sbHBhcmVudC9zY3JvbGxwYXJlbnQuanM/MTYwMCJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKFtdLCBmYWN0b3J5KTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG4gIH0gZWxzZSB7XG4gICAgcm9vdC5TY3JvbGxwYXJlbnQgPSBmYWN0b3J5KCk7XG4gIH1cbn0odGhpcywgZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBpc1Njcm9sbGluZyhub2RlKSB7XG4gICAgdmFyIG92ZXJmbG93ID0gZ2V0Q29tcHV0ZWRTdHlsZShub2RlLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKFwib3ZlcmZsb3dcIik7XG5cbiAgICByZXR1cm4gb3ZlcmZsb3cuaW5kZXhPZihcInNjcm9sbFwiKSA+IC0xIHx8IG92ZXJmbG93LmluZGV4T2YoXCJhdXRvXCIpID4gLSAxO1xuICB9XG5cbiAgZnVuY3Rpb24gc2Nyb2xsUGFyZW50KG5vZGUpIHtcbiAgICBpZiAoIShub2RlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgfHwgbm9kZSBpbnN0YW5jZW9mIFNWR0VsZW1lbnQpKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHZhciBjdXJyZW50ID0gbm9kZS5wYXJlbnROb2RlO1xuICAgIHdoaWxlIChjdXJyZW50LnBhcmVudE5vZGUpIHtcbiAgICAgIGlmIChpc1Njcm9sbGluZyhjdXJyZW50KSkge1xuICAgICAgICByZXR1cm4gY3VycmVudDtcbiAgICAgIH1cblxuICAgICAgY3VycmVudCA9IGN1cnJlbnQucGFyZW50Tm9kZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZG9jdW1lbnQuc2Nyb2xsaW5nRWxlbWVudCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gIH1cblxuICByZXR1cm4gc2Nyb2xsUGFyZW50O1xufSkpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/scrollparent/scrollparent.js\n");

/***/ })

};
;