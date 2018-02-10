/* apps/buildfit/plan*/
import {secret} from './config';
import jwt from 'jsonwebtoken';
import uuid from 'node-uuid';
import _ from 'underscore';
var b2s = require('binary-to-string');
var s2b = require('string-to-binary');
//var neataptic = require('Neataptic'); 
const header = {'Content-Type':'application/json; charset=utf-8'};
const log = require('simple-node-logger').createSimpleLogger('node-error.log');


class Analytics {

	constructor(db, server) {
		this.name = 'Analytics';


		server.post('/bf/get/points', (req, res, next) => {	
			let twoweeksago = 1209600000;
			let fourweeksago = 2419200000;
			let sixweeksago = 3628800000;
			let eightweeksago = 4838400000;
			let hours24 = 86400000;
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
			let cypher1 = "MATCH (n:USER {uuid: $id})-[:COMPLETED]->(set) WHERE set.stopTime > $currentTime - $eightweeksago RETURN DISTINCT set ORDER BY set.stopTime";	

				db.run(cypher1, {
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


				})
				.then((data)=>{
				

					let results =  data.records;
					db.close();

					
								let ptsAll = 0
								let split = [[]]
								let counter = 0;


								Promise.resolve(true).then(() =>{
									for(var i=0; i < results.length; i++){
										let ting = results[i]._fields[0].properties;
										if(!isNaN(ting.pts)){
											if(i != 0 && ting.stopTime - results[i - 1]._fields[0].properties.stopTime > hours24){
												counter += 1
												split[counter] = [parseInt(ting.pts)];
											}else{
												split[counter].push(parseInt(ting.pts));
											}
										}
					
									}
								})
								.then(() => {
									if(results.length > 0){


										for(var i=0; i < split.length; i++){
											split[i] = split[i].reduce((accumulator, currentValue, currentIndex, array) => {
											    return accumulator + currentValue;
											  });
										}
									}
								})
								.then(() => {
									console.log('split',split)
									if(results.length > 0){
										counter = split.length;
										ptsAll = split.reduce((accumulator, currentValue, currentIndex, array) => {
											    return accumulator + currentValue;
											  });
									}

									console.log('/bf/get/points', 'ptsAll', ptsAll);
								})
								.then(() => {
									ptsAll = (ptsAll/counter).toFixed(2)
								})



							let cypher2 = "MATCH (n:USER {uuid:$id})-[:COMPLETED]->(set {part: $glutes}) WHERE set.stopTime > $currentTime - $eightweeksago RETURN DISTINCT set ORDER BY set.stopTime";

							db.run(cypher2, {
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


							}).then((data2) => {
										db.close();
										let results2 = data2.records;

										console.log('/bf/get/points' , results2.records);
									
											let ptsGlutes = 0
											let split = [[]]
											let counter = 0;


											Promise.resolve(true).then(() =>{
												
												for(var i=0; i < results2.length; i++){
													let ting = results2[i]._fields[0].properties;
													if(!isNaN(ting.pts)){
														if(i != 0 && ting.stopTime - results2[i - 1]._fields[0].properties.stopTime > hours24){
															counter += 1
															split[counter] = [parseInt(ting.pts)];
														}else{
															split[counter].push(parseInt(ting.pts));
														}
													}
								
												}
											})
											.then(() => {
												if(results2.length > 0){
													for(var i=0; i < split.length; i++){
														split[i] = split[i].reduce((accumulator, currentValue, currentIndex, array) => {
														    return accumulator + currentValue;
														  });
													}
												}
											})
											.then(() => {
												console.log('split',split)
												if(results2.length > 0){
													counter = split.length;
													ptsGlutes = split.reduce((accumulator, currentValue, currentIndex, array) => {
														    return accumulator + currentValue;
														  });
												}

												console.log('/bf/get/points', 'ptsAll', ptsGlutes);
											})							
											.then(() => {
												if(results2.length > 0){
													ptsGlutes = (ptsGlutes/counter).toFixed(2)
												}
											})


										


							let cypher3 = "MATCH (n:USER {uuid:$id})-[:COMPLETED]->(set {part: $hamstrings}) WHERE set.stopTime > $currentTime - $eightweeksago RETURN DISTINCT set ORDER BY set.stopTime";	

							db.run(cypher3, {
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


							}).then((data3) => {
								let results3 = data3.records;
								db.close();
				
											 
											let ptsHamstrings = 0
											let split = [[]]
											let counter = 0;


											Promise.resolve(true).then(() =>{
												for(var i=0; i < results3.length; i++){
													let ting = results3[i]._fields[0].properties;
													if(!isNaN(ting.pts)){
														if(i != 0 && ting.stopTime - results3[i - 1]._fields[0].properties.stopTime > hours24){
															counter += 1
															split[counter] = [parseInt(ting.pts)];
														}else{
															split[counter].push(parseInt(ting.pts));
														}
													}
								
												}
											})
											.then(() => {
												if(results3.length > 0){
													for(var i=0; i < split.length; i++){
														split[i] = split[i].reduce((accumulator, currentValue, currentIndex, array) => {
														    return accumulator + currentValue;
														  });
													}
												}
											})
											.then(() => {

												console.log('split',split)
												if(results3.length > 0){
													counter = split.length
													ptsHamstrings = split.reduce((accumulator, currentValue, currentIndex, array) => {
														    return accumulator + currentValue;
														  });
												}

												console.log('/bf/get/points', 'ptsAll', ptsHamstrings);
											})
											.then(() => {
												if(results3.length > 0){
													ptsHamstrings = (ptsHamstrings/counter).toFixed(2)
												}
											})

							let cypher4 = "MATCH (n:USER {uuid:$id})-[:COMPLETED]->(set {part: $back}) WHERE set.stopTime > $currentTime - $eightweeksago RETURN DISTINCT set ORDER BY set.stopTime";	

							db.run(cypher4, {
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

							}).then((data4) => {
								db.close();
								let results4 = data4.records;

										
											let ptsBack = 0;
											let split = [[]]
											let counter = 0;


											Promise.resolve(true).then(() =>{
												for(var i=0; i < results4.length; i++){
													let ting = results4[i]._fields[0].properties;
													if(!isNaN(ting.pts)){
														if(i != 0 && ting.stopTime - results4[i - 1]._fields[0].properties.stopTime > hours24){
															counter += 1
															split[counter] = [parseInt(ting.pts)];
														}else{
															split[counter].push(parseInt(ting.pts));
														}
													}
								
												}
											})
											.then(() => {
												if(results4.length > 0){
													for(var i=0; i < split.length; i++){
														split[i] = split[i].reduce((accumulator, currentValue, currentIndex, array) => {
														    return accumulator + currentValue;
														  });
													}
												}
											})
											.then(() => {
												console.log('split',split)
												if(results4.length > 0){
													counter = split.length;
													ptsBack = split.reduce((accumulator, currentValue, currentIndex, array) => {
														    return accumulator + currentValue;
														  });
												}

												console.log('/bf/get/points', 'ptsAll', ptsBack);
											})
											.then(() => {
												if(results4.length > 0){
													ptsBack = (ptsBack/counter).toFixed(2)
												}
											})		
											

							let cypher5 = "MATCH (n:USER {uuid:$id})-[:COMPLETED]->(set {part: $calves}) WHERE set.stopTime > $currentTime - $eightweeksago RETURN DISTINCT set ORDER BY set.stopTime";	// return the list of trainers as an array

							db.run(cypher5, {
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


							}).then((data5) => {
								let results5 = data5.records;
								db.close();
		
											 
											let ptsCalves = 0
											let split = [[]]
											let counter = 0;

											Promise.resolve(true).then(() =>{
												for(var i=0; i < results5.length; i++){
													let ting = results5[i]._fields[0].properties;
													if(!isNaN(ting.pts)){
														if(i != 0 && ting.stopTime - results5[i - 1]._fields[0].properties.stopTime > hours24){
															counter += 1
															split[counter] = [parseInt(ting.pts)];
														}else{
															split[counter].push(parseInt(ting.pts));
														}
													}
								
												}
											})
											.then(() => {
												if(results5.length > 0){
													for(var i=0; i < split.length; i++){
														split[i] = split[i].reduce((accumulator, currentValue, currentIndex, array) => {
														    return accumulator + currentValue;
														  });
													}
												}
											})
											.then(() => {
												console.log('split',split)
												if(results5.length > 0){
													counter = split.length;
													ptsCalves = split.reduce((accumulator, currentValue, currentIndex, array) => {
														    return accumulator + currentValue;
														  });
												}

												console.log('/bf/get/points', 'ptsAll', ptsCalves);
											})
											.then(() => {
												if(results5.length > 0){
													ptsCalves = (ptsCalves/counter).toFixed(2)
												}
											})		

							let cypher6 = "MATCH (n:USER {uuid:$id})-[:COMPLETED]->(set {part: $core}) WHERE set.stopTime > $currentTime - $eightweeksago RETURN DISTINCT set ORDER BY set.stopTime";	// return the list of trainers as an array

							db.run(cypher6, {
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


							}).then((data6) => {
								db.close();
								let results6 = data6.records;

									
											let ptsCore = 0
											let split = [[]]
											let counter = 0;
											Promise.resolve(true).then(() =>{
												for(var i=0; i < results6.length; i++){
													let ting = results6[i]._fields[0].properties;
													if(!isNaN(ting.pts)){
														if(i != 0 && ting.stopTime - results6[i - 1]._fields[0].properties.stopTime > hours24){
															counter += 1
															split[counter] = [parseInt(ting.pts)];
														}else{
															split[counter].push(parseInt(ting.pts));
														}
													}
								
												}
											})
											.then(() => {
												if(results6.length > 0){
													for(var i=0; i < split.length; i++){
														split[i] = split[i].reduce((accumulator, currentValue, currentIndex, array) => {
														    return accumulator + currentValue;
														  });
													}
												}
											})
											.then(() => {
												console.log('split',split)
												if(results6.length > 0){
													counter = split.length;
													ptsCore = split.reduce((accumulator, currentValue, currentIndex, array) => {
														    return accumulator + currentValue;
														  });
												}

												console.log('/bf/get/points', 'ptsAll', ptsCore);
											})	
											.then(() => {
												if(results6.length > 0){
													(ptsCore = ptsCore/counter).toFixed(2)
												}
											})	

							let cypher7 = "MATCH (n:USER {uuid:$id})-[:COMPLETED]->(set {part: $biceps}) WHERE set.stopTime > $currentTime - $eightweeksago RETURN DISTINCT set ORDER BY set.stopTime";	// return the list of trainers as an array

							db.run(cypher7, {
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


							}).then((data7) => {
								db.close();
								let results7 = data7.records;
											
								let ptsBiceps = 0
								let split = [[]]
								let counter = 0;
									Promise.resolve(true).then(() =>{
									for(var i=0; i < results7.length; i++){
										let ting = results7[i]._fields[0].properties;
										if(!isNaN(ting.pts)){
											if(i != 0 && ting.stopTime - results7[i - 1]._fields[0].properties.stopTime > hours24){
												counter += 1
												split[counter] = [parseInt(ting.pts)];
											}else{
												split[counter].push(parseInt(ting.pts));
											}
										}
					
									}
								})
								.then(() => {
									if(results7.length > 0){
										for(var i=0; i < split.length; i++){
											split[i] = split[i].reduce((accumulator, currentValue, currentIndex, array) => {
											    return accumulator + currentValue;
											  });
										}
									}
								})
								.then(() => {
									console.log('split',split)
									if(results7.length > 0){
										counter = split.length;
										ptsBiceps = split.reduce((accumulator, currentValue, currentIndex, array) => {
											    return accumulator + currentValue;
											  });
									}
								})
								.then(() => {
									if(results7.length > 0){
										ptsBiceps = (ptsBiceps/counter).toFixed(2)
									}
								})


							let cypher8 = "MATCH (n:USER {uuid:$id})-[:COMPLETED]->(set {part: $quads}) WHERE set.stopTime > $currentTime - $eightweeksago RETURN DISTINCT set ORDER BY set.stopTime";	// return the list of trainers as an array

							db.run(cypher8, {
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


							}).then((data8) => {
								db.close();
								let results8 = data8.records;

									let ptsQuads = 0
									let split = [[]]
									let counter = 0;
									Promise.resolve(true).then(() =>{
									for(var i=0; i < results8.length; i++){
										let ting = results8[i]._fields[0].properties;
										if(!isNaN(ting.pts)){
											if(i != 0 && ting.stopTime - results8[i - 1]._fields[0].properties.stopTime > hours24){
												counter += 1
												split[counter] = [parseInt(ting.pts)];
											}else{
												split[counter].push(parseInt(ting.pts));
											}
										}
					
									}
								})
								.then(() => {
									if(results8.length > 0){
										for(var i=0; i < split.length; i++){
											split[i] = split[i].reduce((accumulator, currentValue, currentIndex, array) => {
											    return accumulator + currentValue;
											  });
										}
									}
								})
								.then(() => {
									console.log('split',split)
									if(results8.length > 0){
										counter = split.length;
										ptsQuads = split.reduce((accumulator, currentValue, currentIndex, array) => {
											    return accumulator + currentValue;
											  });
									}
								})
								.then(() => {
									if(results8.length > 0){
										ptsQuads = (ptsQuads/counter).toFixed(2)
									}
								})

							let cypher9 = "MATCH (n:USER {uuid:$id})-[:COMPLETED]->(set {part: $triceps}) WHERE set.stopTime > $currentTime - $eightweeksago RETURN DISTINCT set ORDER BY set.stopTime";	// return the list of trainers as an array

							db.run(cypher9, {
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


							}).then((data9) => {
								db.close();
								let results9 = data9.records;
										
									let ptsTriceps = 0
									let results8 = data8.records;

									let ptsQuads = 0
									let split = [[]]
									let counter = 0;
									Promise.resolve(true).then(() =>{
									for(var i=0; i < results9.length; i++){
										let ting = results9[i]._fields[0].properties;
										if(!isNaN(ting.pts)){
											if(i != 0 && ting.stopTime - results9[i - 1]._fields[0].properties.stopTime > hours24){
												counter += 1
												split[counter] = [parseInt(ting.pts)];
											}else{
												split[counter].push(parseInt(ting.pts));
											}
										}
					
									}
								})
								.then(() => {
									if(results9.length > 0){
										for(var i=0; i < split.length; i++){
											split[i] = split[i].reduce((accumulator, currentValue, currentIndex, array) => {
											    return accumulator + currentValue;
											  });
										}
									}
								})
								.then(() => {
									console.log('split',split)
									if(results9.length > 0){
										counter = split.length
										ptsTriceps = split.reduce((accumulator, currentValue, currentIndex, array) => {
											    return accumulator + currentValue;
											  });
									}
								})
								.then(() => {
									if(results9.length > 0){
										ptsTriceps = (ptsTriceps/counter).toFixed(2)
									}
								})
		
							let cypher10 = "MATCH (n:USER {uuid:$id})-[:COMPLETED]->(set {part: $shoulders}) WHERE set.stopTime > $currentTime - $eightweeksago RETURN DISTINCT set ORDER BY set.stopTime";	// return the list of trainers as an array

							db.run(cypher10, {
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


							}).then((data10) => {
								db.close()
								let results10 = data10.records;
										 
									let ptsShoulders = 0
									let split = [[]]
									let counter = 0;
									Promise.resolve(true).then(() =>{
											for(var i=0; i < results10.length; i++){
												let ting = results10[i]._fields[0].properties;
												if(!isNaN(ting.pts)){
													if(i != 0 && ting.stopTime - results10[i - 1]._fields[0].properties.stopTime > hours24){
														counter += 1
														split[counter] = [parseInt(ting.pts)];
													}else{
														split[counter].push(parseInt(ting.pts));
													}
												}
							
											}
										})
										.then(() => {
											if(results10.length > 0){
												for(var i=0; i < split.length; i++){
													split[i] = split[i].reduce((accumulator, currentValue, currentIndex, array) => {
													    return accumulator + currentValue;
													  });
												}
											}
										})
										.then(() => {
											console.log('split',split)
											if(results10.length > 0){
												counter = split.length
												ptsShoulders = split.reduce((accumulator, currentValue, currentIndex, array) => {
													    return accumulator + currentValue;
													  });
											}
										})	
										.then(() => {
											if(results10.length > 0){
												ptsShoulders = (ptsShoulders/counter).toFixed(2)
											}
										})


							let cypher11 = "MATCH (n:USER {uuid:$id})-[:COMPLETED]->(set {part: $chest}) WHERE set.stopTime > $currentTime - $eightweeksago RETURN DISTINCT set ORDER BY set.stopTime";	// return the list of trainers as an array

								db.run(cypher11, {
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


								}).then((data11) => {
									db.close();
									let results11 = data11.records;
											 
												let ptsChest = 0
												let split = [[]]
												let counter = 0;
												Promise.resolve(true).then(() =>{
														for(var i=0; i < results11.length; i++){
															let ting = results11[i]._fields[0].properties;
															if(!isNaN(ting.pts)){
																if(i != 0 && ting.stopTime - results11[i - 1]._fields[0].properties.stopTime > hours24){
																	counter += 1
																	split[counter] = [parseInt(ting.pts)];
																}else{
																	split[counter].push(parseInt(ting.pts));
																}
															}
										
														}
													})
													.then(() => {
														if(results11.length > 0){
															for(var i=0; i < split.length; i++){
																split[i] = split[i].reduce((accumulator, currentValue, currentIndex, array) => {
																    return accumulator + currentValue;
																  });
															}
														}
													})
													.then(() => {
														console.log('split',split)
														if(results11.length > 0){
															counter = split.length;
															ptsChest = split.reduce((accumulator, currentValue, currentIndex, array) => {
																    return accumulator + currentValue;
																  });
														}
													})
													.then(() => {
														if(results11.length > 0){
															ptsChest = (ptsChest/counter).toFixed(2)
														}
													})
													.then(()=>{
													console.log('/bf/get/points','tings here')
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
											        console.log('/bf/get/points',JSON.stringify({
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
												


												
								}) //11
								.catch((err)=>{
									log.error(err, '/bf/get/points')
									console.log('/bf/get/points',err);
									res.writeHead(500, header)
							        res.end(JSON.stringify({
							          success:'no',
							          err: err,
							          message:'Something went wrong logging in. Check error message to see what happened.'
							          }))
								});
							}) //10
							.catch((err)=>{
								log.error(err, '/bf/get/points')
								console.log('/bf/get/points',err);
								res.writeHead(500, header)
						        res.end(JSON.stringify({
						          success:'no',
						          err: err,
						          message:'Something went wrong logging in. Check error message to see what happened.'
						          }))
							});
						}) //9
						.catch((err)=>{
							log.error(err, '/bf/get/points')
							console.log('/bf/get/points',err);
							res.writeHead(500, header)
					        res.end(JSON.stringify({
					          success:'no',
					          err: err,
					          message:'Something went wrong logging in. Check error message to see what happened.'
					          }))
						});
					}) //8
					.catch((err)=>{
						log.error(err, '/bf/get/points')
						console.log('/bf/get/points',err);
						res.writeHead(500, header)
				        res.end(JSON.stringify({
				          success:'no',
				          err: err,
				          message:'Something went wrong logging in. Check error message to see what happened.'
				          }))
					});	
					}) //7
					.catch((err)=>{
						log.error(err, '/bf/get/points')
						console.log('/bf/get/points',err);
						res.writeHead(500, header)
				        res.end(JSON.stringify({
				          success:'no',
				          err: err,
				          message:'Something went wrong logging in. Check error message to see what happened.'
				          }))
					});
					}) //6
					.catch((err)=>{
						log.error(err, '/bf/get/points')
						console.log('/bf/get/points',err);
						res.writeHead(500, header)
				        res.end(JSON.stringify({
				          success:'no',
				          err: err,
				          message:'Something went wrong logging in. Check error message to see what happened.'
				          }))
					});
					}) //5
					.catch((err)=>{
						log.error(err, '/bf/get/points')
						console.log('/bf/get/points',err);
						res.writeHead(500, header)
				        res.end(JSON.stringify({
				          success:'no',
				          err: err,
				          message:'Something went wrong logging in. Check error message to see what happened.'
				          }))
					});
					}) //4
					.catch((err)=>{
						log.error(err, '/bf/get/points')
						console.log('/bf/get/points',err);
						res.writeHead(500, header)
				        res.end(JSON.stringify({
				          success:'no',
				          err: err,
				          message:'Something went wrong logging in. Check error message to see what happened.'
				          }))
						});
					}) //3
					.catch((err)=>{
						log.error(err, '/bf/get/points')
						console.log('/bf/get/points',err);
						res.writeHead(500, header)
				        res.end(JSON.stringify({
				          success:'no',
				          err: err,
				          message:'Something went wrong logging in. Check error message to see what happened.'
				          }))
					});
					}) //2
					.catch((err)=>{
						log.error(err, '/bf/get/points')
						console.log('/bf/get/points',err);
						res.writeHead(500, header)
				        res.end(JSON.stringify({
				          success:'no',
				          err: err,
				          message:'Something went wrong logging in. Check error message to see what happened.'
				          }))
					});
				}) //1
				.catch((err)=>{
					log.error(err, '/bf/get/points')
					console.log('/bf/get/points',err);
					res.writeHead(500, header)
			        res.end(JSON.stringify({
			          success:'no',
			          err: err,
			          message:'Something went wrong logging in. Check error message to see what happened.'
			          }))
				});


		}) // end of '/bf/get/points' ***************************************************************************************

		server.post('/bf/get/lastworkout', (req, res, next) => {
			let body = req.body;
			let cypher = "MATCH (u:USER {uuid:$id})-[:COMPLETED]->(set) RETURN set Order by set.created_at desc Limit 1";	
			db.run(cypher, {
					id: body.userid,
				})
				.then((data) => {
					var results =  data.records;
					db.close();
					console.log('/bf/get/lastworkout',results)
					if(results.length > 0){


					let cypher2 = "MATCH (u:USER {uuid: $id})-[:COMPLETED]->(set {planUUID:$planUUID}) RETURN DISTINCT set ORDER BY set.stopTime";
					db.run(cypher2, {
						planUUID: results[0]._fields[0].properties.planUUID,
						id: body.userid
					}).then((data2) => {
						let results2 = data2.records;
						db.close();
						console.log('/bf/get/lastworkout','results2', results2)
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
								let ting = results2[i]._fields[0].properties;
								if(results2[i - 1]){
									 totalrest += (parseInt(ting.startTime) - parseInt(results2[i -1]._fields[0].properties.stopTime)); //current set stop time versus pervious set stop time. ASSUMING response in order of oldest record last.
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
						}).then(()=>{
							res.writeHead(200, header);
					        res.end(JSON.stringify({
					        	success:'yes',
					        	part: results2[0]._fields[0].properties.part,
					        	goal: results2[0]._fields[0].properties.goal,
					        	date: results2[0]._fields[0].properties.stopTime,
					        	planUUID: results2[0]._fields[0].properties.planUUID,
					        	totalweight: totalweight,
					        	totalreps: totalreps,
					        	totaltime: totaltime,
					        	avgweight: avgweight,
					        	avgreps: avgreps,
					        	avgtime: avgtime,
					        	avgrest: avgrest,
					        	timeperRep: timeperRep


				        	}));
					        console.log('/bf/get/lastworkout',JSON.stringify({
					        	success:'yes',
					        	part: results2[0]._fields[0].properties.part,
					        	goal: results2[0]._fields[0].properties.goal,
					        	date: results2[0]._fields[0].properties.stopTime,
					        	planUUID: results2[0]._fields[0].properties.planUUID,
					        	totalweight: totalweight,
					        	totalreps: totalreps,
					        	totaltime: totaltime,
					        	avgweight: avgweight,
					        	avgreps: avgreps,
					        	avgtime: avgtime,
					        	avgrest: avgrest,
					        	timeperRep: timeperRep,
							}))
						})

				    }) //data2
				    .catch((err)=>{
				    	log.error(err, '/bf/get/lastworkout')
						console.log('/bf/get/lastworkout',err);
						res.writeHead(500, header)
				        res.end(JSON.stringify({
				          success:'no',
				          err: err,
				          message:'Something went wrong logging in. Check error message to see what happened.'
				          }))
					});
					 
				}//end of check if any exist
				else{
					    console.log('/bf/get/lastworkout',results);
						res.writeHead(401, header)
				        res.end(JSON.stringify({
				          success:'no',
				          results: results,
				          message:'No Records found'
				          }))
				}
			}) //data1
			.catch((err)=>{
				log.error(err, '/bf/get/lastworkout')
				console.log('/bf/get/lastworkout',err);
				res.writeHead(500, header)
		        res.end(JSON.stringify({
		          success:'no',
		          err: err,
		          message:'Something went wrong logging in. Check error message to see what happened.'
		          }))
			});
				

			
		}) //end of '/bf/get/lastworkout'

		server.post('/bf/get/sets', (req, res, next) => {
			let body = req.body;
			let cypher = "MATCH (u:USER {uuid:$id})-[:COMPLETED]->(set {part:$bodypart}) RETURN set Order by set.stopTime";	
			db.run(cypher, {
					id: body.userid,
					bodypart:body.bodypart
				}).then((data) => {
					let results =  data.records;
					db.close();
					res.writeHead(200, header);

			        console.log(JSON.stringify({
			        	success:'yes',
			        	sets: results,
					}))
					res.end(JSON.stringify({
			        	success:'yes',
			        	sets: results,

		        	}));
				})
				.catch((err)=>{
					log.error(err, ' /bf/get/sets')
					console.log(err);
					res.writeHead(500, header)
			        res.end(JSON.stringify({
			          success:'no',
			          err: err,
			          message:'Something went wrong logging in. Check error message to see what happened.'
			          }))
				});
							
		}) //end of '/bf/get/sets'

		server.post('/bf/get/part/avgs', (req, res, next) => {
			let currentTime = new Date().getTime()
			let eightweeksago = 4838400000;
			let body = req.body;
			let cypher = "MATCH (u:USER {uuid:$id})-[:COMPLETED]->(set {part:$bodypart}) WHERE set.stopTime > $currentTime - $eightweeksago RETURN set Order by set.stopTime";	
			db.run(cypher, {
					id: body.userid,
					bodypart:body.bodypart,
					currentTime: currentTime,
					eightweeksago: eightweeksago,
				}).then((data) => {
					let results =  data.records;
					db.close();

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
								let ting = results[i]._fields[0].properties;
								if(results[i - 1]){
									 totalrest += (parseInt(ting.startTime) - parseInt(results[i -1]._fields[0].properties.stopTime)); //current set stop time versus pervious set stop time. ASSUMING response in order of oldest record last.
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
						
				})
				.catch((err)=>{
					log.error(err, ' /bf/get/part/avgs')
					console.log(err);
					res.writeHead(500, header)
			        res.end(JSON.stringify({
			          success:'no',
			          err: err,
			          message:'Something went wrong logging in. Check error message to see what happened.'
			          }))
				});


			
		}) //end of '/bf/get/part/avgs'


		server.post('/bf/get/part/avgs/lifetime', (req, res, next) => {
			let body = req.body;
			let cypher = "MATCH (u:USER {uuid:$id})-[:COMPLETED]->(set {part:$bodypart}) RETURN set Order by set.stopTime";	
			db.run(cypher, {
					id: body.userid,
					bodypart:body.bodypart,
			}).then((data) => {
					let results =  data.records;
					db.close();

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
							let ting = results[i]._fields[0].properties;
							if(results[i - 1]){
								 totalrest += (parseInt(ting.startTime) - parseInt(results[i -1]._fields[0].properties.stopTime)); //current set stop time versus pervious set stop time. ASSUMING response in order of oldest record last.
								 console.log('/bf/get/part/avgs/lifetime','totalrest', totalrest)
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
			})
			.catch((err)=>{
					console.log('/bf/get/part/avgs/lifetime',err);
					res.writeHead(500, header)
			        res.end(JSON.stringify({
			          success:'no',
			          err: err,
			          message:'Something went wrong logging in. Check error message to see what happened.'
			          }))
			});


			
		}) //end of '/bf/get/part/avgs/lifetime'

		server.post('/bf/set/results/feedback', (req, res, next) => {
			let body = req.body;
			console.log('/bf/set/results/feedback', body);
			let eightweeksago = 1209600000;
			let currentTime = new Date().getTime()
			let cypher = "MATCH (set1 {part:$bodypart})<-[:COMPLETED]-(u:USER {uuid:$id}) WHERE set1.stopTime > $currentTime - $eightweeksago CREATE (result:RESULT {score: $score})<-[:RECORDED]-(set1) RETURN result";	
			db.run(cypher, {
					id: body.userid,
					bodypart:body.bodypart,
					eightweeksago: eightweeksago,
					currentTime: currentTime,
					score: body.score
			}).then((data) => {
				let results =  data.records;
				db.close();
				res.writeHead(200, header);
		        res.end(JSON.stringify({
		        	success:'yes',
		        	results: results,

	        	}));
		        console.log('/bf/set/results/feedback',JSON.stringify({
		        	success:'yes',
		        	results: results,
				}))
				return;
	
			})
			.catch((err)=>{
				console.log('/bf/set/results/feedback',err);
				res.writeHead(500, header)
		        res.end(JSON.stringify({
		          success:'no',
		          err: err,
		          message:'Something went wrong logging in. Check error message to see what happened.'
		          }))
			});

			
		}) //end of '/bf/set/results/feedback'


		server.post('/bf/next/workout/results/feedback', (req, res, next) => {
			let eightweeksago = 1209600000;
			let currentTime = new Date().getTime();
			let body = req.body;
			let cypher = "MATCH (u:USER {uuid:$id})-[:COMPLETED]->(sets) WHERE sets.stopTime < $currentTime - $eightweeksago RETURN sets ";	
			db.run(cypher, {
					id: body.userid,
					currentTime: currentTime,
					eightweeksago: eightweeksago,
				}).then((data) => {
					let results =  data.records;
					db.close();
					console.log('/bf/check/need/results/feedback',results)
						results =  results.map((x)=>{
							switch(x._fields[0].properties.part){
								case 'glutes':
									return x = 'glutes';
								case 'hamstrings':
									return x = 'hamstrings';
								case 'back':
									return x = 'back';
								case 'calves':
									return x = 'calves';
								case 'core':
									return x = 'core';
								case 'biceps':
									return x = 'biceps';
								case 'quads':
									return x = 'quads';
								case 'triceps':
									return x = 'triceps';
								case 'shoulders':
									return x = 'shoulders';
								case 'chest':
									return x = 'chest';
							}
				
						})
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
				})
				.catch((err)=>{
					console.log('/bf/check/need/results/feedback',err);
					res.writeHead(500, header)
			        res.end(JSON.stringify({
			          success:'no',
			          err: err,
			          message:'Something went wrong logging in. Check error message to see what happened.'
			          }))
				});

		}) //end of 'bf/check/need/results/feedback'

		server.post('/bf/check/need/soreness/feedback', (req, res, next) => { //TODO
			let oneweeksago = 1209600000/2; //dividing by 2 to make it one week to shorten feedback time period. This will keep users more engaged with the app. 
			let currentTime = new Date().getTime();
			let body = req.body;
			let cypher =  "MATCH (u:USER {uuid:$id})-[:COMPLETED]->(setGlutes {part:$glutes}) "+
						    "WHERE setGlutes.stopTime > $currentTime - $oneweeksago AND NOT (setGlutes)-[:RECORDED]->(:SORENESS)"+
							"MATCH (u:USER {uuid:$id})-[:COMPLETED]->(sethamstrings {part:$hamstrings}) "+
						    "WHERE sethamstrings.stopTime > $currentTime - $oneweeksago AND NOT (sethamstrings)-[:RECORDED]->(:SORENESS) "+
							"MATCH (u:USER {uuid:$id})-[:COMPLETED]->(setback {part:$back}) "+
						    "WHERE setback.stopTime > $currentTime - $oneweeksago AND NOT (setback)-[:RECORDED]->(:SORENESS) "+
							"MATCH (u:USER {uuid:$id})-[:COMPLETED]->(setcalves {part:$calves}) "+
						    "WHERE setcalves.stopTime > $currentTime - $oneweeksago AND NOT (setcalves)-[:RECORDED]->(:SORENESS) "+
							"MATCH (u:USER {uuid:$id})-[:COMPLETED]->(setcore {part:$core}) "+
						    "WHERE setcore.stopTime > $currentTime - $oneweeksago AND NOT (setcore)-[:RECORDED]->(:SORENESS) "+
							"MATCH (u:USER {uuid:$id})-[:COMPLETED]->(setbiceps {part:$biceps}) "+
						    "WHERE setbiceps.stopTime > $currentTime - $oneweeksago AND NOT (setbiceps)-[:RECORDED]->(:SORENESS) "+
							"MATCH (u:USER {uuid:$id})-[:COMPLETED]->(setquads {part:$quads}) "+
						    "WHERE setquads.stopTime > $currentTime - $oneweeksago AND NOT (setquads)<-[:RECORDED]-(:SORENESS) "+
							"MATCH (u:USER {uuid:$id})-[:COMPLETED]->(settriceps {part:$triceps}) "+
						    "WHERE settriceps.stopTime > $currentTime - $oneweeksago AND NOT (settriceps)-[:RECORDED]->(:SORENESS) "+
							"MATCH (u:USER {uuid:$id})-[:COMPLETED]->(setshoulders {part:$shoulders}) "+
						    "WHERE setshoulders.stopTime > $currentTime - $oneweeksago AND NOT (setshoulders)-[:RECORDED]->(:SORENESS) "+
							"MATCH (u:USER {uuid:$id})-[:COMPLETED]->(setchest {part:$chest}) "+
						    "WHERE setchest.stopTime > {currentTime} - $oneweeksago AND NOT (setchest)-[:RECORDED]->(:SORENESS) "+
							"RETURN setGlutes, sethamstrings, setback, setcalves, setcore, setbiceps, setquads, setshoulders, settriceps, setchest ";	
			db.run(cypher, {
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
				}).then((data) => {
					let results =  data.records;
					console.log(results);
					db.close();
			
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


			
		}) //end of 'bf/check/need/soreness/feedback'


		server.post('/bf/set/soreness/feedback', (req, res, next) => { 
			let body = req.body;
			let oneweeksago = 1209600000/2;
			let currentTime = new Date().getTime()
			let cypher = "MATCH (set4 {part:{bodypart}})<-[:COMPLETED]-(u:USER {uuid:{id}}) "+
						    "WHERE set4.stopTime > {currentTime} - {oneweeksago} AND NOT (set4)-[:RECORDED]->(:SORENESS) "+
						    "CREATE (n:SORENESS {timestamp:{currentTime}, pain:{soreness}, part:{bodypart}})<-[:RECORDED]-(set4) "+ // create relationship between current result and set4 2 weeks or less
							"RETURN n";	
			db.run(cypher, {
					id: body.userid,
					bodypart:body.bodypart,
					oneweeksago: oneweeksago,
					currentTime: currentTime,
					soreness: body.soreness
				}).then((data) => {
					let results =  data.records;
					db.close();
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
		}) //end of '/bf/get/soreness/feedback'

//##################################################################################################################
//
//
//
//
//
//##################################################################################################################
		server.post('/bf/next/workout/date', (req, res, next) => {
			let body = req.body;
			let oneweek = 1209600000/2;
			let twoweeks = 1209600000;
			let oneday = 86400000;
			let currentTime = new Date().getTime()
			let splitback = [[]];
			let splitcore = [[]];
			let splitglutes = [[]];
			let splithamstrings = [[]];
			let splitquads = [[]];
			let splitshoulders = [[]];
			let splittriceps = [[]];
			let splitbiceps = [[]];
			let splitchest = [[]];
			let splitcalves = [[]];
			let counter = 0;
			let glutes_array = [];
			let hamstrings_array = [];
			let quads_array = [];
			let back_array = [];
			let shoulders_array = [];
			let chest_array = [];
			let calves_array = []
			let core_array = [];
			let triceps_array = [];
			let biceps_array = [];

			let iglutes_array = [];
			let ihamstrings_array = [];
			let iquads_array = [];
			let iback_array = [];
			let ishoulders_array = [];
			let ichest_array = [];
			let icalves_array = []
			let icore_array = [];
			let itriceps_array = [];
			let ibiceps_array = [];
			let glutes_time = new Date().getTime();
			let hamstrings_time = new Date().getTime();
			let quads_time = new Date().getTime();
			let back_time = new Date().getTime();
			let shoulders_time = new Date().getTime();
			let chest_time = new Date().getTime();
			let calves_time = new Date().getTime();
			let core_time = new Date().getTime();
			let triceps_time = new Date().getTime();
			let biceps_time = new Date().getTime();
			let results;
			let cypher = "MATCH (sets: SetFeedback)<-[:COMPLETED]-(user:USER {uuid:{id}}) "+
						 "WHERE sets.stopTime > {currentTime} - {twoweeks} "+
						 "MATCH (sets)-[:RECORDED]->(feedback:RESULT) "+
						 "RETURN  sets, feedback";

			 let cypher2 = "MATCH (sets: SetFeedback)<-[:COMPLETED]-(user:USER {uuid:{id}}) "+
			 "WHERE sets.stopTime > {currentTime} - {twoweeks} "+
			 "RETURN  sets";
			db.run(cypher2, {
				id: body.userid,
				currentTime: currentTime,
				twoweeks: twoweeks,
			})
			.then((info) => {
				info = info.records;
				console.log('info', info.length)

				db.run(cypher, {
					id: body.userid,
					currentTime: currentTime,
					twoweeks: twoweeks,
				})
				.then((data) =>{
					results = data.records;
					console.log('results',results.length)


					if(results.length >  0) {
						glutes_array = results.filter((val) => {
							return val._fields[0].properties.part = 'glutes';
						})

						hamstrings_array = results.filter((val) => {
							return val._fields[0].properties.part = 'hamstrings';
						})

						quads_array = results.filter((val) => {
							return val._fields[0].properties.part = 'quads';
						})

						back_array = results.filter((val) => {
							return val._fields[0].properties.part = 'back';
						})

						shoulders_array = results.filter((val) => {
							return val._fields[0].properties.part = 'shoulders';
						})

						chest_array = results.filter((val) => {
							return val._fields[0].properties.part = 'chest';
						})

						calves_array = results.filter((val) => {
							return val._fields[0].properties.part = 'calves';
						})

						core_array = results.filter((val) => {
							return val._fields[0].properties.part = 'core';
						})

						biceps_array = results.filter((val) => {
							return val._fields[0].properties.part = 'core';
						})

						triceps_array = results.filter((val) => {
							return val._fields[0].properties.part = 'core';
						})
					}
					if(info.length > 0){

						iglutes_array = results.filter((val) => {
							return val._fields[0].properties.part = 'glutes';
						})

						ihamstrings_array = info.filter((val) => {
							return val._fields[0].properties.part = 'hamstrings';
						})

						iquads_array = info.filter((val) => {
							return val._fields[0].properties.part = 'quads';
						})

						iback_array = info.filter((val) => {
							return val._fields[0].properties.part = 'back';
						})

						ishoulders_array = info.filter((val) => {
							return val._fields[0].properties.part = 'shoulders';
						})

						ichest_array = info.filter((val) => {
							return val._fields[0].properties.part = 'chest';
						})

						icalves_array = info.filter((val) => {
							return val._fields[0].properties.part = 'calves';
						})

						icore_array = info.filter((val) => {
							return val._fields[0].properties.part = 'core';
						})

						ibiceps_array = results.filter((val) => {
							return val._fields[0].properties.part = 'core';
						})

						itriceps_array = results.filter((val) => {
							return val._fields[0].properties.part = 'core';
						})
					}
				})

				.then(() => {
						let counter1 = 0;
						let counter2 = 0;
						let counter3 = 0;
						let counter4 = 0;
						let counter5 = 0;
						let counter6 = 0;
						let counter7 = 0;
						let counter8 = 0;
						let counter9 = 0;
						let counter10 = 0;
						
						if(back_array.length === iback_array.length){
							for(var i=0; i < back_array.length; i++){
								let ting = back_array[i]._fields[0].properties;
									if(i != 0 && ting.stopTime - results[i - 1]._fields[0].properties.stopTime > oneday){
										counter1 += 1
										splitback[counter1] = [back_array[i]];
									}else{
										splitback[counter1].push(back_array[i]);
									}
							}
						}else{
							for(var i=0; i < iback_array.length; i++){
								let ting = iback_array[i]._fields[0].properties;
									if(i != 0 && ting.stopTime - results[i - 1]._fields[0].properties.stopTime > oneday){
										counter1 += 1
										splitback[counter1] = [iback_array[i]];
									}else{
										splitback[counter1].push(iback_array[i]);
									}
							}
						}

							for(var i=0; i < core_array.length; i++){
								let ting = core_array[i]._fields[0].properties;
									if(i != 0 && ting.stopTime - results[i - 1]._fields[0].properties.stopTime > oneday){
										counter2 += 1
										splitcore[counter2] = [core_array[i]];
									}else{
										splitcore[counter2].push(core_array[i]);
									}
							}

							for(var i=0; i < glutes_array.length; i++){
								let ting = glutes_array[i]._fields[0].properties;
									if(i != 0 && ting.stopTime - results[i - 1]._fields[0].properties.stopTime > oneday){
										counter3 += 1
										splitglutes[counter3] = [glutes_array[i]];
									}else{
										splitglutes[counter3].push(glutes_array[i]);
									}
							}
							for(var i=0; i < hamstrings_array.length; i++){
								let ting = hamstrings_array[i]._fields[0].properties;
									if(i != 0 && ting.stopTime - results[i - 1]._fields[0].properties.stopTime > oneday){
										counter4 += 1
										splithamstrings[counter4] = [hamstrings_array[i]];
									}else{
										splithamstrings[counter4].push(hamstrings_array[i]);
									}
							}

							for(var i=0; i < quads_array.length; i++){
								let ting = quads_array[i]._fields[0].properties;
									if(i != 0 && ting.stopTime - results[i - 1]._fields[0].properties.stopTime > oneday){
										counter5 += 1
										splitquads[counter5] = [quads_array[i]];
									}else{
										splitquads[counter5].push(quads_array[i]);
									}
							}

							for(var i=0; i < chest_array.length; i++){
								let ting = chest_array[i]._fields[0].properties;
									if(i != 0 && ting.stopTime - results[i - 1]._fields[0].properties.stopTime > oneday){
										counter6 += 1
										splitchest[counter6] = [chest_array[i]];
									}else{
										splitchest[counter6].push(chest_array[i]);
									}
							}

							for(var i=0; i < shoulders_array.length; i++){
								let ting = shoulders_array[i]._fields[0].properties;
									if(i != 0 && ting.stopTime - results[i - 1]._fields[0].properties.stopTime > oneday){
										counter7 += 1
										splitshoulders[counter7] = [shoulders_array[i]];
									}else{
										splitshoulders[counter7].push(shoulders_array[i]);
									}
							}

							for(var i=0; i < biceps_array.length; i++){
								let ting = biceps_array[i]._fields[0].properties;
									if(i != 0 && ting.stopTime - results[i - 1]._fields[0].properties.stopTime > oneday){
										counter8 += 1
										splitbiceps[counter8] = [biceps_array[i]];
									}else{
										splitbiceps[counter8].push(biceps_array[i]);
									}
							}

							for(var i=0; i < triceps_array.length; i++){
								let ting = triceps_array[i]._fields[0].properties;
									if(i != 0 && ting.stopTime - results[i - 1]._fields[0].properties.stopTime > oneday){
										counter9 += 1
										splittriceps[counter9] = [triceps_array[i]];
									}else{
										splittriceps[counter9].push(triceps_array[i]);
									}
							}

							for(var i=0; i < calves_array.length; i++){
								let ting = calves_array[i]._fields[0].properties;
									if(i != 0 && ting.stopTime - results[i - 1]._fields[0].properties.stopTime > oneday){
										counter10 += 1
										splitcalves[counter10] = [calves_array[i]];
									}else{
										splitcalves[counter10].push(calves_array[i]);
									}
							}

				})
				.then(() => {
						let times = {
							back: {Smaller:(oneday * 3), Tone:(oneday * 5), Bigger: (oneday * 2)},
							core: {Smaller:(oneday * 2), Tone:(oneday * 2), Bigger: (oneday * 2)},
							glutes: {Smaller:(oneday * 4), Tone:(oneday * 4), Bigger: (oneday * 2)},
							hamstrings: {Smaller:(oneday * 6), Tone:(oneday * 4), Bigger: (oneday * 2)},
							quads: {Smaller:(oneday * 6), Tone:(oneday * 4), Bigger: (oneday * 2)},
							biceps: {Smaller:(oneday * 6), Tone:(oneday * 4), Bigger: (oneday * 2)},
							triceps: {Smaller:(oneday * 6), Tone:(oneday * 4), Bigger: (oneday * 2)},
							shoulders: {Smaller:(oneday * 6), Tone:(oneday * 4), Bigger: (oneday * 2)},
							calves: {Smaller:(oneday * 6), Tone:(oneday * 4), Bigger: (oneday * 2)},
							biceps: {Smaller:(oneday * 6), Tone:(oneday * 4), Bigger: (oneday * 2)},
							chest: {Smaller:(oneday * 6), Tone:(oneday * 4), Bigger: (oneday * 2)},

						}

						console.log('check start time', splitback[splitback.length - 1][0]._fields[0].properties.startTime)

						// figure out back next workout date
						if(splitback[0].length > 0){
							let back = times.back;
							if(splitback[splitback.length - 1][0]._fields[0].properties.startTime > ( currentTime - oneweek) ) {
								if(splitback.length > 10 && info.length === results.length){
									splitback[splitback.length] = { 
										score: splitback.reduce((accumulator, currentValue, currentIndex, array) => {
									    return accumulator + currentValue[0]._fields[1].properties.score;
									    console.log('reduce',accumulator, currentValue[0]._fields[1].properties.score)
									  }) 
									}
									if(splitback[splitback.length - 1].score / (splitback.length - 1) > 0.7 ){ 
										back_time = splitback[splitback.length - 2][0]._fields[0].properties.startTime + back[splitback[splitback.length - 1][0]._fields[0].properties.goal];
									}

									else{
										splitback.slice(splitback.length - 1, 1)
										splitback[splitback.length] = { 
											soreness: splitback.reduce((accumulator, currentValue, currentIndex, array) => {
										    return accumulator + currentValue[0]._fields[0].properties.soreness;
										    console.log('reduce',accumulator, currentValue[0]._fields[0].properties.score)
										  }) 
										}
										if(splitback[splitback.length - 1].soreness / (splitback.length - 1) > 2.5 ){ 
											back_time = splitback[splitback.length - 2][0]._fields[0].properties.startTime + (back[splitback[splitback.length - 2][0]._fields[0].properties.goal] - oneday)
										}
										else if(splitback[splitback.length - 1].soreness / (splitback.length - 1) < 1.5 ) {
											back_time = splitback[splitback.length - 2][0]._fields[0].properties.startTime + (back[splitback[splitback.length - 2][0]._fields[0].properties.goal] + oneday)
										}
										else{
											
											back_time = splitback[splitback.length - 2][0]._fields[0].properties.startTime + back[splitback[splitback.length - 2][0]._fields[0].properties.goal];
										}
									}

								}else{
									splitback[splitback.length] = { 
										soreness: splitback.reduce((accumulator, currentValue, currentIndex, array) => {
									    return accumulator + currentValue[0]._fields[0].properties.soreness;
									    console.log('reduce',accumulator, currentValue[0]._fields[0].properties.score)
									  }) 
									}
									
									if(splitback[splitback.length - 1].soreness / (splitback.length - 1) > 2.5 ){ 
										back_time = splitback[splitback.length - 2][0]._fields[0].properties.startTime + (back[splitback[splitback.length - 2][0]._fields[0].properties.goal] - oneday)
									}
									else if(splitback[splitback.length - 1].soreness / (splitback.length - 1) < 1.5 ) {
										back_time = splitback[splitback.length - 2][0]._fields[0].properties.startTime + (back[splitback[splitback.length - 2][0]._fields[0].properties.goal] + oneday)
									}
									else{
										
										back_time = splitback[splitback.length - 2][0]._fields[0].properties.startTime + back[splitback[splitback.length - 2][0]._fields[0].properties.goal];

										console.log('back_time', back_time, splitback[splitback.length - 2][0]._fields[0].properties.startTime, splitback[splitback.length - 2][0]._fields[0].properties.startTime)
									}
								}

							}else{
								back_time = new Date().getTime();
							}
						}
						if(splitcore[0].length > 0){
							let core = times.core;
							// figure next core next workout date
							if(splitcore[splitcore.length - 1][0]._fields[0].properties.startTime > ( currentTime - oneweek) ) {
								if(splitcore.length > 10 && info.length === results.length){
									splitcore[splitcore.length] = { 
										score: splitcore.reduce((accumulator, currentValue, currentIndex, array) => {
									    return accumulator + currentValue[0]._fields[1].properties.score;
									  }) 
									}
									if(splitcore[splitcore.length - 1].score / (splitcore.length - 1) > 0.7 ){ 
										core_time = splitcore[splitcore.length - 2][0]._fields[0].properties.startTime + times.core[splitcore[splitcore.length - 2][0]._fields[0].properties.goal];
									}

									else{
										splitcore.splice(splitcore.length - 1, 1);
										splitcore[splitcore.length] = { 
											soreness: splitcore.reduce((accumulator, currentValue, currentIndex, array) => {
										    return accumulator + currentValue[0]._fields[0].properties.soreness;
										  }) 
										}
										if(splitcore[splitcore.length -1].soreness / (splitcore.length - 1) > 2.5 ){ 
											core_time = splitcore[splitcore.length - 2][0]._fields[0].properties.startTime + (times.core[splitcore[splitcore.length - 2][0]._fields[0].properties.goal] - oneday);
										}
										else if(splitcore[splitcore.length - 1].soreness / (splitcore.length - 1) < 1.5 ) {
											core_time = splitcore[splitcore.length - 2][0]._fields[0].properties.startTime + (times.core[splitcore[splitcore.length - 2][0]._fields[0].properties.goal] + oneday);
										}
										else{
											core_time = splitcore[splitcore.length - 2][0]._fields[0].properties.startTime + times.core[splitcore[splitcore.length - 2][0]._fields[0].properties.goal];
										}

									}

								}else{
									splitcore[splitcore.length] = { 
										soreness: splitcore.reduce((accumulator, currentValue, currentIndex, array) => {
									    return accumulator + currentValue[0]._fields[0].properties.soreness;
									  }) 
									}
									if(splitcore[splitcore.length - 1].soreness / (splitcore.length - 1) > 2.5 ){ 
										core_time = splitcore[splitcore.length - 2][0]._fields[0].properties.startTime + (times.core[splitcore[splitcore.length - 2][0]._fields[0].properties.goal] - oneday);
									}
									else if(splitcore[splitcore.length - 1].soreness / (splitcore.length - 1) < 1.5 ) {
										core_time = splitcore[splitcore.length - 2][0]._fields[0].properties.startTime + (times.core[splitcore[splitcore.length - 2][0]._fields[0].properties.goal] + oneday);
									}
									else{
										core_time = splitcore[splitcore.length - 2][0]._fields[0].properties.startTime + times.core[splitcore[splitcore.length - 2][0]._fields[0].properties.goal];
									}
								}

							}else{
								core_time = new Date().getTime();
							}
						}

						if(splitglutes[0].length > 0){
							// figure out glutes next date
							if(splitglutes[splitglutes.length - 1][0]._fields[0].properties.startTime > ( currentTime - oneweek) ) {
								if(splitglutes.length > 10 && info.length === results.length){

									splitglutes[splitglutes.length] = { 
										score: splitglutes.reduce((accumulator, currentValue, currentIndex, array) => {
									    return accumulator + currentValue[0]._fields[1].properties.score;
									  }) 
									}

									if(splitglutes[splitglutes.length - 1].score / (splitglutes.length - 1) > 0.7 ){ 
										glutes_time = splitglutes[splitglutes.length - 2][0]._fields[0].properties.startTime + times.core[splitglutes[splitglutes.length - 2][0]._fields[0].properties.goal];
									}
									else{
										splitglutes.splice(splitglutes.length - 1, 1);
											splitglutes[splitglutes.length] = { 
											soreness: splitglutes.reduce((accumulator, currentValue, currentIndex, array) => {
										    return accumulator + currentValue[0]._fields[0].properties.soreness;
										  }) 
										}
										if(splitglutes[splitglutes.length - 1].soreness / (splitglutes.length - 1) > 2.5 ){ 
											glutes_time = splitglutes[splitglutes.length - 2][0]._fields[0].properties.startTime + (times.glutes[splitglutes[splitglutes.length - 2][0]._fields[0].properties.goal] - oneday);
										}
										else if(splitglutes[splitglutes.length - 1].soreness / (splitglutes.length - 1) < 1.5 ) {
											glutes_time = splitglutes[splitglutes.length - 2][0]._fields[0].properties.startTime + (times.glutes[splitglutes[splitglutes.length - 2][0]._fields[0].properties.goal] + oneday);
										}
										else{
											glutes_time = splitglutes[splitglutes.length - 2][0]._fields[0].properties.startTime + times.glutes[splitglutes[splitglutes.length - 2][0]._fields[0].properties.goal];
										}

									}

								}else{
									splitglutes[splitglutes.length] = { 
										soreness: splitglutes.reduce((accumulator, currentValue, currentIndex, array) => {
									    return accumulator + currentValue[0]._fields[0].properties.soreness;
									  }) 
									}
									if(splitglutes[splitglutes.length - 1].soreness / (splitglutes.length - 1) > 2.5 ){ 
										glutes_time = splitglutes[splitglutes.length - 2][0]._fields[0].properties.startTime + (times.glutes[splitglutes[splitglutes.length - 2][0]._fields[0].properties.goal] - oneday);
									}
									else if(splitglutes[splitglutes.length - 1].soreness / (splitglutes.length - 1) < 1.5 ) {
										glutes_time = splitglutes[splitglutes.length - 2][0]._fields[0].properties.startTime + (times.glutes[splitglutes[splitglutes.length - 2][0]._fields[0].properties.goal] + oneday);
									}
									else{
										glutes_time = splitglutes[splitglutes.length - 2][0]._fields[0].properties.startTime + times.glutes[splitglutes[splitglutes.length - 2][0]._fields[0].properties.goal];
									}
								}

							}else{
								glutes_time = new Date().getTime();
							}
						}
						if(splithamstrings[0].length > 0){

							// figure out hamstrings next date
							if(splithamstrings[splithamstrings.length - 1][0]._fields[0].properties.startTime > ( currentTime - oneweek) ) {
								if(splithamstrings.length > 10 && info.length === results.length){

									splithamstrings[splithamstrings.length] = { 
										score: splithamstrings.reduce((accumulator, currentValue, currentIndex, array) => {
									    return accumulator + currentValue[0]._fields[1].properties.score;
									  }) 
									}

									if(splithamstrings[splithamstrings.length -1].score / (splithamstrings.length - 1) > 0.7 ){ 
										hamstrings_time = splithamstrings[splithamstrings.length - 2][0]._fields[0].properties.startTime + times.core[splithamstrings[splithamstrings.length - 2][0]._fields[0].properties.goal];
									}else{
										splithamstrings.splice(splithamstrings.length - 1, 1);

										splithamstrings[splithamstrings.length] = { 
											soreness: splithamstrings.reduce((accumulator, currentValue, currentIndex, array) => {
										    return accumulator + currentValue[0]._fields[0].properties.soreness;
										  }) 
										}
										if(splithamstrings[splithamstrings.length -1].soreness / (splithamstrings.length - 1) > 2.5 ){ 
											hamstrings_time = splithamstrings[splithamstrings.length - 2][0]._fields[0].properties.startTime + (times.hamstrings[splithamstrings[splithamstrings.length - 2][0]._fields[0].properties.goal] - oneday);
										}
										else if(splithamstrings[splithamstrings.length - 1].soreness / (splithamstrings.length - 1) < 1.5 ) {
											hamstrings_time = splithamstrings[splithamstrings.length - 2][0]._fields[0].properties.startTime + (times.hamstrings[splithamstrings[splithamstrings.length - 2][0]._fields[0].properties.goal] + oneday);
										}
										else{
											hamstrings_time = splithamstrings[splithamstrings.length - 2][0]._fields[0].properties.startTime + times.hamstrings[splithamstrings[splithamstrings.length - 2][0]._fields[0].properties.goal];
										}

									}

								}else{
									splithamstrings[splithamstrings.length] = { 
										soreness: splithamstrings.reduce((accumulator, currentValue, currentIndex, array) => {
									    return accumulator + currentValue[0]._fields[0].properties.soreness;
									  }) 
									}
									if(splithamstrings[splithamstrings.length -1].soreness / (splithamstrings.length - 1) > 2.5 ){ 
										hamstrings_time = splithamstrings[splithamstrings.length - 2][0]._fields[0].properties.startTime + (times.hamstrings[splithamstrings[splithamstrings.length - 2][0]._fields[0].properties.goal] - oneday);
									}
									else if(splithamstrings[splithamstrings.length -1].soreness / (splithamstrings.length - 1) < 1.5 ) {
										hamstrings_time = splithamstrings[splithamstrings.length - 2][0]._fields[0].properties.startTime + (times.hamstrings[splithamstrings[splithamstrings.length - 2][0]._fields[0].properties.goal] + oneday);
									}
									else{
										hamstrings_time = splithamstrings[splithamstrings.length - 2][0]._fields[0].properties.startTime + times.hamstrings[splithamstrings[splithamstrings.length - 2][0]._fields[0].properties.goal];
									}
								}

							}else{
								hamstrings_time = new Date().getTime();
							}
						}
						if(splitquads[0].length > 0){
							// figure out quads next date
							if(splitquads[splitquads.length - 1][0]._fields[0].properties.startTime > ( currentTime - oneweek) ) {
								if(splitquads.length > 10 && info.length === results.length){
									splitquads[splitquads.length] = { 
										score: splitquads.reduce((accumulator, currentValue, currentIndex, array) => {
									    return accumulator + currentValue[0]._fields[1].properties.score;
									  }) 
									}

									if(splitquads[splitquads.length -1].score / (splitquads.length - 1) > 0.7 ){ 
										quads_time = splitquads[splitquads.length - 2][0]._fields[0].properties.startTime + times.core[splitquads[splitquads.length - 2][0]._fields[0].properties.goal];
									}else{
										splitquads.splice(splitquads.length - 1, 1);

										splitquads[splitquads.length] = { 
											soreness: splitquads.reduce((accumulator, currentValue, currentIndex, array) => {
										    return accumulator + currentValue[0]._fields[0].properties.soreness;
										  }) 
										}
										if(splitquads[splitquads.length -1].soreness / (splitquads.length - 1) > 2.5 ){ 
											quads_time = splitquads[splitquads.length - 2][0]._fields[0].properties.startTime + (times.quads[splitquads[splitquads.length - 2][0]._fields[0].properties.goal] - oneday);
										}
										else if(splitquads[splitquads.length -1].soreness / (splitquads.length - 1) < 1.5 ) {
											quads_time = splitquads[splitquads.length - 2][0]._fields[0].properties.startTime + (times.quads[splitquads[splitquads.length - 2][0]._fields[0].properties.goal] + oneday);
										}
										else{
											quads_time = splitquads[splitquads.length - 2][0]._fields[0].properties.startTime + times.quads[splitquads[splitquads.length - 2][0]._fields[0].properties.goal];
										}

									}

								}else{
									splitquads[splitquads.length] = { 
										soreness: splitquads.reduce((accumulator, currentValue, currentIndex, array) => {
									    return accumulator + currentValue[0]._fields[0].properties.soreness;
									  }) 
									}
									if(splitquads[splitquads.length -1].soreness / (splitquads.length - 1) > 2.5 ){ 
										quads_time = splitquads[splitquads.length - 2][0]._fields[0].properties.startTime + (times.quads[splitquads[splitquads.length - 2][0]._fields[0].properties.goal] - oneday);
									}
									else if(splitquads[splitquads.length -1].soreness / (splitquads.length - 1) < 1.5 ) {
										quads_time = splitquads[splitquads.length - 2][0]._fields[0].properties.startTime + (times.quads[splitquads[splitquads.length - 2][0]._fields[0].properties.goal] + oneday);
									}
									else{
										quads_time = splitquads[splitquads.length - 2][0]._fields[0].properties.startTime + times.quads[splitquads[splitquads.length - 2][0]._fields[0].properties.goal];
									}
								}

							}else{
								quads_time = new Date().getTime();
							}
						}
						if(splitshoulders[0].length > 0){

							// figure out shoulders next date
							if(splitshoulders[splitshoulders.length - 1][0]._fields[0].properties.startTime > ( currentTime - oneweek) ) {
								if(splitshoulders.length > 10 && info.length === results.length){
									splitshoulders[splitshoulders.length] = { 
										score: splitshoulders.reduce((accumulator, currentValue, currentIndex, array) => {
									    return accumulator + currentValue[0]._fields[1].properties.score;
									  }) 
									}

									if(splitshoulders[splitshoulders.length -1].score / (splitshoulders.length - 1) > 0.7 ){ 
										shoulders_time = splitshoulders[splitshoulders.length - 2][0]._fields[0].properties.startTime + times.core[splitshoulders[splitshoulders.length - 2][0]._fields[0].properties.goal];
									}
									else{
										splitshoulders.splice(splitshoulders.length - 1, 1);

										splitshoulders[splitshoulders.length] = { 
											soreness: splitshoulders.reduce((accumulator, currentValue, currentIndex, array) => {
										    return accumulator + currentValue[0]._fields[0].properties.soreness;
										  }) 
										}
										if(splitshoulders[splitshoulders.length -1].soreness / (splitshoulders.length - 1) > 2.5 ){ 
											shoulders_time = splitshoulders[splitshoulders.length - 2][0]._fields[0].properties.startTime + (times.shoulders[splitshoulders[splitshoulders.length - 2][0]._fields[0].properties.goal] - oneday);
										}
										else if(splitshoulders[splitshoulders.length - 1].soreness / (splitshoulders.length - 1) < 1.5 ) {
											shoulders_time = splitshoulders[splitshoulders.length - 2][0]._fields[0].properties.startTime + (times.shoulders[splitshoulders[splitshoulders.length - 2][0]._fields[0].properties.goal] + oneday);
										}
										else{
											shoulders_time = splitshoulders[splitshoulders.length - 2][0]._fields[0].properties.startTime + times.shoulders[splitshoulders[splitshoulders.length - 2][0]._fields[0].properties.goal];
										}
								

									}

								}else{
									splitshoulders[splitshoulders.length] = { 
										soreness: splitshoulders.reduce((accumulator, currentValue, currentIndex, array) => {
									    return accumulator + currentValue[0]._fields[0].properties.soreness;
									  }) 
									}
									if(splitshoulders[splitshoulders.length -1].soreness / (splitshoulders.length - 1) > 2.5 ){ 
										shoulders_time = splitshoulders[splitshoulders.length - 2][0]._fields[0].properties.startTime + (times.shoulders[splitshoulders[splitshoulders.length - 2][0]._fields[0].properties.goal] - oneday);
									}
									else if(splitshoulders[splitshoulders.length -1].soreness / (splitshoulders.length - 1) < 1.5 ) {
										shoulders_time = splitshoulders[splitshoulders.length - 2][0]._fields[0].properties.startTime + (times.shoulders[splitshoulders[splitshoulders.length - 2][0]._fields[0].properties.goal] + oneday);
									}
									else{
										shoulders_time = splitshoulders[splitshoulders.length - 2][0]._fields[0].properties.startTime + times.shoulders[splitshoulders[splitshoulders.length - 2][0]._fields[0].properties.goal];
									}
								}

							}else{
								shoulders_time = new Date().getTime();
							}
						}
						if(splitbiceps[0].length > 0){

							// figure out biceps next date
							if(splitbiceps[splitbiceps.length - 1][0]._fields[0].properties.startTime > ( currentTime - oneweek) ) {
								if(splitbiceps.length > 10 && info.length === results.length){

									splitbiceps[splitbiceps.length] = { 
										score: splitbiceps.reduce((accumulator, currentValue, currentIndex, array) => {
									    return accumulator + currentValue[0]._fields[1].properties.score;
									  }) 
									}

									if(splitbiceps[splitbiceps.length -1].score / (splitbiceps.length - 1) > 0.7 ){ 
										biceps_time = splitbiceps[splitbiceps.length - 2][0]._fields[0].properties.startTime + times.core[splitbiceps[splitbiceps.length - 2][0]._fields[0].properties.goal];
									}
									else{
										splitbiceps.splice(splitbiceps.length - 1 , 1);

										splitbiceps[splitbiceps.length] = { 
											soreness: splitbiceps.reduce((accumulator, currentValue, currentIndex, array) => {
										    return accumulator + currentValue[0]._fields[0].properties.soreness;
										  }) 
										}
										if(splitbiceps[splitbiceps.length -1].soreness / (splitbiceps.length - 1) > 2.5 ){ 
											biceps_time = splitbiceps[splitbiceps.length - 2][0]._fields[0].properties.startTime + (times.biceps[splitbiceps[splitbiceps.length - 2][0]._fields[0].properties.goal] - oneday);
										}
										else if(splitbiceps[splitbiceps.length -1].soreness / (splitbiceps.length - 1) < 1.5 ) {
											biceps_time = splitbiceps[splitbiceps.length - 2][0]._fields[0].properties.startTime + (times.biceps[splitbiceps[splitbiceps.length - 2][0]._fields[0].properties.goal] + oneday);
										}
										else{
											biceps_time = splitbiceps[splitbiceps.length - 2][0]._fields[0].properties.startTime + times.biceps[splitbiceps[splitbiceps.length - 2][0]._fields[0].properties.goal];
										}
									}

								}else{
									splitbiceps[splitbiceps.length] = { 
										soreness: splitbiceps.reduce((accumulator, currentValue, currentIndex, array) => {
									    return accumulator + currentValue[0]._fields[0].properties.soreness;
									  }) 
									}
									if(splitbiceps[splitbiceps.length -1].soreness / (splitbiceps.length - 1) > 2.5 ){ 
										biceps_time = splitbiceps[splitbiceps.length - 2][0]._fields[0].properties.startTime + (times.biceps[splitbiceps[splitbiceps.length - 2][0]._fields[0].properties.goal] - oneday);
									}
									else if(splitbiceps[splitbiceps.length -1].soreness / (splitbiceps.length - 1) < 1.5 ) {
										biceps_time = splitbiceps[splitbiceps.length - 2][0]._fields[0].properties.startTime + (times.biceps[splitbiceps[splitbiceps.length - 2][0]._fields[0].properties.goal] + oneday);
									}
									else{
										biceps_time = splitbiceps[splitbiceps.length - 2][0]._fields[0].properties.startTime + times.biceps[splitbiceps[splitbiceps.length - 2][0]._fields[0].properties.goal];
									}
								}

							}else{
								biceps_time = new Date().getTime();
							}
						}
						if(splittriceps[0].length > 0){

							// figure out triceps next date
							if(splittriceps[splittriceps.length - 1][0]._fields[0].properties.startTime > ( currentTime - oneweek) ) {
								if(splittriceps.length > 10 && info.length === results.length){

									splittriceps[splittriceps.length] = { 
										score: splittriceps.reduce((accumulator, currentValue, currentIndex, array) => {
									    return accumulator + currentValue[0]._fields[1].properties.score;
									  }) 
									}

									if(splittriceps[splittriceps.length -1].score / (splittriceps.length - 1) > 0.7 ){ 
										triceps_time = splittriceps[splittriceps.length - 2][0]._fields[0].properties.startTime + times.core[splittriceps[splittriceps.length - 2][0]._fields[0].properties.goal];
									}
									else{
										splittriceps.splice(splittriceps.length - 1, 1);

										splittriceps[splittriceps.length] = { 
											soreness: splittriceps.reduce((accumulator, currentValue, currentIndex, array) => {
										    return accumulator + currentValue[0]._fields[0].properties.soreness;
										  }) 
										}
										if(splittriceps[splittriceps.length -1].soreness / (splittriceps.length - 1) > 2.5 ){ 
											triceps_time = splittriceps[splittriceps.length - 2][0]._fields[0].properties.startTime + (times.triceps[splittriceps[splittriceps.length - 2][0]._fields[0].properties.goal] - oneday);
										}
										else if(splittriceps[splittriceps.length -1].soreness / (splittriceps.length - 1) < 1.5 ) {
											triceps_time = splittriceps[splittriceps.length - 2][0]._fields[0].properties.startTime + (times.triceps[splittriceps[splittriceps.length - 2][0]._fields[0].properties.goal] + oneday);
										}
										else{
											triceps_time = splittriceps[splittriceps.length - 2][0]._fields[0].properties.startTime + times.triceps[splittriceps[splittriceps.length - 2][0]._fields[0].properties.goal];
										}

									}

								}else{
									splittriceps[splittriceps.length] = { 
										soreness: splittriceps.reduce((accumulator, currentValue, currentIndex, array) => {
									    return accumulator + currentValue[0]._fields[0].properties.soreness;
									  }) 
									}
									if(splittriceps[splittriceps.length -1].soreness / (splittriceps.length - 1) > 2.5 ){ 
										triceps_time = splittriceps[splittriceps.length - 2][0]._fields[0].properties.startTime + (times.triceps[splittriceps[splittriceps.length - 2][0]._fields[0].properties.goal] - oneday);
									}
									else if(splittriceps[splittriceps.length -1].soreness / (splittriceps.length - 1) < 1.5 ) {
										triceps_time = splittriceps[splittriceps.length - 2][0]._fields[0].properties.startTime + (times.triceps[splittriceps[splittriceps.length - 2][0]._fields[0].properties.goal] + oneday);
									}
									else{
										triceps_time = splittriceps[splittriceps.length - 2][0]._fields[0].properties.startTime + times.triceps[splittriceps[splittriceps.length - 2][0]._fields[0].properties.goal];
									}
								}

							}else{
								triceps_time = new Date().getTime();
							}
						}
						if(splitcalves[0].length > 0){

							// figure out calves next date
							if(splitcalves[splitcalves.length - 1][0]._fields[0].properties.startTime > ( currentTime - oneweek) ) {
								if(splitcalves.length > 10 && info.length === results.length){

									splitcalves[splitcalves.length] = { 
										score: splitcalves.reduce((accumulator, currentValue, currentIndex, array) => {
									    return accumulator + currentValue[0]._fields[1].properties.score;
									  }) 
									}

									if(splitcalves[splitcalves.length -1].score / (splitcalves.length - 1) > 0.7 ){ 
										calves_time = splitcalves[splitcalves.length - 2][0]._fields[0].properties.startTime + times.core[splitcalves[splitcalves.length - 2][0]._fields[0].properties.goal];
									}else{
										splitcalves.splice(splitcalves.length - 1, 1);

										splitcalves[splitcalves.length] = { 
											soreness: splitcalves.reduce((accumulator, currentValue, currentIndex, array) => {
										    return accumulator + currentValue[0]._fields[0].properties.soreness;
										  }) 
										}
										if(splitcalves[splitcalves.length -1].soreness / (splitcalves.length - 1) > 2.5 ){ 
											calves_time = splitcalves[splitcalves.length - 2][0]._fields[0].properties.startTime + (times.calves[splitcalves[splitcalves.length - 2][0]._fields[0].properties.goal] - oneday);
										}
										else if(splitcalves[splitcalves.length -1].soreness / (splitcalves.length - 1) < 1.5 ) {
											calves_time = splitcalves[splitcalves.length - 2][0]._fields[0].properties.startTime + (times.calves[splitcalves[splitcalves.length - 2][0]._fields[0].properties.goal] + oneday);
										}
										else{
											calves_time = splitcalves[splitcalves.length - 2][0]._fields[0].properties.startTime + times.calves[splitcalves[splitcalves.length - 2][0]._fields[0].properties.goal];
										}
									}

								}else{
									splitcalves[splitcalves.length] = { 
										soreness: splitcalves.reduce((accumulator, currentValue, currentIndex, array) => {
									    return accumulator + currentValue[0]._fields[0].properties.soreness;
									  }) 
									}
									if(splitcalves[splitcalves.length -1].soreness / (splitcalves.length - 1) > 2.5 ){ 
										calves_time = splitcalves[splitcalves.length - 2][0]._fields[0].properties.startTime + (times.calves[splitcalves[splitcalves.length - 2][0]._fields[0].properties.goal] - oneday);
									}
									else if(splitcalves[splitcalves.length -1].soreness / (splitcalves.length - 1) < 1.5 ) {
										calves_time = splitcalves[splitcalves.length - 2][0]._fields[0].properties.startTime + (times.calves[splitcalves[splitcalves.length - 2][0]._fields[0].properties.goal] + oneday);
									}
									else{
										calves_time = splitcalves[splitcalves.length - 2][0]._fields[0].properties.startTime + times.calves[splitcalves[splitcalves.length - 2][0]._fields[0].properties.goal];
									}
								}

							}else{
								calves_time = new Date().getTime();
							}
						}
						if(splitchest[0].length > 0){

							// figure out chest next date
							if(splitchest[splitchest.length - 1][0]._fields[0].properties.startTime > ( currentTime - oneweek) ) {
								if(splitchest.length > 10 && info.length === results.length){

									splitchest[splitchest.length] = { 
										score: splitchest.reduce((accumulator, currentValue, currentIndex, array) => {
									    return accumulator + currentValue[0]._fields[1].properties.score;
									  }) 
									}

									if(splitchest[splitchest.length -1].score / (splitchest.length - 1) > 0.7 ){ 
										chest_time = splitchest[splitchest.length - 2][0]._fields[0].properties.startTime + times.core[splitchest[splitchest.length - 2][0]._fields[0].properties.goal];
									}
									else{
										splitchest.splice(splitchest.length - 1, 1);

										splitchest[splitchest.length] = { 
											soreness: splitchest.reduce((accumulator, currentValue, currentIndex, array) => {
										    return accumulator + currentValue[0]._fields[0].properties.soreness;
										  }) 
										}
										if(splitchest[splitchest.length -1].soreness / (splitchest.length - 1) > 2.5 ){ 
											chest_time = splitchest[splitchest.length - 2][0]._fields[0].properties.startTime + (times.chest[splitchest[splitchest.length - 2][0]._fields[0].properties.goal] - oneday);
										}
										else if(splitchest[splitchest.length -1].soreness / (splitchest.length - 1) < 1.5 ) {
											chest_time = splitchest[splitchest.length - 2][0]._fields[0].properties.startTime + (times.chest[splitchest[splitchest.length - 2][0]._fields[0].properties.goal] + oneday);
										}
										else{
											chest_time = splitchest[splitchest.length - 2][0]._fields[0].properties.startTime + times.chest[splitchest[splitchest.length - 2][0]._fields[0].properties.goal];
										}

									}


								}else{
									splitchest[splitchest.length] = { 
										soreness: splitchest.reduce((accumulator, currentValue, currentIndex, array) => {
									    return accumulator + currentValue[0]._fields[0].properties.soreness;
									  }) 
									}
									if(splitchest[splitchest.length -1].soreness / (splitchest.length - 1) > 2.5 ){ 
										chest_time = splitchest[splitchest.length - 2][0]._fields[0].properties.startTime + (times.chest[splitchest[splitchest.length - 2][0]._fields[0].properties.goal] - oneday);
									}
									else if(splitchest[splitchest.length -1].soreness / (splitchest.length - 1) < 1.5 ) {
										chest_time = splitchest[splitchest.length - 2][0]._fields[0].properties.startTime + (times.chest[splitchest[splitchest.length - 2][0]._fields[0].properties.goal] + oneday);
									}
									else{
										chest_time = splitchest[splitchest.length - 2][0]._fields[0].properties.startTime + times.chest[splitchest[splitchest.length - 2][0]._fields[0].properties.goal];
									}
								}

							}else{
								chest_time = new Date().getTime();
							}
						}
				})
				.then(() => {


						
				})
				.then(() => {
						db.close();
						res.writeHead(200, header);
				        res.end(JSON.stringify({
				        	success:'yes',
				        	results: {
				        		back: back_time,
				        		core: core_time,
				        		hamstrings: hamstrings_time,
				        		quads: quads_time,
				        		biceps: biceps_time,
				        		triceps: triceps_time,
				        		shoulders: shoulders_time,
				        		calves: calves_time,
				        		chest: chest_time,
				        		glutes: glutes_time,
				        	},

			        	}));
				        console.log(JSON.stringify({
				        	success:'yes',
				        	results: {
				        		back: back_time,
				        		core: core_time,
				        		hamstrings: hamstrings_time,
				        		quads: quads_time,
				        		biceps: biceps_time,
				        		triceps: triceps_time,
				        		shoulders: shoulders_time,
				        		calves: calves_time,
				        		chest: chest_time,
				        		glutes: glutes_time,

				        	},

						}))
						return;


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
			})


		})

		//TODO: CONVERT TO NEW NEO4J DRIVER USING PROMISE
		/*server.post('/bf/get/mostimportant/factors', (req, res, next) => {     
			let body = req.body;
			let oneweeksago = 1209600000/2;
			let currentTime = new Date().getTime()
			let cypher1 = [
						    "MATCH (u:USER {uuid:{id}})-[:COMPLETED]->(sets:SetFeedback {part: {bodypart}})",
    						"WHERE (sets)-[:RECORDED]->(:RESULT)",
							"RETURN sets ORDER BY sets.startTime ASC"].join('\n');	
			db.query(cypher1, {
					id: body.userid,
					bodypart:body.bodypart,

				},	(err, results1) => {
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
					        let cypher2 = [
						        "MATCH (u:USER {uuid:{id}})-[:RECORDED]->(soreness:SORENESS {part:{bodypart}})",
					        	"RETURN soreness ORDER BY soreness.timestamp ASC"].join('\n');
					        db.query(cypher2, {
					        	id: body.userid,
								bodypart:body.bodypart,
					        }, (err, results2) => {
					        	if(err){
					        		console.log(err);
									res.writeHead(500, header)
							        res.end(JSON.stringify({
							          success:'no',   
							          err: err,
							          message:'Something went wrong logging in. Check error message to see what happened.'
							          }))
					        	}
					        	else{
									let cypher3 = [
								    "MATCH (setsAgain1:SetFeedback {part:{bodypart}})-[:RECORDED]->(result:RESULT)",
						        	"result ORDER BY result.timestamp ASC"].join('\n');
						        	db.query(cypher3, {
						        		id: body.userid,
										bodypart:body.bodypart,
						        	}, (err, results3) => {
						        		if(err){
							        		console.log(err);
											res.writeHead(500, header)
									        res.end(JSON.stringify({
									          success:'no',   
									          err: err,
									          message:'Something went wrong logging in. Check error message to see what happened.'
									          }))
							        	}
							        	else{

											let cypher4 = [
											"MATCH (setsAgain2:SetFeedback {part: {bodypart}})-[:RECORDED]->(soreness2:SORENESS {part:{bodypart}})",
								        	"RETURN soreness2"].join('\n');
								        	db.query(cypher4, {
								        		id: body.userid,
												bodypart:body.bodypart,
								        	}, (err, results4) => {
								        		if(err){
									        		console.log(err);
													res.writeHead(500, header)
											        res.end(JSON.stringify({
											          success:'no',   
											          err: err,
											          message:'Something went wrong logging in. Check error message to see what happened.'
											          }))
									        	}
									        	else{						        	

									        	
									        			let results =  results3.map((x)=>{
									        				return x = x.score;
									        			})
									        	
									        			results1.forEach((x, index)=>{
									        				if(results2[index] != undefined){
									        					x.soreness = results2[index].pain;
									        					x.results =  results[index];
									        				}
									        				else{
									        					x.soreness = 0;
									        					x.results =  results[index];
									        				}
									        				if(results1[parseInt(index) + 1] !== undefined){
									        					if(results1[parseInt(index) + 1].startTime - x.stopTime < 86400000){
									        						x.rest = results1[parseInt(index) + 1].startTime - x.stopTime;
									        					}else{
									        						x.rest = 0;
									        					}
									   
									        				}else{
									        					x.rest = 0;
									        				}
									        			});


									        			let daysBetweenWorkout = results1.map((x, index)=>{
									        				if(results1[parseInt(index) + 1] !== undefined){
									        					if(results1[parseInt(index) + 1].startTime - x.stopTime >= 86400000){
									        						return x.score = results1[parseInt(index) + 1].startTime - x.stopTime; x.results =  results[index]; 
									        					}else{
									        						return x.score = 0; 
									        					}
									   
									        				}else{
									        					return x.score = 0;
									        				}
									        			}).filter((x, index)=>{
									        				return x.score != 0;
									        			})

									        			results1.map((x, index)=>{
									        				x.weightDone = x.weightDone/10000;
									        				x.repsDone = x.repsDone/10000;
									        				x.rest = x.rest/10000;
									        				x.tut = (x.stopTime - x.startTime)/1000000;
									        				x.name = s2b(x.uuid);
									        				//console.log(x.name.length)

									        				x.name_array = Array.from(x.name);
									        				x.name_array = x.name_array.map((x)=>{
									        					return x = parseInt(x);
									        				})
									        				/*if(results1[index - 1]){
									        						if(results1[index - 1].name_array.length - x.name_array.length > 0){
									        							
									        							for(var i = results1[index - 1].name_array.length; i < results1[index - 1].name_array.length - x.name_array.length; i++){
									        								x.name_array = x.name_array[i].concat([0.911]);
									        							}
									        						} else if(results1[index - 1].name_array.length - x.name_array.length < 0){
									        							for(var i = results1[index].name_array.length; i < x.name_array.length - results1[index - 1].name_array.length; i++){
									        								results1[index - 1].name_array = results1[index - 1].name_array[i].concat([0.911]);
									        							}

									        						}
									        					
									        				}*/
									        			//})

									        		/*	let x = results1.map((x, index)=>{ return x = [x.weightDone, x.repsDone, x.rest, x.tut].concat(x.name_array)});
									        			let y = results.map((x)=>{
									        				return x = [x];
									        			})
									        			let training_set = [];
									        			x.forEach((n, index)=>{
									        				training_set.push({input:n, output: y[index]});
									        				console.log(training_set);
									        			})


									        			let network = new neataptic.architect.Perceptron(x[0].length, x.length, 1);
									        			network.evolve(training_set, {
									        				  //mutation: methods.mutation.FFW,
															  equal: true,
															  popsize: 100,
															  elitism: 10,
															  log: 1,
															  error: 0.001,
															  iterations: 10000,
															  mutationRate: 0.5
									        			});

									        												        			
														x.forEach((data, index)=>{
															console.log(network.activate(data));
															results1[index].prediction = network.activate(data);
														})	

														let significant	= results1.filter((n)=>{
															return n.prediction > .3; //make it more than 70%
														});
														let important_weights = [];
														let important_reps = [];
														let important_rest = [];
														let important_tut = [];
														Promise.resolve(true).then(()=>{
															training_set.forEach((n, index)=>{
																let starter_data = n;
																// weight tests
																for(var i =0; i < 20; i++){ 
																	n.input[0] = ((n.input[0] * 10000)+5);
																	console.log('weight input', n.input[0]);
																	n.input[0] = n.input[0]/10000;
																	console.log('weight input', n.input[0], network.activate(x[index]), network.activate(n.input));
																	console.log('training set', training_set[index].input, n.input);
													
																		if(network.activate(x[index]) < network.activate(n.input)){
																			important_weights.push({
																				weight: n.input[0] * 10000,
																				prediction: network.activate(n.input),
																				data: n
																			})
																			console.log(important_weights);
																		}

																}
																for(var i =0; i < 20; i++){ 
																	n.input[0] = ((n.input[0] * 10000)-5);
																	console.log('weight input', n.input[0]);
																	n.input[0] = n.input[0]/10000;
																	console.log('weight input', n.input[0], network.activate(x[index]), network.activate(n.input));
																	console.log('training set', training_set[index].input, n.input);
													
																		if(network.activate(x[index]) < network.activate(n.input)){
																			important_weights.push({
																				weight: n.input[0] * 10000,
																				prediction: network.activate(n.input),
																				data: n
																			})
																			console.log(important_weights);
																		}

																}
																// reps test
																for(var i =0; i < 30; i++){ 
																	n.input[1] = ((n.input[1] * 10000) + 1);
																	console.log('reps input', n.input[1]);
																	n.input[1] = n.input[1]/10000;
																	n.input[0] = starter_data.input[0];
																	console.log('reps input', n.input[1], network.activate(x[index]), network.activate(n.input));
																	console.log('training set', training_set[index].input, n.input);
													
																		if(network.activate(x[index]) < network.activate(n.input)){
																			important_reps.push({
																				reps: n.input[1] * 10000,
																				prediction: network.activate(n.input),
																				data: n,
																			})
																			console.log(important_reps);
																		}

																}
																for(var i =0; i < 30; i++){ 
																	n.input[1] = ((n.input[1] * 10000)-1);
																	console.log('reps input', n.input[1]);
																	n.input[1] = n.input[1]/10000;
																	n.input[0] = starter_data.input[0];
																	console.log('reps input', n.input[1], network.activate(x[index]), network.activate(n.input));
																	console.log('training set', training_set[index].input, n.input);
													
																		if(network.activate(x[index]) < network.activate(n.input)){
																			important_reps.push({
																				reps: n.input[1] * 10000,
																				prediction: network.activate(n.input),
																				data: n
																			})
																			console.log(important_reps);
																		}

																}
																// rest test
																for(var i =0; i < 60; i++){ 
																	n.input[2] = ((n.input[2] * 10000) + 1);
																	console.log('rest input', n.input[2]);
																	n.input[2] = n.input[2]/10000;
																	n.input[1] = starter_data.input[1];
																	console.log('rest input', n.input[2], network.activate(x[index]), network.activate(n.input));
																	console.log('training set', training_set[index].input, n.input);
													
																		if(network.activate(x[index]) < network.activate(n.input)){
																			important_rest.push({
																				rest: n.input[2] * 10000,
																				prediction: network.activate(n.input),
																				data: n,
																			})
																			console.log(important_reps);
																		}

																}
																for(var i =0; i < 60; i++){ 
																	n.input[2] = ((n.input[2] * 10000)-1);
																	console.log('rest input', n.input[2]);
																	n.input[2] = n.input[2]/10000;
																	n.input[1] = starter_data.input[1];
																	console.log('rest input', n.input[2], network.activate(x[index]), network.activate(n.input));
																	console.log('training set', training_set[index].input, n.input);
													
																		if(network.activate(x[index]) < network.activate(n.input)){
																			important_rest.push({
																				rest: n.input[2] * 10000,
																				prediction: network.activate(n.input),
																				data: n
																			})
																			console.log(important_reps);
																		}

																}
																// tut test
																for(var i =0; i < 60; i++){ 
																	n.input[3] = ((n.input[3] * 1000000) + 1000);
																	console.log('tut input', n.input[3]);
																	n.input[3] = n.input[3]/1000000;
																	n.input[2] = starter_data.input[2];
																	console.log('tut input', n.input[3], network.activate(x[index]), network.activate(n.input));
																	console.log('training set', training_set[index].input, n.input);
													
																		if(network.activate(x[index]) < network.activate(n.input)){
																			important_tut.push({
																				tut: n.input[3] * 1000000,
																				prediction: network.activate(n.input),
																				data: n,
																			})
																			console.log(important_reps);
																		}

																}
																for(var i =0; i < 60; i++){ 
																	n.input[3] = ((n.input[3] * 1000000)-1000);
																	console.log('tut input', n.input[3]);
																	n.input[3] = n.input[3]/1000000;
																	n.input[2] = starter_data.input[2];
																	console.log('tut input', n.input[3], network.activate(x[index]), network.activate(n.input));
																	console.log('training set', training_set[index].input, n.input);
													
																		if(network.activate(x[index]) < network.activate(n.input)){
																			important_tut.push({
																				tut: n.input[3] * 1000000,
																				prediction: network.activate(n.input),
																				data: n
																			})
																			console.log(important_reps);
																		}

																}
										        				/*x.weightDone = x.weightDone/10000;
										        				x.repsDone = x.repsDone/10000;
										        				x.rest = x.rest/10000;
										        				x.tut = (x.stopTime - x.startTime)/1000000;
										        				x.name = s2b(x.name);
										        				//console.log(x.name.length)

										        				x.name_array = Array.from(x.name);
										        				x.name_array = x.name_array.map((x)=>{
										        					return x = parseInt(x);
										        				})*/
										        			
										        		/*	 })
														}).then(()=>{
															res.writeHead(200, header);
													        res.end(JSON.stringify({
													        	success:'yes',
													        	sets: results1,
													        	//results: results,
													        	//daysBetweenWorkout: daysBetweenWorkout,
													        	//x: x,
													        	//y:y,
													        	prediction: network.activate(x[0]),
													        	//significant: significant,
													        	important_weights: important_weights,
													        	important_reps: important_reps,
													        	important_rest: important_rest,
													        	important_tut: important_tut
													        	
													    
												

												        	}));
												        	console.log(JSON.stringify({
													        	success:'yes',
													        	sets: results1,
													        	//results: results,	
													        	//daysBetweenWorkout: daysBetweenWorkout,
													    
															}));
									        				

												        
														return
														})
																					        										        				
									        			

									        	}
									        })
							        	}
						        	})
					        	}
					        })
						}
					

				})

			
		}) //end of /bf/get/mostimportant/factors */




	}
}



export default Analytics