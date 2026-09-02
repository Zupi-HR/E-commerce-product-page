let selectedQuantity = 0;
let cartItems = [];

export function updateQuantity(newValue) {
  if (!Number.isInteger(newValue) || newValue < 0) {
    return false;
  }
  if (newValue === selectedQuantity) {
    return true;
  }

  selectedQuantity = newValue;
  const quantityUpdated = new CustomEvent("quantity:updated", {
    detail: selectedQuantity,
  });

  window.dispatchEvent(quantityUpdated);
  return true;
}

export function getSelectedQuantity() {
  return selectedQuantity;
}

export function addToCart(item) {
  if (!Number.isInteger(item.quantity) || item.quantity <= 0) return false;

  const existingItem = cartItems.find((element) => {
    return item.id === element.id;
  });

  if (existingItem !== undefined) {
    existingItem.quantity += item.quantity;
  } else {
    cartItems.push(structuredClone(item));
  }

  const cartUpdated = new CustomEvent("cart:updated", {
    detail: structuredClone(cartItems),
  });
  window.dispatchEvent(cartUpdated);
  return true;
}

export function getTotalQuantity() {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
}

export function getCart() {
  return structuredClone(cartItems);
}

export function removeFromCart(id) {
  const previousLength = cartItems.length;
  cartItems = cartItems.filter((item) => item.id !== id);
  if (previousLength === cartItems.length) return;
  const cartUpdated = new CustomEvent("cart:updated", {
    detail: structuredClone(cartItems),
  });
  window.dispatchEvent(cartUpdated);
}
