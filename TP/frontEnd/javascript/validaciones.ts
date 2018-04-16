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
    let valores=document.getElementsByName("rdoTurno");
    for(let i:number=0;i<valores.length;i++)
    {
        if((<HTMLInputElement>valores[i]).checked)
        {
            return (<HTMLInputElement>valores[i]).value;
        }
    }
    return "";
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
    let comprobador=true;
    if(ValidarCamposVacios((<HTMLInputElement>document.getElementById("txtDni")).value))
    {
        if(!ValidarRangoNumerico((<HTMLInputElement>document.getElementById("txtDni")).valueAsNumber,1000000,55000000))
        {
            alert("El dni no respeta los limites");
            comprobador=false;
        }
    }
    else
    {
        alert("Ingrese Dni");
        comprobador=false;
    }


    if(!ValidarCamposVacios((<HTMLInputElement>document.getElementById("txtApellido")).value))
    {
        alert("Ingresar Apellido");
        comprobador=false;
    }


    if(!ValidarCamposVacios((<HTMLInputElement>document.getElementById("txtNombre")).value))
    {
        alert("Ingresar Nombre");
        comprobador=false;
    }


    if(!ValidarCombo((<HTMLInputElement>document.getElementById("cboSexo")).value,"--"))
    {
        alert("Seleccione su sexo");
        comprobador=false;
    }


    if(ValidarCamposVacios((<HTMLInputElement>document.getElementById("txtLegajo")).value))
    {
        if(!ValidarRangoNumerico((<HTMLInputElement>document.getElementById("txtLegajo")).valueAsNumber,100,550))
        {
            alert("El Legajo no respeta los limites");
            comprobador=false;
        }
    }
    else
    {
        alert("Ingresar el legajo");
        comprobador=false;
    }

    if(ValidarCamposVacios((<HTMLInputElement>document.getElementById("txtSueldo")).value))
    {
        if(!ValidarRangoNumerico((<HTMLInputElement>document.getElementById("txtSueldo")).valueAsNumber,8000,ObtenerSueldoMaximo(ObtenerTurnoSeleccionado())))
        {
            alert("El Sueldo no respeta los limites");
            comprobador=false;
        }
    }
    else
    {
        alert("Ingresar el sueldo");
        comprobador=false;
    }

    if(comprobador)
    {
        (<HTMLFormElement>document.getElementById("frmEmpleado")).submit();
    }
    
}