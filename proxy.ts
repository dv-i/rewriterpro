const cors_proxy = require("cors-anywhere");

const host = "localhost";
const port = 8080; // You can change the port number if needed

cors_proxy
	.createServer({
		originWhitelist: [], // Allow all origins
	})
	.listen(port, host, () => {
		console.error(
			`CORS Anywhere proxy server running on http://${host}:${port}`
		);
	});
