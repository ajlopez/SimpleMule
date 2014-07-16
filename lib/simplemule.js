function Flow() {    var steps = [];        this.send = function (payload) {        steps.forEach(function (step) {            payload = step(payload);        });        return payload;    }        this.transform = function (fn) {        steps.push(fn);    }}function Component(fn) {    var channels = { };        var context = {        send: function (name, message) {            if (arguments.length == 1) {                message = name;                name = 'default';            }                        channels[name].forEach(function (channel) { channel.send(message) });        },                post: function (name, message) {            if (arguments.length == 1) {                message = name;                name = 'default';            }                        channels[name].forEach(function (channel) { channel.post(message) });        }    };        this.send = function (message) {        fn(context, message);    };        this.post = function (message) {        var self = this;        setImmediate(function () { self.send(message); });    };        this.connect = function (channel, component) {        if (arguments.length == 1) {            component = channel;            channel = 'default';        }                if (!channels[channel])            channels[channel] = [];                    channels[channel].push(component);    };}
function createComponent(fn)
{    return new Component(fn);
}

module.exports = {
    createComponent: createComponent,    flow: function () { return new Flow(); }
}

