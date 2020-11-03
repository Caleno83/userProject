const jwt = require("jsonwebtoken")
const db = require("../users/userModel")


function restrict() {
    return async (req, res, next) => {

        const authError = {
            message: "You Shall Not Pass"
        }
        try {
            const token = req.headers.authorization
            if (!token) {
                return res.status(401).json(authError)
            }

            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(401).json(authError)
                }


                req.token = decoded

                next()
            })
        } catch(err) {
            next(err)
        }
    }
}

function validateUsersId() {
    return async (req, res, next) => {
      try {
        const users = await db.findById(req.params.id);
  
        if (users) {
          req.users = users;
          next();
        } else {
          res.status(404).json({
            message: "Invalid users id",
          });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({
          message: "Error retrieving the users",
        });
      }
    };
  }

module.exports = {
    restrict,
    validateUsersId
}