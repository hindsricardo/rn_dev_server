/* apps/buildfit/plan*/
import {secret} from './config';
import jwt from 'jsonwebtoken';
import uuid from 'node-uuid';
const header = {'Content-Type':'application/json; charset=utf-8'};

class Conversations {

	constructor(db, server) {
		this.name = 'Plan'

		server.post('/create/plan', (req, res, next) => {	
			let body = req.body;			
			let cypher1 = ["MATCH (client:CLIENT {username: {client}})", 
						  "RETURN client"].join('\n');

			db.query(cypher1, {
				client: body.username,
				trainer:body.trainer
			}, (err, result1) => {
				if(err) {
					console.log(err);
					res.writeHead(500, header);
					res.end(JSON.stringify({
						err:err,
						message: 'Something went wrong. Please try again'
					}))
				}
				else {
					let cypher2 = ["MATCH (setting:SETTING {trainer: {trainer}})",
								"RETURN setting"].join('\n');
					db.query(cypher2, {
						trainer:body.trainer
					}, (err, settings) => {
						if(err) {
							console.log(err);
							res.writeHead(500, header);
							res.end(JSON.stringify({
								err:err,
								message: 'Something went wrong. Please try again'
							}))
						} else{
							let cypher3 = ["MATCH (gsetting: GSETTING {trainer: {trainer}})",
										"RETURN gsetting"].join('\n');
							db.query(cypher3, {
								trainer:body.trainer
							}, (err, result3) => {
								if(err) {
									console.log(err);
									res.writeHead(500, header);
									res.end(JSON.stringify({
										err:err,
										message: 'Something went wrong. Please try again'
									}))
								} else {
									let cypher4 = ["MATCH (exercise: EXERCISE {trainer: {trainer}})",
												"RETURN exercise"].join('\n');
									db.query(cypher4, {
										trainer:body.trainer
									}, (err, result4) => {
										if(err) {
											console.log(err);
											res.writeHead(500, header);
											res.end(JSON.stringify({
												err:err,
												message: 'Something went wrong. Please try again'
											}))
										} else {
											let cypher5 = ["MATCH (goals: GOALS {client: {client}})",
														   "RETURN goals ORDER BY goals.created_at desc LIMIT 1"].join('\n');
											db.query(cypher5, {
												client:body.username
											}, (err, goals) => {
												if(err) {
													console.log(err);
													res.writeHead(500, header);
													res.end(JSON.stringify({
														err:err,
														message: 'Something went wrong. Please try again'
													}))
												} else {							

													let get_settings = (body) => {
															let rules = [];
															for(var key in body){
																for(var n = 0; n < settings.length; n++) {
																	if(body[key] == settings[n].goal && key == setting[n].part){
																		rules.push(settings[n]);
																	}
																}
															}

														return rules;

													}

													let rand = (myArray)=> { 
														myArray[Math.floor(Math.random() * myArray.length)];
													};

													

													res.writeHead(200, header);
											        res.end(JSON.stringify({
											        	success:'yes',
											        	client: result1,
											        	settings: settings,
											        	gsetting: result3,
											        	exercise: result4,
											        	goals: goals,
											        	data: get_settings(goals[0])
											        }));
											        console.log('/create/plan', JSON.stringify({
											        	success:'yes',
											        	client: result1,
											        	settings: settings,
											        	gsetting: result3,
											        	exercise: result4,
											        	goals: goals,
											        	data: get_settings(goals[0])
											        }));
											        return
												}
											})
									
										}
									})
								}
							})
						}
					})
				}
			})
		})

	}

}

export default Conversations