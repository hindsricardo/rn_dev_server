import jwt from 'jsonwebtoken';
import uuid from 'node-uuid';
const uuidV4 = require('uuid');
export const frameworks = "["+
						 "{gender: 'female', part: 'core', goal: 'Smaller', calorie: -500, protein:.23, fat:.25, carbs:.52, meals:5 }, "+
						 "{gender: 'female', part: 'core', goal: 'Tone', calorie: 0, protein:.23, fat:.25, carbs:.52, meals:4 }, "+
						 //"{gender: 'female', part: 'core', goal: 'Bigger'}, "+ 
						 "{gender: 'male', part: 'core', goal: 'Smaller', calorie: -500, protein:.25, fat:.25, carbs:.50, meals:5}, "+
						 "{gender: 'male', part: 'core', goal: 'Tone', calorie: 0, protein:.25, fat:.25, carbs:.50, meals:4 }, "+
						 //"{gender: 'male', part: 'core', goal: 'Bigger'}, "+
						 "{gender: 'female', part: 'glutes', goal: 'Smaller', calorie: -500, protein:.24, fat:.25, carbs:.51, meals:4 }, "+
						 "{gender: 'female', part: 'glutes', goal: 'Tone', calorie: 0, protein:.24, fat:.25, carbs:.51, meals:4 }, "+
						 "{gender: 'female', part: 'glutes', goal: 'Bigger', calorie: 500, protein:.24, fat:.25, carbs:.51, meals:5 }, "+
						 "{gender: 'male', part: 'glutes', goal: 'Smaller', calorie: -500, protein:.24, fat:.25, carbs:.51, meals:5}, "+
						 "{gender: 'male', part: 'glutes', goal: 'Tone'}, "+
						 "{gender: 'male', part: 'glutes', goal: 'Bigger'}, "+
						 "{gender: 'female', part: 'back', goal: 'Smaller'}, "+
						 "{gender: 'female', part: 'back', goal: 'Tone'}, "+
						 "{gender: 'female', part: 'back', goal: 'Bigger'}, "+
						 "{gender: 'male', part: 'back', goal: 'Smaller'}, "+
						 "{gender: 'male', part: 'back', goal: 'Tone'}, "+
						 "{gender: 'male', part: 'back', goal: 'Bigger'}, "+
						 "{gender: 'female', part: 'legs', goal: 'Smaller'}, "+
						 "{gender: 'female', part: 'legs', goal: 'Tone'}, "+
						 "{gender: 'female', part: 'legs', goal: 'Bigger'}, "+
						 "{gender: 'male', part: 'legs', goal: 'Smaller'}, "+
						 "{gender: 'male', part: 'legs', goal: 'Tone'}, "+
						 "{gender: 'male', part: 'legs', goal: 'Bigger'}, "+
						 "{gender: 'female', part: 'biceps', goal: 'Smaller'}, "+
						 "{gender: 'female', part: 'biceps', goal: 'Tone'}, "+
						 "{gender: 'female', part: 'biceps', goal: 'Bigger'}, "+
						 "{gender: 'male', part: 'biceps', goal: 'Smaller'}, "+
						 "{gender: 'male', part: 'biceps', goal: 'Tone'}, "+
						 "{gender: 'male', part: 'biceps', goal: 'Bigger'}, "+
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
									