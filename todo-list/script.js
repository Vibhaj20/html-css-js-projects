const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const todosList = document.getElementById("todos-list");
const itemsLeft = document.getElementById("items-left");
const clearCompletedBtn = document.getElementById("clear-complete");
const emptyState = document.querySelector(".empty-state");
const dateElement = document.getElementById("date");
const filters = document.querySelectorAll(".filter");

let todos=[];
let currentfilter="all";

addTaskBtn.addEventListener("click",()=>{
   addTodo(taskInput.value);

});
taskInput.addEventListener("keydown", (e)=>{
    if(e.key=="Enter"){
        addTodo(taskInput.value)
    }
});
clearCompletedBtn.addEventListener("click",clearcomplete);


function addTodo(text){
  if(text.trim()==="")return

  const todo={
    id: Date.now(),
    text,
    completed:false
  }
  todos.push(todo)
  saveTodos()
  renderTodos()
  taskInput.value="";
}
function saveTodos(){
    localStorage.setItem("todos", JSON.stringify(todos))
    updateItemCount();
    checkEmptyState();
}

function updateItemCount(){
  const uncompletedTodos =todos.filter(todo=>!todo.completed)
  itemsLeft.textContent=`${uncompletedTodos.length} item${
    uncompletedTodos.length!=1?"s":""
  } left`;
}
function checkEmptyState(){
  const filteredTodos=filterTodos(currentfilter);
  if(filteredTodos.length===0)emptyState.classList.remove("hidden");
  else emptyState.classList.add("hidden")
}
function filterTodos(filter){
  switch(filter){
    case "active":
      return todos.filter(todo=>!todo.completed);
    case "completed":
      return todos.filter(todo=>todo.completed);
    default:
      return todos;
  }

}

function renderTodos(){
  todosList.innerHTML=""
  const filteredTodos=filterTodos(currentfilter)
  filteredTodos.forEach(todo=>{
    const todoItem=document.createElement("li")
    todoItem.classList.add("todo-item")
    if(todo.completed) todoItem.classList.add("completed")

   const checkboxcontainer =document.createElement("label")
   checkboxcontainer.classList.add("checkboc-container")

   const checkbox=document.createElement("input")
   checkbox.type="checkbox"
   checkbox.classList.add("todo-checkbox")
   checkbox.checked=todo.completed
   checkbox.addEventListener("change", ()=>toggleTodo(todo.id))

   
   const checkmark=document.createElement("span")
   checkmark.classList.add("checkmark")

   checkboxcontainer.appendChild(checkbox)
   checkboxcontainer.appendChild(checkmark)

   const todoText=document.createElement("span");
   todoText.classList.add("todo-item-text");
   todoText.textContent=todo.text;

   const deletebtn=document.createElement("button");
   deletebtn.classList.add("delete-btn");
   deletebtn.innerHTML='<i class="fas fa-times"></i>';
   deletebtn.addEventListener("click", () => deleteTodo(todo.id));
     
   todoItem.appendChild(checkboxcontainer)
   todoItem.appendChild(todoText)
   todoItem.appendChild(deletebtn)

   todosList.appendChild(todoItem)

  })
}
window.addEventListener("DOMContentLoaded",()=>{
  loadTodos();
  updateItemCount();
  setdate();
})

function loadTodos(){
  const storedTodos=localStorage.getItem("todos");
  if(storedTodos) todos=JSON.parse(storedTodos);
  renderTodos();
}

function toggleTodo(id){
todos=todos.map(todo=>{
  if(todo.id===id){
    return {...todo, completed: !todo.completed}

  }
  return todo;
})
saveTodos();
renderTodos();
}
function clearcomplete(){
  todos=todos.filter((todo)=> !todo.completed)
  saveTodos()
  renderTodos()

}

function deleteTodo(id){
  todos=todos.filter((todo)=> todo.id !==id);
  saveTodos();
  renderTodos();
}

filters.forEach(filter=>{
  filter.addEventListener("click",()=>{
    setactivefilter(filter.getAttribute("data-filter"))
  })
})

function setactivefilter(filter){
  currentfilter =filter;
  filters.forEach(item=>{
    if(item.getAttribute("data-filter")===filter){
      item.classList.add("active")
    }
    else{
      item.classList.remove("active")
    }
  });
  renderTodos();
}

function setdate(){
  const Option ={weekday:"long",month:"short",day:"numeric"}
  const today= new Date();
  dateElement.textContent=today.toLocaleDateString("en-US",Option)
}

