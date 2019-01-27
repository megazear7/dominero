const createRenderer = (element, state) => property => {
  element.querySelector(`[data-dominero="${property}"]`).innerHTML = state[property];
};

const createState = (state, renderers) => {
  let dominite = new Proxy(state, {
    set(target, property, value) {
      target[property] = value;
      renderers.forEach(render => render(property));
      return true;
    }
  });

  Object.keys(state).forEach(key => renderers.forEach(render => render(key)));

  return dominite;
};

export default (elements, state) => {
  if (Array.isArray(elements)) {
    return createState(state, elements.map(element => createRenderer(element, state)));
  } else if (elements.constructor.name === "NodeList") {
    return createState(state, [...elements].map(element => createRenderer(element, state)));
  } else {
    return createState(state, [createRenderer(elements, state)]);
  }
};
