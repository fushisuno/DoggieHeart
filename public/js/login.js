document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const user_name_or_email = document.getElementById('user_name_or_email').value;
    const password = document.getElementById('password').value;

    console.log('Login attempt:', { user_name_or_email, password });

});