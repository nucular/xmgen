(function(ns) {
  ns.xmgen = ns.xmgen || {};

  var Element = function(type, attributes) {
    // Children
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

      for (var i = 0; i < arguments.length; i++)
        process(arguments[i]);
      return self;
    }
    self._children = [];
    // Type
    if (typeof(type) == "function") {
      var r = type.bind(self)();
      if (r)
        self._type = r;
    } else {
      self._type = type;
    }
    // Attributes
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
    var level = this._type ? (level || 0) : (level || 0)-1;
    var id = (indention * level > 0) ? new Array(indention * level + 1).join(" ") : "";
    var string = "";
    if (this._type) {
      var isdoctype = this._type.match(/^\!/);
      var isschema = this._type.match(/^\?/);
      string += id + "<" + String(this._type);
      // Attributes
      for (var k in this) {
        if (this.hasOwnProperty(k) && !k.match(/^_/) && k != "toString") {
          if (this[k])
            string += " " + k + "=\"" + String(this[k]).replace(/"/g, "&quot;") + "\"";
          else
            string += " " + k;
        }
      }
      if (!isdoctype) {
        if (this._children.length > 0)
          string += ">";
        else if (isschema)
          string += "?>"
        else
          string += "/>";
      } else {
        string += " ";
      }
    }
    // Children
    for (var i = 0; i < this._children.length; i++) {
      var child = this._children[i];
      if (child.constructor == String) {
        string += child;
      } else {
        string += nl + this._children[i].toString(indention, level + 1);
        if (i == this._children.length - 1) string += nl + id;
      }
    }
    if (this._type) {
      if (this._children.length > 0 && !isdoctype && !isschema)
        string += "</" + String(this._type) + ">";
      if (isdoctype)
        string += ">";
    }
    return string;
  }

  ns.xmgen.Element = Element;
})(window);
