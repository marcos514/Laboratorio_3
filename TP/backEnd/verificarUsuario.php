<?php
session_start();
include_once "Empleado.php";
include_once "Persona.php";
include_once "Fabrica.php";
$verPost=isset($_GET)? true:false;
if($verPost)
{
    $dni=$_POST["txtDni"];
    $apellido=$_POST["txtApellido"];
    $fabrica=new Fabrica("Marcos S.A",7);
    $fabrica->TraerDeArchivo("archivo.txt");
    if($fabrica->GetIndexEmpleado_DniApellido($dni,$apellido)>=0)
    {
        $_SESSION[$dni]="logeado";
        header("Location: ./mostrar.php");
    }
    else
    {
        echo "<a href='../frontEnd/login.html'>Error LogIn volver a ingresar</a>";
    }
}
else
{
    echo "<a href='../frontEnd/login.html'>Error LogIn volver a ingresar</a>";
}


?>