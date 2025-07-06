document.addEventListener("DOMContentLoaded", () => {
  // Referencias a los elementos del DOM de búsqueda
  const inputDniBusqueda = document.getElementById("dniBusqueda");
  const btnCargarPaciente = document.getElementById("btnCargarPaciente");
  const mensajeCarga = document.getElementById("mensajeCarga");

  // Referencias a los campos del formulario que se rellenarán
  const nombreCargado = document.getElementById("nombreCargado");
  const apellidoCargado = document.getElementById("apellidoCargado");
  const dniCargado = document.getElementById("dniCargado");
  const fechaNacimientoCargada = document.getElementById("fechaNacimientoCargada");
  const telefonoCargado = document.getElementById("telefonoCargado");
  const domicilioCargado = document.getElementById("domicilioCargado");
  const enlaceIndicaciones = document.getElementById("indicacionMedica");
  const enlaceEvolutivos = document.getElementById("verEvolutivos");


  // Función para mostrar mensajes de estado
  function mostrarMensaje(mensaje, tipo) {
    mensajeCarga.textContent = mensaje;
    mensajeCarga.className = 'mensajeEstado'; // Resetea las clases
    mensajeCarga.classList.add(tipo); // 'exito' o 'error'
  }

  // Función para limpiar los campos del formulario
  function limpiarCamposCargados() {
    nombreCargado.value = '';
    apellidoCargado.value = '';
    dniCargado.value = '';
    fechaNacimientoCargada.value = '';
    telefonoCargado.value = '';
    domicilioCargado.value = '';
    if (enlaceIndicaciones) enlaceIndicaciones.href = "#";
    if (enlaceEvolutivos) enlaceEvolutivos.href = "#";
  }

  // Evento al hacer clic en el botón "Cargar Datos"
  btnCargarPaciente.addEventListener("click", () => {
    const dniBuscado = inputDniBusqueda.value.trim();

    if (!dniBuscado) {
      mostrarMensaje("Por favor, ingrese un número de DNI para buscar.", "error");
      limpiarCamposCargados();
      return;
    }

    const pacientesGuardadosRaw = localStorage.getItem("pacientesDePrueba");
    
    if (!pacientesGuardadosRaw) {
      mostrarMensaje("No hay datos de pacientes guardados localmente.", "error");
      limpiarCamposCargados();
      return;
    }

    const pacientes = JSON.parse(pacientesGuardadosRaw);
    // Buscar el paciente por DNI
    const pacienteEncontrado = pacientes.find(p => p.numeroDocumento === dniBuscado);

    if (pacienteEncontrado) {
      // Rellenar los campos del formulario con los datos del paciente
      nombreCargado.value = pacienteEncontrado.nombre;
      apellidoCargado.value = pacienteEncontrado.apellido;
      dniCargado.value = pacienteEncontrado.numeroDocumento;
      fechaNacimientoCargada.value = pacienteEncontrado.fechaNacimiento;
      telefonoCargado.value = pacienteEncontrado.telefono;
      domicilioCargado.value = pacienteEncontrado.domicilio;
      if (enlaceIndicaciones) {
      enlaceIndicaciones.href = `/indicacionMedica/indicacionMedica.html?dniCargado=${pacienteEncontrado.numeroDocumento}`;
      };
      if (enlaceEvolutivos) {
      enlaceEvolutivos.href = `/ver_Historial/verHC.html?dniCargado=${pacienteEncontrado.numeroDocumento}`;
      };
      mostrarMensaje(`Datos de "${pacienteEncontrado.nombre} ${pacienteEncontrado.apellido}" cargados.`, "exito");
    } else {
      mostrarMensaje(`No se encontró ningún paciente con DNI: ${dniBuscado}`, "error");
      limpiarCamposCargados(); // Limpia los campos si no se encuentra
    }
  });
});
 