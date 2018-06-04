/// <reference path="node_modules/@types/jquery/index.d.ts" />
/// <reference path="Auto.ts"/>
/// <reference path="ajax/Ajax.ts"/>

namespace Enlace
{
    export class Manejadora
    {
        public static Agregar()
        {
            let pagina : string = "./BACKEND/administrar.php";
            
            let archivo : any = (<HTMLInputElement>document.getElementById("foto"));
            let patente:string= (<HTMLInputElement>document.getElementById("txtPatente")).value;
            let strprecio:string=(<HTMLInputElement>document.getElementById("txtPrecio")).value;
            let marca:string=(<HTMLSelectElement>document.getElementById("cboMarca")).value;

            let path:string="fotos/"+Date.now()+".jpg";

            let precio:number=Number(strprecio);

            let auto:Clases.Auto=new Clases.Auto(patente,marca,precio,path);

            let strAuto:string=JSON.stringify(auto.ToJason());

            let formData : FormData = new FormData();
            //formData.append("foto",archivo.files[0]);
            formData.append("cadenaJson", strAuto);
            
            formData.append("caso", "agregar");

            // es attr si es 1.9 o menor
            //$("#txtPatente").prop('readOnly', false);
            console.log(strAuto);


            $.ajax({
                type: 'POST',
                url: pagina,
                dataType:"json",
                data: formData,
                contentType: false,
                processData: false,
            })
            .done(function (objJson) {
                    if(objJson.TodoOK)
                    {
                        console.log("ok");
                    }
                    else
                    {
                        console.log("no ok");

                    }
                    (<HTMLInputElement>document.getElementById("txtPatente")).value="";
                    (<HTMLInputElement>document.getElementById("txtPrecio")).value="";
                    (<HTMLInputElement>document.getElementById("txtPatente")).readOnly=false;
                    (<HTMLInputElement>document.getElementById("hdnIdModificacion")).value=""; 
            })
            .fail(function(aaa){
                console.log(JSON.stringify(aaa));
                
            });











            /*
            
           
            
            let ajax:XMLHttpRequest=new XMLHttpRequest();
            ajax.open("POST","BACKEND/administrar.php",true);
            ajax.setRequestHeader("enctype,content-type", "multipart/form-data,application/x-www-form-urlencoded");
            let foto : any = (<HTMLInputElement> document.getElementById("foto"));
            //INSTANCIO OBJETO FORMDATA
            let form : FormData = new FormData();
            //PARAMETRO RECUPERADO POR $_FILES
            form.append('foto', foto.files[0]);


            
            if((<HTMLInputElement>document.getElementById("hdnIdModificacion")).value=="modificar")
            {
                form.append('caso', "modificar");
                form.append('cadenaJson', strAuto);
                ajax.send(form);
            }
            else
            {
                form.append('op', "agregar");
                form.append('cadenaJson', strAuto);
                ajax.send(form);
            }
            (<HTMLInputElement>document.getElementById("txtPatente")).readOnly=false;
            
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
            };*/
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
                    console.log(ajax.responseText);
                    let arrayJSON:any=JSON.parse(ajax.responseText);
                    let fila:string="<table>";

                    for(let i=0;i<arrayJSON.length;i++)
                    {
                        let json:string=JSON.stringify(arrayJSON[i]);
                        fila+=`<tr><td>${arrayJSON[i].patente}</td><td>${arrayJSON[i].marca}</td><td>${arrayJSON[i].precio}</td><td><img id="imgFoto" src=${arrayJSON[i].path} width="50px" height="50px" /></td><td><input type='button' onclick='Enlace.Manejadora.Eliminar(${json})' value='Eliminar'/><input type='button' onclick='Enlace.Manejadora.Modificar(${json})' value='Modificar'/> </td></tr>`;
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
                        Manejadora.Mostrar();
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
            let ajax:XMLHttpRequest=new XMLHttpRequest();
            ajax.open("POST","BACKEND/administrar.php",true);
            ajax.setRequestHeader("content-type","application/x-www-form-urlencoded");

            ajax.send("caso=marcas");
            ajax.onreadystatechange=()=>{
                if(ajax.readyState==4 && ajax.status==200)
                {
                    let obj:any=JSON.parse(ajax.responseText);
                    for(let i=0;i<obj.length;i++)
                    {
                        (<HTMLSelectElement>document.getElementById("cboMarca")).innerHTML+= "<option>"+obj[i].descripcion+"</option>";
                    }
                }
            }
        }

        public static FiltrarMarca()
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
                    let marcaSelected:any=(<HTMLSelectElement>document.getElementById("cboMarca")).value;

                    for(let i=0;i<arrayJSON.length;i++)
                    {
                        if(arrayJSON[i].marca==marcaSelected)
                        {
                            let json:string=JSON.stringify(arrayJSON[i]);
                            fila+=`<tr><td>${arrayJSON[i].patente}</td><td>${arrayJSON[i].marca}</td><td>${arrayJSON[i].precio}</td><td><img id="imgFoto" src=${arrayJSON[i].path} width="50px" height="50px" /></td><td><input type='button' onclick='Enlace.Manejadora.Eliminar(${json})' value='Eliminar'/><input type='button' onclick='Enlace.Manejadora.Modificar(${json})' value='Modificar'/> </td></tr>`;
                        }
                        
                    }
                    (<HTMLDivElement>document.getElementById("divTabla")).innerHTML=fila+"</table>";
                    
                }
            }
        }




















        /*
        public static Agregar()
        {
            let patente:string=(<HTMLInputElement>document.getElementById("txtPatente")).value;
            let strprecio:string=(<HTMLInputElement>document.getElementById("txtPrecio")).value;
            let marca:string=(<HTMLSelectElement>document.getElementById("cboMarca")).value;
            let path:string=marca+patente+".jpg";
            let precio:number=Number(strprecio);
            let auto:Clases.Auto=new Clases.Auto(patente,marca,precio,path);
            let strAuto:string=JSON.stringify(auto.ToJason());
            let ajax:XMLHttpRequest=new XMLHttpRequest();
            ajax.open("POST","BACKEND/administrar.php",true);
            ajax.setRequestHeader("enctype,content-type", "multipart/form-data,application/x-www-form-urlencoded");
            let foto : any = (<HTMLInputElement> document.getElementById("foto"));
            //INSTANCIO OBJETO FORMDATA
            let form : FormData = new FormData();
            //PARAMETRO RECUPERADO POR $_FILES
            form.append('foto', foto.files[0]);


            
            if((<HTMLInputElement>document.getElementById("hdnIdModificacion")).value=="modificar")
            {
                form.append('caso', "modificar");
                form.append('cadenaJson', strAuto);
                ajax.send(form);
            }
            else
            {
                form.append('op', "agregar");
                form.append('cadenaJson', strAuto);
                ajax.send(form);
            }
            (<HTMLInputElement>document.getElementById("txtPatente")).readOnly=false;
            
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
                    console.log(ajax.responseText);
                    let arrayJSON:any=JSON.parse(ajax.responseText);
                    let fila:string="<table>";

                    for(let i=0;i<arrayJSON.length;i++)
                    {
                        let json:string=JSON.stringify(arrayJSON[i]);
                        fila+=`<tr><td>${arrayJSON[i].patente}</td><td>${arrayJSON[i].marca}</td><td>${arrayJSON[i].precio}</td><td><img id="imgFoto" src=${arrayJSON[i].path} width="50px" height="50px" /></td><td><input type='button' onclick='Enlace.Manejadora.Eliminar(${json})' value='Eliminar'/><input type='button' onclick='Enlace.Manejadora.Modificar(${json})' value='Modificar'/> </td></tr>`;
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
                        Manejadora.Mostrar();
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
            let ajax:XMLHttpRequest=new XMLHttpRequest();
            ajax.open("POST","BACKEND/administrar.php",true);
            ajax.setRequestHeader("content-type","application/x-www-form-urlencoded");

            ajax.send("caso=marcas");
            ajax.onreadystatechange=()=>{
                if(ajax.readyState==4 && ajax.status==200)
                {
                    let obj:any=JSON.parse(ajax.responseText);
                    for(let i=0;i<obj.length;i++)
                    {
                        (<HTMLSelectElement>document.getElementById("cboMarca")).innerHTML+= "<option>"+obj[i].descripcion+"</option>";
                    }
                }
            }
        }

        public static FiltrarMarca()
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
                    let marcaSelected:any=(<HTMLSelectElement>document.getElementById("cboMarca")).value;

                    for(let i=0;i<arrayJSON.length;i++)
                    {
                        if(arrayJSON[i].marca==marcaSelected)
                        {
                            let json:string=JSON.stringify(arrayJSON[i]);
                            fila+=`<tr><td>${arrayJSON[i].patente}</td><td>${arrayJSON[i].marca}</td><td>${arrayJSON[i].precio}</td><td><img id="imgFoto" src=${arrayJSON[i].path} width="50px" height="50px" /></td><td><input type='button' onclick='Enlace.Manejadora.Eliminar(${json})' value='Eliminar'/><input type='button' onclick='Enlace.Manejadora.Modificar(${json})' value='Modificar'/> </td></tr>`;
                        }
                        
                    }
                    (<HTMLDivElement>document.getElementById("divTabla")).innerHTML=fila+"</table>";
                    
                }
            }
        }*/
    }

   
}