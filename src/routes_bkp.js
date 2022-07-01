const ProductsController = require("./controllers/ProductsController");
const HealthController = require("./controllers/HealthController");

module.exports = [
	{
		endpoint: "/api/health",
		method: "GET",
		handler: HealthController.getHealth,
	},
	{
		endpoint: "/api/items",
		method: "GET",
		handler: ProductsController.getProductByText,
	},
	{
		endpoint: "/api/items/:id",
		method: "GET",
		handler: ProductsController.getProductDetailsById,
	},
];
