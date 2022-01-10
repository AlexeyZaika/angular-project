import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { LocalizeService } from '@shared/services/localize.service';
import { AuthService } from '@shared/services/auth.service';
import { IUser } from '@shared/interfaces/user/user.interface';

@Component({
  selector: 'mc-user',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public isValid = false;
  public isFullMail = false;
  public isFullPassword = false;
  public isLoggedIn: boolean;

  private unsubscribe$ = new Subject<void>();

  constructor(
    public localize: LocalizeService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
  ) {
  }

  public ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public onSubmit(): void {
    if (this.loginForm.invalid) {
      this.isValid = true;
    } else {
      this.authService.login(this.loginForm.value)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((user: IUser | null): void => {
          if (user) {
            this.isLoggedIn = true;
            this.authService.isLoggedIn$.next(true);
            this.authService.user$.next(user)
            this.loginForm.reset();
            this.router.navigate(['/']);
          }

          this.isLoggedIn = false;
        });
    }
  }

  public onChange(): void {
    this.isLoggedIn = true;

    this.isFullMail = !!this.loginForm.value.email;

    this.isFullPassword = !!this.loginForm.value.password;
  }

  public get email(): AbstractControl | null {return this.loginForm.get('email')}

  public get password(): AbstractControl | null {return this.loginForm.get('password')}
}
