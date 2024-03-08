    const matricula = document.querySelector('#matricula');
    const data = document.querySelector('#datahora');
    const observacao = document.querySelector('#observacao');
    const editar = document.querySelector('#editar');
    const voltar = document.querySelector('#voltar');
    const logo = document.querySelector('#logo');
    const parametros = new URLSearchParams(window.location.search);
    const id = parametros.get('id')
    const matriculaURL = parametros.get('matricula')
    console.log(matriculaURL)
    matricula.value = matriculaURL;

    voltar.addEventListener('click', (event)=>{
      event.preventDefault();
      window.location.href = `../index.html`;
    })

    editar.addEventListener('click', async (event) => {
      event.preventDefault();
      logo.src='../img/loading.gif';

      if(!data.value && !observacao.value){
        logo.src='../img/bird.svg';
        return alert('Preencha os campos para atualizar');
      }
      try {
        const raw = {
          data: data.value,
          observacao: observacao.value,
        }

        const requestOptions = {
          method: 'PUT',
          body: JSON.stringify(raw),
          redirect: 'follow',
          headers: {
            "Content-Type": "application/json"
          }
      };
      const resposta = await fetch(`https://conecta.cyclic.app/entradas/${id}`, requestOptions);
      const conteudo = await resposta.json();

      if(conteudo == 'Registro atualizado com sucesso!'){
        alert('Registro atualizado com sucesso!');
        logo.src='../img/loading.gif';
        window.location.href = '../index.html';
      }

      console.log(conteudo)
        
      } catch (error) {
        console.log(error);
      }
    })