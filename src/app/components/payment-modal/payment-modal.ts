import { Component, signal } from '@angular/core';
import { PaymentService } from '../../core/services/payment.service';

@Component({
  selector: 'app-payment-modal',
  imports: [],
  templateUrl: './payment-modal.html',
  styleUrl: './payment-modal.css',
})
export class PaymentModal {
  cardNumber = signal('');
  expiry = signal('');
  cvv = signal('');
  cardName = signal('');
  error = signal('');
  activeMethod = signal<'card' | 'paypal' | 'apple'>('card');

  constructor(public paymentService: PaymentService) {}

  formatCard(e: Event) {
    const val = (e.target as HTMLInputElement).value;
    this.cardNumber.set(this.paymentService.formatCard(val));
  }

  formatExp(e: Event) {
    const val = (e.target as HTMLInputElement).value;
    this.expiry.set(this.paymentService.formatExpiry(val));
  }

  async pay() {
    this.error.set('');
    const cn = this.cardNumber().replace(/\s/g, '');
    if (this.activeMethod() === 'card') {
      if (cn.length < 16) {
        this.error.set('Please enter a valid 16-digit card number.');
        return;
      }
      if (!this.expiry() || this.expiry().length < 5) {
        this.error.set('Please enter a valid expiry date.');
        return;
      }
      if (this.cvv().length < 3) {
        this.error.set('Please enter a valid CVV.');
        return;
      }
      if (!this.cardName().trim()) {
        this.error.set('Please enter the name on card.');
        return;
      }
    }
    const ok = await this.paymentService.processPayment(
      this.cardNumber(),
      this.expiry(),
      this.cvv(),
      this.cardName(),
    );
    if (!ok) this.error.set('Payment declined. Please check your details.');
  }

  close() {
    this.paymentService.close();
  }
}
