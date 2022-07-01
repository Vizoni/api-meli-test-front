require("dotenv").config();

const express = require('express');
const routes = require('./routes');
const cors = require('cors')

const port = process.env.PORT || 3000;
const app = express();

const middleWareCors = (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Methods", "GET, OPTIONS")
	res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept")
	app.use(cors())
	next()
}
app.use(middleWareCors)
app.use(express.json())
app.use(routes);


app.listen(port, () => console.log(`Server running on port ${port}`));
