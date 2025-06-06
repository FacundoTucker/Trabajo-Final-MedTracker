const emailValido = "admin@gmail.com";
const passwordValida = "Admin123";

document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault(); // evita que el formulario se envie

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const mensajeError = document.getElementById("mensajeError");

    if (email === emailValido && password === passwordValida) {  //verificariamos a la base de datos
      alert("✅ Inicio de sesión exitoso"); //moverse a otra pagina cuando este
    } else {
      mensajeError.classList.remove("mensajeError");
      mensajeError.classList.add("mostrarMensajeError");
    }
});

