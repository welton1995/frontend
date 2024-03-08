  // const nome = document.querySelector('#nome');
  // const rg = document.querySelector('#rg');
  // const cpf = document.querySelector('#cpf');
  const matricula = document.querySelector('#matricula');
  const data = document.querySelector('#data');
  const apagar = document.querySelector('#apagar');
  const logo = document.querySelector('#logo');
  const voltar = document.querySelector('#voltar');

  const parametros = new URLSearchParams(window.location.search);
  const id = parametros.get('id')
  const matriculaURL = parametros.get('matricula')
  const dataURL = parametros.get('data')
  const dataFormatada = new Date(dataURL)
  const dataCorreta = dataFormatada.toLocaleDateString('pt-BR', {timeZone: 'UTC',weekday:'long', year: 'numeric', month:'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'});
  matricula.value = matriculaURL;
  data.value = dataCorreta;
  
  apagar.addEventListener('click', async (event)=>{
    try {
      event.preventDefault();
        logo.src='../img/loading.gif';
        const requestOptions = {
          method: 'DELETE',
          redirect: 'follow',
          headers: {
            "Content-Type": "application/json"
          }
      };
      const resposta = await fetch(`https://conecta.cyclic.app/entradas/${id}`, requestOptions);
      const conteudo = await resposta.json();

      if(conteudo == 'Registro removido com sucesso!'){
        alert('Registro removido com sucesso!');
        window.location.href = '../index.html';
      }

      console.log(conteudo)
      logo.src='../img/bird.svg';

    } catch (error) {
      console.log(error);
    }
  })


