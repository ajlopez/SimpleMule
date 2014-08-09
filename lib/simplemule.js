
function Flow(parent) {
    var steps = [];
    var inputs = [];
    var branches = { };
    var async = false;
    
    function processSync(payload) {
        var l = steps.length;
        
        for (var k = 0; k < l; k++) {
            payload = steps[k](payload);
            
            if (payload == null)
                break;
        };
        
        return payload;
    }
    
    function process(payload, cb) {
        var l = steps.length;
        var k = 0;
        
        doStep();
        
        function doStep() {
            if (k >= l) {
                cb(null, payload);
                return;
            }
            
            var step = steps[k++];
            
            if (step.length == 1) {
                payload = step(payload);
                setTimeout(doStep, 0);
                return;
            }
            
            step(payload, function (err, newpayload) {
                if (err) {
                    cb(err, null);
                    return;
                }
                
                payload = newpayload;
                setTimeout(doStep, 0);
            });
        }
    }
    
    this.isAsync = function() { return async; }
    
    this.send = function (payload, cb) {
        if (async) {
            process(payload, cb);
            return;
        }
    
        payload = processSync(payload);
        
        if (cb) {
            cb(null, payload);
            return;
        }
        
        return payload;
    }
    
    this.post = function (payload) {
        processSync(payload);
    }
    
    this.transform = function (fn) {
        steps.push(fn);
        
        if (fn.length > 1)
            async = true;
            
        return this;
    }
    
    this.route = function (fn) {
        steps.push(function (payload) {
            var route = fn(payload);
            var branch = branches[route];
            return branch.send(payload);
        });
        return this;
    }
    
    this.process = function (fn) {
        steps.push(function (payload) {
            fn(payload);
            return payload;
        });
        return this;
    }
    
    this.input = function (fn) {
        inputs.push(fn);
        return this;
    };
    
    this.output = function (fn) {
        steps.push(function (payload) {
            fn(payload);
            return null;
        });
        return this;
    };
    
    this.start = function () {
        for (var k in inputs)
            inputs[k](this);
    };
    
    this.branch = function (name) {
        var branch = new Flow(this);
        branches[name] = branch;
        return branch;
    }
    
    this.end = function () { return parent; }
}

function Component(fn) {
    var channels = { };
    
    var context = {
        send: function (name, message) {
            if (arguments.length == 1) {
                message = name;
                name = 'default';
            }
            
            channels[name].forEach(function (channel) { channel.send(message) });
        },
        
        post: function (name, message) {
            if (arguments.length == 1) {
                message = name;
                name = 'default';
            }
            
            channels[name].forEach(function (channel) { channel.post(message) });
        }
    };
    
    this.send = function (message) {
        fn(context, message);
    };
    
    this.post = function (message) {
        var self = this;
        setImmediate(function () { self.send(message); });
    };
    
    this.connect = function (channel, component) {
        if (arguments.length == 1) {
            component = channel;
            channel = 'default';
        }
        
        if (!channels[channel])
            channels[channel] = [];
            
        channels[channel].push(component);
    };
}

function createComponent(fn)
{
    return new Component(fn);
}


module.exports = {
    createComponent: createComponent,
    flow: function () { return new Flow(); }
}



