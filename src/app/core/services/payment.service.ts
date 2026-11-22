import { Injectable, signal } from '@angular/core';
import { PaymentItem, PaymentRecord } from '../models/models';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private readonly KEY = 'flexzone_payments';

  isOpen = signal(false);
  processing = signal(false);
  success = signal(false);
  currentItem = signal<PaymentItem | null>(null);

  private onSuccessCallback?: () => void;

  openPayment(item: PaymentItem, onSuccess?: () => void) {
    this.currentItem.set(item);
    this.isOpen.set(true);
    this.success.set(false);
    this.processing.set(false);
    this.onSuccessCallback = onSuccess;
  }

  close() {
    this.isOpen.set(false);
    this.success.set(false);
    this.processing.set(false);
    this.currentItem.set(null);
  }

  processPayment(cardNumber: string, expiry: string, cvv: string, name: string): Promise<boolean> {
    this.processing.set(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        this.processing.set(false);
        if (cardNumber.replace(/\s/g, '').length >= 16 && cvv.length >= 3 && expiry && name) {
          const item = this.currentItem();
          if (item) {
            const record: PaymentRecord = {
              id: Date.now().toString(),
              item,
              date: new Date().toISOString(),
              cardLast4: cardNumber.slice(-4),
              status: 'paid',
            };
            const records = this.getPaymentHistory();
            records.push(record);
            localStorage.setItem(this.KEY, JSON.stringify(records));
          }
          this.success.set(true);
          this.onSuccessCallback?.();
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1800);
    });
  }

  getPaymentHistory(): PaymentRecord[] {
    const stored = localStorage.getItem(this.KEY);
    return stored ? JSON.parse(stored) : [];
  }

  formatCard(val: string): string {
    return val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  }

  formatExpiry(val: string): string {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2);
    return digits;
  }
}
