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

document.getElementById("submitBtn").addEventListener("click", function () {
  // Predetermined values
  const expectedPhone = "hallo";
  const expectedLocation = "tly";
  const expectedMail = "1212";
  const redirectURL = "contacted.html"; // Change to your target page

  // Get input values
  const phone = document.getElementById("phoneInput").value.trim();
  const location = document.getElementById("locationInput").value.trim();
  const mail = document.getElementById("mailInput").value.trim();

  // Check if they match
  if (phone === expectedPhone && location === expectedLocation && mail === expectedMail) {
    window.location.href = redirectURL;
  } else {
    alert("Incorrect information. Please try again.");
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const savedPhone = localStorage.getItem("phoneInput");
  const savedLocation = localStorage.getItem("locationInput");
  const savedMail = localStorage.getItem("mailInput");

  if (savedPhone) document.getElementById("phoneInput").value = savedPhone;
  if (savedLocation) document.getElementById("locationInput").value = savedLocation;
  if (savedMail) document.getElementById("mailInput").value = savedMail;
});

// Save input values on change
document.getElementById("phoneInput").addEventListener("input", (e) => {
  localStorage.setItem("phoneInput", e.target.value);
});

document.getElementById("locationInput").addEventListener("input", (e) => {
  localStorage.setItem("locationInput", e.target.value);
});

document.getElementById("mailInput").addEventListener("input", (e) => {
  localStorage.setItem("mailInput", e.target.value);
});