/// <reference path="Auto.ts"/>
/// <reference path="ajax/Ajax.ts"/>

namespace Enlace
{
    export class Manejadora
    {
        public static Agregar()
        {
            let patente:string=(<HTMLInputElement>document.getElementById("txtPatente")).value;
            let strprecio:string=(<HTMLInputElement>document.getElementById("txtPrecio")).value;
            let marca:string=(<HTMLSelectElement>document.getElementById("cboMarca")).value;
            let precio:number=Number(strprecio);
            let auto:Clases.Auto=new Clases.Auto(patente,marca,precio);
            let strAuto:string=JSON.stringify(auto.ToJason());
            let ajax:XMLHttpRequest=new XMLHttpRequest();
            ajax.open("POST","BACKEND/administrar.php",true);
            ajax.setRequestHeader("content-type","application/x-www-form-urlencoded");
            if((<HTMLInputElement>document.getElementById("hdnIdModificacion")).value=="modificar")
            {
                ajax.send("caso=modificar&cadenaJson="+strAuto);
                
                (<HTMLInputElement>document.getElementById("txtPatente")).readOnly=false;
            }
            else
            {
                ajax.send("caso=agregar&cadenaJson="+strAuto);
            }

            
            
            
            ajax.onreadystatechange=()=>{
                if(ajax.readyState==4 && ajax.status==200)
                {
                    let obj:any=JSON.parse(ajax.responseText);
                    if(obj.TodoOK)
                    {
                        console.log("ok");
                    }
                    else
                    {
                        console.log("no ok");

                    }
                    (<HTMLInputElement>document.getElementById("txtPatente")).value="";
                    (<HTMLInputElement>document.getElementById("txtPrecio")).value="";
                    (<HTMLSelectElement>document.getElementById("cboMarca")).value="";
                    (<HTMLInputElement>document.getElementById("txtPatente")).readOnly=false;
                    (<HTMLInputElement>document.getElementById("hdnIdModificacion")).value="";
                    
                    
                }
            };
        }
        public static Mostrar()
        {
            let ajax:XMLHttpRequest=new XMLHttpRequest();
            ajax.open("POST","BACKEND/administrar.php",true);
            ajax.setRequestHeader("content-type","application/x-www-form-urlencoded");
            ajax.send("caso=mostrar");
            ajax.onreadystatechange=()=>{
                if(ajax.readyState==4 && ajax.status==200)
                {
                    let arrayJSON:any=JSON.parse(ajax.responseText);
                    let fila:string="<table>";

                    for(let i=0;i<arrayJSON.length;i++)
                    {
                        let json:string=JSON.stringify(arrayJSON[i]);
                        fila+=`<tr><td>${arrayJSON[i].patente}</td><td>${arrayJSON[i].marca}</td><td>${arrayJSON[i].precio}</td><td><input type='button' onclick='Enlace.Manejadora.Eliminar(${json})' value='Eliminar'/><input type='button' onclick='Enlace.Manejadora.Modificar(${json})' value='Modificar'/> </td></tr>`;
                    }
                    (<HTMLDivElement>document.getElementById("divTabla")).innerHTML=fila+"</table>";
                    
                }
            }
        }
        
        public static Eliminar(jsonstr:string )
        {
            let ajax:XMLHttpRequest=new XMLHttpRequest();
            ajax.open("POST","BACKEND/administrar.php",true);
            ajax.setRequestHeader("content-type","application/x-www-form-urlencoded");

            ajax.send("caso=eliminar&cadenaJson="+JSON.stringify(jsonstr));
            ajax.onreadystatechange=()=>{
                if(ajax.readyState==4 && ajax.status==200)
                {
                    let obj:any=JSON.parse(ajax.responseText);
                    if(obj.TodoOK)
                    {
                        console.log("ok");
                    }
                    else
                    {
                        console.log("no ok");

                    }
                    
                    
                }}
        }
        public static Modificar(jsonstr:any)
        {
            (<HTMLInputElement>document.getElementById("txtPatente")).value=jsonstr.patente;
            (<HTMLInputElement>document.getElementById("txtPrecio")).value=jsonstr.precio;
            (<HTMLSelectElement>document.getElementById("cboMarca")).value=jsonstr.marca;
            (<HTMLInputElement>document.getElementById("txtPatente")).readOnly=true;
            (<HTMLInputElement>document.getElementById("hdnIdModificacion")).value="modificar";
            
        }
        public static CargarMarcas()
        {

        }
    }

   
}