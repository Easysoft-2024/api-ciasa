const express = require('express');
const getTransactionsController = require('../controllers/getTransactions.controller');
const respuesta = require ('../red/respuestas');

const router = express.Router();

router.get('/',getTransactions);
async function getTransactions(req, res){
	try{
		const items = await getTransactionsController.getTransactions();
		res.send({respuesta: items});	
	}
	catch(err){
		res.status(500).send('Algo salió mal');	
	}	
};

module.exports = router;