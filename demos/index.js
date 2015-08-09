(function() {
  var isCJS = typeof module !== "undefined" && module.exports;
  var demos = {
    "Documentation": "docs.js",
    "SVG Logo": "svglogo.js",
    "Spirograph": "spirograph.js"
  }
  if (isCJS)
    module.exports = demos;
  else
    window.xmgen.demos = demos;
})();
