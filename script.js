var html = document.getElementById("html");
var render = document.getElementById("render");
var toggle = document.getElementById("toggle");

var code = CodeMirror.fromTextArea(document.getElementById("code"), {
  mode: "javascript"
});

function autogrow(element) {
  element.style.height = "5px";
  element.style.height = (element.scrollHeight + 5) + "px";
}

function update() {
  var element = new Function(
    "with(xmgen.svg) { with (xmgen.html) { return "
    + code.getValue()
    + "}}"
  )();
  html.innerText = element.toString(2);
  render.innerHTML = element.toString();

  CodeMirror.colorize([html], "xml");

  autogrow(code);
  autogrow(html);
}

code.onkeyup = update;
toggle.onclick = function() {
  if (toggle.classList.contains("down")) {
    toggle.classList.remove("down");
    html.style.display = "none";
    render.style.display = "block";
  } else {
    toggle.classList.add("down");
    html.style.display = "block";
    render.style.display = "none";
  }
}
update();
