let currentIndex = 0;

export function initGallery(root) {
  function setCurrentIndex(newIndex) {
    if (newIndex < 0) newIndex = thumbnails.length - 1;

    if (newIndex >= thumbnails.length) newIndex = 0;
    currentIndex = newIndex;
    updateGalleryView(currentIndex);
  }

  const mainImg = root.querySelector(".main-image img");
  const prevImgBtn = root.querySelector(".main-image__btn--prev");
  const nextImgBtn = root.querySelector(".main-image__btn--next");
  const thumbnailsContainer = root.querySelector(".images");
  const thumbnails = thumbnailsContainer.querySelectorAll("button");

  setCurrentIndex(currentIndex);

  prevImgBtn.addEventListener("click", () => {
    setCurrentIndex(currentIndex - 1);
  });

  nextImgBtn.addEventListener("click", () => {
    setCurrentIndex(currentIndex + 1);
  });

  thumbnailsContainer.addEventListener("click", updateActiveThumbnail);

  function updateActiveThumbnail(event) {
    const clickedThumbnail = event.target.closest("button");
    if (!clickedThumbnail) return;
    const newIndex = Array.from(thumbnails).indexOf(clickedThumbnail);
    setCurrentIndex(newIndex);
  }

  function updateMainImage(imgSrc) {
    mainImg.src = imgSrc;
  }

  function updateGalleryView(index) {
    thumbnailsContainer
      .querySelector("[aria-current]")
      ?.removeAttribute("aria-current");

    const activeThumbnail = Array.from(thumbnails).at(index);

    activeThumbnail.setAttribute("aria-current", "true");
    updateMainImage(activeThumbnail.dataset.image);
  }
}
