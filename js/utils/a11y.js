export function trapFocus(e, containerElement) {
  if (e.key !== "Tab" || !containerElement) return;

  const focusableElements = containerElement.querySelectorAll(
    'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  );
  if (focusableElements.length > 0) {
    const firstFocusableEl = focusableElements[0];
    const lastFocusableEl = focusableElements[focusableElements.length - 1];
    if (e.shiftKey && document.activeElement === firstFocusableEl) {
      e.preventDefault();
      lastFocusableEl.focus();
    } else if (!e.shiftKey && document.activeElement === lastFocusableEl) {
      e.preventDefault();
      firstFocusableEl.focus();
    }
  }
}
