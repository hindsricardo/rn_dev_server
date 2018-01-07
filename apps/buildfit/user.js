/* apps/buildfit/plan*/
import {secret} from './config';
import jwt from 'jsonwebtoken';
import _ from 'underscore';
const nodemailer = require('nodemailer');
const header = {'Content-Type':'application/json; charset=utf-8'};
var lowerCase = require('lower-case')



class User {

	constructor(db, server) {
		this.name = 'User'; 

		// FIND LIST OF TRAINERS THAT MATCH GOALS
		server.post('/create/user/v1', (req, res, next) => {	
			let body = req.body;		
			let cypher = "MATCH (user:USER {uuid: $id }) RETURN user";

				
						let cypher2 = "MATCH (user:USER {email:$email }) RETURN user";
							db.run(cypher2, {
								email: lowerCase(body.email)
							}).then((results2) => {
								results2 = results2.records;
								db.close();
								var encryptedString = body.password;
								if(results2.length < 1){
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

				// FIND LIST OF TRAINERS THAT MATCH GOALS
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



