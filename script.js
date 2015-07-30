var html = document.getElementById("html");
var render = document.getElementById("render");
var toggle = document.getElementById("toggle");
var error = document.getElementById("error");

var code = CodeMirror.fromTextArea(document.getElementById("code"), {
  mode: "javascript"
});

function update() {
  try {
    var element = new Function(
      "with(xmgen.svg) { with (xmgen.html) {"
      + code.getValue()
      + "}}"
    )();

    error.textContent = "";
    if (toggle.classList.contains("down")) {
      html.textContent = element.toString(2);
      CodeMirror.colorize([html], "xml");
    } else {
      render.innerHTML = element.toString();
      CodeMirror.colorize(render.getElementsByTagName("pre"));
    }
  } catch (e) {
    error.textContent = e.toString();
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
