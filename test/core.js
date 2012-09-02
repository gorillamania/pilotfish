/* Tests for the underlying framework */

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


module('Pilotfish Object API');
test('public methods', function() {
   var publicMethods = ["log"];
   for (var i = 0; i < publicMethods.length; i++ ){
     equal(typeof Pilotfish[publicMethods[i]], "function", "typeof Pilotfish." + publicMethods[i]);
   }
});


module('Util');
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

test('Settings', function(){
    deepEqual(Pilotfish('setting'), "", "no key");
    deepEqual(Pilotfish('setting', 'account', '1234'), "1234", "set account");
    deepEqual(Pilotfish('setting', 'account'), "1234", "get account");
    deepEqual(Pilotfish('setting', 'account', ''), "", "set cleared");
    deepEqual(Pilotfish('setting', 'account'), "", "get cleared");
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


module('Plugins');
test('Simple plugin', function() {
  Pilotfish.register('upper', function(arg) {
    return arg.toUpperCase();
  });
  equal(Pilotfish('upper', 'test'), "TEST", "upper plugin");
});

