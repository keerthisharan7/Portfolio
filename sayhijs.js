const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Message sent! I will get back to you soon.');
    contactForm.reset();
  });
}

const nameInput = document.querySelector('.contact-form input[type="text"]');

nameInput.addEventListener('input', () => {
  const nameValue = nameInput.value.trim();

  const isValid = /^[A-Za-z]+(?: [A-Za-z]+)*$/.test(nameValue) && nameValue.length >= 1;

  // Remove red if valid
  if (isValid || nameValue === "") {
    nameInput.classList.remove('invalid');
  } 
  // Only trigger shake when it just became invalid
  else if (!nameInput.classList.contains('invalid')) {
    nameInput.classList.add('invalid');

    // Trigger shake once
    nameInput.classList.add('shake');
    setTimeout(() => {
      nameInput.classList.remove('shake');
    }, 400);
  }
});
