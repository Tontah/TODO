
document.addEventListener('DOMContentLoaded', () => {
    let todoItems = []; // Array to hold todoitems
    let newToDoInput = document.querySelector(".new-todo");
    let todolist = document.querySelector(".todo-list");
    let heading = document.querySelector(".todoapp h1");
    let clearCompleted = document.querySelector(".clear-completed");
    let active = document.querySelector(".active");
    let completed = document.querySelector(".completed");
    let all = document.querySelector(".selected");
    let newToDoCount = 0;
    newToDoInput.addEventListener("keypress", function (event){
        if (event.key === "Enter") {
            if(newToDoInput.value === ""){
                heading.innerHTML = ("Please enter a task");
            }
            else {
                if(heading.innerHTML === "Please enter a task"){
                    heading.innerHTML = "todos";
                }
                 addTodo(newToDoInput.value);
                displayingToDos(todoItems);
                incrementTodoCount();
                newToDoInput.value = "";
            }
        }
    });
    //This function increases the todo count
    function incrementTodoCount(){
        newToDoCount++;
        document.querySelector(".todo-count").innerHTML = newToDoCount + " Item(s) left";
    }
    //This function decreases the todocount
    function decrementTodoCount(){
        newToDoCount--;
        document.querySelector(".todo-count").innerHTML = newToDoCount + " Item(s) left";
    }
// This function pushes the text into the todoItems array
    function addTodo(text) {
        let todo={
            task: text,
            completed: false
        }
        todoItems.push(todo);
        console.log(todoItems);
    }
//Showing the todolist
    function displayingToDos(tasks){
        todolist.innerHTML="";
        tasks.forEach(element => {
            todolist.appendChild(creatingULElements(element));
        })
    }
    //This function creates the listnode with the task
    function creatingULElements(task){
        const todolistNodeChecked = document.createElement("li");
        todolistNodeChecked.className="completed";
        const todolistNodeUnchecked = document.createElement("li");
        const div1=document.createElement("div");
        div1.className="view";
        const toggle=document.createElement("input");
        toggle.className="toggle";
        toggle.type="checkbox";
        toggle.addEventListener("click", completeTask);
        const label=document.createElement("label");
        const labelText=document.createTextNode(task.task);
        label.appendChild(labelText);
        const deleteButton=document.createElement("button");
        deleteButton.className="destroy";
        deleteButton.addEventListener("click", deleteTask);
        if (task.completed) {
            toggle.setAttribute("checked","");
            div1.appendChild(toggle);
            div1.appendChild(label);
            div1.appendChild(deleteButton);
            todolistNodeChecked.appendChild(div1);
            return todolistNodeChecked;
        }
        else {
            div1.appendChild(toggle);
            div1.appendChild(label);
            div1.appendChild(deleteButton);
            todolistNodeUnchecked.appendChild(div1);
            return todolistNodeUnchecked;
        }
    }
    //deletes a task wrt the button clicked
    function deleteTask() {
        let completedState = false;
        //gets the list node of the button(Button->div->"Li")
        let deleteTODO = this.parentNode.parentNode;
        // grab the `ul` (li -> ul)
        let parent = deleteTODO.parentNode;
        // remove `li` from `ul`
        parent.removeChild(deleteTODO)
        //deleting the task from the array as well
        for (let i = 0; i < todoItems.length; i++) {
            //compares if the item[i] of the array equals the element to be deleted
            if ((todoItems[i].task) === deleteTODO.textContent) {
                completedState=todoItems[i].completed;
                todoItems.splice(i, 1);
                break;
            }
        }
        if (completedState){
        }
        else {
            decrementTodoCount()
        }
        console.log(todoItems);
    }
    // marks a task as completed
    function completeTask(){
        let todo=this.parentNode;
        for (let i=0;i<todoItems.length;i++){
            if(todoItems[i].task===todo.textContent){
                if(todoItems[i].completed){
                    incrementTodoCount();
                }
                else {
                    decrementTodoCount();
                }
                todoItems[i].completed=!todoItems[i].completed;
                displayingToDos(todoItems);
            }
        }
        console.log(todoItems);
    }
    //deletes all tasks marked as completed
    clearCompleted.addEventListener("click", deleteAllCompleted);
    function deleteAllCompleted(){
        let nonCompletedItems=[];
        todoItems.forEach(element => {
            if (element.completed === false) {
                nonCompletedItems.push(element);
            }
            else {
                deleteTasks(element.task);
            }
        });
        todoItems=nonCompletedItems
        displayingToDos(todoItems);
        console.log(todoItems);
    }
    //Deletes task with the help of a task text
    function deleteTasks(text){
        let ulNodes=todolist.childNodes;
        for (let i = 0;i<ulNodes.length;i++){
            if (ulNodes[i].textContent === text){
                todolist.removeChild(todolist.childNodes[i]);
            }
        }
    }
    completed.addEventListener("click",showCompletedList);
    active.addEventListener("click",showActiveList);
    //show all todos
    all.addEventListener("click", ()=>{
        displayingToDos(todoItems);
    })
    //shows the list of active tasks
    function showActiveList(){
        const active=todoItems.filter(function (e){
            return e.completed===false;
        })
        return displayingToDos(active);
        console.log(todoItems);
    }
    //show the list of all completed tasks
    function showCompletedList(){
        const completed=todoItems.filter(function (e){
            return e.completed===true;
        })
        return displayingToDos(completed);
        console.log(todoItems);
    }
})

