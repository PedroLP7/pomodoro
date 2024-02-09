let numtask = 0;
let pomodoro = document.getElementById("pomodoro");
let startmusic = new Audio("../media/startmusic.mp3");
let endmusic = new Audio("../media/endmusic.mp3");

createTimer();

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

    console.log("Elemento soltado");

    // Elimina el elemento del lugar original si es un hijo de la columna original
    if (originalColumn.contains(originalElement)) {
      originalColumn.removeChild(originalElement);
    }
  }
}

function dragOverHandler(event) {
  let draggedElementId = event.dataTransfer.getData("text/plain");
  event.preventDefault();
  console.log(draggedElementId + " siendo arrastrado sobre" + event.target.id);
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
    column.className = "dragzone";

    // añadiendo los eventos despues de crear las columnas ,
    column.addEventListener("drop", dropHandler);
    column.addEventListener("dragover", dragOverHandler);

    pomodoro.appendChild(column);
  }
}

// funcion que permite arrastrar las tareas
function dragStartHandler(event) {
  const draggedElementId = event.target.id;

  if (
    draggedElementId.startsWith("task") &&
    document.getElementById(draggedElementId).parentNode.id === "dragzone3"
  ) {
    event.preventDefault(); // evita que se puedan arrastrar las tareas de la columna 3, comprobando el nombre del id del elemento padre , es decir donde esta la tarea posicionada
  } else {
    event.dataTransfer.setData("text/plain", draggedElementId);
  }
}

function newTask() {
  console.log("Nueva tarea");
  let textvalue = document.getElementById("newtask").value;
  let inputcolumn = document.getElementById("column").value;
  let column = document.getElementById("dragzone" + inputcolumn);
  let descr = document.getElementById("descr").value;
  let currentTime = new Date();
  let day = currentTime.getDate();
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  let formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  let newTask = document.createElement("div");
  let tasktext = document.createElement("p");
  let taskdescr = document.createElement("p");
  let tasktime = document.createElement("p");
  let newTaskButton = document.createElement("button");
  newTaskButton.textContent = "Eliminar";
  newTaskButton.className = "deleteButton";
  newTaskButton.addEventListener("click", deleteTask);
  taskdescr.id = "taskdescr" + numtask;
  taskdescr.className = "taskdescr";
  taskdescr.textContent = descr;
  tasktime.id = "tasktime" + numtask;
  tasktime.className = "tasktime";
  tasktime.textContent =
    "Created at:  " + day + "th ," + hours + ":" + formattedMinutes + "h";

  tasktext.id = "tasktext" + numtask;
  tasktext.className = "tasktext";

  tasktext.textContent = textvalue;
  newTask.id = "task" + numtask;
  newTask.className = "task";
  newTask.setAttribute("draggable", true);

  tasktipe(newTask);

  // Agregar el evento de inicio de arrastre a la nueva tarea
  newTask.addEventListener("dragstart", dragStartHandler);
  numtask++;

  newTask.appendChild(tasktext);
  newTask.appendChild(taskdescr);
  newTask.appendChild(tasktime);
  newTask.appendChild(newTaskButton);
  column.appendChild(newTask);
  setTimeout(function () {
    document.getElementById("newtask").value = "";
    document.getElementById("descr").value = "";
  }, 0);
}

function createTitles() {
  // Crear divs para contener los títulos
  let div1 = document.createElement("div");
  let div2 = document.createElement("div");
  let div3 = document.createElement("div");
  div1.className = "titlecolumn1";
  div2.className = "titlecolumn2";
  div3.className = "titlecolumn3";

  let title1 = document.createElement("h2");
  title1.textContent = "TO DO";
  title1.className = "title1";

  let title2 = document.createElement("h2");
  title2.textContent = "IN PROGRESS";
  title2.className = "title2";

  let title3 = document.createElement("h2");
  title3.textContent = "DONE";
  title3.className = "title3";

  div1.appendChild(title1);
  div2.appendChild(title2);
  div3.appendChild(title3);

  pomodoro.appendChild(div1);
  pomodoro.appendChild(div2);
  pomodoro.appendChild(div3);
}

createTitles();

function tasktipe(newtask) {
  let tipo = document.getElementById("tipo").value;
  switch (tipo) {
    case "1":
      newtask.dataset.tipo = "Backend";
      newtask.style.backgroundColor = "#0099FF";
      break;
    case "2":
      newtask.dataset.tipo = "Frontend";
      newtask.style.backgroundColor = "#FF9933";
      break;
    case "3":
      newtask.dataset.tipo = "Design";
      newtask.style.backgroundColor = "#FF99FF";
      break;
    case "0":
      newtask.dataset.tipo = "General";
      newtask.style.backgroundColor = "#669999";
  }
}

function deleteTask() {
  // buscnado la tarea a eliminar identificando en que tarea esta el boton
  let taskToRemove = this.parentNode;

  // usando alert para conifmrar si lo elimino o no
  let confirmDelete = confirm("Are u sure u wannna delete this task?");

  if (confirmDelete) {
    taskToRemove.parentNode.removeChild(taskToRemove);
  }
}



function createTimer(){
  let timerdiv=document.getElementById("timerdiv");


 
  let timer= document.createElement("p");
timer.dataset.estado="parado";
  timer.classList.add("timer");
  timer.id="timer";
  timer.textContent="25:00";
  timerdiv.appendChild(timer);
  



}




let remainingTime = 0;
let intervalId;
let pause = false;

function startTimer() {
  let timer = document.getElementById("timer");
  let timeInput = document.getElementById("time");
  let time = timeInput.value;
  let estado = timer.dataset.estado;
startmusic.play();
  if (!pause && estado === "parado") {
    if (remainingTime === 0) {
      // Solo configurar el tiempo restante si no hay un temporizador en curso
      if (time === "1") {
        remainingTime = 3 * 60; // 25 minutos en segundos
      } else if (time === "2") {
        remainingTime = 2 * 60; // 15 minutos en segundos
      } else if (time === "3") {
        remainingTime = 1 * 60; // 5 minutos en segundos
      }
    }

    intervalId = setInterval(function () {
      timer.dataset.estado = "activo";

      if (remainingTime > 0) {
        let minutes = Math.floor(remainingTime / 60);
        let seconds = remainingTime % 60;
        remainingTime--;

        let newTime = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
        timer.textContent = newTime;
      } else {
        clearInterval(intervalId);
        timer.dataset.estado = "parado";
        pause = false;
        remainingTime = 0;
        timer.textContent = "0:00"; 
        endmusic.play();
      }
    }, 1000);

    pause = true;
    timer.dataset.estado = "activo";
  } else {
    clearInterval(intervalId);
    pause = false;
    timer.dataset.estado = "parado";
  }
}
