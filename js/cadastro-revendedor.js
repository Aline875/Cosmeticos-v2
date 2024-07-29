import ehUmCPF from "./valida-cpf-revendedor.js";
import ehMaiorDeidade from "./valida-idade-revendedor.js";

const camposDoFormulario = document.querySelectorAll('[required]');
const formulario = document.querySelector('[data-formulario]');

formulario.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const cpf = document.getElementById('cpf').value;
    const telefone = document.getElementById('telefone').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;
    const aniversario = document.getElementById('aniversario').value;

    const revendedor = {
        nome,
        email,
        senha,
        confirmarSenha,
        cpf,
        telefone,
        aniversario
    };

    try {
        const response = await fetch('http://localhost:3000/api/revendedor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(revendedor)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error);
        }

        alert('Revendedor cadastrado com sucesso!');
        window.location.href = '../html/login.html';
    } catch (error) {
        console.error('Erro ao cadastrar o Revendedor:', error);
        alert(`Erro ao cadastrar o Revendedor: ${error.message}`);
    }
});

camposDoFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificaCampo(campo));
    campo.addEventListener("invalid", evento => evento.preventDefault());
});

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
];

const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    },
    telefone: {
        valueMissing: 'O campo de Telefone não pode permanecer vazio'
    }
};

function verificaCampo(campo) {
    let mensagem = "";
    campo.setCustomValidity('');
    if (campo.name === "cpf" && campo.value.length >= 11) {
        ehUmCPF(campo);
    }

    if (campo.name === "aniversario" && campo.value !== "") {
        ehMaiorDeidade(campo);
    }

    tiposDeErro.forEach(erro => {
        if (campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro];
        }
    });

    // Imprimindo a mensagem na tela
    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro');
    const validadorDeInput = campo.checkValidity();

    if (!validadorDeInput) {
        mensagemErro.textContent = mensagem;
    } else {
        mensagemErro.textContent = "";
    }
}
