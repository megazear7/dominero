const expect = require('chai').expect;
const jsdom = require('jsdom');
const dominero = require('./../.node-index.js').default;
const { JSDOM } = jsdom;

describe('simple text dominero container', function () {
  const dom = new JSDOM(`
    <div class="container1" data-dominero-text></div>
  `, {
    url: 'http://localhost'
  });

  const container1 = dominero(dom.window.document.querySelector('.container1'), {
    text: 'Hello, World!',
  });

  it('initializes a property', function () {
    expect(dom.window.document.querySelector('.container1').textContent)
    .eql('Hello, World!')
  });
});

describe('one dominero container', function () {
  const dom = new JSDOM(`
    <div class="container">
      <h2 data-dominero-title>Default Title 1</h1>
      <p data-dominero-description>Default Description 1</p>
    </div>
  `, {
    url: 'http://localhost'
  });

  const container = dominero(dom.window.document.querySelector('.container'), {
    title: 'Hello, World!',
    description: 'One way data binding is all a go!'
  });

  container.title = 'I was updated';

  it('initializes a property', function () {
    expect(dom.window.document.querySelector('.container [data-dominero-description]').textContent)
    .eql('One way data binding is all a go!')
  });

  it('updates a property', function () {
    expect(dom.window.document.querySelector('.container [data-dominero-title]').textContent)
    .eql('I was updated')
  });
});

describe('two dominero containers side by side', function () {
  const dom = new JSDOM(`
    <div class="container1">
      <h2 data-dominero-title>Default Title 1</h1>
      <p data-dominero-description>Default Description 1</p>
    </div>

    <div class="container2">
      <h2 data-dominero-title>Default Title 2</h1>
      <p data-dominero-description>Default Description 2</p>
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

  it('initializes a property', function () {
    expect(dom.window.document.querySelector('.container1 [data-dominero-title]').textContent)
    .eql('Hello, World!')
  });

  it('initializes another property', function () {
    expect(dom.window.document.querySelector('.container1 [data-dominero-description]').textContent)
    .eql('Scoped one way data binding is all a go!')
  });

  it('updates a property', function () {
    expect(dom.window.document.querySelector('.container2 [data-dominero-title]').textContent)
    .eql('I was updated')
  });

  it('initializes a property of the same name within a different scope', function () {
    expect(dom.window.document.querySelector('.container2 [data-dominero-description]').textContent)
    .eql('Another scope of one way data binding')
  });
});

describe('connect one dominero object to multiple dom containers', function () {
  const dom = new JSDOM(`
    <div class="container1">
      <p data-dominero-title>Default Title 1</p>
      <p data-dominero-description>Default Description 1</p>
    </div>
    <div class="container2">
      <p data-dominero-title>Default Title 2</p>
      <p data-dominero-description>Default Description 2</p>
    </div>
  `, {
    url: 'http://localhost'
  });

  const data = {
    title: 'Hello, World!',
    description: 'The description.'
  };

  const container = dominero([
      dom.window.document.querySelector('.container1'),
      dom.window.document.querySelector('.container2')]
  , data);

  container.description = "I was updated";

  it('initializes a property', function () {
    expect(dom.window.document.querySelector('.container1 [data-dominero-title]').textContent)
    .eql('Hello, World!')

    expect(dom.window.document.querySelector('.container2 [data-dominero-title]').textContent)
    .eql('Hello, World!')
  });

  it('updates a property', function () {
    expect(dom.window.document.querySelector('.container1 [data-dominero-description]').textContent)
    .eql('I was updated')

    expect(dom.window.document.querySelector('.container1 [data-dominero-description]').textContent)
    .eql('I was updated')
  });
});

describe('nested containers', function () {
  const dom = new JSDOM(`
    <div class="outer">
      <div class="inner">
        <p data-dominero-title="% inner" class="inner-title">Default Title 2</p>
        <p data-dominero-description="% inner" class="inner-description">Default Description 2</p>
      </div>
      <p data-dominero-title="% outer" class="outer-title">Default Title 1</p>
      <p data-dominero-description="% outer" class="outer-description">Default Description 1</p>
    </div>
  `, {
    url: 'http://localhost'
  });

  const outer = dominero(dom.window.document.querySelector('.outer'), {
    title: 'Outer title initial',
    description: 'Outer description initial'
  }, { name: "outer" });

  const inner = dominero(dom.window.document.querySelector('.inner'), {
    title: 'Inner title initial',
    description: 'Inner description initial'
  }, { name: "inner" });

  outer.title = 'Outer title updated';
  inner.description = 'Inner description updated';

  it('initializes an outer property', function () {
    expect(dom.window.document.querySelector('.outer-description').textContent)
    .eql('Outer description initial')
  });

  it('initializes an inner property', function () {
    expect(dom.window.document.querySelector('.inner-title').textContent)
    .eql('Inner title initial')
  });

  it('updates an outer property', function () {
    expect(dom.window.document.querySelector('.outer-title').textContent)
    .eql('Outer title updated')
  });

  it('updates an inner property', function () {
    expect(dom.window.document.querySelector('.inner-description').textContent)
    .eql('Inner description updated')
  });
});

describe('setting a attribute with dominero', function () {
  const dom = new JSDOM(`
    <a class="no-update" data-dominero-title data-dominero-url="-> href"></a>
    <a class="update" data-dominero-title data-dominero-url="-> href"></a>
  `, {
    url: 'http://localhost'
  });

  const link1 = dominero(dom.window.document.querySelector('.no-update'), {
    title: 'Google',
    url: 'https://www.google.com/'
  });

  const link2 = dominero(dom.window.document.querySelector('.update'), {
    title: 'Google',
    url: 'https://www.google.com/'
  });

  link2.title = 'Updated link title';
  link2.url = 'https://www.facebook.com/';

  it('initializes the text content', function () {
    expect(dom.window.document.querySelector('.no-update').textContent)
    .eql('Google')
  });

  it('initializes the href attribute', function () {
    expect(dom.window.document.querySelector('.no-update').href)
    .eql('https://www.google.com/')
  });

  it('updates the text content', function () {
    expect(dom.window.document.querySelector('.update').textContent)
    .eql('Updated link title')
  });

  it('updates the href attribute', function () {
    expect(dom.window.document.querySelector('.update').href)
    .eql('https://www.facebook.com/')
  });
});

describe('setting a named attribute with dominero', function () {
  const dom = new JSDOM(`
    <a data-dominero-title data-dominero-url="-> href % link"></a>
  `, {
    url: 'http://localhost'
  }, { name: "link" });

  const link = dominero(dom.window.document.querySelector('a'), {
    url: 'https://www.google.com/'
  });

  link.url = 'https://www.facebook.com/';

  it('updates the href attribute', function () {
    expect(dom.window.document.querySelector('a').href)
    .eql('https://www.facebook.com/')
  });
});
