import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menuitem',
  templateUrl: './app.menuitem.component.html',
  styleUrls: ['./app.menuitem.component.scss']
})
export class AppMenuitemComponent {
  @Input() item: any;
}
