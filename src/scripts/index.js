import 'regenerator-runtime'; /* for async await transpile */
import '../styles/style.scss';
import '../styles/responsive.scss';
import App from './views/app';
import swRegister from './utils/sw-register';

const app = new App({
  button: document.querySelector('#menu-btn'),
  drawer: document.querySelector('.navbar'),
  content: document.querySelector('#konten-utama'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});
