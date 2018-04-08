"use strict";
function Mostrar(repeticiones, frase) {
    if (repeticiones === void 0) { repeticiones = 0; }
    if (frase == undefined) {
        console.log(repeticiones * -1);
    }
    else if (repeticiones >= 0) {
        for (var i = 0; i < repeticiones; i++) {
            console.log(frase + "\n");
        }
    }
    else
        console.log("Aguaaaaantaaaaaaa");
}
var mostrador = Mostrar;
mostrador(-10, "s");
//# sourceMappingURL=ejer03.js.map