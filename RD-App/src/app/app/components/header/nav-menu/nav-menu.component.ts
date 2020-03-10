import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Menu } from "../../../../core/models/menu.model";

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavMenuComponent {

    public menus: Menu[] = [
        {name: 'Courses', path: 'courses'},
        {name: 'About',   path: 'about'},
    ];
}
