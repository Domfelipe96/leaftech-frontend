// Lista de status
const statuses = [
    "Aguarde a confirmação do pedido",  // 0-20 segundos
    "Pedido confirmado",                // 20-40 segundos
    "Pedido saiu para Entrega",         // 40-60 segundos
    "Entrega Realizada com sucesso"     // Após o final
];

// Tempo total para a entrega (1 minuto em segundos)
const totalTime = 60;

// Inicializa os elementos
const statusDisplay = document.getElementById("status-display");
const timeRemainingDisplay = document.getElementById("time-remaining");
const confirmButton = document.getElementById("confirm-delivery");
const logoutButton = document.getElementById("logout-btn"); // Captura o botão de logout

// Atualiza o status e o tempo restante
function startDeliveryTracking() {
    let timeRemaining = totalTime;

    // Configura o botão "Confirmar Entrega" desde o início
    confirmButton.textContent = "Aguarde..."; // Mensagem inicial do botão
    confirmButton.disabled = true; // Desativa o botão
    confirmButton.style.display = "block"; // Garante que o botão esteja visível

    const timer = setInterval(() => {
        // Atualiza o tempo restante
        timeRemaining--;
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timeRemainingDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;

        // Atualiza o status nos intervalos corretos
        if (timeRemaining === 40) {
            statusDisplay.textContent = statuses[0]; // "Aguarde a confirmação do pedido"
        } else if (timeRemaining === 20) {
            statusDisplay.textContent = statuses[1]; // "Pedido confirmado"
        } else if (timeRemaining === 10) {
            statusDisplay.textContent = statuses[2]; // "Pedido saiu para Entrega"
        }

        // Exibe a mensagem final e habilita o botão após o tempo
        if (timeRemaining <= 0) {
            clearInterval(timer); // Para o temporizador
            statusDisplay.textContent = statuses[3]; // "Entrega Realizada com sucesso"
            confirmButton.textContent = "Confirmar Entrega"; // Atualiza a mensagem do botão
            confirmButton.disabled = false; // Habilita o botão
        }
    }, 1000); // A cada segundo
}

// Ação para o botão "Confirmar Entrega"
function confirmDelivery() {
    if (!confirmButton.disabled) { // Apenas executa se o botão estiver habilitado
        statusDisplay.textContent = "Entrega Confirmada! Obrigado e volte sempre!"; // Mensagem de confirmação
        confirmButton.style.display = "none"; // Esconde o botão após a confirmação
        alert("Entrega Confirmada! Obrigado e volte sempre!"); // Exibe o alert com a mensagem de agradecimento
    }
}

// Lógica para o botão de logout
function handleLogout() {
    window.location.href = "/index.html"; // Redireciona para a página de login
}

// Inicia o rastreamento quando a página é carregada
document.addEventListener("DOMContentLoaded", () => {
    startDeliveryTracking();
    confirmButton.addEventListener("click", confirmDelivery);
    logoutButton.addEventListener("click", handleLogout); // Adiciona o evento de clique para logout
});
