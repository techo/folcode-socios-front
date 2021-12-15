import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-layout-socios',
  templateUrl: './layout-socios.component.html',
  styleUrls: ['./layout-socios.component.scss']
})
export class LayoutSociosComponent implements OnInit {

  sideBarOpen = false;

  
  constructor() { }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }


  ngOnInit(): void {
  }

  closeSideBar( event : any){
    this.sideBarOpen = false;
  }

}
