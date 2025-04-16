function copyElementWithCustomStylesOnly(original, count) {
  const parent = original.parentNode;

  for (let i = 0; i < count; i++) {
    const clone = original.cloneNode(true);
    applyChangedStyles(original, clone);
    parent.appendChild(clone);
  }
}

function copyWithClassesOnly(original, count) {
  const parent = original.parentNode;

  for (let i = 0; i < count; i++) {
    const clone = original.cloneNode(true);
    clone.className = original.className; // Copy class
    parent.appendChild(clone);
  }
}

function applyChangedStyles(source, target) {
  // Create a dummy default element to compare against
  const defaultElement = document.createElement(source.tagName);
  document.body.appendChild(defaultElement); // Needs to be in DOM to compute styles

  const sourceStyle = window.getComputedStyle(source);
  const defaultStyle = window.getComputedStyle(defaultElement);

  for (let prop of sourceStyle) {
    const value = sourceStyle.getPropertyValue(prop);
    const defaultValue = defaultStyle.getPropertyValue(prop);

    if (value !== defaultValue) {
      target.style[prop] = value;
    }
  }

  document.body.removeChild(defaultElement); // Clean up

  // Do the same recursively for children
  const sourceChildren = source.children;
  const targetChildren = target.children;

  for (let i = 0; i < sourceChildren.length; i++) {
    applyChangedStyles(sourceChildren[i], targetChildren[i]);
  }
}

window.onload = function () {
  const originalDiv = document.getElementById("galleryItem"); // replace with your actual div ID
  copyWithClassesOnly(originalDiv, 10);
};