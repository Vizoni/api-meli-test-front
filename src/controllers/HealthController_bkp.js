require("dotenv").config();
const https = require("https");

module.exports = {
	getHealth(request, response) {
		try {
			return response.send(200, {
				uptime: process.uptime(),
				message: "It's all fine.",
				timestamp: Date.now(),
			});
		} catch (e) {
			return response.send(503, {
				uptime: process.uptime(),
				message: "We are not good.",
				error: e.message,
				timestamp: Date.now(),
			});
		}
	},
};
