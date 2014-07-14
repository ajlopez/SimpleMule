
var sm = require('..');

exports['Create flow'] = function (test) {
    var flow = sm.flow();
    
    test.ok(flow);
    test.equal(typeof flow, 'object');
    test.done();
}