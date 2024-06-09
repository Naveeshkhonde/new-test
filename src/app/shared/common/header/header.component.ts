import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  type:any;

  constructor(private route: Router){}
  ngOnInit(): void {
    this.type = localStorage.getItem('role')
  }

  logout(){
    localStorage.clear()
    this.route.navigateByUrl('/')
  }
}
