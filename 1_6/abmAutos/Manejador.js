/// <reference path="ITributable.ts"/>
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
var Ajax = /** @class */ (function () {
    function Ajax() {
        var _this = this;
        this.Get = function (ruta, success, params, error) {
            if (params === void 0) { params = ""; }
            var parametros = params.length > 0 ? params : "";
            ruta = params.length > 0 ? ruta + "?" + parametros : ruta;
            _this._xhr.open('GET', ruta);
            _this._xhr.send();
            _this._xhr.onreadystatechange = function () {
                if (_this._xhr.readyState === Ajax.DONE) {
                    if (_this._xhr.status === Ajax.OK) {
                        success(_this._xhr.responseText);
                    }
                    else {
                        if (error !== undefined) {
                            error(_this._xhr.status);
                        }
                    }
                }
            };
        };
        this.Post = function (ruta, success, params, error) {
            if (params === void 0) { params = ""; }
            var parametros = params.length > 0 ? params : "";
            _this._xhr.open('POST', ruta, true);
            _this._xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            _this._xhr.send(parametros);
            _this._xhr.onreadystatechange = function () {
                if (_this._xhr.readyState === Ajax.DONE) {
                    if (_this._xhr.status === Ajax.OK) {
                        success(_this._xhr.responseText);
                    }
                    else {
                        if (error !== undefined) {
                            error(_this._xhr.status);
                        }
                    }
                }
            };
        };
        this._xhr = new XMLHttpRequest();
        Ajax.DONE = 4;
        Ajax.OK = 200;
    }
    return Ajax;
}());
/// <reference path="./libs/jquery/index.d.ts" />
/// <reference path="Auto.ts"/>
/// <reference path="ajax/Ajax.ts"/>
var Enlace;
(function (Enlace) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.Agregar = function () {
            var pagina = "./BACKEND/administrar.php";
            var archivo = document.getElementById("foto");
            var patente = document.getElementById("txtPatente").value;
            var strprecio = document.getElementById("txtPrecio").value;
            var marca = document.getElementById("cboMarca").value;
            var path = "fotos/" + Date.now() + ".jpg";
            var precio = Number(strprecio);
            var auto = new Clases.Auto(patente, marca, precio, path);
            var strAuto = JSON.stringify(auto.ToJason());
            var formData = new FormData();
            //formData.append("foto",archivo.files[0]);
            formData.append("cadenaJson", strAuto);
            formData.append("caso", "agregar");
            // es attr si es 1.9 o menor
            //$("#txtPatente").prop('readOnly', false);
            console.log(strAuto);
            $.ajax({
                type: 'POST',
                url: pagina,
                dataType: "json",
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                async: true
            })
                .done(function (objJson) {
                /*
                    if(objJson.TodoOK)
                    {
                        console.log("ok");
                    }
                    else
                    {
                        console.log("no ok");

                    }*/
                console.log("ok");
                document.getElementById("txtPatente").value = "";
                document.getElementById("txtPrecio").value = "";
                document.getElementById("cboMarca").value = "";
                document.getElementById("txtPatente").readOnly = false;
                document.getElementById("hdnIdModificacion").value = "";
            })
                .fail(function (aaa) {
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
        };
        Manejadora.Mostrar = function () {
            var ajax = new XMLHttpRequest();
            ajax.open("POST", "BACKEND/administrar.php", true);
            ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            ajax.send("caso=mostrar");
            ajax.onreadystatechange = function () {
                if (ajax.readyState == 4 && ajax.status == 200) {
                    console.log(ajax.responseText);
                    var arrayJSON = JSON.parse(ajax.responseText);
                    var fila = "<table>";
                    for (var i = 0; i < arrayJSON.length; i++) {
                        var json = JSON.stringify(arrayJSON[i]);
                        fila += "<tr><td>" + arrayJSON[i].patente + "</td><td>" + arrayJSON[i].marca + "</td><td>" + arrayJSON[i].precio + "</td><td><img id=\"imgFoto\" src=" + arrayJSON[i].path + " width=\"50px\" height=\"50px\" /></td><td><input type='button' onclick='Enlace.Manejadora.Eliminar(" + json + ")' value='Eliminar'/><input type='button' onclick='Enlace.Manejadora.Modificar(" + json + ")' value='Modificar'/> </td></tr>";
                    }
                    document.getElementById("divTabla").innerHTML = fila + "</table>";
                }
            };
        };
        Manejadora.Eliminar = function (jsonstr) {
            var ajax = new XMLHttpRequest();
            ajax.open("POST", "BACKEND/administrar.php", true);
            ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            ajax.send("caso=eliminar&cadenaJson=" + JSON.stringify(jsonstr));
            ajax.onreadystatechange = function () {
                if (ajax.readyState == 4 && ajax.status == 200) {
                    var obj = JSON.parse(ajax.responseText);
                    if (obj.TodoOK) {
                        console.log("ok");
                        Manejadora.Mostrar();
                    }
                    else {
                        console.log("no ok");
                    }
                }
            };
        };
        Manejadora.Modificar = function (jsonstr) {
            document.getElementById("txtPatente").value = jsonstr.patente;
            document.getElementById("txtPrecio").value = jsonstr.precio;
            document.getElementById("cboMarca").value = jsonstr.marca;
            document.getElementById("txtPatente").readOnly = true;
            document.getElementById("hdnIdModificacion").value = "modificar";
        };
        Manejadora.CargarMarcas = function () {
            var ajax = new XMLHttpRequest();
            ajax.open("POST", "BACKEND/administrar.php", true);
            ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            ajax.send("caso=marcas");
            ajax.onreadystatechange = function () {
                if (ajax.readyState == 4 && ajax.status == 200) {
                    var obj = JSON.parse(ajax.responseText);
                    for (var i = 0; i < obj.length; i++) {
                        document.getElementById("cboMarca").innerHTML += "<option>" + obj[i].descripcion + "</option>";
                    }
                }
            };
        };
        Manejadora.FiltrarMarca = function () {
            var ajax = new XMLHttpRequest();
            ajax.open("POST", "BACKEND/administrar.php", true);
            ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            ajax.send("caso=mostrar");
            ajax.onreadystatechange = function () {
                if (ajax.readyState == 4 && ajax.status == 200) {
                    var arrayJSON = JSON.parse(ajax.responseText);
                    var fila = "<table>";
                    var marcaSelected = document.getElementById("cboMarca").value;
                    for (var i = 0; i < arrayJSON.length; i++) {
                        if (arrayJSON[i].marca == marcaSelected) {
                            var json = JSON.stringify(arrayJSON[i]);
                            fila += "<tr><td>" + arrayJSON[i].patente + "</td><td>" + arrayJSON[i].marca + "</td><td>" + arrayJSON[i].precio + "</td><td><img id=\"imgFoto\" src=" + arrayJSON[i].path + " width=\"50px\" height=\"50px\" /></td><td><input type='button' onclick='Enlace.Manejadora.Eliminar(" + json + ")' value='Eliminar'/><input type='button' onclick='Enlace.Manejadora.Modificar(" + json + ")' value='Modificar'/> </td></tr>";
                        }
                    }
                    document.getElementById("divTabla").innerHTML = fila + "</table>";
                }
            };
        };
        return Manejadora;
    }());
    Enlace.Manejadora = Manejadora;
})(Enlace || (Enlace = {}));
