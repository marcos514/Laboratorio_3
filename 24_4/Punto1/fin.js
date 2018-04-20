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
/// <reference path="Rectangulo.ts"/>
var punto1 = new Clases.Punto(0, 0);
var punto3 = new Clases.Punto(10, 10);
var rectangulo = new Clases.Rectangulo(punto1, punto3);
console.log(rectangulo.ToString());
