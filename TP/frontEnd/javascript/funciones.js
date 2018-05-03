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
    var valores = document.getElementsByName("rdoTurno");
    for (var i = 0; i < valores.length; i++) {
        if (valores[i].checked) {
            return valores[i].value;
        }
    }
    return "";
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
    var comprobador = true;
    if (ValidarCamposVacios(document.getElementById("txtDni").value)) {
        if (!ValidarRangoNumerico(document.getElementById("txtDni").valueAsNumber, 1000000, 55000000)) {
            document.getElementById("spnDni").style.display = "block";
            comprobador = false;
        }
    }
    else {
        document.getElementById("spnDni").style.display = "block";
        comprobador = false;
    }
    if (!ValidarCamposVacios(document.getElementById("txtApellido").value)) {
        document.getElementById("spnApellido").style.display = "block";
        comprobador = false;
    }
    if (!ValidarCamposVacios(document.getElementById("txtNombre").value)) {
        document.getElementById("spnNombre").style.display = "block";
        comprobador = false;
    }
    if (!ValidarCombo(document.getElementById("cboSexo").value, "--")) {
        document.getElementById("spnSexo").style.display = "block";
        comprobador = false;
    }
    if (ValidarCamposVacios(document.getElementById("txtLegajo").value)) {
        if (!ValidarRangoNumerico(document.getElementById("txtLegajo").valueAsNumber, 100, 550)) {
            document.getElementById("spnLegajo").style.display = "block";
            comprobador = false;
        }
    }
    else {
        document.getElementById("spnLegajo").style.display = "block";
        comprobador = false;
    }
    if (ValidarCamposVacios(document.getElementById("txtSueldo").value)) {
        if (!ValidarRangoNumerico(document.getElementById("txtSueldo").valueAsNumber, 8000, ObtenerSueldoMaximo(ObtenerTurnoSeleccionado()))) {
            document.getElementById("spnSueldo").style.display = "block";
            comprobador = false;
        }
    }
    else {
        document.getElementById("spnSueldo").style.display = "block";
        comprobador = false;
    }
    if (comprobador) {
        document.getElementById("frmEmpleado").submit();
    }
}
function AdministrarValidacionesLogin() {
    var comprobador = true;
    if (ValidarCamposVacios(document.getElementById("txtDni").value)) {
        if (!ValidarRangoNumerico(document.getElementById("txtDni").valueAsNumber, 1000000, 55000000)) {
            document.getElementById("spnDni").style.display = "block";
            comprobador = false;
        }
    }
    else {
        document.getElementById("spnDni").style.display = "block";
        comprobador = false;
    }
    if (!ValidarCamposVacios(document.getElementById("txtApellido").value)) {
        document.getElementById("spnApellido").style.display = "block";
        comprobador = false;
    }
    if (comprobador) {
        document.getElementById("frmLogin").submit();
    }
}
