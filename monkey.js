const tiles = document.querySelectorAll(".tile");
const carousel = document.querySelector(".carousel");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let current = 0;

function updateCarousel() {
  tiles.forEach((tile, i) => {
    tile.classList.remove("active");
    if (i === current) tile.classList.add("active");
  });

  const offset = -(current * 320);
  carousel.style.transform = `translateX(${offset}px)`;
}

// initial state
updateCarousel();

// buttons
nextBtn.addEventListener("click", () => {
  current = (current + 1) % tiles.length;
  updateCarousel();
});

prevBtn.addEventListener("click", () => {
  current = (current - 1 + tiles.length) % tiles.length;
  updateCarousel();
});

// mouse wheel (horizontal feel)
window.addEventListener("wheel", (e) => {
  if (Math.abs(e.deltaY) < 10) return;

  if (e.deltaY > 0) {
    current = (current + 1) % tiles.length;
  } else {
    current = (current - 1 + tiles.length) % tiles.length;
  }
  updateCarousel();
});
