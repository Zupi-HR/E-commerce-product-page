let selectedQuantity = 0;
const cartItems = [];

export function updateQuantity(newValue) {
  if (Number.isInteger(newValue)) {
    selectedQuantity = Math.max(0, newValue);
  }

  const quantityUpdated = new CustomEvent("quantity:updated", {
    detail: selectedQuantity,
  });

  window.dispatchEvent(quantityUpdated);
}

export function getSelectedQuantity() {
  return selectedQuantity;
}

export function addToCart(item) {
  const existingItem = cartItems.find((element) => {
    return item.id === element.id;
  });

  if (existingItem !== undefined) {
    existingItem.quantity += item.quantity;
  } else {
    cartItems.push(item);
  }
}
