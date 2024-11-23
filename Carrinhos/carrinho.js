async function createSale(clienteId, produtosIds, endereco) {
    try {
        const response = await fetch('http://localhost:8000/api/vendas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cliente: clienteId,
                produtos: produtosIds,
                endereco: endereco
            }),
        });

        if (!response.ok) throw new Error(`Erro: ${response.status}`);
        const data = await response.json();
        console.log('Venda criada com sucesso:', data);
        alert('Venda registrada com sucesso!');
    } catch (error) {
        console.error('Erro ao criar venda:', error);
        alert('Erro ao registrar a venda. Verifique os detalhes e tente novamente.');
    }
}


function showCartItems() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalDiv = document.getElementById('cart-total');
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Limpa o conteúdo existente
    cartItemsDiv.innerHTML = '';

    if (carrinho.length === 0) {
        cartItemsDiv.innerHTML = "<p>O carrinho está vazio.</p>";
        cartTotalDiv.innerHTML = "";
        return;
    }

    let total = 0;

    // Exibe os itens do carrinho
    carrinho.forEach((item, index) => {
        const preco = parseFloat(item.preco); // Converte o preço para número
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <h3>${item.nome}</h3>
            <p>R$ ${preco.toFixed(2)}</p>
            <button onclick="removeItem(${index})">Remover</button>
        `;
        cartItemsDiv.appendChild(itemDiv);
        total += preco;
    });

    // Exibe o total do carrinho
    cartTotalDiv.innerHTML = `<h3>Total: R$ ${total.toFixed(2)}</h3>`;
}

function removeItem(index) {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.splice(index, 1); // Remove o item na posição indicada
    localStorage.setItem('carrinho', JSON.stringify(carrinho)); // Atualiza o localStorage
    showCartItems(); // Atualiza a exibição do carrinho
}

function finalizeOrder() {
    const paymentMethod = document.getElementById('payment-method').value;
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const clienteId =  localStorage.getItem('idCliente');
    const endereco =  localStorage.getItem('clienteEndereco');

    if (carrinho.length === 0) {
        alert("O carrinho está vazio!");
        return;
    }

    // Extrai apenas os IDs dos produtos do carrinho
    const produtosIds = carrinho.map(item => item.id);

    // Chama a API para registrar a venda
    createSale(clienteId, produtosIds, endereco);

    // Após o registro, salva informações locais (opcional)
    const totalOrderValue = carrinho.reduce((acc, item) => acc + parseFloat(item.preco), 0);
    const purchaseData = {
        items: carrinho,
        paymentMethod,
        date: new Date()
    };

    let allSales = JSON.parse(localStorage.getItem('todasVendas')) || [];
    allSales.push(purchaseData);

    localStorage.setItem('todasVendas', JSON.stringify(allSales));

    let totalRevenue = JSON.parse(localStorage.getItem('totalRevenue')) || 0;
    totalRevenue += totalOrderValue;
    localStorage.setItem('totalRevenue', JSON.stringify(totalRevenue));

    localStorage.removeItem('carrinho');

    alert('Pedido finalizado com sucesso!');
    window.location.href = 'carrinho.html';
}


document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('carrinho.html')) {
        showCartItems();
        document.getElementById('finalizar-pedido').addEventListener('click', finalizeOrder);
    }
});
