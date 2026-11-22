import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { WorkoutService } from '../../../core/services/workout.service';
import { AuthService } from '../../../core/services/auth.service';
import { Exercise, WorkoutSession } from '../../../core/models/models';

type WorkoutMode = 'overview' | 'active' | 'rest' | 'done';

@Component({
  selector: 'app-workout-detail',
  imports: [RouterLink],
  templateUrl: './workout-detail.html',
  styleUrl: './workout-detail.css',
})
export class WorkoutDetail implements OnInit, OnDestroy {
  workout = signal<WorkoutSession | null>(null);
  mode = signal<WorkoutMode>('overview');
  currentExIdx = signal(0);
  currentSet = signal(1);
  timerVal = signal(0);
  timerRunning = signal(false);
  isPaused = signal(false);
  totalTime = signal(0);

  private timerInterval: ReturnType<typeof setInterval> | null = null;
  private totalInterval: ReturnType<typeof setInterval> | null = null;

  constructor(
    private route: ActivatedRoute,
    private workoutService: WorkoutService,
    private auth: AuthService,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.workout.set(this.workoutService.getWorkoutById(id) || null);
  }

  ngOnDestroy() {
    this.clearTimers();
  }

  get currentExercise(): Exercise | null {
    const w = this.workout();
    if (!w) return null;
    return w.exercises[this.currentExIdx()] ?? null;
  }

  get nextExercise(): Exercise | null {
    const w = this.workout();
    if (!w) return null;
    return w.exercises[this.currentExIdx() + 1] ?? null;
  }

  get totalExercises(): number {
    return this.workout()?.exercises.length ?? 0;
  }

  get overallProgress(): number {
    if (this.totalExercises === 0) return 0;
    return Math.round((this.currentExIdx() / this.totalExercises) * 100);
  }

  startWorkout() {
    this.mode.set('active');
    this.currentExIdx.set(0);
    this.currentSet.set(1);
    this.timerVal.set(0);
    this.timerRunning.set(true);
    this.isPaused.set(false);
    this.startTotalTimer();
  }

  togglePause() {
    this.isPaused.update((v) => !v);
    this.timerRunning.set(!this.isPaused());
  }

  completeSet() {
    const ex = this.currentExercise;
    if (!ex) return;
    if (this.currentSet() < ex.sets) {
      this.currentSet.update((v) => v + 1);
      this.startRestTimer(ex.rest);
    } else {
      this.nextExercise ? this.moveToNext() : this.finishWorkout();
    }
  }

  skipRest() {
    this.mode.set('active');
    this.clearTimers();
  }

  moveToNext() {
    this.currentExIdx.update((v) => v + 1);
    this.currentSet.set(1);
    this.mode.set('active');
  }

  startRestTimer(seconds: number) {
    this.mode.set('rest');
    this.timerVal.set(seconds);
    this.clearTimers();
    this.timerInterval = setInterval(() => {
      if (!this.isPaused()) {
        this.timerVal.update((v) => {
          if (v <= 1) {
            if (this.timerInterval) clearInterval(this.timerInterval);
            this.mode.set('active');
            return 0;
          }
          return v - 1;
        });
      }
    }, 1000);
  }

  startTotalTimer() {
    this.totalInterval = setInterval(() => {
      this.totalTime.update((v) => v + 1);
    }, 1000);
  }

  finishWorkout() {
    this.mode.set('done');
    this.clearTimers();
    this.auth.addXP(50);
  }

  restartWorkout() {
    this.clearTimers();
    this.startWorkout();
  }

  clearTimers() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    if (this.totalInterval) {
      clearInterval(this.totalInterval);
      this.totalInterval = null;
    }
  }

  formatTime(s: number): string {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  }

  getTimerPercent(): number {
    const ex = this.currentExercise;
    if (!ex || this.mode() !== 'rest') return 0;
    return Math.round((this.timerVal() / ex.rest) * 100);
  }

  getDifficultyColor(d: string) {
    return this.workoutService.getDifficultyColor(d);
  }

  getSetsArray(): number[] {
    const ex = this.currentExercise;
    return ex ? Array.from({ length: ex.sets }, (_, i) => i) : [];
  }
}
