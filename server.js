const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');

const server = express();

// middleware
server.use(logger);
server.use(helmet());
server.use(morgan('short'));
server.use(express.json());

// endpoints
server.get('/', (req, res) => {
  res.send(`<h2 style='text-align: center; margin-top: 20px;'>Let's write some middleware!: 4000</h2>`);
});

server.use('/api/posts', postRouter);
server.use('/api/users', userRouter);

function logger(req, res, next) {
  console.log(`${req.method} Request to ${req.originalUrl} at ${new Date()}`);
  next();
}

module.exports = server;
