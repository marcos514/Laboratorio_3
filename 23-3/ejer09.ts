
function Factorial(num:number):void
{
    var factor=num;
    if(num<0)
    {
        console.log("imposible men");
    }
    else if(num==0)
    {
        console.log(1);
    }
    else
    {
        var factor=num;
        for(var i=1;i<num;i++)
        {
            factor*=i;
        }
        console.log(factor);
    }
}

function Cuadrado(numero:number):number
{
    return numero * numero;
}

function Doble(numero:number):void
{
    if(numero<0)
    {
        console.log(Cuadrado(numero));
    }
    else
    {
        Factorial(numero);
    }
}

Doble(-5);
console.log("-----------------");
Doble(10);