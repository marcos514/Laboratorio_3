<?php
$nombre=isset($_GET["nombre"]) ? $_GET["nombre"]:false;
$pass=isset($_GET["pass"]) ? $_GET["pass"]:false;
$archivo=fopen("Usuarios.txt","r");
$validar=false;
while(!feof($archivo))
{
    $linea=fgets($archivo);
    $linea=explode(" - ",$linea);
    if(trim($linea[0])==$nombre&& trim($linea[1])==$pass)
    {
        $validar=true;
    }
}

if($validar)
{
    echo "OK";
}
else
{
    
    echo "No ok";
}
fclose($archivo);
?>