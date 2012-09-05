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


module('Pilotfish setup');
test('Pilotfish object', function() {
    equal(typeof Pilotfish, "function", "typeof Pilotfish");
    equal(typeof Pilotfish.version, "string", "typeof Pilotfish.version");
    ok((/[0-9]{1}\.[0-9]{1,2}\.[0-9]{1,3}/).test(Pilotfish.version), "Pilotfish.version matches x.x.x");
});

test("Pilotfish(method, arg1, arg2)", function() {
    equal(Pilotfish('pageAttr', 'x', 'y'), 'y');
    equal(Pilotfish('pageAttr', 'x'), 'y');
    //deepEqual(Pilotfish('non existant function', 'x', 'y'), false);
});

test('Predefined function called', function() {
    equal(Pilotfish('pageAttr', 'test page'), 'yes', "pageAttr('test page') == 'yes'");
});


module('Extend');
test('simple', function(){
    deepEqual(Pilotfish('extend', {"one": 1}, {"two": 2}), {"one": 1, "two": 2}, "simple object extension");
    deepEqual(Pilotfish('extend', {"one": 1}, {"one": false}), {"one": false}, "override");
    deepEqual(Pilotfish('extend', null, {"two": 2}), {"two": 2}, "null source");
    deepEqual(Pilotfish('extend', undefined, {"two": 2}), {"two": 2}, "undefined source");
    deepEqual(Pilotfish('extend', [], {"two": 2}), {"two": 2}, "array source");
    deepEqual(Pilotfish('extend', 42, {"two": 2}), {"two": 2}, "int source");
    deepEqual(Pilotfish('extend', "str", {"two": 2}), {"two": 2}, "string source");
    deepEqual(Pilotfish('extend', true, {"two": 2}), {"two": 2}, "boolean true source");
    deepEqual(Pilotfish('extend', false, {"two": 2}), {"two": 2}, "boolean false source");
});

test('clone', function(){
    var one = {"one": 1};
    deepEqual(one, {"one": 1}, "cloning object");
    var oneClone = Pilotfish('extend', one);
    deepEqual(oneClone, {"one": 1}, "cloned object");
    one.one = 42;
    equal(one.one, 42, "original object updated");
    equal(oneClone.one, 1, "cloned object does not get updated");

    var dataTypes = [42, parseInt("asdf", 10), 0, "0", true, false, null, undefined, [], {}, "str", "", new Date()];
    for (var i = 0; i < dataTypes.length; i++) {
        deepEqual(Pilotfish('extend', dataTypes[i]), dataTypes[i], "clone typeof " + typeof dataTypes[i]);
    }
});

test('complex', function(){
    deepEqual(Pilotfish('extend', {}, Pilotfish), Pilotfish, "Clone pilotfish object");
});

module('Util');
test('log', function(){
    expect(1);
    Pilotfish('log', "Pilotfish('log') test:", "second arg", 3, [1,2,3], true, {});
    ok(true);
});

test('Page attributes', function() {
    deepEqual(Pilotfish('pageAttr'), "", "no key");
    deepEqual(Pilotfish('pageAttr', ""), "", "empty string key");
    deepEqual(Pilotfish('pageAttr', "non existant"), "", "non existant key");

    equal(Pilotfish('pageAttr', "foo", "bar"), "bar", "set should return the value");
    equal(Pilotfish('pageAttr', "foo"), "bar", "get foo");

    Pilotfish('pageAttr', "foo", true);
    equal(Pilotfish('pageAttr', "foo"), "true", "foo boolean true converted to string 'true'");

    Pilotfish('pageAttr', "foo", false);
    equal(Pilotfish('pageAttr', "foo"), "false", "foo boolean false converted to string 'false'");

    Pilotfish('pageAttr', "foo", null);
    equal(Pilotfish('pageAttr', "foo"), "", "null converted to empty string");

    Pilotfish('pageAttr', "foo", 0);
    equal(Pilotfish('pageAttr', "foo"), "0", "integer 0 convertd to string 0");

    // Clear it
    deepEqual(Pilotfish('pageAttr', "foo", ""), "", "set to empty string should return empty string");
    equal(Pilotfish('pageAttr', "foo"), "", "empty string after clear");
});

test('Selector', function(){
    ok(Pilotfish('S', '') instanceof Array);
    ok(Pilotfish('S', undefined) instanceof Array);
    ok(Pilotfish('S', null) instanceof Array);
    ok(Pilotfish('S', {}) instanceof Array);
    ok(Pilotfish('S', []) instanceof Array);
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

