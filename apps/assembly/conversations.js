/* apps/assembly/messages*/
import {secret} from './config';
import jwt from 'jsonwebtoken';
import uuid from 'node-uuid';
const header = {'Content-Type':'application/json; charset=utf-8'};

class Conversations {

	constructor(db, server) {
		this.name = 'Conversations'

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
					let cypher = ["MATCH (conversations:CONVERSATION)",
								  "WHERE ({username} IN conversations.users)",
								  "MATCH (users:USER)",
								  "WHERE (users.username IN conversations.users)",
								  "RETURN users, conversations"].join('\n');

					db.query(cypher, {
						username: decoded.name,
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
					        	result: result
					        }));
					        console.log('/conversations/me', JSON.stringify({
					        	success:'yes',
					        	result: result
					        }));
					        return
						}
					})
				}

			})

		})

		server.post('/messages/create', (req, res, next) => {
			console.log('this is the request', req.body);
			let body = req.body;
			jwt.verify(req.header('token'), secret, (err, decoded) => {
				let cypher = ["CREATE (message:MESSAGE {created_at:{timestamp}, text:{text}, senderUN:{sender}, recipientUN:{receiver}})",
							  "CREATE (user:USER {username:{sender}})-[:SENT]->(message)",
							  "RETURN message"].join('\n');

				if(err){
					console.log(err, decoded,'You are not authorized to access this information');
					res.writeHead(403, header);
					res.end(JSON.stringify({
						err:err,
						message: 'You are not authorized to access this information'
					}))
				}
				else{
					db.query(cypher, {
						timestamp: Date.now(),
						text: body.text,
						sender: decoded.name,
						recipientUN: body.recipient,
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
						        	data: results,
					        	}));
					        console.log(JSON.stringify({
					        	success:'yes',
					        	data: results,
					        	//token: token
					        }));
					        return
						}
					});
					next();
				}
			})

		}); // end of message create


		server.get('/messages/:conversation_id', (req, res, next) => {
			jwt.verify(req.header('token'), secret, (err, decoded) => {
				if(err) {
					console.log(err, decoded);
					res.writeHead(403, header);
					res.end(JSON.stringify({
						err:err,
						message: 'You are not authorized to access this information'
					}))
				}
				else{
					let cypher = ["MATCH (:CONVERSATION {id:{id}})-[:IN]->(messages:MESSAGE)",
								  "RETURN messages ORDER BY messages.created_at desc"].join('\n');
					let conversation_id = req.params.conversation_id;
					db.query(cypher, {
						id: conversation_id
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
					        	data: result
					        }));
					        console.log(result);
					        return
						}
					})
				}

			})

		})

	}
}

export default Conversations