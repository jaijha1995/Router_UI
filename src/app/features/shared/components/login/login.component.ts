import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/app.reducer';
import { setToken, setUser } from '../../../../core/app.action';
import { NotificationService } from '../../services/notification.service';
import { selectToken } from '../../../../core/app.selector';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  isLoading = false;
  showPassword = false;

  constructor(private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private router: Router,
    private store: Store<AppState>,
    private notificationService: NotificationService
  ) {
    this.store.select(selectToken).subscribe(token => {
      let tokenvalue = token;
      if (!tokenvalue) {
        this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/superadmin/devices']);
      }
    });
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.required]]
    });
  }

  ngOnInit(): void {

  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit(e: any, formvalue: any) {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    e.preventDefault();
    let payload = {
      email: formvalue.username,
      password: formvalue.password
    }
    this.localStorageService.login(payload).subscribe((res: any) => {
      if (res?.status == 200) {
        this.notificationService.showSuccess(res?.body?.msg);
        this.store.dispatch(setUser({ user: res?.body?.data }));
        this.store.dispatch(setToken({ token: res?.body?.access_token }));
        setTimeout(() => {
          this.router.navigate(['/superadmin/devices']);
        }, 500);
      } else {
        this.notificationService.showError(res?.body?.msg);
      }

    })
  }
}
