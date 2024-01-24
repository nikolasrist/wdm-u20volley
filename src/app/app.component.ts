import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'wdm-u20volley';
  countdown: string = '';
  private subscription!: Subscription;

  ngOnInit() {
    const endDate = new Date('2024-04-06T09:00:00'); // Set your specific date here
    this.subscription = interval(1000).subscribe((x) => {
      this.countdown = this.calculateCountdown(endDate);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private calculateCountdown(endDate: Date): string {
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();

    if (diff <= 0) {
      return 'Event has started';
    }

    let days = Math.floor(diff / (1000 * 60 * 60 * 24));
    let hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    let minutes = Math.floor((diff / 1000 / 60) % 60);
    let seconds = Math.floor((diff / 1000) % 60);

    return `${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`;
  }
}
