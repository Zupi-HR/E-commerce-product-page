const cartBtn = document.querySelector(".header__cart-btn");
const body = document.querySelector("body");
const openMenuBtn = document.querySelector(".header__menu-btn");
const closeMenuBtn = document.getElementById("close-menu-btn");
const overlay = document.getElementById("menu-overlay");
const mainImg = document.querySelector(".main-image img");
const prevImgBtn = document.querySelector(".main-image__btn--prev");
const nextImgBtn = document.querySelector(".main-image__btn--next");
let currentIndex = 0;

const images = [
  "images/image-product-1.jpg",
  "images/image-product-2.jpg",
  "images/image-product-3.jpg",
  "images/image-product-4.jpg",
];

function closeMenuButton() {
  body.classList.remove("menu-is-open");
  openMenuBtn.setAttribute("aria-expanded", "false");
}

function openMenuButton() {
  body.classList.add("menu-is-open");
  openMenuBtn.setAttribute("aria-expanded", "true");
}

openMenuBtn.addEventListener("click", openMenuButton);

closeMenuBtn.addEventListener("click", closeMenuButton);

overlay.addEventListener("click", closeMenuButton);

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

nextImgBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex > 3) currentIndex = 0;
  mainImg.src = images[currentIndex];
});
