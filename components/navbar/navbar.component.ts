import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { Admin } from '../../models/administrator';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  admin:Admin;

  constructor(private authenticationService: AuthenticationService) { 
    this.authenticationService.admin.subscribe(x => this.admin = x);
  }

  ngOnInit(): void {
  }

  logout() {
    this.authenticationService.logout();
  }

}
