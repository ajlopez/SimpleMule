
var sm = require('..');

exports['Connect two components'] = function (test) {
    var increment = sm.createComponent(function (context, message) {
        context.send('next', message + 1);
    });
    
    var component = sm.createComponent(function (context, message) {
        test.ok(context);
        test.ok(message);
        test.equal(message, 2);
        test.done();
    });
    
    increment.connect('next', component);
    
    increment.send(1);
}