const createRenderer = (element, state) => property => {
  element.querySelector(`[data-dominero="${property}"]`).innerHTML = state[property];
};

const createState = (state, render) => {
  let dominite = new Proxy(state, {
    set(target, property, value) {
      console.log(property);
      target[property] = value;
      render(property);
      return true;
    }
  });

  Object.keys(state).forEach(key => render(key));

  return dominite;
};

export default (element, state) => {
  return createState(state, createRenderer(element, state));
};
