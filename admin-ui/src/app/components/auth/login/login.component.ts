import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

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
export class LoginComponent {
    valCheck: string[] = ['remember'];

    password!: string;
    email!: string;

    constructor(
        public layoutService: LayoutService,
        private authenticationService: AuthenticationService
    ) {}
    public onSubmit() {
        this.authenticationService.login(this.email, this.password);
    }
}
