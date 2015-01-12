require 'erb' 

def ruby_exec(code)
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
