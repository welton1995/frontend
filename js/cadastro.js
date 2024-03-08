  const nome = document.querySelector('#nome');
  const matricula = document.querySelector('#matricula');
  const rg = document.querySelector('#rg');
  const cpf = document.querySelector('#cpf');
  const cadastrar = document.querySelector('#cadastrar');
  const logo = document.querySelector('#logo');

  cadastrar.addEventListener('click', async (event)=>{
    logo.src="../img/loading.gif"
    event.preventDefault();
    if(!nome.value){
      return alert('Por favor preencha o campo nome!');
    }

    if(!rg.value || rg.value.length != 9){
      return alert('O campo RG deve ter 9 digitos');
    }
    if(!cpf.value || cpf.value.length != 11){
      return alert('O campo CPF deve 11 digitos');
    }


    try {
      function gerarMatricula() {
        let numero = Math.floor(Math.random() * 1000000);
        numero = numero.toString().padStart(6, '0');
        return numero;
      }

      const raw = {
        matricula: gerarMatricula(),
        nome: nome.value,
        rg: rg.value,
        cpf: cpf.value,
      }
      const requestOptions = {
        method: 'POST',
        body: JSON.stringify(raw),
        redirect: 'follow',
        headers: {
          "Content-Type": "application/json"
        }
    };

    const resposta = await fetch(`https://conecta.cyclic.app/matriculas`, requestOptions)
    const conteudo = await resposta.json();

    if(conteudo == 'Matricula já cadastrada!'){
      alert(conteudo);
    }
    if(conteudo == 'RG já cadastrado!'){
      alert(conteudo);
    }
    if(conteudo == 'CPF já cadastrado!'){
      alert(conteudo);
    }

    alert(`Matricula cadastrada com sucesso! O número da sua matrícula é:\n ${conteudo.matricula}`)

    window.location.href="../index.html";
  
    // logo.src="../img/bird.svg"
    
    } catch (error) {
      console.log(error);
    }
  });

