/* Tests for the Pilotfish tracker plugin */

QUnit.module('Pilotfish Tracker Core');
QUnit.asyncTest('setup', function() {

    QUnit.ok(Pilotfish('trackerInit', {
        backends: {
            'google-analytics': {"accountid": "UA-XXXXXXX-1"},
            'quantcast': {"accountid": "p-XXXXXXX-1"},
            'mixpanel':{"accountid": "aaaaaaaaaaaaaaaaaaaaaaa"}
        }
    }), 'Pilotfish tracker call true');

    Pilotfish('tracker', 'test-event1');
    Pilotfish('tracker', 'test-event2');

    QUnit.start();

});
