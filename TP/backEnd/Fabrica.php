<?php
include_once "Empleado.php";
include_once "Persona.php";
include_once "Interfaces.php";
class Fabrica implements IArchivo
{
    private $_cantidadMaxima;
    public $_empleados;
    private $_razonSocial;

    public function __construct($razonSocial,$cantMax)
    {
        $this->_razonSocial=$razonSocial;
        $this->_cantidadMaxima=$cantMax;
        $this->_empleados=array();
    }

    public function AgregarEmpleado($emp)
    {
        $ret=TRUE;
        if(count($this->_empleados)+1<=$this->_cantidadMaxima )
        {
            if($this->EliminarEmpleadoRepetidoLegajo($emp->GetLegajo()))
            {
                array_push($this->_empleados,$emp);
                $this->EliminarEmpleadoRepetido();
            }
            else
            {
                $ret=false;
            }
        }
        else
        {
            $ret=false;
        }
        return $ret;
    }

    public function CalcularSueldo()
    {
        $sueldos=0;
        foreach($this->_empleados as $persona)
        { 
            $sueldos=$sueldos+$persona->GetSueldo();
        }
        return $sueldos;
    }

    public function GetEmpleados()
    {
        return $this->_empleados;
    }
    public function EliminarEmpleado($emp)
    {
        $eliminado=false;
        if($emp!=null)
        {
            $i=0;
            foreach ($this->_empleados as $empleado) 
            {
                if($emp->GetDni()==$empleado->GetDni())
                {   
                    unset($this->_empleados[$i]);
                    $eliminado=true;
                    break;
                }
                $i++;
            }
            /*for($i=0;$i<count($this->_empleados)-1;$i++)
            {
                if($emp->GetDni()==($this->_empleados[$i])->GetDni())
                {   
                    unset($this->_empleados[$i]);
                    $eliminado=true;
                    break;
                }
            }*/
        }
        
        return $eliminado;
    }
    public function EliminarEmpleadoRepetidoLegajo($legajo)
    {
        $retorno=-1;
        $i=0;
        foreach ($this->_empleados as $empleadosAux) 
        {
            if($empleadosAux->GetLegajo()==$legajo)
            {
                $retorno=$i;
                break;
            }
            $i++;
        }
        $i=-1;
        return $retorno;
    }

    private function EliminarEmpleadoRepetido()
    {
        $this->_empleados=array_unique($this->_empleados, SORT_REGULAR); 
    }


    public function ToString()
    {
        $retorno="<br>Empleados de ".$this->_razonSocial."<br>";
        
       // for($i=0;$i<count($this->_empleados);$i++)
       foreach($this->_empleados as $persona)
        {
            $retorno.=$persona->ToString();
        }
        $retorno=$retorno."<br>Y la suma de los sueldos es: ".$this->CalcularSueldo();
        return $retorno;
    }

    public function TraerDeArchivo($ruta)
    {
        $archivo=fopen($ruta,"r");
        if($archivo!=null)
        {
            while (!feof($archivo)) 
            {
                $comp=true;
                $linea=fgets($archivo);
                $auxEmpleado=explode(" - ",$linea);
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
                    $this->AgregarEmpleado($empleado);  
                }
                
            }   
        }
        fclose($archivo);
    }
    
    public function GuardarEnArchivo($ruta)
    {
        $archivo=fopen($ruta,"w");
            foreach($this->_empleados as $empleado) 
            {
                fwrite($archivo,$empleado->ToString()."\r\n");
            }
        
        fclose($archivo);
    }



}






?>