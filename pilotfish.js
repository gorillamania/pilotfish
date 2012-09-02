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
var pageAttrs    = {}, 
    preloadQueue = win.Pilotfish && win.Pilotfish.q || [];

// Set up the global Pilotfish object
var Pilotfish = function(){
    if (! arguments.length) {
        return true;
    }

    // This top level function accepts args, which allows for us to do:
    // Pilotfish('pageAttr', 'test page', 'yes')
    // This is the preferred public API, because it will work before or after the pilotfish.js is loaded.

    var method = arguments[0], args = Array.prototype.slice.call( arguments, 1 );
    if (typeof Pilotfish[method] === "function") {
       return Pilotfish[method].apply(Pilotfish, args);
    } else if (typeof Pilotfish._plugins[method] === "function") {
       return Pilotfish._plugins[method].apply(Pilotfish.plugins, args);
    } else {
       throw "Unknown method: " + method;
    }
};
win.Pilotfish = Pilotfish;
Pilotfish.version = "0.1.0";

// Plugin API
Pilotfish._plugins = [];
Pilotfish.register = function(name, func) {
  Pilotfish._plugins[name] = func;
};

// Methods
Pilotfish.log = function(msg) {
  win.console && win.console("Pilotfish: " + msg);
};

// Core Plugins.
function pageAttr(key, value) {
    if (value !== undefined) {
       pageAttrs[key] = toS(value);
    }
    return pageAttrs[key] || "";
}
Pilotfish.register('pageAttr', pageAttr);


function toS(input) {
  if (input === undefined || input === null || (typeof input == "number" && isNaN(input))) {
    return "";
  } else if (typeof input == "object") {
    return JSON.stringify(input);
  } else {
    return "" + input;
  }
}
Pilotfish.register('toS', toS);

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
