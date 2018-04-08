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
Factorial(10);
//# sourceMappingURL=ejer08.js.map