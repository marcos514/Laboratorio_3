"use strict";
function Factorial(num) {
    var factor = num;
    if (num < 0) {
        console.log("imposible men");
    }
    else if (num == 0) {
        console.log(1);
    }
    else {
        var factor = num;
        for (var i = 1; i < num; i++) {
            factor *= i;
        }
        console.log(factor);
    }
}
function Cuadrado(numero) {
    return numero * numero;
}
function Doble(numero) {
    if (numero < 0) {
        console.log(Cuadrado(numero));
    }
    else {
        Factorial(numero);
    }
}
Doble(-5);
console.log("-----------------");
Doble(10);
//# sourceMappingURL=ejer09.js.map