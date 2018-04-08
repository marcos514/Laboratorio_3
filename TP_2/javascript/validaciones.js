"use strict";
function ValidarCamposVacios(valor) {
    return !(valor == "" || valor == null);
}
function ValidarRangoNumerico(valor, min, max) {
    return valor <= max && valor >= min;
}
function ValidarCombo(valor, anular) {
    return !(valor == anular);
}
function ObtenerTurnoSeleccionado() {
    if (document.getElementById("tManiana").checked) {
        return "Mañana";
    }
    if (document.getElementById("tTarde").checked) {
        return "Tarde";
    }
    if (document.getElementById("tNoche").checked) {
        return "Noche";
    }
    return "";
    /*let valores=document.getElementsByName("rdoTurno");
    for(let i:number=0;i<valores.length;i++)
    {
        if((<HTMLInputElement>valores[i]).checked)
        {
            return <string>valores[i].;
        }
    }
    return "";*/
}
function ObtenerSueldoMaximo(turno) {
    if (turno == "Mañana") {
        return 20000;
    }
    else if (turno == "Tarde") {
        return 18500;
    }
    else {
        return 25000;
    }
}
function AdministrarValidaciones() {
    if (ValidarCamposVacios(document.getElementById("txtDni").value)) {
        if (!ValidarRangoNumerico(document.getElementById("txtDni").valueAsNumber, 1000000, 55000000)) {
            alert("El dni no respeta los limites");
        }
    }
    else {
        alert("Ingrese Dni");
    }
    if (!ValidarCamposVacios(document.getElementById("txtApellido").value)) {
        alert("Ingresar Apellido");
    }
    if (!ValidarCamposVacios(document.getElementById("txtNombre").value)) {
        alert("Ingresar Nombre");
    }
    if (!ValidarCombo(document.getElementById("cboSexo").value, "--")) {
        alert("Seleccione su sexo");
    }
    if (ValidarCamposVacios(document.getElementById("txtLegajo").value)) {
        if (!ValidarRangoNumerico(document.getElementById("txtLegajo").valueAsNumber, 100, 550)) {
            alert("El Legajo no respeta los limites");
        }
    }
    else {
        alert("Ingresar el legajo");
    }
    if (ValidarCamposVacios(document.getElementById("txtSueldo").value)) {
        if (!ValidarRangoNumerico(document.getElementById("txtSueldo").valueAsNumber, 8000, ObtenerSueldoMaximo(ObtenerTurnoSeleccionado()))) {
            alert("El Sueldo no respeta los limites");
        }
    }
    else {
        alert("Ingresar el sueldo");
    }
}
//# sourceMappingURL=validaciones.js.map