let userData; 

document.addEventListener('DOMContentLoaded', async () => {
    const token = getCookie('token');
    console.log(token);
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
        userData = data.user; 
        console.log('User verified:', userData);

        const userAvatar = document.querySelector('.user__image');
        userAvatar.src = userData.avatar ? `../backend/static/${userData.avatar}` : './images/default-avatar.png';

        try {
            const productsResponse = await fetch('http://localhost:5000/api/products', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!productsResponse.ok) {
                const errorText = await productsResponse.text();
                console.error('Failed to fetch products:', errorText); 
                throw new Error('Failed to fetch products');
            }

            const products = await productsResponse.json();
            displayProducts(products);
        } catch (productError) {
            console.error('Error fetching products:', productError);
            alert('Ошибка при получении продуктов.');
        }
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

function displayProducts(products) {
    const productsList = document.querySelector('.products__list');
    productsList.innerHTML = '';

    products.forEach(product => {
        const productItem = document.createElement('li');
        productItem.classList.add('products__list-item');

        const productTitle = document.createElement('p');
        productTitle.classList.add('product-title');
        productTitle.textContent = product.name;

        const productInfo = document.createElement('div');
        productInfo.classList.add('product-info');

        const productProtein = document.createElement('p');
        productProtein.classList.add('product-protein');
        productProtein.textContent = `Белки: ${product.proteins} гр`;

        const productFats = document.createElement('p');
        productFats.classList.add('product-fats');
        productFats.textContent = `Жиры: ${product.fats} гр`;

        const productCarb = document.createElement('p');
        productCarb.classList.add('product-carb');
        productCarb.textContent = `Углеводы: ${product.carbohydrates} гр`;

        const productCalories = document.createElement('p');
        productCalories.classList.add('product-calories');
        productCalories.textContent = `Калории: ${product.calories} ккал`;

        productInfo.appendChild(productProtein);
        productInfo.appendChild(productFats);
        productInfo.appendChild(productCarb);
        productInfo.appendChild(productCalories);

        productItem.appendChild(productTitle);
        productItem.appendChild(productInfo);

        productsList.appendChild(productItem);
    });
}

const modal = document.getElementById('modal');
const addButton = document.getElementById('add-button');
const closeButton = document.getElementById('close-button');

addButton.addEventListener('click', () => {
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

const addProductForm = document.getElementById('add-product-form');
addProductForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const token = getCookie('token');
    const formData = new FormData(addProductForm);

    const productData = {
        name: formData.get('product-name'),
        proteins: parseFloat(formData.get('product-proteins')),
        fats: parseFloat(formData.get('product-fats')),
        carbohydrates: parseFloat(formData.get('product-carbs')),
        calories: parseFloat(formData.get('product-calories'))
    };

    const userProductData = {
        quantity: parseFloat(formData.get('product-portion')),
        mealType: formData.get('meal-type')
    };

    try {
        const productResponse = await fetch('http://localhost:5000/api/products', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });

        if (!productResponse.ok) {
            throw new Error('Failed to add product');
        }

        const product = await productResponse.json();

        const userProductResponse = await fetch(`http://localhost:5000/api/user-products/${userData.id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...userProductData,
                productId: product.id
            })
        });

        if (!userProductResponse.ok) {
            throw new Error('Failed to add user product');
        }

        const userProduct = await userProductResponse.json();

        const productsResponse = await fetch('http://localhost:5000/api/products', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!productsResponse.ok) {
            const errorText = await productsResponse.text();
            console.error('Failed to fetch products:', errorText); 
            throw new Error('Failed to fetch products');
        }

        const products = await productsResponse.json();
        displayProducts(products); 
        modal.style.display = 'none';
    } catch (error) {
        console.error('Error adding product:', error);
        alert('Ошибка при добавлении продукта.');
    }
});