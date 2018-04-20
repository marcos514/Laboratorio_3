"use strict";
var Clases;
(function (Clases) {
    var Punto = /** @class */ (function () {
        function Punto(x, y) {
            this._x = x;
            this._y = y;
        }
        Punto.prototype.GetX = function () {
            return this._x;
        };
        Punto.prototype.GetY = function () {
            return this._y;
        };
        Punto.prototype.ToString = function () {
            return "x= " + this._x + " y= " + this._y;
        };
        return Punto;
    }());
    Clases.Punto = Punto;
})(Clases || (Clases = {}));
//# sourceMappingURL=Punto.js.map