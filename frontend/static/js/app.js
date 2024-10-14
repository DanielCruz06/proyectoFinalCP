document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');
    const loadProductsBtn = document.getElementById('load-products-btn');
    const productsList = document.getElementById('products-list');
    const addProductForm = document.getElementById('add-product-form');
    const createOrderForm = document.getElementById('create-order-form');
    const ordersList = document.getElementById('orders-list');
    
    let token = '';

    // Autenticación
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const response = await fetch('/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        if (response.ok) {
            token = data.token;
            loginMessage.textContent = 'Autenticado con éxito';
        } else {
            loginMessage.textContent = 'Error de autenticación';
        }
    });

    // Cargar productos
    loadProductsBtn.addEventListener('click', async () => {
        const response = await fetch('/products', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const products = await response.json();

        productsList.innerHTML = '';
        products.forEach(product => {
            const li = document.createElement('li');
            li.textContent = `${product.name} - $${product.price}`;
            productsList.appendChild(li);
        });
    });

    // Agregar producto
    addProductForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('product-name').value;
        const price = document.getElementById('product-price').value;

        const response = await fetch('/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name, price })
        });

        if (response.ok) {
            loadProductsBtn.click();  // Recargar productos
        }
    });

    // Crear orden
    createOrderForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const userId = document.getElementById('user-id').value;
        const productIds = document.getElementById('product-ids').value.split(',');

        const response = await fetch('/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ user_id: userId, products: productIds })
        });

        if (response.ok) {
            const data = await response.json();
            const li = document.createElement('li');
            li.textContent = `Orden creada con ID ${data.id}`;
            ordersList.appendChild(li);
        }
    });
});
