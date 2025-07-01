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
    const contraseña = document.getElementById("contraseña").value.trim();
    const contraseñaRepetida = document.getElementById("contraseñaRepetida").value.trim();

    //validaciones basicas
    if (!nombre || !apellido || !fechaNacimiento || !tipoDocumento || !numeroDocumento || !domicilio || !email || !telefono || !contraseña || !contraseñaRepetida) {
      mostrarError("Asegúrese de completar todos los campos.");
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

    //traer array pacientes o crear uno vacio
    const pacientesGuardados = JSON.parse(localStorage.getItem("pacientesDePrueba")) || [];

    //validar que no exista paciente con el mismo email o documento
    const existe = pacientesGuardados.some(p =>
      p.email.toLowerCase() === email.toLowerCase() || p.numeroDocumento === numeroDocumento
    );

    if (existe) {
      mostrarError("Ya existe un paciente con ese email o documento.");
      return;
    }

    const nuevoPaciente = {
      nombre,
      apellido,
      fechaNacimiento,
      tipoDocumento,
      numeroDocumento,
      domicilio,
      email,
      telefono,
      contraseña
    };

    pacientesGuardados.push(nuevoPaciente);
    localStorage.setItem("pacientesDePrueba", JSON.stringify(pacientesGuardados));

    alert("✔ Registro exitoso.");
    form.reset();
    //nos movemos al login
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
