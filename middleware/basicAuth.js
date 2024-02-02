const auth = require('basic-auth');
const db = require('../database/mysql');

//Creamos nuestra función para usar Basic Authentication
const mwBasicAuth = async (req, res, next) => {
	try {
		const user = await auth(req);
		console.log(user.name, user.pass);

		//Validamos el usuario
		if (user.name !== '' || user.pass !== '') {
			db.obtenerCredencialesUsuario(user.name, user.pass).then(item => {
				// console.log(`Este valor regresa la consulta de inicio de sesión:  ${item[0].encontrado}`);
				if (item[0].encontrado === 1) {
					next();
				}
				else {
					console.log('Basic Auth: failed')
					res.statusCode = 401
					res.end('Acceso no autorizado')
				}
			});
		}
		else {
			res.end('Acceso no autorizado')
		}
	}
	catch (error) {
		res.send('Acceso no autorizado')
	}
}

module.exports = mwBasicAuth;