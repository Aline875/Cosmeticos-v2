let cosmeticos = [];

const fakeApi = 'http://localhost:3001/produtos';

async function buscarCosmeticosApi() {
    try {
        const res = await fetch(fakeApi);
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        cosmeticos = data;
        exibirCosmeticos();
    } catch (error) {
        console.error('Erro ao buscar os cosméticos:', error);
    }
}

function exibirCosmeticos() {
    const carrossel1 = document.getElementById("carrossel-1");
    const carrossel2 = document.getElementById("carrossel-2");

    cosmeticos.forEach((cosmetico, index) => {
        const template = `
        <div class="swiper-slide swiper-card">
            <img src="${cosmetico.imagem}" alt="${cosmetico.nome}">
            <div class="produto-info">
                <p class="produto-nome">${cosmetico.nome}</p>
                <p class="produto-preco">${cosmetico.preco ? cosmetico.preco : 'Preço não disponível'}</p>
                <div class="interacoes-produto">
                    <button class="btn-curtir">
                        <img src="/Public/icons8-gostar-32.png" alt="favoritar">
                    </button>
                    <button class="btn-compartilhar">
                        <img src="/Public/icons8-forward-arrow-32.png" alt="compartilhar">
                    </button>
                    <button class="btn-comprar">
                        <img src="/Public/icons8-vender-estoque-32.png" alt="comprar">
                    </button>
                </div>
            </div>
        </div>`;

        // Distribuir os produtos entre os carrosséis
        if (index % 2 === 0) {
            carrossel1.innerHTML += template;
        } else {
            carrossel2.innerHTML += template;
        }
    });

    // Adicionar eventos de clique após renderizar os elementos
    document.querySelectorAll('.btn-curtir').forEach(function (botao) {
        botao.addEventListener('click', function () {
            const imagemFavorito = botao.querySelector('img');
            if (imagemFavorito.src.includes('/Public/icons8-coração-cheio-32.png')) {
                imagemFavorito.src = '/Public/icons8-gostar-32.png';
            } else {
                imagemFavorito.src = '/Public/icons8-coração-cheio-32.png';
            }
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

document.addEventListener('DOMContentLoaded', function () {
    buscarCosmeticosApi();

    // Adicionar evento de clique para mostrar ou ocultar os cupons
    document.querySelector('.topicos-link.cupons').addEventListener('click', function (event) {
        event.preventDefault();
        document.getElementById('cupons').classList.toggle('hidden');
    });
});
