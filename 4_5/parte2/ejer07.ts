/// <reference path="../ajax/ajax.ts" />
function mostrar1()
{
    let ajax7:Ajax=new Ajax();
    ajax7.Post("traerAuto.php",(mostrar:string)=>{
    let json=JSON.parse(mostrar);
    (<HTMLInputElement>document.getElementById("txtId")).value=json.Id;
    (<HTMLInputElement>document.getElementById("txtMarca")).value=json.Marca;
    (<HTMLInputElement>document.getElementById("txtPrecio")).value=json.Precio;
    (<HTMLInputElement>document.getElementById("txtColor")).value=json.Color;
    (<HTMLInputElement>document.getElementById("txtModelo")).value=json.Modelo;
 },"");
}
