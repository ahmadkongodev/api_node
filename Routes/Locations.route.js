const express = require('express')
const router = express.Router()

const LocationController = require('../Controllers/LocationController')
router.get('/', LocationController.getAllLocations)
router.post('/', LocationController.createNewLocation)

router.get('/:id', LocationController.findLocationById)

router.patch('/:id', LocationController.updateLocation)

router.delete('/:id', LocationController.deleteLocationById)
router.delete('/produit/:id', LocationController.deleteLocationByProductId)
module.exports = router;