/// <reference path="../ajax/ajax.ts" />
var json=[
    {"codigoBarra":"|_|||_|_||","nombre":"Arroz","precio":15},
    {"codigoBarra":"|_|||||__|","nombre":"Oreo","precio":25},
    {"codigoBarra":"|_||||||_|","nombre":"Pizza","precio":30}
 ];
 let ajax:Ajax=new Ajax();
 ajax.Post("mostarJson.php",
 (mostrar:string)=>{
    (<HTMLDivElement>document.getElementById("Hola")).innerHTML=mostrar;
 },"personas="+JSON.stringify(json));


