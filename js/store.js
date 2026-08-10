let selectedQuantity = 0;

export function updateQuantity(newValue) {
  if (!Number.isInteger(newValue)) return;
  selectedQuantity = Math.max(0, newValue);
}

export function getSelectedQuantity() {
  return selectedQuantity;
}
