let currentIndex = 0;

export function initGallery(root) {
  const mainImg = root.querySelector(".main-image img");
  const prevImgBtn = root.querySelector(".main-image__btn--prev");
  const nextImgBtn = root.querySelector(".main-image__btn--next");
  const thumbnailsContainer = root.querySelector(".images");
  const thumbnails = thumbnailsContainer.querySelectorAll("button");
  updateGalleryView(currentIndex);

  prevImgBtn.addEventListener("click", () => {
    currentIndex--;
    updateGalleryView(currentIndex);
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
