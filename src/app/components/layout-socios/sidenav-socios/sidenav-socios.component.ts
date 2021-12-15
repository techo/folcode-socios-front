import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav-socios',
  templateUrl: './sidenav-socios.component.html',
  styleUrls: ['./sidenav-socios.component.scss']
})
export class SidenavSociosComponent implements OnInit {

  @Output() closeSideBar = new EventEmitter<boolean>();
  flag: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  cerrar(){
    this.flag = !this.flag
    this.closeSideBar.emit(this.flag);
  }

}
