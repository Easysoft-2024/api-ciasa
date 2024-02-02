const db = require('../database/mysql');
const respuesta = require ('../red/respuestas');

function putCancelled(req, res){
	try{
		return db.obtenerDatosDetVenta(req.params.folio).then((detVenta)=>{	
			try{
				if (detVenta[0].estatus !== 'cancelado'){
					res.send({respuesta: 'Estatus actualizado a cancelado'});
					return db.obtenerDatosVenta(req.params.folio).then((venta)=> {
						try{
							db.putCancelled(detVenta);
							console.log(venta);
							let ventaJSON = Object.entries(JSON.parse(JSON.stringify(venta)));
							var count = Object.keys(ventaJSON).length;
							console.log("Total entries: " + count);
							for (let i=0; i<count; i++){

								let folioV =venta[i].folioV;
								let producto = venta[i].producto;
								let cantidad = venta[i].cantidad;
								let precio = venta[i].precio;
								let costo = venta[i].CostosP;
								let importe = venta[i].importe
								
								db.pasarVentaACancelacion(folioV,producto,cantidad,precio, costo, importe);

								let cajero = detVenta[0].cajero;
								let turno = detVenta[0].turno;
								let sucursal = detVenta[0].sucursal;
								let estacion = detVenta[0].estacion;
								let foliocorte = detVenta[0].foliocorte;

								db.updateCancelacion(folioV, cajero, turno, sucursal, estacion, foliocorte);
								
							}

							db.eliminarVenta(detVenta);
						}
						catch{
							console.log("No se puede imprimir el texto");
						}
					})				
				}
				else{
					res.send({respuesta: 'No se puede marcar como cancelada una venta cancelada'});
				}
				
			}
			catch{
				res.send({respuesta: 'Folio no encontrado'});
			}
		})
	}
	catch(err){
		res.status(200).send({mensaje: 'Ingrese un folio válido'});	
	}
}

module.exports = {
	putCancelled
}