// Lista de usuários armazenados
const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

// Função para verificar o e-mail
document.getElementById('recuperarSenhaForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;

    // Verifica se o email existe
    const usuarioEncontrado = usuarios.find(user => user.email === email);

    if (usuarioEncontrado) {
        document.getElementById('recuperarMessage').style.color = 'green';
        document.getElementById('recuperarMessage').textContent = `E-mail encontrado! Enviaremos instruções para ${email}.`;
    } else {
        document.getElementById('recuperarMessage').style.color = 'red';
        document.getElementById('recuperarMessage').textContent = 'E-mail não cadastrado!';
    }
});
