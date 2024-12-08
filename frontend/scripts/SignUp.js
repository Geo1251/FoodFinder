document.querySelector('.registration__form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.querySelector('.registration__form-input--username').value;
  const password = document.querySelector('.registration__form-input--password').value;
  const confirmPassword = document.querySelector('.registration__form-input--confirm-password').value;

  if (password !== confirmPassword) {
      alert('Пароли не совпадают');
      return;
  }

  try {
      const response = await fetch('http://localhost:5000/api/register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
      });

      if (response.ok) {
          alert('Регистрация прошла успешно');
          window.location.href = '/frontend/SignIn.html';
      } else {
          const error = await response.json();
          alert('Ошибка: ' + error.message);
      }
  } catch (error) {
      alert('Ошибка: ' + error.message);
  }
});