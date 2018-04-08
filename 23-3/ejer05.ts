function MostrarNombreApellido(nombre:string,apellido:string):void
{
    apellido=apellido.toUpperCase();
    
    nombre=nombre.charAt(0).toUpperCase()+nombre.substr(1,nombre.length-1).toLowerCase();
    console.log(`${apellido},${nombre}`);
}

MostrarNombreApellido("mARCOS","Rey");