const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

// Toggle entre les formulaires
registerBtn.addEventListener('click', () => container.classList.add('active'));
loginBtn.addEventListener('click', () => container.classList.remove('active'));

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

// Gestionnaire de formulaire
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        let isValid = true;
        
        // Reset des erreurs
        form.querySelectorAll('.error').forEach(el => el.remove());
        form.querySelectorAll('input').forEach(input => {
            input.style.borderColor = '#eee';
            input.classList.remove('error-border');
        });

        // Validation Email
        const email = form.querySelector('input[type="email"]');
        if (!email.value.trim()) {
            showError(email, 'Email is required');
            isValid = false;
        } else if (!validateEmail(email.value.trim())) {
            showError(email, 'Invalid email format');
            isValid = false;
        }

        // Validation Password
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
            // Loader si validation OK
            toggleLoader(true);
            setTimeout(() => toggleLoader(false), 2000); // À remplacer par ton appel API
        }
    });
});

// Loader
function toggleLoader(show) {
    const loader = document.getElementById('loader') || document.createElement('div');
    loader.id = 'loader';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255,255,255,0.7);
        display: ${show ? 'flex' : 'none'};
        justify-content: center;
        align-items: center;
        z-index: 9999;
    `;
    if (show) loader.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loader);
}

// Afficher/masquer le mot de passe
document.querySelectorAll('input[type="password"]').forEach(input => {
    const toggle = document.createElement('span');
    toggle.innerHTML = '👁️';
    toggle.style.cssText = 'cursor:pointer;margin-left:-25px;user-select:none;';
    toggle.addEventListener('click', () => {
        input.type = input.type === 'password' ? 'text' : 'password';
    });
    input.parentNode.appendChild(toggle);
});

// Protection contre l'injection
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/</g, '<').replace(/>/g, '>');
    });
});






async function loginUser(email, password) {
    try {
        const response = await fetch('https://ton-api.com/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (data.success) {
            window.location.href = '/dashboard';
        }
    } catch (error) {
        console.error("Erreur :", error);
    }
}