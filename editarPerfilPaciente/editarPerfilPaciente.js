document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("editarPerfilForm");
  const mensaje = document.getElementById("mensajeConfirmacion");

  //el email es el identificador del paciente logueado
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

  //guardar cambios nuevoss
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    paciente.nombre = document.getElementById("nombre").value.trim();
    paciente.apellido = document.getElementById("apellido").value.trim();
    paciente.fechaNacimiento = document.getElementById("fechaNacimiento").value.trim();
    paciente.tipoDocumento = document.getElementById("tipoDocumento").value.trim();
    paciente.domicilio = document.getElementById("domicilio").value.trim();
    paciente.email = document.getElementById("email").value.trim();
    paciente.telefono = document.getElementById("telefono").value.trim();

    pacientes[indexPaciente] = paciente;
    localStorage.setItem("pacientesDePrueba", JSON.stringify(pacientes));
    //guardar el nuevo email en pacienteActivo
    const nuevoPacienteActivo = {
      tipo: "paciente",
      email: paciente.email, //email actualizado
    };
    localStorage.setItem("pacienteActivo", JSON.stringify(nuevoPacienteActivo));


    mensaje.textContent = "✔ Perfil actualizado correctamente.";
    mensaje.classList.remove("mensajeError");
    mensaje.classList.add("mostrarMensajeError");
    mensaje.style.color = "green";
  });
});
