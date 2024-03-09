const buscar = document.querySelector('#buscar');
const voltar = document.querySelector('#voltar');
const cpf = document.querySelector('#cpf');

// Leva o usuario para página inicial
voltar.addEventListener('click', (event) => {
  event.preventDefault();
try {
  window.location.href = '../index.html';
} catch (error) {
  console.log(error);
}
});

// Busca CPF no Banco de dados
buscar.addEventListener('click', async (event) => {
  event.preventDefault();
  if(!cpf.value || cpf.value.length != 11){
    Swal.fire({
      title: "O campo 'CPF' deve conter 11 digitos!",
      icon: "warning",
    });
    return;
  }

  try {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: {
        "Content-Type": "application/json"
      }
  };
  const resposta = await fetch(`https://conecta.cyclic.app/matriculas/cpf/${cpf.value}`, requestOptions);
  const conteudo = await resposta.json();

  if(conteudo == 'Matrícula não encontrada!'){
    Swal.fire({
      title: "CPF não cadastrado!",
      icon: "warning",
    });
    return;
  }

  Swal.fire({
    title: `${conteudo.infos.nome}`,
    icon: "success",
    html: `
    <b>Matrícula</b>: ${conteudo.infos.matricula}<br>
    <b>CPF</b>: ${conteudo.infos.cpf}<br>
    <b>RG</b>: ${conteudo.infos.rg}<br>
    `
  });


  console.log(conteudo.infos);
  } catch (error) {
    console.log(error);
  }
})