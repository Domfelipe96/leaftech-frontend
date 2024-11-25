// Função para obter os clientes cadastrados (simulação de chamada para o servidor ou API)
async function obterClientes() {
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

            // Exibe as partes ocultas da página após login
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

// Função para exibir o dashboard
function mostrarDashboard() {
    document.querySelector('.login-container').style.display = 'none'; // Oculta o login
    document.querySelector('.header').classList.remove('hidden'); // Exibe o cabeçalho
    document.querySelector('.hero').classList.remove('hidden'); // Exibe a seção de resumo
    document.querySelector('.dashboard').classList.remove('hidden'); // Exibe o dashboard
}

// Verifica se o usuário está logado ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'true') {
        mostrarDashboard(); // Exibe o dashboard se o usuário estiver logado
    } else {
        // Se não estiver logado, mantém a página de login visível e oculta o restante
        document.querySelector('.header').classList.add('hidden');
        document.querySelector('.hero').classList.add('hidden');
        document.querySelector('.dashboard').classList.add('hidden');
    }
});

// Função de logout
document.getElementById('logoutBtn').addEventListener('click', function () {
    // Remove o estado de login do localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('idCliente');
    localStorage.removeItem('nomeCliente');
    localStorage.removeItem('clienteEndereco');

    // Exibe novamente a página de login e oculta o dashboard
    document.querySelector('.login-container').style.display = 'flex';
    document.querySelector('.header').classList.add('hidden');
    document.querySelector('.hero').classList.add('hidden');
    document.querySelector('.dashboard').classList.add('hidden');
});
