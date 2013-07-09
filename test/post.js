
var sm = require('..');

exports['Post message'] = function (test) {
    test.expect(4);
    
    var component = sm.createComponent(function (context, message) {
        test.ok(context);
        test.ok(message);
        test.equal(message, 1);
        test.done();
    });
    
    test.ok(component);
    
    component.post(1);
}