class Task {
    constructor(taskName, id) {
        this.taskName = taskName;
        this.status = 'active';
        this.id = id;
    };
};

let taskList = new Array();
let btnCreatre = document.querySelector('.create-ToDo');
let input = document.querySelector('.ToDo-Name');
let selectStatus = document.getElementById('status');
let list = document.querySelector('.list');

function showList() {
    list.innerHTML = '';
    let taskDiv;
    taskList.forEach( (item, index) => alert(item.taskName))
    for (let task of taskList) {
        if (task.status == selectStatus.value) {
            if (task.status == 'active') {
                taskDiv = `<div class="task" id="q${task.id}">
                        <div class="task-name">${task.taskName}</div>
                        <div class="actions">
                            <button id="complete" class="btn-task">Complete</button><button id="del" class="btn-task">Delete</button>
                        </div>
                    </div>`;
            } else {
                taskDiv = `<div class="task completed" id="q${task.id}">
                        <div class="task-name">${task.taskName}</div>
                    </div>`;
            }
            list.innerHTML += taskDiv;
        };
    };
};

selectStatus.onchange = function() {
    showList();
};

document.onclick = function(e) {
    let target = e.target;
    if (target.id == 'complete') {
        let parent = target.closest('.task');
        let id = +parent.id.slice(1);
        for (let task of taskList) {
            if (task.id == id) {
                parent.remove();
                task.status = 'completed';
                return;
            }
        }
    } else if (target.id == 'del'){
        let parent = target.closest('.task');
        let id = +parent.id.slice(1);
        for (let task of taskList) {
            if (task.id == id) {
                parent.remove();
                taskList.splice(task.id, 1);
                taskList.forEach( (item, index) => item.id = index);
                return;
            }
        }
    }
    
};

btnCreatre.onclick = function() {
    check(input.value);
};

input.onkeydown = function(e) {
    if (e.key != 'Enter') return;
    check(input.value);
}

function check(text) {
    let task = text;
    if (task == '' || task.length > 43) return;
    input.value = '';
    addTask(task);
}


function addTask(newTask) {
    selectStatus.selectedIndex = 0;
    let task = new Task(newTask, taskList.length);
    taskList.push(task);
    addTaskInList(task);
};

function addTaskInList(task) {
    let taskDiv = `<div class="task">
                        <div class="task-name" id="q${taskList.length}">${task.taskName}</div>
                        <div class="actions">
                            <button id="complete" class="btn-task">Complete</button><button id="del" class="btn-task">Delete</button>
                        </div>
                    </div>`;
    list.innerHTML += taskDiv;
};

showList();