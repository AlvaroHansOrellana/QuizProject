// ----------------VALIDACION DE FORMULARIO---------------------------



const showPasswordCheckbox = document.getElementById('showPassword');
const passwordInput = document.getElementById('password');

showPasswordCheckbox.addEventListener('change', function() {
    passwordInput.type = this.checked ? 'text' : 'password'; // Muestra u oculta la contraseña
});

// Función para simular la conexión con Google
document.getElementById('googleLogin').addEventListener('click', function() {
    alert('Conectando con Google...');
});
document.getElementById("registrationForm").addEventListener("submit", function(event) {
    const name = document.getElementById("name").value.trim();
    const username = document.getElementById("username").value.trim();
    const age = parseInt(document.getElementById("age").value);
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Validación de nombre y usuario
    if (!name || !username) {
        alert("Por favor, completa tu nombre y usuario.");
        event.preventDefault(); // Evita el envío del formulario
        return;
    }

    // Validación de edad
    if (age < 1 || age > 120) {
        alert("Por favor, ingresa una edad válida.");
        event.preventDefault();
        return;
    }

    // Validación de correo
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Por favor, ingresa un correo electrónico válido.");
        event.preventDefault();
        return;
    }

    // Validación de contraseña
    if (password.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres.");
        event.preventDefault();
        return;
    }
});

// Mostrar/ocultar contraseña
document.getElementById("showPassword").addEventListener("change", function() {
    const passwordField = document.getElementById("password");
    passwordField.type = this.checked ? "text" : "password";
});

// ----------------------------------------------------------------------
//-------------------GUARDAR FORM EN LOCALSTORAGE-----------------------
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("registrationForm");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevenir el envío del formulario

        // Obtener valores de los campos
        const name = document.getElementById("name").value.trim();
        const username = document.getElementById("username").value.trim();
        const age = document.getElementById("age").value;
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        // Crear un objeto de usuario
        const user = { name, username, age, email, password };

        // Guardar en localStorage
        localStorage.setItem('user', JSON.stringify(user));

        alert("Usuario registrado en localStorage.");
        
        // Reiniciar el formulario si es necesario
        form.reset();
    });
});
