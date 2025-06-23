function mostrarVista(vista) {
    var vistaPaciente = document.getElementById("vistaPaciente");
    var vistaMedico = document.getElementById("vistaMedico");
    if (!vistaPaciente || !vistaMedico)
        return;
    if (vista === "paciente") {
        vistaPaciente.style.display = "block";
        vistaMedico.style.display = "none";
    }
    else {
        vistaPaciente.style.display = "none";
        vistaMedico.style.display = "block";
    }
}
function irAVistaSemanal() {
    window.location.href = "calendario.html";
}
function irAVistaDiaria() {
    window.location.href = "calendario-diaria.html";
}
function reservarTurnoPaciente() {
    var nombreInput = document.getElementById("nombrePaciente");
    var especialidadSelect = document.getElementById("especialidad");
    var fechaInput = document.getElementById("fechaTurno");
    var horaInput = document.getElementById("horaTurno");
    var historial = document.getElementById("listaHistorial");
    if (!nombreInput || !especialidadSelect || !fechaInput || !horaInput || !historial)
        return;
    var nombre = nombreInput.value.trim();
    var especialidad = especialidadSelect.value;
    var fecha = fechaInput.value;
    var hora = horaInput.value;
    if (!nombre || !fecha || !hora) {
        alert("Por favor, completá todos los campos.");
        return;
    }
    var nuevoTurno = document.createElement("li");
    nuevoTurno.textContent = "Turno para ".concat(nombre, " - ").concat(especialidad, " - Fecha: ").concat(fecha, " - Hora: ").concat(hora);
    historial.appendChild(nuevoTurno);
    var turnosGuardados = JSON.parse(localStorage.getItem("turnos") || "[]");
    turnosGuardados.push({ paciente: nombre, especialidad: especialidad, fecha: fecha, hora: hora });
    localStorage.setItem("turnos", JSON.stringify(turnosGuardados));
    alert("\u2705 Turno confirmado para ".concat(nombre, "\n\uD83D\uDCC5 Fecha: ").concat(fecha, "\n\uD83D\uDD52 Hora: ").concat(hora, "\n\uD83C\uDFE5 Ubicaci\u00F3n: Av. Salud 123\n\u260E\uFE0F Tel\u00E9fono: 0800-555-1234\n\u23F1\uFE0F Llegar 15 minutos antes de la consulta."));
    nombreInput.value = "";
    fechaInput.value = "";
    horaInput.value = "";
}
function mostrarSeccion(seccion) {
    var contenedor = document.getElementById('contenidoMedico');
    if (!contenedor)
        return;
    contenedor.innerHTML = '';
    switch (seccion) {
        case 'historiales':
            contenedor.innerHTML = '<h3>Historiales Médicos</h3><p>Contenido de historiales aquí...</p>';
            break;
        case 'perfiles':
            contenedor.innerHTML = '<h3>Perfiles de Pacientes</h3><p>Contenido de perfiles aquí...</p>';
            break;
        case 'calendario':
            contenedor.innerHTML = "\n        <h3>Calendario</h3>\n        <p>Eleg\u00ED una vista:</p>\n        <button onclick=\"irAVistaDiaria()\">Vista Diaria</button>\n        <button onclick=\"irAVistaSemanal()\">Vista Semanal</button>\n        <div id=\"calendarioContenido\"></div>\n      ";
            break;
        case 'transferencias':
            contenedor.innerHTML = '<h3>Transferencias de Dinero</h3><p>Contenido financiero...</p>';
            break;
        case 'recetas':
            contenedor.innerHTML = '<h3>Recetas Electrónicas</h3><button>Crear Nueva Receta</button>';
            break;
        case 'configuracion':
            contenedor.innerHTML = '<h3>Configuración</h3><p>Opciones del sistema...</p>';
            break;
    }
}
window.addEventListener("DOMContentLoaded", function () {
    var params = new URLSearchParams(window.location.search);
    var vista = params.get("vista");
    if (vista === "medico") {
        mostrarVista("medico");
    }
    else if (vista === "paciente") {
        mostrarVista("paciente");
    }
});
