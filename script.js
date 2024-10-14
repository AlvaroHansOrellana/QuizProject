let preguntas = []; //array pregutas obtenidas api
let preguntaActual = 0; //índice de preguntas
let puntuacion = 0; //se guarda la puntutación de las preguntas (pocentaje)


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

