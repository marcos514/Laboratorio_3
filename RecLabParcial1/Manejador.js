var Clases;
(function (Clases) {
    var Auto = /** @class */ (function () {
        function Auto(patente, marca, precio, path) {
            this._path = path;
            this._marca = marca;
            this._patente = patente;
            this._precio = precio;
        }
        Auto.prototype.ToJason = function () {
            var strJson = "{\"marca\":\"" + this._marca + "\",\"precio\":" + this._precio + ",\"patente\":\"" + this._patente + "\",\"path\":\"" + this._path + "\"}";
            var objJason = JSON.parse(strJson);
            return objJason;
        };
        Auto.prototype.GetPrecioConIVA = function () {
            return this._precio * 1.21;
        };
        return Auto;
    }());
    Clases.Auto = Auto;
})(Clases || (Clases = {}));
/// <reference path="node_modules/@types/jquery/index.d.ts" />
/// <reference path="Auto.ts"/>
var Enlace;
(function (Enlace) {
    var Manejador = /** @class */ (function () {
        function Manejador() {
        }
        Manejador.Agregar = function () {
            var pagina = "./BACKEND/administrar.php";
            var archivo = document.getElementById("foto");
            var patente = document.getElementById("txtPatente").value;
            var strprecio = document.getElementById("txtPrecio").value;
            var marca = document.getElementById("cboMarca").value;
            var path = "fotos/" + patente + ".jpg";
            var precio = Number(strprecio);
            var auto = new Clases.Auto(patente, marca, precio, path);
            var formData = new FormData();
            formData.append("cadenaJson", JSON.stringify(auto.ToJason()));
            if ($("#hdnIdModificacion").val() == "modificar") {
                formData.append("caso", "modificar");
            }
            else {
                formData.append("caso", "agregar");
            }
            formData.append("foto", archivo.files[0]);
            $.ajax({
                type: 'POST',
                url: pagina,
                dataType: "json",
                data: formData,
                contentType: false,
                processData: false
            })
                .done(function (params) {
                if (params.TodoOK) {
                    console.log("Todo ok");
                    $("#txtPatente").val("");
                    $("#txtPrecio").val("");
                    $("#foto").val("");
                    $("#hdnIdModificacion").val("");
                    $("#divImg").empty();
                }
                else {
                    console.log("Error al subir el archivo");
                }
            })
                .fail(function (params) {
                console.log(params);
            });
        };
        Manejador.Mostrar = function () {
            var pagina = "./BACKEND/administrar.php";
            var formData = new FormData();
            formData.append("caso", "mostrar");
            $.ajax({
                type: 'POST',
                url: pagina,
                dataType: "json",
                data: formData,
                contentType: false,
                processData: false
            })
                .done(function (params) {
                $("#divTabla").html("");
                for (var i = 0; i < params.length; i++) {
                    var json = JSON.stringify(params[i]);
                    $("#divTabla").append("<tr><td colspan='2'>" + params[i].patente + "</td><td colspan='2'>" + params[i].marca + "</td><td colspan='2'>" + params[i].precio + "</td><td colspan='2'><img id=\"imgFoto\" src=BACKEND/" + params[i].path + " width=\"50px\" height=\"50px\" /></td><td><input type='button' onclick='Enlace.Manejador.Eliminar(" + json + ")' value='Eliminar'/><input type='button' onclick='Enlace.Manejador.Modificar(\"" + json + "\")' value='Modificar'/> </td></tr>");
                }
            })
                .fail(function (params) {
                console.log(params);
            });
        };
        Manejador.FiltrarMarca = function () {
            var pagina = "./BACKEND/administrar.php";
            var formData = new FormData();
            formData.append("caso", "mostrar");
            $.ajax({
                type: 'POST',
                url: pagina,
                dataType: "json",
                data: formData,
                contentType: false,
                processData: false
            })
                .done(function (params) {
                $("#divTabla").html("");
                for (var i = 0; i < params.length; i++) {
                    if (params[i].marca == $("#cboMarca").val()) {
                        var json = JSON.stringify(params[i]);
                        $("#divTabla").append("<tr><td>" + params[i].patente + "</td><td colspan='2'>" + params[i].marca + "</td><td colspan='2'>" + params[i].precio + "</td><td colspan='2'><img id=\"imgFoto\" src=BACKEND/" + params[i].path + " width=\"50px\" height=\"50px\" /></td><td><input type='button' onclick='Enlace.Manejador.Eliminar(" + json + ")' value='Eliminar'/><input type='button' onclick='Enlace.Manejador.Modificar(\"" + json + "\")' value='Modificar'/> </td></tr>");
                    }
                }
            })
                .fail(function (params) {
                console.log(params);
            });
        };
        Manejador.Eliminar = function (jsonstr) {
            var pagina = "./BACKEND/administrar.php";
            var formData = new FormData();
            formData.append("cadenaJson", JSON.stringify(jsonstr));
            formData.append("caso", "eliminar");
            $.ajax({
                type: 'POST',
                url: pagina,
                dataType: "json",
                data: formData,
                contentType: false,
                processData: false
            })
                .done(function (params) {
                if (params.TodoOK) {
                    console.log("Todo ok");
                }
                else {
                    console.log("Error eliminar el archivo");
                }
            })
                .fail(function (params) {
                console.log(params);
            });
        };
        Manejador.Modificar = function (jsonstr) {
            $("#txtPatente").val(jsonstr.patente);
            $("#txtPrecio").val(jsonstr.precio);
            $("#cboMarca").val(jsonstr.marca);
            $("#txtPatente").prop('readOnly', false);
            $("#hdnIdModificacion").val("modificar");
        };
        Manejador.CargarMarcas = function () {
            var pagina = "./BACKEND/administrar.php";
            var formData = new FormData();
            formData.append("caso", "marcas");
            $.ajax({
                type: 'POST',
                url: pagina,
                dataType: "json",
                data: formData,
                contentType: false,
                processData: false
            })
                .done(function (params) {
                $("#cboMarca").val("");
                for (var i = 0; i < params.length; i++) {
                    $("#cboMarca").append("<option>" + params[i].descripcion + "</option>");
                }
            })
                .fail(function (params) {
                console.log(params);
            });
        };
        return Manejador;
    }());
    Enlace.Manejador = Manejador;
})(Enlace || (Enlace = {}));

$(window).load(function(){

    $(function() {
     $('#foto').change(function(e) {
         addImage(e); 
        });
   
        function addImage(e){
         var file = e.target.files[0],
         imageType = /image.*/;
       
         if (!file.type.match(imageType))
          return;
     
         var reader = new FileReader();
         reader.onload = fileOnload;
         reader.readAsDataURL(file);
        }
     
        function fileOnload(e) {
         var result=e.target.result;
         $("#divImg").empty();
         $("#divImg").append('<img id="imgSalida" width="50%" height="50%" src="" />');
         $('#imgSalida').attr("src",result);
        }
       });
     });