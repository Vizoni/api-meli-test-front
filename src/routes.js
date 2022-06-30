const ProductsController = require("./controllers/ProductsController");

module.exports = [
	{
		endpoint: "/api/items",
		method: "GET",
		handler: ProductsController.getProductByText,
	},
];
