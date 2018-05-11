/// <reference path="../ajax/Ajax.ts" />

 let ajax2:Ajax=new Ajax();
 ajax2.Post("recibirJson.php",
 (mostrar:string)=>{
    (<HTMLDivElement>document.getElementById("Hola")).innerHTML=mostrar;
    alert(JSON.parse(mostrar)[0].nombre);
 },);