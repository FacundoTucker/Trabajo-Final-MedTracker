var btnBuscar = document.getElementById("btnBuscar");
btnBuscar.addEventListener("click", function () {
    window.location.href = "../pages/homePaciente.html";
});
var especialidades = [
    { especialidad: "Clínica Médica", horarios: ["09:00", "10:00", "11:00"] },
    { especialidad: "Pediatría", horarios: ["10:00", "12:00", "14:00"] },
    { especialidad: "Cardiología", horarios: ["08:00", "09:30", "11:30"] },
    { especialidad: "Dermatología", horarios: ["08:00", "08:30", "09:00"] }
];
var especialidadSelect = document.getElementById("especialidad");
var horaSelect = document.getElementById("hora");
var fechaInput = document.getElementById("fecha");
var agendarBtn = document.getElementById("agendarBtn");
function cargarEspecialidades() {
    for (var i = 0; i < especialidades.length; i++) {
        var option = document.createElement("option");
        option.value = especialidades[i].especialidad;
        option.textContent = especialidades[i].especialidad;
        especialidadSelect.appendChild(option);
    }
}
function cargarHorarios(especialidad) {
    horaSelect.innerHTML = "";
    var horarios = [];
    for (var i = 0; i < especialidades.length; i++) {
        if (especialidades[i].especialidad === especialidad) {
            horarios = especialidades[i].horarios;
            break;
        }
    }
    for (var j = 0; j < horarios.length; j++) {
        var option = document.createElement("option");
        option.value = horarios[j];
        option.textContent = horarios[j];
        horaSelect.appendChild(option);
    }
}
especialidadSelect.addEventListener("change", function () {
    var seleccionada = especialidadSelect.value;
    cargarHorarios(seleccionada);
});
agendarBtn.addEventListener("click", function () {
    var especialidad = especialidadSelect.value;
    var fecha = fechaInput.value;
    var hora = horaSelect.value;
    if (!especialidad || !fecha || !hora) {
        alert("Por favor, complete todos los campos.");
        return;
    }
    alert("Turno agendado:\n" +
        "Especialidad: " + especialidad + "\n" +
        "Fecha: " + fecha + "\n" +
        "Hora: " + hora);
});
document.addEventListener("DOMContentLoaded", function () {
    cargarEspecialidades();
    cargarHorarios(especialidades[0].especialidad);
});
