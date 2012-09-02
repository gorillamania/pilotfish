/* Full, debug version of pilotfish javascript client library. For production usage, use the min version.
 * For more details, including licensing information, see
 * https://github.com/pilotfish/pilotfish
 *
 */
(function(win, undefined){

if(win.Pilotfish && win.Pilotfish.version) {
  // Abort: The tag is already on the page
  return;
}

// Shortcuts to make the overall file size smaller.
var doc = win.document,
    loc = win.location,
    nav = win.navigator;

// Internal goodies
var pageAttrs = {}, 
    preloadQueue = win.Pilotfish && win.Pilotfish.q || [];

// Set up the global Pilotfish object
var Pilotfish = function(){
    if (! arguments.length) {
        return true;
    }

    // This top level function accepts args, which allows for us to do:
    // Pilotfish('pageAttr', 'test page', 'yes')
    // This is the preferred public API, because it will work before or after the pilotfish.js is loaded.

    // arguments is a magical array object, so shift won't work, rebuild as an array.
    var method = arguments[0],
        args   = [];
    for (var i = 1, l = arguments.length; i < l; i++) {
      args.push(arguments[i]);
    }
    if (typeof Pilotfish[method] === "function") {
       return Pilotfish[method].apply(Pilotfish, args);
    } else {
       throw "method " + method + " cannot be executed";
    }
};
win.Pilotfish = Pilotfish;
Pilotfish.version = "0.1.0";

Pilotfish.log = function(msg) {
  win.console && win.console("Pilotfish: " + msg);
};

// Simple mechanism to set/read page attributes
// @public
Pilotfish.pageAttr = function(key, value) {
    if (value === true || value === 0) {
      // Convert to string
      value = "" + value;
    }
    if (value !== undefined) {
       pageAttrs[key] = value;
    }
    return pageAttrs[key] || "";
};

// Initialization (self executing)
(function init(){
    // The preloadQueue allows for us to do:
    // Pilotfish('pageAttr', 'test page', 'yes')
    // before the js is on the page.
    for (var i = 0, l = preloadQueue.length; i < l; i++) {
        Pilotfish.apply(Pilotfish, preloadQueue[i]);
    }
    preloadQueue = [];
})();

})(this);
