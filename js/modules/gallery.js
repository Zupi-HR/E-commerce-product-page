const state = {
  thumbnailCount: null,
  currentIndex: 0,
};

function setThumbnailCount(count) {
  if (!Number.isInteger(count)) {
    throw new TypeError("Thumbnail count must be an integer.");
  }

  if (count <= 0) {
    throw new RangeError("Thumbnail count must be greater than zero.");
  }

  const expectedCount = state.thumbnailCount;

  if (expectedCount === null) {
    state.thumbnailCount = count;
    return;
  }

  if (count !== expectedCount) {
    throw new Error(
      `Thumbnail count does not match. Expected: ${expectedCount}, received: ${count}.`,
    );
  }
}

export function setCurrentIndex(indexOrDirection) {
  if (state.thumbnailCount === null) {
    throw new Error(
      "Cannot set the current index before the gallery is initialized.",
    );
  }

  if (indexOrDirection === "previous") {
    state.currentIndex -= 1;
  } else if (indexOrDirection === "next") {
    state.currentIndex += 1;
  } else if (Number.isInteger(indexOrDirection)) {
    state.currentIndex = indexOrDirection;
  } else {
    throw new TypeError("Value must be an integer, 'previous', or 'next'.");
  }

  if (state.currentIndex < 0) {
    state.currentIndex = state.thumbnailCount - 1;
  } else if (state.currentIndex >= state.thumbnailCount) {
    state.currentIndex = 0;
  }

  return state.currentIndex;
}

export function initGallery(root, onImageChangeRequest) {
  const mainImg = root.querySelector(".main-image img");
  const prevImgBtn = root.querySelector(".main-image__btn--prev");
  const nextImgBtn = root.querySelector(".main-image__btn--next");
  const thumbnailsContainer = root.querySelector(".images");
  const thumbnails = thumbnailsContainer.querySelectorAll("button");
  setThumbnailCount(thumbnails.length);
  updateGalleryView(state.currentIndex);

  prevImgBtn.addEventListener("click", () => {
    onImageChangeRequest("previous");
  });

  nextImgBtn.addEventListener("click", () => {
    onImageChangeRequest("next");
  });

  thumbnailsContainer.addEventListener("click", handleThumbnailClick);

  function handleThumbnailClick(event) {
    const clickedThumbnail = event.target.closest("button");
    if (!clickedThumbnail) return;
    const requestedIndex = Array.from(thumbnails).indexOf(clickedThumbnail);
    onImageChangeRequest(requestedIndex);
  }

  function updateMainImage(imgSrc) {
    mainImg.src = imgSrc;
  }

  function updateGalleryView(index) {
    thumbnailsContainer
      .querySelector("[aria-current]")
      ?.removeAttribute("aria-current");

    const activeThumbnail = Array.from(thumbnails).at(index);

    activeThumbnail.setAttribute("aria-current", "true");
    updateMainImage(activeThumbnail.dataset.image);
  }
  return updateGalleryView;
}
