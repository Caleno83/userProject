

const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const usersRouter = require("./users/userRouter")
const plantsRouter = require("./plants/plantsRouter")
const bodyParser = require("body-parser");

const pino = require("express-pino-logger")();
const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);


const server = express(); 

server.use(helmet())
server.use(cors())
server.use(express.json())

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(pino);
server.use(cors());

server.use(usersRouter)
server.use(plantsRouter)

server.post("/api/messages", (req, res) => {
  res.header("Content-Type", "application/json");
  client.messages
    .create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to: req.body.to,
      body: req.body.body,
    })
    .then(() => {
      res.send(JSON.stringify({ success: true }));
    })
    .catch((err) => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });
});

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