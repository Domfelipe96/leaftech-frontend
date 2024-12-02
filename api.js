// URL do backend
const BASE_URL = 'leaftech-backend.onrender.com/api/';

//Mensagem de boas vindas do BackEnd
async function obterMensagem() {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: 'GET'
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json(); // Converte a resposta em JSON
    console.log(data.message);

    return data; // Retorna os dados recebidos
  } catch (erro) {
    console.error('Erro ao obter a mensagem:', erro);
    throw erro; // Lança o erro para tratamento posterior
  }
}


  async function criarProduto(dadosProduto) {
    try {
      const response = await fetch('leaftech-backend.onrender.com/api/produtos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosProduto),
      });
  
      if (!response.ok) throw new Error(`Erro: ${response.status}`);
      const data = await response.json();
      console.log('Produto criado:', data);
      return data;
    } catch (error) {
      console.error('Erro ao criar produto:', error);
    }
  }
  
  //*Obter todos produtos
  async function obterProdutos() {
    try {
      const response = await fetch('leaftech-backend.onrender.com/api/produtos', { method: 'GET' });
      if (!response.ok) throw new Error(`Erro: ${response.status}`);
      const data = await response.json();
      console.log('Produtos:', data);
      return data;
    } catch (error) {
      console.error('Erro ao obter produtos:', error);
    }
  }
  
  //*Obter produto por ID
  async function obterProdutoPorId(produtoId) {
    try {
      const response = await fetch(`leaftech-backend.onrender.com/api/produtos/${produtoId}`, { method: 'GET' });
      if (!response.ok) throw new Error(`Erro: ${response.status}`);
      const data = await response.json();
      console.log('Produto encontrado:', data);
      return data;
    } catch (error) {
      console.error('Erro ao obter produto:', error);
    }
  }

//Clientes

  //*Criar cliente
  async function criarCliente(dadosCliente) {
    try {
      const response = await fetch('leaftech-backend.onrender.com/api/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosCliente),
      });
  
      if (!response.ok) throw new Error(`Erro: ${response.status}`);
      const data = await response.json();
      console.log('Cliente criado:', data);
      return data;
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
    }
  }

  //*Obter todos os clientes
  async function obterClientes() {
    try {
      const response = await fetch('leaftech-backend.onrender.com/api/clientes', { method: 'GET' });
      if (!response.ok) throw new Error(`Erro: ${response.status}`);
      const data = await response.json();
      console.log('Clientes:', data);
      return data;
    } catch (error) {
      console.error('Erro ao obter clientes:', error);
    }
  }

  //*Obter cliente por ID
  async function obterClientePorId(clienteId) {
    try {
      const response = await fetch(`leaftech-backend.onrender.com/api/clientes/${clienteId}`, { method: 'GET' });
      if (!response.ok) throw new Error(`Erro: ${response.status}`);
      const data = await response.json();
      console.log('Cliente encontrado:', data);
      return data;
    } catch (error) {
      console.error('Erro ao obter cliente:', error);
    }
  }

  //*Login do cliente
  async function loginCliente(credentials) {
    try {
      const response = await fetch('leaftech-backend.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
  
      if (!response.ok) throw new Error(`Erro: ${response.status}`);
      const data = await response.json();
      console.log('Login bem-sucedido:', data);
      return data;
    } catch (error) {
      console.error('Erro no login:', error);
    }
  }

//Vendas

  //*Criar venda
  async function criarVenda(dadosVenda) {
    try {
      const response = await fetch('leaftech-backend.onrender.com/api/vendas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosVenda),
      });
  
      if (!response.ok) throw new Error(`Erro: ${response.status}`);
      const data = await response.json();
      console.log('Venda criada:', data);
      return data;
    } catch (error) {
      console.error('Erro ao criar venda:', error);
    }
  }

  //*Obter todas as vendas
  async function obterVendas() {
    try {
      const response = await fetch('leaftech-backend.onrender.com/api/vendas', { method: 'GET' });
      if (!response.ok) throw new Error(`Erro: ${response.status}`);
      const data = await response.json();
      console.log('Vendas:', data);
      return data;
    } catch (error) {
      console.error('Erro ao obter vendas:', error);
    }
  }

  //*Obter venda por ID
  async function obterVendaPorId(vendaId) {
    try {
      const response = await fetch(`leaftech-backend.onrender.com/api/vendas/${vendaId}`, { method: 'GET' });
      if (!response.ok) throw new Error(`Erro: ${response.status}`);
      const data = await response.json();
      console.log('Venda encontrada:', data);
      return data;
    } catch (error) {
      console.error('Erro ao obter venda:', error);
    }
  }

  
  
  

 


