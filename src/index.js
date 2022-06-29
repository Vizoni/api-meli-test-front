require("dotenv").config();
const http = require("http");
const routes = require("./routes");

const port = process.env.PORT || 3000;

const server = http.createServer((request, response) => {
	console.log(`Request Method: ${request.method} | Endpoint: ${request.url}`);

	const route = routes.find(
		(routeObject) => routeObject.method === request.method
	);

	if (route) {
		route.handler(request, response);
	} else {
		response.writeHead(404, { "Content-Type": "text/html" });
		response.end(`Cannot ${request.method} ${request.pathname}`);
	}
});

server.listen(port, () =>
	console.log(`Server started at http://localhost:${port}`)
);
