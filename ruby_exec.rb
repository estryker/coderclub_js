require 'erb' 
# monkey patch IO to have it take input/output on the web 
class Kernel

  def puts(str)
    %x{
      document.getElementById('code_output').innerHTML = document.getElementById('code_output').innerHTML + #{ERB::Util.html_escape str} + "<br>"
      }
  end
  
  def print(str)
    %x{
      document.getElementById('code_output').innerHTML = document.getElementById('code_output').innerHTML + #{ERB::Util.html_escape str}
      }
  end
  
  def printf(format,*args) 
    %x{
      document.getElementById('code_output').innerHTML = document.getElementById('code_output').innerHTML + #{ERB::Util.html_escape sprintf(format,args)}
      }
  end
end
def ruby_exec(code)
  
  # saved_stdout = $stdout # save it off
  
  begin 
    # $catcher = StringIO.new  # StringIO.new("",'w') # FakeStdout.new('code_output') # StringIO.new
    #$stdout = $catcher 
    `document.getElementById('code_output').innerHTML=''`
    res = eval(code.strip)
    code_inspect = res.inspect
    #$catcher.close_write
    #code_output = $catcher.string
    %x{
    console.log("inspect") 
    console.log(#{code.strip})
    console.log( #{code_inspect} )
    document.getElementById('code_output').innerHTML= document.getElementById('code_output').innerHTML + "<br> = &gt;" 
    +  #{ERB::Util.html_escape code_inspect}
    }
    #document.getElementById('code_output').innerHTML= #{ERB::Util.html_escape code_output}
  rescue Exception => e
    code_error = e.message + "\n" + e.backtrace.join("\n")
    %x{
    console.log("error")
   console.log(#{code})
    console.warn(#{code_error})
    document.getElementById('code_output').innerHTML="<font size=\"3\" color=\"red\">" 
    +  #{ERB::Util.html_escape code_error} 
    + "</font>"
     }
  ensure
    # Yeah, let's make sure we restore $stdout
    # $stdout = saved_stdout
  end
end

def ruby_exec2(code)
  begin  
    %x{
    console.log("running Ruby"); 
    console.log(#{code}); 
    }
    #NOTE:  without the .strip, the CodeMirror stuff adds a space and for some reason the fancy DSL syntax doesn't work 
    # with it. 
    eval(code.strip)
    %x{ 
      document.getElementById('code_output').innerHTML= "Success" 
      console.log("Success") 
    }
  rescue Exception => e
    code_error = e.message + "\n" + e.backtrace.join("\n")
    %x{
    console.warn("error");
    console.warn(#{code});
    console.warn(#{code_error});
    document.getElementById('code_output').innerHTML="<font size=\"3\" color=\"red\">" 
    +  #{ERB::Util.html_escape code_error} 
    + "</font>"
     }
  ensure
  end
end
