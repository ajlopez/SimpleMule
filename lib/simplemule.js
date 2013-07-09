function Component(fn) {    this.send = function (message) {        fn({ }, message);    };        this.post = function (message) {        var self = this;        setImmediate(function () { self.send(message); });    };}
function createComponent(fn)
{    return new Component(fn);
}

module.exports = {
    createComponent: createComponent
}

