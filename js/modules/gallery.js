const mainImg = document.querySelector(".main-image img");
const prevImgBtn = document.querySelector(".main-image__btn--prev");
const nextImgBtn = document.querySelector(".main-image__btn--next");
const thumbnailsContainer = document.querySelector(".images");
let currentIndex = 0;

export function initGallery() {
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
    let newIndex = Array.from(
      thumbnailsContainer.querySelectorAll("button"),
    ).indexOf(clickedThumbnail);
    currentIndex = newIndex;
    updateGalleryView(currentIndex);
  }

  function updateMainImage(imgSrc) {
    mainImg.src = imgSrc;
  }

  function updateGalleryView(index) {
    if (index < 0) index = 3;

    if (index > 3) index = 0;

    thumbnailsContainer
      .querySelector("[aria-current]")
      ?.removeAttribute("aria-current");

    const activeThumbnail = Array.from(
      thumbnailsContainer.querySelectorAll("button"),
    ).at(index);

    activeThumbnail.setAttribute("aria-current", "true");
    updateMainImage(activeThumbnail.dataset.image);
    currentIndex = index;
  }
}
