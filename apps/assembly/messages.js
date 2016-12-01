/* apps/assembly/messages*/
import {secret} from './config';
import jwt from 'jsonwebtoken';
import uuid from 'node-uuid';
const header = {'Content-Type':'application/json; charset=utf-8'};

class Messages {

	constructor(db, server) {
		this.name = 'Messages'

		server.get('/messages/conversations', (req, res, next) => {
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
					let cypher = ["MATCH (conversations:CONVERSATION)",
								  "WHERE ({user} in conversations.users)",
								  "RETURN conversations ORDER BY n.lastMessageDate desc"].join('\n');
					db.query(cypher, {
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

		server.post('/messages/create', (req, res, next) => {
			console.log('this is the request', req.body);
			let body = req.body;
			jwt.verify(req.header('token'), secret, (err, decoded) => {
				let cypher = ["MATCH (sender:USER {username:{sender}})",
							  "MATCH (receiver:USER {username:{receiver}})",
							  "CREATE (message:MESSAGE {created_at:{timestamp}, text:{text}, senderUN:{sender}, recipientUN:{receiver} })",
							  "CREATE (sender)-[:SENT]->(message)",
							  "CREATE (receiver)<-[:RECEIVED]-(message)",
							  "CREATE (conversation:CONVERSATION {users:{users},created_at:{timestamp}, lastMessageDate:{timestamp},lastMessageText:{text}})",
							  "CREATE (message)-[:IN]->(conversation)",
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
						receiver: body.recipient,
						users: body.recipient.splice(0,0,decoded.name)
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

	}
}

export default Messages