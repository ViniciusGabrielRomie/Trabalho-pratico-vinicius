function fetchProducts() {
    fetch('https://diwserver.vps.webdock.cloud/products?page=1&page_items=100')
        .then(response => response.json())
        .then(data => {

            const productsContainer = document.getElementById('productList');
            let products = data.products; // Variável para armazenar todos os produtos

            function displayProducts(products) {
                productsContainer.innerHTML = ''; // Limpa o conteúdo atual

                products.forEach((product, index) => {
                    const productElement = document.createElement('div');
                    productElement.className = 'product';
                    productElement.innerHTML = `
                        <img src="${product.image}" alt="${product.title}">
                        <h3>${product.title}</h3>
                        <p>Marca: ${product.brandName}</p>
                        <p>Avaliação: ${product.rating.rate}</p>
                        <p>Valor: R$${product.price}</p>
                        <a href="detalhes.html?id=${product.id}">Detalhes</a>
                    `;
                    productsContainer.appendChild(productElement);

                    if ((index + 1) % 3 === 0) {
                        productsContainer.appendChild(document.createElement('br'));
                    }
                });
            }

            displayProducts(products);

            const productCountElement = document.getElementById('productCount');
            productCountElement.textContent = products.length;

            const categorySelect = document.getElementById('category');
            categorySelect.addEventListener('change', () => {
                const selectedCategory = categorySelect.value;
                if (selectedCategory) {
                    const filteredProducts = products.filter(product =>
                        product.category.toLowerCase() === selectedCategory.toLowerCase()
                    );
                    displayProducts(filteredProducts);
                    productCountElement.textContent = filteredProducts.length; // Atualiza a contagem de produtos
                } else {
                    displayProducts(products);
                    productCountElement.textContent = products.length; // Atualiza a contagem de produtos
                }
            });
        })
        .catch(error => console.error('Erro ao buscar produtos:', error));
}

fetchProducts();
