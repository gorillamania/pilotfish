/* Tests for the underlying framework */

// Browser compatibility
module('browser compatibility assertions');
test('document.querySelector and document.querySelectorAll are there', function() {
    equal(typeof document.querySelectorAll, "function");
    equal(typeof document.querySelector, "function");
});

test('JSON is there', function() {
    equal(typeof JSON, "object");
});

//
test('Pilotfish is an object', function() {
    equal(typeof Pilotfish, "object");
});
