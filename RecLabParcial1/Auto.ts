namespace Clases
{
    export class Auto
    {   
        protected _patente:string;
        protected _marca:string;
        protected _precio:number;
        protected _path:string;

        public constructor(patente:string,marca:string,precio:number,path:string) 
        {
            this._path=path;
            this._marca=marca;
            this._patente=patente;
            this._precio=precio;
        }

        public ToJason():JSON
        {
            let strJson:string=`{"marca":"${this._marca}","precio":${this._precio},"patente":"${this._patente}","path":"${this._path}"}`;
            let objJason:JSON=JSON.parse(strJson);
            return objJason;
        }

        public GetPrecioConIVA():Number
        {
            return this._precio*1.21;
        }




    }

}