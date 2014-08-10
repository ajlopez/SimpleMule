
var sm = require('..');

exports['create flow'] = function (test) {
    var flow = sm.flow();
    
    test.ok(flow);
    test.equal(typeof flow, 'object');
    test.equal(flow.isAsync(), false);
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

exports['async transform and send with callback'] = function (test) {
    test.async();
    
    var flow = sm.flow().transform(function (payload, cb) {
        cb(null, payload + 1);
    });
    
    test.ok(flow.isAsync());

    flow.send(1, function (err, result) {
        test.ok(!err);
        test.ok(result);
        test.equal(result, 2);
        test.done();
    });
}
exports['async transform and post'] = function (test) {
    test.async();
    
    var flow = sm.flow().transform(function (payload, cb) {
        cb(null, payload + 1);
    }).output(function (payload) {
        test.ok(payload);
        test.equal(payload, 2);
        test.done();
    });
    
    test.ok(flow.isAsync());

    flow.post(1);
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

exports['input with two payloads and start'] = function (test) {
    test.async();
    var firsttime = true;
    
    var flow = sm.flow();
    
    flow.input(function (flow) { flow.post(1); flow.post(2); })
        .transform(function (payload) { return payload + 2; })
        .output(function (payload) { 
            test.ok(payload);
            
            if (firsttime) {
                test.equal(payload, 3);
                firsttime = false;
                return;
            }
            
            test.equal(payload, 4);
            test.done();
        });
        
    flow.start();
}

exports['two inputs and start'] = function (test) {
    test.async();
    var firsttime = true;
    
    var flow = sm.flow();
    
    flow.input(function (flow) { flow.post(1); })
        .input(function (flow) { flow.post(2); })
        .transform(function (payload) { return payload + 2; })
        .output(function (payload) { 
            test.ok(payload);
            
            if (firsttime) {
                test.equal(payload, 3);
                firsttime = false;
                return;
            }
            
            test.equal(payload, 4);
            test.done();
        });
        
    flow.start();
}

exports['empty branch'] = function (test) {
    var flow = sm.flow();

    flow.branch("branch")
        .end();
        
    test.equal(flow.send(1), 1);
    test.done();
}

exports['branch with one step'] = function (test) {
    var flow = sm.flow();

    flow.route(function () { return "branch"; })
        .branch("branch")
        .transform(function (payload) { return payload + 1; })
        .end();
        
    test.equal(flow.send(1), 2);
    test.done();
}

exports['route and branches'] = function (test) {
    var flow = sm.flow();

    flow.route(function (payload) { if (payload % 2) return "odd"; return "even"; })
        .branch("odd")
        .transform(function (payload) { return payload * 2; })
        .end()
        .branch("even")
        .transform(function (payload) { return payload + 1; })
        .end();
        
    test.equal(flow.send(3), 6);
    test.equal(flow.send(2), 3);
    test.done();
}

exports['route and async branches'] = function (test) {
    test.async();
    
    var flow = sm.flow();

    flow.route(function (payload) { if (payload % 2) return "odd"; return "even"; })
        .branch("odd")
        .transform(function (payload, cb) { cb(null, payload * 2); })
        .end()
        .branch("even")
        .transform(function (payload, cb) { cb(null, payload + 1); })
        .end();
    
    flow.send(3, function (err, value) {
        test.ok(!err);
        test.ok(value);
        test.equal(value, 6);
        
        flow.send(2, function (err, value) {
            test.ok(!err);
            test.ok(value);
            test.equal(value, 3);
            test.done();
        });
    });
}
