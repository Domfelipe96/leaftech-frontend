// Inicializa a lista de usuários no localStorage caso ainda não exista
if (!localStorage.getItem('usuarios')) {
    localStorage.setItem('usuarios', JSON.stringify([]));
}

// Dados simulados de usuário e senha
const validUser = {
    username: "admin",
    password: "12345"
};

// Função para verificar o login
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio do formulário

    const inputEmail = document.getElementById('username').value;
    const inputPassword = document.getElementById('password').value;

    // Obtém os usuários cadastrados
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verifica se o email e a senha correspondem a um usuário cadastrado
    const usuarioEncontrado = usuarios.find(user => user.email === inputEmail && user.senha === inputPassword);

    if (usuarioEncontrado) {
        // Sucesso no login - salva o estado no localStorage
        localStorage.setItem('isLoggedIn', 'true');
        mostrarDashboard();
    } else {
        // Falha no login
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').textContent = 'Usuário ou senha incorretos!';
    }
});

// Função para redirecionar ao cadastro
document.querySelector('.login-options a[href="/Cadastrar/cadastrar.html"]').addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = '/Cadastrar/cadastrar.html'; // Redireciona para a página de cadastro
});

// Função para redirecionar à recuperação de senha
document.querySelector('.login-options a[href="/RecuperarSenha/esqueci-senha.html"]').addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = '/RecuperarSenha/esqueci-senha.html'; // Redireciona para a página de recuperação de senha
});

// Função para exibir o dashboard
function mostrarDashboard() {
    document.querySelector('.login-container').style.display = 'none';
    document.querySelector('header').style.display = 'block';
    document.querySelector('.hero').style.display = 'block';
    document.querySelector('.dashboard').style.display = 'block';
    loadSalesData();
}

// Verifica se o usuário está logado ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'true') {
        mostrarDashboard();
    } else {
        // Se não estiver logado, oculta o dashboard
        document.querySelector('header').style.display = 'none';
        document.querySelector('.hero').style.display = 'none';
        document.querySelector('.dashboard').style.display = 'none';
    }
});

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

    // Gráfico de vendas por item
    const salesLabels = Object.keys(salesByItem);
    const salesData = salesLabels.map(label => salesByItem[label]);

    const salesChartCtx = document.getElementById('salesChart').getContext('2d');
    new Chart(salesChartCtx, {
        type: 'bar',
        data: {
            labels: salesLabels,
            datasets: [{
                label: 'Quantidade Vendida',
                data: salesData,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
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

    // Gráfico de receita total por forma de pagamento (pizza)
    const revenueLabels = Object.keys(revenueByPaymentMethod);
    const revenueData = revenueLabels.map(label => revenueByPaymentMethod[label]);

    const revenueChartCtx = document.getElementById('revenueChart').getContext('2d');
    new Chart(revenueChartCtx, {
        type: 'pie',
        data: {
            labels: revenueLabels,
            datasets: [{
                label: 'Receita por Forma de Pagamento',
                data: revenueData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return `${tooltipItem.label}: R$ ${tooltipItem.raw.toFixed(2)}`;
                        }
                    }
                }
            }
        }
    });
}

// Lógica para o botão "Início"
document.getElementById('inicioBtn').addEventListener('click', function () {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'true') {
        mostrarDashboard();
    }
});

// Lógica para o botão "Sair"
document.getElementById('logoutBtn').addEventListener('click', function () {
    // Remove o estado de login do localStorage
    localStorage.removeItem('isLoggedIn');
    // Oculta o dashboard e exibe o formulário de login
    document.querySelector('header').style.display = 'none';
    document.querySelector('.hero').style.display = 'none';
    document.querySelector('.dashboard').style.display = 'none';
    document.querySelector('.login-container').style.display = 'block';
});
