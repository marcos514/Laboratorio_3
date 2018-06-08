<?php
$caso = isset($_POST["caso"]) ? $_POST["caso"] : null;

switch ($caso) 
{

    case 'agregar':
        $cadenaJSON = isset($_POST['cadenaJson']) ? trim($_POST['cadenaJson']) : null;
        $json=json_decode($cadenaJSON);

        

        // lo agrego si no esta 

        if(file_exists($json->path))
        {
            $resultado["TodoOK"] = false;
        }
        else
        {
            if(move_uploaded_file($_FILES["foto"]["tmp_name"],trim($json->path)))
            {
                $ar = fopen("./autos.json", "a");
            
                $cant = fwrite($ar, "\r\n".$cadenaJSON);

                fclose($ar);

                $resultado["TodoOK"] = $cant > 0 ? true : false;
            }
            else
            {
            $resultado["TodoOK"] = false;                
            }

        }
        echo json_encode($resultado);
        break;

    case 'mostrar':
    
        $a = fopen("./autos.json", "r");

        $string = "";

        while(!feof($a)){
        
            $linea = trim(fgets($a));
        
            if(strlen($linea) > 0)
                $string .=  $linea . ',';        
        }
        
        fclose($a);

        $string = substr($string, 0, strlen($string)-1);        
        
        echo ('['.$string.']');
        
        break;

    case 'eliminar':

        $cadenaJSON = isset($_POST['cadenaJson']) ? $_POST['cadenaJson'] : null;
        $obj = json_decode($cadenaJSON);

        $a = fopen("./autos.json","r");
        

        $string = '';

        while(!feof($a)){

            $linea = trim(fgets($a));

            if(strlen($linea) > 0){

                $objLinea = json_decode($linea);

                if($objLinea->patente == $obj->patente){
                    unlink($objLinea->path);
                    continue;
                }

                $string .= $linea . "\r\n";
            }         
        }

        fclose($a);

        $objRetorno = new stdClass();
        $objRetorno->TodoOK = TRUE;

        $a = fopen("./autos.json","w");
        
        $cant = fwrite($a, $string);

        fclose($a);

        echo json_encode($objRetorno);        
        
        break;

    case 'modificar':

        $cadenaJSON = isset($_POST['cadenaJson']) ? $_POST['cadenaJson'] : null;
        $obj = json_decode($cadenaJSON);

        $a = fopen("./autos.json","r");

        $string = '';

        while(!feof($a)){

            $linea = trim(fgets($a));
            
            if(strlen($linea) > 0){
                
                $objLinea = json_decode($linea);

                if($objLinea->patente == $obj->patente){
                    unlink($objLinea->path);
                    continue;
                }
                
                $string .= $linea . "\r\n";
            }         
        }

        $string .=  $cadenaJSON . "\r\n";
        move_uploaded_file($_FILES["foto"]["tmp_name"],$obj->path);
        
        

        fclose($a);

        $objRetorno = new stdClass();
        $objRetorno->TodoOK = TRUE;

        $a = fopen("./autos.json","w");
        
        $cant = fwrite($a, $string);

        fclose($a);

        if($cant < 1){
            $objRetorno->TodoOK = FALSE;
        }

        echo json_encode($objRetorno);        

        break;

    case "marcas":
    
        $a = fopen("./marcas.json","r");
        $paises = fread($a, filesize("./marcas.json"));
        fclose($a);

        echo ($paises);

        break;
    default:
        echo ":(";
        break;
}