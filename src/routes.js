const ProductsController = require("./controllers/ProductsController");

module.exports = [
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
