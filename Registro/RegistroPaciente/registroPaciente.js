document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registroPacienteForm");
  const mensajeError = document.getElementById("mensajePaciente");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const dni = document.getElementById("dni").value.trim();
    const fechaNacimiento = document.getElementById("fechaNacimiento").value.trim();
    const email = document.getElementById("email").value.trim();
    const contraseña = document.getElementById("contraseña").value;
    const contraseñaRepetida = document.getElementById("contraseñaRepetida").value;

    if (!nombre || !apellido || !dni || !fechaNacimiento || !email || !contraseña || !contraseñaRepetida) {
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

    alert("Registro exitoso!"); //cuando este todo, nos redirige a la pagina correspondiente
    form.reset();
  });

  function mostrarError(mensaje) {
    mensajeError.textContent = mensaje;
    mensajeError.classList.remove("mensajeError");
    mensajeError.classList.add("mostrarMensajeError");
  }

  function validarContraseña(contraseña) {
    if (contraseña.length < 7) return false;

    let tieneMayuscula = false;
    let tieneNumero = false;

    for (let i = 0; i < contraseña.length; i++) {
      const char = contraseña[i];
      if (!isNaN(char)) tieneNumero = true;
      if (char === char.toUpperCase() && char.match(/[A-Z]/)) tieneMayuscula = true;
    }

    return tieneMayuscula && tieneNumero;
  }
});
