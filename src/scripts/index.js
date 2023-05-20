import 'regenerator-runtime'; /* for async await transpile */
import '../styles/style.scss';
import '../styles/responsive.scss';
import './utils/header-footer-cstom';
import App from './views/app';
import swRegister from './utils/sw-register';

const app = new App({
  button: document.querySelector('#menu-btn'),
  drawer: document.querySelector('.navbar'),
  content: document.querySelector('#konten-utama'),
});

function setSkipLinkHref() {
  const skipLink = document.querySelector('.skip-link');
  const currentPage = window.location.hash;

  if (currentPage === '#/home') {
    skipLink.href = '#resto';
  } else if (currentPage === '#/favorite') {
    skipLink.href = '#resto-favorite';
  } else {
    skipLink.href = '#resto';
  }
}

window.addEventListener('hashchange', () => {
  setSkipLinkHref();
  app.renderPage();
});

window.addEventListener('load', () => {
  setSkipLinkHref();
  app.renderPage();
  swRegister();
});
