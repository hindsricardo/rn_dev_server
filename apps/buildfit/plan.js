/* apps/buildfit/plan*/
import {secret} from './config';
import jwt from 'jsonwebtoken';
import uuid from 'node-uuid';
const header = {'Content-Type':'application/json; charset=utf-8'};

class Conversations {

	constructor(db, server) {
		this.name = 'Plan'

		// FIND LIST OF TRAINERS THAT MATCH GOALS
		server.post('/client/find/trainer', (req, res, next) => {	
			let body = { client:"user1", sex:"M", goals:[{part:"back", goal:"B"}]} //fake goal input from user			
			let cypher = ["UNWIND {goals} AS x",   //iterate through list of goals
						   "MATCH (f:FRAMEWORK)",	//set variable f to frameworks
						   "MATCH (e:EXERCISE)",
						   "WHERE f.part = x.part AND f.goal = x.goal AND e.part = x.part AND x.goal in e.goals" ,	// find all frameworks where framework parts is same as user input parts and framework goals match user input goals TODO: add , f.status = 'valid' for testing 
						   "MATCH (f {part:x.part, goal:x.goal})<-[:CREATED]-(trainers:TRAINER)-[:CREATED]->(e {part:x.part})",	// find all the trainers that created frameworks that meet the users parts and goals AND exercises that meet parts and goals
						   "RETURN DISTINCT trainers"].join('\n');	// return the list of trainers as an array

				db.query(cypher, {
					goals: body.goals	//set goals variable in cypher to body.goals
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
					else{
						res.writeHead(200, header);
				        res.end(JSON.stringify({
					        	success:'yes',
					        	results: results
					        	//token: token
				        	}));
				        console.log(JSON.stringify({
				        	success:'yes',
				        	results: results,
				        	//token: token
				        }));
				        return
					}
				})
			})

		server.post('/frameworks/el/v1', (req, res, next) => { //Return day1, exercise and frameworks for a target part where location (gym or home), any day1 movement in level and gender in gender
			let body = req.body;
			console.log(body);
			let cypher = ["MATCH (trainer:TRAINER {username: {trainer}})",
						  "MATCH (trainer)-[:HAS]->(framework:FRAMEWORK)",
						  "WHERE {part} = framework.part AND {gender} = framework.gender",
						  "MATCH (framework)-[:HAS]->(day1:DAY1)",
						  "UNWIND day1.movements AS level",
						  "MATCH (trainer)-[:CREATED]->(exercise:EXERCISE)",
						  "WHERE {location} in exercise.location AND {gender} in exercise.gender AND level in exercise.levels",
						  "RETURN DISTINCT framework, exercise, day1"].join('\n');

			db.query(cypher, {
				trainer:"hindsricardo@gmail.com",
				location:body.location,
				part: body.part,
				gender: body.gender
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
					        	results: results,
				        	}));
				        console.log(JSON.stringify({
				        	success:'yes',
				        	results: results,
				        }));
				        return
						}	
					})
			})

		server.post('/get/workout/v1', (req, res, next) => {
			let body = req.body;
			console.log(body);
			let cypher = ["MATCH (trainer:TRAINER {username: {trainer}})",
						  "MATCH (trainer)-[:HAS]->(framework:FRAMEWORK)",
						  "WHERE {part} = framework.part AND {goal} = framework.goal",
						  "MATCH (framework)-[:HAS]->(day1:DAY1)",
						  "MATCH (framework)-[:HAS]->(exercise:EXERCISE)",
						  "WHERE {location} in exercise.location AND {gender} in exercise.gender",
						  "RETURN DISTINCT framework, day1, exercise"].join('\n');
			db.query(cypher, {
				trainer:"hindsricardo@gmail.com",
				location:body.location,
				goal: body.goal,
				part: body.part,
				gender: body.gender
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
					        	results: results,
				        	}));
				        console.log(JSON.stringify({
				        	success:'yes',
				        	results: results,
				        }));
				        return
						}	
					})
		})

			// GENERATE A PLAN FROM A TRAINER
			server.post('/client/generate/plan', (req, res, next) => {
				let body = { client:"user1", sex:"M", goals:[{part:"back", goal:"B"}], trainerid: "hindsricardo@gmail.com"} //fake goal input from user	
				let cypher = ["UNWIND {goals} AS x",
							  "MATCH (trainer:TRAINER {username: {trainer_username}})",
							  "MATCH (trainer)-[:CREATED]->(framework:FRAMEWORK)",
							  "WHERE framework.part = x.part AND framework.goal = x.goal",
							  "MATCH (trainer)-[:CREATED]->(exercise:EXERCISE)",
							  "WHERE exercise.part = x.part",
							  "RETURN DISTINCT framework, exercise"].join('\n');	
				db.query(cypher, {
				goals: body.goals,	//set goals variable in cypher to body.goals
				trainer_username: body.trainerid
				},	(err, results) => {
					
					let days = {day1:[],
								day2:[],
								day3:[],
								day4:[],
								day5:[],
								day6:[],
								day7:[]
							};

					/*for(var i =0; i < results.length; i++){
						let framework = results[i].framework;
						for(n = 0; n < framework.schedule_settings.length; n++){
							let movements = framework.schedule_settings[n].movements;
							if(movements.length > 0) {
								for(z = 0; z < movements.length;z++){
									let level = movements[z];
									//for(d = 0; d < results.length; d++){
										
									//}

								}
							}
						}
					}*/
					

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
					        	schedule: results[0].framework.schedule_settings,
					        	results: results,
					        	//token: token
				        	}));
				        console.log(JSON.stringify({
				        	success:'yes',
				        	results: results,
				        	//token: token
				        }));
				        return
						}	
					})
		
			})

		}

	}


export default Conversations