
const pregunta = document.querySelector("#question");
const escala = document.querySelector(".escala");

const boton = document.querySelector("#boton");

const loader = document.querySelector("#loader");
var listaPreguntas = null; 
var baseUrl = "https://integracion.itesrc.net/api/encuesta";
pregunta.hidden = true;
escala.style.display = "none";
boton.hidden = true;
var actual = null;
var seleccionado = null;
var respuestas = [] ;

async function descargarEncuesta() {

    let response = await fetch(baseUrl);

    if (response.ok) {
        listaPreguntas = await response.json();
        actual = 0;
        mostrarPregunta();
        loader.hidden = true;
        pregunta.hidden = false;
        boton.hidden = false;
        escala.style.display = null;
    } else {
        console.log("error al cargar");
    }

}

function mostrarPregunta() {
    let obj = listaPreguntas[actual];
    pregunta.textContent = obj.pregunta;
    if (seleccionado) { seleccionado.classList.remove("selected"); }
    seleccionado = null;

}

descargarEncuesta();

escala.addEventListener("click", function (e) {
    if (e.target.tagName == "IMG") {

        if (seleccionado) {

            seleccionado.classList.remove("selected");
        }

        e.target.classList.add("selected");
            seleccionado = e.target;
        
       

    }
})

boton.addEventListener("click", function () {



    if (seleccionado) {

        let resp = { idPregunta: listaPreguntas[actual].id, valor: seleccionado.dataset.valor };
        respuestas.push(resp);
        //verificar si quedan preguntas
        if (actual < listaPreguntas.length - 1) {

            actual++;
            mostrarPregunta();
            if (actual == listaPreguntas.length - 1) { boton.value = "Terminar" }
        }
        else {

            pregunta.hidden = true;
            escala.style.display = "none";
            boton.hidden = true;
            loader.hidden = false;

            let response = fetch();
        }
       
       
    }
    else {
        alert("Debe seleccionar una pregunta para continuar");
    }
})




