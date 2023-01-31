import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms'
import {AuthenticationServiceService} from '../authentication-service.service'
import {Router} from '@angular/router'
import {HttpErrorResponse} from '@angular/common/http'

function comparePasswords(control: AbstractControl): { [key: string]: any }{
  const password = control.get('password')
  const confirmPassword = control.get('confirmPassword')
  return password?.value === confirmPassword?.value ? {passwordsDiffer: false} : { passwordsDiffer: true }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: FormGroup
  public errorMessage: string = ''

  constructor(
    private authService: AuthenticationServiceService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.user = this.fb.group({})
  }

  ngOnInit() {
    const currentUser = localStorage.getItem('currentUser')
    if (currentUser != null)
    {
      this.router.navigate(['/product/list'])
    }
    this.user = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onSubmit() {
    this.authService
      .login(this.user?.value.username, this.user?.value.password)
      .subscribe(
        (val) => {
          if (val) {
            if (this.authService.redirectUrl) {
              location.reload()
              this.router.navigateByUrl(this.authService.redirectUrl)
              this.authService.redirectUrl = null
            } else {
              location.reload()
              this.router.navigate(['/product/list'])
            }
          } else {
            this.errorMessage = 'Could not login'
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err)
          if (err.error instanceof Error) {
            this.errorMessage = `Error while trying to login user ${this.user?.value.username}: ${err.error.message}`
          } else {
            this.errorMessage = `Error ${err.status} while trying to login user ${this.user?.value.username}: ${err.error}`
          }
        }
      )
  }
}
