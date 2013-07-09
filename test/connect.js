
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

exports['Connect two components using post'] = function (test) {
    test.expect(3);
    
    var increment = sm.createComponent(function (context, message) {
        context.post('next', message + 1);
    });
    
    var component = sm.createComponent(function (context, message) {
        test.ok(context);
        test.ok(message);
        test.equal(message, 2);
        test.done();
    });
    
    increment.connect('next', component);
    
    increment.post(1);
}

exports['Connect one component to two components'] = function (test) {
    var increment = sm.createComponent(function (context, message) {
        context.send('next', message + 1);
    });
    
    var ntimes = 0;
    
    var component1 = sm.createComponent(function (context, message) {
        test.ok(context);
        test.ok(message);
        test.equal(message, 2);
        ntimes++;
        
        if (ntimes == 2)
            test.done();
    });
    
    var component2 = sm.createComponent(function (context, message) {
        test.ok(context);
        test.ok(message);
        test.equal(message, 2);
        ntimes++;
        
        if (ntimes == 2)
            test.done();
    });
    
    increment.connect('next', component1);
    increment.connect('next', component2);
    
    increment.send(1);
}

exports['Connect one component to two components using post'] = function (test) {
    test.expect(6);

    var increment = sm.createComponent(function (context, message) {
        context.post('next', message + 1);
    });
    
    var ntimes = 0;
    
    var component1 = sm.createComponent(function (context, message) {
        test.ok(context);
        test.ok(message);
        test.equal(message, 2);
        ntimes++;
        
        if (ntimes == 2)
            test.done();
    });
    
    var component2 = sm.createComponent(function (context, message) {
        test.ok(context);
        test.ok(message);
        test.equal(message, 2);
        ntimes++;
        
        if (ntimes == 2)
            test.done();
    });
    
    increment.connect('next', component1);
    increment.connect('next', component2);
    
    increment.post(1);
}


