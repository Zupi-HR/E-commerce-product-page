# ES Module Architecture & Refactoring Plan

**Project:** E-Commerce Product Page  
**Objective:** Transition from a monolithic script (`script.js`) to a modular, scalable ES Module (ESM) architecture following modern frontend industry best practices.

---

## 1. Architectural Approach: The "Feature + Store" Hybrid Model

In production frontend codebases, we want to balance **high cohesion** (keeping related code together) with **loose coupling** (preventing modules from getting tangled). For this project, we are adopting a **Feature-Based Architecture paired with a Centralized State Store**.

### Why This Pattern?
* **Feature Modules (Domain Boundaries):** Each major UI feature on the page gets its own module. When modifying the image gallery or debugging the mobile menu, developers only need to work within that specific file.
* **Single Source of Truth (`store.js`):** Shared application data (such as product quantity and cart contents) lives in a central state module rather than being scattered across DOM attributes or global variables.
* **Maintainability & Testing:** Separating state logic from DOM manipulation makes the code self-documenting, easier to test, and ready to scale.

---

## 2. Proposed Directory Structure

```text
├── index.html               # Main HTML document (will load js/main.js as type="module")
├── style.css                # Primary stylesheet
├── reset.css                # CSS reset
└── js/
    ├── main.js              # Application entry point & orchestrator
    ├── store.js             # Centralized state management (Single Source of Truth)
    └── modules/
        ├── menu.js          # Mobile navigation & accessibility focus trapping
        ├── gallery.js       # Product image gallery & lightbox modal
        └── cart.js          # Cart dropdown, quantity controls, and cart list rendering
```

---

## 3. Module Responsibilities & Boundaries

### `js/store.js` (State Layer)
* **Responsibility:** Holds the application's reactive or shared data.
* **Key State:**
  * `selectedQuantity` (Number of items currently selected in the input).
  * `cartItems` (Array of items currently added to the shopping cart).
  * `currentImageIndex` (Active image index for the gallery slider).
* **Exports:** Getter and setter functions to safely read and update state (e.g., `getCart()`, `addToCart(item)`, `updateQuantity(val)`).

---

### `js/modules/menu.js` (Navigation & Accessibility)
* **Responsibility:** Handles all mobile navigation drawer interactions and keyboard accessibility.
* **Key Interactions:**
  * Opening and closing the mobile navigation overlay.
  * Toggling `aria-expanded` and managing focus restoration.
  * Executing `trapMenuFocus()` on `keydown` to ensure screen reader and keyboard navigation compliance (WCAG standards).

---

### `js/modules/gallery.js` (Image Gallery & Lightbox)
* **Responsibility:** Manages product image viewing on both desktop thumbnails and mobile sliders.
* **Key Interactions:**
  * Next/Previous button click handlers for the main image.
  * Thumbnail selection and active state styling.
  * Opening and closing the `<dialog>` lightbox modal.

---

### `js/modules/cart.js` (Shopping Cart & Product Controls)
* **Responsibility:** Manages user interaction with product quantities, the "Add to cart" submission, and rendering the cart dropdown UI.
* **Key Interactions:**
  * Incrementing and decrementing product quantity via buttons.
  * Handling the Add to Cart form submission.
  * Toggling the cart dropdown visibility (`aria-expanded`).
  * Dynamically cloning and rendering cart items using the HTML `<template id="cart-filled-template">` or showing the empty state.

---

### `js/main.js` (Application Entry Point)
* **Responsibility:** Acts as the central orchestrator when the DOM loads.
* **Key Interactions:**
  * Imports feature modules and initializes event listeners.
  * Included in `index.html` via `<script type="module" src="js/main.js"></script>`.
  * Note: Native ES modules defer script execution automatically, ensuring the HTML DOM is fully parsed before running.

---

## 4. Communication & Data Flow Best Practices

1. **No Global Variables:** Modules must not attach variables to the `window` object. All data sharing happens via explicit ES6 `import` and `export` statements.
2. **Unidirectional Data Flow for Shared State:** When a user clicks "Add to cart" in `cart.js`, the module calls an export from `store.js` (e.g., `addToCart()`). The UI then re-renders based on the updated store state rather than mutating DOM text directly without updating state.
3. **Local Development Setup:** Because native ES modules enforce strict CORS policies in web browsers, opening `index.html` directly via the `file://` protocol will throw CORS exceptions. Colleagues must run a local HTTP development server (e.g., VS Code Live Server, Vite, or `npx serve`) to preview and test the project locally.

---

## 5. Incremental Migration Strategy

To avoid breaking working functionality, the refactoring will follow an incremental step-by-step rollout:
1. **Step 1:** Create the `js/` directory structure and set up `main.js` as an ES module in `index.html`.
2. **Step 2:** Extract the standalone mobile menu and focus-trapping logic into `js/modules/menu.js` and verify keyboard accessibility.
3. **Step 3:** Extract the gallery slider and lightbox logic into `js/modules/gallery.js`.
4. **Step 4:** Set up `js/store.js` to manage quantity and cart state, then migrate the cart UI and form controls into `js/modules/cart.js`.
5. **Step 5:** Perform regression testing on accessibility (ARIA attributes, keyboard navigation) and visual feedback.
