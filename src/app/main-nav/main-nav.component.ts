import { Component } from '@angular/core'

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  public loggedIn: boolean

  constructor() {
    const currentUser = localStorage.getItem('currentUser')

    this.loggedIn = currentUser != null
  }

  public logout() {
    localStorage.removeItem('currentUser')
    this.loggedIn = false
  }
}
