const db = require("../plants/plantsModel")

function validatePlantsId() {
	return async (req, res, next) => {
        try {
          const plants = await db.getPlantsById(req.params.id);
    
          if (plants) {
            req.plants = plants;
            next();
          } else {
            res.status(404).json({
              message: "Invalid plants id",
            });
          }
        } catch (error) {
          console.log(error);
          res.status(500).json({
            message: "Error retrieving the project",
          });
        }
      };
    }

    

module.exports = {
	validatePlantsId,

}