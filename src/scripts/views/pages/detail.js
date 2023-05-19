import Swal from 'sweetalert2';
import UrlParser from '../../routes/url-parser';
import RestauranSource from '../../data/restaurant-source';
import {
  createRestoDetailTemplate,
  createLikeButtonTemplate,
  createReviewTemplate,
} from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import API_ENDPOINT from '../../globals/api-endpoint';

const Detail = {
  async render() {
    return `
      <section class="list-resto-detail" id="resto-detail">
        <h1 class="heading"> Detail <span> Restaurant</span> </h1>
        <div class="box-container" id="resto-detail-content">
        </div>
        <div id="likeButtonContainer"></div>
      </section>
      <section class="review" id="review">
        <h1 class="heading"> client's <span>review</span> </h1>
        <div class="swiper review-slider">
          <div class="swiper-wrapper">
          </div>
        </div>
        <div id="review-container">
        <h3>Tambah Review</h3>
        <form id="review-form">
          <input type="text" id="name" placeholder="Your Name" name="name" required>
          <textarea id="review-isi" name="review" placeholder="Type your review" rows="4" required></textarea>
          <button type="submit" class="btn-review">Submit</button>
        </form>
      </div>
      </section>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const resto = await RestauranSource.detailResto(url.id);
    const RestoContainer = document.querySelector('#resto-detail-content');
    const likeButtonContainer = document.querySelector('#likeButtonContainer');
    const ReviewContainer = document.querySelector('.swiper-wrapper');
    RestoContainer.innerHTML = createRestoDetailTemplate(resto);
    likeButtonContainer.innerHTML = createLikeButtonTemplate();
    ReviewContainer.innerHTML = createReviewTemplate(resto);

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      resto: {
        id: resto.id,
        name: resto.name,
        description: resto.description,
        pictureId: resto.pictureId,
        rating: resto.rating,
        city: resto.city,
      },
    });

    const reviewForm = document.getElementById('review-form');
    reviewForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const nameInput = document.getElementById('name');
      const reviewInput = document.getElementById('review-isi');
      const reviewData = {
        id: url.id,
        name: nameInput.value,
        review: reviewInput.value,
      };

      const urll = API_ENDPOINT.REVIEW;
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      };

      try {
        const response = await fetch(urll, options);
        const data = await response.json();
        console.log(data);
        Swal.fire({
          icon: 'success',
          title: 'Review berhasil ditambahkan',
          text: `${data.review}`,
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            container: 'my-swal-container',
            popup: 'my-swal-popup',
            title: 'my-swal-title',
          },
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Review gagal ditambahkan',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            container: 'my-swal-container',
            popup: 'my-swal-popup',
            title: 'my-swal-title',
          },
        });
      }
    });
  },
};

export default Detail;
