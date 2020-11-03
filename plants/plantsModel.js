const db = require('../data/config');



// to get projects with resource
function getPlants(id) {
return db('plants as p') 
.where("user_id", id)
.select("p.*")
}

// to get a specific project by id
function getPlantsById(id) {
    return db("plants as p")
    .select(["p.*"])

    .where("p.id", id)
    .first();
}


function insert(project) {
    return db("plants")
      .insert(project)
      .then(([id]) => getPlantsById(id));
  }
  
  function update(id, changes) {
    return db("plants")
      .where("id", id)
      .update(changes)
      .then(count => (count > 0 ? getPlantsById(id) : null));
  }
  
  function remove(id) {
    return db("plants")
      .where("id", id)
      .del();
  }
  



module.exports = {
 getPlants,
 getPlantsById, 
 insert,
 update,
 remove
};