const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = 8000;
const app = express();

const User = require("./models/User");
mongoose.connect("mongodb://localhost/userData", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});
app.use(bodyParser.json());
function sendResponse(res, err, data) {
	if (err) {
		res.json({
			success: false,
			message: err,
		});
	} else if (!data) {
		res.json({
			success: false,
			message: "Not Found",
		});
	} else {
		res.json({
			success: true,
			data: data,
		});
	}
}
// CREATE
app.post("/users", (req, res) => {
	User.create({ ...req.body.newData }, (err, data) => {
		sendResponse(res, err, data);
	});
});
app
	.route("/users/:id")
	.get((req, res) => {
		User.findById(req.params.id, (err, data) => {
			sendResponse(res, err, data);
		});
	})
	.put((req, res) => {
		User.findByIdAndUpdate(
			req.params.id,
			{
				name: req.body.newData.name,
				email: req.body.newData.email,
				password: req.body.newData.password,
			},
			{ new: true },
			(err, data) => {
				sendResponse(res, err, data);
			}
		);
	})
	.delete((req, res) => {
		User.findByIdAndDelete(req.params.id, (err, data) => {
			sendResponse(res, err, data);
		});
	});
app.listen(port, () => {
	console.log(`server is listening on port:${port}`);
});
