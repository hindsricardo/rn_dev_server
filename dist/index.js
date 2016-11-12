'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _restify = require('restify');

var _restify2 = _interopRequireDefault(_restify);

var _url = require('url');

var _seraph = require('seraph');

var _seraph2 = _interopRequireDefault(_seraph);

var _accounts = require('../apps/assembly/accounts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var port = 3000;

var Server = function Server() {
	_classCallCheck(this, Server);

	if (process.env.GRAPHENEDB_URL !== undefined) {
		var url = (0, _url.parse)(process.env.GRAPHENEDB_URL);
		this.db = (0, _seraph2.default)({
			server: url.protocol + '//' + url.host,
			user: url.auth.split(':')[0],
			pass: url.auth.split(':')[1] });
	} else {
		this.db = (0, _seraph2.default)({
			user: "local",
			pass: "test"
		});
	}

	this.server = _restify2.default.createServer();
	this.server.use(_restify2.default.acceptParser(server.acceptable));
	this.server.use(_restify2.default.queryParser());
	this.server.use(_restify2.default.bodyParser());
	this.server.use(function (req, res, next) {
		res.header('Access-Control-Allow-Origin', "*");
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header('Access-Control-Allow-Headers', 'Content-Type');
		next();
	});

	this.server.listen(process.env.PORT || port, function () {
		console.log("Server started @ ", process.env.PORT || port);
	});
	this.accounts = new _accounts.Accounts(this.db, this.server);
};

new Server();