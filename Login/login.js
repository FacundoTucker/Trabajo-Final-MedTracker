const emailValido = "admin@gmail.com";
const passwordValida = "123456";

document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault(); // evita que el formulario se envie

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const mensajeError = document.getElementById("mensajeError");

    if (email === emailValido && password === passwordValida) {
      alert("✅ Inicio de sesión exitoso"); //moverse a otra pagina cuando este
    } else {
      mensajeError.classList.remove("ocultarMensajeError");
      mensajeError.classList.add("mostrarMensajeError");
    }
});

