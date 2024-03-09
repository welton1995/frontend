  const nome = document.querySelector('#nome');
  const matricula = document.querySelector('#matricula');
  const rg = document.querySelector('#rg');
  const cpf = document.querySelector('#cpf');
  const cadastrar = document.querySelector('#cadastrar');
  const logo = document.querySelector('#logo');

  //  Função para cadastrar o usúario no Banco de dados
  cadastrar.addEventListener('click', async (event)=>{
    logo.src="../img/loading.gif"
    event.preventDefault();

    if(!nome.value){ // Valida nome
      Swal.fire({
        title: "Por favor preencha o campo 'Nome'!",
        icon: "warning",
      });
      logo.src = '../img/bird.svg';
      return
    }

    if(!rg.value || rg.value.length != 9){ // Valida RG
      Swal.fire({
        title: "O Campo 'RG' deve conter 9 digitos",
        icon: "warning",
      });
      logo.src = '../img/bird.svg';
      return
    }
    if(!cpf.value || cpf.value.length != 11){ // Valida CPF
            Swal.fire({
        title: "O Campo 'CPF' deve conter 11 digitos",
        icon: "warning",
      });
      logo.src = '../img/bird.svg';
      return
    }


    try {
      // Função que gera um número aleatório
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
      Swal.fire({
        title: "Matrícula já cadastrada. Por favor tente novamente",
        icon: "error",
      });
      logo.src = '../img/bird.svg';
      return
    }
    if(conteudo == 'RG já cadastrado!'){
      Swal.fire({
        title: "RG já cadastrado!",
        icon: "error",
      });
      logo.src = '../img/bird.svg';
      return
    }
    if(conteudo == 'CPF já cadastrado!'){
      Swal.fire({
        title: "CPF já cadastrado!",
        icon: "error",
      });
      logo.src = '../img/bird.svg';
      return
    }

    Swal.fire({
      title: "Cadastro realizado com sucesso!",
      icon: "success",
      html:`O número da sua matrícula é: <h3>${conteudo.matricula}</h3>`
    });
    logo.src = '../img/bird.svg';
  
    // Leva usuario para pagina inicial
    setTimeout(() => {
      window.location.href="../index.html";
    }, 5000);
  
    } catch (error) {
      console.log(error);
    }
  });

