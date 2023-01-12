import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms'
import {Observable} from 'rxjs'
import {map} from 'rxjs/operators'
import {AuthenticationServiceService} from '../authentication-service.service'
import {Router} from '@angular/router'
import {HttpErrorResponse} from '@angular/common/http'

function patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null
    }

    const valid = regex.test(control.value)
    return valid ? null : error
  }
}

function comparePasswords(control: AbstractControl): ValidationErrors {
  const password = control.get('password')
  const confirmPassword = control.get('confirmPassword')
  return password?.value === confirmPassword?.value ? {passwordsDiffer: false} : { passwordsDiffer: true}
}

function serverSideValidateUsername(
  checkAvailabilityFn: (n: string) => Observable<boolean>
): ValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors > => {
    return checkAvailabilityFn(control.value).pipe(
      map((available) => {
        if (available) {
          return {userAlreadyExists: false}
        }
        return {userAlreadyExists: true}
      })
    )
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  public user: FormGroup
  public errorMessage: string = ''

  constructor(
    private authService: AuthenticationServiceService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.user = this.fb.group({
      email: ['', [Validators.required, Validators.email], serverSideValidateUsername(this.authService.checkUserNameAvailability)],
      passwordGroup: this.fb.group(
        {
          password: [
            '',
            [
              Validators.required,
              Validators.minLength(8),
              patternValidator(/\d/, {hasNumber: true}),
              patternValidator(/[A-Z]/, {hasUpperCase: true}),
              patternValidator(/[a-z)]/, {hasLowerCase: true}),
            ],
          ],
          confirmPassword: ['', Validators.required],
        },
        {validator: comparePasswords}
      )
    })
  }

  ngOnInit() {
    this.user = this.fb.group({
      email: ['', [Validators.required, Validators.email], serverSideValidateUsername(this.authService.checkUserNameAvailability)],
      passwordGroup: this.fb.group(
        {
          password: [
            '',
            [
              Validators.required,
              Validators.minLength(8),
              patternValidator(/\d/, {hasNumber: true}),
              patternValidator(/[A-Z]/, {hasUpperCase: true}),
              patternValidator(/[a-z)]/, {hasLowerCase: true}),
            ],
          ],
          confirmPassword: ['', Validators.required],
        },
        {validator: comparePasswords}
      )
    })
  }

  getErrorMessage(errors: any) {
    if (errors == null) {
      return null
    }
    if (errors.required) {
      return 'is required'
    } else if (errors.minLength) {
      return `needs at least ${errors.minLength.requiredLength} characters (got ${errors.minLength.actualLength})`
    } else if (errors.hasNumber) {
      return 'needs at least 1 number'
    } else if (errors.hasUpperCase) {
      return 'needs at least 1 upper case character'
    } else if (errors.hasLowerCase) {
      return 'needs at least 1 lower case character'
    } else if (errors.userAlreadyExists) {
      return 'user already exists'
    } else if (errors.email) {
      return 'not a valid email address'
    } else if (errors.passwordsDiffer) {
      return 'passwords are not the same'
    } else {
      return 'something went wrong'
    }
  }

  onSubmit() {
    this.authService
      .register(
        this.user?.value.email,
        this.user?.value.email,
        this.user?.value.passwordGroup.password
      )
      .subscribe(
        (val) => {
          if (val) {
            if (this.authService.redirectUrl != null) {
              this.router.navigateByUrl(this.authService.redirectUrl);
              this.authService.redirectUrl = null
            } else {
              this.router.navigate(['/product/list'])
            }
          } else {
            this.errorMessage = `Could not login`
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err)
          if (err.error instanceof Error) {
            this.errorMessage = `Error while trying to login user ${this.user?.value.email}: ${err.error.message}`
          } else {
            this.errorMessage = `Error ${err.status} while trying to login user ${this.user?.value.email}: ${err.error}`
          }
        }
      )
  }
}
