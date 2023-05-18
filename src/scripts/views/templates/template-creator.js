import CONFIG from '../../globals/config';

const createRestoDetailTemplate = (resto) => `
     <div class="box">
  <div class="image">
    <img src="${resto.pictureId ? CONFIG.BASE_IMAGE_URL_MEDIUM + resto.pictureId : 'https://picsum.photos/id/666/800/450?grayscale'}" class="thumb-res" alt="${resto.name}">
  </div>
  <div class="content">
    <h3 class="title-res">${resto.name}</h3>
    <div class="icons">
      <div class="icon">
        <i class="fas fa-map-marker-alt"></i>
        <span class="loc-res">${resto.city}</span>
      </div>
    </div>
    <div class="stars">
      <i class="fas fa-star"></i>
      <span class="rate-res">${resto.rating}</span>
    </div>
    <p class="desc-res">${resto.description}</p>
  </div>
</div>
    `;

const createRestoItemTemplate = (resto) => `
    <div class="box" >
      <div class="image">
            <img src="${resto.pictureId ? CONFIG.BASE_IMAGE_URL_MEDIUM + resto.pictureId : 'https://picsum.photos/id/666/800/450?grayscale'}" class="thumb-res" alt="${resto.name}">
          </div>
          <div class="content">
            <h3 class="title-res">${resto.name}</h3>
            <div class="icons">
              <div class="icon"> <i class="fas fa-map-marker-alt"></i> <span class="loc-res">${resto.city}</span>
              </div>
            </div>
            <div class="stars">
              <i class="fas fa-star"></i>
              <span class="rate-res">${resto.rating}</span>
            </div>
            <p class="desc-res">${resto.description}</p>
            <a class="btnd" href="#/detail/${resto.id}" tabindex="0" aria-label="Tombol details" title="Detail">
  <i class="fas fa-eye"></i>
  <span>Details</span>
</a>
        </div>
         </div>
    `;
const createLikeButtonTemplate = () => `
  <button aria-label="like this restauran" id="likeButton" class="like-button" >
    <i class="fas fa-heart" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this restauran" id="likeButton" class="like-button-un" >
    <i class="fas fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestoItemTemplate,
  createRestoDetailTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
};
