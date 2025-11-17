const texts = [
  " are you trying to create?",
  " are you planning to work on?",
  " would you like to explore?",
  " are you looking for?"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const heroText = document.getElementById("hero-text");
const staticText = "What open-source project";

function type() {
  const currentText = texts[textIndex];
  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  heroText.textContent = staticText + currentText.substring(0, charIndex);

  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    setTimeout(type, 1000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    setTimeout(type, 250);
  } else {
    setTimeout(type, isDeleting ? 50 : 100);
  }
}

type();
