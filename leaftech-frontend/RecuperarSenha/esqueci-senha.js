// Função para obter os clientes cadastrados (simulação de chamada para o servidor ou API)
async function obterClientes() {
    try {
        const response = await fetch('http://localhost:8000/api/clientes');
        if (!response.ok) {
            throw new Error(`Erro ao obter clientes: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Erro na chamada da API:', error);
        throw error; // Relança o erro para ser tratado posteriormente
    }
}

// Função para verificar o formato do e-mail
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Função para exibir mensagens
function exibirMensagem(mensagem, cor) {
    const messageElement = document.getElementById('recuperarMessage');
    messageElement.style.color = cor;
    messageElement.textContent = mensagem;
}

// Função principal para verificar o e-mail
async function verificarEmail(event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();

    // Valida o formato do e-mail
    if (!validarEmail(email)) {
        exibirMensagem('Por favor, insira um e-mail válido.', 'red');
        return;
    }

    try {
        // Obtém os clientes cadastrados
        const clientes = await obterClientes();

        // Procura o cliente pelo e-mail
        const clienteEncontrado = clientes.find(
            cliente => cliente.dados_pessoais.email === email
        );

        if (clienteEncontrado) {
            exibirMensagem(
                `E-mail encontrado! Enviaremos instruções para ${email}`,
                'green'
            );
        } else {
            exibirMensagem('E-mail não cadastrado!', 'red');
        }
    } catch (error) {
        exibirMensagem('Erro ao verificar e-mail. Tente novamente mais tarde.', 'red');
    }
}

// Adiciona o evento ao formulário
document
    .getElementById('recuperarSenhaForm')
    .addEventListener('submit', verificarEmail);
