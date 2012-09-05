/* Full, debug version of pilotfish javascript client library. 
 * For production usage, use the .min version.
 * For more details, including licensing information, see
 * https://github.com/pilotfish/pilotfish
 * vim: set expandtab tabstop=4: 
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

    // Gracefully degrade for older browsers that don't support what we need.
    // TODO: build a shim file for these features, conditionally load it.
    if (! doc.querySelector || ! win.console || ! win.JSON){
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

var each = _core.each = function(objects, callback){
    for (var i = 0; i < objects.length; i++ ) {
        if (callback.call(objects[i], i, objects[i]) === false) {
            break;
        }
    }
};

/* Javascript passes by reference for objects, so we need a facility to clone them.
 * We also need a simple way to combine two objects, 
 * handy for defining default functionality with user options that override.
 * Nested objects are not yet supported
 * If data other than objects is passed in, we do what we can.
 */
var extend = _core.extend = function(source, target) {
    if (arguments.length === 1) {
        if (isPlainObject(source)) {
            return extend({}, source);
        } else {
            return source;
        }
    } else {
        if (isPlainObject(source) && isPlainObject(target)) {
            var ret = {}, name;
            for (name in source){
                if (source.hasOwnProperty(name)) {
                    ret[name] = source[name];
                }
            }
            for (name in target){
                if (target.hasOwnProperty(name)) {
                    ret[name] = target[name];
                }
            }
            return ret;
        } else {
            // Type mismatch. Give up and return target
            return target;
        }
    }
};

/* Sometimes we need to know if an object is {} */
function isPlainObject(obj) {
    if (typeof obj != "object" ) {
        return false;
    } else if (obj === null || obj instanceof Array || obj instanceof Date) {
        return false;
    } else {
        return true;
    }
}

// Centralized logging, if the browser supports it.
var log = _core.log = function(msg) {
    win.console && win.console.log.apply(win.console, arguments);
};

// Store page attributes that the website owners supplies us.
// Useful for analytics or other plugins that behave differently depending based on the context
var pageAttr = _core.pageAttr = function(key, value) {
    if (value !== undefined) {
       _pageAttrs[key] = toS(value);
    }
    return _pageAttrs[key] || "";
};

// Settings for configuring the way pilotfish behaves
var setting = _core.setting = function (key, value) {
    if (value !== undefined) {
       _settings[key] = toS(value);
    }
    return _settings[key] || "";
};

// Retrieve DOM nodes with content with CSS3 selectors.
var S = _core.S = function (selector) {
    try {
      // Chrome throws an error if you call querySelectorAll with an empty string
      return doc.querySelectorAll(toS(selector));
    } catch (e) {
      return [];
    }
};

// No matter what the input, return a string
var toS = _core.toS = function(input) {
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
