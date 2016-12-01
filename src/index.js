import http from 'http';
import restify from 'restify';
import {parse} from 'url';
import seraph from 'seraph';
import Accounts from '../apps/assembly/accounts';
import Messages from '../apps/assembly/messages';
import Conversations from '../apps/assembly/conversations';

const port = 3000;


class Server {
	constructor() {
		//console.log('this is the accounts', Accounts);
		if (process.env.GRAPHENEDB_URL !== undefined) {
		  let url = parse(process.env.GRAPHENEDB_URL);
		  this.db = seraph({
		    server: url.protocol + '//' + url.host,
		    user: url.auth.split(':')[0],
		    pass: url.auth.split(':')[1]});
		}
		else{
		  this.db = seraph({
		    user: "neo4j",
		    pass: "Car81you"
		    });
		}

		this.server = restify.createServer();
		this.server.use(restify.acceptParser(this.server.acceptable));
		this.server.use(restify.queryParser());
		this.server.use(restify.bodyParser());
		this.server.use((req, res, next) => {
		    res.header('Access-Control-Allow-Origin', "*");
		    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		    res.header('Access-Control-Allow-Headers', 'Content-Type');
		    next();
		});

		this.server.listen(process.env.PORT || port, () => {
		    console.log("Server started @ ", process.env.PORT || port);
		});
		this.accountsRouter = new Accounts(this.db, this.server);
		this.messagesRouter = new Messages(this.db, this.server);
		this.conversationsRouter = new Conversations(this.db, this.server);


	}
}


new Server();
