import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LoginService } from 'src/app/services/login.service';
import { submitSignup } from 'src/app/store/auth/auth.action';
import { RootState } from 'src/app/store/store';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public error: string = '';
  public signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private loginService: LoginService,
    private store: Store<RootState>
  ) {}

  public onSubmit() {
    const body = this.signUpForm.value;
    this.store.dispatch(submitSignup({ body }));
  }
  ngOnInit(): void {}
}
