<?php
include_once "Empleado.php";
include_once "Persona.php";
include_once "Fabrica.php";
$fabrica=new Fabrica("Marcos S.A",7);
$fabrica->TraerDeArchivo("archivo.txt");
$empleadoLugar=$fabrica->EliminarEmpleadoRepetidoLegajo((int)$_GET["legajo"]);
if($empleadoLugar!=-1)
{
    if($fabrica->EliminarEmpleado($fabrica->GetEmpleados()[$empleadoLugar]))
    {
        $fabrica->GuardarEnArchivo("archivo.txt");
        echo "<a href='mostrar.php'><h2>Mostrar los empleados</h2></a>";
        echo "<h2><a href='../frontEnd'>Volver a agregar un empleado</a></h2>";
    }
    else
    {
        echo "<h1>ERROR AL ELIMINAR EL EMPLEADO</h1>";
        echo "<a href='mostrar.php'><h2>Mostrar los empleados</h2></a>";
        echo "<h2><a href='../frontEnd'>Volver a agregar un empleado</a></h2>";
    }  
}
else
{
    echo "<h1>ERROR AL ELIMINAR EL EMPLEADO</h1>";
    echo "<a href='mostrar.php'><h2>Mostrar los empleados</h2></a>";
    echo "<h2><a href='../frontEnd'>Volver a agregar un empleado</a></h2>";
}




?>