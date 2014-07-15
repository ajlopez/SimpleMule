
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

