const dimmer = document.getElementById('dimmerSlider');
const root = document.documentElement; 
const formContainer = document.getElementById('formContainer');

// --- MOCK DATABASE (PERSISTENCE) ---
// Loads data from localStorage on page load. If no data exists, it starts with an empty array.
let mockUserDatabase = JSON.parse(localStorage.getItem('authMockDB')) || []; 

/**
 * Saves the current state of the mockUserDatabase array to the browser's localStorage.
 */
function saveDatabaseToStorage() {
    localStorage.setItem('authMockDB', JSON.stringify(mockUserDatabase));
}

// Regular Expressions
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,6}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// ------------------------------------------------
// UI/HELPER FUNCTIONS
// ------------------------------------------------
function updateLight() {
    const sliderValue = dimmer.value; 
    const intensity = (sliderValue / 100) * 0.95 + 0.05; 
    root.style.setProperty('--light-intensity', intensity);
}

function showRegister() {
    formContainer.classList.add('show-register');
}

function showLogin() {
    formContainer.classList.remove('show-register');
}

/**
 * Displays an error message and adds temporary visual border feedback.
 */
function displayError(formId, message) {
    const errorContainer = document.getElementById(formId);
    errorContainer.textContent = message;
    
    const formSelector = formId === 'login-errors' ? '.login-form' : '.register-form';
    const formElement = document.querySelector(formSelector);

    if (message) {
        formElement.style.border = '1px solid #FF6666';
        setTimeout(() => {
            formElement.style.border = '1px solid rgba(255, 255, 255, 0.1)';
        }, 1500);
    }
}

/**
 * Clears all input fields for a specified form.
 */
function clearForm(type) {
    if (type === 'login') {
        document.getElementById('login-email').value = '';
        document.getElementById('login-password').value = '';
    } else if (type === 'register') {
        document.getElementById('reg-name').value = ''; 
        document.getElementById('reg-email').value = '';
        document.getElementById('reg-password').value = '';
        document.getElementById('reg-confirm-password').value = ''; 
    }
}

/**
 * Handles Forgot Password flow with strict email validation and existence check.
 */
function handleForgotPasswordClick() {
    const emailInput = document.getElementById('login-email');
    const email = emailInput.value.trim();

    if (!email) {
        alert("Please enter your registered email address into the field above, then click 'Forgot Password?'");
        emailInput.focus();
        return;
    }

    // 1. Strict Email Format Check
    if (!emailRegex.test(email)) {
        alert('Invalid email format. Please enter a valid and complete email address.');
        emailInput.focus();
        return;
    }

    // 2. Mock Database Existence Check
    if (!mockUserDatabase.find(u => u.email === email)) {
        alert('Email address does not exist. Please check the email you registered with.');
        emailInput.focus();
        return;
    }

    // Success: Conceptual server-side trigger
    alert(`Password reset link process initiated. A conceptual email has been sent to ${email}. Check your inbox to continue.`);
}

// ------------------------------------------------
// LOGIN VALIDATION & MOCK AUTHENTICATION
// ------------------------------------------------
function handleLogin(event) {
    event.preventDefault();
    displayError('login-errors', ''); 

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        displayError('login-errors', 'Please enter both email and password.');
        return;
    }
    
    // Authentication: Checks against the persistent database (localStorage)
    const user = mockUserDatabase.find(u => u.email === email && u.password === password);

    if (user) {
        alert(`Login successful! Welcome ${user.name || user.email}. Redirecting to dashboard...`);
        clearForm('login'); 
    } else {
        displayError('login-errors', 'Invalid email or password.');
    }
}

// ------------------------------------------------
// REGISTER VALIDATION & MOCK REGISTRATION
// ------------------------------------------------
function handleRegister(event) {
    event.preventDefault();
    displayError('register-errors', ''); 

    const name = document.getElementById('reg-name').value.trim();
    const emailInput = document.getElementById('reg-email');
    const passwordInput = document.getElementById('reg-password');
    const confirmPasswordInput = document.getElementById('reg-confirm-password');
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    // 1. Basic check for Name
    if (!name) {
        displayError('register-errors', 'Please enter your full name.');
        document.getElementById('reg-name').focus();
        return;
    }

    // 2. Strict Email Format Validation
    if (!emailRegex.test(email)) {
        displayError('register-errors', 'Invalid email format. Must be user@domain.com (min 3-char domain end, e.g., .com, .org, .net).');
        emailInput.focus();
        return;
    }

    // 3. Mock Server Check: Email Uniqueness
    if (mockUserDatabase.find(u => u.email === email)) {
        displayError('register-errors', 'This email address is already registered.');
        emailInput.focus();
        return;
    }

    // 4. Strong Password Complexity Validation 
    if (!passwordRegex.test(password)) {
        displayError('register-errors', 'Password must be 8+ chars and include: 1 Uppercase, 1 Lowercase, 1 Number, and 1 Special Symbol.');
        passwordInput.focus();
        return;
    }
    
    // 5. Password Match Validation
    if (password !== confirmPassword) {
        displayError('register-errors', 'Password and Confirm Password must match.');
        confirmPasswordInput.focus();
        return;
    }

    // 6. Mock Registration Success: Store user and transition
    mockUserDatabase.push({
        name: name,
        email: email,
        password: password 
    });
    
    // SAVE to localStorage to ensure persistence
    saveDatabaseToStorage(); 

    alert('Registration successful! You can now log in with your new credentials.');
    clearForm('register'); 
    displayError('register-errors', ''); 
    showLogin(); 
}

// Initialize light control
dimmer.addEventListener('input', updateLight);
updateLight();

/**
 * Toggles the visibility of a password field and updates the icon.
 * @param {string} inputId - The ID of the password input field.
 * @param {HTMLElement} element - The clicked span element (the eye icon).
 */
function togglePasswordVisibility(inputId, element) {
    const input = document.getElementById(inputId);
    
    if (input.type === 'password') {
        input.type = 'text';
        element.textContent = '🙈'; // Change icon to closed eye
    } else {
        input.type = 'password';
        element.textContent = '👁️'; // Change icon to open eye
    }
}
