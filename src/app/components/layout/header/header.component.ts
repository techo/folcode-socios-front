import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  constructor(
    private _auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  logout(){
    this._auth.logout();
    localStorage.removeItem('token')
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
}
