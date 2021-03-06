(function() {
  var isCJS = typeof module !== "undefined" && module.exports;
  if (isCJS)
    var Element = require("xmgen/lib/xmgen");
  else if (window.xmgen)
    var Element = window.xmgen.Element;

  function ctor(type) {
    return function(attributes) {
      return new Element(type, attributes);
    }
  }

  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element
  var html = function() {
    return {
      Element: Element,
      el: Element,

      $DOCTYPE: ctor("!DOCTYPE"),
      $xml: ctor("?xml"),
      html: ctor("html"),

      base: ctor("base"),
      head: ctor("head"),
      link: ctor("link"),
      meta: ctor("meta"),
      style: ctor("style"),
      title: ctor("title"),

      script: ctor("script"),
      noscript: ctor("noscript"),

      address: ctor("address"),
      article: ctor("article"),
      body: ctor("body"),
      footer: ctor("footer"),
      header: ctor("header"),
      h1: ctor("h1"),
      h2: ctor("h2"),
      h3: ctor("h3"),
      h4: ctor("h4"),
      h5: ctor("h5"),
      h6: ctor("h6"),
      hgroup: ctor("hgroup"),
      section: ctor("section"),
      nav: ctor("nav"),

      dd: ctor("dd"),
      div: ctor("div"),
      dl: ctor("dl"),
      dt: ctor("dt"),
      figcaption: ctor("caption"),
      figure: ctor("figure"),
      hr: ctor("hr"),
      li: ctor("li"),
      main: ctor("main"),
      ol: ctor("ol"),
      p: ctor("p"),
      pre: ctor("pre"),
      ul: ctor("ul"),
      blockquote: ctor("blockquote"),

      a: ctor("a"),
      em: ctor("em"),
      strong: ctor("strong"),
      small: ctor("small"),
      s: ctor("s"),
      cite: ctor("cite"),
      q: ctor("q"),
      dfn: ctor("dfn"),
      abbr: ctor("abbr"),
      data: ctor("data"),
      time: ctor("time"),
      code: ctor("code"),
      //var: ctor("var"),
      samp: ctor("samp"),
      kbd: ctor("kbd"),
      sub: ctor("sub"),
      sup: ctor("sup"),
      i: ctor("i"),
      b: ctor("b"),
      u: ctor("u"),
      mark: ctor("mark"),
      ruby: ctor("ruby"),
      rt: ctor("rt"),
      rp: ctor("rp"),
      bdi: ctor("bdi"),
      bdo: ctor("bdo"),
      span: ctor("span"),
      br: ctor("br"),
      wbr: ctor("wbr"),

      ins: ctor("ins"),
      del: ctor("del"),

      img: ctor("img"),
      iframe: ctor("iframe"),
      embed: ctor("embed"),
      object: ctor("object"),
      param: ctor("param"),
      video: ctor("video"),
      audio: ctor("audio"),
      source: ctor("source"),
      track: ctor("track"),
      canvas: ctor("canvas"),
      map: ctor("map"),
      area: ctor("area"),
      svg: ctor("svg"),
      math: ctor("math"),

      table: ctor("table"),
      caption: ctor("caption"),
      colgroup: ctor("colgroup"),
      col: ctor("col"),
      tbody: ctor("tbody"),
      thead: ctor("thead"),
      tfoot: ctor("tfoot"),
      tr: ctor("tr"),
      td: ctor("td"),
      th: ctor("th"),

      form: ctor("form"),
      fieldset: ctor("fieldset"),
      legend: ctor("legend"),
      label: ctor("label"),
      input: ctor("input"),
      button: ctor("button"),
      select: ctor("select"),
      datalist: ctor("datalist"),
      optgroup: ctor("optgroup"),
      option: ctor("option"),
      textarea: ctor("textarea"),
      keygen: ctor("keygen"),
      output: ctor("output"),
      progress: ctor("progress"),
      meter: ctor("meter"),

      details: ctor("details"),
      summary: ctor("summary"),
      command: ctor("command"),
      menu: ctor("menu")
    }
  };

  if (isCJS)
    module.exports = html;
  else
    window.xmgen.html = html;
})();
