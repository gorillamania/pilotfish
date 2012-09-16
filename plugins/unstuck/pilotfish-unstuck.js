/* Pilotfish plugin for automagically determining when there are usability problems
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
    /* Click actions
     *---------------------------------*/

    // Click resulted in url change, but target wasn't a pointer
    jQuery(window).unload(function(evt) {
        console.log("Hi, unload");
        console.log("evt", evt);
        console.log("tgt", evt.target);
        console.log("tgt", evt.target);
        console.log("is pointer", mouseIsPointer(evt.target));
        if (mouseIsPointer(evt.target)) {
            console.log("last clickc poiter");
            Pilotfish('publish', this.eventPrefix + 'clicked_link_no_pointer', serializeElement(lastClickTarget()));
        }
    });


    // Click resulted in an ajax request, but target wasn't a pointer

    // Click resulted in a dom reflow, but target wasn't a pointer

    // User clicked on something that was a pointer, but nothing happened, so they clicked on it again

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

    // clicked on something that wasn't clickable

    /* Helpers
     *---------------------------------*/

    // Record the state of recent clicks
    var recentClicks = [];
    jQuery(document).click(function(evt) {
        recentClicks.push[{
            when: new Date().getTime(),
            target: evt.target,
            pointer: mouseIsPointer(evt.target)
        }];
        // Only remember the last few clicks
        if (recentClicks.length > 5) {
          recentClicks.shift();
        }
    });

    function serializeElement(elem) {
        // TODO: Something better
        return elem.outerHTML;
    }

    function mouseIsPointer(elem) {
        return jQuery("img").css("cursor") === "pointer";
    }

    function isLastClickPointer() {
        console.log("last click pointer", recentClicks);
        if (recentClicks.length === 0) {
           return null;
        }
        console.log("ispointer",recentClicks[recentClicks.length-1].pointer );
        return recentClicks[recentClicks.length-1].pointer;
    }
    function lastClickTarget() {
        console.log("last click target", recentClicks);
        if (recentClicks.length === 0) {
           return null;
        }
        console.log("last target", recentClicks[recentClicks.length-1].target);
        return recentClicks[recentClicks.length-1].target;
    }

    return true;
});
