let form = document.getElementById('form');
let firstname_input = document.getElementById('firstname-input');
let lastname_input = document.getElementById('lastname-input');
let email_input = document.getElementById('email-input');
let password_input = document.getElementById('password-input');
let repeat_password_input = document.getElementById('repeat-password');
let error_msg = document.getElementById('error-message');

form.addEventListener('submit', (e) => {
    let errors = [];

    if (firstname_input) {
        // If we have a firstname input, we are in the signup page
        errors = getSignupFormErrors(
            firstname_input.value,
            lastname_input.value,
            email_input.value,
            password_input.value,
            repeat_password_input.value
        );
    } else {
        // If we don't have the firstname input, we are in the login page
        errors = getLoginFormErrors(email_input.value, password_input.value);
    }

    if (errors.length > 0) {
        // Prevent form submission if there are errors
        e.preventDefault();
        error_msg.innerText = errors.join(". ");
    }
});

function getSignupFormErrors(firstname, lastname, email, password, repeatPassword) {
    let errors = [];

    if (!firstname || firstname.trim() === '') {
        errors.push('First Name is required');
        firstname_input.parentElement.classList.add('incorrect');
    }
    if (!lastname || lastname.trim() === '') {
        errors.push('Last Name is required');
        lastname_input.parentElement.classList.add('incorrect');
    }
    if (!email || email.trim() === '') {
        errors.push('Email is required');
        email_input.parentElement.classList.add('incorrect');
    }
    if (!password || password.trim() === '') {
        errors.push('Password is required');
        password_input.parentElement.classList.add('incorrect');
    }
    if (password.length < 8) {
        errors.push('Password must have at least 8 characters');
        password_input.parentElement.classList.add('incorrect');
    }
    if (password !== repeatPassword) {
        errors.push('Passwords does not match');
        password_input.parentElement.classList.add('incorrect');
        repeat_password_input.parentElement.classList.add('incorrect');
    }

    return errors;
}

function getLoginFormErrors(email, password) {
    let errors = [];

    if (!email || email.trim() === '') {
        errors.push('Email is required');
        email_input.parentElement.classList.add('incorrect');
    }
    if (!password || password.trim() === '') {
        errors.push('Password is required');
        password_input.parentElement.classList.add('incorrect');
    }

    return errors;
}

let allInputs = [firstname_input, lastname_input, email_input, password_input, repeat_password_input].filter(input => input);

allInputs.forEach(input => {
    input.addEventListener('input', () => {
        if (input.parentElement.classList.contains('incorrect')) {
            input.parentElement.classList.remove('incorrect');
            error_msg.innerText = '';
        }
    });
});
