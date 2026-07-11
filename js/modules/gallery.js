const mainImg = document.querySelector(".main-image img");
const prevImgBtn = document.querySelector(".main-image__btn--prev");
const nextImgBtn = document.querySelector(".main-image__btn--next");
const thumbnailsContainer = document.querySelector(".images");
let currentIndex = 0;

const images = [
  "images/image-product-1.jpg",
  "images/image-product-2.jpg",
  "images/image-product-3.jpg",
  "images/image-product-4.jpg",
];

export function initGallery() {
  prevImgBtn.addEventListener("click", () => {
    currentIndex--;
  });

  nextImgBtn.addEventListener("click", () => {
    currentIndex++;
  });

  thumbnailsContainer.addEventListener("click", updateActiveThumbnail);

  function updateActiveThumbnail(event) {
    const clickedThumbnail = event.target.closest("button");
    if (!clickedThumbnail) return;
    thumbnailsContainer
      .querySelector("[aria-current]")
      ?.removeAttribute("aria-current");

    clickedThumbnail.setAttribute("aria-current", "true");
    updateMainImage(clickedThumbnail.dataset.image);
  }

  function updateMainImage(imgSrc) {
    mainImg.src = imgSrc;
  }

  function updateGalleryView(index) {
    if (index < 0) index = 3;
    mainImg.src = images[index];
  }

  if (currentIndex > 3) currentIndex = 0;
  mainImg.src = images[currentIndex];
}
