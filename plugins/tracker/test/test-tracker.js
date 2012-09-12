/* Tests for the Pilotfish tracker plugin */

module('Pilotfish Tracker Core');
test('setup', function() {

    ok(Pilotfish('trackerInit', {
        backends: {
            'google-analytics': {"accountid": "UA-XXXXXXX-1"},
            'quantcast': {"accountid": "p-XXXXXXX-1"},
            'mixpanel':{"accountid": "aaaaaaaaaaaaaaaaaaaaaaa"}
        }, 
        events: [
            'test:event1',
            'test:event2'
        ]
    }), 'Pilotfish tracker call true');

    Pilotfish('publish', 'test:event1');
    Pilotfish('publish', 'test:event2');

});
