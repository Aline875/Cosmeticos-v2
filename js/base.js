let cosmeticos = [];

const Apibatom = 'https://makeup-api.herokuapp.com/api/v1/products.json?product_type=foundation';

async function fetchProducts() {
    try {
        const response = await fetch(Apibatom);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const products = await response.json();
        const filtroDeProducts = products.filter(product => product.id > 100);        
        const last20Products = filtroDeProducts.slice(-20);

        displayProducts(last20Products);
    } catch (error) {
        console.error('Erro ao buscar os produtos:', error);
    }
}

function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; 

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-item'); 

        productDiv.innerHTML = `
            <h2>${product.name}</h2>
            <img src="${product.image_link || ''}" alt="${product.name}" style="max-width: 100%; height: auto;" />
            <p class="decricao-produto">${product.description}</p>
            <p>Preço: R$ ${product.price || 'N/A'}</p>
        `;
        productList.appendChild(productDiv);
    });
}

window.onload = fetchProducts;
