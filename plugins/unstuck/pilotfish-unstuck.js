/* Pilotfish plugin for automagically determining when there are usability problems
 * Version 0.1.0
 * See https://github.com/pilotfish/pilotfish/tree/master/plugins/unstuck
 */

Pilotfish('registerPlugin', 'unstuck', function(options) {

    var pluginMeta = {
        version     : "0.3.0",
        name        : 'unstuck',
        eventPrefix : 'plugins:unstuck',
        defaults    : {
            trackEvents: true,
            clickRecency: 50, // Number of milliseconds that defines a recent click
            // Events
            hash_change_no_pointer  : true,
            url_change_no_pointer   : true,
            click_js_error          : true
        }
    };

    options = Pilotfish('extend', pluginMeta.defaults, options);


    /* Click actions
     *---------------------------------*/

    // url_cange_no_pointer. Click resulted in url change, but target wasn't a pointer
    if (options.url_change_no_pointer) {
      Pilotfish('on', window, 'unload', function(data) {
          if (wasLastClickPointer() === false && wasLastClickRecent() === true) {
              broadcast('url_change_no_pointer');
          }
      });
    }


    // hash_change_no_pointer. Click resulted in hash tag change, but wasn't a pointer
    if (options.hash_change_no_pointer) {
      Pilotfish('on', 'window:hashchange', function(data) {
          if (wasLastClickPointer() === false && wasLastClickRecent() === true) {
              broadcast('hash_change_no_pointer');
          }
      });
    }

    // Click resulted in an ajax request, but no status indicator

    /* Application problems
     *---------------------------------*/

    // User clicked on something that was a pointer, twice

    // click_js_error click resulted in a javascript error
    Pilotfish('on', 'js_error', function(evt, data) {
        if (wasLastClickRecent() === true) {
            broadcast('click_js_error', data);
        }
    });


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
    Pilotfish('on', document, 'click', function(evt) {
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

    function broadcast(name, data) {
        if (options.trackEvents) {
            Pilotfish('track', pluginMeta.eventPrefix + ':' + name);
        }
        data = data || {};
        data.name = name;
        data.target = serializeElement(lastClickTarget());
        Pilotfish('trigger', pluginMeta.eventPrefix, data);
    }

    function serializeElement(elem) {
        // TODO: Something better
        return elem.outerHTML;
    }

    function mouseIsPointer(elem) {
        return jQuery(elem).css("cursor") === "pointer";
    }

    function wasLastClickPointer() {
        if (recentClicks.length === 0) {
           return null;
        }
        return recentClicks[recentClicks.length-1].pointer;
    }

    function wasLastClickRecent() {
        if (recentClicks.length === 0) {
           return null;
        }
        var now = new Date().getTime();
        return (now - recentClicks[recentClicks.length-1].when) < options.clickRecency;
    }

    function lastClickTarget() {
        if (recentClicks.length === 0) {
           return null;
        }
        return recentClicks[recentClicks.length-1].target;
    }

    return true;
});
