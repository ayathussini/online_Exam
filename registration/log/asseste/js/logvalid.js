document.getElementById('loginform').onsubmit = function (event) {
    event.preventDefault(); // Prevent the form from submitting

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.email === email && user.password === password) {
        alert('تسجيل الدخول ناجح!');
        window.location.href = 'onlineExam/quiz.html';
    } else {
        alert('الإيميل أو كلمة المرور غير صحيحة!');
    }
};