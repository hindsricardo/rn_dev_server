/* apps/buildfit/plan*/
import {secret} from './config';
import jwt from 'jsonwebtoken';
import _ from 'underscore';
const header = {'Content-Type':'application/json; charset=utf-8'};
var lowerCase = require('lower-case')



class User {

	constructor(db, server) {
		this.name = 'User'; 

		// FIND LIST OF TRAINERS THAT MATCH GOALS
		server.post('/create/user/v1', (req, res, next) => {	
			let body = req.body;		
			let cypher = "MATCH (user:USER {uuid: $id }) RETURN user";

				
						let cypher2 = ["MATCH (user:USER {email:$email })",
										"RETURN user"].join('\n');
							db.run(cypher2, {
								email: lowerCase(body.email)
							}).then((results2) => {
								results2 = results2.records;
								db.close();
								var encryptedString = body.password;
								if(results2.length < 1){
									let cypher3 = ["CREATE (user:USER {uuid:$id, email:$email, password: $password })",
										"RETURN user"].join('\n');
									db.run(cypher3, {
										id: body.id,
										email: lowerCase(body.email),
										password: encryptedString
									})
									.then((results3) => {
										db.close();
										console.log('CREATED USER')
										results3 = results3.records;
											res.writeHead(200, header);
									        res.end(JSON.stringify({
										        	loggedin:'yes',
										        	results: results3
										        	//token: token
									        	}));
									        console.log(JSON.stringify({
									        	loggedin:'yes',
									        	results: results3,
									        	//token: token
									        }));
									        return
									})
									.catch((err)=>{
										console.log(err);
										res.writeHead(500, header)
								        res.end(JSON.stringify({
								          success:'no',
								          err: err,
								          message:'Something went wrong logging in. Check error message to see what happened.'
								          }))
									});
								}
								else{
									var decryptedString = results2[0]._fields[0].properties.password;
									if(decryptedString === body.password){
										console.log('FOUND USER')
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
				        				return
									}
									else{
										console.log('INCORRECT PASSWORD')
										res.writeHead(200, header);
								        res.end(JSON.stringify({
									        	loggedin:'no',
									        	results: results2
									        	//token: token
								        	}));
								        console.log(JSON.stringify({
								        	loggedin:'yes',
								        	results: results2,
								        	//token: token
								        }));
								        return
									}
								}
																	

							})
							.catch((err)=>{
								console.log(err);
								res.writeHead(500, header)
						        res.end(JSON.stringify({
						          success:'no',
						          err: err,
						          message:'Something went wrong logging in. Check error message to see what happened.'
						          }))
							});
						
	
			})




		}

	}


export default User



