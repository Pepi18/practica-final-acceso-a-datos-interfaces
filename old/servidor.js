// Se importan los módulos.
var servidor = require('http');
var archivos = require('fs');
var ruta = require('url');
var procesador = require('querystring')
var mysql = require('mysql')
//Se establece la conexión con la base de datos
var conexion = mysql.createConnection({
    host:"localhost",
    user:"nodejs",
    password:"nodejs",
    database:"miweb"
});
//Se define un conector con una excepciónen caso de error
conexion.connect(function(err){
    if(err) throw err;
    console.log("conectado")
})  
//Se crea el servidor 
servidor.createServer(function(req, res) {
    res.writeHead(200,{'content-Type':'text/html' });
   //Se utiliza un switch para acceder a las diferentes rutas posibles. 
       switch(req.url){
        case "/":
            archivos.readFile('./views/inicio.html', function(err,data){
                res.write(data);
                res.end("");
            });
            break;
            case "/estilo.css":
                archivos.readFile('../css/estilo.css', function(err,data){
                    res.write(data);
                    res.end("");
                });
                break;
        case "/login":
            archivos.readFile('./views/login.html', function(err,data){
                res.write(data);
                res.end("");
            });
            break;
            case "/perfil":
                archivos.readFile('./views/perfil.html', function(err,data){
                    res.write(data);
                    res.end("");
                });
                break;
                case "/procesa":
                    //Se obtienen los datos enviados
                    let datos = '';
                    /*Se añade un listener al evento 'data' de la solicitud, que se activa cada vez que se reciben datos en la solicitud.
                    Los datos recibidos se concatenan en la variable 'datos'.*/
                       req.on('data',parte=>{
                           datos += parte.toString();
                       })
                          // Una vez que se han recibido todos los datos de la solicitud ('end' event), se ejecuta la función
                        req.on('end',()=>{
                           var cadena = datos
                           /* Se analizan los datos en formato de cadena y se convierten en un objeto
                           para facilitar el acceso a los distintos campos de los datos y se imprimen por consola.*/
                           var procesado = procesador.parse(cadena)
                           console.log(procesado)
                           var username = procesado.username 
                           var password = procesado.password
                        });
                        break;
            default:
                res.end("Página no encontrada");

    } 
    
 
}).listen(8080)