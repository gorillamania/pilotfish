/* Tests for the underlying framework */
/* vim: set expandtab tabstop=4: */


module('Browser compatibility assertions');
test('document.querySelector and document.querySelectorAll are there', function() {
    equal(typeof document.querySelectorAll, "function", "typeof document.querySelectorAll");
    equal(typeof document.querySelector, "function", "typeof document.querySelector");
});

test('JSON is supported', function() {
    equal(typeof JSON, "object", "typeof JSON");
});

test('jQuery is there', function() {
    equal(typeof jQuery, "function", "typeof jQuery");
});


module('Pilotfish setup');
test('Pilotfish object', function() {
    equal(typeof Pilotfish, "function", "typeof Pilotfish");
    equal(typeof Pilotfish.version, "string", "typeof Pilotfish.version");
    ok((/[0-9]{1}\.[0-9]{1,2}\.[0-9]{1,3}/).test(Pilotfish.version), "Pilotfish.version matches x.x.x");
});

test("Pilotfish(method, arg1, arg2)", function() {
    equal(Pilotfish('pageData', 'x', 'y'), 'y');
    equal(Pilotfish('pageData', 'x'), 'y');
    //deepEqual(Pilotfish('non existant function', 'x', 'y'), false);
});

test('Predefined function called', function() {
    equal(Pilotfish('pageData', 'test page'), 'yes', "pageData('test page') == 'yes'");
});


module('Events');
var clicked = false, action = 'buy_button_clicked';
test('event fired', function() {
  expect(12);
  Pilotfish('subscribe', action, function(eventName, data) {
    clicked = true;
    equal(eventName, eventName, "eventName");
    equal(data.category, 'category', 'category set');
    equal(data.label, 'label', 'label set');
    equal(data.value, 42, 'value set');
    deepEqual(data.nonInteractive, false, 'nonInteractive set');

    equal(Pilotfish('eventLog').length, 1, "event log length");
  });

  ok(! clicked, "event not fired yet");
  ok(Pilotfish('publish', action, {'category': 'category', label: 'label', value: 42, nonInteractive: false}), "Event fired");
  
  ok(Pilotfish('unsubscribe', 'buy button clicked') !== false, "unsubscribe not false");

  // Now it shouldn't fire
  clicked = false;
  ok(Pilotfish('publish', 'buy button clicked'), "Event fired");
  ok(! clicked, "event not fired after unsubscribe");

  equal(Pilotfish('eventLog').length, 2, "event log length 2");
});

module('Extend');
test('simple', function(){
    deepEqual(Pilotfish('extend', {"one": 1}, {"two": 2}), {"one": 1, "two": 2}, "simple object extension");
    deepEqual(Pilotfish('extend', {"one": 1}, {"one": false}), {"one": false}, "override");
    deepEqual(Pilotfish('extend', null, {"two": 2}), {"two": 2}, "null source");
    deepEqual(Pilotfish('extend', undefined, {"two": 2}), {"two": 2}, "undefined source");
    deepEqual(Pilotfish('extend', [], {"two": 2}), [], "array source");
    deepEqual(Pilotfish('extend', 42, {"two": 2}), {"two": 2}, "int source");
    deepEqual(Pilotfish('extend', "str", {"two": 2}), {"two": 2}, "string source");
    deepEqual(Pilotfish('extend', false, {"two": 2}), {"two": 2}, "boolean false source");
});

module('Util');
test('each', function(){
    var counter = 0;
    Pilotfish('each', [1,2,4], function(i, member) {
      counter += member;
    });
    ok(counter, 7);
});

test('log', function(){
    expect(1);
    Pilotfish('log', "Pilotfish('log') test:", "second arg", 3, [1,2,3], true, {});
    ok(true);
});

test('Page data', function() {
    deepEqual(Pilotfish('pageData'), "", "no key");
    deepEqual(Pilotfish('pageData', ""), "", "empty string key");
    deepEqual(Pilotfish('pageData', "non existant"), "", "non existant key");

    equal(Pilotfish('pageData', "foo", "bar"), "bar", "set should return the value");
    equal(Pilotfish('pageData', "foo"), "bar", "get foo");

    Pilotfish('pageData', "foo", true);
    equal(Pilotfish('pageData', "foo"), "true", "foo boolean true converted to string 'true'");

    Pilotfish('pageData', "foo", false);
    equal(Pilotfish('pageData', "foo"), "false", "foo boolean false converted to string 'false'");

    Pilotfish('pageData', "foo", null);
    equal(Pilotfish('pageData', "foo"), "", "null converted to empty string");

    Pilotfish('pageData', "foo", 0);
    equal(Pilotfish('pageData', "foo"), "0", "integer 0 convertd to string 0");

    // Clear it
    deepEqual(Pilotfish('pageData', "foo", ""), "", "set to empty string should return empty string");
    equal(Pilotfish('pageData', "foo"), "", "empty string after clear");
});

test('Selector', function(){
    equal(Pilotfish('S', '').length, 0, "empty string");
    equal(Pilotfish('S', undefined).length, 0, "undefined");
    equal(Pilotfish('S', null).length, 0, "null");
    equal(typeof Pilotfish('S', {}), "object", "{}"); // jQuery {} returns {0: {}, length: 1}
    equal(Pilotfish('S', []).length, 0, "[]");
    equal(Pilotfish('S', '#qunit-banner').length, 1, '#qunit-banner');
    equal(Pilotfish('S', '#nonexistant-id').length, 0, '#nonexistant-id');
    equal(Pilotfish('S', '.result').length, 1, '.result');
});


test('Settings', function(){
    deepEqual(Pilotfish('setting'), "", "no key");
    deepEqual(Pilotfish('setting', 'account', '1234'), "1234", "set account");
    deepEqual(Pilotfish('setting', 'account'), "1234", "get account");
    deepEqual(Pilotfish('setting', 'account', ''), "", "set cleared");
    deepEqual(Pilotfish('setting', 'account'), "", "get cleared");
});


test('toS', function(){
    deepEqual(Pilotfish('toS', null), "", "null");
    deepEqual(Pilotfish('toS', {}), "{}", "empty object");
    deepEqual(Pilotfish('toS', {foo: 1}), '{"foo":1}', "full object");
    deepEqual(Pilotfish('toS', []), "[]", "empty array");
    deepEqual(Pilotfish('toS', [4,5,6]), "[4,5,6]", "3 element array");
    deepEqual(Pilotfish('toS', true), "true", "boolean true");
    deepEqual(Pilotfish('toS', false), "false", "boolean false");
    deepEqual(Pilotfish('toS', undefined), "", "undefined");
    deepEqual(Pilotfish('toS', 0), "0", "0 int");
    deepEqual(Pilotfish('toS', "0"), "0", "0 str");
    deepEqual(Pilotfish('toS', parseInt("asdf", 10)), "", "NaN");
    var now = new Date();
    deepEqual(Pilotfish('toS', now), JSON.stringify(now), "date");
});


module('Plugins');
test('Simple plugin', function() {
    Pilotfish.register('upper', function(arg) {
        return arg.toUpperCase();
    });
    equal(Pilotfish('upper', 'test'), "TEST", "upper plugin");
});

