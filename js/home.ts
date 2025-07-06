// Referencias a elementos
const btnLogin = document.getElementById('btn-login') as HTMLButtonElement;
const btnRegister = document.getElementById('btn-register') as HTMLButtonElement;
const dropdownMenu = document.getElementById('dropdown-menu') as HTMLDivElement;
const regPaciente = document.getElementById('reg-paciente') as HTMLButtonElement;
const regEspecialista = document.getElementById('reg-especialista') as HTMLButtonElement;

const modal = document.getElementById('auth-modal') as HTMLDialogElement;
const form = document.getElementById('auth-form') as HTMLFormElement;
const roleSelect = document.getElementById('role') as HTMLSelectElement;
const modalTitle = document.getElementById('modal-title') as HTMLElement;

// 1. Toggle dropdown menú registro
btnRegister.addEventListener('click', () => {
  dropdownMenu.classList.toggle('hidden');
});

// 2. Cerrar dropdown si clic afuera
document.addEventListener('click', (event) => {
  if (!btnRegister.contains(event.target as Node) && !dropdownMenu.contains(event.target as Node)) {
    dropdownMenu.classList.add('hidden');
  }
});

regPaciente.addEventListener('click', (event) => {
  event.stopPropagation();
  window.location.href = './Registro/RegistroPaciente/registroPaciente.html';
});

regEspecialista.addEventListener('click', (event) => {
  event.stopPropagation();
  window.location.href = './Registro/RegistroEspecialista/registroEspecialista.html';
});


// 4. Abrir modal de login
btnLogin.addEventListener('click', () => {
window.location.href = './Login/login.html';
});


// 5. Manejar envío del formulario del modal (login simulado)
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const role = roleSelect.value; // 'paciente' o 'medico'

  // Guardar rol en sessionStorage (puede usarse para validaciones posteriores)
  sessionStorage.setItem('userRole', role);

  // Redirigir según rol
  if (role === 'medico') {
    window.location.href = 'home-medico.html';
  } else {
    window.location.href = 'home-paciente.html';
  }
});
