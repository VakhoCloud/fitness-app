import { CanActivateFn, CanMatchFn, Router, UrlTree } from "@angular/router";
import { inject } from "@angular/core";
import { Observable, map, take } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromRoot from '../app.reducer';

const isAuthenticated = (): | boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> => {
    const store = inject(Store<fromRoot.State>);
    const router = inject(Router)
    return store.select(fromRoot.getIsAuth).pipe(take(1), map(isAuth => {
        if (isAuth) {
            return true;
        } else {
            router.navigate(['/']);
            return false;
        }
    }));
}

export const canActivate: CanActivateFn = isAuthenticated;
export const canMatch: CanMatchFn = isAuthenticated;
