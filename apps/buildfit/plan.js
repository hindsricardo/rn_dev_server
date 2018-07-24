/* apps/buildfit/plan*/
import {secret} from './config';
import {exercises_core_pack} from './config';
import {exercises_core_pack2} from './config2';

import {frameworks} from './frameworks';
import {patterns} from './patterns';


import jwt from 'jsonwebtoken';
import uuid from 'node-uuid';
import _ from 'underscore';
import moment from 'moment';
const uuidV4 = require('uuid');
const header = {'Content-Type':'application/json; charset=utf-8'};

class Plan {

	constructor(db, server) {
		this.name = 'Plan'


		//CREATE EXERCISES
		server.post('bf/urfittrainer/create/new/exercise', (req, res, next) => {
			let body = req.body;
			let cypher = "MATCH (trainer:TRAINER {uuid:$id}) CREATE (n:EXERCISE {name:$name, description:$description, public:$public, VideoURL:$VideoURL, part: $part})<-[:CREATED]-(trainer) RETURN n ";
			db.run(cypher,{
				id:body.id,
				description:body.description,
				VideoURL: body.VideoURL,
				name: body.name,
				public: body.public,
				part:body.part,
			}).then((results) => {
				db.close();
				results = results.records.map((x) => {
					return x = x._fields[0].properties;
				});
				res.writeHead(200, header);
        res.end(JSON.stringify({
	        	results: results,
						route: 'bf/urfittrainer/create/new/exercise'
        	}));
        console.log(JSON.stringify({
        	results: results,
					route: 'bf/urfittrainer/create/new/exercise'
        }));
        return
			})
			.catch((err) => {
				res.writeHead(500, header);
        res.end(JSON.stringify({
	        	results: err,
						route: 'bf/urfittrainer/create/new/exercise'
        	}));
        console.log(JSON.stringify({
        	results: err,
					route: 'bf/urfittrainer/create/new/exercise'
        }));
			})
		})


		//GET ALL PUBLIC
		server.post('/bf/get/public/exercises', (req, res, next) => {
			let body = req.body;
			let cypher = "MATCH (trainer:TRAINER {uuid: $id}) MATCH (n:EXERCISE) WHERE n.public = 'Public' OR (trainer)-[:CREATED]->(n) RETURN n ";
			db.run(cypher,{
				id:body.id
			}).then((results) => {
				db.close();
				results = results.records.map((x) => {
					return x = x._fields[0].properties;
				});
				res.writeHead(200, header);
        res.end(JSON.stringify({
	        	results: results,
						route: '/bf/get/public/exercises'
        	}));
        console.log(JSON.stringify({
        	results: results,
					route: '/bf/get/public/exercises'
        }));
        return
			})
			.catch((err) => {
				res.writeHead(500, header);
        res.end(JSON.stringify({
	        	results: err,
						route: '/bf/get/public/exercises'
        	}));
        console.log(JSON.stringify({
        	results: err,
					route: '/bf/get/public/exercises'
        }));
			})
		})

		//GET METHODS
		server.post('/bf/urfittrainer/get/methods', (req, res, next) => {
			let body = req.body;
			let cypher = "MATCH (n:METHOD {trainer:$trainerID}) RETURN n ";
			db.run(cypher, {trainerID:body.id}).then((results) => {
				db.close();
				results = results.records.map((x) => {
					return x = x._fields[0].properties;
				});
				let results2 = results.map((x) => {
					return x.pattern = JSON.parse(x.pattern), x.selectedExercise = JSON.parse(x.selectedExercise);
				})
			/*	results = results.map((x) => {
					return x.pattern = JSON.parse(x.pattern), x.selectedExercise = JSON.parse(x.selectedExercise);
				})*/
				res.writeHead(200, header);
				res.end(JSON.stringify({
						results: results,
						route: '/bf/urfittrainer/get/methods'
					}));
				console.log(JSON.stringify({
					results: results,
					route: '/bf/urfittrainer/get/methods'
				}));
				return
			})
			.catch((err) => {
				res.writeHead(500, header);
				res.end(JSON.stringify({
						results: err,
						route: '/bf/urfittrainer/get/methods'
					}));
				console.log(JSON.stringify({
					results: err,
					route: '/bf/urfittrainer/get/methods'
				}));
			})
		})

		server.post('/bf/urfittrainer/delete/method', (req, res, next) => {
			let body = req.body;
			let cypher = "MATCH (n:METHOD {uuid:$uuid}) DETACH DELETE n RETURN n"
			db.run(cypher, {
					uuid:body.methodID,
				}).then((results) => {
				db.close();

				res.writeHead(200, header);
				res.end(JSON.stringify({
						results: results,
						route: '/bf/urfittrainer/delete/method'
					}));
				console.log(JSON.stringify({
					results: results,
					route: '/bf/urfittrainer/delete/method'
				}));
				return
			})
			.catch((err) => {
				res.writeHead(500, header);
				res.end(JSON.stringify({
						results: err,
						route: '/bf/urfittrainer/delete/method'
					}));
				console.log(JSON.stringify({
					results: err,
					route: '/bf/urfittrainer/delete/method'
				}));
			})
		})

		//GET ALL TRAINER SUBSCRIBERS
		server.post('/bf/urfittrainer/get/trainer/subscribers', (req, res, next) => {
			let body = req.body;
			let date = new Date();
			let now = date.getTime();
			let cypher = "MATCH (user:USER)-[r:SUBSCRIBED]->(n:TRAINER {uuid: $id}) WHERE r.endDate > $now RETURN user";

			db.run(cypher, {
				id: body.id,
				now: now,
			})
			.then((results) => {
				results = results.records.map((x) => {
					return x = x._fields[0].properties;
				});
				db.close()
				res.writeHead(200, header);
				res.end(JSON.stringify({
						results: results,
						route: '/bf/urfittrainer/get/trainer/subscribers'
					}));
				console.log(JSON.stringify({
					results: results,
					route: '/bf/urfittrainer/get/trainer/subscribers'
				}));
				return
			})
			.catch((err) => {
				res.writeHead(500, header);
				res.end(JSON.stringify({
						results: err,
						route: '/bf/urfittrainer/get/trainer/subscribers'
					}));
				console.log(JSON.stringify({
					results: err,
					route: '/bf/urfittrainer/get/trainer/subscribers'
				}));
			})

		}); //


		//GET ALL TRAINER SUBSCRIBERS BY METHOD ID
		server.post('/bf/urfittrainer/get/trainer/subscribers/to/method', (req, res, next) => {
			let body = req.body;
			let cypher = "MATCH (users:USER)-[:SUBSCRIBED]->(:METHOD {uuid:$methodID}) RETURN users ";
			db.run(cypher, {
					methodID:body.methodID,
				}).then((results) => {
				db.close();
				results = results.records.map((x) => {
					return x = x._fields[0].properties;
				});
				res.writeHead(200, header);
				res.end(JSON.stringify({
						results: results,
						route: '/bf/urfittrainer/get/trainer/subscribers/to/method'
					}));
				console.log(JSON.stringify({
					results: results,
					route: '/bf/urfittrainer/get/trainer/subscribers/to/method'
				}));
				return
			})
			.catch((err) => {
				res.writeHead(500, header);
				res.end(JSON.stringify({
						results: err,
						route: '/bf/urfittrainer/get/trainer/subscribers/to/method'
					}));
				console.log(JSON.stringify({
					results: err,
					route: '/bf/urfittrainer/get/trainer/subscribers/to/method'
				}));
			})
		})

		//GET TRAINERS METHODS
		server.post('/bf/urfittrainer/get/methods', (req, res, next) => {
			let body = req.body;
			let cypher = "MATCH (n:METHOD {trainer:$trainerID}) RETURN n ";
			db.run(cypher, {trainerID:body.id}).then((results) => {
				db.close();
				results = results.records.map((x) => {
					return x = x._fields[0].properties;
				});
				res.writeHead(200, header);
				res.end(JSON.stringify({
						results: results,
						route: '/bf/urfittrainer/get/methods'
					}));
				console.log(JSON.stringify({
					results: results,
					route: '/bf/urfittrainer/get/methods'
				}));
				return
			})
			.catch((err) => {
				res.writeHead(500, header);
				res.end(JSON.stringify({
						results: err,
						route: '/bf/urfittrainer/get/methods'
					}));
				console.log(JSON.stringify({
					results: err,
					route: '/bf/urfittrainer/get/methods'
				}));
			})
		})

		//CREATE TRAINERS METHODS
		server.post('/bf/urfittrainer/create/method', (req, res, next) => {
			let body = req.body;
			let cypher = "MATCH (trainer:TRAINER {uuid:$trainerID}) CREATE (trainer)-[:CREATED]->(n:METHOD {trainer:$trainerID, focus:$focus, gender: $gender, descipline:$descipline, location:$location, pattern: $pattern, daysAweek:$daysAweek, selectedExercise:$selectedExercise, soreness2:$soreness2, soreness3:$soreness3, methodDescription:$methodDescription, uuid:$uuid, duration:$duration,routineType:$routineType}) RETURN n ";
			db.run(cypher, {
				trainerID:body.id,
				focus: body.focus,
        gender: body.gender,
        descipline: body.descipline,
        location: body.location,
        pattern: JSON.stringify(body.pattern),
        daysAweek: body.daysAweek,
        selectedExercise: JSON.stringify(body.selectedExercise),
        soreness2: body.soreness2,
        soreness3: body.soreness3,
        methodDescription: body.methodDescription,
				uuid: uuidV4(),
				duration: body.duration,
				routineType: body.routineType,
				tags: body.tags,
			}).then((results) => {
				db.close();
				results = results.records.map((x) => {
					return x = x._fields[0].properties;
				});
				res.writeHead(200, header);
				res.end(JSON.stringify({
						results: results,
						route: '/bf/urfittrainer/create/method'
					}));
				console.log(JSON.stringify({
					results: results,
					route: '/bf/urfittrainer/create/method'
				}));
				return
			})
			.catch((err) => {
				res.writeHead(500, header);
				res.end(JSON.stringify({
						results: err,
						route: '/bf/urfittrainer/create/method'
					}));
				console.log(JSON.stringify({
					results: err,
					route: '/bf/urfittrainer/create/method'
				}));
			})
		})


		//EDIT TRAINERS METHODS
		server.post('/bf/urfittrainer/edit/method', (req, res, next) => {
			let body = req.body;
			let cypher = "MATCH (n:METHOD {uuid:$uuid}) SET n +=  {focus: $focus, gender: $gender, descipline: $descipline, location: $location, pattern :$pattern, daysAweek: $daysAweek, selectedExercise: $selectedExercise, soreness2: $soreness2, soreness3: $soreness3, methodDescription: $methodDescription, duration: $duration, routineType: $routineType} RETURN n ";
			db.run(cypher, {
				focus: body.focus,
        gender: body.gender,
        descipline: body.descipline,
        location: body.location,
        pattern: JSON.stringify(body.pattern),
        daysAweek: body.daysAweek,
        selectedExercise: JSON.stringify(body.selectedExercise),
        soreness2: body.soreness2,
        soreness3: body.soreness3,
        methodDescription: body.methodDescription,
				uuid: body.methodID,
				duration: body.duration,
				routineType: body.routineType,
				tags: body.tags
			}).then((results) => {
				db.close();
				results = results.records.map((x) => {
					return x = x._fields[0].properties;
				});
				res.writeHead(200, header);
				res.end(JSON.stringify({
						results: results,
						route: '/bf/urfittrainer/edit/method'
					}));
				console.log(JSON.stringify({
					results: results,
					route: '/bf/urfittrainer/edit/method'
				}));
				return
			})
			.catch((err) => {
				res.writeHead(500, header);
				res.end(JSON.stringify({
						results: err,
						route: '/bf/urfittrainer/edit/method'
					}));
				console.log(JSON.stringify({
					results: err,
					route: '/bf/urfittrainer/edit/method'
				}));
			})
		})



		server.post('/frameworks/el/v1', (req, res, next) => { //Return pattern, exercise and frameworks for a target part where location (gym or home), any pattern movement in level and gender in gender
			let body = req.body;
			console.log('/frameworks/el/v1', body);
			let cypher = "MATCH (trainer:TRAINER {username: $trainer}) "+
						  "MATCH (trainer)-[:HAS]->(framework:FRAMEWORKS) "+
						  "WHERE $part = framework.part AND $gender = framework.gender "+
						  "MATCH (framework)-[:HAS]->(pattern:PATTERN) "+
						  "UNWIND pattern.movements AS level "+
						  "MATCH ()-[:CREATED]->(exercise:EXERCISE) "+
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

		server.post('bf/pick/exercises/v1', (req, res, next) => {
			let oneday = 86400000;
			var times = {
				back: {Smaller:2, Tone:2, Bigger: 3},
				core: {Smaller: 4, Tone: 2, Bigger: 3},
				glutes: {Smaller:2, Tone: 1, Bigger: 4},
				hamstrings: {Smaller: 2, Tone: 2, Bigger: 3},
				quads: {Smaller: 2, Tone: 2, Bigger: 3},
				biceps: {Smaller: 2, Tone: 2, Bigger: 3},
				triceps: {Smaller: 2, Tone:1, Bigger: 2},
				shoulders: {Smaller:1, Tone:1, Bigger: 2},
				calves: {Smaller: 1, Tone: 2, Bigger: 5},
				biceps: {Smaller: 1, Tone: 2, Bigger: 3},
				chest: {Smaller: 1, Tone:1, Bigger: 3}
			}

			let body = req.body;
			console.log('body', body);
			if(body.part1 &&  !body.part2 ){
				let cypher2 = "MATCH (trainer:TRAINER {username: $trainer}) "+
						  "UNWIND $pattern.movements as move "+
						  "MATCH (trainer)-[:CREATED]->(exercise:EXERCISE) "+
						  "WHERE $part1 = exercise.part AND $location in exercise.location AND $gender in exercise.gender AND move in exercise.levels "+
						  "WITH exercise, rand() AS r ORDER BY r "+
						  "RETURN DISTINCT exercise LIMIT $num";
				let cypher = "MATCH (trainer:TRAINER {username: $trainer}) "+
						  "MATCH (trainer)-[:HAS]->(framework:FRAMEWORKS) "+
						  "WHERE $part1 = framework.part AND $goal1 = framework.goal AND $gender = framework.gender "+
						  "MATCH (framework)-[:HAS]->(pattern:PATTERN {soreness: $soreness, priority: '1'}) "+
						  "RETURN DISTINCT pattern"
				let lastworkouts = "MATCH (sets: SetFeedback)<-[:COMPLETED]-(user:USER {uuid: $id}) "+
								   "WHERE $goal1 = sets.goal AND $part1 = sets.part AND $today - $week < sets.stopTime  "+
									"RETURN sets"
				db.run( lastworkouts, {
					part1: body.part1,
				  	goal1: body.goal1,
				  	id: body.userid,
				  	week: oneday,
					today: new Date().getTime()
				})
				.then((data) => {
					console.log('data', data.records);
					data = data.records.filter((x, index) => {
						if(index == 0){
							return x;
						}
						else{
							if(data.records[index - 1]){
									if(data.records[index - 1]._fields[0].properties.planUUID != x._fields[0].properties.planUUID){
										return x;
									}
							}
						}
					});

					db.close;
					if(data.length > 0){
						var nextworkout = moment(data[0]._fields[0].properties.stopTime + (oneday *(7/times[body.part1][body.goal1]))).startOf('day')
					}
					else{
						var nextworkout = moment().startOf('day')
					}
					console.log('sets last 7 days ', data.length, nextworkout, moment().startOf('day'))
					if(data.length < times[body.part1][body.goal1] && nextworkout <= moment().startOf('day') || body.force_workout){

						  db.run(cypher, {
						  	part1: body.part1,
						  	goal1: body.goal1,
						  	id: body.userid,
						  	location: body.location,
						  	gender: body.gender,
						  	soreness: body.soreness,
						  	trainer:'hindsricardo@gmail.com'
						  })
						  .then((results) => {
						  	results = results.records;
						  	console.log('results',results);
						  	db.close;
						  	db.run(cypher2, {
						  		pattern: results[0]._fields[0].properties,
						  		part1: body.part1,
							  	goal1: body.goal1,
							  	id: body.userid,
							  	location: body.location,
							  	gender: body.gender,
							  	soreness: body.soreness,
							  	trainer:'hindsricardo@gmail.com',
							  	num: results[0]._fields[0].properties.movements.length
							  	})
						  	.then((results2) => {
						  		console.log('results2', results2.records)
							  	results2 = results2.records.map((x, index) => {
							  		x._fields[0].properties.sets = JSON.parse(x._fields[0].properties.sets);
							  		x._fields[0].properties.level = results[0]._fields[0].properties.movements[index];
							  		return x = x._fields[0].properties;
							  	});
							  	res.writeHead(200, header);
						        res.end(JSON.stringify({
							        	success:'yes',
							        	results: results,
							        	exercises: results2,
							        	data: data

						        	}));
						        console.log('/get/workout/v1', JSON.stringify({
						        	success:'yes',
						        	results: results,
							       	exercises: results2,
							       	data: data
						        }));
						  	})
						  	.catch((err) => {
						  		console.log(err);
								res.writeHead(500, header)
						         res.end(JSON.stringify({
						          success:'no',
						          err: err,
						          message:'error is '+err
						          }))

						  	})

						  })
						  .catch((err) =>{
							console.log(err);
							res.writeHead(500, header)
					         res.end(JSON.stringify({
					          success:'no',
					          err: err,
					          message:'error is '+err
					          }))
							});
					} //if(data.length < times[body.part1][body.goal1] && moment(data[0]._fields[0].properties.stopTime + (oneday *(7/times[body.part1][body.goal1])).fixed()).startOf('day') == moment().startOf('day') || body.force_workout){
					else{
						res.writeHead(200, header);
				        res.end(JSON.stringify({
					        	success:'yes',
					        	results: data,
					        	exercises: []

				        	}));
				        console.log('/get/workout/v1', JSON.stringify({
				        	success:'yes',
				        	results: data,
					       	exercises: []
				        }));
					}
				})
				.catch((err) => {
			  		console.log(err);
					res.writeHead(500, header)
			         res.end(JSON.stringify({
			          success:'no',
			          err: err,
			          message:'error is '+err
			          }))

			  	})

			}
			else if( body.part2 &&  !body.part3 ){
				let cypher2 = "MATCH (trainer:TRAINER {username: $trainer}) "+
						  "UNWIND $pattern.movements as move "+
						  "MATCH (trainer)-[:CREATED]->(exercise:EXERCISE) "+
						  "WHERE $part1 = exercise.part AND $location in exercise.location AND $gender in exercise.gender AND move in exercise.levels "+
						  "WITH exercise, rand() AS r ORDER BY r "+
						  "RETURN DISTINCT exercise LIMIT $num";
				let cypher3 = "MATCH (trainer:TRAINER {username: $trainer}) "+
						  "UNWIND $pattern.movements as move "+
						  "MATCH (trainer)-[:CREATED]->(exercise:EXERCISE) "+
						  "WHERE $part2 = exercise.part AND $location in exercise.location AND $gender in exercise.gender AND move in exercise.levels "+
						  "WITH exercise, rand() AS r ORDER BY r "+
						  "RETURN DISTINCT exercise LIMIT $num";
				let cypher = "MATCH (trainer:TRAINER {username: $trainer}) "+
						  "MATCH (trainer)-[:HAS]->(framework:FRAMEWORKS) "+
						  "WHERE $part1 = framework.part AND $goal1 = framework.goal AND $gender = framework.gender "+
						  "MATCH (framework)-[:HAS]->(pattern:PATTERN {soreness: $soreness, priority: '1'}) "+
						  "MATCH (trainer)-[:HAS]->(framework2:FRAMEWORKS) "+
						  "WHERE $part2 = framework2.part AND $goal2 = framework2.goal AND $gender = framework2.gender "+
						  "MATCH (framework2)-[:HAS]->(pattern2:PATTERN {soreness: $soreness, priority: '2'}) "+
						  "RETURN DISTINCT pattern, pattern2"

				let cypherP2ASP1 = "MATCH (trainer:TRAINER {username: $trainer}) "+
						  "MATCH (trainer)-[:HAS]->(framework2:FRAMEWORKS) "+
						  "WHERE $part2 = framework2.part AND $goal2 = framework2.goal AND $gender = framework2.gender "+
						  "MATCH (framework2)-[:HAS]->(pattern2:PATTERN {soreness: $soreness, priority: '1'}) "+
						  "RETURN DISTINCT pattern2"
				let lastworkouts = "MATCH (sets: SetFeedback)<-[:COMPLETED]-(user:USER {uuid: $id}) "+
								   "WHERE $goal1 = sets.goal AND $part1 = sets.part AND $today - $week < sets.stopTime  "+
									"RETURN sets";
				db.run( lastworkouts, {
					part1: body.part1,
				  	goal1: body.goal1,
				  	id: body.userid,
				  	week: oneday,
					today: new Date().getTime()
				})
				.then((data) => {
					data = data.records.filter((x, index) => {
						if(index == 0){
							return x;
						}
						else{
							if(data.records[index - 1]){
									if(data.records[index - 1]._fields[0].properties.planUUID != x._fields[0].properties.planUUID){
										return x;
									}
							}
						}
					})
					db.close;
					if(data.length > 0){
						var nextworkout = moment(data[0]._fields[0].properties.stopTime + (oneday *(7/times[body.part1][body.goal1]))).startOf('day')
					}
					else{
						var nextworkout = moment().startOf('day')
					}
					console.log('sets last 7 days ', data.length, nextworkout, moment().startOf('day'))
					if(data.length < times[body.part1][body.goal1] && nextworkout <= moment().startOf('day') || body.force_workout){
						  db.run(cypher, {
						  	part1: body.part1,
						  	goal1: body.goal1,
						  	part2: body.part2,
						  	goal2: body.goal2,
						  	id: body.userid,
						  	location: body.location,
						  	gender: body.gender,
						  	soreness: body.soreness,
						  	trainer:'hindsricardo@gmail.com'
						  })
						  .then((results) => {
						  	results = results.records;
						  	db.close;
						  	db.run(cypher2, {
						  		pattern: results[0]._fields[0].properties,
						  		part1: body.part1,
							  	goal1: body.goal1,
							  	id: body.userid,
							  	location: body.location,
							  	gender: body.gender,
							  	soreness: body.soreness,
							  	trainer:'hindsricardo@gmail.com',
							  	num: results[0]._fields[0].properties.movements.length,
							  	week: oneday * 7,
							  	today: new Date().getTime()
							  	})
						  		.then((results2) => {
						  		let lastworkouts2 = "MATCH (sets: SetFeedback)<-[:COMPLETED]-(user:USER {uuid: $id}) "+
								   "WHERE $goal2 = sets.goal AND $part2 = sets.part AND $today - $week < sets.stopTime  "+
									"RETURN sets"
								db.run( lastworkouts2, {
									part2: body.part2,
								  	goal2: body.goal2,
								  	id: body.userid,
								  	week: oneday,
									today: new Date().getTime()
								})
								.then((data2) => {
									data2 = data2.records.filter((x, index) => { //filter to one set per workout by planUUID
										if(index == 0){
											return x;
										}
										else{
											if(data2.records[index - 1]){
													if(data2.records[index - 1]._fields[0].properties.planUUID != x._fields[0].properties.planUUID){
														return x;
													}
											}
										}
									})
									db.close;
									if(data2.length > 0){
										var nextworkout = moment(data2[0]._fields[0].properties.stopTime + (oneday *(7/times[body.part2][body.goal2]))).startOf('day')
									}
									else{
										var nextworkout = moment().startOf('day')
									}
									//console.log('sets last 7 days ', data2.length, nextworkout, moment().startOf('day'))
									if(data2.length < times[body.part2][body.goal2] && nextworkout <= moment().startOf('day') || body.force_workout){ //if less workouts than allowed in the week defined in times var per part and goal and next workout date is equal to or less than current date or user has force requested a workout
								  	results2 = results2.records.map((x, index) => {
								  		x._fields[0].properties.sets = JSON.parse(x._fields[0].properties.sets);
								  		x._fields[0].properties.level = results[0]._fields[0].properties.movements[index];
								  		return x = x._fields[0].properties;
								  	});
								  	db.close;
								  	db.run(cypher3, {
								  		pattern: results[0]._fields[1].properties,
									  	part2: body.part2,
								  		goal2: body.goal2,
									  	id: body.userid,
									  	location: body.location,
									  	gender: body.gender,
									  	soreness: body.soreness,
									  	trainer:'hindsricardo@gmail.com',
									  	num: results[0]._fields[1].properties.movements.length,
									  	})
								  		.then((results3) => {
										  	results3 = results3.records.map((x, index) => {
										  		x._fields[0].properties.sets = JSON.parse(x._fields[0].properties.sets);
										  		x._fields[0].properties.level = results[0]._fields[1].properties.movements[index];
										  		return x = x._fields[0].properties;
										  	});
										  	db.close;
										  	res.writeHead(200, header);
									        res.end(JSON.stringify({
										        	success:'yes',
										        	results: results,
										        	exercises: results2.concat(results3),
										        	exercise2: results3

									        	}));
									        console.log('/get/workout/v1', JSON.stringify({
									        	success:'yes',
									        	results: results,
										       	exercises: results2.concat(results3)
									        }));
								  	})
								  	.catch((err) => {
								  		console.log(err);
										res.writeHead(500, header)
								         res.end(JSON.stringify({
								          success:'no',
								          err: err,
								          message:'error is '+err
								          }))

								  	})
							  }// check nextworkout
							  else{
							  	//return first priority and workout
							  	res.writeHead(200, header);
						        res.end(JSON.stringify({
							        	success:'yes',
							        	results: results,
							        	exercises: results2,
						        	}));
						        console.log('/get/workout/v1', JSON.stringify({
						        	success:'yes',
						        	results: results,
							       	exercises: results2
						        }));
							  }
							  })//end of last exercise db call before priority 2
								.catch((err) => {
							  		console.log(err);
									res.writeHead(500, header)
							         res.end(JSON.stringify({
							          success:'no',
							          err: err,
							          message:'error is '+err
							          }))

							  	})
						  	})
						  	.catch((err) => {
						  		console.log(err);
								res.writeHead(500, header)
						         res.end(JSON.stringify({
						          success:'no',
						          err: err,
						          message:'error is '+err
						          }))

						  	})

						  })
						  .catch((err) =>{
							console.log(err);
							res.writeHead(500, header)
					         res.end(JSON.stringify({
					          success:'no',
					          err: err,
					          message:'error is '+err
					          }))
							});
					}
					else{
						//return second priority in the first priority spot.
						db.run(cypherP2ASP1, {
						  	part1: body.part1,
						  	goal1: body.goal1,
						  	part2: body.part2,
						  	goal2: body.goal2,
						  	id: body.userid,
						  	location: body.location,
						  	gender: body.gender,
						  	soreness: body.soreness,
						  	trainer:'hindsricardo@gmail.com'
						  })
						  .then((results) => {
						  	results = results.records;
						  	db.close;
						  	db.run(cypher3, {
						  		pattern: results[0]._fields[0].properties,
						  		part2: body.part2,
							  	goal2: body.goal1,
							  	id: body.userid,
							  	location: body.location,
							  	gender: body.gender,
							  	soreness: body.soreness,
							  	trainer:'hindsricardo@gmail.com',
							  	num: results[0]._fields[0].properties.movements.length,
							  	week: oneday * 7,
							  	today: new Date().getTime()
							  	})
						  		.then((results2) => {
						  			results2 = results2.records.map((x, index) => {
								  		x._fields[0].properties.sets = JSON.parse(x._fields[0].properties.sets);
								  		x._fields[0].properties.level = results[0]._fields[0].properties.movements[index];
								  		return x = x._fields[0].properties;
								  	});
						  			db.close;
						  			res.writeHead(200, header);
							        res.end(JSON.stringify({
								        	success:'yes',
								        	results: results,
								        	exercises: results2

							        	}));
							        console.log('/get/workout/v1', JSON.stringify({
							        	success:'yes',
							        	results: results,
								       	exercises: results2
							        }));

						  		})
						  		.catch((err) =>{
									console.log(err);
									res.writeHead(500, header)
							         res.end(JSON.stringify({
							          success:'no',
							          err: err,
							          message:'error is '+err
							          }))
									});
						  	})
						  .catch((err) =>{
							console.log(err);
							res.writeHead(500, header)
					         res.end(JSON.stringify({
					          success:'no',
					          err: err,
					          message:'error is '+err
					          }))
							});
					}
				})
			} //END OF PRIORITY 2
			else if( body.part3 ){
				let cypher2 = "MATCH (trainer:TRAINER {username: $trainer}) "+
						  "UNWIND $pattern.movements as move "+
						  "MATCH (trainer)-[:CREATED]->(exercise:EXERCISE) "+
						  "WHERE $part1 = exercise.part AND $location in exercise.location AND $gender in exercise.gender AND move in exercise.levels "+
						  "WITH exercise, rand() AS r ORDER BY r "+
						  "RETURN DISTINCT exercise LIMIT $num";
				let cypher3 = "MATCH (trainer:TRAINER {username: $trainer}) "+
						  "UNWIND $pattern.movements as move "+
						  "MATCH (trainer)-[:CREATED]->(exercise:EXERCISE) "+
						  "WHERE $part2 = exercise.part AND $location in exercise.location AND $gender in exercise.gender AND move in exercise.levels "+
						  "WITH exercise, rand() AS r ORDER BY r "+
						  "RETURN DISTINCT exercise LIMIT $num";
				let cypher4 = "MATCH (trainer:TRAINER {username: $trainer}) "+
						  "UNWIND $pattern.movements as move "+
						  "MATCH (trainer)-[:CREATED]->(exercise:EXERCISE) "+
						  "WHERE $part3 = exercise.part AND $location in exercise.location AND $gender in exercise.gender AND move in exercise.levels "+
						  "WITH exercise, rand() AS r ORDER BY r "+
						  "RETURN DISTINCT exercise LIMIT $num";
				let getPattern = "MATCH (trainer:TRAINER {username: $trainer}) "+
						  "MATCH (trainer)-[:HAS]->(framework:FRAMEWORKS) "+
						  "WHERE $part1 = framework.part AND $goal1 = framework.goal AND $gender = framework.gender "+
						  "MATCH (framework)-[:HAS]->(pattern:PATTERN {soreness: $soreness, priority: '1'}) "+
						  "MATCH (trainer)-[:HAS]->(framework2:FRAMEWORKS) "+
						  "WHERE $part2 = framework2.part AND $goal2 = framework2.goal AND $gender = framework2.gender "+
						  "MATCH (framework2)-[:HAS]->(pattern2:PATTERN {soreness: $soreness, priority: '2'}) "+
						  "MATCH (trainer)-[:HAS]->(framework3:FRAMEWORKS) "+
						  "WHERE $part3 = framework3.part AND $goal3 = framework3.goal AND $gender = framework3.gender "+
						  "MATCH (framework3)-[:HAS]->(pattern3:PATTERN {soreness: $soreness, priority: '3'}) "+
						  "RETURN DISTINCT pattern, pattern2, pattern3"

				let getPatternP2ASP1 = "MATCH (trainer:TRAINER {username: $trainer}) "+
						  "MATCH (trainer)-[:HAS]->(framework2:FRAMEWORKS) "+
						  "WHERE $part2 = framework2.part AND $goal2 = framework2.goal AND $gender = framework2.gender "+
						  "MATCH (framework2)-[:HAS]->(pattern2:PATTERN {soreness: $soreness, priority: '1'}) "+
						  "MATCH (trainer)-[:HAS]->(framework3:FRAMEWORKS) "+
						  "WHERE $part3 = framework3.part AND $goal3 = framework3.goal AND $gender = framework3.gender "+
						  "MATCH (framework3)-[:HAS]->(pattern3:PATTERN {soreness: $soreness, priority: '2'}) "+
						  "RETURN DISTINCT pattern2, pattern3"
				let getPatternP3ASP1 = "MATCH (trainer:TRAINER {username: $trainer}) "+
						  "MATCH (trainer)-[:HAS]->(framework3:FRAMEWORKS) "+
						  "WHERE $part3 = framework3.part AND $goal3 = framework3.goal AND $gender = framework3.gender "+
						  "MATCH (framework3)-[:HAS]->(pattern3:PATTERN {soreness: $soreness, priority: '2'}) "+
						  "RETURN DISTINCT pattern2, pattern3"
				let lastworkouts = "MATCH (sets: SetFeedback)<-[:COMPLETED]-(user:USER {uuid: $id}) "+
								   "WHERE $goal1 = sets.goal AND $part1 = sets.part AND $today - $week < sets.stopTime  "+
									"RETURN sets";
				db.run( lastworkouts, {
					part1: body.part1,
				  	goal1: body.goal1,
				  	id: body.userid,
				  	week: oneday,
					today: new Date().getTime()
				})
				.then((data) => {
					data = data.records.filter((x, index) => {
						if(index == 0){
							return x;
						}
						else{
							if(data.records[index - 1]){
									if(data.records[index - 1]._fields[0].properties.planUUID != x._fields[0].properties.planUUID){
										return x;
									}
							}
						}
					})
					db.close;
					if(data.length > 0){
						var nextworkout = moment(data[0]._fields[0].properties.stopTime + (oneday *(7/times[body.part1][body.goal1]))).startOf('day')
					}
					else{
						var nextworkout = moment().startOf('day')
					}
					console.log('sets last 7 days ', data.length, nextworkout, moment().startOf('day'))
					if(data.length < times[body.part1][body.goal1] && nextworkout <= moment().startOf('day') || body.force_workout){
						  db.run(cypher, {
						  	part1: body.part1,
						  	goal1: body.goal1,
						  	part2: body.part2,
						  	goal2: body.goal2,
						  	id: body.userid,
						  	location: body.location,
						  	gender: body.gender,
						  	soreness: body.soreness,
						  	trainer:'hindsricardo@gmail.com'
						  })
						  .then((results) => {
						  	results = results.records;
						  	db.close;
						  	db.run(cypher2, {
						  		pattern: results[0]._fields[0].properties,
						  		part1: body.part1,
							  	goal1: body.goal1,
							  	id: body.userid,
							  	location: body.location,
							  	gender: body.gender,
							  	soreness: body.soreness,
							  	trainer:'hindsricardo@gmail.com',
							  	num: results[0]._fields[0].properties.movements.length,
							  	week: oneday * 7,
							  	today: new Date().getTime()
							  	})
						  		.then((results2) => {
						  		let lastworkouts2 = "MATCH (sets: SetFeedback)<-[:COMPLETED]-(user:USER {uuid: $id}) "+
								   "WHERE $goal2 = sets.goal AND $part2 = sets.part AND $today - $week < sets.stopTime  "+
									"RETURN sets"
								db.run( lastworkouts2, {
									part2: body.part2,
								  	goal2: body.goal2,
								  	id: body.userid,
								  	week: oneday,
									today: new Date().getTime()
								})
								.then((data2) => {
									data2 = data2.records.filter((x, index) => { //filter to one set per workout by planUUID
										if(index == 0){
											return x;
										}
										else{
											if(data2.records[index - 1]){
													if(data2.records[index - 1]._fields[0].properties.planUUID != x._fields[0].properties.planUUID){
														return x;
													}
											}
										}
									})
									db.close;
									if(data2.length > 0){
										var nextworkout = moment(data2[0]._fields[0].properties.stopTime + (oneday *(7/times[body.part2][body.goal2]))).startOf('day')
									}
									else{
										var nextworkout = moment().startOf('day')
									}
									//console.log('sets last 7 days ', data2.length, nextworkout, moment().startOf('day'))
									if(data2.length < times[body.part2][body.goal2] && nextworkout <= moment().startOf('day') || body.force_workout){ //if less workouts than allowed in the week defined in times var per part and goal and next workout date is equal to or less than current date or user has force requested a workout
								  	results2 = results2.records.map((x, index) => {
								  		x._fields[0].properties.sets = JSON.parse(x._fields[0].properties.sets);
								  		x._fields[0].properties.level = results[0]._fields[0].properties.movements[index];
								  		return x = x._fields[0].properties;
								  	});
								  	db.close;
								  	db.run(cypher3, {
								  		pattern: results[0]._fields[1].properties,
									  	part2: body.part2,
								  		goal2: body.goal2,
									  	id: body.userid,
									  	location: body.location,
									  	gender: body.gender,
									  	soreness: body.soreness,
									  	trainer:'hindsricardo@gmail.com',
									  	num: results[0]._fields[1].properties.movements.length,
									  	})
								  		.then((results3) => {
										  	results3 = results3.records.map((x, index) => {
										  		x._fields[0].properties.sets = JSON.parse(x._fields[0].properties.sets);
										  		x._fields[0].properties.level = results[0]._fields[1].properties.movements[index];
										  		return x = x._fields[0].properties;
										  	});
										  	db.close;
										  	let lastworkouts3 = "MATCH (sets: SetFeedback)<-[:COMPLETED]-(user:USER {uuid: $id}) "+
											   "WHERE $goal3 = sets.goal AND $part3 = sets.part AND $today - $week < sets.stopTime  "+
												"RETURN sets"
											db.run( lastworkouts3, {
												part3: body.part3,
											  	goal3: body.goal3,
											  	id: body.userid,
											  	week: oneday,
												today: new Date().getTime()
											})
											.then((data3) => {
												data3 = data3.records.filter((x, index) => { //filter to one set per workout by planUUID
													if(index == 0){
														return x;
													}
													else{
														if(data3.records[index - 1]){
																if(data3.records[index - 1]._fields[0].properties.planUUID != x._fields[0].properties.planUUID){
																	return x;
																}
														}
													}
												})
												db.close;
												if(data3.length > 0){
													var nextworkout = moment(data3[0]._fields[0].properties.stopTime + (oneday *(7/times[body.part3][body.goal3]))).startOf('day')
												}
												else{
													var nextworkout = moment().startOf('day')
												}
												//console.log('sets last 7 days ', data2.length, nextworkout, moment().startOf('day'))
												if(data3.length < times[body.part3][body.goal3] && nextworkout <= moment().startOf('day') || body.force_workout){ //if less workouts than allowed in the week defined in times var per part and goal and next workout date is equal to or less than current date or user has force requested a workout
												  	db.run(cypher4, {
												  		pattern: results[0]._fields[2].properties,
													  	part3: body.part3,
												  		goal3: body.goal3,
													  	id: body.userid,
													  	location: body.location,
													  	gender: body.gender,
													  	soreness: body.soreness,
													  	trainer:'hindsricardo@gmail.com',
													  	num: results[0]._fields[2].properties.movements.length,
													})
													.then((results4) => {
														results4 = results4.records.map((x, index) => {
													  		x._fields[0].properties.sets = JSON.parse(x._fields[0].properties.sets);
													  		x._fields[0].properties.level = results[0]._fields[2].properties.movements[index];
													  		return x = x._fields[0].properties;
													  	});
												  		db.close;
														res.writeHead(200, header);
												        res.end(JSON.stringify({
													        	success:'yes',
													        	results: results,
													        	exercises: results2.concat(results3.concat(results4)),
													        	exercise2: results3,
													        	exercise3: results4

												        	}));
												        console.log('/get/workout/v1', JSON.stringify({
												        	success:'yes',
												        	results: results,
													       	exercises: results2.concat(results3.concat(results4)),
													       	exercise2: results3,
													        exercise3: results4
												        }));
													})
													.catch((err) => {
												  		console.log(err);
														res.writeHead(500, header)
												         res.end(JSON.stringify({
												          success:'no',
												          err: err,
												          message:'error is '+err
												          }))

												  	})
												}// END OF CHECK PRIORTY 3 NEXT DAY
												else{
													res.writeHead(200, header);
											        res.end(JSON.stringify({
												        	success:'yes',
												        	results: results,
												        	exercises: results2.concat(results3),
												        	exercise2: results3,

											        	}));
											        console.log('/get/workout/v1', JSON.stringify({
											        	success:'yes',
											        	results: results,
												       	exercises: results2.concat(results3),
												       	exercise2: results3,
											        }));
												}
											})

								  	})
								  	.catch((err) => {
								  		console.log(err);
										res.writeHead(500, header)
								         res.end(JSON.stringify({
								          success:'no',
								          err: err,
								          message:'error is '+err
								          }))

								  	})
							  }// check nextworkout
							  else{
							  	//return first priority and workout
							  	db.run(getPatternP2ASP1, {
								  	part1: body.part1,
								  	goal1: body.goal1,
								  	part2: body.part2,
								  	goal2: body.goal2,
								  	part3: body.part3,
								  	goal3: body.goal3,
								  	id: body.userid,
								  	location: body.location,
								  	gender: body.gender,
								  	soreness: body.soreness,
								  	trainer:'hindsricardo@gmail.com'
								 })
							  	.then((results3) => {
							  			db.close;
							    		results3 = results3.records;
							    		let lastworkouts3 = "MATCH (sets: SetFeedback)<-[:COMPLETED]-(user:USER {uuid: $id}) "+
										   "WHERE $goal3 = sets.goal AND $part3 = sets.part AND $today - $week < sets.stopTime  "+
											"RETURN sets"
										db.run( lastworkouts3, {
											part3: body.part3,
										  	goal3: body.goal3,
										  	id: body.userid,
										  	week: oneday,
											today: new Date().getTime()
										})
										.then((data3) => {
											data3 = data3.records.filter((x, index) => { //filter to one set per workout by planUUID
												if(index == 0){
													return x;
												}
												else{
													if(data3.records[index - 1]){
															if(data3.records[index - 1]._fields[0].properties.planUUID != x._fields[0].properties.planUUID){
																return x;
															}
													}
												}
											})
											if(data3.length > 0){
												var nextworkout = moment(data3[0]._fields[0].properties.stopTime + (oneday *(7/times[body.part3][body.goal3]))).startOf('day')
											}
											else{
												var nextworkout = moment().startOf('day')
											}
											//console.log('sets last 7 days ', data2.length, nextworkout, moment().startOf('day'))
											if(data3.length < times[body.part3][body.goal3] && nextworkout <= moment().startOf('day') || body.force_workout){ //if less workouts than allowed in the week defined in times var per part and goal and next workout date is equal to or less than current date or user has force requested a workout
							    			db.run(cypher4, {
										  		pattern: results3[1]._fields[0].properties,
											  	part3: body.part3,
										  		goal3: body.goal3,
											  	id: body.userid,
											  	location: body.location,
											  	gender: body.gender,
											  	soreness: body.soreness,
											  	trainer:'hindsricardo@gmail.com',
											  	num: results3[1]._fields[0].properties.movements.length,
											})
											.then((results4) => {
												results4 = results4.records.map((x, index) => {
											  		x._fields[0].properties.sets = JSON.parse(x._fields[0].properties.sets);
											  		x._fields[0].properties.level = results3[1]._fields[0].properties.movements[index];
											  		return x = x._fields[0].properties;
											  	});
										  		db.close;
												res.writeHead(200, header);
										        res.end(JSON.stringify({
											        	success:'yes',
											        	results: results3,
											        	exercises: results2.concat(results4)

										        	}));
										        console.log('/get/workout/v1', JSON.stringify({
										        	success:'yes',
										        	results: results3,
											        exercises: results2.concat(results4)
										        }));
											})
										} //end of if statment checking priorty 3 next exercise
										else{
											res.writeHead(200, header);
									        res.end(JSON.stringify({
										        	success:'yes',
										        	results: results3,
										        	exercises: results2

									        	}));
									        console.log('/get/workout/v1', JSON.stringify({
									        	success:'yes',
									        	results: results3,
										        exercises: results2
									        }));
										}//end of prioty 3 nextworkout else
									}) //END OF DATA 3 THEN
							  	}) //END OF RESULTS3


							   }
							  })//end of last exercise db call before priority 2
								.catch((err) => {
							  		console.log(err);
									res.writeHead(500, header)
							         res.end(JSON.stringify({
							          success:'no',
							          err: err,
							          message:'error is '+err
							          }))

							  	})
						  	})
						  	.catch((err) => {
						  		console.log(err);
								res.writeHead(500, header)
						         res.end(JSON.stringify({
						          success:'no',
						          err: err,
						          message:'error is '+err
						          }))

						  	})

						  })
						  .catch((err) =>{
							console.log(err);
							res.writeHead(500, header)
					         res.end(JSON.stringify({
					          success:'no',
					          err: err,
					          message:'error is '+err
					          }))
							});
					} //IF AFTER FIRST NEXT EXERCISE CHECK
					else{
						//return second priority in the first priority spot.
						db.run(getPatternP2ASP1, {
						  	part1: body.part1,
						  	goal1: body.goal1,
						  	part2: body.part2,
						  	goal2: body.goal2,
						  	part3: body.part3,
						  	goal3: body.goal3,
						  	id: body.userid,
						  	location: body.location,
						  	gender: body.gender,
						  	soreness: body.soreness,
						  	trainer:'hindsricardo@gmail.com'
						  })
						  .then((results) => {
						  	results = results.records;
						  	db.close;
						  	db.run(cypher3, {
						  		pattern: results[0]._fields[0].properties,
						  		part2: body.part2,
							  	goal2: body.goal2,
							  	id: body.userid,
							  	location: body.location,
							  	gender: body.gender,
							  	soreness: body.soreness,
							  	trainer:'hindsricardo@gmail.com',
							  	num: results[0]._fields[0].properties.movements.length,
							  	week: oneday * 7,
							  	today: new Date().getTime()
							  	})
						  		.then((results2) => {
						  			let lastworkouts2 = "MATCH (sets: SetFeedback)<-[:COMPLETED]-(user:USER {uuid: $id}) "+
								   "WHERE $goal2 = sets.goal AND $part2 = sets.part AND $today - $week < sets.stopTime  "+
									"RETURN sets"
								db.run( lastworkouts2, {
									part2: body.part2,
								  	goal2: body.goal2,
								  	id: body.userid,
								  	week: oneday,
									today: new Date().getTime()
								})
								.then((data2) => {
									data2 = data2.records.filter((x, index) => { //filter to one set per workout by planUUID
										if(index == 0){
											return x;
										}
										else{
											if(data2.records[index - 1]){
													if(data2.records[index - 1]._fields[0].properties.planUUID != x._fields[0].properties.planUUID){
														return x;
													}
											}
										}
									})
									if(data2.length > 0){
										var nextworkout = moment(data2[0]._fields[0].properties.stopTime + (oneday *(7/times[body.part2][body.goal2]))).startOf('day')
									}
									else{
										var nextworkout = moment().startOf('day')
									}
									//console.log('sets last 7 days ', data2.length, nextworkout, moment().startOf('day'))
									if(data2.length < times[body.part2][body.goal2] && nextworkout <= moment().startOf('day') || body.force_workout){ //if less workouts than allowed in the week defined in times var per part and goal and next workout date is equal to or less than current date or user has force requested a workout
						  			results2 = results2.records.map((x, index) => {
								  		x._fields[0].properties.sets = JSON.parse(x._fields[0].properties.sets);
								  		x._fields[0].properties.level = results[0]._fields[0].properties.movements[index];
								  		return x = x._fields[0].properties;
								  	});
						  			db.close;
						  			db.run(cypher3, {
								  		pattern: results[0]._fields[1].properties,
									  	part2: body.part2,
								  		goal2: body.goal2,
									  	id: body.userid,
									  	location: body.location,
									  	gender: body.gender,
									  	soreness: body.soreness,
									  	trainer:'hindsricardo@gmail.com',
									  	num: results[0]._fields[1].properties.movements.length,
									  	})
								  		.then((results3) => {
										  	results3 = results3.records.map((x, index) => {
										  		x._fields[0].properties.sets = JSON.parse(x._fields[0].properties.sets);
										  		x._fields[0].properties.level = results[0]._fields[1].properties.movements[index];
										  		return x = x._fields[0].properties;
										  	});
										  	db.close;
										  	let lastworkouts3 = "MATCH (sets: SetFeedback)<-[:COMPLETED]-(user:USER {uuid: $id}) "+
										   "WHERE $goal3 = sets.goal AND $part3 = sets.part AND $today - $week < sets.stopTime  "+
											"RETURN sets"
											db.run( lastworkouts3, {
												part3: body.part3,
											  	goal3: body.goal3,
											  	id: body.userid,
											  	week: oneday,
												today: new Date().getTime()
											})
											.then((data3) => {
												data3 = data3.records.filter((x, index) => { //filter to one set per workout by planUUID
													if(index == 0){
														return x;
													}
													else{
														if(data3.records[index - 1]){
																if(data3.records[index - 1]._fields[0].properties.planUUID != x._fields[0].properties.planUUID){
																	return x;
																}
														}
													}
												})
												if(data3.length > 0){
													var nextworkout = moment(data3[0]._fields[0].properties.stopTime + (oneday *(7/times[body.part3][body.goal3]))).startOf('day')
												}
												else{
													var nextworkout = moment().startOf('day')
												}
												//console.log('sets last 7 days ', data2.length, nextworkout, moment().startOf('day'))
												if(data3.length < times[body.part3][body.goal3] && nextworkout <= moment().startOf('day') || body.force_workout){ //if less workouts than allowed in the week defined in times var per part and goal and next workout date is equal to or less than current date or user has force requested a workout
											  	db.run(cypher4, {
											  		pattern: results[0]._fields[2].properties,
												  	part3: body.part3,
											  		goal3: body.goal3,
												  	id: body.userid,
												  	location: body.location,
												  	gender: body.gender,
												  	soreness: body.soreness,
												  	trainer:'hindsricardo@gmail.com',
												  	num: results[0]._fields[2].properties.movements.length,
												})
												.then((results4) => {
													results4 = results4.records.map((x, index) => {
												  		x._fields[0].properties.sets = JSON.parse(x._fields[0].properties.sets);
												  		x._fields[0].properties.level = results[0]._fields[2].properties.movements[index];
												  		return x = x._fields[0].properties;
												  	});
											  		db.close;
													res.writeHead(200, header);
											        res.end(JSON.stringify({
												        	success:'yes',
												        	results: results,
												        	exercises: results2.concat(results3.concat(results4)),
												        	exercise2: results3,
												        	exercise3: results4

											        	}));
											        console.log('/get/workout/v1', JSON.stringify({
											        	success:'yes',
											        	results: results,
												       	exercises: results2.concat(results3.concat(results4)),
												       	exercise2: results3,
												        exercise3: results4
											        }));
												})
										} //END OF CHECKING NEXTWORKOUT
										else{
											res.writeHead(200, header);
									        res.end(JSON.stringify({
										        	success:'yes',
										        	results: results,
										        	exercises: results2.concat(results3),
										        	exercise2: results3,

									        	}));
									        console.log('/get/workout/v1', JSON.stringify({
									        	success:'yes',
									        	results: results,
										       	exercises: results2.concat(results3),
										       	exercise2: results3,
									        }));
										}
										}) //END OF DATA3
										})
							    }//end of next exercise if
							    else{ //CHECK FOR PRIORITY 3 AS PRIOTY 1
							    	db.run(getPatternP3ASP1, {
									  	part1: body.part1,
									  	goal1: body.goal1,
									  	part2: body.part2,
									  	goal2: body.goal2,
									  	part3: body.part3,
									  	goal3: body.goal3,
									  	id: body.userid,
									  	location: body.location,
									  	gender: body.gender,
									  	soreness: body.soreness,
									  	trainer:'hindsricardo@gmail.com'
									 })
							    	.then((result3) => {
							    		db.close;
							    		results3 = results3.records;
							    		let lastworkouts3 = "MATCH (sets: SetFeedback)<-[:COMPLETED]-(user:USER {uuid: $id}) "+
										   "WHERE $goal3 = sets.goal AND $part3 = sets.part AND $today - $week < sets.stopTime  "+
											"RETURN sets"
										db.run( lastworkouts3, {
											part3: body.part3,
										  	goal3: body.goal3,
										  	id: body.userid,
										  	week: oneday,
											today: new Date().getTime()
										})
										.then((data3) => {
											data3 = data3.records.filter((x, index) => { //filter to one set per workout by planUUID
												if(index == 0){
													return x;
												}
												else{
													if(data3.records[index - 1]){
															if(data3.records[index - 1]._fields[0].properties.planUUID != x._fields[0].properties.planUUID){
																return x;
															}
													}
												}
											})
											if(data3.length > 0){
												var nextworkout = moment(data3[0]._fields[0].properties.stopTime + (oneday *(7/times[body.part3][body.goal3]))).startOf('day')
											}
											else{
												var nextworkout = moment().startOf('day')
											}
											//console.log('sets last 7 days ', data2.length, nextworkout, moment().startOf('day'))
											if(data3.length < times[body.part3][body.goal3] && nextworkout <= moment().startOf('day') || body.force_workout){ //if less workouts than allowed in the week defined in times var per part and goal and next workout date is equal to or less than current date or user has force requested a workout
							    			db.run(cypher4, {
										  		pattern: results3[1]._fields[0].properties,
											  	part3: body.part3,
										  		goal3: body.goal3,
											  	id: body.userid,
											  	location: body.location,
											  	gender: body.gender,
											  	soreness: body.soreness,
											  	trainer:'hindsricardo@gmail.com',
											  	num: results3[1]._fields[0].properties.movements.length,
											})
											.then((results4) => {
												results4 = results4.records.map((x, index) => {
											  		x._fields[0].properties.sets = JSON.parse(x._fields[0].properties.sets);
											  		x._fields[0].properties.level = results3[1]._fields[0].properties.movements[index];
											  		return x = x._fields[0].properties;
											  	});
										  		db.close;
												res.writeHead(200, header);
										        res.end(JSON.stringify({
											        	success:'yes',
											        	results: results3,
											        	exercises: results4

										        	}));
										        console.log('/get/workout/v1', JSON.stringify({
										        	success:'yes',
										        	results: results3,
											        exercises: results4
										        }));
											})
										} //end of if statment checking priorty 3 next exercise
										else{
											res.writeHead(200, header);
									        res.end(JSON.stringify({
										        	success:'yes',
										        	results: results3,
										        	exercises: []

									        	}));
									        console.log('/get/workout/v1', JSON.stringify({
									        	success:'yes',
									        	results: results3,
										        exercises: []
									        }));
										}//end of prioty 3 nextworkout else
									}) //end of data3
							    	})
							    	.catch((err) => {
							    		console.log(err);
										res.writeHead(500, header)
								         res.end(JSON.stringify({
								          success:'no',
								          err: err,
								          message:'error is '+err
								         }))
							    	})
							    } //END OF Priorty 2check else
							    })//end of data2

						  		})//end of result2
						  		.catch((err) =>{
									console.log(err);
									res.writeHead(500, header)
							         res.end(JSON.stringify({
							          success:'no',
							          err: err,
							          message:'error is '+err
							          }))
									});
						  	})
						  .catch((err) =>{
							console.log(err);
							res.writeHead(500, header)
					         res.end(JSON.stringify({
					          success:'no',
					          err: err,
					          message:'error is '+err
					          }))
							});
					} //END OF ELSE
				})
			}

		}) // 'bf/pick/exercises/v1'

		server.post('/bf/get/dietplan/v1', (req, res, next) => {
			let body = req.body;


		}) //bf/get/dietplan/v1

		server.post('/get/workout/v1', (req, res, next) => {
			let body = req.body;
			let cypher = "MATCH (trainer:TRAINER {username: $trainer}) "+
						  "MATCH (trainer)-[:HAS]->(framework:FRAMEWORKS) "+
						  "WHERE $part = framework.part AND $goal = framework.goal AND $gender = framework.gender "+
						  "MATCH (framework)-[:HAS]->(pattern:PATTERN) "+
						  "MATCH ()-[:CREATED]->(exercise:EXERCISE) "+
						  "WHERE $part = exercise.part AND $location in exercise.location AND $gender in exercise.gender "+
						  "RETURN DISTINCT pattern";
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
						  "MATCH ()-[:CREATED]->(exercise:EXERCISE) "+
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
								  "MATCH (framework)-[:HAS]->(pattern:PATTERN {soreness: $soreness}) "+
								  "MATCH ()-[:CREATED]->(exercise:EXERCISE) "+
								  "WHERE $location in exercise.location AND $gender in exercise.gender AND $part = exercise.part "+
								  "RETURN DISTINCT pattern";
				db.run(cypher, {
					trainer:"hindsricardo@gmail.com",
					location:body.location,
					goal: body.goal,
					part: body.part,
					gender: body.gender,
					soreness: body.soreness
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
				//let array = [exercises_core_pack, exercises_core_pack];// add exercise packs here.
						let cypher = 	'MATCH (trainer:TRAINER {username: $username}) '+
										'WITH '+exercises_core_pack + ' AS core,'+exercises_core_pack2+' AS core2 '+
										'UNWIND (core + core2) AS move '+
										'MERGE (exercise:EXERCISE {name: move.name} ) '+
										'MERGE (trainer)-[:CREATED]->(exercise) '+
										'SET exercise += move '+
										'RETURN exercise';

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
										"MERGE (pattern:PATTERN {soreness: x.soreness, gender: x.gender, part: x.part, goal: x.goal, priority: x.priority} ) "+
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
