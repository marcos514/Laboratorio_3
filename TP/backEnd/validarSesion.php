<?php
session_start();

if(isset($_GET))
{
    $dniEmpleado=$_GET["dni"];
    $existe=false;
    foreach ($_SESSION as $dni => $log) 
    {
        if($dni==$dniEmpleado && $log=="logeado")
        {
            $existe=true;
            break;
        }
    }
    if(!$existe)
    {
        header("Location: ../frontEnd/login.html");
    }
}

    

?>