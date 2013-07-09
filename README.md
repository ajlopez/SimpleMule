# SimpleMule

Simple Mule-like implementation for Node.js

## Installation

Via npm on Node:

```
npm install simplemule
```

## Usage

Reference in your program:

```javascript
var sm = require('simplemule');
```

You can define components and connect them. A component needs a function that receives a `context` and a `message`.
```javascript
var component = sm.createComponent(function (context, message) {
    console.log(message);
});
```

You can send a message to a component:
```javascript
component.send("Hello, world");
```
It is processed immediatly.

You can post a message to a component:
```javascript
component.post("Hello, world");
```
It is processed after attending any pending callbacks in Node.js. Internally, it use `setImmediate`.

But in general, you don't send message directly to a component. Usually, you connect them:
```javascript
var hello = sm.createComponent(function (context, message) {
    context.send('next', "Hello, " + message);
    // context.post('next', "Hello, " + message);
});

hello.connect('next', component);
hello.send("world");
// hello.post("world");
```
`context.send` or `context.post` first parameter is the name of the channel, and the second parameter is the message.
`component.connect` first parameter is the name of the output channel, and the second parameter is the component
that listen on that channel.

You can use the default channel, ommitting the name:
```javascript
var hello = sm.createComponent(function (context, message) {
    context.send("Hello, " + message);
    // context.post("Hello, " + message);
});

hello.connect(component);
hello.send("world");
// hello.post("world");
```

You can connect more than one component to the same output channel:
```javascript
component.connect('next', component1);
component.connect('next', component2);
```
or to the default channel:
```javascript
component.connect(component1);
component.connect(component2);
```

Usually, after building the topology of components, you start the play sending one or more message to one or more
starter components:
```javascript
starter.send(null);
queuereader.send('queuename');
listener.send(options);
```

## Development

```
git clone git://github.com/ajlopez/SimpleMule.git
cd SimpleMule
npm install
npm test
```

## Samples

TBD

## Versions

- 0.0.1: Published

## Inception

Years ago (+- 8 years) I gave a talk about ESB (Enterprise Service Bus) demoing Mule:

- https://github.com/mulesoft/mule
- http://www.mulesoft.org/what-mule-esb

That old version was a simple console application, with an ugly XML configuration file. Now, it has lot of
functionality (check the above links). I think it is time to write a simple version for Node.js. Instead of 
Mule connectors, this version has components: arbitrary functions that receive and send/post message to other
components.

Related projects:

- [SimpleStorm](https://github.com/ajlopez/SimpleStorm)
- [SimpleBus](https://github.com/ajlopez/SimpleBus)

## Contribution

Feel free to [file issues](https://github.com/ajlopez/SimpleMule) and submit
[pull requests](https://github.com/ajlopez/SimpleMule/pulls) — contributions are
welcome.

If you submit a pull request, please be sure to add or update corresponding
test cases, and ensure that `npm test` continues to pass.

