
 let numtask=0;
function dropHandler(event) {
    event.preventDefault();

    // Obtén el ID del elemento transferido durante el arrastre
    const draggedElementId = event.dataTransfer.getData("text/plain");
    

    // Encuentra el elemento original y su padre (la columna actual)
    const originalElement = document.getElementById(draggedElementId);
    const originalColumn = originalElement.parentNode;

    // Verifica si el contenedor de destino es diferente al contenedor original
    if (event.target !== originalColumn) {
        // Mueve el elemento al contenedor de la columna de destino
        event.target.appendChild(originalElement);

        console.log('Elemento soltado');

        // Elimina el elemento del lugar original si es un hijo de la columna original
        if (originalColumn.contains(originalElement)) {
            originalColumn.removeChild(originalElement);
        }
    }
}



function dragOverHandler(event) {
    let draggedElementId = event.dataTransfer.getData("text/plain");
    event.preventDefault();
    console.log(draggedElementId+' siendo arrastrado sobre' + event.target.id);
}

createColumns();

function createColumns() {
    let pomodoro = document.getElementById("pomodoro");

    // Array de títulos
    const columnTitles = ["TO DO", "IN PROGRESS", "DONE"];

    // Crear columnas y títulos dinámicamente
    for (let i = 0; i < 3; i++) {
        let column = document.createElement("div");
        column.className = "column";
        column.id = "dragzone" + (i + 1);

       

        

        // Asignar los eventos de arrastre y soltar al contenido
    

        // Agregar eventos de soltar a la columna
        column.addEventListener('drop', dropHandler);
        column.addEventListener('dragover', dragOverHandler);

  
        pomodoro.appendChild(column);
    }
}

// Función para manejar el evento de inicio de arrastre
function dragStartHandler(event) {
    // Almacena el ID del elemento para transferir durante el arrastre
    event.dataTransfer.setData("text/plain", event.target.id);
}


function newTask() {
    console.log("Nueva tarea");
    let textvalue = document.getElementById('newtask').value;
    let inputcolumn = document.getElementById('column').value;
    let column = document.getElementById("dragzone" + inputcolumn);

    let newTask = document.createElement("div");
    let tasktext = document.createElement("p");
    tasktext.id = "tasktext" + numtask;
    tasktext.className = "tasktext";
    
    tasktext.textContent = textvalue;
    newTask.id = "task" + numtask;
    newTask.className = "task";
    newTask.setAttribute('draggable', true);

    // Agregar el evento de inicio de arrastre a la nueva tarea
    newTask.addEventListener('dragstart', dragStartHandler);
    numtask++;
 newTask.appendChild(tasktext);
    column.appendChild(newTask);
}