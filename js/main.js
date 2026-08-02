import { initMenu } from "./modules/menu.js";
import { initGallery } from "./modules/gallery.js";

const cartBtn = document.querySelector(".header__cart-btn");
const imageGallery = document.querySelector(".image-gallery");
const decrementBtn = document.getElementById("decrease-btn");
const incrementBtn = document.getElementById("increase-btn");
const productQuantityInput = document.querySelector('input[type="number"]');

let selectedQuantity = 0;

function updateQuantity(newValue) {
  if (newValue < 0) {
    newValue = 0;
  }
  selectedQuantity = newValue;
  productQuantityInput.value = selectedQuantity;
}

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

initMenu();
initGallery(imageGallery);
