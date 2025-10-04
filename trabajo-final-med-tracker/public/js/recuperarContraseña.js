document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formRecuperar");
    const mensaje = document.querySelector(".mensaje");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const correoIngresado = document.getElementById("email").value.trim();
        const pacientes = JSON.parse(localStorage.getItem("pacientesDePrueba")) || [];
        const especialistas = JSON.parse(localStorage.getItem("especialistasDePrueba")) || [];

        const existePaciente = pacientes.some(p => p.email === correoIngresado);
        const existeEspecialista = especialistas.some(e => e.email === correoIngresado);

        if (existePaciente || existeEspecialista) {
            mostrarMensaje("✔ Se ha enviado el enlace para recuperar la contraseña.", "green");
        } else {
            mostrarMensaje("✖ El correo ingresado no existe.", "red");
        }
    });

    function mostrarMensaje(texto, color) {
        mensaje.textContent = texto;
        mensaje.style.color = color;
        mensaje.classList.remove("mensaje");
        mensaje.classList.add("mostrarMensaje");
    }
});




