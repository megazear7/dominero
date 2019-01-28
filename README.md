# Dominero

Simple bare bones scoped one way data binding.

https://dominero.alexlockhart.me

1. Expressive - everything that Dominero does is visible in the markup
1. Scoped to the provided elements
1. Nesting of multiple root elements
1. Named data bound attributes so the same object property name can update different element attributes.

## Installation

`npm install dominero`

## Usage

https://codepen.io/megazear7/pen/WPxojQ

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

Currently the full list of available features is documented in the test cases.

## Distribution

For ES5 use the "dist/index-es5.js" file.
Otherwise use the ES6 module located in the "dist/index.js" file.

## Testing

`npm test`

## Build new release

1. Update version in package.json
1. Ensure the `npm test` test cases are all passing
1. `npm run build`
1. `git commit` the updated version number.
1. `npm publish`
