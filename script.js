const cartBtn = document.querySelector(".header__cart-btn");
const body = document.querySelector("body");
const openMenuBtn = document.querySelector(".header__menu-btn");
const closeMenuBtn = document.getElementById("close-menu-btn");
const overlay = document.getElementById("menu-overlay");

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
