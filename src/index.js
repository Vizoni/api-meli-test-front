require("dotenv").config();
const http = require("http");
const routes = require("./routes");
// const url = require("url");
const { URL } = require("url");

const port = process.env.PORT || 3000;

const server = http.createServer((request, response) => {
	// const parsedUrl = new URL(`${request.baseUrl}${request.pathname}`);
	// const parsedUrl = new URL(`https://localhost:${port}${request.pathname}`);
	const parsedUrl = new URL(`https://localhost:8000${request.url}`);
	console.log(
		`Request Method: ${request.method} | Endpoint: ${parsedUrl.pathname}`
	);

	const route = routes.find(
		(routeObject) =>
			routeObject.endpoint === parsedUrl.pathname &&
			routeObject.method === request.method
	);

	if (route) {
		request.query = Object.fromEntries(parsedUrl.searchParams);
		route.handler(request, response);
	} else {
		response.writeHead(404, { "Content-Type": "text/html" });
		response.end(`Cannot ${request.method} ${parsedUrl.pathname}`);
	}
});

server.listen(port, () =>
	console.log(`Server started at http://localhost:${port}`)
);