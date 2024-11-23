// Função para obter produtos e exibi-los na página
async function obterProdutos() {
    try {
      const response = await fetch('http://localhost:8000/api/produtos', { method: 'GET' });
      
      if (!response.ok) throw new Error(`Erro: ${response.status}`);
      
      const produtos = await response.json(); // Recebe a lista de produtos
      const produtosLista = document.getElementById('produtos-lista');
      
      if (produtos.length === 0) {
        produtosLista.innerHTML = '<p>Nenhum produto disponível.</p>';
        return;
      }
  
      // Itera sobre os produtos e os exibe na página
      produtos.forEach(produto => {
        const produtoItem = document.createElement('div');
        produtoItem.classList.add('product-item');
        
        produtoItem.innerHTML = `
          <h2>${produto.nome}</h2>
          <p>${produto.descricao}</p>
          <p>R$ ${produto.preco.toFixed(2)}</p>
          <a href="../Detalhes/detalhes-produtos.html" class="btn">Ver detalhes</a>
        `;
        
        // Adiciona o item do produto à lista
        produtosLista.appendChild(produtoItem);
      });
  
    } catch (error) {
      console.error('Erro ao obter produtos:', error);
    }
  }
  
  // Chama a função para obter e exibir os produtos assim que a página for carregada
  document.addEventListener('DOMContentLoaded', obterProdutos);
  