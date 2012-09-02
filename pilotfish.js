/* Full, debug version of pilotfish javascript client library. For production usage, use the min version.
 * For more details, including licensing information, see
 * https://github.com/pilotfish/pilotfish
 *
 */
(function(win, undefined){

// Shortcuts
var doc = win.document,
    loc = win.location,
    nav = win.navigator;

// Internal goodies
var _attributes = {};

// Public object
var Pilotfish = {
    version: "0.1.0"
};
// Make it global
win.Pilotfish = Pilotfish;


// Simple mechanism to set/read page attributes
Pilotfish.pageAttr = function(key, value) {
    if (value === true || value === 0) {
      // Convert to string
      value = "" + value;
    }
    if (value !== undefined) {
       _attributes[key] = value;
    }
    return _attributes[key] || "";
};

})(this);
