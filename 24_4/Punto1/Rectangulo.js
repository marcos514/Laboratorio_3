"use strict";
/// <reference path="Punto.ts"/>
var Clases;
(function (Clases) {
    var Rectangulo = /** @class */ (function () {
        function Rectangulo(punto1, punto3) {
            this._vertice1 = punto1;
            this._vertice3 = punto3;
            this._vertice2 = new Clases.Punto(punto1.GetX(), punto3.GetY());
            this._vertice4 = new Clases.Punto(punto3.GetX(), punto1.GetY());
            this._ladoUno = punto3.GetY() - punto1.GetY();
            this._ladoDos = punto3.GetX() - punto1.GetX();
            this._area = this._ladoDos * this._ladoUno;
            this._perimetro = this._ladoUno * 2 + this._ladoUno * 2;
        }
        Rectangulo.prototype.GetArea = function () {
            return this._area;
        };
        Rectangulo.prototype.GetPerimetro = function () {
            return this._perimetro;
        };
        Rectangulo.prototype.ToString = function () {
            return "Perimetro: " + this.GetPerimetro() + "\nArea: " + this._area + "\nAltura: " + this._ladoUno + "\nBase: " + this._ladoDos + "\n" + this._vertice1.ToString() + "\n" + this._vertice2.ToString() + "\n" + this._vertice3.ToString() + "\n" + this._vertice4.ToString();
        };
        return Rectangulo;
    }());
    Clases.Rectangulo = Rectangulo;
})(Clases || (Clases = {}));
//# sourceMappingURL=Rectangulo.js.map