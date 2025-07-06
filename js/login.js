document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const mensajeError = document.getElementById("mensajeError");

  //cargar usuarios desde el local
  const pacientes = JSON.parse(localStorage.getItem("pacientesDePrueba")) || [];
  const especialistas = JSON.parse(localStorage.getItem("especialistasDePrueba")) || [];

  //buscar paciente con email y contraseña
  const pacienteEncontrado = pacientes.find(p => p.email === email && p.contraseña === password);

  //buscar especialista con email y contraseña
  const especialistaEncontrado = especialistas.find(e => e.email === email && e.contraseña === password);

  if (pacienteEncontrado) {
    localStorage.setItem("pacienteActivo", JSON.stringify({ tipo: "paciente", email }));
    alert("✅ Inicio de sesión exitoso como paciente");
    window.location.href = "../pages/homePaciente.html";
  } else if (especialistaEncontrado) {
    localStorage.setItem("especialistasActivo", JSON.stringify({ tipo: "especialista", email }));
    alert("✅ Inicio de sesión exitoso como especialista");
    window.location.href = "../pages/homeEspecialista.html";
  } else {
    mensajeError.classList.remove("mensajeError");
    mensajeError.classList.add("mostrarMensajeError");
  }
});

