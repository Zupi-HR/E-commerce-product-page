# ES Module Architecture & Refactoring Plan

**Project:** E-Commerce Product Page  
**Objective:** Transition from a monolithic script (`script.js`) to a modular, scalable ES Module (ESM) architecture following modern frontend industry best practices.

---

## 1. Architectural Approach: The "Feature + Store" Hybrid Model

In production frontend codebases, we want to balance **high cohesion** (keeping related code together) with **loose coupling** (preventing modules from getting tangled). For this project, we are adopting a **Feature-Based Architecture paired with a Centralized State Store and Shared Utilities**.

### Why This Pattern?
* **Feature Modules (Domain Boundaries):** Each major UI feature on the page gets its own module. When modifying the image gallery or debugging the mobile menu, developers only need to work within that specific file.
* **Single Source of Truth (`store.js`):** Shared application data (such as product quantity and cart contents) lives in a central state module rather than being scattered across DOM attributes or global variables.
* **Separation of Application vs. Local State:** Global state shared across domain boundaries lives in `store.js`, while UI-specific state (like the current active image in the gallery slider) remains encapsulated within its respective feature module.
* **Shared Utilities (`utils/`):** Cross-cutting concerns like accessibility focus trapping are decoupled into reusable helper modules to prevent code duplication across modals and menus.
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
    ├── utils/
    │   └── a11y.js          # Shared accessibility utilities (focus trapping, keyboard navigation)
    └── modules/
        ├── menu.js          # Mobile navigation drawer & overlay
        ├── gallery.js       # Product image gallery, slider, & lightbox modal
        └── cart.js          # Cart dropdown, quantity controls, and cart list rendering
```

---

## 3. Module Responsibilities & Boundaries

### `js/store.js` (Shared State Layer)
* **Responsibility:** Holds the application's shared data and manages state updates.
* **Key State (Global/Application State):**
  * `selectedQuantity`: Number of items currently selected in the quantity input field.
  * `cartItems`: Array of items currently added to the shopping cart.
  * *(Note: UI-only state like `currentImageIndex` is intentionally kept out of the global store to maintain encapsulation).*
* **Exports:** Getter functions to safely read state (e.g., `getCart()`, `getQuantity()`) and modifier functions to update state (e.g., `addToCart(item)`, `updateQuantity(val)`, `removeFromCart(id)`).
* **Reactivity:** Emits custom browser events (e.g., `'cart:updated'`, `'quantity:updated'`) when state changes so UI modules can re-render reactively.

---

### `js/utils/a11y.js` (Accessibility Utilities)
* **Responsibility:** Provides reusable keyboard navigation and focus management functions to ensure WCAG compliance across interactive overlays.
* **Key Functions:**
  * `trapFocus(element, event)`: Keeps keyboard focus inside an open overlay (modals, drawers) when pressing Tab / Shift+Tab.
  * `restoreFocus(element)`: Returns focus to the triggering button after an overlay closes.

---

### `js/modules/menu.js` (Navigation Drawer)
* **Responsibility:** Handles all mobile navigation drawer interactions.
* **Key Interactions:**
  * Opening and closing the mobile navigation overlay.
  * Toggling `aria-expanded` and managing focus restoration using `utils/a11y.js`.
  * Executing focus trapping on `keydown` to ensure screen reader compliance.

---

### `js/modules/gallery.js` (Image Gallery & Lightbox)
* **Responsibility:** Manages product image viewing on both desktop thumbnails and mobile sliders.
* **Key Local State:**
  * `currentImageIndex`: Tracks the active thumbnail/slide (private to this module).
* **Key Interactions:**
  * Next/Previous button click handlers for switching images.
  * Thumbnail selection and active state styling.
  * Opening and closing the `<dialog>` lightbox modal with accessibility focus trapping via `utils/a11y.js`.

---

### `js/modules/cart.js` (Shopping Cart & Product Controls)
* **Responsibility:** Manages user interaction with product quantities, the "Add to cart" submission, and rendering the cart dropdown UI.
* **Key Interactions:**
  * Incrementing and decrementing product quantity (calls `store.updateQuantity()`).
  * Handling Add to Cart form submissions (calls `store.addToCart()`).
  * Toggling the cart dropdown visibility (`aria-expanded`).
  * Listening for `'cart:updated'` events from `store.js` to dynamically clone and render cart items or display the empty state.

---

### `js/main.js` (Application Entry Point)
* **Responsibility:** Acts as the central orchestrator when the DOM loads.
* **Key Interactions:**
  * Imports feature modules and initializes their event listeners.
  * Included in `index.html` via `<script type="module" src="js/main.js"></script>`.
  * Deferment: Native ES modules defer execution automatically, ensuring the HTML DOM is fully parsed before script execution.

---

## 4. Communication & Data Flow Best Practices

1. **No Global Variables:** Modules must not attach variables to the `window` object. All data sharing happens via explicit ES6 `import` and `export` statements.
2. **Unidirectional Data Flow & Pub/Sub Reactivity:**
   * User interactions in UI modules (e.g., clicking "Add to cart" in `cart.js`) never mutate DOM elements of other components directly.
   * Instead, the UI module calls a modifier export from `store.js` (e.g., `addToCart(item)`).
   * `store.js` updates its internal data structure and dispatches a notification event (e.g., `window.dispatchEvent(new CustomEvent('cart:updated', { detail: cartItems }))`).
   * Interested modules listen for this event and re-render their UI from the new state. This completely decouples feature modules from one another.
3. **Local Development Setup:** Because native ES modules enforce strict CORS policies in web browsers, opening `index.html` directly via the `file://` protocol will throw CORS exceptions. Colleagues must run a local HTTP development server (e.g., VS Code Live Server, Vite, or `npx serve`) to preview and test the project locally.

---

## 5. Incremental Migration Strategy

To avoid breaking working functionality, the refactoring follows an incremental, testable step-by-step rollout:
1. **Step 1 (Foundation & Utils):** Create the `js/`, `js/modules/`, and `js/utils/` directory structure. Extract the focus trapping logic from `script.js` into `js/utils/a11y.js`.
2. **Step 2 (Navigation Module):** Create `js/modules/menu.js`, importing our accessibility utilities. Connect it in `js/main.js` and verify mobile menu keyboard accessibility.
3. **Step 3 (Gallery Module):** Extract gallery slider and lightbox modal logic into `js/modules/gallery.js`, utilizing local state and shared focus utilities.
4. **Step 4 (State Store):** Set up `js/store.js` with getters, setters, and custom event dispatching for quantity and cart data.
5. **Step 5 (Cart Module & Integration):** Migrate the quantity buttons, add-to-cart form, and dropdown rendering into `js/modules/cart.js`, listening to store updates. Finally, remove the old `script.js`.
