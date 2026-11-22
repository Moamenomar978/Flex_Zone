import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';
import { Chatbot } from './components/chatbot/chatbot';
import { PaymentModal } from './components/payment-modal/payment-modal';

@Component({
  imports: [RouterOutlet, NavbarComponent, Chatbot, PaymentModal],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('FlexZone');
}
