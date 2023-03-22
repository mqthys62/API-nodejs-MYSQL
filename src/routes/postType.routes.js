const express = require('express');
const router = express.Router();
const postTypeController = require("../controllers/postType.controller");
const authenticateUser = require('../middlewares/authentication.middleware');

// Create
router.post('/create', authenticateUser, postTypeController.Create);

// Read
// GetAll
router.get('/', postTypeController.GetAll);

// GetById
router.get('/:id', postTypeController.GetById);

// Update
router.patch('/update', authenticateUser, postTypeController.Update);

// Delete
router.delete('/delete', authenticateUser, postTypeController.Delete);

module.exports = router;