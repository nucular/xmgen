$(function() {
  var $html = $("#html");
  var $canvas = $("#canvas");
  var $toggle = $("#toggle");
  var $status = $("#status");

  var code = CodeMirror.fromTextArea($("#code")[0], {
    mode: "javascript",
    lineNumbers: true
  });
  var ctx = $canvas[0].getContext("2d");

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

  function render(xml, width, height) {
    width = width || 100;
    height = height || 100;

    var blob = new Blob([xml], {type: "image/svg+xml;charset=utf-8"});
    var url = window.URL.createObjectURL(blob);
    var img = new Image();
    img.src = url;

    ctx.canvas.width = width;
    ctx.canvas.height = height;

    img.onload = function() {
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0);
      window.URL.revokeObjectURL(blob);
    }
  }

  function update() {
    try {
      var element = new Function(
        "with(xmgen.svg) {"
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
          + " ms, rendered in " + t2 + " ms"
        );
        CodeMirror.colorize([$html[0]], "xml");
      } else {
        var t1 = now();
        var xml = element.toString();
        t1 = Math.floor(now() - t1);
        var t2 = now();
        render(xml, element.width, element.height);
        t2 = Math.floor(now() - t2);
        $status.text(
          "Generated " + count(element) + " elements in " + t1
          + " ms, rendered in " + t2 + " ms"
        );
      }
      $status.css("color", "#000");
    } catch (e) {
      $status.text(e.toString());
      $status.css("color", "#f22");
      console.error(e.stack);
    }
  }

  code.on("change", update);
  $toggle.on("click", function() {
    if ($toggle.hasClass("down")) {
      $toggle.removeClass("down");
      $html.html("");
    } else {
      $toggle.addClass("down");
      ctx.canvas.width = 0;
      ctx.canvas.height = 0;
    }
    update();
  });
  update();
});
