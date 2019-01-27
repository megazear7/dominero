const expect = require('chai').expect;
const jsdom = require('jsdom');
const dominero = require('./../.node-index.js').default;
const { JSDOM } = jsdom;

describe('two dominero containers side by side', function () {
  const dom = new JSDOM(`
    <div class="container1">
      <h1 data-dominero="title">Default Title 1</h1>
      <p data-dominero="description">Default Description 1</p>
    </div>

    <div class="container2">
      <h1 data-dominero="title">Default Title 2</h1>
      <p data-dominero="description">Default Description 2</p>
    </div>
  `, {
    url: 'http://localhost'
  });

  const container1 = dominero(dom.window.document.querySelector('.container1'), {
    title: 'Hello, World!',
    description: 'Scoped one way data binding is all a go!'
  });

  const container2 = dominero(dom.window.document.querySelector('.container2'), {
    description: 'Another scope of one way data binding'
  });

  container2.title = 'I was updated';

  it('initialized a property', function () {
    expect(dom.window.document.querySelector('.container1 [data-dominero="title"]').textContent)
    .eql('Hello, World!')
  });

  it('initializes another property', function () {
    expect(dom.window.document.querySelector('.container1 [data-dominero="description"]').textContent)
    .eql('Scoped one way data binding is all a go!')
  });

  it('updates a property', function () {
    expect(dom.window.document.querySelector('.container2 [data-dominero="title"]').textContent)
    .eql('I was updated')
  });

  it('initializes a property of the same name within a different scope', function () {
    expect(dom.window.document.querySelector('.container2 [data-dominero="description"]').textContent)
    .eql('Another scope of one way data binding')
  });
});
