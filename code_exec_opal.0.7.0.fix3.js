/* Generated by Opal 0.7.0.beta4 */
(function(Opal) {
  Opal.dynamic_require_severity = "error";
  var self = Opal.top, $scope = Opal, nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass;

  Opal.add_stubs(['$require', '$html_escape', '$str', '$sprintf', '$eval', '$inspect', '$+', '$message', '$join', '$backtrace', '$__END__', '$innerHTML=', '$to_s', '$innerHTML', '$doc_element']);
  self.$require("erb");
  (function($base, $super) {
    function $IO(){};
    var self = $IO = $klass($base, $super, 'IO', $IO);

    var def = self.$proto, $scope = self.$scope;

    def.$puts = function(str) {
      var self = this;

      
      document.getElementById('code_output').innerHTML= document.getElementById('code_output').innerHTML + (($scope.get('ERB')).$$scope.get('Util')).$html_escape(str) + "<br>"
      ;
    };

    def.$print = function(arg) {
      var self = this;

      
      document.getElementById('code_output').innerHTML= document.getElementById('code_output').innerHTML + (($scope.get('ERB')).$$scope.get('Util')).$html_escape(self.$str())
      ;
    };

    return (def.$printf = function(format, args) {
      var self = this;

      args = $slice.call(arguments, 1);
      
      document.getElementById('code_output').innerHTML= document.getElementById('code_output').innerHTML + (($scope.get('ERB')).$$scope.get('Util')).$html_escape(self.$sprintf(format, args))
      ;
    }, nil) && 'printf';
  })(self, null);
  Opal.Object.$proto.$exec_ruby = function(code) {
    var self = this, res = nil, code_inspect = nil, e = nil, code_error = nil;

    try {
    try {
    res = self.$eval(code);
      code_inspect = res.$inspect();
      
    console.log("inspect") 
    console.log(code)
    console.log( code_inspect )
    document.getElementById('code_output').innerHTML= "<br> = &gt;" 
    +  (($scope.get('ERB')).$$scope.get('Util')).$html_escape(code_inspect)
    ;
    } catch ($err) {if (Opal.rescue($err, [$scope.get('Exception')])) {e = $err;
      code_error = e.$message()['$+']("\n")['$+'](e.$backtrace().$join("\n"));
      
    console.log("error")
    console.log(code)
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
  };
  self.$__END__();
  return (function($base, $super) {
    function $FakeStdout(){};
    var self = $FakeStdout = $klass($base, $super, 'FakeStdout', $FakeStdout);

    var def = self.$proto, $scope = self.$scope;

    def.doc_element = nil;
    def.$initialize = function(doc_element) {
      var self = this;

      self.doc_element = document.getElementById(doc_element);
      return console.warn(self.doc_element);
    };

    def.$puts = function(thing) {
      var $a, $b, self = this;

      return (($a = ["" + (thing) + "\n"]), $b = self.doc_element, $b['$innerHTML='].apply($b, $a), $a[$a.length-1]);
    };

    def.$print = function(thing) {
      var $a, $b, self = this;

      return (($a = ["" + (thing)]), $b = self.doc_element, $b['$innerHTML='].apply($b, $a), $a[$a.length-1]);
    };

    def.$write = function(thing) {
      var $a, $b, self = this;

      return (($a = [thing.$to_s()]), $b = self.doc_element, $b['$innerHTML='].apply($b, $a), $a[$a.length-1]);
    };

    return (def['$<<'] = function(thing) {
      var $a, $b, self = this;

      return (($a = [self.$doc_element().$innerHTML()['$+'](thing)]), $b = self.doc_element, $b['$innerHTML='].apply($b, $a), $a[$a.length-1]);
    }, nil) && '<<';
  })(self, null);
})(Opal);