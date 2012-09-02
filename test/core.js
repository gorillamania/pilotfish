/* Tests for the underlying framework */

// Browser compatibility
module('browser compatibility assertions');
test('document.querySelector and document.querySelectorAll are there', function() {
    equal(typeof document.querySelectorAll, "function", "typeof document.querySelectorAll");
    equal(typeof document.querySelector, "function", "typeof document.querySelector");
});

test('JSON is supported', function() {
    equal(typeof JSON, "object", "typeof JSON");
});

test('Pilotfish is an object', function() {
    equal(typeof Pilotfish, "object", "typeof Pilotfish");
});

test('Page attributes working', function() {
    deepEqual(Pilotfish.pageAttr(), "", "no key");
    deepEqual(Pilotfish.pageAttr(""), "", "empty string key");
    deepEqual(Pilotfish.pageAttr("non existant"), "", "non existant key");

    equal(Pilotfish.pageAttr("foo", "bar"), "bar", "set should return the value");
    equal(Pilotfish.pageAttr("foo"), "bar", "get foo");

    Pilotfish.pageAttr("foo", true);
    equal(Pilotfish.pageAttr("foo"), "true", "foo boolean true converted to string 'true'");

    Pilotfish.pageAttr("foo", false);
    equal(Pilotfish.pageAttr("foo"), "", "foo boolean false converted to empty string");

    Pilotfish.pageAttr("foo", null);
    equal(Pilotfish.pageAttr("foo"), "", "null converted to empty string");

    Pilotfish.pageAttr("foo", 0);
    equal(Pilotfish.pageAttr("foo"), "0", "integer 0 convertd to string 0");

    // Clear it
    deepEqual(Pilotfish.pageAttr("foo", ""), "", "set to empty string should return empty string");
    equal(Pilotfish.pageAttr("foo"), "", "empty string after clear");
});
