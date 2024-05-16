// validations.js

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function verificarCamposEmBranco(...campos) {
    return campos.some(campo => campo.trim() === "");
}

// Agora, vamos usar essas funções nos arquivos login.js e cadastro.js diretamente.
