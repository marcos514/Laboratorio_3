<?php
include "Persona.php";
class Empleado extends Persona
{
    protected $_legajo;
    protected $_sueldo;
    protected $_turno;

    public function __construct($nombre,$apellido,$dni,$sexo,$legajo,$sueldo,$turno)
    {
        parent::__construct($nombre,$apellido,$dni,$sexo);
        $this->_legajo=$legajo;
        $this->_sueldo=$sueldo;
        $this->_turno=$turno;
        
    }


    public function GetLegajo()
    {
        return $this->_legajo;
    }

    public function GetSueldo()
    {
        return $this->_sueldo;
    }

    public function GetTurno()
    {
        return $this->_turno;
    }

    public function Hablar($idioma)
    {
        $idiomas;
        $retorno="El empleado habla ";
        foreach($idioma as $idiomas)
        {
            $retorno=$retorno.", ".$idiomas;
        }
        return $retorno;
    }

    public function ToString()
    {
        return parent::ToString()." - ".$this->getSueldo()." - ".$this->getTurno()." - ".$this->GetLegajo()." - ".$this->Hablar(array("Español","Ingles"));
    }



    





}


?>