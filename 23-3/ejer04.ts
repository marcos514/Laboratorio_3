function Numero(numero:number):void
{
    if(numero%2==0)
    console.log(`El numero es ${numero} y es par`);
    else
    console.log(`El numero es ${numero} y es impar`);
}


var num:Function=Numero;
num(6);