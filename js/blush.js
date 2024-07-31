let cosmeticos = [];

const Apiblush = 'https://makeup-api.herokuapp.com/api/v1/products.json?product_type=blush';


async function fetchProducts() {
    try {
        const response = await fetch(Apiblush);
        
        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const products = await response.json();
        console.log(products); // Loga os produtos retornados pela API

        // Chama a função para exibir os produtos
        displayProducts(products);
    } catch (error) {
        console.error('Erro ao buscar os produtos:', error);
    }
}

// Função para exibir produtos
function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Limpa a lista existente

    // Limita a 20 produtos
    const limitedProducts = products.slice(0, 20); 

    limitedProducts.forEach(product => {
        console.log(product); // Loga cada produto individualmente
        
        // Cria uma nova div para o produto
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-item'); // Adiciona a classe de estilo

        productDiv.innerHTML = `
            <h2>${product.name}</h2>
            <img src="${product.image_link || ''}" alt="${product.name}" style="max-width: 100%; height: auto;" />
            <p>${product.description || 'Sem descrição disponível'}</p>
            <p>Preço: R$ ${product.price || 'N/A'}</p>
        `;
        productList.appendChild(productDiv);
    });
}

// Carrega os produtos ao abrir a página
window.onload = fetchProducts;
