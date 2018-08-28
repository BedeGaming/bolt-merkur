require('babel-register');
const { JSDOM } = require('jsdom');
const lstorage = require('localStorage');
const config = require('../../config/base-settings.json');

if (!global.document || !global.window) {
  const markup = '<html><head><script></script></head><body><drawer><hub></hub><nav></nav></drawer>' +
               '<support-widget></support-widget><dialog></dialog>' +
               '<section></section></body></html>';
  const { window } = new JSDOM(markup, {
    FetchExternalResources: ['script'],
    ProcessExternalResources: ['script'],
    MutationEvents: '2.0',
    QuerySelector: false
  });

  global.document = window.document;
  global.window = window;
  global.navigator = window.navigator;
  global.window.localStorage = lstorage;
  global.window.sessionStorage = lstorage;
  global.XMLHttpRequest = global.window.XMLHttpRequest;
}

const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');
const chai = require('chai');
const dirtyChai = require('dirty-chai');
const sinonChai = require('sinon-chai');
const fs = require('fs');
const chaiAsPromised = require('chai-as-promised');
const Orchestra = require('orchestra');
global.handlebars = require('handlebars');
require('sinon-as-promised');

global.window.config = Object.assign({}, config);

chai.use(dirtyChai);
chai.use(sinonChai);
chai.use(chaiAsPromised);

global.sinon = sinon;
global.expect = chai.expect;
global.proxyquire = proxyquire;

global.Orchestra = Orchestra;
global.Radio = Orchestra.Radio;
global.globalChannel = Radio.channel('global');
global.$ = Orchestra.$;
global.window.jQuery = Orchestra.$;

// ensure templates get compiled
require.extensions['.hbs'] = function (module, filename) {
  /* eslint-disable no-param-reassign */
  module.exports = global.handlebars.compile(fs.readFileSync(filename).toString());
  /* eslint-enable no-param-reassign */
};

beforeEach(function () {
  global.window.config = Object.assign({}, config);
  this.sandbox = sinon.sandbox.create();
  global.stub = this.sandbox.stub.bind(this.sandbox);
  global.spy = this.sandbox.spy.bind(this.sandbox);
  global.server = sinon.fakeServer.create();
  global.server.autoRespond = true;

  this.xhr = sinon.useFakeXMLHttpRequest();
  const requests = this.requests = [];
  this.xhr.onCreate = function (xhr) {
    requests.push(xhr);
  };

  globalChannel.reply({
    currencyLocale() {
      // TODO: Pull from config
      return 'GBP';
    },
    config() {
      return {};
    }
  });
});

afterEach(function () {
  globalChannel.reset();
  this.sandbox.restore();
  this.xhr.restore();
  global.server.restore();
});
