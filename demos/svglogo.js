return svg({
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  viewBox: "0 0 100 100",
  width: "100%", height: 300
})(
  rect({
    id: "background",
    fill: "#FF9900",
    width: 100, height: 100,
    rx: 4, ry: 4
  }),

  rect({
    id: "top-left",
    fill: "#FFB13B",
    width: 50, height: 50,
    rx: 4, ry: 4
  }),

  rect({
    id: "bottom-right",
    x: 50, y: 50,
    fill: "#DE8500",
    width: 50, height: 50,
    rx: 4, ry: 4
  }),
  
  g({
    id: "circles",
    fill: "#FF9900"
  })(
    function() {
      for (var i = 0; i < 8; i++) {
        this(circle({
          cx: Math.cos((i / 8) * Math.PI*2) * 31.5 + 50,
          cy: Math.sin((i / 8) * Math.PI*2) * 31.5 + 50,
          r: 18.4
        }));
      }
    }
  ),
  
  g({id: "stars"})(
    path({
      id: "black-star",
      d: function() {
        var p = "M 63.086,18.385";
        for (var i = 0; i < 8; i++) {
          var x = Math.cos(((i+1) / 8) * Math.PI*2) * 26;
          var y = Math.sin(((i+1) / 8) * Math.PI*2) * 26;
          var x1 = y * 0.7;
          var y1 = -x * 0.7;
          var x2 = x1 + x;
          var y2 = y1 + y;
          p += "\nc " + x1 + "," + y1 + " " + x2 + "," + y2 + " " + x + "," + y + "";
        }
        return p + "\n";
      },
      fill: "#000000"
    }),

    g({id: "white-star"})(
      function() {
        for (var i = 0; i < 8; i++) {
          var x1 = Math.cos((i / 8) * Math.PI*2) * 31.5 + 50;
          var y1 = Math.sin((i / 8) * Math.PI*2) * 31.5 + 50;
          var x2 = Math.cos(((i-4) / 8) * Math.PI*2) * 31.5 + 50;
          var y2 = Math.sin(((i-4) / 8) * Math.PI*2) * 31.5 + 50;
          this(line({
            x1, y1, x2, y2,
            "stroke-width": 10,
            stroke: "#FFFFFF"
          }));
          this(circle({
            cx: x1, cy: y1,
            r: 7,
            fill: "#FFFFFF"
          }));
        }
      }
    )
  ),
  
  g({id: "svg-textbox"})(
    path({
      id: "text-backdrop",
      fill: "black",
      d: "M  5.30,50.00\n"
      + "H 94.68\n"
      + "V 90.00\n"
      + "Q 94.68,95.00 89.68,95.00\n"
      + "H 10.30\n"
      + "Q  5.30,95.00  5.30,90.00 Z"
    }),
    
    path({
      id: "shine",
      fill: "#3F3F3F",
      d: "M  14.657,54.211"
      + "h  71.394"
      + "c   2.908, 0.000   5.312, 2.385   5.312, 5.315"
      + "v  17.910"
      + "c -27.584,-3.403 -54.926,-8.125 -82.011,-7.683"
      + "V  59.526"
      + "C   9.353,56.596  11.743,54.211  14.657,54.211"
        + "L  14.657,54.211 z"
    }),
    
    g({id: "svg-text"})(
      title()("SVG"),
      
      path({
        id: "S",
        fill: "#FFFFFF",
        stroke: "#000000",
        "stroke-width": 0.5035,
        d: "M 18.312,72.927"
          + "c -2.103,-2.107  -3.407, -5.028  -3.407, -8.253"
          + "c  0.000,-6.445   5.223,-11.672  11.666,-11.672"
          + "c  6.446, 0.000  11.667,  5.225  11.667, 11.672"
          + "h -6.832"
          + "c  0.000,-2.674  -2.168, -4.837  -4.835, -4.837"
          + "c -2.663, 0.000  -4.838,  2.163  -4.838,  4.837"
          + "c  0.000, 1.338   0.549,  2.536   1.415,  3.420"
          + "l  0.000, 0.000"
          + "c  0.883, 0.874   2.101,  1.405   3.423,  1.405"
          + "v  0.012"
          + "c  3.232, 0.000   6.145,  1.309   8.243,  3.416"
          + "l  0.000, 0.000"
          + "c  2.118, 2.111   3.424,  5.034   3.424,  8.248"
          + "c  0.000, 6.454  -5.221, 11.680 -11.667, 11.680"
          + "c -6.442, 0.000 -11.666, -5.222 -11.666,-11.680"
          + "h  6.828"
          + "c  0.000, 2.679   2.175,  4.835   4.838,  4.835"
          + "c  2.667, 0.000   4.835, -2.156   4.835, -4.835"
          + "c  0.000,-1.329  -0.545, -2.527  -1.429, -3.407"
          + "l  0.000, 0.000"
          + "c -0.864,-0.880  -2.082, -1.418  -3.406, -1.418"
          + "l  0.000, 0.000"
          + "C 23.341,76.350  20.429, 75.036  18.312, 72.927"
          + "L 18.312,72.927"
          + "L 18.312,72.927 z" 
      }),
      
      polygon({
        id: "V",
        fill: "#FFFFFF",
        stroke: "#000000",
        "stroke-width": 0.5035,
        points: "61.588,53.005\n"
          + "53.344,92.854\n"
          + "46.494,92.854\n"
          + "38.236,53.005\n"
          + "45.082,53.005\n"
          + "49.920,76.342\n"
          + "54.755,53.005"
      }),
      
      path({
        id: "G",
        fill: "#FFFFFF",
        stroke: "#000000",
        "stroke-width": 0.5035,
        d: "M 73.255,69.513"
          + "h 11.683"
          + "v 11.664"
          + "l  0.000, 0.000"
          + "c  0.000, 6.452  -5.226,11.678 -11.669, 11.678"
          + "c -6.441, 0.000 -11.666,-5.226 -11.666,-11.678"
          + "l  0.000, 0.000"
          + "V 64.676"
          + "h -0.017"
          + "C 61.586,58.229  66.827,53.000  73.253, 53.000"
          + "c  6.459, 0.000  11.683, 5.225  11.683, 11.676"
          + "h -6.849"
          + "c  0.000,-2.674  -2.152,-4.837  -4.834, -4.837"
          + "c -2.647, 0.000  -4.820, 2.163  -4.820,  4.837"
          + "v 16.501"
          + "l  0.000, 0.000"
          + "c  0.000, 2.675   2.173, 4.837   4.820,  4.837"
          + "c  2.682, 0.000   4.834,-2.162   4.834, -4.827"
          + "v -0.012"
          + "v -4.827"
          + "h -4.834"
          + "L 73.255,69.513"
          + "L 73.255,69.513 z"
      })
    )
  )
);
