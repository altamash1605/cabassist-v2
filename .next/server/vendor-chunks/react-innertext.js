"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/react-innertext";
exports.ids = ["vendor-chunks/react-innertext"];
exports.modules = {

/***/ "(ssr)/./node_modules/react-innertext/index.js":
/*!***********************************************!*\
  !*** ./node_modules/react-innertext/index.js ***!
  \***********************************************/
/***/ ((module) => {

eval("\nvar hasProps = function (jsx) {\n    return Object.prototype.hasOwnProperty.call(jsx, 'props');\n};\nvar reduceJsxToString = function (previous, current) {\n    return previous + innerText(current);\n};\nvar innerText = function (jsx) {\n    if (jsx === null ||\n        typeof jsx === 'boolean' ||\n        typeof jsx === 'undefined') {\n        return '';\n    }\n    if (typeof jsx === 'number') {\n        return jsx.toString();\n    }\n    if (typeof jsx === 'string') {\n        return jsx;\n    }\n    if (Array.isArray(jsx)) {\n        return jsx.reduce(reduceJsxToString, '');\n    }\n    if (hasProps(jsx) &&\n        Object.prototype.hasOwnProperty.call(jsx.props, 'children')) {\n        return innerText(jsx.props.children);\n    }\n    return '';\n};\ninnerText.default = innerText;\nmodule.exports = innerText;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcmVhY3QtaW5uZXJ0ZXh0L2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2F1dGgtYXBwLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWlubmVydGV4dC9pbmRleC5qcz9jOTE0Il0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xudmFyIGhhc1Byb3BzID0gZnVuY3Rpb24gKGpzeCkge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoanN4LCAncHJvcHMnKTtcbn07XG52YXIgcmVkdWNlSnN4VG9TdHJpbmcgPSBmdW5jdGlvbiAocHJldmlvdXMsIGN1cnJlbnQpIHtcbiAgICByZXR1cm4gcHJldmlvdXMgKyBpbm5lclRleHQoY3VycmVudCk7XG59O1xudmFyIGlubmVyVGV4dCA9IGZ1bmN0aW9uIChqc3gpIHtcbiAgICBpZiAoanN4ID09PSBudWxsIHx8XG4gICAgICAgIHR5cGVvZiBqc3ggPT09ICdib29sZWFuJyB8fFxuICAgICAgICB0eXBlb2YganN4ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGlmICh0eXBlb2YganN4ID09PSAnbnVtYmVyJykge1xuICAgICAgICByZXR1cm4ganN4LnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YganN4ID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4ganN4O1xuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheShqc3gpKSB7XG4gICAgICAgIHJldHVybiBqc3gucmVkdWNlKHJlZHVjZUpzeFRvU3RyaW5nLCAnJyk7XG4gICAgfVxuICAgIGlmIChoYXNQcm9wcyhqc3gpICYmXG4gICAgICAgIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChqc3gucHJvcHMsICdjaGlsZHJlbicpKSB7XG4gICAgICAgIHJldHVybiBpbm5lclRleHQoanN4LnByb3BzLmNoaWxkcmVuKTtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xufTtcbmlubmVyVGV4dC5kZWZhdWx0ID0gaW5uZXJUZXh0O1xubW9kdWxlLmV4cG9ydHMgPSBpbm5lclRleHQ7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/react-innertext/index.js\n");

/***/ })

};
;