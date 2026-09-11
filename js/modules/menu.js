import { trapFocus, restoreFocus } from "../utils/a11y.js";

const body = document.querySelector("body");
const headerNav = document.querySelector(".header__nav");
const openMenuBtn = document.querySelector(".header__menu-btn");
const closeMenuBtn = document.getElementById("close-menu-btn");
const headerLogo = document.querySelector(".header__logo");
const headerUserControls = document.querySelector(".header__user-controls");
const overlay = document.getElementById("menu-overlay");
const desktopMediaQuery = window.matchMedia("(min-width: 1024px)");
const mainEl = document.querySelector("main");

function closeMenuButton() {
  body.classList.remove("menu-is-open");
  openMenuBtn.setAttribute("aria-expanded", "false");
  setPageContentInert(false);
  restoreFocus(openMenuBtn);
}

function openMenuButton() {
  body.classList.add("menu-is-open");
  openMenuBtn.setAttribute("aria-expanded", "true");
  closeMenuBtn.focus();
  setPageContentInert(true);
}

function setPageContentInert(isInert) {
  headerLogo.inert = isInert;
  headerUserControls.inert = isInert;
  mainEl.inert = isInert;
  openMenuBtn.inert = isInert;
}

function handleNavKeyDown(e) {
  if (!body.classList.contains("menu-is-open")) return;
  if (e.key === "Escape") {
    closeMenuButton();
    return;
  }
  trapFocus(e, headerNav);
}

function handleResolutionChange(event) {
  if (event.matches) {
    body.classList.remove("menu-is-open");
    openMenuBtn.setAttribute("aria-expanded", "false");
    setPageContentInert(false);
  }
}

export function initMenu() {
  openMenuBtn.addEventListener("click", openMenuButton);

  closeMenuBtn.addEventListener("click", closeMenuButton);

  headerNav.addEventListener("keydown", handleNavKeyDown);
  desktopMediaQuery.addEventListener("change", handleResolutionChange);
  overlay.addEventListener("click", closeMenuButton);
}
