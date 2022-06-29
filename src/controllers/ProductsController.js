require("dotenv").config();
const https = require("https");

module.exports = {
	getFirstFourProducts(request, response) {
		let data = "";
		const apiURL = process.env.MELI_API_URL;
		https.get(`${apiURL}sites/MLA/search?q=iphone&limit=4`, (resp) => {
			resp.on("data", (chunk) => {
				data += chunk;
			});

			resp.on("end", () => {
				response.writeHead(200, { "Content-Type": "application/json" });
				response.end(data);
			});
		});
	},
};
