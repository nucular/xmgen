$(function() {
  var $html = $("#html");
  var $render = $("#render");
  var $toggle = $("#toggle");
  var $status = $("#status");

  var code = CodeMirror.fromTextArea($("#code")[0], {
    mode: "javascript",
    lineNumbers: true
  });

  function now() {
    if (window.performance)
      return window.performance.now();
    else
      return new Date();
  }

  function count(el) {
    var c = 1;
    if (el._children) {    
      for (var i = 0; i < el._children.length; i++) {
        c += count(el._children[i]);
      }
    }
    return c;
  }

  function update() {
    try {
      var element = new Function(
        "with(xmgen.svg) with (xmgen.html) {"
        + code.getValue()
        + "}"
      )();

      if ($toggle.hasClass("down")) {
        var t1 = now();
        var xml = element.toString(2);
        t1 = Math.floor(now() - t1);
        var t2 = now();
        $html.text(xml);
        t2 = Math.floor(now() - t2);
        $status.text(
          "Generated " + count(element) + " elements in " + t1
          + " ms, appended to DOM in " + t2 + " ms"
        );
        CodeMirror.colorize([$html[0]], "xml");
      } else {
        var t1 = now();
        var xml = element.toString();
        t1 = Math.floor(now() - t1);
        var t2 = now();
        $render.html(xml);
        t2 = Math.floor(now() - t2);
        $status.text(
          "Generated " + count(element) + " elements in " + t1
          + " ms, appended to DOM in " + t2 + " ms"
        );
        CodeMirror.colorize($render.find("pre"));
      }
      $status.css("color", null);
    } catch (e) {
      $status.text(e.toString());
      $status.css("color", "#f22");
    }
  }

  code.on("change", update);
  $toggle.on("click", function() {
    if (toggle.hasClass("down")) {
      toggle.removeClass("down");
      $html.html("");
    } else {
      toggle.addClass("down");
      $render.html("");
    }
    update();
  });
  update();
});
