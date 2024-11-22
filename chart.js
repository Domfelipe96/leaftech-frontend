// Função para carregar os dados do dashboard (permanece igual ao original)
function loadSalesData() {
    const allSales = JSON.parse(localStorage.getItem('todasVendas')) || [];
    const salesByItem = {};
    const revenueByPaymentMethod = {};
    let totalRevenue = 0;

    allSales.forEach(sale => {
        const saleTotal = sale.items.reduce((acc, item) => acc + item.price, 0);
        totalRevenue += saleTotal;

        // Agrupa vendas por item
        sale.items.forEach(item => {
            if (!salesByItem[item.item]) {
                salesByItem[item.item] = 0;
            }
            salesByItem[item.item]++;
        });

        // Agrupa receita por forma de pagamento
        if (!revenueByPaymentMethod[sale.paymentMethod]) {
            revenueByPaymentMethod[sale.paymentMethod] = 0;
        }
        revenueByPaymentMethod[sale.paymentMethod] += saleTotal;
    });

    // Primeiro gráfico: Vendas por produto
    const salesChartCtx = document.getElementById('salesChart').getContext('2d');
    new Chart(salesChartCtx, {
        type: 'bar',
        data: {
            labels: ['Banana Nanica', 'Maçã Gala', 'Alface Crespa', 'Couve Manteiga', 'Manjericão', 'Hortelã', 'Camomila', 'Erva-doce'], // Produtos de todas as categorias
            datasets: [{
                label: 'Quantidade Vendida',
                data: [15, 10, 8, 12, 6, 9, 4, 7], // Dados fictícios
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Segundo gráfico: Vendas totais por categoria
    const revenueChartCtx = document.getElementById('revenueChart').getContext('2d');
    new Chart(revenueChartCtx, {
        type: 'pie', // Gráfico de pizza para categorias
        data: {
            labels: ['Frutas', 'Hortaliças', 'Plantas Aromáticas', 'Ervas Medicinais'], // Categorias de produtos
            datasets: [{
                label: 'Vendas por Categoria',
                data: [25, 20, 15, 10], // Dados fictícios de vendas por categoria
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)',
                    'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        }
    });
}