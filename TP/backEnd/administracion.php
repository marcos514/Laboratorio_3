<?php
include_once "Empleado.php";
include_once "Persona.php";
include_once "Fabrica.php";

    $sexo=$_POST["cmbSexo"];

    if($sexo=="M")
    {
        $sexo="Masculino";
    }
    else
    {
        $sexo="Femenino";
    }
    $empleado=new Empleado($_POST["txtNombre"],$_POST["txtApellido"],$_POST["txtDni"],$sexo,$_POST["txtLegajo"],$_POST["txtSueldo"],$_POST["rdoTurno"]);


    $fabrica=new Fabrica("Marcos S.A",7);
    $fabrica->TraerDeArchivo("archivo.txt");
    if($fabrica->AgregarEmpleado($empleado))
    {
        $fabrica->GuardarEnArchivo("archivo.txt");
        echo "<a href='mostrar.php'><h2>Mostrar los empleados</h2></a>";
    }
    else
    {
        echo "<h2>Error Empleados repetido o Capacidad Maxima Alzada</h2><a href='../frontEnd'><h2>Volver a agregar un empleado</h2></a>";
    }
    
?>


