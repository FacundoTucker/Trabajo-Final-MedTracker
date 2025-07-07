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
  document.getElementById("nombreCompleto").value = `${paciente.nombre} ${paciente.apellido}`;
  document.getElementById("dniCargado").value = paciente.numeroDocumento;
  document.getElementById("domicilioCargado").value = paciente.domicilio;

});

function imprimirDiv(idDiv) {
  const contenidoOriginal = document.getElementById(idDiv);


  const ventana = window.open('', '_blank');
  ventana.document.write(`
    <html>
      <head>
        <title>Imprimir</title>
        <link rel="stylesheet" href="../styles/carga.css">
        <style>
          @media print {
            body {
              margin: 0;
            }
          }
        </style>
      </head>
      <body onload="window.print(); window.close();">
        ${contenidoOriginal.outerHTML}
      </body>
    </html>
  `);
  ventana.document.close();
}