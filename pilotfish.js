/* Full, debug version of pilotfish javascript client library. 
 * For production usage, use the .min version.
 * For more details, including licensing information, see
 * https://github.com/pilotfish/pilotfish
 */
(function(win, undefined){

/* Setup
 * --------------------------------------------------------------------------*/
if(win.Pilotfish && win.Pilotfish.version) {
  // Abort: The tag is already on the page
  return;
}

// Shortcuts for browser globals to be explicit and make the min file size smaller.
var doc = win.document,
    loc = win.location,
    nav = win.navigator;

// Internal goodies
var _core         = {},
    _pageAttrs    = {},
    _plugins      = {},
    _settings     = {},
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
    } else if (typeof _core[method] === "function") {
       return _core[method].apply(Pilotfish, args);
    } else if (typeof _plugins[method] === "function") {
       return _plugins[method].apply(Pilotfish, args);
    } else {
       throw "Unknown method: " + method;
    }
};
win.Pilotfish = Pilotfish;
Pilotfish.version = "0.1.0";

// Core API
Pilotfish.core = function(name, func) {
  _core[name] = func;
};

// Plugin API
Pilotfish.register = function(name, func) {
  _plugins[name] = func;
};


/* Core 
 * --------------------------------------------------------------------------*/

var log = _core.log = function(msg) {
  win.console && win.console.log.apply(win.console, arguments);
};
var pageAttr = _core.pageAttr = function pageAttr(key, value) {
    if (value !== undefined) {
       _pageAttrs[key] = toS(value);
    }
    return _pageAttrs[key] || "";
};

var setting = _core.setting = function setting(key, value) {
    if (value !== undefined) {
       _settings[key] = toS(value);
    }
    return _settings[key] || "";
};

var toS = _core.toS = function toS(input) {
  if (input === undefined || input === null || (typeof input == "number" && isNaN(input))) {
    return "";
  } else if (typeof input == "object") {
    return JSON.stringify(input);
  } else {
    return "" + input;
  }
};

/* Initialization
 * --------------------------------------------------------------------------*/
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
