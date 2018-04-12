import http from 'http';
import restify from 'restify';
import {parse} from 'url';
import seraph from 'seraph';
import Conversations from '../apps/assembly/conversations';
import Plan from '../apps/buildfit/plan';
import User from '../apps/buildfit/user';
import Feedback from '../apps/buildfit/feedback';
import Analytics from '../apps/buildfit/analytics';
var neo4j = require('neo4j-driver').v1;




const port = 3001;


class Server {
	constructor() {
		if (process.env.GRAPHENEDB_URL !== undefined) {
		  let url = parse(process.env.GRAPHENEDB_URL);
		  this.db = seraph({
		    server: url.protocol + '//' + url.host,
		    user: url.auth.split(':')[0],
		    pass: url.auth.split(':')[1]});
		}
		else{
			var driver = neo4j.driver("bolt://ec2-54-67-83-66.us-west-1.compute.amazonaws.com:7687", neo4j.auth.basic("neo4j", "Hin81you!"));

		  this.db = driver.session();
		}

		this.server = restify.createServer();
		this.server.use(restify.plugins.acceptParser(this.server.acceptable));
		this.server.use(restify.plugins.queryParser());
		this.server.use(restify.plugins.bodyParser());
		this.server.use((req, res, next) => {
		    res.header('Access-Control-Allow-Origin', "*");
		    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		    res.header('Access-Control-Allow-Headers', 'Content-Type');
		    next();
		});

		this.server.listen(process.env.PORT || port, () => {
		    console.log("Server started @ ", process.env.PORT || port);
		});
		this.conversationsRouter = new Conversations(this.db, this.server);
		this.planRouter = new Plan(this.db, this.server);
		this.userRouter = new User(this.db, this.server);
		this.feedbackRouter = new Feedback(this.db, this.server);
		this.analyticsRouter = new Analytics(this.db, this.server);


	}
}


new Server();
