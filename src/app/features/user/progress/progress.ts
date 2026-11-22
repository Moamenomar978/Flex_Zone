import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProgressService } from '../../../core/services/progress.service';
import { AuthService } from '../../../core/services/auth.service';
import { ProgressEntry } from '../../../core/models/models';

@Component({
  selector: 'app-progress',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './progress.html',
  styleUrl: './progress.css',
})
export class Progress implements OnInit {
  entries = signal<ProgressEntry[]>([]);
  latestEntry = signal<ProgressEntry | null>(null);
  showForm = signal(false);
  saved = signal(false);
  form!: FormGroup;

  bmiWeight = signal(70);
  bmiHeight = signal(170);

  constructor(
    public progressService: ProgressService,
    public auth: AuthService,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.loadData();
    const latest = this.latestEntry();
    const user = this.auth.currentUserSignal();
    this.form = this.fb.group({
      date: [new Date().toISOString().split('T')[0], Validators.required],
      weight: [latest?.weight || user?.weight || 70, [Validators.required, Validators.min(30)]],
      bodyFat: [latest?.bodyFat || 18],
      chest: [latest?.chest || 100],
      waist: [latest?.waist || 85],
      arms: [latest?.arms || 35],
      legs: [latest?.legs || 58],
    });
    if (user?.weight) this.bmiWeight.set(user.weight);
    if (user?.height) this.bmiHeight.set(user.height);
  }

  loadData() {
    this.entries.set(this.progressService.getEntries());
    this.latestEntry.set(this.progressService.getLatestEntry());
  }

  saveEntry() {
    if (this.form.invalid) return;
    this.progressService.addEntry(this.form.value as ProgressEntry);
    this.loadData();
    this.showForm.set(false);
    this.saved.set(true);
    setTimeout(() => this.saved.set(false), 3000);
  }

  get bmi() {
    return this.progressService.calculateBMI(this.bmiWeight(), this.bmiHeight());
  }

  get bmiCategory() {
    return this.progressService.getBMICategory(this.bmi);
  }

  get weightChange() {
    return this.progressService.getWeightChange();
  }

  getChartBars() {
    const data = this.progressService.getWeightData();
    if (!data.data.length) return [];
    const max = Math.max(...data.data) + 2;
    const min = Math.min(...data.data) - 2;
    const span = max - min || 1;
    return data.data.map((v, i) => ({
      label: data.labels[i],
      value: v,
      height: Math.round(((v - min) / span) * 100),
    }));
  }

  currentUser() {
    return this.auth.currentUserSignal();
  }
}
