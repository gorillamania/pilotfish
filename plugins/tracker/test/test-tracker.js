/* Tests for the Pilotfish tracker plugin */

Pilotfish('subscribe', 'error', function(error, data) {
    ok(false, "Pilotfish error: " + JSON.stringify(data));
});

module('Pilotfish Tracker Core');
test('setup', function() {
    var PilotfishTracker = new Pilotfish('tracker');
    equal(typeof PilotfishTracker, "function", "typeof PilotfishTracker");
    ok( PilotfishTracker.backend('google-analytics', {'accountid': 'UX-XXXXXX-1'}), "PilotfishTracker.backend['google-analytics'] true");
});


module('Google Analytics');
test('_gaq set up', function() {
  equal(typeof window._gaq, "object", "typeof window._gaq");
});
// TODO: Check that ga.js loaded correctly
// TODO: Override new Image() so we can see what pixels were fired
// TOOD: trigger an event and watch it get set
// equal(typeof window._gat, "object", "typeof window._gat");
