document.getElementById("submitBtn").addEventListener("click", function () {
  const expectedName = "Juulius";
  const redirectURL = "joined.html";
  const statue = document.getElementById("statueInput").value.trim();

  if (statue === expectedName) {
    window.location.href = redirectURL;
  } else {
    alert("That is not his name");
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const expectedName = localStorage.getItem("statueInput");

  if (expectedName) document.getElementById("statueInput").value = expectedName;
});

document.getElementById("statueInput").addEventListener("input", (e) => {
  localStorage.setItem("statueInput", e.target.value);
});