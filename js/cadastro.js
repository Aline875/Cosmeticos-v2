document.getElementById('form').addEventListener('submit', async function(event) {
  event.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const confirmarSenha = document.getElementById('confirmarSenha').value;

  if (senha !== confirmarSenha) {
      alert('As senhas não coincidem');
      return;
  }

  const usuario = { nome, email, senha };

  try {
      const response = await fetch('http://localhost:3000/api/usuario', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(usuario)
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error);
      }

      alert('Usuário cadastrado com sucesso!');
      window.location.href = '../html/login.html';
  } catch (error) {
      console.error('Erro ao cadastrar o usuário:', error);
      alert(`Erro ao cadastrar o usuário: ${error.message}`);
  }
});
