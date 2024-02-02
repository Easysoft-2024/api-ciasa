const db = require('../database/mysql');

function getUsers(){
	return db.getUsers();
}

module.exports = {
	getUsers
}