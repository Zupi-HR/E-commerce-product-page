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

window.addEventListener("quantity:updated", (e) => {
  productQuantityInput.value = e.detail;
});

productQuantityInput.addEventListener("input", (e) => {
  if (e.target.value === "") {
    return;
  }
  updateQuantity(Number(e.target.value));
});

productQuantityInput.addEventListener("blur", (e) => {
  const rawValue = e.target.value;
  if (rawValue === "") {
    e.target.value = getSelectedQuantity();
    return;
  }
  const value = Number(rawValue);

  if (!Number.isInteger(value) || value < 0) {
    e.target.value = getSelectedQuantity();
  }
});

decrementBtn.addEventListener("click", () => {
  adjustQuantity(-1);
});

incrementBtn.addEventListener("click", () => {
  adjustQuantity(1);
});

function handleImageChangeRequest(selectionIntent) {
  const newIndex = setCurrentIndex(selectionIntent);
  renderMainGallery(newIndex);
  renderLightboxGallery(newIndex);
}

function adjustQuantity(delta) {
  const requestedQuantity = getSelectedQuantity() + delta;
  updateQuantity(requestedQuantity);
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
