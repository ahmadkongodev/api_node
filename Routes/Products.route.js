const express = require('express')
const router = express.Router()

const ProductController = require('../Controllers/ProductController')
router.get('/', ProductController.getAllProducts)
router.get('/tables', ProductController.getAllTables)
router.get('/chaises', ProductController.getAllChairs)
router.get('/baches', ProductController.getAllBaches)
router.get('/podiums', ProductController.getAllPodiums)
router.post('/', ProductController.createNewProduct)

router.get('/:id', ProductController.findProductById)

router.patch('/:id', ProductController.updateProduct)

router.delete('/:id', ProductController.deleteProductById)
module.exports = router;