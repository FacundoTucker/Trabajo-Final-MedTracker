document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registroEspecialistaForm");
  const mensajeError = document.getElementById("mensajeEspecialista");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const email = document.getElementById("email").value.trim();
    const contraseña = document.getElementById("contraseña").value;
    const contraseñaRepetida = document.getElementById("contraseñaRepetida").value;
    const matricula = document.getElementById("matricula").value.trim();
    const especialidad = document.getElementById("especialidad").value.trim();

    if (!nombre || !apellido || !email || !contraseña || !contraseñaRepetida || !matricula || !especialidad) {
      mostrarError("Complete todos los campos correctamente.");
      return;
    }

    if (contraseña !== contraseñaRepetida) {
      mostrarError("Las contraseñas no coinciden.");
      return;
    }

    if (!validarContraseña(contraseña)) {
      mostrarError("La contraseña debe tener al menos 7 caracteres, una mayúscula y un número.");
      return;
    }

    ocultarError();
    alert("Registro exitoso!");
    form.reset();
  });

  function mostrarError(mensaje) {
    mensajeError.textContent = mensaje;
    mensajeError.classList.remove("ocultarMensajeError");
    mensajeError.classList.add("mostrarMensajeError");
  }

  function ocultarError() {
    mensajeError.classList.remove("mostrarMensajeError");
    mensajeError.classList.add("ocultarMensajeError");
  }

  function validarContraseña(pass) {
    if (pass.length < 7) return false;

    let tieneMayuscula = false;
    let tieneNumero = false;

    for (let i = 0; i < pass.length; i++) {
      const char = pass[i];
      if (!isNaN(char)) {
        tieneNumero = true;
      } else if (char === char.toUpperCase() && char.match(/[A-Z]/)) {
        tieneMayuscula = true;
      }
    }

    return tieneMayuscula && tieneNumero;
  }
});

