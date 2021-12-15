import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {
    }
    canActivate() {
        if (!this.authService.isAdmin() && this.authService.getToken()) {
            return  true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}