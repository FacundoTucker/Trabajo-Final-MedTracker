document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("editarPerfilForm");
  const mensaje = document.getElementById("mensajeConfirmacion");

  const especialistaActivo = localStorage.getItem("especialistasActivo");
  if (!especialistaActivo) {
    alert("No hay sesión activa.");
    window.location.href = "../Login/login.html";
    return;
  }

  const emailActivo = JSON.parse(especialistaActivo).email;
  const especialistas = JSON.parse(localStorage.getItem("especialistasDePrueba")) || [];
  const indexEspecialista =especialistas.findIndex(e => e.email === emailActivo);
  const especialista = especialistas[indexEspecialista];

  if (!especialista) {
    alert("Paciente no encontrado.");
    return;
  }

  alert("Especialista encontrado: " + especialista.nombre)

  //cargar datos en el formulario
  document.getElementById("nombre").value = especialista.nombre;
  document.getElementById("apellido").value = especialista.apellido;
  document.getElementById("fechaNacimiento").value = especialista.fechaNacimiento;
  document.getElementById("tipoDocumento").value = especialista.tipoDocumento;
  document.getElementById("numeroDocumento").value = especialista.numeroDocumento;
  document.getElementById("domicilio").value = especialista.domicilio;
  document.getElementById("email").value = especialista.email;
  document.getElementById("telefono").value = especialista.telefono;
  document.getElementById("matricula").value = especialista.matricula;
  document.getElementById("especialidad").value = especialista.especialidad;

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
    const matricula = document.getElementById("matricula").value.trim();
    const especialidad = document.getElementById("especialidad").value.trim();

    if (!nombre || !apellido || !fechaNacimiento || !tipoDocumento || !numeroDocumento || !domicilio || !email || !telefono || !matricula || !especialidad) {
      mensaje.textContent = "✘ Todos los campos deben estar completos.";
      mensaje.classList.remove("mensajeError");
      mensaje.classList.add("mostrarMensajeError");
      mensaje.style.color = "red";
      return;
    }

    //actualizar los datos
    especialista.nombre = nombre;
    especialista.apellido = apellido;
    especialista.fechaNacimiento = fechaNacimiento;
    especialista.tipoDocumento = tipoDocumento;
    especialista.numeroDocumento = numeroDocumento;
    especialista.domicilio = domicilio;
    especialista.email = email;
    especialista.telefono = telefono;
    especialista.matricula = matricula;
    especialista.especialidad = especialidad;

    especialistas[indexEspecialista] = especialista;
    localStorage.setItem("especialistasDePrueba", JSON.stringify(especialistas));

    //actualizar pacienteActivo
    const nuevoEspecialistaActivo = {
      tipo: "especialista",
      email: especialista.email,
    };
    localStorage.setItem("especialistasActivo", JSON.stringify(nuevoEspecialistaActivo));

    //mostrar mensaje de exito
    mensaje.textContent = "✔ Perfil actualizado correctamente.";
    mensaje.classList.remove("mensajeError");
    mensaje.classList.add("mostrarMensajeError");
    mensaje.style.color = "green";
  });
});