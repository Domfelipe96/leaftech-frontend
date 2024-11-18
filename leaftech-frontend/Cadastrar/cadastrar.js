// Lista para armazenar usuários
const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

// Função para cadastrar usuário
document.getElementById('cadastroForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;
    const endereco = document.getElementById('endereco').value;

    // Verifica se o email já está cadastrado
    const emailExistente = usuarios.find(user => user.email === email);

    if (emailExistente) {
        document.getElementById('cadastroMessage').style.color = 'red';
        document.getElementById('cadastroMessage').textContent = 'E-mail já cadastrado!';
        return;
    }

    // Salva os dados no localStorage
    usuarios.push({ nome, telefone, email, endereco });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    document.getElementById('cadastroMessage').style.color = 'green';
    document.getElementById('cadastroMessage').textContent = 'Cadastro realizado com sucesso!';

    // Limpa o formulário
    document.getElementById('cadastroForm').reset();
});
