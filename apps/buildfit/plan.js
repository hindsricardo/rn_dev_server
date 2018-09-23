/* apps/buildfit/plan*/
import {secret} from './config';
import {exercises_core_pack} from './config';
import {exercises_core_pack2} from './config2';

import {frameworks} from './frameworks';
import {patterns} from './patterns';

var lowerCase = require('lower-case');

import jwt from 'jsonwebtoken';
import uuid from 'node-uuid';
import _ from 'underscore';
import moment from 'moment';
import youtubeSearch from 'youtube-search';
var stripe = require("stripe")(
  "sk_test_jjMsr7JRvBqis3InsnqaKJSx"
	);
const uuidV4 = require('uuid');
const header = {'Content-Type':'application/json; charset=utf-8'};

class Plan {

	constructor(db, server) {
		this.name = 'Plan'


    //SEARCH YOUTUBE VIDEOS
    server.post('/bf/urfittrainer/search/youtube', (req,res,next) => {
      let body = req.body;
      var opts = {
        maxResults: 25,
        key: 'AIzaSyBhV_DknbhPjxr5XD5f3fz55AYcOMPT6oM'
      };

      youtubeSearch(body.searchTerm, opts, function(err, results) {
        if(err) {
          res.writeHead(500, header);
          res.end(JSON.stringify({
  	        	results: err,
              status:"error",
  						route: '/bf/urfittrainer/search/youtube'
          	}));
          console.log(JSON.stringify({
          	results: err,
            status:'error',
  					route: '/bf/urfittrainer/search/youtube'
          }));
          return
        }else{
          res.writeHead(200, header);
          res.end(JSON.stringify({
  	        	results: results,
              status:'success',
  						route: '/bf/urfittrainer/search/youtube'
          	}));
          console.log(JSON.stringify({
          	results: results,
            status:'success',
  					route: '/bf/urfittrainer/search/youtube'
          }));
          return
        }
      });
    })
		//CREATE EXERCISES
		server.post('/bf/urfittrainer/create/new/exercise', (req, res, next) => {
			let body = req.body;
      let now = new Date().getTime();
      let checkVideoIdANDtitle = "MATCH (n:EXERCISE {public:$public}) WHERE n.name = $name OR n.VideoURL = $VideoURL RETURN n";
			let cypher = "MATCH (trainer:TRAINER {uuid:$id}) CREATE (n:EXERCISE {name:$name, uuid:$uuid, description:$description, public:$public, VideoURL:$VideoURL, part: $part, creator: $creator, created:$created})<-[:CREATED]-(trainer) RETURN n ";
      db.run(checkVideoIdANDtitle, {
        VideoURL: body.VideoURL,
				name: body.name,
        public: 'Public',
      })
      .then((finds) => {
        db.close();
				finds = finds.records.map((x) => {
					return x = x._fields[0].properties;
				});
        if(finds.length > 0 && body.public == "Public"){
          res.writeHead(200, header);
          res.end(JSON.stringify({
              results: finds,
              status:"duplicate",
              route: 'bf/urfittrainer/create/new/exercise'
            }));
          console.log(JSON.stringify({
            results: finds,
            status:"duplicate",
            route: 'bf/urfittrainer/create/new/exercise'
          }));
          return
        }
        else{
            //CREATE NEW LISTING
            db.run(cypher,{
              id:body.id,
              creator:body.id,
              uuid: uuidV4(),
              description:body.description,
              VideoURL: body.VideoURL,
              name: body.name,
              public: body.public,
              part:body.part,
              created: now,
            }).then((results) => {
              db.close();
              results = results.records.map((x) => {
                return x = x._fields[0].properties;
              });
              res.writeHead(200, header);
              res.end(JSON.stringify({
                  results: results,
                  status:"created",
                  route: 'bf/urfittrainer/create/new/exercise'
                }));
              console.log(JSON.stringify({
                results: results,
                status:"created",
                route: 'bf/urfittrainer/create/new/exercise'
              }));
              return
            })
            .catch((err) => {
              res.writeHead(500, header);
              res.end(JSON.stringify({
                  results: err,
                  status:"error",
                  route: 'bf/urfittrainer/create/new/exercise'
                }));
              console.log(JSON.stringify({
                results: err,
                status:"error",
                route: 'bf/urfittrainer/create/new/exercise'
              }));
            })
        }
      })
      .catch((err) => {
				res.writeHead(500, header);
        res.end(JSON.stringify({
	        	results: err,
            status:"error",
						route: 'bf/urfittrainer/create/new/exercise'
        	}));
        console.log(JSON.stringify({
        	results: err,
          status:"error",
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
					return x.pattern = JSON.parse(x.pattern), x.selectedExercise = JSON.parse(x.selectedExercise), x.diet = JSON.parse(x.diet);
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

		//GET GRADE AND SCORE FOR methodDescription
		server.post('/bf/urfittrainer/get/method/avg/grade/&/score', (req, res, next) => {

      let body = req.body;

            let month = 86400000 * 30;
            let now = new Date().getTime();
            let cypher4 = " MATCH (n:SetFeedback {method:$methodID})-[:RECORDED]->(m:RESULT) WHERE n.stopTime > $now - $month RETURN m";
            db.run(cypher4, {
              methodID: body.methodID,
              month: month,
              now: now,
            })
            .then((results4) => {
              let avgScore = 0
              let avgScore2 = 0
              let finalAvg = 0;
							let avgGrade = 0;
							let avgGrade2 = 0;
							let finalGrade = 0;
              db.close();
              if(results4.records.length > 0){
                let results4Strip = results4.records.map((x) => {
                  x.score = parseInt(x.score);
									x.grade = parseInt(x.grade);
                  return x = x._fields[0].properties;
                });
                let sum = results4Strip.reduce((accumulator, currentValue) => accumulator + currentValue.score,0);
                avgScore = (sum/ results4Strip.length).toFixed(2);
								let gradeSum = results4Strip.reduce((accumulator, currentValue) => accumulator + currentValue.grade,0);
								avgGrade = (gradeSum/ results4Strip.length).toFixed(2);
              }
              else{
                let results4Strip = [];
                avgScore = 0
								avgGrade = 0
              }

              let cypher5 = "MATCH (n:SetFeedback {method:$methodID})-[:RECORDED]->(m:RESULT) WHERE n.stopTime < $now - $month RETURN m";
              db.run(cypher5, {
                methodID: body.methodID,
                month: month,
                now: now,
              })
              .then((results5) => {
                db.close();
                  let results5Strip = results5.records.map((x) => {
                    x.score = parseInt(x.score);
										x.grade = parseInt(x.grade);
                    return x = x._fields[0].properties;
                  });
                  Promise.resolve(true).then(() => {
										if(results5.records.length > 0){
	                    let sum2 = results5Strip.reduce((accumulator, currentValue) => accumulator + currentValue.score,0);
											let gradeSum2 = results5Strip.reduce((accumulator, currentValue) => accumulator + currentValue.grade,0);
	                    avgScore2 = (sum2/ results5Strip.length).toFixed(2);
											avgGrade2 = (gradeSum2/ results5Strip.length).toFixed(2);
										}

                    if(avgScore == 0 || avgScore == null && avgScore2 > 0 ){
                      finalAvg = avgScore2;
                    }
                    else if(avgScore > 0 && avgScore2 > 0 ){
                      finalAvg = (avgScore *.6) + (avgScore2 * .4);
                    }
                    else if(avgScore > 0 && avgScore2 == 0 || avgScore2 == null ){
                      finalAvg = avgScore;
                    }
                    else{
                      finalAvg = 0;
                    }

										if(avgGrade == 0 || avgGrade == null && avgGrade2 > 0 ){
                      finalGrade = avgGrade2;
                    }
                    else if(avgGrade > 0 && avgGrade2 > 0 ){
                      finalGrade = (avgGrade *.6) + (avgGrade2 * .4);
                    }
                    else if(avgGrade > 0 && avgGrade2 == 0 || avgGrade2 == null ){
                      finalGrade = avgGrade;
                    }
                    else{
                      finalGrade = 0;
                    }
                  })
                  .then(() => {
                    res.writeHead(200, header);
                    res.end(JSON.stringify({
                        finalAvg: finalAvg,
												finalGrade: finalGrade,
												avgGrade: avgGrade,
												avgGrade2:avgGrade2,
												avgScore: avgScore,
												avgScore2: avgScore2,
                        route: '/bf/urfittrainer/get/method/avg/grade/&/score'
                      }));
                    console.log(JSON.stringify({
											finalAvg: finalAvg,
											finalGrade: finalGrade,
											route: '/bf/urfittrainer/get/method/avg/grade/&/score'
                    }));
                  })
              })
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

			let cypher = "UNWIND $subscribers AS x MATCH (user:USER) WHERE x.customer = user.uuid SET user.cost = x.items.data[0].plan.amount RETURN user";

			stripe.subscriptions.list({},{
				stripe_account: body.id
			}, (err, subscriptions) => {
				console.log("subscriptions", subscriptions.data)


							db.run(cypher, {
								id: body.id,
								subscribers: subscriptions.data,
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
			})


		}); //


		//GET ALL TRAINER SUBSCRIBERS BY METHOD ID
		server.post('/bf/urfittrainer/get/trainer/subscribers/to/method', (req, res, next) => {
			let body = req.body;
			let cypher = "UNWIND $subscribers AS x MATCH (user:USER) WHERE user.uuid = x.customer MATCH (user)-[:SUBSCRIBED]->(:METHOD {uuid:$methodID}) RETURN user ";

			stripe.subscriptions.list({},{
				stripe_account: body.id
			}, (err, subscriptions) => {
				console.log("subscriptions", subscriptions.data)

				db.run(cypher, {
						methodID:body.methodID,
						subscribers: subscriptions.data
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
			let cypher = "MATCH (trainer:TRAINER {uuid:$trainerID}) CREATE (trainer)-[:CREATED]->(n:METHOD {trainer:$trainerID, focus:$focus, gender: $gender, descipline:$descipline, location:$location, pattern: $pattern, daysAweek:$daysAweek, selectedExercise:$selectedExercise, soreness2:$soreness2, soreness3:$soreness3, methodDescription:$methodDescription, uuid:$uuid, duration:$duration,routineType:$routineType, tags:$tags, diet:$diet}) RETURN n ";
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
				diet: JSON.stringify(body.diet)
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
			let cypher = "MATCH (n:METHOD {uuid:$uuid}) SET n +=  {focus: $focus, gender: $gender, descipline: $descipline, location: $location, pattern :$pattern, daysAweek: $daysAweek, selectedExercise: $selectedExercise, soreness2: $soreness2, soreness3: $soreness3, methodDescription: $methodDescription, duration: $duration, routineType: $routineType, tags:$tags, diet:$diet} RETURN n ";
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
				tags: body.tags,
				diet: JSON.stringify(body.diet)

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


    //URFIT CLIENT INITIAL SEARCH
    server.post('/bf/urfitclient/search/from/questions', (req, res, next) => {
      let body = req.body;
      let cypher = ""
      console.log(body.diet.length, body.parts)
      Promise.resolve(true).then(() => {
        if(body.diet.length < 1){
          cypher = "UNWIND $parts AS part MATCH (m:METHOD) WHERE m.descipline = $focus AND part IN m.parts MATCH (t:TRAINER {uuid:m.trainer}) MATCH (methods:METHOD {trainer: t.uuid}) RETURN t {.*, methods: collect(DISTINCT methods {.duration, .location, .daysAweek, .focus, .methodDescription, .gender, .parts, .descipline}) LIMIT 2000 }" ;
        }
        else{
          cypher = "UNWIND $parts AS part UNWIND $diet AS diet MATCH (m:METHOD) WHERE m.descipline = $focus AND part IN m.parts AND diet IN m.diet MATCH (t:TRAINER {uuid:m.trainer}) MATCH (methods:METHOD {trainer: t.uuid}) RETURN t {.*, methods: collect(DISTINCT methods {.duration, .location, .daysAweek, .focus, .methodDescription, .gender, .parts, .descipline}) LIMIT 2000 } " ;
        }
      })
      .then(() => {
        db.run(cypher, {
          focus: body.focus,
          diet: body.diet,
          parts: body.parts,
        }).then((results) => {
          db.close();
          results = results.records;

          res.writeHead(200, header);
          res.end(JSON.stringify({
              results: results,
              route: '/bf/urfitclient/search/from/questions'
            }));
          console.log(JSON.stringify({
            results: results,
            route: '/bf/urfitclient/search/from/questions'
          }));
          return
        })
        .catch((err) => {
          res.writeHead(500, header);
          res.end(JSON.stringify({
              results: err,
              route: '/bf/urfitclient/search/from/questions'
            }));
          console.log(JSON.stringify({
            results: err,
            route: '/bf/urfitclient/search/from/questions'
          }));
        }) //
      })
      .catch((err) => {
        res.writeHead(500, header);
        res.end(JSON.stringify({
            results: err,
            route: '/bf/urfitclient/search/from/questions'
          }));
        console.log(JSON.stringify({
          results: err,
          route: '/bf/urfitclient/search/from/questions'
        }));
      })

    })

    //URFIT CLIENT INITIAL SEARCH
    server.post('/bf/urfitclient/search/by/trainer/email', (req, res, next) => {
      let body = req.body;
      let cypher = ""
      console.log(body.diet.length)

          cypher = "MATCH (t:TRAINER) WHERE t.email = $search OR t.email CONTAINS $search OR t.original_email = $search OR t.original_email CONTAINS $search OR t.name = $search OR t.name CONTAINS $search  RETURN t LIMIT 25" ;
        db.run(cypher, {
          search: body.search,
        }).then((results) => {
          db.close();
          results = results.records;

          res.writeHead(200, header);
          res.end(JSON.stringify({
              results: results,
              route: '/bf/urfitclient/search/by/trainer/email'
            }));
          console.log(JSON.stringify({
            results: results,
            route: '/bf/urfitclient/search/by/trainer/email'
          }));
          return
        })
        .catch((err) => {
          res.writeHead(500, header);
          res.end(JSON.stringify({
              results: err,
              route: '/bf/urfitclient/search/by/trainer/email'
            }));
          console.log(JSON.stringify({
            results: err,
            route: '/bf/urfitclient/search/by/trainer/email'
          }));
        }) //

    })

	}
}


export default Plan
