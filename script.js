function validarEmail(email)
{
    const validacao = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return validacao.test(email)
}

function cadastrarEmail() {
    var email = document.getElementById("email").value;

    if(validarEmail(email))
        {
            document.getElementById("mensagem-sucesso").innerHTML = "Email cadastrado com sucesso!"; 
        }
        else
        {
            document.getElementById("mensagem-erro").innerHTML = "Por favor, insira um email válido."
        }
}