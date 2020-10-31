

const express = require("express")
const db = require("../plants/plantsModel")
const { validatePlantsId } = require("../middleware/plants")

const router = express.Router()

// to get all projects
router.get("/plants/:user_id", async (req, res, next) => {
	try {
		const plants = await db.getPlants(req.params.user_id)
		res.json(plants)
	} catch(err) {
		next(err)
	}
})

// to get a specific project
router.get("/plants/:id", validatePlantsId(), (req, res) => {
    res.status(200).json(req.plants);
  });



module.exports = router