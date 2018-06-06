/// <reference path="node_modules/@types/jquery/index.d.ts" />
/// <reference path="Auto.ts"/>

namespace Enlace
{
    export class Manejador
    {
        public static Agregar()
        {
            let pagina : string = "./BACKEND/administrar.php";
            let archivo : any = (<HTMLInputElement>document.getElementById("foto"));
            let patente:string= (<HTMLInputElement>document.getElementById("txtPatente")).value;
            let strprecio:string=(<HTMLInputElement>document.getElementById("txtPrecio")).value;
            let marca:string=(<HTMLSelectElement>document.getElementById("cboMarca")).value;

            let path:string="fotos/"+patente+".jpg";

            let precio:number=Number(strprecio);

            let auto:Clases.Auto=new Clases.Auto(patente,marca,precio,path);


            let formData:FormData=new FormData();
            formData.append("cadenaJson",JSON.stringify(auto.ToJason()));
            formData.append("caso", "agregar");
            formData.append("foto", archivo.files[0]);


            $.ajax({
                type: 'POST',
                url: pagina,
                dataType:"json",
                data: formData,
                contentType: false,
                processData: false,
            })
            .done(function (params) 
            {
                if(params.TodoOK)
                {
                    console.log("Todo ok");
                    $("#txtPatente").val("");
                    $("#txtPrecio").val("");
                    $("#foto").val("");

                }
                else
                {
                    console.log("Error al subir el archivo");
                }
                
            })
            .fail(function(params){
                console.log(params);
            });
        }

        public static Mostrar()
        {
            let pagina : string = "./BACKEND/administrar.php";
            let formData:FormData=new FormData();
            formData.append("caso", "mostrar");
            $.ajax({
                type: 'POST',
                url: pagina,
                dataType:"json",
                data: formData,
                contentType: false,
                processData: false

            })
            .done(function (params) 
            {
                $("#divTabla").html("");
                for(let i=0;i<params.length;i++)
                {
                    let json:string=JSON.stringify(params[i]);
                    $("#divTabla").append(`<tr><td>${params[i].patente}</td><td>${params[i].marca}</td><td>${params[i].precio}</td><td><img id="imgFoto" src=BACKEND/${params[i].path} width="50px" height="50px" /></td><td><input type='button' onclick='Enlace.Manejador.Eliminar(${json})' value='Eliminar'/><input type='button' onclick='Enlace.Manejador.Modificar("${json}")' value='Modificar'/> </td></tr>`);
                }
                
            })
            .fail(function(params){
                console.log(params);
            });
        }
        

        public static Eliminar(jsonstr:any)
        {
            let pagina : string = "./BACKEND/administrar.php";
            let formData:FormData=new FormData();
            formData.append("cadenaJson",JSON.stringify(jsonstr));
            formData.append("caso", "eliminar");


            $.ajax({
                type: 'POST',
                url: pagina,
                dataType:"json",
                data: formData,
                contentType: false,
                processData: false
            })
            .done(function (params) 
            {
                if(params.TodoOK)
                {
                    console.log("Todo ok");
                }
                else
                {
                    console.log("Error eliminar el archivo");
                }
                
            })
            .fail(function(params){
                console.log(params);
            });


        }

        public static Modificar(jsonstr:any)
        {
            $("#txtPatente").val(jsonstr.patente);
            $("#txtPrecio").val(jsonstr.precio);
            $("#cboMarca").val(jsonstr.marca);
            $("#txtPatente").prop('readOnly', false);
            $("#hdnIdModificacion").val("modificar");
            
        }


        public static CargarMarcas()
        {
            let pagina : string = "./BACKEND/administrar.php";
            let formData:FormData=new FormData();
            formData.append("caso", "marcas");


            $.ajax({
                type: 'POST',
                url: pagina,
                dataType:"json",
                data: formData,
                contentType: false,
                processData: false
            })
            .done(function (params) 
            {
                $("#cboMarca").val("");
                for(let i=0;i<params.length;i++)
                {
                    $("#cboMarca").append( "<option>"+params[i].descripcion+"</option>");
                }
                
            })
            .fail(function(params){
                console.log(params);
            });

        }
            
    
    }






}