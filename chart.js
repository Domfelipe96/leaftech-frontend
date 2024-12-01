function loadSalesData() {
    const allSales = JSON.parse(localStorage.getItem('todasVendas')) || [];
    const salesByItem = {};
    const revenueByPaymentMethod = {};
    let totalRevenue = 0;

    allSales.forEach(sale => {
        const saleTotal = sale.items.reduce((acc, item) => acc + parseFloat(item.preco), 0);
        totalRevenue += saleTotal;

        // Agrupa vendas por item
        sale.items.forEach(item => {
            if (!salesByItem[item.nome]) {
                salesByItem[item.nome] = 0;
            }
            salesByItem[item.nome]++;
        });

        // Agrupa receita por forma de pagamento
        if (!revenueByPaymentMethod[sale.paymentMethod]) {
            revenueByPaymentMethod[sale.paymentMethod] = 0;
        }
        revenueByPaymentMethod[sale.paymentMethod] += saleTotal;
    });

    // Cores fixas para os gráficos
    const colors = [
        'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'
    ];
    const borderColors = [
        'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'
    ];

    // Dados dinâmicos para o gráfico de vendas por produto
    const productLabels = Object.keys(salesByItem);
    const productData = Object.values(salesByItem);

    // Dados dinâmicos para o gráfico de receita por método de pagamento
    const paymentLabels = Object.keys(revenueByPaymentMethod);
    const paymentData = Object.values(revenueByPaymentMethod);

    // Primeiro gráfico: Vendas por produto
    const salesChartCtx = document.getElementById('salesChart').getContext('2d');
    new Chart(salesChartCtx, {
        type: 'bar',
        data: {
            labels: productLabels, // Produtos dinâmicos
            datasets: [{
                label: 'Quantidade Vendida',
                data: productData, // Quantidades dinâmicas
                backgroundColor: colors.slice(0, productLabels.length), // Cores fixas
                borderColor: borderColors.slice(0, productLabels.length), // Bordas fixas
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

    // Segundo gráfico: Receita por método de pagamento
    const revenueChartCtx = document.getElementById('revenueChart').getContext('2d');
    new Chart(revenueChartCtx, {
        type: 'pie',
        data: {
            labels: paymentLabels, // Métodos de pagamento dinâmicos
            datasets: [{
                label: 'Vendas por forma de Pagamento',
                data: paymentData, // Receitas dinâmicas
                backgroundColor: colors.slice(0, paymentLabels.length), // Cores fixas
                borderColor: borderColors.slice(0, paymentLabels.length), // Bordas fixas
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
