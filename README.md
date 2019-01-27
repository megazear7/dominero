# Dominero

Simple bare bones scoped one way data binding.

## Installation

`npm install dominero`

## Usage

https://jsfiddle.net/megazear7/oug4a8p2/6/

```html
<div class="container1">
  <h1 data-dominero="title">Default Title 1</h1>
  <p data-dominero="description">Default Description 1</p>
</div>

<div class="container2">
  <h1 data-dominero="title">Default Title 2</h1>
  <p data-dominero="description">Default Description 2</p>
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

1. Single element
2. Two elements side by side
3. One JSON object connected to multiple elements. What happens right now if I do this?
4. Nested elements - the outer element should not update the inner element. We need to add some `data-dominero-connected` attribute to the connected element so that updates on the outer element can know not to update properties on the inner element. What should the rules be in this scenario?
5. Property data binding. `data-dominero-href="url"`. Then the `href` property would get updates with the `url` property of the given object.
6. Nested properties. `data-dominero="subObject.someProperty"`.

After these features are added we should spin up a website that introduces it and explains how to use it. Here are the key features:

1. One way data binding.
2. Expressive. Everything dominero does is expressed in data attributes in the dom. No magic happens behind the scenes.
3. Scoping to a specific element.
4. Nesting of data bound elements.
