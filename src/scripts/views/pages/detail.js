import UrlParser from '../../routes/url-parser';
import RestauranSource from '../../data/restaurant-source';
import {
  createRestoDetailTemplate, createLikeButtonTemplate, createReviewTemplate,
} from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';

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
  },
};

export default Detail;
