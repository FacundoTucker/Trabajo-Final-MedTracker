const horarios = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"];
const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

function crearTabla() {
  const tbody = document.getElementById("tablaTurnos");

  horarios.forEach((hora, i) => {
    const fila = document.createElement("tr");
    const thHora = document.createElement("th");
    thHora.textContent = hora;
    fila.appendChild(thHora);

    dias.forEach((dia, j) => {
      const celda = document.createElement("td");

      //logica de turnos reservados por otra persona
      if ((i === 1 && j === 0) || (i === 2 && j === 2)) {
        celda.className = "reservadoOtro";
        celda.textContent = "Reservado";
      }

      //turno ya reservado por el paciente simulado
      else if (i === 0 && j === 1) {
        celda.className = "reservadoPaciente";
        celda.innerHTML = "Mi Turno<br><button class='btn-turno' onclick='cancelar(this)'>Cancelar</button>";
      }

      //turno disponible
      else {
        celda.className = "disponible";
        celda.innerHTML = "<button class='btn-turno' onclick='reservar(this)'>Reservar</button>";
      }

      fila.appendChild(celda);
    });

    tbody.appendChild(fila);
  });
}

function reservar(boton) {
  if (document.querySelector(".reservadoPaciente")) {
    alert("Ya tenés un turno reservado. Debés cancelarlo antes de reservar otro.");
    return;
  }

  if (confirm("¿Deseás reservar este turno?")) {
    const celda = boton.closest('td');
    celda.className = "reservadoPaciente";
    celda.innerHTML = "Mi Turno<br><button class='btn-turno' onclick='cancelar(this)'>Cancelar</button>";
    deshabilitarReservas(true);
  }
}

function cancelar(boton) {
  if (confirm("¿Seguro que querés cancelar tu turno?")) {
    const celda = boton.closest('td');
    celda.className = "disponible";
    celda.innerHTML = "<button class='btn-turno' onclick='reservar(this)'>Reservar</button>";
    deshabilitarReservas(false);
  }
}

function deshabilitarReservas(deshabilitar) {
  const botones = document.querySelectorAll(".disponible .btn-turno");
  botones.forEach(btn => btn.disabled = deshabilitar);
}

window.addEventListener("DOMContentLoaded", () => {
  crearTabla();
  if (document.querySelector(".reservadoPaciente")) {
    deshabilitarReservas(true);
  }
});
