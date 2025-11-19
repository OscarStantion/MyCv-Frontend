import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Notification {
  id: number;
  message: string;
  type?: 'info' | 'error' | 'success' | 'warn';
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private _messages = new BehaviorSubject<Notification[]>([]);
  private counter = 1;

  messages$: Observable<Notification[]> = this._messages.asObservable();

  show(message: string, type: Notification['type'] = 'info', timeout = 5000) {
    const note: Notification = { id: this.counter++, message, type };
    const current = this._messages.getValue();
    this._messages.next([...current, note]);
    if (timeout > 0) {
      setTimeout(() => this.dismiss(note.id), timeout);
    }
  }

  dismiss(id: number) {
    const current = this._messages.getValue();
    this._messages.next(current.filter(m => m.id !== id));
  }

  clear() {
    this._messages.next([]);
  }
}
