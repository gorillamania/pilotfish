/* Pilotfish plugin for being awesome!
 * Version 0.1.0
 * See https://github.com/pilotfish/pilotfish/tree/master/plugins/unstuck
 */

Pilotfish('registerPlugin', 'unstuck', function(options) {

    this.version = "0.1.0";
    this.pluginName = arguments[1];
    this.eventPrefix = 'plugins:' + this.pluginName + ':';

    options = Pilotfish('extend', {
        // Your default options...
    }, options);

    // Ideas:
    // Click resulted in url change, but wasn't a pointer

    // Click resulted in an ajax request, but wasn't a pointer

    // User clicked on something that was a pointer, but nothing happened, so they clicked on it again

    // click that resulted in a javascript error

    // user sees the same message twice

    // user hit stop and interrupted a transfer

    // frequent_reload user has reloaded more than x in x seconds

    // user hit back x times in a row

    // slowed_cadence - this page is taking signifigantly longer than previous pages

    // lost_focus

    // user_searched

    // clicked on something that wasn't clickable

    /* Helpers
     *---------------------------------*/
    function serializeElement(elem) {
        // TODO: Something better
        return elem.outerHTML;
    }

    function mouseIsPointer(elem) {
        return jQuery("img").css("cursor") === "pointer";
    }

    return true;
});
