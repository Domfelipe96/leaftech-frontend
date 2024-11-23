// Função para cadastrar um cliente
async function cadastrarCliente(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    // Obtendo os dados do formulário
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const rua = document.getElementById('rua').value;
    const numero = document.getElementById('number').value;
    const bairro = document.getElementById('bairro').value;
    const cidade = document.getElementById('cidade').value;

    // Preparando o objeto de dados do cliente
    const clienteData = {
        nome,
        telefone,
        email,
        senha,
        rua,
        numero,
        bairro,
        cidade
    };

    try {
        // Enviando os dados para o backend via API
        const response = await fetch('http://localhost:8000/api/clientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(clienteData),
        });

        const result = await response.json();

        // Verificando se a resposta foi de sucesso
        if (response.ok) {
            // Limpar os campos do formulário
            document.getElementById('cadastroForm').reset();

            // Exibir a mensagem de sucesso usando pop-up
            alert(result.message || 'Cadastro realizado com sucesso!');
        } else {
            throw new Error(result.message || 'Erro ao cadastrar cliente');
        }

    } catch (error) {
        // Exibindo mensagem de erro com pop-up
        alert(error.message);
    }
}

// Adicionando o ouvinte de evento para o formulário
document.getElementById('cadastroForm').addEventListener('submit', cadastrarCliente);

