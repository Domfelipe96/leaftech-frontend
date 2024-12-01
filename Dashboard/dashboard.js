// Função para carregar os dados de vendas
function loadSalesData() {
    const allSales = JSON.parse(localStorage.getItem('todasVendas')) || [];
    let totalRevenue = 0; // Inicializa a variável para a receita total

    // Limpa a lista antes de carregar
    const salesList = document.getElementById('sales-list');
    salesList.innerHTML = '';

    allSales.forEach(sale => {
        // Calcula o total de cada venda
        const saleTotal = sale.items.reduce((acc, item) => acc + parseFloat(item.preco) * (item.quantidade || 1), 0);
        totalRevenue += saleTotal; // Soma o total de cada venda ao total geral

        // Exibe os produtos da venda como uma lista
        const products = sale.items.map(item => `${item.nome}`).join(', ');

        // Adiciona as informações da venda ao dashboard
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${products}</td>
            <td>R$ ${saleTotal.toFixed(2)}</td>
            <td>${new Date(sale.date).toLocaleString()}</td>
            <td>${sale.paymentMethod || 'Não informado'}</td>
        `;
        salesList.appendChild(row);
    });

    // Atualiza o resumo de vendas
    document.getElementById('total-sales').textContent = allSales.length; // Total de vendas
    document.getElementById('total-revenue').textContent = `R$ ${totalRevenue.toFixed(2)}`; // Receita total calculada
}

// Carregar as vendas quando a página for aberta
document.addEventListener('DOMContentLoaded', loadSalesData);
