import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-language-switch',
  templateUrl: './language-switch.component.html',
  styleUrls: ['./language-switch.component.css']
})
export class LanguageSwitchComponent {
  constructor(private router: Router) {

  }

  changeLanguage(value: string) {
    location.href=`${location.origin}/${value}`
  }
}

