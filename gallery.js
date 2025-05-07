// Clone the element a bunch of times, but only keep the styles that are *different* from the default
function copyElementWithCustomStylesOnly(original, count) {
  const parent = original.parentNode;

  for (let i = 0; i < count; i++) {
    const clone = original.cloneNode(true); // full copy of the element
    applyChangedStyles(original, clone); // only copy the styles that were actually changed
    parent.appendChild(clone); // add the copy to the page
  }
}

// Clone an element multiple times and just copy over its classes, nothing else
function copyWithClassesOnly(original, count) {
  const parent = original.parentNode;

  for (let i = 0; i < count; i++) {
    const clone = original.cloneNode(true); // full copy
    clone.className = original.className; // manually set class names
    parent.appendChild(clone); // add it to the parent
  }
}

// Copy only the styles that are actually different from the default browser styles
function applyChangedStyles(source, target) {
  const defaultElement = document.createElement(source.tagName); // make a default tag to compare
  document.body.appendChild(defaultElement); // need to add it to the page or styles won’t work

  const sourceStyle = window.getComputedStyle(source);
  const defaultStyle = window.getComputedStyle(defaultElement);

  // go through every style and keep the ones that are different
  for (let prop of sourceStyle) {
    const value = sourceStyle.getPropertyValue(prop);
    const defaultValue = defaultStyle.getPropertyValue(prop);

    if (value !== defaultValue) {
      target.style[prop] = value; // only apply changed styles
    }
  }

  document.body.removeChild(defaultElement); // clean up

  // do the same for all children
  const sourceChildren = source.children;
  const targetChildren = target.children;

  for (let i = 0; i < sourceChildren.length; i++) {
    applyChangedStyles(sourceChildren[i], targetChildren[i]);
  }
}

// when the page loads, duplicate an element 10 times and focus on the logo link
window.onload = function () {
  const originalDiv = document.getElementById("galleryItem"); // the thing I want to copy
  copyWithClassesOnly(originalDiv, 10); // just make 10 copies with class names
  document.querySelector('.logo-link').focus(); // set focus to logo for accessibility maybe?
};

// handle form submit
document.getElementById("submitBtn").addEventListener("click", function () {
  // expected values to check against
  const expectedPhone = "hallo";
  const expectedLocation = "tly";
  const expectedMail = "1212";
  const redirectURL = "contacted.html"; // where to go if everything matches

  // get the values user entered
  const phone = document.getElementById("phoneInput").value.trim();
  const location = document.getElementById("locationInput").value.trim();
  const mail = document.getElementById("mailInput").value.trim();

  // if all 3 match exactly, go to success page
  if (phone === expectedPhone && location === expectedLocation && mail === expectedMail) {
    window.location.href = redirectURL;
  } else {
    alert("Incorrect information. Please try again."); // simple error message
  }
});

// load saved input values from localStorage (if any)
window.addEventListener("DOMContentLoaded", () => {
  const savedPhone = localStorage.getItem("phoneInput");
  const savedLocation = localStorage.getItem("locationInput");
  const savedMail = localStorage.getItem("mailInput");

  if (savedPhone) document.getElementById("phoneInput").value = savedPhone;
  if (savedLocation) document.getElementById("locationInput").value = savedLocation;
  if (savedMail) document.getElementById("mailInput").value = savedMail;
});

// save each input's value to localStorage on change
document.getElementById("phoneInput").addEventListener("input", (e) => {
  localStorage.setItem("phoneInput", e.target.value);
});

document.getElementById("locationInput").addEventListener("input", (e) => {
  localStorage.setItem("locationInput", e.target.value);
});

document.getElementById("mailInput").addEventListener("input", (e) => {
  localStorage.setItem("mailInput", e.target.value);
});

// hamburger menu
function mobileMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("responsive"); // adds or removes "responsive" class
}
