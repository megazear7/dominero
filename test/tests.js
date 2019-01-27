const expect = require('chai').expect;
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

describe('mocha tests', function () {
  const dom = new JSDOM(``, {
    url: "http://localhost"
  });

  it('has document', function () {
    var div = dom.window.document.createElement('div')
    expect(div.nodeName).eql('DIV')
  });
});
