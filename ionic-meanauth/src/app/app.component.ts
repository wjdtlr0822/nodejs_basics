import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Dashboard', url: '/dashboard', icon: 'card' },
    { title: 'Profile', url: '/profile', icon: 'body' },
    { title: 'project', url: '/project', icon: 'archive' },
    { title: 'register', url: '/register', icon: 'person-add' },
    { title: 'login', url: '/login', icon: 'enter' },
  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
