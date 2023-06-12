// Obtém o ID do produto da URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Função para buscar os detalhes do produto
function fetchProductDetails(productId) {
    fetch(`https://diwserver.vps.webdock.cloud/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            const productDetailsContainer = document.getElementById('productDetails');
            const productDetailsElement = document.createElement('div');
            productDetailsElement.className = 'product-details';
            productDetailsElement.innerHTML = `
                <h2>${product.title}</h2>
                <p>Preço: R$ ${product.price}</p>
                <p>Avaliação: ${product.rating.rate}</p>
                <a>Adicione ao Carrinho</a>
            `;
            productDetailsContainer.appendChild(productDetailsElement);

            const productImageContainer = document.getElementById('productImage');
            const productImageElement = document.createElement('div');
            productImageElement.className = 'product-image';
            productImageElement.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
            `;
            productImageContainer.appendChild(productImageElement);

            const productDescriptionContainer = document.getElementById('productDescription');
            const productDescriptionElement = document.createElement('div');
            productDescriptionElement.className = 'product-description';
            productDescriptionElement.innerHTML = `
                <p>Descrição: ${product.description}</p>
            `;
            productDescriptionContainer.appendChild(productDescriptionElement);
        })
        .catch(error => console.error('Erro ao buscar detalhes do produto:', error));
}

// Chama a função para buscar os detalhes do produto
fetchProductDetails(productId);
