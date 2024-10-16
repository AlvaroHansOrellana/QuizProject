//-------------------------------FIREBASE FORM-------------------------------------
// Configuración de Firebase
let firebaseConfig = {
    apiKey: "AIzaSyBazEJwCXDWQZdhWN3JWyN6JDcaxOGp4mI",
    authDomain: "quiztrivia-32d83.firebaseapp.com",
    projectId: "quiztrivia-32d83",
    storageBucket: "quiztrivia-32d83.appspot.com",
    messagingSenderId: "5093975636",
    appId: "1:5093975636:web:42c36e4af7e22e01716fc1"
  };
  firebase.initializeApp(firebaseConfig);

  const formdb = firebase.firestore();
  

  const addData = (user) => {
    formdb.collection("users")
      .add(user)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id)
        readAll();
      })
      .catch((error) => console.error("Error adding document: ", error));
  };

  
  const readAll = () => {
    // Limpia el album para mostrar el resultado
    cleanformdb();
  
    //Petición a Firestore para leer todos los documentos de la colección album
    formdb.collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
           printForm(doc.data().nombre, doc.data().url, doc.id)
        });
  
      })
      .catch(() => console.log('Error reading documents'));;
  };

  const cleanformdb = () => {
    document.getElementById('formdb').innerHTML = "";
  };
  

document.addEventListener("DOMContentLoaded", function() {
    // Obtener referencias a los elementos en HTML
    let formularioDeContacto = document.getElementById("formdb");
    // let listaDeContactos = document.getElementById("contactList");
    // let botonBorrarTodos = document.getElementById("clearAll");
    
    mostrarContactos(); // llamar para mostrar los contactos guardados al cargar la página

    // cuando el formulario se envía
    formularioDeContacto.addEventListener("submit", function(evento) {
        evento.preventDefault(); // evitar que la página se recargue
        
        // obtener los valores que el usuario escribió
        let nombre = document.getElementById("name").value;
        let username = document.getElementById("username").value;
        let age = document.getElementById("age").value;
        let email = document.getElementById("email").value;
        let password= document.getElementById("password").value;

        
            addData({
            name,
            username,
            age,
            email,
            password,
            });
        
            

//Función auxiliar para pintar una foto en el album
// const printForm = (nombre, email, mensaje, urlImagen, docId) => {
//   let card = document.createElement('article');
//   card.setAttribute('class', 'card');
//   let picture = document.createElement('img');
//   picture.setAttribute('src', url);
//   picture.setAttribute('style', 'max-width:250px');
//   let caption = document.createElement('p');
//   caption.innerHTML = nombre;
//   let id = document.createElement('p');
//   id.innerHTML = docId;
//   const users = document.getElementById('usuarios');
//   card.appendChild(picture);
//   card.appendChild(caption);
//   card.appendChild(id);
//   usuarios.appendChild(card);
    });

        /*
        // crear un objeto con los datos del contacto
        let contacto = {
            nombre: nombre,
            email: email,
            mensaje: mensaje,
            urlImagen: urlImagen
        };
        */
       //// array con los objetos
        // const contacto = { nombre, email, mensaje, urlImagen };
        // guardarContacto(contacto);
        formularioDeContacto.reset(); // reiniciar el formulario
        mostrarContactos(); // actualizar la lista
    });
        
    // // función para guardar el contacto en el almacenamiento local
    // function guardarContacto(contacto) {
    //     let contactosGuardados = obtenerContactos();
    //     contactosGuardados.push(contacto); // añadir el nuevo contacto al array
    //     localStorage.setItem("contactos", JSON.stringify(contactosGuardados)); // guardar el array en localStorage
    // }



    // función para obtener los contactos guardados del almacenamiento local
    function obtenerContactos() {
        let contactosEnStorage = localStorage.getItem("contactos");
        if (contactosEnStorage === null) {
            return []; // Si no hay contactos, devolver un array vacío
        } else {
            return JSON.parse(contactosEnStorage); // convertir los contactos de texto a un array
        }
    }

    // función para mostrar los contactos guardados
    function mostrarContactos() {
        let contactos = obtenerContactos();
        // listaDeContactos.innerHTML = ""; // limpiar la lista de contactos antes de mostrar los nuevos

        // recorrer todos los contactos y mostrarlos
        for (let i = 0; i < contactos.length; i++) {
            let contacto = contactos[i];
            let elementoLista = document.createElement("li");
            
            let contenidoContacto = "<strong>" + contacto.nombre + "</strong> (" + contacto.email + ")<br>" + contacto.mensaje; // crear el contenido del contacto
            
            // // mostrar la imagen si hay una URL
            // if (contacto.urlImagen !== "") {
            //     contenidoContacto += "<br><img src='" + contacto.urlImagen + "' alt='Imagen de contacto' width='50'>";
            // }
            
            elementoLista.innerHTML = contenidoContacto;

            // este es el botón para borrar
            let botonBorrar = document.createElement("button");
            botonBorrar.textContent = "Borrar";
            botonBorrar.dataset.indice = i; // guardar el índice del contacto en el botón

            // cuando se hace clic en el botón de borrar
            botonBorrar.addEventListener("click", function() {
                let indice = this.dataset.indice;
                borrarContacto(indice);
            });

            // añadir el botón al elemento de la lista
            elementoLista.appendChild(botonBorrar);

            // añadir el contacto a la lista
            listaDeContactos.appendChild(elementoLista);
        }
    }

    // función para borrar un contacto
    function borrarContacto(indice) {
        let contactos = obtenerContactos();
        contactos.splice(indice, 1); // quitar el contacto de la lista
        localStorage.setItem("contactos", JSON.stringify(contactos)); // guardar la nueva lista en el almacenamiento local
        mostrarContactos(); // volver a mostrar la lista de contactos actualizada
    }

    // evento para borrar todos los contactos
    // botonBorrarTodos.addEventListener("click", function() {
    //     localStorage.removeItem("contactos"); // quitar todos los contactos del almacenamiento local
    //     mostrarContactos(); // limpiar la lista en la pantalla
    // });
//-------------------------------FIN----------------------------------



// // ----------------VALIDACION DE FORMULARIO---------------------------

// const showPasswordCheckbox = document.getElementById('showPassword');
// const passwordInput = document.getElementById('password');

// showPasswordCheckbox.addEventListener('change', function() {
//     passwordInput.type = this.checked ? 'text' : 'password'; // Muestra u oculta la contraseña
// });

// // Función para simular la conexión con Google
// document.getElementById('googleLogin').addEventListener('click', function() {
//     alert('Conectando con Google...');
// });
// document.getElementById("registrationForm").addEventListener("submit", function(event) {
//     const name = document.getElementById("name").value.trim();
//     const username = document.getElementById("username").value.trim();
//     const age = parseInt(document.getElementById("age").value);
//     const email = document.getElementById("email").value.trim();
//     const password = document.getElementById("password").value;

//     // Validación de nombre y usuario
//     if (!name || !username) {
//         alert("Por favor, completa tu nombre y usuario.");
//         event.preventDefault(); // Evita el envío del formulario
//         return;
//     }

//     // Validación de edad
//     if (age < 1 || age > 120) {
//         alert("Por favor, ingresa una edad válida.");
//         event.preventDefault();
//         return;
//     }

//     // Validación de correo
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailPattern.test(email)) {
//         alert("Por favor, ingresa un correo electrónico válido.");
//         event.preventDefault();
//         return;
//     }

//     // Validación de contraseña
//     if (password.length < 6) {
//         alert("La contraseña debe tener al menos 6 caracteres.");
//         event.preventDefault();
//         return;
//     }
// });

// // Mostrar/ocultar contraseña
// document.getElementById("showPassword").addEventListener("change", function() {
//     const passwordField = document.getElementById("password");
//     passwordField.type = this.checked ? "text" : "password";
// });

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


let preguntas = []; //array pregutas obtenidas api
let preguntaActual = 0; //índice de preguntas
let puntuacion = 0; //se guarda la puntutación de las preguntas (pocentaje)
let games=[];//se guardan las puntuaciones y fechas de partida.
if (games.length === 0){ //comprobacion de localStorage
        games = [];
 }


async function obtenerPreguntas() {
    try {
        let respuesta = await fetch('https://opentdb.com/api.php?amount=10&category=12&difficulty=easy&type=multiple');
        if (!respuesta.ok) {
            throw new Error('Error al obtener las preguntas');
        }
        let datos = await respuesta.json();
        return datos.results;
    } catch (error) {
        console.error('Hubo un problema con la solicitud:', error);
    }
}


async function iniciarQuiz() {
    //obtenemos las preguntas de la api 
    preguntas = await obtenerPreguntas();
    //mostramos la primera pregunta
    mostrarPregunta();
}

//respuestas mezcladas
//recibe un array de opciones
//sort = método para ordenar un array con el criterio que le demos
function mezclarOpciones(opciones) {
    return opciones.sort(() => Math.random() - 0.5);
}


function mostrarPregunta() {
    //10 pregutnas
    if (preguntaActual < preguntas.length) {
        let pregunta = preguntas[preguntaActual];
        //muestra la pregunta en el HTML
        document.getElementById('pregunta-texto').textContent = pregunta.question;

        // 4 OPCIONES
        let opcionesLista = document.getElementById('opciones-lista');
        opcionesLista.innerHTML = '';


        // Crear un array para las opciones
        let opciones = [];

        // Respuestas incorrectas
        for (let i = 0; i < pregunta.incorrect_answers.length; i++) {
            opciones.push(pregunta.incorrect_answers[i]);
        }
        // Respuesta correcta
        opciones.push(pregunta.correct_answer);

        opciones = mezclarOpciones(opciones);
        //iteramos sobre cada opción 
        opciones.forEach((opcion) => {
            let li = document.createElement('li');
            //asignamos texto a cada opción 
            li.textContent = opcion;
            li.addEventListener('click', () => verificarRespuesta(opcion === pregunta.correct_answer));
            opcionesLista.appendChild(li);
        });
    } else {
        mostrarResultados();
    }
}


function verificarRespuesta(esCorrecta) {
    if (esCorrecta) {
        puntuacion++;
    }

    //pasar a la siguiente pregunta y mostrarla
    preguntaActual++;
    mostrarPregunta();
}

//  Muestra los resultaods al final 
function mostrarResultados() {
    document.getElementById('pregunta-texto').textContent = `¡Quiz terminado! Tu puntuación es ${puntuacion} de ${preguntas.length}.`;
    document.getElementById('opciones-lista').innerHTML = '';
}


iniciarQuiz();

// ------------------------------------------------------------------------
//-------------------GUARDAR PARTIDAS EN LOCALSTORAGE--------------------
/*Almacenar la puntuación de cada partida en un array de objetos [{..},{..},{..}...{..}]
 en Local Storage. Guardar puntuación y fecha en cada objeto del array
*/
document.getElementById("guardarPartida").addEventListener("click", function (event) {
    event.preventDefault();
            // Obtener valores
            const puntos = puntuacion;
            const fecha = Date.now();
            const fechaConv = Date(fecha*1000).toString();
            //aqui convertir mes dia anio con new date etc

            // Crear un objeto de usuario
            let game = { 
                puntuacion: puntos,
                fecha: fechaConv
                };

            // Guardar en localStorage
            localStorage.setItem('game', JSON.stringify(game));

            alert("Partida guardada en LocalStorage");

            

        
        saveAndupdateGames(game);
    });



function saveAndupdateGames(game) {
    games = JSON.parse(localStorage.getItem("Partidas"));
    games.push(game);
    localStorage.setItem("Partidas", JSON.stringify(games));

}

// ------------------------------------------------------------------------
//-------------------REPRESENTAR GRAFICA LOCALSTORAGE----------------------

/* Mostrar en la Home con una gráfica los resultados de las últimas partidas 
jugadas (leer puntuaciones de LocalStorage). Representar Fecha(eje X) vs Puntuación(eje Y) */
document.getElementById("estadisticas").addEventListener("click", function (event) {
    event.preventDefault();
    games = JSON.parse(localStorage.getItem("Partidas"));
    let arrPuntuaciones =[];
    let arrFechas =[];
    games.forEach(item => {
        arrPuntuaciones.push(item.puntuacion);
        arrFechas.push(item.fecha);
        //console.log(arrPuntuaciones) // push un array de datos
    });
    new Chartist.Line('.ct-chart', {
        labels: arrFechas,
        series: [
          arrPuntuaciones
        ]
      }, {
        fullWidth: true,
        chartPadding: {
          right: 40
        }
      });





});
document.getElementById("borrarTodo").addEventListener("click", function (event) {
    event.preventDefault();
    let confirmacion = confirm("Estás seguro?")

    if (confirmacion) {

        localStorage.clear();
        alert("Todos los datos han sido borrados");
    }
    
});