import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  template: `
  <app-header></app-header>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: [``]
})
export class AppComponent implements OnInit {
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
