require('babel-polyfill');
const chai = require('chai');
const jsdom = require('jsdom').jsdom;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

// Globals
global.assert = chai.assert;
global.expect = chai.expect;
global.chai = chai;

// DOM setup
global.document = jsdom('');
global.window = document.defaultView;
global.navigator = {
  userAgent: 'node.js',
};

// Emulate DOM
const exposedProperties = ['window', 'navigator', 'document'];
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

// Chai setup
chai.use(sinonChai);
chai.use(require('chai-enzyme')());
