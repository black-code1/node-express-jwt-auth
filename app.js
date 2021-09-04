const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require('cookie-parser')

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser())

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI = "mongodb://localhost:27017/node-auth";
mongoose
	.connect(dbURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then((result) => app.listen(3000))
	.catch((err) => console.log(err));

// routes
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", (req, res) => res.render("smoothies"));

// cookies
app.get('/set-cookies', (req, res) => {
	//res.setHeader('Set-Cookie', 'newUser=true');

	//name->value
	res.cookie('newUser', false)

	//cookie send if secure that is https secure: true or httpOnly:true
	res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true })

	res.send('you got the cookie!')
})

app.get('/read-cookies', (req, res) => {
	const cookies = req.cookies
	console.log(cookies)

	res.json(cookies.newUser)
})
app.use(authRoutes);
