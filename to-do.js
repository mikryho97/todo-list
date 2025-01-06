const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
// Проверка ввода
function validateInput(input) {
    if (input.trim() === '') {
        alert('Input your task!');
        return false;
    }
    return true;
}
// Создание задачи
function createTask(taskText) {
    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.style.marginLeft = '10px';
    deleteButton.style.background = 'red';
    deleteButton.style.borderRadius = '5px';
    deleteButton.style.paddingBottom = '10px';

    deleteButton.addEventListener('click', function () {
        taskItem.remove();
        saveTasksToLocalStorage(); // Сохраняем изменения
    });

    taskItem.appendChild(deleteButton);
    return taskItem;
}
// Сохранение задач в Local Storage
function saveTasksToLocalStorage() {
    const tasks = [];
    const listItems = document.querySelectorAll('#taskList li');

    listItems.forEach((item) => {
        tasks.push(item.textContent.replace('Delete', '').trim());
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Загрузка задач из Local Storage
function loadTasksFromLocalStorage() {
    const savedTasks = localStorage.getItem('tasks');

    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);

        tasks.forEach((taskText) => {
            const taskItem = createTask(taskText);
            taskList.appendChild(taskItem);
        });
    }
}
// Обработчик кнопки "Добавить"
addTaskButton.addEventListener('click', function () {
    const taskText = taskInput.value.trim();
    if (!validateInput(taskText)) return;

    const taskItem = createTask(taskText);
    taskList.appendChild(taskItem);
    taskInput.value = '';

    saveTasksToLocalStorage();
});
// Загружаем задачи при загрузке страницы
loadTasksFromLocalStorage();




