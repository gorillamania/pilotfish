/* Tests for the underlying framework */

QUnit.module('Browser compatibility assertions');
QUnit.test('document.querySelector and document.querySelectorAll are there', function() {
    QUnit.equal(typeof document.querySelectorAll, "function", "typeof document.querySelectorAll");
    QUnit.equal(typeof document.querySelector, "function", "typeof document.querySelector");
});

QUnit.test('JSON is supported', function() {
    QUnit.equal(typeof JSON, "object", "typeof JSON");
});

QUnit.test('jQuery is there', function() {
    QUnit.equal(typeof jQuery, "function", "typeof jQuery");
});


QUnit.module('Pilotfish setup');
QUnit.test('Pilotfish object', function() {
    QUnit.equal(typeof Pilotfish, "function", "typeof Pilotfish");
    QUnit.equal(typeof Pilotfish.version, "string", "typeof Pilotfish.version");
    QUnit.ok((/[0-9]{1}\.[0-9]{1,2}\.[0-9]{1,3}/).test(Pilotfish.version), "Pilotfish.version matches x.x.x");
});

QUnit.test("Pilotfish(method, arg1, arg2)", function() {
    QUnit.equal(Pilotfish('pageData', 'x', 'y'), 'y');
    QUnit.equal(Pilotfish('pageData', 'x'), 'y');
    QUnit.equal(Pilotfish('non existant function', 'x', 'y'), "NOT_THERE");
});

QUnit.test('Predefined function called', function() {
    QUnit.equal(Pilotfish('pageData', 'test page'), 'yes', "pageData('test page') == 'yes'");
});


QUnit.module('Events');
QUnit.test('custom events', function() {
    var clicked = false, action = 'buy_button_clicked';

    var handler = function(evt, data) {
        QUnit.equal(evt.type, action, 'evt.type is action');
        clicked = true;
        QUnit.equal(data.category, 'category', 'category set');
        QUnit.equal(data.label, 'label', 'label set');
        QUnit.equal(data.value, 42, 'value set');
        QUnit.deepEqual(data.nonInteractive, false, 'nonInteractive set');
    };
    Pilotfish('on', action, handler);

    QUnit.ok(! clicked, "event not fired yet");
    Pilotfish('trigger', action, {'category': 'category', label: 'label', value: 42, nonInteractive: false});

    QUnit.ok(Pilotfish('off', 'buy button clicked', handler) !== false, "off not false");

    // Now it shouldn't fire
    clicked = false;
    Pilotfish('trigger', 'buy button clicked');
    QUnit.ok(! clicked, "event not fired after off");

});

QUnit.test('dom events', function() {

    var div = document.createElement("div"),
        clicked = false;

    var handler = function(evt, data) {
        QUnit.equal(evt.type, 'click', 'evt.type is action');
        clicked = true;
    };
    Pilotfish('on', div, 'click', handler);

    QUnit.ok(! clicked, "click event not fired yet");
    Pilotfish('trigger', div, 'click', {'category': 'category', label: 'label', value: 42, nonInteractive: false});

    // This doesn't work, because jQuery.off requires the selector used
    //QUnit.ok(Pilotfish('off', 'click', handler) !== false, "off not false");
    // Now it shouldn't fire
    //clicked = false;
    //Pilotfish('trigger', div, 'click');
    //QUnit.ok(! clicked, "event not fired after off");
});


QUnit.module('Extend');
QUnit.test('simple', function(){
    QUnit.deepEqual(Pilotfish('extend', {"one": 1}, {"two": 2}), {"one": 1, "two": 2}, "simple object extension");
    QUnit.deepEqual(Pilotfish('extend', {"one": 1}, {"one": false}), {"one": false}, "override");
    QUnit.deepEqual(Pilotfish('extend', null, {"two": 2}), {"two": 2}, "null source");
    QUnit.deepEqual(Pilotfish('extend', undefined, {"two": 2}), {"two": 2}, "undefined source");
    QUnit.deepEqual(Pilotfish('extend', [], {"two": 2}), [], "array source");
    QUnit.deepEqual(Pilotfish('extend', 42, {"two": 2}), {"two": 2}, "int source");
    QUnit.deepEqual(Pilotfish('extend', "str", {"two": 2}), {"two": 2}, "string source");
    QUnit.deepEqual(Pilotfish('extend', false, {"two": 2}), {"two": 2}, "boolean false source");
});

QUnit.module('Util');

QUnit.test('log', function(){
    QUnit.expect(1);
    Pilotfish('log', "Pilotfish('log') test:", "second arg", 3, [1,2,3], true, {});
    QUnit.ok(true);
});

QUnit.test('Page data', function() {
    QUnit.deepEqual(Pilotfish('pageData'), "", "no key");
    QUnit.deepEqual(Pilotfish('pageData', ""), "", "empty string key");
    QUnit.deepEqual(Pilotfish('pageData', "non existant"), "", "non existant key");

    QUnit.equal(Pilotfish('pageData', "foo", "bar"), "bar", "set should return the value");
    QUnit.equal(Pilotfish('pageData', "foo"), "bar", "get foo");

    Pilotfish('pageData', "foo", true);
    QUnit.equal(Pilotfish('pageData', "foo"), "true", "foo boolean true converted to string 'true'");

    Pilotfish('pageData', "foo", false);
    QUnit.equal(Pilotfish('pageData', "foo"), "false", "foo boolean false converted to string 'false'");

    Pilotfish('pageData', "foo", null);
    QUnit.equal(Pilotfish('pageData', "foo"), "", "null converted to empty string");

    Pilotfish('pageData', "foo", 0);
    QUnit.equal(Pilotfish('pageData', "foo"), "0", "integer 0 convertd to string 0");

    // Clear it
    QUnit.deepEqual(Pilotfish('pageData', "foo", ""), "", "set to empty string should return empty string");
    QUnit.equal(Pilotfish('pageData', "foo"), "", "empty string after clear");
});

QUnit.test('Selector', function(){
    QUnit.equal(Pilotfish('S', '').length, 0, "empty string");
    QUnit.equal(Pilotfish('S', undefined).length, 0, "undefined");
    QUnit.equal(Pilotfish('S', null).length, 0, "null");
    QUnit.equal(typeof Pilotfish('S', {}), "object", "{}"); // jQuery {} returns {0: {}, length: 1}
    QUnit.equal(Pilotfish('S', []).length, 0, "[]");
    QUnit.equal(Pilotfish('S', '#qunit-banner').length, 1, '#qunit-banner');
    QUnit.equal(Pilotfish('S', '#nonexistant-id').length, 0, '#nonexistant-id');
    QUnit.equal(Pilotfish('S', '.result').length, 1, '.result');
});


QUnit.test('Settings', function(){
    QUnit.deepEqual(Pilotfish('setting'), "", "no key");
    QUnit.deepEqual(Pilotfish('setting', 'account', '1234'), "1234", "set account");
    QUnit.deepEqual(Pilotfish('setting', 'account'), "1234", "get account");
    QUnit.deepEqual(Pilotfish('setting', 'account', ''), "", "set cleared");
    QUnit.deepEqual(Pilotfish('setting', 'account'), "", "get cleared");
});


QUnit.test('toS', function(){
    QUnit.deepEqual(Pilotfish('toS', null), "", "null");
    QUnit.deepEqual(Pilotfish('toS', {}), "{}", "empty object");
    QUnit.deepEqual(Pilotfish('toS', {foo: 1}), '{"foo":1}', "full object");
    QUnit.deepEqual(Pilotfish('toS', []), "[]", "empty array");
    QUnit.deepEqual(Pilotfish('toS', [4,5,6]), "[4,5,6]", "3 element array");
    QUnit.deepEqual(Pilotfish('toS', true), "true", "boolean true");
    QUnit.deepEqual(Pilotfish('toS', false), "false", "boolean false");
    QUnit.deepEqual(Pilotfish('toS', undefined), "", "undefined");
    QUnit.deepEqual(Pilotfish('toS', 0), "0", "0 int");
    QUnit.deepEqual(Pilotfish('toS', "0"), "0", "0 str");
    QUnit.deepEqual(Pilotfish('toS', parseInt("asdf", 10)), "", "NaN");
    var now = new Date();
    QUnit.deepEqual(Pilotfish('toS', now), JSON.stringify(now), "date");
});


QUnit.module('Plugins');
QUnit.test('Simple plugin', function() {
    Pilotfish('registerPlugin', 'upper', function(arg) {
        return arg.toUpperCase();
    });
    QUnit.equal(Pilotfish('upper', 'test'), "TEST", "upper plugin");
});
QUnit.test('Plugin checking', function() {
    QUnit.ok( ! Pilotfish('hasPlugin', 'non existant plugin'), 'hasPlugin with non existant plugin');
    QUnit.ok(Pilotfish('hasPlugin', 'upper'), 'hasPlugin with existant plugin');
});
jQuery(window).load(function() {
    QUnit.test('Dynamically loaded plugin', function() {
        QUnit.ok(Pilotfish('hasPlugin', 'trackerInit'), 'trackerInit is there');
    });
});


QUnit.module('Browser events');
var loaded = false, ready = false;
Pilotfish('onready', function() { ready = true; });
Pilotfish('onload', function() { loaded = true; });
jQuery(window).load(function() {
    QUnit.test('window loaded', function() {
        QUnit.ok(loaded, 'loaded');
        QUnit.ok(ready, 'ready');
    });
});
