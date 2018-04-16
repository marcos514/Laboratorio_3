

<?php
include_once "Empleado.php";
include_once "Persona.php";
include_once "Fabrica.php";
$fabrica=new Fabrica("Marcos S.A",7);
$fabrica->TraerDeArchivo("archivo.txt");
echo ("<html><body><h1>Empleados</h1>");
foreach($fabrica->GetEmpleados() as $empleado)
{
    echo ("<h2>".$empleado->ToString()."<a href='eliminar.php?legajo=".$empleado->GetLegajo()."'>ELIMINAR</a></h2>");
}
echo "<a href='../frontEnd'><h2>Volver a agregar un empleado</h2></a>";

/*$archivo=fopen("archivo.txt","r");
if($archivo!=null)
{
    while (!feof($archivo)) 
    {
        $comp=true;
        $auxEmpleado=explode(" - ",fgets($archivo));
        for($i=0;$i<count($auxEmpleado)-1;$i++)
        {
            if($auxEmpleado[$i]!="")
            {
                $comp=false;
                break;
                
            }
            $auxEmpleado[$i]=trim($auxEmpleado[$i]);
        }
        if($comp)
        {
            break;
        }
        else
        {
            $empleado=new Empleado($auxEmpleado[1],$auxEmpleado[0],$auxEmpleado[3],$auxEmpleado[2],$auxEmpleado[6],$auxEmpleado[4],$auxEmpleado[5]);
            $fabrica=new Fabrica("Marcos S.A",7);
            $fabrica->TraerDeArchivo("archivo.txt");
            $fabrica->AgregarEmpleado($empleado);
            if()
            {
               
            }
            echo "<h2><a href='eliminar.php?legajo=".echo <?php echo $empleado->GetLegajo();?>.">".$empleado->ToString()."</a></h2>";  
        }
        
    }
    echo "<a href='../frontEnd'><h2>Volver a agregar un empleado</h2></a>";
}
fclose($archivo);*/


?>

