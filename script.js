$(function() {
  var $demos = $("#demos");
  var $html = $("#html");
  var $render = $("#render");
  var $toggle = $("#toggle");
  var $status = $("#status");

  var code = CodeMirror.fromTextArea($("#code")[0], {
    mode: "javascript",
    lineNumbers: true
  });
  var lastHash = "";

  function now() {
    if (window.performance)
      return window.performance.now();
    else
      return new Date();
  }

  function countNodes(el) {
    var c = 1;
    if (el._children) {    
      for (var i = 0; i < el._children.length; i++) {
        c += countNodes(el._children[i]);
      }
    }
    return c;
  }

  function loadDemo(name) {
    $("#demos > .on").removeClass("on");
    return $.get(
      "demos/" + xmgen.demos[name],
      null,
      function(data) {
        $("a[href=\"#" + encodeURIComponent(name) + "\"]").addClass("on");
        code.setValue(data);
      },
      "text"
    )
  }

  function checkHash() {
    var hash = decodeURIComponent(window.location.hash.substr(1));
    if (hash != lastHash) {
      loadDemo(hash);
      lastHash = hash;
      return true;
    }
    return false;
  }

  function update() {
    try {
      var element = new Function(
        "with(xmgen.svg()) with (xmgen.html()) {"
        + code.getValue()
        + "}"
      )();

      if ($toggle.hasClass("on")) {
        var t1 = now();
        var xml = element.toString(2);
        t1 = Math.floor(now() - t1);
        var t2 = now();
        $html.text(xml);
        t2 = Math.floor(now() - t2);
        $status.text(
          "Generated " + countNodes(element) + " elements in " + t1
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
          "Generated " + countNodes(element) + " elements in " + t1
          + " ms, appended to DOM in " + t2 + " ms"
        );
        CodeMirror.colorize($render.find("pre"));
      }
      $status.css("color", "#000");
    } catch (e) {
      $status.text(e.toString());
      $status.css("color", "#f22");
    }
  }

  code.on("change", update);
  $(".button.toggle").on("click", function() {
    if ($(this).hasClass("on"))
      $(this).removeClass("on");
    else
      $(this).addClass("on");
  });
  $toggle.on("click", function() {
    if ($toggle.hasClass("on"))
      $render.html("");
    else
      $html.html("");
    update();
  })

  for (var i in xmgen.demos) {
    if (xmgen.demos.hasOwnProperty(i)) {
      $demos.append(
        $("<a class=\"flat button\">")
          .attr("href", "#" + encodeURIComponent(i))
          .text(i)
      );
    }
  }
  
  if (!checkHash())
    loadDemo("Documentation");
  setInterval(checkHash, 100);
});
