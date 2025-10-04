var horarios = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "12:00"
];
var dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
var turnos = [
    { nombre: "Camila", motivo: "Control", horaIndex: 1, diaIndex: 2 },
    { nombre: "Anita", motivo: "Dolor Estomacal", horaIndex: 2, diaIndex: 2 },
    { nombre: "Marcos", motivo: "Chequeo Anual", horaIndex: 3, diaIndex: 2 },
    { nombre: "Daniela", motivo: "Consulta general", horaIndex: 4, diaIndex: 2 },
    { nombre: "Margarita", motivo: "Vacunación", horaIndex: 4, diaIndex: 3 },
    { nombre: "Santiago", motivo: "Control", horaIndex: 6, diaIndex: 4 },
];
function crearTabla() {
    var tbody = document.getElementById("tablaTurnos");
    if (!tbody)
        return;
    tbody.innerHTML = "";
    horarios.forEach(function (hora, i) {
        var fila = document.createElement("tr");
        var thHora = document.createElement("th");
        thHora.textContent = hora;
        fila.appendChild(thHora);
        dias.forEach(function (dia, j) {
            var celda = document.createElement("td");
            var turno = null;
            for (var _i = 0, turnos_1 = turnos; _i < turnos_1.length; _i++) {
                var t = turnos_1[_i];
                if (t.horaIndex === i && t.diaIndex === j) {
                    turno = t;
                    break;
                }
            }
            if (turno) {
                celda.className = "reservado";
                celda.innerHTML = "\n    <strong>Paciente:</strong> ".concat(turno.nombre, "<br>\n    <strong>Motivo:</strong> ").concat(turno.motivo, "<br>\n    <button class=\"btn-cancelar\">Cancelar Turno</button>\n  ");
                var cancelarBtn = celda.querySelector(".btn-cancelar");
                if (cancelarBtn) {
                    cancelarBtn.addEventListener("click", function () { return cancelarTurno(i, j); });
                }
            }
            else {
                celda.className = "disponible";
                celda.textContent = "Disponible";
            }
            fila.appendChild(celda);
        });
        tbody.appendChild(fila);
    });
}
function cancelarTurno(horaIndex, diaIndex) {
    if (confirm("¿Querés cancelar este turno?")) {
        turnos = turnos.filter(function (t) { return !(t.horaIndex === horaIndex && t.diaIndex === diaIndex); });
        crearTabla();
    }
}
window.addEventListener("DOMContentLoaded", crearTabla);
document.addEventListener("DOMContentLoaded", function () {
    var volverBtn = document.getElementById("btnVolver");
    if (volverBtn) {
        volverBtn.addEventListener("click", function () {
            window.location.href = "homeEspecialista.html";
        });
    }
});
