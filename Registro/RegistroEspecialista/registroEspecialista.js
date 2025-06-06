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
      mostrarError("Asegúrese de completar todos los campos correctamente.");
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

    alert("Registro exitoso!"); //me dirigira a la seccion correspondiente una vez este
    form.reset();
  });

  function mostrarError(mensaje) {
    mensajeError.textContent = mensaje;
    mensajeError.classList.remove("mensajeError")
    mensajeError.classList.add("mostrarMensajeError");
  }

  function validarContraseña(contraseña) {
    if (contraseña.length < 7) return false;

    let tieneMayuscula = false;
    let tieneNumero = false;

    //logica para verificar una contraseña completa
    for (let i = 0; i < contraseña.length; i++) {
      const char = contraseña[i];
      if (!isNaN(char)) {
        tieneNumero = true;
      } else if (char === char.toUpperCase() && char.match(/[A-Z]/)) {
        tieneMayuscula = true;
      }
    }

    return tieneMayuscula && tieneNumero;
  }
});

