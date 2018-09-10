import { renderTemplate } from './templater.js';

const STORE_NAME = 'data/main.json';

function getTemplateContainers(root) {
  return Array.from(root.querySelectorAll('[data-template]'));
}

async function loadData(store) {
  const response = await fetch(store, { cache: 'no-cache' })

  if (!response.ok) {
    throw response.error();
  }

  return response.json();
}

async function init() {
  const root = document.documentElement;
  const containers = getTemplateContainers(root)

  try {
    const store = await loadData(STORE_NAME);

    containers.forEach(container => renderTemplate(container, store));
  } catch (error) {
    alert('Не удалось загрузить презентацию');

    console.error(error);
  } finally {
    console.log('Презентация загружена')
  }
}

window.addEventListener('load', init)
