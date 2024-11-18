function loadSalesData() {
    const allSales = JSON.parse(localStorage.getItem('todasVendas')) || [];
    const totalSales = allSales.length;
    let totalRevenue = 0;

    // Limpa a lista antes de carregar
    const salesList = document.getElementById('sales-list');
    salesList.innerHTML = '';

    allSales.forEach(sale => {
        // Calcula o total de cada venda
        const saleTotal = sale.items.reduce((acc, item) => acc + item.price, 0);
        totalRevenue += saleTotal;

        // Adiciona as informações da venda ao dashboard
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${sale.items.map(item => item.item).join(', ')}</td>
            <td>R$ ${saleTotal.toFixed(2)}</td>
            <td>${new Date(sale.date).toLocaleString()}</td>
            <td>${sale.paymentMethod}</td>
        `;
        salesList.appendChild(row);
    });

    // Atualiza o resumo de vendas
    document.getElementById('total-sales').textContent = totalSales;
    document.getElementById('total-revenue').textContent = totalRevenue.toFixed(2);
}

// Carregar as vendas quando a página for aberta
document.addEventListener('DOMContentLoaded', loadSalesData);
