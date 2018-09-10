function getStoreValue(key, store) {
  const steps = key.split('.');

  let scope = store;
  for (let i = 0; i < steps.length; ++i) {
    scope = scope[steps[i]]

    if (!scope) {
      return null;
    }
  }

  return scope;
}

function prepareString(content, store) {
  return content
    .split(/\{{2}([\w\.]*)\}{2}/mg)
    .map((el, index) => {
      if (index % 2 === 0) {
        return el;
      }

      const value = getStoreValue(el, store);

      if (value === null) {
        return `{{${el}}}`
      }

      return value.toString();
    })
    .join('');
}

export function renderTemplate(container, store) {
  for (let { nodeName: attributeName } of container.attributes){
    const value = container.getAttribute(attributeName);

    container.setAttribute(attributeName, prepareString(value, store))
  }

  container.textContent = prepareString(container.textContent, store);
}
