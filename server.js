const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const usersRouter = require("./users/userRouter")
const plantsRouter = require("./plants/plantsRouter")

const server = express();

server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(cookieParser())

server.use(usersRouter)
server.use(plantsRouter)

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "Something went wrong, please try again later",
  });
});

server.get("/", (req, res) => {
  res.send(`<h2>Welcome To My Own Auth Project</h2>`);
});

module.exports = server;