// URL do backend
const BASE_URL = 'https://leaftech-backend.herokuapp.com/api';

/**
 * Função para buscar produtos no backend.
 */
export async function fetchProdutos() {
  try {
    const response = await fetch(`${BASE_URL}/produtos`);
    if (!response.ok) throw new Error('Erro ao buscar produtos');
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return [];
  }
}

/**
 * Função para cadastrar um novo produto no backend.
 */
export async function criarProduto(produto) {
  try {
    const response = await fetch(`${BASE_URL}/produtos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(produto),
    });
    if (!response.ok) throw new Error('Erro ao criar produto');
    return await response.json();
  } catch (error) {
    console.error('Erro ao criar produto:', error);
  }
}
