/* Tests for the Pilotfish tracker plugin */

Pilotfish('subscribe', 'error', function(error, data) {
    ok(false, "Pilotfish error: " + JSON.stringify(data));
});

module('Pilotfish Tracker Core');
test('setup', function() {
    var PilotfishTracker = new Pilotfish('tracker');
    equal(typeof PilotfishTracker, "function", "typeof PilotfishTracker");
    ok( PilotfishTracker.backend('google-analytics', {'accountid': 'UA-XXXXXXX-1'}), "PilotfishTracker.backend['google-analytics'] true");
    ok( PilotfishTracker.backend('quantcast', {'accountid': 'p-XXXXXXXXXX'}), "PilotfishTracker.backend['quantcast'] true");
});


module('Google Analytics');
test('_gaq set up', function() {
    equal(typeof window._gaq, "object", "typeof window._gaq");
});
Pilotfish('subscribe', 'plugins:tracker:backend_loaded', function(eventName, data) {
    if (data.backend == "google-analytics") {
        test('ga.js setup', function() {
            equal(typeof window._gat, "object", "typeof window._gat");

            // TODO: Override new Image() so we can see what pixels were fired
        });
    }
});

module('Quantcast');
test('_qevents set up', function() {
    equal(typeof window._qevents, "object", "typeof window._qevents");
});
Pilotfish('subscribe', 'plugins:tracker:backend_loaded', function(eventName, data) {
    if (data.backend == "quantcast") {
        test('quant.js setup', function() {
            ok(true);
        });
        // TODO: Override new Image() so we can see what pixels were fired
    }
});
