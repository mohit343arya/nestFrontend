import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  openNav:boolean=  false
  constructor() { }

  ngOnInit(): void {
    this.checkWidth();
  }
  
  toggleNav() {
    this.openNav = !this.openNav;
    let nav:any = document.getElementById('sidebar');
    if(this.openNav == true) {
      console.log('hello')
      nav.style.marginLeft = '-85px'
    } else {
      nav.style.marginLeft = '0'
    }
  }

  checkWidth() {
    let nav:any = document.getElementById('sidebar');
    let x = window.matchMedia("(max-width: 768px)")
    if (x.matches) { // If media query matches
      this.openNav = false;
      this.toggleNav();
    } else {
    //  document.body.style.backgroundColor = "pink";
    }
  }

}
