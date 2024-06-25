// Esta función se ejecuta cuando la página se carga
window.onload = function() {
    let Jacinto = {
        nom: "Jacinto",
        cant: 10,
        pre: 13000 
    };
    let Tulipan = {
        nom: "Tulipan",
        cant: 30  ,
        pre: 10000 
    };
    let Fresia = {
        nom: "Fresia",
        cant: 24  ,
        pre: 15000 
    };
    let Ixia = {
        nom: "Ixia",
        cant: 4  ,
        pre: 30000 
    };
    let Anemona = {
        nom: "Anemona",
        cant: 0  ,
        pre: 10000 
    };
    let Babiana = {
        nom: "Babiana",
        cant: 12  ,
        pre: 20000 
    };
    let Sparaxis = {
        nom: "Sparaxis",
        cant: 17   ,
        pre: 22000 
    };
    InsertarDatos(Jacinto);
    InsertarDatos(Tulipan);
    InsertarDatos(Fresia);
    InsertarDatos(Ixia);
    InsertarDatos(Anemona);
    InsertarDatos(Babiana);
    InsertarDatos(Sparaxis);

};



var Fila = null;

function onSubmit() {
    let DataForm = Leer();
    if (Fila == null) {
        InsertarDatos(DataForm);
    } else {
        Actualizar(DataForm);
        Vaciar();
    }
}

function Leer() {
    let DataForm = {};
    DataForm["nom"] = document.getElementById("nom").value;
    DataForm["cant"] = document.getElementById("cant").value;
    let precioValue = document.getElementById("pre").value;
    // Eliminar el símbolo "$" y los puntos antes de asignar el valor al objeto DataForm
    DataForm["pre"] = parseFloat(precioValue.replace(/\$|,/g, ''));
    return DataForm;
}

function InsertarDatos(data) {
    let table = document.getElementById("tabla").getElementsByTagName('tbody')[0];
    let Fila = table.insertRow(table.length);
    columna1 = Fila.insertCell(0).innerHTML = data.nom;
    columna2 = Fila.insertCell(1).innerHTML = data.cant;
    // Formatear el precio con puntos como separador de miles
    columna3 = Fila.insertCell(2).innerHTML = '$' + numberWithCommas(data.pre);
    columna3 = Fila.insertCell(3).innerHTML = `<input class="submit" type="button" onClick="Editarr(this)" value="Editar" >
                                            <input class="submit" type="button" onClick="Borrarr(this)" value="Borrar" >`;
    document.getElementById("nom").focus();
    Vaciar();
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function Vaciar() {
    document.getElementById("nom").value = "";
    document.getElementById("cant").value = "";
    document.getElementById("pre").value = "";
    Fila = null;
}

function Editarr(td) {
    Fila = td.parentElement.parentElement;
    document.getElementById("nom").value = Fila.cells[0].innerHTML;
    document.getElementById("cant").value = Fila.cells[1].innerHTML;
    // Eliminar el símbolo "$" y los puntos antes de asignar el valor del precio al campo de precio
    document.getElementById("pre").value = parseFloat(Fila.cells[2].innerHTML.replace(/\$|,/g, ''));
}

function Actualizar(DataForm) {
    Fila.cells[0].innerHTML = DataForm.nom;
    Fila.cells[1].innerHTML = DataForm.cant;
    // Formatear el precio con puntos como separador de miles
    Fila.cells[2].innerHTML = '$' + numberWithCommas(DataForm.pre);
    document.getElementById("nom").focus();
}

function Borrarr(td) {
    if (confirm('¿Seguro de borrar este registro?')) {
        row = td.parentElement.parentElement;
        document.getElementById("tabla").deleteRow(row.rowIndex);
        Vaciar();
    }
}