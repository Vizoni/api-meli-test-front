const { Router } = require('express');
const cors = require('cors')

const router = Router();

const HealthController = require('./controllers/HealthController');
const ProductController = require('./controllers/ProductController');

router.get('/api/health', HealthController.getHealth);
router.get('/api/items', ProductController.getProductByText);
router.get('/api/items/:id', ProductController.getProductById);
// router.get('/api/health', cors(), HealthController.getHealth);
// router.get('/api/items', cors(),ProductController.getProductByText);
// router.get('/api/items/:id', cors(),ProductController.getProductById);

module.exports = router;