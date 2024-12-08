document.addEventListener('DOMContentLoaded', async () => {
  const token = getCookie('token');
  if (!token) {
      alert('Вы не авторизованы. Пожалуйста, войдите в систему.');
      window.location.href = '/frontend/SignIn.html';
      return;
  }

  try {
      const response = await fetch('http://localhost:5000/api/verify-token', {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });

      if (!response.ok) {
          throw new Error('Token verification failed');
      }

      const data = await response.json();
      console.log('User verified:', data.user);

      displayUserInfo(data.user);
      calculateRecommendedParams(data.user);
      await displayUserRation(data.user.id);
  } catch (error) {
      console.error(error);
      alert('Ошибка проверки токена. Пожалуйста, войдите в систему.');
      window.location.href = '/frontend/SignIn.html';
  }
});

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function displayUserInfo(user) {
  document.querySelector('.user__lastname').textContent = user.lastName || 'Фамилия';
  document.querySelector('.user__name').textContent = user.firstName || 'Имя';
  document.querySelector('.user__otchestvo').textContent = user.middleName || 'Отчество';
  const birthYearElement = document.querySelector('.user__age');
  birthYearElement.textContent = user.birthYear ? `${new Date().getFullYear() - new Date(user.birthYear).getFullYear()} лет` : 'Возраст';
  birthYearElement.dataset.birthYear = user.birthYear; 
  document.querySelector('.user__weight').textContent = user.weight ? `${user.weight} кг` : 'Вес';
  document.querySelector('.user__height').textContent = user.height ? `${user.height} см` : 'Рост';
  document.querySelector('.user__image').src = user.avatar ? `../backend/static/${user.avatar}` : './images/default-avatar.png';
  document.getElementById('goal-text').textContent = user.goal || 'Не определена';
}

function calculateRecommendedParams(user) {
  let proteins, fats, carbs, calories;

  switch (user.goal) {
    case 'Сброс веса':
      proteins = user.weight * 1.5;
      fats = user.weight * 0.8;
      carbs = user.weight * 1.2;
      calories = 1800;
      break;
    case 'Поддержание веса':
      proteins = user.weight * 1.2;
      fats = user.weight * 1;
      carbs = user.weight * 2;
      calories = 2000;
      break;
    case 'Набор мышечной массы':
      proteins = user.weight * 2;
      fats = user.weight * 1.2;
      carbs = user.weight * 2.5;
      calories = 2500;
      break;
    case 'Рекомпозиция':
      proteins = user.weight * 2.2;
      fats = user.weight * 1;
      carbs = user.weight * 1.5;
      calories = 2200;
      break;
    default:
      proteins = 0;
      fats = 0;
      carbs = 0;
      calories = 0;
  }

  document.getElementById('recommended-proteins').textContent = proteins.toFixed(1);
  document.getElementById('recommended-fats').textContent = fats.toFixed(1);
  document.getElementById('recommended-carbs').textContent = carbs.toFixed(1);
  document.getElementById('recommended-calories').textContent = calories;
}

async function displayUserRation(userId) {
  const token = getCookie('token');
  try {
    const response = await fetch(`http://localhost:5000/api/user-products/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user ration');
    }

    const userProducts = await response.json();
    const rationList = document.querySelector('.user__ration-list');
    rationList.innerHTML = '';

    let totalProteins = 0, totalFats = 0, totalCarbs = 0, totalCalories = 0;

    userProducts.forEach(userProduct => {
      const product = userProduct.Product;
      const quantity = userProduct.quantity;
      const mealType = userProduct.mealType;
      const date = new Date(userProduct.date).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });

      const productProteins = (product.proteins * quantity / 100).toFixed(1);
      const productFats = (product.fats * quantity / 100).toFixed(1);
      const productCarbs = (product.carbohydrates * quantity / 100).toFixed(1);
      const productCalories = (product.calories * quantity / 100).toFixed(1);

      totalProteins += parseFloat(productProteins);
      totalFats += parseFloat(productFats);
      totalCarbs += parseFloat(productCarbs);
      totalCalories += parseFloat(productCalories);

      let rationItem = rationList.querySelector(`.user__ration-list-item[data-date="${date}"]`);
      if (!rationItem) {
        rationItem = document.createElement('li');
        rationItem.classList.add('user__ration-list-item');
        rationItem.dataset.date = date;
        rationItem.innerHTML = `
          <p class="user__ration-date">${capitalizeFirstLetter(date)}</p>
          <ul class="user__ration-info-list"></ul>
          <p class="user__ration-result"></p>
        `;
        rationList.appendChild(rationItem);
      }

      let mealItem = rationItem.querySelector(`.user__ration-info-list-item[data-meal-type="${mealType}"]`);
      if (!mealItem) {
        mealItem = document.createElement('li');
        mealItem.classList.add('user__ration-info-list-item');
        mealItem.dataset.mealType = mealType;
        mealItem.innerHTML = `
          <p class="user__ration-daytime">${mealType}</p>
          <ul class="user__ration-details-list"></ul>
        `;
        rationItem.querySelector('.user__ration-info-list').appendChild(mealItem);
      }

      const productItem = document.createElement('li');
      productItem.classList.add('user__ration-details-list-item');
      productItem.innerHTML = `
        <p class="ration__product">${product.name}</p>
        <p class="ration__product-info">Белки: ${productProteins}гр, Жиры: ${productFats}гр, Углеводы: ${productCarbs}гр, Калории: ${productCalories} ккал</p>
      `;
      mealItem.querySelector('.user__ration-details-list').appendChild(productItem);
    });

    rationList.querySelectorAll('.user__ration-list-item').forEach(rationItem => {
      const totalResult = rationItem.querySelector('.user__ration-result');
      totalResult.innerHTML = `Итого: Белки: ${totalProteins.toFixed(1)}гр, Жиры: ${totalFats.toFixed(1)}гр, Углеводы: ${totalCarbs.toFixed(1)}гр, Калории: ${totalCalories.toFixed(1)} ккал`;
      updateRecommendedParams(totalProteins, totalFats, totalCarbs, totalCalories, totalResult);
    });

  } catch (error) {
    console.error('Error fetching user ration:', error);
    alert('Ошибка при получении рациона пользователя.');
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function updateRecommendedParams(totalProteins, totalFats, totalCarbs, totalCalories, totalResult) {
  const recommendedProteins = parseFloat(document.getElementById('recommended-proteins').textContent);
  const recommendedFats = parseFloat(document.getElementById('recommended-fats').textContent);
  const recommendedCarbs = parseFloat(document.getElementById('recommended-carbs').textContent);
  const recommendedCalories = parseFloat(document.getElementById('recommended-calories').textContent);

  const proteinsDifference = totalProteins - recommendedProteins;
  const fatsDifference = totalFats - recommendedFats;
  const carbsDifference = totalCarbs - recommendedCarbs;
  const caloriesDifference = totalCalories - recommendedCalories;

  const proteinsDifferenceText = proteinsDifference > 0 ? `(+${proteinsDifference.toFixed(1)})` : `(${proteinsDifference.toFixed(1)})`;
  const fatsDifferenceText = fatsDifference > 0 ? `(+${fatsDifference.toFixed(1)})` : `(${fatsDifference.toFixed(1)})`;
  const carbsDifferenceText = carbsDifference > 0 ? `(+${carbsDifference.toFixed(1)})` : `(${carbsDifference.toFixed(1)})`;
  const caloriesDifferenceText = caloriesDifference > 0 ? `(+${caloriesDifference.toFixed(1)})` : `(${caloriesDifference.toFixed(1)})`;

  const proteinsDifferenceColor = proteinsDifference > 0 ? 'green' : 'red';
  const fatsDifferenceColor = fatsDifference > 0 ? 'green' : 'red';
  const carbsDifferenceColor = carbsDifference > 0 ? 'green' : 'red';
  const caloriesDifferenceColor = caloriesDifference > 0 ? 'green' : 'red';

  totalResult.innerHTML = `
    Итого: Белки: ${totalProteins.toFixed(1)}гр <span style="color: ${proteinsDifferenceColor};">${proteinsDifferenceText}</span>, 
    Жиры: ${totalFats.toFixed(1)}гр <span style="color: ${fatsDifferenceColor};">${fatsDifferenceText}</span>, 
    Углеводы: ${totalCarbs.toFixed(1)}гр <span style="color: ${carbsDifferenceColor};">${carbsDifferenceText}</span>, 
    Калории: ${totalCalories.toFixed(1)} ккал <span style="color: ${caloriesDifferenceColor};">${caloriesDifferenceText}</span>
  `;
}

const modal = document.getElementById('modal');
const editButton = document.getElementById('edit-button');
const closeButton = document.getElementById('close-button');

editButton.addEventListener('click', () => {
  const user = getUserInfo(); 
  fillEditForm(user); 
  modal.style.display = 'block';
});

closeButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

const editForm = document.getElementById('edit-form');
editForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const token = getCookie('token');
  const formData = new FormData(editForm);
  const userId = getUserIdFromToken(token); 
  try {
    const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error('Failed to update user info');
    }

    const data = await response.json();
    displayUserInfo(data);
    calculateRecommendedParams(data);
    modal.style.display = 'none';
  } catch (error) {
    console.error(error);
    alert('Ошибка обновления информации пользователя');
  }
});

const avatarInput = document.getElementById('avatar-input');
avatarInput.addEventListener('change', async (event) => {
  const token = getCookie('token');
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append('avatar', file);
  const userId = getUserIdFromToken(token); 

  try {
    const response = await fetch(`http://localhost:5000/api/users/${userId}/avatar`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error('Failed to update avatar');
    }

    const data = await response.json();
    document.querySelector('.user__image').src = data.avatar ? `../backend/static/${data.avatar}` : './images/default-avatar.png';
  } catch (error) {
    console.error(error);
    alert('Ошибка обновления аватарки');
  }
});

function getUserIdFromToken(token) {
  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload.id;
}

function getUserInfo() {
  return {
    lastName: document.querySelector('.user__lastname').textContent,
    firstName: document.querySelector('.user__name').textContent,
    middleName: document.querySelector('.user__otchestво').textContent,
    birthYear: document.querySelector('.user__age').dataset.birthYear,
    weight: document.querySelector('.user__weight').textContent.split(' ')[0],
    height: document.querySelector('.user__height').textContent.split(' ')[0],
    goal: document.getElementById('goal-text').textContent
  };
}

function fillEditForm(user) {
  document.getElementById('lastName').value = user.lastName;
  document.getElementById('firstName').value = user.firstName;
  document.getElementById('middleName').value = user.middleName;
  document.getElementById('birthYear').value = user.birthYear;
  document.getElementById('weight').value = user.weight;
  document.getElementById('height').value = user.height;
  document.getElementById('goal').value = user.goal;
}

const exitButton = document.getElementById('exit-button');
exitButton.addEventListener('click', () => {
  document.cookie = 'token=; Max-Age=0; path=/'; 
  window.location.href = '/frontend/SignIn.html'; 
});