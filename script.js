const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

// Toggle entre les formulaires
registerBtn.addEventListener('click', () => container.classList.add('active'));
loginBtn.addEventListener('click', () => container.classList.remove('active'));

// Afficher/masquer le mot de passe
document.querySelectorAll('.toggle-password').forEach(toggle => {
  toggle.addEventListener('click', () => {
    const input = toggle.previousElementSibling;
    if (input.type === 'password') {
      input.type = 'text';
      toggle.textContent = '🙈';
    } else {
      input.type = 'password';
      toggle.textContent = '👁️';
    }
  });
});

// Validation email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Afficher les erreurs
function showError(input, message) {
  const formControl = input.parentElement;
  const error = formControl.querySelector('.error') || document.createElement('small');
  error.className = 'error';
  error.textContent = message;
  formControl.appendChild(error);
  input.classList.add('error-border', 'shake');
  setTimeout(() => input.classList.remove('shake'), 400);
}

// Gestion des formulaires
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', function (e) {
    let isValid = true;

    // Reset des erreurs
    form.querySelectorAll('.error').forEach(el => el.remove());
    form.querySelectorAll('input').forEach(input => {
      input.style.borderColor = '#eee';
      input.classList.remove('error-border');
    });

    // Email
    const email = form.querySelector('input[type="email"]');
    if (!email.value.trim()) {
      showError(email, 'Email is required');
      isValid = false;
    } else if (!validateEmail(email.value.trim())) {
      showError(email, 'Invalid email format');
      isValid = false;
    }

    // Password
    const password = form.querySelector('input[type="password"]');
    if (!password.value.trim()) {
      showError(password, 'Password is required');
      isValid = false;
    } else if (password.value.length < 8) {
      showError(password, 'Minimum 8 characters');
      isValid = false;
    }

    if (!isValid) {
      e.preventDefault();
    } else {
      toggleLoader(true);
      setTimeout(() => toggleLoader(false), 2000);
    }
  });
});

// Loader
function toggleLoader(show) {
  const loader = document.getElementById('loader');
  loader.style.display = show ? 'flex' : 'none';
}

// Protection basique XSS
document.querySelectorAll('input').forEach(input => {
  input.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/</g, '<').replace(/>/g, '>');
  });
});
