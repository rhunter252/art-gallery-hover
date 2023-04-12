const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const items = document.querySelectorAll(".item");

const itemImages = document.querySelectorAll(".item img");

const itemsData = [
  {
    id: 1,
    name: "Lust",
    description:
      "Lust is a strong passion or longing, especially for sexual desires.",
    verse:
      "Flee from sexual immorality. All other sins a person commits are outside the body, but whoever sins sexually, sins against their own body. - 1 Corinthians 6:18",
    image: "/",
  },
  {
    id: 2,
    name: "Pride",
    description: "7 Deadly Sins Pride.",
    verse:
      "Pride goes before destruction, a haughty spirit before a fall. - Proverbs 16:18",
    image: "/",
  },
  {
    id: 3,
    name: "Gluttony",
    description:
      "Gluttony is an excessive and ongoing eating of food or drink.",
    verse:
      "For drunkards and gluttons become poor, and drowsiness clothes them in rags. - Proverbs 23:21",
    image: "/",
  },
  {
    id: 5,
    name: "Wrath",
    description: "Wrath is a strong anger and hate towards another person.",
    verse:
      "My dear brothers and sisters, take note of this: Everyone should be quick to listen, slow to speak and slow to become angry, because human anger does not produce the righteousness that God desires. - James 1:19-20",
    image: "/",
  },
  {
    id: 6,
    name: "Envy",
    description:
      "Envy is the intense desire to have an item that someone else possesses.",
    verse:
      "Therefore, rid yourselves of all malice and all deceit, hypocrisy, envy, and slander of every kind. Like newborn babies, crave pure spiritual milk, so that by it you may grow up in your salvation. - 1 Peter 2:1-2",
    image: "/",
  },
  {
    id: 6,
    name: "Greed",
    description: "Greed is an excessive pursuit of material goods.",
    verse:
      "Watch out! Be on your guard against all kinds of greed; life does not consist in an abundance of possessions. - Luke 12:15",
    image: "/",
  },
  {
    id: 7,
    name: "Sloth",
    description:
      "Sloth is an excessive laziness or the failure to act and utilize one’s talents.",
    verse:
      "Lazy hands make for poverty, but diligent hands bring wealth. - Proverbs 10:4",
    image: "/",
  },
];

async function generateImageRequest(prompt, index) {
  try {
    showSpinner();

    const response = await fetch("/openai/generateimage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      removeSpinner();
      throw new Error("That image could not be generated");
    }

    const data = await response.json();
    console.log(data.data[index]);

    const imageUrl = data.data[index];

    document.querySelector("#image").src = imageUrl;

    removeSpinner();
  } catch (error) {
    document.querySelector(".msg").textContent = error;
  }
}

function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}
function removeSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

// modal.addEventListener("click", generateImageRequest(prompt));

// const openModal = function () {
//   const modalImg = modal.querySelector(".modal-img");
//   const name = document.getElementById("name");
//   const verse = document.getElementById("verse");
//   const itemImg = this.querySelector("img");
//   const itemIndex = Array.from(items).indexOf(this);
//   const currentItem = itemsData[itemIndex];
//   modalImg.src = itemImg.src;
//   name.textContent = currentItem.name;
//   verse.textContent = currentItem.verse;
//   modal.classList.remove("hidden");
//   overlay.classList.remove("hidden");
// };

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

Array.from(items).forEach((item, index) => {
  const wrapper = item.querySelector(".item-wrapper");
  const closeModalBtn = document.querySelector(".btn-close");

  wrapper.addEventListener("click", () => {
    const name = document.getElementById("name");
    const verse = document.getElementById("verse");
    const itemImg = item.querySelector("img");
    const currentItem = itemsData[index];
    const prompt = currentItem.description;

    name.textContent = currentItem.name;
    verse.textContent = currentItem.verse;
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    generateImageRequest(prompt, index);
  });

  closeModalBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);
});
