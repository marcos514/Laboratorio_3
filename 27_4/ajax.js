"use strict";
function validarUsuario() {
    var nombre = document.getElementById("txtUsuario");
    var pass = document.getElementById("txtPass");
    if (nombre.value != "" && pass.value != "") {
        var peticion_1 = new XMLHttpRequest();
        peticion_1.open("GET", "validar.php?nombre=" + nombre.value + "&pass=" + pass.value, true);
        peticion_1.send();
        peticion_1.onreadystatechange = function () {
            if (peticion_1.status == 200 && peticion_1.readyState == 4) {
                var respuesta = peticion_1.responseText;
                if (respuesta == "OK") {
                    document.getElementById("body").style.backgroundColor = "#00ff00";
                }
                else {
                    document.getElementById("body").style.backgroundColor = "#FF0000";
                }
            }
        };
    }
}
//# sourceMappingURL=ajax.js.map