const express = require('express')
const router = express.Router()

const ClientController = require('../Controllers/ClientController')
router.get('/', ClientController.getAllClients)
router.post('/register', ClientController.createNewClient)
router.post('/login', ClientController.loginClient)
router.get('/:id', ClientController.findClientById)

router.patch('/:id', ClientController.updateClient)

router.delete('/:id', ClientController.deleteClientById)
module.exports = router;