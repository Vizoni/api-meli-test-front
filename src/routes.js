const { Router } = require('express');
const cors = require('cors')

const router = Router();

const HealthController = require('./controllers/HealthController');
const ProductController = require('./controllers/ProductController');

router.get('/api/health', HealthController.getHealth);
router.get('/api/items', ProductController.getProductByText);
router.get('/api/items/:id', ProductController.getProductById);

module.exports = router;