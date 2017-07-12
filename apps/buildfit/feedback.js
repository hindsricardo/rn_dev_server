/* apps/buildfit/plan*/
import {secret} from './config';
import jwt from 'jsonwebtoken';
import uuid from 'node-uuid';
import _ from 'underscore';
const header = {'Content-Type':'application/json; charset=utf-8'};

class Feedback {

	constructor(db, server) {
		this.name = 'Feedback'

		// RECORD SET
		server.post('/bf/feedback/set/v1', (req, res, next) => {	
			let body = req.body;		

				db.save(body.set,'SetFeedback', (err, results) => {
					if(err) {
						console.log(err);
						res.writeHead(500, header)
				        res.end(JSON.stringify({
				          success:'no',
				          err: err,
				          message:'Something went wrong'
				          }))
					}
					else {
						
						res.writeHead(200, header);
				        res.end(JSON.stringify({
					        	loggedin:'yes',
					        	results: results
					        	//token: token
				        	}));
				        console.log(JSON.stringify({
				        	loggedin:'yes',
				        	results: results,
				        	//token: token
				        }));
					}

				})
			}) // END OF RECORD SET




		}

	}


export default Feedback