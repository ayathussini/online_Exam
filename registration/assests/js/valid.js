document.getElementById('regform').onsubmit = function (event) {
    event.preventDefault(); // Prevent the form from submitting

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorElement = document.getElementById('error');

    // Validation functions
    function checkname(input) {
        var regname = /^[A-Z][a-z]{1,} [A-Z][a-z]{1,}$/;
        return regname.test(input);
    }
    function checkage(input) {
        var regage = /^[1-9]{2}$/;
        return regage.test(input);
    }
    function checkemail(input) {
        var regemail = /^[a-z][a-zA-Z0-9]+@[a-z]{3,}\.(com|edu|eg)$/;
        return regemail.test(input);
    }
    function checkphone(input) {
        var regphone = /^(011|010|015|012)[0-9]{8}$/;
        return regphone.test(input);
    }
    function checkpassword(input) {
        var regpass = /^[a-zA-Z0-9]{8,15}$/;
        return regpass.test(input);
    }

    // Validate inputs
    if (!checkname(name)) {
        errorElement.innerText = "Please enter a valid name.";
        return;
    }
    if (!checkage(age)) {
        errorElement.innerText = "Please enter a valid age.";
        return;
    }
    if (!checkemail(email)) {
        errorElement.innerText = "Please enter a valid email.";
        return;
    }
    if (!checkphone(phone)) {
        errorElement.innerText = "Please enter a valid phone number.";
        return;
    }
    if (!checkpassword(password)) {
        errorElement.innerText = "Please enter a valid password.";
        return;
    }
    if (password !== confirmPassword) {
        errorElement.innerText = "Passwords do not match.";
        return;
    }

    const user = {
        name,
        age,
        email,
        phone,
        password
    };

    localStorage.setItem('user', JSON.stringify(user));
    alert('تم التسجيل بنجاح!');
    window.location.href = 'log/loginn.html';
};