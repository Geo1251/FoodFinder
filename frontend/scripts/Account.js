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

  const heightFactor = user.height / 100;  

  switch (user.goal) {
      case 'Сброс веса':
          proteins = user.weight * 1.5 * heightFactor;
          fats = user.weight * 0.8 * heightFactor;
          carbs = user.weight * 1.2 * heightFactor;
          calories = 1800;  
          break;
      case 'Поддержание веса':
          proteins = user.weight * 1.2 * heightFactor;
          fats = user.weight * 1 * heightFactor;
          carbs = user.weight * 2 * heightFactor;
          calories = 2000;  
          break;
      case 'Набор мышечной массы':
          proteins = user.weight * 2 * heightFactor;
          fats = user.weight * 1.2 * heightFactor;
          carbs = user.weight * 2.5 * heightFactor;
          calories = 2500;  
          break;
      case 'Рекомпозиция':
          proteins = user.weight * 2.2 * heightFactor;
          fats = user.weight * 1 * heightFactor;
          carbs = user.weight * 1.5 * heightFactor;
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

    const dateTotals = {};

    userProducts.forEach(userProduct => {
      const product = userProduct.Product;
      const quantity = userProduct.quantity;
      const mealType = userProduct.mealType;
      const date = new Date(userProduct.date).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });

      const productProteins = (product.proteins * quantity / 100).toFixed(1);
      const productFats = (product.fats * quantity / 100).toFixed(1);
      const productCarbs = (product.carbohydrates * quantity / 100).toFixed(1);
      const productCalories = (product.calories * quantity / 100).toFixed(1);

      if (!dateTotals[date]) {
        dateTotals[date] = { proteins: 0, fats: 0, carbs: 0, calories: 0 };
      }

      dateTotals[date].proteins += parseFloat(productProteins);
      dateTotals[date].fats += parseFloat(productFats);
      dateTotals[date].carbs += parseFloat(productCarbs);
      dateTotals[date].calories += parseFloat(productCalories);

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
        <p class="ration__product-info">Белки: ${productProteins} гр,</br> Жиры: ${productFats} гр,</br> Углеводы: ${productCarbs} гр,</br> Калории: ${productCalories} ккал</p>
      `;
      mealItem.querySelector('.user__ration-details-list').appendChild(productItem);
    });

    Object.keys(dateTotals).forEach(date => {
      const rationItem = rationList.querySelector(`.user__ration-list-item[data-date="${date}"]`);
      const totalResult = rationItem.querySelector('.user__ration-result');
      const totals = dateTotals[date];
      totalResult.innerHTML = `Итого: Белки: ${totals.proteins.toFixed(1)} гр, Жиры: ${totals.fats.toFixed(1)} гр, Углеводы: ${totals.carbs.toFixed(1)} гр, Калории: ${totals.calories.toFixed(1)} ккал`;
      updateRecommendedParams(totals.proteins, totals.fats, totals.carbs, totals.calories, totalResult);
    });

  } catch (error) {
    console.error('Error fetching user ration:', error);
    alert('Ошибка при получении рациона пользователя.');
  }
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
    Итого: Белки: ${totalProteins.toFixed(1)} гр <span style="color: ${proteinsDifferenceColor};">${proteinsDifferenceText}</span>, 
    Жиры: ${totalFats.toFixed(1)} гр <span style="color: ${fatsDifferenceColor};">${fatsDifferenceText}</span>, 
    Углеводы: ${totalCarbs.toFixed(1)} гр <span style="color: ${carbsDifferenceColor};">${carbsDifferenceText}</span>, 
    Калории: ${totalCalories.toFixed(1)} ккал <span style="color: ${caloriesDifferenceColor};">${caloriesDifferenceText}</span>
  `;
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
  const lastNameElement = document.querySelector('.user__lastname');
  const firstNameElement = document.querySelector('.user__name');
  const middleNameElement = document.querySelector('.user__otchestво');
  const birthYearElement = document.querySelector('.user__age');
  const weightElement = document.querySelector('.user__weight');
  const heightElement = document.querySelector('.user__height');
  const goalElement = document.getElementById('goal-text');

  return {
    lastName: lastNameElement ? lastNameElement.textContent : '',
    firstName: firstNameElement ? firstNameElement.textContent : '',
    middleName: middleNameElement ? middleNameElement.textContent : '',
    birthYear: birthYearElement ? birthYearElement.dataset.birthYear : '',
    weight: weightElement ? weightElement.textContent.split(' ')[0] : '',
    height: heightElement ? heightElement.textContent.split(' ')[0] : '',
    goal: goalElement ? goalElement.textContent : ''
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

const additionalButton = document.getElementById('additional-button');
const responseModal = document.getElementById('response-modal');
const responseText = document.getElementById('response-text');
const responseCloseButton = document.getElementById('response-close-button');

additionalButton.addEventListener('click', async () => {
  await getRecommendations();
});

async function getRecommendations() {
  const user = getUserInfo();
  const recommendedProteins = document.getElementById('recommended-proteins').textContent;
  const recommendedFats = document.getElementById('recommended-fats').textContent;
  const recommendedCarbs = document.getElementById('recommended-carbs').textContent;
  const recommendedCalories = document.getElementById('recommended-calories').textContent;

  const rationList = document.querySelectorAll('.user__ration-list .user__ration-details-list-item');
  const rationData = Array.from(rationList).map(item => {
    const product = item.querySelector('.ration__product').textContent;
    const info = item.querySelector('.ration__product-info').textContent;
    return { product, info };
  });

  const prompt = {
    prompt: `Посоветуй мне еще продукты, чтобы достичь своей ежедневной нормы с учетом моей цели. 
    Цель: ${user.goal}, 
    Рекомендуемые параметры: Белки: ${recommendedProteins} гр, Жиры: ${recommendedFats} гр, Углеводы: ${recommendedCarbs} гр, Калории: ${recommendedCalories} ккал. 
    Ежедневный рацион: ${rationData.map(item => `${item.product} (${item.info})`).join(', ')}`
  };

  try {
    const response = await fetch('http://95.163.152.133:16384/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(prompt)
    });

    if (!response.ok) {
      throw new Error('Failed to get response from neural network');
    }

    const data = await response.json();
    showResponseModal(formatResponse(data.story));
  } catch (error) {
    console.error('Error fetching neural network response:', error);
    showResponseModal('Ошибка при получении ответа от нейросети.');
  }
}

function formatResponse(response) {
  // Пример форматирования текста
  return response
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Жирный текст
    .replace(/\*(.*?)\*/g, '<em>$1</em>') // Курсив
    .replace(/\n/g, '<br>') // Перенос строки
    .replace(/- /g, '<li>') // Список
    .replace(/(\d+\.\d+)/g, '<span style="color: green;">$1</span>'); // Числа зеленым цветом
}

function showResponseModal(message) {
  responseText.innerHTML = message;
  responseModal.style.display = 'block';
}

responseCloseButton.addEventListener('click', () => {
  responseModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === responseModal) {
    responseModal.style.display = 'none';
  }
});