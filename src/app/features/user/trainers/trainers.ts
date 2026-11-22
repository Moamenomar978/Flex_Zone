import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TrainerService } from '../../../core/services/trainer.service';
import { PaymentService } from '../../../core/services/payment.service';
import { AuthService } from '../../../core/services/auth.service';
import { Trainer } from '../../../core/models/models';

@Component({
  selector: 'app-trainers',
  imports: [RouterLink],
  templateUrl: './trainers.html',
  styleUrl: './trainers.css',
})
export class Trainers implements OnInit {
  private trainerService = inject(TrainerService);
  private paymentService = inject(PaymentService);
  auth = inject(AuthService);

  trainers = signal<Trainer[]>([]);
  selected = signal<Trainer | null>(null);
  activeSpec = signal('All');
  bookedSessions = signal<Set<string>>(new Set());

  specializations = computed(() => {
    const all = new Set<string>();
    this.trainers().forEach((t) => t.specialties.forEach((s) => all.add(s)));
    return ['All', ...Array.from(all)];
  });

  filteredTrainers = computed(() => {
    const spec = this.activeSpec();
    if (spec === 'All') return this.trainers();
    return this.trainers().filter((t) => t.specialties.includes(spec));
  });

  ngOnInit() {
    this.trainerService.getAll().subscribe({
      next: (trainers) => this.trainers.set(trainers),
    });
    const paid = this.paymentService
      .getPaymentHistory()
      .filter((r) => r.item.type === 'trainer')
      .map((r) => r.item.id.replace('trainer_', ''));
    this.bookedSessions.set(new Set(paid));
  }

  openProfile(t: Trainer) {
    this.selected.set(t);
  }

  closeProfile() {
    this.selected.set(null);
  }

  isSessionBooked(id: number) {
    return this.bookedSessions().has(String(id));
  }

  sessionPrice(t: Trainer) {
    return t.price || 80;
  }

  bookSession(t: Trainer) {
    this.closeProfile();
    this.paymentService.openPayment(
      {
        id: 'trainer_' + t.id,
        name: t.name + ' — Personal Session',
        price: this.sessionPrice(t),
        type: 'trainer',
        description: t.role + ' · 1 Hour Session',
      },
      () => {
        const updated = new Set(this.bookedSessions());
        updated.add(String(t.id));
        this.bookedSessions.set(updated);
        this.auth.addXP(30);
      },
    );
  }

  getStars(rating: number): string {
    return '★'.repeat(Math.floor(rating));
  }

  initials(t: Trainer) {
    return t.initials || t.name.split(' ').map((n) => n[0]).join('');
  }
}
