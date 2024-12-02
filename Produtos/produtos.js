// Função para exibir os produtos na página
function exibirProdutos(produtos) {
    const produtosLista = document.getElementById('produtos-lista');

    if (!produtosLista) {
        console.error("Elemento 'produtos-lista' não encontrado no HTML.");
        return;
    }

    // Limpa a lista antes de exibir os produtos
    produtosLista.innerHTML = '';

    if (produtos.length === 0) {
        produtosLista.innerHTML = '<p>Nenhum produto disponível.</p>';
        return;
    }

    // Itera sobre os produtos e cria o HTML para cada produto
    produtos.forEach(produto => {
        const produtoItem = document.createElement('div');
        produtoItem.classList.add('product-item');

        // Definir caminho da imagem diretamente no código
        const caminhoImagem = {
            "Banana": "/Imagens/banana.png",
            "Maçã": "/Imagens/maça.png",
            "Manjericão": "/Imagens/manjericao.png",
            "Hortelã": "/Imagens/hortela.png",
            "Batata": "/Imagens/batata.png"
        };

        // Usando o nome do produto para buscar o caminho da imagem
        const imagemProduto = caminhoImagem[produto.nome] || '/Imagens/default.png';  // imagem padrão se o nome não corresponder

        produtoItem.innerHTML = `
            <div class="product-image">
                <img src="${imagemProduto}" alt="${produto.nome}" />
            </div>
            <div class="product-details">
                <h2 class="product-name">${produto.nome}</h2>
                <p class="product-description">${produto.descricao || 'Descrição não disponível.'}</p>
                <p>R$ ${produto.preco?.toFixed(2) || '0.00'}</p>
                <div class="quantity-selector">
                    <button class="btn decrease-quantity" data-id="${produto._id}" data-action="decrease">-</button>
                    <input type="number" class="quantity-input" value="1" min="1" data-id="${produto._id}" />
                    <button class="btn increase-quantity" data-id="${produto._id}" data-action="increase">+</button>
                </div>
                <button class="btn add-to-cart" data-id="${produto._id}" data-nome="${produto.nome}" data-preco="${produto.preco}">Adicionar ao Carrinho</button>
            </div>
        `;

        produtosLista.appendChild(produtoItem);
    });

    // Adiciona eventos aos botões de quantidade e "Adicionar ao Carrinho"
    configurarBotoesCarrinho();
    configurarBotoesQuantidade();
}

// Função para configurar os eventos dos botões de adicionar ao carrinho
function configurarBotoesCarrinho() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const produtoId = button.getAttribute('data-id');
            const produtoNome = button.getAttribute('data-nome');
            const produtoPreco = button.getAttribute('data-preco');
            const quantidade = document.querySelector(`.quantity-input[data-id="${produtoId}"]`).value;

            adicionarAoCarrinho({ id: produtoId, nome: produtoNome, preco: produtoPreco, quantidade: parseInt(quantidade) });
        });
    });
}

// Função para configurar os botões de quantidade (+ e -)
function configurarBotoesQuantidade() {
    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', () => {
            const input = document.querySelector(`.quantity-input[data-id="${button.getAttribute('data-id')}"]`);
            input.value = parseInt(input.value) + 1;
        });
    });

    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', () => {
            const input = document.querySelector(`.quantity-input[data-id="${button.getAttribute('data-id')}"]`);
            if (parseInt(input.value) > 1) {
                input.value = parseInt(input.value) - 1;
            }
        });
    });
}

// Função para adicionar um produto ao carrinho
function adicionarAoCarrinho(produto) {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.push({
        id: produto.id,
        nome: produto.nome,
        preco: produto.preco,
        quantidade: produto.quantidade,
        data: new Date().toISOString()
    });
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    alert("Produto foi adicionado ao carrinho!");
}

// Função para obter produtos da API
async function obterProdutos() {
    try {
        const response = await fetch('https://leaftech-backend.onrender.com/api/produtos', { method: 'GET' });
        if (!response.ok) throw new Error(`Erro: ${response.status}`);

        const produtos = await response.json();
        exibirProdutos(produtos); // Exibe os produtos na página
    } catch (error) {
        console.error('Erro ao obter produtos:', error);
        const produtosLista = document.getElementById('produtos-lista');
        if (produtosLista) {
            produtosLista.innerHTML = '<p>Erro ao carregar os produtos. Tente novamente mais tarde.</p>';
        }
    }
}

// Executa a função assim que a página for carregada
document.addEventListener('DOMContentLoaded', obterProdutos);
