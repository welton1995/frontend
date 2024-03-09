  // const campoMatricula = document.querySelector('#matricula');
  const data = document.querySelector('#datahora');
  const observacao = document.querySelector('#observacao');
  const matricula = document.querySelector('#matricula');
  const registrar = document.querySelector('#registrar');
  const alerta = document.querySelector('#alerta');
  const elementoAlvo = document.querySelector('#tabela');

// Registra as matriculas no Banco de dados
  registrar.addEventListener('click', async (event)=> {
    document.querySelector("#logo").style.display = "block";
    event.preventDefault();
    try {
      if(!matricula.value || !data.value){
        Swal.fire({
          title: "Preencha os campos e tente novamente!",
          icon: "warning",
          color: "black",
        });
    document.querySelector("#logo").style.display = "none";
    return 
      }

      if(!matricula.value || matricula.value.length != 6){
        Swal.fire({
          title: "O campo matricula deve ter 6 digitos",
          icon: "error"
        });
        document.querySelector("#logo").style.display = "none";
        return
      }

      const raw = {
        matricula: matricula.value,
        data: data.value,
        observacao: observacao.value
      }
      const requestOptions = {
        method: 'POST',
        body: JSON.stringify(raw),
        redirect: 'follow',
        headers: {
          "Content-Type": "application/json"
        }
    };

    const resposta = await fetch(`https://conecta.cyclic.app/entradas`, requestOptions)
    const conteudo = await resposta.json();

    if(conteudo == 'Matrícula não cadastrada!'){
      Swal.fire({
        title: "Matricula não encontrada! Por favor cadastre-se!",
        icon: "error"
      });
      document.querySelector("#logo").style.display = "none";
      return ;
    }

    if(conteudo == 'Matrícula cadastrada com sucesso!'){
      document.querySelector("#logo").style.display = "none";
    }

    // Sweet alert envia msg de sucesso!
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Acesso registrado"
    });

    setTimeout(() => {
      window.location.reload();
    }, 2000);

    } catch (error) {
      console.log(error);
    }
  });


// Busca as matriculas no Banco de Dados
    const relatorios = async()=>{
      document.querySelector('#loading').style.display = 'block';
      try {
        const requestOptions = {
          method: 'GET',
          redirect: 'follow'
      };
      const resposta = await fetch(`https://conecta.cyclic.app/entradas`, requestOptions)
      const conteudo = await resposta.json();
      console.log(conteudo)
      if(conteudo.entradas == []){
        document.querySelector('#loading').style.display = 'none';
        document.querySelector('#vazio').style.display = 'block';
        return console.log('vazio!');
      }
      

      conteudo.entradas.reverse().forEach((entrada)=>{
        const dataFormatada = new Date(entrada.data);
        const dataCorreta = dataFormatada.toLocaleDateString('pt-BR', {timeZone: 'UTC',weekday:'long', year: 'numeric', month:'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'});
        const tabela = document.querySelector('#tabela');
        const tr = document.createElement('tr');
        tr.innerHTML = `

        <td class='text-center'>${entrada.matricula}</td>
        <td class="text-center">${dataCorreta}</td>
        <td class="text-center">${entrada.observacao}</td>
        <td  class="text-center">
            <a href="html/baixar.html?id=${entrada._id}&matricula=${entrada.matricula}&observacao=${entrada.observacao}&data=${entrada.data}" class="btn btn-outline-secondary mb-1">💾</a>
            <a href="html/editar.html?id=${entrada._id}&matricula=${entrada.matricula}" class="btn btn-outline-secondary mb-1">✏️</a>
            <a href="html/apagar.html?matricula=${entrada.matricula}&id=${entrada._id}&data=${entrada.data}" class="btn btn-outline-secondary mb-1">🗑️</i></a>
            <a href="html/info.html?id=${entrada.matricula}" class="btn btn-outline-secondary mb-1">⚙️</a>
        </td>
        `
        tabela.appendChild(tr)
        document.querySelector('#vazio').style.display = 'none';
        document.querySelector('#loading').style.display = 'none';

      });

      document.querySelector("#loading").style.display = "none";

      } catch (error) {
        console.log(error);
        document.querySelector('#loading').style.display = 'none';

      }
    }
    relatorios();