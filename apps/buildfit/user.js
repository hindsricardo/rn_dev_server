/* apps/buildfit/plan*/
import {secret} from './config';
import jwt from 'jsonwebtoken';
import _ from 'underscore';
const nodemailer = require('nodemailer');
const header = {'Content-Type':'application/json; charset=utf-8'};
var lowerCase = require('lower-case');
const uuidV4 = require('uuid');

var stripe = require("stripe")(
  "sk_test_jjMsr7JRvBqis3InsnqaKJSx"
	);

const log = require('simple-node-logger').createSimpleLogger('node-error.log');




class User {

	constructor(db, server) {
		this.name = 'User';

		//UPDATE GENDER
		server.post('/bf/update/user/gender', (req, res, next) => {
			let body = req.body;
			db.run("MATCH (user:USER {uuid: $id }) SET user.gender = $gender RETURN user",{
				id: body.userid,
				gender: body.gender
			})
			.then((results) => {
				results = results.records;
				db.close()
				res.writeHead(200, header);
		        res.end(JSON.stringify({
			        	results: results,
		        	}));
		        console.log(JSON.stringify({
		        	results: results,
		        }));
		        return
			})
		})

		//UPDATE GOAL
		server.post('/bf/update/user/goal', (req, res, next) => {
			let body = req.body;
			db.run("MATCH (user:USER {uuid: $id }) SET user.goal = $goal RETURN user",{
				id: body.userid,
				goal: body.goal
			})
			.then((results) => {
				results = results.records;
				db.close()
				res.writeHead(200, header);
		        res.end(JSON.stringify({
			        	results: results,
		        	}));
		        console.log(JSON.stringify({
		        	results: results,
		        }));
		        return
			})
		})

		// add bank account info to stripe
		server.post('/bf/urfittrainer/add/trainer/bank/account', (req, res, next) => {
			let body = req.body;
			let currency = 'USD'
			if(body.country == 'CA'){
				currency = 'CAD'
			}
			stripe.accounts.update(
				body.id, {
					external_account:{
						object: 'bank_account',
						country: body.country,
						currency: currency,
						account_holder_name: body.account_holder_name,
						account_holder_type: 'individual',
						routing_number: body.routing_number,
						account_number: body.account_number
					},
					legal_entity: {
						address: {
							city:body.city,
							postal_code: body.postal_code,
							state: body.state,
							line1: body.line1
						},
						ssn_last_4: body.social,
						dob: {
							day: body.DOBday,
							month: body.DOBmonth,
							year: body.DOByear
						}
					}
				},
				function(err, account) {
					// asynchronously called
					if(err){
						res.writeHead(500, header);
						res.end(JSON.stringify({
								status:'error',
								results: err,
							}));
						console.log(JSON.stringify({
							results: err,
						}));
					}
					else{
						res.writeHead(200, header);
						res.end(JSON.stringify({
								status: 'success',
								results: account,
							}));
						console.log(JSON.stringify({
							results: account,
						}));
						return
					}
				}
			);
		})
		//Return Strip accounts
		server.post('/bf/urfittrainer/get/trainer/stripe/account', (req, res, next) => {
			let body = req.body;
			stripe.accounts.retrieve(
			  body.id,
			  function(err, account) {
			    // asynchronously called
					if(err){
						res.writeHead(500, header);
						res.end(JSON.stringify({
								status:'error',
								results: err,
							}));
						console.log(JSON.stringify({
							results: err,
						}));
					}
					else{
						res.writeHead(200, header);
		        res.end(JSON.stringify({
								status: 'success',
			        	results: account,
								route: '/bf/urfittrainer/get/trainer/stripe/account'
		        	}));
		        console.log(JSON.stringify({
		        	results: account,
							route: '/bf/urfittrainer/get/trainer/stripe/account'
		        }));
		        return
					}
			  }
			);
		})
    // return user details along with grade and score Weighted
    server.post('/bf/urfittrainer/get/subscribed/user/details', (req, res, next) => {

      let body = req.body;
      let cypher = "MATCH (:USER {uuid:$userID})-[:COMPLETED]->(n:SetFeedback {method:$methodID}) RETURN n ORDER BY n.stopTime DESC";
      db.run(cypher, {
					userID:body.userID,
          methodID: body.methodID,
				}).then((results) => {
				db.close();
        results = results.records.map((x) => {
					return x = x._fields[0].properties;
				});

        let cypher2 = "MATCH (user:USER {uuid:$userID})-[:SUBSCRIBED]->(n:METHOD) RETURN n"; //get other methods attached currently attached to this //
        db.run(cypher2, {
          userID:body.userID,
        }).then((results2) => {
          db.close();
          results2 = results2.records.map((x) => {
  					return x = x._fields[0].properties;
  			  });
          let cypher3 = "MATCH (user:USER {uuid:$userID}) RETURN user";
          db.run(cypher3, {
            userID:body.userID
          }).then((results3) => {
            db.close();
            results3 = results3.records.map((x) => {
    					return x = x._fields[0].properties;
    			  });
            let month = 86400000 * 30;
            let now = new Date().getTime();
            let cypher4 = " MATCH (user:USER {uuid:$userID})-[:COMPLETED]->(n:SetFeedback {method:$methodID}) MATCH (n)-[:RECORDED]->(m:RESULT) WHERE m.stopTime > $now - $month RETURN m";
            db.run(cypher4, {
              methodID: body.methodID,
              month: month,
              now: now,
              userID:body.userID
            })
            .then((results4) => {
              let avgScore = 0
              let avgScore2 = 0
              let finalAvg = 0;
              db.close();
              if(results4.records.length > 0){
                let results4Strip = results4.records.map((x) => {
                  x.score = parseInt(x.score);
                  return x = x._fields[0].properties;
                });
                let sum = results4Strip.reduce((accumulator, currentValue) => accumulator + currentValue.score,0);
                 avgScore = (sum/ results4Strip.length).toFixed(2);
              }
              else{
                let results4Strip = [];
                avgScore = 0
              }

              let cypher5 = "MATCH (user:USER {uuid:$userID})-[:COMPLETED]->(n:SetFeedback {method:$methodID}) MATCH (n)-[:RECORDED]->(m:RESULT) WHERE m.stopTime < $now - $month RETURN m";
              db.run(cypher5, {
                methodID: body.methodID,
                month: month,
                now: now,
                userID:body.userID
              })
              .then((results5) => {
                db.close();
                  let results5Strip = results5.records.map((x) => {
                    x.score = parseInt(x.score);
                    return x = x._fields[0].properties;
                  });
                  Promise.resolve(true).then(() => {
                    let sum2 = results5Strip.reduce((accumulator, currentValue) => accumulator + currentValue.score,0);
                    avgScore2 = (sum2/ results5Strip.length).toFixed(2);

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
                  })
                  .then(() => {
                    res.writeHead(200, header);
                    res.end(JSON.stringify({
                        workouts: results,
                        currentMethods: results2,
                        user: results3,
                        finalAvg: finalAvg,
                        route: '/bf/urfittrainer/get/subscribed/user/details'
                      }));
                    console.log(JSON.stringify({
                      workouts: results,
                      currentMethods: results2,
                      user: results3,
                      finalAvg: finalAvg,
                      route: '/bf/urfittrainer/get/subscribed/user/details'
                    }));
                  })
              })
            })

          })
        })
      })

    })

		//Return Strip payouts to trainer
		server.post('/bf/urfittrainer/get/trainer/stripe/payouts', (req, res, next) => {
			let body = req.body;
			stripe.accounts.retrieve(
			  body.id,
			  function(err, account) {
			    // asynchronously called
					stripe.payouts.list(body.id,{
					  external_account:account.external_accounts.data[0].id},
					  function(payouts) {
					    // asynchronously called
								res.writeHead(200, header);
								res.end(JSON.stringify({
										status: 'success',
										results: payouts,
										route: '/bf/urfittrainer/get/trainer/stripe/payouts'
									}));
								console.log(JSON.stringify({
									results: payouts,
									route: '/bf/urfittrainer/get/trainer/stripe/payouts'
								}));
								return
					  }
					);
				})
		});

		//get stripe balance
		server.post('/bf/urfittrainer/get/trainer/stripe/balances', (req, res, next) => {
			let body = req.body;
			stripe.balance.retrieve({
				stripe_account: body.id
			}, function(err, balance) {
			  // asynchronously called
				if(err){
					res.writeHead(500, header);
					res.end(JSON.stringify({
							status:'error',
							results: err,
							route: '/bf/urfittrainer/get/trainer/stripe/balances'
						}));
					console.log(JSON.stringify({
						results: err,
						route: '/bf/urfittrainer/get/trainer/stripe/balances'
					}));
				}
				else{
					res.writeHead(200, header);
					res.end(JSON.stringify({
							status: 'success',
							results: balance,
							route: '/bf/urfittrainer/get/trainer/stripe/balances'
						}));
					console.log(JSON.stringify({
						results: balance,
						route: '/bf/urfittrainer/get/trainer/stripe/balances'
					}));
					return
				}
			});
		})



		//Register a new Trainer
		server.post('/bf/urfittrainer/add/trainer', (req, res, next) => {
      let cypherCheckExistingUser = "MATCH (u:TRAINER) WHERE u.email = $email OR u.original_email = $email RETURN u";
			let body = req.body;
      db.run(cypherCheckExistingUser, {email:body.email})
      .then((results) => {
        db.close()
        results = results.records;
        if(results.length > 0){
          res.writeHead(200, header);
          res.end(JSON.stringify({
              status:"taken",
              results: results[0]._fields[0].properties,
            }));
          console.log('/bf/create/user/v1',JSON.stringify({
            status: "taken",
            results: results[0]._fields[0].properties,
          }));
          return
        }
        else{
          stripe.accounts.create({
            type: 'custom',
            country: body.country,
            email: body.email,
            legal_entity: {
              first_name: body.fname,
              last_name: body.lname,
              type:'individual'
            },
            tos_acceptance: {
              date: Math.floor(Date.now() / 1000),
              ip: req.connection.remoteAddress
            }
          }, (err, account) => {
            // asynchronously called
            if(err){
              res.writeHead(500, header);
              res.end(JSON.stringify({
                  results: err,
                  status:"error"
                }));
              console.log(JSON.stringify({
                results: err,
                status:"error"
              }));
            }

              stripe.products.create({
                name: 'UrFit: Subscription to Trainer - '+body.fname+' '+body.lname,
                type: 'service',
              },{
                stripe_account: account.id
              }, (err, product) => {
                // asynchronously called
                if(err){
                  res.writeHead(500, header);
                  res.end(JSON.stringify({
                      results: err,
                      status:"error"
                    }));
                  console.log(JSON.stringify({
                    results: err,
                    status:"error"
                  }));
                }

                stripe.plans.create({
                  amount: 5000,
                  interval: "month",
                  nickname: "UrFit: subscription to "+" "+body.fname+" "+body.lname+" $"+50,
                  product: product.id,
                  currency: "usd",
                }, {
                  stripe_account: account.id
                }, function(err, plan) {
                  // asynchronously called
                  if(err){
                    res.writeHead(500, header);
                    res.end(JSON.stringify({
                        results: err,
                        status:"error"
                      }));
                    console.log(JSON.stringify({
                      results: err,
                      status:"error"
                    }));
                  }
                  db.run("CREATE (user:TRAINER {uuid:$id, fname: $fname, lname: $lname, email: $email, tos_acceptance: $tos_acceptance, aboutme:$aboutme, instagram: $instagram, youtubePromo:$youtubePromo, training_location: $training_location, certifications: $certifications, planID: $planID, productID: $productID, original_email:$original_email }) RETURN user", {
                    id: account.id,
                    fname: body.fname,
                    lname: body.lname,
                    email: body.email,
                    tos_acceptance: Math.floor(Date.now() / 1000),
                    aboutme: '',
                    instagram: '',
                    youtubePromo: 'https://www.youtube.com/watch?v=vthMCtgVtFw',
                    training_location: '',
                    certifications: '',
                    planID: plan.id,
                    productID: product.id,
                    planCharge: plan.amount,
                    original_email: body.email,
                  })
                  .then((trainer)=> {
                    trainer = trainer.records;
                    db.close();
                    res.writeHead(200, header);
                    res.end(JSON.stringify({
                        status:"created",
                        results: trainer[0]._fields[0].properties,
                        strip_info: account,
                      }));
                    console.log(JSON.stringify({
                      results: trainer[0]._fields[0].properties,
                      strip_info: account,
                      status:"error"
                    }));
                    return
                  })
                  .catch((err) => {
                    res.writeHead(500, header);
                    res.end(JSON.stringify({
                        results: err,
                        status:"error"
                      }));
                    console.log(JSON.stringify({
                      results: err,
                      status:"error"
                    }));
                  })

                });
             });
          }); //end of create stripe account
        }
      });
		})


    //set trainer fee
    server.post('/bf/urfittrainer/set/trainer/fee', (req, res, next) => {
      let body = req.body;

      db.run("MATCH (user:TRAINER {uuid:$id}) RETURN user", {
        id: body.id,
      })
      .then((trainer)=> {
        trainer = trainer.records;
        db.close();
        stripe.plans.create({
          amount: (body.charge * 100),
          interval: "month",
          product:trainer[0]._fields[0].properties.productID,
          nickname: "UrFit: subscription to "+" "+ trainer[0]._fields[0].properties.name +" $"+body.charge,
          currency: "usd",
        }, {
          stripe_account: body.id
        }, function(err, plan) {
          // asynchronously called
          if(err){
            res.writeHead(500, header);
            res.end(JSON.stringify({
                results: err,
              }));
            console.log(JSON.stringify({
              results: err,
            }));
          }

          db.run("MATCH (user:TRAINER {uuid:$id}) SET user.planCharge = $charge, user.planID = $planID RETURN user", {
            id: body.id,
            charge: body.charge,
            planID: plan.id
          })
          .then((trainer2) => {
            db.close();
            trainer2 = trainer2.records;
            res.writeHead(200, header);
            res.end(JSON.stringify({
                results: trainer2[0]._fields[0].properties,
              }));
            console.log(JSON.stringify({
              results: trainer2[0]._fields[0].properties,
            }));
            return
          })
          .catch((err) => {
            res.writeHead(500, header);
            res.end(JSON.stringify({
                results: err,
                route: '/bf/urfittrainer/set/trainer/fee'
              }));
            console.log(JSON.stringify({
              results: err,
              route: '/bf/urfittrainer/set/trainer/fee'
            }));
            return
          })

        }); //end of update plan
      })
    })

    //save trainer
    server.post('/bf/urfitclient/update/user/profile', (req, res, next) => {
			let body = req.body;
      let checkEmailTaken = "MATCH (user:USER) WHERE user.email = $email OR user.original_email = $email RETURN user";
      let checkEmailisCurrentUser = "MATCH (user:USER {uuid: $id}) WHERE user.email = $email OR user.original_email = $email RETURN user";

      db.run(checkEmailisCurrentUser,{
        email: body.email,
        id: body.id
      })
      .then((result) => {
        db.close();
        if(result.records.length > 0){ //email is the same as before
          db.run("MATCH (user:USER {uuid:$id}) SET user += {avatar:$avatar, name: $name, sex: $sex, email: $email} RETURN user", {
            id: body.id,
            avatar: body.avatar,
            name: body.name,
            sex: body.sex,
            email: body.email,
          })
          .then((user)=> {
            user = user.records;
            db.close();
            res.writeHead(200, header);
            res.end(JSON.stringify({
                status:'updated',
                results: user[0]._fields[0].properties,
              }));
            console.log(JSON.stringify({
              status:'updated',
              results: user[0]._fields[0].properties,
            }));
            return
          })
          .catch((err) => {
            res.writeHead(500, header);
            res.end(JSON.stringify({
                status:'error',
                results: err,
                route: '/bf/urfitclient/update/user/profile'
              }));
            console.log(JSON.stringify({
              status:'error',
              results: err,
              route: '/bf/urfitclient/update/user/profile'
            }));
          }) // END
        }
        else{
          db.run(checkEmailTaken,{
            email:body.email
          })
          then((check) => {
            db.close();
            if(check.records.length > 0) { //if someone is already using this email
              res.writeHead(200, header);
              res.end(JSON.stringify({
                  status:'taken',
                  results: check[0]._fields[0].properties,
                }));
              console.log(JSON.stringify({
                status:'taken',
                results: check[0]._fields[0].properties,
              }));
            }
            else{ // if not taken update with this email address
              db.run("MATCH (user:USER {uuid:$id}) SET user += {avatar:$avatar, name: $name, sex: $sex, email: $email} RETURN user", {
                id: body.id,
                avatar: body.avatar,
                name: body.name,
                sex: body.sex,
                email: body.email,
              })
              .then((user)=> {
                user = user.records;
                db.close();
                res.writeHead(200, header);
                res.end(JSON.stringify({
                    status:'updated',
                    results: user[0]._fields[0].properties,
                  }));
                console.log(JSON.stringify({
                  status:'updated',
                  results: user[0]._fields[0].properties,
                }));
                return
              })
              .catch((err) => {
                res.writeHead(500, header);
                res.end(JSON.stringify({
                    status:'error',
                    results: err,
                    route: '/bf/urfitclient/update/user/profile'
                  }));
                console.log(JSON.stringify({
                  status:'error',
                  results: err,
                  route: '/bf/urfitclient/update/user/profile'
                }));
              }) // END
            }
          })
          .catch((err) => {
            res.writeHead(500, header);
            res.end(JSON.stringify({
                status:'error',
                results: err,
                route: '/bf/urfitclient/update/user/profile'
              }));
            console.log(JSON.stringify({
              status:'error',
              results: err,
              route: '/bf/urfitclient/update/user/profile'
            }));
          }) // END
        }
      })

		})

    //save trainer
    server.post('/bf/urfittrainer/save/trainer/profile', (req, res, next) => {
			let body = req.body;

			db.run("MATCH (user:TRAINER {uuid:$id}) SET user += {aboutme:$aboutme, instagram: $instagram, youtubePromo: $youtubePromo, training_location: $training_location, certifications: $certifications, email: $email} RETURN user", {
				id: body.id,
        aboutme: body.aboutme,
        instagram: body.instagram,
        youtubePromo: body.youtubePromo,
        training_location: body.training_location,
        certifications: body.certifications,
        email: body.profileEmail,
			})
			.then((trainer)=> {
				trainer = trainer.records;
				db.close();
				res.writeHead(200, header);
				res.end(JSON.stringify({
						results: trainer[0]._fields[0].properties,
					}));
				console.log(JSON.stringify({
					results: trainer[0]._fields[0].properties,
				}));
				return
			})
			.catch((err) => {
				res.writeHead(500, header);
				res.end(JSON.stringify({
						results: err,
            route: '/bf/urfittrainer/save/trainer/profile'
					}));
				console.log(JSON.stringify({
					results: err,
          route: '/bf/urfittrainer/save/trainer/profile'
				}));
			})
		})

		//Get Trainer
		server.post('/bf/urfittrainer/get/trainer', (req, res, next) => {
			let body = req.body;

			db.run("MATCH (user:TRAINER {uuid:$id}) RETURN user", {
				id: body.id,
			})
			.then((trainer)=> {
				trainer = trainer.records;
				db.close();
				res.writeHead(200, header);
				res.end(JSON.stringify({
						results: trainer[0]._fields[0].properties,
					}));
				console.log(JSON.stringify('/bf/urfittrainer/get/trainer',{
					results: trainer[0]._fields[0].properties,
				}));
				return
			})
			.catch((err) => {
				res.writeHead(500, header);
				res.end(JSON.stringify({
						results: err,
					}));
				console.log('/bf/urfittrainer/get/trainer',err);
			})
		})

    //Get CLIENT USER
		server.post('/bf/urfitclient/get/user', (req, res, next) => {
			let body = req.body;

			db.run("MATCH (n:USER {uuid:$id}) RETURN n", {
				id: body.id,
			})
			.then((user)=> {
				user = user.records;
				db.close();
        stripe.subscriptions.retrieve(
          user[0]._fields[0].properties.subscription,
          function(err, subscription) {
            // asynchronously called
            if(err){
              res.writeHead(200, header);
      				res.end(JSON.stringify({
      						results: user[0]._fields[0].properties,
      					}));
      				console.log(JSON.stringify('/bf/urfitclient/get/user',{
      					results: user[0]._fields[0].properties,
      				}));
      				return
            }
            else{
              if(subscription.status == 'canceled'){
                user[0]._fields[0].properties.subscribed = false;
                user[0]._fields[0].properties.status = subscription.status;
                res.writeHead(200, header);
        				res.end(JSON.stringify({
        						results: user[0]._fields[0].properties,
        					}));
        				console.log(JSON.stringify('/bf/urfitclient/get/user',{
        					results: user[0]._fields[0].properties,
        				}));
        				return
              }
              else{
                user[0]._fields[0].properties.subscribed = true;
                user[0]._fields[0].properties.status = subscription.status;
                res.writeHead(200, header);
        				res.end(JSON.stringify({
        						results: user[0]._fields[0].properties,
        					}));
        				console.log(JSON.stringify('/bf/urfitclient/get/user',{
        					results: user[0]._fields[0].properties,
        				}));
        				return
              }
            }
          }
        );

			})
			.catch((err) => {
				res.writeHead(500, header);
				res.end(JSON.stringify({
						results: err,
					}));
				console.log('/bf/urfitclient/get/user',err);
			})
		})

    //'/bf/urfittrainer/get/trainer/messages'
    server.post('/bf/urfittrainer/get/trainer/messages', (req, res, next) => {
      let body = req.body;

      db.run("MATCH (n:MESSAGE) WHERE (n)-[:RECEIVED]->(:TRAINER {uuid:$id}) RETURN n LIMIT 250", {
        id: body.id,
      })
      .then((results)=> {
        db.close();
        results = results.records.map((x) => {
					return x = x._fields[0].properties;
				});
        res.writeHead(200, header);
        res.end(JSON.stringify({
            results: results,
          }));
        console.log(JSON.stringify({
          results: results,
          route: '/bf/urfittrainer/get/trainer/messages',
        }));
        return
      })
      .catch((err) => {
        res.writeHead(500, header);
        res.end(JSON.stringify({
            results: err,
            route: '/bf/urfittrainer/get/trainer/messages',
          }));
        console.log(JSON.stringify({
          results: err,
          route: '/bf/urfittrainer/get/trainer/messages',
        }));
      })
    })

    //'/bf/urfittrainer/get/trainer/conversation/with/user/mark/message/read'
    server.post('/bf/urfittrainer/get/trainer/conversation/with/user/mark/message/read', (req, res, next) => {
      let body = req.body;

      db.run("MATCH (n:MESSAGE {read:false}) WHERE (n)-[:RECEIVED]->(:TRAINER {uuid:$id}) SET n.read = true RETURN n", {
        id: body.id,
      })
      .then((results)=> {
        db.close();
        results = results.records.map((x) => {
          return x = x._fields[0].properties;
        });
        res.writeHead(200, header);
        res.end(JSON.stringify({
            results: results,
          }));
        console.log(JSON.stringify({
          results: results,
          route: '/bf/urfittrainer/get/trainer/conversation/with/user/mark/message/read',
        }));
        return
      })
      .catch((err) => {
        res.writeHead(500, header);
        res.end(JSON.stringify({
            results: err,
            route: '/bf/urfittrainer/get/trainer/conversation/with/user/mark/message/read',
          }));
        console.log(JSON.stringify({
          results: err,
          route: '/bf/urfittrainer/get/trainer/conversation/with/user/mark/message/read',
        }));
      })
    })


    //CREATE MESSAGE FROM Trainer
    //'/bf/urfittrainer/get/trainer/conversation/with/user/mark/message/read'
    server.post('/bf/urfittrainer/get/trainer/conversation/create/trainer/message', (req, res, next) => {
      let body = req.body;

      db.run("MATCH (u:USER {uuid: $receiver }), (n:TRAINER {email:$senderEmail}) CREATE (n)-[:SENT]->(m:MESSAGE { message:$message ,sender:$id, receiver:$receiver ,date:$date, uuid:$uuid})-[:RECEIVED]->(u)", {
        id: body.id,
        message: body.message,
        receiver: body.clientID,
        date: new Date().getTime(),
        senderEmail: body.senderEmail,
        senderName: body.senderName,
        uuid: uuidV4()

      })
      .then((results)=> {
        db.close();
        results = results.records.map((x) => {
          return x = x._fields[0].properties;
        });
        res.writeHead(200, header);
        res.end(JSON.stringify({
            results: results,
          }));
        console.log(JSON.stringify({
          results: results,
          route: '/bf/urfittrainer/get/trainer/conversation/create/trainer/message',
        }));
        return
      })
      .catch((err) => {
        res.writeHead(500, header);
        res.end(JSON.stringify({
            results: err,
            route: '/bf/urfittrainer/get/trainer/conversation/create/trainer/message',
          }));
        console.log(JSON.stringify({
          results: err,
          route: '/bf/urfittrainer/get/trainer/conversation/create/trainer/message',
        }));
      })
    })



		// LOGIN / USER CREATION URFIT
		server.post('/bf/create/user/v1', (req, res, next) => {
			let body = req.body;
      let cypherCheckExistingUser = "MATCH (u:USER) WHERE u.email = $email OR u.original_email = $email RETURN u";
      let cypher = "CREATE (u:USER {name:$name, sex:$sex, avatar:$avatar, messages:$messages, uuid:$uuid, email:$email, original_email:$original_email, subscribed:$subscribed}) RETURN u"

      db.run(cypherCheckExistingUser, {email:body.email})
      .then((results) => {
        db.close()
        results = results.records;
        if(results.length > 0){
          res.writeHead(200, header);
          res.end(JSON.stringify({
              status:"taken",
              results: results[0]._fields[0].properties,
            }));
          console.log('/bf/create/user/v1',JSON.stringify({
            status: "taken",
            results: results[0]._fields[0].properties,
          }));
          return
        }
        else{
          db.run(cypher,{
            name: body.name,
            sex: body.sex,
            avatar: body.avatar,
            messages: [],
            uuid: uuidV4(),
            email: body.email,
            original_email: body.email,
            stripeCustomerId:'',
            subscription:'',
            subscribed: false,
          })
          .then((client) => {
            client = client.records;
            db.close();
            res.writeHead(200, header);
            res.end(JSON.stringify({
                status:"found",
                results: client[0]._fields[0].properties,
              }));
            console.log('/bf/create/user/v1',JSON.stringify({
              status:"found",
              results: client[0]._fields[0].properties,
            }));
            return
          })
          .catch((err)=>{
            log.error(err);// log to error file
            console.log('/bf/create/user/v1',err);
            res.writeHead(500, header)
                res.end(JSON.stringify({
                  success:'no',
                  status:"error",
                  err: err,
                  message:'Something went wrong logging in. Check error message to see what happened.'
                  }))
          });
        }
      })
      .catch((err)=>{
        log.error(err);// log to error file
        console.log('/bf/create/user/v1',err);
        res.writeHead(500, header)
            res.end(JSON.stringify({
              success:'no',
              status:"error",
              err: err,
              message:'Something went wrong logging in. Check error message to see what happened.'
              }))
      });
		})

				// SEND PASSWORD BM
		server.post('/sendpassword/user/v1', (req, res, next) => {
			let body = req.body;
			db.run("MATCH (n:SENDGRIDPK) RETURN n",{})
			.then((results) =>{
				db.close();

			let smtpConfig = {
			    host: 'smtp.sendgrid.net',
				    port: 587,
				    secure: false, // upgrade later with STARTTLS
				    auth: {
				        user: 'apikey',
				        pass: results.records[0]._fields[0].properties.key
				    }
			};
			let transporter = nodemailer.createTransport(smtpConfig);


						let cypher2 = "MATCH (user:USER {email:$email }) RETURN user";
							db.run(cypher2, {
								email: lowerCase(body.email)
							}).then((results2) => {
								results2 = results2.records;
								db.close();
								var encryptedString = body.password;
								if(results2.length > 0){
									let mailOptions = {
								        from: '" Build Method Fitness " <help@buildmethodfitness.com>', // sender address
								        to: body.email, // list of receivers
								        subject: 'Password Recovery ✔', // Subject line
								        text: 'Your Build Method Fitness password is: '+results2[0]._fields[0].properties.password, // plain text body
								        html: '<b>our Build Method Fitness password is:' +results2[0]._fields[0].properties.password + '</b>' // html body
								    };

								    transporter.sendMail(mailOptions, (error, info) => {
								    	log.error(error, ' /sendpassword/user/v1 ');// log to error file
								        if (error) {
								            return console.log(error);
								        }
								        console.log('Message sent: %s', info.messageId);
								    });

								}
								res.writeHead(200, header);
						        res.end(JSON.stringify({
							        	results: results2
							        	//token: token
						        	}));
						        console.log('/sendpassword/user/v1', JSON.stringify({
						        	results: results2,
						        	//token: token
						        }));
						        return

							})
							.catch((err)=>{
								log.error(err, ' /sendpassword/user/v1 ');// log to error file
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


      // SET AND SEND PASSWORD URFIT TRAINER
  server.post('/bf/urfittrainer/set/then/sendpassword/user/login/v1', (req, res, next) => {
    let body = req.body;
    function makeid() {
      var text = "";
      var possible = "0123456789";

      for (var i = 0; i < 7; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text.toString();
    }

    let password = makeid();
    db.run("MATCH (n:SENDGRIDPK) RETURN n",{})
    .then((results) =>{
      db.close();

    let smtpConfig = {
        host: 'smtp.sendgrid.net',
          port: 587,
          secure: false, // upgrade later with STARTTLS
          auth: {
              user: 'apikey',
              pass: results.records[0]._fields[0].properties.key
          }
    };
    let transporter = nodemailer.createTransport(smtpConfig);


          let cypher2 = "MATCH (n:TRAINER) WHERE n.email = $email OR n.original_email = $email SET n.password = $password RETURN n";
            db.run(cypher2, {
              email: lowerCase(body.email),
              password: password,
            }).then((results2) => {
              results2 = results2.records.map((x) => {
      					return x = x._fields[0].properties;
      				});
              db.close();
              //var encryptedString = body.password;
              if(results2.length > 0){
                let mailOptions = {
                      from: '" UrFit Trainer " <password@urfit.fit>', // sender address
                      to: body.email, // list of receivers
                      subject: 'Password Code ✔', // Subject line
                      text: 'Your passcode is: '+results2[0].password+ ' ', // plain text body
                      html: '<p style="font-size:28px; text-align: center; color:#35365D">Your Passcode Is</p><div style="padding:10px;background-color:#78C5A6;border-radius:25px; margin-left:100px; margin-right:100px;"><p style="color:white;font-size:40px; text-align:center; ">'+results2[0].password+'</p></div><p style="font-size:16px; text-align:center;">This message will self distruct in 5..4..3.. just joking, but this passcode is temporary.</p>' // html body
                  };

                  transporter.sendMail(mailOptions, (error, info) => {
                      if (error) {
                        log.error(error, '/bf/urfittrainer/set/then/sendpassword/user/login/v1');// log to error file
                          return console.log(error);
                      }
                      console.log('Message sent: %s', info.messageId);
                  });


                  res.writeHead(200, header);
                      res.end(JSON.stringify({
                          found: true,
                          results: results2[0]
                          //token: token
                        }));
                      console.log('/bf/urfittrainer/set/then/sendpassword/user/login/v1', JSON.stringify({
                        found: true,
                        results: results2[0]
                        //token: token
                      }));
                      return

              }
              else{

                res.writeHead(200, header);
                    res.end(JSON.stringify({
                        found: false,
                        results: results2
                        //token: token
                      }));
                    console.log('/bf/urfittrainer/set/then/sendpassword/user/login/v1', JSON.stringify({
                      found: false,
                      results: results2,
                      //token: token
                    }));
                    return
                    //
              }



            })
            .catch((err)=>{
              log.error(err, ' bf/urfittrainer/set/then/sendpassword/user/login/v1' );// log to error file
              console.log(err);
              res.writeHead(500, header)
                  res.end(JSON.stringify({
                    found: false,
                    err: err,
                    message:'Something went wrong logging in. Check error message to see what happened.'
                    }))
            });

      })


    })



    // SET AND SEND PASSWORD URFIT CLIENT
server.post('/bf/urfitclient/set/then/sendpassword/user/login/v1', (req, res, next) => {
  let body = req.body;
  function makeid() {
    var text = "";
    var possible = "0123456789";

    for (var i = 0; i < 7; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text.toString();
  }

  let password = makeid();
  db.run("MATCH (n:SENDGRIDPK) RETURN n",{})
  .then((results) =>{
    db.close();

  let smtpConfig = {
      host: 'smtp.sendgrid.net',
        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
            user: 'apikey',
            pass: results.records[0]._fields[0].properties.key
        }
  };
  let transporter = nodemailer.createTransport(smtpConfig);


        let cypher2 = "MATCH (n:USER) WHERE n.email = $email OR n.original_email = $email SET n.password = $password RETURN n";
          db.run(cypher2, {
            email: lowerCase(body.email),
            password: password,
          }).then((results2) => {
            results2 = results2.records.map((x) => {
              return x = x._fields[0].properties;
            });
            db.close();
            //var encryptedString = body.password;
            if(results2.length > 0){
              let mailOptions = {
                    from: '" UrFit " <password@urfit.fit>', // sender address
                    to: body.email, // list of receivers
                    subject: 'Password Code ✔', // Subject line
                    text: 'Your passcode is: '+results2[0].password+ ' ', // plain text body
                    html: '<p style="font-size:28px; text-align: center; color:#35365D">Your Passcode Is</p><div style="padding:10px;background-color:#78C5A6;border-radius:25px; margin-left:100px; margin-right:100px;"><p style="color:white;font-size:40px; text-align:center; ">'+results2[0].password+'</p></div><p style="font-size:16px; text-align:center;">This message will self distruct in 5..4..3.. just joking, but this passcode is temporary.</p>' // html body
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                      log.error(error, '/bf/urfitclient/set/then/sendpassword/user/login/v1');// log to error file
                        return console.log(error);
                    }
                    console.log('Message sent: %s', info.messageId);
                });


                res.writeHead(200, header);
                    res.end(JSON.stringify({
                        found: true,
                        results: results2[0]
                        //token: token
                      }));
                    console.log('/bf/urfitclient/set/then/sendpassword/user/login/v1', JSON.stringify({
                      found: true,
                      results: results2[0]
                      //token: token
                    }));
                    return

            }
            else{

              res.writeHead(200, header);
                  res.end(JSON.stringify({
                      found: false,
                      results: results2
                      //token: token
                    }));
                  console.log('bf/urfitclient/set/then/sendpassword/user/login/v1', JSON.stringify({
                    found: false,
                    results: results2,
                    //token: token
                  }));
                  return
                  //
            }



          })
          .catch((err)=>{
            log.error(err, ' bf/urfitclient/set/then/sendpassword/user/login/v1' );// log to error file
            console.log(err);
            res.writeHead(500, header)
                res.end(JSON.stringify({
                  found: false,
                  err: err,
                  message:'Something went wrong logging in. Check error message to see what happened.'
                  }))
          });

    })


  })



    // TRAINER LOGIN
server.post('/bf/urfittrainer/trainer/login/v1', (req, res, next) => {
        let body = req.body;
        //console.log('password',body.password, body.id )
        let cypher = "MATCH (n:TRAINER { uuid:$uuid, password:$password }) RETURN n";
          db.run(cypher, {
            uuid: body.id,
            password: body.password,
          }).then((results2) => {
            results2 = results2.records.map((x) => {
              return x = x._fields[0].properties;
            });
            db.close();
            //var encryptedString = body.password;
            if(results2.length > 0){
                res.writeHead(200, header);
                    res.end(JSON.stringify({
                        found: true,
                        results: results2
                        //token: token
                      }));
                    console.log('bf/urfittrainer/trainer/login/v1', JSON.stringify({
                      found: false,
                      results: results2
                      //token: token
                    }));
                    return

            }
            else{

              res.writeHead(200, header);
                  res.end(JSON.stringify({
                      found: false,
                      results: results2
                      //token: token
                    }));
                  console.log('bf/urfittrainer/trainer/login/v1', JSON.stringify({
                    found: false,
                    results: results2,
                    //token: token
                  }));
                  return
            }



          })
          .catch((err)=>{
            log.error(err, 'bf/urfittrainer/trainer/login/v1' );// log to error file
            console.log(err, 'bf/urfittrainer/trainer/login/v1');
            res.writeHead(500, header)
                res.end(JSON.stringify({
                  err: err,
                  message:'Something went wrong logging in. Check error message to see what happened.'
                  }))
          });



  })


  // CLIENT LOGIN
server.post('/bf/urfitclient/user/login/v1', (req, res, next) => {
      let body = req.body;
      //console.log('password',body.password, body.id )
      let cypher = "MATCH (n:USER { uuid:$uuid, password:$password }) RETURN n";
        db.run(cypher, {
          uuid: body.id,
          password: body.password,
        }).then((results2) => {
          results2 = results2.records.map((x) => {
            return x = x._fields[0].properties;
          });
          db.close();
          //var encryptedString = body.password;
          if(results2.length > 0){
            stripe.subscriptions.retrieve(
              results2.subscription,
              function(err, subscription) {
                // asynchronously called
                if(err){
                  res.writeHead(200, header);
                  res.end(JSON.stringify({
                      found: true,
                      results: results2
                      //token: token
                    }));
                  console.log('/bf/urfitclient/user/login/v1', JSON.stringify({
                    found: true,
                    results: results2
                    //token: token
                  }));
                  return
                }
                else{
                  if(subscription.status == 'canceled'){
                    results2.subscribed = false;
                    results2.status = subscription.status;
                    res.writeHead(200, header);
                    res.end(JSON.stringify({
                        found: true,
                        results: results2[0]
                        //token: token
                      }));
                    console.log('/bf/urfitclient/user/login/v1', JSON.stringify({
                      found: true,
                      results: results2[0]
                      //token: token
                    }));
                    return
                  }
                  else{
                    results2.subscribed = true;
                    results2.status = subscription.status;
                    res.writeHead(200, header);
                    res.end(JSON.stringify({
                        found: true,
                        results: results2[0]
                        //token: token
                      }));
                    console.log('/bf/urfitclient/user/login/v1', JSON.stringify({
                      found: true,
                      results: results2[0]
                      //token: token
                    }));
                    return
                  }
                }
              }
            );
          }
          else{

            res.writeHead(200, header);
                res.end(JSON.stringify({
                    found: false,
                    results: results2
                    //token: token
                  }));
                console.log('/bf/urfitclient/user/login/v1', JSON.stringify({
                  found: false,
                  results: results2,
                  //token: token
                }));
                return
          }



        })
        .catch((err)=>{
          log.error(err, '/bf/urfitclient/user/login/v1' );// log to error file
          console.log(err, '/bf/urfitclient/user/login/v1');
          res.writeHead(500, header)
              res.end(JSON.stringify({
                err: err,
                message:'Something went wrong logging in. Check error message to see what happened.'
                }))
        });



})


  //SET FCMTOKEN CLIENT
  server.post('/bf/urfit/client/set/fcmtoken/v1', (req, res, next) => {
    let body = req.body;
    let cypher = "MATCH (n:USER {uuid:$uuid}) SET n.fcmtoken = $fcmtoken RETURN n";
      db.run(cypher, {
        uuid: body.id,
        fcmtoken: body.fcmtoken,
      })
      .then((results) => {
        results = results.records.map((x) => {
          return x = x._fields[0].properties;
        });
        db.close();
        res.writeHead(200, header);
            res.end(JSON.stringify({
                found: false,
                results: results
              }));
            console.log('/bf/urfit/client/set/fcmtoken/v1', JSON.stringify({
              found: false,
              results: results,
              //token: token
            }));
            return
      })
      .catch((err)=>{
        log.error(err, '/bf/urfit/client/set/fcmtoken/v1' );// log to error file
        console.log(err, '/bf/urfit/client/set/fcmtoken/v1');
        res.writeHead(500, header)
            res.end(JSON.stringify({
              err: err,
              message:'Something went wrong logging in. Check error message to see what happened.'
            }))
      });
  })

  //SET FCMTOKEN TRAINER
  server.post('/bf/urfittrainer/trainer/set/fcmtoken/v1', (req, res, next) => {
    let body = req.body;
    let cypher = "MATCH (n:TRAINER {uuid:$uuid}) SET n.fcmtoken = $fcmtoken RETURN n";
      db.run(cypher, {
        uuid: body.id,
        fcmtoken: body.fcmtoken,
      })
      .then((results) => {
        results = results.records.map((x) => {
          return x = x._fields[0].properties;
        });
        db.close();
        res.writeHead(200, header);
            res.end(JSON.stringify({
                found: false,
                results: results
              }));
            console.log('/bf/urfittrainer/trainer/set/fcmtoken/v1', JSON.stringify({
              found: false,
              results: results,
              //token: token
            }));
            return
      })
      .catch((err)=>{
        log.error(err, '/bf/urfittrainer/trainer/set/fcmtoken/v1' );// log to error file
        console.log(err, '/bf/urfittrainer/trainer/set/fcmtoken/v1');
        res.writeHead(500, header)
            res.end(JSON.stringify({
              err: err,
              message:'Something went wrong logging in. Check error message to see what happened.'
            }))
      });
  })





		}

	}


export default User
