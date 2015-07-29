(function(ns) {
  ns.xmgen = ns.xmgen || {};

  var Element = function(type, attributes) {
    // Element children
    var self = function() {
      var process = function(element) {
        if (element.prototype == Element.prototype) {
          self._children.push(element);
        } else if (element.constructor == Function) {
          var r = element.bind(self)(process);
          if (r)
            process(r);
        } else if (element.constructor == Array) {
          for (var i = 0; i < element.length; i++)
            process(element[i]);
        } else {
          self._children.push(String(element));
        }
      }

      for (var i = 0; i < arguments.length; i++) {
        process(arguments[i]);
      }
      return self;
    }

    self._children = [];

    // Element type
    if (typeof(type) == "function") {
      var r = type.bind(self)();
      if (r)
        self._type = r;
    } else {
      self._type = type;
    }

    // Element attributes
    for (var k in attributes) {
      if (attributes.hasOwnProperty(k)) {
        var attr = attributes[k];
        if (typeof(attr) == "function") {
          var r = attr.bind(self)();
          if (r)
            self[k] = r;
        } else {
          self[k] = attr;
        }
      }
    }

    self.prototype = Element.prototype;
    self.toString = Element.prototype.toString;
    return self;
  }

  Element.prototype.toString = function(indention, level) {
    var nl = (indention != undefined) ? "\n" : "";
    var id = (indention * level > 0) ? new Array(indention * level + 1).join(" ") : "";
    var level = level || 0;

    var isdoctype = this._type.match(/^\!/);
    var isschema = this._type.match(/^\?/);

    var string = id + "<" + String(this._type);
    for (var k in this) {
      if (this.hasOwnProperty(k) && !k.match(/^_/) && k != "toString") {
        string += " " + k + "=\"" + String(this[k]).replace(/"/g, "&quot;") + "\"";
      }
    }

    if (!isdoctype) {
      if (this._children.length > 0 || isschema)
        string += ">" + nl;
      else
        string += "/>";
    } else {
      string += " ";
    }

    for (var i = 0; i < this._children.length; i++) {
      var child = this._children[i];
      if (child.constructor == String) {
        string += child;
      } else {
        if (i > 0)
          string += nl;
        string += this._children[i].toString(indention, level + 1);
      }
    }

    if (this._children.length > 0 && !isdoctype && !isschema)
      string += nl + id + "</" + String(this._type) + ">";
    if (isdoctype)
      string += ">";

    return string;
  }

  ns.xmgen.Element = Element;
})(window);
