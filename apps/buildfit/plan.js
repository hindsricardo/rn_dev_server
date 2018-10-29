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
const log = require('simple-node-logger').createSimpleLogger('node-error.log');


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
      let now = Date.now();
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

		//GET METHODS - also used in urfit client
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
      let month = 86400000 * 30;
      let now = new Date().getTime();
      let cypher = ""
      console.log(body.diet.length, body.parts)
      Promise.resolve(true).then(() => {
        if(body.diet.length < 1){
          cypher = "UNWIND $parts AS part MATCH (m:METHOD) WHERE m.descipline = $focus AND part IN m.parts MATCH (t:TRAINER {uuid:m.trainer}) MATCH (methods:METHOD {trainer: t.uuid}) MATCH (set:SetFeedback)-[:RECORDED]->(result:RESULT {trainer:t.uuid}) RETURN t {.*, methods: collect(DISTINCT methods {.duration, .location, .daysAweek, .focus, .methodDescription, .gender, .parts, .descipline, .pattern}), rating: avg(result.score) } ORDER BY t.rating DESC LIMIT 2000 " ;
        }
        else{
          cypher = "UNWIND $parts AS part UNWIND $diet AS diet MATCH (m:METHOD) WHERE m.descipline = $focus AND part IN m.parts AND diet IN m.diet MATCH (t:TRAINER {uuid:m.trainer}) MATCH (methods:METHOD {trainer: t.uuid}) MATCH (set:SetFeedback)-[:RECORDED]->(result:RESULT {trainer:t.uuid}) RETURN t {.*, methods: collect(DISTINCT methods {.duration, .location, .daysAweek, .focus, .methodDescription, .gender, .parts, .descipline, .pattern}), rating: avg(result.score)  } ORDER BY t.rating DESC LIMIT 2000" ;
        }
      })
      .then(() => {
        db.run(cypher, {
          focus: body.focus,
          diet: body.diet,
          parts: body.parts,
          now: now,
          month: month
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
          let cypher = "MATCH (t:TRAINER) WHERE t.email = $search OR t.email CONTAINS $search OR t.original_email = $search OR t.original_email CONTAINS $search OR t.name = $search OR t.name CONTAINS $search MATCH (methods:METHOD {trainer: t.uuid}) MATCH (set:SetFeedback)-[:RECORDED]->(result:RESULT {trainer:t.uuid}) RETURN t {.*, methods: collect(DISTINCT methods {.duration, .location, .daysAweek, .focus, .methodDescription, .gender, .parts, .descipline, .pattern}), rating: avg(result.score)  } ORDER BY t.rating DESC  LIMIT 25" ;
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

    //URFITCLIENT CREATE token
    server.post('/bf/urfitclient/create/payment/token', (req, res, next) => {
        let body = req.body;
        let dates = body.cardexpiry.split('/');
        stripe.tokens.create({
          card: {
            "number": body.cardnumber,
            "exp_month": dates[0],
            "exp_year": '20'+dates[1],
            "cvc": body.cardcvc
          }
        }, function(err, token) {
          // asynchronously called
          if(err){
            if(err.type == "card_error"){
              log.error(err);// log to error file
              console.log('/bf/urfitclient/create/payment/token',err);
              res.writeHead(500, header)
              res.end(JSON.stringify({
                success:'no',
                status:"card_error",
                results: err,
              }))
            }
            else{
              log.error(err);// log to error file
              console.log('/bf/urfitclient/create/payment/token',err);
              res.writeHead(500, header)
              res.end(JSON.stringify({
                success:'no',
                status:"error",
                results: err,
              }))
            }
          }
          else{
            stripe.customers.create({
              email: body.email,
              source: token.id
            }, function(err, customer) {
              // asynchronously called
              if(err){
                log.error(err);// log to error file
                console.log('/bf/urfitclient/create/payment/token',err);
                res.writeHead(500, header)
                res.end(JSON.stringify({
                  success:'no',
                  status:"error",
                  results: err,
                }))
              }
              else{
                db.run("MATCH (user:USER {uuid:$id}) SET user.stripeCustomerId = $customerId, user.cardlast4 = $last4 RETURN user", {
                  customerId: customer.id,
                  id:body.id,
                  last4: token.card.last4
                })
                .then((results) => {
                  db.close();
                  results = results.records;
                  res.writeHead(200, header);
                  res.end(JSON.stringify({
                      status:"taken",
                      results: results[0]._fields[0].properties,
                    }));
                  console.log('/bf/urfitclient/create/payment/token',JSON.stringify({
                    success:"yes",
                    status: "created",
                    results: results[0]._fields[0].properties,
                  }));
                  return
                })
                .catch((err) => {
                  log.error(err);// log to error file
                  console.log('/bf/urfitclient/create/payment/token',err);
                  res.writeHead(500, header)
                  res.end(JSON.stringify({
                    success:'no',
                    status:"error",
                    results: err,
                  }))
                })
              }
            });
          }
        });
    })

    //URFITCLIENT UPDATE CARD
    server.post('/bf/urfitclient/update/payment/method', (req, res, next) => {
      let body = req.body;
      let dates = body.cardexpiry.split('/');
      let last4 = body.cardnumber.substr(body.cardnumber.length - 4);
      stripe.tokens.create({
        card: {
          "number": body.cardnumber,
          "exp_month": dates[0],
          "exp_year": '20'+dates[1],
          "cvc": body.cardcvc
        }
      }, function(err, token) {
        // asynchronously called
        if(err){
          if(err.type == "card_error"){
            log.error(err);// log to error file
            console.log('/bf/urfitclient/update/payment/method',err);
            res.writeHead(500, header)
            res.end(JSON.stringify({
              success:'no',
              status:"card_error",
              results: err,
            }))
          }
          else{
            log.error(err);// log to error file
            console.log('/bf/urfitclient/update/payment/method',err);
            res.writeHead(500, header)
            res.end(JSON.stringify({
              success:'no',
              status:"error",
              results: err,
            }))
          }
        }
        else{
          /*stripe.customers.createSource(
            body.stripeCustomerId,
            { source: token.id },
            function(err, card) {
            // asynchronously called
            if(err){
              log.error(err);// log to error file
              console.log('/bf/urfitclient/update/payment/method',err);
              res.writeHead(500, header)
              res.end(JSON.stringify({
                success:'no',
                status:"error",
                results: err,
              }))
            }
            else{*/
              stripe.customers.update(body.stripeCustomerId, {
                source: token.id
              }, function(err, customer) {
                if(err){
                  log.error(err);// log to error file
                  console.log('/bf/urfitclient/update/payment/method',err);
                  res.writeHead(500, header)
                  res.end(JSON.stringify({
                    success:'no',
                    status:"error",
                    results: err,
                  }))
                }
                else{
                  db.run("MATCH (user:USER {uuid:$id}) SET user.cardlast4 = $last4 RETURN user", {
                    id:body.id,
                    last4: last4
                  })
                  .then((results) => {
                    db.close();
                    results = results.records;
                    res.writeHead(200, header);
                    res.end(JSON.stringify({
                        status:"taken",
                        results: results[0]._fields[0].properties,
                      }));
                    console.log('/bf/urfitclient/update/payment/method',JSON.stringify({
                      success:"yes",
                      status: "created",
                      results: results[0]._fields[0].properties,
                    }));
                    return
                  })
                  .catch((err) => {
                    log.error(err);// log to error file
                    console.log('/bf/urfitclient/update/payment/method',err);
                    res.writeHead(500, header)
                    res.end(JSON.stringify({
                      success:'no',
                      status:"error",
                      results: err,
                    }))
                  })
                }

                // asynchronously called
              });
            /*}
          });*/
        }
      });
    })

    //GET USERS TRAINER DETAILS
    server.post('/bf/urfitclient/get/users/trainer/details', (req, res, next) => {
      let body = req.body;
      db.run("MATCH (n:TRAINER {uuid:$trainerID}) RETURN n", {
        trainerID: body.trainerID,
      })
      .then((results) => {
        db.close();
        results = results.records.map((x) => {
          return x = x._fields[0].properties;
        });
        res.writeHead(200, header);
        res.end(JSON.stringify({
            status:"found",
            results: results,
          }));
        console.log('/bf/urfitclient/get/users/trainer/details',JSON.stringify({
          status: "found",
          results: results,
        }));
        return
      })
      .catch((err) => {
        log.error(err);// log to error file
        console.log('/bf/urfitclient/get/users/trainer/details',err);
        res.writeHead(500, header)
        res.end(JSON.stringify({
          status:"error",
          results: err,
        }))
      })
    })



    //EDIT TRAINERS METHODS
    server.post('/bf/urfitclient/subscribe/to/trainer', (req, res, next) => {
      let body = req.body;
      stripe.subscriptions.del(
        body.subscription,
        function(err, confirmation) {
          // asynchronously called
          if(err || confirmation.canceled){
            stripe.tokens.create({
              customer: body.stripeCustomerId,
            }, {
              stripe_account: body.trainerID,
            }).then(function(token) {
                stripe.customers.create({
                  description: body.stripeCustomerId,
                  source: token.id
                }, {
                  stripe_account: body.trainerID,
                }).then(function(customer) {
                    stripe.subscriptions.create({
                      customer: customer.id,
                      items: [
                        {
                          plan: body.trainerPlanId,
                        },
                      ],
                      application_fee_percent: 20,
                      trial_period_days: 3
                    }, {
                      stripe_account: body.trainerID,
                    }, function(err, subscription) {
                      if(err){
                          log.error(err);// log to error file
                          console.log('/bf/urfitclient/subscribe/to/trainer',err, 'failure during stripe create subscription');
                          res.writeHead(500, header)
                          res.end(JSON.stringify({
                            success:'no',
                            status:"error",
                            results: err,
                          }))
                      }
                      else{
                        //store subscription id and set subscribed to true in DB
                        db.run("MATCH (user:USER {uuid:$id}) SET user.subscription = $subscriptionId, user.subscribed = $boolean, user.currentTrainer = $trainerID, user.currentMethod = $currentMethod RETURN user", {
                          id:body.id,
                          subscriptionId: subscription.id,
                          boolean: true,
                          trainerID:body.trainerID,
                          currentMethod:""

                        })
                        .then((results) => {
                          db.close();
                          results = results.records;
                          console.log(results)
                          res.writeHead(200, header);
                          res.end(JSON.stringify({
                              success:"yes",
                              status:"subscribed",
                              results: results[0]._fields[0].properties,
                            }));
                          console.log('/bf/urfitclient/subscribe/to/trainer',JSON.stringify({
                            success:"yes",
                            status: "subscribed",
                            results: results[0]._fields[0].properties,
                          }));
                          return

                        })
                        .catch((err) => {
                          log.error(err);// log to error file
                          console.log('/bf/urfitclient/subscribe/to/trainer',err, 'failure during db storage');
                          res.writeHead(500, header)
                          res.end(JSON.stringify({
                            success:'no',
                            status:"error",
                            results: err,
                          }))
                        })
                      }
                      // asynchronously called
                    });
                  // asynchronously called
                });
              // asynchronously called
            });
          }
          else {
            log.error(err);// log to error file
            console.log('/bf/urfitclient/subscribe/to/trainer',err, 'failure during deleting subscriptions');
            res.writeHead(500, header)
            res.end(JSON.stringify({
              success:'no',
              status:"error",
              results: err,
            }))
          }
        }
      );

    })



    //SUBSCRIBE TO METHOD
    server.post('/bf/urfitclient/subscribe/to/method', (req, res, next) => {
      let body = req.body;
      let now = Date.now()
      let cypher = "MATCH (user:USER {uuid:$id}) SET user.currentMethod = $methodID WITH user  MATCH (m:METHOD {uuid:$methodID}) CREATE (user)-[:SUBSCRIBED {date:$now}]->(m) RETURN user"
      db.run(cypher, {
        id:body.id,
        methodID:body.methodID,
        now:now,
      })
      .then((results) => {
        db.close();
        results = results.records;
        res.writeHead(200, header);
        res.end(JSON.stringify({
            success:"yes",
            status:"subscribed",
            results: results[0]._fields[0].properties,
          }));
        console.log('/bf/urfitclient/subscribe/to/method',JSON.stringify({
          success:"yes",
          status: "subscribed",
          results: results[0]._fields[0].properties,
        }));
        return

      })
      .catch((err) => {
        log.error(err);// log to error file
        console.log('/bf/urfitclient/subscribe/to/method',err);
        res.writeHead(500, header)
        res.end(JSON.stringify({
          status:"error",
          results: err,
        }))
      })
    })


    //GET DAILY ROUTINE & ADVICE
  server.post('/bf/urfitclient/get/daily/advice', (req, res, next) => {
      let body = req.body;
      //let time = body.time;
      let today = moment().format('LL');
      let now = Date.now();
      let getLastWorkout = "MATCH (n:WORKOUT {user:$id}) RETURN n ORDER BY n.created DESC";

      let cypher = "MATCH (m:METHOD {uuid:$methodID}) RETURN m"
      db.run(getLastWorkout, {
        id:body.id,
      })
      .then((results) => {
        db.close();
        results = results.records.map((x) => {
          x = x._fields[0].properties;
          x.routine = JSON.parse(x.routine);
          return x;
        });
      if(results.length > 0){ //if there is a previous workout
          if(moment(results[0].created).format("LL") == today ||  results[0].status == "not started" ||results[0].status == "inprogress"){ // if the previous workout is the same day
            res.writeHead(200, header);
            res.end(JSON.stringify({
                success:"yes",
                results: results[0]
              }));
            console.log('/bf/urfitclient/get/daily/advice',JSON.stringify({
              success:"yes",
              results: results[0]
            }));
            return
          }
          else{
            // CREATE A WORKOUT BASED ON THE NEXT DAY ASSUMING THERE IS A NEXT DAY EXISTS, IF IT DOESN'T START FROM THE BEGINNING: TODO
            console.log('create workout based on next day');
            db.run(cypher, {
              methodID:body.methodID
            })
            .then((methods) => {
              db.close()
              methods = methods.records;
              let day = results[0].day + 1;
              let selectedExercise = JSON.parse(methods[0]._fields[0].properties.selectedExercise)
              let diet = JSON.parse(methods[0]._fields[0].properties.diet);
              let pattern = JSON.parse(methods[0]._fields[0].properties.pattern);
              if(pattern[day] != undefined){
                console.log('next day exists in pattern. day is: ', day);
                if(selectedExercise[day].length > 0){ // if there is a workout on day one
                  console.log('There is a workout on this day');
                  let randomselected = selectedExercise[day].map((slot) => {
                    if(slot.length > 0){
                      return slot[Math.floor(Math.random()*slot.length)]
                    }
                    else{return '';}
                  })
                  let alteredPattern = pattern[day].map((x, pos) => {
                     x.exercise = randomselected[x.number - 1];
                     x.diet = diet[day];
                     return x;
                  });
                  console.log(alteredPattern,'alteredPattern');

                  db.run("UNWIND $pattern AS info MATCH (exercise:EXERCISE {uuid:info.exercise}) RETURN info {.*, exercise:exercise}",{
                    pattern:alteredPattern
                  })
                  .then((pattern) => {
                    db.close()
                    pattern = pattern.records.map((x) => {
                      x = x._fields[0];
                      x.exercise = x.exercise.properties;
                      return x;

                    });
                    db.run("MATCH (user:USER {uuid:$id}) CREATE (n:WORKOUT {user:$id, methodID:$methodID, day:$day, trainer:$trainer, soreness2:$soreness2, soreness3:$soreness3, methodName:$methodName, created:$created, status:$status, routine:$routine})<-[:ASSIGNED]-(user)", {
                      routine: JSON.stringify(pattern),
                      id:body.id,
                      day: day,
                      methodID:body.methodID,
                      pattern:pattern,
                      trainer: methods[0]._fields[0].properties.trainer,
                      soreness2: methods[0]._fields[0].properties.soreness2,
                      soreness3: methods[0]._fields[0].properties.soreness3,
                      methodName: methods[0]._fields[0].properties.focus,
                      created: now,
                      status:"not started"
                    })
                    .then((workout) => {
                      db.close()
                      workout = workout.records.map((x) => {
                        x = x._fields[0].properties;
                        x.routine = JSON.parse(x.routine);
                        return x;
                      });
                      res.writeHead(200, header);
                      res.end(JSON.stringify({
                          success:"yes",
                          results: workout[0],
                        }));
                      console.log('/bf/urfitclient/get/daily/advice',JSON.stringify({
                        success:"yes",
                        results: workout[0],
                      }));
                      return
                    })
                    .catch((err) => {
                      log.error(err);// log to error file
                      console.log('/bf/urfitclient/get/daily/advice',err);
                      res.writeHead(500, header)
                      res.end(JSON.stringify({
                        status:"error",
                        results: err,
                      }))
                    })
                  })
                  .catch((err) => {
                    log.error(err);// log to error file
                    console.log('/bf/urfitclient/get/daily/advice',err);
                    res.writeHead(500, header)
                    res.end(JSON.stringify({
                      status:"error",
                      results: err,
                    }))
                  })
                }
                else{ // if not workout on this day create a workout object in DATABASE that tells the user not to workout but provides meal advice
                  db.run("MATCH (user:USER {uuid:$id}) CREATE (n:WORKOUT {user:$id, methodID:$methodID, day:$day, trainer:$trainer, soreness2:$soreness2, soreness3:$soreness3, methodName:$methodName, created:$created, status:$status, routine:$routine})<-[:ASSIGNED]-(user)", {
                    routine: JSON.stringify([]),
                    id:body.id,
                    day: day,
                    methodID:body.methodID,
                    trainer: methods[0]._fields[0].properties.trainer,
                    soreness2: methods[0]._fields[0].properties.soreness2,
                    soreness3: methods[0]._fields[0].properties.soreness3,
                    methodName: methods[0]._fields[0].properties.focus,
                    created: now,
                    status:"completed"
                  })
                  .then((workout) => {
                    db.close()
                    workout = workout.records.map((x) => {
                      x = x._fields[0].properties;
                      x.routine = JSON.parse(x.routine);
                      return x;
                    });
                    res.writeHead(200, header);
                    res.end(JSON.stringify({
                        success:"yes",
                        results: workout[0],
                      }));
                    console.log('/bf/urfitclient/get/daily/advice',JSON.stringify({
                      success:"yes",
                      results: workout[0],
                    }));
                    return
                  })
                  .catch((err) => {
                    log.error(err);// log to error file
                    console.log('/bf/urfitclient/get/daily/advice',err);
                    res.writeHead(500, header)
                    res.end(JSON.stringify({
                      status:"error",
                      results: err,
                    }))
                  })
                }
            }
            else{
              // if THERE ARE NO MORE DAYS START FROM 0
              console.log("start over at 0");
              db.run(cypher, {
                methodID:body.methodID
              })
              .then((methods) => {
                db.close()
                methods = methods.records;
                let selectedExercise = JSON.parse(methods[0]._fields[0].properties.selectedExercise)
                let diet = JSON.parse(methods[0]._fields[0].properties.diet)

                if(selectedExercise[0].length > 0){ // if there is a workout on day one
                  let randomselected = selectedExercise[0].map((slot) => {
                    if(slot.length > 0){
                      return slot[Math.floor(Math.random()*slot.length)]
                    }
                    else{return '';}
                  })
                  let pattern = JSON.parse(methods[0]._fields[0].properties.pattern);
                  let alteredPattern = pattern[0].map((x, pos) => {
                     x.exercise = randomselected[x.number - 1];
                     x.diet = diet[0];
                     return x;
                  });
                  console.log(alteredPattern,'alteredPattern');

                  db.run("UNWIND $pattern AS info MATCH (exercise:EXERCISE {uuid:info.exercise}) RETURN info {.*, exercise:exercise}",{
                    pattern:alteredPattern
                  })
                  .then((pattern) => {
                    db.close()
                    pattern = pattern.records.map((x) => {
                      x = x._fields[0];
                      x.exercise = x.exercise.properties;
                      return x;

                    });
                    db.run("MATCH (user:USER {uuid:$id}) CREATE (n:WORKOUT {user:$id, methodID:$methodID, day:$day, trainer:$trainer, soreness2:$soreness2, soreness3:$soreness3, methodName:$methodName, created:$created, status:$status, routine:$routine})<-[:ASSIGNED]-(user)", {
                      routine: JSON.stringify(pattern),
                      id:body.id,
                      day: 0,
                      methodID:body.methodID,
                      trainer: methods[0]._fields[0].properties.trainer,
                      soreness2: methods[0]._fields[0].properties.soreness2,
                      soreness3: methods[0]._fields[0].properties.soreness3,
                      methodName: methods[0]._fields[0].properties.focus,
                      created: now,
                      status:"not started"
                    })
                    .then((workout) => {
                      db.close()
                      workout = workout.records.map((x) => {
                        x = x._fields[0].properties;
                        x.routine = JSON.parse(x.routine);
                        return x;
                      });
                      res.writeHead(200, header);
                      res.end(JSON.stringify({
                          success:"yes",
                          results: workout[0],
                        }));
                      console.log('/bf/urfitclient/get/daily/advice',JSON.stringify({
                        success:"yes",
                        results: workout[0],
                      }));
                      return
                    })
                    .catch((err) => {
                      log.error(err);// log to error file
                      console.log('/bf/urfitclient/get/daily/advice',err);
                      res.writeHead(500, header)
                      res.end(JSON.stringify({
                        status:"error",
                        results: err,
                      }))
                    })
                  })
                  .catch((err) => {
                    log.error(err);// log to error file
                    console.log('/bf/urfitclient/get/daily/advice',err);
                    res.writeHead(500, header)
                    res.end(JSON.stringify({
                      status:"error",
                      results: err,
                    }))
                  })
                }
                else{ //TODO:TODO
              // start from zero aka day 1 but there is no workout on day 1
                console.log("start from zero aka day 1 but there is no workout on day 1");

                  db.run("MATCH (user:USER {uuid:$id}) CREATE (n:WORKOUT {user:$id, methodID:$methodID, day:$day, trainer:$trainer, soreness2:$soreness2, soreness3:$soreness3, methodName:$methodName, created:$created, status:$status,routine:$routine})<-[:ASSIGNED]-(user)", {
                    routine: JSON.stringify([]),
                    id:body.id,
                    day: 0,
                    methodID:body.methodID,
                    trainer: methods[0]._fields[0].properties.trainer,
                    soreness2: methods[0]._fields[0].properties.soreness2,
                    soreness3: methods[0]._fields[0].properties.soreness3,
                    methodName: methods[0]._fields[0].properties.focus,
                    created: now,
                    status:"completed"
                  })
                  .then((workout) => {
                    db.close()
                    workout = workout.records.map((x) => {
                      x = x._fields[0].properties;
                      x.routine = JSON.parse(x.routine);
                      return x;
                    });
                    res.writeHead(200, header);
                    res.end(JSON.stringify({
                        success:"yes",
                        results: workout[0],
                      }));
                    console.log('/bf/urfitclient/get/daily/advice',JSON.stringify({
                      success:"yes",
                      results: workout[0],
                    }));
                    return
                  })
                  .catch((err) => {
                    log.error(err);// log to error file
                    console.log('/bf/urfitclient/get/daily/advice',err);
                    res.writeHead(500, header)
                    res.end(JSON.stringify({
                      status:"error",
                      results: err,
                    }))
                  })
                }
            })
            .catch((err) => {
              log.error(err);// log to error file
              console.log('/bf/urfitclient/get/daily/advice',err);
              res.writeHead(500, header)
              res.end(JSON.stringify({
                status:"error",
                results: err,
              }))
            })
          }// END OF NO MORE DAYS START OVER

        })
        .catch((err) => {
          log.error(err);// log to error file
          console.log('/bf/urfitclient/get/daily/advice',err);
          res.writeHead(500, header)
          res.end(JSON.stringify({
            status:"error",
            results: err,
          }))
        })

      }
    }
    else{
          // first workout
          console.log("first workout");
          db.run(cypher, {
            methodID:body.methodID
          })
          .then((methods) => {
            db.close()
            methods = methods.records;
            let selectedExercise = JSON.parse(methods[0]._fields[0].properties.selectedExercise)
            let diet = JSON.parse(methods[0]._fields[0].properties.diet)
            if(selectedExercise[0].length > 0){ // if there is a workout on day one
              let randomselected = selectedExercise[0].map((slot) => {
                if(slot.length > 0){
                  return slot[Math.floor(Math.random()*slot.length)]
                }
                else{return '';}
              })
              let pattern = JSON.parse(methods[0]._fields[0].properties.pattern);
              let alteredPattern = pattern[0].map((x, pos) => {
                 x.exercise = randomselected[x.number - 1];
                 x.diet = diet[0];
                 return x;
              });
              console.log(alteredPattern,'alteredPattern');

              db.run("UNWIND $pattern AS info MATCH (exercise:EXERCISE {uuid:info.exercise}) RETURN info {.*, exercise:exercise}",{
                pattern:alteredPattern
              })
              .then((pattern) => {
                db.close()
                pattern = pattern.records.map((x) => {
                  x = x._fields[0];
                  x.exercise = x.exercise.properties;
                  return x;

                });
                db.run("MATCH (user:USER {uuid:$id}) CREATE (n:WORKOUT {user:$id, methodID:$methodID, day:$day, trainer:$trainer, soreness2:$soreness2, soreness3:$soreness3, methodName:$methodName, created:$created, status:$status, routine:$routine})<-[:ASSIGNED]-(user)", {
                  routine: JSON.stringify(pattern),
                  id:body.id,
                  day: 0,
                  methodID:body.methodID,
                  trainer: methods[0]._fields[0].properties.trainer,
                  soreness2: methods[0]._fields[0].properties.soreness2,
                  soreness3: methods[0]._fields[0].properties.soreness3,
                  methodName: methods[0]._fields[0].properties.focus,
                  created: now,
                  status:"not started"
                })
                .then((workout) => {
                  db.close()
                  workout = workout.records.map((x) => {
                    x = x._fields[0].properties;
                    x.routine = JSON.parse(x.routine);
                    return x;
                  });
                  res.writeHead(200, header);
                  res.end(JSON.stringify({
                      success:"yes",
                      results: workout[0],
                    }));
                  console.log('/bf/urfitclient/get/daily/advice',JSON.stringify({
                    success:"yes",
                    results: workout[0],
                  }));
                  return
                })
                .catch((err) => {
                  log.error(err);// log to error file
                  console.log('/bf/urfitclient/get/daily/advice',err);
                  res.writeHead(500, header)
                  res.end(JSON.stringify({
                    status:"error",
                    results: err,
                  }))
                })
              })
              .catch((err) => {
                log.error(err);// log to error file
                console.log('/bf/urfitclient/get/daily/advice',err);
                res.writeHead(500, header)
                res.end(JSON.stringify({
                  status:"error",
                  results: err,
                }))
              })
            }
            else{ // if not workout on this day create a workout object in DATABASE that tells the user not to workout but provides meal advice
              db.run("MATCH (user:USER {uuid:$id}) CREATE (n:WORKOUT {user:$id, methodID:$methodID, day:$day, trainer:$trainer, soreness2:$soreness2, soreness3:$soreness3, methodName:$methodName, created:$created, status:$status,routine:$routine})<-[:ASSIGNED]-(user)", {
                routine: JSON.stringify([]),
                id:body.id,
                day: 0,
                methodID:body.methodID,
                pattern:[],
                trainer: methods[0]._fields[0].properties.trainer,
                soreness2: methods[0]._fields[0].properties.soreness2,
                soreness3: methods[0]._fields[0].properties.soreness3,
                methodName: methods[0]._fields[0].properties.focus,
                created: now,
                status:"completed"
              })
              .then((workout) => {
                db.close()
                workout = workout.records.map((x) => {
                  x = x._fields[0].properties;
                  x.routine = JSON.parse(x.routine);
                  return x;
                });
                res.writeHead(200, header);
                res.end(JSON.stringify({
                    success:"yes",
                    results: workout[0],
                  }));
                console.log('/bf/urfitclient/get/daily/advice',JSON.stringify({
                  success:"yes",
                  results: workout[0],
                }));
                return
              })
              .catch((err) => {
                log.error(err);// log to error file
                console.log('/bf/urfitclient/get/daily/advice',err);
                res.writeHead(500, header)
                res.end(JSON.stringify({
                  status:"error",
                  results: err,
                }))
              })
            }
          })
          .catch((err) => {
            log.error(err);// log to error file
            console.log('/bf/urfitclient/get/daily/advice',err);
            res.writeHead(500, header)
            res.end(JSON.stringify({
              status:"error",
              results: err,
            }))
          })
        }

      })
      .catch((err) => {
        log.error(err);// log to error file
        console.log('/bf/urfitclient/get/daily/advice',err);
        res.writeHead(500, header)
        res.end(JSON.stringify({
          status:"error",
          results: err,
        }))
      })
    })

    //GET EXERCISE HISTORY
    server.post('/bf/urfitclient/get/exercise/set/history', (req, res, next) => {
      let body = req.body;
      let cypher = "MATCH (sets:SetFeedback {user:$id}) WHERE sets.exerciseId = $exerciseId OR sets.name = $name RETURN sets"
      db.run(cypher, {
        id:body.id,
        exerciseId:body.exerciseId,
        name: body.name
      })
      .then((results) => {
        db.close();
        results = results.records.map((x) => {
          return x = x._fields[0].properties;
        });
        res.writeHead(200, header);
        res.end(JSON.stringify({
            success:"yes",
            results: results,
          }));
          console.log('/bf/urfitclient/get/exercise/set/history',JSON.stringify({
            success:"yes",
            results: results,
          }));
          return
      })
      .catch((err) => {
        log.error(err);
        console.log('/bf/urfitclient/get/exercise/set/history',err);
        res.writeHead(500, header)
        res.end(JSON.stringify({
          status:"error",
          results: err,
        }))
      })
    })


    // CREATE CUSTOMIZED METHOD FOR CLIENT
    server.post('/bf/urfittrainer/customize/method/for/client', (req, res, next) => {
      let body = req.body;
      let cypher = "MATCH (m:METHOD {uuid:$methodID}) CREATE (nm:METHOD {uuid:$uuid, descipline:m.descipline, gender:m.gender, pattern:$pattern, routineType:m.routineType, methodDescription:m.methodDescription, focus:m.focus, original_methodID:m.uuid, trainer:m.trainer, soreness3:$soreness3, soreness2:$soreness2,duration:$duration,parts:m.parts,location:m.location, diet:$diet,selectedExercise:$selectedExercise}) CREATE (nm)-[:CUSTOMERIZED_FROM]->(m) MATCH (user:USER {uuid:$id}) SET user.currentMethod = nm.uuid RETURN user";
      db.run(cypher, {
        id:body.id,
        methdodID:body.methodID,
        uuid: uuidV4(),
        pattern:body.pattern,
        soreness3:body.soreness3,
        soreness2:body.soreness2,
        duration: body.duration,
        diet: body.diet,
        selectedExercise: body.selectedExercise
      })
      .then((results) => {
        db.close();
        results = results.records;
        res.writeHead(200, header);
        res.end(JSON.stringify({
            success:"yes",
            results: results[0]._fields[0].properties,
          }));
        console.log('/bf/urfittrainer/customize/method/for/client',JSON.stringify({
          success:"yes",
          results: results[0]._fields[0].properties,
        }));
        return
      })
      .catch((error) => {
        log.error(err);// log to error file
        console.log('/bf/urfittrainer/customize/method/for/client',err);
        res.writeHead(500, header)
        res.end(JSON.stringify({
          status:"error",
          results: err,
        }))
      })

    })

	}
}


export default Plan
