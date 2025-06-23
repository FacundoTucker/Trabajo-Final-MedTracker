var turnosDia = JSON.parse(localStorage.getItem("turnos") || "[]");
function mostrarTurnosDelDia() {
    var inputFecha = document.getElementById("fechaDia");
    var contenedor = document.getElementById("contenedorTurnosDia");
    if (!inputFecha || !contenedor)
        return;
    var fechaSeleccionada = inputFecha.value;
    if (!fechaSeleccionada) {
        contenedor.innerHTML = "<p>Por favor, seleccioná una fecha.</p>";
        return;
    }
    contenedor.innerHTML = "";
    // Filtrar turnos que coincidan con la fecha seleccionada
    var turnos = turnosDia.filter(function (turno) { return turno.fecha === fechaSeleccionada; });
    if (turnos.length === 0) {
        contenedor.innerHTML = "<p>No hay turnos para esta fecha.</p>";
        return;
    }
    var columna = document.createElement("div");
    columna.className = "dia";
    columna.innerHTML = "<h2>".concat(fechaSeleccionada, "</h2>");
    turnos.forEach(function (turno) {
        var divTurno = document.createElement("div");
        divTurno.className = "turno";
        divTurno.innerHTML = "<strong>".concat(turno.hora, "</strong> - ").concat(turno.paciente);
        columna.appendChild(divTurno);
    });
    contenedor.appendChild(columna);
}
function volverAlMenuDiaria() {
    window.location.href = "gestionTurnos.html?vista=medico";
}
