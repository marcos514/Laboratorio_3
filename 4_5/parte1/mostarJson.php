<?php
$strJson=$_POST["personas"];
$Json=json_decode($strJson);
$ret="";
foreach ($Json as $key) {
    $ret=$ret. "<h3>Codigo Barras: ".$key->codigoBarra." - Nombre: ".$key->nombre." - Precio: ".$key->precio."</h3>";
}
echo $ret;


?>