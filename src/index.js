import './sass/main.scss';
import cocktailslList from './templates/search-cocktails.hbs';
import '@pnotify/core/dist/BrightTheme.css';
import { error, alert, defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';

const refs = {
  form: document.querySelector('#form'),
  input: document.querySelector('.input-form'),
  btn: document.querySelector('.btn'),
  container: document.querySelector('.js-container'),
};

refs.form.addEventListener('submit', handlerSubmit);
refs.btn.addEventListener('click', clearBtn);
refs.input.addEventListener('input', clearBtn);

function handlerSubmit(e) {
  e.preventDefault();
  const value = refs.input.value;

  clearMarkup();
  clear();

  errorCocktail();
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`)
    .then(response => response.json())
    .then(cocktails => markup(cocktails.drinks))
    .catch(err => console.log(err));
}

function clear() {
  refs.input.value = '';
}

function markup(cocktails) {
  refs.container.insertAdjacentHTML('beforeend', cocktailslList(cocktails));
}

function clearMarkup() {
  refs.container.innerHTML = '';
}

function clearBtn() {
  if (refs.input.value === '') {
    refs.btn.setAttribute('disabled', 'disabled');
  }
  if (refs.input.value !== '') {
    refs.btn.removeAttribute('disabled');
  }
  return;
}

function errorCocktail() {
  if ({ drinks: null }) {
    error({
      text: 'Сocktail not found!',
      delay: 2000,
    });
    return;
  }
}
