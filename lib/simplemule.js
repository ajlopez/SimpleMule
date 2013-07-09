function Component(fn) {    var channels = { };        var context = {        send: function (name, message) {            channels[name].send(message);        },                post: function (name, message) {            channels[name].post(message);        }    };        this.send = function (message) {        fn(context, message);    };        this.post = function (message) {        var self = this;        setImmediate(function () { self.send(message); });    };        this.connect = function (channel, component) {        channels[channel] = component;    };}
function createComponent(fn)
{    return new Component(fn);
}

module.exports = {
    createComponent: createComponent
}

