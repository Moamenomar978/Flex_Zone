import { Injectable } from '@angular/core';
import { Exercise, WorkoutSession } from '../models/models';

@Injectable({ providedIn: 'root' })
export class WorkoutService {
  private exercises: Exercise[] = [
    { id: 'e1', name: 'Bench Press', muscle: 'Chest', equipment: 'Barbell', difficulty: 'Intermediate', sets: 4, reps: 10, rest: 90, calories: 120, description: 'Classic compound chest exercise targeting pectorals, shoulders and triceps.' },
    { id: 'e2', name: 'Incline Dumbbell Press', muscle: 'Chest', equipment: 'Dumbbell', difficulty: 'Intermediate', sets: 3, reps: 12, rest: 60, calories: 100 },
    { id: 'e3', name: 'Cable Flyes', muscle: 'Chest', equipment: 'Cable', difficulty: 'Beginner', sets: 3, reps: 15, rest: 45, calories: 80 },
    { id: 'e4', name: 'Push-Ups', muscle: 'Chest', equipment: 'Bodyweight', difficulty: 'Beginner', sets: 3, reps: 20, rest: 45, calories: 70 },
    { id: 'e5', name: 'Tricep Pushdown', muscle: 'Arms', equipment: 'Cable', difficulty: 'Beginner', sets: 3, reps: 15, rest: 45, calories: 60 },
    { id: 'e6', name: 'Overhead Tricep Extension', muscle: 'Arms', equipment: 'Dumbbell', difficulty: 'Beginner', sets: 3, reps: 12, rest: 45, calories: 55 },
    { id: 'e7', name: 'Barbell Squat', muscle: 'Legs', equipment: 'Barbell', difficulty: 'Intermediate', sets: 4, reps: 8, rest: 120, calories: 200, description: 'King of all exercises. Works entire lower body and core.' },
    { id: 'e8', name: 'Leg Press', muscle: 'Legs', equipment: 'Machine', difficulty: 'Beginner', sets: 4, reps: 12, rest: 90, calories: 150 },
    { id: 'e9', name: 'Romanian Deadlift', muscle: 'Legs', equipment: 'Barbell', difficulty: 'Intermediate', sets: 3, reps: 10, rest: 90, calories: 180 },
    { id: 'e10', name: 'Leg Curl', muscle: 'Legs', equipment: 'Machine', difficulty: 'Beginner', sets: 3, reps: 12, rest: 60, calories: 90 },
    { id: 'e11', name: 'Pull-Ups', muscle: 'Back', equipment: 'Bodyweight', difficulty: 'Intermediate', sets: 4, reps: 8, rest: 90, calories: 130 },
    { id: 'e12', name: 'Lat Pulldown', muscle: 'Back', equipment: 'Cable', difficulty: 'Beginner', sets: 4, reps: 12, rest: 60, calories: 110 },
    { id: 'e13', name: 'Barbell Row', muscle: 'Back', equipment: 'Barbell', difficulty: 'Intermediate', sets: 4, reps: 10, rest: 90, calories: 140 },
    { id: 'e14', name: 'Deadlift', muscle: 'Back', equipment: 'Barbell', difficulty: 'Advanced', sets: 4, reps: 6, rest: 180, calories: 250, description: 'Ultimate full-body strength exercise.' },
    { id: 'e15', name: 'Bicep Curl', muscle: 'Arms', equipment: 'Dumbbell', difficulty: 'Beginner', sets: 3, reps: 15, rest: 45, calories: 60 },
    { id: 'e16', name: 'Hammer Curl', muscle: 'Arms', equipment: 'Dumbbell', difficulty: 'Beginner', sets: 3, reps: 12, rest: 45, calories: 55 },
    { id: 'e17', name: 'Overhead Press', muscle: 'Shoulders', equipment: 'Barbell', difficulty: 'Intermediate', sets: 4, reps: 8, rest: 90, calories: 120 },
    { id: 'e18', name: 'Lateral Raises', muscle: 'Shoulders', equipment: 'Dumbbell', difficulty: 'Beginner', sets: 3, reps: 15, rest: 45, calories: 70 },
    { id: 'e19', name: 'Face Pulls', muscle: 'Shoulders', equipment: 'Cable', difficulty: 'Beginner', sets: 3, reps: 15, rest: 45, calories: 65 },
    { id: 'e20', name: 'Plank', muscle: 'Core', equipment: 'Bodyweight', difficulty: 'Beginner', sets: 3, reps: 60, rest: 30, calories: 50, description: 'Hold for 60 seconds per set.' },
    { id: 'e21', name: 'Crunches', muscle: 'Core', equipment: 'Bodyweight', difficulty: 'Beginner', sets: 3, reps: 25, rest: 30, calories: 45 },
    { id: 'e22', name: 'Russian Twists', muscle: 'Core', equipment: 'Bodyweight', difficulty: 'Intermediate', sets: 3, reps: 20, rest: 30, calories: 55 },
    { id: 'e23', name: 'Calf Raises', muscle: 'Legs', equipment: 'Bodyweight', difficulty: 'Beginner', sets: 4, reps: 20, rest: 30, calories: 60 },
    { id: 'e24', name: 'Hip Thrust', muscle: 'Legs', equipment: 'Barbell', difficulty: 'Intermediate', sets: 4, reps: 10, rest: 60, calories: 120 },
  ];

  private workoutSessions: WorkoutSession[] = [
    {
      id: 'w1', name: 'Chest & Triceps Power', category: 'Chest',
      duration: 45, difficulty: 'Intermediate', calories: 420, rating: 4.8,
      exercises: [this.exercises[0], this.exercises[1], this.exercises[2], this.exercises[4], this.exercises[5]],
      targetMuscles: ['Chest', 'Triceps', 'Shoulders'],
      description: 'Complete chest and triceps workout for building upper body mass and strength.',
    },
    {
      id: 'w2', name: 'Leg Day Destroyer', category: 'Legs',
      duration: 60, difficulty: 'Advanced', calories: 680, rating: 4.9,
      exercises: [this.exercises[6], this.exercises[7], this.exercises[8], this.exercises[9], this.exercises[22]],
      targetMuscles: ['Quads', 'Hamstrings', 'Glutes', 'Calves'],
      description: 'Brutal leg day workout that will push your lower body to the limit.',
    },
    {
      id: 'w3', name: 'Back & Biceps Builder', category: 'Back',
      duration: 50, difficulty: 'Intermediate', calories: 520, rating: 4.7,
      exercises: [this.exercises[10], this.exercises[11], this.exercises[12], this.exercises[14], this.exercises[15]],
      targetMuscles: ['Lats', 'Traps', 'Biceps', 'Rear Delts'],
      description: 'Build a wide, thick back paired with powerful biceps.',
    },
    {
      id: 'w4', name: 'Shoulder Sculpt', category: 'Shoulders',
      duration: 40, difficulty: 'Beginner', calories: 320, rating: 4.6,
      exercises: [this.exercises[16], this.exercises[17], this.exercises[18]],
      targetMuscles: ['Front Delts', 'Side Delts', 'Rear Delts'],
      description: 'Complete shoulder workout for building 3D round shoulders.',
    },
    {
      id: 'w5', name: 'Full Body Power', category: 'Full Body',
      duration: 75, difficulty: 'Advanced', calories: 800, rating: 5.0,
      exercises: [this.exercises[13], this.exercises[6], this.exercises[0], this.exercises[10], this.exercises[16]],
      targetMuscles: ['Full Body'],
      description: 'The ultimate full body compound workout. Maximum results in minimum time.',
    },
    {
      id: 'w6', name: 'Core & Abs Shred', category: 'Core',
      duration: 30, difficulty: 'Beginner', calories: 250, rating: 4.5,
      exercises: [this.exercises[19], this.exercises[20], this.exercises[21]],
      targetMuscles: ['Core', 'Abs', 'Obliques'],
      description: 'Get shredded abs with this focused core workout.',
    },
    {
      id: 'w7', name: 'Beginner Full Body', category: 'Full Body',
      duration: 45, difficulty: 'Beginner', calories: 350, rating: 4.7,
      exercises: [this.exercises[3], this.exercises[7], this.exercises[11], this.exercises[15], this.exercises[17]],
      targetMuscles: ['Full Body'],
      description: 'Perfect starter workout for gym beginners. Simple movements, big results.',
    },
    {
      id: 'w8', name: 'Arms Annihilation', category: 'Arms',
      duration: 35, difficulty: 'Intermediate', calories: 280, rating: 4.6,
      exercises: [this.exercises[4], this.exercises[5], this.exercises[14], this.exercises[15]],
      targetMuscles: ['Biceps', 'Triceps', 'Forearms'],
      description: 'Complete arm workout targeting biceps and triceps for massive arms.',
    },
  ];

  getWorkouts(): WorkoutSession[] {
    return this.workoutSessions;
  }

  getWorkoutById(id: string): WorkoutSession | undefined {
    return this.workoutSessions.find((w) => w.id === id);
  }

  getCategories(): string[] {
    return ['All', 'Chest', 'Back', 'Legs', 'Arms', 'Shoulders', 'Core', 'Full Body'];
  }

  getDifficultyColor(difficulty: string): string {
    const map: Record<string, string> = {
      Beginner: '#10b981',
      Intermediate: '#f59e0b',
      Advanced: '#ef4444',
    };
    return map[difficulty] || '#8b5cf6';
  }
}
