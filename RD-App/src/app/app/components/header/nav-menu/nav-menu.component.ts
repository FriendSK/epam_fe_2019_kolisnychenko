import { Component, OnInit } from '@angular/core';
import { Menu } from "../../../../core/models/menu.model";

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

    public menus: Menu[] = [
        {name: 'Courses', path: 'courses'},
        {name: 'About',   path: 'about'},
    ];

  constructor() { }

  ngOnInit(): void {
  }

}
