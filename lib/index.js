(function() {
  var isCJS = typeof module !== "undefined" && module.exports;
  if (!isCJS) {
    throw new Error("index.js is only needed when loading xmgen with CommonJS.");
  }
  module.exports.Element = require("xmgen/lib/xmgen");
  module.exports.html = require("xmgen/lib/html");
  module.exports.svg = require("xmgen/lib/svg");
})();

