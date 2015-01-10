require 'erb' 
# TODO: can I do a raw javascript call, save a variable in that context, and
#       then use that variable later on???
class Turtle
  @@Rad = Math::PI / 180.0
  def initialize
    @dir = -90
    @x = 200
    @y = 200
    @speed = 100

    # this.tag = document.getElementById(tag) || tag;
    
    # this.canvas = this.tag.getContext("2d");
    @strokeStyle = "\"#000\"";
    `document.getElementById("mycanvas").getContext("2d").strokeStyle= #{@strokeStyle};`

    @lineWidth = 1
    `document.getElementById("mycanvas").getContext("2d").lineWidth = #{@lineWidth};`

    @fillStyle = "" 
    # just to allow editing in one place
    unless @fillStyle.empty?
      `document.getElementById("mycanvas").getContext("2d").fillStyle = #{@fillStyle};`
    end

    # This is used in Turtlewax for polar coordinates, but not here (yet)
    # @ox = 0;
    # @oy = 0;
	
    @pen = true;
	
    # clear the context
    %x{
     canvas = document.getElementById("mycanvas");
     context = canvas.getContext("2d");
     context.clearRect( 0 , 0 , canvas.width, canvas.height);
     context.beginPath();
     context.moveTo(#{@x},#{@x});
     console.log(#{self.to_s});
     }
  end
  def to_s
    "x: #{@x} y: #{@y} dir: #{@dir} pen down? #{@pen} linewidth: #{@lineWidth} fillStyle=\'#{@fillStyle}\'"
  end

  def Turtle.start(&script)
    `console.log( "about to make self" )`
    t = self.new
    `console.log( "done making self" )`
    
    #t.begin_path
    #`console.log( "done with begin_path" )`

    # instance eval is what gives this DSL the ability to look so nice, 
    # without having to call t.forward, etc. 
    t.instance_eval(&script)
    `console.log( "done with eval in start" )`
    
    # this is a convenience method that actually implements the
    # drawing commands using the stroke() method
    # t.draw! 

    t.close!
  end

  # opal doesn't seem to alias this well. 
  def Turtle.draw(&script)
    Turtle.start(&script)
  end

  def stroke
    `document.getElementById("mycanvas").getContext("2d").stroke();`
  end	

  def fill
    `document.getElementById("mycanvas").getContext("2d").fill();`
  end

  def begin_path
    `console.log( "begin path" )`
    `document.getElementById("mycanvas").getContext("2d").beginPath();`
  end
  
  def close!
    `document.getElementById("mycanvas").getContext("2d").closePath();`
  end

  # this is a convenience method that actually implements the
  # drawing commands using the stroke() method
  def draw!
    `console.log("drawing")`
 
    unless @fillStyle.empty?
      `console.log("filling")`
      self.fill
    end
    if @lineWidth > 0
      `console.log("stroke")`
      self.stroke
    end
    #`console.log("beginning")`
    # self.begin_path
   `console.log("closing")`
    # self.close
  end

  # ex: blue
  def background(color)
     %x{
      console.warn('background not implemented yet')
      #{color}
       }
    return nil
  end

  # ex: 2
  def pensize(size)
    @lineWidth = size
    `document.getElementById("mycanvas").getContext("2d").lineWidth = #{@lineWidth}`
  end

  # ex: yellow
  def pencolor(color)
    @strokeStyle = color
    `document.getElementById("mycanvas").getContext("2d").strokeStyle = #{@strokeStyle}`
    `console.log("setting stroke style to " + #{@strokeStyle})`
  end

  def pen(bool)
    @pen = true
    unless(bool)
      @pen = false
    end
  end

  # TODO: rename once the naming confusion is gone. 
  def turtlewax_goto(x,y)
    @x = x
    @y = y
    
    # switched the order from turtlewax implementation
    if @pen
      `document.getElementById("mycanvas").getContext("2d").lineTo(x, y);`
    else
      `document.getElementById("mycanvas").getContext("2d").moveTo(x, y);`
    end
  end

    # note that this is kidsruby's name.  goto by turtlewax is around too
  def goto(x, y)
    `document.getElementById("mycanvas").getContext("2d").beginPath();`
	
    p = @pen
    @pen = true
    turtlewax_goto(x, y);
    @pen = p
  end

  def setheading(heading)
    @dir = heading - 90
  end

  def toRad(degree)

    return degree * @@Rad
  end

  def speed(num)
    s = num.to_i
    if(s < 0 || s > 100)
      `console.warn("bad speed given, setting to 100")`
      @speed = 100
    else
      @speed = s
      `console.info("setting speed to " + #{s})`
    end
  end
  def forward(distance)    
    `console.log( "forward")`
    `console.log( #{distance})`
    a = toRad(@dir)
    @x += distance * Math::cos(a)
    @y += distance * Math::sin(a)

    if @pen
      `console.log( "lineto" )`
      `document.getElementById("mycanvas").getContext("2d").lineTo(#{@x}, #{@y});`
      self.draw!
    else
      `console.log( "moveto" )`
      `document.getElementById("mycanvas").getContext("2d").moveTo(#{@x}, #{@y});`
    end
    sleep(100 - @speed)
  end

  def backward(distance)
    self.turn -180
    self.forward(distance)
    self.turn 180
  end

  def turn(degrees)
    `console.log( "turn")`
    `console.log( #{degrees})`
    @dir += degrees
    @dir = @dir % 360;
  end

  def turnleft(degrees)
    self.turn(-1 * degrees.abs)
  end

  def turnright(degrees)
    self.turn degrees
  end

  def width
    w = `document.getElementById("mycanvas").width();`
    w.to_i
  end

  def height
    h = `document.getElementById("mycanvas").height();`
    h.to_i
  end

  # colors
  def method_missing(method, *args, &block)
    return COLORS[method.to_s]
  end

  def self.rgb(r, g, b)
    # converted '<<' to '+=' to work with opal
    hex_string = "#"
    hex_string += "%02x" % r.to_i
    hex_string += "%02x" % g.to_i
    hex_string += "%02x" % b.to_i
    hex_string
  end

  def rgb(r, g, b)
    self.class.rgb(r, g, b)
  end

  COLORS = {
    'aliceblue' => rgb(240, 248, 255),
    'antiquewhite' => rgb(250, 235, 215),
    'aqua' => rgb(0, 255, 255),
    'aquamarine' => rgb(127, 255, 212),
    'azure' => rgb(240, 255, 255),
    'beige' => rgb(245, 245, 220),
    'bisque' => rgb(255, 228, 196),
    'black' => rgb(0, 0, 0),
    'blanchedalmond' => rgb( 255, 235, 205),
    'blue' => rgb(0, 0, 255),
    'blueviolet' => rgb(138, 43, 226),
    'brown' => rgb(165, 42, 42),
    'burlywood' => rgb(222, 184, 135),
    'cadetblue' => rgb(95, 158, 160),
    'chartreuse' => rgb(127, 255, 0),
    'chocolate' => rgb(210, 105, 30),
    'coral' => rgb(255, 127, 80),
    'cornflowerblue' => rgb(100, 149, 237),
    'cornsilk' => rgb(255, 248, 220),
    'crimson' => rgb(220, 20, 60),
    'cyan' => rgb(0, 255, 255),
    'darkblue' => rgb(0, 0, 139),
    'darkcyan' => rgb(0, 139, 139),
    'darkgoldenrod' => rgb(184, 134, 11),
    'darkgray' => rgb(169, 169, 169),
    'darkgreen' => rgb(0, 100, 0),
    'darkkhaki' => rgb(189, 183, 107),
    'darkmagenta' => rgb(139, 0, 139),
    'darkolivegreen' => rgb(85, 107, 47),
    'darkorange' => rgb(255, 140, 0),
    'darkorchid' => rgb(153, 50, 204),
    'darkred' => rgb(139, 0, 0),
    'darksalmon' => rgb(233, 150, 122),
    'darkseagreen' => rgb(143, 188, 143),
    'darkslateblue' => rgb(72, 61, 139),
    'darkslategray' => rgb(47, 79, 79),
    'darkturquoise' => rgb(0, 206, 209),
    'darkviolet' => rgb(148, 0, 211),
    'deeppink' => rgb(255, 20, 147),
    'deepskyblue' => rgb(0, 191, 255),
    'dimgray' => rgb(105, 105, 105),
    'dodgerblue' => rgb(30, 144, 255),
    'firebrick' => rgb(178, 34, 34),
    'floralwhite' => rgb(255, 250, 240),
    'forestgreen' => rgb(34, 139, 34),
    'fuchsia' => rgb(255, 0, 255),
    'gainsboro' => rgb(220, 220, 220),
    'ghostwhite' => rgb(248, 248, 255),
    'gold' => rgb(255, 215, 0),
    'goldenrod' => rgb(218, 165, 32),
    'gray' => rgb(128, 128, 128),
    'green' => rgb(0, 128, 0),
    'greenyellow' => rgb(173, 255, 47),
    'honeydew' => rgb(240, 255, 240),
    'hotpink' => rgb(255, 105, 180),
    'indianred' => rgb(205, 92, 92),
    'indigo' => rgb(75, 0, 130),
    'ivory' => rgb(255, 255, 240),
    'khaki' => rgb(240, 230, 140),
    'lavender' => rgb(230, 230, 250),
    'lavenderblush' => rgb(255, 240, 245),
    'lawngreen' => rgb(124, 252, 0),
    'lemonchiffon' => rgb(255, 250, 205),
    'lightblue' => rgb(173, 216, 230),
    'lightcoral' => rgb(240, 128, 128),
    'lightcyan' => rgb(224, 255, 255),
    'lightgoldenrodyellow' => rgb(250, 250, 210),
    'lightgreen' => rgb(144, 238, 144),
    'lightgrey' => rgb(211, 211, 211),
    'lightpink' => rgb(255, 182, 193),
    'lightsalmon' => rgb(255, 160, 122),
    'lightseagreen' => rgb(32, 178, 170),
    'lightskyblue' => rgb(135, 206, 250),
    'lightslategray' => rgb(119, 136, 153),
    'lightsteelblue' => rgb(176, 196, 222),
    'lightyellow' => rgb(255, 255, 224),
    'lime' => rgb(0, 255, 0),
    'limegreen' => rgb(50, 205, 50),
    'linen' => rgb(250, 240, 230),
    'magenta' => rgb(255, 0, 255),
    'maroon' => rgb(128, 0, 0),
    'mediumaquamarine' => rgb(102, 205, 170),
    'mediumblue' => rgb(0, 0, 205),
    'mediumorchid' => rgb(186, 85, 211),
    'mediumpurple' => rgb(147, 112, 219),
    'mediumseagreen' => rgb(60, 179, 113),
    'mediumslateblue' => rgb(123, 104, 238),
    'mediumspringgreen' => rgb(0, 250, 154),
    'mediumturquoise' => rgb(72, 209, 204),
    'mediumvioletred' => rgb(199, 21, 133),
    'midnightblue' => rgb(25, 25, 112),
    'mintcream' => rgb(245, 255, 250),
    'mistyrose' => rgb(255, 228, 225),
    'moccasin' => rgb(255, 228, 181),
    'navajowhite' => rgb(255, 222, 173),
    'navy' => rgb(0, 0, 128),
    'oldlace' => rgb(253, 245, 230),
    'olive' => rgb(128, 128, 0),
    'olivedrab' => rgb(107, 142, 35),
    'orange' => rgb(255, 165, 0),
    'orangered' => rgb(255, 69, 0),
    'orchid' => rgb(218, 112, 214),
    'palegoldenrod' => rgb(238, 232, 170),
    'palegreen' => rgb(152, 251, 152),
    'paleturquoise' => rgb(175, 238, 238),
    'palevioletred' => rgb(219, 112, 147),
    'papayawhip' => rgb(255, 239, 213),
    'peachpuff' => rgb(255, 218, 185),
    'peru' => rgb(205, 133, 63),
    'pink' => rgb(255, 192, 203),
    'plum' => rgb(221, 160, 221),
    'powderblue' => rgb(176, 224, 230),
    'purple' => rgb(128, 0, 128),
    'red' => rgb(255, 0, 0),
    'rosybrown' => rgb(188, 143, 143),
    'royalblue' => rgb(65, 105, 225),
    'saddlebrown' => rgb(139, 69, 19),
    'salmon' => rgb(250, 128, 114),
    'sandybrown' => rgb(244, 164, 96),
    'seagreen' => rgb(46, 139, 87),
    'seashell' => rgb(255, 245, 238),
    'sienna' => rgb(160, 82, 45),
    'silver' => rgb(192, 192, 192),
    'skyblue' => rgb(135, 206, 235),
    'slateblue' => rgb(106, 90, 205),
    'slategray' => rgb(112, 128, 144),
    'snow' => rgb(255, 250, 250),
    'springgreen' => rgb(0, 255, 127),
    'steelblue' => rgb(70, 130, 180),
    'tan' => rgb(210, 180, 140),
    'teal' => rgb(0, 128, 128),
    'thistle' => rgb(216, 191, 216),
    'tomato' => rgb(255, 99, 71),
    'turquoise' => rgb(64, 224, 208),
    'violet' => rgb(238, 130, 238),
    'wheat' => rgb(245, 222, 179),
    'white' => rgb(255, 255, 255),
    'whitesmoke' => rgb(245, 245, 245),
    'yellow' => rgb(255, 255, 0),
    'yellowgreen' => rgb(154, 205, 50)
  }
end

def turtle_exec(code)
  begin  
    %x{
    console.log("running Turtle") 
    }
    eval(code)
    %x{ 
      document.getElementById('code_output').innerHTML= "Success" 
      console.log("Success") 
    }
  rescue Exception => e
    code_error = e.message + "\n" + e.backtrace.join("\n")
    %x{
    console.warn("error")
    console.warn(#{code})
    console.warn(#{code_error})
    document.getElementById('code_output').innerHTML="<font size=\"3\" color=\"red\">" 
    +  #{ERB::Util.html_escape code_error} 
    + "</font>"
     }
  ensure
  end
end
