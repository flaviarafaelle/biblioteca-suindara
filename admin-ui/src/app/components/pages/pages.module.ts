import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { CreateComponent } from './book/create/create.component';
import { UsersManagementComponent } from './users/management/management.component';

@NgModule({
    declarations: [CreateComponent, UsersManagementComponent],
    imports: [CommonModule, PagesRoutingModule],
})
export class PagesModule {}
