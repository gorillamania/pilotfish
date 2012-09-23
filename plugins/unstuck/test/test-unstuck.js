/* Tests for the Pilotfish unstuck plugin */

QUnit.module('Pilotfish Plugin unstuck');
QUnit.asyncTest('setup', function() {
    location.href="#reset"; // If the page is refreshed, reset the hash tag

    QUnit.ok(Pilotfish('unstuck', {}), 'Pilotfish unstuck call true');

    var hash_change_no_pointer = 0;
    Pilotfish('on', 'plugins:unstuck', function(evt, data) {
        if (data.name == 'hash_change_no_pointer') {
            hash_change_no_pointer++;
        } else if (data.name == 'url_change_no_pointer') {
            // I couldn't figour out how to test this in an automated way, so I just
            // watch for the console.log to be printed when clicking on the #url_no_pointer link
            console.log("url_change_no_pointer recorded!");
        }
    });
    jQuery("#hash_with_pointer").click(); // should not fire event

    setTimeout(function() {
        // Simulate a small delay between clicks
        jQuery("#hash_no_pointer").click(); // should fire event

        setTimeout(function() {
            QUnit.equal(hash_change_no_pointer, 1, "hash change recorded " + hash_change_no_pointer);
            QUnit.start();
        }, 50);

    }, 50);

    // I can't get this to work automatically without breaking the test, but uncommenting it and manually
    // running it correctly throws an error
    // jQuery("#error_link").click();

});
