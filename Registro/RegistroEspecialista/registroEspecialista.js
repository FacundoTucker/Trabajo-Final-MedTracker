document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registroEspecialistaForm");
  const mensajeError = document.getElementById("mensajeEspecialista");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

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
    const contraseña = document.getElementById("contraseña").value;
    const contraseñaRepetida = document.getElementById("contraseñaRepetida").value;

    //verificar que todos los campos esten completos
    if (!nombre || !apellido || !fechaNacimiento || !tipoDocumento || !numeroDocumento || !domicilio || !email || !telefono || !matricula || !especialidad || !contraseña || !contraseñaRepetida) {
      mostrarError("Asegúrese de completar todos los campos correctamente.");
      return;
    }

    //verificar que las contraseñas coincidan
    if (contraseña !== contraseñaRepetida) {
      mostrarError("Las contraseñas no coinciden.");
      return;
    }

    //verificar que la contraseña cumpla con los requisitos
    if (!validarContraseña(contraseña)) {
      mostrarError("La contraseña debe tener al menos 7 caracteres, una mayúscula y un número.");
      return;
    }

    //traer array pacientes o crear uno vacio
    const pacientesGuardados = JSON.parse(localStorage.getItem("pacientesDePrueba")) || [];
    const especialistasGuardados = JSON.parse(localStorage.getItem("especialistasDePrueba")) || [];

    //validar que no exista paciente con el mismo email o documento
    const existePaciente = pacientesGuardados.some(p =>
      p.email.toLowerCase() === email.toLowerCase() || p.numeroDocumento === numeroDocumento
    );

    const existeEspecialista = especialistasGuardados.some(e =>
      e.email.toLowerCase() === email.toLowerCase() || e.numeroDocumento === numeroDocumento
    );

    if (existeEspecialista || existePaciente) {
      mostrarError("Ya existe un usuario con ese email o documento.");
      return;
    }

    //crear nuevo especialista
    const nuevoEspecialista = {
      nombre,
      apellido,
      fechaNacimiento,
      tipoDocumento,
      numeroDocumento,
      domicilio,
      email,
      telefono,
      matricula,
      especialidad,
      contraseña
    };

    //guardar nuevo especialista en localStorage
    especialistasGuardados.push(nuevoEspecialista);
    localStorage.setItem("especialistasDePrueba", JSON.stringify(especialistasGuardados));

    alert("✔ Registro exitoso.");
    form.reset();

    window.location.href = "../../Login/login.html";
  });

  function mostrarError(mensaje) {
    mensajeError.textContent = mensaje;
    mensajeError.classList.remove("mensajeError");
    mensajeError.classList.add("mostrarMensajeError");
  }

  function validarContraseña(pass) {
    if (pass.length < 7) return false;
    const tieneMayuscula = /[A-Z]/.test(pass);
    const tieneNumero = /\d/.test(pass);
    return tieneMayuscula && tieneNumero;
  }
});

