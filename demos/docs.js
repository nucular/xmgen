return div()(
  svg({width: 100, height: 100})(
    function(push) {
      for (var i = 0; i < 100; i += 5) {
        push(line({
          x1: i - 5, y1: Math.sin((i - 5) / 10) * (100 / Math.PI) + 50,
          x2: i, y2: Math.sin(i / 10) * (100 / Math.PI) + 50,
          stroke: "black", "stroke-width": "2"
        }));
      }
    }
  ),

  p()(
    h1()("xmgen"),
    i()("A JavaScript XML generator in ~100 lines")
  ),

  p() (
    "Check out the source on ",
    a({href: "https://github.com/nucular/xmgen"})("GitHub"), "."
  ),

  h1()("Documentation"),
  p() (
    "xmgen is split into multiple parts - the ",
    a({href: "https://github.com/nucular/xmgen/blob/master/src/xmgen.js"})("core"),
    " and extension modules (currently for ",
    a({href: "https://github.com/nucular/xmgen/blob/master/src/html.js"})("HTML"),
    " and ",
    a({href: "https://github.com/nucular/xmgen/blob/master/src/svg.js"})("SVG"),
    ") which provide shortcuts for common element types that (combined with ",
    code()("with"), ") make element structures shorter and more legible."
  ),
  
  hr(),
  h2()("xmgen.js"),

  h3()("xmgen.Element(String|Function type, [Object attributes]) => Function"),
  pre({"data-lang": "javascript"})(
    "var link = xmgen.Element(\"a\", {\n",
    "  \"href\": \"https://asdf.com\"\n",
    "});\n"
  ),
  p()(
    "This pseudo-class contains the main implementation of xmgen. ",
    "The idea is that a call to ", code()("xmgen.Element"), " returns a ",
    "function-instance bastard which, when called, processes the arguments as ",
    "children for the instance and then returns itself to allow for method chaining."
  ),
  p()(
    "The ", code()("type"), " as well as the ", code()("attributes"), " can be ",
    "functions which will be resolved in the constructor (the instance is passed as ",
    code()("this"), "), to allow anonymous functions to be used in element structures."
  ),
  p()(
    b()("There are a few special cases to be aware of:"),
    ul()(
      li()(
        "Attributes with a value of ", code()("null"), " will be valueless ",
        "in the generated XML."
      ),
      li()(
        "To stop an empty element from collapsing (e.g. ",
        code()("&lt;script&gt;"), "s), append an empty text child to it:",
        br(), code()("script({src: \"...\"})(\"\")")
      ),
      li()(
        "If the element type is empty, no tags will be generated for it by ",
        code()("toString"), " (only the children will be concatenated and returned)."
      ),
      li()(
        "Types starting with a \"!\" are handled as doctypes. They don't ",
        "get closed and their children are put before the \">\" of the tag instead."
      ),
      li()(
        "Types starting with a \"?\" are handled as schema tags. They aren't ",
        "closed either and if collapsed, end with \"?>\" instead of \"/>\"."
      )
    )
  ),

  h3()("xmgen.Element(...)(Element|String|Array|Function child, ...) => Function"),
  pre({"data-lang": "javascript"})(
    "link(\n",
    "  \"Text child \",\n",
    "  xmgen.Element(\"b\")(\"Element child\"), \" \", \n",
    "  function() {\n",
    "    for (var i = 0; i &lt; 5; i++) {\n",
    "      this(xmgen.Element(\"i\")(i));\n",
    "    }\n",
    "  }\n",
    ");"
  ),
  p()(
    "The children passed as arguments can be other ", code()("Element"), "s, ",
    code()("String"), "s or ", code()("Array"), "s/", code()("Function"), "s ",
    "containing/returning objects of these types (or nothing at all)."
  ),
  p()(
    "If a ", code()("Function"), " is processed, it is called (the instance is ",
    "passed as ", code()("this"), ") and can append children itself by returning ",
    "something or calling ", code()("this(child, ...)"), " to recursively process ",
    "more things."
  ),

  h3()("xmgen.Element(...)([Number indention, [Number level]]) => String"),
  pre({"data-lang": "javascript"})("link.toString(2)"),
  pre({"data-lang": "xml"})(
    "&lt;a href=\"https://asdf.com\"&gt;Text child \n",
    "  &lt;b&gt;Element child&lt;/b&gt; \n",
    "  &lt;i&gt;0&lt;/i&gt;\n",
    "  &lt;i&gt;1&lt;/i&gt;\n",
    "  &lt;i&gt;2&lt;/i&gt;\n",
    "  &lt;i&gt;3&lt;/i&gt;\n",
    "  &lt;i&gt;4&lt;/i&gt;\n",
    "&lt;/a&gt;"
  ),
  p()(
    "This function generates valid XML from an ", code()("Element"), " by ",
    "recursively calling ", code()("toString"), " on its children. Optionally, ",
    "indention can be used to make the output slightly more legible."
  ),

  hr(),
  h2()("html.js and svg.js"),
  pre({"data-lang": "javascript"})(
    "var doc;\n",
    "with (xmgen.html()) {\n",
    "  doc = el()(\n",
    "    p()(\n",
    "      h1()(\"xmgen\"),\n",
    "      i()(\"A JavaScript XML generator in ~100 lines\")\n",
    "    ),\n",
    "    \"Check out the source on \",\n",
    "    a({\n",
    "      href: \"https://github.com/nucular/xmgen\"\n",
    "    })(\"GitHub\"), \".\"\n",
    "  );\n",
    "}"
  ),

  p()(
    "These extension modules (that should be loaded after xmgen.js) define ",
    "constructor functions for the basic elements used in the respective XML-based ",
    "markup language. They implement functions that return an ",
    code()("Object"), " to be used with the ", code()("with"), " keyword."
  ),
  p()(
    "Doctypes and schema tags are prefixed with a $ (", code()("$DOCTYPE, $svg"),
    ") and ", code()("xmgen.Element"), " is shortened to ", code()("el"), "."
  )
);
