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

      //logica de turnos reservados hardcodeados
      if ((i === 0 && j === 0) || (i === 2 && j === 1) || (i === 4 && j === 4)) {
        celda.className = "reservado";
        celda.innerHTML = `Paciente: Juan<br><button class='btn-cancelar' onclick='cancelar(this)'>Cancelar Turno</button>`;
      } else {
        celda.className = "disponible";
        celda.innerHTML = `Disponible<br><button class='btn-cancelar' onclick='cancelar(this)'>Cancelar Turno</button>`;
      }

      fila.appendChild(celda);
    });

    tbody.appendChild(fila);
  });
}

function cancelar(boton) {
  if (confirm("¿Estás seguro que querés cancelar este turno?")) {
    const celda = boton.closest('td');
    celda.innerHTML = "Turno cancelado";
    celda.style.backgroundColor = "#f8d7da";
    celda.style.color = "#721c24";
  }
}

window.addEventListener("DOMContentLoaded", crearTabla);
