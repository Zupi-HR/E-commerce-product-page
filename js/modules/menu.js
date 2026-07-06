import { trapFocus, restoreFocus } from "../utils/a11y.js";

const body = document.querySelector("body");
const headerNav = document.querySelector(".header__nav");
const openMenuBtn = document.querySelector(".header__menu-btn");
const closeMenuBtn = document.getElementById("close-menu-btn");
const overlay = document.getElementById("menu-overlay");

function closeMenuButton() {
  body.classList.remove("menu-is-open");
  openMenuBtn.setAttribute("aria-expanded", "false");
  restoreFocus(openMenuBtn);
}

function openMenuButton(e) {
  body.classList.add("menu-is-open");
  openMenuBtn.setAttribute("aria-expanded", "true");
  closeMenuBtn.focus();
}

export function initMenu() {
  openMenuBtn.addEventListener("click", openMenuButton);

  closeMenuBtn.addEventListener("click", closeMenuButton);
  headerNav.addEventListener("keydown", (e) => {
    trapFocus(e, headerNav);
  });
  overlay.addEventListener("click", closeMenuButton);
}
