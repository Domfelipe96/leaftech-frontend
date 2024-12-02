async function createSale(clienteId, produtosComQuantidade, endereco) {
    try {
        console.log(produtosComQuantidade);
        const response = await fetch('https://leaftech-backend.onrender.com/api/vendas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cliente: clienteId,
                produtos: produtosComQuantidade,
                endereco: endereco
            }),
        });

        if (!response.ok) throw new Error(`Erro: ${response.status}`);

        console.log(JSON.stringify({
            cliente: clienteId,
            produtos: produtosComQuantidade,
            endereco: endereco
        }))
       // alert('Venda registrada com sucesso!');
    } catch (error) {
    }
}

function updateItemQuantity(index, quantityChange) {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const item = carrinho[index];

    // Atualiza a quantidade do item, garantindo que não seja menor que 1
    item.quantidade = Math.max(1, item.quantidade + quantityChange);

    // Atualiza o carrinho no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // Atualiza a exibição do carrinho
    showCartItems();
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

    // Mapeamento das imagens para os produtos
    const caminhoImagem = {
        "Banana": "/Imagens/banana.png",
        "Maçã": "/Imagens/maça.png",
        "Manjericão": "/Imagens/manjericao.png",
        "Hortelã": "/Imagens/hortela.png",
        "Batata": "/Imagens/batata.png"
    };

    // Exibe os itens do carrinho com a quantidade
    carrinho.forEach((item, index) => {
        const preco = parseFloat(item.preco); // Converte o preço para número
        const quantidade = item.quantidade || 1; // Usa 1 se a quantidade não estiver definida

        // Obtém a imagem do produto com base no nome
        const imagemProduto = caminhoImagem[item.nome] || '/Imagens/default.png'; // Imagem padrão se não encontrar

        // Exibe a quantidade e o valor total por item
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <div class="product-image">
                <img src="${imagemProduto}" alt="${item.nome}" />
            </div>
            <h3>${item.nome}</h3>
            <div>
                <button onclick="updateItemQuantity(${index}, -1)">-</button>
                <span>${quantidade}</span>
                <button onclick="updateItemQuantity(${index}, 1)">+</button>
            </div>
            <p>R$ ${preco.toFixed(2)} x ${quantidade} = R$ ${(preco * quantidade).toFixed(2)}</p>
            <button onclick="removeItem(${index})">Remover</button>
        `;
        cartItemsDiv.appendChild(itemDiv);
        total += preco * quantidade; // Calcula o total com a quantidade
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
    const clienteId = localStorage.getItem('idCliente');
    const endereco = localStorage.getItem('clienteEndereco');

    if (carrinho.length === 0) {
        alert("O carrinho está vazio!");
        return;
    }

    // Extrai os IDs dos produtos e as quantidades do carrinho
    const produtosComQuantidade = carrinho.map(item => ({
        id: item.id,
        quantidade: item.quantidade || 1 // Garante que a quantidade seja enviada
    }));

    // Chama a API para registrar a venda com quantidade
    createSale(clienteId, produtosComQuantidade, endereco);

    // Após o registro, salva informações locais (opcional)
    const totalOrderValue = carrinho.reduce((acc, item) => acc + parseFloat(item.preco) * (item.quantidade || 1), 0);
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
    window.location.href = '/Delivery/delivery.html'; // Redireciona para a página delivery.html
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('carrinho.html')) {
        showCartItems();
        document.getElementById('finalizar-pedido').addEventListener('click', finalizeOrder);
    }
});
