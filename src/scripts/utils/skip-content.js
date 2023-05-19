const currentPage = window.location.hash;

let targetHref;
if (currentPage === '#/home') {
  targetHref = '#resto';
} else if (currentPage === '#/favorite') {
  targetHref = '#resto-favorite';
} else {
  targetHref = '#';
}

const skipLink = document.querySelector('.skip-link');
skipLink.href = targetHref;
