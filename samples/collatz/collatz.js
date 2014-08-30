

var sm = require('../..');

var flow = sm.flow()
    .transform(function (payload) {
        if (!Array.isArray(payload))
            return [payload];
        else
            return payload;
    })
    .route(function (payload) {
        var first = payload[0];
        
        if (first % 2 == 0)
            return "even";
        else
            return "odd";
    })
    .branch("even")
        .transform(function (payload) {
            var first = payload[0];
            var newfirst = first / 2;
            var newpayload = payload.slice();
            newpayload.unshift(newfirst);
            return newpayload;
        })
    .end()
    .branch("odd")
        .transform(function (payload) {
            var first = payload[0];
            var newfirst = first * 3 + 1;
            var newpayload = payload.slice();
            newpayload.unshift(newfirst);
            return newpayload;
        })
    .end()
    .output(function (payload) {
        if (payload[0] == 1)
            console.dir(payload);
        else
            flow.post(payload);
    });

for (var k = 1; k < 10; k++)
    flow.post(k);
