statuses = new Set()

const list = {
    "create a task": "In Progress",
    "make a bed": "Done",
    "write a post": "To Do",
}

function addNewStatus(status) {
    if (!statuses.has(status)) statuses.set(status)
}

function deleteStatus(status) {
    if (statuses.has(status)) statuses.delete(status);
}

function changeStatus(task, newStatus) {
    if(!(task in list)) return new Error('Uncknown task');
    list[task] = newStatus
    addNewStatus(newStatus)
}

function addTask(task, status) {
    if(task in list) return new Error('Task already exist');
    list[task] = status 
    addNewStatus(status)
}

function deleteTask(task) {
    if(!(task in list)) return new Error('Uncknown task');
    delete list[task] 
}

function showList() {

}

