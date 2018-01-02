'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _restify = require('restify');

var _restify2 = _interopRequireDefault(_restify);

var _url = require('url');

var _seraph = require('seraph');

var _seraph2 = _interopRequireDefault(_seraph);

var _messages = require('../apps/assembly/messages');

var _messages2 = _interopRequireDefault(_messages);

var _conversations = require('../apps/assembly/conversations');

var _conversations2 = _interopRequireDefault(_conversations);

var _plan = require('../apps/buildfit/plan');

var _plan2 = _interopRequireDefault(_plan);

var _user = require('../apps/buildfit/user');

var _user2 = _interopRequireDefault(_user);

var _feedback = require('../apps/buildfit/feedback');

var _feedback2 = _interopRequireDefault(_feedback);

var _analytics = require('../apps/buildfit/analytics');

var _analytics2 = _interopRequireDefault(_analytics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var neo4j = require('neo4j-driver').v1;

var port = 3001;

var Server = function Server() {
	_classCallCheck(this, Server);

	if (process.env.GRAPHENEDB_URL !== undefined) {
		var url = (0, _url.parse)(process.env.GRAPHENEDB_URL);
		this.db = (0, _seraph2.default)({
			server: url.protocol + '//' + url.host,
			user: url.auth.split(':')[0],
			pass: url.auth.split(':')[1] });
	} else {
		var driver = neo4j.driver("bolt://ec2-54-67-83-66.us-west-1.compute.amazonaws.com:7687", neo4j.auth.basic("neo4j", "Hin81you!"));

		this.db = driver.session();
	}

	this.server = _restify2.default.createServer();
	this.server.use(_restify2.default.plugins.acceptParser(this.server.acceptable));
	this.server.use(_restify2.default.plugins.queryParser());
	this.server.use(_restify2.default.plugins.bodyParser());
	this.server.use(function (req, res, next) {
		res.header('Access-Control-Allow-Origin', "*");
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header('Access-Control-Allow-Headers', 'Content-Type');
		next();
	});

	this.server.listen(process.env.PORT || port, function () {
		console.log("Server started @ ", process.env.PORT || port);
	});
	this.messagesRouter = new _messages2.default(this.db, this.server);
	this.conversationsRouter = new _conversations2.default(this.db, this.server);
	this.planRouter = new _plan2.default(this.db, this.server);
	this.userRouter = new _user2.default(this.db, this.server);
	this.feedbackRouter = new _feedback2.default(this.db, this.server);
	this.analyticsRouter = new _analytics2.default(this.db, this.server);
};

new Server();