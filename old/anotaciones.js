/*case "/procesa":
            //Se obtienen los datos enviados
            let datos = '';
            /*Se añade un listener al evento 'data' de la solicitud, que se activa cada vez que se reciben datos en la solicitud.
            Los datos recibidos se concatenan en la variable 'datos'.
               req.on('data',parte=>{
                   datos += parte.toString();
               })
                  // Una vez que se han recibido todos los datos de la solicitud ('end' event), se ejecuta la función
                req.on('end',()=>{
                   var cadena = datos
                   /* Se analizan los datos en formato de cadena y se convierten en un objeto
                   para facilitar el acceso a los distintos campos de los datos y se imprimen por consola.
                   var entrada = procesador.parse(cadena)
                   console.log(entrada)
                    // Se realiza una inserción en la base de datos utilizando los datos obtenidos en la tabla blog.
                    conexion.query(`
                        INSERT INTO blog VALUES(
                            NULL,
                            '${entrada.mensaje}',
                            '2024-02-21'
                        )
                    `,function(err,result){
                        if(err) throw err;
                        console.log("Se ha insertado el registro")
                    })
                })*/