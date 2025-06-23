function obtenerNombreDia(fechaStr) {
    var dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    var fecha = new Date(fechaStr);
    return dias[fecha.getDay()];
}
var turnosBrutos = JSON.parse(localStorage.getItem("turnos") || "[]");
var turnos = turnosBrutos.map(function (t) { return ({
    dia: obtenerNombreDia(t.fecha),
    hora: t.hora,
    paciente: t.paciente
}); });
var diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
var calendario = document.getElementById('calendario');
if (calendario) {
    diasSemana.forEach(function (dia) {
        var columna = document.createElement('div');
        columna.className = 'dia';
        columna.innerHTML = "<h2>".concat(dia, "</h2>");
        var turnosDelDia = turnos.filter(function (turno) { return turno.dia === dia; });
        turnosDelDia.forEach(function (turno) {
            var divTurno = document.createElement('div');
            divTurno.className = 'turno';
            divTurno.innerHTML = "<strong>".concat(turno.hora, "</strong> - ").concat(turno.paciente);
            columna.appendChild(divTurno);
        });
        calendario.appendChild(columna);
    });
}
function volverAlMenu() {
    window.location.href = "gestionTurnos.html?vista=medico";
}
