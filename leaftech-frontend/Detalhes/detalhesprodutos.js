<script>
    document.addEventListener('DOMContentLoaded', function() {
        const category = localStorage.getItem('categoriaSelecionada');
        const productList = document.getElementById('product-list');

        // Verifica se o elemento com ID 'product-list' existe
        if (!productList) {
            console.error("Elemento 'product-list' não encontrado no HTML.");
            return;
        }

        // Limpa a lista de produtos
        productList.innerHTML = '';

        // Função para exibir produtos baseados na categoria
        function displayProducts(productsHTML) {
            productList.innerHTML = productsHTML;
        }

        // Define o conteúdo HTML para cada categoria
        let productsHTML = "";
        switch (category) {
            case 'frutas':
                productsHTML = `
                    <div class="menu-item">
                        <h3>Banana nanica - KG</h3>
                        <p>R$ 3,00</p>
                        <button class="btn add-to-cart" data-item="Banana nanica" data-price="3.00">Adicionar ao Carrinho</button>
                    </div>
                    <div class="menu-item">
                        <h3>Maçã gala - KG</h3>
                        <p>R$ 3,00</p>
                        <button class="btn add-to-cart" data-item="Maçã gala" data-price="3.00">Adicionar ao Carrinho</button>
                    </div>`;
                break;
            case 'hortalicas':
                productsHTML = `
                    <div class="menu-item">
                        <h3>Alface crespa - Un</h3>
                        <p>R$ 2,00</p>
                        <button class="btn add-to-cart" data-item="Alface crespa" data-price="2.00">Adicionar ao Carrinho</button>
                    </div>
                    <div class="menu-item">
                        <h3>Couve manteiga - Un</h3>
                        <p>R$ 3,00</p>
                        <button class="btn add-to-cart" data-item="Couve manteiga" data-price="3.00">Adicionar ao Carrinho</button>
                    </div>`;
                break;
            case 'plantas-aromaticas':
                productsHTML = `
                    <div class="menu-item">
                        <h3>Manjericão - Maço</h3>
                        <p>R$ 5,00</p>
                        <button class="btn add-to-cart" data-item="Manjericão" data-price="5.00">Adicionar ao Carrinho</button>
                    </div>
                    <div class="menu-item">
                        <h3>Hortelã - Maço</h3>
                        <p>R$ 4,00</p>
                        <button class="btn add-to-cart" data-item="Hortelã" data-price="4.00">Adicionar ao Carrinho</button>
                    </div>`;
                break;
            case 'ervas-medicinais':
                productsHTML = `
                    <div class="menu-item">
                        <h3>Camomila - Maço</h3>
                        <p>R$ 6,00</p>
                        <button class="btn add-to-cart" data-item="Camomila" data-price="6.00">Adicionar ao Carrinho</button>
                    </div>
                    <div class="menu-item">
                        <h3>Erva-doce - Maço</h3>
                        <p>R$ 4,50</p>
                        <button class="btn add-to-cart" data-item="Erva-doce" data-price="4.50">Adicionar ao Carrinho</button>
                    </div>`;
                break;
            default:
                productsHTML = "<p>Categoria não encontrada.</p>";
        }
        
        // Exibe os produtos
        displayProducts(productsHTML);

        // Seleciona e adiciona eventos aos botões de adicionar ao carrinho
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', () => {
                const item = button.getAttribute('data-item');
                const price = parseFloat(button.getAttribute('data-price'));

                // Cria e salva a venda no localStorage
                const sale = { item, price, date: new Date() };
                const sales = JSON.parse(localStorage.getItem('vendas')) || [];
                sales.push(sale);
                localStorage.setItem('vendas', JSON.stringify(sales));

                alert(`${item} adicionado ao carrinho!`);
                window.location.href = 'carrinho.html';
            });
        });
    });
</script>
