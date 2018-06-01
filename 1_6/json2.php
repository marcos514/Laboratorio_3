<?php
$valor=json_decode(json_encode($_POST["valor"]));
$valor->nombre="Marcos";
echo json_encode($valor);