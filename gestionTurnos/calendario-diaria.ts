interface TurnoDiaria {
  fecha: string;      
  hora: string;       
  paciente: string;
}

const turnosDia: TurnoDiaria[] = JSON.parse(localStorage.getItem("turnos") || "[]");

function mostrarTurnosDelDia(): void {
  const inputFecha = document.getElementById("fechaDia") as HTMLInputElement | null;
  const contenedor = document.getElementById("contenedorTurnosDia");

  if (!inputFecha || !contenedor) return;

  const fechaSeleccionada = inputFecha.value;

  if (!fechaSeleccionada) {
    contenedor.innerHTML = "<p>Por favor, seleccioná una fecha.</p>";
    return;
  }

  contenedor.innerHTML = "";

  // Filtrar turnos que coincidan con la fecha seleccionada
  const turnos = turnosDia.filter(turno => turno.fecha === fechaSeleccionada);

  if (turnos.length === 0) {
    contenedor.innerHTML = "<p>No hay turnos para esta fecha.</p>";
    return;
  }

  const columna = document.createElement("div");
  columna.className = "dia";
  columna.innerHTML = `<h2>${fechaSeleccionada}</h2>`;

  turnos.forEach(turno => {
    const divTurno = document.createElement("div");
    divTurno.className = "turno";
    divTurno.innerHTML = `<strong>${turno.hora}</strong> - ${turno.paciente}`;
    columna.appendChild(divTurno);
  });

  contenedor.appendChild(columna);
}

function volverAlMenuDiaria(): void {
  window.location.href = "gestionTurnos.html?vista=medico";
}
