function Mostrar(repeticiones:number=0,frase?:string):void
{
    if(frase==undefined)
    {
        console.log(repeticiones*-1);
    }
    else if(repeticiones>=0)
    {
        for(var i=0;i<repeticiones;i++)
        {
            console.log(`${frase}\n`);
        }
    }
    else 
    console.log("Aguaaaaantaaaaaaa");
    
}

var mostrador : Function =Mostrar;

mostrador(-10,"s");
