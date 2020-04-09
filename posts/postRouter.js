const express = require('express');
const Posts = require('./postDb');
const router = express.Router();

// /api/posts

router.get('/', (req, res) => { 
  Posts.get(req.query)
    .then( posts => {
      res.status(200).json({ posts });
    })
    .catch( err => {
      console.log( err );
      res.status(500).json({
        message: "Error retrieving the posts"
      });
    });
});

router.get('/:id', validatePostId, (req, res) => {
  Posts.getById(req.params.id)
    .then( post => {
      if ( post ) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found." });
      }
    })
    .catch( err => {
      console.log( err );
      res.status(500).json({
        message: 'Error retrieving the specific post.'
      });
    });
});

router.delete('/:id', validateUserId, (req, res) => {
  const id = req.params.id;

  Posts.remove(id)
    .then( count => {
      if ( count ) {
        res.status(200).json({ message: "Post deleted." });
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    })
    .catch( err => {
      console.log( err );
      res.status(500).json({ error: "500: Internal error occurred." })
    })
});

router.put('/:id', validateUserId, (req, res) => {
  const changes = req.body

  Posts.update(req.params.id, changes)
    .then( count => {
      if ( count ) {
        Posts.getById(req.params.id)
          .then( post => {
            res.status(200).json(post)
          })
          .catch( err => {
            res
              .status(500)
              .json({ errorMessage: "Error reading the updated post."});
          });
      } else {
        res.status(404).json({ message: "The post could not be found." })
      }
    })
    .catch( err => {
      res.sttatus(500).json({ message: "Error updating the post." })
    })
});

// custom middleware

function validateUserId(req, res, next) {
  Users.getById(req.params.id)
    .then( user => {
      if ( user ) {
        // res.status(200).json(user);
        req.user = user;
      } else {
        res.status(400).json({ message: "Invalid user ID." });
      }
    })
    .catch( err => {
      console.log( err );
      res.status(500).json({
        message: 'Error retrieving the specific user.'
      });
    });

    next();
}

function validatePostId(req, res, next) {
  if (req.body !== "" && req.body.text !== "") {
    next();
  } else if (req.body === "") {
    res.status(400).json({
      message: 'missing post data.'
    })
  } else {
    res.status(400).json({
      message: 'missing required text field'
    })
  }
}

module.exports = router;
