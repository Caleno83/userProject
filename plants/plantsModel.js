const db = require('../data/config');



// to get projects with resource
function getPlants() {
return db('plants as p')
.select("p.*")
.where("user_id", id)
}

// to get a specific project by id
function getPlantsById(id) {
    return db("plants as p")
    .select(["p.*"])

    .where("p.id", id)
    .first();
}





module.exports = {
 getPlants,
 getPlantsById
};