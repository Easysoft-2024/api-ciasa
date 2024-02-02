const db = require('../database/mysql');
const respuesta = require ('../red/respuestas');

function putCompleted(req, res){
	try{
		return db.obtenerDatosDetVenta(req.params.folio).then((items)=>{
			try{
				if(items[0].estatus === ''  ){
					db.putCompleted(items);
					res.send({respuesta: 'Estatus actualizado a completado'});
				}
				else if(items[0].estatus === 'completado'){
					res.send({respuesta: 'No se puede marcar como completado una venta completada'});
				}
				else{
					res.send({respuesta: 'No se puede revertir la cancelación de una compra'});
				}
			}
			catch{
				res.send({respuesta: 'Folio no encontrado'});	
			}
	
		})
	}
	catch(err){
		respuesta.error(res,res, err, 500);
	}
}
module.exports = {
	putCompleted
}