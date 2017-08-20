/* apps/buildfit/plan*/
import {secret} from './config';
import jwt from 'jsonwebtoken';
import uuid from 'node-uuid';
import _ from 'underscore';
const header = {'Content-Type':'application/json; charset=utf-8'};

class User {

	constructor(db, server) {
		this.name = 'User'

		// FIND LIST OF TRAINERS THAT MATCH GOALS
		server.post('/create/user/v1', (req, res, next) => {	
			let body = req.body;		
			let cypher = [ "MATCH (user:USER {uuid: {id} })",
						   "RETURN user"].join('\n');

				db.query(cypher, {
					id: body.id	//set goals variable in cypher to body.goals
				},	(err, results) => {
					if(err) {
						console.log(err);
						res.writeHead(500, header)
				        res.end(JSON.stringify({
				          success:'no',
				          err: err,
				          message:'Something went wrong logging in. Check error message to see what happened.'
				          }))
					}
					else if(results.length < 1){
						console.log('CREATING NEW USER')
						let cypher2 = ["CREATE (user:USER {uuid:{id}, name:{name} })",
										"RETURN user"].join('\n');
							db.query(cypher2, {
								id: body.id,
								name: body.name,
							}, (err, results2) => {
								if(err) {
									console.log(err);
									res.writeHead(500, header)
							        res.end(JSON.stringify({
							          success:'no',
							          err: err,
							          message:'Something went wrong logging in. Check error message to see what happened.'
							          }))
								}
								else{
									res.writeHead(200, header);
							        res.end(JSON.stringify({
								        	loggedin:'yes',
								        	results: results2
								        	//token: token
							        	}));
							        console.log(JSON.stringify({
							        	loggedin:'yes',
							        	results: results2,
							        	//token: token
							        }));
								}
							})
					}
					else{
						console.log('FOUND USER')
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
				        return
					}
				})
			})




		}

	}


export default User