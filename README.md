# SimpleMule

Simple Mule-like implementation for Node.js

## Installation

Via npm on Node:

```
npm install simplemule
```

## Usage

TBD

## Development

```
git clone git://github.com/ajlopez/SimpleMule.git
cd SimpleMule
npm install
npm test
```

## Samples

TBD

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

