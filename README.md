# Dominero

Simple bare bones scoped one way data binding.

## Installation

`npm install dominero`

## Usage

https://jsfiddle.net/megazear7/oug4a8p2/11/

```html
<div class="container1">
  <h1 data-dominero-title>Default Title 1</h1>
  <p data-dominero-description>Default Description 1</p>
</div>

<div class="container2">
  <h1 data-dominero-title>Default Title 2</h1>
  <p data-dominero-description>Default Description 2</p>
</div>
```

```js
import dominero from 'dominero';

const container1 = dominero(document.querySelector('.container1'), {
  title: "Hello, World!",
  description: "Scoped one way data binding is all a go!"
});

const container2 = dominero(document.querySelector('.container2'), {
  description: "Another scope of one way data binding"
});

container2.title = "I was updated";
```

## Testing

`npm test`

## TODO

Add unit tests for the following scenarios and make code updates as needed.

1. Property data binding. `data-dominero-href="url"`. Then the `href` property would get updates with the `url` property of the given object.

After these features are added we should spin up a website that introduces it and explains how to use it. Here are the key features:

1. One way data binding.
2. Expressive. Everything dominero does is expressed in data attributes in the dom. No magic happens behind the scenes.
3. Scoping to a specific element.
4. Nesting of data bound elements.
