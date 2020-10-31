const db = require("../data/config")

async function add(user) {
	const [id] = await db("users").insert(user)
	return findById(id)
}

function find() {
    return db("users").select("id", "username", "phoneNumber").orderBy("id")
}

// function find() {
// 	return db("users as u")
// 		.innerJoin("departments as d", "d.id", "u.department_id")
// 		.select("u.id", "u.username", "d.name as department")
// }

function findBy(filter) {
	return db("users as u")
		.select("id", "username", "password")
		.where(filter)
}


function findById(id) {
	return db("users")
		.select("id", "username")
		.where({ id })
		.first()
}


module.exports = {
    add,
    find,
    findBy,
	findById,
}