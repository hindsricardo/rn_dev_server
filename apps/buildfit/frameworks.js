import jwt from 'jsonwebtoken';
import uuid from 'node-uuid';
const uuidV4 = require('uuid');
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
									