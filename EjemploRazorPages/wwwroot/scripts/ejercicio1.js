//https://integracion.itesrc.net/api/panes

const url ="https://integracion.itesrc.net/api/panes"

var listaProductos;
async function descargarProductos()
{
    let response = await fetch(url);

    if (response.ok) {
        listaProductos = await response.json();
               
    }

}
descargarProductos();