import { Injectable } from '@angular/core';
import { ProgressEntry } from '../models/models';

@Injectable({ providedIn: 'root' })
export class ProgressService {
  private readonly KEY = 'flexzone_progress';

  private defaultEntries: ProgressEntry[] = [
    { date: '2025-01-01', weight: 82, bodyFat: 20, chest: 100, waist: 88, arms: 34, legs: 58 },
    { date: '2025-02-01', weight: 80, bodyFat: 19, chest: 101, waist: 86, arms: 35, legs: 59 },
    { date: '2025-03-01', weight: 79, bodyFat: 18, chest: 101, waist: 85, arms: 35, legs: 60 },
    { date: '2025-04-01', weight: 78, bodyFat: 17, chest: 102, waist: 83, arms: 36, legs: 61 },
    { date: '2025-05-01', weight: 77, bodyFat: 16, chest: 103, waist: 82, arms: 37, legs: 62 },
    { date: '2025-06-01', weight: 76, bodyFat: 15, chest: 104, waist: 80, arms: 37, legs: 63 },
  ];

  getEntries(): ProgressEntry[] {
    const stored = localStorage.getItem(this.KEY);
    if (stored) return JSON.parse(stored);
    localStorage.setItem(this.KEY, JSON.stringify(this.defaultEntries));
    return this.defaultEntries;
  }

  addEntry(entry: ProgressEntry): void {
    const entries = this.getEntries();
    const filtered = entries.filter((e) => e.date !== entry.date);
    filtered.push(entry);
    filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    localStorage.setItem(this.KEY, JSON.stringify(filtered));
  }

  getLatestEntry(): ProgressEntry | null {
    const entries = this.getEntries();
    return entries.length ? entries[entries.length - 1] : null;
  }

  calculateBMI(weight: number, heightCm: number): number {
    const h = heightCm / 100;
    return parseFloat((weight / (h * h)).toFixed(1));
  }

  getBMICategory(bmi: number): { label: string; color: string } {
    if (bmi < 18.5) return { label: 'Underweight', color: '#3b82f6' };
    if (bmi < 25) return { label: 'Normal', color: '#10b981' };
    if (bmi < 30) return { label: 'Overweight', color: '#f59e0b' };
    return { label: 'Obese', color: '#ef4444' };
  }

  getWeightChange(): number {
    const entries = this.getEntries();
    if (entries.length < 2) return 0;
    return parseFloat((entries[entries.length - 1].weight - entries[0].weight).toFixed(1));
  }

  getWeightData(): { labels: string[]; data: number[] } {
    const entries = this.getEntries();
    return {
      labels: entries.map((e) => new Date(e.date).toLocaleDateString('en', { month: 'short' })),
      data: entries.map((e) => e.weight),
    };
  }
}
