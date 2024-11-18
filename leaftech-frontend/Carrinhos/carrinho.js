function showCartItems() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalDiv = document.getElementById('cart-total');
    const sales = JSON.parse(localStorage.getItem('vendas')) || [];

    if (sales.length === 0) {
        cartItemsDiv.innerHTML = "<p>O carrinho está vazio.</p>";
        cartTotalDiv.innerHTML = "";
        return;
    }

    let total = 0;

    sales.forEach((sale, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <h3>${sale.item}</h3>
            <p>R$ ${sale.price.toFixed(2)}</p>
            <button onclick="removeItem(${index})">Remover</button>
        `;
        cartItemsDiv.appendChild(itemDiv);
        total += sale.price;
    });

    cartTotalDiv.innerHTML = `<h3>Total: R$ ${total.toFixed(2)}</h3>`;
}

function removeItem(index) {
    let sales = JSON.parse(localStorage.getItem('vendas')) || [];
    sales.splice(index, 1);
    localStorage.setItem('vendas', JSON.stringify(sales));
    location.reload();
}

function finalizeOrder() {
    const paymentMethod = document.getElementById('payment-method').value;
    const sales = JSON.parse(localStorage.getItem('vendas')) || [];

    if (sales.length === 0) {
        alert("O carrinho está vazio!");
        return;
    }

    const totalOrderValue = sales.reduce((acc, item) => acc + item.price, 0);

    const purchaseData = {
        items: sales,
        paymentMethod: paymentMethod,
        date: new Date()
    };

    let allSales = JSON.parse(localStorage.getItem('todasVendas')) || [];
    allSales.push(purchaseData);

    localStorage.setItem('todasVendas', JSON.stringify(allSales));

    let totalRevenue = JSON.parse(localStorage.getItem('totalRevenue')) || 0;
    totalRevenue += totalOrderValue;
    localStorage.setItem('totalRevenue', JSON.stringify(totalRevenue));

    localStorage.removeItem('vendas');

    window.location.href = 'dashboard.html';
}

document.getElementById('finalizar-pedido').addEventListener('click', finalizeOrder);
document.addEventListener('DOMContentLoaded', showCartItems);
