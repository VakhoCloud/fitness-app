import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrl: './sidenav-list.component.css'
})
export class SidenavListComponent implements OnInit{

  @Output() sidenavClose = new EventEmitter<void>();
  isAuth$: Observable<boolean>;


  constructor(private authService: AuthService, private store: Store){}

  ngOnInit(): void {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  onCloseSidenav() {
    this.sidenavClose.emit()
  }

  logout() { 
    this.authService.logout();
    this.onCloseSidenav();
  }

}
