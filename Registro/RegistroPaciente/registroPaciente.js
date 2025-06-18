document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registroPacienteForm");
  const mensajeError = document.getElementById("mensajeError");

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
    const contraseña = document.getElementById("contraseña").value;
    const contraseñaRepetida = document.getElementById("contraseñaRepetida").value;

    //verificamos que los campos esten completos
    if (!nombre || !apellido || !fechaNacimiento || !tipoDocumento || !numeroDocumento || !domicilio || !email || !telefono || !contraseña || !contraseñaRepetida) {
      mostrarError("Asegúrese de completar todos los campos correctamente.");
      return;
    }

    //verificamos que las contraseñas coincidan
    if (contraseña !== contraseñaRepetida) {
      mostrarError("Las contraseñas no coinciden.");
      return;
    }

    //verificamos que la contraseña cumpla con los requisitos
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
