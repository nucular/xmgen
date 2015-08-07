var R = 100; // outer ring radius
var r = 3; // inner ring radius
var o = 100; // pen offset

var limit = 100;
var step = 0.1;

var p = path({
  stroke: "rgba(0,0,0,0.3)",
  fill: "none"
});

var minx = Infinity, maxx = 0, miny = Infinity, maxy = 0;
if (limit / step > 50000)
  throw Error("You probably don't want " + limit / step + " lines");

for (var i = 0; i < limit; i += step) {
  var x = (R + r) * Math.cos(i) - (r + o) * Math.cos(((R + r) / r) * i);
  var y = (R + r) * Math.sin(i) - (r + o) * Math.sin(((R + r) / r) * i);

  if (i == 0) {
    p.d = "M " + x + "," + y;
  }

  minx = Math.min(minx, x);
  maxx = Math.max(maxx, x);
  miny = Math.min(miny, y);
  maxy = Math.max(maxy, y);

  p.d += "\nL " + x + "," + y;
}

window.saveSVG = function(el, filename) {
  var url = window.URL.createObjectURL(new Blob(
    [el[0].outerHTML],
    {"type": "image/svg+xml;charset=utf-8"}
  ));

  var a = $("<a>")
    .attr("download", filename + ".svg")
    .attr("href", url)
    .css("display", "none")
    .appendTo("body");
  a[0].click();

  setTimeout(function() {
    a.remove();
    window.URL.revokeObjectURL(url);
  }, 10);
}

window.savePNG = function(el, filename) {
  var canvas = $("<canvas>")
    .attr("width", el.width())
    .attr("height", el.height())
    .css("display", "none")
    .appendTo("body");
  var ctx = canvas[0].getContext("2d");
  var url = window.URL.createObjectURL(new Blob(
    [el[0].outerHTML],
    {type: "image/svg+xml;charset=utf-8"}
  ));
  var img = new Image();
  img.src = url;

  img.onload = function() {
    ctx.drawImage(img, 0, 0);
    window.URL.revokeObjectURL(url);

    var url = canvas[0].toDataURL("image/png");
    var a = $("<a>")
      .attr("download", filename + ".png")
      .attr("href", url)
      .css("display", "none")
      .appendTo("body");
    a[0].click();

    setTimeout(function() {
      a.remove();
    }, 10);
  }
}

return div()(
  svg({
    id: "spiro",
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    width: "100%", height: "300px",
    viewBox: minx + " " + miny + " " + maxx*2 + " " + maxy*2
  })(p),
  span({
    class: "group",
    style: "position: absolute;"
      + "bottom: 10px;"
      + "left: 10px;"
      + "white-space: nowrap;"
  })(
    span({
      class: "button",
      onclick: "saveSVG($(\"#spiro\"), \"spirograph-R"
        + R + "-r" + r + "-o" + o + "-l" + limit + "-s" + step + "\")"
    })("SVG"),
    span({
      class: "button",
      onclick: "savePNG($(\"#spiro\"), \"spirograph-R"
        + R + "-r" + r + "-o" + o + "-l" + limit + "-s" + step + "\")"
    })("PNG")
  )
);
