(function(ns) {
  ns.xmgen = ns.xmgen || {};

  function ctor(type) {
    return function(attributes) {
      return new ns.xmgen.Element(type, attributes);
    }
  }

  // https://developer.mozilla.org/en-US/docs/Web/SVG/Element
  ns.xmgen.svg = function() {
    return {
      Element: ns.xmgen.Element,
      el: ns.xmgen.Element,

      $svg: ctor("?svg"),
      $xml: ctor("?xml"),

      animate: ctor("animate"),
      animateColor: ctor("animateColor"),
      animateMotion: ctor("animateMotion"),
      animateTransform: ctor("animateTransform"),
      mpath: ctor("mpath"),
      set: ctor("set"),

      circle: ctor("circle"),
      ellipse: ctor("ellipse"),
      line: ctor("line"),
      polygon: ctor("polygon"),
      polyline: ctor("polyline"),
      rect: ctor("rect"),

      a: ctor("a"),
      defs: ctor("defs"),
      glyph: ctor("glyph"),
      g: ctor("g"),
      marker: ctor("marker"),
      mask: ctor("mask"),
      missingGlyph: ctor("missing-glyph"),
      pattern: ctor("pattern"),
      svg: ctor("svg"),
      //switch: ctor("switch"),
      symbol: ctor("symbol"),

      desc: ctor("desc"),
      metadata: ctor("metadata"),
      title: ctor("title"),

      feBlend: ctor("feBlend"),
      feColorMatrix: ctor("feColorMatrix"),
      feComponentTransfer: ctor("feComponentTransfer"),
      feComposite: ctor("feComposite"),
      feConvolveMatrix: ctor("feConvolveMatrix"),
      feDiffuseLighting: ctor("feDiffuseLighting"),
      feDisplacementMap: ctor("feDisplacementMap"),
      feFlood: ctor("feFlood"),
      feFuncA: ctor("feFuncA"),
      feFuncB: ctor("feFuncB"),
      feFuncG: ctor("feFuncG"),
      feFuncR: ctor("feFuncR"),
      feGaussianBlur: ctor("feGaussianBlur"),
      feImage: ctor("feImage"),
      feMerge: ctor("feMerge"),
      feMergeNode: ctor("feMergeNode"),
      feMorphology: ctor("feMorphology"),
      feOffset: ctor("feOffset"),
      feSpecularLighting: ctor("feSpecularLighting"),
      feTile: ctor("feTile"),
      feTurbulence: ctor("feTurbulence"),

      font: ctor("font"),
      fontFace: ctor("font-face"),
      fontFaceFormat: ctor("font-face-format"),
      fontFaceName: ctor("font-face-name"),
      fontFaceSrc: ctor("font-face-src"),
      fontFaceUri: ctor("font-face-uri"),
      hkern: ctor("hkern"),
      vkern: ctor("vkern"),

      linearGradient: ctor("linearGradient"),
      radialGradient: ctor("radialGradient"),
      stop: ctor("stop"),

      image: ctor("image"),
      path: ctor("path"),
      text: ctor("text"),
      use: ctor("use"),

      feDistantLight: ctor("feDistantLight"),
      fePointLight: ctor("fePointLight"),
      feSpotLight: ctor("feSpotLight"),

      altGlyph: ctor("altGlyph"),
      altGlyphDef: ctor("altGlyphDef"),
      altGlyphItem: ctor("altGlyphItem"),
      glyphRef: ctor("glyphRef"),
      textPath: ctor("textPath"),
      tref: ctor("tref"),
      tspan: ctor("tspan"),

      clipPath: ctor("clipPath"),
      colorProfile: ctor("colorProfile"),
      cursor: ctor("cursor"),
      filter: ctor("filter"),
      foreignObject: ctor("foreignObject"),
      script: ctor("script"),
      style: ctor("style"),
      view: ctor("view")
    }
  }
})(window);
