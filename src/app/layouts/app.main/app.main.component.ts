import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './app.main.component.html',
  styleUrls: ['./app.main.component.scss']
})
export class AppMainComponent {
  sidebarActive: boolean = window.innerWidth >= 740;

  toggleSidebar() {
    this.sidebarActive = !this.sidebarActive;
  }
}
