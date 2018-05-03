<?php
include_once "Empleado.php";
include_once "Persona.php";
include_once "Fabrica.php";

$extencion=pathinfo($_FILES["imgEmpleado"]["name"],PATHINFO_EXTENSION);
$tmp_name=$_FILES["imgEmpleado"]["tmp_name"];
$pathFin=trim("fotos/".$_POST["txtDni"]."-".$_POST["txtApellido"].".".$extencion);

if(($extencion!="png"&&$extencion!="jpg"&&$extencion!="jpeg") )
{
    echo "Error, no es una foto<br><a href='../frontEnd'><h2>Volver a agregar un empleado</h2></a>";
}
else if( $_FILES["imgEmpleado"]["size"]>1000000)
{
    echo "Error, foto demaciado grande maximo 1GB<br><a href='../frontEnd'><h2>Volver a agregar un empleado</h2></a>";
}
else if(file_exists($pathFin)==true)
{
    echo "Error, foto ya existente<br><a href='../frontEnd'><h2>Volver a agregar un empleado</h2></a>";
}
else
{
    $sexo=$_POST["cmbSexo"];

    if($sexo=="M")
    {
        $sexo="Masculino";
    }
    else
    {
        $sexo="Femenino";
    }
    $empleado=new Empleado($_POST["txtNombre"],$_POST["txtApellido"],$_POST["txtDni"],$sexo,$_POST["txtLegajo"],$_POST["txtSueldo"],$_POST["rdoTurno"],$pathFin);


    $fabrica=new Fabrica("Marcos S.A",7);
    $fabrica->TraerDeArchivo("archivo.txt");
    if($fabrica->AgregarEmpleado($empleado))
    {
        if(move_uploaded_file($tmp_name,$pathFin))
        {
            echo "true";
        }

        $fabrica->GuardarEnArchivo("archivo.txt");
        echo "<a href='mostrar.php'><h2>Mostrar los empleados</h2></a>";
    }
    else
    {
        echo "<h2>Error Empleados repetido o Capacidad Maxima Alzada</h2><a href='../frontEnd'><h2>Volver a agregar un empleado</h2></a>";
    }
    
}


   
    
?>


