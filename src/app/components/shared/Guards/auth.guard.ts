import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class AppGuard implements CanActivate {

    constructor(private _authService: AuthService, private router: Router) {
    }
    canActivate() {
        if (this._authService.getToken()) {
            return  true;
        }
        this.router.navigate(['/']);
        return false;
    }
}