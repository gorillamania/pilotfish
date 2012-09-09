/* Full, debug version of pilotfish javascript client library. 
 * For production usage, use the .min version.
 * For more details, including licensing information, see
 * https://github.com/pilotfish/pilotfish
 * vim: set expandtab tabstop=4: 
 */
// Globals passed in so the optimizer can make them local variables
(function(window, document, location, undefined){

/* Setup
 * --------------------------------------------------------------------------*/
if(window.Pilotfish && window.Pilotfish.version) {
    // Abort: The tag is already on the page
    return;
}

// Internal goodies
var _core         = {},
    _eventLogs    = [],
    _pageData     = {},
    _plugins      = {},
    _settings     = {},
    compatible    = checkCompatibility(),
    preloadQueue = window.Pilotfish && window.Pilotfish.q || [];

function checkCompatibility() {
    // Gracefully degrade for older browsers that don't support what we need.
    // TODO: build a shim file for these features, conditionally load it.
    if (! document.querySelector || ! window.console || ! window.JSON){
        return false;
    }

    // For now, we require jQuery
    // In the future, we may build adaptors for other libraries
    if (! window.jQuery ) {
        return false;
    }

    return true;
}

// Set up the global Pilotfish object
var Pilotfish = function(){
    if (! arguments.length) {
        return true;
    }

    if (!compatible) {
        return true;
    }

    // This top level function accepts args, which allows for us to do:
    // Pilotfish('pageData', 'test page', 'yes')
    // This is the preferred public API, because it will work before or after the pilotfish.js is loaded.

    var method = arguments[0], args = Array.prototype.slice.call( arguments, 1 );
    if (typeof Pilotfish[method] === "function") {
        return Pilotfish[method].apply(Pilotfish, args);
    } else if (typeof _core[method] === "function") {
        return _core[method].apply(Pilotfish, args);
    } else if (typeof _plugins[method] === "function") {
        return _plugins[method].apply(Pilotfish, args);
    } else {
        return false;
    }
};
window.Pilotfish = Pilotfish;
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

/* Events
 * -----------------------------------*/

// Credit to https://gist.github.com/661855
var subscribe = _core.subscribe = function() {
  var $Pilotfish = jQuery(Pilotfish);
  $Pilotfish.on.apply($Pilotfish, arguments);
  return true;
};

var unsubscribe = _core.unsubscribe = function() {
  var $Pilotfish = jQuery(Pilotfish);
  $Pilotfish.off.apply($Pilotfish, arguments);
};

var publish = _core.publish = function() {
  var $Pilotfish = jQuery(Pilotfish);
  eventLog({"name": arguments[0], "args": arguments});
  $Pilotfish.trigger.apply($Pilotfish, arguments);
  return true;
};

var eventLog = _core.eventLog = function (eventData) {
  if (eventData) {
    _eventLogs.push(eventData);
  }
  return _eventLogs;
};

/* Util
 * -----------------------------------*/

var each = _core.each = function(objects, callback){
    jQuery.each(objects, callback);
};

/* Javascript passes by reference for objects, so we need a facility to clone them.
 * We also need a simple way to combine two objects, 
 * handy for defining default functionality with user options that override.
 * Nested objects are not yet supported
 * If data other than objects is passed in, we do what we can.
 */
var extend = _core.extend = function(source, target) {
    return jQuery.extend(source, target);
};

/* Sometimes we need to know if an object is {} */
function isPlainObject(obj) {
    return jQuery.isPlainObject(obj);
}

// Centralized logging, if the browser supports it.
var log = _core.log = function(msg) {
    window.console && window.console.log.apply(window.console, arguments);
};

// Store page attributes that the website owners supplies us.
// Useful for analytics or other plugins that behave differently depending based on the context
var pageData = _core.pageData = function(key, value) {
    if (value !== undefined) {
       _pageData[key] = toS(value);
    }
    return _pageData[key] || "";
};

// Settings for configuring the way pilotfish behaves
var setting = _core.setting = function (key, value) {
    if (value !== undefined) {
       _settings[key] = toS(value);
    }
    return _settings[key] || "";
};

// Thin wrapper around the selector so that we may be able to
// support other libraries some day 
var S = _core.S = function (selector) {
  return jQuery(selector);
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
    // Pilotfish('pageData', 'test page', 'yes')
    // before the js is on the page.
    for (var i = 0, l = preloadQueue.length; i < l; i++) {
        Pilotfish.apply(Pilotfish, preloadQueue[i]);
    }
    preloadQueue = [];
})();

})(window, document, location);
