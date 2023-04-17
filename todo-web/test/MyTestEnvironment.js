/**
 * jest-environment-jsdom is a wrapper of jsdom package which
 * help to setup DOM API (browser environment)
 * for the test environment of Jest.
 *
 * See more about jsdom: https://github.com/jsdom/jsdom
 */

const { TestEnvironment } = require("jest-environment-jsdom");

class MyTestEnvironment extends TestEnvironment {
  async setup() {
    await super.setup();

    // Even though jsdom supports a lot of browser API,
    // it does not support Fetch API, so we have to
    // set it up manually:
    this.global.fetch = fetch;
    this.global.Request = Request;
    this.global.Response = Response;

    // Define reconfigure() to update the browser URL
    // See more: https://github.com/jsdom/jsdom#reconfiguring-the-jsdom-with-reconfiguresettings
    this.global.reconfigure = (config) => {
      this.dom.reconfigure(config);
    };
  }
}

module.exports = MyTestEnvironment;
