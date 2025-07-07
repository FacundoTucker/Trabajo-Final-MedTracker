document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("editarPerfilForm");
  const mensaje = document.getElementById("mensajeConfirmacion");

  const pacienteActivo = localStorage.getItem("pacienteActivo");
  if (!pacienteActivo) {
    alert("No hay sesión activa.");
    window.location.href = "../Login/login.html";
    return;
  }

  const emailActivo = JSON.parse(pacienteActivo).email;
  const pacientes = JSON.parse(localStorage.getItem("pacientesDePrueba")) || [];
  const indexPaciente = pacientes.findIndex(p => p.email === emailActivo);
  const paciente = pacientes[indexPaciente];

  if (!paciente) {
    alert("Paciente no encontrado.");
    return;
  }

  alert("Paciente encontrado: " + paciente.nombre)

  //cargar datos en el formulario
  document.getElementById("nombre").value = paciente.nombre;
  document.getElementById("apellido").value = paciente.apellido;
  document.getElementById("fechaNacimiento").value = paciente.fechaNacimiento;
  document.getElementById("tipoDocumento").value = paciente.tipoDocumento;
  document.getElementById("numeroDocumento").value = paciente.numeroDocumento;
  document.getElementById("domicilio").value = paciente.domicilio;
  document.getElementById("email").value = paciente.email;
  document.getElementById("telefono").value = paciente.telefono;

  //guardar cambios nuevos
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    //obbtener valores y validar campos vacios
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const fechaNacimiento = document.getElementById("fechaNacimiento").value.trim();
    const tipoDocumento = document.getElementById("tipoDocumento").value.trim();
    const numeroDocumento = document.getElementById("numeroDocumento").value.trim();
    const domicilio = document.getElementById("domicilio").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefono = document.getElementById("telefono").value.trim();

    if (!nombre || !apellido || !fechaNacimiento || !tipoDocumento || !numeroDocumento || !domicilio || !email || !telefono) {
      mensaje.textContent = "✘ Todos los campos deben estar completos.";
      mensaje.classList.remove("mensajeError");
      mensaje.classList.add("mostrarMensajeError");
      mensaje.style.color = "red";
      return;
    }

    //actualizar los datos
    paciente.nombre = nombre;
    paciente.apellido = apellido;
    paciente.fechaNacimiento = fechaNacimiento;
    paciente.tipoDocumento = tipoDocumento;
    paciente.numeroDocumento = numeroDocumento;
    paciente.domicilio = domicilio;
    paciente.email = email;
    paciente.telefono = telefono;

    pacientes[indexPaciente] = paciente;
    localStorage.setItem("pacientesDePrueba", JSON.stringify(pacientes));

    //actualizar pacienteActivo
    const nuevoPacienteActivo = {
      tipo: "paciente",
      email: paciente.email,
    };
    localStorage.setItem("pacienteActivo", JSON.stringify(nuevoPacienteActivo));

    //mostrar mensaje de exito
    mensaje.textContent = "✔ Perfil actualizado correctamente.";
    mensaje.classList.remove("mensajeError");
    mensaje.classList.add("mostrarMensajeError");
    mensaje.style.color = "green";
  });
});

