const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const db = require("./userModel")
const { restrict, validateUsersId } = require("../middleware/users")

const router = express.Router()

router.get("/users", restrict(), async (req, res, next) => {
	try {
		res.json(await db.find())
	} catch(err) {
		next(err)
	}
})

//specific user
router.get("/users/:id", restrict(),async(req,res,next)=>{
    try {
        const user = await db.findById(req.params.id)
        if(!user){
            return res.status(404).json({
                message: "User not found"
            })
        }
        res.json(user)

    }catch(err){
        next(err)
    }
})

router.post("/register", async (req, res, next) => {
	try {
		const { username, password, phoneNumber } = req.body
		const user = await db.findBy({username}).first()
		// const user = await db.findByUsername(username)


		if (user) {
			return res.status(409).json({
				message: "You Shall Not Pass",
			})
		}

		const newUser = await db.add({
			username,
            password: await bcrypt.hash(password, 14),
            phoneNumber,
		})

		res.status(201).json(newUser)
	} catch(err) {
		next(err)
	}
})

router.post("/login", async (req, res, next) => {
	try {
		const { username, password } = req.body
		const user = await db.findBy({ username }).first()
		// const user = await db.findByUsername(username)
		
		if (!user) {
			return res.status(401).json({
				message: "You Shall Not Pass",
			})
		}

		const passwordValid = await bcrypt.compare(password, user.password)

		if (!passwordValid) {
			return res.status(401).json({
				message: "You Shall Not Pass",
			})
		}

		const token = jwt.sign({
			userID: user.id,
		}, process.env.JWT_SECRET)


    
        
		res.json({
			message: `Welcome ${user.username}!`,
			token,
			user_id: user.id,

		})
	} catch(err) {
		next(err)
	}
})

//update user

// router.put("/users/:id", validateUsersId(), async (req, res, next) => {
// 	try {
// 	  const users = await db.update(req.params.id, req.body);
	
// 	  if (users) {
// 		res.status(200).json(users);
// 	  } else {
// 		res.status(404).json({
// 		  message: "The users could not be found",
// 		});
// 	  }
// 	} catch (error) {
// 	  next(error);
// 	}
//   });

router.put('/user:id/:id', restrict(), validateUsersId(), async (req, res) => {
    try {
        const {username, password, email, phone} = req.body;
        const {id} =req.params;
    //     if (!username) {
    //       res.status(400).json({ message: "Please provide all the required information of the user." })
    //    }
        const count = await db.update(id, req.body)
        .then(user=>{
          if (user) {
            res.status(200).json(count)
          } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
            }
          })
    } catch (error) {
			  next(error);
		 	}
  }
);

// remove a user

router.delete('/users/:id', restrict(),validateUsersId(), async (req, res, next) => {
	
	try {
		const action = await db.remove(req.params.id);
	
		if (action > 0) {
		  res.status(200).json({
			message: "The user has been erased from this part of the Earth",
		  });
		} else {
		  res.status(404).json({
			message: "The action could not be found",
		  });
		}
	  } catch (error) {
		next(error);
	  }
	});

// router.get("/logout", async (req, res, next) => {
// 	try {
// 		req.session.destroy((err) => {
// 			if (err) {
// 				next(err)
// 			} else {
// 				res.status(204).end()
// 			}
// 		})
// 	} catch (err) {
// 		next(err)
// 	}
// })

module.exports = router