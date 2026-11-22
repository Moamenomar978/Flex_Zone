import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WorkoutService } from '../../../core/services/workout.service';
import { WorkoutSession } from '../../../core/models/models';

@Component({
  selector: 'app-workouts',
  imports: [RouterLink],
  templateUrl: './workouts.html',
  styleUrl: './workouts.css',
})
export class Workouts implements OnInit {
  allWorkouts = signal<WorkoutSession[]>([]);
  filtered = signal<WorkoutSession[]>([]);
  categories = signal<string[]>([]);
  activeCategory = signal('All');
  searchQuery = signal('');
  activeDifficulty = signal('All');

  difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    this.allWorkouts.set(this.workoutService.getWorkouts());
    this.categories.set(this.workoutService.getCategories());
    this.filtered.set(this.allWorkouts());
  }

  filterWorkouts() {
    let result = this.allWorkouts();
    if (this.activeCategory() !== 'All') {
      result = result.filter((w) => w.category === this.activeCategory());
    }
    if (this.activeDifficulty() !== 'All') {
      result = result.filter((w) => w.difficulty === this.activeDifficulty());
    }
    if (this.searchQuery().trim()) {
      const q = this.searchQuery().toLowerCase();
      result = result.filter(
        (w) =>
          w.name.toLowerCase().includes(q) ||
          w.category.toLowerCase().includes(q) ||
          (w.targetMuscles || []).some((m) => m.toLowerCase().includes(q)),
      );
    }
    this.filtered.set(result);
  }

  setCategory(cat: string) {
    this.activeCategory.set(cat);
    this.filterWorkouts();
  }

  setDifficulty(d: string) {
    this.activeDifficulty.set(d);
    this.filterWorkouts();
  }

  onSearch(value: string) {
    this.searchQuery.set(value);
    this.filterWorkouts();
  }

  getDifficultyColor(d: string) {
    return this.workoutService.getDifficultyColor(d);
  }

  getCategoryEmoji(cat: string): string {
    const map: Record<string, string> = {
      Chest: '💪',
      Back: '🎯',
      Legs: '🦵',
      Arms: '💪',
      Shoulders: '🎯',
      Core: '🔥',
      'Full Body': '⚡',
      Cardio: '❤️',
    };
    return map[cat] || '🏋️';
  }
}
