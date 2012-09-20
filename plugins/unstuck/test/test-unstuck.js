/* Tests for the Pilotfish unstuck plugin */

QUnit.module('Pilotfish Plugin unstuck');
QUnit.asyncTest('setup', function() {
    location.href="#reset"; // If the page is refreshed, reset the hash tag

    QUnit.ok(Pilotfish('unstuck', {}), 'Pilotfish unstuck call true');

    var hash_change_no_pointer = 0;
    Pilotfish('on', 'plugins:unstuck', function(evt, data) {
      if (data.name == 'hash_change_no_pointer') {
        hash_change_no_pointer++;
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


});
