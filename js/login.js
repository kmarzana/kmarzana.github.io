'use strict';

let usersJSONPath = '../data/users.json';

const loginButton = document.getElementById('login-button');

const username = document.getElementById('username');
const password = document.getElementById('password');

const errorMessage = document.getElementById('error-message');

let usuariosRecuperadosLS = [];

function cargarJSONEnLocalStorage() {
    fetch(usersJSONPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`No se pudo cargar el archivo JSON desde ${usersJSONPath}`);
            }
            return response.json(); // Convertir la respuesta a JSON
        })
        .then(data => {
            localStorage.setItem("usuarios", JSON.stringify(data)); // Guardar en Local Storage
            console.log("Usuarios cargados y almacenados en Local Storage:", data);
        })
        .catch(error => {
            console.error("Error al cargar el archivo JSON:", error);
        });
}

cargarJSONEnLocalStorage();

loginButton.addEventListener('click', ()=> {
    validarCredenciales();
});

// Función que valida el usuario y la contraseña
function validarCredenciales() {
    // Recuperamos los datos del LS y los guardamos en la variable usuariosRecupersdosLS.
    // arrayUsuariosRecuperadosLS será el array de usuarios sobre el que podremos itersar.
    usuariosRecuperadosLS = JSON.parse(localStorage.getItem('usuarios'));
    const arrayUsuariosRecupersdosLS = usuariosRecuperadosLS.usuarios;
    //! console.log(arrayUsuariosRecupersdosLS instanceof Array); -> true
    
    const encontrado = arrayUsuariosRecupersdosLS.find(e => e.username === username.value.toLowerCase().trim());
    
    if(!encontrado) {
        errorMessage.style.display = 'block';
        errorMessage.innerHTML = '<p>El usuario no existe</p>';
        return;
    }
    
    if(encontrado) {
        if(encontrado.password === password.value) {
            window.location = '../html/juego.html';
        } else {
            errorMessage.style.display = 'block';
            errorMessage.innerHTML = '<p>Contraseña incorrecta</p>';
        }
    }
}

// Añadimos una acción al focus para que desaparezca el mensaje de error al intentar introducir nuevamente usuario / contraseña
username.addEventListener('focus', () => {
    errorMessage.style.display = 'none';
});
password.addEventListener('focus', () => {
    errorMessage.style.display = 'none';
})