import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  authService = inject(AuthService)

  user = computed(() => this.authService.currentUserSignal());

  quickLinks = [
    { path: '/workouts', icon: '🏋️', title: 'Workout Library', desc: 'Start a guided session with sets, rest timers and XP.' },
    { path: '/classes', icon: '📅', title: 'Book a Class', desc: 'Reserve a spot in Yoga, HIIT, Boxing and more.' },
    { path: '/trainers', icon: '👨‍🏫', title: 'Our Trainers', desc: 'Book a personal session with a certified coach.' },
    { path: '/progress', icon: '📊', title: 'Progress Tracker', desc: 'Log weight, measurements and BMI over time.' },
    { path: '/challenges', icon: '🏆', title: 'Challenges', desc: 'Join challenges, earn XP and climb the leaderboard.' },
    { path: '/nutrition', icon: '🍎', title: 'Nutrition Planner', desc: 'Personalized nutrition plans built around your fitness goal.' },
    { path: '/plans', icon: '📋', title: 'Workout Plans', desc: 'Browse and filter plans tailored to your level.' },
    { path: '/profile', icon: '👤', title: 'My Profile', desc: 'View and update your account details.' },
  ];
}
