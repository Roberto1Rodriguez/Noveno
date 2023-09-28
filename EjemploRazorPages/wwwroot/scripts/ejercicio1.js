//https://integracion.itesrc.net/api/panes

const url ="https://integracion.itesrc.net/api/panes"

var listaProductos;
const botonarea = document.querySelector(".panes div");
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
descargarProductos();