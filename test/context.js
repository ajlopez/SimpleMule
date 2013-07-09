
var sm = require('..');

exports['Context send using default channel'] = function (test) {
    var increment = sm.createComponent(function (context, message) {
        context.send(message + 1);
    });
    
    var component = sm.createComponent(function (context, message) {
        test.ok(context);
        test.ok(message);
        test.equal(message, 2);
        test.done();
    });
    
    increment.connect(component);
    
    increment.send(1);
}

exports['Context post using default channel'] = function (test) {
    test.expect(3);
    
    var increment = sm.createComponent(function (context, message) {
        context.post(message + 1);
    });
    
    var component = sm.createComponent(function (context, message) {
        test.ok(context);
        test.ok(message);
        test.equal(message, 2);
        test.done();
    });
    
    increment.connect(component);
    
    increment.post(1);
}
