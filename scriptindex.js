// Função para obter os clientes cadastrados (simulação de chamada para o servidor ou API)
async function obterClientes() {
    // Simulação de uma chamada fetch para obter os clientes cadastrados
    const response = await fetch('http://localhost:8000/api/clientes');
    const clientes = await response.json();
    return clientes;
}

// Função para verificar o login
document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Impede o envio do formulário

    const inputEmail = document.getElementById('username').value;
    const inputPassword = document.getElementById('password').value;

    try {
        // Obtém os clientes cadastrados (chama a função obterClientes)
        const clientes = await obterClientes();

        // Verifica se o email e a senha correspondem a um cliente cadastrado
        const clienteEncontrado = clientes.find(cliente => 
            cliente.dados_pessoais.email === inputEmail && cliente.dados_pessoais.senha === inputPassword
        );

        if (clienteEncontrado) {
            // Sucesso no login - salva o estado no localStorage
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('idCliente', clienteEncontrado._id);
            localStorage.setItem('nomeCliente', clienteEncontrado.nome);
            localStorage.setItem('clienteEndereco', clienteEncontrado.endereco.rua);

            mostrarDashboard();
        } else {
            // Falha no login
            document.getElementById('message').style.color = 'red';
            document.getElementById('message').textContent = 'Usuário ou senha incorretos!';
        }
    } catch (error) {
        // Exibe erro caso a requisição falhe (ex: API fora do ar)
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').textContent = 'Erro ao verificar login. Tente novamente mais tarde.';
    }
});

// Função para redirecionar ao cadastro
document.querySelector('.login-options a[href="/Cadastrar/cadastrar.html"]').addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = '../Cadastrar/cadastrar.html'; // Redireciona para a página de cadastro
});

// Função para redirecionar à recuperação de senha
document.querySelector('.login-options a[href="/RecuperarSenha/esqueci-senha.html"]').addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = '../RecuperarSenha/esqueci-senha.html'; // Redireciona para a página de recuperação de senha
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

function login() {
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
}
