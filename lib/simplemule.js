function Component(fn) {    this.send = function (message) {        fn({ }, message);    };}
function createComponent(fn)
{    return new Component(fn);
}

module.exports = {
    createComponent: createComponent
}

