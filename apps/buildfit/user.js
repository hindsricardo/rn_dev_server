/* apps/buildfit/plan*/
import {secret} from './config';
import jwt from 'jsonwebtoken';
import _ from 'underscore';
const nodemailer = require('nodemailer');
const header = {'Content-Type':'application/json; charset=utf-8'};
var lowerCase = require('lower-case');
var stripe = require("stripe")(
  "sk_test_jjMsr7JRvBqis3InsnqaKJSx"
	);

const log = require('simple-node-logger').createSimpleLogger('node-error.log');




class User {

	constructor(db, server) {
		this.name = 'User';

		//UPDATE GENDER
		server.post('/bf/update/user/gender', (req, res, next) => {
			let body = req.body;
			db.run("MATCH (user:USER {uuid: $id }) SET user.gender = $gender RETURN user",{
				id: body.userid,
				gender: body.gender
			})
			.then((results) => {
				results = results.records;
				db.close()
				res.writeHead(200, header);
		        res.end(JSON.stringify({
			        	results: results,
		        	}));
		        console.log(JSON.stringify({
		        	results: results,
		        }));
		        return
			})
		})

		//UPDATE GOAL
		server.post('/bf/update/user/goal', (req, res, next) => {
			let body = req.body;
			db.run("MATCH (user:USER {uuid: $id }) SET user.goal = $goal RETURN user",{
				id: body.userid,
				goal: body.goal
			})
			.then((results) => {
				results = results.records;
				db.close()
				res.writeHead(200, header);
		        res.end(JSON.stringify({
			        	results: results,
		        	}));
		        console.log(JSON.stringify({
		        	results: results,
		        }));
		        return
			})
		})

		//Return Strip accounts
		server.post('/bf/urfittrainer/get/trainer/stripe/account', (req, res, next) => {
			let body = req.body;
			stripe.accounts.retrieve(
			  body.id,
			  function(err, account) {
			    // asynchronously called
					if(err){
						res.writeHead(500, header);
						res.end(JSON.stringify({
								status:'error',
								results: err,
							}));
						console.log(JSON.stringify({
							results: err,
						}));
					}
					else{
						res.writeHead(200, header);
		        res.end(JSON.stringify({
								status: 'success',
			        	results: account,
		        	}));
		        console.log(JSON.stringify({
		        	results: account,
		        }));
		        return
					}
			  }
			);
		})

		//Register a new Trainer
		server.post('/bf/urfittrainer/add/trainer', (req, res, next) => {
			let body = req.body;
			stripe.accounts.create({
			  type: 'custom',
			  country: body.country,
			  email: body.email,
				legal_entity: {
					first_name: body.fname,
					last_name: body.lname,
					type:'individual'
				},
				tos_acceptance: {
					date: Math.floor(Date.now() / 1000),
					ip: req.connection.remoteAddress
				}
			}, (err, account) => {
			  // asynchronously called
				if(err){
					res.writeHead(500, header);
					res.end(JSON.stringify({
							results: err,
						}));
					console.log(JSON.stringify({
						results: err,
					}));
				}

					db.run("CREATE (user:TRAINER {uuid:$id, fname: $fname, lname: $lname, email: $email, tos_acceptance: $tos_acceptance}) RETURN user", {
						id: account.id,
						fname: body.fname,
						lname: body.lname,
						email: body.email,
						tos_acceptance: Math.floor(Date.now() / 1000)
					})
					.then((trainer)=> {
						trainer = trainer.records;
						db.close();
						res.writeHead(200, header);
		        res.end(JSON.stringify({
			        	results: trainer[0]._fields[0].properties,
								strip_info: account,
		        	}));
		        console.log(JSON.stringify({
		        	results: trainer[0]._fields[0].properties,
							strip_info: account,
		        }));
		        return
					})
					.catch((err) => {
						res.writeHead(500, header);
						res.end(JSON.stringify({
								results: err,
							}));
						console.log(JSON.stringify({
							results: err,
						}));
					})
			});
		})


		//Get Trainer
		server.post('/bf/urfittrainer/get/trainer', (req, res, next) => {
			let body = req.body;

			db.run("MATCH (user:TRAINER {uuid:$id}) RETURN user", {
				id: body.id,
			})
			.then((trainer)=> {
				trainer = trainer.records;
				db.close();
				res.writeHead(200, header);
				res.end(JSON.stringify({
						results: trainer[0]._fields[0].properties,
					}));
				console.log(JSON.stringify({
					results: trainer[0]._fields[0].properties,
				}));
				return
			})
			.catch((err) => {
				res.writeHead(500, header);
				res.end(JSON.stringify({
						results: err,
					}));
				console.log(JSON.stringify({
					results: err,
				}));
			})
		})


		// LOGIN / USER CREATION URFIT
		server.post('/create/user/v1', (req, res, next) => {
			let body = req.body;
			db.run("MATCH (n:SENDGRIDPK) RETURN n",{})
			.then((results) =>{
					db.close();

				let smtpConfig = {
				    host: 'smtp.sendgrid.net',
					    port: 587,
					    secure: false, // upgrade later with STARTTLS
					    auth: {
					        user: 'apikey',
					        pass: results.records[0]._fields[0].properties.key
					    }
				};
				let transporter = nodemailer.createTransport(smtpConfig);
				let cypher = "MATCH (user:USER {uuid: $id }) RETURN user";


						let cypher2 = "MATCH (user:USER {email:$email }) RETURN user";
							db.run(cypher2, {
								email: lowerCase(body.email)
							}).then((results2) => {
								results2 = results2.records;
								db.close();
								var encryptedString = body.password;
								if(results2.length == 0){
									let cypher3 = "CREATE (user:USER {uuid:$id, email:$email, password: $password }) RETURN user";
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
										        	results: results3,
										        	message: 'ACCOUNT CREATED'
										        	//token: token
									        	}));
									        console.log(JSON.stringify({
									        	loggedin:'yes',
									        	results: results3,
									        	message: 'ACCOUNT CREATED'
									        	//token: token
									        }));
									        return
									})
									.catch((err)=>{
										log.error(err, ' /create/user/v1');// log to error file
										console.log(err);
										res.writeHead(500, header)
								        res.end(JSON.stringify({
								         loggedin:'no',
								          success:'no',
								          err: err,
								          message:'Something went wrong logging in. Check error message to see what happened.'
								          }))
									});
								}
								else{
									var decryptedString = results2[0]._fields[0].properties.password;
									if(decryptedString == body.password){
										console.log('FOUND USER')
										res.writeHead(200, header);
								        res.end(JSON.stringify({
									        	loggedin:'yes',
									        	results: results2,
									        	message: 'FOUND YOU!'
									        	//token: token
								        	}));
								        console.log(JSON.stringify({
								        	loggedin:'yes',
								        	results: results2,
								        	message: 'FOUND YOU!'
								        	//token: token
								        }));
				        				return
									}
									else{
										let mailOptions = {
									        from: '" Build Method Fitness " <help@buildmethodfitness.com>', // sender address
									        to: body.email, // list of receivers
									        subject: 'Password Recovery ✔', // Subject line
									        text: 'Your Build Method Fitness password is: '+results2[0]._fields[0].properties.password, // plain text body
									        html: '<b>our Build Method Fitness password is:' +results2[0]._fields[0].properties.password + '</b>' // html body
									    };

								    transporter.sendMail(mailOptions, (error, info) => {
								    	log.error(error, ' /sendpassword/user/v1 ');// log to error file
								        if (error) {
								            return console.log(error);
								            console.log('INCORRECT PASSWORD')
											res.writeHead(200, header);
									        res.end(JSON.stringify({
										        	loggedin:'no',
										        	results: results2,
										        	message: 'INCORRECT PASSWORD. PLEASE TRY AGAIN'
										        	//token: token
									        	}));
									        console.log(JSON.stringify({
									        	loggedin:'no',
									        	results: results2,
									        	message: 'INCORRECT PASSWORD. PLEASE TRY AGAIN'
									        	//token: token
									        }));
									        return
								        }
								        else{
									        console.log('INCORRECT PASSWORD')
											res.writeHead(200, header);
									        res.end(JSON.stringify({
										        	loggedin:'no',
										        	results: results2,
										        	message: 'INCORRECT PASSWORD. PASSWORD HAS BEEN SET TO '+body.email
										        	//token: token
									        	}));
									        console.log(JSON.stringify({
									        	loggedin:'no',
									        	results: results2,
									        	message: 'INCORRECT PASSWORD. PASSWORD HAS BEEN SET TO '+body.email
									        	//token: token
									        }));
									        return
								        }
								        console.log('Message sent: %s', info.messageId);


								    });

									}
								}


							})
							.catch((err)=>{
								log.error(err);// log to error file
								console.log(err);
								res.writeHead(500, header)
						        res.end(JSON.stringify({
						          success:'no',
						          err: err,
						          message:'Something went wrong logging in. Check error message to see what happened.'
						          }))
							});

						})


			})

				// SEND PASSWORD
		server.post('/sendpassword/user/v1', (req, res, next) => {
			let body = req.body;
			db.run("MATCH (n:SENDGRIDPK) RETURN n",{})
			.then((results) =>{
				db.close();

			let smtpConfig = {
			    host: 'smtp.sendgrid.net',
				    port: 587,
				    secure: false, // upgrade later with STARTTLS
				    auth: {
				        user: 'apikey',
				        pass: results.records[0]._fields[0].properties.key
				    }
			};
			let transporter = nodemailer.createTransport(smtpConfig);


						let cypher2 = "MATCH (user:USER {email:$email }) RETURN user";
							db.run(cypher2, {
								email: lowerCase(body.email)
							}).then((results2) => {
								results2 = results2.records;
								db.close();
								var encryptedString = body.password;
								if(results2.length > 0){
									let mailOptions = {
								        from: '" Build Method Fitness " <help@buildmethodfitness.com>', // sender address
								        to: body.email, // list of receivers
								        subject: 'Password Recovery ✔', // Subject line
								        text: 'Your Build Method Fitness password is: '+results2[0]._fields[0].properties.password, // plain text body
								        html: '<b>our Build Method Fitness password is:' +results2[0]._fields[0].properties.password + '</b>' // html body
								    };

								    transporter.sendMail(mailOptions, (error, info) => {
								    	log.error(error, ' /sendpassword/user/v1 ');// log to error file
								        if (error) {
								            return console.log(error);
								        }
								        console.log('Message sent: %s', info.messageId);
								    });

								}
								res.writeHead(200, header);
						        res.end(JSON.stringify({
							        	results: results2
							        	//token: token
						        	}));
						        console.log('/sendpassword/user/v1', JSON.stringify({
						        	results: results2,
						        	//token: token
						        }));
						        return

							})
							.catch((err)=>{
								log.error(err, ' /sendpassword/user/v1 ');// log to error file
								console.log(err);
								res.writeHead(500, header)
						        res.end(JSON.stringify({
						          success:'no',
						          err: err,
						          message:'Something went wrong logging in. Check error message to see what happened.'
						          }))
							});

				})


			})




		}

	}


export default User
