
document.addEventListener('DOMContentLoaded', () => {
    // Array to hold todoitems
    let todoItems = [];
   let newToDoInput = document.querySelector(".new-todo");
   let todolist = document.querySelector(".todo-list");
   let heading = document.querySelector(".todoapp h1");
   let clearCompleted = document.querySelector(".clear-completed");
   let active = document.querySelector(".active");
    let completed = document.querySelector(".completed");
   let newToDoCount = 0;
    newToDoInput.addEventListener("keypress", function (event){
        if (event.key === "Enter") {
            if(newToDoInput.value === ""){
                heading.innerHTML = ("Please enter a task");
            }
            else { if(heading.innerHTML === "Please enter a task"){
                heading.innerHTML = "todos";
            }
                addTodo(newToDoInput.value);
                displayingToDos(newToDoInput.value);
                incrementTodoCount();
                newToDoInput.value = "";
            }
        }
         console.log(event.target.value);
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
// This function pushes the text into the todo list
    function addTodo(text) {
        let todo={
            task: text,
            completed: false
        }
        todoItems.push(todo);
        console.log(todoItems);
    }
//Showing the todolist
    //The SPAn and div difference?????
    function displayingToDos(text){
        let todolistNode = document.createElement("li");
        let deleteButton = document.createElement("SPAN");
        deleteButton.className=("deleteButton");
        let completeCheckbox = document.createElement("SPAN");
        completeCheckbox.classList.add("completeCheckbox");
        let remove = document.createElement("button");
        remove.classList.add("remove");
        remove.innerHTML = "\u00D7";
        remove.addEventListener("click", deleteTask);
        let complete = document.createElement("input");
        complete.type = "checkbox";
        complete.classList.add("complete");
        complete.addEventListener("click", completeTask)
        deleteButton.appendChild(remove);
        completeCheckbox.appendChild(complete);
        todolistNode.appendChild(completeCheckbox);
        todolistNode.appendChild(document.createTextNode(text));
        todolistNode.appendChild(deleteButton);
        todolist.appendChild(todolistNode);

    }
    //deletes a task wrt the button clicked
    function deleteTask() {
        let completedState = false;
        //gets the list node of the button(Button->span->"Li")
        let deleteTODO = this.parentNode.parentNode
        console.log("deletetodo="+deleteTODO.textContent);
        // grab the `ul` (li -> ul)
        let parent = deleteTODO.parentNode
        // remove `li` from `ul`
        parent.removeChild(deleteTODO)
        //deleting the task from the array as well
        for (let i = 0; i < todoItems.length; i++) {
            //compares if the item[i] of the array equals the element to be deleted
            //why is the delete button representative present in my tasktext??
            if ((todoItems[i].task+"\u00D7") === deleteTODO.textContent) {
                completedState=todoItems[i].completed;
                todoItems.splice(i, 1);
                break;
            }
        }
        if (completedState === true){
        }
        else {
            decrementTodoCount()
        }
        console.log(todoItems);
    }
    // marks a task as completed
    function completeTask(){
        let todo = this.parentNode.parentNode
        for (let i = 0; i < todoItems.length; i++) {
            if ((todoItems[i].task + "\u00D7") === todo.textContent) {
                if (todoItems[i].completed === true){
                    todo.style.textDecoration = "none";
                    todo.style.backgroundColor = "white";
                    todoItems[i].completed = false;
                    incrementTodoCount();
                }
                else{
                    todo.style.textDecoration = "line-through";
                    todo.style.backgroundColor = "darkgrey";
                    todoItems[i].completed = true;
                    decrementTodoCount();
                }
            }
        }
        console.log(todoItems);
    }
    //deletes all tasks marked as completed
    clearCompleted.addEventListener("click", deleteAllCompleted);
    function deleteAllCompleted(){
        let completedItems=[];
        todoItems.forEach(element => {
            if (element.completed === false) {
                completedItems.push(element);
            }
            else {
                deleteTasks(element.task);
            }
        });
        todoItems=completedItems
        console.log(todoItems);
    }
    //Deletes task with the help of a task text
    function deleteTasks(text){
        let ulNodes=todolist.childNodes;
        for (let i = 0;i<ulNodes.length;i++){
            if (ulNodes[i].textContent === (text+"\u00D7")){
                todolist.removeChild(todolist.childNodes[i]);
            }
        }
    }
    active.addEventListener("click", showActiveList);
    completed.addEventListener("click", showCompletedList);
    //shows the list of active tasks
    function showActiveList(){
        console.log(todoItems);
    }
    function showCompletedList(){

    }
})

