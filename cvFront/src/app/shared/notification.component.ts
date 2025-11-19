import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, Notification } from '../services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="notifications" *ngIf="messages.length">
      <div *ngFor="let m of messages" class="note" [ngClass]="m.type">
        <span>{{ m.message }}</span>
        <button (click)="dismiss(m.id)">✕</button>
      </div>
    </div>
  `,
  styles: [
    `:host { position: fixed; right: 1rem; top: 1rem; z-index: 1000; }
     .notifications { display:flex; flex-direction:column; gap:0.5rem; }
     .note { background: #222; color: #fff; padding:0.6rem 0.8rem; border-radius:6px; display:flex; gap:0.5rem; align-items:center }
     .note.error { background: #b00020 }
     .note.success { background: #006400 }
     .note.info { background: #0b5fff }
     .note.warn { background: #ff8c00 }
     button { background:transparent; border:0; color:inherit; cursor:pointer }
    `
  ]
})
export class NotificationComponent {
  messages: Notification[] = [];
  constructor(private ns: NotificationService) {
    this.ns.messages$.subscribe(list => (this.messages = list));
  }

  dismiss(id: number) {
    this.ns.dismiss(id);
  }
}
