let cosmeticos = [];

const Api = 'http://makeup-api.herokuapp.com/api/v1/products.json';

async function buscarCosmeticosApi() {
    try {
        const res = await fetch(Api);
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();

        // Mapeando os dados da nova API para o formato esperado
        cosmeticos = data.map(product => ({
            nome: product.name,
            imagem: product.image_link,
            preco: product.price ? `$${product.price}` : 'Preço não disponível'
        }));

        exibirCosmeticos();
    } catch (error) {
        console.error('Erro ao buscar os cosméticos:', error);
    }
}

function exibirCosmeticos() {
    const carrossel1 = document.getElementById("carrossel-1");
    const carrossel2 = document.getElementById("carrossel-2");

    // Limpando o conteúdo dos carrosseis antes de adicionar novos itens
    carrossel1.innerHTML = '';
    carrossel2.innerHTML = '';

    const limiteDeProdutos = cosmeticos.slice(0, 20);

    limiteDeProdutos.forEach((cosmetico, index) => {
        const template = `
        <div class="swiper-slide swiper-card ">
            <img src="${cosmetico.imagem}" alt="${cosmetico.nome}">
            <div class="produto-info">
                <p class="produto-nome">${cosmetico.nome}</p>
                <p class="produto-preco">${cosmetico.preco}</p>
                <div class="interacoes-produto">
                    <button class="btn-curtir">
                        <img src="./Public/icons8-gostar-32.png" alt="favoritar">
                    </button>
                    <button class="btn-compartilhar">
                        <img src="./Public/icons8-forward-arrow-32.png" alt="compartilhar">
                    </button>
                    <button class="btn-comprar">
                        <img src="./Public/icons8-vender-estoque-32.png" alt="comprar">
                    </button>
                </div>
            </div>
        </div>`;

        // Dividindo os carrosseis
        if (index % 2 === 0) {
            carrossel1.innerHTML += template;
        } else {
            carrossel2.innerHTML += template;
        }
    });

    // Adicionando o botão curtir
    document.querySelectorAll('.btn-curtir').forEach(function (botao) {
        let curtido = false; // Iniciamos o botão como falso para que ele só se mostre curtido após o clique
        botao.addEventListener('click', function () {
            const imagemFavorito = botao.querySelector('img');
            if (curtido) {
                imagemFavorito.src = './Public/icons8-gostar-32.png';
            } else {
                imagemFavorito.src = './Public/icons8-coração-cheio-32.png';
            }
            curtido = !curtido;
        });
    });
}

function validarEmail(email) {
    const validacao = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return validacao.test(email);
}

function cadastrarEmail() {
    var email = document.getElementById("email").value;

    if (validarEmail(email)) {
        alert("Email cadastrado com sucesso!");
    } else {
        alert("Por favor, insira um email válido.");
    }
}

// Cupons
document.addEventListener('DOMContentLoaded', function () {
    buscarCosmeticosApi();
    document.querySelector('.topicos-link.cupons').addEventListener('click', function (event) {
        event.preventDefault();
        document.getElementById('cupons').classList.toggle('hidden');
    });
});
