"use strict";
var Clases2;
(function (Clases2) {
    var FiguraGeometrica = /** @class */ (function () {
        function FiguraGeometrica(color) {
            this._color = color;
        }
        FiguraGeometrica.prototype.GetColor = function () {
            return this._color;
        };
        FiguraGeometrica.prototype.ToString = function () {
            return "Color: " + this.GetColor() + "\n";
        };
        return FiguraGeometrica;
    }());
})(Clases2 || (Clases2 = {}));
//# sourceMappingURL=FigurasAbstractas.js.map