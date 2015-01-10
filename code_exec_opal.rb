require 'erb' 

# monkey patch IO to have it take input/output on the web 
class IO

  def puts(str)
    %x{
      document.getElementById('code_output').innerHTML= document.getElementById('code_output').innerHTML + #{ERB::Util.html_escape str} + "<br>"
      }
  end
  
  def print(arg)
    %x{
      document.getElementById('code_output').innerHTML= document.getElementById('code_output').innerHTML + #{ERB::Util.html_escape str}
      }
  end
  
  def printf(format,*args) 
    %x{
      document.getElementById('code_output').innerHTML= document.getElementById('code_output').innerHTML + #{ERB::Util.html_escape sprintf(format,args)}
      }
  end
end

def exec_ruby(code)
  
  # saved_stdout = $stdout # save it off
  
  begin 
    # $catcher = StringIO.new("",'w') # FakeStdout.new('code_output') # StringIO.new
    # $stdout = $catcher
    res = eval(code)
    code_inspect = res.inspect
    # $catcher.close_write
    # code_output = $catcher.string
    %x{
    console.log("inspect") 
    console.log(#{code})
    console.log( #{code_inspect} )
    document.getElementById('code_output').innerHTML= "<br> = &gt;" 
    +  #{ERB::Util.html_escape code_inspect}
    }
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

__END__ 
class FakeStdout
  def initialize(doc_element)
    @doc_element = `document.getElementById(#{doc_element})`
    `console.warn(#{@doc_element})`
  end
  
  def puts(thing)
    @doc_element.innerHTML = "#{thing}\n"
  end
  
  def print(thing)
    @doc_element.innerHTML = "#{thing}"
  end
  
  def write(thing)
    @doc_element.innerHTML = thing.to_s
  end
  
  def <<(thing)
    @doc_element.innerHTML = doc_element.innerHTML + thing
  end
end
