import express from 'express'
import { updateProduct } from './controllers/productController.js'

const router = express.Router()

router.put('/product/:id', updateProduct)

export default router
