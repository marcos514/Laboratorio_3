"use strict";
/// <reference path="../ajax/Ajax.ts" />
var ajax2 = new Ajax();
ajax2.Post("recibirJson.php", function (mostrar) {
    document.getElementById("Hola").innerHTML = mostrar;
    alert(JSON.parse(mostrar)[0].nombre);
});
//# sourceMappingURL=ejer_05.js.map