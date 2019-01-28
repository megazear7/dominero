const createRenderer = (element, state, name) => property => {
  const selector = typeof name === 'undefined'
    ? `[data-dominero-${property}]`
    : `[data-dominero-${property}="% ${name}"]`;

  const matchingElements = element.matches(selector)
    ? [element]
    : [...element.querySelectorAll(selector)];

  matchingElements.forEach(matchingElement => {
    let attributeConfig = matchingElement.getAttribute(`data-dominero-${property}`);

    if (attributeConfig.startsWith('-> ')) {
      let attribute = attributeConfig.includes(' % ')
        ? attributeConfig.substr(3).split(' % ')[0]
        : attributeConfig.substr(3);

      matchingElement.setAttribute(attribute, state[property]);
    } else {
      matchingElement.textContent = state[property]
    }
  });
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

export default (elements, state, options = { }) => {
  if (Array.isArray(elements)) {
    return createState(state, elements.map(element => createRenderer(element, state, options.name)));
  } else if (elements.constructor.name === 'NodeList') {
    return createState(state, [...elements].map(element => createRenderer(element, state, options.name)));
  } else {
    return createState(state, [createRenderer(elements, state, options.name)]);
  }
};
