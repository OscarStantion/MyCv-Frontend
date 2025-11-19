import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="contact-page light-bg">
      <div class="contact-inner">
        <header class="contact-header">
          <h1 class="contact-title">Contáctame</h1>
          <p class="contact-sub">¡Hablemos de tu próximo proyecto, juntos podemos hacer la diferencia!</p>
        </header>

        <div class="contact-grid-alt">
          <div class="contact-left">
            <ul class="contact-list-dark">
              <li><span class="icon">@</span> <span class="contact-text">oscarjeandiaz1@gmail.com</span></li>
              <li><span class="icon">📞</span> <span class="contact-text">+51 929 392 557</span></li>
              <li><span class="icon">📍</span> Chiclayo - Perú</li>
            </ul>
          </div>

          <div class="contact-right">
            <div class="photo-card">
              <img src="assets/FotoContac.jpeg" alt="Contacto" />
            </div>
          </div>
        </div>

        <div class="contact-socials">
          <a class="social-circle facebook" href="https://www.facebook.com/share/1b4FtJ9KNh/" target="_blank" rel="noopener noreferrer" aria-label="facebook">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07c0 5 3.66 9.14 8.44 9.93v-7.03H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.45h-1.25c-1.23 0-1.61.77-1.61 1.56v1.87h2.74l-.44 2.9h-2.3v7.03C18.34 21.21 22 17.07 22 12.07z" fill="#fff"/></svg>
          </a>
          <a class="social-circle instagram" href="https://www.instagram.com/oscarjeanfarronandiaz?igsh=aDNmcGc4dzc3Mzc=" target="_blank" rel="noopener noreferrer" aria-label="instagram">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" ry="5" stroke="none" fill="#fff" opacity="0.0"/><path d="M12 7.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6zm6.4-1.6a1.12 1.12 0 1 1 0 2.24 1.12 1.12 0 0 1 0-2.24z" fill="#fff"/></svg>
          </a>
        </div>
      </div>
    </div>
  `
})
export class ContactComponent {}
