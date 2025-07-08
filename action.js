// --- Experience Duration Logic ---
const staticElement = document.getElementById("static-experience");
const dynamicElement = document.getElementById("dynamic-experience");

const startDate = new Date("2019-08-14");
let toggleIndex = 0;

function calculateExperience() {
  const now = new Date();
  const diffInMs = now - startDate;

  const seconds = Math.floor(diffInMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  let totalMonths = (now.getFullYear() - startDate.getFullYear()) * 12 +
                    (now.getMonth() - startDate.getMonth());
  const tempDate = new Date(startDate);
  tempDate.setMonth(tempDate.getMonth() + totalMonths);
  if (now < tempDate) {
    totalMonths--;
    tempDate.setMonth(tempDate.getMonth() - 1);
  }

  const remainingDays = Math.floor((now - tempDate) / (1000 * 60 * 60 * 24));
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  return {
    years,
    months,
    days,
    weeks,
    hours,
    minutes,
    seconds,
    totalMonths,
    remainingDays
  };
}

function updateDisplay() {
  const {
    years,
    months,
    days,
    weeks,
    hours,
    minutes,
    seconds,
    totalMonths,
    remainingDays
  } = calculateExperience();

  staticElement.textContent = `${years} years ${months} months ${remainingDays} days`;

  const formats = [
    `${totalMonths} months ${remainingDays} days`,
    `${weeks} weeks`,
    `${days} days`,
    `${hours} hours`,
    `${minutes} minutes`,
    `${seconds} seconds`
  ];

  dynamicElement.textContent = formats[toggleIndex % formats.length];
}

dynamicElement.addEventListener("click", () => {
  toggleIndex++;
  updateDisplay();
});

setInterval(() => {
  if (toggleIndex % 6 === 5) updateDisplay();
}, 1000);

updateDisplay();


// --- Profile Tilt and Shine Logic ---
const photo = document.querySelector('.photo-placeholder');

photo.addEventListener('mousemove', (e) => {
  const rect = photo.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = -(y - centerY) / 5;
  const rotateY = (x - centerX) / 5;

  photo.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  photo.style.setProperty('--shine-x', `${x}px`);
  photo.style.setProperty('--shine-y', `${y}px`);
  photo.style.setProperty('--shine-opacity', '1');
  photo.classList.add('shining');
});

photo.addEventListener('mouseleave', () => {
  photo.style.transform = 'rotateX(0deg) rotateY(0deg)';
  photo.classList.remove('shining');
});


// --- Typing Animation ---
const typedText = document.getElementById("typed-text");

const roles = ["Software Developer", "Writer", "Novice Photographer"];
let roleIndex = 0;
let charIndex = 0;
let typing = true;

function typeLoop() {
  const currentRole = roles[roleIndex];

  if (typing) {
    if (charIndex <= currentRole.length) {
      typedText.textContent = currentRole.substring(0, charIndex);
      charIndex++;
    } else {
      typing = false;
      setTimeout(typeLoop, 800); // Pause before deleting
      return;
    }
  } else {
    if (charIndex >= 0) {
      typedText.textContent = currentRole.substring(0, charIndex);
      charIndex--;
    } else {
      typing = true;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeLoop, typing ? 60 : 30); // Typing vs deleting speed
}

typeLoop(); 

// const dot = document.getElementById("glow-dot");
// const reveal = document.getElementById("reveal-text");

// dot.addEventListener("click", () => {
//   dot.style.display = "none";
//   reveal.classList.remove("hidden");
// });


