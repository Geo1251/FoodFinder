document.querySelector('.authorization__form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.querySelector('.authorization__form-input--username').value;
    const password = document.querySelector('.authorization__form-input--password').value;

    try {
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const data = await response.json();
            document.cookie = `token=${data.token}; path=/`;
            alert('Авторизация прошла успешно');
            window.location.href = '/frontend/Main.html';
        } else {
            const error = await response.json();
            alert('Ошибка: ' + error.message);
        }
    } catch (error) {
        alert('Ошибка: ' + error.message);
    }
});