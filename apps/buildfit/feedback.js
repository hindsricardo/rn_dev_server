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
			console.log(body);		

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
						let cypher = [ "MATCH (user:USER {uuid: {user} }), (set:SetFeedback {planUUID: {planuuid}, stopTime: {stopTime} })",
										"CREATE (user)-[relate:COMPLETED]->(set)",
						   				"RETURN user, set, relate" ].join('\n');
						db.query(cypher, {
							user: body.user,
							planuuid: results.planUUID,
							stopTime: results.stopTime
						}, (err, tings) => {
							if(err) {
								console.log(err);
								res.writeHead(500, header)
						        res.end(JSON.stringify({
						          success:'no',
						          err: err,
						          message:'Something went wrong'
						          }))
							}
							else{
								res.writeHead(200, header);
						        res.end(JSON.stringify({
							        	results: results
							        	//token: token
						        	}));
						        console.log(JSON.stringify({
						        	results: results,
						        	tings: tings
						        	//token: token
						        }));
							}
						})
					}
				})
			}) // END OF RECORD SET




		}

	}


export default Feedback