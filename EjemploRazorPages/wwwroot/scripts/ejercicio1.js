

const url = "https://integracion.itesrc.net/api/panes";

var listProductos;
async function descargarpanes() {

    let response = await fetch(url);

    if (response.status == 200) {

        listProductos = await response.json();
      
     
    }

}

descargarpanes();