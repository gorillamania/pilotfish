/* Pilotfish plugin for a tracking user behavior, with multiple backends
 * Version 0.3.0
 * See https://github.com/pilotfish/pilotfish/tree/master/plugins/tracker
 */

Pilotfish('registerPlugin', 'trackerInit', function(options) {

    this.version = "0.3.1";

    options = Pilotfish('extend', {
        backends: {}, // backends to use to track
        events: [], // Events to listen for and record 
        hashChangePageView: false // treat hash changes as page views (for thick clients)
    }, options);
    var pageView = "pageview";

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

    function recordEvent(eventName, data) {
        for (var backend in options.backends) {
            if (options.backends.hasOwnProperty(backend)) {
                track(backend, eventName, data);
                Pilotfish('fire', 'plugin:tracker:recordEvent', {evt: eventName, data: data, backend: backend});
            }
        }
    }

    // An API so publisher can call Pilotfish('tracker', 'event', [eventData])
    Pilotfish('registerPlugin', 'tracker', recordEvent);

    // If they passed in events to listen for...
    if (options.events) {
        for (var i = 0; i < options.events.length; i++ ) {
            Pilotfish('on', options.events[i], recordEvent);
        }
    }

    // For thick clients that use the hash tag as page views, record them that way.
    if (options.hashChangePageView) {
        Pilotfish('on', 'window:hashchange', function(data) {
            recordEvent('pageview', data);
        });
    }
    return true;
});
