(function() {
  var html = document.getElementById("html");
  var render = document.getElementById("render");
  var toggle = document.getElementById("toggle");
  var status = document.getElementById("status");

  var code = CodeMirror.fromTextArea(document.getElementById("code"), {
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
        "with(xmgen.svg) { with (xmgen.html) {"
        + code.getValue()
        + "}}"
      )();

      if (toggle.classList.contains("down")) {
        var t1 = now();
        var xml = element.toString(2);
        t1 = Math.floor(now() - t1);
        var t2 = now();
        html.textContent = xml;
        t2 = Math.floor(now() - t2);
        status.textContent = "Generated "
          + count(element) + " elements in " + t1
          + " ms, appended to DOM in " + t2 + " ms";
        CodeMirror.colorize([html], "xml");
      } else {
        var t1 = now();
        var xml = element.toString(1);
        t1 = Math.floor(now() - t1);
        var t2 = now();
        render.innerHTML = xml;
        t2 = Math.floor(now() - t2);
        status.textContent = "Generated "
          + count(element) + " elements in " + t1
          + " ms, appended to DOM in " + t2 + " ms";
        CodeMirror.colorize(render.getElementsByTagName("pre"));
      }
      status.style.color = null;
    } catch (e) {
      status.textContent = e.toString();
      status.style.color = "#f22";
    }
  }

  code.on("change", update);
  toggle.addEventListener("click", function() {
    if (toggle.classList.contains("down")) {
      toggle.classList.remove("down");
      html.innerHTML = "";
    } else {
      toggle.classList.add("down");
      render.innerHTML = "";
    }
    update();
  });
  update();
})();
