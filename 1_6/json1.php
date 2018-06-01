<?php
$valor=$_POST["nombre"];
$standar =new stdClass();
$standar->nombre=$valor;
echo json_encode($standar);



?>