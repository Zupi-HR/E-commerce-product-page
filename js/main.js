import { initMenu } from "./modules/menu.js";
import { initCart } from "./modules/cart.js";
import { initGallery, setCurrentIndex } from "./modules/gallery.js";

const imageGallery = document.querySelector(".image-gallery");
const lightboxGallery = document.querySelector(".lightbox-modal");

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

initCart();
