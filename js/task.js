const key = "list_taks";
// document.addEventListener("DOMContentLoaded"), () => {

window.addEventListener("DOMContentLoaded", () => {
    
    let tasks = [];//Esto nos sirve para el arreglo global que se esta manejando
    //declaramos los elementos del DOM 
    const containerTasks = document.getElementById("containerTask");
    const btnSaveTask = document.getElementById("btnTaskNew");
    const inputNewTask = document.getElementById("taskNew");
    
    const getTasks = () =>{
        const possibleList = JSON.parse(localStorage.getItem(key));
        if(possibleList){
            return possibleList;
        }else{
            return [];
        }
    };

    //Escuchar evento click del botón para agregar la nueva tarea
    btnSaveTask.addEventListener("click", function () {

        const task = inputNewTask.value;
        if (!task) {
            return;
        }
        tasks.push({
            task:task,
            completed:false,
        });
        inputNewTask.value = "";
        saveTaskStorage();
        refreshTaskList();     
    });

 

    const saveTaskStorage = () => {
        localStorage.setItem(key, JSON.stringify(tasks));
    }

    // Defini la función que refresca la lista de tareas apartir del arreglo global
    const refreshTaskList = () =>{
        containerTasks.innerHTML = "";

        for(const [indice, task] of tasks.entries()){

            const deleteTask = document.createElement("a");
            deleteTask.classList.add("link-delete");
            deleteTask.innerHTML = "&times;";
            deleteTask.href = "";
            deleteTask.addEventListener("click", function (e) {

                e.preventDefault();


                if(task.completed == true ){

                    if(!confirm("¿Delete task?")) {
                        return;
                    }
                    
                    console.log(indice);
                    tasks.splice(indice, 1);
                    saveTaskStorage(tasks);
                    refreshTaskList();   


                }else{
                    alert('homework not completed');
                }
            });
        
            

            const check = document.createElement("input");
            check.type = "checkbox";
            check.addEventListener("click", function () {
                if (this.checked) {
                    tasks[indice].completed = true;               
                }else{
                    tasks[indice].completed = false;  
                }
                saveTaskStorage(tasks);
                refreshTaskList();               
            });

            const contentTask = document.createElement("span");
            contentTask.textContent = task.task;

            const list = document.createElement("li");
            if (task.completed) {
                check.checked = true;
                contentTask.classList.add("line")    
            }
            list.appendChild(check);
            list.appendChild(contentTask);
            list.appendChild(deleteTask);
            containerTasks.appendChild(list);
            
        }

    }
    tasks = getTasks();
    refreshTaskList();

 });