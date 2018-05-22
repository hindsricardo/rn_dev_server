import jwt from 'jsonwebtoken';
import uuid from 'node-uuid';
const uuidV4 = require('uuid');

export const secret = 'lukeiamyourfather'; 


export const patterns = "["+
						 "{soreness: '1', movements: ['high','high', 'high'], focus: ['abs','abs', 'abs'], part: 'core', goal: 'Smaller', gender: 'male', priority:'1'}, "+
						 "{soreness: '2', movements: ['high','high'], focus: ['abs','abs'], part: 'core', goal: 'Smaller', gender: 'male', priority:'1'}, "+
						 "{soreness: '3', movements: ['medium'], focus: ['abs'], part: 'core', goal: 'Smaller', gender: 'male', priority:'1'}, "+
						 "{soreness: '1', movements: ['high','high', 'high'], focus: ['abs','abs', 'abs'],  part: 'core', goal: 'Smaller', gender: 'female', priority:'1'}, "+
						 "{soreness: '2', movements: ['high','medium'], focus: ['abs','abs'], part: 'core', goal: 'Smaller', gender: 'female', priority:'1'}, "+
						 "{soreness: '3', movements: ['medium'], focus: ['abs'], part: 'core', goal: 'Smaller', gender: 'female', priority:'1'}, "+
						 "{soreness: '1', movements: ['high', 'high'], focus: ['abs','abs'], part: 'core', goal: 'Tone', gender: 'male', priority:'1'}, "+
						 "{soreness: '2', movements: ['medium','medium'], focus: ['abs','abs'], part: 'core', goal: 'Tone', gender: 'male', priority:'1'}, "+
						 "{soreness: '3', movements: ['low'], focus: ['abs'], part: 'core', goal: 'Tone', gender: 'male', priority:'1'}, "+
						 "{soreness: '1', movements: ['high','high'], focus: ['abs','abs'], part: 'core', goal: 'Tone', gender: 'female', priority:'1'}, "+
						 "{soreness: '2', movements: ['medium', 'medium'], focus: ['abs','abs'], part: 'core', goal: 'Tone', gender: 'female', priority:'1'}, "+
						 "{soreness: '3', movements: ['low'], focus: ['abs'], part: 'core', goal: 'Tone', gender: 'female', priority:'1'}, "+
						 "{soreness: '1', movements: ['medium','medium','medium','low'], focus: ['glute-all', 'glute-all', 'glute-all'], part: 'glutes', goal: 'Smaller', gender: 'male', priority:'1'}, "+
						 "{soreness: '2', movements: ['medium','superset','low'], focus: ['glute-all', 'glute-all', 'glute-all'], part: 'glutes', goal: 'Smaller', gender: 'male', priority:'1'}, "+
						 "{soreness: '3', movements: ['medium','medium','low'], focus: ['glute-all', 'glute-all', 'glute-all'], part: 'glutes', goal: 'Smaller', gender: 'male', priority:'1'}, "+
						 "{soreness: '1', movements: ['medium','medium','medium','low'], focus: ['glute-all', 'glute-all', 'glute-all', 'glute-side'], part: 'glutes', goal: 'Smaller', gender: 'female', priority:'1'}, "+
						 "{soreness: '2', movements: ['medium','medium','low'], focus: ['glute-all', 'glute-all', 'glute-side'], part: 'glutes', goal: 'Smaller', gender: 'female', priority:'1'}, "+
						 "{soreness: '3', movements: ['medium','medium','low'], focus: ['glute-all', 'glute-side', 'glute-all'], part: 'glutes', goal: 'Smaller', gender: 'female', priority:'1'}, "+
						 "{soreness: '1', movements: ['high','medium','medium','low'], focus: ['glute-all', 'glute-side', 'glute-all', 'glute-upper'], part: 'glutes', goal: 'Tone', gender: 'male', priority:'1'}, "+
						 "{soreness: '2', movements: ['high','medium','low'], focus: ['glute-all', 'glute-side', 'glute-upper'], part: 'glutes', goal: 'Tone', gender: 'male', priority:'1'}, "+
						 "{soreness: '3', movements: ['high','low'], focus: ['glute-all', 'glute-side'], part: 'glutes', goal: 'Tone', gender: 'male', priority:'1'}, "+
						 "{soreness: '1', movements: ['high','medium','medium','low'], focus: ['glute-all', 'glute-side', 'glute-all', 'glute-upper'], part: 'glutes', goal: 'Tone', gender: 'female', priority:'1'}, "+
						 "{soreness: '2', movements: ['high','medium','low'], focus: ['glute-all', 'glute-side', 'glute-upper'], part: 'glutes', goal: 'Tone', gender: 'female', priority:'1'}, "+
						 "{soreness: '3', movements: ['high', 'low'], focus: ['glute-all', 'glute-side'], part: 'glutes', goal: 'Tone', gender: 'female', priority:'1'}, "+
						 "{soreness: '1', movements: ['high', 'superset','medium','superset', 'medium'], focus: ['glute-all', 'glute-side', 'glute-all', 'glute-upper','glute-side'], part: 'glutes', goal: 'Bigger', gender: 'male', priority:'1'}, "+
						 "{soreness: '2', movements: ['medium', 'superset','medium','superset'], focus: ['glute-all', 'glute-all', 'glute-side', 'glute-side'], part: 'glutes', goal: 'Bigger', gender: 'male', priority:'1'}, "+
						 "{soreness: '3', movements: ['medium', 'superset','low','superset'], focus: ['glute-all', 'glute-all', 'glute-side', 'glute-side'], part: 'glutes', goal: 'Bigger', gender: 'male', priority:'1'}, "+
						 "{soreness: '1', movements: ['high', 'medium', 'superset','medium','superset','low'], focus: ['glute-all', 'glute-all', 'glute-side', 'glute-side', 'glute-upper'], part: 'glutes', goal: 'Bigger', gender: 'female', priority:'1'}, "+
						 "{soreness: '2', movements: ['medium', 'superset','medium','superset'], focus: ['glute-all', 'glute-all', 'glute-side', 'glute-side'], part: 'glutes', goal: 'Bigger', gender: 'female', priority:'1'}, "+
						 "{soreness: '3', movements: ['medium', 'superset', 'low','superset'], focus: ['glute-all', 'glute-all', 'glute-side', 'glute-side'], part: 'glutes', goal: 'Bigger', gender: 'female', priority:'1'}, "+
						 "{soreness: '1', movements: ['medium','low','low','low', 'low'], part: 'back', goal: 'Smaller', gender: 'male', priority:'1'}, "+
						 "{soreness: '2', movements: ['medium','low','low','low'], part: 'back', goal: 'Smaller', gender: 'male', priority:'1'}, "+
						 "{soreness: '3', movements: ['medium','low','low'], part: 'back', goal: 'Smaller', gender: 'male', priority:'1'}, "+
						 "{soreness: '1', movements: ['medium','low','low','low', 'low'], part: 'back', goal: 'Smaller', gender: 'female', priority:'1'}, "+
						 "{soreness: '2', movements: ['medium','low','low','low'], part: 'back', goal: 'Smaller', gender: 'female', priority:'1'}, "+
						 "{soreness: '3', movements: ['medium','low','low'], part: 'back', goal: 'Smaller', gender: 'female', priority:'1'}, "+
						 "{soreness: '1', movements: ['medium', 'superset','medium','medium'], part: 'back', goal: 'Tone', gender: 'male', priority:'1'}, "+
						 "{soreness: '2', movements: ['high','medium','medium'], part: 'back', goal: 'Tone', gender: 'male', priority:'1'}, "+
						 "{soreness: '3', movements: ['medium','medium','low'], part: 'back', goal: 'Tone', gender: 'male', priority:'1'}, "+
						 "{soreness: '1', movements: ['medium', 'superset','medium','medium'], part: 'back', goal: 'Tone', gender: 'female', priority:'1'}, "+
						 "{soreness: '2', movements: ['high','medium','medium'], part: 'back', goal: 'Tone', gender: 'female', priority:'1'}, "+
						 "{soreness: '3', movements: ['medium','medium','low'], part: 'back', goal: 'Tone', gender: 'female', priority:'1'}, "+
						 "{soreness: '1', movements: ['high','superset','medium','superset','medium'], part: 'back', goal: 'Bigger', gender: 'male', priority:'1'}, "+
						 "{soreness: '2', movements: ['medium','superset','medium','superset'], part: 'back', goal: 'Bigger', gender: 'male', priority:'1'}, "+
						 "{soreness: '3', movements: ['low','superset'], part: 'back', goal: 'Bigger', gender: 'male', priority:'1'}, "+ 
						 "{soreness: '1', movements: ['high','superset','medium','superset','low'], part: 'back', goal: 'Bigger', gender: 'female', priority:'1'}, "+
						 "{soreness: '2', movements: ['medium','superset','medium','superset'], part: 'back', goal: 'Bigger', gender: 'female', priority:'1'}, "+
						 "{soreness: '3', movements: ['medium','superset'], part: 'back', goal: 'Bigger', gender: 'female', priority:'1'}, "+
						 "{soreness: '1', movements: ['medium','low','low','low'], focus:['quads', 'quads', 'hamstrings', 'calves'], part: 'legs', goal: 'Smaller', gender: 'male', priority:'1'}, "+
						 "{soreness: '2', movements: ['low','low','low','low'], focus:['quads', 'quads', 'hamstrings', 'calves'], part: 'legs', goal: 'Smaller', gender: 'male', priority:'1'}, "+
						 "{soreness: '3', movements: ['low','low','low'], focus:['quads', 'hamstrings', 'calves'], part: 'legs', goal: 'Smaller', gender: 'male', priority:'1'}, "+
						 "{soreness: '1', movements: ['medium','low','low','low'], focus:['quads', 'quads', 'hamstrings', 'calves'], part: 'legs', goal: 'Smaller', gender: 'female', priority:'1'}, "+
						 "{soreness: '2', movements: ['low','low','low','low'], focus:['quads', 'quads', 'hamstrings', 'calves'], part: 'legs', goal: 'Smaller', gender: 'female', priority:'1'}, "+
						 "{soreness: '3', movements: ['low','low'], focus:['quads', 'hamstrings'], part: 'legs', goal: 'Smaller', gender: 'female', priority:'1'}, "+
						 "{soreness: '1', movements: ['high','medium','medium','low'], focus:['quads', 'hamstrings', 'calves', 'calves'], part: 'legs', goal: 'Tone', gender: 'male', priority:'1'}, "+
						 "{soreness: '2', movements: ['medium','medium','low','low'], focus:['quads', 'quads', 'hamstrings', 'calves'], part: 'legs', goal: 'Tone', gender: 'male', priority:'1'}, "+
						 "{soreness: '3', movements: ['medium','low'], focus:['quads', 'hamstrings'], part: 'legs', goal: 'Tone', gender: 'male', priority:'1'}, "+
						 "{soreness: '1', movements: ['high','medium','medium','low'], focus:['quads', 'quads', 'hamstrings', 'calves'], part: 'legs', goal: 'Tone', gender: 'female', priority:'1'}, "+
						 "{soreness: '2', movements: ['medium','medium','low','low'], focus:['quads', 'quads', 'hamstrings', 'calves'], part: 'legs', goal: 'Tone', gender: 'female', priority:'1'}, "+
						 "{soreness: '3', movements: ['medium','low','low','low'], focus:['hamstrings', 'quads', 'calves', 'calves'], part: 'legs', goal: 'Tone', gender: 'female', priority:'1'}, "+
						 "{soreness: '1', movements: ['high','superset','high','superset', 'high', 'calves'], focus:['quads', 'quads', 'hamstrings', 'hamstrings', 'calves', 'calves'], part: 'legs', goal: 'Bigger', gender: 'male', priority:'1'}, "+
						 "{soreness: '2', movements: ['medium','superset','medium', 'medium', 'medium'], focus:['quads', 'quads', 'hamstrings', 'hamstrings', 'calves'], part: 'legs', goal: 'Bigger', gender: 'male', priority:'1'}, "+
						 "{soreness: '3', movements: ['medium','superset','medium', 'medium'], focus:['quads', 'quads', 'hamstrings', 'calves'], part: 'legs', goal: 'Bigger', gender: 'male', priority:'1'}, "+
						 "{soreness: '1', movements: ['high','superset','medium','superset','medium', 'superset'], focus:['hamstrings', 'hamstrings', 'quads', 'quads','calves', 'calves'], part: 'legs', goal: 'Bigger', gender: 'female', priority:'1'}, "+
						 "{soreness: '2', movements: ['medium','superset','medium', 'superset', 'high'], focus:['hamstrings', 'hamstrings', 'quads', 'quads', 'calves'], part: 'legs', goal: 'Bigger', gender: 'female', priority:'1'}, "+
						 "{soreness: '3', movements: ['low','superset', 'low', 'low'], focus:['hamstrings', 'hamstrings', 'quads', 'calves'], part: 'legs', goal: 'Bigger', gender: 'female', priority:'1'}, "+
						 "{soreness: '1', movements: ['medium','low','low'], focus: ['all','all','all'], part: 'biceps', goal: 'Smaller', gender: 'male', priority:'1'}, "+
						 "{soreness: '2', movements: ['low','low','low'], focus: ['all','all','all'], part: 'biceps', goal: 'Smaller', gender: 'male', priority:'1'}, "+
						 "{soreness: '3', movements: ['low','low'], focus: ['all','all'], part: 'biceps', goal: 'Smaller', gender: 'male', priority:'1'}, "+
						 "{soreness: '1', movements: ['medium','low','low'], focus: ['all','all','all'], part: 'biceps', goal: 'Smaller', gender: 'female', priority:'1'}, "+
						 "{soreness: '2', movements: ['low','low','low'], focus: ['all','all','all'], part: 'biceps', goal: 'Smaller', gender: 'female', priority:'1'}, "+
						 "{soreness: '3', movements: ['low','low'], focus: ['all','all'], part: 'biceps', goal: 'Smaller', gender: 'female', priority:'1'}, "+
						 "{soreness: '1', movements: ['high','medium','medium'], focus: ['all','all','all'], part: 'biceps', goal: 'Tone', gender: 'male', priority:'1'}, "+
						 "{soreness: '2', movements: ['high','medium','low'], focus: ['all','all','all'], part: 'biceps', goal: 'Tone', gender: 'male', priority:'1'}, "+
						 "{soreness: '3', movements: ['high','low'], focus: ['all','all'], part: 'biceps', goal: 'Tone', gender: 'male', priority:'1'}, "+
						 "{soreness: '1', movements: ['high','medium','medium'], focus: ['all','all','all'], part: 'biceps', goal: 'Tone', gender: 'female', priority:'1'}, "+
						 "{soreness: '2', movements: ['high','medium','low'], focus: ['all','all','all'], part: 'biceps', goal: 'Tone', gender: 'female', priority:'1'}, "+
						 "{soreness: '3', movements: ['medium','low'], focus: ['all','all'], part: 'biceps', goal: 'Tone', gender: 'female', priority:'1'}, "+
						 "{soreness: '1', movements: ['high','superset','high'], focus: ['all','all','all'], part: 'biceps', goal: 'Bigger', gender: 'male', priority:'1'}, "+
						 "{soreness: '2', movements: ['high','superset','low'], focus: ['all','all','all'], part: 'biceps', goal: 'Bigger', gender: 'male', priority:'1'}, "+
						 "{soreness: '3', movements: ['medium','superset'], focus: ['all','all'], part: 'biceps', goal: 'Bigger', gender: 'male', priority:'1'}, "+
						 "{soreness: '1', movements: ['high','superset','high'], focus: ['all','all','all'], part: 'biceps', goal: 'Bigger', gender: 'female', priority:'1'}, "+
						 "{soreness: '2', movements: ['high','superset','low'], focus: ['all','all','all'], part: 'biceps', goal: 'Bigger', gender: 'female', priority:'1'}, "+
						 "{soreness: '3', movements: ['medium','superset'], focus: ['all','all'], part: 'biceps', goal: 'Bigger', gender: 'female', priority:'1'}, "+
						  "{soreness: '1', movements: ['medium','medium','low'], focus: ['all','all', 'all'], part: 'triceps', goal: 'Smaller', gender: 'male', priority:'1'}, "+
						 "{soreness: '2', movements: ['medium','low','low'], focus: ['all','all', 'all'], part: 'triceps', goal: 'Smaller', gender: 'male', priority:'1'}, "+
						 "{soreness: '3', movements: ['low','low','low'], focus: ['all','all', 'all'], part: 'triceps', goal: 'Smaller', gender: 'male', priority:'1'}, "+
						 "{soreness: '1', movements: ['medium','medium','low'], focus: ['all','all', 'all'], part: 'triceps', goal: 'Smaller', gender: 'female', priority:'1'}, "+
						 "{soreness: '2', movements: ['medium','low','low'], focus: ['all','all', 'all'], part: 'triceps', goal: 'Smaller', gender: 'female', priority:'1'}, "+
						 "{soreness: '3', movements: ['low','low','low'], focus: ['all','all', 'all'], part: 'triceps', goal: 'Smaller', gender: 'female', priority:'1'}, "+
						 "{soreness: '1', movements: ['high','medium','low'], focus: ['all','all', 'all'], part: 'triceps', goal: 'Tone', gender: 'male', priority:'1'}, "+
						 "{soreness: '2', movements: ['high','low','low'], focus: ['all','all', 'all'], part: 'triceps', goal: 'Tone', gender: 'male', priority:'1'}, "+
						 "{soreness: '3', movements: ['high','low'], focus: ['all','all'], part: 'triceps', goal: 'Tone', gender: 'male', priority:'1'}, "+
						 "{soreness: '1', movements: ['high','medium','low'], focus: ['all','all', 'all'], part: 'triceps', goal: 'Tone', gender: 'female', priority:'1'}, "+
						 "{soreness: '2', movements: ['high','low','low'], focus: ['all','all', 'all'], part: 'triceps', goal: 'Tone', gender: 'female', priority:'1'}, "+
						 "{soreness: '3', movements: ['medium','low'], focus: ['all','all'], part: 'triceps', goal: 'Tone', gender: 'female', priority:'1'}, "+
						 "{soreness: '1', movements: ['high','superset','medium'], focus: ['all','all', 'all'], part: 'triceps', goal: 'Bigger', gender: 'male', priority:'1'}, "+
						 "{soreness: '2', movements: ['high','superset'], focus: ['all','all'], part: 'triceps', goal: 'Bigger', gender: 'male', priority:'1'}, "+
						 "{soreness: '3', movements: ['medium','superset'], focus: ['all','all'], part: 'triceps', goal: 'Bigger', gender: 'male', priority:'1'}, "+
						 "{soreness: '1', movements: ['high','superset','medium'], focus: ['all','all', 'all'], part: 'triceps', goal: 'Bigger', gender: 'female', priority:'1'}, "+
						 "{soreness: '2', movements: ['high','superset'], focus: ['all','all'], part: 'triceps', goal: 'Bigger', gender: 'female', priority:'1'}, "+
						 "{soreness: '3', movements: ['medium','superset'], focus: ['all','all'], part: 'triceps', goal: 'Bigger', gender: 'female', priority:'1'}, "+
						 "{soreness: '1', movements: ['medium','low','low'], focus: ['front-shoulder', 'back-shoulder', 'front-shoulder'], part: 'shoulders', goal: 'Smaller', gender: 'male', priority:'1'}, "+
						 "{soreness: '2', movements: ['low','low','low'], focus: ['front-shoulder', 'back-shoulder', 'front-shoulder'], part: 'shoulders', goal: 'Smaller', gender: 'male', priority:'1'}, "+
						 "{soreness: '3', movements: ['low','low'], focus: ['front-shoulder', 'back-shoulder'], part: 'shoulders', goal: 'Smaller', gender: 'male', priority:'1'}, "+
						 "{soreness: '1', movements: ['medium','low','low'], focus: ['front-shoulder', 'back-shoulder', 'front-shoulder'], part: 'shoulders', goal: 'Smaller', gender: 'female', priority:'1'}, "+
						 "{soreness: '2', movements: ['low','low','low'], focus: ['front-shoulder', 'back-shoulder', 'front-shoulder'], part: 'shoulders', goal: 'Smaller', gender: 'female', priority:'1'}, "+
						 "{soreness: '3', movements: ['low','low'], focus: ['front-shoulder', 'back-shoulder'], part: 'shoulders', goal: 'Smaller', gender: 'female', priority:'1'}, "+
						 "{soreness: '1', movements: ['high','medium','low'], focus: ['front-shoulder', 'back-shoulder', 'front-shoulder'], part: 'shoulders', goal: 'Tone', gender: 'male', priority:'1'}, "+
						 "{soreness: '2', movements: ['high','medium'], focus: ['front-shoulder', 'back-shoulder'], part: 'shoulders', goal: 'Tone', gender: 'male', priority:'1'}, "+
						 "{soreness: '3', movements: ['medium','medium'], focus: ['front-shoulder', 'back-shoulder'], part: 'shoulders', goal: 'Tone', gender: 'male', priority:'1'}, "+
						 "{soreness: '1', movements: ['high','medium','low'], focus: ['front-shoulder', 'back-shoulder', 'front-shoulder'], part: 'shoulders', goal: 'Tone', gender: 'female', priority:'1'}, "+
						 "{soreness: '2', movements: ['high','medium'], focus: ['front-shoulder', 'back-shoulder'], part: 'shoulders', goal: 'Tone', gender: 'female', priority:'1'}, "+
						 "{soreness: '3', movements: ['medium','medium'], focus: ['front-shoulder', 'back-shoulder'], part: 'shoulders', goal: 'Tone', gender: 'female', priority:'1'}, "+
						 "{soreness: '1', movements: ['high','superset','high','superset'], focus: ['front-shoulder', 'back-shoulder', 'front-shoulder', 'back-shoulder'], part: 'shoulders', goal: 'Bigger', gender: 'male', priority:'1'}, "+
						 "{soreness: '2', movements: ['high','superset','medium','low'], focus: ['front-shoulder', 'back-shoulder', 'front-shoulder', 'back-shoulder'], part: 'shoulders', goal: 'Bigger', gender: 'male', priority:'1'}, "+
						 "{soreness: '3', movements: ['medium','superset','low'], focus: ['front-shoulder', 'back-shoulder', 'front-shoulder'], part: 'shoulders', goal: 'Bigger', gender: 'male', priority:'1'}, "+
						 "{soreness: '1', movements: ['high','superset','high','superset'], focus: ['front-shoulder', 'back-shoulder', 'front-shoulder', 'back-shoulder'], part: 'shoulders', goal: 'Bigger', gender: 'female', priority:'1'}, "+
						 "{soreness: '2', movements: ['high','superset','medium','low'], focus: ['front-shoulder', 'back-shoulder', 'front-shoulder', 'back-shoulder'], part: 'shoulders', goal: 'Bigger', gender: 'female', priority:'1'}, "+
						 "{soreness: '3', movements: ['medium','superset','low'], focus: ['front-shoulder', 'back-shoulder', 'front-shoulder'], part: 'shoulders', goal: 'Bigger', gender: 'female', priority:'1'}, "+
						  "{soreness: '1', movements: ['medium','medium','low'], part: 'chest', goal: 'Smaller', gender: 'male', priority:'1'}, "+
						 "{soreness: '2', movements: ['medium','low','low'], focus: ['chest-mid', 'chest-upper', 'chest-mid'], part: 'chest', goal: 'Smaller', gender: 'male', priority:'1'}, "+
						 "{soreness: '3', movements: ['medium','low'], focus: ['chest-mid', 'chest-upper'], part: 'chest', goal: 'Smaller', gender: 'male', priority:'1'}, "+
						 "{soreness: '1', movements: ['medium','medium','low'], focus: ['chest-mid', 'chest-upper', 'chest-mid'], part: 'chest', goal: 'Smaller', gender: 'female', priority:'1'}, "+
						 "{soreness: '2', movements: ['medium','low','low'], focus: ['chest-mid', 'chest-upper', 'chest-mid'], part: 'chest', goal: 'Smaller', gender: 'female', priority:'1'}, "+
						 "{soreness: '3', movements: ['medium','low'], focus: ['chest-mid', 'chest-upper'], part: 'chest', goal: 'Smaller', gender: 'female', priority:'1'}, "+
						 "{soreness: '1', movements: ['high','medium','medium'], focus: ['chest-mid', 'chest-upper', 'chest-mid'], part: 'chest', goal: 'Tone', gender: 'male', priority:'1'}, "+
						 "{soreness: '2', movements: ['high','medium','low'], focus: ['chest-mid', 'chest-upper', 'chest-mid'], part: 'chest', goal: 'Tone', gender: 'male', priority:'1'}, "+
						 "{soreness: '3', movements: ['medium','medium','low'], focus: ['chest-mid', 'chest-upper', 'chest-mid'], part: 'chest', goal: 'Tone', gender: 'male', priority:'1'}, "+
						 "{soreness: '1', movements: ['high','medium','medium'], focus: ['chest-mid', 'chest-upper', 'chest-mid'], part: 'chest', goal: 'Tone', gender: 'female', priority:'1'}, "+
						 "{soreness: '2', movements: ['high','medium','low'], focus: ['chest-mid', 'chest-upper', 'chest-mid'], part: 'chest', goal: 'Tone', gender: 'female', priority:'1'}, "+
						 "{soreness: '3', movements: ['medium','medium','low'], focus: ['chest-mid', 'chest-upper', 'chest-mid'], part: 'chest', goal: 'Tone', gender: 'female', priority:'1'}, "+
						 "{soreness: '1', movements: ['high','superset','high','superset'], focus: ['chest-mid', 'chest-upper', 'chest-mid', 'chest-lower'], part: 'chest', goal: 'Bigger', gender: 'male', priority:'1'}, "+
						 "{soreness: '2', movements: ['high','superset'], focus: ['chest-mid', 'chest-upper'], part: 'chest', goal: 'Bigger', gender: 'male', priority:'1'}, "+
						 "{soreness: '3', movements: ['medium','superset'], focus: ['chest-mid', 'chest-upper'], part: 'chest', goal: 'Bigger', gender: 'male', priority:'1'}, "+
						 "{soreness: '1', movements: ['high','superset','high','superset'], focus: ['chest-mid', 'chest-upper', 'chest-mid', 'chest-lower'], part: 'chest', goal: 'Bigger', gender: 'female', priority:'1'}, "+
						 "{soreness: '2', movements: ['high','superset'], focus: ['chest-mid', 'chest-upper'], part: 'chest', goal: 'Bigger', gender: 'female', priority:'1'}, "+
						 "{soreness: '3', movements: ['medium','superset'], focus: ['chest-mid', 'chest-upper'], part: 'chest', goal: 'Bigger', gender: 'female', priority:'1'}, "+
						 //PRIORITY'2'
						 "{soreness: '1', movements: ['high','high'], focus: ['abs','abs'], part: 'core', goal: 'Smaller', gender: 'male', priority:'2'}, "+
						 "{soreness: '2', movements: ['high'], focus: ['abs'], part: 'core', goal: 'Smaller', gender: 'male', priority:'2'}, "+
						 "{soreness: '3', movements: ['low'], focus: ['abs'], part: 'core', goal: 'Smaller', gender: 'male', priority:'2'}, "+
						 "{soreness: '1', movements: ['high','high'], focus: ['abs','abs'], part: 'core', goal: 'Smaller', gender: 'female', priority:'2'}, "+
						 "{soreness: '2', movements: ['high','low'], focus: ['abs','abs'], part: 'core', goal: 'Smaller', gender: 'female', priority:'2'}, "+
						 "{soreness: '3', movements: ['low'], focus: ['abs'], part: 'core', goal: 'Smaller', gender: 'female', priority:'2'}, "+
						 "{soreness: '1', movements: ['high', 'high'], focus: ['abs','abs'], part: 'core', goal: 'Tone', gender: 'male', priority:'2'}, "+
						 "{soreness: '2', movements: ['medium','medium'], focus: ['abs','abs'], part: 'core', goal: 'Tone', gender: 'male', priority:'2'}, "+
						 "{soreness: '3', movements: ['low'], focus: ['abs'], part: 'core', goal: 'Tone', gender: 'male', priority:'2'}, "+
						 "{soreness: '1', movements: ['high'], focus: ['abs'], part: 'core', goal: 'Tone', gender: 'female', priority:'2'}, "+
						 "{soreness: '2', movements: ['medium'], focus: ['abs'], part: 'core', goal: 'Tone', gender: 'female', priority:'2'}, "+
						 "{soreness: '3', movements: ['low'], focus: ['abs'], part: 'core', goal: 'Tone', gender: 'female', priority:'2'}, "+
						 "{soreness: '1', movements: ['medium','medium','low'], focus: ['glute-all', 'glute-all', 'glute-side'], part: 'glutes', goal: 'Smaller', gender: 'male', priority:'2'}, "+
						 "{soreness: '2', movements: ['medium','superset'], focus: ['glute-all', 'glute-all'],  part: 'glutes', goal: 'Smaller', gender: 'male', priority:'2'}, "+
						 "{soreness: '3', movements: ['medium'], focus: ['glute-all'], part: 'glutes', goal: 'Smaller', gender: 'male', priority:'2'}, "+
						 "{soreness: '1', movements: ['medium','low'], focus: ['glute-all', 'glute-all'], part: 'glutes', goal: 'Smaller', gender: 'female', priority:'2'}, "+
						 "{soreness: '2', movements: ['medium'], focus: ['glute-all'], part: 'glutes', goal: 'Smaller', gender: 'female', priority:'2'}, "+
						 "{soreness: '3', movements: ['low'], focus: ['glute-all'], part: 'glutes', goal: 'Smaller', gender: 'female', priority:'2'}, "+
						 "{soreness: '1', movements: ['medium','low'], focus: ['glute-all', 'glute-all'], part: 'glutes', goal: 'Tone', gender: 'male', priority:'2'}, "+
						 "{soreness: '2', movements: ['high'], focus: ['glute-all'], part: 'glutes', goal: 'Tone', gender: 'male', priority:'2'}, "+
						 "{soreness: '3', movements: ['medium'], focus: ['glute-all'], part: 'glutes', goal: 'Tone', gender: 'male', priority:'2'}, "+
						 "{soreness: '1', movements: ['medium','low','low'], focus: ['glute-all', 'glute-all', 'glute-side'], part: 'glutes', goal: 'Tone', gender: 'female', priority:'2'}, "+
						 "{soreness: '2', movements: ['medium','low'], focus: ['glute-all', 'glute-all'], part: 'glutes', goal: 'Tone', gender: 'female', priority:'2'}, "+
						 "{soreness: '3', movements: ['medium'], focus: ['glute-all'], part: 'glutes', goal: 'Tone', gender: 'female', priority:'2'}, "+
						 "{soreness: '1', movements: ['medium', 'superset','low','superset', 'medium'], focus: ['glute-all', 'glute-all', 'glute-side', 'glute-side', 'glute-upper'], part: 'glutes', goal: 'Bigger', gender: 'male', priority:'2'}, "+
						 "{soreness: '2', movements: ['medium', 'superset','low','superset'], focus: ['glute-all', 'glute-all', 'glute-side', 'glute-side'], part: 'glutes', goal: 'Bigger', gender: 'male', priority:'2'}, "+
						 "{soreness: '3', movements: ['medium', 'superset','low','superset'], focus: ['glute-all', 'glute-all', 'glute-side', 'glute-side'], part: 'glutes', goal: 'Bigger', gender: 'male', priority:'2'}, "+
						 "{soreness: '1', movements: ['medium', 'medium', 'superset','low','superset','low'], focus: ['glute-all', 'glute-all', 'glute-side', 'glute-side', 'glute-upper', 'glute-all'], part: 'glutes', goal: 'Bigger', gender: 'female', priority:'2'}, "+
						 "{soreness: '2', movements: ['medium', 'superset','low','superset'], focus: ['glute-all', 'glute-all', 'glute-side', 'glute-side'], part: 'glutes', goal: 'Bigger', gender: 'female', priority:'2'}, "+
						 "{soreness: '3', movements: ['medium', 'superset', 'low','superset'], focus: ['glute-all', 'glute-all', 'glute-side', 'glute-side'], part: 'glutes', goal: 'Bigger', gender: 'female', priority:'2'}, "+
						 "{soreness: '1', movements: ['medium','low','low','low', 'low'], part: 'back', goal: 'Smaller', gender: 'male', priority:'2'}, "+
						 "{soreness: '2', movements: ['medium','low','low','low'], part: 'back', goal: 'Smaller', gender: 'male', priority:'2'}, "+
						 "{soreness: '3', movements: ['medium','low','low'], part: 'back', goal: 'Smaller', gender: 'male', priority:'2'}, "+
						 "{soreness: '1', movements: ['medium','low','low','low', 'low'], part: 'back', goal: 'Smaller', gender: 'female', priority:'2'}, "+
						 "{soreness: '2', movements: ['medium','low','low','low'], part: 'back', goal: 'Smaller', gender: 'female', priority:'2'}, "+
						 "{soreness: '3', movements: ['medium','low','low'], part: 'back', goal: 'Smaller', gender: 'female', priority:'2'}, "+
						 "{soreness: '1', movements: ['medium', 'superset','low','low'], part: 'back', goal: 'Tone', gender: 'male', priority:'2'}, "+
						 "{soreness: '2', movements: ['medium','low','low'], part: 'back', goal: 'Tone', gender: 'male', priority:'2'}, "+
						 "{soreness: '3', movements: ['medium','low','low'], part: 'back', goal: 'Tone', gender: 'male', priority:'2'}, "+
						 "{soreness: '1', movements: ['medium', 'superset','low','low'], part: 'back', goal: 'Tone', gender: 'female', priority:'2'}, "+
						 "{soreness: '2', movements: ['medium','low','low'], part: 'back', goal: 'Tone', gender: 'female', priority:'2'}, "+
						 "{soreness: '3', movements: ['medium','low','low'], part: 'back', goal: 'Tone', gender: 'female', priority:'2'}, "+
						 "{soreness: '1', movements: ['medium','superset','low','superset','low'], part: 'back', goal: 'Bigger', gender: 'male', priority:'2'}, "+
						 "{soreness: '2', movements: ['medium','superset','low','superset'], part: 'back', goal: 'Bigger', gender: 'male', priority:'2'}, "+
						 "{soreness: '3', movements: ['low','superset'], part: 'back', goal: 'Bigger', gender: 'male', priority:'2'}, "+ 
						 "{soreness: '1', movements: ['medium','superset','low','superset','low'], part: 'back', goal: 'Bigger', gender: 'female', priority:'2'}, "+
						 "{soreness: '2', movements: ['medium','superset','low','superset'], part: 'back', goal: 'Bigger', gender: 'female', priority:'2'}, "+
						 "{soreness: '3', movements: ['medium','superset'], part: 'back', goal: 'Bigger', gender: 'female', priority:'2'}, "+
						 "{soreness: '1', movements: ['medium','low','low','low'], focus:['quads', 'quads', 'hamstrings', 'calves'], part: 'legs', goal: 'Smaller', gender: 'male', priority:'2'}, "+
						 "{soreness: '2', movements: ['low','low','low','low', 'low', 'low'], focus:['quads', 'quads', 'hamstrings', 'hamstrings', 'calves' ,'calves'], part: 'legs', goal: 'Smaller', gender: 'male', priority:'2'}, "+
						 "{soreness: '3', movements: ['low','low','low', 'low'], focus:['quads', 'quads', 'hamstrings', 'calves'], part: 'legs', goal: 'Smaller', gender: 'male', priority:'2'}, "+
						 "{soreness: '1', movements: ['medium','low','low','low'], focus:['quads', 'quads', 'hamstrings', 'calves'], part: 'legs', goal: 'Smaller', gender: 'female', priority:'2'}, "+
						 "{soreness: '2', movements: ['low','low','low','low'], focus:['quads', 'quads', 'hamstrings', 'calves'], part: 'legs', goal: 'Smaller', gender: 'female', priority:'2'}, "+
						 "{soreness: '3', movements: ['low','low'], focus:['quads', 'quads'], part: 'legs', goal: 'Smaller', gender: 'female', priority:'2'}, "+
						 "{soreness: '1', movements: ['medium','low','low','low'], focus:['quads', 'quads', 'hamstrings', 'calves'], part: 'legs', goal: 'Tone', gender: 'male', priority:'2'}, "+
						 "{soreness: '2', movements: ['medium','low','low','low'], focus:['quads', 'quads', 'hamstrings', 'calves'], part: 'legs', goal: 'Tone', gender: 'male', priority:'2'}, "+
						 "{soreness: '3', movements: ['medium','low'], focus:['quads', 'quads'], part: 'legs', goal: 'Tone', gender: 'male', priority:'2'}, "+
						 "{soreness: '1', movements: ['medium','low','low','low'], focus:['hamstrings', 'hamstrings', 'quads', 'calves'], part: 'legs', goal: 'Tone', gender: 'female', priority:'2'}, "+
						 "{soreness: '2', movements: ['medium','low','low','low'], focus:['hamstrings', 'hamstrings', 'quads', 'calves'], part: 'legs', goal: 'Tone', gender: 'female', priority:'2'}, "+
						 "{soreness: '3', movements: ['medium','low'], focus:['hamstrings', 'hamstrings'], part: 'legs', goal: 'Tone', gender: 'female', priority:'2'}, "+
						 "{soreness: '1', movements: ['medium','superset','medium','superset'], focus:['quads', 'quads', 'hamstrings', 'hamstrings'], part: 'legs', goal: 'Bigger', gender: 'male', priority:'2'}, "+
						 "{soreness: '2', movements: ['medium','superset','low'], focus:['quads', 'quads', 'hamstrings'], part: 'legs', goal: 'Bigger', gender: 'male', priority:'2'}, "+
						 "{soreness: '3', movements: ['medium','superset'], focus:['quads', 'quads'], part: 'legs', goal: 'Bigger', gender: 'male', priority:'2'}, "+
						 "{soreness: '1', movements: ['medium','superset','low','superset'], focus:['hamstrings', 'hamstrings', 'quads', 'quads'], part: 'legs', goal: 'Bigger', gender: 'female', priority:'2'}, "+
						 "{soreness: '2', movements: ['medium','superset','low'], focus:['hamstrings', 'hamstrings', 'quads'], part: 'legs', goal: 'Bigger', gender: 'female', priority:'2'}, "+
						 "{soreness: '3', movements: ['low','superset'], focus:['hamstrings', 'hamstrings'], part: 'legs', goal: 'Bigger', gender: 'female', priority:'2'}, "+
						 "{soreness: '1', movements: ['medium','low','low'], focus: ['all','all','all'], part: 'biceps', goal: 'Smaller', gender: 'male', priority:'2'}, "+
						 "{soreness: '2', movements: ['low','low','low'], focus: ['all','all','all'], part: 'biceps', goal: 'Smaller', gender: 'male', priority:'2'}, "+
						 "{soreness: '3', movements: ['low','low'], focus: ['all','all'], part: 'biceps', goal: 'Smaller', gender: 'male', priority:'2'}, "+
						 "{soreness: '1', movements: ['medium','low','low'], focus: ['all','all','all'], part: 'biceps', goal: 'Smaller', gender: 'female', priority:'2'}, "+
						 "{soreness: '2', movements: ['low','low','low'], focus: ['all','all','all'], part: 'biceps', goal: 'Smaller', gender: 'female', priority:'2'}, "+
						 "{soreness: '3', movements: ['low','low'], focus: ['all','all'], part: 'biceps', goal: 'Smaller', gender: 'female', priority:'2'}, "+
						 "{soreness: '1', movements: ['medium','low','low'], focus: ['all','all','all'], part: 'biceps', goal: 'Tone', gender: 'male', priority:'2'}, "+
						 "{soreness: '2', movements: ['medium','low','low'], focus: ['all','all','all'], part: 'biceps', goal: 'Tone', gender: 'male', priority:'2'}, "+
						 "{soreness: '3', movements: ['medium','low'], focus: ['all','all'], part: 'biceps', goal: 'Tone', gender: 'male', priority:'2'}, "+
						 "{soreness: '1', movements: ['medium','low','low'], focus: ['all','all','all'], part: 'biceps', goal: 'Tone', gender: 'female', priority:'2'}, "+
						 "{soreness: '2', movements: ['medium','low','low'], focus: ['all','all','all'], part: 'biceps', goal: 'Tone', gender: 'female', priority:'2'}, "+
						 "{soreness: '3', movements: ['medium','low'], focus: ['all','all'], part: 'biceps', goal: 'Tone', gender: 'female', priority:'2'}, "+
						 "{soreness: '1', movements: ['medium','superset','high'], focus: ['all','all','all'], part: 'biceps', goal: 'Bigger', gender: 'male', priority:'2'}, "+
						 "{soreness: '2', movements: ['medium','superset','low'], focus: ['all','all','all'], part: 'biceps', goal: 'Bigger', gender: 'male', priority:'2'}, "+
						 "{soreness: '3', movements: ['medium','superset'], focus: ['all','all'], part: 'biceps', goal: 'Bigger', gender: 'male', priority:'2'}, "+
						 "{soreness: '1', movements: ['medium','superset','high'], focus: ['all','all','all'], part: 'biceps', goal: 'Bigger', gender: 'female', priority:'2'}, "+
						 "{soreness: '2', movements: ['medium','superset','low'], focus: ['all','all','all'], part: 'biceps', goal: 'Bigger', gender: 'female', priority:'2'}, "+
						 "{soreness: '3', movements: ['medium','superset'], focus: ['all','all'], part: 'biceps', goal: 'Bigger', gender: 'female', priority:'2'}, "+
						  "{soreness: '1', movements: ['medium','low','low'], focus: ['all','all', 'all'], part: 'triceps', goal: 'Smaller', gender: 'male', priority:'2'}, "+
						 "{soreness: '2', movements: ['medium','low','low'], focus: ['all','all', 'all'], part: 'triceps', goal: 'Smaller', gender: 'male', priority:'2'}, "+
						 "{soreness: '3', movements: ['low','low','low'], focus: ['all','all', 'all'], part: 'triceps', goal: 'Smaller', gender: 'male', priority:'2'}, "+
						 "{soreness: '1', movements: ['medium','low','low'], focus: ['all','all', 'all'], part: 'triceps', goal: 'Smaller', gender: 'female', priority:'2'}, "+
						 "{soreness: '2', movements: ['medium','low','low'], focus: ['all','all', 'all'], part: 'triceps', goal: 'Smaller', gender: 'female', priority:'2'}, "+
						 "{soreness: '3', movements: ['low','low','low'], focus: ['all','all', 'all'], part: 'triceps', goal: 'Smaller', gender: 'female', priority:'2'}, "+
						 "{soreness: '1', movements: ['medium','low','low'], focus: ['all','all', 'all'], part: 'triceps', goal: 'Tone', gender: 'male', priority:'2'}, "+
						 "{soreness: '2', movements: ['medium','low','low'], focus: ['all','all', 'all'], part: 'triceps', goal: 'Tone', gender: 'male', priority:'2'}, "+
						 "{soreness: '3', movements: ['medium','low'], focus: ['all','all'], part: 'triceps', goal: 'Tone', gender: 'male', priority:'2'}, "+
						 "{soreness: '1', movements: ['medium','low','low'], focus: ['all','all', 'all'], part: 'triceps', goal: 'Tone', gender: 'female', priority:'2'}, "+
						 "{soreness: '2', movements: ['medium','low','low'], focus: ['all','all', 'all'], part: 'triceps', goal: 'Tone', gender: 'female', priority:'2'}, "+
						 "{soreness: '3', movements: ['medium','low'], focus: ['all','all'], part: 'triceps', goal: 'Tone', gender: 'female', priority:'2'}, "+
						 "{soreness: '1', movements: ['medium','superset','low'], focus: ['all','all', 'all'], part: 'triceps', goal: 'Bigger', gender: 'male', priority:'2'}, "+
						 "{soreness: '2', movements: ['medium','superset'], focus: ['all','all'], part: 'triceps', goal: 'Bigger', gender: 'male', priority:'2'}, "+
						 "{soreness: '3', movements: ['medium','superset'], focus: ['all','all'], part: 'triceps', goal: 'Bigger', gender: 'male', priority:'2'}, "+
						 "{soreness: '1', movements: ['medium','superset','low'], focus: ['all','all', 'all'], part: 'triceps', goal: 'Bigger', gender: 'female', priority:'2'}, "+
						 "{soreness: '2', movements: ['medium','superset'], focus: ['all','all'], part: 'triceps', goal: 'Bigger', gender: 'female', priority:'2'}, "+
						 "{soreness: '3', movements: ['medium','superset'], focus: ['all','all'], part: 'triceps', goal: 'Bigger', gender: 'female', priority:'2'}, "+
						 "{soreness: '1', movements: ['medium','low','low'], focus: ['front-shoulder', 'back-shoulder', 'front-shoulder'], part: 'shoulders', goal: 'Smaller', gender: 'male', priority:'2'}, "+
						 "{soreness: '2', movements: ['low','low','low'], focus: ['front-shoulder', 'back-shoulder', 'front-shoulder'], part: 'shoulders', goal: 'Smaller', gender: 'male', priority:'2'}, "+
						 "{soreness: '3', movements: ['low','low'], focus: ['front-shoulder', 'back-shoulder'], part: 'shoulders', goal: 'Smaller', gender: 'male', priority:'2'}, "+
						 "{soreness: '1', movements: ['medium','low','low'], focus: ['front-shoulder', 'back-shoulder', 'front-shoulder'], part: 'shoulders', goal: 'Smaller', gender: 'female', priority:'2'}, "+
						 "{soreness: '2', movements: ['low','low','low'], focus: ['front-shoulder', 'back-shoulder', 'front-shoulder'], part: 'shoulders', goal: 'Smaller', gender: 'female', priority:'2'}, "+
						 "{soreness: '3', movements: ['low','low'], focus: ['front-shoulder', 'back-shoulder'], part: 'shoulders', goal: 'Smaller', gender: 'female', priority:'2'}, "+
						 "{soreness: '1', movements: ['medium','low','low'], focus: ['front-shoulder', 'back-shoulder', 'front-shoulder'], part: 'shoulders', goal: 'Tone', gender: 'male', priority:'2'}, "+
						 "{soreness: '2', movements: ['medium','low'], focus: ['front-shoulder', 'back-shoulder'], part: 'shoulders', goal: 'Tone', gender: 'male', priority:'2'}, "+
						 "{soreness: '3', movements: ['medium','low'], focus: ['front-shoulder', 'back-shoulder'], part: 'shoulders', goal: 'Tone', gender: 'male', priority:'2'}, "+
						 "{soreness: '1', movements: ['medium','low','low'], focus: ['front-shoulder', 'back-shoulder', 'front-shoulder'], part: 'shoulders', goal: 'Tone', gender: 'female', priority:'2'}, "+
						 "{soreness: '2', movements: ['medium','low'], focus: ['front-shoulder', 'back-shoulder'], part: 'shoulders', goal: 'Tone', gender: 'female', priority:'2'}, "+
						 "{soreness: '3', movements: ['medium','low'], focus: ['front-shoulder', 'back-shoulder'], part: 'shoulders', goal: 'Tone', gender: 'female', priority:'2'}, "+
						 "{soreness: '1', movements: ['medium','superset','medium','superset'], focus: ['front-shoulder', 'back-shoulder', 'front-shoulder', 'back-shoulder'], part: 'shoulders', goal: 'Bigger', gender: 'male', priority:'2'}, "+
						 "{soreness: '2', movements: ['medium','superset','low','low'], focus: ['front-shoulder', 'back-shoulder', 'front-shoulder', 'back-shoulder'], part: 'shoulders', goal: 'Bigger', gender: 'male', priority:'2'}, "+
						 "{soreness: '3', movements: ['medium','superset','low'], focus: ['front-shoulder', 'back-shoulder', 'front-shoulder'], part: 'shoulders', goal: 'Bigger', gender: 'male', priority:'2'}, "+
						 "{soreness: '1', movements: ['medium','superset','medium','superset'], focus: ['front-shoulder', 'back-shoulder', 'front-shoulder', 'back-shoulder'], part: 'shoulders', goal: 'Bigger', gender: 'female', priority:'2'}, "+
						 "{soreness: '2', movements: ['medium','superset','low','low'], focus: ['front-shoulder', 'back-shoulder', 'front-shoulder', 'back-shoulder'], part: 'shoulders', goal: 'Bigger', gender: 'female', priority:'2'}, "+
						 "{soreness: '3', movements: ['medium','superset','low'], focus: ['front-shoulder', 'back-shoulder', 'front-shoulder'], part: 'shoulders', goal: 'Bigger', gender: 'female', priority:'2'}, "+
						  "{soreness: '1', movements: ['medium','low','low'], focus: ['chest-mid', 'chest-upper', 'chest-mid'], part: 'chest', goal: 'Smaller', gender: 'male', priority:'2'}, "+
						 "{soreness: '2', movements: ['medium','low','low'], focus: ['chest-mid', 'chest-upper', 'chest-mid'], part: 'chest', goal: 'Smaller', gender: 'male', priority:'2'}, "+
						 "{soreness: '3', movements: ['medium','low'], focus: ['chest-mid', 'chest-upper'], part: 'chest', goal: 'Smaller', gender: 'male', priority:'2'}, "+
						 "{soreness: '1', movements: ['medium','low','low'], focus: ['chest-mid', 'chest-upper', 'chest-mid'], part: 'chest', goal: 'Smaller', gender: 'female', priority:'2'}, "+
						 "{soreness: '2', movements: ['medium','low','low'], focus: ['chest-mid', 'chest-upper', 'chest-mid'], part: 'chest', goal: 'Smaller', gender: 'female', priority:'2'}, "+
						 "{soreness: '3', movements: ['medium','low'], focus: ['chest-mid', 'chest-upper'], part: 'chest', goal: 'Smaller', gender: 'female', priority:'2'}, "+
						 "{soreness: '1', movements: ['medium','low','low'], focus: ['chest-mid', 'chest-upper', 'chest-mid'], part: 'chest', goal: 'Tone', gender: 'male', priority:'2'}, "+
						 "{soreness: '2', movements: ['medium','low','low'], focus: ['chest-mid', 'chest-upper', 'chest-mid'], part: 'chest', goal: 'Tone', gender: 'male', priority:'2'}, "+
						 "{soreness: '3', movements: ['medium','low','low'], focus: ['chest-mid', 'chest-upper', 'chest-mid'], part: 'chest', goal: 'Tone', gender: 'male', priority:'2'}, "+
						 "{soreness: '1', movements: ['medium','low','low'], focus: ['chest-mid', 'chest-upper', 'chest-mid'], part: 'chest', goal: 'Tone', gender: 'female', priority:'2'}, "+
						 "{soreness: '2', movements: ['medium','low','low'], focus: ['chest-mid', 'chest-upper', 'chest-mid'], part: 'chest', goal: 'Tone', gender: 'female', priority:'2'}, "+
						 "{soreness: '3', movements: ['medium','low','low'], focus: ['chest-mid', 'chest-upper', 'chest-mid'], part: 'chest', goal: 'Tone', gender: 'female', priority:'2'}, "+
						 "{soreness: '1', movements: ['medium','superset','medium','superset'], focus: ['chest-mid', 'chest-upper', 'chest-mid', 'chest-lower'], part: 'chest', goal: 'Bigger', gender: 'male', priority:'2'}, "+
						 "{soreness: '2', movements: ['medium','superset'], focus: ['chest-mid', 'chest-upper'], part: 'chest', goal: 'Bigger', gender: 'male', priority:'2'}, "+
						 "{soreness: '3', movements: ['medium','superset'], focus: ['chest-mid', 'chest-upper'], part: 'chest', goal: 'Bigger', gender: 'male', priority:'2'}, "+
						 "{soreness: '1', movements: ['medium','superset','medium','superset'], focus: ['chest-mid', 'chest-upper', 'chest-mid', 'chest-lower'], part: 'chest', goal: 'Bigger', gender: 'female', priority:'2'}, "+
						 "{soreness: '2', movements: ['medium','superset'], focus: ['chest-mid', 'chest-upper'], part: 'chest', goal: 'Bigger', gender: 'female', priority:'2'}, "+
						 "{soreness: '3', movements: ['medium','superset'], focus: ['chest-mid', 'chest-upper'], part: 'chest', goal: 'Bigger', gender: 'female', priority:'2'}, "+
						 //PRIORITY'3'
						"{soreness: '1', movements: ['high'], focus: ['abs'], part: 'core', goal: 'Smaller', gender: 'male', priority:'3'}, "+
						 "{soreness: '2', movements: ['high'], focus: ['abs'], part: 'core', goal: 'Smaller', gender: 'male', priority:'3'}, "+
						 "{soreness: '3', movements: ['low'], focus: ['abs'], part: 'core', goal: 'Smaller', gender: 'male', priority:'3'}, "+
						 "{soreness: '1', movements: ['high'], focus: ['abs'], part: 'core', goal: 'Smaller', gender: 'female', priority:'3'}, "+
						 "{soreness: '2', movements: ['high'], focus: ['abs'], part: 'core', goal: 'Smaller', gender: 'female', priority:'3'}, "+
						 "{soreness: '3', movements: ['low'], focus: ['abs'], part: 'core', goal: 'Smaller', gender: 'female', priority:'3'}, "+
						 "{soreness: '1', movements: ['high', 'high'], focus: ['abs', 'abs'], part: 'core', goal: 'Tone', gender: 'male', priority:'3'}, "+
						 "{soreness: '2', movements: ['medium'], focus: ['abs'], part: 'core', goal: 'Tone', gender: 'male', priority:'3'}, "+
						 "{soreness: '3', movements: ['low'], focus: ['abs'], part: 'core', goal: 'Tone', gender: 'male', priority:'3'}, "+
						 "{soreness: '1', movements: ['high'], focus: ['abs'], part: 'core', goal: 'Tone', gender: 'female', priority:'3'}, "+
						 "{soreness: '2', movements: ['medium'], focus: ['abs'], part: 'core', goal: 'Tone', gender: 'female', priority:'3'}, "+
						 "{soreness: '3', movements: ['low'], focus: ['abs'], part: 'core', goal: 'Tone', gender: 'female', priority:'3'}, "+
						 "{soreness: '1', movements: ['medium','medium'], focus: ['glute-all', 'glute-upper'], part: 'glutes', goal: 'Smaller', gender: 'male', priority:'3'}, "+
						 "{soreness: '2', movements: ['medium','superset'], focus: ['glute-all', 'glute-upper'], part: 'glutes', goal: 'Smaller', gender: 'male', priority:'3'}, "+
						 "{soreness: '3', movements: ['medium'], focus: ['glute-all'], part: 'glutes', goal: 'Smaller', gender: 'male', priority:'3'}, "+
						 "{soreness: '1', movements: ['medium'], focus: ['glute-all'], part: 'glutes', goal: 'Smaller', gender: 'female', priority:'3'}, "+
						 "{soreness: '2', movements: ['medium'], focus: ['glute-all'], part: 'glutes', goal: 'Smaller', gender: 'female', priority:'3'}, "+
						 "{soreness: '3', movements: ['low'], focus: ['glute-all'], part: 'glutes', goal: 'Smaller', gender: 'female', priority:'3'}, "+
						 "{soreness: '1', movements: ['medium'], focus: ['glute-all'], part: 'glutes', goal: 'Tone', gender: 'male', priority:'3'}, "+
						 "{soreness: '2', movements: ['high'], focus: ['glute-all'], part: 'glutes', goal: 'Tone', gender: 'male', priority:'3'}, "+
						 "{soreness: '3', movements: ['medium'], focus: ['glute-all'], part: 'glutes', goal: 'Tone', gender: 'male', priority:'3'}, "+
						 "{soreness: '1', movements: ['medium','low','low'], focus: ['glute-all', 'glute-all', 'glute-side'], part: 'glutes', goal: 'Tone', gender: 'female', priority:'3'}, "+
						 "{soreness: '2', movements: ['medium'], focus: ['glute-all'], part: 'glutes', goal: 'Tone', gender: 'female', priority:'3'}, "+
						 "{soreness: '3', movements: ['medium'], focus: ['glute-all'], part: 'glutes', goal: 'Tone', gender: 'female', priority:'3'}, "+
						 "{soreness: '1', movements: ['medium', 'superset','low','superset', 'medium'], focus: ['glute-all', 'glute-all', 'glute-side', 'glute-side', 'glute-upper'], part: 'glutes', goal: 'Bigger', gender: 'male', priority:'3'}, "+
						 "{soreness: '2', movements: ['medium', 'superset','low','superset'], focus: ['glute-all', 'glute-all', 'glute-side', 'glute-side'], part: 'glutes', goal: 'Bigger', gender: 'male', priority:'3'}, "+
						 "{soreness: '3', movements: ['medium', 'superset','low','superset'], focus: ['glute-all', 'glute-all', 'glute-side', 'glute-side'], part: 'glutes', goal: 'Bigger', gender: 'male', priority:'3'}, "+
						 "{soreness: '1', movements: ['medium', 'medium', 'superset','low','superset'], focus: ['glute-all', 'glute-all', 'glute-side', 'glute-side'], part: 'glutes', goal: 'Bigger', gender: 'female', priority:'3'}, "+
						 "{soreness: '2', movements: ['medium', 'superset','low','superset'], focus: ['glute-all', 'glute-all', 'glute-side', 'glute-side'], part: 'glutes', goal: 'Bigger', gender: 'female', priority:'3'}, "+
						 "{soreness: '3', movements: ['medium', 'superset', 'low','superset'], focus: ['glute-all', 'glute-all', 'glute-side', 'glute-side'], part: 'glutes', goal: 'Bigger', gender: 'female', priority:'3'}, "+
						 "{soreness: '1', movements: ['medium','low','low','low', 'low'], part: 'back', goal: 'Smaller', gender: 'male', priority:'3'}, "+
						 "{soreness: '2', movements: ['medium','low','low'], part: 'back', goal: 'Smaller', gender: 'male', priority:'3'}, "+
						 "{soreness: '3', movements: ['medium','low'], part: 'back', goal: 'Smaller', gender: 'male', priority:'3'}, "+
						 "{soreness: '1', movements: ['medium','low','low','low', 'low'], part: 'back', goal: 'Smaller', gender: 'female', priority:'3'}, "+
						 "{soreness: '2', movements: ['medium','low','low'], part: 'back', goal: 'Smaller', gender: 'female', priority:'3'}, "+
						 "{soreness: '3', movements: ['medium','low'], part: 'back', goal: 'Smaller', gender: 'female', priority:'3'}, "+
						 "{soreness: '1', movements: ['medium', 'superset','low'], part: 'back', goal: 'Tone', gender: 'male', priority:'3'}, "+
						 "{soreness: '2', movements: ['medium','low'], part: 'back', goal: 'Tone', gender: 'male', priority:'3'}, "+
						 "{soreness: '3', movements: ['medium','low'], part: 'back', goal: 'Tone', gender: 'male', priority:'3'}, "+
						 "{soreness: '1', movements: ['medium', 'superset','low'], part: 'back', goal: 'Tone', gender: 'female', priority:'3'}, "+
						 "{soreness: '2', movements: ['medium','low'], part: 'back', goal: 'Tone', gender: 'female', priority:'3'}, "+
						 "{soreness: '3', movements: ['medium','low'], part: 'back', goal: 'Tone', gender: 'female', priority:'3'}, "+
						 "{soreness: '1', movements: ['medium','superset','low','superset'], part: 'back', goal: 'Bigger', gender: 'male', priority:'3'}, "+
						 "{soreness: '2', movements: ['medium','superset','low','superset'], part: 'back', goal: 'Bigger', gender: 'male', priority:'3'}, "+
						 "{soreness: '3', movements: ['low','superset'], part: 'back', goal: 'Bigger', gender: 'male', priority:'3'}, "+ 
						 "{soreness: '1', movements: ['medium','superset','low','superset'], part: 'back', goal: 'Bigger', gender: 'female', priority:'3'}, "+
						 "{soreness: '2', movements: ['medium','superset','low','superset'], part: 'back', goal: 'Bigger', gender: 'female', priority:'3'}, "+
						 "{soreness: '3', movements: ['medium','superset'], part: 'back', goal: 'Bigger', gender: 'female', priority:'3'}, "+
						 "{soreness: '1', movements: ['medium','low','low'], focus: ['quads', 'hamstrings', 'calves'], part: 'legs', goal: 'Smaller', gender: 'male', priority:'3'}, "+
						 "{soreness: '2', movements: ['low','low','low'], focus: ['quads', 'hamstrings', 'calves'], part: 'legs', goal: 'Smaller', gender: 'male', priority:'3'}, "+
						 "{soreness: '3', movements: ['low','low'], focus: ['quads', 'hamstrings'], part: 'legs', goal: 'Smaller', gender: 'male', priority:'3'}, "+
						 "{soreness: '1', movements: ['medium','low','low','low'], focus: ['hamstrings', 'hamstrings', 'quads', 'calves'], part: 'legs', goal: 'Smaller', gender: 'female', priority:'3'}, "+
						 "{soreness: '2', movements: ['low','low','low'], focus: ['hamstrings', 'hamstrings', 'quads'], part: 'legs', goal: 'Smaller', gender: 'female', priority:'3'}, "+
						 "{soreness: '3', movements: ['low'], focus: ['hamstrings'], part: 'legs', goal: 'Smaller', gender: 'female', priority:'3'}, "+
						 "{soreness: '1', movements: ['medium','low','low', 'low'], focus: ['quads', 'quads', 'hamstrings', 'calves'], part: 'legs', goal: 'Tone', gender: 'male', priority:'3'}, "+
						 "{soreness: '2', movements: ['medium','low','low'], focus: ['quads', 'hamstrings', 'calves'], part: 'legs', goal: 'Tone', gender: 'male', priority:'3'}, "+
						 "{soreness: '3', movements: ['medium'], focus: ['quads'], part: 'legs', goal: 'Tone', gender: 'male', priority:'3'}, "+
						 "{soreness: '1', movements: ['medium','low','low'], focus: ['quads', 'hamstrings', 'calves'], part: 'legs', goal: 'Tone', gender: 'female', priority:'3'}, "+
						 "{soreness: '2', movements: ['medium','low','low'], focus: ['quads', 'hamstrings', 'calves'], part: 'legs', goal: 'Tone', gender: 'female', priority:'3'}, "+
						 "{soreness: '3', movements: ['medium'], focus: ['quads'], part: 'legs', goal: 'Tone', gender: 'female', priority:'3'}, "+
						 "{soreness: '1', movements: ['medium','superset','medium','superset'], focus: ['quads', 'quads', 'hamstrings', 'hamstrings'], part: 'legs', goal: 'Bigger', gender: 'male', priority:'3'}, "+
						 "{soreness: '2', movements: ['medium','superset'], focus: ['quads', 'hamstrings'], part: 'legs', goal: 'Bigger', gender: 'male', priority:'3'}, "+
						 "{soreness: '3', movements: ['medium','superset'], focus: ['quads', 'hamstrings'], part: 'legs', goal: 'Bigger', gender: 'male', priority:'3'}, "+
						 "{soreness: '1', movements: ['medium','superset','low','superset', 'high'], focus: ['hamstrings', 'hamstrings', 'quads', 'quads', 'calves'], part: 'legs', goal: 'Bigger', gender: 'female', priority:'3'}, "+
						 "{soreness: '2', movements: ['medium','superset'], focus: ['hamstrings', 'hamstrings'], part: 'legs', goal: 'Bigger', gender: 'female', priority:'3'}, "+
						 "{soreness: '3', movements: ['low','superset'], focus: ['hamstrings', 'hamstrings'], part: 'legs', goal: 'Bigger', gender: 'female', priority:'3'}, "+
						 "{soreness: '1', movements: ['medium','low'], focus: ['all','all'], part: 'biceps', goal: 'Smaller', gender: 'male', priority:'3'}, "+
						 "{soreness: '2', movements: ['low','low'], focus: ['all','all'], part: 'biceps', goal: 'Smaller', gender: 'male', priority:'3'}, "+
						 "{soreness: '3', movements: ['low'], focus: ['all'], part: 'biceps', goal: 'Smaller', gender: 'male', priority:'3'}, "+
						 "{soreness: '1', movements: ['medium','low'], focus: ['all','all'], part: 'biceps', goal: 'Smaller', gender: 'female', priority:'3'}, "+
						 "{soreness: '2', movements: ['low','low'], focus: ['all','all'], part: 'biceps', goal: 'Smaller', gender: 'female', priority:'3'}, "+
						 "{soreness: '3', movements: ['low'], focus: ['all'], part: 'biceps', goal: 'Smaller', gender: 'female', priority:'3'}, "+
						 "{soreness: '1', movements: ['medium','low'], focus: ['all','all'], part: 'biceps', goal: 'Tone', gender: 'male', priority:'3'}, "+
						 "{soreness: '2', movements: ['medium','low'], focus: ['all','all'], part: 'biceps', goal: 'Tone', gender: 'male', priority:'3'}, "+
						 "{soreness: '3', movements: ['medium'], focus: ['all'], part: 'biceps', goal: 'Tone', gender: 'male', priority:'3'}, "+
						 "{soreness: '1', movements: ['medium','low'], focus: ['all','all'], part: 'biceps', goal: 'Tone', gender: 'female', priority:'3'}, "+
						 "{soreness: '2', movements: ['medium','low'], focus: ['all','all'], part: 'biceps', goal: 'Tone', gender: 'female', priority:'3'}, "+
						 "{soreness: '3', movements: ['medium'], focus: ['all'], part: 'biceps', goal: 'Tone', gender: 'female', priority:'3'}, "+
						 "{soreness: '1', movements: ['medium','superset'], focus: ['all','all'], part: 'biceps', goal: 'Bigger', gender: 'male', priority:'3'}, "+
						 "{soreness: '2', movements: ['medium','superset'], focus: ['all','all'], part: 'biceps', goal: 'Bigger', gender: 'male', priority:'3'}, "+
						 "{soreness: '3', movements: ['medium','superset'], focus: ['all','all'], part: 'biceps', goal: 'Bigger', gender: 'male', priority:'3'}, "+
						 "{soreness: '1', movements: ['medium','superset'], focus: ['all','all'], part: 'biceps', goal: 'Bigger', gender: 'female', priority:'3'}, "+
						 "{soreness: '2', movements: ['medium','superset'], focus: ['all','all'], part: 'biceps', goal: 'Bigger', gender: 'female', priority:'3'}, "+
						 "{soreness: '3', movements: ['medium','superset'], focus: ['all','all'], part: 'biceps', goal: 'Bigger', gender: 'female', priority:'3'}, "+
						  "{soreness: '1', movements: ['medium','low'],focus: ['all','all'], part: 'triceps', goal: 'Smaller', gender: 'male', priority:'3'}, "+
						 "{soreness: '2', movements: ['medium','low'], focus: ['all','all'], part: 'triceps', goal: 'Smaller', gender: 'male', priority:'3'}, "+
						 "{soreness: '3', movements: ['low','low'], focus: ['all','all'], part: 'triceps', goal: 'Smaller', gender: 'male', priority:'3'}, "+
						 "{soreness: '1', movements: ['medium','low'], focus: ['all','all'], part: 'triceps', goal: 'Smaller', gender: 'female', priority:'3'}, "+
						 "{soreness: '2', movements: ['medium','low'], focus: ['all','all'], part: 'triceps', goal: 'Smaller', gender: 'female', priority:'3'}, "+
						 "{soreness: '3', movements: ['low','low'], focus: ['all','all'], part: 'triceps', goal: 'Smaller', gender: 'female', priority:'3'}, "+
						 "{soreness: '1', movements: ['medium','low'], focus: ['all','all'], part: 'triceps', goal: 'Tone', gender: 'male', priority:'3'}, "+
						 "{soreness: '2', movements: ['medium','low'], focus: ['all','all'], part: 'triceps', goal: 'Tone', gender: 'male', priority:'3'}, "+
						 "{soreness: '3', movements: ['medium'], focus: ['all'], part: 'triceps', goal: 'Tone', gender: 'male', priority:'3'}, "+
						 "{soreness: '1', movements: ['medium','low'], focus: ['all','all'], part: 'triceps', goal: 'Tone', gender: 'female', priority:'3'}, "+
						 "{soreness: '2', movements: ['medium','low'], focus: ['all','all'], part: 'triceps', goal: 'Tone', gender: 'female', priority:'3'}, "+
						 "{soreness: '3', movements: ['medium'], focus: ['all'], part: 'triceps', goal: 'Tone', gender: 'female', priority:'3'}, "+
						 "{soreness: '1', movements: ['medium','superset'], focus: ['all','all'], part: 'triceps', goal: 'Bigger', gender: 'male', priority:'3'}, "+
						 "{soreness: '2', movements: ['medium','superset'], focus: ['all','all'], part: 'triceps', goal: 'Bigger', gender: 'male', priority:'3'}, "+
						 "{soreness: '3', movements: ['medium','superset'], focus: ['all','all'], part: 'triceps', goal: 'Bigger', gender: 'male', priority:'3'}, "+
						 "{soreness: '1', movements: ['medium','superset'], focus: ['all','all'], part: 'triceps', goal: 'Bigger', gender: 'female', priority:'3'}, "+
						 "{soreness: '2', movements: ['medium','superset'], focus: ['all','all'], part: 'triceps', goal: 'Bigger', gender: 'female', priority:'3'}, "+
						 "{soreness: '3', movements: ['medium','superset'], focus: ['all','all'], part: 'triceps', goal: 'Bigger', gender: 'female', priority:'3'}, "+
						 "{soreness: '1', movements: ['medium','low'], focus: ['front-shoulder', 'back-shoulder'], part: 'shoulders', goal: 'Smaller', gender: 'male', priority:'3'}, "+
						 "{soreness: '2', movements: ['low','low'], focus: ['front-shoulder', 'back-shoulder'], part: 'shoulders', goal: 'Smaller', gender: 'male', priority:'3'}, "+
						 "{soreness: '3', movements: ['low'], focus: ['front-shoulder'], part: 'shoulders', goal: 'Smaller', gender: 'male', priority:'3'}, "+
						 "{soreness: '1', movements: ['medium','low'], focus: ['front-shoulder', 'back-shoulder'], part: 'shoulders', goal: 'Smaller', gender: 'female', priority:'3'}, "+
						 "{soreness: '2', movements: ['low','low'], part: 'shoulders', goal: 'Smaller', gender: 'female', priority:'3'}, "+
						 "{soreness: '3', movements: ['low'], focus: ['front-shoulder'], part: 'shoulders', goal: 'Smaller', gender: 'female', priority:'3'}, "+
						 "{soreness: '1', movements: ['medium','low'], focus: ['front-shoulder', 'back-shoulder'], part: 'shoulders', goal: 'Tone', gender: 'male', priority:'3'}, "+
						 "{soreness: '2', movements: ['medium'], focus: ['front-shoulder'], part: 'shoulders', goal: 'Tone', gender: 'male', priority:'3'}, "+
						 "{soreness: '3', movements: ['medium'], focus: ['front-shoulder'], part: 'shoulders', goal: 'Tone', gender: 'male', priority:'3'}, "+
						 "{soreness: '1', movements: ['medium','low'], focus: ['front-shoulder', 'back-shoulder'], part: 'shoulders', goal: 'Tone', gender: 'female', priority:'3'}, "+
						 "{soreness: '2', movements: ['medium'], focus: ['front-shoulder'], part: 'shoulders', goal: 'Tone', gender: 'female', priority:'3'}, "+
						 "{soreness: '3', movements: ['medium'], focus: ['front-shoulder'], part: 'shoulders', goal: 'Tone', gender: 'female', priority:'3'}, "+
						 "{soreness: '1', movements: ['medium','superset','medium','superset'], focus: ['front-shoulder', 'back-shoulder', 'front-shoulder', 'back-shoulder'], part: 'shoulders', goal: 'Bigger', gender: 'male', priority:'3'}, "+
						 "{soreness: '2', movements: ['medium','superset','low'],  focus: ['front-shoulder', 'back-shoulder', 'front-shoulder'], part: 'shoulders', goal: 'Bigger', gender: 'male', priority:'3'}, "+
						 "{soreness: '3', movements: ['medium','superset'],  focus: ['front-shoulder', 'back-shoulder'], part: 'shoulders', goal: 'Bigger', gender: 'male', priority:'3'}, "+
						 "{soreness: '1', movements: ['medium','superset','medium','superset'],  focus: ['front-shoulder', 'back-shoulder', 'front-shoulder', 'back-shoulder'], part: 'shoulders', goal: 'Bigger', gender: 'female', priority:'3'}, "+
						 "{soreness: '2', movements: ['medium','superset','low'],  focus: ['front-shoulder', 'back-shoulder', 'front-shoulder'], part: 'shoulders', goal: 'Bigger', gender: 'female', priority:'3'}, "+
						 "{soreness: '3', movements: ['medium','superset'],  focus: ['front-shoulder', 'back-shoulder'], part: 'shoulders', goal: 'Bigger', gender: 'female', priority:'3'}, "+
						  "{soreness: '1', movements: ['medium','low'], focus: ['chest-mid', 'chest-upper'], part: 'chest', goal: 'Smaller', gender: 'male', priority:'3'}, "+
						 "{soreness: '2', movements: ['medium','low'], focus: ['chest-mid', 'chest-upper'], part: 'chest', goal: 'Smaller', gender: 'male', priority:'3'}, "+
						 "{soreness: '3', movements: ['medium'], focus: ['chest-mid'], part: 'chest', goal: 'Smaller', gender: 'male', priority:'3'}, "+
						 "{soreness: '1', movements: ['medium','low'], focus: ['chest-mid', 'chest-upper'], part: 'chest', goal: 'Smaller', gender: 'female', priority:'3'}, "+
						 "{soreness: '2', movements: ['medium','low'], focus: ['chest-mid', 'chest-upper'], part: 'chest', goal: 'Smaller', gender: 'female', priority:'3'}, "+
						 "{soreness: '3', movements: ['medium'], focus: ['chest-mid'], part: 'chest', goal: 'Smaller', gender: 'female', priority:'3'}, "+
						 "{soreness: '1', movements: ['medium','low'], focus: ['chest-mid', 'chest-upper'], part: 'chest', goal: 'Tone', gender: 'male', priority:'3'}, "+
						 "{soreness: '2', movements: ['medium','low'], focus: ['chest-mid', 'chest-upper'], part: 'chest', goal: 'Tone', gender: 'male', priority:'3'}, "+
						 "{soreness: '3', movements: ['medium','low'], focus: ['chest-mid', 'chest-upper'], part: 'chest', goal: 'Tone', gender: 'male', priority:'3'}, "+
						 "{soreness: '1', movements: ['medium','low'], focus: ['chest-mid', 'chest-upper'], part: 'chest', goal: 'Tone', gender: 'female', priority:'3'}, "+
						 "{soreness: '2', movements: ['medium','low'], focus: ['chest-mid', 'chest-upper'], part: 'chest', goal: 'Tone', gender: 'female', priority:'3'}, "+
						 "{soreness: '3', movements: ['medium','low'], focus: ['chest-mid', 'chest-upper'], part: 'chest', goal: 'Tone', gender: 'female', priority:'3'}, "+
						 "{soreness: '1', movements: ['medium','superset','medium','superset'], focus: ['chest-mid', 'chest-upper', 'chest-upper', 'chest-lower'], part: 'chest', goal: 'Bigger', gender: 'male', priority:'3'}, "+
						 "{soreness: '2', movements: ['medium','superset'], focus: ['chest-mid', 'chest-upper'], part: 'chest', goal: 'Bigger', gender: 'male', priority:'3'}, "+
						 "{soreness: '3', movements: ['medium','superset'], focus: ['chest-mid', 'chest-upper'], part: 'chest', goal: 'Bigger', gender: 'male', priority:'3'}, "+
						 "{soreness: '1', movements: ['medium','superset','medium','superset'], focus: ['chest-mid', 'chest-upper', 'chest-upper', 'chest-lower'], part: 'chest', goal: 'Bigger', gender: 'female', priority:'3'}, "+
						 "{soreness: '2', movements: ['medium','superset'], focus: ['chest-mid', 'chest-upper'], part: 'chest', goal: 'Bigger', gender: 'female', priority:'3'}, "+
						 "{soreness: '3', movements: ['medium','superset'], focus: ['chest-mid', 'chest-upper'], part: 'chest', goal: 'Bigger', gender: 'female', priority:'3'} "+
"]";