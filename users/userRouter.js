const express = require('express');
const Users = require('./userDb');
const router = express.Router();

router.get('/', (req, res) => {
  Users.get(req.query)
    .then( users => {
      res.status(200).json({ users });
    })
    .catch( err => {
      console.log( err );
      res.status(500).json({
        message: "Error retrieving the users"
      });
    });
});

router.get('/:id', (req, res) => {
  Users.getById(req.params.id)
    .then( user => {
      if ( user ) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found." });
      }
    })
    .catch( err => {
      console.log( err );
      res.status(500).json({
        message: 'Error retrieving the specific user.'
      });
    });
});

router.post('/', (req, res) => {
  Users.insert(req.body)
    .then( user => {
      res.status(200).json( user )
    })
    .catch( err => {
      res.status(500).json({ 
        message: 'Error adding the user.'
      })
    })
});

router.get('/:id/posts', (req, res) => {
  const user_id = req.params.id;
  Users.getUserPosts(user_id)
    .then( posts => {
      if ( posts ) {
        res.status(200).json(posts)
      } else {
        res.status(404).json({
          message: `Unable to find posts associated with ID ${id}`
        })
      }
    })
    .catch ( err => {
      res.status(500).json({
        message: 'Error retrieving posts for this ID'
      });
    });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  Users.remove(id)
    .then( count => {
      if ( count ) {
        res.status(200).json({ message: "User deleted." });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch( err => {
      console.log( err );
      res.status(500).json({ error: "500: Internal error occurred." })
    })
});

router.post('/:id/posts', (req, res) => {
  Users.insert(req.body)
    .then( post => {
      res.status(201).json( post )
    })
    .catch( err => {
      res.status(500).json({
        message: 'Error inserting a post'
      });
    });
});

router.put('/:id', (req, res) => {
  const changes = req.body;
  Users.update(req.params.id, changes)
    .then( user => {
      if ( user ) {
        res.status(200).json( user )
      } else {
        res.status(404).json({ message: 'The user could not be found.' })
      }
    })
    .catch( err => {
      res.status(500).json({
        message: 'Error updating the user.'
      });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
