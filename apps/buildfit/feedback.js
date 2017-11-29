/* apps/buildfit/plan*/
import {secret} from './config';
import jwt from 'jsonwebtoken';
import uuid from 'node-uuid';
import _ from 'underscore';
const header = {'Content-Type':'application/json; charset=utf-8'};

class Feedback {

	constructor(db, server) {
		this.name = 'Feedback';

		// RECORD SET
		server.post('/bf/feedback/set/v1', (req, res, next) => {	
			let body = req.body;
			console.log(body);
				let cypher = "MATCH (user:USER {uuid: $user}) "+
							 "CREATE (feedback:SetFeedback { planUUID: $planUUID, stopTime: $stopTime, name: $name, uuid: $uuid, level: $level, location: $location, gender: $gender, part: $part, rest: $rest, startTime: $startTime, repsDone: $repsDone, weightDone: $weightDone, feel: $feel })<-[relate:COMPLETED]-(user) "+
							 "RETURN feedback";		

				db.run(cypher,{
					//videoURL: body.set.videoURL,
					planUUID: body.set.planUUID,
					stopTime: body.set.stopTime,
					name: body.set.name,
					uuid: body.set.uuid,
					level: body.set.level,
					location: body.set.location,
					gender: body.set.gender,
					part: body.set.part,
					rest: body.set.rest,
					repsDone: body.set.repsDone,
					weightDone: body.set.weightDone,
					location: body.set.location,
					startTime: body.set.startTime,
					feel: body.set.feel,
					user: body.user,
				}).then((results)=>{
					results = results.records;
					db.close();
					console.log('/bf/feedback/set/v1', 'result set', results);

						res.writeHead(200, header);
				        res.end(JSON.stringify({
					        	results: results
					        	//token: token
				        	}));
				        console.log(JSON.stringify({
				        	results: results,
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
		}) // END OF '/bf/feedback/set/v1'




		}

	}


export default Feedback