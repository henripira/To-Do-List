const button = document.querySelector('.button-add-task')
const input = document.querySelector('.input-task')
const listaCompleta = document.querySelector('.list-tasks')

let minhaListaDeItens = []
//adiciona uma nova tarefa na lista
function adicionarNovaTarefa() {
  minhaListaDeItens.push({
    tarefa: input.value,
    concluida: false,
  })

  input.value = ''

  mostrarTarefas()
}
//função para criar linhas na lista das tarefas, em posição
function mostrarTarefas() {
  let novaLi = ''

  // ['comprar café', 'estudar programação']

  minhaListaDeItens.forEach((item, posicao) => {
    novaLi = novaLi +
      `
        <li class="task ${item.concluida && 'done'}">
            <img src="./img/checked.png" alt="check-na-tarefa" onclick="concluirTarefa(${posicao})">
            <p>${item.tarefa}</p>
            <img src="./img/trash.png" alt="tarefa-para-o-lixo" onclick="deletarItem(${posicao})">
        </li>
        `
  })

  listaCompleta.innerHTML = novaLi
  //acesso ao local storage convertendo em string as tarefas na lista.
  localStorage.setItem('lista', JSON.stringify(minhaListaDeItens))
}
//função para alterar valor da var concluida em minhaListaDeIntens para true
function concluirTarefa(posicao) {
  minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida

  mostrarTarefas()
}
//funcçao com splice para remover item do array com condição pela posição
function deletarItem(posicao) {
  minhaListaDeItens.splice(posicao, 1)

  mostrarTarefas()
}
//recarrega tarefas ja inseridas anteriormente
function recarregarTarefas() {
  const tarefasDoLocalStorage = localStorage.getItem('lista')
    //condiciona a se nao tiver nada na lista adicionado, ele nao da erro, e converte string para objeto
  if (tarefasDoLocalStorage) {
    minhaListaDeItens = JSON.parse(tarefasDoLocalStorage)
  }

  mostrarTarefas()
}

recarregarTarefas()
button.addEventListener('click', adicionarNovaTarefa)