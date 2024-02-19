document.addEventListener('DOMContentLoaded', (event) => {

let taskCount = parseInt(localStorage.getItem('taskCount')) || 0; 
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];


const taskInput = document.getElementById('form2');
const addButton = document.getElementById('add');
const list = document.querySelector('.taskListall');

addButton.addEventListener('click', function() {
    const task = taskInput.value.trim();

    if (task === '') {
        alert('Please enter a task');
        return;
    }

    tasks.push(task);
    addTaskto(task);
    taskInput.value = '';

    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskCount++;
    localStorage.setItem('taskCount', taskCount);
    document.getElementById('taskCount').innerHTML = `Number of tasks: ${taskCount}`;


});

    if (Array.isArray(tasks)) {
        tasks.forEach((task) => {
            addTaskto(task);
        });
    } else {
        console.error('tasks is not an array:', tasks);
    }




    function addTaskto(task = '') {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex align-items-center border-0 mb-2 rounded';
        li.innerHTML = task; 

        li.innerHTML = `<span class="me-auto">${task}</span>`;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'form-check-input me-2';


        checkbox.addEventListener('change', function() {
            const taskTextElement = li.querySelector('span');
            if (checkbox.checked) {
                taskTextElement.style.textDecoration = "line-through"; 
            }
            else {
                taskTextElement.style.textDecoration = "none"; 
            }
        });
        
        li.prepend(checkbox);
    


        const closeButton = document.createElement('button');
        closeButton.className = 'close small-x';
        closeButton.innerHTML = 'X'; 

        closeButton.addEventListener('click', function() {
            const index = tasks.indexOf(task);
            if (index > -1) {
                tasks.splice(index, 1);
                taskCount--;
                localStorage.setItem('tasks', JSON.stringify(tasks));
                localStorage.setItem('taskCount', taskCount);
                document.getElementById('taskCount').innerHTML = `Number of tasks: ${taskCount}`; 

                li.parentNode.removeChild(li);
            }
        });
    
        li.appendChild(closeButton); 
        list.appendChild(li);
    
  /*       taskCount++; */
    }

    function clearAll() {
        if(confirm("Are you sure you want to delete all tasks?")){
            localStorage.clear();
            location.reload();
        }
    }
    document.getElementById('deleteAllButton').addEventListener('click', clearAll);
});

 window.onload = function() {
    let taskCount = parseInt(localStorage.getItem('taskCount')) || 0; 
    document.getElementById('taskCount').innerHTML = `Number of tasks: ${taskCount}`;
}

 
