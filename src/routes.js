const { Router } = require('express');
const cors = require('cors')

const router = Router();

const HealthController = require('./controllers/HealthController');
const ProductController = require('./controllers/ProductController');

// router.options('/api/health', cors())
router.get('/api/health', cors(), HealthController.getHealth);
// router.options('/api/items', cors())
router.get('/api/items', cors(),ProductController.getProductByText);
// router.options('/api/items/:id', cors())
router.get('/api/items/:id', cors(),ProductController.getProductById);

module.exports = router;