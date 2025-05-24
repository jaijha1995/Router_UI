import { Component } from '@angular/core';
import { SidenavComponent } from "../sidenav/sidenav.component";
import { HeaderComponent } from "../header/header.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [SidenavComponent, HeaderComponent, RouterModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  isSidenavVisible = false;

  toggleSidenav() {
    this.isSidenavVisible = !this.isSidenavVisible;
  }
}
