/* Generated by Opal 0.7.0.beta4 */
(function(Opal) {
  Opal.dynamic_require_severity = "error";
  var self = Opal.top, $scope = Opal, nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $hash2 = Opal.hash2;

  Opal.add_stubs(['$require', '$/', '$empty?', '$begin_path', '$to_s', '$new', '$instance_eval', '$to_proc', '$start', '$fill', '$>', '$stroke', '$turtlewax_goto', '$-', '$*', '$to_i', '$<', '$toRad', '$+', '$cos', '$sin', '$draw!', '$sleep', '$turn', '$forward', '$%', '$abs', '$[]', '$rgb', '$class', '$eval', '$message', '$join', '$backtrace', '$html_escape']);
  self.$require("erb");
  (function($base, $super) {
    function $Turtle(){};
    var self = $Turtle = $klass($base, $super, 'Turtle', $Turtle);

    var def = self.$$proto, $scope = self.$$scope, TMP_1, TMP_2, TMP_3;

    def.strokeStyle = def.lineWidth = def.fillStyle = def.x = def.y = def.dir = def.pen = def.speed = nil;
    (Opal.cvars['@@Rad'] = (($scope.get('Math')).$$scope.get('PI'))['$/'](180.0));

    def.$initialize = function() {
      var $a, self = this;

      self.dir = -90;
      self.x = 200;
      self.y = 200;
      self.speed = 100;
      self.strokeStyle = "\"#000\"";
      document.getElementById("mycanvas").getContext("2d").strokeStyle= self.strokeStyle;;
      self.lineWidth = 1;
      document.getElementById("mycanvas").getContext("2d").lineWidth = self.lineWidth;;
      self.fillStyle = "";
      if ((($a = self.fillStyle['$empty?']()) !== nil && (!$a.$$is_boolean || $a == true))) {
        } else {
        document.getElementById("mycanvas").getContext("2d").fillStyle = self.fillStyle;;
      };
      self.pen = true;
      
     canvas = document.getElementById("mycanvas");
     context = canvas.getContext("2d");
     context.clearRect( 0 , 0 , canvas.width, canvas.height);
     
      self.$begin_path();
      return console.log(self.$to_s());;
    };

    def.$to_s = function() {
      var self = this;

      return "x: " + (self.x) + " y: " + (self.y) + " dir: " + (self.dir) + " pen down? " + (self.pen) + " linewidth: " + (self.lineWidth) + " fillStyle='" + (self.fillStyle) + "'";
    };

    Opal.defs($scope.get('Turtle'), '$start', TMP_1 = function() {
      var $a, $b, self = this, $iter = TMP_1.$$p, script = $iter || nil, t = nil;

      TMP_1.$$p = null;
      console.log( "about to make self" );
      t = self.$new();
      console.log( "done making self" );
      ($a = ($b = t).$instance_eval, $a.$$p = script.$to_proc(), $a).call($b);
      return console.log( "done with eval in start" );
    });

    Opal.defs($scope.get('Turtle'), '$draw', TMP_2 = function() {
      var $a, $b, self = this, $iter = TMP_2.$$p, script = $iter || nil;

      TMP_2.$$p = null;
      return ($a = ($b = $scope.get('Turtle')).$start, $a.$$p = script.$to_proc(), $a).call($b);
    });

    def.$stroke = function() {
      var self = this;

      document.getElementById("mycanvas").getContext("2d").stroke();
    };

    def.$fill = function() {
      var self = this;

      document.getElementById("mycanvas").getContext("2d").fill();
    };

    def.$begin_path = function() {
      var self = this;

      
    console.log( "begin path" )
    context = document.getElementById("mycanvas").getContext("2d");
    context.beginPath();
     context.moveTo(self.x,self.y);
     console.log("starting at " + self.x + "," + self.y);
    ;
    };

    def.$close = function() {
      var self = this;

      document.getElementById("mycanvas").getContext("2d").closePath();
    };

    def['$draw!'] = function() {
      var $a, self = this;

      console.log("drawing");
      if ((($a = self.fillStyle['$empty?']()) !== nil && (!$a.$$is_boolean || $a == true))) {
        } else {
        console.log("filling");
        self.$fill();
      };
      if (self.lineWidth['$>'](0)) {
        console.log("stroke");
        return self.$stroke();
        } else {
        return nil
      };
    };

    def.$background = function(color) {
      var self = this;

      
      console.warn('background not implemented yet')
      color
       ;
      return nil;
    };

    def.$pensize = function(size) {
      var self = this;

      self.lineWidth = size;
      return document.getElementById("mycanvas").getContext("2d").lineWidth = self.lineWidth;
    };

    def.$pencolor = function(color) {
      var self = this;

      self.strokeStyle = color;
      document.getElementById("mycanvas").getContext("2d").strokeStyle = self.strokeStyle;
      return console.log("setting stroke style to " + self.strokeStyle);
    };

    def.$pen = function(bool) {
      var $a, self = this;

      self.pen = true;
      if ((($a = (bool)) !== nil && (!$a.$$is_boolean || $a == true))) {
        return nil
        } else {
        return self.pen = false
      };
    };

    def.$turtlewax_goto = function(x, y) {
      var $a, self = this;

      self.x = x;
      self.y = y;
      if ((($a = self.pen) !== nil && (!$a.$$is_boolean || $a == true))) {
        document.getElementById("mycanvas").getContext("2d").lineTo(x, y);
        } else {
        document.getElementById("mycanvas").getContext("2d").moveTo(x, y);
      };
    };

    def.$goto = function(x, y) {
      var self = this, p = nil;

      document.getElementById("mycanvas").getContext("2d").beginPath();
      p = self.pen;
      self.pen = true;
      self.$turtlewax_goto(x, y);
      return self.pen = p;
    };

    def.$setheading = function(heading) {
      var self = this;

      return self.dir = heading['$-'](90);
    };

    def.$toRad = function(degree) {
      var $a, self = this;

      return degree['$*']((($a = Opal.cvars['@@Rad']) == null ? nil : $a));
    };

    def.$speed = function(num) {
      var $a, $b, self = this, s = nil;

      s = num.$to_i();
      if ((($a = (((($b = s['$<'](0)) !== false && $b !== nil) ? $b : s['$>'](100)))) !== nil && (!$a.$$is_boolean || $a == true))) {
        console.warn("bad speed given, setting to 100");
        return self.speed = 100;
        } else {
        self.speed = s;
        return console.info("setting speed to " + s);
      };
    };

    def.$forward = function(distance) {
      var $a, self = this, a = nil;

      console.log("beginning a new path");
      self.$begin_path();
      console.log( "forward " + distance);;
      a = self.$toRad(self.dir);
      self.x = self.x['$+'](distance['$*']($scope.get('Math').$cos(a)));
      self.y = self.y['$+'](distance['$*']($scope.get('Math').$sin(a)));
      console.log("going forward to " + self.x + "," + self.y);;
      if ((($a = self.pen) !== nil && (!$a.$$is_boolean || $a == true))) {
        console.log( "lineto" );
        document.getElementById("mycanvas").getContext("2d").lineTo(self.x, self.y);;
        } else {
        console.log( "moveto" );
        document.getElementById("mycanvas").getContext("2d").moveTo(self.x, self.y);;
      };
      self['$draw!']();
      return self.$sleep((100)['$-'](self.speed));
    };

    def.$backward = function(distance) {
      var self = this;

      self.$turn(-180);
      self.$forward(distance);
      return self.$turn(180);
    };

    def.$turn = function(degrees) {
      var self = this;

      console.log( "turn " + degrees);;
      self.dir = self.dir['$+'](degrees);
      return self.dir = self.dir['$%'](360);
    };

    def.$turnleft = function(degrees) {
      var self = this;

      return self.$turn((-1)['$*'](degrees.$abs()));
    };

    def.$turnright = function(degrees) {
      var self = this;

      return self.$turn(degrees);
    };

    def.$width = function() {
      var self = this, w = nil;

      w = document.getElementById("mycanvas").width();;
      return w.$to_i();
    };

    def.$height = function() {
      var self = this, h = nil;

      h = document.getElementById("mycanvas").height();;
      return h.$to_i();
    };

    def.$method_missing = TMP_3 = function(method, args) {
      var self = this, $iter = TMP_3.$$p, block = $iter || nil;

      args = $slice.call(arguments, 1);
      TMP_3.$$p = null;
      return $scope.get('COLORS')['$[]'](method.$to_s());
    };

    Opal.defs(self, '$rgb', function(r, g, b) {
      var self = this, hex_string = nil;

      hex_string = "#";
      hex_string = hex_string['$+']("%02x"['$%'](r.$to_i()));
      hex_string = hex_string['$+']("%02x"['$%'](g.$to_i()));
      hex_string = hex_string['$+']("%02x"['$%'](b.$to_i()));
      return hex_string;
    });

    def.$rgb = function(r, g, b) {
      var self = this;

      return self.$class().$rgb(r, g, b);
    };

    return Opal.cdecl($scope, 'COLORS', $hash2(["aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "green", "greenyellow", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgreen", "lightgrey", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"], {"aliceblue": self.$rgb(240, 248, 255), "antiquewhite": self.$rgb(250, 235, 215), "aqua": self.$rgb(0, 255, 255), "aquamarine": self.$rgb(127, 255, 212), "azure": self.$rgb(240, 255, 255), "beige": self.$rgb(245, 245, 220), "bisque": self.$rgb(255, 228, 196), "black": self.$rgb(0, 0, 0), "blanchedalmond": self.$rgb(255, 235, 205), "blue": self.$rgb(0, 0, 255), "blueviolet": self.$rgb(138, 43, 226), "brown": self.$rgb(165, 42, 42), "burlywood": self.$rgb(222, 184, 135), "cadetblue": self.$rgb(95, 158, 160), "chartreuse": self.$rgb(127, 255, 0), "chocolate": self.$rgb(210, 105, 30), "coral": self.$rgb(255, 127, 80), "cornflowerblue": self.$rgb(100, 149, 237), "cornsilk": self.$rgb(255, 248, 220), "crimson": self.$rgb(220, 20, 60), "cyan": self.$rgb(0, 255, 255), "darkblue": self.$rgb(0, 0, 139), "darkcyan": self.$rgb(0, 139, 139), "darkgoldenrod": self.$rgb(184, 134, 11), "darkgray": self.$rgb(169, 169, 169), "darkgreen": self.$rgb(0, 100, 0), "darkkhaki": self.$rgb(189, 183, 107), "darkmagenta": self.$rgb(139, 0, 139), "darkolivegreen": self.$rgb(85, 107, 47), "darkorange": self.$rgb(255, 140, 0), "darkorchid": self.$rgb(153, 50, 204), "darkred": self.$rgb(139, 0, 0), "darksalmon": self.$rgb(233, 150, 122), "darkseagreen": self.$rgb(143, 188, 143), "darkslateblue": self.$rgb(72, 61, 139), "darkslategray": self.$rgb(47, 79, 79), "darkturquoise": self.$rgb(0, 206, 209), "darkviolet": self.$rgb(148, 0, 211), "deeppink": self.$rgb(255, 20, 147), "deepskyblue": self.$rgb(0, 191, 255), "dimgray": self.$rgb(105, 105, 105), "dodgerblue": self.$rgb(30, 144, 255), "firebrick": self.$rgb(178, 34, 34), "floralwhite": self.$rgb(255, 250, 240), "forestgreen": self.$rgb(34, 139, 34), "fuchsia": self.$rgb(255, 0, 255), "gainsboro": self.$rgb(220, 220, 220), "ghostwhite": self.$rgb(248, 248, 255), "gold": self.$rgb(255, 215, 0), "goldenrod": self.$rgb(218, 165, 32), "gray": self.$rgb(128, 128, 128), "green": self.$rgb(0, 128, 0), "greenyellow": self.$rgb(173, 255, 47), "honeydew": self.$rgb(240, 255, 240), "hotpink": self.$rgb(255, 105, 180), "indianred": self.$rgb(205, 92, 92), "indigo": self.$rgb(75, 0, 130), "ivory": self.$rgb(255, 255, 240), "khaki": self.$rgb(240, 230, 140), "lavender": self.$rgb(230, 230, 250), "lavenderblush": self.$rgb(255, 240, 245), "lawngreen": self.$rgb(124, 252, 0), "lemonchiffon": self.$rgb(255, 250, 205), "lightblue": self.$rgb(173, 216, 230), "lightcoral": self.$rgb(240, 128, 128), "lightcyan": self.$rgb(224, 255, 255), "lightgoldenrodyellow": self.$rgb(250, 250, 210), "lightgreen": self.$rgb(144, 238, 144), "lightgrey": self.$rgb(211, 211, 211), "lightpink": self.$rgb(255, 182, 193), "lightsalmon": self.$rgb(255, 160, 122), "lightseagreen": self.$rgb(32, 178, 170), "lightskyblue": self.$rgb(135, 206, 250), "lightslategray": self.$rgb(119, 136, 153), "lightsteelblue": self.$rgb(176, 196, 222), "lightyellow": self.$rgb(255, 255, 224), "lime": self.$rgb(0, 255, 0), "limegreen": self.$rgb(50, 205, 50), "linen": self.$rgb(250, 240, 230), "magenta": self.$rgb(255, 0, 255), "maroon": self.$rgb(128, 0, 0), "mediumaquamarine": self.$rgb(102, 205, 170), "mediumblue": self.$rgb(0, 0, 205), "mediumorchid": self.$rgb(186, 85, 211), "mediumpurple": self.$rgb(147, 112, 219), "mediumseagreen": self.$rgb(60, 179, 113), "mediumslateblue": self.$rgb(123, 104, 238), "mediumspringgreen": self.$rgb(0, 250, 154), "mediumturquoise": self.$rgb(72, 209, 204), "mediumvioletred": self.$rgb(199, 21, 133), "midnightblue": self.$rgb(25, 25, 112), "mintcream": self.$rgb(245, 255, 250), "mistyrose": self.$rgb(255, 228, 225), "moccasin": self.$rgb(255, 228, 181), "navajowhite": self.$rgb(255, 222, 173), "navy": self.$rgb(0, 0, 128), "oldlace": self.$rgb(253, 245, 230), "olive": self.$rgb(128, 128, 0), "olivedrab": self.$rgb(107, 142, 35), "orange": self.$rgb(255, 165, 0), "orangered": self.$rgb(255, 69, 0), "orchid": self.$rgb(218, 112, 214), "palegoldenrod": self.$rgb(238, 232, 170), "palegreen": self.$rgb(152, 251, 152), "paleturquoise": self.$rgb(175, 238, 238), "palevioletred": self.$rgb(219, 112, 147), "papayawhip": self.$rgb(255, 239, 213), "peachpuff": self.$rgb(255, 218, 185), "peru": self.$rgb(205, 133, 63), "pink": self.$rgb(255, 192, 203), "plum": self.$rgb(221, 160, 221), "powderblue": self.$rgb(176, 224, 230), "purple": self.$rgb(128, 0, 128), "red": self.$rgb(255, 0, 0), "rosybrown": self.$rgb(188, 143, 143), "royalblue": self.$rgb(65, 105, 225), "saddlebrown": self.$rgb(139, 69, 19), "salmon": self.$rgb(250, 128, 114), "sandybrown": self.$rgb(244, 164, 96), "seagreen": self.$rgb(46, 139, 87), "seashell": self.$rgb(255, 245, 238), "sienna": self.$rgb(160, 82, 45), "silver": self.$rgb(192, 192, 192), "skyblue": self.$rgb(135, 206, 235), "slateblue": self.$rgb(106, 90, 205), "slategray": self.$rgb(112, 128, 144), "snow": self.$rgb(255, 250, 250), "springgreen": self.$rgb(0, 255, 127), "steelblue": self.$rgb(70, 130, 180), "tan": self.$rgb(210, 180, 140), "teal": self.$rgb(0, 128, 128), "thistle": self.$rgb(216, 191, 216), "tomato": self.$rgb(255, 99, 71), "turquoise": self.$rgb(64, 224, 208), "violet": self.$rgb(238, 130, 238), "wheat": self.$rgb(245, 222, 179), "white": self.$rgb(255, 255, 255), "whitesmoke": self.$rgb(245, 245, 245), "yellow": self.$rgb(255, 255, 0), "yellowgreen": self.$rgb(154, 205, 50)}));
  })(self, null);
  return (Opal.Object.$$proto.$turtle_exec = function(code) {
    var self = this, e = nil, code_error = nil;

    try {
    try {
    
    console.log("running Turtle") 
    ;
      self.$eval(code);
      return  
      document.getElementById('code_output').innerHTML= "Success" 
      console.log("Success") 
    ;
    } catch ($err) {if (Opal.rescue($err, [$scope.get('Exception')])) {e = $err;
      code_error = e.$message()['$+']("\n")['$+'](e.$backtrace().$join("\n"));
      
    console.warn("error")
    console.warn(code)
    console.warn(code_error)
    document.getElementById('code_output').innerHTML="<font size=\"3\" color=\"red\">" 
    +  (($scope.get('ERB')).$$scope.get('Util')).$html_escape(code_error) 
    + "</font>"
     ;
      }else { throw $err; }
    }
    } finally {
    nil
    };
  }, nil) && 'turtle_exec';
})(Opal);
