/* apps/buildfit/plan*/
import {secret} from './config';
import jwt from 'jsonwebtoken';
import uuid from 'node-uuid';
const header = {'Content-Type':'application/json; charset=utf-8'};

class Conversations {

	constructor(db, server) {
		this.name = 'Plan'

		server.get('/conversations/me', (req, res, next) => {
			console.log(req.headers.token);
			jwt.verify(req.headers.token, secret, (err, decoded) => {
				if(err) {
					console.log(err, decoded);
					res.writeHead(500, header);
					res.end(JSON.stringify({
						err:err,
						message: 'You are not authorized to access this information'
					}))
				}
				else{
					let cypher1 = ["MATCH (conversations:CONVERSATION)",
								  "WHERE ({username} IN conversations.users)",
								  "RETURN conversations"].join('\n');

					db.query(cypher1, {
						username: decoded.name
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
							let userlist = [];
							console.log(result);
							for(var x=0; x < result.length; x++){
								let convo = result[x];
								for(var n = 0; n < convo.users.length; n++){
									userlist.push(convo.users[n]);
								}
							}
							console.log(userlist)
							let cypher2 = ["MATCH (users:USER)",
								  "WHERE (users.username IN {convoUsers})",
								  "RETURN users"].join('\n');
							db.query(cypher2, {
								convoUsers: userlist
							}, (err, data) =>{
								if(err) {
									console.log(err);
									res.writeHead(500, header);
									res.end(JSON.stringify({
										err:err,
										message: 'Something went wrong. Please try again'
									}))
								}
								else{
									res.writeHead(200, header);
							        res.end(JSON.stringify({
							        	success:'yes',
							        	conversations: result,
							        	users: data
							        }));
							        console.log('/conversations/me', JSON.stringify({
							        	success:'yes',
							        	conversations: result,
							        	users: data
							        }));
							        return
								}
							})
						}
					})
				}

			})

		})

		server.post('/create/messages', (req, res, next) => {
			console.log('this is the request', req.body);
			let body = req.body;
			jwt.verify(req.headers.token, secret, (err, decoded) => {
				let cypher = ["MATCH (convo:CONVERSATION)",
				"WHERE ({senderUN} in convo.users) and ({recipientUN} in convo.users)",
				"MATCH (user1:USER {username:{senderUN}})",
				"MATCH (user2:USER {username:{recipientUN}})",
				"SET convo.lastMessageText = {text}",
				"SET convo.lastMessageDate = {created}",
				"CREATE (message:MESSAGE {created_at:{created}, senderUN:{senderUN}, recipientUN:{recipientUN}, text:{text} })", 
				"CREATE (convo)-[:HAS]->(message)",
				"CREATE (user1)-[:SENT]->(message)-[:RECEIVED]->(user2)",
				"RETURN message"].join('\n');
				if(err) {
					console.log(err, decoded);
					res.writeHead(500, header);
					res.end(JSON.stringify({
						err:err,
						message: 'You are not authorized to access this information'
					}))
				}
				else{
					db.query(cypher, {
						senderUN: body.senderUN,
						recipientUN:body.recipientUN,
						text: body.text,
						created: body.created_at
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
						        	message: results,
					        	}));
					        console.log(JSON.stringify({
					        	success:'yes',
					        	message: results,
					        	//token: token
					        }));
					        return
						}
					});
					next();
				}
			})

		}); // end of message create


		server.post('/conversation/messages', (req, res, next) => {
			console.log('this is the request', req.body);
			let body = req.body;
			jwt.verify(req.headers.token, secret, (err, decoded) => {
				let cypher = ["MATCH (messages:MESSAGE)", 
				"WHERE (messages.recipientUN = {id1}) and (messages.senderUN = {id2}) or (messages.recipientUN = {id2}) and (messages.senderUN = {id1})",
				"RETURN messages",
				"ORDER BY messages.created_at desc",
				"LIMIT 25"].join('\n');
				if(err) {
					console.log(err, decoded);
					res.writeHead(500, header);
					res.end(JSON.stringify({
						err:err,
						message: 'You are not authorized to access this information'
					}))
				}
				else{
					db.query(cypher, {
						id1: body.id1,
						id2: body.id2
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
						        	messages: results,
					        	}));
					        console.log(JSON.stringify({
					        	success:'yes',
					        	messages: results,
					        	//token: token
					        }));
					        return
						}
					});
					next();
				}
			})

		})

	}
}

export default Conversations