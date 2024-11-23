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

    produtoItem.innerHTML = `
        <h2>${produto.nome}</h2>
        <p>${produto.descricao || 'Descrição não disponível.'}</p>
        <p>R$ ${produto.preco?.toFixed(2) || '0.00'}</p>
        <button class="btn add-to-cart" data-id="${produto._id}" data-nome="${produto.nome}" data-preco="${produto.preco}">Adicionar ao Carrinho</button>
    `;

    produtosLista.appendChild(produtoItem);
});


  // Adiciona eventos aos botões "Adicionar ao Carrinho"
  configurarBotoesCarrinho();
}

// Função para configurar os eventos dos botões de adicionar ao carrinho
function configurarBotoesCarrinho() {
  document.querySelectorAll('.add-to-cart').forEach(button => {

      button.addEventListener('click', () => {
          // Captura os valores dos atributos data-* do botão
          const produtoId = button.getAttribute('data-id');
          const produtoNome = button.getAttribute('data-nome');
          const produtoPreco = button.getAttribute('data-preco');

          adicionarAoCarrinho({ id: produtoId, nome: produtoNome, preco: produtoPreco  });
           
      });
  });
}

// Função para adicionar um produto ao carrinho
function adicionarAoCarrinho(produto) {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  
  // Adiciona o novo produto ao carrinho
  carrinho.push({ 
      id: produto.id, 
      nome: produto.nome,
      preco: produto.preco,
      data: new Date().toISOString() // Adiciona a data em formato ISO
  });

  // Atualiza o carrinho no localStorage
  localStorage.setItem('carrinho', JSON.stringify(carrinho));

  alert("Produto foi adicionado ao carrinho!");
}


// Função para obter produtos da API
async function obterProdutos() {
  try {
      const response = await fetch('http://localhost:8000/api/produtos', { method: 'GET' });

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
