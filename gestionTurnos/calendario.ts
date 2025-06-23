interface Turno {
  dia: string;
  hora: string;
  paciente: string;
}

function obtenerNombreDia(fechaStr: string): string {
  const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const fecha = new Date(fechaStr);
  if (isNaN(fecha.getTime())) return '';
  return dias[fecha.getDay()];
}

const turnosBrutos = JSON.parse(localStorage.getItem("turnos") || "[]");
if (!Array.isArray(turnosBrutos)) {
  console.error("Los turnos guardados no son un arreglo");
}

const turnos: Turno[] = turnosBrutos.map((t: any) => ({
  dia: obtenerNombreDia(t.fecha),
  hora: t.hora,
  paciente: t.paciente
}));

const diasSemana: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const calendario = document.getElementById('calendario');

if (calendario) {
  diasSemana.forEach(dia => {
    const turnosDelDia = turnos.filter(turno => turno.dia === dia);
    // Si querés evitar columnas vacías, descomenta esta línea
    // if (turnosDelDia.length === 0) return;

    const columna = document.createElement('div');
    columna.className = 'dia';
    columna.innerHTML = `<h2>${dia}</h2>`;

    turnosDelDia.forEach(turno => {
      const divTurno = document.createElement('div');
      divTurno.className = 'turno';
      divTurno.innerHTML = `<strong>${turno.hora}</strong> - ${turno.paciente}`;
      columna.appendChild(divTurno);
    });

    calendario.appendChild(columna);
  });
}

function volverAlMenu(): void {
  window.location.href = "gestionTurnos.html?vista=medico";
}
