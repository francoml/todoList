const addForm = document.querySelector('.add-form');
const deleteBtnAll = document.querySelector('.deleteAll-btn');
const input = document.querySelector('.input-text');
const tasksList = document.querySelector('.task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const saveLocalStorage = (tasksList) => {
    localStorage.setItem('tasks', JSON.stringify(tasksList));
}

const createTask = (task) => `
    <li>${task.name} <img class="delete-btn" src="./img/delete.svg" alt="botón de borrar tarea" data-id=${task.id}></li>
`

const renderTasksList = (todoList) => {
    tasksList.innerHTML = todoList.map(task => createTask(task)).join('');
}

const hideDeleteAll = (tasksList) => {
    if(!tasksList.length){
        deleteBtnAll.classList.add('hidden');
        return;
    }
    deleteBtnAll.classList.remove('hidden');
}

const addTask = (e) => {
    e.preventDefault();
    const taskName = input.value.trim();

    if(!taskName.length){
        alert('Ingresá una tarea primero!');
        return;
    }else if(tasks.some(task => task.name.toLowerCase() === taskName.toLowerCase())){
        alert('Ingresaste una tarea que ya existe. Probá de nuevo!');
        return;
    }

    tasks = [...tasks, {name: taskName, id: tasks.length+1}];
    input.value = '';

    renderTasksList(tasks);
    saveLocalStorage(tasks);
    hideDeleteAll(tasks);
}

const removeTask = (e) => {
    if(!e.target.classList.contains('delete-btn')) return;

    const filterId = Number(e.target.dataset.id);
    tasks = tasks.filter(task => task.id !== filterId);

    renderTasksList(tasks);
    saveLocalStorage(tasks);
    hideDeleteAll(tasks);
}

const removeAll = () => {
    tasks = [];
    renderTasksList(tasks);
    saveLocalStorage(tasks);
    hideDeleteAll(tasks);
}

const init = () => {
    renderTasksList(tasks);
    addForm.addEventListener('submit', addTask);
    deleteBtnAll.addEventListener('click', removeAll);
    tasksList.addEventListener('click', removeTask);
    hideDeleteAll(tasks);
}

init();