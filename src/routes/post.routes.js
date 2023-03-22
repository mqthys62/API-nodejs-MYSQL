const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const authenticateUser = require("../middlewares/authentication.middleware");

// Create
router.post('/create', authenticateUser, postController.Create);

// Read
// GetAll
router.get('/', postController.GetAll);

// GetById
router.get('/:id', postController.GetById);

// Update
router.patch('/update', authenticateUser, postController.Update);

// Delete
router.delete('/delete', authenticateUser, postController.Delete);

module.exports = router;