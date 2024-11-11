import { AuthData } from "./auth-data.model";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Auth , authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { TrainingService } from "../training/training.service";
import { UIService } from "../shared/ui.service";
import { Store } from "@ngrx/store";
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions'
import * as AuthAction from './auth.actions'



@Injectable({providedIn: 'root'})
export class AuthService {

    constructor(
        private router: Router, 
        private auth: Auth, 
        private trainingService: TrainingService,
        private uiService: UIService,
        private store: Store<fromRoot.State>
    ) {}

    initAuthListener() { 
        authState(this.auth).subscribe(user => {
            if (user) {
                this.store.dispatch(new AuthAction.SetAuthenticated());
                this.router.navigate(['/training']);
            } else {
                this.trainingService.cancelSubscriptions();
                this.store.dispatch(new AuthAction.SetUnauthenticated());
                this.router.navigate(['/login']);
            }
        });
    }

    registerUser(authData: AuthData){ 
        this.store.dispatch(new UI.StartLoading());
        createUserWithEmailAndPassword(this.auth, authData.email, authData.password)
            .then(result => {
                this.store.dispatch(new UI.StopLoading());
            })
            .catch(error => {
                this.store.dispatch(new UI.StopLoading());
                this.uiService.showSnackbar(error.message, null, 3000);
            });
    }

    login(authData: AuthData) { 
        this.store.dispatch(new UI.StartLoading());
        signInWithEmailAndPassword(this.auth, authData.email, authData.password)
            .then(result => {
                this.store.dispatch(new UI.StopLoading());
            })
            .catch(error => {
                this.store.dispatch(new UI.StopLoading());
                this.uiService.showSnackbar(error.message, null, 3000);
            });
    }

    logout() {
        signOut(this.auth);
    }

}
