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
      "with(xmgen.svg) { with (xmgen.html) { return "
      + code.getValue()
      + "}}"
    )();
    error.innerText = "";
  } catch (e) {
    error.innerText = e.toString();
  }
  if (toggle.classList.contains("down")) {
    html.innerText = element.toString(2);
    CodeMirror.colorize([html], "xml");
  } else {
    render.innerHTML = element.toString();
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
