import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChallengeService } from '../../../core/services/challenge.service';
import { AuthService } from '../../../core/services/auth.service';
import { Challenge, LeaderboardEntry } from '../../../core/models/models';

@Component({
  selector: 'app-challenges',
  imports: [CommonModule],
  templateUrl: './challenges.html',
  styleUrl: './challenges.css',
})
export class Challenges implements OnInit {
  challenges = signal<Challenge[]>([]);
  leaderboard = signal<LeaderboardEntry[]>([]);
  toast = signal('');

  constructor(
    private challengeService: ChallengeService,
    public auth: AuthService,
  ) {}

  ngOnInit() {
    this.challenges.set(this.challengeService.getChallenges());
    this.leaderboard.set(this.challengeService.getLeaderboard());
  }

  enroll(ch: Challenge) {
    if (ch.enrolled) return;
    this.challengeService.enrollChallenge(ch.id);
    this.challenges.set(this.challengeService.getChallenges());
    this.auth.addXP(30);
    this.showToast(`🎯 Enrolled in "${ch.name}"! +30 XP`);
  }

  getProgress(ch: Challenge): number {
    if (!ch.enrolled) return 0;
    return Math.round((ch.currentDay / ch.duration) * 100);
  }

  getUserRank(): number {
    const user = this.auth.currentUserSignal();
    if (!user) return 999;
    return this.challengeService.getUserRank(user.id);
  }

  isCurrentUser(entry: LeaderboardEntry): boolean {
    return entry.userId === String(this.auth.currentUserSignal()?.id);
  }

  currentUser() {
    return this.auth.currentUserSignal();
  }

  showToast(msg: string) {
    this.toast.set(msg);
    setTimeout(() => this.toast.set(''), 3000);
  }

  Math = Math;
}
