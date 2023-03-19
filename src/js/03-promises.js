import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const formEl = document.querySelector('.form');

function isValidFields({ delay, step, amount }) {
  if (delay < 0 || step < 0 || amount < 1) {
    return true;
  }

  return false;
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) =>
    setTimeout(() => shouldResolve
      ? resolve({ position, delay })
      : reject({ position, delay }),
      delay)
  );
}

function generatorPromises({ delay, step, amount }) {
  for (let index = 0; index < amount; index++) {
    createPromise(index + 1, delay + step * index)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function onSubmit(e, formEl) {
  const formData = new FormData(formEl);
  const configPromises = {};

  e.preventDefault();
  for (const pair of formData.entries()) {
    configPromises[pair[0]] = parseInt(pair[1]);
  }

  if (isValidFields(configPromises)) {
    Notiflix.Notify.failure('Please enter correct data');
    return;
  }

  generatorPromises(configPromises);
}

formEl.addEventListener('submit', (e) => onSubmit(e, formEl));