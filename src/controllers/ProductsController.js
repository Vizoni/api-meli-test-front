require("dotenv").config();
const https = require("https");
const apiURL = process.env.MELI_API_URL;

module.exports = {
	getProductByText(request, response) {
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
	getProductDetailsById(request, response) {
		const { id } = request.params;
		// bate no id primeiro
		// dps bate no id/description
		let productDetail = "";
		https.get(`${apiURL}items/${id}`, (resp) => {
			resp.on("data", (chunk) => {
				productDetail += chunk;
			});

			resp.on("end", () => {
				const item = JSON.parse(productDetail);
				if (item.status === 404) {
					response.writeHead(404, { "Content-Type": "application/json" });
					response.end(JSON.stringify({ error: item.message }));
				} else {
					const splitDecimalAmountPrice = item.price.toString().split(".");

					let categoriesResponse = "";
					let categoryList = [];
					https.get(
						`${apiURL}categories/${item.category_id}`,
						(categoryResp) => {
							categoryResp.on("data", (chunk) => {
								categoriesResponse += chunk;
							});
							categoryResp.on("end", () => {
								categoriesResponse = JSON.parse(categoriesResponse);
								categoryList = []
									.concat(categoriesResponse.path_from_root)
									.map(({ name }) => name);

								let descriptionResponse = "";
								let description = "";
								https.get(
									`${apiURL}items/${id}/description`,
									(descriptionResp) => {
										descriptionResp.on("data", (chunk) => {
											descriptionResponse += chunk;
										});
										descriptionResp.on("end", () => {
											description =
												JSON.parse(descriptionResponse).plain_text || "";
											const returnedObject = JSON.stringify({
												item: {
													id: item.id,
													title: item.title,
													categories: categoryList,
													price: {
														currency: item.currency_id,
														amount: Number(splitDecimalAmountPrice[0]),
														decimals: Number(splitDecimalAmountPrice[1]),
													},
													picture: item.thumbnail,
													condition: item.condition,
													free_shipping: item.shipping.free_shipping,
													sold_quantity: item.sold_quantity,
													description: description,
												},
											});
											response.writeHead(200, {
												"Content-Type": "application/json",
											});
											response.end(returnedObject);
										});
									}
								);
							});
						}
					);
				}
			});
		});
	},
};
