
# monkey patch IO to have it take input/output on the web 
class IO

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
