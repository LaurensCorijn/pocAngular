import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-language-switch',
  templateUrl: './language-switch.component.html',
  styleUrls: ['./language-switch.component.css']
})
export class LanguageSwitchComponent {
  constructor(private router: Router) {
    console.log(location.pathname)
    //console.log(location.host)
    //console.log(location.origin)

    const parts = location.href.split("/")
    const length = parts.length
    //console.log(length)
    //console.log(parts)
  }

  changeLanguage(value: string) {
    const pathName = location.pathname
    this.router.navigate([`nl-BE/${pathName}`])
  }
}

