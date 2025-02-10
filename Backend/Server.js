const http = require("http");

const app = require("./app");

const port = process.env.PORT || 5000;
const server = http.createServer(app);

// Start the server
server.listen(port, () => {
});
