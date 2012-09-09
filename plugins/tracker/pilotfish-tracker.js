/* Pilotfish plugin for a tracking user behavior.
 * See README.md
*/

Pilotfish('register', 'tracker', function() {

    var Tracker = function(options) {
      options = Pilotfish('extend', {
          onload: false
        }, options);
    };

    var backends = [], securePage = (location.protocol == "https:");

    // Register a backend to interface with
    Tracker.backend = function(backend, options) {
      if (!options.accountid) {
        Pilotfish('error', "Missing accountid for tracker", backend); 
        return false;
      }

      switch (backend) { 
        case "quantcast": return false;
        case "google-analytics": 
          backends[backend] = new TrackerBackend({
               name: backend,
               httpUrl: "http://www.google-analytics.com/ga.js",
               httpsUrl: "https://ssl.google-analytics.com/ga.js",
               beforeLoad: function beforeLoad() {
                  window._gaq = window._gaq || [];
                  window._gaq.push(['_setAccount', options.accountid]);
                  if (options.domain) {
                    window._gaq.push(['_setDomainName', 'aboinga.com']);
                  }
               },
               recordView: function(path) {
                  var pageTracker = window._gat._getTracker(options.accountid);
                  pageTracker._trackPageView(path);
               },
               recordEvent: function(eventName, category, label, value, nonInteraction ) {
                  // https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide
                  var pageTracker = window._gat._getTracker(options.accountid);
                  pageTracker._trackEvent(category || "pilotfish", eventName, label || "", value || 0, nonInteraction || false );
               }
            });
            return true;
        default: Pilotfish('error', "Invalid backend for tracker"); return false;
      }
    };

    // Register a backend to interface with
    Tracker.recordView = function(path) {
      path = path || (location.pathname + location.search);
      for (var backend in backends) {
        backends[backend].recordView(path);
      }
    };

    Tracker.recordEvent = function(eventName, category, label, value, nonInteraction ) {
      for (var backend in backends) {
        backends[backend].recordEvent.apply(this,arguments);
      }
    };



    // Supported backends. Must implement:
    // name
    // httpUrl
    // recordView([path])
    //
    // Optionally implement
    // accountid
    // recordEvent([path]) 
    // httpsUrl
    // beforeLoad
    // afterLoad
    var TrackerBackend = function(options) {
        this.name = options.name;
        this.account = options.account;
        this.httpUrl = options.httpUrl;
        this.httpsUrl = options.httpsUrl || options.httpUrl;

        this.actualUrl = securePage ? this.httpsUrl : this.httpUrl;

        if (options.beforeLoad) {
          this.beforeLoad = options.beforeLoad;
          this.beforeLoad();
        }
        if (options.afterLoad) {
          this.afterLoad = options.afterLoad;
          Pilotfish('loadScript', this.actualUrl, this.afterLoad);
        } else {
          Pilotfish('loadScript', this.actualUrl);
        }

        return this;
    };
    TrackerBackend.prototype.recordView = function(path) {
      return true;
    };
    TrackerBackend.prototype.recordEvent = function(tracker) {
      return true;
    };

    return Tracker;
});
