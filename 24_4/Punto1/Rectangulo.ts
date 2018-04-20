/// <reference path="Punto.ts"/>
namespace Clases
{
    export class Rectangulo
    {
        private _area:number;
        private _ladoDos:number;
        private _ladoUno:number;
        private _perimetro:number;
        private _vertice1:Punto;
        private _vertice2:Punto;
        private _vertice3:Punto;
        private _vertice4:Punto;

        public constructor(punto1:Punto,punto3:Punto)
        {
            this._vertice1=punto1;
            this._vertice3=punto3;
            this._vertice2=new Punto(punto1.GetX(),punto3.GetY());
            this._vertice4=new Punto(punto3.GetX(),punto1.GetY());
            this._ladoUno=punto3.GetY()-punto1.GetY();
            this._ladoDos=punto3.GetX()-punto1.GetX();
            this._area=this._ladoDos*this._ladoUno;
            this._perimetro=this._ladoUno*2+this._ladoUno*2;
        }

        public GetArea():number 
        {
            return this._area;
        }
        public GetPerimetro():number 
        {
            return this._perimetro;
        }
        public ToString():string
        {
            return "Perimetro: "+this.GetPerimetro()+"\nArea: "+this._area+"\nAltura: "+this._ladoUno+"\nBase: "+this._ladoDos+"\n"+this._vertice1.ToString()+"\n"+this._vertice2.ToString()+"\n"+this._vertice3.ToString()+"\n"+this._vertice4.ToString();
        }
    }
}