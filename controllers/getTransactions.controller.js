const db = require('../database/mysql');

function getTransactions(){
	return db.getTransactions();
}

module.exports = {
	getTransactions	
}