"use strict";
function Primos() {
    var cantPrimos = 0;
    var noPrimo = true;
    for (var i = 1; cantPrimos <= 100000; i++) {
        noPrimo = true;
        for (var j = 2; j < i; j++) {
            if (i % j == 0) {
                noPrimo = false;
                break;
            }
        }
        if (noPrimo) {
            console.log(i);
            cantPrimos++;
        }
    }
}
Primos();
//# sourceMappingURL=ejer07.js.map