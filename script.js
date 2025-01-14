const checkConcluidas = document.getElementById("btn-concluidos");

var link = "tarefas";

//Verifica se o link do host para dar fetch no array certo
checkConcluidas.addEventListener("click", () => {
  if (link == "tarefas-concluidas") {
    link = "tarefas";
  } else {
    link = "tarefas-concluidas";
  }
  console.log("ok", link);
  fetchTasks(link);
});

document.addEventListener("DOMContentLoaded", () => {
  fetchTasks(link);
});

//Função para carregar a pagina com os elementos
function fetchTasks(link) {
  let tasks = JSON.parse(localStorage.getItem(link)) || [];
  const showTask = document.getElementById("showTask");
  showTask.innerHTML = "";

  if (tasks.length == 0) {
    const msgEntrada = document.createElement("h1");
    msgEntrada.style.color = "grey";
    msgEntrada.textContent = "Insira uma tarefa...";
    console.log("msg", msgEntrada);
    showTask.appendChild(msgEntrada);
  }

  tasks.forEach((task, index) => {
    //Mostra o li onde tem a task e o botão de remoção da mesma
    const novaTask = document.createElement("li");
    novaTask.setAttribute("data-id", `${task.id}`);
    novaTask.className = "task";

    //Mostra a task
    const paragrafo = document.createElement("p");
    paragrafo.classList = "p-task";
    paragrafo.textContent = task.nome;

    //Adiciona o index para colocar no ::before
    novaTask.style.setProperty("--before-content", `"${index + 1}"`);

    //Mostra o botão da task Feita
    const botaoFeito = document.createElement("button");
    botaoFeito.textContent = "\u2713";
    botaoFeito.className = "btn";
    botaoFeito.id = "btn-add";
    botaoFeito.setAttribute("onclick", `concluirTask(${task.id}, event)`);

    //Mostra o botão de remover a task
    const botaoRemover = document.createElement("button");
    botaoRemover.textContent = "X";
    botaoRemover.id = "btn-remove";
    botaoRemover.className = "btn";
    botaoRemover.setAttribute("onclick", `removeTask(${task.id}, event)`);
    botaoRemover.setAttribute("data-id", `${task.id}`);

    //Adicona os elementos no li
    novaTask.appendChild(paragrafo);
    novaTask.appendChild(botaoRemover);
    novaTask.appendChild(botaoFeito);

    //Colore de verde se estiver concluida
    if (task.concluida == true) {
      novaTask.style.backgroundColor = "#548e72";
      novaTask.removeChild(botaoFeito);
    }

    //Adicionando a div dentro da lista de tarefas
    showTask.appendChild(novaTask);
  });
}

function adicionarTask() {
  const textInput = document.querySelector("#textInput");
  const showTask = document.querySelector("#showTask");

  if (textInput.value.length <= 0) {
    alert("Erro, digite alguma tarefa a ser adicionada!");
    return false;
  } else {
    console.log(
      `Tudo ok, o value do textInput é ${textInput.value}, o showTask é ${showTask} e o value dele é ${showTask.value}`
    );

    //Criação do li onde tem a task e o botão de remoção da mesma
    const novaTask = document.createElement("li");
    novaTask.className = "task";

    //Criação da task
    const paragrafo = document.createElement("p");
    paragrafo.classList = "p-task";
    paragrafo.textContent = textInput.value;

    //Criação do objeto task, com seu nome e id
    const task = {
      id: Date.now().toString(),
      nome: paragrafo.textContent,
      concluida: false,
    };

    //Criação do botão da task Feita
    const botaoFeito = document.createElement("button");
    botaoFeito.textContent = "\u2713";
    botaoFeito.className = "btn";
    botaoFeito.id = "btn-add";
    botaoFeito.setAttribute("onclick", `concluirTask(${task.id}, event)`);

    //Criação do botão de remover a task
    const botaoRemover = document.createElement("button");
    botaoRemover.textContent = "X";
    botaoRemover.id = "btn-remove";
    botaoRemover.className = "btn";
    botaoRemover.setAttribute("onclick", `removeTask(${task.id}, event)`);
    botaoRemover.setAttribute("data-id", `${task.id}`);

    //Adicionando os elementos no li
    novaTask.appendChild(paragrafo);
    novaTask.appendChild(botaoRemover);
    novaTask.appendChild(botaoFeito);

    //Adicionando a div dentro da lista de tarefas
    showTask.appendChild(novaTask);

    //Salvar a tarefa no localStorage
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    tarefas.push(task);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));

    //Limpar a caixa de texto do Input
    textInput.value = "";
    textInput.focus();
  }
}

function removeTask(id, event) {
  event.preventDefault();

  let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  tarefas = tarefas.filter((task) => task.id != id);
  localStorage.setItem(link, JSON.stringify(tarefas));

  console.log("Tarefa removida com sucesso");
  fetchTasks(link);
}

//Buscar as tarefas
const sourceInput = document.getElementById("sourceInput");

sourceInput.addEventListener("input", function buscarTarefa() {
  const listaDeTarefas = document.querySelector("#showTask");
  listaDeTarefas.innerHTML = "";

  let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  const tarefasFiltradas = tarefas.filter((tarefa) =>
    tarefa.nome.includes(sourceInput.value)
  );

  console.log(tarefasFiltradas);

  tarefasFiltradas.forEach((task) => {
    //Mostra o li onde tem a task e o botão de remoção da mesma
    const novaTask = document.createElement("li");
    novaTask.className = "task";

    //Mostra a task
    const paragrafo = document.createElement("p");
    paragrafo.classList = "p-task";
    paragrafo.textContent = task.nome;

    //Mostra o botão da task Feita
    const botaoFeito = document.createElement("button");
    botaoFeito.textContent = "\u2713";
    botaoFeito.className = "btn";
    botaoFeito.id = "btn-add";
    botaoFeito.setAttribute("onclick", `concluirTask(${task.id}, event)`);

    //Mostra o botão de remover a task
    const botaoRemover = document.createElement("button");
    botaoRemover.textContent = "X";
    botaoRemover.id = "btn-remove";
    botaoRemover.className = "btn";
    botaoRemover.setAttribute("onclick", `removeTask(${task.id})`);
    botaoRemover.setAttribute("data-id", `${task.id}`);

    //Adicona os elementos no li
    novaTask.appendChild(paragrafo);
    novaTask.appendChild(botaoRemover);
    novaTask.appendChild(botaoFeito);

    //Adicionando a div dentro da lista de tarefas
    showTask.appendChild(novaTask);
  });
});

//função de conclusão de task
function concluirTask(id, event) {
  event.preventDefault();

  let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  let tarefaConcluida = null;

  tarefas = tarefas.map((task) => {
    if (task.id == id) {
      task.concluida = true;
      tarefaConcluida = task;
    }
    return task;
  });

  localStorage.setItem("tarefas", JSON.stringify(tarefas));

  if (tarefaConcluida) {
    let tarefasConcluidas =
      JSON.parse(localStorage.getItem("tarefas-concluidas")) || [];
    tarefasConcluidas.push(tarefaConcluida);
    localStorage.setItem(
      "tarefas-concluidas",
      JSON.stringify(tarefasConcluidas)
    );
  }

  removeTask(id, event);
  fetchTasks(link);
}
