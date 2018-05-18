/// <reference path="Auto.ts"/>
let auto:Clases.Auto=new Clases.Auto("aaa111","Marcos Motors",100000);
let autoJson:JSON=auto.ToJason();
let strAuto:string=JSON.stringify(autoJson);