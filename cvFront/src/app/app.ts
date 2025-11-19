import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { RouterOutlet, RouterModule, Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { NotificationComponent } from './shared/notification.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, NotificationComponent],
  templateUrl: './app.html'
})
export class App {
  protected title = 'Mi CV';
  protected nombre = 'Oscar Jean Carlos Farroñan Diaz';
  protected profesion = 'Desarrollador Full Stack';

  @ViewChild('routeContainer', { static: true }) routeContainer!: ElementRef<HTMLDivElement>;
  private routerSub?: Subscription;
  // Mobile nav state
  mobileNavOpen = false;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    // Subscribe to router events to toggle CSS classes that drive transitions.
    try {
      this.routerSub = this.router.events.subscribe((ev: Event) => {
        const el = this.routeContainer && this.routeContainer.nativeElement;
        if (!el) return;
        if (ev instanceof NavigationStart) {
          el.classList.remove('route-fade-in');
          el.classList.add('route-fade-out');
        } else if (ev instanceof NavigationEnd || ev instanceof NavigationCancel || ev instanceof NavigationError) {
          el.classList.remove('route-fade-out');
          // force reflow so the enter animation always runs
          void el.offsetWidth;
          el.classList.add('route-fade-in');
          // remove enter class after animation duration (safe timeout)
          setTimeout(() => el.classList.remove('route-fade-in'), 600);
        }
      });
    } catch (e) {
      // no-op: avoid crashing the app if router isn't available for any reason
    }
  }

  /**
   * Trigger the CSS exit animation on the route container, then navigate.
   * Keeps in sync with the CSS transition duration (420ms).
   */
  startTransitionThenNavigate(path: string, domEvent?: MouseEvent): void {
    try {
      // prevent default anchor navigation (DOM event) and stop propagation
      try { domEvent?.preventDefault(); } catch {}
      try { domEvent?.stopPropagation(); } catch {}
      const el = this.routeContainer && this.routeContainer.nativeElement;
      if (!el) {
        // fallback: navigate immediately if container not available
        this.router.navigateByUrl(path);
        return;
      }

      // start exit animation
      el.classList.remove('route-fade-in');
      el.classList.add('route-fade-out');

      // delay navigation until the CSS animation finishes
      const cssDurationMs = 420;
      setTimeout(() => {
        // if we're already on the requested path, avoid re-navigation which can cause unexpected blank views
        const current = this.router.url || '/';
        const target = path || '/';
        if (current === target || (target === '/' && (current === '' || current === '/'))) {
          // simply remove exit class after animation and do nothing else
          el.classList.remove('route-fade-out');
          return;
        }
        this.router.navigateByUrl(path);
      }, cssDurationMs);
    } catch (e) {
      // fallback to immediate navigation on error
      try { this.router.navigate([path]); } catch { /* no-op */ }
    }
  }

  toggleMobileNav(domEvent?: MouseEvent): void {
    try { domEvent?.preventDefault?.(); } catch {}
    this.mobileNavOpen = !this.mobileNavOpen;
  }

  closeMobileNav(): void {
    this.mobileNavOpen = false;
  }

  ngOnDestroy(): void {
    if (this.routerSub) this.routerSub.unsubscribe();
  }
}
