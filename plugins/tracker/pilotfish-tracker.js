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
        case "mixpanel": 
            backends[backend] = new TrackerBackend({
                name: backend,
                httpUrl: "http://cdn.mxpnl.com/libs/mixpanel-2.1.min.js",
                httpsUrl: "https://cdn.mxpnl.com/libs/mixpanel-2.1.min.js",
                beforeLoad: function beforeLoad() {
                    var a = window.mixpanel = (window.mixpanel || []);
                    a._i = [];
                    a.init = function (b, c, f) {
                      function d(a, b) {
                        var c = b.split(".");
                        a[b] = function () {
                          a.push([b].concat(Array.prototype.slice.call(arguments, 0)));
                        };
                      }
                      var g = a;
                      "undefined" !== typeof f ? g = a[f] = [] : f = "mixpanel";
                      g.people = g.people || [];
                      var h = "disable track track_pageview track_links track_forms register register_once unregister identify name_tag set_config people.identify people.set people.increment".split(" ");
                      for (var e = 0; e < h.length; e++) {
                         d(g, h[e]);
                      }
                      a._i.push([b, c, f]);
                    };
                    a.__SV = 1.1;
                },
                afterLoad: function beforeLoad() {
                    if (window.mixpanel) {
                        window.mixpanel.init(options.accountid);
                    }
                },
                recordView: function(path) {
                    window.mixpanel && window.mixpanel.track_pageview(path);
                },
                recordEvent: function(eventName) {
                    window.mixpanel && window.mixpanel.track(eventName);
                }
            });
            return true;

        case "quantcast": 
          backends[backend] = new TrackerBackend({
               name: backend,
               httpUrl: "http://edge.quantserve.com/quant.js",
               httpsUrl: "https://secure.quantserve.com/quant.js",
               beforeLoad: function beforeLoad() {
                  window._qevents = window._qevents || [];
               },
               recordView: function(path) {
                  window._qevents.push( { qacct: options.accountid} );
               },
               recordEvent: function() {}
            });
            return true;

        case "google-analytics": 
          backends[backend] = new TrackerBackend({
               name: backend,
               httpUrl: "http://www.google-analytics.com/ga.js",
               httpsUrl: "https://ssl.google-analytics.com/ga.js",
               beforeLoad: function beforeLoad() {
                  window._gaq = window._gaq || [];
                  window._gaq.push(['_setAccount', options.accountid]);
                  if (options.domain) {
                    window._gaq.push(['_setDomainName', options.domain]);
                  }
               },
               recordView: function(path) {
                  var pageTracker = window._gat._getTracker(options.accountid);
                  pageTracker._trackPageview(path);
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

    Tracker.recordView = function(path) {
      path = path || (location.pathname + location.search);
      for (var backend in backends) {
        backends[backend].recordView(path);
        Pilotfish('publish', 'plugins:tracker:recordView', {backend: backend.name});
      }
    };

    Tracker.recordEvent = function(eventName, category, label, value, nonInteraction ) {
      for (var backend in backends) {
        backends[backend].recordEvent.apply(this,arguments);
        Pilotfish('publish', 'plugins:tracker:recordEvent', {backend: backend.name});
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
        var that = this;
        that.name = options.name;
        that.account = options.account;
        that.httpUrl = options.httpUrl;
        that.httpsUrl = options.httpsUrl || options.httpUrl;

        that.actualUrl = securePage ? that.httpsUrl : that.httpUrl;

        if (options.beforeLoad) {
            that.beforeLoad = options.beforeLoad;
            that.beforeLoad();
        }
        if (options.afterLoad) {
            that.afterLoad = options.afterLoad;
        }

        that.recordView = options.recordView;
        that.recordEvent = options.recordEvent;

        function afterLoadCallback() {
            if (typeof options.afterLoad == "function") {
                options.afterLoad();
            }
            Pilotfish('publish', 'plugins:tracker:backend_loaded', {backend: options.name});
            that.recordView();
        }

        Pilotfish('loadScript', that.actualUrl, afterLoadCallback);
        return this;

    };

    return Tracker;
});
