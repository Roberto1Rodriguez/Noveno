//https://integracion.itesrc.net/api/panes

const url ="https://integracion.itesrc.net/api/panes"

var listaProductos,saldo=0;
const botonarea = document.querySelector(".panes div");
const tabla = document.querySelector(".tabla tbody");
const boton = document.querySelector("input[type='button']");
async function descargarProductos()
{
    let response = await fetch(url);

    if (response.ok) {
        listaProductos = await response.json();
        crearBotones();
               
    }

}
function crearBotones()
{
    listaProductos.forEach(x => {
        let btn = document.createElement("BUTTON");
        btn.dataset.id = x.id;
        let img = document.createElement("IMG");
        img.src = x.imagen;
        let txt = document.createTextNode("$" + x.precio.toFixed(2));
        btn.append(img, txt);
        botonarea.append(btn);

    });

}

botonarea.addEventListener("click", function (e) {
    if (e.target.tagName == "BUTTON" || e.target.tagName == "IMG") {
        let btn = e.target.tagName == "BUTTON" ? e.target : e.target.parentElement;
        let id = btn.dataset.id;

        let art = listaProductos.find(x => x.id == id);
        if (art) {
/*            let row = tabla.rows.find(x => x.dataset.id == id);*/
            let row = tabla.querySelector(`[data-id="${id}"]`);
            if (row) {// lo encontro

                let cantidad = parseInt(row.cells[1].textContent) + 1;
                row.cells[1].textContent = cantidad;
                let subtotal = cantidad * art.precio;
                row.cells[3].textContent = "$" + subtotal.toFixed(2);

            }
            else {// no lo encontro
                row = tabla.insertRow();
                row.dataset.id = id;
                row.insertCell().textContent = art.descripcion;
                row.insertCell().textContent = 1;
                row.insertCell().textContent = "$" + art.precio.toFixed(2);
                row.insertCell().textContent = "$" + art.precio.toFixed(2);
            

            }
            saldo += art.precio;

            boton.value = "Cobrar: $" + saldo.toFixed(2);
        }
    }
});

boton.addEventListener("click", () => {
    tabla.innerHTML = null;
    boton.value = "Cobrar: $0.00";
    saldo = 0;
})
descargarProductos();