import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pattern } from '../../constant/Pattern';
import { Router } from '@angular/router';
import { NavigationUrl } from '../../constant/navigation-url';
import CommonUtility from '../../common/utilites/utils';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    providers: [LoginService],
})
export class LoginComponent implements OnInit {
    hidePassword: boolean = false;
    clicked = false;
    loginForm!: FormGroup;

    constructor(
        private loginService: LoginService,
        private fb: FormBuilder,
        private router: Router
    ) {}
    ngOnInit() {
        this.createLoginForm();
    }

    createLoginForm() {
        this.loginForm = this.fb.group({
            loginId: ['', Validators.compose([Validators.required, Validators.pattern(Pattern.email.pattern), Validators.maxLength(100)])],
            password: ['', Validators.compose([Validators.required])],
        });
    }

    onSubmit() {
        if (this.loginForm.invalid) {
            return;
        } else {
            this.clicked = true;
            this.loginService
                .login(this.loginForm.value)
                .then(user => {
                    CommonUtility.setUserView(user.view);
                    if (user.accessToken) {
                        CommonUtility.setAccessToken(user.accessToken);
                    }
                    if (user.refreshToken) {
                        CommonUtility.setRefreshToken(user.refreshToken);
                    }
                    this.router.navigate([NavigationUrl.DASHBOARD]);
                })
                .finally(() => {
                    this.clicked = false;
                });
        }
    }
}
