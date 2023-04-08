const log = () => {
  console.log("clicked");
};

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const img01 = document.querySelector(".item-wrapper");
const closeModalBtn = document.querySelector(".btn-close");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  console.log("clicked");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

img01.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
