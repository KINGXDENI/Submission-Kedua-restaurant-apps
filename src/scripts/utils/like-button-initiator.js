import Swal from 'sweetalert2';
import FavoriteRestoIdb from '../data/favorite-resto-idb';
import {
  createLikeButtonTemplate,
  createLikedButtonTemplate,
} from '../views/templates/template-creator';

const LikeButtonInitiator = {
  async init({ likeButtonContainer, resto }) {
    this._likeButtonContainer = likeButtonContainer;
    this._resto = resto;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._resto;

    if (await this._isRestoExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isRestoExist(id) {
    const resto = await FavoriteRestoIdb.getResto(id);
    return !!resto;
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = createLikeButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteRestoIdb.putResto(this._resto);
      this._renderButton();
      Swal.fire({
        icon: 'success',
        title: 'Resto berhasil ditambahkan ke favorit',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          container: 'my-swal-container',
          popup: 'my-swal-popup',
          title: 'my-swal-title',
        },
      });
    });
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = createLikedButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      Swal.fire({
        icon: 'warning',
        title: 'Apakah Anda yakin ingin menghapus resto dari favorit?',
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak',
        customClass: {
          container: 'my-swal-container',
          popup: 'my-swal-popup',
          title: 'my-swal-title',
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          await FavoriteRestoIdb.deleteResto(this._resto.id);
          this._renderButton();
          Swal.fire({
            icon: 'success',
            title: 'Resto berhasil dihapus dari favorit',
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
    });
  },
};

export default LikeButtonInitiator;
