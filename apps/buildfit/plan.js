/* apps/buildfit/plan*/
import {secret} from './config';
import {exercises_core_pack} from './config';
import {frameworks} from './config';
import {patterns} from './config';


import jwt from 'jsonwebtoken';
import uuid from 'node-uuid';
import _ from 'underscore';
const uuidV4 = require('uuid');
const header = {'Content-Type':'application/json; charset=utf-8'};

class Plan {

	constructor(db, server) {
		this.name = 'Plan'

		// FIND LIST OF TRAINERS THAT MATCH GOALS
		server.post('/client/find/trainer', (req, res, next) => {	
			let body = { client:"user1", sex:"M", goals:[{part:"back", goal:"B"}]} //fake goal input from user			
			let cypher = "UNWIND $goals AS x "+   //iterate through list of goals
						   "MATCH (f:FRAMEWORKS) "+	//set variable f to frameworks
						   "MATCH (e:EXERCISE) "+
						   "WHERE f.part = x.part AND f.goal = x.goal AND e.part = x.part AND x.goal in e.goals "+	// find all frameworks where framework parts is same as user input parts and framework goals match user input goals TODO: add , f.status = 'valid' for testing 
						   "MATCH (f {part:x.part, goal:x.goal})<-[:CREATED]-(trainers:TRAINER)-[:CREATED]->(e {part:x.part}) "+	// find all the trainers that created frameworks that meet the users parts and goals AND exercises that meet parts and goals
						   "RETURN DISTINCT trainers ";	// return the list of trainers as an array

				db.run(cypher, {
					goals: body.goals	//set goals variable in cypher to body.goals
				})
				.then((results) => {
					results = results.records;
					db.close();
					res.writeHead(200, header);
			        res.end(JSON.stringify({
				        	success:'yes',
				        	results: results
				        	//token: token
			        	}));
			        console.log('/client/find/trainer',JSON.stringify({
			        	success:'yes',
			        	results: results,
			        	//token: token
			        }));
			        return
				})
				.catch((err)=>{
					console.log('/client/find/trainer', err);
					res.writeHead(500, header)
			        res.end(JSON.stringify({
			          success:'no',
			          err: err,
			          message:'Something went wrong logging in. Check error message to see what happened.'
			        }))
				});			
			})

		server.post('/frameworks/el/v1', (req, res, next) => { //Return pattern, exercise and frameworks for a target part where location (gym or home), any pattern movement in level and gender in gender
			let body = req.body;
			console.log('/frameworks/el/v1', body);
			let cypher = "MATCH (trainer:TRAINER {username: $trainer}) "+
						  "MATCH (trainer)-[:HAS]->(framework:FRAMEWORKS) "+
						  "WHERE $part = framework.part AND $gender = framework.gender "+
						  "MATCH (framework)-[:HAS]->(pattern:PATTERN) "+
						  "UNWIND pattern.movements AS level "+
						  "MATCH (trainer)-[:CREATED]->(exercise:EXERCISE) "+
						  "WHERE $location in exercise.location AND $gender in exercise.gender AND level in exercise.levels AND $part = exercise.part "+
						  "RETURN framework";

			db.run(cypher, {
				trainer:"hindsricardo@gmail.com",
				location:body.location,
				part: body.part,
				gender: body.gender
			}).then((results) => {
				db.close();
				results = results.records;
					res.writeHead(200, header);
			        res.end(JSON.stringify({
				        	success:'yes',
				        	results: results,
			        	}));
			        console.log('/frameworks/el/v1','response results',JSON.stringify({
			        	success:'yes',
			        	results: results,
			        }));
			        return
				})
				.catch((err)=>{
					console.log('/frameworks/el/v1', 'error results',err);
					res.writeHead(500, header)
			        res.end(JSON.stringify({
			          success:'no',
			          err: err,
			          message:'Something went wrong logging in. Check error message to see what happened.'
			          }))
				});
			})

		server.post('/get/workout/v1', (req, res, next) => {
			let body = req.body;
			console.log('/get/workout/v1', body);
			let cypher = "MATCH (trainer:TRAINER {username: $trainer}) "+
						  "MATCH (trainer)-[:HAS]->(framework:FRAMEWORKS) "+
						  "WHERE $part = framework.part AND $goal = framework.goal AND $gender = framework.gender "+
						  "MATCH (framework)-[:HAS]->(pattern:PATTERN) "+
						  "MATCH (trainer)-[:CREATED]->(exercise:EXERCISE) "+
						  "WHERE $part = exercise.part AND $location in exercise.location AND $gender in exercise.gender "+
						  "RETURN DISTINCT framework";
			db.run(cypher, {
				trainer:"hindsricardo@gmail.com",
				location:body.location,
				goal: body.goal,
				part: body.part,
				gender: body.gender,
			}).then((frameworks) => {
				db.close();
				frameworks = frameworks.records;

				let cypher = "MATCH (trainer:TRAINER {username: $trainer}) "+
						  "MATCH (trainer)-[:HAS]->(framework:FRAMEWORKS) "+
						  "WHERE $part = framework.part AND $goal = framework.goal AND $gender = framework.gender "+
						  "MATCH (framework)-[:HAS]->(pattern:PATTERN) "+
						  "MATCH (trainer)-[:CREATED]->(exercise:EXERCISE) "+
						  "WHERE {location} in exercise.location AND $gender in exercise.gender AND $part = exercise.part "+
						  "RETURN DISTINCT exercise";
				db.run(cypher, {
					trainer:"hindsricardo@gmail.com",
					location:body.location,
					goal: body.goal,
					part: body.part,
					gender: body.gender,
				}).then((exercises) => {
					db.close();
					exercises = exercises.records;

				let cypher = "MATCH (trainer:TRAINER {username: $trainer}) "+
								  "MATCH (trainer)-[:HAS]->(framework:FRAMEWORKS) "+
								  "WHERE $part = framework.part AND $goal = framework.goal AND $gender = framework.gender "+
								  "MATCH (framework)-[:HAS]->(pattern:PATTERN) "+
								  "MATCH (trainer)-[:CREATED]->(exercise:EXERCISE) "+
								  "WHERE $location in exercise.location AND $gender in exercise.gender AND $part = exercise.part "+
								  "RETURN DISTINCT pattern";
				db.run(cypher, {
					trainer:"hindsricardo@gmail.com",
					location:body.location,
					goal: body.goal,
					part: body.part,
					gender: body.gender
				}).then((pattern) => {
									db.close();
									pattern = pattern.records;


									let cypher = "MATCH (trainer:TRAINER {username: $trainer}) "+
									  "MATCH (trainer)-[:HAS]->(framework:FRAMEWORKS) "+
									  "WHERE $part = framework.part AND $goal = framework.goal AND $gender = framework.gender "+
									  "MATCH (framework)-[:HAS]->(pattern:PATTERN) "+
									  "MATCH (u:USER {uuid:$id})-[:CREATED]->(exercise:EXERCISE) "+
									  "WHERE $location in exercise.location AND $gender in exercise.gender AND $part = exercise.part "+
									  "RETURN DISTINCT exercise";
									db.run(cypher, {
										trainer:"hindsricardo@gmail.com",
										location:body.location,
										goal: body.goal,
										part: body.part,
										gender: body.gender,
										id: body.userid
									}).then((user_exercises) => {
										db.close();
										user_exercises = user_exercises.records;

									res.writeHead(200, header);
							        res.end(JSON.stringify({
								        	success:'yes',
								        	results: {exercises:exercises.concat(user_exercises), frameworks:frameworks, pattern:pattern, /*high: high*/ },
							        	}));
							        console.log('/get/workout/v1', JSON.stringify({
							        	success:'yes',
							        	results: {exercises:exercises.concat(user_exercises), frameworks:frameworks, pattern:pattern, /*high: high*/ },
							        }));
						        				
								}) //user_exercises
								.catch((err)=>{
										console.log(err);
										res.writeHead(500, header)
								        res.end(JSON.stringify({
								          success:'no',
								          err: err,
								          message:'Something went wrong logging in. Check error message to see what happened.'
								          }))
								});
							}) //patter
							.catch((err)=>{
									console.log(err);
									res.writeHead(500, header)
							         res.end(JSON.stringify({
							          success:'no',
							          err: err,
							          message:'Something went wrong logging in. Check error message to see what happened.'
							          }))
							});
						}) //exercises	
						.catch((err)=>{
								console.log(err);
								res.writeHead(500, header)
						        res.end(JSON.stringify({
						          success:'no',
						          err: err,
						          message:'Something went wrong logging in. Check error message to see what happened.'
						          }))
						});	
					}) //framework
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

			// GENERATE A PLAN FROM A TRAINER //TODO DELETE ROUTE. THIS ROUTE IS NOT IN USE ************************************
			/*server.post('/client/generate/plan', (req, res, next) => {
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
					

				/*	if(err) {
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
		
			}) // GENERATE A PLAN FROM A TRAINER
			/************************************************************************/

		// add USER CREATED EXERCISE
		server.post('/client/create/exercise', (req, res, next) => {	
			let body = req.body			
			let cypher = "MATCH (u:USER {uuid:$id}) "+
						  "CREATE (exercise:EXERCISE {uuid:$uuid, VideoURL:'null', location: $location, description: $description, sets: $sets, part: $part, name: $name, gender: $gender, goal: $goal, levels: $levels }) "+
						  "CREATE (u)-[:CREATED]->(exercise) "+
						  "RETURN exercise";	// return the list of trainers as an array
				db.run(cypher, {
					goal: body.goal,
					id:body.userid,
					description:body.description,
					name: body.name,
					location: ['gym','home'],
					gender: ['male', 'female'],
					part: body.part,
					sets: '{ "superset": [ { "id": 1, "reps": "15", "rest" : "0", "description": "do as many as you can with perfect form" } ], "low": [ { "id": 1, "reps": "15", "rest" : "45", "description": "" }, { "id": 2, "reps": "20", "rest" : "45", "description": "" }, { "id": 3, "reps": "25", "rest" : "45", "description": "" } ], "high": [ { "id": 1, "reps": 12, "rest": 45, "description": "use a weight that is challenging enough where the last 4 to 3 reps burn your glutes. Also, if you are able to do more reps then continue until your glute muscles can not do more. Doing more than the given number of sets means you need to increase the weight more on the next set to get closer to the target reps. Now crush this set!" }, { "id": 2, "reps": 10, "rest": 45, "description": "Adjust the weight so that you are only able to do the given number of reps. Again if you can do more than ten reps, do not stop there and continue until your glutes cannot take anymore." }, { "id": 3, "reps": 8, "rest": 45, "description": "Increase the weight from the previous set if you were able to do the target number of reps or more. On this set do not do more than the target number of reps." }, { "id": 4, "reps": 8, "rest": 45, "description": "Do not do more than eight reps." }, { "id": 5, "reps": 15, "rest": 0, "description": "Do not decrease the weight from the previous set. Trust your body to make it through to this increased number of reps." } ], "medium": [ { "id": 1, "reps": 15, "rest": 45, "description": "the last three or four reps should be hard." }, { "id": 2, "reps": 15, "rest": 45, "description": "" }, { "id": 3, "reps": 15, "rest": 45, "description": "" }]}',
					uuid: uuidV4(),
					levels: ['superset', 'high', 'medium', 'low']
				})
				.then((results) => {
					db.close();
					results = results.records;
					res.writeHead(200, header);
			        res.end(JSON.stringify({
				        	success:'yes',
				        	results: results
				        	//token: token
			        	}));
			        console.log('/client/create/exercise', JSON.stringify({
			        	success:'yes',
			        	results: results,
			        	//token: token
			        }));
			        return
				})
				.catch((err)=>{
						console.log('/client/create/exercise', err);
						res.writeHead(500, header)
				        res.end(JSON.stringify({
				          success:'no',
				          err: err,
				          message:'Something went wrong logging in. Check error message to see what happened.'
				          }))
				});	
			})

		/************************************************************* THE FOLLOWING ROUTES IS TO SEED THE DATABASE WITH EXERCISES & PATTERNS AND SHOULD BE CALLED WHENEVER A NEW EXERCISE OR PATTERN IS ADDED RESPECTIVELY*****************************************************************/

		// SEED EXERCISES
		server.post('/admin/seed/exercises', (req, res, next)=>{
			//if(req.header['token'] == secret){
				//console.log('/admin/seed/exercises', exercises_core_pack)
				let array = [exercises_core_pack ];// add exercise packs here.
					array.forEach((pack)=>{
						let cypher = 	"MATCH (trainer:TRAINER {username: $username}) "+
										"UNWIND "+pack + " AS move "+
										"MERGE (exercise:EXERCISE {name: move.name} ) "+
										"MERGE (trainer)-[:CREATED]->(exercise) "+
										"SET exercise += move "+
										"RETURN exercise";

						db.run(cypher, {
							username: 'hindsricardo@gmail.com',
						})
						.then((results)=>{
							db.close()
							results = results.records;

							res.writeHead(200, header);
					        res.end(JSON.stringify({
						        	success:'yes',
						        	results: results
						        	//token: token
					        	}));
					        console.log('/admin/seed/exercises', JSON.stringify({
					        	success:'yes',
					        	results: results,
					        	//token: token
					        }));
					        return
							
						})
						.catch((err)=>{
								console.log('/admin/seed/exercises', err);
								res.writeHead(500, header)
						        res.end(JSON.stringify({
						          success:'no',
						          err: err,
						          message:'Something went wrong logging in. Check error message to see what happened.'
						          }))
						});	
					})
			/*}
			else{
				console.log('/admin/seed/exercises', 'NOT AUTHORIZED TO ACCESS ROUTE');
				res.writeHead(401, header)
		        res.end(JSON.stringify({
		          success:'no',
		          err: err,
		          message:'You are not authorized to access this route'
		          }))
		     	return
			}*/
		}) // end of /admin/seed/exercises


		// SEED FRAMEWORKS
		server.post('/admin/seed/frameworks', (req, res, next)=>{
			//if(req.header['token'] == secret){
				//console.log('/admin/seed/exercises', exercises_core_pack)
				let array = [frameworks ];// add exercise packs here.
					array.forEach((framework)=>{
						let cypher = 	"MATCH (trainer:TRAINER {username: $username}) "+
										"UNWIND "+framework + " AS x "+
										"MERGE (framework:FRAMEWORKS {gender: x.gender, part: x.part, goal: x.goal} ) "+
										"MERGE (trainer)-[:HAS]->(framework) "+
										"SET framework += x "+
										"RETURN framework";

						db.run(cypher, {
							username: 'hindsricardo@gmail.com',
						})
						.then((results)=>{
							db.close()
							results = results.records;

							res.writeHead(200, header);
					        res.end(JSON.stringify({
						        	success:'yes',
						        	results: results
						        	//token: token
					        	}));
					        console.log('/admin/seed/frameworks', JSON.stringify({
					        	success:'yes',
					        	results: results,
					        	//token: token
					        }));
					        return
							
						})
						.catch((err)=>{
								console.log('/admin/seed/framworks', err);
								res.writeHead(500, header)
						        res.end(JSON.stringify({
						          success:'no',
						          err: err,
						          message:'Something went wrong logging in. Check error message to see what happened.'
						          }))
						});	
					})
			/*}
			else{
				console.log('/admin/seed/framworks', 'NOT AUTHORIZED TO ACCESS ROUTE');
				res.writeHead(401, header)
		        res.end(JSON.stringify({
		          success:'no',
		          err: err,
		          message:'You are not authorized to access this route'
		          }))
		     	return
			} */
		}) // end of /admin/seed/exercises


				// SEED PATTERNS
		server.post('/admin/seed/patterns', (req, res, next)=>{
			//if(req.header['token'] == secret){
				//console.log('/admin/seed/exercises', exercises_core_pack)
				let array = [patterns ];// add exercise packs here.
					array.forEach((pattern)=>{
						let cypher = 	"UNWIND "+pattern + " AS x "+
										"MATCH (framework:FRAMEWORKS {gender: x.gender, part: x.part, goal: x.goal}) "+
										"MERGE (pattern:PATTERN {soreness: x.soreness, gender: x.gender, part: x.part, goal: x.goal} ) "+
										"MERGE (framework)-[:HAS]->(pattern) "+
										"SET pattern += x "+
										"RETURN pattern";

						db.run(cypher, {
							username: 'hindsricardo@gmail.com',
						})
						.then((results)=>{
							db.close()
							results = results.records;

							res.writeHead(200, header);
					        res.end(JSON.stringify({
						        	success:'yes',
						        	results: results
						        	//token: token
					        	}));
					        console.log('/admin/seed/patterns', JSON.stringify({
					        	success:'yes',
					        	results: results,
					        	//token: token
					        }));
					        return
							
						})
						.catch((err)=>{
								console.log('/admin/seed/patterns', err);
								res.writeHead(500, header)
						        res.end(JSON.stringify({
						          success:'no',
						          err: err,
						          message:'Something went wrong logging in. Check error message to see what happened.'
						          }))
						});	
					})
			/*}
			else{
				console.log('/admin/seed/framworks', 'NOT AUTHORIZED TO ACCESS ROUTE');
				res.writeHead(401, header)
		        res.end(JSON.stringify({
		          success:'no',
		          err: err,
		          message:'You are not authorized to access this route'
		          }))
		     	return
			} */
		}) // end of /admin/seed/exercises


		}

	}


export default Plan