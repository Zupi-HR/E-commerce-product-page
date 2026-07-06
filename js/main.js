import { initMenu } from "./modules/menu.js";

const cartBtn = document.querySelector(".header__cart-btn");

const mainImg = document.querySelector(".main-image img");
const prevImgBtn = document.querySelector(".main-image__btn--prev");
const nextImgBtn = document.querySelector(".main-image__btn--next");

const decrementBtn = document.getElementById("decrease-btn");
const incrementBtn = document.getElementById("increase-btn");
const productQuantityInput = document.querySelector('input[type="number"]');

let currentIndex = 0;
let selectedQuantity = 0;

const images = [
  "images/image-product-1.jpg",
  "images/image-product-2.jpg",
  "images/image-product-3.jpg",
  "images/image-product-4.jpg",
];

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

prevImgBtn.addEventListener("click", () => {
  currentIndex--;
  if (currentIndex < 0) currentIndex = 3;
  mainImg.src = images[currentIndex];
});

productQuantityInput.addEventListener("input", (e) => {
  updateQuantity(Number(e.target.value));
});

nextImgBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex > 3) currentIndex = 0;
  mainImg.src = images[currentIndex];
});

decrementBtn.addEventListener("click", () => {
  updateQuantity(selectedQuantity - 1);
});

incrementBtn.addEventListener("click", () => {
  updateQuantity(selectedQuantity + 1);
});

initMenu();
