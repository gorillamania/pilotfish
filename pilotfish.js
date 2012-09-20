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
    NOT_THERE     = "NOT_THERE",
    compatible    = checkCompatibility(),
    secure        = location.protocol === 'https:',
    cdnHost       = secure ? '//pilotfish.github.com/' : 'http://cdn.pilotfish.io/',
    loadQueue     = window.Pilotfish && window.Pilotfish.q || [];


// Set up the global Pilotfish object
var Pilotfish = function(){
    if (! arguments.length) {
        return true;
    }

    if (! compatible) {
        return true;
    }

    // This top level function accepts args, which allows for us to do:
    // Pilotfish('pageData', 'test page', 'yes')
    // This is the preferred public API, because it will work before or after the pilotfish.js is loaded.

    var method = arguments[0], args = Array.prototype.slice.call( arguments, 1 );
    if (isFunction(Pilotfish[method])) {
        return Pilotfish[method].apply(Pilotfish, args);
    } else if (isFunction(_core[method])) {
        return _core[method].apply(Pilotfish, args);
    } else if (isFunction(_plugins[method])) {
        return _plugins[method].apply(Pilotfish, args);
    } else {
        return NOT_THERE;
    }
};
window.Pilotfish = Pilotfish;
Pilotfish.version = "0.4.0";

// Core API
Pilotfish.core = function(name, func) {
    _core[name] = func;
};



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
        if (Pilotfish.apply(Pilotfish, copyQueue[i]) === NOT_THERE ){
            // It wasn't there yet, leave it in the queue in case a future plugin gets loaded that can handle it
            loadQueue.push(copyQueue[i]);
        }
    }
}

/* Events
 * -----------------------------------*/

// Credit to https://gist.github.com/661855
var on = _core.on = function() {
    var $Pilotfish = jQuery(Pilotfish);
    $Pilotfish.on.apply($Pilotfish, arguments);
};

var off = _core.off = function() {
    var $Pilotfish = jQuery(Pilotfish);
    $Pilotfish.off.apply($Pilotfish, arguments);
};

var trigger = _core.trigger = function(name, data) {
    if (!name) {
      error("trigger() called without a name");
      return false;
    }
    var $Pilotfish = jQuery(Pilotfish);
    eventLog({"name": name, "args": arguments});
    $Pilotfish.trigger.apply($Pilotfish, arguments);
    return true;
};

var eventLog = _core.eventLog = function (eventData) {
    if (eventData) {
        _eventLogs.push(eventData);
    }
    return _eventLogs;
};

var onload = _core.onload = function(callback) {
    jQuery(window).load(callback);
};
var onready = _core.onready = function(callback) {
    jQuery(document).ready(callback);
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
    trigger('external_script:started', {src: src});
    var SCRIPT = "script",
        firstScript = document.getElementsByTagName(SCRIPT)[0],
        domScript = document.createElement(SCRIPT);
    domScript.async = true;
    domScript.src = src;

    // Thanks http://stevesouders.com/efws/script-onload.php
    domScript.onload = function() { 
        if ( ! domScript.onloadDone ) {
            domScript.onloadDone = true; 
            trigger('external_script:loaded', {src: src});
            if (isFunction(callback)) {
                callback(); 
            }
        }
    };
    domScript.onreadystatechange = function() { 
        if ( (/loaded|complete/).test(domScript.readyState) && !domScript.onloadDone ) {
            domScript.onloadDone = true; 
            trigger('external_script:loaded', {src: src});
            if (isFunction(callback)) {
                callback(); 
            }
        }
    };

    firstScript.parentNode.insertBefore(domScript, firstScript);
};


/* Plugins
 * -----------------------------------*/

var registerPlugin = _core.registerPlugin = function(plugin, func) {
    _plugins[plugin] = func;
};

// Manage plugin dependencies
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
Pilotfish('subscribe', 'plugin:loaded', emptyLoadQueue);

var hasPlugin = _core.hasPlugin = function(plugin) {
    return isFunction(_plugins[plugin]);
};

// Centralized logging, if the browser supports it.
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
        jQuery(window).load(function() {
            trigger('window:load');
        })
        .bind("unload", function() {
            console.log("jquery unload");
            trigger('window:unload');
        })
        .bind("hashchange", function() {
            var hash = location.hash.substring(1);
            // Some browsers trigger this event twice
            if (hash !== lastHash) {
                trigger('window:hashchange', {path: hash});
                lastHash = hash;
            }
        });

        jQuery(document).ready(function() {
            trigger('document:ready');
        });
    }

    emptyLoadQueue();
})();

})(window, document, location);
