function mostrarVista(vista: 'paciente' | 'medico'): void {
  const vistaPaciente = document.getElementById("vistaPaciente");
  const vistaMedico = document.getElementById("vistaMedico");

  if (!vistaPaciente || !vistaMedico) return;

  if (vista === "paciente") {
    vistaPaciente.style.display = "block";
    vistaMedico.style.display = "none";
  } else {
    vistaPaciente.style.display = "none";
    vistaMedico.style.display = "block";
  }
}

function irAVistaSemanal(): void {
  window.location.href = "calendario.html";
}

function irAVistaDiaria(): void {
  window.location.href = "calendario-diaria.html";
}

function reservarTurnoPaciente(): void {
  const nombreInput = document.getElementById("nombrePaciente") as HTMLInputElement | null;
  const especialidadSelect = document.getElementById("especialidad") as HTMLSelectElement | null;
  const fechaInput = document.getElementById("fechaTurno") as HTMLInputElement | null;
  const horaInput = document.getElementById("horaTurno") as HTMLInputElement | null;
  const historial = document.getElementById("listaHistorial") as HTMLUListElement | null;

  if (!nombreInput || !especialidadSelect || !fechaInput || !horaInput || !historial) return;

  const nombre = nombreInput.value.trim();
  const especialidad = especialidadSelect.value;
  const fecha = fechaInput.value;
  const hora = horaInput.value;

  if (!nombre || !fecha || !hora) {
    alert("Por favor, completá todos los campos.");
    return;
  }

  const nuevoTurno = document.createElement("li");
  nuevoTurno.textContent = `Turno para ${nombre} - ${especialidad} - Fecha: ${fecha} - Hora: ${hora}`;
  historial.appendChild(nuevoTurno);

  const turnosGuardados = JSON.parse(localStorage.getItem("turnos") || "[]");
  turnosGuardados.push({ paciente: nombre, especialidad, fecha, hora });
  localStorage.setItem("turnos", JSON.stringify(turnosGuardados));

  alert(`✅ Turno confirmado para ${nombre}
📅 Fecha: ${fecha}
🕒 Hora: ${hora}
🏥 Ubicación: Av. Salud 123
☎️ Teléfono: 0800-555-1234
⏱️ Llegar 15 minutos antes de la consulta.`);

  nombreInput.value = "";
  fechaInput.value = "";
  horaInput.value = "";
}

function mostrarSeccion(seccion: string): void {
  const contenedor = document.getElementById('contenidoMedico');
  if (!contenedor) return;

  contenedor.innerHTML = '';

  switch (seccion) {
    case 'historiales':
      contenedor.innerHTML = '<h3>Historiales Médicos</h3><p>Contenido de historiales aquí...</p>';
      break;
    case 'perfiles':
      contenedor.innerHTML = '<h3>Perfiles de Pacientes</h3><p>Contenido de perfiles aquí...</p>';
      break;
    case 'calendario':
      contenedor.innerHTML = `
        <h3>Calendario</h3>
        <p>Elegí una vista:</p>
        <button onclick="irAVistaDiaria()">Vista Diaria</button>
        <button onclick="irAVistaSemanal()">Vista Semanal</button>
        <div id="calendarioContenido"></div>
      `;
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

window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const vista = params.get("vista");

  if (vista === "medico") {
    mostrarVista("medico");
  } else if (vista === "paciente") {
    mostrarVista("paciente");
  }
});
