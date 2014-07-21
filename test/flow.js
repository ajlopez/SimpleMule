
var sm = require('..');

exports['create flow'] = function (test) {
    var flow = sm.flow();
    
    test.ok(flow);
    test.equal(typeof flow, 'object');
    test.done();
}

exports['simple send'] = function (test) {
    var flow = sm.flow();

    test.equal(1, flow.send(1));
    test.done();
}

exports['simple send with callback'] = function (test) {
    test.async();
    
    var flow = sm.flow();

    flow.send(1, function (err, result) {
        test.ok(!err);
        test.ok(result);
        test.equal(result, 1);
        test.done();
    });
}

exports['send to flow with transform'] = function (test) {
    var flow = sm.flow();
    flow.transform(function (payload) { return payload + 1; });

    test.equal(2, flow.send(1));
    test.done();
}

exports['send to flow with process'] = function (test) {
    var flow = sm.flow();
    var total = 0;
    
    flow.process(function (payload) { total += payload; });

    test.equal(0, total);
    test.equal(1, flow.send(1));
    test.equal(1, total);
    test.equal(2, flow.send(2));
    test.equal(3, total);

    test.done();
}

exports['post to flow with transform and output'] = function (test) {
    test.async();
    
    var flow = sm.flow();
    
    flow.transform(function (payload) { return payload + 1; })
        .transform(function (payload) { return payload * 2; })
        .output(function (payload) { 
            test.ok(payload);
            test.equal(payload, 4);
            test.done();
        });
        
    flow.post(1);
}

exports['input and start'] = function (test) {
    test.async();
    
    var flow = sm.flow();
    
    flow.input(function (flow) { flow.post(1); })
        .transform(function (payload) { return payload + 2; })
        .output(function (payload) { 
            test.ok(payload);
            test.equal(payload, 3);
            test.done();
        });
        
    flow.start();
}
