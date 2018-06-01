function Saludar()
{
    var nombre=$("#txtNombre").val();
    $("#divMostrar").html("Holis "+nombre);

    $.ajax({
        type:"POST",
        url:"json1.php",
        data:"nombre="+nombre,
        dataType:"json",
        async:true
    })
    .done(function(params) {
        $("#divPost").html("El nombre es: "+params.nombre);          
    })
    .fail(function () {
        $("#divPost").html("error"); 
        
    });
}

function Modificar() 
{
    var nombre=$("#txtNombre").val();
    var mijson=JSON.parse('{"valor":{"nombre":"'+nombre+'"}}');

    $.ajax({
        type:"POST",
        url:"json2.php",
        data:mijson,
        dataType:"json",
        async:true
    })
    .done(function(params) {
        $("#divPost").html("El nombre es: "+params.nombre); 
    })
    .fail(function () {
        $("#divPost").html("error"); 
        
    });
}