/* Pilotfish plugin for a tracking user behavior, with multiple backends
 * See README.md
 */

Pilotfish('register', 'tracker', function(options) {

    options = Pilotfish('extend', {backends: {}, events: []}, options);
    var pageView = "core:thickClientView";

    function track(backend, eventName, data) {
        switch (backend) { 
          case "mixpanel": 
            if (eventName == pageView) {
                window.mixpanel && window.mixpanel.track_pageview(data.path);
            } else {
                window.mixpanel && window.mixpanel.track(eventName);
            }
            break;

          case "quantcast": 
            if (eventName == pageView) {
                window._qevents && window._qevents.push( { qacct: options.backends[backend].accountid} );
            }
            break;

          case "google-analytics": 
            var pageTracker = window._gat._getTracker(options.backends[backend].accountid);
            if (eventName == pageView) {
                pageTracker._trackPageview(data.path);
            } else {
                // https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide
                pageTracker._trackEvent("pilotfish", eventName );
            }
            break;

          default: Pilotfish('error', "Invalid backend for tracker"); break;
        }
    }

    function listenForEvent(evt, data) {
        for (var backend in options.backends) {
            if (options.backends.hasOwnProperty(backend)) {
                track(backend, evt.type, data);
                Pilotfish('publish', 'plugin:tracker:recordEvent', data);
            }
        }
    }
    Pilotfish('subscribe', pageView, listenForEvent);

    for (var i = 0; i < options.events.length; i++ ) {
        Pilotfish('subscribe', options.events[i], listenForEvent);
    }


    // Now set it up to listen for Backbone route changes
    return true;
});
