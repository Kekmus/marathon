class Task {
    constructor(name, status, priority) {
        this.id = currentId
        currentId++;
        this.name = name
        this.status = status
        this.priority = priority
    }
}


let currentId = 0;
const list = new Set()
list.add(new Task('create post', 'TODO', 'low'))
list.add(new Task('test', 'done', 'high'))

function changeStatus(taskName, newStatus) {
    for(let task of list) {
        if(task.name === taskName) {
            task.status = newStatus
            return
        }
    }
    return new Error('Uncknown task');
}

function addTask(name, status, priority) {
    for(let task of list) {
        if(task.name === name)
            return new Error('Task already exist');
    }
    list.add(new Task(name, status, priority))
}

function deleteTask(name) {
    for(let task of list) {
        if(task.name === name) {
            list.delete(task)
            return
        }
    }
    return new Error('Uncknown task');
}

function showList() {
    console.log(list)
}

// showList()
// changeStatus('test', 'newStatus')
// changeStatus('test111', 'newStatus')
// showList()
// addTask('work', 'TODO', 'medium')
// addTask('kek1', 'kek2', 'kek3')
// showList()
// deleteTask('kek1')
// deleteTask('kek2')
// showList()
