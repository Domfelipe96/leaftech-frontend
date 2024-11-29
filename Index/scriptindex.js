// Função para obter os clientes cadastrados (simulação de chamada para o servidor ou API)
async function obterClientes() {
    try {
        const response = await fetch('http://localhost:8000/api/clientes');
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        const clientes = await response.json();
        return clientes;
    } catch (error) {
        console.error('Erro ao obter clientes:', error);
        throw error; // Re-throw para ser capturado no bloco catch do login
    }
}

// Função para verificar o login
document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Impede o envio do formulário

    // Obtendo elementos do DOM
    const inputEmail = document.getElementById('username').value;
    const inputPassword = document.getElementById('password').value;
    const messageElement = document.getElementById('message');
    const loadingElement = document.getElementById('loading');

    // Exibe o elemento de carregamento
    loadingElement.style.display = 'block';

    // Verifica se os campos de email e senha não estão vazios
    if (!inputEmail || !inputPassword) {
        messageElement.style.color = 'red';
        messageElement.textContent = 'Por favor, preencha todos os campos!';
        loadingElement.style.display = 'none'; // Oculta o carregamento após a verificação falhar
        return;
    }

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
            messageElement.style.color = 'red';
            messageElement.textContent = 'Usuário ou senha incorretos!';
        }
    } catch (error) {
        // Exibe erro caso a requisição falhe (ex: API fora do ar)
        messageElement.style.color = 'red';
        messageElement.textContent = 'Erro de rede ou servidor. Tente novamente mais tarde.';
    } finally {
        // Oculta o elemento de carregamento após a verificação
        loadingElement.style.display = 'none';
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