### Installation

`npm i dominero`

### Usage

https://jsfiddle.net/megazear7/oug4a8p2/2/

<script async src="//jsfiddle.net/megazear7/oug4a8p2/2/embed/html,result/dark/"></script>

```html
<div class="container1">
  <h1 data-dominero="title">Default Title 1</h1>
  <p data-dominero="description">Default Description 1</p>
</div>

<div class="container2">
  <h1 data-dominero="title">Default Title 2</h1>
  <p data-dominero="description">Default Description 2</p>
</div>

<script type="module">
  import dominero from 'dominero';

  const container1 = dominero(document.querySelector('.container1'), {
    title: "Hello, World!",
    description: "Scoped one way data binding is all a go!"
  });

  const container2 = dominero(document.querySelector('.container2'), {
    description: "Another scope of one way data binding"
  });

  container2.title = "I was updated";
</script>
```
