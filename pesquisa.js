function fetchProducts() {
    fetch('https://diwserver.vps.webdock.cloud/products?page=1&page_items=100')
        .then(response => response.json())
        .then(data => {
            const productsContainer = document.getElementById('productList');
            const products = data.products;

            function searchProducts(searchTerm) { // Filtra os produtos
                const filteredProducts = products.filter(product =>
                    product.title.toLowerCase().includes(searchTerm.toLowerCase())
                );
                displayProducts(filteredProducts);
            }

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
                        <p>R$ ${product.price}</p>
                        <a href="detalhes.html?id=${product.id}">Detalhes</a>
                    `;
                    productsContainer.appendChild(productElement);

                    if ((index + 1) % 3 === 0) {
                        productsContainer.appendChild(document.createElement('br'));
                    }

                    const imageElement = productElement.querySelector('img');
                    const titleElement = productElement.querySelector('h3');

                    //GAMBIARRA PURA !! KKKKK
                    imageElement.addEventListener('click', () => {
                        redirectToProductPage('id=' + product.id);
                    });

                    titleElement.addEventListener('click', () => {
                        redirectToProductPage('id=' + product.id);
                    });
                });
            }

            function redirectToProductPage(productId) {
                window.location.href = `detalhes.html?${productId}`;
            }

            displayProducts(products);


            const searchInput = document.getElementById('searchInput');
            searchInput.addEventListener('input', () => {
                const searchTerm = searchInput.value;
                searchProducts(searchTerm);
            });
        })
        .catch(error => console.error('Erro ao buscar produtos:', error));
}

fetchProducts();

