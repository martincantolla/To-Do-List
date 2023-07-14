let listaTareas = [
    { id: Math.floor(Math.random() * 100), contenido: "Hacer aseo", realizada: false },
    { id: Math.floor(Math.random() * 100), contenido: "Pasear a los perros", realizada: false },
    { id: Math.floor(Math.random() * 100), contenido: "Estudiar metodos de arreglos", realizada: false },

];
let input = document.querySelector(".input_largo");
let botonAgregar = document.getElementById("botonAgregar");
let tablaTareas = document.getElementById("tablaTareas");
let total = document.getElementById("total");
let realizadas = document.getElementById("realizadas");

renderTareas();

botonAgregar.addEventListener("click", () => {
    if (input.value === "") {
        alert("Agregue una tarea");
    } else {
        agregarTarea();
        renderTareas();
        input.value = "";
    }
});

function agregarTarea() {
    const id = randomId();
    const tarea = {
        id: id,
        contenido: input.value,
        realizada: false
    };

    listaTareas.push(tarea);
    console.log(listaTareas);
}

function actualizarTotal() {
    total.innerHTML = `${listaTareas.length}`;
}

function realizar(id) {
    const index = listaTareas.findIndex((tarea) => tarea.id === id);
    if (listaTareas[index].realizada == false) {
        listaTareas[index].realizada = true;
        document.getElementById(`contenido-${id}`).classList.add('realizada');
    } else {
        listaTareas[index].realizada = false;
        document.getElementById(`contenido-${id}`).classList.remove('realizada');
    }
    actualizarRealizadas();
}

function renderTareas() {

    tablaTareas.innerHTML = `                    
    <tr>
    <th>ID</th>
    <th>Tareas</th>
</tr>`;

    for (tarea of listaTareas)
        tablaTareas.innerHTML += `
<tr>
    <td>${tarea.id}</td>
    <td id="contenido-${tarea.id}">
        ${tarea.contenido}
        <button onclick="borrarTarea(${tarea.id})">x</button>
        <input type="checkbox" ${tarea.realizada ? 'checked' : ''} onclick="realizar(${tarea.id})">
    </td>
</tr>
`;
    actualizarRealizadas();
    actualizarTotal();
}

function borrarTarea(id) {
    const index = listaTareas.findIndex((tarea) => tarea.id === id)
    listaTareas.splice(index, 1);
    renderTareas();
}

function randomId() {
    let uniqueId;
    do {
        uniqueId = Math.floor(Math.random() * 100);
    } while (listaTareas.some((tarea) => tarea.id === uniqueId));

    return uniqueId;
}

function actualizarRealizadas() {
    let tareasRealizadas = listaTareas.filter((tarea) => tarea.realizada == true)
    realizadas.innerHTML = `${tareasRealizadas.length}`;
}