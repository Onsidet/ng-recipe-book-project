import { Component, ComponentFactoryResolver, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';
import { PlceholderDirective } from '../shared/placehoder/plceholder.directive';
import { AlertComponent } from '../shared/alert/alert.component';

@Component({
  selector: 'app-auth',
  template: `
    <ng-template appPlceholder></ng-template>
    <div class="row">
      <div class="col-xs-12 col-md-6 col-md-offset-3">
        <!-- <div class="alert alert-danger" *ngIf="error">
      <p>{{ error }}</p>
    </div> -->
        <!-- <app-alert
          [message]="error"
          *ngIf="error"
          (close)="onHandleError()"
        ></app-alert> -->
        <!-- <dir class="alert alert-danger" *ngIf="error">
          <p>{{ error }}</p>
        </dir> -->
        <div *ngIf="isLoading" style="text-align: center;">
          <app-loading-spinner></app-loading-spinner>
        </div>
        <form
          #authForm="ngForm"
          (ngSubmit)="onSubmit(authForm)"
          *ngIf="!isLoading"
        >
          <div class="form-group">
            <label for="email">E-Mail</label>
            <input
              type="text"
              name="email"
              id="email"
              class="form-control"
              placeholder="E-Mail"
              ngModel
              email
              required
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              class="form-control"
              placeholder="Password"
              ngModel
              required
              minlength="6"
            />
          </div>
          <div>
            <button
              class="btn btn-primary"
              type="submit"
              [disabled]="!authForm.valid"
            >
              {{ isLoginMode ? 'Login' : 'Sign Up' }}
            </button>
            |
            <button
              class="btn btn-primary"
              type="button"
              (click)="onSwitchMode()"
            >
              Switch to {{ isLoginMode ? 'Sign Up' : 'Login' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [],
})
export class AuthComponent implements OnInit ,OnDestroy{
  isLoginMode = true;
  isLoading = false;
  //@ts-ignore
  error: string = null;

  @ViewChild(PlceholderDirective, { static: false })
  alertHost!: PlceholderDirective;

  private closeSub: Subscription = new Subscription;
  constructor(
    private authService: AuthService,
    private router: Router , private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {}
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }
    authObs.subscribe(
      (responseData) => {
        console.log(responseData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      }
    );
    form.reset();
  }
  onHandleError() {
    //@ts-ignore
    this.error = null;
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  private showErrorAlert(message: string) {
    // const alertCmp = new AlertComponent();
    const alertCmpFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

  componentRef.instance.message = message;
  this.closeSub = componentRef.instance.close.subscribe(() => {
    this.closeSub.unsubscribe();
    hostViewContainerRef.clear();
  });
  }
}


