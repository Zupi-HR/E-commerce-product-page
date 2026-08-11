let selectedQuantity = 0;

export function updateQuantity(newValue) {
  if (!Number.isInteger(newValue)) return;
  selectedQuantity = Math.max(0, newValue);

  const quantityUpdated = new CustomEvent("quantity:updated", {
    detail: selectedQuantity,
  });

  window.dispatchEvent(quantityUpdated);
}

export function getSelectedQuantity() {
  return selectedQuantity;
}
