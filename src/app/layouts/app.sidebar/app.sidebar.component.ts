import { Component } from '@angular/core';
import { sidebarItems } from 'src/app/app-constants';

@Component({
  selector: 'app-sidebar',
  templateUrl: './app.sidebar.component.html',
  styleUrls: ['./app.sidebar.component.scss']
})
export class AppSidebarComponent {
  sidebarItems: any = sidebarItems;
}
