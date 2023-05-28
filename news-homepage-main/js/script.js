const body = document.querySelector("body");
const menuOpen = document.querySelector(".menu-open");
const menuClose = document.querySelector(".menu-close");

menuOpen.addEventListener("click", () => {
  body.classList.toggle("open");
});

menuClose.addEventListener("click", () => {
  body.classList.toggle("open");
});
