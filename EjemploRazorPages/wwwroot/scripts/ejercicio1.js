

const url = "https://integracion.itesrc.net/api/panes";

var listProductos;
var saldo = 0;

const tabla = document.querySelector(".tabla tbody");
const boton = document.querySelector("input[type='button']");
const botonera = document.querySelector(".panes div");

async function descargarpanes() {

    let response = await fetch(url);

    if (response.ok) {

        listProductos = await response.json();
        crearBotones();
     
    }

}

function crearBotones() {
    listProductos.forEach(x => {
        let btn = document.createElement("BUTTON");
        btn.dataset.id = x.id;
        let img = document.createElement("IMG");
        img.src = x.imagen;
        let txt = document.createTextNode("$" + x.precio.toFixed(2));

        btn.append(img, txt);
        botonera.append(btn);
    

    });
}
botonera.addEventListener("click", function (e) {
    let item = e.target.closest("button");
    let id
    if (item) {
         id = item.dataset.id;
       
    }

    let pan = listProductos.find(x => x.id == id);

    if (pan) {

      /*  let exist = tabla.rows.find(x => x.dataset.id == pan.id);*/

         let row = tabla.querySelector(`[data-id="${id}"]`);

        if (row) {
        
            let cantidad = row.cells[1].textContent;

            row.cells[1].textContent = parseInt(cantidad) + 1;

            let subtotal = cantidad * pan.precio;
            row.cells[3].textContent = "$" + subtotal.toFixed(2);

           


          
        }
        else {

            row = tabla.insertRow();
            row.dataset.id = id;
            row.insertCell().textContent = pan.descripcion;
            row.insertCell().textContent = 1;
            row.insertCell().textContent = "$ " + pan.precio.toFixed(2);
            row.insertCell().textContent = "$ " + pan.precio.toFixed(2);
        
        }

        saldo += pan.precio;
        boton.value = "Cobrar: $" + saldo.toFixed(2);

    }

})
boton.addEventListener("click", () => {

    tabla.innerHTML = null;
    boton.value = "Cobrar:$0.00";
    saldo = 0;

});
descargarpanes();