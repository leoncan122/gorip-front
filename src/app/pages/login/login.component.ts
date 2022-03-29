import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LoginService } from 'src/app/services/login.service';
import { submitLogin } from 'src/app/store/auth/auth.action';
import { RootState } from 'src/app/store/store';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  public error: string = '';
  public loading: boolean = false;
  public authenticated = '';
  public token = '';

  constructor(
    private store: Store<RootState>,
    private loginService: LoginService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.store
      .select((state) => state.user)
      .subscribe((data) => {
        this.authenticated = data.status;
        this.token = data.token;
        if (data.token) {
          this.localStorageService.setSavedState('jwt', data.token);
          this.router.navigate(['/']);
        }
      });
  }

  public onSubmit() {
    const body = this.loginForm.value;
    this.store.dispatch(submitLogin({ body }));
  }
  public testToken = () => {
    const x = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + this.token,
      },
    };
    this.loginService.testToken(x).subscribe((data) => console.log(data));
  };
  ngOnInit(): void {}
  ngOnDestroy(): void {}
}
