import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthGuardService } from 'src/app/authentication/auth-guard.service';
import { ResponseResult } from 'src/app/common/model/response-result';
import { LoginModel } from './model/login-model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  public loginform!: FormGroup;    // Reactive Form

  private invalidLoginMsg: string; // To display Login Credential Error

  private subscription!: Subscription;

  /**
   * @description Class Constructor
   * @param fb Form Builder, use to build the form with formControlName
   * @param authService Service for Login Authentication
   * @param Router for Navigation
   */

  constructor(
    private fb: FormBuilder,
    private authService: AuthGuardService,
    private router: Router
  ) {
    this.invalidLoginMsg = '';
  }

  /**
   * @description Angular lifecycle Hook triggers when Component destroys
   */

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /**
   * @description Angular Lifecycle hook, triggers after contructor, ngOnChanges
   */

  ngOnInit(): void {
    this.createForm();
    this.loginform.controls.userName.setValue('Admin');  // to set default login value to Admin
  }

  /**
   * @description To create the Form
   */

  public createForm = (): void => {
    this.loginform = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * @description trigger when User click on Sign In Button
   * @returns void When Form is Invalid
   */

  public onLogin = (): void => {
    this.loginform.markAllAsTouched();
    if (this.loginform.invalid) {
      return;
    }
    const credentials: LoginModel = this.loginform.getRawValue();
    this.subscription = this.authService.login(credentials).subscribe((res: ResponseResult<LoginModel>) => {
      if (res.status === 200) {
        const result = res.result;
        this.authService.setLoginSession(result);
        this.router.navigate(['dashboard']);
        return;
      }
    }, (err: ResponseResult<LoginModel>) => {
      this.setInvalidLoginMsg(err.message);
      /**
       * @description Remove the Login Failed Message after 4 seconds
       */
      setTimeout(() => {
        this.setInvalidLoginMsg('');
      }, 4000);
      console.error(err);
    });
  }

  /**
   * Setters Getters for Login Message(encapsulation)
   * @returns Invalid Login Message
   */

  public getInvalidLoginMsg(): string {
    return this.invalidLoginMsg;
  }

  public setInvalidLoginMsg(invalidLoginMsg: string): void {
    this.invalidLoginMsg = invalidLoginMsg;
  }

  /**
   * @description On Keydown event onLogin button will get triggered
   * @param event keyboard event
   */

  @HostListener('window:keydown', ['$event'])
  public onKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Enter') {
      this.onLogin();
    }
  }

}
