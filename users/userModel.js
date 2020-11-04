const db = require("../data/config")

// add a user to register
async function add(user) {
	const [id] = await db("users").insert(user)
	return findById(id)
}


//find all users
function find() {
    return db("users").select("id", "username", "password", "phoneNumber").orderBy("id")
}

// function find() {
// 	return db("users as u")
// 		.innerJoin("departments as d", "d.id", "u.department_id")
// 		.select("u.id", "u.username", "d.name as department")
// }


//find user
function findBy(filter) {
	return db("users")
		// .select("id", "username", "password", "phoneNumber")
		.where(filter)
}

//find specifci user
function findById(id) {
	return db("users")
		// .select("id", "username", "password", "phoneNumber")
		.where({ id })
		.first()
}


//update user
//  function update(id, changes) {
// 	return db('users')
// 	  .where({ id })
// 	  .update(changes);
//   }


  function update(id, changes) {
	return db('users')
	  .where({ id })
	  .update(changes)
	  .then(count => (count > 0 ? findById(id) : null));
}
  
  // delete a user
  function remove(id) {
	return db('users').where({ id }).del();
  }

module.exports = {
    add,
    find,
    findBy,
	findById,
	update, 
	remove
}