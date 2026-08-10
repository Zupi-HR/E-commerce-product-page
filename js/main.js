import { initMenu } from "./modules/menu.js";
import { initGallery, setCurrentIndex } from "./modules/gallery.js";
import { updateQuantity, getSelectedQuantity } from "./store.js";

const cartBtn = document.querySelector(".header__cart-btn");
const imageGallery = document.querySelector(".image-gallery");
const lightboxGallery = document.querySelector(".lightbox-modal");
const decrementBtn = document.getElementById("decrease-btn");
const incrementBtn = document.getElementById("increase-btn");
const productQuantityInput = document.querySelector('input[type="number"]');

cartBtn.addEventListener("click", () => {
  const isExpanded = cartBtn.getAttribute("aria-expanded");

  if (isExpanded === "false") cartBtn.setAttribute("aria-expanded", "true");
  else cartBtn.setAttribute("aria-expanded", "false");
});

productQuantityInput.addEventListener("input", (e) => {
  updateQuantity(Number(e.target.value));
});

decrementBtn.addEventListener("click", () => {
  updateQuantity(selectedQuantity - 1);
});

incrementBtn.addEventListener("click", () => {
  updateQuantity(selectedQuantity + 1);
});

function handleImageChangeRequest(selectionIntent) {
  const newIndex = setCurrentIndex(selectionIntent);
  renderMainGallery(newIndex);
  renderLightboxGallery(newIndex);
}

function handleLightboxOpen() {
  lightboxGallery.showModal();
}

initMenu();
const renderMainGallery = initGallery(
  imageGallery,
  handleImageChangeRequest,
  handleLightboxOpen,
);
const renderLightboxGallery = initGallery(
  lightboxGallery,
  handleImageChangeRequest,
);
