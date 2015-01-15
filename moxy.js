// moxy.js mock object framework by Chris Mountford
// requires underscore right now; TODO: fix that
Moxy = {
  mock: function() {
    var s = Array.prototype.slice;
    var mock = { moxy: {
      calls: [],
      hadCall: function() {
        var args = s.call(arguments[0]);
        var name = args.shift();
        var argsEqual = function(a2) { return !(args<a2 || a2<args) }; // :P
        return _.any(this.calls, function(it) {return it.name === name && argsEqual(it.args)})
      },
      describe: function() {
        var args = s.call(arguments[0]);
        var name = args.shift();
        return "Missing expected call to " + name + "(" + args.slice(1).join(",").substring(1) + ")";
      },
      expected: function() {
        var args = s.call(arguments);
        ok(this.hadCall(args), this.describe(args));
      }
    }};
    _.each(arguments, function(method){
      mock[method] = function() {mock.moxy.calls.push({name: method, args: s.call(arguments)});};
    });
    return mock;
  }
}

