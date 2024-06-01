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
    // Adiciona evento de clique para mostrar ou ocultar os cupons
    document.querySelector('.topicos-link.cupons').addEventListener('click', function (event) {
        event.preventDefault();
        document.getElementById('cupons').classList.toggle('hidden');
    });

    // Adiciona evento de clique para mudar a imagem do botão de favoritar (like)
    const botoesFavoritar = document.querySelectorAll('.btn-curtir');

    botoesFavoritar.forEach(function (botao) {
        botao.addEventListener('click', function () {
            const imagemFavorito = botao.querySelector('img');
            if (imagemFavorito.src.includes('/Public/icons8-coração-cheio-32.png')) {
                imagemFavorito.src = '/Public/icons8-gostar-32.png';
            } else {
                imagemFavorito.src = '/Public/icons8-coração-cheio-32.png';
            }
        });
    });
});
