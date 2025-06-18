document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formRecuperar");
    const mensaje = document.querySelector(".mensaje");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const correoIngresado = document.getElementById("email").value.trim();

        if (correoIngresado === "admin@gmail.com") {
            mostrarMensaje("✔ Se ha enviado el enlace para recuperar la contraseña.");
            mensaje.style.color = 'green';
        } else {
            mostrarMensaje("✖ El correo ingresado no existe.");
            mensaje.style.color = 'red';
        }

        function mostrarMensaje(texto) {
            mensaje.textContent = texto;
            mensaje.classList.remove("mensaje");
            mensaje.classList.add("mostrarMensaje");
        }
    });
});


