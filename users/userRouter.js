const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const db = require("./userModel")
const { restrict } = require("../middleware/users")

const router = express.Router()

router.get("/users", restrict(), async (req, res, next) => {
	try {
		res.json(await db.find())
	} catch(err) {
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
            user_id: user.id
		})
	} catch(err) {
		next(err)
	}
})

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