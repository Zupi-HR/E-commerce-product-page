const cartBtn = document.querySelector(".header__cart-btn");
const body = document.querySelector("body");
const headerNav = document.querySelector(".header__nav");
const openMenuBtn = document.querySelector(".header__menu-btn");
const closeMenuBtn = document.getElementById("close-menu-btn");
const overlay = document.getElementById("menu-overlay");
const mainImg = document.querySelector(".main-image img");
const prevImgBtn = document.querySelector(".main-image__btn--prev");
const nextImgBtn = document.querySelector(".main-image__btn--next");
let lastFocusedElement = null;
const focusableMenuElements = document.querySelectorAll(
  ".header__close-btn,.header__nav ul li a",
);
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

function trapMenuFocus(e) {
  if (e.key !== "Tab" || !body.classList.contains("menu-is-open")) return;

  if (focusableMenuElements.length > 0) {
    const firstFocusableEl = focusableMenuElements[0];
    const lastFocusableEl =
      focusableMenuElements[focusableMenuElements.length - 1];
    if (e.shiftKey && document.activeElement === firstFocusableEl) {
      e.preventDefault();
      lastFocusableEl.focus();
    } else if (!e.shiftKey && document.activeElement === lastFocusableEl) {
      e.preventDefault();
      firstFocusableEl.focus();
    }
  }
}

headerNav.addEventListener("keydown", trapMenuFocus);

function closeMenuButton() {
  body.classList.remove("menu-is-open");
  openMenuBtn.setAttribute("aria-expanded", "false");
  lastFocusedElement.focus();
}

function openMenuButton(e) {
  lastFocusedElement = document.activeElement;
  closeMenuBtn.focus();
  body.classList.add("menu-is-open");
  openMenuBtn.setAttribute("aria-expanded", "true");
}

function updateQuantity(newValue) {
  if (newValue < 0) {
    newValue = 0;
  }
  selectedQuantity = newValue;
  productQuantityInput.value = selectedQuantity;
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
