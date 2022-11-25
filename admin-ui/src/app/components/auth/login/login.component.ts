import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [
        `
            :host ::ng-deep .pi-eye,
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
})
export class LoginComponent implements OnInit {
    valCheck: string[] = ['remember'];

    password!: string;
    email!: string;
    rememberMe: boolean = false;

    constructor(
        public layoutService: LayoutService,
        private authenticationService: AuthenticationService
    ) {}
    ngOnInit(): void {
        let email = localStorage.getItem('email');
        if (email && email != '') {
            this.email = email;
        }
    }
    public onSubmit() {
        if (this.rememberMe) {
            localStorage.setItem('email', this.email);
        }
        this.authenticationService.login(this.email, this.password);
    }
}
