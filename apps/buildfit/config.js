import jwt from 'jsonwebtoken';
import uuid from 'node-uuid';
const uuidV4 = require('uuid');

export const secret = 'lukeiamyourfather'; 
export const exercises_core_pack = "["+
									'{ VideoURL:"https://www.youtube.com/watch?v=Q9AlsWFyYE8&feature=youtu.be", location: ["gym", "home"], levels: ["superset", "low"], gender: ["male", "female"], name: "Plank", sets: '+"'" + ' { "superset": [ {  "reps": "30", "rest" : "0"  } ], "low": [ {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45"} ] }'+"'"+', uuid:'+ JSON.stringify(uuidV4())+', description: "Your Hips must not sag. Fight to keep hips in line with the rest of your body. Try putting a PVC pipe or broomstick on your back next time you do a plank. It should touch the top of your tailbone, your upper back and the back of your head. That is  how you know you are in a neutral position and performing them correctly.", part:"core", detailed_part: "abs" }, '+	
									'{ VideoURL:"https://youtu.be/N8xOZ9cHHjo", location: ["gym", "home"], levels: ["superset", "low"], gender: ["male", "female"], name: "Crunch", sets: '+"'" + ' { "superset": [ { "reps": "30", "rest" : "0" } ], "low": [ { "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45"} ] }'+"'"+', uuid:'+ JSON.stringify(uuidV4())+', description: "Do not jerk your weight up. Focus on utilizing your abs to raise your body up and make sure you are moving slowly and deliberately as you perform each crunch. Do not perform a sit up and instead focus on cruching your abs. Do not focus on raising all the way up as you would for a sit up.", part:"core", detailed_part: "abs" }, '+
									'{ VideoURL:"https://youtu.be/Ot2x2yhV1f0", location: ["gym", "home"], levels: ["superset", "low"], gender: ["male", "female"], name: "Sit up", sets: '+"'" +' { "superset": [ {  "reps": "30", "rest" : "0"  } ], "low": [ { , "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45"} ] }'+"'"+', uuid:'+ JSON.stringify(uuidV4())+', description: " ", part:"core", detailed_part: "abs"}, '+
									'{ VideoURL:"https://youtu.be/AFBC0HDflWo", name: "Air Bicycle", location: ["gym", "home"], levels: ["superset", "low"], gender: ["male", "female"], sets: '+"'" + ' { "superset": [ {  "reps": "30", "rest" : "0"  } ], "low": [ {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45"} ] }'+"'"+', uuid:'+ JSON.stringify(uuidV4())+', description: " ", part:"core", detailed_part: "abs"}, '+
									'{ VideoURL:"https://youtu.be/ZF_fwwd5oxw", name: "Lying Leg Raise", location: ["gym", "home"], levels: ["superset", "low"], gender: ["male", "female"], sets: '+"'" + ' { "superset": [ {  "reps": "30", "rest" : "0"  } ], "low": [ {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45"} ] }'+"'" +', uuid:'+ JSON.stringify(uuidV4())+', description: "", part:"core", detailed_part: "abs"}, '+  
									'{ VideoURL:"https://youtu.be/_LiAqnFE5mg", name: "Ab Plate Twist", location: ["gym", "home"], levels: ["superset", "low", "medium", "high"], gender: ["male", "female"], sets:'+"'" + ' { "superset": [ {  "reps": "30", "rest" : "0"  } ], "low": [ {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45"} ], "medium": [{  "reps": "30", "rest" : "30" }, {  "reps": "30", "rest" : "30" }, {  "reps": "30", "rest" : "30"}, {  "reps": "30", "rest" : "45"}], "high": [{  "reps": "30", "rest" : "30" }, {  "reps": "30", "rest" : "30" }, {  "reps": "30", "rest" : "30"}, {  "reps": "30", "rest" : "45"}, {  "reps": "30", "rest" : "45"}] }'+"'" +', uuid: '+ JSON.stringify(uuidV4())+', description: "", part:"core", detailed_part: "abs"}, '+ 
									'{ VideoURL:"https://youtu.be/G1Xpt8vbVBc", name: "Mountain Climber", location: ["gym", "home"], levels: ["superset", "low"], gender: ["male", "female"], sets: '+"'" + ' { "superset": [ {  "reps": "30", "rest" : "0"  } ], "low": [ {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45"} ] }'+"'" +', uuid:'+ JSON.stringify(uuidV4())+', description: "", part:"core", detailed_part: "abs"}, '+
									'{ VideoURL:"https://youtu.be/VAERCnrM_l8", name: "Full Hanging Leg Raise", location: ["gym"], levels: ["superset", "low", "medium"], gender: ["male", "female"], sets: '+"'" + ' { "superset": [ {  "reps": "30", "rest" : "0"  } ], "low": [ {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45"} ], "medium": [ {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45"} ] }'+"'" +', uuid:'+ JSON.stringify(uuidV4())+', description: "", part:"core", detailed_part: "abs"}, '+
									'{ VideoURL:"https://youtu.be/KNgfBz_u9LU", name: "Machine Ab Crunch", location: ["gym"], levels: ["superset", "low", "medium", "high"], gender: ["male", "female"], sets: '+"'" + ' { "superset": [ {  "reps": "30", "rest" : "0"  } ], "low": [ {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45"} ], "medium": [ {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45"} ], "high": [ {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30"} ] }'+"'" +', uuid:'+ JSON.stringify(uuidV4())+', description: "", part:"core", detailed_part: "abs"}, '+
									'{ VideoURL:"https://youtu.be/tKIygTzTLmM", name: "Reverse Crunch", location: ["gym"], levels: ["superset", "low", "medium", "high"], gender: ["male", "female"], sets: '+"'" + ' { "superset": [ {  "reps": "30", "rest" : "0"  } ], "low": [ {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45"} ], "medium": [ {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45"} ], "high": [ {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30"} ] }'+"'" +', uuid:'+ JSON.stringify(uuidV4())+', description: "", part:"core", detailed_part: "abs"}, '+
									'{ VideoURL:"https://youtu.be/m1HFK3Wdt0U", name: "Elbow to Knee Cross Touch", location: ["gym", "home"], levels: ["superset", "low", "medium", "high"], gender: ["male", "female"], sets: '+"'" + ' { "superset": [ {  "reps": "30", "rest" : "0"  } ], "low": [ {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45"} ], "medium": [ {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45"} ], "high": [ {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30"} ] }'+"'" +', uuid:'+ JSON.stringify(uuidV4())+', description: "", part:"core", detailed_part: "abs"}, '+
									'{ VideoURL:"https://youtu.be/v30TIy18LEo", name: "Pulse Up", location: ["gym", "home"], levels: ["superset", "low", "medium", "high"], gender: ["male", "female"], sets: '+"'" + ' { "superset": [ {  "reps": "30", "rest" : "0"  } ], "low": [ {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45"} ], "medium": [ {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45"} ], "high": [ {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30"} ] }'+"'" +', uuid:'+ JSON.stringify(uuidV4())+', description: "", part:"core", detailed_part: "abs"}, '+
									'{ VideoURL:"https://youtu.be/U9wAK2bgY2E", name: "Ab Roller", location: ["gym", "home"], levels: ["superset", "low", "medium", "high"], gender: ["male", "female"], sets: '+"'" + ' { "superset": [ {  "reps": "30", "rest" : "0"  } ], "low": [ {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45"} ], "medium": [ {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45"} ], "high": [ {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30"} ] }'+"'" +', uuid:'+ JSON.stringify(uuidV4())+', description: "", part:"core", detailed_part: "abs"}, '+
									'{ VideoURL:"https://youtu.be/9yiWAgm3DSU", name: "Pilates Burpee", location: ["gym", "home"], levels: ["superset", "low", "medium", "high"], gender: ["male", "female"], sets: '+"'" + ' { "superset": [ {  "reps": "30", "rest" : "0"  } ], "low": [ {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45"} ], "medium": [ {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45"} ], "high": [ {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30"} ] }'+"'" +', uuid:'+ JSON.stringify(uuidV4())+', description: "", part:"core", detailed_part: "abs"}, '+
									'{ VideoURL:"https://youtu.be/UYIyr1TRJaw", name: "Scissor Kick", location: ["gym", "home"], levels: ["superset", "low", "medium", "high"], gender: ["male", "female"], sets: '+"'" + ' { "superset": [ {  "reps": "30", "rest" : "0"  } ], "low": [ {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45"} ], "medium": [ {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45"} ], "high": [ {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30"} ] }'+"'" +', uuid:'+ JSON.stringify(uuidV4())+', description: "", part:"core", detailed_part: "abs"}, '+
									'{ VideoURL:"https://youtu.be/4QnjuZbjvSY", name: "Cable Crunch", location: ["gym"], levels: ["superset", "low", "medium", "high"], gender: ["male", "female"], sets: '+"'" + ' { "superset": [ {  "reps": "30", "rest" : "0"  } ], "low": [ {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45"} ], "medium": [ {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45"} ], "high": [ {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30"} ] }'+"'" +', uuid:'+ JSON.stringify(uuidV4())+', description: "", part:"core", detailed_part: "abs"}, '+
									'{ VideoURL:"https://youtu.be/CK3BRfEgsOA", name: "Roman Chair Leg Raise", location: ["gym"], levels: ["superset", "low", "medium", "high"], gender: ["male", "female"], sets: '+"'" + ' { "superset": [ {  "reps": "30", "rest" : "0"  } ], "low": [ {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45"} ], "medium": [ {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45"} ], "high": [ {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30"} ] }'+"'" +', uuid:'+ JSON.stringify(uuidV4())+', description: "", part:"core", detailed_part: "abs"}, '+
									'{ VideoURL:"https://youtu.be/2h5HU6ug8ik", name: "Vertical Leg Crunch", location: ["gym", "home"], levels: ["superset", "low", "medium", "high"], gender: ["male", "female"], sets: '+"'" + ' { "superset": [ {  "reps": "30", "rest" : "0"  } ], "low": [ {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45"} ], "medium": [ {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45"} ], "high": [ {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30"} ] }'+"'" +', uuid:'+ JSON.stringify(uuidV4())+', description: "", part:"core", detailed_part: "abs"}, '+
									'{ VideoURL:"https://youtu.be/2R05oeCl2qQ", name: "Swiss Ball Crunch", location: ["gym", "home"], levels: ["superset", "low", "medium", "high"], gender: ["male", "female"], sets:'+"'" + ' { "superset": [ {  "reps": "30", "rest" : "0"  } ], "low": [ {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45"} ], "medium": [ {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45"} ], "high": [ {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30"} ] }'+"'" +', uuid:'+ JSON.stringify(uuidV4())+', description: "", part:"core", detailed_part: "abs"}, '+
									'{ VideoURL:"https://youtu.be/nsYFSwxEPxM", name: "Flat Bench Lying Leg Raise", location: ["gym"], levels: ["superset", "low", "medium", "high"], gender: ["male", "female"], sets: '+"'" + ' { "superset": [ {  "reps": "30", "rest" : "0"  } ], "low": [ {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45"} ], "medium": [ {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45"} ], "high": [ {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30"} ] }'+"'" +', uuid:'+ JSON.stringify(uuidV4())+', description: "", part:"core", detailed_part: "abs"}, '+
									'{ VideoURL:"https://youtu.be/_433swsNPaM", name: "Tuck Crunch", location: ["gym", "home"], levels: ["superset", "low", "medium", "high"], gender: ["male", "female"], sets: '+"'" + ' { "superset": [ {  "reps": "30", "rest" : "0"  } ], "low": [ {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45"} ], "medium": [ {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45"} ], "high": [ {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30"} ] }'+"'" +', uuid:'+ JSON.stringify(uuidV4())+', description: "", part:"core", detailed_part: "abs"}, '+
									'{ VideoURL:"https://youtu.be/H7KsymxoCc0", name: "Dead Bug", location: ["gym", "home"], levels: ["superset", "low", "medium", "high"], gender: ["male", "female"], sets: '+"'" + ' { "superset": [ {  "reps": "30", "rest" : "0"  } ], "low": [ {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45"} ], "medium": [ {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45"} ], "high": [ {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30"} ] }'+"'" +', uuid:'+ JSON.stringify(uuidV4())+', description: "", part:"core", detailed_part: "abs"}, '+
									'{ VideoURL:"https://youtu.be/uQ83N79iHXs", name: "Double Crunch", location: ["gym", "home"], levels: ["superset", "low", "medium", "high"], gender: ["male", "female"], sets: '+"'" + ' { "superset": [ {  "reps": "30", "rest" : "0"  } ], "low": [ {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45"} ], "medium": [ {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45"} ], "high": [ {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30"} ] }'+"'" +', uuid:'+ JSON.stringify(uuidV4())+', description: "", part:"core", detailed_part: "abs"}, '+
									'{ VideoURL:"https://youtu.be/zlnBSufRW-o", name: "Weighted Sit-Up", location: ["gym", "home"], levels: ["superset", "low", "medium", "high"], gender: ["male", "female"], sets: '+"'" + ' { "superset": [ {  "reps": "30", "rest" : "0"  } ], "low": [ {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45"} ], "medium": [ {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45"} ], "high": [ {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30"} ] }'+"'" +', uuid:'+ JSON.stringify(uuidV4())+', description: "", part:"core", detailed_part: "abs"}, '+
									'{ VideoURL:"https://youtu.be/EfLwc7Y9m08", name: "Weighted Decline Sit-Up", location: ["gym"], levels: ["superset", "low", "medium", "high"], gender: ["male", "female"], sets: '+"'" + ' { "superset": [ {  "reps": "30", "rest" : "0"  } ], "low": [ {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45"} ], "medium": [ {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45"} ], "high": [ {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30"} ] }'+"'" +', uuid:'+ JSON.stringify(uuidV4())+', description: "", part:"core", detailed_part: "abs"}, '+
									'{ VideoURL:"https://youtu.be/FfZuwZAvGkQ", name: "Swiss Ball Ab Rollout", location: ["gym", "home"], levels: ["superset", "low", "medium", "high"], gender: ["male", "female"], sets: '+"'" + ' { "superset": [ {  "reps": "30", "rest" : "0"  } ], "low": [ {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45"} ], "medium": [ {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45"} ], "high": [ {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30"} ] }'+"'" +', uuid:'+ JSON.stringify(uuidV4())+', description: "", part:"core", detailed_part: "abs"}, '+
									'{ VideoURL:"https://youtu.be/K7InUqXlExw", name: "Up Up Down Down Elbow Push-Up", location: ["gym", "home"], levels: ["superset", "low", "medium", "high"], gender: ["male", "female"], sets: '+"'" + ' { "superset": [ {  "reps": "30", "rest" : "0"  } ], "low": [ {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45"} ], "medium": [ {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45"} ], "high": [ {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30"} ] }'+"'" +', uuid:'+ JSON.stringify(uuidV4())+', description: "", part:"core", detailed_part: "abs"}, '+
									'{ VideoURL:"https://youtu.be/SzT-4AtOCo8", name: "Pilates Rollups", location: ["gym", "home"], levels: ["superset", "low", "medium", "high"], gender: ["male", "female"], sets: '+"'" + ' { "superset": [ {  "reps": "30", "rest" : "0"  } ], "low": [ {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45"} ], "medium": [ {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45"} ], "high": [ {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30"} ] }'+"'" +', uuid:'+ JSON.stringify(uuidV4())+', description: "", part:"core", detailed_part: "abs"}, '+
									'{ VideoURL:"https://youtu.be/a7ZnLpLIb8s", name: "Medicine Ball Slam", location: ["gym", "home"], levels: ["superset", "low", "medium", "high"], gender: ["male", "female"], sets: '+"'" + ' { "superset": [ {  "reps": "30", "rest" : "0"  } ], "low": [ {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45"} ], "medium": [ {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45"} ], "high": [ {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30"} ] }'+"'" +', uuid:'+ JSON.stringify(uuidV4())+', description: "", part:"core", detailed_part: "abs"}, '+
									'{ VideoURL:"https://youtu.be/V1bLfMetLvc", name: "Roman Chair Knee Raise", location: ["gym", "home"], levels: ["superset", "low", "medium", "high"], gender: ["male", "female"], sets: '+"'" + ' { "superset": [ {  "reps": "30", "rest" : "0"  } ], "low": [ {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45"} ], "medium": [ {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45"} ], "high": [ {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30"} ] }'+"'" +', uuid:'+ JSON.stringify(uuidV4())+', description: "", part:"core", detailed_part: "abs"}, '+
									'{ VideoURL:"https://youtu.be/RB8AuO2svV0", name: "Decline Crunch", location: ["gym", "home"], levels: ["superset", "low", "medium", "high"], gender: ["male", "female"], sets: '+"'" + ' { "superset": [ {  "reps": "30", "rest" : "0"  } ], "low": [ {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45"} ], "medium": [ {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45"} ], "high": [ {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30"} ] }'+"'" +', uuid:'+ JSON.stringify(uuidV4())+', description: "", part:"core", detailed_part: "abs"}, '+ 
									'{ VideoURL:"https://youtu.be/JE5ckyDECqc", name: "Weighted Crunch", location: ["gym", "home"], levels: ["superset", "low", "medium", "high"], gender: ["male", "female"], sets: '+"'" + ' { "superset": [ {  "reps": "30", "rest" : "0"  } ], "low": [ {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45"} ], "medium": [ {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45"} ], "high": [ {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30"} ] }'+"'" +', uuid:'+ JSON.stringify(uuidV4())+', description: "", part:"core", detailed_part: "abs"}, '+
									'{ VideoURL:"https://youtu.be/w07_mQSjHzM", name: "Barbell Floor Wiper", location: ["gym", "home"], levels: ["superset", "low", "medium", "high"], gender: ["male", "female"], sets: '+"'" + ' { "superset": [ {  "reps": "30", "rest" : "0"  } ], "low": [ {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45"} ], "medium": [ {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45"} ], "high": [ {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30"} ] }'+"'" +', uuid:'+ JSON.stringify(uuidV4())+', description: "", part:"core", detailed_part: "abs"}, '+
									'{ VideoURL:"https://youtu.be/7iMHiIt8-4o", name: "V-Up", location: ["gym", "home"], levels: ["superset", "low", "medium", "high"], gender: ["male", "female"], sets: '+"'" + ' { "superset": [ {  "reps": "30", "rest" : "0"  } ], "low": [ {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45"} ], "medium": [ {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45"} ], "high": [ {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30"} ] }'+"'" +', uuid:'+ JSON.stringify(uuidV4())+', description: "", part:"core", detailed_part: "abs"}, '+
									'{ VideoURL:"https://youtu.be/WndfVYFm0bM", name: "Plank w/ Ball Rollout", location: ["gym", "home"], levels: ["superset", "low", "medium", "high"], gender: ["male", "female"], sets: '+"'" + ' { "superset": [ {  "reps": "30", "rest" : "0"  } ], "low": [ {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45"} ], "medium": [ {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45"} ], "high": [ {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30"} ] }'+"'" +', uuid:'+ JSON.stringify(uuidV4())+', description: "", part:"core", detailed_part: "abs"}, '+
									'{ VideoURL:"https://youtu.be/xIRZXPKnvU8", name: "Swiss Ball Pike", location: ["gym", "home"], levels: ["superset", "low", "medium", "high"], gender: ["male", "female"], sets: '+"'" + ' { "superset": [ {  "reps": "30", "rest" : "0"  } ], "low": [ {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45"} ], "medium": [ {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45"} ], "high": [ {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30"} ] }'+"'" +', uuid:'+ JSON.stringify(uuidV4())+', description: "", part:"core", detailed_part: "abs"}, '+
									'{ VideoURL:"https://youtu.be/R3TBHUOMs1M", name: "360 Degree Hanging Leg Rotation", location: ["gym", "home"], levels: ["superset", "low", "medium", "high"], gender: ["male", "female"], sets: '+"'" + ' { "superset": [ {  "reps": "30", "rest" : "0"  } ], "low": [ {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45"} ], "medium": [ {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45"} ], "high": [ {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30"} ] }'+"'" +', uuid:'+ JSON.stringify(uuidV4())+', description: "", part:"core", detailed_part: "abs"}, '+
									'{ VideoURL:"https://youtu.be/6yYagCoInrA", name: "Medicine Ball V-Up", location: ["gym", "home"], levels: ["superset", "low", "medium", "high"], gender: ["male", "female"], sets: '+"'" + ' { "superset": [ {  "reps": "30", "rest" : "0"  } ], "low": [ {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45"} ], "medium": [ {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45"} ], "high": [ {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30"} ] }'+"'" +', uuid:'+ JSON.stringify(uuidV4())+', description: "", part:"core", detailed_part: "abs"}, '+
									'{ VideoURL:"https://youtu.be/6sDst0UB_ig", name: "Flat Bench Reverse Ab Crunch", location: ["gym", "home"], levels: ["superset", "low", "medium", "high"], gender: ["male", "female"], sets:'+"'" + ' { "superset": [ {  "reps": "30", "rest" : "0"  } ], "low": [ {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45"} ], "medium": [ {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45"} ], "high": [ {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30"} ] }'+"'" +', uuid:'+ JSON.stringify(uuidV4())+', description: "", part:"core", detailed_part: "abs"}, '+
									'{ VideoURL:"https://youtu.be/ug3DPR_y9YE", name: "Sit-Up Twist", location: ["gym", "home"], levels: ["superset", "low", "medium", "high"], gender: ["male", "female"], sets: '+"'" + ' { "superset": [ {  "reps": "30", "rest" : "0"  } ], "low": [ {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45"} ], "medium": [ {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45"} ], "high": [ {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30"} ] }'+"'" +', uuid:'+ JSON.stringify(uuidV4())+', description: "", part:"core", detailed_part: "abs"}, '+
									'{ VideoURL:"https://youtu.be/O6JpvjmhmJM", name: "Kettlebell Figure 8", location: ["gym", "home"], levels: ["superset", "low", "medium", "high"], gender: ["male", "female"], sets: '+"'" + ' { "superset": [ {  "reps": "30", "rest" : "0"  } ], "low": [ {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45"} ], "medium": [ {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45"} ], "high": [ {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30"} ] }'+"'" +', uuid:'+ JSON.stringify(uuidV4())+', description: "", part:"core", detailed_part: "abs"}, '+
									'{ VideoURL:"https://youtu.be/VQnFDVErAUI", name: "Core Rapid Through the Legs", location: ["gym", "home"], levels: ["superset", "low", "medium", "high"], gender: ["male", "female"], sets: '+"'" + ' { "superset": [ {  "reps": "30", "rest" : "0"  } ], "low": [ {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45"} ], "medium": [ {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45"} ], "high": [ {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30"} ] }'+"'" +', uuid:'+ JSON.stringify(uuidV4())+', description: "", part:"core", detailed_part: "abs"}, '+
									'{ VideoURL:"https://youtu.be/C7bR2UIRxQ8", name: "Bench Knee Pull-In", location: ["gym", "home"], levels: ["superset", "low", "medium", "high"], gender: ["male", "female"], sets: '+"'" + ' { "superset": [ {  "reps": "30", "rest" : "0"  } ], "low": [ {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45"} ], "medium": [ {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45"} ], "high": [ {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30"} ] }'+"'" +', uuid:'+ JSON.stringify(uuidV4())+', description: "", part:"core", detailed_part: "abs"}, '+
									'{ VideoURL:"https://youtu.be/HVe7pB-wGSk", name: "Heel Touch", location: ["gym", "home"], levels: ["superset", "low", "medium", "high"], gender: ["male", "female"], sets: '+"'" + ' { "superset": [ {  "reps": "30", "rest" : "0"  } ], "low": [ {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45"} ], "medium": [ {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45"} ], "high": [ {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30"} ] }'+"'" +', uuid:'+ JSON.stringify(uuidV4())+', description: "", part:"core", detailed_part: "abs"}, '+
									'{ VideoURL:"https://youtu.be/T1FhnJn2KIs", name: "Barbell Ab Rollout", location: ["gym", "home"], levels: ["superset", "low", "medium", "high"], gender: ["male", "female"], sets: '+"'" + ' { "superset": [ {  "reps": "30", "rest" : "0"  } ], "low": [ {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45"} ], "medium": [ {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45"} ], "high": [ {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30"} ] }'+"'" +', uuid:'+ JSON.stringify(uuidV4())+', description: "", part:"core", detailed_part: "abs"}, '+
									'{ VideoURL:"https://youtu.be/DX6xDjNnra4", name: "Teaser", location: ["gym", "home"], levels: ["superset", "low", "medium", "high"], gender: ["male", "female"], sets: '+"'" + ' { "superset": [ {  "reps": "30", "rest" : "0"  } ], "low": [ {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45"} ], "medium": [ {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45"} ], "high": [ {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30"} ] }'+"'" +', uuid:'+ JSON.stringify(uuidV4())+', description: "", part:"core", detailed_part: "abs"}, '+
									'{ VideoURL:"https://youtu.be/KjpRk4VNJiQ", name: "Barbell Torque", location: ["gym", "home"], levels: ["superset", "low", "medium", "high"], gender: ["male", "female"], sets: '+"'" + ' { "superset": [ {  "reps": "30", "rest" : "0"  } ], "low": [ {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45"} ], "medium": [ {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45"} ], "high": [ {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30"} ] }'+"'" +', uuid:'+ JSON.stringify(uuidV4())+', description: "", part:"core", detailed_part: "abs"}, '+
									'{ VideoURL:"https://youtu.be/J1ojfoUdDs0", name: "360-Degree Lying Leg Rotation", location: ["gym", "home"], levels: ["superset", "low", "medium", "high"], gender: ["male", "female"], sets: '+"'" + ' { "superset": [ {  "reps": "30", "rest" : "0"  } ], "low": [ {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45"} ], "medium": [ {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45"} ], "high": [ {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30"} ] }'+"'" +', uuid:'+ JSON.stringify(uuidV4())+', description: "", part:"core", detailed_part: "abs"}, '+
									'{ VideoURL:"https://youtu.be/IwzqjMdZviA", name: "Single-Leg Drop", location: ["gym", "home"], levels: ["superset", "low", "medium", "high"], gender: ["male", "female"], sets: '+"'" + ' { "superset": [ {  "reps": "30", "rest" : "0"  } ], "low": [ {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45"} ], "medium": [ {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45"} ], "high": [ {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30"} ] }'+"'" +', uuid:'+ JSON.stringify(uuidV4())+', description: "", part:"core", detailed_part: "abs"}, '+
									'{ VideoURL:"https://youtu.be/Hlqbf9vZXy4", name: "Single-Leg Jackknife", location: ["gym", "home"], levels: ["superset", "low", "medium", "high"], gender: ["male", "female"], sets: '+"'" + ' { "superset": [ {  "reps": "30", "rest" : "0"  } ], "low": [ {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45" }, {  "reps": "10", "rest" : "45"} ], "medium": [ {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45" }, {  "reps": "30", "rest" : "45"} ], "high": [ {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30" }, {  "reps": "50", "rest" : "30"} ] }'+"'" +', uuid:'+ JSON.stringify(uuidV4())+', description: "", part:"core", detailed_part: "abs"} '+
								
"]";



export const exercises_glutes_pack = "["+
									"{ VideoURL:'https://www.youtube.com/watch?v=Q9AlsWFyYE8&feature=youtu.be', location: ['gym', 'home'], levels: ['superset', 'low'], gender: ['male', 'female'], name: 'Plank', sets: "+'"'+ " { 'superset': [ {  'reps': '30', 'rest' : '0'  } ], 'low': [ {  'reps': '30', 'rest' : '45' }, {  'reps': '30', 'rest' : '45' }, {  'reps': '30', 'rest' : '45'} ] }"+'"'+", uuid:"+ JSON.stringify(uuidV4())+", description: 'Your Hips must not sag. Fight to keep hips in line with the rest of your body. Try putting a PVC pipe or broomstick on your back next time you do a plank. It should touch the top of your tailbone, your upper back and the back of your head. That is  how you know you are in a neutral position and performing them correctly.', part:'core', detailed_part: 'abs' }, "+	
									"{ VideoURL:'https://youtu.be/N8xOZ9cHHjo', location: ['gym', 'home'], levels: ['superset', 'low'], gender: ['male', 'female'], name: 'Crunch', sets: "+'"' + " { 'superset': [ {  'reps': '30', 'rest' : '0' } ], 'low': [ {  'reps': '30', 'rest' : '45' }, {  'reps': '30', 'rest' : '45' }, {  'reps': '30', 'rest' : '45'} ] }"+'"'+", uuid:"+ JSON.stringify(uuidV4())+", description: 'Do not jerk your weight up. Focus on utilizing your abs to raise your body up and make sure you are moving slowly and deliberately as you perform each crunch. Do not perform a sit up and instead focus on cruching your abs. Do not focus on raising all the way up as you would for a sit up.', part:'core', detailed_part: 'abs' }, "+
									"{ VideoURL:'https://youtu.be/Ot2x2yhV1f0', location: ['gym', 'home'], levels: ['superset', 'low'], gender: ['male', 'female'], name: 'Sit up', sets: "+'"' +" { 'superset': [ {  'reps': '30', 'rest' : '0'  } ], 'low': [ {  'reps': '30', 'rest' : '45' }, {  'reps': '30', 'rest' : '45' }, {  'reps': '30', 'rest' : '45'} ] }"+'"'+", uuid:"+ JSON.stringify(uuidV4()) +", description: ' ', part:'core', detailed_part: 'abs'}, "+
									"{ VideoURL:'https://youtu.be/AFBC0HDflWo', name: 'Air Bicycle', location: ['gym', 'home'], levels: ['superset', 'low'], gender: ['male', 'female'], sets: "+'"' + " { 'superset': [ {  'reps': '30', 'rest' : '0'  } ], 'low': [ {  'reps': '30', 'rest' : '45' }, {  'reps': '30', 'rest' : '45' }, {  'reps': '30', 'rest' : '45'} ] }"+'"'+", uuid:"+ JSON.stringify(uuidV4()) +", description: ' ', part:'core', detailed_part: 'abs'}, "+
									"{ VideoURL:'https://youtu.be/ZF_fwwd5oxw', name: 'Lying Leg Raise', location: ['gym', 'home'], levels: ['superset', 'low'], gender: ['male', 'female'], sets: "+'"' + " { 'superset': [ {  'reps': '30', 'rest' : '0'  } ], 'low': [ {  'reps': '30', 'rest' : '45' }, {  'reps': '30', 'rest' : '45' }, {  'reps': '30', 'rest' : '45'} ] }"+'"' +", uuid:"+ JSON.stringify(uuidV4()) +", description: '', part:'core', detailed_part: 'abs'}, "+  

"]";

export const frameworks = "["+
						 "{gender: 'female', part: 'core', goal: 'Smaller'}, "+
						 "{gender: 'female', part: 'core', goal: 'Tone'}, "+
						 //"{gender: 'female', part: 'core', goal: 'Bigger'}, "+
						 "{gender: 'male', part: 'core', goal: 'Smaller'}, "+
						 "{gender: 'male', part: 'core', goal: 'Tone'}, "+
						 //"{gender: 'male', part: 'core', goal: 'Bigger'}, "+
						 "{gender: 'female', part: 'glutes', goal: 'Smaller'}, "+
						 "{gender: 'female', part: 'glutes', goal: 'Tone'}, "+
						 "{gender: 'female', part: 'glutes', goal: 'Bigger'}, "+
						 "{gender: 'male', part: 'glutes', goal: 'Smaller'}, "+
						 "{gender: 'male', part: 'glutes', goal: 'Tone'}, "+
						 "{gender: 'male', part: 'glutes', goal: 'Bigger'}, "+
						 "{gender: 'female', part: 'back', goal: 'Smaller'}, "+
						 "{gender: 'female', part: 'back', goal: 'Tone'}, "+
						 "{gender: 'female', part: 'back', goal: 'Bigger'}, "+
						 "{gender: 'male', part: 'back', goal: 'Smaller'}, "+
						 "{gender: 'male', part: 'back', goal: 'Tone'}, "+
						 "{gender: 'male', part: 'back', goal: 'Bigger'}, "+
						 "{gender: 'female', part: 'hamstrings', goal: 'Smaller'}, "+
						 "{gender: 'female', part: 'hamstrings', goal: 'Tone'}, "+
						 "{gender: 'female', part: 'hamstrings', goal: 'Bigger'}, "+
						 "{gender: 'male', part: 'hamstrings', goal: 'Smaller'}, "+
						 "{gender: 'male', part: 'hamstrings', goal: 'Tone'}, "+
						 "{gender: 'male', part: 'hamstrings', goal: 'Bigger'}, "+
						 "{gender: 'female', part: 'calves', goal: 'Smaller'}, "+
						 "{gender: 'female', part: 'calves', goal: 'Tone'}, "+
						 "{gender: 'female', part: 'calves', goal: 'Bigger'}, "+
						 "{gender: 'male', part: 'calves', goal: 'Smaller'}, "+
						 "{gender: 'male', part: 'calves', goal: 'Tone'}, "+
						 "{gender: 'male', part: 'calves', goal: 'Bigger'}, "+
						 "{gender: 'female', part: 'biceps', goal: 'Smaller'}, "+
						 "{gender: 'female', part: 'biceps', goal: 'Tone'}, "+
						 "{gender: 'female', part: 'biceps', goal: 'Bigger'}, "+
						 "{gender: 'male', part: 'biceps', goal: 'Smaller'}, "+
						 "{gender: 'male', part: 'biceps', goal: 'Tone'}, "+
						 "{gender: 'male', part: 'biceps', goal: 'Bigger'}, "+
						 "{gender: 'female', part: 'quads', goal: 'Smaller'}, "+
						 "{gender: 'female', part: 'quads', goal: 'Tone'}, "+
						 "{gender: 'female', part: 'quads', goal: 'Bigger'}, "+
						 "{gender: 'male', part: 'quads', goal: 'Smaller'}, "+
						 "{gender: 'male', part: 'quads', goal: 'Tone'}, "+
						 "{gender: 'male', part: 'quads', goal: 'Bigger'}, "+
						 "{gender: 'female', part: 'triceps', goal: 'Smaller'}, "+
						 "{gender: 'female', part: 'triceps', goal: 'Tone'}, "+
						 "{gender: 'female', part: 'triceps', goal: 'Bigger'}, "+
						 "{gender: 'male', part: 'triceps', goal: 'Smaller'}, "+
						 "{gender: 'male', part: 'triceps', goal: 'Tone'}, "+
						 "{gender: 'male', part: 'triceps', goal: 'Bigger'}, "+
						 "{gender: 'female', part: 'shoulders', goal: 'Smaller'}, "+
						 "{gender: 'female', part: 'shoulders', goal: 'Tone'}, "+
						 "{gender: 'female', part: 'shoulders', goal: 'Bigger'}, "+
						 "{gender: 'male', part: 'shoulders', goal: 'Smaller'}, "+
						 "{gender: 'male', part: 'shoulders', goal: 'Tone'}, "+
						 "{gender: 'male', part: 'shoulders', goal: 'Bigger'}, "+
						 "{gender: 'female', part: 'chest', goal: 'Smaller'}, "+
						 "{gender: 'female', part: 'chest', goal: 'Tone'}, "+
						 "{gender: 'female', part: 'chest', goal: 'Bigger'}, "+
						 "{gender: 'male', part: 'chest', goal: 'Smaller'}, "+
						 "{gender: 'male', part: 'chest', goal: 'Tone'}, "+
						 "{gender: 'male', part: 'chest', goal: 'Bigger'} "+


"]"

export const patterns = "["+
						 "{soreness: 1, movements: ['high','high', 'high'], part: 'core', goal: 'Smaller', gender: 'male'}, "+
						 "{soreness: 2, movements: ['high','high'], part: 'core', goal: 'Smaller', gender: 'male'}, "+
						 "{soreness: 3, movements: ['medium'], part: 'core', goal: 'Smaller', gender: 'male'}, "+
						 "{soreness: 1, movements: ['high','high', 'high'], part: 'core', goal: 'Smaller', gender: 'female'}, "+
						 "{soreness: 2, movements: ['high','medium'], part: 'core', goal: 'Smaller', gender: 'female'}, "+
						 "{soreness: 3, movements: ['medium'], part: 'core', goal: 'Smaller', gender: 'female'}, "+
						 "{soreness: 1, movements: ['high', 'high'], part: 'core', goal: 'Tone', gender: 'male'}, "+
						 "{soreness: 2, movements: ['medium','medium'], part: 'core', goal: 'Tone', gender: 'male'}, "+
						 "{soreness: 3, movements: ['low'], part: 'core', goal: 'Tone', gender: 'male'}, "+
						 "{soreness: 1, movements: ['high','high'], part: 'core', goal: 'Tone', gender: 'female'}, "+
						 "{soreness: 2, movements: ['medium', 'medium'], part: 'core', goal: 'Tone', gender: 'female'}, "+
						 "{soreness: 3, movements: ['low'], part: 'core', goal: 'Tone', gender: 'female'}, "+
						 "{soreness: 1, movements: ['medium','medium','medium','low'], part: 'glutes', goal: 'Smaller', gender: 'male'}, "+
						 "{soreness: 2, movements: ['medium','superset','low'], part: 'glutes', goal: 'Smaller', gender: 'male'}, "+
						 "{soreness: 3, movements: ['medium','medium','low'], part: 'glutes', goal: 'Smaller', gender: 'male'}, "+
						 "{soreness: 1, movements: ['medium','medium','medium','low'], part: 'glutes', goal: 'Smaller', gender: 'female'}, "+
						 "{soreness: 2, movements: ['medium','medium','low'], part: 'glutes', goal: 'Smaller', gender: 'female'}, "+
						 "{soreness: 3, movements: ['medium','medium','low'], part: 'glutes', goal: 'Smaller', gender: 'female'}, "+
						 "{soreness: 1, movements: ['high','medium','medium','low'], part: 'glutes', goal: 'Tone', gender: 'male'}, "+
						 "{soreness: 2, movements: ['high','medium','low'], part: 'glutes', goal: 'Tone', gender: 'male'}, "+
						 "{soreness: 3, movements: ['high','low'], part: 'glutes', goal: 'Tone', gender: 'male'}, "+
						 "{soreness: 1, movements: ['high','medium','medium','low'], part: 'glutes', goal: 'Tone', gender: 'female'}, "+
						 "{soreness: 2, movements: ['high','medium','low'], part: 'glutes', goal: 'Tone', gender: 'female'}, "+
						 "{soreness: 3, movements: ['high', 'low'], part: 'glutes', goal: 'Tone', gender: 'female'}, "+
						 "{soreness: 1, movements: ['high', 'superset','high','superset', 'medium','low'], part: 'glutes', goal: 'Bigger', gender: 'male'}, "+
						 "{soreness: 2, movements: ['high', 'superset','medium','superset', 'low','low'], part: 'glutes', goal: 'Bigger', gender: 'male'}, "+
						 "{soreness: 3, movements: ['high', 'superset','medium','superset', 'low','low'], part: 'glutes', goal: 'Bigger', gender: 'male'}, "+
						 "{soreness: 1, movements: ['high', 'superset', 'medium','low'], part: 'glutes', goal: 'Bigger', gender: 'female'}, "+
						 "{soreness: 2, movements: ['high', 'superset','medium','superset', 'low','low'], part: 'glutes', goal: 'Bigger', gender: 'female'}, "+
						 "{soreness: 3, movements: ['high', 'superset', 'medium','low'], part: 'glutes', goal: 'Bigger', gender: 'female'}, "+
						 "{soreness: 1, movements: ['medium','low','low','low', 'low'], part: 'back', goal: 'Smaller', gender: 'male'}, "+
						 "{soreness: 2, movements: ['medium','low','low','low'], part: 'back', goal: 'Smaller', gender: 'male'}, "+
						 "{soreness: 3, movements: ['medium','low','low'], part: 'back', goal: 'Smaller', gender: 'male'}, "+
						 "{soreness: 1, movements: ['medium','low','low','low', 'low'], part: 'back', goal: 'Smaller', gender: 'female'}, "+
						 "{soreness: 2, movements: ['medium','low','low','low'], part: 'back', goal: 'Smaller', gender: 'female'}, "+
						 "{soreness: 3, movements: ['medium','low','low'], part: 'back', goal: 'Smaller', gender: 'female'}, "+
						 "{soreness: 1, movements: ['medium', 'superset','medium','medium'], part: 'back', goal: 'Tone', gender: 'male'}, "+
						 "{soreness: 2, movements: ['high','medium','medium'], part: 'back', goal: 'Tone', gender: 'male'}, "+
						 "{soreness: 3, movements: ['medium','medium','low'], part: 'back', goal: 'Tone', gender: 'male'}, "+
						 "{soreness: 1, movements: ['medium', 'superset','medium','medium'], part: 'back', goal: 'Tone', gender: 'female'}, "+
						 "{soreness: 2, movements: ['high','medium','medium'], part: 'back', goal: 'Tone', gender: 'female'}, "+
						 "{soreness: 3, movements: ['medium','medium','low'], part: 'back', goal: 'Tone', gender: 'female'}, "+
						 "{soreness: 1, movements: ['high','superset','high','superset','medium'], part: 'back', goal: 'Bigger', gender: 'male'}, "+
						 "{soreness: 2, movements: ['high','superset','medium','superset','low'], part: 'back', goal: 'Bigger', gender: 'male'}, "+
						 "{soreness: 3, movements: ['medium','superset','medium','superset','low'], part: 'back', goal: 'Bigger', gender: 'male'}, "+
						 "{soreness: 1, movements: ['high','superset','high','superset','low'], part: 'back', goal: 'Bigger', gender: 'female'}, "+
						 "{soreness: 2, movements: ['high','superset','medium','superset','low'], part: 'back', goal: 'Bigger', gender: 'female'}, "+
						 "{soreness: 3, movements: ['medium','superset','low','superset','low'], part: 'back', goal: 'Bigger', gender: 'female'}, "+
						 "{soreness: 1, movements: ['medium','low','low','low'], part: 'hamstrings', goal: 'Smaller', gender: 'male'}, "+
						 "{soreness: 2, movements: ['low','low','low','low'], part: 'hamstrings', goal: 'Smaller', gender: 'male'}, "+
						 "{soreness: 3, movements: ['low','low','low'], part: 'hamstrings', goal: 'Smaller', gender: 'male'}, "+
						 "{soreness: 1, movements: ['medium','low','low','low'], part: 'hamstrings', goal: 'Smaller', gender: 'female'}, "+
						 "{soreness: 2, movements: ['low','low','low','low'], part: 'hamstrings', goal: 'Smaller', gender: 'female'}, "+
						 "{soreness: 3, movements: ['low','low'], part: 'hamstrings', goal: 'Smaller', gender: 'female'}, "+
						 "{soreness: 1, movements: ['high','medium','medium','low'], part: 'hamstrings', goal: 'Tone', gender: 'male'}, "+
						 "{soreness: 2, movements: ['medium','medium','low','low'], part: 'hamstrings', goal: 'Tone', gender: 'male'}, "+
						 "{soreness: 3, movements: ['medium','low'], part: 'hamstrings', goal: 'Tone', gender: 'male'}, "+
						 "{soreness: 1, movements: ['high','medium','medium','low'], part: 'hamstrings', goal: 'Tone', gender: 'female'}, "+
						 "{soreness: 2, movements: ['medium','medium','low','low'], part: 'hamstrings', goal: 'Tone', gender: 'female'}, "+
						 "{soreness: 3, movements: ['medium','low'], part: 'hamstrings', goal: 'Tone', gender: 'female'}, "+
						 "{soreness: 1, movements: ['high','superset','high'], part: 'hamstrings', goal: 'Bigger', gender: 'male'}, "+
						 "{soreness: 2, movements: ['high','superset','medium'], part: 'hamstrings', goal: 'Bigger', gender: 'male'}, "+
						 "{soreness: 3, movements: ['high','superset'], part: 'hamstrings', goal: 'Bigger', gender: 'male'}, "+
						 "{soreness: 1, movements: ['high','superset','high'], part: 'hamstrings', goal: 'Bigger', gender: 'female'}, "+
						 "{soreness: 2, movements: ['high','superset','medium'], part: 'hamstrings', goal: 'Bigger', gender: 'female'}, "+
						 "{soreness: 3, movements: ['high','superset'], part: 'hamstrings', goal: 'Bigger', gender: 'female'}, "+
						 "{soreness: 1, movements: ['medium','low','low'], part: 'calves', goal: 'Smaller', gender: 'male'}, "+
						 "{soreness: 2, movements: ['low','low','low'], part: 'calves', goal: 'Smaller', gender: 'male'}, "+
						 "{soreness: 3, movements: ['low','low'], part: 'calves', goal: 'Smaller', gender: 'male'}, "+
						 "{soreness: 1, movements: ['medium','low','low'], part: 'calves', goal: 'Smaller', gender: 'female'}, "+
						 "{soreness: 2, movements: ['low','low','low'], part: 'calves', goal: 'Smaller', gender: 'female'}, "+
						 "{soreness: 3, movements: ['low', 'low'], part: 'calves', goal: 'Smaller', gender: 'female'}, "+
						 "{soreness: 1, movements: ['medium','medium','low'], part: 'calves', goal: 'Tone', gender: 'male'}, "+
						 "{soreness: 2, movements: ['medium','low','low'], part: 'calves', goal: 'Tone', gender: 'male'}, "+
						 "{soreness: 3, movements: ['medium','low'], part: 'calves', goal: 'Tone', gender: 'male'}, "+
						 "{soreness: 1, movements: ['medium','medium','low'], part: 'calves', goal: 'Tone', gender: 'female'}, "+
						 "{soreness: 2, movements: ['medium','low','low'], part: 'calves', goal: 'Tone', gender: 'female'}, "+
						 "{soreness: 3, movements: ['medium','low'], part: 'calves', goal: 'Tone', gender: 'female'}, "+
						 "{soreness: 1, movements: ['high','superset','medium'], part: 'calves', goal: 'Bigger', gender: 'male'}, "+
						 "{soreness: 2, movements: ['high','superset'], part: 'calves', goal: 'Bigger', gender: 'male'}, "+
						 "{soreness: 3, movements: ['high'], part: 'calves', goal: 'Bigger', gender: 'male'}, "+
						 "{soreness: 1, movements: ['high','superset','low'], part: 'calves', goal: 'Bigger', gender: 'female'}, "+
						 "{soreness: 2, movements: ['high','superset'], part: 'calves', goal: 'Bigger', gender: 'female'}, "+
						 "{soreness: 3, movements: ['high'], part: 'calves', goal: 'Bigger', gender: 'female'}, "+
						 "{soreness: 1, movements: ['medium','low','low'], part: 'biceps', goal: 'Smaller', gender: 'male'}, "+
						 "{soreness: 2, movements: ['low','low','low'], part: 'biceps', goal: 'Smaller', gender: 'male'}, "+
						 "{soreness: 3, movements: ['low','low'], part: 'biceps', goal: 'Smaller', gender: 'male'}, "+
						 "{soreness: 1, movements: ['medium','low','low'], part: 'biceps', goal: 'Smaller', gender: 'female'}, "+
						 "{soreness: 2, movements: ['low','low','low'], part: 'biceps', goal: 'Smaller', gender: 'female'}, "+
						 "{soreness: 3, movements: ['low','low'], part: 'biceps', goal: 'Smaller', gender: 'female'}, "+
						 "{soreness: 1, movements: ['high','medium','medium'], part: 'biceps', goal: 'Tone', gender: 'male'}, "+
						 "{soreness: 2, movements: ['high','medium','low'], part: 'biceps', goal: 'Tone', gender: 'male'}, "+
						 "{soreness: 3, movements: ['high','low'], part: 'biceps', goal: 'Tone', gender: 'male'}, "+
						 "{soreness: 1, movements: ['high','medium','medium'], part: 'biceps', goal: 'Tone', gender: 'female'}, "+
						 "{soreness: 2, movements: ['high','medium','low'], part: 'biceps', goal: 'Tone', gender: 'female'}, "+
						 "{soreness: 3, movements: ['medium','low'], part: 'biceps', goal: 'Tone', gender: 'female'}, "+
						 "{soreness: 1, movements: ['high','superset','high'], part: 'biceps', goal: 'Bigger', gender: 'male'}, "+
						 "{soreness: 2, movements: ['high','superset','low'], part: 'biceps', goal: 'Bigger', gender: 'male'}, "+
						 "{soreness: 3, movements: ['medium','superset'], part: 'biceps', goal: 'Bigger', gender: 'male'}, "+
						 "{soreness: 1, movements: ['high','superset','high'], part: 'biceps', goal: 'Bigger', gender: 'female'}, "+
						 "{soreness: 2, movements: ['high','superset','low'], part: 'biceps', goal: 'Bigger', gender: 'female'}, "+
						 "{soreness: 3, movements: ['medium','superset'], part: 'biceps', goal: 'Bigger', gender: 'female'}, "+
						  "{soreness: 1, movements: ['medium','low','low','low'], part: 'quads', goal: 'Smaller', gender: 'male'}, "+
						 "{soreness: 2, movements: ['low','low','low','low'], part: 'quads', goal: 'Smaller', gender: 'male'}, "+
						 "{soreness: 3, movements: ['low','low','low'], part: 'quads', goal: 'Smaller', gender: 'male'}, "+
						 "{soreness: 1, movements: ['medium','low','low','low'], part: 'quads', goal: 'Smaller', gender: 'female'}, "+
						 "{soreness: 2, movements: ['low','low','low','low'], part: 'quads', goal: 'Smaller', gender: 'female'}, "+
						 "{soreness: 3, movements: ['low','low','low'], part: 'quads', goal: 'Smaller', gender: 'female'}, "+
						 "{soreness: 1, movements: ['high','high','medium','medium'], part: 'quads', goal: 'Tone', gender: 'male'}, "+
						 "{soreness: 2, movements: ['high','medium','medium','low'], part: 'quads', goal: 'Tone', gender: 'male'}, "+
						 "{soreness: 3, movements: ['medium','medium','low'], part: 'quads', goal: 'Tone', gender: 'male'}, "+
						 "{soreness: 1, movements: ['high','high','medium','medium'], part: 'quads', goal: 'Tone', gender: 'female'}, "+
						 "{soreness: 2, movements: ['high','medium','medium'], part: 'quads', goal: 'Tone', gender: 'female'}, "+
						 "{soreness: 3, movements: ['medium','medium','low'], part: 'quads', goal: 'Tone', gender: 'female'}, "+
						 "{soreness: 1, movements: ['high','superset','high','superset','low'], part: 'quads', goal: 'Bigger', gender: 'male'}, "+
						 "{soreness: 2, movements: ['high','superset','medium','superset'], part: 'quads', goal: 'Bigger', gender: 'male'}, "+
						 "{soreness: 3, movements: ['medium','superset','medium'], part: 'quads', goal: 'Bigger', gender: 'male'}, "+
						 "{soreness: 1, movements: ['high','superset','high','superset','low'], part: 'quads', goal: 'Bigger', gender: 'female'}, "+
						 "{soreness: 2, movements: ['high','superset','medium','superset'], part: 'quads', goal: 'Bigger', gender: 'female'}, "+
						 "{soreness: 3, movements: ['medium','superset','medium'], part: 'quads', goal: 'Bigger', gender: 'female'}, "+
						  "{soreness: 1, movements: ['medium','medium','low'], part: 'triceps', goal: 'Smaller', gender: 'male'}, "+
						 "{soreness: 2, movements: ['medium','low','low'], part: 'triceps', goal: 'Smaller', gender: 'male'}, "+
						 "{soreness: 3, movements: ['low','low','low'], part: 'triceps', goal: 'Smaller', gender: 'male'}, "+
						 "{soreness: 1, movements: ['medium','medium','low'], part: 'triceps', goal: 'Smaller', gender: 'female'}, "+
						 "{soreness: 2, movements: ['medium','low','low'], part: 'triceps', goal: 'Smaller', gender: 'female'}, "+
						 "{soreness: 3, movements: ['low','low','low'], part: 'triceps', goal: 'Smaller', gender: 'female'}, "+
						 "{soreness: 1, movements: ['high','medium','low'], part: 'triceps', goal: 'Tone', gender: 'male'}, "+
						 "{soreness: 2, movements: ['high','low','low'], part: 'triceps', goal: 'Tone', gender: 'male'}, "+
						 "{soreness: 3, movements: ['high','low'], part: 'triceps', goal: 'Tone', gender: 'male'}, "+
						 "{soreness: 1, movements: ['high','medium','low'], part: 'triceps', goal: 'Tone', gender: 'female'}, "+
						 "{soreness: 2, movements: ['high','low','low'], part: 'triceps', goal: 'Tone', gender: 'female'}, "+
						 "{soreness: 3, movements: ['medium','low'], part: 'triceps', goal: 'Tone', gender: 'female'}, "+
						 "{soreness: 1, movements: ['high','superset','medium'], part: 'triceps', goal: 'Bigger', gender: 'male'}, "+
						 "{soreness: 2, movements: ['high','superset'], part: 'triceps', goal: 'Bigger', gender: 'male'}, "+
						 "{soreness: 3, movements: ['medium','superset'], part: 'triceps', goal: 'Bigger', gender: 'male'}, "+
						 "{soreness: 1, movements: ['high','superset','medium'], part: 'triceps', goal: 'Bigger', gender: 'female'}, "+
						 "{soreness: 2, movements: ['high','superset'], part: 'triceps', goal: 'Bigger', gender: 'female'}, "+
						 "{soreness: 3, movements: ['medium','superset'], part: 'triceps', goal: 'Bigger', gender: 'female'}, "+
						 "{soreness: 1, movements: ['medium','low','low'], part: 'shoulders', goal: 'Smaller', gender: 'male'}, "+
						 "{soreness: 2, movements: ['low','low','low'], part: 'shoulders', goal: 'Smaller', gender: 'male'}, "+
						 "{soreness: 3, movements: ['low','low'], part: 'shoulders', goal: 'Smaller', gender: 'male'}, "+
						 "{soreness: 1, movements: ['medium','low','low'], part: 'shoulders', goal: 'Smaller', gender: 'female'}, "+
						 "{soreness: 2, movements: ['low','low','low'], part: 'shoulders', goal: 'Smaller', gender: 'female'}, "+
						 "{soreness: 3, movements: ['low','low'], part: 'shoulders', goal: 'Smaller', gender: 'female'}, "+
						 "{soreness: 1, movements: ['high','medium','low'], part: 'shoulders', goal: 'Tone', gender: 'male'}, "+
						 "{soreness: 2, movements: ['high','medium'], part: 'shoulders', goal: 'Tone', gender: 'male'}, "+
						 "{soreness: 3, movements: ['medium','medium'], part: 'shoulders', goal: 'Tone', gender: 'male'}, "+
						 "{soreness: 1, movements: ['high','medium','low'], part: 'shoulders', goal: 'Tone', gender: 'female'}, "+
						 "{soreness: 2, movements: ['high','medium'], part: 'shoulders', goal: 'Tone', gender: 'female'}, "+
						 "{soreness: 3, movements: ['medium','medium'], part: 'shoulders', goal: 'Tone', gender: 'female'}, "+
						 "{soreness: 1, movements: ['high','superset','high','superset'], part: 'shoulders', goal: 'Bigger', gender: 'male'}, "+
						 "{soreness: 2, movements: ['high','superset','medium','low'], part: 'shoulders', goal: 'Bigger', gender: 'male'}, "+
						 "{soreness: 3, movements: ['medium','superset','low'], part: 'shoulders', goal: 'Bigger', gender: 'male'}, "+
						 "{soreness: 1, movements: ['high','superset','high','superset'], part: 'shoulders', goal: 'Bigger', gender: 'female'}, "+
						 "{soreness: 2, movements: ['high','superset','medium','low'], part: 'shoulders', goal: 'Bigger', gender: 'female'}, "+
						 "{soreness: 3, movements: ['medium','superset','low'], part: 'shoulders', goal: 'Bigger', gender: 'female'}, "+
						  "{soreness: 1, movements: ['medium','medium','low'], part: 'chest', goal: 'Smaller', gender: 'male'}, "+
						 "{soreness: 2, movements: ['medium','low','low'], part: 'chest', goal: 'Smaller', gender: 'male'}, "+
						 "{soreness: 3, movements: ['medium','low'], part: 'chest', goal: 'Smaller', gender: 'male'}, "+
						 "{soreness: 1, movements: ['medium','medium','low'], part: 'chest', goal: 'Smaller', gender: 'female'}, "+
						 "{soreness: 2, movements: ['medium','low','low'], part: 'chest', goal: 'Smaller', gender: 'female'}, "+
						 "{soreness: 3, movements: ['medium','low'], part: 'chest', goal: 'Smaller', gender: 'female'}, "+
						 "{soreness: 1, movements: ['high','medium','medium'], part: 'chest', goal: 'Tone', gender: 'male'}, "+
						 "{soreness: 2, movements: ['high','medium','low'], part: 'chest', goal: 'Tone', gender: 'male'}, "+
						 "{soreness: 3, movements: ['medium','medium','low'], part: 'chest', goal: 'Tone', gender: 'male'}, "+
						 "{soreness: 1, movements: ['high','medium','medium'], part: 'chest', goal: 'Tone', gender: 'female'}, "+
						 "{soreness: 2, movements: ['high','medium','low'], part: 'chest', goal: 'Tone', gender: 'female'}, "+
						 "{soreness: 3, movements: ['medium','medium','low'], part: 'chest', goal: 'Tone', gender: 'female'}, "+
						 "{soreness: 1, movements: ['high','superset','high','superset','medium'], part: 'chest', goal: 'Bigger', gender: 'male'}, "+
						 "{soreness: 2, movements: ['high','superset','high','superset','low'], part: 'chest', goal: 'Bigger', gender: 'male'}, "+
						 "{soreness: 3, movements: ['medium','superset','medium','superset'], part: 'chest', goal: 'Bigger', gender: 'male'}, "+
						 "{soreness: 1, movements: ['high','superset','high','superset','medium'], part: 'chest', goal: 'Bigger', gender: 'female'}, "+
						 "{soreness: 2, movements: ['high','superset','high','superset','low'], part: 'chest', goal: 'Bigger', gender: 'female'}, "+
						 "{soreness: 3, movements: ['medium','superset','medium','superset'], part: 'chest', goal: 'Bigger', gender: 'female'} "+
						
"]";

