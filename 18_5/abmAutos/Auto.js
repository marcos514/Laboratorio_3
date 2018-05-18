/// <reference path="ITributable.ts"/>
var Clases;
(function (Clases) {
    var Auto = /** @class */ (function () {
        function Auto(patente, marca, precio) {
            this._marca = marca;
            this._patente = patente;
            this._precio = precio;
        }
        Auto.prototype.ToJason = function () {
            var strJson = "{\"marca\":\"" + this._marca + "\",\"precio\":" + this._precio + ",\"patente\":\"" + this._patente + "\"}";
            var objJason = JSON.parse(strJson);
            return objJason;
        };
        Auto.prototype.GetPrecioConIVA = function () {
            return this._precio * 1.21;
        };
        return Auto;
    }());
    Clases.Auto = Auto;
})(Clases || (Clases = {}));
