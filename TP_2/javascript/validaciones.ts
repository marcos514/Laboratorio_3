function ValidarCamposVacios(valor:string):boolean
{
    return !(valor==""||valor==null);
}
function ValidarRangoNumerico(valor:number,min:number,max:number):boolean
{
    return valor<=max&&valor>=min;
}
function ValidarCombo(valor:string,anular:string):boolean
{
    return !(valor==anular);
}

function ObtenerTurnoSeleccionado():string
{
    if((<HTMLInputElement>document.getElementById("tManiana")).checked)
    {
        return "Mañana";
    }
    if((<HTMLInputElement>document.getElementById("tTarde")).checked)
    {
        return "Tarde";
    }
    if((<HTMLInputElement>document.getElementById("tNoche")).checked)
    {
        return "Noche";
    }
    return"";
    /*let valores=document.getElementsByName("rdoTurno");
    for(let i:number=0;i<valores.length;i++)
    {
        if((<HTMLInputElement>valores[i]).checked)
        {
            return <string>valores[i].;
        }
    }
    return "";*/
}

function ObtenerSueldoMaximo(turno:string):number
{
    if(turno=="Mañana")
    {
        return 20000;
    }
    else if(turno=="Tarde")
    {
        return 18500;
    }
    else
    {
        return 25000;
    }
}

function AdministrarValidaciones():void
{

    if(ValidarCamposVacios((<HTMLInputElement>document.getElementById("txtDni")).value))
    {
        if(!ValidarRangoNumerico((<HTMLInputElement>document.getElementById("txtDni")).valueAsNumber,1000000,55000000))
        {
            alert("El dni no respeta los limites");
        }
    }
    else
    {
        alert("Ingrese Dni");
    }


    if(!ValidarCamposVacios((<HTMLInputElement>document.getElementById("txtApellido")).value))
    {
        alert("Ingresar Apellido");
    }


    if(!ValidarCamposVacios((<HTMLInputElement>document.getElementById("txtNombre")).value))
    {
        alert("Ingresar Nombre");
    }


    if(!ValidarCombo((<HTMLInputElement>document.getElementById("cboSexo")).value,"--"))
    {
        alert("Seleccione su sexo");
    }


    if(ValidarCamposVacios((<HTMLInputElement>document.getElementById("txtLegajo")).value))
    {
        if(!ValidarRangoNumerico((<HTMLInputElement>document.getElementById("txtLegajo")).valueAsNumber,100,550))
        {
            alert("El Legajo no respeta los limites");
        }
    }
    else
    {
        alert("Ingresar el legajo");
    }

    if(ValidarCamposVacios((<HTMLInputElement>document.getElementById("txtSueldo")).value))
    {
        if(!ValidarRangoNumerico((<HTMLInputElement>document.getElementById("txtSueldo")).valueAsNumber,8000,ObtenerSueldoMaximo(ObtenerTurnoSeleccionado())))
        {
            alert("El Sueldo no respeta los limites");
        }
    }
    else
    {
        alert("Ingresar el sueldo");
    }



    
    

    

    
    
    

    
    

}