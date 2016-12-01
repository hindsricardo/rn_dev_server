/* apps/assembly/accounts*/
import {secret} from './config';
import jwt from 'jsonwebtoken';
import uuid from 'node-uuid';
const header = {'Content-Type':'application/json; charset=utf-8'};



class Accounts {

	constructor(db, server) {
		this.name = 'Accounts'
		db.constraints.uniqueness.create('USER', 'username', (err, constraint) => {
		  console.log(constraint); 
		});
		server.post('/users/register', (req, res, next) => {
			let body = req.body;
			console.log('this is the req', body);
			let cypher = ["CREATE (user:USER { avatar:{avatar}, username: {username}, password: {password}, firstName: {fn}, lastName: {ln}, technologies: {technologies}, created_at: {timestamp} })",
						  "CREATE (location:LOCALE {lat: {lat}, lng: {lng}, city_long_name: {city}, state_short_name: {state}, created_at: {timestamp} })",
						  "CREATE (user)-[:LOCATION { username: {username}, created_at: {timestamp} }]->(location) ",
						  "RETURN user, location"].join('\n');

			var token = jwt.sign({
				name: body.username,
				admin:'no'
			}, secret);
			db.query(cypher, {
				avatar:body.avatar,
				username: body.username, 
				password: body.password, 
				fn: body.firstName, 
				ln: body.lastName, 
				technologies: body.technologies, 
				lat: body.location.lat,
				lng: body.location.lng,
				city: body.location.city.long_name,
				state: body.location.state.short_name,
				timestamp: Date.now()
			}, (err, results) => {
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
				        	success:'yes',
				        	user: results[0].user,
				        	location: results[0].location, 
				        	message:'Successful Registration',
				        	token: token
			        	}));
			        console.log(JSON.stringify({
			        	success:'yes',
			        	user: results[0].user,
			        	location: results[0].location,
			        	message:'Successful Registration',
			        	//token: token
			        }));
			        return
				}
			});
			next();
		});

		server.post('/users/login', (req, res, next) => {
			let body = req.body;
			console.log('this is the req', body);
			let cypher = [ "MATCH (user:USER { username: {matchName}, password: {pw} })",
						"MATCH user-[:LOCATION {username:{matchName}}]->location",
			 			"RETURN user, location",
			 			"ORDER BY location.created_at desc LIMIT 1"].join('\n'); 

			var token = jwt.sign({
				name: body.username,
				admin:'no'
			}, secret);
			db.query(cypher, { 
				matchName: body.username,
				pw: body.password,
				username: body.username
			},  (err, results) => {
				if(err) {
					console.log(err);
					res.writeHead(500, header)
			        res.end(JSON.stringify({
			          success:'no',
			          err: err,
			          message:'Something went wrong logging in. Check error message to see what happened.'
			          }))
				}
				else if(results.length == 0) {
					console.log('username or password cannot be found');
					res.writeHead(401, header);
					res.end(JSON.stringify({
						success:'no',
						data: results,
						message: 'username or password cannot be found'
					}))
				}
				else{
					res.writeHead(200, header);
			        res.end(JSON.stringify({
				        	success:'yes',
				        	user: results[0].user,
				        	location: results[0].location,
				        	message:'Successful Login',
				        	token: token
			        	}));
			        console.log(JSON.stringify({
			        	success:'yes',
			        	user: results[0].user,
			        	location: results[0].location,
			        	message:'Successful Login',
			        	token: token
			        }));
			        return
				}
			});
			next();
		})

		server.get('/users/me', (req, res, next) => {
			console.log('this is the req', req.header('token'));
			jwt.verify(req.header['token'], secret, (err, decoded) => {
				if(err) {
					console.log(err, decoded);
					res.writeHead(403, header);
					res.end(JSON.stringify({
						err:err,
						message: 'You are not authorized to access this information'
					}))
				}
				else{
					db.find( { username: decoded.name }, 'USER', (err, result) => {
						if(err) {
							console.log(err);
							res.writeHead(500, header);
							res.end(JSON.stringify({
								err:err,
								message: 'Something went wrong. Please try again'
							}))
						}
						else {
							res.writeHead(200, header);
					        res.end(JSON.stringify(result));
					        console.log(result);
					        return
						}
					})
				}

			})

		})


		server.post('/users/lookup', (req, res, next) => {
			console.log('this is the req', req.header('token'), req.body.users);
			let users = req.body.users;
			let  cypher = ["MATCH (users:USER)",
						   "WHERE (users.username IN {userIDs})",
						   "RETURN users"].join('\n');
			jwt.verify(req.headers.token, secret, (err, decoded) => {
				if(err) {
					console.log(err, decoded);
					res.writeHead(403, header);
					res.end(JSON.stringify({
						err:err,
						message: 'You are not authorized to access this information'
					}))
				}
				else{
					console.log(err, decoded);
					db.query(cypher, {
						userIDs: users
					}, (err, result) => {
						if(err) {
							console.log(err);
							res.writeHead(500, header);
							res.end(JSON.stringify({
								err:err,
								message: 'Something went wrong. Please try again'
							}))
						}
						else {
							res.writeHead(200, header);
					        res.end(JSON.stringify({
					        	success:'yes',
					        	result: result,
					        }));
					        console.log('/users/lookup', JSON.stringify({
						        	success:'yes',
						        	result: result,
					        	})
					        );
					        return
						}
					})
				}

			})

		})

		server.get('/users/googleplaceskey', (req, res, next) => {
			res.writeHead(200, header);
			res.end(JSON.stringify("AIzaSyDfH32XIetG7wOWSTbtHwLp_7q-TJIY1jg"));
			return
		})

		server.on('request', (req, res, next) => {
            console.log('Request incoming');
            
        });
	}
};

export default Accounts;