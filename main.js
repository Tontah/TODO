
document.addEventListener('DOMContentLoaded', () => {
    // Array to hold todoitems
    let todoItems = [];
   let newToDoInput=document.querySelector(".new-todo");
   let todolist=document.querySelector(".todo-list");
   let heading=document.querySelector(".todoapp h1");
   let newToDoCount=0;
    newToDoInput.addEventListener("keypress", function (event){
        if (event.key === "Enter") {
            if(newToDoInput.value===""){
                heading.innerHTML=("Please enter a task");
            }
            else { if(heading.innerHTML==="Please enter a task"){
                hading.innerHTML="todos";
            }
                addTodo(newToDoInput.value);
                displayingToDos(newToDoInput.value);
                todoCount();
                newToDoInput.value = "";
            }
        }
         console.log(event.target.value);
    });
    //This function increases the todo count
    function todoCount(){
        newToDoCount++;
        document.querySelector(".todo-count").innerHTML=newToDoCount + " Item(s) left";

    }
// This function pushes the text into the todo list
    function addTodo(text) {
        todoItems.push(text);
        console.log(todoItems);
    }
//Showing the todolist
    function displayingToDos(text){
        let todolistNode = document.createElement("li");
        todolistNode.appendChild(document.createTextNode(text));
        todolist.appendChild(todolistNode);
    }
    // Add a "checked" symbol when clicking on a list item

})

