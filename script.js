const checkConcluidas = document.getElementById('btn-concluidos')

var link = 'http://localhost:3000/tarefas'

//Verifica se o link do host para dar fetch no array certo
checkConcluidas.addEventListener('click', () => {
    if(link == 'http://localhost:3000/tarefas-concluidas'){
        link = 'http://localhost:3000/tarefas'
    }else{
        link = 'http://localhost:3000/tarefas-concluidas'
    }
    console.log('ok', link)
    fetchTasks(link)
})

document.addEventListener('DOMContentLoaded', () => {
    fetchTasks(link)
})

//Função para carregar a pagina com os elementos
function fetchTasks(link) {
    fetch(link)
    .then(response => response.json())
    .then(data => {
        const showTask = document.getElementById('showTask')
        showTask.innerHTML = ''

        if(data.length == 0){
        const msgEntrada = document.createElement('h1')
        msgEntrada.style.color = 'grey'
        msgEntrada.textContent = 'Insira uma tarefa...'
        console.log('msg', msgEntrada)
        showTask.appendChild(msgEntrada)
        }

        data.forEach((task, index) => {
            //Mostra o li onde tem a task e o botão de remoção da mesma
            const novaTask = document.createElement('li')
            novaTask.setAttribute('data-id', `${task.id}`)
            novaTask.className = 'task'

            //Mostra a task
            const paragrafo = document.createElement('p')
            paragrafo.classList = 'p-task'
            paragrafo.textContent = task.nome

            //Adiciona o index para colocar no ::before
            novaTask.style.setProperty('--before-content', `"${index+1}"`)

            //Mostra o botão da task Feita
            const botaoFeito = document.createElement('button')
            botaoFeito.textContent = '\u2713';
            botaoFeito.className = 'btn'
            botaoFeito.id = 'btn-add'
            botaoFeito.setAttribute('onclick', `concluirTask(${task.id}, event)`)
            
            //Mostra o botão de remover a task
            const botaoRemover = document.createElement('button')
            botaoRemover.textContent = 'X'
            botaoRemover.id = 'btn-remove'
            botaoRemover.className = 'btn'
            botaoRemover.setAttribute('onclick', `removeTask(${task.id}, event)`)
            botaoRemover.setAttribute('data-id', `${task.id}`)

            //Adicona os elementos no li
            novaTask.appendChild(paragrafo)
            novaTask.appendChild(botaoRemover)
            novaTask.appendChild(botaoFeito)

            //Colore de verde se estiver concluida
            if(task.concluida == true){
                novaTask.style.backgroundColor = '#548e72'
                novaTask.removeChild(botaoFeito)
            }

            //Adicionando a div dentro da lista de tarefas
            showTask.appendChild(novaTask)
            
        })
    })
    .catch(err => console.error('Erro ao buscar as tarefas:', err))
}

function adicionarTask() {

    const textInput = document.querySelector('#textInput')
    const showTask = document.querySelector('#showTask')
    
    if (textInput.value.length <= 0) {
        alert('Erro, digite alguma tarefa a ser adicionada!')
        return false
    } else {
        console.log(`Tudo ok, o value do textInput é ${textInput.value}, o showTask é ${showTask} e o value dele é ${showTask.value}`)

        //Criação do li onde tem a task e o botão de remoção da mesma
        const novaTask = document.createElement('li')
        novaTask.className = 'task'

        //Criação da task
        const paragrafo = document.createElement('p')
        paragrafo.classList = 'p-task'
        paragrafo.textContent = textInput.value

        //Criação do objeto task, com seu nome e id
        const task = {
            id: Date.now().toString(),
            nome: paragrafo.textContent,
            concluida: false
        }

        //Criação do botão da task Feita
        const botaoFeito = document.createElement('button')
        botaoFeito.textContent = '\u2713';
        botaoFeito.className = 'btn'
        botaoFeito.id = 'btn-add'
        botaoFeito.setAttribute('onclick', `concluirTask(${task.id}, event)`)

        //Criação do botão de remover a task
        const botaoRemover = document.createElement('button')
        botaoRemover.textContent = 'X'
        botaoRemover.id = 'btn-remove'
        botaoRemover.className = 'btn'
        botaoRemover.setAttribute('onclick', `removeTask(${task.id}, event)`)
        botaoRemover.setAttribute('data-id', `${task.id}`)

        //Adicionando os elementos no li
        novaTask.appendChild(paragrafo)
        novaTask.appendChild(botaoRemover)
        novaTask.appendChild(botaoFeito)

        //Adicionando a div dentro da lista de tarefas
        showTask.appendChild(novaTask)

        //Limpar a caixa de texto do Input
        textInput.value = ''
        
        //Enviando o objeto task para o db.json
        fetch('http://localhost:3000/tarefas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Tarefa adicionada com sucesso:', data)
        })
        .catch(err => console.error('Erro ao adicionar a tarefa:', err))

        textInput.value = ''
        textInput.focus()
    }
}

function removeTask(id, event) {
    event.preventDefault()

    console.log(link, id)
    fetch(`${link}/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        console.log('Tarefa removida com sucesso', data)
    })
    .catch(err => console.error('Erro ao remover tarefa', err))
}

//Buscar as tarefas
const sourceInput = document.getElementById('sourceInput')

sourceInput.addEventListener('input', function buscarTarefa(){

    const listaDeTarefas = document.querySelector('#showTask')
    listaDeTarefas.innerHTML = ''

    fetch('http://localhost:3000/tarefas')
    .then(response => response.json())
    .then(data => {

        console.log(data)
        const arrComTarefas = data
        const tarefasFiltradas = arrComTarefas.filter(tarefa => tarefa.nome.includes(sourceInput.value))

        console.log(tarefasFiltradas)

        tarefasFiltradas.forEach(task => {

            //Mostra o li onde tem a task e o botão de remoção da mesma
            const novaTask = document.createElement('li')
            novaTask.className = 'task'

            //Mostra a task
            const paragrafo = document.createElement('p')
            paragrafo.classList = 'p-task'
            paragrafo.textContent = task.nome;

            //Mostra o botão da task Feita
            const botaoFeito = document.createElement('button')
            botaoFeito.textContent = '\u2713';
            botaoFeito.className = 'btn'
            botaoFeito.id = 'btn-add'
            botaoFeito.setAttribute('onclick', 'concluirTask()')

            //Mostra o botão de remover a task
            const botaoRemover = document.createElement('button')
            botaoRemover.textContent = 'X'
            botaoRemover.id = 'btn-remove'
            botaoRemover.className = 'btn'
            botaoRemover.setAttribute('onclick', `removeTask(${task.id})`)
            botaoRemover.setAttribute('data-id', `${task.id}`)

            //Adicona os elementos no li
            novaTask.appendChild(paragrafo)
            novaTask.appendChild(botaoRemover)
            novaTask.appendChild(botaoFeito)

            //Adicionando a div dentro da lista de tarefas
            showTask.appendChild(novaTask)
        })
})
})

//função de conclusão de task
function concluirTask(id, event) {
    event.preventDefault()

    fetch('http://localhost:3000/tarefas')
        .then(response => response.json())
        .then(data => {
            console.log('esse é o data ', data);
            console.log('esse é o id: ', id);
            data.forEach(tarefa => {

                //Se a tarefa verificada tiver o mesmo id do botão ela será movida para o array tarefas-concluidas
                if(tarefa.id == id){

                    tarefa.concluida = true

                    console.log(`tarefa id ${tarefa.id}, tarefa nome ${tarefa.nome}, tarefa concluida ${tarefa.concluida}`)
    
                    //Mandando a tarefa concluída
                    fetch('http://localhost:3000/tarefas-concluidas', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(tarefa)
                    })
                    .then(resp => resp.json)
                    .then(data => {
                        console.log('Dados enviados com sucesso ', data)
                    })
                    .catch(error => console.log('Erro: ', error))
                    removeTask(id, event)
                }
                
            })
        
        })
}