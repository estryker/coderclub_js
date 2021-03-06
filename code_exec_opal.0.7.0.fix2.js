/* Generated by Opal 0.7.0.beta4 */
(function(Opal) {
  Opal.dynamic_require_severity = "error";
  var self = Opal.top, $scope = Opal, nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice, $gvars = Opal.gvars, $klass = Opal.klass;

  Opal.add_stubs(['$require', '$new', '$eval', '$inspect', '$close_write', '$string', '$html_escape', '$+', '$message', '$join', '$backtrace', '$__END__', '$innerHTML=', '$to_s', '$innerHTML', '$doc_element']);
  self.$require("erb");
  Opal.Object.$proto.$exec_ruby = function(code) {
    var self = this, saved_stdout = nil, res = nil, code_inspect = nil, code_output = nil, e = nil, code_error = nil;
    if ($gvars.stdout == null) $gvars.stdout = nil;
    if ($gvars.catcher == null) $gvars.catcher = nil;

    saved_stdout = $gvars.stdout;
    try {
    try {
    $gvars.catcher = $scope.get('StringIO').$new("", "w");
      $gvars.stdout = $gvars.catcher;
      res = self.$eval(code);
      code_inspect = res.$inspect();
      $gvars.catcher.$close_write();
      code_output = $gvars.catcher.$string();
      
    console.log("inspect") 
    console.log(code)
    console.log( code_inspect )
    document.getElementById('code_output').innerHTML= 
    + (($scope.get('ERB')).$$scope.get('Util')).$html_escape(code_output)
    + "<br> = &gt;" 
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
    $gvars.stdout = saved_stdout
    };
  };
  self.$__END__();
  return (function($base, $super) {
    function $FakeStdout(){};
    var self = $FakeStdout = $klass($base, $super, 'FakeStdout', $FakeStdout);

    var def = self.$$proto, $scope = self.$$scope;

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
