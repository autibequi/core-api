'use strict';

// Vendor Libs
const http = require('http');
const express = require('express');
const { check, validationResult } = require('express-validator/check');
const axios = require('axios')
var compression = require('compression')

// Custom Libs
const db = require('./database');
const logRequest = require('./log');
const session = require('./session');
const crypto = require('./crypto');
const config = require('./config');

// Create server instance
let app = express();
app.use(express.json());
app.server = http.createServer(app);
app.use(compression())

// Config Axios
const axiosClient = axios.create({
	baseURL: config.MEDIASTREAM_ENDPOINT,
	headers: { 'X-API-Token': config.MEDIASTREAM_TOKEN },
});

// Token Endpoint
app.post('/auth', [
	check('email').isEmail(),
	check('password').isLength({ min: 5 }),
], function (req, res) {
	
	// Validate Request
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}

	// Generate password hash based on request
	db.User.findOne({
			where: { email: req.body.email },
			include: [{ 
				model: db.Token,
				required: false,
				as: "Token",
			}],
		})
		.tap(user => crypto.checkPassword(user.get('password'), req.body.password))
		.then(user => user.get('Token') || crypto.createToken(user))
		.then(token => { res.status(200).json({ token: token.get('key') }) })
		.catch(err => { res.status(500).json({ msg: "error", err }) });
});

// Get Mediastream Token
app.post('/token', [
	check('type').isLength({ min: 3 }),
	check('id').isLength({ min: 5 }),
], function (req, res) {

	// Validate Request
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}

	// Unescessary var Creation
	const token = req.get("Authorization");
	const type = req.body.type;
	const id = req.body.id;

	db.Token.findOne({
			where: { key: token },
			include: [{ model: db.User }],
		})
		.then(token => session.checkStreamingPermission(token))
		.then(() => axiosClient.post('/access/issue', { type, id }))
		.tap(response => res.status(200).json({token: response.data.access_token}))
		.then(response => logRequest(response.data))
		.catch(err => res.status(500).json({ msg: 'Erro 500` generico', err }));
})

// Start Server
app.server.listen(process.env.PORT || config.port, () => {
	console.log(`Started on port ${app.server.address().port}`);
});
