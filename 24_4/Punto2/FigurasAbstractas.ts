namespace Clases2
{
    abstract class FiguraGeometrica
{
    protected _color:string;
    protected _perimetro:number;
    protected _superficie:number;

    public abstract Dibujar():string;
    protected abstract CalcularDatos():void;

    public constructor(color:string)
    {
        this._color=color;
    }

    public GetColor():string
    {
        return this._color;
    }

    public ToString():string
    {
        return "Color: "+this.GetColor()+"\n";
    }

}    
}
