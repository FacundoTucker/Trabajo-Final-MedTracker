window.addEventListener("DOMContentLoaded", function () {
    var configBtn = document.getElementById("btn-config");
    var configMenu = document.getElementById("config-menu");
    var btnEliminar = document.getElementById("btnEliminar");
    
    /* Mostrar / ocultar menú */
    configBtn.addEventListener("click", function () {
        configMenu.style.display = configMenu.style.display === "flex" ? "none" : "flex";
    });
    /* Ocultar si clickeás afuera */
    document.addEventListener("click", function (e) {
        var target = e.target;
        if (!configMenu.contains(target) && !configBtn.contains(target)) {
            configMenu.style.display = "none";
        }
    });
    /* Eliminar usuario */
    btnEliminar.addEventListener("click", function () {
        if (!confirm("¿Realmente querés eliminar tu usuario? Esta acción es irreversible."))
            return;
        /* Busco al paciente activo */
        var activo = localStorage.getItem("pacienteActivo");
        var pacientesJSON = localStorage.getItem("pacientesDePrueba");
        if (!activo || !pacientesJSON) {
            volverAlLogin();
            return;
        }
        var email = JSON.parse(activo).email;
        var pacientes = JSON.parse(pacientesJSON);
        /* Borro del array y actualizo storage */
        var restantes = pacientes.filter(function (p) { return p.email !== email; });
        localStorage.setItem("pacientesDePrueba", JSON.stringify(restantes));
        /* Borro la sesión */
        localStorage.removeItem("pacienteActivo");
        alert("Tu usuario fue eliminado correctamente.");
        volverAlLogin();
    });
    function volverAlLogin() {
        window.location.href = "../pages/home.html";
    }
});
var btnBuscar = document.getElementById("btnBuscar");
btnBuscar.addEventListener("click", function () {
    window.location.href = "simulacion/solicitarTurno.html";
});
