const prevImgBtn = document.querySelector(".main-image__btn--prev");
const nextImgBtn = document.querySelector(".main-image__btn--next");

let currentIndex = 0;

export function initGallery() {
  prevImgBtn.addEventListener("click", () => {
    currentIndex--;
  });

  nextImgBtn.addEventListener("click", () => {
    currentIndex++;
    updateGalleryView(currentIndex);
  });

  thumbnailsContainer.addEventListener("click", updateActiveThumbnail);

  function updateActiveThumbnail(event) {
    const clickedThumbnail = event.target.closest("button");
    if (!clickedThumbnail) return;
    const newIndex = Array.from(thumbnails).indexOf(clickedThumbnail);
    updateGalleryView(newIndex);
  }

  function updateMainImage(imgSrc) {
    mainImg.src = imgSrc;
  }

  function updateGalleryView(index) {
    if (index < 0) index = thumbnails.length - 1;

    if (index >= thumbnails.length) index = 0;

    thumbnailsContainer
      .querySelector("[aria-current]")
      ?.removeAttribute("aria-current");

    const activeThumbnail = Array.from(thumbnails).at(index);

    activeThumbnail.setAttribute("aria-current", "true");
    updateMainImage(activeThumbnail.dataset.image);
    currentIndex = index;
  }
}
