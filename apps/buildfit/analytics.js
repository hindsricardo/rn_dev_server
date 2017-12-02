/* apps/buildfit/plan*/
import {secret} from './config';
import jwt from 'jsonwebtoken';
import uuid from 'node-uuid';
import _ from 'underscore';
var b2s = require('binary-to-string');
var s2b = require('string-to-binary');
var neataptic = require('Neataptic'); 
const header = {'Content-Type':'application/json; charset=utf-8'};

class Analytics {

	constructor(db, server) {
		this.name = 'Analytics';


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

								let totalweight1 = 0; 
								let totalreps1 = 0; 
								let totaltime1 = 0; 
								let totalrest1 = 0; 
								let ptsAll = 0

								for(var i=0; i < results.length; i++){
									let ting = results[i]._fields[0].properties;
									if(results[i - 1]){
										 totalrest1 += (parseInt(ting.startTime) - parseInt(results[i -1]._fields[0].properties.stopTime)); //current set stop time versus pervious set stop time. ASSUMING response in order of oldest record last.
										 console.log('/bf/get/points','totalrest1', totalrest1)
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
									console.log('/bf/get/points','totalweight1', totalweight1, 'totalreps1', totalreps1, 'totaltime1', totaltime1, 'avgweight1', avgweight1, 'avgreps1',avgreps1, 'avgtime1', avgtime1, 'avgrest1', avgrest1, 'pts1', pts1, 'ptsAll', ptsAll);
								}
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

										console.log('/bf/get/points',results2.records);
											let totalweight1 = 0; 
											let totalreps1 = 0; 
											let totaltime1 = 0; 
											let totalrest1 = 0; 
											let ptsGlutes = 0

											for(var i=0; i < results2.length; i++){
												let ting = results2[i]._fields[0].properties;
												if(results2[i - 1]){
													 totalrest1 += (parseInt(ting.startTime) - parseInt(results2[i -1]._fields[0].properties.stopTime)); //current set stop time versus pervious set stop time. ASSUMING response in order of oldest record last.
													 console.log('/bf/get/points','totalrest1', totalrest1)
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
												console.log('/bf/get/points','totalweight1', totalweight1, 'totalreps1', totalreps1, 'totaltime1', totaltime1, 'avgweight1', avgweight1, 'avgreps1',avgreps1, 'avgtime1', avgtime1, 'avgrest1', avgrest1, 'pts1', pts1, 'ptsGlutes', ptsGlutes);
											}


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
				
											let totalweight1 = 0; 
											let totalreps1 = 0; 
											let totaltime1 = 0; 
											let totalrest1 = 0; 
											let ptsHamstrings = 0

											for(var i=0; i < results3.length; i++){
												let ting = results3[i]._fields[0].properties;
												if(results3[i - 1]){
													 totalrest1 += (parseInt(ting.startTime) - parseInt(results3.records[i -1]._fields[0].properties.stopTime)); //current set stop time versus pervious set stop time. ASSUMING response in order of oldest record last.
													 console.log('/bf/get/points','totalrest1', totalrest1)
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
												console.log('/bf/get/points','totalweight1', totalweight1, 'totalreps1', totalreps1, 'totaltime1', totaltime1, 'avgweight1', avgweight1, 'avgreps1',avgreps1, 'avgtime1', avgtime1, 'avgrest1', avgrest1, 'pts1', pts1, 'ptsHamstrings', ptsHamstrings);
											}
	
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

											let totalweight1 = 0; 
											let totalreps1 = 0; 
											let totaltime1 = 0; 
											let totalrest1 = 0; 
											let ptsBack = 0;

											for(var i=0; i < results4.length; i++){
												let ting = results4[i]._fields[0].properties;
												if(results4[i - 1]){
													 totalrest1 += (parseInt(ting.startTime) - parseInt(results4[i -1]._fields[0].properties.stopTime)); //current set stop time versus pervious set stop time. ASSUMING response in order of oldest record last.
													 console.log('/bf/get/points', 'totalrest1', totalrest1)
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
												console.log('/bf/get/points','totalweight1', totalweight1, 'totalreps1', totalreps1, 'totaltime1', totaltime1, 'avgweight1', avgweight1, 'avgreps1',avgreps1, 'avgtime1', avgtime1, 'avgrest1', avgrest1, 'pts1', pts1, 'ptsBack', ptsBack);
											}

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
		
											let totalweight1 = 0; 
											let totalreps1 = 0; 
											let totaltime1 = 0; 
											let totalrest1 = 0; 
											let ptsCalves = 0

											for(var i=0; i < results5.length; i++){
												let ting = results5[i]._fields[0].properties;
												if(results5[i - 1]){
													totalrest1 += (parseInt(ting.startTime) - parseInt(results5[i -1]._fields[0].properties.stopTime)); //current set stop time versus pervious set stop time. ASSUMING response in order of oldest record last.
													 console.log('/bf/get/points', 'totalrest1', totalrest1)
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
												console.log('/bf/get/points','totalweight1', totalweight1, 'totalreps1', totalreps1, 'totaltime1', totaltime1, 'avgweight1', avgweight1, 'avgreps1',avgreps1, 'avgtime1', avgtime1, 'avgrest1', avgrest1, 'pts1', pts1, 'ptsCalves', ptsCalves);
											}

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

											let totalweight1 = 0; 
											let totalreps1 = 0; 
											let totaltime1 = 0; 
											let totalrest1 = 0; 
											let ptsCore = 0

											for(var i=0; i < results6.length; i++){
												let ting = results6[i]._fields[0].properties;
												if(results6[i - 1]){
													 totalrest1 += (parseInt(ting.startTime) - parseInt(results6[i -1]._fields[0].properties.stopTime)); //current set stop time versus pervious set stop time. ASSUMING response in order of oldest record last.
													 console.log('/bf/get/points','totalrest1', totalrest1)
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
												console.log('/bf/get/points','totalweight1', totalweight1, 'totalreps1', totalreps1, 'totaltime1', totaltime1, 'avgweight1', avgweight1, 'avgreps1',avgreps1, 'avgtime1', avgtime1, 'avgrest1', avgrest1, 'pts1', pts1, 'ptsCore', ptsCore);
											}

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
											let totalweight1 = 0; 
											let totalreps1 = 0; 
											let totaltime1 = 0; 
											let totalrest1 = 0; 
											let ptsBiceps = 0

											for(var i=0; i < results7.length; i++){
												let ting = results7[i]._fields[0].properties;
												if(results7[i - 1]){
													 totalrest1 += (parseInt(ting.startTime) - parseInt(results7[i -1]._fields[0].properties.stopTime)); //current set stop time versus pervious set stop time. ASSUMING response in order of oldest record last.
													 console.log('/bf/get/points','totalrest1', totalrest1)
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
												console.log('/bf/get/points','totalweight1', totalweight1, 'totalreps1', totalreps1, 'totaltime1', totaltime1, 'avgweight1', avgweight1, 'avgreps1',avgreps1, 'avgtime1', avgtime1, 'avgrest1', avgrest1, 'pts1', pts1, 'ptsBiceps', ptsBiceps);
											}

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
											let totalweight1 = 0; 
											let totalreps1 = 0; 
											let totaltime1 = 0; 
											let totalrest1 = 0; 
											let ptsQuads = 0

											for(var i=0; i < results8.length; i++){
												let ting = results8[i]._fields[0].properties;
												if(results8[i - 1]){
													 totalrest1 += (parseInt(ting.startTime) - parseInt(results8[i -1]._fields[0].properties.stopTime)); //current set stop time versus pervious set stop time. ASSUMING response in order of oldest record last.
													 console.log('/bf/get/points','totalrest1', totalrest1)
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
												console.log('/bf/get/points','totalweight1', totalweight1, 'totalreps1', totalreps1, 'totaltime1', totaltime1, 'avgweight1', avgweight1, 'avgreps1',avgreps1, 'avgtime1', avgtime1, 'avgrest1', avgrest1, 'pts1', pts1, 'ptsQuads', ptsQuads);
											}

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
											let totalweight1 = 0; 
											let totalreps1 = 0; 
											let totaltime1 = 0; 
											let totalrest1 = 0; 
											let ptsTriceps = 0

											for(var i=0; i < results9.length; i++){
												let ting = results9[i]._fields[0].properties;
												if(results9[i - 1]){
													 totalrest1 += (parseInt(ting.startTime) - parseInt(results9[i -1]._fields[0].properties.stopTime)); //current set stop time versus pervious set stop time. ASSUMING response in order of oldest record last.
													 console.log('/bf/get/points','totalrest1', totalrest1)
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
												console.log('/bf/get/points','totalweight1', totalweight1, 'totalreps1', totalreps1, 'totaltime1', totaltime1, 'avgweight1', avgweight1, 'avgreps1',avgreps1, 'avgtime1', avgtime1, 'avgrest1', avgrest1, 'pts1', pts1, 'ptsTriceps', ptsTriceps);
											}
		
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
											let totalweight1 = 0; 
											let totalreps1 = 0; 
											let totaltime1 = 0; 
											let totalrest1 = 0; 
											let ptsShoulders = 0

											for(var i=0; i < results10.length; i++){
												let ting = results10[i]._fields[0].properties;
												if(results10[i - 1]){
													 totalrest1 += (parseInt(ting.startTime) - parseInt(results10[i -1]._fields[0].properties.stopTime)); //current set stop time versus pervious set stop time. ASSUMING response in order of oldest record last.
													 console.log('/bf/get/points','totalrest1', totalrest1)
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
												console.log('/bf/get/points','totalweight1', totalweight1, 'totalreps1', totalreps1, 'totaltime1', totaltime1, 'avgweight1', avgweight1, 'avgreps1',avgreps1, 'avgtime1', avgtime1, 'avgrest1', avgrest1, 'pts1', pts1, 'ptsShoulders', ptsShoulders);
											}


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
												let totalweight1 = 0; 
												let totalreps1 = 0; 
												let totaltime1 = 0; 
												let totalrest1 = 0; 
												let ptsChest = 0
												Promise.resolve(true).then(()=>{
													for(var i=0; i < results11.length; i++){
														let ting = results11[i]._fields[0].properties;
														if(results11[i - 1]){
															 totalrest1 += (parseInt(ting.startTime) - parseInt(results11[i -1]._fields[0].properties.stopTime)); //current set stop time versus pervious set stop time. ASSUMING response in order of oldest record last.
															 console.log('/bf/get/points','totalrest1', totalrest1)
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
														console.log('/bf/get/points','totalweight1', totalweight1, 'totalreps1', totalreps1, 'totaltime1', totaltime1, 'avgweight1', avgweight1, 'avgreps1',avgreps1, 'avgtime1', avgtime1, 'avgrest1', avgrest1, 'pts1', pts1, 'ptsChest', ptsChest);
													}													
												}).then(()=>{
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


					let cypher2 = "MATCH (u:USER {uuid: $id}})-[:COMPLETED]->(set {planUUID:$planUUID}) RETURN DISTINCT set ORDER BY set.stopTime";
					db.run(cypher2, {
						planUUID: results[0]._fields[0].properties.planUUID,
						id: body.userid
					}).then((data2) => {
						let results2 = results2.records;
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
			let eightweeksago = 4838400000;
			let currentTime = new Date().getTime()
			let cypher = "MATCH (set1 {part:$bodypart})<-[:COMPLETED]-(u:USER {uuid:$id}) WHERE set1.stopTime < $currentTime - $eightweeksago AND NOT (:RESULT)<-[:RECORDED]-(set1) CREATE (result:RESULT {score: $score})<-[:RECORDED]-(set1) result";	
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


		server.post('/bf/check/need/results/feedback', (req, res, next) => {
			let eightweeksago = 4838400000;
			let currentTime = new Date().getTime();
			let body = req.body;
			let cypher = "MATCH (u:USER {uuid:$id})-[:COMPLETED]->(sets) WHERE sets.stopTime < $currentTime - $eightweeksago AND NOT (sets)-[:RECORDED]->(:RESULT) RETURN sets ";	
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

		//TODO: CONVERT TO NEW NEO4J DRIVER USING PROMISE
		server.post('/bf/get/mostimportant/factors', (req, res, next) => {     
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
									        			})

									        			let x = results1.map((x, index)=>{ return x = [x.weightDone, x.repsDone, x.rest, x.tut].concat(x.name_array)});
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
										        			
										        			})
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

			
		}) //end of /bf/get/mostimportant/factors




	}
}



export default Analytics