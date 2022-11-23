import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersManagementComponent } from './management/management.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'management', component: UsersManagementComponent }
    ])],
    exports: [RouterModule]
})
export class UsersRoutingModule { }
