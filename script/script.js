document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('name').value;
    const password = document.getElementById('pass').value;

    if (username === 'admin' && password === 'admin123') {

        window.location.href = 'index2.html';
    } else {
        alert('Invalid username or password!');
    }
});