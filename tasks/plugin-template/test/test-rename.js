/* Tests for the Pilotfish {%= pluginName %} plugin */

module('Pilotfish Plugin {%= pluginName %}');
test('setup', function() {

    ok(Pilotfish('{%= pluginName %}', {}), 'Pilotfish {%= pluginName %} call true');

    // Tests...
});
