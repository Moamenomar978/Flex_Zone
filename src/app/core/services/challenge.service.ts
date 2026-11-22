import { Injectable } from '@angular/core';
import { Challenge, LeaderboardEntry } from '../models/models';

@Injectable({ providedIn: 'root' })
export class ChallengeService {
  private readonly ENROLL_KEY = 'flexzone_challenge_enrollments';

  private challenges: Challenge[] = [
    { id: 'ch1', name: '30 Day Push-Up Challenge', description: 'Build upper body strength with daily push-up progressions.', duration: 30, currentDay: 18, category: 'Strength', xpReward: 500, badge: '💪', enrolled: true },
    { id: 'ch2', name: '21 Day Fat Burn', description: 'Daily HIIT workouts designed to maximize fat burning.', duration: 21, currentDay: 5, category: 'Fat Loss', xpReward: 350, badge: '🔥', enrolled: true },
    { id: 'ch3', name: '90 Day Body Transform', description: 'Complete body transformation program combining gym and nutrition.', duration: 90, currentDay: 0, category: 'Transform', xpReward: 1500, badge: '⚡', enrolled: false },
    { id: 'ch4', name: '7 Day Morning Yoga', description: 'Start every morning with a 20-minute yoga session for a full week.', duration: 7, currentDay: 0, category: 'Yoga', xpReward: 150, badge: '🧘', enrolled: false },
    { id: 'ch5', name: '14 Day Core Crusher', description: 'Two weeks of daily core workouts to build rock-solid abs.', duration: 14, currentDay: 0, category: 'Core', xpReward: 280, badge: '🏅', enrolled: false },
    { id: 'ch6', name: '1000 Rep Challenge', description: 'Complete 1000 reps of mixed exercises within one week.', duration: 7, currentDay: 0, category: 'Endurance', xpReward: 200, badge: '🎯', enrolled: false },
  ];

  private leaderboard: LeaderboardEntry[] = [
    { rank: 1, userId: '5', name: 'Ahmed Omar', xp: 2450, badge: '🥇', change: 0 },
    { rank: 2, userId: '8', name: 'Omar Ali', xp: 2310, badge: '🥈', change: 1 },
    { rank: 3, userId: '1', name: 'Mahmoud Ahmed', xp: 2180, badge: '🥉', change: -1 },
    { rank: 4, userId: '12', name: 'Khaled Hassan', xp: 1980, change: 2 },
    { rank: 5, userId: '3', name: 'Youssef Tarek', xp: 1850, change: -1 },
    { rank: 6, userId: '7', name: 'Mohamed Nour', xp: 1720, change: 0 },
    { rank: 7, userId: '9', name: 'Amir Salah', xp: 1650, change: 3 },
    { rank: 8, userId: '2', name: 'Sameh Gamal', xp: 1540, change: -2 },
    { rank: 9, userId: '11', name: 'Hassan Adel', xp: 1430, change: 1 },
    { rank: 10, userId: '6', name: 'Tarek Mostafa', xp: 1320, change: -1 },
  ];

  constructor() {
    this.applyEnrollments();
  }

  getChallenges(): Challenge[] {
    return this.challenges.map((c) => ({ ...c }));
  }

  enrollChallenge(id: string): void {
    const ch = this.challenges.find((c) => c.id === id);
    if (ch) {
      ch.enrolled = true;
      ch.currentDay = Math.max(ch.currentDay, 1);
      this.saveEnrollments();
    }
  }

  getLeaderboard(): LeaderboardEntry[] {
    return this.leaderboard;
  }

  getUserRank(userId: number | string): number {
    const entry = this.leaderboard.find((e) => e.userId === String(userId));
    return entry ? entry.rank : 999;
  }

  private applyEnrollments() {
    const stored = localStorage.getItem(this.ENROLL_KEY);
    if (!stored) return;
    const ids: string[] = JSON.parse(stored);
    this.challenges.forEach((ch) => {
      if (ids.includes(ch.id)) {
        ch.enrolled = true;
        if (ch.currentDay === 0) ch.currentDay = 1;
      }
    });
  }

  private saveEnrollments() {
    const ids = this.challenges.filter((c) => c.enrolled).map((c) => c.id);
    localStorage.setItem(this.ENROLL_KEY, JSON.stringify(ids));
  }
}
