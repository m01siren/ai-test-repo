// Данные десертов
const desserts = [
    { id: 1, name: "Клубничный торт", price: 450, emoji: "🍰" },
    { id: 2, name: "Шоколадный капкейк", price: 200, emoji: "🧁" },
    { id: 3, name: "Лимонный тарт", price: 350, emoji: "🥧" },
    { id: 4, name: "Черничный чизкейк", price: 400, emoji: "🫐" }
];

// Состояние корзины
let cart = [];

// DOM элементы
const dessertsGrid = document.getElementById('desserts-grid');
const cartItems = document.getElementById('cart-items');
const totalPriceEl = document.getElementById('total-price');
const orderForm = document.getElementById('order-form');
const successMessage = document.getElementById('success-message');

// Инициализация
function init() {
    renderDesserts();
    updateCartUI();
}

// Плавный скролл к десертам
window.scrollToDesserts = function() {
    document.getElementById('desserts').scrollIntoView({ behavior: 'smooth' });
}

// Отрисовка карточек десертов
function renderDesserts() {
    dessertsGrid.innerHTML = '';
    desserts.forEach(item => {
        const card = document.createElement('div');
        card.className = 'dessert-card';
        card.innerHTML = `
            <div class="dessert-img" style="background-color: #fce4ec">${item.emoji}</div>
            <h3 class="dessert-name">${item.name}</h3>
            <div class="dessert-price">${item.price} ₽</div>
            <button class="pixel-btn" onclick="addToCart(${item.id})">В корзину</button>
        `;
        dessertsGrid.appendChild(card);
    });
}

// Добавление в корзину
window.addToCart = function(id) {
    const dessert = desserts.find(d => d.id === id);
    if (dessert) {
        cart.push({ ...dessert, cartId: Date.now() + Math.random() });
        updateCartUI();
    }
}

// Удаление из корзины
window.removeFromCart = function(cartId) {
    cart = cart.filter(item => item.cartId !== cartId);
    updateCartUI();
}

// Обновление интерфейса корзины
function updateCartUI() {
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Корзина пуста</p>';
        totalPriceEl.textContent = '0';
        return;
    }

    let total = 0;
    cart.forEach(item => {
        total += item.price;
        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
            <span class="cart-item-name">${item.name}</span>
            <span class="cart-item-price">${item.price} ₽</span>
            <button class="delete-btn" onclick="removeFromCart(${item.cartId})">x</button>
        `;
        cartItems.appendChild(itemEl);
    });

    totalPriceEl.textContent = total;
}

// Обработка формы
orderForm.addEventListener('submit', function(e) {
    e.preventDefault();

    if (cart.length === 0) {
        alert('Пожалуйста, добавьте десерты в корзину перед оформлением заказа!');
        return;
    }

    // Показываем сообщение об успехе
    successMessage.classList.remove('hidden');
    orderForm.reset();

    // Очищаем корзину
    cart = [];
    updateCartUI();

    // Прячем сообщение через 5 секунд
    setTimeout(() => {
        successMessage.classList.add('hidden');
    }, 5000);
});

// Запуск при загрузке
init();