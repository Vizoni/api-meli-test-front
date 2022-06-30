require("dotenv").config();
const https = require("https");

module.exports = {
	getProductByText(request, response) {
		const apiURL = process.env.MELI_API_URL;

		const query = request.query;
		let data = "";
		https.get(`${apiURL}sites/MLA/search?q=${query.q}&limit=4`, (resp) => {
			resp.on("data", (chunk) => {
				data += chunk;
			});

			resp.on("end", () => {
				const categoriesObj = JSON.parse(data).filters.find(
					(item) => item.id == "category"
				);
				const categories = categoriesObj.values[0].path_from_root;
				const categoryList = [].concat(categories).map(({ name }) => name);
				const products = JSON.parse(data).results;
				const items = [].concat(products).map((prod) => {
					const splitDecimalAmountPrice = prod.prices.prices[0].amount
						.toString()
						.split(".");
					return {
						id: prod.id,
						title: prod.title,
						picture: prod.thumbnail,
						condition: prod.condition,
						free_shipping: prod.shipping.free_shipping,
						price: {
							currency: prod.prices.prices[0].currency_id,
							amount: Number(splitDecimalAmountPrice[0]),
							decimals: Number(splitDecimalAmountPrice[1]),
						},
					};
				});
				const returnedObject = JSON.stringify({
					categories: categoryList,
					items: items,
				});
				response.writeHead(200, { "Content-Type": "application/json" });
				response.end(returnedObject);
			});
		});
	},
};
