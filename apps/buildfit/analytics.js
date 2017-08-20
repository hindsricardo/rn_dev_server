/* apps/buildfit/plan*/
import {secret} from './config';
import jwt from 'jsonwebtoken';
import uuid from 'node-uuid';
import _ from 'underscore';
const header = {'Content-Type':'application/json; charset=utf-8'};

class Analytics {

	constructor(db, server) {
		this.name = 'Analytics'


		// FIND LIST OF TRAINERS THAT MATCH GOALS
		server.post('/bf/get/points', (req, res, next) => {	
			let twoweeksago = 1209600000;
			let fourweeksago = 2419200000;
			let sixweeksago = 3628800000;
			let eightweeksago = 4838400000;
			let currentTime = new Date().getTime()
			let glutes = 0;
			let	hamstrings = 0;
			let	back = 0;
			let	calves = 0;
			let	core = 0;
			let	biceps = 0;
			let	quads = 0;
			let	triceps = 0;
			let chest = 0;
			let	shoulders = 0;
			let body = req.body;			
			let cypher1 = [
						   "MATCH (n:USER {uuid:{id}})-[:COMPLETED]->(set)",
						   "WHERE set.stopTime > {currentTime} - {eightweeksago}" ,	// find all frameworks where framework parts is same as user input parts and framework goals match user input goals TODO: add , f.status = 'valid' for testing
						   
						   "RETURN DISTINCT set",
						   "ORDER BY set.stopTime"].join('\n');	// return the list of trainers as an array

				db.query(cypher1, {
					id: body.userid,
					currentTime: currentTime,
					eightweeksago: eightweeksago,
					glutes: 'glutes',
					hamstrings: 'hamstrings',
					back: 'back',
					calves: 'calves',
					core: 'core',
					biceps: 'biceps',
					quads: 'quads',
					triceps: 'triceps',
					shoulders: 'shoulders',
					chest: 'chest'


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
								let totalweight1 = 0; 
								let totalreps1 = 0; 
								let totaltime1 = 0; 
								let totalrest1 = 0; 
								let ptsAll = 0

								for(var i=0; i < results.length; i++){
									let ting = results[i];
									if(results[i - 1]){
										 totalrest1 += (parseInt(ting.startTime) - parseInt(results[i -1].stopTime)); //current set stop time versus pervious set stop time. ASSUMING response in order of oldest record last.
										 console.log('totalrest1', totalrest1)
									}

								totalweight1 += parseInt(ting.weightDone);
									totalreps1 += parseInt(ting.repsDone);									
									totaltime1 += parseInt(ting.stopTime) - parseInt(ting.startTime);
									let avgweight1 = Math.round((totalweight1/results.length));
									let avgreps1 = Math.round((totalreps1/results.length));
									let avgtime1 = Math.round(totaltime1/results.length);
									let avgrest1 = Math.round(totalrest1/results.length);
									let pts1 = ((avgweight1/(avgrest1 * 0.001)).toFixed(2)/((avgreps1)/(avgrest1 * 0.001))).toFixed(4);
									ptsAll = (pts1 * results.length).toFixed(1);
									console.log('totalweight1', totalweight1, 'totalreps1', totalreps1, 'totaltime1', totaltime1, 'avgweight1', avgweight1, 'avgreps1',avgreps1, 'avgtime1', avgtime1, 'avgrest1', avgrest1, 'pts1', pts1, 'ptsAll', ptsAll);
								}

							let cypher2 = [

							   "MATCH (n:USER {uuid:{id}})-[:COMPLETED]->(set {part: {glutes}})",
							   "WHERE set.stopTime > {currentTime} - {eightweeksago}" ,

							   "RETURN DISTINCT set ",
							   "ORDER BY set.stopTime"].join('\n');	// return the list of trainers as an array

							db.query(cypher2, {
								id: body.userid,
								currentTime: currentTime,
								eightweeksago: eightweeksago,
								glutes: 'glutes',
								hamstrings: 'hamstrings',
								back: 'back',
								calves: 'calves',
								core: 'core',
								biceps: 'biceps',
								quads: 'quads',
								triceps: 'triceps',
								shoulders: 'shoulders',
								chest: 'chest'


							},	(err, results2) => {
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
										console.log(results2);
											let totalweight1 = 0; 
											let totalreps1 = 0; 
											let totaltime1 = 0; 
											let totalrest1 = 0; 
											let ptsGlutes = 0

											for(var i=0; i < results2.length; i++){
												let ting = results2[i];
												if(results2[i - 1]){
													 totalrest1 += (parseInt(ting.startTime) - parseInt(results2[i -1].stopTime)); //current set stop time versus pervious set stop time. ASSUMING response in order of oldest record last.
													 console.log('totalrest1', totalrest1)
												}

											totalweight1 += parseInt(ting.weightDone);
												totalreps1 += parseInt(ting.repsDone);									
												totaltime1 += parseInt(ting.stopTime) - parseInt(ting.startTime);
												let avgweight1 = Math.round((totalweight1/results2.length));
												let avgreps1 = Math.round((totalreps1/results2.length));
												let avgtime1 = Math.round(totaltime1/results2.length);
												let avgrest1 = Math.round(totalrest1/results2.length);
												let pts1 = ((avgweight1/(avgrest1 * 0.001)).toFixed(2)/((avgreps1)/(avgrest1 * 0.001))).toFixed(4);
												ptsGlutes = (pts1 * results2.length).toFixed(1);
												console.log('totalweight1', totalweight1, 'totalreps1', totalreps1, 'totaltime1', totaltime1, 'avgweight1', avgweight1, 'avgreps1',avgreps1, 'avgtime1', avgtime1, 'avgrest1', avgrest1, 'pts1', pts1, 'ptsGlutes', ptsGlutes);
											}
							

										let cypher3 = [

										   "MATCH (n:USER {uuid:{id}})-[:COMPLETED]->(set {part: {hamstrings}})",
										   "WHERE set.stopTime > {currentTime} - {eightweeksago}" ,

										   "RETURN DISTINCT set ",
										   "ORDER BY set.stopTime"].join('\n');	// return the list of trainers as an array

										db.query(cypher3, {
											id: body.userid,
											currentTime: currentTime,
											eightweeksago: eightweeksago,
											glutes: 'glutes',
											hamstrings: 'hamstrings',
											back: 'back',
											calves: 'calves',
											core: 'core',
											biceps: 'biceps',
											quads: 'quads',
											triceps: 'triceps',
											shoulders: 'shoulders',
											chest: 'chest'


										},	(err, results3) => {
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
														let totalweight1 = 0; 
														let totalreps1 = 0; 
														let totaltime1 = 0; 
														let totalrest1 = 0; 
														let ptsHamstrings = 0

														for(var i=0; i < results3.length; i++){
															let ting = results3[i];
															if(results3[i - 1]){
																 totalrest1 += (parseInt(ting.startTime) - parseInt(results3[i -1].stopTime)); //current set stop time versus pervious set stop time. ASSUMING response in order of oldest record last.
																 console.log('totalrest1', totalrest1)
															}

														totalweight1 += parseInt(ting.weightDone);
															totalreps1 += parseInt(ting.repsDone);									
															totaltime1 += parseInt(ting.stopTime) - parseInt(ting.startTime);
															let avgweight1 = Math.round((totalweight1/results3.length));
															let avgreps1 = Math.round((totalreps1/results3.length));
															let avgtime1 = Math.round(totaltime1/results3.length);
															let avgrest1 = Math.round(totalrest1/results3.length);
															let pts1 = ((avgweight1/(avgrest1 * 0.001)).toFixed(2)/((avgreps1)/(avgrest1 * 0.001))).toFixed(4);
															ptsHamstrings = (pts1 * results3.length).toFixed(1);
															console.log('totalweight1', totalweight1, 'totalreps1', totalreps1, 'totaltime1', totaltime1, 'avgweight1', avgweight1, 'avgreps1',avgreps1, 'avgtime1', avgtime1, 'avgrest1', avgrest1, 'pts1', pts1, 'ptsHamstrings', ptsHamstrings);
														}
										

													let cypher4 = [

													   "MATCH (n:USER {uuid:{id}})-[:COMPLETED]->(set {part: {back}})",
													   "WHERE set.stopTime > {currentTime} - {eightweeksago}" ,

													   "RETURN DISTINCT set ",
													   "ORDER BY set.stopTime"].join('\n');	// return the list of trainers as an array

													db.query(cypher4, {
														id: body.userid,
														currentTime: currentTime,
														eightweeksago: eightweeksago,
														glutes: 'glutes',
														hamstrings: 'hamstrings',
														back: 'back',
														calves: 'calves',
														core: 'core',
														biceps: 'biceps',
														quads: 'quads',
														triceps: 'triceps',
														shoulders: 'shoulders',
														chest: 'chest'


													},	(err, results4) => {
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
																	let totalweight1 = 0; 
																	let totalreps1 = 0; 
																	let totaltime1 = 0; 
																	let totalrest1 = 0; 
																	let ptsBack = 0;

																	for(var i=0; i < results4.length; i++){
																		let ting = results4[i];
																		if(results4[i - 1]){
																			 totalrest1 += (parseInt(ting.startTime) - parseInt(results4[i -1].stopTime)); //current set stop time versus pervious set stop time. ASSUMING response in order of oldest record last.
																			 console.log('totalrest1', totalrest1)
																		}

																	totalweight1 += parseInt(ting.weightDone);
																		totalreps1 += parseInt(ting.repsDone);									
																		totaltime1 += parseInt(ting.stopTime) - parseInt(ting.startTime);
																		let avgweight1 = Math.round((totalweight1/results4.length));
																		let avgreps1 = Math.round((totalreps1/results4.length));
																		let avgtime1 = Math.round(totaltime1/results4.length);
																		let avgrest1 = Math.round(totalrest1/results4.length);
																		let pts1 = ((avgweight1/(avgrest1 * 0.001)).toFixed(2)/((avgreps1)/(avgrest1 * 0.001))).toFixed(4);
																		ptsBack = (pts1 * results4.length).toFixed(1);
																		console.log('totalweight1', totalweight1, 'totalreps1', totalreps1, 'totaltime1', totaltime1, 'avgweight1', avgweight1, 'avgreps1',avgreps1, 'avgtime1', avgtime1, 'avgrest1', avgrest1, 'pts1', pts1, 'ptsBack', ptsBack);
																	}
		

																let cypher5 = [

															   "MATCH (n:USER {uuid:{id}})-[:COMPLETED]->(set {part: {calves}})",
															   "WHERE set.stopTime > {currentTime} - {eightweeksago}" ,

															   "RETURN DISTINCT set ",
															   "ORDER BY set.stopTime"].join('\n');	// return the list of trainers as an array

															db.query(cypher5, {
																id: body.userid,
																currentTime: currentTime,
																eightweeksago: eightweeksago,
																glutes: 'glutes',
																hamstrings: 'hamstrings',
																back: 'back',
																calves: 'calves',
																core: 'core',
																biceps: 'biceps',
																quads: 'quads',
																triceps: 'triceps',
																shoulders: 'shoulders',
																chest: 'chest'


															},	(err, results5) => {
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
																			let totalweight1 = 0; 
																			let totalreps1 = 0; 
																			let totaltime1 = 0; 
																			let totalrest1 = 0; 
																			let ptsCalves = 0

																			for(var i=0; i < results5.length; i++){
																				let ting = results5[i];
																				if(results5[i - 1]){
																					 totalrest1 += (parseInt(ting.startTime) - parseInt(results5[i -1].stopTime)); //current set stop time versus pervious set stop time. ASSUMING response in order of oldest record last.
																					 console.log('totalrest1', totalrest1)
																				}

																			totalweight1 += parseInt(ting.weightDone);
																				totalreps1 += parseInt(ting.repsDone);									
																				totaltime1 += parseInt(ting.stopTime) - parseInt(ting.startTime);
																				let avgweight1 = Math.round((totalweight1/results5.length));
																				let avgreps1 = Math.round((totalreps1/results5.length));
																				let avgtime1 = Math.round(totaltime1/results5.length);
																				let avgrest1 = Math.round(totalrest1/results5.length);
																				let pts1 = ((avgweight1/(avgrest1 * 0.001)).toFixed(2)/((avgreps1)/(avgrest1 * 0.001))).toFixed(4);
																				ptsCalves = (pts1 * results5.length).toFixed(1);
																				console.log('totalweight1', totalweight1, 'totalreps1', totalreps1, 'totaltime1', totaltime1, 'avgweight1', avgweight1, 'avgreps1',avgreps1, 'avgtime1', avgtime1, 'avgrest1', avgrest1, 'pts1', pts1, 'ptsCalves', ptsCalves);
																			}

																	let cypher6 = [

																			   "MATCH (n:USER {uuid:{id}})-[:COMPLETED]->(set {part: {core}})",
																			   "WHERE set.stopTime > {currentTime} - {eightweeksago}" ,

																			   "RETURN DISTINCT set ",
																			   "ORDER BY set.stopTime"].join('\n');	// return the list of trainers as an array

																			db.query(cypher6, {
																				id: body.userid,
																				currentTime: currentTime,
																				eightweeksago: eightweeksago,
																				glutes: 'glutes',
																				hamstrings: 'hamstrings',
																				back: 'back',
																				calves: 'calves',
																				core: 'core',
																				biceps: 'biceps',
																				quads: 'quads',
																				triceps: 'triceps',
																				shoulders: 'shoulders',
																				chest: 'chest'


																			},	(err, results6) => {
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
																							let totalweight1 = 0; 
																							let totalreps1 = 0; 
																							let totaltime1 = 0; 
																							let totalrest1 = 0; 
																							let ptsCore = 0

																							for(var i=0; i < results6.length; i++){
																								let ting = results6[i];
																								if(results6[i - 1]){
																									 totalrest1 += (parseInt(ting.startTime) - parseInt(results6[i -1].stopTime)); //current set stop time versus pervious set stop time. ASSUMING response in order of oldest record last.
																									 console.log('totalrest1', totalrest1)
																								}

																							totalweight1 += parseInt(ting.weightDone);
																								totalreps1 += parseInt(ting.repsDone);									
																								totaltime1 += parseInt(ting.stopTime) - parseInt(ting.startTime);
																								let avgweight1 = Math.round((totalweight1/results6.length));
																								let avgreps1 = Math.round((totalreps1/results6.length));
																								let avgtime1 = Math.round(totaltime1/results6.length);
																								let avgrest1 = Math.round(totalrest1/results6.length);
																								let pts1 = ((avgweight1/(avgrest1 * 0.001)).toFixed(2)/((avgreps1)/(avgrest1 * 0.001))).toFixed(4);
																								ptsCore = (pts1 * results6.length).toFixed(1);
																								console.log('totalweight1', totalweight1, 'totalreps1', totalreps1, 'totaltime1', totaltime1, 'avgweight1', avgweight1, 'avgreps1',avgreps1, 'avgtime1', avgtime1, 'avgrest1', avgrest1, 'pts1', pts1, 'ptsCore', ptsCore);
																							}


																					let cypher7 = [

																					   "MATCH (n:USER {uuid:{id}})-[:COMPLETED]->(set {part: {biceps}})",
																					   "WHERE set.stopTime > {currentTime} - {eightweeksago}" ,

																					   "RETURN DISTINCT set ",
																					   "ORDER BY set.stopTime"].join('\n');	// return the list of trainers as an array

																					db.query(cypher7, {
																						id: body.userid,
																						currentTime: currentTime,
																						eightweeksago: eightweeksago,
																						glutes: 'glutes',
																						hamstrings: 'hamstrings',
																						back: 'back',
																						calves: 'calves',
																						core: 'core',
																						biceps: 'biceps',
																						quads: 'quads',
																						triceps: 'triceps',
																						shoulders: 'shoulders',
																						chest: 'chest'


																					},	(err, results7) => {
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
																									let totalweight1 = 0; 
																									let totalreps1 = 0; 
																									let totaltime1 = 0; 
																									let totalrest1 = 0; 
																									let ptsBiceps = 0

																									for(var i=0; i < results7.length; i++){
																										let ting = results7[i];
																										if(results7[i - 1]){
																											 totalrest1 += (parseInt(ting.startTime) - parseInt(results7[i -1].stopTime)); //current set stop time versus pervious set stop time. ASSUMING response in order of oldest record last.
																											 console.log('totalrest1', totalrest1)
																										}

																									totalweight1 += parseInt(ting.weightDone);
																										totalreps1 += parseInt(ting.repsDone);									
																										totaltime1 += parseInt(ting.stopTime) - parseInt(ting.startTime);
																										let avgweight1 = Math.round((totalweight1/results7.length));
																										let avgreps1 = Math.round((totalreps1/results7.length));
																										let avgtime1 = Math.round(totaltime1/results7.length);
																										let avgrest1 = Math.round(totalrest1/results7.length);
																										let pts1 = ((avgweight1/(avgrest1 * 0.001)).toFixed(2)/((avgreps1)/(avgrest1 * 0.001))).toFixed(4);
																										ptsBiceps = (pts1 * results7.length).toFixed(1);
																										console.log('totalweight1', totalweight1, 'totalreps1', totalreps1, 'totaltime1', totaltime1, 'avgweight1', avgweight1, 'avgreps1',avgreps1, 'avgtime1', avgtime1, 'avgrest1', avgrest1, 'pts1', pts1, 'ptsBiceps', ptsBiceps);
																									}

																							let cypher8 = [

																							   "MATCH (n:USER {uuid:{id}})-[:COMPLETED]->(set {part: {quads}})",
																							   "WHERE set.stopTime > {currentTime} - {eightweeksago}" ,

																							   "RETURN DISTINCT set ",
																							   "ORDER BY set.stopTime"].join('\n');	// return the list of trainers as an array

																							db.query(cypher8, {
																								id: body.userid,
																								currentTime: currentTime,
																								eightweeksago: eightweeksago,
																								glutes: 'glutes',
																								hamstrings: 'hamstrings',
																								back: 'back',
																								calves: 'calves',
																								core: 'core',
																								biceps: 'biceps',
																								quads: 'quads',
																								triceps: 'triceps',
																								shoulders: 'shoulders',
																								chest: 'chest'


																							},	(err, results8) => {
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
																											let totalweight1 = 0; 
																											let totalreps1 = 0; 
																											let totaltime1 = 0; 
																											let totalrest1 = 0; 
																											let ptsQuads = 0

																											for(var i=0; i < results8.length; i++){
																												let ting = results8[i];
																												if(results8[i - 1]){
																													 totalrest1 += (parseInt(ting.startTime) - parseInt(results8[i -1].stopTime)); //current set stop time versus pervious set stop time. ASSUMING response in order of oldest record last.
																													 console.log('totalrest1', totalrest1)
																												}

																											totalweight1 += parseInt(ting.weightDone);
																												totalreps1 += parseInt(ting.repsDone);									
																												totaltime1 += parseInt(ting.stopTime) - parseInt(ting.startTime);
																												let avgweight1 = Math.round((totalweight1/results8.length));
																												let avgreps1 = Math.round((totalreps1/results8.length));
																												let avgtime1 = Math.round(totaltime1/results8.length);
																												let avgrest1 = Math.round(totalrest1/results8.length);
																												let pts1 = ((avgweight1/(avgrest1 * 0.001)).toFixed(2)/((avgreps1)/(avgrest1 * 0.001))).toFixed(4);
																												ptsQuads = (pts1 * results8.length).toFixed(1);
																												console.log('totalweight1', totalweight1, 'totalreps1', totalreps1, 'totaltime1', totaltime1, 'avgweight1', avgweight1, 'avgreps1',avgreps1, 'avgtime1', avgtime1, 'avgrest1', avgrest1, 'pts1', pts1, 'ptsQuads', ptsQuads);
																											}
																		

																									let cypher9 = [

																										   "MATCH (n:USER {uuid:{id}})-[:COMPLETED]->(set {part: {triceps}})",
																										   "WHERE set.stopTime > {currentTime} - {eightweeksago}" ,

																										   "RETURN DISTINCT set ",
																										   "ORDER BY set.stopTime"].join('\n');	// return the list of trainers as an array

																										db.query(cypher9, {
																											id: body.userid,
																											currentTime: currentTime,
																											eightweeksago: eightweeksago,
																											glutes: 'glutes',
																											hamstrings: 'hamstrings',
																											back: 'back',
																											calves: 'calves',
																											core: 'core',
																											biceps: 'biceps',
																											quads: 'quads',
																											triceps: 'triceps',
																											shoulders: 'shoulders',
																											chest: 'chest'


																										},	(err, results9) => {
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
																														let totalweight1 = 0; 
																														let totalreps1 = 0; 
																														let totaltime1 = 0; 
																														let totalrest1 = 0; 
																														let ptsTriceps = 0

																														for(var i=0; i < results9.length; i++){
																															let ting = results9[i];
																															if(results9[i - 1]){
																																 totalrest1 += (parseInt(ting.startTime) - parseInt(results9[i -1].stopTime)); //current set stop time versus pervious set stop time. ASSUMING response in order of oldest record last.
																																 console.log('totalrest1', totalrest1)
																															}

																														totalweight1 += parseInt(ting.weightDone);
																															totalreps1 += parseInt(ting.repsDone);									
																															totaltime1 += parseInt(ting.stopTime) - parseInt(ting.startTime);
																															let avgweight1 = Math.round((totalweight1/results9.length));
																															let avgreps1 = Math.round((totalreps1/results9.length));
																															let avgtime1 = Math.round(totaltime1/results9.length);
																															let avgrest1 = Math.round(totalrest1/results9.length);
																															let pts1 = ((avgweight1/(avgrest1 * 0.001)).toFixed(2)/((avgreps1)/(avgrest1 * 0.001))).toFixed(4);
																															ptsTriceps = (pts1 * results9.length).toFixed(1);
																															console.log('totalweight1', totalweight1, 'totalreps1', totalreps1, 'totaltime1', totaltime1, 'avgweight1', avgweight1, 'avgreps1',avgreps1, 'avgtime1', avgtime1, 'avgrest1', avgrest1, 'pts1', pts1, 'ptsTriceps', ptsTriceps);
																														}
																													let cypher10 = [

																													   "MATCH (n:USER {uuid:{id}})-[:COMPLETED]->(set {part: {shoulders}})",
																													   "WHERE set.stopTime > {currentTime} - {eightweeksago}" ,

																													   "RETURN DISTINCT set ",
																													   "ORDER BY set.stopTime"].join('\n');	// return the list of trainers as an array

																													db.query(cypher10, {
																														id: body.userid,
																														currentTime: currentTime,
																														eightweeksago: eightweeksago,
																														glutes: 'glutes',
																														hamstrings: 'hamstrings',
																														back: 'back',
																														calves: 'calves',
																														core: 'core',
																														biceps: 'biceps',
																														quads: 'quads',
																														triceps: 'triceps',
																														shoulders: 'shoulders',
																														chest: 'chest'


																													},	(err, results10) => {
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
																																	let totalweight1 = 0; 
																																	let totalreps1 = 0; 
																																	let totaltime1 = 0; 
																																	let totalrest1 = 0; 
																																	let ptsShoulders = 0

																																	for(var i=0; i < results10.length; i++){
																																		let ting = results10[i];
																																		if(results10[i - 1]){
																																			 totalrest1 += (parseInt(ting.startTime) - parseInt(results10[i -1].stopTime)); //current set stop time versus pervious set stop time. ASSUMING response in order of oldest record last.
																																			 console.log('totalrest1', totalrest1)
																																		}

																																	totalweight1 += parseInt(ting.weightDone);
																																		totalreps1 += parseInt(ting.repsDone);									
																																		totaltime1 += parseInt(ting.stopTime) - parseInt(ting.startTime);
																																		let avgweight1 = Math.round((totalweight1/results10.length));
																																		let avgreps1 = Math.round((totalreps1/results10.length));
																																		let avgtime1 = Math.round(totaltime1/results10.length);
																																		let avgrest1 = Math.round(totalrest1/results10.length);
																																		let pts1 = ((avgweight1/(avgrest1 * 0.001)).toFixed(2)/((avgreps1)/(avgrest1 * 0.001))).toFixed(4);
																																		ptsShoulders = (pts1 * results10.length).toFixed(1);
																																		console.log('totalweight1', totalweight1, 'totalreps1', totalreps1, 'totaltime1', totaltime1, 'avgweight1', avgweight1, 'avgreps1',avgreps1, 'avgtime1', avgtime1, 'avgrest1', avgrest1, 'pts1', pts1, 'ptsShoulders', ptsShoulders);
																																	}

																															let cypher11 = [

																																   "MATCH (n:USER {uuid:{id}})-[:COMPLETED]->(set {part: {chest}})",
																																   "WHERE set.stopTime > {currentTime} - {eightweeksago}" ,

																																   "RETURN DISTINCT set ",
																																   "ORDER BY set.stopTime"].join('\n');	// return the list of trainers as an array

																																db.query(cypher11, {
																																	id: body.userid,
																																	currentTime: currentTime,
																																	eightweeksago: eightweeksago,
																																	glutes: 'glutes',
																																	hamstrings: 'hamstrings',
																																	back: 'back',
																																	calves: 'calves',
																																	core: 'core',
																																	biceps: 'biceps',
																																	quads: 'quads',
																																	triceps: 'triceps',
																																	shoulders: 'shoulders',
																																	chest: 'chest'


																																},	(err, results11) => {
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
																																				let totalweight1 = 0; 
																																				let totalreps1 = 0; 
																																				let totaltime1 = 0; 
																																				let totalrest1 = 0; 
																																				let ptsChest = 0
																																				Promise.resolve(true).then(()=>{

																																				for(var i=0; i < results11.length; i++){
																																					let ting = results11[i];
																																					if(results11[i - 1]){
																																						 totalrest1 += (parseInt(ting.startTime) - parseInt(results11[i -1].stopTime)); //current set stop time versus pervious set stop time. ASSUMING response in order of oldest record last.
																																						 console.log('totalrest1', totalrest1)
																																					}

																																				totalweight1 += parseInt(ting.weightDone);
																																					totalreps1 += parseInt(ting.repsDone);									
																																					totaltime1 += parseInt(ting.stopTime) - parseInt(ting.startTime);
																																					let avgweight1 = Math.round((totalweight1/results11.length));
																																					let avgreps1 = Math.round((totalreps1/results11.length));
																																					let avgtime1 = Math.round(totaltime1/results11.length);
																																					let avgrest1 = Math.round(totalrest1/results11.length);
																																					let pts1 = ((avgweight1/(avgrest1 * 0.001)).toFixed(2)/((avgreps1)/(avgrest1 * 0.001))).toFixed(4);
																																					ptsChest = (pts1 * results11.length).toFixed(1);
																																					console.log('totalweight1', totalweight1, 'totalreps1', totalreps1, 'totaltime1', totaltime1, 'avgweight1', avgweight1, 'avgreps1',avgreps1, 'avgtime1', avgtime1, 'avgrest1', avgrest1, 'pts1', pts1, 'ptsChest', ptsChest);
																																				}
																																				}).then(()=>{
																																						console.log('tings here')
																																						res.writeHead(200, header);
																																				        res.end(JSON.stringify({
																																					        	success:'yes',
																																					        	ptsAll: ptsAll,
																																					        	ptsGlutes: ptsGlutes,
																																					        	ptsChest: ptsChest, 
																																					        	ptsShoulders: ptsShoulders,
																																					        	ptsTriceps: ptsTriceps,
																																					        	ptsQuads: ptsQuads,
																																					        	ptsBiceps: ptsBiceps,
																																					        	ptsCore: ptsCore,
																																					        	ptsCalves, ptsCalves,
																																					        	ptsBack: ptsBack,
																																					        	ptsHamstrings: ptsHamstrings
																																				        	}));
																																				        console.log(JSON.stringify({
																																				        	success:'yes',
																																				        	ptsAll: ptsAll,
																																				        	ptsGlutes: ptsGlutes,
																																				        	ptsChest: ptsChest, 
																																				        	ptsShoulders: ptsShoulders,
																																				        	ptsTriceps: ptsTriceps,
																																				        	ptsQuads: ptsQuads,
																																				        	ptsBiceps: ptsBiceps,
																																				        	ptsCore: ptsCore,
																																				        	ptsCalves, ptsCalves,
																																				        	ptsBack: ptsBack,
																																				        	ptsHamstrings: ptsHamstrings







																																				        }));
																																			        	return
																																				})




																																	} // end of else cypher 11
																																			
																																})
																										




																														} // end of else cypher 10
																																
																													})




																											} // end of else cypher 9
																													
																										})


																								} // end of else cypher 8
																										
																							})


																						} // end of else cypher 7
																								
																					})

																				} // end of else cypher 6
																						
																			})
								



																} // end of else cypher 5
																		
															})


														} // end of else cypher 4
																
													})


											} // end of else cypher 3
													
										})



								} // end of else cypher 2
										
							})




					} // end of else cypher1
							
				})



		}) // end of '/bf/get/points'

		server.post('/bf/get/lastworkout', (req, res, next) => {
			let body = req.body;
			let cypher = [
						    "MATCH (u:USER {uuid:{id}})-[:COMPLETED]->(set)",
							"RETURN set",
							"Order by set.created_at desc",
							"Limit 1"].join('\n');	
			db.query(cypher, {
					id: body.userid,
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
						console.log(results)
						let cypher2 = [
										"MATCH (u:USER {uuid: {id}})-[:COMPLETED]->(set {planUUID:{planUUID}})",
										"RETURN DISTINCT set ",
										 "ORDER BY set.stopTime" ].join('\n');
						db.query(cypher2, {
							planUUID: results[0].planUUID,
							id: body.userid
						}, (err, results2) => {
							console.log('results2', results2)
							let totalweight = 0; 
							let totalreps = 0; 
							let totaltime = 0; 
							let totalrest = 0; 
							let avgweight = 0;
							let avgreps = 0;
							let avgtime = 0;
							let avgrest = 0;
							let timeperRep = 0;

							Promise.resolve(true).then(()=>{

								for(var i=0; i < results2.length; i++){
										let ting = results2[i];
										if(results2[i - 1]){
											 totalrest += (parseInt(ting.startTime) - parseInt(results2[i -1].stopTime)); //current set stop time versus pervious set stop time. ASSUMING response in order of oldest record last.
										}

										totalweight += parseInt(ting.weightDone);
										totalreps += parseInt(ting.repsDone);									
										totaltime += parseInt(ting.stopTime - ting.startTime);
										avgweight = Math.round((totalweight/results2.length));
										avgreps = Math.round((totalreps/results2.length));
										avgtime = Math.round(totaltime/results2.length);
										avgrest = Math.round(totalrest/results2.length);
										timeperRep =  Math.round(totaltime/totalreps);
										console.log('/bf/get/lastworkout','totalweight1', totalweight, 'totalreps1', totalreps, 'totaltime1', totaltime, 'avgweight1', avgweight, 'avgreps1', avgreps, 'avgtime1', avgtime, 'avgrest1', avgrest);
									}
							})
							.then(()=>{
								res.writeHead(200, header);
						        res.end(JSON.stringify({
						        	success:'yes',
						        	part: results2[0].part,
						        	goal: results2[0].goal,
						        	date: results2[0].stopTime,
						        	planUUID: results2[0].planUUID,
						        	totalweight: totalweight,
						        	totalreps: totalreps,
						        	totaltime: totaltime,
						        	avgweight: avgweight,
						        	avgreps: avgreps,
						        	avgtime: avgtime,
						        	avgrest: avgrest,
						        	timeperRep: timeperRep


					        	}));
						        console.log(JSON.stringify({
						        	success:'yes',
						        	part: results2[0].part,
						        	goal: results2[0].goal,
						        	date: results2[0].stopTime,
						        	planUUID: results2[0].planUUID,
						        	totalweight: totalweight,
						        	totalreps: totalreps,
						        	totaltime: totaltime,
						        	avgweight: avgweight,
						        	avgreps: avgreps,
						        	avgtime: avgtime,
						        	avgrest: avgrest,
						        	timeperRep: timeperRep,
								}))
								return;
							})
								
							
						})
						
					}
				})

			
		}) //end of '/bf/get/lastworkout'

		server.post('/bf/get/sets', (req, res, next) => {
			let body = req.body;
			let cypher = [
						    "MATCH (u:USER {uuid:{id}})-[:COMPLETED]->(set {part:{bodypart}})",
							"RETURN set",
							"Order by set.stopTime"].join('\n');	
			db.query(cypher, {
					id: body.userid,
					bodypart:body.bodypart
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
				        	sets: results,

			        	}));
				        console.log(JSON.stringify({
				        	success:'yes',
				        	sets: results,
						}))
						return;

					}
				})

			
		}) //end of '/bf/get/sets'

		server.post('/bf/get/part/avgs', (req, res, next) => {
			let currentTime = new Date().getTime()
			let eightweeksago = 4838400000;
			let body = req.body;
			let cypher = [
						    "MATCH (u:USER {uuid:{id}})-[:COMPLETED]->(set {part:{bodypart}})",
						    "WHERE set.stopTime > {currentTime} - {eightweeksago}" ,
							"RETURN set",
							"Order by set.stopTime"].join('\n');	
			db.query(cypher, {
					id: body.userid,
					bodypart:body.bodypart,
					currentTime: currentTime,
					eightweeksago: eightweeksago,
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
						let totalweight = 0; 
						let totalreps = 0; 
						let totaltime = 0; 
						let totalrest = 0; 
						let avgweight = 0;
						let avgreps = 0;
						let avgtime = 0;
						let avgrest = 0;
						let timeperRep = 0;
						Promise.resolve(true).then(()=>{

						for(var i=0; i < results.length; i++){
							let ting = results[i];
							if(results[i - 1]){
								 totalrest += (parseInt(ting.startTime) - parseInt(results[i -1].stopTime)); //current set stop time versus pervious set stop time. ASSUMING response in order of oldest record last.
								 console.log('totalrest', totalrest)
							}

							totalweight += parseInt(ting.weightDone);
							totalreps += parseInt(ting.repsDone);									
							totaltime += parseInt(ting.stopTime) - parseInt(ting.startTime);
							avgweight = Math.round((totalweight/results.length));
							avgreps = Math.round((totalreps/results.length));
							avgtime = Math.round(totaltime/results.length);
							avgrest = Math.round(totalrest/results.length);
							timeperRep =  Math.round(totaltime/totalreps);
							}
						}).then(()=>{
							res.writeHead(200, header);
					        res.end(JSON.stringify({
					        	success:'yes',
					        	sets: results,
					        	avgweight: avgweight,
					        	avgreps: avgreps,
					        	avgtime: avgtime,
					        	avgrest: avgrest,
					        	timeperRep: timeperRep

				        	}));
					        console.log(JSON.stringify({
					        	success:'yes',
					        	sets: results,
					        	avgweight: avgweight,
					        	avgreps: avgreps,
					        	avgtime: avgtime,
					        	avgrest: avgrest,
					        	timeperRep: timeperRep
							}))
							return;
						})

					}
				})

			
		}) //end of '/bf/get/part/avgs'


		server.post('/bf/get/part/avgs/lifetime', (req, res, next) => {
			let body = req.body;
			let cypher = [
						    "MATCH (u:USER {uuid:{id}})-[:COMPLETED]->(set {part:{bodypart}})",
							"RETURN set",
							"Order by set.stopTime"].join('\n');	
			db.query(cypher, {
					id: body.userid,
					bodypart:body.bodypart,
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
						let totalweight = 0; 
						let totalreps = 0; 
						let totaltime = 0; 
						let totalrest = 0; 
						let avgweight = 0;
						let avgreps = 0;
						let avgtime = 0;
						let avgrest = 0;
						let timeperRep = 0;
						Promise.resolve(true).then(()=>{

						for(var i=0; i < results.length; i++){
							let ting = results[i];
							if(results[i - 1]){
								 totalrest += (parseInt(ting.startTime) - parseInt(results[i -1].stopTime)); //current set stop time versus pervious set stop time. ASSUMING response in order of oldest record last.
								 console.log('totalrest', totalrest)
							}

							totalweight += parseInt(ting.weightDone);
							totalreps += parseInt(ting.repsDone);									
							totaltime += parseInt(ting.stopTime) - parseInt(ting.startTime);
							avgweight = Math.round((totalweight/results.length));
							avgreps = Math.round((totalreps/results.length));
							avgtime = Math.round(totaltime/results.length);
							avgrest = Math.round(totalrest/results.length);
							timeperRep =  Math.round(totaltime/totalreps);
							}
						}).then(()=>{
							res.writeHead(200, header);
					        res.end(JSON.stringify({
					        	success:'yes',
					        	sets: results,
					        	avgweight: avgweight,
					        	avgreps: avgreps,
					        	avgtime: avgtime,
					        	avgrest: avgrest,
					        	timeperRep: timeperRep

				        	}));
					        console.log(JSON.stringify({
					        	success:'yes',
					        	sets: results,
					        	avgweight: avgweight,
					        	avgreps: avgreps,
					        	avgtime: avgtime,
					        	avgrest: avgrest,
					        	timeperRep: timeperRep
							}))
							return;
						})

					}
				})

			
		}) //end of '/bf/get/part/avgs/lifetime'

		server.post('/bf/set/results/feedback', (req, res, next) => {
			let body = req.body;
			let twoweeksago = 1209600000;
			let fourweeksago = 2419200000;
			let sixweeksago = 3628800000;
			let eightweeksago = 4838400000;
			let currentTime = new Date().getTime()
			let cypher = [
						    "MATCH (set4 {part:{bodypart}})<-[:COMPLETED]-(u:USER {uuid:{id}})",
						    "WHERE set4.stopTime > {currentTime} - {twoweeksago}",
						    "CREATE (result:RESULT {timestamp:{currentTime}, results:{score}})-[:RECORDED {importance:.05}]->(set4)", // create relationship between current result and set4 2 weeks or less
						    "WITH result",
						    "MATCH (set3 {part:{bodypart}})<-[:COMPLETED]-(u:USER {uuid:{id}})",
						    "WHERE set3.stopTime > {currentTime} - {fourweeksago} AND set3.stopTime < {currentTime} - {twoweeksago}",
						    "CREATE (result)-[:RECORDED {importance:.15}]->(set3)", // create relationship between current result and set3 2 to 4 weeks
						    "WITH result",
						    "MATCH (set2 {part:{bodypart}})<-[:COMPLETED]-(u:USER {uuid:{id}})",
						    "WHERE set2.stopTime > {currentTime} - {sixweeksago} AND set2.stopTime < {currentTime} - {fourweeksago}",
						    "CREATE (result)-[:RECORDED {importance:.25}]->(set2)", // create relationship between current result and set2 4 to 6 weeks
						    "WITH result",
						    "MATCH (set1 {part:{bodypart}})<-[:COMPLETED]-(u:USER {uuid:{id}})",
						    "WHERE set1.stopTime > {currentTime} - {eightweeksago} AND set1.stopTime < {currentTime} - {sixweeksago}",
						    "CREATE (result)-[:RECORDED {importance:.55}]->(set1)", //CREATE result and add relationship to set1 6 to 8 weeks
							"RETURN result"].join('\n');	
			db.query(cypher, {
					id: body.userid,
					bodypart:body.bodypart,
					twoweeksago: twoweeksago,
					fourweeksago: fourweeksago,
					sixweeksago: sixweeksago,
					eightweeksago: eightweeksago,
					currentTime: currentTime,
					score: body.score
				},	(err, results) => {
					if(results.length > 0){
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
								}))
								return;

						}
					}
					else{
						let cypher2 = [
						    "MATCH (set3 {part:{bodypart}})<-[:COMPLETED]-(u:USER {uuid:{id}})",
						    "WHERE set3.stopTime > {currentTime} - {fourweeksago} AND set3.stopTime < {currentTime} - {twoweeksago}",
						    "CREATE (result:RESULT {timestamp:{currentTime}, results:{score}})-[:RECORDED {importance:.15}]->(set3)", // create relationship between current result and set3 2 to 4 weeks
						    "WITH result",
						    "MATCH (set2 {part:{bodypart}})<-[:COMPLETED]-(u:USER {uuid:{id}})",
						    "WHERE set2.stopTime > {currentTime} - {sixweeksago} AND set2.stopTime < {currentTime} - {fourweeksago}",
						    "CREATE (result)-[:RECORDED {importance:.25}]->(set2)", // create relationship between current result and set2 4 to 6 weeks
						    "WITH result",
						    "MATCH (set1 {part:{bodypart}})<-[:COMPLETED]-(u:USER {uuid:{id}})",
						    "WHERE set1.stopTime > {currentTime} - {eightweeksago} AND set1.stopTime < {currentTime} - {sixweeksago}",
						    "CREATE (result)-[:RECORDED {importance:.55}]->(set1)", //CREATE result and add relationship to set1 6 to 8 weeks
							"RETURN result"].join('\n');	
						db.query(cypher2, {
								id: body.userid,
								bodypart:body.bodypart,
								twoweeksago: twoweeksago,
								fourweeksago: fourweeksago,
								sixweeksago: sixweeksago,
								eightweeksago: eightweeksago,
								currentTime: currentTime,
								score: body.score
							},	(err, results2) => {
								if(results2.length > 0){
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
									        	results: results2,

								        	}));
									        console.log(JSON.stringify({
									        	success:'yes',
									        	results: results2,
											}))
											return;

									}
								}
								else{
									let cypher3 = [
									    "MATCH (set2 {part:{bodypart}})<-[:COMPLETED]-(u:USER {uuid:{id}})",
									    "WHERE set2.stopTime > {currentTime} - {sixweeksago} AND set2.stopTime < {currentTime} - {fourweeksago}",
									    "CREATE (result:RESULT {timestamp:{currentTime}, results:{score}})-[:RECORDED {importance:.25}]->(set2)", // create relationship between current result and set2 4 to 6 weeks
									    "WITH result",
									    "MATCH (set1 {part:{bodypart}})<-[:COMPLETED]-(u:USER {uuid:{id}})",
									    "WHERE set1.stopTime > {currentTime} - {eightweeksago} AND set1.stopTime < {currentTime} - {sixweeksago}",
									    "CREATE (result)-[:RECORDED {importance:.55}]->(set1)", //CREATE result and add relationship to set1 6 to 8 weeks
										"RETURN result"].join('\n');	
									db.query(cypher3, {
											id: body.userid,
											bodypart:body.bodypart,
											twoweeksago: twoweeksago,
											fourweeksago: fourweeksago,
											sixweeksago: sixweeksago,
											eightweeksago: eightweeksago,
											currentTime: currentTime,
											score: body.score
										},	(err, results3) => {
											if(results3.length > 0){
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
												        	results: results3,

											        	}));
												        console.log(JSON.stringify({
												        	success:'yes',
												        	results: results3,
														}))
														return;

												}
											}
											else{
												let cypher4 = [
												    "MATCH (set1 {part:{bodypart}})<-[:COMPLETED]-(u:USER {uuid:{id}})",
												    "WHERE set1.stopTime > {currentTime} - {eightweeksago} AND set1.stopTime < {currentTime} - {sixweeksago}",
												    "CREATE (result:RESULT {timestamp:{currentTime}, results:{score}})-[:RECORDED {importance:.55}]->(set1)", //CREATE result and add relationship to set1 6 to 8 weeks
													"RETURN result"].join('\n');	
												db.query(cypher4, {
														id: body.userid,
														bodypart:body.bodypart,
														twoweeksago: twoweeksago,
														fourweeksago: fourweeksago,
														sixweeksago: sixweeksago,
														eightweeksago: eightweeksago,
														currentTime: currentTime,
														score: body.score
													},	(err, results4) => {
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
															        	results: results4,

														        	}));
															        console.log(JSON.stringify({
															        	success:'yes',
															        	results: results4,
																	}))
																	return;

															}
													})
											}
										})
								}
							})
					}

				})

			
		}) //end of '/bf/set/results/feedback'


		server.post('/bf/check/need/results/feedback', (req, res, next) => {
			let twoweeksago = 1209600000/2; //dividing by 2 to make it one week to shorten feedback time period. This will keep users more engaged with the app. 
			let eightweeksago = 4838400000;
			let currentTime = new Date().getTime();
			let body = req.body;
			let cypher = [
						    "MATCH (u:USER {uuid:{id}})-[:COMPLETED]->(setGlutes {part:{glutes}})",
						    "WHERE setGlutes.stopTime < {currentTime} - {twoweeksago} AND setGlutes.stopTime > {currentTime} - {eightweeksago} AND NOT (setGlutes)<-[:RECORDED]-(:RESULT)",
							"MATCH (u:USER {uuid:{id}})-[:COMPLETED]->(sethamstrings {part:{hamstrings}})",
						    "WHERE sethamstrings.stopTime < {currentTime} - {twoweeksago} AND sethamstrings.stopTime > {currentTime} - {eightweeksago} AND NOT (sethamstrings)<-[:RECORDED]-(:RESULT)",
							"MATCH (u:USER {uuid:{id}})-[:COMPLETED]->(setback {part:{back}})",
						    "WHERE setback.stopTime < {currentTime} - {twoweeksago} AND setback.stopTime > {currentTime} - {eightweeksago} AND NOT (setback)<-[:RECORDED]-(:RESULT)",
							"MATCH (u:USER {uuid:{id}})-[:COMPLETED]->(setcalves {part:{calves}})",
						    "WHERE setcalves.stopTime < {currentTime} - {twoweeksago} AND setcalves.stopTime > {currentTime} - {eightweeksago} AND NOT (setcalves)<-[:RECORDED]-(:RESULT)",
							"MATCH (u:USER {uuid:{id}})-[:COMPLETED]->(setcore {part:{core}})",
						    "WHERE setcore.stopTime < {currentTime} - {twoweeksago} AND setcore.stopTime > {currentTime} - {eightweeksago} AND NOT (setcore)<-[:RECORDED]-(:RESULT)",
							"MATCH (u:USER {uuid:{id}})-[:COMPLETED]->(setbiceps {part:{biceps}})",
						    "WHERE setbiceps.stopTime < {currentTime} - {twoweeksago} AND setbiceps.stopTime > {currentTime} - {eightweeksago} AND NOT (setbiceps)<-[:RECORDED]-(:RESULT)",
							"MATCH (u:USER {uuid:{id}})-[:COMPLETED]->(setquads {part:{quads}})",
						    "WHERE setquads.stopTime < {currentTime} - {twoweeksago} AND setquads.stopTime > {currentTime} - {eightweeksago} AND NOT (setquads)<-[:RECORDED]-(:RESULT)",
							"MATCH (u:USER {uuid:{id}})-[:COMPLETED]->(settriceps {part:{triceps}})",
						    "WHERE settriceps.stopTime < {currentTime} - {twoweeksago} AND settriceps.stopTime > {currentTime} - {eightweeksago} AND NOT (settriceps)<-[:RECORDED]-(:RESULT)",
							"MATCH (u:USER {uuid:{id}})-[:COMPLETED]->(setshoulders {part:{shoulders}})",
						    "WHERE setshoulders.stopTime < {currentTime} - {twoweeksago} AND setshoulders.stopTime > {currentTime} - {eightweeksago} AND NOT (setshoulders)<-[:RECORDED]-(:RESULT)",
							"MATCH (u:USER {uuid:{id}})-[:COMPLETED]->(setchest {part:{chest}})",
						    "WHERE setchest.stopTime < {currentTime} - {twoweeksago} AND setchest.stopTime > {currentTime} - {eightweeksago} AND NOT (setchest)<-[:RECORDED]-(:RESULT)",
							"RETURN setGlutes, sethamstrings, setback, setcalves, setcore, setbiceps, setquads, setshoulders, settriceps, setchest "].join('\n');	
			db.query(cypher, {
					id: body.userid,
					currentTime: currentTime,
					twoweeksago: twoweeksago,
					eightweeksago: eightweeksago,
					glutes: 'glutes',
					hamstrings: 'hamstrings',
					back: 'back',
					calves: 'calves',
					core: 'core',
					biceps: 'biceps',
					quads: 'quads',
					triceps: 'triceps',
					shoulders: 'shoulders',
					chest: 'chest'
				},	(err, results) => {
					console.log(results)
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
						if(results.length > 0){
							res.writeHead(200, header);
					        res.end(JSON.stringify({
					        	success:'yes',
					        	sets: results,
					        	required: true

				        	}));
					        console.log(JSON.stringify({
					        	success:'yes',
					        	sets: results,
					        	required: true
							}))
							return;
						}else{
							res.writeHead(200, header);
					        res.end(JSON.stringify({
					        	success:'yes',
					        	sets: results,
					        	required: false

				        	}));
					        console.log(JSON.stringify({
					        	success:'yes',
					        	sets: results,
					        	required: false

							}))
							return;
						}

					}
				})

			
		}) //end of 'bf/check/need/results/feedback'

		server.post('/bf/check/need/soreness/feedback', (req, res, next) => {
			let oneweeksago = 1209600000/2; //dividing by 2 to make it one week to shorten feedback time period. This will keep users more engaged with the app. 
			let currentTime = new Date().getTime();
			let body = req.body;
			let cypher = [
						    "MATCH (u:USER {uuid:{id}})-[:COMPLETED]->(setGlutes {part:{glutes}})",
						    "WHERE setGlutes.stopTime > {currentTime} - {oneweeksago} AND NOT (setGlutes)<-[:RECORDED]-(:SORENESS {pain:0})",
							"MATCH (u:USER {uuid:{id}})-[:COMPLETED]->(sethamstrings {part:{hamstrings}})",
						    "WHERE sethamstrings.stopTime > {currentTime} - {oneweeksago} AND NOT (sethamstrings)<-[:RECORDED]-(:SORENESS {pain:0})",
							"MATCH (u:USER {uuid:{id}})-[:COMPLETED]->(setback {part:{back}})",
						    "WHERE setback.stopTime > {currentTime} - {oneweeksago} AND NOT (setback)<-[:RECORDED]-(:SORENESS {pain:0})",
							"MATCH (u:USER {uuid:{id}})-[:COMPLETED]->(setcalves {part:{calves}})",
						    "WHERE setcalves.stopTime > {currentTime} - {oneweeksago} AND NOT (setcalves)<-[:RECORDED]-(:SORENESS {pain:0})",
							"MATCH (u:USER {uuid:{id}})-[:COMPLETED]->(setcore {part:{core}})",
						    "WHERE setcore.stopTime > {currentTime} - {oneweeksago} AND NOT (setcore)<-[:RECORDED]-(:SORENESS {pain:0})",
							"MATCH (u:USER {uuid:{id}})-[:COMPLETED]->(setbiceps {part:{biceps}})",
						    "WHERE setbiceps.stopTime > {currentTime} - {oneweeksago} AND NOT (setbiceps)<-[:RECORDED]-(:SORENESS {pain:0})",
							"MATCH (u:USER {uuid:{id}})-[:COMPLETED]->(setquads {part:{quads}})",
						    "WHERE setquads.stopTime > {currentTime} - {oneweeksago} AND NOT (setquads)<-[:RECORDED]-(:SORENESS {pain:0})",
							"MATCH (u:USER {uuid:{id}})-[:COMPLETED]->(settriceps {part:{triceps}})",
						    "WHERE settriceps.stopTime > {currentTime} - {oneweeksago} AND NOT (settriceps)<-[:RECORDED]-(:SORENESS {pain:0})",
							"MATCH (u:USER {uuid:{id}})-[:COMPLETED]->(setshoulders {part:{shoulders}})",
						    "WHERE setshoulders.stopTime > {currentTime} - {oneweeksago} AND NOT (setshoulders)<-[:RECORDED]-(:SORENESS {pain:0})",
							"MATCH (u:USER {uuid:{id}})-[:COMPLETED]->(setchest {part:{chest}})",
						    "WHERE setchest.stopTime > {currentTime} - {oneweeksago} AND NOT (setchest)<-[:RECORDED]-(:SORENESS {pain:0})",
							"RETURN setGlutes, sethamstrings, setback, setcalves, setcore, setbiceps, setquads, setshoulders, settriceps, setchest "].join('\n');	
			db.query(cypher, {
					id: body.userid,
					currentTime: currentTime,
					oneweeksago: oneweeksago,
					glutes: 'glutes',
					hamstrings: 'hamstrings',
					back: 'back',
					calves: 'calves',
					core: 'core',
					biceps: 'biceps',
					quads: 'quads',
					triceps: 'triceps',
					shoulders: 'shoulders',
					chest: 'chest'
				},	(err, results) => {
					console.log(results)
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
						if(results.length > 0){
							res.writeHead(200, header);
					        res.end(JSON.stringify({
					        	success:'yes',
					        	sets: results,
					        	required: true

				        	}));
					        console.log(JSON.stringify({
					        	success:'yes',
					        	sets: results,
					        	required: true
							}))
							return;
						}else{
							res.writeHead(200, header);
					        res.end(JSON.stringify({
					        	success:'yes',
					        	sets: results,
					        	required: false

				        	}));
					        console.log(JSON.stringify({
					        	success:'yes',
					        	sets: results,
					        	required: false

							}))
							return;
						}

					}
				})

			
		}) //end of 'bf/check/need/soreness/feedback'




	}
}


export default Analytics