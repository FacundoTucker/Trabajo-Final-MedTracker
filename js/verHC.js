document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const dni = params.get("dniCargado");

  if (!dni) return;

  const pacientesRaw = localStorage.getItem("pacientesDePrueba");
  if (!pacientesRaw) return;

  const pacientes = JSON.parse(pacientesRaw);
  const paciente = pacientes.find(p => p.numeroDocumento === dni);
  if (!paciente) return;

  // Cargar datos en los campos
  document.getElementById("nombreCargado").value = paciente.nombre;
  document.getElementById("apellidoCargado").value = paciente.apellido;
  document.getElementById("dniCargado").value = paciente.numeroDocumento;
  document.getElementById("fechaNacimientoCargada").value = paciente.fechaNacimiento;
  document.getElementById("telefonoCargado").value = paciente.telefono;
  document.getElementById("domicilioCargado").value = paciente.domicilio;
//
const enlaceIndicaciones = document.getElementById("indicacionMedica");
 
if (enlaceIndicaciones) {
      enlaceIndicaciones.href = `/pages/indicacionMedica.html?dniCargado=${paciente.numeroDocumento}`;
      };
});
