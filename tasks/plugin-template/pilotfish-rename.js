/* Pilotfish plugin for being awesome!
 * Version 0.1.0
 * See https://github.com/pilotfish/pilotfish/tree/master/plugins/{%= pluginName %}
 */

Pilotfish('registerPlugin', '{%= pluginName %}', function(options) {

    var pluginMeta = {
        version     : "0.2.0",
        name        : '{%= pluginName %}',
        eventPrefix : 'plugins:{%= pluginName %}'
    };

    options = Pilotfish('extend', {
        // Your default options...
    }, options);

    // Awesome code!

    return true;
});
