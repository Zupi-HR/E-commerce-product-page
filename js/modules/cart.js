import { updateQuantity, getSelectedQuantity, addToCart } from "../store.js";
import { product } from "../data/product.js";

export function initCart() {
  const cartBtn = document.querySelector(".header__cart-btn");
  const decrementBtn = document.getElementById("decrease-btn");
  const incrementBtn = document.getElementById("increase-btn");
  const productQuantityInput = document.querySelector('input[type="number"]');
  const addToCartForm = document.querySelector(".add-to-cart-form");

  cartBtn.addEventListener("click", () => {
    const isExpanded = cartBtn.getAttribute("aria-expanded");

    if (isExpanded === "false") cartBtn.setAttribute("aria-expanded", "true");
    else cartBtn.setAttribute("aria-expanded", "false");
  });

  window.addEventListener("quantity:updated", (e) => {
    productQuantityInput.value = e.detail;
  });

  window.addEventListener("cart:updated", (e) => {
    const cartItems = e.detail;
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

  function adjustQuantity(delta) {
    const requestedQuantity = getSelectedQuantity() + delta;
    updateQuantity(requestedQuantity);
  }

  decrementBtn.addEventListener("click", () => {
    adjustQuantity(-1);
  });

  incrementBtn.addEventListener("click", () => {
    adjustQuantity(1);
  });

  addToCartForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const { images, ...cartItem } = product;
    cartItem.quantity = Number(productQuantityInput.value);
    cartItem.thumbnail = images[0].thumbnail;
    addToCart(cartItem);
  });
}
