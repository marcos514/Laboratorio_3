function validarUsuario():void
{
    let nombre=<HTMLInputElement>document.getElementById("txtUsuario");
    let pass=<HTMLInputElement>document.getElementById("txtPass");
    if(nombre.value!="" && pass.value!="")
    {
        let peticion=new XMLHttpRequest();
        peticion.open("GET","validar.php?nombre="+nombre.value+"&pass="+pass.value,true);
        peticion.send();
        peticion.onreadystatechange = () =>{
            if(peticion.status==200&&peticion.readyState==4)
            {
                let respuesta=peticion.responseText;
                if(respuesta=="OK")
                {
                    (<HTMLBodyElement>document.getElementById("body")).style.backgroundColor="#00ff00";
                }
                else
                {
                    (<HTMLBodyElement>document.getElementById("body")).style.backgroundColor="#FF0000";
                }
            }
        }
    }
}