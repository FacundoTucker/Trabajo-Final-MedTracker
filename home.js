// Referencias a elementos
var btnLogin = document.getElementById('btn-login');
var btnRegister = document.getElementById('btn-register');
var dropdownMenu = document.getElementById('dropdown-menu');
var regPaciente = document.getElementById('reg-paciente');
var regEspecialista = document.getElementById('reg-especialista');
var modal = document.getElementById('auth-modal');
var form = document.getElementById('auth-form');
var roleSelect = document.getElementById('role');
var modalTitle = document.getElementById('modal-title');
// 1. Toggle dropdown menú registro
btnRegister.addEventListener('click', function () {
    dropdownMenu.classList.toggle('hidden');
});
// 2. Cerrar dropdown si clic afuera
document.addEventListener('click', function (event) {
    if (!btnRegister.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.add('hidden');
    }
});
regPaciente.addEventListener('click', function (event) {
    event.stopPropagation();
    window.location.href = './Registro/RegistroPaciente/registroPaciente.html';
});
regEspecialista.addEventListener('click', function (event) {
    event.stopPropagation();
    window.location.href = './Registro/RegistroEspecialista/registroEspecialista.html';
});
// 4. Abrir modal de login
btnLogin.addEventListener('click', function () {
    window.location.href = './Login/login.html';
});
// 5. Manejar envío del formulario del modal (login simulado)
form.addEventListener('submit', function (e) {
    e.preventDefault();
    var role = roleSelect.value; // 'paciente' o 'medico'
    // Guardar rol en sessionStorage (puede usarse para validaciones posteriores)
    sessionStorage.setItem('userRole', role);
    // Redirigir según rol
    if (role === 'medico') {
        window.location.href = 'home-medico.html';
    }
    else {
        window.location.href = 'home-paciente.html';
    }
});
