import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import * as formRoot from "../../app.reducer";
import { Store } from '@ngrx/store';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth$: Observable<boolean>;
  authSubscription: Subscription = new Subscription;

  constructor(
    private store: Store<formRoot.State>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAuth$ = this.store.select(formRoot.getIsAuth);
  }

  onToggleSidenav() {
    this.sidenavToggle.emit()
  }

  logout() {
    this.authService.logout();
  }
}
