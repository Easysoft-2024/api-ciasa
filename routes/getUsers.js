const express = require('express');
const getUsersController = require('../controllers/getUsers.controller');
const respuesta = require ('../red/respuestas');

const router = express.Router();

router.get('/',getUsers);
async function getUsers(req, res){
	try{
		const items = await getUsersController.getUsers();
		res.send({respuesta: items});	
	}
	catch(err){
		res.status(500).send('Algo salió mal');
	}	
};

module.exports = router;