import {
  updateQuantity,
  getSelectedQuantity,
  addToCart,
  getCart,
  getTotalQuantity,
  removeFromCart,
} from "../store.js";
import { product } from "../data/product.js";

export function initCart() {
  const cartBtn = document.querySelector(".header__cart-btn");
  const decrementBtn = document.getElementById("decrease-btn");
  const incrementBtn = document.getElementById("increase-btn");
  const productQuantityInput = document.querySelector('input[type="number"]');
  const addToCartForm = document.querySelector(".add-to-cart-form");
  const cartQuantity = document.querySelector(".cart-quantity");
  const emptyCart = document.querySelector(".empty-cart");
  const cartItemsList = document.querySelector(".cart-items-list");
  const checkoutBtn = document.querySelector(".checkout-btn");
  const templateListEl = document.getElementById("cart-filled-template");

  renderCartState(getCart());

  cartBtn.addEventListener("click", () => {
    const isExpanded = cartBtn.getAttribute("aria-expanded");

    if (isExpanded === "false") cartBtn.setAttribute("aria-expanded", "true");
    else cartBtn.setAttribute("aria-expanded", "false");
  });

  window.addEventListener("quantity:updated", (e) => {
    productQuantityInput.value = e.detail;
  });

  window.addEventListener("cart:updated", (e) => {
    renderCartState(e.detail);
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

  addToCartForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const { images, ...cartItem } = product;
    cartItem.quantity = getSelectedQuantity();
    cartItem.thumbnail = images[0].thumbnail;
    const wasItemAddedToCart = addToCart(cartItem);
    if (wasItemAddedToCart) updateQuantity(0);
  });

  cartItemsList.addEventListener("click", (e) => {
    const deleteBtn = e.target.closest(".delete-btn");
    if (deleteBtn === null) return;
    removeFromCart(Number(deleteBtn.dataset.id));
  });

  function adjustQuantity(delta) {
    const requestedQuantity = getSelectedQuantity() + delta;
    updateQuantity(requestedQuantity);
  }

  function renderCartState(cartItems) {
    cartItemsList.replaceChildren();
    if (cartItems.length === 0) {
      emptyCart.style.display = "flex";
      cartQuantity.style.display = "none";
      cartItemsList.style.display = "none";
      checkoutBtn.style.display = "none";
    } else {
      renderCartItems(cartItems);
      emptyCart.style.display = "none";
      cartQuantity.style.display = "flex";
      cartItemsList.style.display = "block";
      cartQuantity.textContent = getTotalQuantity();
      checkoutBtn.style.display = "block";
    }
  }

  function renderCartItems(cartItems) {
    cartItems.forEach((item) => {
      const listItem = templateListEl.content.cloneNode(true);
      listItem.querySelector(".cart-item-img").src = item.thumbnail;
      listItem.querySelector(".cart-item-title").textContent = item.title;
      listItem.querySelector(".price-value").textContent =
        `$${item.unitPrice.toFixed(2)}`;
      listItem.querySelector(".quantity-value").textContent =
        `x ${item.quantity}`;
      listItem.querySelector(".total-value").textContent =
        `$${(item.unitPrice * item.quantity).toFixed(2)}`;
      listItem.querySelector(".delete-btn").dataset.id = item.id;
      cartItemsList.appendChild(listItem);
    });
  }
}
