

const express = require("express")
const db = require("../plants/plantsModel")
const { restrict} = require("../middleware/users")
const { validatePlantsId } = require("../middleware/plants")

const router = express.Router()

// to get all projects
router.get("/users/:user_id/plants", restrict(), async (req, res, next) => {
	try {
		const plants = await db.getPlants(req.params.user_id)
		res.json(plants)
	} catch(err) {
		next(err)
	}
})

// to get a specific project
router.get("/users/:user_id/plants/:id", restrict(), validatePlantsId(), (req, res) => {
    res.status(200).json(req.plants);
  });



// request to add a new action
router.post("/plants",restrict(), async (req, res, next) => {
	try {
   
	   const projects = await db.insert(req.body);
   
	   res.status(201).json(projects);
	 } catch (err) {
	   next(err);
	 } 
   });
   
   
   // request to change actions
   router.put("/plants/:id",  restrict(), validatePlantsId(), async (req, res, next) => {
	 try {
	   const projects = await db.update(req.params.id, req.body);
   
	   if (projects) {
		 res.status(200).json(projects);
	   } else {
		 res.status(404).json({
		   message: "The plants could not be found",
		 });
	   }
	 } catch (error) {
	   next(error);
	 }
   });
   
   // request to change actions 
   router.delete("/plants/:id", restrict(), validatePlantsId(), async (req, res, next) => {
	 try {
	   const projects = await db.remove(req.params.id);
   
	   if (projects > 0) {
		 res.status(200).json({
		   message: "The plants has been erased from this part of the Earth",
		 });
	   } else {
		 res.status(404).json({
		   message: "The plants could not be found",
		 });
	   }
	 } catch (error) {
	   next(error);
	 }
   });
   
module.exports = router