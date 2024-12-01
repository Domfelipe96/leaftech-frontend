// Lista de status
const statuses = [
    "Aguarde a confirmação do pedido",  // 0-30 segundos
    "Pedido confirmado",                // 30-60 segundos
    "Pedido saiu para Entrega",        // 60-90 segundos
    "Entrega Realizada com sucesso"    // Após o final
];

// Tempo total para a entrega (2 minutos em segundos)
const totalTime = 2 * 60;

// Inicializa os elementos
const statusDisplay = document.getElementById("status-display");
const timeRemainingDisplay = document.getElementById("time-remaining");
const confirmButton = document.getElementById("confirm-delivery");

// Atualiza o status e o tempo restante
function startDeliveryTracking() {
    let timeRemaining = totalTime;

    // Inicializa o botão com a mensagem "Aguarde"
    confirmButton.textContent = "Aguarde...";  // Mensagem inicial do botão
    confirmButton.disabled = true;  // Desativa o botão enquanto o tempo está correndo

    const timer = setInterval(() => {
        // Atualiza o tempo restante
        timeRemaining--;
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timeRemainingDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;

        // Atualiza o status nos intervalos corretos
        if (timeRemaining === 90) {
            statusDisplay.textContent = statuses[0];  // "Aguarde a confirmação do pedido"
        } else if (timeRemaining === 60) {
            statusDisplay.textContent = statuses[1];  // "Pedido confirmado"
        } else if (timeRemaining === 30) {
            statusDisplay.textContent = statuses[2];  // "Pedido saiu para Entrega"
        }

        // Exibe a mensagem final após o tempo
        if (timeRemaining <= 0) {
            statusDisplay.textContent = statuses[3]; // "Entrega Realizada com sucesso"
            confirmButton.style.display = "block"; // Exibe o botão de confirmação
            confirmButton.textContent = "Confirmar Entrega"; // Altera a mensagem do botão
            confirmButton.disabled = false; // Habilita o botão após o tempo terminar
            clearInterval(timer);
        }
    }, 1000); // A cada segundo
}

// Ação para o botão "Confirmar Entrega"
function confirmDelivery() {
    statusDisplay.textContent = "Entrega Confirmada! Obrigado e volte sempre!"; // Mensagem de confirmação
    confirmButton.style.display = "none"; // Esconde o botão após a confirmação
    alert("Entrega Confirmada! Obrigado e volte sempre!"); // Exibe o alert com a mensagem de agradecimento
}

// Inicia o rastreamento quando a página é carregada
document.addEventListener("DOMContentLoaded", () => {
    startDeliveryTracking();
    confirmButton.addEventListener("click", confirmDelivery);
});
