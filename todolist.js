/*
This is the JavaScript code with wich I manage the 
To-Do app on my personal website
*/


//getting container in which the tasks will be displayed
const taskList = document.getElementById('lista-task');

//getting container in which the counter will be displayed
const counterKeeper = document.getElementById('counter-keeper');

//gettin the initial message above the task column
const beforeTasks = document.getElementById('before-tasks');

//gettin the title h2 above the task column

const tasksTitle = document.getElementById('tasks-title');

//get the tasks-completed element
const tasksCompleted = document.getElementById('tasks-complete');

//counter that keeps track of the number of tasks completed
let counter = 0;


//calling the event listeners in a single function
eventListeners();

function eventListeners() {
    //action on form submit
    document.querySelector('#task-form').addEventListener('submit', addTask);

    //deleting tasks
    taskList.addEventListener('click', deleteTask);
}

//counter function that adds on the number of tasks completed
function addCounter(){

    //+1 on the counter every time a task is marked as complete
    counter++;

    //creating the number counter 
    const counter_number = document.createElement('h4');
    counter_number.classList = "task-title";
    counter_number.innerText = counter;
    const initial_counter = document.getElementById("initial-counter");

    if (initial_counter){
        initial_counter.remove()
    }

    //deleting the previous count number    
    document.getElementById('counter-keeper').removeChild(
        document.getElementById('counter-keeper').childNodes[0]);

    //adding the new task counter 
    counterKeeper.insertBefore(counter_number, counterKeeper.children[0]);
    
}


//function add task
function addTask(e){
    //preventing the event default
    e.preventDefault();

    //deleting the initial message only if it is present
    if (beforeTasks) {
        beforeTasks.remove();
    }

    //reading the text area values
    const task = document.querySelector('#task').value;
    const task_body = document.querySelector('#task-body').value;

    //setting the tasksComplete div back to display none, in case it's visible
    tasksCompleted.style.display = "none";

    //create element of the task

    //creating the icon i
    const i_icon = document.createElement("i");
    i_icon.classList = 'linecons linecons-calendar lineicons-task';

    //creating task title
    const task_title = document.createElement("h4");
    task_title.classList = 'task-title';
    task_title.innerText = task

    //creating the "mark as done button"
    const done_button = document.createElement("a");
    done_button.classList = "btn btn-secondary";
    done_button.id = "done";
    done_button.href = "#";
    done_button.innerText = "Mark as done";

    //creating the task body
    const task_description = document.createElement("p");
    task_description.classList = 'task-body';
    task_description.innerText = task_body

    //creating the outer div
    const outer = document.createElement("div");
    outer.classList = 'ci-text mb-4';
    outer.appendChild(i_icon);
    outer.appendChild(task_title);
    outer.appendChild(task_description);
    outer.appendChild(done_button);

    //updating the section title
    //(passage to optimize)
    tasksTitle.innerText = "Here are your tasks:";

    //inserting the task 
    taskList.insertBefore(outer, taskList.children[0]);

    //emptying the form
    //(passage to optimize)
    document.querySelector('#task-body').value = "";
    document.querySelector('#task').value = "";

    //adding the eventListener to the button
    document.querySelector('#done').addEventListener('click', addCounter);

    //add task to the local storage
    addTaskToLocalStorage(outer)
}


//delete task
function deleteTask(e){
    e.preventDefault();
    //performing the deletion only if the item clicked had a certain class
    if (e.target.id === "done"){
        e.target.parentElement.remove();
    }

    if (taskList.children.length === 0){
        tasksTitle.innerText = "All tasks have been done";
        tasksCompleted.style.display = "block";
        
    }
}