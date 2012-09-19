/* Pilotfish plugin for automagically determining when there are usability problems
 * Version 0.1.0
 * See https://github.com/pilotfish/pilotfish/tree/master/plugins/unstuck
 */

Pilotfish('registerPlugin', 'unstuck', function(options) {

    // TODO
    var pluginMeta = {
        version     : "0.2.0",
        name        : 'unstuck',
        eventPrefix : 'plugins:unstuck'
    };

    options = Pilotfish('extend', {
        // Your default options...
    }, options);


    /* Click actions
     *---------------------------------*/

    // Click resulted in url change, but target wasn't a pointer

    // Click resulted in an ajax request, but no status indicator

    // Click results in a scroll

    // Click resulted in hash tag change, but wasn't a pointer
    Pilotfish('subscribe', 'window:hashchange', function(data) {
        if (isLastClickPointer() === false) {
            broadcast("hash_change_no_pointer");
        }
    });

    // User clicked on something that was a pointer, but nothing happened, so they clicked on it again
  
    // clicked on something that wasn't clickable

    /* Application problems
     *---------------------------------*/

    // click resulted in a javascript error

    // frequent_reload user has reloaded more than x in x seconds


    /* Application confusion
     *---------------------------------*/
    // user sees the same message twice

    // user hit stop and interrupted a transfer

    // user hit back x times in a row

    // slowed_cadence - this page is taking signifigantly longer than previous pages

    // lost_focus

    // user_searched

    // Tap into the accelerometer and watch for a thrown computer :)

    /* Helpers
     *---------------------------------*/

    // Record the state of recent clicks
    var recentClicks = [];
    jQuery(document).click(function(evt) {
        recentClicks.push({
            when: new Date().getTime(),
            target: evt.target,
            pointer: mouseIsPointer(evt.target)
        });
        // Only remember the last few clicks
        if (recentClicks.length > 5) {
          recentClicks.shift();
        }
    });

    function broadcast(name) {
        Pilotfish("publish", pluginMeta.eventPrefix, {name: name, target: serializeElement(lastClickTarget())});
    }

    function serializeElement(elem) {
        // TODO: Something better
        return elem.outerHTML;
    }

    function mouseIsPointer(elem) {
        return jQuery(elem).css("cursor") === "pointer";
    }

    function isLastClickPointer() {
        if (recentClicks.length === 0) {
           return null;
        }
        return recentClicks[recentClicks.length-1].pointer;
    }

    function lastClickTarget() {
        if (recentClicks.length === 0) {
           return null;
        }
        return recentClicks[recentClicks.length-1].target;
    }

    return true;
});
