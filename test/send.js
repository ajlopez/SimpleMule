
var sm = require('..');

exports['Send message'] = function (test) {
    var component = sm.createComponent(function (context, message) {
        test.ok(context);
        test.ok(message);
        test.equal(message, 1);
        test.done();
    });
    
    test.ok(component);
    
    component.send(1);
}