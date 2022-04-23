import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from './../shared/data-storage.service';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-header',
  template: `
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a routerLink="/" class="navbar-brand">Recipe Book</a>
        </div>

        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li routerLinkActive="active" *ngIf="isAuthenticated">
              <a routerLink="/recipes">Recipes</a>
            </li>
            <li routerLinkActive="active" *ngIf="!isAuthenticated">
              <a routerLink="/auth">Authentication</a>
            </li>
            <li routerLinkActive="active">
              <a routerLink="/shopping-list">Shopping List</a>
            </li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li *ngIf="isAuthenticated">
              <a style="cursor: pointer;" (click)="onLogout()">Logout</a>
            </li>
            <li class="dropdown" appDropdown *ngIf="isAuthenticated">
              <a style="cursor: pointer;" class="dropdown-toggle" role="button"
                >Manage <span class="caret"></span
              ></a>
              <ul class="dropdown-menu">
                <li>
                  <a style="cursor: pointer;" (click)="onSaveData()"
                    >Save Data</a
                  >
                </li>
                <li>
                  <a style="cursor: pointer;" (click)="onFetchData()"
                    >Fetch Data</a
                  >
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  //@ts-ignore
  private userSub: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    });
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
