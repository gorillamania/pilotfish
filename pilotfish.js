/* Full, debug version of pilotfish javascript client library. 
 * For production usage, use the .min version.
 * For more details, including licensing information, see
 * https://github.com/pilotfish/pilotfish
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
    MISSING       = "MISSING",
    compatible    = checkCompatibility(),
    secure        = location.protocol == 'https:',
    cdnHost       = secure ? '//pilotfish.github.com/' : 'http://cdn.pilotfish.io/',
    loadQueue     = window.Pilotfish && window.Pilotfish.q || [];


// Set up the global Pilotfish object
var Pilotfish = function(){
    if (! arguments.length) {
        return true;
    }

    // Gracefully fail if we don't support this browser
    if (! compatible) {
        return true;
    }

    // This top level function accepts args, which allows for us to do:
    // Pilotfish('pageData', 'test page', 'yes')
    // This is the preferred public API, because it will work before or after the pilotfish.js is loaded.

    var method = arguments[0], args = Array.prototype.slice.call( arguments, 1 );
    if (isFunction(Pilotfish[method])) {
        // Direct method
        return Pilotfish[method].apply(Pilotfish, args);
    } else if (isFunction(_core[method])) {
        // Core method
        return _core[method].apply(Pilotfish, args);
    } else if (isFunction(_plugins[method])) {
        // Registered Plugin
        return _plugins[method].apply(Pilotfish, args);
    } else {
        // Not found. Perhaps a plugin is still laoding?
        return MISSING;
    }
};
window.Pilotfish = Pilotfish;

// Make certain elements public
Pilotfish.version = "0.6.0";
Pilotfish.cdnHost = cdnHost;
Pilotfish.compatible = compatible;

/* Core 
 * --------------------------------------------------------------------------*/

function checkCompatibility() {
    // Gracefully degrade for older browsers that don't support what we need.
    // TODO: build a shim file for these features, conditionally load it.
    if (! window.JSON){
        return false;
    }

    // For now, we require jQuery
    // In the future, we may build adaptors for other libraries
    if (! window.jQuery ) {
        return false;
    }

    return true;
}

function emptyLoadQueue() {
    // The loadQueue allows for us to do:
    // Pilotfish('pageData', 'test page', 'yes')
    // before the js is on the page.
    // It also manages the dependencies for plugins
    var copyQueue = loadQueue;
    loadQueue = [];
    for (var i = 0, l = copyQueue.length; i < l; i++) {
        if (Pilotfish.apply(Pilotfish, copyQueue[i]) == MISSING ){
            // It wasn't there yet, leave it in the queue in case a future plugin gets loaded that can handle it
            loadQueue.push(copyQueue[i]);
        }
    }
}

/* Events
 * -----------------------------------*/

// Listen for events. Two different ways of calling:
// Pilotfish('on', 'custom_event', function() { ... });
// or
// Pilotfish('on', document, 'click', function() { ... });
var on = _core.on = function() {
    if (typeof arguments[0] == "string") {
        jQuery(Pilotfish).on(arguments[0], arguments[1]);
    } else if (typeof arguments[0] == "object"){
        jQuery(arguments[0]).on(arguments[1], arguments[2]);
    }
};

// Stop listening for events. Two different ways of calling
// Pilotfish('off', 'custom_event', function() { ... });
// or
// Pilotfish('off', document, 'click', function() { ... });
var off = _core.off = function() {
    if (typeof arguments[0] == "string") {
        jQuery(Pilotfish).off(arguments[0], arguments[1]);
    } else if (typeof arguments[0] == "object"){
        // This doesn't appear to work, because we don't have the original selector
        jQuery(arguments[0]).off(arguments[1]);
    }
};

// Fire an event on the Pilotfish object. Two different ways of calling
// Pilotfish('trigger', 'custom_event', [data]);
// or
// Pilotfish('trigger', document, 'click');
var trigger = _core.trigger = function() {
    if (typeof arguments[0] == "string") {
        jQuery(Pilotfish).trigger(arguments[0], arguments[1] || {});
        eventLog({"name": arguments[0], "args": arguments});
    } else if (typeof arguments[0] == "object"){
        jQuery(arguments[0]).trigger(arguments[1]);
        eventLog({"name": arguments[1], "args": arguments});
    }
};

// Keep track of fired events. Handy for debuggin, can be accessed in the console with:
// Pilotfish('eventLog')
var eventLog = _core.eventLog = function (eventData) {
    if (eventData) {
        _eventLogs.push(eventData);
    }
    return _eventLogs;
};

// Run a function when the document is ready. If it is already ready, run it immediately
var onready = _core.onready = function(callback) {
    jQuery(document).ready(callback);
};

// Run a function when the page is loaded. If it is already loaded, run it immediately
var onload = _core.onload = function(callback) {
    jQuery(window).load(callback);
};

/* Util
 * -----------------------------------*/

/* Javascript passes by reference for objects, so we need a facility to clone them.
 * We also need a simple way to combine two objects, 
 * handy for defining default functionality with user options that override.
 * Nested objects are not yet supported
 * If data other than objects is passed in, we do what we can.
 */
var extend = _core.extend = function(source, target) {
    return jQuery.extend(source, target);
};

// Record an error. Always use this instead of "throw"
var error = _core.error = function(error, type) {
    trigger('error', {type: type, error: error});
    if (type) {
        trigger('error:' + type, {error: error});
    }
};

// Sometimes we need to know if an object is {}
function isPlainObject(obj) {
    return jQuery.isPlainObject(obj);
}

// And we often need to know if the argument is a function
function isFunction(obj) {
    return typeof obj === "function";
}

// Load a remote script, with an optional callback
var loadScript = _core.loadScript = function(src, callback) {
    var prefix = "external_script:";
    trigger(prefix + 'started', {src: src});
    var SCRIPT = "script",
        firstScript = document.getElementsByTagName(SCRIPT)[0],
        domScript = document.createElement(SCRIPT);
    domScript.async = true;
    domScript.src = src;

    // Thanks http://stevesouders.com/efws/script-onload.php
    domScript.onload = function() { 
        if ( ! domScript.done ) {
            domScript.done = true; 
            trigger(prefix + 'loaded', {src: src});
            if (isFunction(callback)) {
                callback(); 
            }
        }
    };
    domScript.onreadystatechange = function() { 
        if ( (/loaded|complete/).test(domScript.readyState) && !domScript.done ) {
            domScript.done = true; 
            trigger(prefix + 'loaded', {src: src});
            if (isFunction(callback)) {
                callback(); 
            }
        }
    };

    firstScript.parentNode.insertBefore(domScript, firstScript);
};


/* Plugins
 * -----------------------------------*/

// Register a plugin to be used with Pilotfish('')
// See https://github.com/pilotfish/pilotfish/blob/master/doc/plugins.md
var registerPlugin = _core.registerPlugin = function(plugin, func) {
    _plugins[plugin] = func;
};

// Manage plugin dependencies. Will download it from Pilotfish.cdnHost if needed.
// Optional src argument for a specific url for the plugin
var requirePlugin = _core.requirePlugin = function(plugin, src) {
    // Do we already have it?
    if (hasPlugin(plugin)) {
       return;
    }
    src = src || [cdnHost, 'client/plugins/', plugin, '/pilotfish-', plugin, '.min.js'].join('');
    loadScript(src, function() {
        trigger('plugin:loaded', {plugin: plugin});
    });
};
Pilotfish('on', 'plugin:loaded', emptyLoadQueue);

// Do we already have this plugin loaded?
var hasPlugin = _core.hasPlugin = function(plugin) {
    return isFunction(_plugins[plugin]);
};

// Centralized logging
var log = _core.log = function(msg) {
    trigger('log', {msg: msg});
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

    var lastHash;
    // Global Events that we want to make available to pilotfish
    if (window.jQuery) {
        jQuery(window).bind("hashchange", function() {
            var hash = location.hash.substring(1);
            // Some browsers trigger this event twice
            if (hash !== lastHash) {
                trigger('window:hashchange', {path: hash});
                lastHash = hash;
            }
        });
    }

    // Javascript errors on the page
    // errors - see https://developer.mozilla.org/en/DOM/window.onerror
    var oldErrorHandler = window.onerror || function() { return false; };
    window.onerror = function(msg, url, line) {
        try {
            if (typeof msg != 'string') {
                // Not all browsers call error with the msg, url, line syntax. Some (Safari <=5 pass an object)
                return oldErrorHandler.apply(window, arguments);
            }

            trigger('js_error', {msg: msg,  url: url, line: line});
        } catch (e) {
            // If there is anything wrong with this code, it needs to fail silently or it will recurse
            log("Error in the error handler", e);
        }

        // let default handler run.
        return oldErrorHandler.apply(window, arguments);
    };

    // Call any functions that have been queued
    emptyLoadQueue();
})();

})(window, document, location);
