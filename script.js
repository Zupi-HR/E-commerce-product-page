const cartBtn = document.querySelector(".header__cart-btn");

cartBtn.addEventListener("click", () => {
  const isExpanded = cartBtn.getAttribute("aria-expanded");

  if (isExpanded === "false") cartBtn.setAttribute("aria-expanded", "true");
  else cartBtn.setAttribute("aria-expanded", "false");
});
