let form = document.querySelector('.add-btn')
let delBtns = document.querySelectorAll('.del-btn')
let input = document.querySelector('.add-input')
let tasksContainer = document.querySelector('.tasks-container')
let checkmarks = document.querySelectorAll('.container')

delBtns.forEach(btn => btn.addEventListener('click', delTaskContainer))
checkmarks.forEach(checkmark => checkmark.addEventListener('click', changeTaskStatus))
form.addEventListener('click', addTaskContainer)

function delTaskContainer() {
    this.parentElement.parentElement.remove()
}

function changeTaskStatus(event) {
    if(event.target.type) {
        this.parentElement.classList.toggle('done')
    }
}

function addTaskContainer(event) {
    //console.log(event.target) //Не знаю как нормально обрабатывать сабмит, потому что event target разный и при клике вызываетсся 2 раза
    if(event.target.type) {
        let value = input.value
        let newTask = document.createElement('div')
        newTask.className = 'task-container'
        //добавить проверку на пустоту строки
        newTask.innerHTML = `
        <label class="container">
            ${value}
            <input type="checkbox">
            <span class="checkmark"></span>
        </label>
        <div class="del-container">
            <span class="del-btn"></span>
        </div>
        `
        tasksContainer.append(newTask)
        input.value = ''
        newTask.querySelector('.del-btn').addEventListener('click', delTaskContainer);
        newTask.querySelector('.container').addEventListener('click', changeTaskStatus);
    }
}